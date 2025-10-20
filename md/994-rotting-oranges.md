### Leetcode 994 (Medium): Rotting Oranges [Practice](https://leetcode.com/problems/rotting-oranges)

### Description  
Given a 2D grid representing a box of oranges, each cell can be:
- **0** – empty cell (no orange)
- **1** – fresh orange
- **2** – rotten orange

Every minute, any fresh orange horizontally or vertically adjacent (up, down, left, right) to a rotten orange becomes rotten. The process happens simultaneously for all rotten oranges at each minute. Your task is to return the **minimum number of minutes** required until no fresh orange remains. If it's *impossible* for all oranges to rot (some are unreachable), return **-1** instead.

### Examples  

**Example 1:**  
Input: `[[2,1,1],[1,1,0],[0,1,1]]`  
Output: `4`  
*Explanation: The rot spreads from the top-left. Each minute, all adjacent fresh oranges rot. All are rotten after 4 minutes.*

**Example 2:**  
Input: `[[2,1,1],[0,1,1],[1,0,1]]`  
Output: `-1`  
*Explanation: The orange at (2,0) can never rot because it is isolated by empty cells.*

**Example 3:**  
Input: `[[0,2]]`  
Output: `0`  
*Explanation: There are no fresh oranges to rot, so return 0 immediately.*

### Thought Process (as if you’re the interviewee)  
First, I’d look for a way to simulate the spread of rot minute by minute. A brute-force way would be to repeatedly scan the grid looking for fresh oranges next to rot and updating them, but this is inefficient.

A better way is to recognize this as a **Breadth-First Search (BFS)** problem:
- Treat every rotten orange as a starting point in the BFS.
- For each minute ("layer" of BFS), all fresh oranges adjacent to rotten oranges become rotten at once.
- Count the number of minutes passed as BFS levels.
- Keep track of how many fresh oranges remain. If after the BFS there are any, return -1. Else, the number of minutes elapsed is the answer.

This approach ensures the simulation happens in parallel as required by the problem, and is efficient since each orange is acted on at most once.

### Corner cases to consider  
- The grid contains only empty cells.
- There are no fresh oranges at the start.
- All oranges are already rotten.
- Fresh oranges are completely isolated by empty cells.
- Only one cell (empty, fresh, or rotten).
- Large grid where the process stops before all oranges rot.
- Grid with only 1 row or 1 column.

### Solution

```python
from collections import deque

def orangesRotting(grid):
    # Dimensions
    rows = len(grid)
    cols = len(grid[0])

    # Queue for BFS: store (row, col, minute)
    queue = deque()
    fresh_count = 0

    # Initialize BFS queue with all initial rotten oranges,
    # count fresh oranges
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))
            elif grid[r][c] == 1:
                fresh_count += 1

    # Track elapsed time
    minutes = 0

    # For BFS
    directions = [(-1,0),(1,0),(0,-1),(0,1)]

    while queue:
        r, c, minute = queue.popleft()
        minutes = max(minutes, minute)
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            # Check if neighbor exists and is fresh
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2  # rot it
                fresh_count -= 1
                queue.append((nr, nc, minute + 1))

    # If there are still fresh oranges, impossible to rot all
    if fresh_count > 0:
        return -1
    return minutes
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Each cell is visited at most once (either added to queue when it rots or never needed), and all initial rotten oranges go into the queue at most once.

- **Space Complexity:** O(m × n)  
  The queue can hold up to all cells (worst case), plus the input grid itself.

### Potential follow-up questions (as if you’re the interviewer)  

- What if an orange can rot diagonally as well?
  *Hint: How would your directions vector change to allow all 8 neighbors?*

- What if rotten oranges can "heal" back to fresh after some time?
  *Hint: How would you track the state change and time for each orange?*

- What if you need to reconstruct the sequence of spreads step by step?
  *Hint: Could you maintain an extra structure to record per-minute changes?*

### Summary
This problem is a classic **multi-source BFS** pattern—every rotten orange simultaneously acts as a starting point and spreads its state outwards to neighbors in layers (minutes). Multi-source BFS is broadly useful in grid problems involving simultaneous propagation, spread, or filling, such as shortest-path in unweighted graphs, or simulation of "flood fills", biological/chemical spreads, or even network contagion models.


### Flashcard
Use BFS from all rotten oranges; at each minute, rot adjacent fresh oranges and count minutes until all are rotten or impossible.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Walls and Gates(walls-and-gates) (Medium)
- Battleships in a Board(battleships-in-a-board) (Medium)
- Detonate the Maximum Bombs(detonate-the-maximum-bombs) (Medium)
- Escape the Spreading Fire(escape-the-spreading-fire) (Hard)