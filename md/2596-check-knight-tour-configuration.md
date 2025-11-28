### Leetcode 2596 (Medium): Check Knight Tour Configuration [Practice](https://leetcode.com/problems/check-knight-tour-configuration)

### Description  
Given an n ✕ n chessboard, you have a 2D integer grid where each cell contains a distinct number from 0 to n²-1. The value in grid[row][col] tells you at what step (0-indexed) the knight visited this cell—starting at cell 0, and visiting every other cell exactly once, in the given order. A knight moves in 'L' shapes: two in one direction, one in the other (eight possibilities). Return true if the sequence of numbers in the grid forms a valid knight's tour that starts at the top-left (0,0) and follows only valid knight moves to visit every cell exactly once, otherwise false.

### Examples  

**Example 1:**  
Input: `grid = [[0,11,16,5,20],[17,4,19,10,1],[12,7,22,15,6],[3,18,9,8,21],[24,13,2,23,14]]`  
Output: `true`  
*Explanation: Starting from grid = 0, the knight moves in a valid sequence—each move from step iᵗʰ to (i+1)ᵗʰ is a legal knight move, and all cells are visited once. Below is the visit order as a grid:*

```
 0 11 16  5 20
17  4 19 10  1
12  7 22 15  6
 3 18  9  8 21
24 13  2 23 14
```

**Example 2:**  
Input: `grid = [[0,3,6],[5,8,1],[2,7,4]]`  
Output: `false`  
*Explanation: The knight move from grid[1]=3 to grid[2]=6 is not legal.*

**Example 3:**  
Input: `grid = [[0,1,2],[3,4,5],[6,7,8]]`  
Output: `false`  
*Explanation: The "path" just walks from left to right, not following knight moves at all.*

### Thought Process (as if you’re the interviewee)  
My first idea is to reconstruct the knight’s tour path: for step k in 0 to n²-1, map which cell (r,c) was kᵗʰ in the tour. Then—starting from the cell with 0—check each transition in the visit sequence: is it a valid knight move?  
Brute-force: For each step, scan to find the coordinates. But that’s O(n²) per check—too slow.  
Optimization: Build a mapping from each visit index (0…n²-1) to grid cell, so lookup is O(1) per move.  
For each adjacent step, check that the move (dx, dy) is a valid knight move (|dx|, |dy|) ∈ {(1,2), (2,1)}.  
If every step checks out, return true. Otherwise, false.  
This approach is efficient, leverages precomputation, and directly checks the knight's move constraints.

### Corner cases to consider  
- 1 ✕ 1 grid — only one cell, always true  
- 2 ✕ 2 grid (or any n < 5 without valid knight’s tour)  
- Multiple cells with missing step indices  
- Cells visited out of order, duplicated, or skipped  
- Moves that don’t follow knight rules (wrong dx/dy)  
- Grid does not start at (0,0), i.e., grid ≠ 0  
- Non-square input grid or not all visit indices present

### Solution

```python
def checkValidGrid(grid):
    n = len(grid)
    total = n * n
    # position[k] = (row, col) where kth step was taken
    position = [None] * total
    for r in range(n):
        for c in range(n):
            k = grid[r][c]
            # Early check: all indices must be present
            if not (0 <= k < total):
                return False
            position[k] = (r, c)

    # Make sure first move starts at (0,0)
    if position[0] != (0,0):
        return False

    # Moves for knight: (dx, dy) where (|dx|, |dy|) = (1,2) or (2,1)
    knight_moves = {(1,2), (2,1)}
    for i in range(1, total):
        r1, c1 = position[i-1]
        r2, c2 = position[i]
        dx = abs(r2 - r1)
        dy = abs(c2 - c1)
        if (dx, dy) not in knight_moves:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  We scan each cell once to map positions (O(n²)), then check each transition (O(n²)), so total O(n²).

- **Space Complexity:** O(n²).  
  The mapping from step index to position takes O(n²) space. No extra recursion or DFS stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generate a knight's tour path for a given n?  
  *Hint: Backtracking, Warnsdorff’s rule heuristic, DFS with pruning.*

- Can you handle knight's tour problems on non-square or irregular boards?  
  *Hint: Generalize logic to boards of shape m × n, variable moves.*

- Can you count the number of valid knight tours for a small board?  
  *Hint: Use DFS/backtracking, avoid revisiting cells, possibly with memoization.*

### Summary
We simulate and check every knight move by mapping each visit step to a board position, then verify the legal knight moves between them. This is a classic board simulation problem and a direct application of path reconstruction/checking. The coding pattern is mapping indices to positions with array lookups for constant-time checks—useful for validating movement sequences and problems that map step order to positions, such as validating Hamiltonian paths/cycles, robot movement paths, or sequence games.


### Flashcard
Build index-to-cell mapping; validate each consecutive step in the tour is a valid knight move (±2, ±1) or (±1, ±2).

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Minimum Knight Moves(minimum-knight-moves) (Medium)
- Maximum Number of Moves to Kill All Pawns(maximum-number-of-moves-to-kill-all-pawns) (Hard)