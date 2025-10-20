### Leetcode 542 (Medium): 01 Matrix [Practice](https://leetcode.com/problems/01-matrix)

### Description  
Given an m × n binary matrix where each cell is either 0 or 1, compute a matrix of the same shape where each cell contains the shortest distance (in number of up, down, left, or right moves) to the nearest 0. The distance is measured as the number of steps between adjacent cells (Manhattan distance). For every cell that is a 0, its distance is 0. For every cell that is a 1, find its shortest path to any 0.

### Examples  

**Example 1:**  
Input:  
```
mat = [
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
```
Output:  
```
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
```
*Explanation: All zeros remain 0. The only 1 is at (1,1), which is surrounded by zeros at distance 1.*

**Example 2:**  
Input:  
```
mat = [
  [0,0,0],
  [0,1,0],
  [1,1,1]
]
```
Output:  
```
[
  [0,0,0],
  [0,1,0],
  [1,2,1]
]
```
*Explanation: All zeros remain 0. The ones in the last row are at distances 1, 2, and 1 from the nearest 0.*

**Example 3:**  
Input:  
```
mat = [
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
```
Output:  
```
[
  [2,1,2],
  [1,0,1],
  [2,1,2]
]
```
*Explanation: The central 0 spreads distance outward to its neighbors in all four directions, increasing by 1 for each step.*

### Thought Process (as if you’re the interviewee)  

- Start with brute-force:  
  For each cell containing 1, search for the nearest 0 using BFS. For each such cell, the BFS could visit almost every cell, leading to O((m×n)²) time. This is not feasible for large matrices.

- Optimization:  
  Instead of running BFS from every 1, treat all 0s as sources and perform a multi-source BFS:
    - Add the positions of all 0s to the BFS queue.
    - For each cell in the queue, check its neighbors (up, down, left, right).
    - If a neighbor's value is greater than the current cell's distance + 1, update it and add to queue.
  This approach ensures every cell is visited at most once, and each update reflects the shortest distance to a 0.

- Dynamic Programming (alternative):  
  Sweep through the matrix twice:
    - First pass (top-left to bottom-right): For each cell, update its value based on the left and top cells.
    - Second pass (bottom-right to top-left): Update based on right and bottom cells.
  This fills in the minimal distances in O(m×n) time and is a valid alternative.

- Chose BFS approach as it's conceptually straightforward and ensures optimal propagation from all zero sources simultaneously.

### Corner cases to consider  
- Empty matrix.
- Matrix with only one cell (0 or 1).
- Matrix with no zeros (specify output should stay as a large number or specific value?).
- Matrix with no ones (all distances = 0).
- Large, skinny or flat matrices (e.g., 1×N or M×1).
- Zeros only on one side or corner.

### Solution

```python
from collections import deque

def updateMatrix(mat):
    m, n = len(mat), len(mat[0])
    queue = deque()
    
    # Prepare the queue with all positions of 0 and mark 1s as unvisited (-1)
    for i in range(m):
        for j in range(n):
            if mat[i][j] == 0:
                queue.append((i, j))
            else:
                mat[i][j] = -1  # Mark as unvisited
    
    dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    
    # Multi-source BFS
    while queue:
        x, y = queue.popleft()
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            # If in bounds and the neighbor hasn't been assigned yet
            if 0 <= nx < m and 0 <= ny < n and mat[nx][ny] == -1:
                mat[nx][ny] = mat[x][y] + 1
                queue.append((nx, ny))
    
    return mat
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n), since each cell is handled at most once and each operation is O(1).
- **Space Complexity:** O(m×n), due to the queue storing up to m×n elements in the worst case (for matrices with mostly 1s).

### Potential follow-up questions (as if you’re the interviewer)  

- What if diagonal moves are allowed?  
  *Hint: How would directions vector change and affect distance calculations?*

- Can you solve it in-place without extra space?  
  *Hint: Explore minimal marking to differentiate between levels.*

- How to handle extremely large input matrices efficiently (memory constraints)?  
  *Hint: Could you process or stream data row-wise/column-wise?*

### Summary
This problem uses **multi-source BFS** to efficiently propagate the minimal distance from all zero cells to the rest of the cells, updating the distances layer by layer in O(m×n) time. The approach leverages a common matrix/graph traversal pattern that also appears in shortest path and "flood-fill" type problems. Similar patterns are found in solving **word ladder**, **rotting oranges**, and **nearest exit in a maze** problems.


### Flashcard
Multi-source BFS from all 0s propagates minimum distances to 1s efficiently, avoiding per-1 BFS.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Shortest Path to Get Food(shortest-path-to-get-food) (Medium)
- Minimum Operations to Remove Adjacent Ones in Matrix(minimum-operations-to-remove-adjacent-ones-in-matrix) (Hard)
- Difference Between Ones and Zeros in Row and Column(difference-between-ones-and-zeros-in-row-and-column) (Medium)