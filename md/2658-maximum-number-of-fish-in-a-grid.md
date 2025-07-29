### Leetcode 2658 (Medium): Maximum Number of Fish in a Grid [Practice](https://leetcode.com/problems/maximum-number-of-fish-in-a-grid)

### Description  
Given a 2D grid representing a fishing area, each cell contains either `0` (land, cannot fish here) or a positive integer (water, contains that many fish). Starting from any **water** cell, you can collect all fish from it and traverse to its directly adjacent (up, down, left, right) water cells, collecting their fish and continuing as long as you move through water. Your goal: **Find the maximal total number of fish that can be collected starting from an optimal starting cell** (i.e., the largest possible sum over any single connected group of water cells).

### Examples  

**Example 1:**  
Input:  
`grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,1,2,0]]`  
Output:  
`7`  
*Explanation: Start at cell (1,0) or (2,0) (both have water and are connected), collect 4+1=5, then connect (0,1)+(0,2)=2+1=3 from top group, but the single largest connected area is (1,0)+(2,0)=5, which isn't as big as the bottom right: (1,3)+(2,3)+(3,2)=3+4+2=9; but none are connected directly! After checking, the largest is (1,3)+(2,3)=3+4=7, which is the max.*

**Example 2:**  
Input:  
`grid = [[1,0,0,0],[0,0,0,0],[0,0,0,1]]`  
Output:  
`1`  
*Explanation: The maximum fish in any connected water region is just a single cell with value 1 (no adjacent water). So the answer is 1.*

**Example 3:**  
Input:  
`grid = [[0,0,0],[0,0,0],[0,0,0]]`  
Output:  
`0`  
*Explanation: There are no water cells at all.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each water cell, try to collect all fish from the connected group it belongs to (using BFS or DFS), marking everything visited. Keep track of the maximum encountered so far.
- To avoid counting the same cells more than once, mark visited cells (set value to 0).
- **Optimized approach:** Since each cell is considered once, use DFS to traverse every connected component and count the total fish, updating the max as you go.
- **Why final approach:** DFS is simple to code, covers all connected groups efficiently, and using the grid itself for “visited” reduces space complexity.

### Corner cases to consider  
- No water cells (grid full of zeroes)  
- Grid has one cell (0 or >0)  
- All fish in one connected group  
- Each water cell isolated, no adjacency  
- Grid has some rows/columns entirely land

### Solution

```python
def findMaxFish(grid):
    rows, cols = len(grid), len(grid[0])
    max_fish = 0

    def dfs(i, j):
        # Out of bounds or already visited/land
        if i < 0 or i >= rows or j < 0 or j >= cols or grid[i][j] == 0:
            return 0
        # Number of fish at this cell
        fish = grid[i][j]
        # Mark as visited
        grid[i][j] = 0
        # Explore neighbors
        fish += dfs(i-1, j)      # up
        fish += dfs(i+1, j)      # down
        fish += dfs(i, j-1)      # left
        fish += dfs(i, j+1)      # right
        return fish

    for i in range(rows):
        for j in range(cols):
            if grid[i][j] > 0:
                max_fish = max(max_fish, dfs(i, j))

    return max_fish
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m and n are grid dimensions. Each cell is visited at most once, traversing each region fully.
- **Space Complexity:** O(m × n) in the worst case due to recursion stack (when grid is all water). No extra storage is used explicitly, but the recursion stack depth can reach O(m × n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if diagonal moves are allowed as well?
  *Hint: Try including all 8 adjacent cells when traversing.*
- Can you solve this non-recursively (i.e., with BFS instead of DFS)?
  *Hint: Use a queue and simulate the same region-exploration with BFS.*
- How would you handle very large grids or avoid recursion stack overflow?
  *Hint: Use iterative DFS/BFS with an explicit stack or queue.*

### Summary
The approach used here is **DFS-based connected components detection** — a common pattern for region counting or traversal in 2D grids. It’s applicable in image processing (finding clusters), maze exploration, “Number of Islands”, and any problem where you must process all connected parts in a matrix/grid. The technique of marking visited nodes directly in the grid is a standard optimization to reduce space and avoid bugs with extra visited sets.