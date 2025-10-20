### Leetcode 289 (Medium): Game of Life [Practice](https://leetcode.com/problems/game-of-life)

### Description  
The **Game of Life** is a simulation played on a 2D grid where each cell is either **alive (1)** or **dead (0)**. On each tick, the board evolves simultaneously according to the following rules for every cell (based on its 8 neighbors: up, down, left, right, and all diagonals):

- A live cell with **fewer than two** live neighbors dies (underpopulation).
- A live cell with **two or three** live neighbors lives on.
- A live cell with **more than three** live neighbors dies (overpopulation).
- A dead cell with **exactly three** live neighbors becomes alive (reproduction).

The goal is to compute the board’s next state in place—each cell must update based on the *original* state of its neighbors, not the intermediate updates.

### Examples  

**Example 1:**  
Input: `[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]`  
Output: `[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]`  
*Explanation: Each cell is updated following the rules. For example, the middle cell in the second row becomes alive because it has 3 live neighbors, etc. See the step-by-step below.*

**Example 2:**  
Input: `[[1,1],[1,0]]`  
Output: `[[1,1],[1,1]]`  
*Explanation: The dead cell at (1,1) has three live neighbors, so it becomes alive. All other cells remain alive.*

**Example 3:**  
Input: `[]`  
Output: `[]`  
*Explanation: Only one cell, which is dead and has no neighbors, so it stays dead.*

### Thought Process (as if you’re the interviewee)  
First, I’d start by simulating, for each cell, how many live neighbors it currently has and then apply the Game of Life rules for state transition.

The *naive* approach is to:
- Scan the board row by row, cell by cell.
- For each cell, count its live neighbors by checking the 8 possible positions.
- Store the next state of the entire board in a new matrix, then copy it back.

However, since the problem requires *updating in place*, we can't overwrite a cell’s state until all neighbor checks that need its original state are done. This means we need a way to distinguish “old” vs. “new” cell states during the sweep.

**Optimized In-Place Approach:**
- Encode changes in-place with temporary states:
    - For a cell **currently alive**, but becoming dead: mark as `-1` (was 1, now 0).
    - For a cell **currently dead**, but becoming alive: mark as `2` (was 0, now 1).
- Then, run another pass to convert all cells to 0 (dead) or 1 (alive) using:  
  `cell = 1 if cell > 0 else 0`.

This lets us check a neighbor’s "original" state using `abs(board[i][j]) == 1`.

### Corner cases to consider  
- Empty board: `[]`
- Board with 1 row or column, e.g. `[[1,0,1]]` or `[[1],,[1]]`
- All cells dead: `[[0,0,0],[0,0,0]]`
- All cells alive: `[[1,1],[1,1]]`
- Edges and corners, since border cells have fewer neighbors
- No cells change (stable configuration)
- Oscillating pattern (“blinkers”)

### Solution

```python
def gameOfLife(board):
    if not board or not board[0]:
        return

    m, n = len(board), len(board[0])

    # All 8 directions: vertical, horizontal, diagonal
    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        ( 0, -1),          ( 0, 1),
        ( 1, -1), ( 1, 0), ( 1, 1)
    ]

    for i in range(m):
        for j in range(n):
            live_neighbors = 0
            for di, dj in directions:
                ni, nj = i + di, j + dj
                if 0 <= ni < m and 0 <= nj < n:
                    # abs > 0 means it was originally alive
                    if abs(board[ni][nj]) == 1:
                        live_neighbors += 1
            # Apply Game of Life rules using in-place markers
            if board[i][j] == 1:
                if live_neighbors < 2 or live_neighbors > 3:
                    board[i][j] = -1  # Was alive, now dead
            else:
                if live_neighbors == 3:
                    board[i][j] = 2   # Was dead, now alive
    # Second pass to finalize new state
    for i in range(m):
        for j in range(n):
            if board[i][j] > 0:
                board[i][j] = 1
            else:
                board[i][j] = 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × 8) = O(mn)  
  For each of the m × n cells, we check up to 8 neighbors; since 8 is constant, this simplifies to O(mn).

- **Space Complexity:** O(1) extra  
  The solution uses only bounded extra space for variables and direction vectors; the board is updated in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you compute the next k generations in place?
  *Hint: Can you always keep updating in place? When would you want to make a copy?*

- Modify the board to return to its initial state after n steps. How would you detect cycles?
  *Hint: Consider encoding state transitions or using hash sets for visited states.*

- How to make it work for an infinite grid?
  *Hint: Use a hash map/dictionary to track only live cells and their neighbors, rather than an explicit, infinite matrix.*

### Summary
This approach leverages **in-place matrix encoding** as a space-efficient simulation pattern for problems where cell state transitions depend on neighbors. The trick of marking state changes with encoded values during an update sweep, then finalizing in a second pass, shows up in several grid or board game simulations and cellular automata. This general pattern of performing in-place updates while retaining access to the original state is broadly applicable in stateful 2D grid problems.


### Flashcard
Use in-place encoding: combine current and next state in single cell (e.g., encode 0→1 as 2, 1→0 as -1) then decode in second pass.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Set Matrix Zeroes(set-matrix-zeroes) (Medium)