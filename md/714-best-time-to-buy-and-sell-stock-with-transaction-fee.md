### Leetcode 714 (Medium): Best Time to Buy and Sell Stock with Transaction Fee [Practice](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee)

### Description  
You are given an array prices, where prices[i] is the price of a stock on the iᵗʰ day, and an integer fee representing the transaction fee for each sell.  
You may perform unlimited buy/sell operations, but **you must sell before buying again** (cannot hold multiple stocks), and each time you sell a stock you pay the transaction fee.  
Return the maximum profit you can make.

### Examples  

**Example 1:**  
Input: `prices = [1,3,2,8,4,9]`, `fee = 2`  
Output: `8`  
*Explanation: Buy at 1, sell at 8 (profit=7−2=5). Then buy at 4, sell at 9 (profit=5−2=3). Total profit = 5 + 3 = 8.*

**Example 2:**  
Input: `prices = [1,3,7,5,10,3]`, `fee = 3`  
Output: `6`  
*Explanation: Buy at 1, sell at 7 (profit=6−3=3). Buy at 5, sell at 10 (profit=5−3=2). Total profit = 3 + 2 = 5. But with better logic: Buy at 1, sell at 10 (profit=9−3=6). Total = 6.*

**Example 3:**  
Input: `prices = [9,8,7,1,2]`, `fee = 3`  
Output: `0`  
*Explanation: The prices drop most of the time. The only opportunity is to buy at 1, sell at 2 (profit=1−3= -2, which is loss), so it's better not to trade. Total profit 0.*

### Thought Process (as if you’re the interviewee)  
First, let's try all possible buy/sell operations recursively and try every day, but this is exponential and too slow.

We usually use **Dynamic Programming** for this pattern:
- For every day, track two states:
  - **hold:** The max profit if I'm holding a stock after day i.
  - **cash:** The max profit if I'm NOT holding a stock after day i.
  
Transitions:
- If I hold, I either did nothing OR I bought stock today:
    • hold = max(prev hold, prev cash - prices[i])
- If I'm not holding, I either did nothing OR I sold today:
    • cash = max(prev cash, prev hold + prices[i] - fee)

We repeat this for every day, always keeping track of the best options for "holding" and "not holding".

This greedy/dp combo is optimal because, since transaction fees make too frequent trading suboptimal, it is best to only "realize" gains when the profit is large enough to cover the fee.

Finally, we return cash at the end, since we can't profit more by holding at the end.

### Corner cases to consider  
- prices = [] (Empty array): Should return 0.
- prices = [5] (One element): Should return 0, can't sell.
- prices constant or always going down: No transaction should be made, profit = 0.
- fee larger than any possible profit: Should return 0.
- fee = 0, increasing array: Maximum profit = prices[n-1] - prices.

### Solution

```python
def maxProfit(prices, fee):
    if not prices:
        return 0

    n = len(prices)
    # hold: max profit if we end today holding a stock
    # cash: max profit if we end today not holding a stock
    hold = -prices[0]
    cash = 0

    for price in prices[1:]:
        prev_cash = cash
        # If we sell today, add price-fee to 'hold'
        cash = max(cash, hold + price - fee)
        # If we buy today, subtract price from 'cash'
        hold = max(hold, prev_cash - price)

    return cash
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of days, as we scan through prices only once.
- **Space Complexity:** O(1), since we use only two variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you modify the solution if you are allowed to hold at most two stocks at a time?  
  *Hint: Model more DP states for each possible holding.*

- What if transaction fee differs each day?  
  *Hint: Instead of a single 'fee', access fee[i] for each day i.*

- Can you return the sequence of buy/sell days that yield the max profit?  
  *Hint: Track decisions/back-pointers while filling DP states.*

### Summary
Dynamic programming with rolling state is key for this problem.  
This is a classic “state compression DP” used in stock trading variants.  
The two-variable ‘hold/cash’ pattern is common in problems where you can make as many transactions as you want, but are constrained to sell before you can buy again (no overlapping trades).  
Related patterns: House Robber (choose-or-not-choose), and all "Best Time to Buy and Sell Stock" LeetCode variations.