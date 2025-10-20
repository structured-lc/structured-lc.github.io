### Leetcode 1595 (Hard): Minimum Cost to Connect Two Groups of Points [Practice](https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points)

### Description  
You are given two groups of points, `group1` (size m) and `group2` (size n), and a cost matrix `cost` where `cost[i][j]` is the cost to connect `group1[i]` to `group2[j]`. You must **select a subset of connections** so that:
- **Every point in both groups has at least one connection** to a point in the other group
- The total cost is minimized
Return the minimal total cost to achieve this.

### Examples  
**Example 1:**  
Input: `cost = [[15, 96],[36, 2]]`  
Output: `17`  
*Explanation: Connect group1 to group2 (cost=15), group1[1] to group2[1] (cost=2). All points covered.*

**Example 2:**  
Input: `cost = [[1,3,5],[4,1,1],[1,5,3]]`  
Output: `4`  
*Explanation: Example: Connect group1 to group2, group1[1] to group2[1], group1[2] to group2[2], total = 1+1+2 (with the best selection).*

**Example 3:**  
Input: `cost = [[2,5,6],[1,3,4]]`  
Output: `7`  
*Explanation: Optimal to connect group1 to group2[1] and group1[1] to group2 and group2[2] to anyone (min extra connection).*

### Thought Process (as if you’re the interviewee)  
It's a **special assignment problem**. Each group1 point *must* connect to at least one group2, and *vice versa*. This suggests a DP with state to track which group2 points are already connected: use a DP mask (bitmask of group2 size), and for each group1 index, connect it to any group2 point, updating the mask. For the final answer, all bits of group2 mask must be 1 (all connected). Recursively try all options for each group1 point and update minimum cost via memoization (dp[i][mask]). After connecting all group1, any unconnected group2 points must get a direct connection (add minimal available cost). This is a classic bitmask DP.

### Corner cases to consider  
- m != n (one group bigger than other)
- Multiple minimal connections per point
- Very small groups (single point)
- All costs are equal or all costs are different

### Solution

```python
def connectTwoGroups(cost: list[list[int]]) -> int:
    from functools import lru_cache
    m, n = len(cost), len(cost[0])
    @lru_cache(None)
    def dp(i, mask):
        if i == m:
            # All group1 points connected, cover leftover group2 points
            res = 0
            for j in range(n):
                if not (mask & (1 << j)):
                    # Connect j to the min from group1
                    res += min(cost[k][j] for k in range(m))
            return res
        res = float('inf')
        for j in range(n):
            res = min(res, cost[i][j] + dp(i+1, mask | (1<<j)))
        return res
    return dp(0, 0)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n × 2ⁿ) — for each group1 point and group2 mask.
- **Space Complexity:** O(m × 2ⁿ) for the memoization cache.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you optimize for larger n (group2 size)?
  *Hint: Try reduction to min-cost bipartite matching or heuristic approximations.*

- What if you only need to connect all of group1, but not all group2 points?
  *Hint: Adjust the base case of the DP to ignore uncovered group2.*

- Could you reconstruct the selected edges for the solution?
  *Hint: Store path info alongside the DP for path reconstruction.*

### Summary
This is a bitmask DP with assignment/matching flavor, addressing the need to connect all points on both sides. The bitmask combinatorial pattern is very common for 'cover all subsets' and 'assignment' problems, especially when group sizes are small (n ≤ 12).


### Flashcard
Use DP with a bitmask to track connected group2 points; connect each group1 point to any group2, updating mask and cost.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Matrix(#matrix), Bitmask(#bitmask)

### Similar Problems
