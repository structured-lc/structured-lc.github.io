### Leetcode 1866 (Hard): Number of Ways to Rearrange Sticks With K Sticks Visible [Practice](https://leetcode.com/problems/number-of-ways-to-rearrange-sticks-with-k-sticks-visible)

### Description  
You are given **n** uniquely-sized sticks, each a different length from 1 to n.  
You want to arrange these sticks in a line so that **exactly k sticks are visible from the left**.  
A stick is visible from the left if there’s no longer stick on its left in the lineup.  
Return the number of arrangements possible, modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `n=3, k=2`  
Output: `3`  
*Explanation: The only possible orderings where exactly 2 sticks are visible:  
[1,3,2], [2,3,1], [2,1,3].*

**Example 2:**  
Input: `n=5, k=5`  
Output: `1`  
*Explanation: Only [1,2,3,4,5] (increasing order) makes all 5 sticks visible.*

**Example 3:**  
Input: `n=20, k=11`  
Output: `647427950`  
*Explanation: There are 647427950 ways to do this (modulo 10⁹+7).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force**:  
  Try every possible arrangement (n!), count those with exactly k visible sticks. This will time out for n > 10.

- **Key observation**:  
  If you fix the position of the tallest stick, it *must* be visible because it cannot be blocked.  
  - Place the tallest stick anywhere (say last), then recursively arrange (n-1) sticks with (k-1) visible (since the tallest is counted).  
  - Or, put it somewhere else and it’s not counted — but then the count of visible sticks stays k.

- **Recurrence**:  
  Let dp[n][k] = number of arrangements of n sticks with k visible.  
  - If the tallest is visible (must be at start or after all shorter sticks lost left to it): dp[n-1][k-1]  
  - If tallest is not first, it’s hidden, so pick a position among the (n-1) places, dp[n-1][k] × (n-1)  
  So:  
    dp[n][k] = dp[n-1][k-1] + (n-1) × dp[n-1][k]

- **Optimize with DP**:  
  - Use bottom-up DP table or optimized 1D array.  
  - Only fill up to given n, k.

- **Tradeoffs**:  
  Brute-force is intractable; DP is efficient for n up to 1000.

### Corner cases to consider  
- n = 1, k = 1 (only one way, only stick is visible)  
- k > n (invalid input, but constraint says always k ≤ n)  
- n = k (must be all in increasing order)  
- k = 1 (tallest stick is at some position, all others must be to its right and be smaller)

### Solution

```python
def rearrangeSticks(n: int, k: int) -> int:
    MOD = 10**9 + 7
    # dp[j]: number of ways to arrange i sticks with j visible
    dp = [0] * (k + 1)
    dp[0] = 0
    dp[1] = 1
    # For n = 1, base: only 1 way for dp[1]=1
    for i in range(2, n + 1):
        prev = dp[:]
        for j in range(1, min(i, k) + 1):
            # Transition:
            # - Place largest stick at front: prev[j-1]
            # - Place it elsewhere: prev[j] * (i-1)
            dp[j] = (prev[j-1] + prev[j] * (i - 1)) % MOD
    return dp[k]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × k): We fill up a table of size n × k, doing constant work for each entry.

- **Space Complexity:**  
  O(k): Only keep two rows (current and previous) since dp[i][j] depends only on dp[i-1][*].

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed visibility counted from the right instead?  
  *Hint: It’s the same problem but mirrored.*

- Can you generate the actual permutations, not just count them?  
  *Hint: It becomes much harder, backtracking with pruning may be required.*

- How would you handle n and k much larger (e.g., up to 10⁵)?  
  *Hint: You can’t build a DP table directly. Mathematical formula or optimized table needed.*

### Summary
This problem is a classic **dynamic programming** question on permutations with restrictions (“visible/invisible” elements).  
The DP follows a **combinatorial recurrence** and is similar to variants of the “stirling numbers of the first kind.”  
This DP pattern applies to other problems involving “doing something special with the max element” or “arrangements with visibility/ordering constraints.”  
It’s a key example of bottom-up DP with state compression.