### Leetcode 121 (Easy): Best Time to Buy and Sell Stock [Practice](https://leetcode.com/problems/best-time-to-buy-and-sell-stock)

### Description  
You are given an array `prices`, where `prices[i]` represents the stock price on the iᵗʰ day. Your task is to maximize your profit by choosing a single day to buy the stock and another later day to sell it. You can only complete one transaction (buy and then sell). Return the maximum profit you can achieve; if no profit is possible, return 0.

### Examples  

**Example 1:**  
Input: `prices = [7, 1, 5, 3, 6, 4]`  
Output: `5`  
*Explanation: Buy on day 2 (price=1), sell on day 5 (price=6), profit = 6−1 = 5. You cannot sell before you buy.*

**Example 2:**  
Input: `prices = [7, 6, 4, 3, 1]`  
Output: `0`  
*Explanation: The price keeps lowering every day; no transaction is done, so max profit is 0.*

**Example 3:**  
Input: `prices = [2, 4, 1]`  
Output: `2`  
*Explanation: Buy on day 1 (price=2), sell on day 2 (price=4), profit = 4−2 = 2.*

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force way: try every pair of days (i, j) where 0 ≤ i < j < n and calculate prices[j] - prices[i], keeping track of the maximum. This is O(n²) and too slow.

A better approach is to notice that we want to keep track of the minimum price we've seen so far (buying price) as we move through the array. For each day, calculate the potential profit if we sold on that day: prices[i] - min_price_so_far. If this is the largest, update max_profit. This greedy strategy works as we're only allowed one buy and one sell.

We choose this final approach as it is O(n) time and O(1) extra space, iterates once from left to right, and always keeps the best buying opportunity updated.

### Corner cases to consider  
- Empty array
- Array with only one price (cannot make a transaction)
- Prices always decreasing
- All prices are the same
- Only one local min and max
- Profit happens only at the very end

### Solution

```python
def maxProfit(prices):
    if not prices:
        return 0

    min_price = float('inf')  # Store the minimum price found so far
    max_profit = 0            # Store the maximum profit

    for price in prices:
        if price < min_price:
            min_price = price  # Update the minimum price (potential buy)
        elif price - min_price > max_profit:
            max_profit = price - min_price  # Update max profit if selling today is better

    return max_profit
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of prices. The algorithm iterates through the list once, updating the min_price and max_profit as needed.
- **Space Complexity:** O(1). No extra space is used besides a few variables. The input array is not modified and no additional data structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can complete as many transactions as you want?  
  *Hint: Think about buying and selling multiple times, always selling when the price is higher than the previous day.*

- What if there is a transaction fee each time you buy or sell?  
  *Hint: How would you adjust your profit calculation to subtract the fee?*

- What if you can only complete at most k transactions?  
  *Hint: Consider using dynamic programming to keep track of the best profit at every transaction count.*

### Summary
This problem uses the greedy pattern: iterate over the array to maintain the minimum price found and update the maximum profit accordingly. This pattern of tracking a running min/max is common in problems involving one-pass optimal substructure, such as maximum subarray sums (Kadane’s Algorithm), or when computing local peaks and valleys.


### Flashcard
Track minimum price seen so far while iterating, calculating potential profit at each day as current price minus minimum, keeping maximum profit found.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)
- Best Time to Buy and Sell Stock II(best-time-to-buy-and-sell-stock-ii) (Medium)
- Best Time to Buy and Sell Stock III(best-time-to-buy-and-sell-stock-iii) (Hard)
- Best Time to Buy and Sell Stock IV(best-time-to-buy-and-sell-stock-iv) (Hard)
- Best Time to Buy and Sell Stock with Cooldown(best-time-to-buy-and-sell-stock-with-cooldown) (Medium)
- Sum of Beauty in the Array(sum-of-beauty-in-the-array) (Medium)
- Maximum Difference Between Increasing Elements(maximum-difference-between-increasing-elements) (Easy)
- Maximum Profit From Trading Stocks(maximum-profit-from-trading-stocks) (Medium)
- Best Time to Buy and Sell Stock V(best-time-to-buy-and-sell-stock-v) (Medium)