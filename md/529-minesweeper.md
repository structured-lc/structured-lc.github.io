### Leetcode 529 (Medium): Minesweeper [Practice](https://leetcode.com/problems/minesweeper)

### Description  
You’re given a 2D board representing a Minesweeper game, where each cell is either:
- 'M': unrevealed mine,
- 'E': unrevealed empty cell,
- 'B': revealed blank (no adjacent mines),
- '1'-'8': revealed cell with 1-8 adjacent mines.
Given a click position `[row, col]`, update the board according to these rules:
- If a mine ('M') is clicked, change it to 'X' and return the board (game over).
- If an empty cell ('E') is clicked, reveal it:
  - If it has adjacent mines, it shows the count ('1'-'8').
  - If no adjacent mines, change to 'B' and recursively reveal all eight neighbors.
Return the updated board.

### Examples  

**Example 1:**  
Input:  
board =  
```
[['E', 'E', 'E'],
 ['E', 'E', 'M'],
 ['E', 'E', 'E']]
click = [0, 0]
```
Output:  
```
[['B', '1', 'E'],
 ['B', '1', 'M'],
 ['B', '1', '1']]
```
*Explanation: Clicking at (0,0): This cell has no adjacent mines, so it is set to 'B' and its neighbors are revealed. Those with one adjacent mine are set to '1'. Cells adjacent to mines aren't expanded further.*

**Example 2:**  
Input:  
board =  
```
[['B', '1', 'E', '1', 'B'],
 ['B', '1', 'M', '1', 'B'],
 ['B', '1', '1', '1', 'B'],
 ['B', 'B', 'B', 'B', 'B']]
click = [1, 2]
```
Output:  
```
[['B', '1', 'E', '1', 'B'],
 ['B', '1', 'X', '1', 'B'],
 ['B', '1', '1', '1', 'B'],
 ['B', 'B', 'B', 'B', 'B']]
```
*Explanation: Clicking the mine at (1,2) reveals it as 'X', ending the game immediately.*

**Example 3:**  
Input:  
board =  
```
[['E']]
click = [0, 0]
```
Output:  
```
[['B']]
```
*Explanation: One single cell, empty. Clicking it reveals a blank.*

### Thought Process (as if you’re the interviewee)  
Treat each grid cell as a node in a graph. The main challenge is expanding revealed cells in all eight directions when there are no adjacent mines, similar to a flood fill.

Brute-force idea:  
- On click, if 'M', set to 'X' and return.
- If 'E', recursively check the number of adjacent mines for that cell.
  - If zero, set to 'B' and recursively expand to all neighbors.
  - If nonzero, set to the digit.

DFS is well-suited because you reveal "clusters" of blank spaces recursively, and want to process each connected group exactly once. BFS is also viable and can prevent stack overflow on large boards.

I would use DFS, explicitly marking visited cells by updating the board in-place to avoid cycles and redundant work.

### Corner cases to consider  
- Board with only one cell ('M' or 'E').
- Clicking on a cell that's already revealed ('B' or digit).
- Clicking on a mine at the first move.
- Clusters of blank cells (no adjacent mines) to ensure all get revealed.
- Edges and corners of the board.
- Board with maximum size (50×50).

### Solution

```python
def updateBoard(board, click):
    rows, cols = len(board), len(board[0])
    r, c = click

    # Directions for all 8 neighbors
    directions = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]

    def count_mines(x, y):
        cnt = 0
        for dx, dy in directions:
            nx, ny = x+dx, y+dy
            if 0 <= nx < rows and 0 <= ny < cols:
                if board[nx][ny] == 'M':
                    cnt += 1
        return cnt

    def dfs(x, y):
        if board[x][y] != 'E':
            return
        mines = count_mines(x, y)
        if mines > 0:
            board[x][y] = str(mines)
        else:
            board[x][y] = 'B'
            for dx, dy in directions:
                nx, ny = x+dx, y+dy
                if 0 <= nx < rows and 0 <= ny < cols:
                    dfs(nx, ny)

    # Start with the clicked cell
    if board[r][c] == 'M':
        board[r][c] = 'X'
    else:
        dfs(r, c)
    return board
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n) where m, n are dimensions of the board. In the worst case, every cell is explored once (when all are empty).
- **Space Complexity:** O(m × n) in the worst case due to the recursion stack (for DFS), especially for large blank regions.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you avoid stack overflow for very large and blank boards?
  *Hint: Can you use BFS with a queue instead of recursion?*

- What if revealing a cell with a nonzero count should not reveal its neighbors?  
  *Hint: Be careful about only expanding on zero adjacent mines.*

- Can you generalize for arbitrary neighbor rules (e.g., hex grids instead of square)?  
  *Hint: List all directions/adjacency based on the given geometry.*

### Summary
This problem is a classic **DFS/BFS flood fill** on grids, similar to paint fill or island expansion. The key is to properly manage recursion and in-place board updates to avoid revisiting. The pattern applies to image fill, island counting, and region expansion in grid-based puzzles.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Detonate the Maximum Bombs(detonate-the-maximum-bombs) (Medium)