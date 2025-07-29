### Leetcode 3573 (Medium): Best Time to Buy and Sell Stock V [Practice](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-v)

### Description  
You are given a list of prices where prices[i] is the stock price on day i. Unlike traditional stock problems, you can do both normal buy-then-sell transactions or short-sell-and-buyback transactions:
- **Buy-Sell:** Buy on day i, then sell on some later day j (i < j).
- **Short Sell-Buyback:** Short sell on day i, then buy back on a later day j (i < j).
- At any time, you can have **at most one open position** (either bought or short-sold), and each transaction must be closed before starting another.
- **You cannot buy, sell, or close and open a new transaction on the same day.**

Your task: Compute the **maximum profit** you can achieve under these rules.

### Examples  

**Example 1:**  
Input: `prices = [2, 4, 1]`  
Output: `2`  
Explanation: Buy at 2 on day 0, sell at 4 on day 1 (profit = 2). No further transactions as one at a time only.

**Example 2:**  
Input: `prices = [4, 2, 5, 1, 7]`  
Output: `6`  
Explanation: Short sell at 0 (price=4), buy back at 1 (price=2), profit = 4-2 = 2.  
Then buy at 3 (price=1), sell at 4 (price=7), profit = 6.  
Total = 2+6 = 8.

**Example 3:**  
Input: `prices = [1, 5, 2, 8, 3]`  
Output: `10`  
Explanation: Buy at 0 (price=1), sell at 1 (price=5), profit = 4.  
Short sell at 2 (price=2), buy back at 4 (price=3), profit = -1.  
Better: Buy at 0, sell at 3; profit = 7.


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible buy/sell and short-sell/buyback actions at every possible day, but with \(2^{n}\) paths, infeasible for n large.

- **Dynamic Programming:**  
  Define states:
  - **Day (i)**
  - **Status:** 0 = no transaction open, 1 = bought (need to sell), 2 = shorted (need to buy back)
- **Transitions:**  
  - If status=0: You may buy (move to 1), or short-sell (move to 2), or skip.
  - If status=1: You may sell any day after buying (move to 0), or skip/hold.
  - If status=2: You may buy-back after short-sell (move to 0), or skip/hold.
- **Decision:**  
  At each day/status, recursively (or iteratively) compute maximum profit for every possible action.

- **Memoization:**  
  O(n \* 3) DP table (n = # of days, 3 possible statuses).

- **Trade-off:**  
  This approach ensures no overlapping transactions, correct modeling of short and normal trades, and is efficient for reasonable n.

### Corner cases to consider  
- Empty array, or array of length 1
- All prices equal
- Prices strictly increasing/decreasing
- Optimal to skip all trades (no profit)
- Multiple reversals in prices
- Only short-selling profitable
- Optimal mix of regular & short transactions

### Solution

```python
def maxProfit(prices):
    n = len(prices)
    # dp[i][status]: max profit from day i, with status
    # status: 0=no open, 1=bought (need to sell), 2=shorted (need to buy back)
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dp(i, status):
        if i == n:
            return 0
        # Do nothing
        res = dp(i+1, status)
        if status == 0:
            # Option 1: buy (regular transaction)
            if i + 1 < n:  # avoid buying on last day (can't sell)
                res = max(res, -prices[i] + dp(i+1, 1))
            # Option 2: short sell
            if i + 1 < n:  # avoid shorting last day
                res = max(res, prices[i] + dp(i+1, 2))
        elif status == 1:
            # Option 1: sell (must sell next day or later)
            if i + 1 < n:  # can't sell on last day as nothing after
                res = max(res, prices[i] + dp(i+1, 0))
        elif status == 2:
            # Option 1: buy back (closing short)
            if i + 1 < n:
                res = max(res, -prices[i] + dp(i+1, 0))
        return res

    return dp(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  There are n days and 3 statuses, making O(n \* 3) subproblems, each processed in constant time thanks to memoization.

- **Space Complexity:** O(n).  
  Recursion stack can go up to O(n) (depth-first over days), and memoization uses O(n \* 3) entries.

### Potential follow-up questions (as if you’re the interviewer)  

- Support for transaction fees per trade  
  *Hint: Subtract/adjust profit when closing (selling or buying back) a position.*

- What if at most k transactions allowed?  
  *Hint: Add an extra parameter for remaining transactions and update state accordingly.*

- Return not only profit, but sequence of trades (for audits/trade log)?  
  *Hint: Store previous action/decision in dp—rebuild by tracing choices.*

### Summary
This problem extends the standard "Best Time to Buy and Sell Stock" to include short-selling. The **DP state** models both position type (none, long, short) and tracks per-day options, using a recursion + memoization pattern. This is a standard “stateful DP” problem pattern, useful in advanced variants of stock trading, and anywhere transaction states can be represented by finite automata.