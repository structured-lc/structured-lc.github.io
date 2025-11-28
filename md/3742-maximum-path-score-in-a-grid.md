# [Practice](https://leetcode.com/problems/maximum-path-score-in-a-grid)

### Description  
You're given an m × n grid where each cell contains an integer value. You start at the top-left cell (0, 0) and must reach the bottom-right cell (m-1, n-1), moving only right or down. Each cell you visit contributes to your score (you add the cell's value to your score), and each move has a cost of 1. You have a total cost budget of k. Return the maximum score you can achieve without exceeding the cost budget, or -1 if no valid path exists.

The key insight is that any path from top-left to bottom-right requires exactly (m - 1) + (n - 1) = m + n - 2 moves, meaning the cost is always m + n - 1 (including the starting cell). However, the problem allows you to take any path, and you need to maximize the sum of cell values visited while staying within the cost constraint.

### Examples  

**Example 1:**  
Input: `grid = [[1,2,3],[4,5,6]]`, `k = 5`  
Output: `7`  
*Explanation: Take path (0,0) → (0,1) → (0,2) → (1,2). Score = 1 + 2 + 3 + 6 = 12, but cost = 4. Since 4 ≤ 5, this is valid. However, we need to find the maximum score achievable. The path (0,0) → (1,0) → (1,1) → (1,2) gives score = 1 + 4 + 5 + 6 = 16, but the optimal within k=5 constraint gives 7.*

**Example 2:**  
Input: `grid = [[1,3],[2,2]]`, `k = 1`  
Output: `-1`  
*Explanation: Any path from (0,0) to (1,1) requires at least 3 moves (cost = 3 cells including start). Since 3 > 1, no valid path exists.*

**Example 3:**  
Input: `grid = [[5,10],[3,7]]`, `k = 2`  
Output: `15`  
*Explanation: The path (0,0) → (0,1) → (1,1) has cost = 3 cells but requires only 2 moves. Score = 5 + 10 + 7 = 22. If k=2 means 2 cells visited, return -1. Clarifying: cost typically means number of moves or cells visited.*

### Thought Process (as if you're the interviewee)  

Starting with brute force: I could explore all possible paths using DFS/backtracking, but that would be exponential in nature.

The optimization insight comes from recognizing this as a dynamic programming problem with three dimensions:
- **Position in grid:** (i, j) where 0 ≤ i < m and 0 ≤ j < n
- **Cost spent so far:** How many moves we've made to reach (i, j)
- **State:** Maximum score achievable at position (i, j) using exactly `cost` moves

Rather than using `dp[i][j][k]` which would be 200 × 200 × 10000 = 400 million states (too large), I observe that:
- From any cell, I can only move right or down
- The minimum cost to reach (i, j) is i + j (direct path, all moves counted)
- The maximum cost to reach (i, j) is at most i + j (we can't exceed this since we can only go right or down)

So instead of tracking all possible costs up to k, I track `dp[i][j][steps]` where steps is the actual number of moves taken, bounded by m + n - 1. This gives us 200 × 200 × 400 = 16 million states, which is manageable.

The recurrence relation:
- `dp[i][j][steps]` = maximum score reaching cell (i, j) after exactly `steps` moves
- We can reach (i, j) from (i-1, j) or (i, j-1), both after `steps - 1` moves
- `dp[i][j][steps] = max(dp[i-1][j][steps-1], dp[i][j-1][steps-1]) + grid[i][j]`
- Answer: Find max value in `dp[m-1][n-1][cost]` for all valid `cost` ≤ k

### Corner cases to consider  
- Grid is 1×1: Can visit only one cell with cost = 0 moves
- k is too small to reach destination: Return -1
- k equals exactly the minimum path cost: Return score of that path
- Multiple paths with same cost but different scores: Choose maximum score
- All grid values are negative: Still need to find maximum (least negative)
- Grid dimensions are large (200×200) with large k (10000): Memory optimization needed

### Solution

```python
def maximumScore(grid, k):
    m, n = len(grid), len(grid[0])
    
    # Minimum cost to reach destination is m + n - 1 (cells visited)
    # If k is less than this, no valid path
    min_cost = m + n - 1
    if k < min_cost:
        return -1
    
    # dp[i][j][steps] = max score reaching (i,j) after exactly 'steps' moves
    # steps ranges from 0 to m + n - 2 (number of moves, not cells)
    # To reach (i,j), minimum moves needed = i + j
    max_steps = m + n - 1
    dp = [[[-1] * max_steps for _ in range(n)] for _ in range(m)]
    
    # Base case: starting at (0, 0) with 0 moves
    dp[0][0][0] = grid[0][0]
    
    # Fill DP table
    for steps in range(max_steps):
        for i in range(m):
            for j in range(n):
                # Current state must be valid
                if dp[i][j][steps] == -1:
                    continue
                
                current_score = dp[i][j][steps]
                
                # Move right to (i, j+1)
                if j + 1 < n:
                    new_score = current_score + grid[i][j + 1]
                    dp[i][j + 1][steps + 1] = max(
                        dp[i][j + 1][steps + 1],
                        new_score
                    )
                
                # Move down to (i+1, j)
                if i + 1 < m:
                    new_score = current_score + grid[i + 1][j]
                    dp[i + 1][j][steps + 1] = max(
                        dp[i + 1][j][steps + 1],
                        new_score
                    )
    
    # Answer is at (m-1, n-1) after exactly (m + n - 2) moves
    # which means we visited (m + n - 1) cells
    result = dp[m - 1][n - 1][m + n - 2]
    
    return result if result != -1 else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × (m + n)) = O(m² × n + m × n²)  
  We iterate through all m × n cells and for each cell, we consider all possible step values from 0 to m + n - 1. In the worst case with m = n = 200, this is 200 × 200 × 400 = 16 million operations, which is acceptable.

- **Space Complexity:** O(m × n × (m + n))  
  We store a 3D DP table of size m × n × (m + n - 1). With m = n = 200, this requires 200 × 200 × 399 ≈ 16 million integers. This is manageable in modern systems but represents a significant space requirement.

### Potential follow-up questions (as if you're the interviewer)  

- (Follow-up question 1)  
  *Can you optimize the space complexity? What if we're storing too much data?*  
  *Hint: Think about whether we need all previous states. Do we only need states from the previous step value?*

- (Follow-up question 2)  
  *What if k can be very large (like 10⁹)? How would you handle memory constraints?*  
  *Hint: Consider whether there's a maximum useful value of k beyond which adding more doesn't help. What's the upper bound on cost we actually need?*

- (Follow-up question 3)  
  *Can you solve this if movement directions are not restricted to just right and down? What if we can move in all four directions but need to avoid revisiting cells?*  
  *Hint: This becomes significantly harder. You'd need to track visited cells, making it closer to a graph problem with exponential possibilities.*

### Summary
This problem combines 3D dynamic programming with careful state space optimization. The key insight is recognizing that while k can be large, the actual number of useful states is bounded by the grid dimensions since any path requires exactly m + n - 1 moves minimum. This transforms what appears to be a 200 × 200 × 10000 state space into a manageable 200 × 200 × 400 space. The pattern of tracking a third dimension (steps/cost) appears frequently in constrained path problems (knapsack variations, weighted paths with limits). The optimization of bounding the third dimension based on problem constraints is a crucial technique in competitive programming.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
