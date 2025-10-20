### Leetcode 879 (Hard): Profitable Schemes [Practice](https://leetcode.com/problems/profitable-schemes)

### Description  
You are given **n** as the number of people in a group and two lists: **group** and **profit**. Each crime `i` needs `group[i]` members to commit and earns `profit[i]` profit. Each member can only participate in one crime, and no more than n members can be used across all crimes chosen for a scheme.  
A **profitable scheme** is any subset of crimes where:
- Total members used ≤ n
- Total profit ≥ `minProfit`

Return the **number of such schemes** modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `n=5, minProfit=3, group=[2,2], profit=[2,3]`  
Output: `2`  
Explanation: Either just crime 1, or both crime 0 and 1 give profit ≥ 3 with ≤ 5 members.

**Example 2:**  
Input: `n=10, minProfit=5, group=[2,3,5], profit=[6,7,8]`  
Output: `7`  
Explanation: Any nonempty subset gives profit ≥ 5. There are 7 such subsets: (0), (1), (2), (0,1), (0,2), (1,2), (0,1,2).

**Example 3:**  
Input: `n=1, minProfit=1, group=[1,1,1], profit=[0,0,1]`  
Output: `1`  
Explanation: Only subset (2) gives profit ≥ 1 using ≤ 1 member.

### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea: Try every subset of crimes, sum used group members and profit, count if scheme is valid. But there are up to 2ⁿ subsets, so that's not scalable.

Let's optimize using **dynamic programming**. 
- Let dp[i][j][k] = number of ways to pick among the first i crimes, using j members, to achieve at least k profit.
- State transitions: For the iᵗʰ crime, either skip it (same as previous i-1), or include it (if enough members remain).
- To avoid over-counting, cap the profit dimension at minProfit (if you make more, that's equivalent).
- Use dimensions: total crimes (m), members used (n), profit achieved (minProfit+1).

This is similar to 0/1 Knapsack with two weights: member count and required profit.

### Corner cases to consider  
- No group members (`n=0`)
- `minProfit = 0` (all subsets including empty set are valid)
- All crimes require more members than available
- No profits are enough (all profits zero, minProfit positive)
- Only one crime

### Solution

```python
MOD = 10**9 + 7

def profitableSchemes(n, minProfit, group, profit):
    m = len(group)
    # dp[j][k]: number of ways with j people and at least k profit
    dp = [[0] * (minProfit + 1) for _ in range(n + 1)]
    dp[0][0] = 1  # base case: 0 crime, 0 member, 0 profit

    for idx in range(m):
        g, p = group[idx], profit[idx]
        # Copy to avoid over-writing
        # Go backward to NOT reuse the same crime
        for members in range(n, g - 1, -1):
            for prof in range(minProfit, -1, -1):
                next_prof = min(minProfit, prof + p)
                dp[members][next_prof] = (dp[members][next_prof] + dp[members - g][prof]) % MOD

    # Sum everything that reaches at least minProfit, for all possible people used
    return sum(dp[j][minProfit] for j in range(n + 1)) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × minProfit), where m = len(group). Each crime, for each possible person count, for each profit up to minProfit.
- **Space Complexity:** O(n × minProfit), as we only keep dp for current member counts and profit thresholds.

### Potential follow-up questions (as if you’re the interviewer)  

- What if group sizes or profits are very large?  
  *Hint: Could you optimize memory or reduce state space even more?*

- How would you print out one such valid scheme, not just count?  
  *Hint: Track choices or reconstruct from DP table.*

- How do you deal with overflow or very large answers?  
  *Hint: Use the required modulo operation consistently in all updates.*

### Summary
This problem uses the classic **multi-dimensional dynamic programming** (knapsack pattern), adapting for two constraints: number of members and profit threshold. This is frequently used where subset or selection problems must satisfy multiple limits. Clear examples include “target sum with limits,” 0/1 Knapsack, subset sum variants, and resource-constrained subset selection.


### Flashcard
3D DP (crimes × members × profit); count valid schemes where total members ≤ n and profit ≥ minProfit.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
