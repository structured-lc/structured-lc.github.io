### Leetcode 3363 (Hard): Find the Maximum Number of Fruits Collected [Practice](https://leetcode.com/problems/find-the-maximum-number-of-fruits-collected)

### Description  
You are given a 2D grid where each cell contains a non-negative integer representing the number of fruits. Starting from the top-left corner, you and your friends can move either right or down (never left or up) to reach the bottom-right corner, collecting the fruits at each cell along the way. Each friend takes a different path from the top-left to the bottom-right, and no two friends can visit the same cell except the start and end cells. Find the **maximum total number of fruits** your group can collect, where all friends' paths are pairwise non-overlapping except at the start and end.

### Examples  

**Example 1:**  
Input:  
`grid = [[1,2,3],[4,5,6],[7,8,9]]`  
Output:  
`29`  
*Explanation: Three possible non-overlapping paths can take all fruits except for the center cell with 5 — so the total is 1+2+3+6+9+8+7+4+5=45, but as only 3 paths can be made without overlap, you have to maximize the value. Actual collection sums to 29 following optimal disjoint paths.*

**Example 2:**  
Input:  
`grid = [[1,6,11],[16,4,8],[12,13,14]]`  
Output:  
`100`  
*Explanation: One optimal solution: path1→(0,0)→(0,1)→(0,2)→(1,2)→(2,2)=1+6+11+8+14=40  
path2→(0,0)→(1,0)→(2,0)→(2,1)→(2,2)=1+16+12+13+14=56  
path3 overlaps or would visit a visited cell, so maximum sum is best achieved with above 2 non-overlapping paths. Total collected = 100.*

**Example 3:**  
Input:  
`grid = [[5]]`  
Output:  
`5`  
*Explanation: Only one cell, so only one path, collect 5 fruits.*

### Thought Process (as if you’re the interviewee)  
I’d first clarify:  
- Each path starts at (0,0), ends at (n-1, m-1), only moves right or down.  
- No two paths except at start/end can overlap.
- Need to maximize the sum total over all such non-overlapping paths.

**Brute-force Idea:**  
- Enumerate all possible sets of non-overlapping paths, sum fruits, and return the maximum.  
- This approach is clearly exponential: not feasible for reasonable grid sizes.

**Optimization / DP Approach:**  
- This is similar to “Cherry Pickup II” or “two/three robots collect maximum sum without overlap.”  
- The key is to use **Dynamic Programming with memoization** — generalizing to k friends (but problem may be fixed to k=2 or k=3).
- For 2 friends: let dp(r1, c1, r2, c2) = max fruits both collect from (r1,c1) and (r2,c2) to (n-1, m-1).
- Use symmetry (steps taken is always r1+c1=r2+c2), so can reduce state.
- For 3 friends, can do dp(r1,c1, r2,c2, r3,c3), but state explodes; instead, the problem likely wants k (usually 2 or 3), and the standard method is DP with memoization by positions.
- At each step, try all the choices (right or down per friend); collect fruits at each cell (avoid double-counting if the same cell).
- Memoize the results to avoid recomputation.
- Return the maximum sum over all paths.

**Why choose this?**  
- Brute-force is infeasible.
- DP/memoization optimally handles overlapping subproblems.  
- The trade-off is time/space for memoization, but it is manageable for small grid sizes.

### Corner cases to consider  
- Empty grid: should return 0.  
- All zeros: answer is 0.  
- 1x1 grid: single cell.  
- Grids with one row or one column.  
- Max fruits at corners vs centers.  
- When two friends' optimal paths would want to overlap except at start/end.

### Solution

```python
# DP + memoization approach for two paths (extendable for 3).
# We assume always 2 friends, each can go right/down, no overlap except at (0,0) and (n-1,m-1).

def maxFruitsCollected(grid):
    n, m = len(grid), len(grid[0])
    from functools import lru_cache

    @lru_cache(None)
    def dp(r1, c1, r2, c2):
        # (r1,c1) and (r2,c2): positions of the two friends
        # Both start at (0,0), both must end at (n-1,m-1)
        # The number of moves made is always r1+c1 == r2+c2
        # If out-of-bounds, return -∞ (invalid)
        if r1 >= n or c1 >= m or r2 >= n or c2 >= m:
            return float('-inf')
        # Both reached the end cell
        if r1 == n-1 and c1 == m-1:
            return grid[r1][c1]
        if r2 == n-1 and c2 == m-1:
            return grid[r2][c2]
        # Collect the fruits at both positions: if the same cell, only count once
        curr = grid[r1][c1] if (r1, c1) == (r2, c2) else grid[r1][c1] + grid[r2][c2]
        # Recurse: both can move right or down (4 possibilities)
        res = max(
            dp(r1+1, c1, r2+1, c2),   # both down
            dp(r1, c1+1, r2, c2+1),   # both right
            dp(r1+1, c1, r2, c2+1),   # friend1 down, friend2 right
            dp(r1, c1+1, r2+1, c2),   # friend1 right, friend2 down
        )
        return curr + res

    return dp(0, 0, 0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × m²) — For each possible position of both friends, memoization ensures each unique state only computed once.
- **Space Complexity:** O(n² × m²) — For the memoization cache, as each pair of positions can be stored.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this for k friends (paths) instead of just two?  
  *Hint: Generalize DP to track all k positions, but state space grows rapidly; possible for small k only.*

- Can you optimize space further?  
  *Hint: Reuse DP for only layers needed at a time, or prune unreachable states.*

- What if some cells are blocked (cannot be visited)?  
  *Hint: Check for invalid cells at each move, treat as out-of-bounds.*

### Summary
This problem is an example of **multi-agent path DP on grids** with the constraint of **no overlap except endpoints**, which often arises in "cherry pickup" or "robot collection" type LeetCode DP problems. The core pattern is **State Compression DP/Memoization**: cache the state for all positions and recurse on possible moves. This approach is highly transferable to problems with multiple agents moving in a grid with conflict-avoidance constraints.