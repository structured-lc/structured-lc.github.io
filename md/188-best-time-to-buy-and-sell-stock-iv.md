### Leetcode 188 (Hard): Best Time to Buy and Sell Stock IV [Practice](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv)

### Description  
You are given an integer `k` and an array of integers `prices` where `prices[i]` is the price of a given stock on the iᵗʰ day.  
You may complete at most `k` transactions, where each transaction consists of buying and then selling one share of the stock.  
You may not engage in multiple transactions at once (i.e., you must sell the stock before you buy again).  
Your task is to return the maximum profit you can achieve with at most `k` transactions.


### Examples  

**Example 1:**  
Input: `k = 2, prices = [2,4,1]`  
Output: `2`  
*Explanation: Buy on day 0 (price=2) and sell on day 1 (price=4), profit=2. You cannot achieve a higher profit with at most 2 transactions.*

**Example 2:**  
Input: `k = 2, prices = [3,2,6,5,0,3]`  
Output: `7`  
*Explanation: Buy on day 1 (price=2), sell on day 2 (price=6), profit=4.  
Then buy on day 4 (price=0), sell on day 5 (price=3), profit=3.  
Total profit = 4 + 3 = 7.*

**Example 3:**  
Input: `k = 1, prices = [1,2]`  
Output: `1`  
*Explanation: Buy on day 0 (price=1), sell on day 1 (price=2), profit=1. Only one transaction allowed.*


### Thought Process (as if you’re the interviewee)  
Start by considering the brute-force approach:  
- Try all possible ways to make up to k transactions, checking every possible pair for buy and sell.  
- This is infeasible for large n due to the explosion of combinations (exponential time).

Recognize that this is a textbook **dynamic programming** problem.  
- For each transaction, keep track of the best profit achievable up to each day, by using previous results.
- Let `dp[i][j]` be the max profit up to day j with at most i transactions.

Update as follows:  
- For each i (transaction count, 1 ≤ i ≤ k), and for each j (day, 1 ≤ j < n):  
  - For each day, update `dp[i][j] = max(dp[i][j-1], prices[j] + max_diff)`,  
    where `max_diff` keeps track of the maximum of `dp[i-1][m] - prices[m]` for m < j.  
- Optimize space since we only need values for previous transaction.

**Special note:** If k is large (k ≥ ⌊n/2⌋), it’s equivalent to unlimited transactions: just sum all profits for every upward step.

I choose DP for efficiency: O(n×k) time, O(k) space.  
Brute force is impossible for larger inputs.

### Corner cases to consider  
- prices is empty or has 1 element: return 0.
- k = 0: return 0.
- k ≥ ⌊n/2⌋: treat as unlimited transactions.
- All prices decreasing: best profit is 0.
- All prices the same: best profit is 0.


### Solution

```python
def maxProfit(k, prices):
    n = len(prices)
    if n == 0 or k == 0:
        return 0

    # If k >= n//2, it's equivalent to unlimited transactions.
    if k >= n // 2:
        profit = 0
        for i in range(1, n):
            if prices[i] > prices[i-1]:
                profit += prices[i] - prices[i-1]
        return profit

    # DP: dp[i][j] = max profit at most i transactions up to day j
    dp = [0] * n
    for t in range(1, k+1):
        max_diff = -prices[0]
        prev_dp = dp[:]
        for d in range(1, n):
            dp[d] = max(dp[d-1], prices[d] + max_diff)
            max_diff = max(max_diff, prev_dp[d] - prices[d])
    return dp[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n×k); two nested loops over k transactions and n days.
- **Space Complexity:** O(n) for the profit array; can be reduced to O(n) or O(k) by reusing space.

### Potential follow-up questions (as if you’re the interviewer)  

- If transactions have a fee, how would you modify the DP?
  *Hint: Adjust the buy and sell step to account for the fee deduction.*

- Can you recover the sequence of transactions (buy/sell days) that lead to the optimal profit?
  *Hint: Store actions or traceback choices during the DP process.*

- How would the approach change if unlimited stocks could be bought and sold on the same day?
  *Hint: Need to modify the state logic to allow simultaneous transactions.*

### Summary
This problem uses the **dynamic programming / state machine** pattern, where the state represents the max profit after i transactions up to each day.  
Key techniques are “profit-so-far,” optimizations for large k, and transition state compression. This pattern applies to many variations of stock-buy-sell questions and resource allocation optimization problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Best Time to Buy and Sell Stock(best-time-to-buy-and-sell-stock) (Easy)
- Best Time to Buy and Sell Stock II(best-time-to-buy-and-sell-stock-ii) (Medium)
- Best Time to Buy and Sell Stock III(best-time-to-buy-and-sell-stock-iii) (Hard)
- Maximum Profit From Trading Stocks(maximum-profit-from-trading-stocks) (Medium)