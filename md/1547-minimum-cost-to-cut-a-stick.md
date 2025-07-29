### Leetcode 1547 (Hard): Minimum Cost to Cut a Stick [Practice](https://leetcode.com/problems/minimum-cost-to-cut-a-stick)

### Description  
You're given a stick of length `n` and a list of `cuts` (positions along the stick where you can make a cut). Each cut splits the current stick segment, and the *cost* for each cut is equal to the length of the stick being cut at that moment. Return the minimum total cost to perform all the cuts in any order.

### Examples  

**Example 1:**  
Input: `n = 7`, `cuts = [1, 3, 4, 5]`  
Output: `16`  
*Explanation: Cut order: 3, 1, 4, 5. Cutting at 3 costs 7, then 1 at cost 3, then 4 at cost 4, finally 5 at cost 2. Total: 16.*

**Example 2:**  
Input: `n = 9`, `cuts = [5, 6, 1, 4, 2]`  
Output: `22`  
*Explanation: Optimal order may cut at 4 (9), then 2 (4), then 6 (5), etc. Pick order that minimizes cost; total cost is 22.*

**Example 3:**  
Input: `n = 5`, `cuts = [1, 2, 4]`  
Output: `8`  
*Explanation: Order and greedy approach may not be optimal. Must use DP to find lowest cost.*

### Thought Process (as if you’re the interviewee)  
The brute-force way is to try every order to cut the stick, but number of permutations is huge (factorial), so that's impractical.

Instead, use **dynamic programming**: 
- Add 0 and n to the list of cuts, sort it.
- For every segment between two cuts, calculate the minimum cost to cut all required cuts between them.
- dp[i][j] = min cost to cut between cuts[i] and cuts[j], for all possible k (i < k < j, where cut k is placed between i and j):
  - Cost = (cuts[j] - cuts[i]) + dp[i][k] + dp[k][j]
- Build up answers for small segments, then larger ones.

### Corner cases to consider  
- cuts is empty (cost is 0)
- Cuts at endpoints (0 or n)
- Cuts being unsorted
- cuts contains duplicates (depends if allowed)
- Large number of cuts (must check DP runs efficiently)
- cuts includes 1 and n-1 (easiest possible cuts)

### Solution

```python
# DP solution, O(m^3) where m = len(cuts)+2, with memoization

def minCost(n, cuts):
    cuts = sorted(cuts)
    cuts = [0] + cuts + [n]
    m = len(cuts)
    # dp[i][j]: min cost to cut stick between cuts[i] and cuts[j]
    dp = [[0]*m for _ in range(m)]
    for length in range(2, m):  # Intervals of at least length 2
        for i in range(m - length):
            j = i + length
            dp[i][j] = min((cuts[j] - cuts[i] + dp[i][k] + dp[k][j])
                           for k in range(i+1, j))
    return dp[0][m-1]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m³) where m is number of cuts+2, as for each interval we check every possible cut position in between.
- **Space Complexity:** O(m²) for DP table.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the sequence of cuts leading to the minimum cost?  
  *Hint: Store k corresponding to dp[i][j] for reconstruction.*

- What if cuts are added dynamically? (Online version)  
  *Hint: May need a data structure for fast updates; classic DP won't work directly.*

- Can you optimize DP further for space or time?  
  *Hint: Try bottom-up or memoized recursion; perhaps reduce constant factor by not recalculating.*

### Summary
This is a classic **interval DP** problem. The optimal substructure comes from minimizing on every possible first-cut in each segment interval, similar to matrix chain multiplication. Pattern is highly reusable for other interval partitioning problems.