### Leetcode 37 (Hard): Sudoku Solver [Practice](https://leetcode.com/problems/sudoku-solver)

### Description  
Given a partially filled 9 × 9 Sudoku board, fill the empty cells so that every row, column, and each of the nine 3 × 3 sub-boxes contains each digit from 1 to 9 exactly once. Empty cells are represented by the character '.'.

You are to modify the board in-place. A valid solution is always guaranteed.

### Examples  

**Example 1:**  
Input:  
```
[
  ['5','3','.','.','7','.','.','.','.'],
  ['6','.','.','1','9','5','.','.','.'],
  ['.','9','8','.','.','.','.','6','.'],
  ['8','.','.','.','6','.','.','.','3'],
  ['4','.','.','8','.','3','.','.','1'],
  ['7','.','.','.','2','.','.','.','6'],
  ['.','6','.','.','.','.','2','8','.'],
  ['.','.','.','4','1','9','.','.','5'],
  ['.','.','.','.','8','.','.','7','9']
]
```
Output:  
```
[
  ['5','3','4','6','7','8','9','1','2'],
  ['6','7','2','1','9','5','3','4','8'],
  ['1','9','8','3','4','2','5','6','7'],
  ['8','5','9','7','6','1','4','2','3'],
  ['4','2','6','8','5','3','7','9','1'],
  ['7','1','3','9','2','4','8','5','6'],
  ['9','6','1','5','3','7','2','8','4'],
  ['2','8','7','4','1','9','6','3','5'],
  ['3','4','5','2','8','6','1','7','9']
]
```
*Explanation: Fill the grid row-by-row, column-by-column, recursively undoing if a collision is detected, until each row, column, and 3×3 sub-box contains 1–9 exactly once.*

**Example 2:**  
Input:  
```
[
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.']
]
```
Output: (not shown; too many possibilities, but the recursive search will fill all cells with digits 1–9 such that Sudoku constraints are satisfied)
*Explanation: Tries all possibilities and backtracks on constraint violations, eventually outputting a valid completed board.*

**Example 3:**  
Input:  
```
[
  ['1','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','1','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.'],
  ['.','.','.','.','.','.','.','.','.']
]
```
Output: (No solution, but the problem guarantees valid input.)
*Explanation: Input is invalid since '1' is repeated in a sub-box, but you are guaranteed to get valid boards per the constraints.*

### Thought Process (as if you’re the interviewee)  
The most straightforward approach is to use **backtracking**. Iterate cell-by-cell; for each empty cell, attempt digits 1–9:
- If the current digit does not already exist in the corresponding row, column, or 3×3 box, place it and move to the next cell recursively.
- If a contradiction arises (cannot place any digit), *backtrack* and reset the cell to '.'.
- The base case is when all cells are filled (end of board).

For efficiency, I’d keep extra sets or boolean arrays to quickly check which digits are already present in each row, column, and block (avoiding repeated O(n) scans).

This backtracking pattern efficiently prunes the search space and is the de facto method for constraint-satisfaction problems on grids, like Sudoku.

### Corner cases to consider  
- The board is already solved.
- Only one cell is empty.
- The board is almost empty (e.g. all cells empty except one).
- The minimum number of clues (17 for classic Sudoku).
- All cells empty (multiple solutions possible, but problem guarantees unique solution).

### Solution

```python
def solveSudoku(board):
    """
    Modify board in-place to a solved state.
    """
    def could_place(d, row, col):
        box_idx = (row // 3) * 3 + col // 3
        return not (d in rows[row] or d in cols[col] or d in boxes[box_idx])
    
    def place_number(d, row, col):
        board[row][col] = d
        rows[row].add(d)
        cols[col].add(d)
        boxes[(row // 3) * 3 + col // 3].add(d)
        
    def remove_number(d, row, col):
        board[row][col] = '.'
        rows[row].remove(d)
        cols[col].remove(d)
        boxes[(row // 3) * 3 + col // 3].remove(d)
        
    def place_next_numbers(row, col):
        if row == 8 and col == 8:
            self.solved = True
        else:
            if col == 8:
                backtrack(row + 1, 0)
            else:
                backtrack(row, col + 1)
        
    def backtrack(row=0, col=0):
        if board[row][col] == '.':
            for d in map(str, range(1, 10)):
                if could_place(d, row, col):
                    place_number(d, row, col)
                    place_next_numbers(row, col)
                    if not self.solved:
                        remove_number(d, row, col)
            # If no valid number is found, recursion will backtrack automatically
        else:
            place_next_numbers(row, col)
    
    # Prepare state - helpers to keep track of what is used
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    for i in range(9):
        for j in range(9):
            if board[i][j] != '.':
                d = board[i][j]
                rows[i].add(d)
                cols[j].add(d)
                boxes[(i // 3) * 3 + j // 3].add(d)
    self = type('', (), {})()  # dummy object for nonlocal `solved` flag
    self.solved = False
    backtrack()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(9⁸²). In the worst case (all cells empty), each cell could take up to 9 attempts, so in the absolute worst, 9 to the 81. However, most puzzles get solved far quicker due to constraint pruning.
- **Space Complexity:** O(1). Board, and row/col/box trackers are all fixed size (9 × 9). Max function call stack depth is 81 (the whole grid).

### Potential follow-up questions (as if you’re the interviewer)  

- How do you speed up the solver for harder puzzles?  
  *Hint: Apply constraint propagation, use heuristics like minimum remaining value (MRV), order cells by number of possible candidates.*

- How would you adapt the code for boards of different sizes (e.g. 16×16 hexadoku)?  
  *Hint: Parameterize locations and candidate digit generators; use variable-size row/col/box trackers.*

- How would you modify your code to generate a random valid Sudoku puzzle?  
  *Hint: Fill board using backtracking, then randomly erase cells while ensuring unique solvability after every removal.*

### Summary
This problem is a classic example of the **Backtracking / DFS** technique on grids—recursively attempting possible options and backtracking on constraint violations. The pattern is used widely in puzzles, combinatorial search, and constraint satisfaction, including N-Queens, crosswords, and many board fill-in tasks. Tracking used values in sets/arrays is a frequent optimization.