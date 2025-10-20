### Leetcode 518 (Medium): Coin Change II [Practice](https://leetcode.com/problems/coin-change-ii)

### Description  
Given an array of integers `coins` representing different denominations and an integer `amount`, return the number of *distinct combinations* that add up to `amount` using any number of coins (including zero).  
Each coin can be used an unlimited number of times. If no combination exists, return `0`.  
The order of coins in a combination does **not** matter; only the coin counts and denominations do.

### Examples  

**Example 1:**  
Input: `amount = 5, coins = [1,2,5]`  
Output: `4`  
*Explanation: The possible combinations are: (5), (2+2+1), (2+1+1+1), (1+1+1+1+1).*

**Example 2:**  
Input: `amount = 3, coins = [2]`  
Output: `0`  
*Explanation: You cannot get 3 from the denomination 2.*

**Example 3:**  
Input: `amount = 10, coins = `  
Output: `1`  
*Explanation: Only one way: (10).*

### Thought Process (as if you’re the interviewee)  
- *Brute-force approach:*  
  Try every possible way to sum up to the amount by including or skipping each coin at every step.  
  This recursive solution has exponential time complexity because it explores all possibilities, including many duplicated subproblems.

- *Optimization with memoization:*  
  Use a DP table or memoization to save results for subproblems (like: `dp[i][a]` = ways to form `a` using coins from iᵗʰ index and onwards).  
  This avoids redundant work and brings down time usage, but is still O(n×amount) for n=number of coins.

- *1D Dynamic Programming (final approach):*  
  Recognize this as the classic *Unbounded Knapsack* problem: For each coin, for each amount from coin to total, add ways to form (cur-coin) to ways[cur].  
  Use a single array of (amount+1) size: `dp=1` (one way to make 0), and fill up incrementally with each coin.  
  This is clean, space-optimal, avoids stack recursion, and captures the requirement that combination order does not matter (since inner loop is on amount, for each coin).

### Corner cases to consider  
- amount = 0: Always 1 way (the empty selection)
- coins = [] and amount > 0: Impossible, should return 0
- coins = [amount]: Should yield exactly 1
- Duplicated coin denominations
- Large denominations (greater than amount)
- Negative or zero denominations (spec does not expect this, assume input valid)

### Solution

```python
def change(amount, coins):
    # dp[i] will store the number of ways to form amount i
    dp = [0] * (amount + 1)
    dp[0] = 1  # base case: one way to make amount 0 (no coins)

    # For each coin, update dp from coin to amount
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]
    return dp[amount]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n×amount),  
  where n = number of coins.  
  We process every coin for every possible intermediate amount.
- **Space Complexity:** O(amount),  
  Only a single array of size amount+1 is maintained; no recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to print out the actual combinations?
  *Hint: Use backtracking to reconstruct combinations.*

- How does the answer change if coins can only be used once (i.e., 0-1 Knapsack)?
  *Hint: Use a reversed inner loop so each coin is only considered once per amount.*

- Can you optimize further for very large amount values but small coins?
  *Hint: Consider early break if coin > amount. May need new data structures.*

### Summary
This is a classic *Unbounded Knapsack* (all-coins-unlimited) dynamic programming pattern.  
It’s very similar to the classic subset sum/combinations/count-ways DP, and appears in problems involving monetary change, combinations, or any scenario where an unlimited supply of items must fill a target sum.  
The core coding pattern (1D DP, filling by outer loop on coins and inner loop on target amount) allows highly efficient, order-insensitive combination counting.


### Flashcard
Use DP where dp[a] is the number of ways to make amount a; for each coin, update dp[a] += dp[a-coin] for all a ≥ coin.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximum Value of K Coins From Piles(maximum-value-of-k-coins-from-piles) (Hard)
- Number of Ways to Earn Points(number-of-ways-to-earn-points) (Hard)
- Count of Sub-Multisets With Bounded Sum(count-of-sub-multisets-with-bounded-sum) (Hard)
- Length of the Longest Subsequence That Sums to Target(length-of-the-longest-subsequence-that-sums-to-target) (Medium)
- The Number of Ways to Make the Sum(the-number-of-ways-to-make-the-sum) (Medium)
- Inverse Coin Change(inverse-coin-change) (Medium)