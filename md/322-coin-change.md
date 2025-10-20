### Leetcode 322 (Medium): Coin Change [Practice](https://leetcode.com/problems/coin-change)

### Description  
Given an array of **coin denominations** (e.g., `[1,2,5]`), and an integer **amount** (e.g., `11`), determine the minimum number of coins required to make up that amount.  
- You have an **infinite supply** of each coin type.
- If it is **not possible** to make that amount, return `-1`.  
- For `amount = 0`, return `0`.

### Examples  

**Example 1:**  
Input: `coins = [1,2,5]`, `amount = 11`  
Output: `3`  
*Explanation: You can use 5 + 5 + 1 = 11, so 3 coins in total.*

**Example 2:**  
Input: `coins = [2]`, `amount = 3`  
Output: `-1`  
*Explanation: You cannot form 3 with only 2-coin denominations.*

**Example 3:**  
Input: `coins = [1]`, `amount = 0`  
Output: `0`  
*Explanation: No coins needed to make 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every combination of coins to build up the amount and count coins used each time. This is exponential, since for each step, you branch into as many possibilities as there are coin types.
- **Why not greedy:**  
  A greedy approach (always picking the largest coin possible) can fail for some denominations (e.g., coins = `[1,3,4]`, amount = 6, greedy gives 3 coins, but optimal is 2).  
- **Dynamic Programming (DP):**  
  Instead, use a **DP** array `dp[x]` that records the minimum coins needed to get amount `x`.  
  - Base case: `dp = 0`.
  - For each coin, for each possible amount, try including that coin:  
    `dp[curr_amount] = min(dp[curr_amount], dp[curr_amount - coin] + 1)`
  - Finally, if `dp[amount]` is still "infinity", return `-1`.

### Corner cases to consider  
- `amount = 0` → must return `0` (not `-1`).
- Empty coins list.
- Coins list contains only a single coin.
- Impossible to make up the amount (no combination possible).
- Coins include duplicates, or amounts smaller than the smallest coin.
- Large `amount` value (check for efficient solution).
- All coins are larger than the amount.

### Solution

```python
def coinChange(coins, amount):
    # Initialize dp array with 'infinity' up to amount
    # dp[i]: minimum coins needed for amount i
    MAX = float('inf')
    dp = [0] + [MAX] * amount

    for coin in coins:
        for curr_amount in range(coin, amount + 1):
            # If including this coin results in fewer coins, update
            dp[curr_amount] = min(dp[curr_amount], dp[curr_amount - coin] + 1)

    return -1 if dp[amount] == MAX else dp[amount]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(amount × n), where n = number of coin denominations.  
  Because for each coin, you loop over all possible amounts from coin value to amount.
- **Space Complexity:** O(amount), since the `dp` array stores min coins for each amount up to `amount`.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to **return the list of coins** used, not just the count?
  *Hint: Track which coin was picked at each step using a separate array.*

- Can you optimize for **space** further?
  *Hint: Try changing to a 1D array and see if reuse is possible.*

- If coin denominations are **very large** or there are thousands of types, is there a better way?
  *Hint: You might consider BFS or bidirectional BFS instead of classic DP.*

### Summary
This problem is a classic **Dynamic Programming (DP) – unbounded knapsack** variant.  
- Pattern: Build up solutions bottom-up for every value from 0 to the target amount.
- DP is chosen because greedy is incorrect for arbitrary coin sets.
- This technique applies to other minimum/maximum path sum or coin combination problems.  
- If you need the list of coins, you can backtrack from the DP array using a "parent" pointer array.


### Flashcard
Apply dynamic programming to find the minimum number of coins needed to reach a target amount.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Minimum Cost For Tickets(minimum-cost-for-tickets) (Medium)
- Maximum Value of K Coins From Piles(maximum-value-of-k-coins-from-piles) (Hard)
- Minimum Number of Operations to Convert Time(minimum-number-of-operations-to-convert-time) (Easy)
- Minimum Cost to Split an Array(minimum-cost-to-split-an-array) (Hard)
- Count of Sub-Multisets With Bounded Sum(count-of-sub-multisets-with-bounded-sum) (Hard)
- Length of the Longest Subsequence That Sums to Target(length-of-the-longest-subsequence-that-sums-to-target) (Medium)
- Minimum Number of Coins to be Added(minimum-number-of-coins-to-be-added) (Medium)
- Most Expensive Item That Can Not Be Bought(most-expensive-item-that-can-not-be-bought) (Medium)
- Inverse Coin Change(inverse-coin-change) (Medium)