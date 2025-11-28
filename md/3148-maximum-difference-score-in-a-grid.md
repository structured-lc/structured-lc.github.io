### Leetcode 3148 (Medium): Maximum Difference Score in a Grid [Practice](https://leetcode.com/problems/maximum-difference-score-in-a-grid)

### Description  
Given a 2D grid of integers, you can move from the top-left to the bottom-right cell by repeatedly moving either **right** or **down** as many steps as you want (not limited to adjacent cells).  
The **score** for moving from cell (i₀, j₀) to (i₁, j₁), where i₀ ≤ i₁ and j₀ ≤ j₁, is defined as **grid[i₁][j₁] - grid[i₀][j₀]**, as long as (i₀, j₀) ≠ (i₁, j₁).  
Return the **maximum possible difference score** over all possible movements in the grid, moving in right and/or down directions.

### Examples  

**Example 1:**  
Input: `grid = [[1,2,3],[4,5,1]]`  
Output: `4`  
*Explanation: The optimal path is from grid=1 to grid[1][1]=5, so score = 5 - 1 = 4.*

**Example 2:**  
Input: `grid = [[9,4,2],[3,6,1],[5,8,7]]`  
Output: `7`  
*Explanation: The optimal path is from grid[1]=4 to grid[2][2]=7, so score = 7 - 0 (the minimum on any path to [2,2] is 0, but since all numbers in the given grid are ≥ 1, the best achievable is from [0,1]=4 to [2,2]=7, score = 7-4 = 3. Other combinations may give more, up to 7.*

**Example 3:**  
Input: `grid = [[10,-3,5],[2,7,1],[8,4,11]]`  
Output: `14`  
*Explanation: Moving from grid[1][1]=-3 to grid[2][2]=11 gives score 11-(-3)=14.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every pair of cells (start, end), where end is to the right and/or below start, calculate the score as grid[end] - grid[start]. This approach is O((mn)²), which is not feasible for large grids.

- **How to optimize:**  
  Instead of considering all pairs, notice that for each cell (i, j) as a *destination*, the *minimum* value you could have started from, while reaching (i, j) with only right/down moves, must be somewhere above or to the left (including the current cell itself).  
  - For each cell, maintain the minimum value seen so far on any valid right/down path from (0,0) to (i,j).
  - For each cell, the max score is grid[i][j] - (minimum value from the allowed area above/left of it).
  - Use dynamic programming to fill a DP table, where DP[i][j] is the minimum value on any path to (i,j), defined as:  
     DP[i][j] = min(grid[i][j], DP[i-1][j], DP[i][j-1])  
     - (with careful boundary handling for the first row/col).

- **Trade-offs:**  
  - Using DP, time complexity is O(mn) as each cell looks at only two predecessors.
  - Space can be O(mn) or O(n) if optimized.

### Corner cases to consider  
- Single row or single column grid (edge of the matrix).
- Grid with all equal numbers (so any start/end gives zero score).
- All elements negative, or mixed positive/negative values.
- 1x1 grid (no valid moves; should handle gracefully).
- Large grid (check for overflow or inefficiency).

### Solution

```python
from typing import List

def maxScore(grid: List[List[int]]) -> int:
    m, n = len(grid), len(grid[0])
    # DP table: min value in any path from (0,0) to (i,j)
    minVal = [[0]*n for _ in range(m)]
    
    # Initialize DP
    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0:
                minVal[i][j] = grid[i][j]
            elif i == 0:
                minVal[i][j] = min(minVal[i][j-1], grid[i][j])
            elif j == 0:
                minVal[i][j] = min(minVal[i-1][j], grid[i][j])
            else:
                minVal[i][j] = min(grid[i][j], minVal[i-1][j], minVal[i][j-1])
    
    maxScore = float('-inf')
    for i in range(m):
        for j in range(n):
            # skip (0,0) because can't "move" to itself
            if i == 0 and j == 0:
                continue
            # The minimum "previous" must be from the top or left cell
            prevMin = float('inf')
            if i > 0:
                prevMin = min(prevMin, minVal[i-1][j])
            if j > 0:
                prevMin = min(prevMin, minVal[i][j-1])
            maxScore = max(maxScore, grid[i][j] - prevMin)
    return maxScore
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m and n are dimensions of grid. Each cell is visited a constant number of times.
- **Space Complexity:** O(m × n) for the DP/minVal grid. Can be optimized to O(n) since only previous row is needed, but for clarity/use in interviews, O(m × n) is usually acceptable.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the space usage?
  *Hint: Only previous row/column data is needed at each iteration.*

- What if you could also move diagonally?
  *Hint: Update recurrence to also look at top-left cell (i-1, j-1).*

- Could you return the path achieving the maximum score?
  *Hint: Track parent pointers while building DP to reconstruct the path.*

### Summary
This problem is a classic **DP on grid** question, closely related to matrix prefix problems but requiring propagation of *min* values. The pattern of updating each cell based on top/left (or additional directions if allowed) is common and extends to many 2D DP/grid path problems, such as min path sum, unique paths, and boundary propagation scenarios.


### Flashcard
For each cell (i, j) as destination, track the minimum value reachable from above or left; score = grid[i][j] − min_value_so_far.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Maximum Score From Grid Operations(maximum-score-from-grid-operations) (Hard)