### Leetcode 3484 (Medium): Design Spreadsheet [Practice](https://leetcode.com/problems/design-spreadsheet)

### Description  
Implement a **spreadsheet** that models a grid with 26 columns labeled 'A' to 'Z' and a given number of rows.  
Each cell is referenced as, for example, "A1" for column A, row 1.  
You need to support these operations:
- Initialize the spreadsheet for a specified number of rows (all values are 0).
- **SetCell(cell, value)**: Set a cell (e.g., "B2") to a specified integer value.
- **ResetCell(cell)**: Reset a cell to 0.
- **GetValue(formula)**: Evaluate a formula that sums up values of cell references and/or plain integers, separated by '+'. Formulas will start with '=' (e.g., "=A1+B2+5"). If a cell has been reset or never set, its value is 0.

### Examples  

**Example 1:**  
Input:  
```
Spreadsheet(3)
setCell("A1", 2)
setCell("B2", 5)
getValue("=A1+B2")
```
Output:  
```
7
```
*Explanation: A1=2, B2=5. getValue adds both = 7.*

**Example 2:**  
Input:  
```
Spreadsheet(2)
setCell("A1", 4)
resetCell("A1")
getValue("=A1+3")
```
Output:  
```
3
```
*Explanation: After reset, A1 value is 0. Formula is 0 + 3 = 3.*

**Example 3:**  
Input:  
```
Spreadsheet(1)
getValue("=A1+Z1+100")
```
Output:  
```
100
```
*Explanation: Neither A1 nor Z1 have been set, so both are 0: 0+0+100=100.*

### Thought Process (as if you’re the interviewee)  
First, treat the spreadsheet as a mapping from cell name (like "A1") to an integer value.  
- All uninitialized or reset cells should default to 0.
- For setCell and resetCell, store/update/delete the value from a simple dictionary.
- For getValue, parse the formula: the formula starts with '=', and is followed by tokens separated by '+'.  
    - For each token:  
        - If it is a valid integer, add as integer.
        - Else, treat as cell name and look up value (if not set, return 0).
- As there’s a fixed set of columns and potentially many rows, but most cells may be unset, a dictionary (hash map) is a good fit.

Brute-force would use a 2D array for the grid, but this wastes memory for unset cells.  
Optimized is to use only a dictionary to store nonzero/non-reset values by cell name as keys.

Formula parsing is simple since only '+' is supported, and each component is either an integer or a cell name (no nested formulas, ranges, functions).

### Corner cases to consider  
- Setting and immediately resetting a cell.
- Getting value of cells that were never set.
- Using formulas with only constants, only cell refs, or both.
- Using a cell name that is out of the specified row range (assume always valid input by problem design).
- Setting a cell multiple times (last one wins).
- Formulas with repeated cell names (sum all occurrences).
- Large number of unset cells (dictionary handles efficiently).

### Solution

```python
class Spreadsheet:
    def __init__(self, rows: int):
        # Store non-empty cell values in a dict: key is like "A1", value is int
        self.data = {}

    def setCell(self, cell: str, value: int) -> None:
        # Set the cell to the specified value
        self.data[cell] = value

    def resetCell(self, cell: str) -> None:
        # Remove the value for that cell (now treated as 0)
        if cell in self.data:
            del self.data[cell]

    def getValue(self, formula: str) -> int:
        # The formula format is '=A1+B2+3', etc.
        if not formula.startswith('='):
            # Not required, but just in case
            return 0
        tokens = formula[1:].split('+')  # remove '=' and split by '+'
        total = 0
        for token in tokens:
            # Check if token is an integer or a cell name
            if token.isdigit():
                total += int(token)
            else:
                total += self.data.get(token, 0)
        return total
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    - setCell and resetCell: O(1) average (dict op)
    - getValue: O(k), where k = number of elements in the formula (split). For each element, lookup/int parsing is O(1).
- **Space Complexity:**  
    - O(n), where n is the number of set (non-reset, nonzero) cells.  
    - Only cells that are set are stored.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support columns beyond 'Z' (e.g., 'AA', 'AB')?
  *Hint: Consider how to map column labels to indices and back, and possible formula parsing changes.*

- How would you support range operations, like '=SUM(A1:B2)' or multiplication/division?
  *Hint: Need to parse ranges and/or add an expression parser.*

- What if a formula can depend on another formula (i.e., allow a cell to store a formula whose value auto-calculates when its dependencies change)?
  *Hint: Dependency graph and lazy evaluation/topological sort.*

### Summary
This problem uses the ["Design a data structure"] pattern with simple hash map/dictionary storage for nonzero spreadsheet cells. Formula parsing is straightforward string processing. This pattern is common in custom caching, memoization, or database row modeling. The key idea is: only store non-default data (sparse representation), and parse basic expressions using tokenization; extensible to more complex dependency or evaluation logic as needed.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Design(#design), Matrix(#matrix)

### Similar Problems
- Excel Sheet Column Title(excel-sheet-column-title) (Easy)