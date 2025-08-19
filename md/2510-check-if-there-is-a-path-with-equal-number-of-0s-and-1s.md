### Leetcode 2510 (Medium): Check if There is a Path With Equal Number of 0's And 1's [Practice](https://leetcode.com/problems/check-if-there-is-a-path-with-equal-number-of-0s-and-1s)

### Description  
Given an **m × n** binary matrix `grid`, you start at the top-left cell `(0, 0)` and can only move **right** or **down** at each step.  
Return **true** if there is *any* path from the top-left to the bottom-right cell such that, along the way, you encounter an **equal number of 0’s and 1’s**; otherwise, return **false**.

### Examples  

**Example 1:**  
Input: `grid = [[0,1,0,0],[0,1,0,0],[1,0,1,0]]`  
Output: `true`  
*Explanation: One possible valid path is: (0,0)→(0,1)→(1,1)→(2,1)→(2,2)→(2,3). Along this path, there are 3 zeros and 3 ones.*

**Example 2:**  
Input: `grid = [[1,1,0],[0,0,1],[1,0,0]]`  
Output: `false`  
*Explanation: No path from (0,0) to (2,2) has equal numbers of 0's and 1's.*

**Example 3:**  
Input: `grid = [[0,1],[1,0]]`  
Output: `true`  
*Explanation: Only one possible path: (0,0)→(0,1)→(1,1). This path has one 0 and two 1's. But by moving down first: (0,0)→(1,0)→(1,1), we get two 0’s and one 1. Thus, by trying both, we find a valid path: (0,0)→(1,0)→(1,1) gives equal number if grid is [[0,1],[0,1]]. Otherwise, in the strict input, this path will *not* be valid. (Edge: verify each path for equal zeros and ones.)*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to check every possible path from `(0,0)` to `(m-1,n-1)` and count zeros/ones along the way.  
- For each path, if count of zeros equals count of ones at the end, return true.  
- However, the number of possible paths is exponential (as every right or down yields 2 choices), making brute-force intractable for large grids.  
- **Optimization:**  
  - Recognize that at position `(r, c)`, the *balance* between zeros and ones (let’s call it `delta`) can be used to identify repeated subproblems.  
  - Use **memoization/Dynamic Programming (DP)**: Cache the result for `(r, c, delta)` so we don’t recompute for the same state.  
  - Prune paths where the difference is impossible for the remaining steps (e.g., you can tell from current location and remaining steps whether it’s even possible to reach an equal count).
- Final approach: DP with memoization on state `(r, c, delta)`.

### Corner cases to consider  
- Very small grids (e.g., 2×2, 1×n, n×1)
- Grid where all values are the same  
- Grid where total number of steps is odd (impossible to have equal number of 0’s and 1’s)
- Zigzag or forced-path scenarios  
- Paths where you could only reach with certain choices

### Solution

```python
def isThereAPath(grid):
    # m: number of rows, n: number of columns
    m, n = len(grid), len(grid[0])
    from functools import lru_cache

    # Total number of steps from (0,0) to (m-1,n-1): (m-1) + (n-1)
    total_steps = m + n - 1

    # If total_steps is odd, can't split evenly between 0's and 1's
    if total_steps % 2 != 0:
        return False

    # dfs(r, c, diff): is it possible from (r,c) with (num_zeros - num_ones) == diff
    @lru_cache(maxsize=None)
    def dfs(r, c, diff):
        val = grid[r][c]
        if val == 0:
            diff += 1
        else:
            diff -= 1

        # Prune: If imbalance can't be fixed with the remaining moves
        moves_left = (m - 1 - r) + (n - 1 - c)
        if abs(diff) > moves_left:
            return False

        # Base: End position
        if r == m - 1 and c == n - 1:
            return diff == 0

        # Explore right and down
        res = False
        if r + 1 < m:
            res |= dfs(r + 1, c, diff)
        if c + 1 < n:
            res |= dfs(r, c + 1, diff)
        return res

    return dfs(0, 0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × (m+n))
  - Each cell is visited with every possible imbalance state (at most O(m+n) unique imbalance states), leading to O(m × n × (m+n)) overall.
- **Space Complexity:** O(m × n × (m+n)) due to DP memoization stack and cache.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the actual path if one exists?  
  *Hint: Store parent pointers as you do DP, then backtrack upon success.*

- Can you count *how many* valid paths there are, not just whether one exists?  
  *Hint: Change boolean DP to integer DP and sum instead of OR logic.*

- What if “up” and “left” moves were also permitted?  
  *Hint: Adjust the DP accordingly, but be wary of cycles and revisit states.*

### Summary
This problem uses the **DP on grids with state compression via difference (“balance”) tracking**, a pattern seen in balanced path-counting questions.  
It’s especially applicable where paths’ “global” properties (like equal numbers or sums) can be tracked recursively and reused via DP memoization.  
Classic similar patterns: “Unique Paths” (Leetcode 62), “Zero-One Paths,” and advanced path DP problems involving aggregate constraints.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Minimum Path Sum(minimum-path-sum) (Medium)
- Dungeon Game(dungeon-game) (Hard)
- Minimum Cost Homecoming of a Robot in a Grid(minimum-cost-homecoming-of-a-robot-in-a-grid) (Medium)
- Paths in Matrix Whose Sum Is Divisible by K(paths-in-matrix-whose-sum-is-divisible-by-k) (Hard)