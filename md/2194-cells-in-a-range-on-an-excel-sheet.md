### Leetcode 2194 (Easy): Cells in a Range on an Excel Sheet [Practice](https://leetcode.com/problems/cells-in-a-range-on-an-excel-sheet)

### Description  
Given a string specifying a rectangular range of cells in an Excel-like spreadsheet (e.g., `"A1:C2"`), generate a list of all cell names within that range. The range always follows the format `"Col1Row1:Col2Row2"`. You must output a sorted list (by columns first, then rows) of every cell inside the inclusive range.

### Examples  

**Example 1:**  
Input: `"K1:L2"`  
Output: `["K1", "K2", "L1", "L2"]`  
*Explanation: Columns range from 'K' to 'L', rows from 1 to 2. Produce every cell: K1, K2, L1, L2.*

**Example 2:**  
Input: `"A1:B3"`  
Output: `["A1", "A2", "A3", "B1", "B2", "B3"]`  
*Explanation: Columns 'A' and 'B', rows 1, 2, 3. Output all combinations ordered by column, then row.*

**Example 3:**  
Input: `"C3:E4"`  
Output: `["C3", "C4", "D3", "D4", "E3", "E4"]`  
*Explanation: Columns from 'C' to 'E', rows 3 and 4: C3, C4, D3, D4, E3, E4.*

### Thought Process (as if you’re the interviewee)  
- Start by parsing the input string to find the starting and ending columns and rows.
- Convert column letters to their ASCII numeric values to iterate alphabetically from start to end columns.
- Use nested loops: outer loop for columns, inner loop for rows.
- For each pair (column, row), form the cell string (like `"B2"`) and add it to the list.
- Return the completed list of all combinations, sorted as required.
- This brute-force approach is acceptable due to tight range constraints; further optimization is unnecessary.

### Corner cases to consider  
- Range is a single cell (e.g., `"A1:A1"`)—should return that cell only.
- Only one row or only one column provided.
- Columns are adjacent, rows are the same.
- Large differences between row numbers (e.g., `"A1:A100"`), though column will always be one letter.
- Only uppercase English letters for columns, per the problem's constraint.

### Solution

```python
def cellsInRange(s: str) -> list[str]:
    # Extract start and end columns and rows from the format "A1:C2"
    col_start = s[0]
    row_start = int(s[1])
    col_end = s[3]
    row_end = int(s[4])
    res = []
    
    # Iterate columns alphabetically
    for col in range(ord(col_start), ord(col_end) + 1):
        # Iterate rows numerically
        for row in range(row_start, row_end + 1):
            # Compose cell string (e.g., 'B2')
            cell = chr(col) + str(row)
            res.append(cell)
    
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(C × R), where C is the number of columns (col_end - col_start + 1) and R is the number of rows (row_end - row_start + 1), since every combination is generated exactly once.
- **Space Complexity:** O(C × R) for the output list, as one string is stored per cell in the range. Only a fixed number of extra variables are used otherwise.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle double or triple-letter column names (e.g., "AA1:AB2")?
  *Hint: Think about implementing base-26 encoding/decoding for column letters.*
  
- What changes if you must return cell addresses sorted by rows first, then columns?
  *Hint: Swap the nested loop order. Outer for rows, inner for columns.*
  
- If the input includes invalid formats or out-of-bound row/column numbers, what should you do?
  *Hint: Implement input validation and return an error or empty list as needed.*

### Summary
This problem uses a straightforward nested iteration pattern—a flat Cartesian product between the specified column and row ranges. Parsing and character arithmetic allow you to cleanly walk through columns and rows without extra space or complexity. This matrix/combination pattern is common in problems where ranges or 2D grid coordinates must be enumerated, such as chessboard traversal, spreadsheet manipulations, or coordinate-based dynamic programming.


### Flashcard
Parse start/end columns and rows, iterate over all column-row pairs, and output cell names in order.

### Tags
String(#string)

### Similar Problems
- Excel Sheet Column Title(excel-sheet-column-title) (Easy)
- Excel Sheet Column Number(excel-sheet-column-number) (Easy)
- Matrix Cells in Distance Order(matrix-cells-in-distance-order) (Easy)