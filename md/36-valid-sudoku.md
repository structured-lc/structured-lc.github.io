### Leetcode 36 (Medium): Valid Sudoku [Practice](https://leetcode.com/problems/valid-sudoku)

### Description  
Given a *partially-filled* 9×9 Sudoku board (some cells may be empty, denoted by '.'), determine if it is **valid so far** according to classic Sudoku rules:
- Each row contains the digits 1–9 **without repetition**.
- Each column contains the digits 1–9 **without repetition**.
- Each of the nine 3×3 sub-boxes contains the digits 1–9 **without repetition**.
You only need to check the current filled numbers—*the board doesn’t need to be solvable or complete*.

### Examples  

**Example 1:**  
Input:  
```
[["5","3",".",".","7",".",".",".","."],
 ["6",".",".","1","9","5",".",".","."],
 [".","9","8",".",".",".",".","6","."],
 ["8",".",".",".","6",".",".",".","3"],
 ["4",".",".","8",".","3",".",".","1"],
 ["7",".",".",".","2",".",".",".","6"],
 [".","6",".",".",".",".","2","8","."],
 [".",".",".","4","1","9",".",".","5"],
 [".",".",".",".","8",".",".","7","9"]]
```
Output: `True`  
*Explanation: No row, column, or 3×3 box contains duplicate digits among the numbers filled.*

**Example 2:**  
Input:  
```
[["8","3",".",".","7",".",".",".","."],
 ["6",".",".","1","9","5",".",".","."],
 [".","9","8",".",".",".",".","6","."],
 ["8",".",".",".","6",".",".",".","3"],
 ["4",".",".","8",".","3",".",".","1"],
 ["7",".",".",".","2",".",".",".","6"],
 [".","6",".",".",".",".","2","8","."],
 [".",".",".","4","1","9",".",".","5"],
 [".",".",".",".","8",".",".","7","9"]]
```
Output: `False`  
*Explanation: The digit '8' appears twice in the first column and in the first sub-box.*

**Example 3:**  
Input:  
```
[[".",".",".",".",".",".",".",".","."],
 ["1",".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".",".","."]]
```
Output: `True`  
*Explanation: Only one number filled; no duplicates possible anywhere.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** For each filled cell, scan its row, column, and box for duplicates. But that’s repetitive—O(n³) over 9×9 cells is unnecessary.
- **Optimization:** Use sets (hash-tables) to track which digits have been seen per row, per column, and per 3×3 box. For cell (i,j) with value d:
    - If d already exists in row[i], col[j], or box[(i//3, j//3)], it's invalid.
    - Otherwise, add d to those sets.
- **Why this approach:** Scanning all in O(1) for each cell scales better (fewer checks per cell), keeps code concise, and uses extra space for speed.

### Corner cases to consider  
- All cells empty: should return True (no conflicts).
- Only one number filled: valid.
- Duplicates within a single row/column/box.
- Duplicate number only in same row but different columns (still invalid).
- Input with numbers outside '1'-'9' is invalid, but per problem description, guarantee is for proper input.
- Board not fully filled—only partial validation required.

### Solution

```python
def isValidSudoku(board):
    # Use sets to track seen numbers for rows, columns, and boxes
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]  # boxes are indexed as 3*(i//3) + (j//3)

    for i in range(9):
        for j in range(9):
            num = board[i][j]
            if num == '.':
                continue  # skip empty cells

            # Compute box index
            box_idx = 3 * (i // 3) + (j // 3)

            # Check if num is already seen in current row, col, or box
            if num in rows[i]:
                return False
            if num in cols[j]:
                return False
            if num in boxes[box_idx]:
                return False

            # Mark num as seen in row, col, and box
            rows[i].add(num)
            cols[j].add(num)
            boxes[box_idx].add(num)
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) ("constant")—since the board is always 9×9 (fixed size), we have at most 81 cells, each checked at most three times.
- **Space Complexity:** O(1), because each set can hold at most 9 elements (digits), and their overall number is constant for a standard Sudoku.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the board is not always 9×9, but n²×n², with boxes of size n×n?
  *Hint: Adjust your data structures and indices for variable sizes and box partitioning.*

- How would you optimize for memory if the board is very sparse (huge, but mostly empty)?
  *Hint: Use default dicts/set only when a cell is filled, possibly with memory-efficient representations.*

- Can you check validity while reading the board from a stream (cell by cell), not after all is read?
  *Hint: Maintain running state in your sets—possible in one pass.*

### Summary
This problem uses the **"set data structure for duplicate detection" pattern**—commonly applied in validation tasks. It generalizes to row/column/region constraints, applies to any matrix-based uniqueness-check, and is highly interview-relevant. It’s a frequent pattern for puzzles, constraint-checking, and even some graph traversals.