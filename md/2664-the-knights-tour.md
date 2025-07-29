### Leetcode 2664 (Medium): The Knight’s Tour [Practice](https://leetcode.com/problems/the-knights-tour)

### Description  
You are given an n × n chessboard and a knight starts at a specific cell (commonly (0,0)). The knight must visit every cell exactly once using only the valid L-shaped moves (8 directions, just like in chess). Return a board where each cell contains the step number (starting from 0) at which the knight visits it, or -1 if a tour is impossible.

### Examples  

**Example 1:**  
Input: `n=5`  
Output:  
```
 0  5 14  9 20
13  8 19  4 15
18  1  6 21 10
 7 12 23 16  3
24 17  2 11 22
```
*Explanation: The knight starts at (0,0), and the board shows the visiting order for a valid tour.*

**Example 2:**  
Input: `n=3`  
Output: `-1`  
*Explanation: It's impossible for a knight to cover all cells on a 3×3 chessboard without repetition.*

**Example 3:**  
Input: `n=1`  
Output:  
```
0
```
*Explanation: Only one cell exists. The knight does not need to move.*

### Thought Process (as if you’re the interviewee)  
This is a classic **backtracking** (DFS) problem with the chessboard as a grid and the knight's 8 possible moves as state transitions.  

Brute-force would try every possible path, but due to the branching factor (~8 moves per cell), this quickly becomes infeasible for large boards.  
Backtracking is feasible for small n (such as n ≤ 6-8). The approach:  
- At each step, recursively try every possible knight move that lands on an unvisited cell.
- Mark the current cell with the move number.
- If all n×n cells have been visited (move number = n×n-1), we've found a solution.
- If stuck, unmark (backtrack) and try the next possibility.

Optimizations often used include **Warnsdorff's heuristic** (try moves with least onward possibilities first), but for an interview, standard DFS-backtracking is a clean demonstration.

### Corner cases to consider  
- n=1 (just 1 cell, trivial)
- n=2 or 3 (impossible: knight gets stuck early)
- No possible tour from the given starting cell (return -1)
- Multiple solutions (either return any one, or all, as required)

### Solution

```python
# Recursive DFS with backtracking for Knight's Tour

def knights_tour(n):
    # Directions: all 8 possible knight moves
    dirs = [(-2, -1), (-1, -2), (1, -2), (2, -1),
            (2, 1), (1, 2), (-1, 2), (-2, 1)]
    
    board = [[-1 for _ in range(n)] for _ in range(n)]
    found = [False]  # Use a list for mutability in nested scope

    def dfs(x, y, move_num):
        if move_num == n * n:
            found[0] = True
            return True
        
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if 0 <= nx < n and 0 <= ny < n and board[nx][ny] == -1:
                board[nx][ny] = move_num
                if dfs(nx, ny, move_num + 1):
                    return True
                board[nx][ny] = -1  # Backtrack
        return False

    board[0][0] = 0  # Start at (0,0) step 0
    if dfs(0, 0, 1):
        return board
    else:
        return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n²)!) in the worst case, since every move may branch into up to 8 choices, and you must visit all n² cells without revisiting. But practical branching is less due to constraints and dead-ends.
- **Space Complexity:** O(n²) for the board and call stack (maximum depth n² for recursion).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return *all* possible knight’s tours?
  *Hint: Remove the early return on finding one solution; collect results at base case.*

- What if the board is m × n, not necessarily square?
  *Hint: Parameterize both dimensions in the constraints and move logic.*

- How would you optimize the search for larger n?
  *Hint: Use Warnsdorff’s rule — always move to the square with the fewest onward moves next.*

### Summary
This is a **classic backtracking/grid search** problem, much like N Queens and Sudoku, where you explore all options recursively and backtrack on failure. This coding pattern is often used for permutation, arrangement, and unique-path grid puzzles where each state depends on choices and visited constraints.