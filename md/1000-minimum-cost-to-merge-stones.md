### Leetcode 1000 (Hard): Minimum Cost to Merge Stones [Practice](https://leetcode.com/problems/minimum-cost-to-merge-stones)

### Description  
You are given an array where each element represents a pile of stones. In one move, you can merge exactly **K** consecutive piles into a single pile, and the cost of this move is the total number of stones in those K piles. Your goal is to merge all piles into one in the minimum total cost, but **you can only merge exactly K piles at a time**. If it’s impossible to end up with just one pile using these moves, return -1.

### Examples  

**Example 1:**  
Input: `stones = [3,2,4,1]`, `K = 2`  
Output: `20`  
*Explanation:*
- Merge [3,2] → [5,4,1], cost = 5
- Merge [4,1] → [5,5], cost = 5
- Merge [5,5] → , cost = 10  
Total cost = 5 + 5 + 10 = 20

**Example 2:**  
Input: `stones = [3,2,4,1]`, `K = 3`  
Output: `-1`  
*Explanation:* After any merge operation, you’ll have 2 piles left, which is not enough to merge (need 3 for a merge). Merging all piles into one is impossible.

**Example 3:**  
Input: `stones = [3,5,1,2,6]`, `K = 3`  
Output: `25`  
*Explanation:*
- Merge [5,1,2] → [3,8,6], cost = 8
- Merge [3,8,6] → , cost = 17  
Total cost = 8 + 17 = 25

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible sequence of merges by picking K consecutive piles each time. Way too slow: exponential time.
- **Need for DP:** The order of merges and subproblems overlap, so Dynamic Programming is a good fit.
- **Define subproblem:** Let `dp[i][j][k]` represent the minimum cost to merge stones from index i to j into k piles.
- **Transitions:** To merge `[i, j]` into one pile, you must first merge them into K piles, then merge these into 1 pile. For merging into s piles (s > 1), split at various midpoints and combine DP results.
- **Base cases:** If (j-i+1 - k) % (K-1) ≠ 0, merging is impossible (since every merge reduces the number of piles by K-1).  
- **Final answer is dp[n-1][1]**; if impossible, return -1.
- **Time and space:** 3D DP with O(n³) time, O(n²) space with pruning.

### Corner cases to consider  
- Array of length 1 (already done).
- Impossible to reduce to 1 pile (e.g., ([3,2,4,1], K=3)).
- All piles have same number of stones.
- Large K compared to n.
- K=2, classic merge cost, similar to other "merge stones" problems.

### Solution

```python
def mergeStones(stones, K):
    n = len(stones)
    # If it's impossible to end with one pile, return -1
    if (n - 1) % (K - 1) != 0:
        return -1

    # Prefix sum for fast range sum lookup
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + stones[i]

    # dp[i][j][k]: min cost to merge stones[i:j+1] into k piles
    import sys
    dp = [[[float('inf')] * (K + 1) for _ in range(n)] for _ in range(n)]

    # Base case: cost to merge one pile is 0
    for i in range(n):
        dp[i][i][1] = 0

    # l = length of the current window
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            # k = target pile count
            for k in range(2, K + 1):
                # try every split point with step K-1
                for m in range(i, j, K - 1):
                    dp[i][j][k] = min(dp[i][j][k], dp[i][m][1] + dp[m+1][j][k-1])
            # after merging to K piles, try merging to 1 pile (if possible)
            if dp[i][j][K] < float('inf'):
                dp[i][j][1] = dp[i][j][K] + prefix[j+1] - prefix[i]

    return dp[0][n-1][1] if dp[0][n-1][1] < float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³) — Three nested loops: interval length, start index, split positions.
- **Space Complexity:** O(n²×K) — 3D DP table for all intervals and pile counts.

### Potential follow-up questions (as if you’re the interviewer)  

- What if K is very large or variable for different steps?  
  *Hint: Can the DP be modified to support dynamic K values per interval?*

- How would you optimize space complexity?  
  *Hint: Try to reduce the DP state, or discard unnecessary pile counts early.*

- Can you reconstruct the exact sequence of merges?  
  *Hint: Store choice of split point for each DP state and backtrack after filling DP.*

### Summary
This problem is a classic example of **interval DP**, commonly encountered in “merge” or “split” transformation tasks with strict operation constraints. The key is to formalize subproblems (`dp[i][j][k]`) and figure out the transition for merging subintervals. This DP pattern appears in optimal matrix multiplication order, file merging, and burst balloon variants. Proper handling of impossible states and cost accumulation is crucial for correctness and efficiency.