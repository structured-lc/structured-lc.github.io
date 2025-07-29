### Leetcode 631 (Hard): Design Excel Sum Formula [Practice](https://leetcode.com/problems/design-excel-sum-formula)

### Description  
Design a basic **Excel-like spreadsheet** with the ability to:
- **Set** a cell’s value with an integer.
- **Get** a cell’s current value.
- **Sum** a cell or a range of cells (e.g. "A1", "A1:B2"), and assign the result to a cell.  
The sum formula persists until the cell is overwritten by a direct value or another formula.  
Columns are represented by uppercase characters 'A' to 'Z', and rows are indexed from 1 (not zero).  
The spreadsheet is initialized with all values as 0 and has fixed dimensions given by the constructor (height, width as highest column letter).

### Examples  

**Example 1:**  
Input=`Excel(3, 'C'), set(1, 'A', 2), sum(3, 'C', ["A1", "A1"])`  
Output=`[null, null, 4]`  
*Explanation:*
- Construct 3×3 sheet: all cells 0  
- set(1, 'A', 2): Cell A1 = 2  
- sum(3, 'C', ["A1", "A1"]): C3 = A1 + A1 = 2 + 2 = 4

**Example 2:**  
Input=`Excel(2, 'B'), set(1, 'A', 1), set(2, 'A', 2), sum(1, 'B', ["A1:A2"])`  
Output=`[null, null, null, 3]`  
*Explanation:*  
- Construct 2×2 sheet.  
- set(1, 'A', 1): A1 = 1.  
- set(2, 'A', 2): A2 = 2.  
- sum(1, 'B', ["A1:A2"]): B1 = A1 + A2 = 1 + 2 = 3

**Example 3:**  
Input=`Excel(2, 'B'), sum(1, 'A', ["B1:B2"])`  
Output=`[null, 0]`  
*Explanation:*  
- Construct 2×2 sheet.
- sum(1, 'A', ["B1:B2"]): A1 = B1 + B2 = 0 + 0 = 0

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Maintain a 2D array for the Excel grid.  
  For set/get, just access by indices.  
  For sum, parse all given cell/range strings, convert to indices, lookup values, and return sum.

- **Formula persistence:**  
  When a cell uses a sum formula, it should automatically reflect updates to any of its source cells.  
  This means cell values might depend on other cells (dependency graph), or we need to recalculate using stored formulas.  
  - Option 1: Maintain for each cell (if set by sum) a list of its sum formula (cell dependencies); on get, recalculate recursively on the fly.
  - Option 2: Propagate changes whenever a cell value is updated, updating all dependent formulas (hard since requires tracking reverse dependencies and could be slow if many dependents).

- **Final choice:**  
  - Store in each cell either a value or a formula (list of dependencies).  
  - On get, if formula is present, recalculate sum by recursively querying source cells, else return static value.
  - On set, overwrite value and clear formula.  
  - On sum, store the formula (list of ranges/cells) and recalculate when needed.

  Trade-offs:  
  - Lookup per get can be slow (recursive), but propagation on each set is avoided.
  - Cycles are impossible since Excel forbids self-references, and LeetCode testcases do not create cycles.

### Corner cases to consider  
- Setting a cell overwrites any formula in that cell.
- Overlapping ranges in sum (e.g., "A1", "A1:A2") – should count each occurrence.
- Large ranges that span the whole sheet.
- Summing an empty range (invalid input, but should return 0 if nothing within range).
- Getting or setting outside of spreadsheet dimensions (invalid, but LeetCode never passes out-of-bounds).
- Setting the same cell multiple times.

### Solution

```python
class Excel:
    def __init__(self, H: int, W: str):
        # rows: 1-indexed, columns: 0-indexed, e.g., 'A' = 0, 'B' = 1
        self.H = H
        self.W = ord(W) - ord('A') + 1
        # Each cell: {'val': int, 'formula': None or dict((r, c): freq)}
        self.cells = [[{'val': 0, 'formula': None} for _ in range(self.W)] for _ in range(self.H)]

    def set(self, r: int, c: str, v: int) -> None:
        row = r - 1
        col = ord(c) - ord('A')
        self.cells[row][col]['val'] = v
        self.cells[row][col]['formula'] = None

    def get(self, r: int, c: str) -> int:
        row = r - 1
        col = ord(c) - ord('A')
        cell = self.cells[row][col]
        if cell['formula'] is None:
            return cell['val']
        # Recalculate sum from formula
        total = 0
        for (rr, cc), freq in cell['formula'].items():
            total += self.get(rr + 1, chr(cc + ord('A'))) * freq
        return total

    def sum(self, r: int, c: str, strs: list[str]) -> int:
        # Build mapping: (row, col) -> count (for input ["A1", "A1:B2"])
        formula = {}
        for s in strs:
            if ':' in s:
                start, end = s.split(':')
                sr, sc = int(start[1:]) - 1, ord(start[0]) - ord('A')
                er, ec = int(end[1:]) - 1, ord(end[0]) - ord('A')
                for rr in range(sr, er + 1):
                    for cc in range(sc, ec + 1):
                        formula[(rr, cc)] = formula.get((rr, cc), 0) + 1
            else:
                rr, cc = int(s[1:]) - 1, ord(s[0]) - ord('A')
                formula[(rr, cc)] = formula.get((rr, cc), 0) + 1

        row = r - 1
        col = ord(c) - ord('A')
        self.cells[row][col]['formula'] = formula
        # Value immediately recalculated
        return self.get(r, c)
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - Constructor: O(height × width) for initializing grid.
  - set(row, col, val): O(1)
  - get(row, col): In worst-case cell is sum of all others, and each other is also a formula cell -- O(total number of dependencies). Realistically, queries are O(total number of unique cells referenced in formula), with recursion depth ≤ total cells.
  - sum(row, col, numbers): O(L + Q), L = input list length, Q = total cells in all specified ranges (for formula dict building)  
- **Space Complexity:**  
  - O(height × width) for cells.
  - Each formula dict can be O(height × width) if the sum references the whole sheet.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to optimize repeated computation for large dependency trees?
  *Hint: Consider memoization or tracking dirty/clean states per cell.*

- How would your solution change if formulas could reference other formulas, and updates must propagate instantly?
  *Hint: Try topological sort or use notification/listener pattern for reverse dependencies.*

- How would you extend this to support more complex Excel formulas (e.g., MIN, MAX, or arbitrary expressions)?
  *Hint: Allow formula objects per cell with type and dependency tracking; expression evaluation tree per cell.*

### Summary
This problem uses the **2D matrix simulation** and **dependency parsing** pattern.  
It demonstrates tracking **static values OR dynamic formulas** for cells, parsing Excel-style address/range strings, and handling recursive dependency calculations.  
This pattern is also found in other spreadsheet simulations, reactive programming, and cell dependency graphs in software configuration or computation grids.