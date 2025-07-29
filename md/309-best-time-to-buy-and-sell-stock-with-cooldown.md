### Leetcode 309 (Medium): Best Time to Buy and Sell Stock with Cooldown [Practice](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown)

### Description  
Given an array where `prices[i]` is the price of a given stock on the iᵗʰ day, you can perform as many transactions as you like (buy one and sell one share of the stock multiple times), but **after you sell your stock, you cannot buy stock on the next day** (i.e., there is a cooldown of one day). Your goal is to maximize your profit.  
You may not hold multiple stocks at once (i.e., you must sell the stock before you buy again).

### Examples  

**Example 1:**  
Input: `prices = [1,2,3,0,2]`  
Output: `3`  
*Explanation:  
Buy on day 0 (price=1), sell on day 2 (price=3), cooldown on day 3, buy on day 3 (price=0), sell on day 4 (price=2).  
Total profit = (3−1) + (2−0) = 2 + 2 = 4, but after selling on day 2, you have to cooldown, so you can't buy on day 3. The best sequence is: buy day 0, sell day 2, cooldown day 3, buy day 3, sell day 4. Profit = 3.*

**Example 2:**  
Input: `prices = [1]`  
Output: `0`  
*Explanation:  
Cannot make any transactions, so profit is 0.*

**Example 3:**  
Input: `prices = [2,1,4]`  
Output: `3`  
*Explanation:  
Buy on day 1 (price=1), sell on day 2 (price=4), profit = 4−1 = 3.*

### Thought Process (as if you’re the interviewee)  

To maximize profits but respect the cooldown constraint, I first considered **backtracking (brute-force)**—try all possible buy/sell/cooldown combinations. However, that would be far too slow (O(3ⁿ) time).

So, I noticed:  
- On any day, you can be in one of three states:  
  • **Holding a stock.**  
  • **Not holding, but in cooldown.**  
  • **Not holding, and can buy.**  

I realized that **dynamic programming** fits perfectly here—on each day, track the best profit for each state, transitioning based on yesterday's states and today's price.

Let’s define:  
- `sell[i]`: Max profit on day i, if you do NOT hold a stock (could be a cooldown or free state).  
- `hold[i]`: Max profit on day i, if you DO hold a stock.  
- On day `i`,  
    • Can buy today only if not holding and not in cooldown (was not holding two days ago).  
    • After selling, must cooldown one day.

We build two recurrence relations:  
- `sell[i] = max(sell[i-1], hold[i-1] + prices[i])`  
- `hold[i] = max(hold[i-1], sell[i-2] - prices[i])`  

The base cases (for the first 2 days) are handled with initial values (e.g., hold = -prices, sell[-1] = 0).

Final answer: `sell[n-1]` (never end while holding a stock).

By using arrays to keep these values, or *rolling variables* for space optimization, the approach is efficient.

This dynamic programming solution is optimal for both **time and space**.

### Corner cases to consider  
- Empty array (`prices = []`) → profit = 0  
- Only one price (`[5]`) → no transaction, profit = 0  
- Two prices, prices decreasing (`[2,1]`) → profit = 0  
- Prices never change (`[2,2,2,2]`) → no incentive to trade  
- Large input (maximum constraints): test performance

### Solution

```python
def maxProfit(prices):
    if not prices:
        return 0

    n = len(prices)

    # Initialize variables for DP:
    # hold: max profit if we hold a stock on day i
    # sold: max profit if we just sold on day i (in cooldown)
    # rest: max profit if we are just resting (not holding, not just sold)
    hold = -prices[0]
    sold = 0
    rest = 0

    for i in range(1, n):
        prev_hold = hold
        prev_sold = sold
        prev_rest = rest

        # If we buy, we must come from a "rest" (possible after sell + cooldown)
        hold = max(prev_hold, prev_rest - prices[i])
        # Sell today, only if we were holding previously
        sold = prev_hold + prices[i]
        # Rest today: either we rested previously, or we just sold yesterday (since after sell, must cooldown)
        rest = max(prev_rest, prev_sold)

    # The max profit is in either 'sold' or 'rest' state at last day (not 'hold' because can't end with stock in hand)
    return max(sold, rest)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we traverse the prices array once.
- **Space Complexity:** O(1), only a few variables are used, no need for arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if **the cooldown period was k days** instead of 1?
  *Hint: Modify the DP state to refer back k + 1 days when buying.*

- What if there were **transaction fees**?
  *Hint: Subtract the fee at the sell state transition.*

- Can you optimize the space if the cooldown period is longer?
  *Hint: Use a fixed-length queue to track rolling profits.*

### Summary
This is a classic **dynamic programming** problem—**state machine DP** specifically, representing buy/sell/cooldown states.  
Recognizing states and defining them properly is central and appears in many stock trading DP problems.  
This exact pattern is useful for any scenario where constraints limit consecutive actions (e.g., limited cooldowns, transaction fees, buy/sell restrictions).