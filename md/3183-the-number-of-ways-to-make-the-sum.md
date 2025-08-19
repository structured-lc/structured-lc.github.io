### Leetcode 3183 (Medium): The Number of Ways to Make the Sum [Practice](https://leetcode.com/problems/the-number-of-ways-to-make-the-sum)

### Description  
Given an integer **n**, you are asked: in how many different ways can you sum coins to get exactly n?  
- You have **infinite** supply of coins with denominations 1, 2, and 6.  
- You have **exactly 2 coins** of denomination 4; you can use each at most 2 times (0, 1, or 2 times).  
You must return the number of combinations (order does **not** matter, e.g., \[2, 2, 1\] is the same as \[1, 2, 2\]), **modulo 10⁹+7**.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `4`  
*Explanation: The combinations are \[1,1,1,1\], \[1,1,2\], \[2,2\], \[4\].*

**Example 2:**  
Input: `n = 12`  
Output: `22`  
*Explanation: Use coins 1,2,6 (infinite) and 4 (max twice). All unique, unordered sums total 22.*

**Example 3:**  
Input: `n = 5`  
Output: `4`  
*Explanation: \[1,1,1,1,1\], \[1,1,1,2\], \[1,2,2\], \[1,4\].*

### Thought Process (as if you’re the interviewee)  
First, this is a **variation of the classic coin change** (combination, not permutation) problem.  
Normally, with unlimited coins, we use DP: dp[x] = number of ways to make sum x.  
However, there's a **twist**: the 4-coin can be used at most twice.  
Brute-force: Try all possible usages of 4-coin (0, 1, or 2), for each, the subproblem is “coin change” with unlimited supply for \[1,2,6\] to make up the remaining n.  
For each possible count of 4-coin (k = 0,1,2):  
- Target = n - 4×k  
- Use standard DP (with coins 1,2,6; unlimited) to compute #ways to form target.

This is efficient since 4-coin can be used only 0,1,2 times (≤3 options), so total time is 3 × O(n × c), where c is number of coins (1,2,6).

I choose this approach because it is simple, clear, avoids overcomplicating state, and leverages well-known patterns.

### Corner cases to consider  
- n < 0 (invalid, should return 0)
- n == 0 (ways = 1, empty sum)
- n < 4 (can’t use any 4s)
- n == 4 (can use 4 once, or all smaller coins)
- n == 8 (can use both 4s, but not more)
- Large n (should still be efficient)
- Only 4s can be used to make n (e.g., n==8 → two 4s)

### Solution

```python
MOD = 10**9 + 7

def numberOfWays(n):
    coins = [1, 2, 6]  # unlimited
    max_4coincount = 2  # at most 2 coins of 4

    # Precompute number of ways for 0,1,2 of 4-coin used:
    total = 0
    for count4 in range(max_4coincount + 1):
        remain = n - 4 * count4
        if remain < 0:
            continue

        # DP[i]: number of ways to make sum i with unlimited 1,2,6
        dp = [0] * (remain + 1)
        dp[0] = 1  # 1 way to make 0

        for coin in coins:
            for i in range(coin, remain + 1):
                dp[i] = (dp[i] + dp[i - coin]) % MOD

        total = (total + dp[remain]) % MOD

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × c × max4),  
  where c = number of unlimited coins (3), max4 = 3 (`0, 1, 2`).  
  So, overall O(n).
- **Space Complexity:** O(n),  
  for the DP array holding ways up to target sum.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had k coins of value 6 instead of only 2 coins of 4?  
  *Hint: Model limited coins as a DP dimension, or loop through all legal usages.*

- What if order *did* matter (permutations, not combinations)?  
  *Hint: Use a different DP formula; loop coins in inner rather than outer DP loop.*

- Can you solve for all `n` in `[1, M]` with the same solution?  
  *Hint: Precompute for all by expanding the DP array to M.*

### Summary
This problem is a **bounded + unbounded knapsack** variant (coin change with a limited supply for one coin).  
It uses the well-known coin change DP pattern, but for each possible usage of the limited coin, solves a smaller unbounded knapsack.  
This decomposition is commonly used when constraints on coin usage are small.  
The pattern appears in problems that mix unlimited and limited coin usage, and is a standard technique for bounded/unbounded combinations.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Combination Sum(combination-sum) (Medium)
- Climbing Stairs(climbing-stairs) (Easy)
- Coin Change II(coin-change-ii) (Medium)