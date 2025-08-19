### Leetcode 123 (Hard): Best Time to Buy and Sell Stock III [Practice](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii)

### Description  
Given an array, where each element is the stock price on the iᵗʰ day, find the **maximum profit** you can achieve by making at most **two** buy-sell transactions.  
- You cannot hold more than one stock at a time (must sell before buying again).
- The transactions must be completed in order (buy, then sell, buy, then sell).

### Examples  

**Example 1:**  
Input: `[3,3,5,0,0,3,1,4]`  
Output: `6`  
Explanation: Buy on day 4 (price=0), sell on day 6 (price=3), profit=3.  
Then buy on day 7 (price=1), sell on day 8 (price=4), profit=3. Total profit = 3 + 3 = 6.

**Example 2:**  
Input: `[1,2,3,4,5]`  
Output: `4`  
Explanation: Buy on day 1 (price=1), sell on day 5 (price=5), profit=4. No second transaction is needed.

**Example 3:**  
Input: `[7,6,4,3,1]`  
Output: `0`  
Explanation: No transaction is possible since the prices only decrease; max profit is 0.


### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try all possible pairs (i, j) for the first buy-sell transaction and all pairs after j for the second transaction. Calculate profit for each split.  
  This is O(n³) and completely infeasible for n up to 10⁵.

- **Better Approach**:  
  Notice that with two transactions, for every split point k (0 ≤ k < n),  
  - Compute max profit from [0...k] (at most one transaction)
  - Compute max profit from [k+1...n-1] (at most one transaction)
  - Keep the best sum among all split points

  This is O(n²) if done naively, but can be optimized.

- **Optimal DP Approach:**  
  - Use four variables:
    - first_buy: max profit after first buy (initialized to -∞)
    - first_sell: max profit after first sell (initialized to 0)
    - second_buy: max profit after second buy (initialized to -∞)
    - second_sell: max profit after second sell (initialized to 0)
  - Traverse prices:
    - Update first_buy: max(first_buy, -price)
    - Update first_sell: max(first_sell, first_buy + price)
    - Update second_buy: max(second_buy, first_sell - price)
    - Update second_sell: max(second_sell, second_buy + price)
  - The answer is second_sell.

  This only needs O(1) space and O(n) time.

  Why is this correct? Each state records the best you could do so far after each operation, reusing information as you iterate.

### Corner cases to consider  
- Empty prices array
- Only one day in prices
- All prices are equal
- Always decreasing prices (no profit possible)
- Only one increasing segment (max profit with one transaction)

### Solution

```python
def maxProfit(prices):
    if not prices:
        return 0

    # Initialize profits:
    # first_buy: max profit after first buy (negative, since we spend money)
    first_buy = float('-inf')
    # first_sell: max profit after first sell
    first_sell = 0
    # second_buy: max profit after buying stock second time
    second_buy = float('-inf')
    # second_sell: max profit after second sell
    second_sell = 0

    for price in prices:
        # First buy: maximize -price
        first_buy = max(first_buy, -price)
        # First sell: maximize profit if selling today
        first_sell = max(first_sell, first_buy + price)
        # Second buy: maximize if buying second time today, subtract price from first_sell
        second_buy = max(second_buy, first_sell - price)
        # Second sell: maximize if selling second time today
        second_sell = max(second_sell, second_buy + price)

    return second_sell
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Only a single pass through prices is needed. Each step does O(1) work.

- **Space Complexity:** O(1)  
  Only four variables are maintained regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are allowed **k** transactions?  
  *Hint: Try a general dynamic programming approach using a dp table for transactions and days.*

- How would you optimize if the array is too large to store in memory?  
  *Hint: Can you process data in chunks and maintain cumulative profit variables?*

- Can you reconstruct the days (indices) when the buys and sells occurred?  
  *Hint: Store potential transaction points while updating the variables, then retrace at the end.*

### Summary
This problem uses a classic **Dynamic Programming (DP, state machine)** pattern where you iterate through the list, updating the optimal choice at each step by tracking the states of transactions.  
The four-state DP is also common for "Buy and Sell Stock" series, and is easily extended to k transactions. This approach avoids nested loops and is easy to extend or adapt for more complex stock-related interview problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Best Time to Buy and Sell Stock(best-time-to-buy-and-sell-stock) (Easy)
- Best Time to Buy and Sell Stock II(best-time-to-buy-and-sell-stock-ii) (Medium)
- Best Time to Buy and Sell Stock IV(best-time-to-buy-and-sell-stock-iv) (Hard)
- Maximum Sum of 3 Non-Overlapping Subarrays(maximum-sum-of-3-non-overlapping-subarrays) (Hard)
- Maximum Profit From Trading Stocks(maximum-profit-from-trading-stocks) (Medium)
- Maximize Win From Two Segments(maximize-win-from-two-segments) (Medium)