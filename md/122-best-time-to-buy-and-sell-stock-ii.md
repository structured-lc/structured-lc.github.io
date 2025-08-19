### Leetcode 122 (Medium): Best Time to Buy and Sell Stock II [Practice](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii)

### Description  
You are given an array of integers where prices[i] is the price of a stock on the iᵗʰ day. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times). However, you cannot engage in multiple transactions at the same time (i.e., you must sell the stock before buying again). The goal is to determine the maximum profit you can achieve.

### Examples  

**Example 1:**  
Input: `prices = [7,1,5,3,6,4]`  
Output: `7`  
*Explanation: Buy on day 2 (price=1), sell on day 3 (price=5), profit=4. Buy on day 4 (price=3), sell on day 5 (price=6), profit=3. Total profit = 4+3=7.*

**Example 2:**  
Input: `prices = [1,2,3,4,5]`  
Output: `4`  
*Explanation: Buy on day 1, sell on day 5, profit=4. Or, buy and sell every day: profit=1 (2-1) + 1 (3-2) + 1 (4-3) + 1 (5-4) = 4.*

**Example 3:**  
Input: `prices = [7,6,4,3,1]`  
Output: `0`  
*Explanation: No profit can be made since the prices are decreasing every day.*

### Thought Process (as if you’re the interviewee)  
- Brute force would try every possible sequence of buys and sells (exponential time). Clearly too slow.
- We notice that the best way to maximize profit is to “collect” every positive difference between consecutive days: every time the price goes up from one day to the next, treat it as an opportunity to buy the previous day and sell the next day.
- This means, for each pair prices[i], prices[i+1], if prices[i+1] > prices[i], add (prices[i+1]-prices[i]) to our profit.
- This greedy approach works because there’s no restriction on how many times you can buy/sell, and it mimics the sum you'd get from perfectly timing the buys and sells between every increase.

### Corner cases to consider  
- prices is empty (`[]`)  
- prices has one element (`[3]`)  
- All prices the same (`[5,5,5,5]`)  
- prices strictly decreasing  
- prices strictly increasing  
- prices up and down (multiple buy/sell ops)

### Solution

```python
def maxProfit(prices):
    profit = 0
    for i in range(1, len(prices)):
        # If price goes up compared to previous day, add the difference
        if prices[i] > prices[i-1]:
            profit += prices[i] - prices[i-1]
    return profit
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We loop through the prices array once, checking each adjacent pair.
- **Space Complexity:** O(1) — Only constant extra space is used for the `profit` variable.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we introduce a **transaction fee** for each buy/sell?
  *Hint: Adjust when adding to profit; subtract fee from each operation.*

- What if you **cannot buy and sell on the same day**?
  *Hint: Already handled, since we only gain profit when prices[i+1] > prices[i].*

- Suppose you’re **only allowed to complete at most k transactions**?
  *Hint: Can’t use simple greedy; try dynamic programming approach.*

### Summary
This is a classic greedy problem: every time there is an increase, we take that profit. The pattern used is “greedy acceptance of local improvements,” common for interval merging, scheduling, and profit-collection problems. This optimal substructure makes this approach both fast and elegant. A variant appears everywhere there’s a need to accumulate “all positive changes,” and it’s a useful trick for array manipulation and financial modeling.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
- Best Time to Buy and Sell Stock(best-time-to-buy-and-sell-stock) (Easy)
- Best Time to Buy and Sell Stock III(best-time-to-buy-and-sell-stock-iii) (Hard)
- Best Time to Buy and Sell Stock IV(best-time-to-buy-and-sell-stock-iv) (Hard)
- Best Time to Buy and Sell Stock with Cooldown(best-time-to-buy-and-sell-stock-with-cooldown) (Medium)
- Best Time to Buy and Sell Stock with Transaction Fee(best-time-to-buy-and-sell-stock-with-transaction-fee) (Medium)
- Maximum Profit From Trading Stocks(maximum-profit-from-trading-stocks) (Medium)