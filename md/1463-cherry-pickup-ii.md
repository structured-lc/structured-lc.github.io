### Leetcode 1463 (Hard): Cherry Pickup II [Practice](https://leetcode.com/problems/cherry-pickup-ii)

### Description  
You are given a grid where each cell contains some cherries (non-negative integer). Two robots start on the top row, one at (0, 0) and the other at (0, n‒1). Each robot moves down one row per step. At each step, a robot can move left, right, or stay in the same column (but always must move exactly one row down). When both robots land on the same cell, they only collect the cherries once. Both robots move simultaneously until they reach the bottom row. Find the maximum total cherries that can be collected.

### Examples  

**Example 1:**  
Input: `grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]`  
Output: `24`  
*Explanation: Robot 1 path: 3→5→5→2, Robot 2 path: 1→5→5→1, some overlapping cherries counted only once: 24 collected in total.*

**Example 2:**  
Input: `grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]`  
Output: `28`  
*Explanation: Choose optimal moves for maximum cherries. Multiple crossings possible.*

### Thought Process (as if you’re the interviewee)  
- This is a variant of grid DP with multiple agents (two robots), with shared/overlapping cell constraints.
- At each row, both robots move:** So, state depends on both positions: row, col₁, col₂.**
- DP approach: dp[row][col₁][col₂] = max cherries collected up to this state.
- The recursion considers all possible moves for both robots, to the next row, all three options (left, down, right) for each.
- Overlapping cell: if col₁ == col₂, only count the cherry once.
- Bottom-up or top-down (with memoization) are both viable. To reduce state space, prune with bounds checks.
- Since both robots always move down, there are at most r × c × c states, reasonable for r, c ≤ 70.

### Corner cases to consider  
- Both robots on the same starting or ending cell (must not double-count).
- Some cells have zero cherries.
- Large/sparse grid or maximum number of columns (large DP state space).
- Out-of-bound moves or moving outside left/right bounds.

### Solution

```python
def cherryPickup(grid):
    from functools import lru_cache
    rows, cols = len(grid), len(grid[0])
    
    @lru_cache(None)
    def dp(row, col1, col2):
        # Base case: out of bounds
        if not (0 <= col1 < cols and 0 <= col2 < cols):
            return float('-inf')
        # Pick cherries in current row, both robots
        res = grid[row][col1]
        if col1 != col2:
            res += grid[row][col2]
        # If last row, just return
        if row == rows - 1:
            return res
        # Try all col moves for both robots (−1,0,1)
        max_next = float('-inf')
        for d1 in [-1,0,1]:
            for d2 in [-1,0,1]:
                next_res = dp(row+1, col1+d1, col2+d2)
                if next_res > max_next:
                    max_next = next_res
        return res + max_next
    
    return dp(0, 0, cols-1)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(r × c² × 9): For each state (row, col₁, col₂), we compute up to 9 options. r × c × c overall states.
- **Space Complexity:** O(r × c²) for memoization cache.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you reduce the number of states or optimize further?  
  *Hint: Recognize not all (col₁, col₂) pairs are reachable from start; pruning and iterative DP saves memory.*

- What if there are three or more robots?  
  *Hint: DP state would grow exponentially, unmanageable for more than two robots.*

- How to reconstruct the optimal path for the robots?  
  *Hint: Store parent pointers during DP or rerun the DP to trace back the moves.*

### Summary
This is a classical DP with multiple agents/coordinates on a grid, a strong example of "multi-dimensional state DP" patterns. The state depends on row, col₁, col₂ (robot positions); applies when future state depends on multiple independent agents traversing the same structure.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
