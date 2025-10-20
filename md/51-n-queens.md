### Leetcode 51 (Hard): N-Queens [Practice](https://leetcode.com/problems/n-queens)

### Description  
Given an integer n, place n queens on an n × n chessboard so that no two queens threaten each other. Return all possible distinct solutions.  
- A queen can attack horizontally, vertically, and diagonally.  
- Each solution should be represented as a list of length-n strings, where `'Q'` represents a queen and `'.'` an empty square.  
- The constraint is 1 ≤ n ≤ 9. For n < 4 (except n = 1), no valid solution exists, as queens will always threaten each other.  

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`  
Explanation: There are 2 valid ways to arrange 4 queens:
```
. Q . .      . . Q .
. . . Q      Q . . .
Q . . .      . . . Q
. . Q .      . Q . .
```
No two queens are attacking each other.

**Example 2:**  
Input: `n = 1`  
Output: `[["Q"]]`  
Explanation: Only one spot for the queen, so the answer is a single 1×1 board with a queen.

**Example 3:**  
Input: `n = 2`  
Output: `[]`  
Explanation: No way to arrange 2 queens so they do not attack each other — all combinations can be attacked.

### Thought Process (as if you’re the interviewee)  
Start by considering brute-force: try all possible placements for n queens on n rows, ensuring that no two queens share a row, column, or diagonal. For each row, attempt to place a queen in every column, backtracking if a placement causes a conflict.  
To optimize:
- Use backtracking to avoid exploring invalid partial solutions.
- Track which columns (`cols`), main diagonals (\ row − col \), and anti-diagonals (row + col) are already occupied.
- At every step, check the three constraints: column, main diagonal, anti-diagonal.
This allows placing queens row by row (or column by column), pruning invalid placements early.  
Trade-offs: This approach has exponential time in n, but is efficient enough for n ≤ 9. Bitmasking can speed up sets, but is not necessary unless for further optimization.

### Corner cases to consider  
- n = 1 (Trivial: one cell)
- n = 2 and n = 3 (No solution edge cases)
- Input at limits (n = 9, maximum board)
- Empty board or zero input (not in the problem constraints)

### Solution

```python
def solveNQueens(n):
    # Helper function to generate the board from current 'queens' positions
    def make_board(queens):
        board = []
        for col in queens:
            row = ['.'] * n
            row[col] = 'Q'
            board.append("".join(row))
        return board

    def backtrack(row=0, cols=set(), diag1=set(), diag2=set(), queens=[]):
        if row == n:
            result.append(make_board(queens))
            return
        for col in range(n):
            if col in cols or (row - col) in diag1 or (row + col) in diag2:
                continue
            # Place queen
            backtrack(
                row + 1,
                cols | {col},
                diag1 | {row - col},
                diag2 | {row + col},
                queens + [col]
            )

    result = []
    backtrack()
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n!) in the worst case, as each queen must be placed in a different row and column, but pruning with diagonals greatly cuts the actual runtime.
- **Space Complexity:** O(n² × #solutions) for output (each board is n rows of n), plus O(n) for the recursion stack and up to O(n) for tracking constraints.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you count just the number of solutions instead of returning all of them?  
  *Hint: Modify the recursion to count leaves without storing the full solution boards.*

- Can you optimize memory usage for tracking columns and diagonals?
  *Hint: Try bitmasking for sets when n is small.*

- What changes if we allow additional obstacles or blocked squares?  
  *Hint: Prune possible positions as you go based on obstacles.*

### Summary
This problem demonstrates classic **backtracking** with state tracking: the decision tree is pruned based on constraint violations (no sharing row, column, or diagonal). This is a common technique used in constraint satisfaction problems, permutations, and combinations. The pattern is highly reusable, for example in Sudoku, and problems involving unique arrangements under constraints.


### Flashcard
Use backtracking with sets or bitmasks to track columns and diagonals, placing one queen per row and pruning invalid placements early.

### Tags
Array(#array), Backtracking(#backtracking)

### Similar Problems
- N-Queens II(n-queens-ii) (Hard)
- Grid Illumination(grid-illumination) (Hard)