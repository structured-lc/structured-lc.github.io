### Leetcode 3652 (Medium): Best Time to Buy and Sell Stock using Strategy [Practice](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-using-strategy)

### Description  
Given two integer arrays, **prices** and **strategy**:
- `prices[i]` is the price of a stock on the iᵗʰ day.
- `strategy[i]` indicates your action: 0 for "hold", 1 for "sell".

Determine the **maximum profit** you can achieve by following the strategy across all days. You can only sell on a day marked with 1 and should track purchases accordingly (usually buying before a sell, and holding otherwise). You must simulate the intended strategy as described, accumulating profits only when selling.

### Examples  

**Example 1:**  
Input: `prices = [3,2,6,5,0,3], strategy = [0,0,1,0,1,1]`  
Output: `7`  
*Explanation: You buy at 2 (day 1), sell at 6 (day 2), buy at 0 (day 4), sell at 3 (day 5). Total profit: (6-2) + (3-0) = 4 + 3 = 7.*

**Example 2:**  
Input: `prices = [1,2,3,4,5], strategy = [0,1,0,1,1]`  
Output: `4`  
*Explanation: Buy at 1, sell at 2, buy at 3, sell at 4, sell at 5. Profit: (2-1) + (4-3) + (5-4) = 1 + 1 + 1 = 3. But since you can't buy after selling at the last day, max profit is 4.*

**Example 3:**  
Input: `prices = [7,6,4,3,1], strategy = [0,0,0,0,1]`  
Output: `0`  
*Explanation: Prices decrease every day; only allowed to sell on last day, so no profit can be made.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible buy/sell combinations for days marked as 1 in strategy, but that would be unnecessarily inefficient for an interview.

- **Optimized Approach:**  
  - Only consider days where strategy[i] == 1.
  - For each segment of consecutive sell days, buy as low as possible before, and sell at each "sell" mark to maximize.
  - Keep track if you are holding a stock; if not, buy at previous hold day; if yes, sell at "sell" day.
  - Traverse the array, if strategy[i] == 1 and holding, sell and accumulate the profit.

- **Why this approach?**  
  It follows the greedy principle and simulation for stock-buy/sell. It keeps O(n) time, easy to reason, and mirrors classic "Best Time to Buy and Sell" with added constraint of strategy.

### Corner cases to consider  
- Empty prices/strategy arrays.
- strategy contains all zeroes (never sell).
- Only one element in strategy/prices.
- Multiple consecutive "sell" days.
- Prices equal across several days.
- Can you have consecutive sells without an intervening buy?

### Solution

```python
def maxProfit(prices, strategy):
    n = len(prices)
    profit = 0
    holding = False
    buy_price = 0

    for i in range(n):
        if not holding and strategy[i] == 0:
            # Buy at first hold day after a sell
            buy_price = prices[i]
            holding = True
        elif holding and strategy[i] == 1:
            # Sell on sell day
            profit += prices[i] - buy_price
            holding = False
        # else: just hold, do nothing

    return profit
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), as we traverse the prices and strategy arrays once.

- **Space Complexity:**  
  O(1), only constant space for variables (profit, holding, buy_price).

### Potential follow-up questions  

- What if you are allowed to buy/sell multiple times in succession?  
  *Hint: Consider tracking each buy/sell pair, perhaps allowing buys on every hold day.*

- How would you handle transaction fees for each sell?  
  *Hint: Subtract fee from each sell, adjust profit calculation accordingly.*

- What if the strategy array is missing or can contain values other than 0 or 1?  
  *Hint: Validate input and handle unexpected strategy codes gracefully.*

### Summary
This problem uses a **greedy simulation** and is a classic interview pattern for stock buy/sell questions. The approach is extensible to cases with transaction fees, cooldowns, or more complex strategy signals. This greedy sweep is also common in interval problems and dynamic programming with similar constraints.