### Leetcode 2291 (Medium): Maximum Profit From Trading Stocks [Practice](https://leetcode.com/problems/maximum-profit-from-trading-stocks)

### Description  
Given two arrays, **present** and **future**, representing the current and future prices of different stocks, and an integer **budget**, determine the **maximum profit** you can achieve by buying zero or more stocks (each at most once) with the given budget. If you buy stock i at present[i] and sell it at future[i], your profit for that stock is future[i] − present[i]. You can't spend more than budget in total.

You may choose **any subset** of stocks, but can buy each at most once, and the sum of present[i] for chosen stocks must be ≤ budget. Find the maximum total profit possible.

### Examples  

**Example 1:**  
Input: `present = [5,4,6,2,3]`, `future = [8,5,4,3,5]`, `budget = 10`  
Output: `6`  
*Explanation:  
- Buy stock 0 (cost 5, profit 3), stock 1 (cost 4, profit 1), and stock 4 (cost 3, profit 2).  
- But budget exceeded if you pick all 3.  
- Best is to pick stocks 1 (cost 4, profit 1) and 4 (cost 3, profit 2), and stock 0 (cost 5, profit 3):  
— If you pick 0 and 4: cost = 5+3=8, profit = 3+2=5  
— If you pick 1 and 4: cost = 4+3=7, profit = 1+2=3  
— If you pick 0 and 1: cost = 5+4=9, profit = 3+1=4  
— If you pick 0, 1, and 4: cost = 5+4+3=12 (over budget)  
- Actually, the best is stock 0 and 4: profit=5; or 0 and 1: profit=4; but considering all combinations, picking stocks 0, 3, and 4 costs 5+2+3=10, profit=3+1+2=6 (matches budget exactly).*

**Example 2:**  
Input: `present = [2,1,4]`, `future = [5,2,7]`, `budget = 3`  
Output: `4`  
*Explanation:  
- Buying stock 1 (cost 1, profit 1), and stock 0 (cost 2, profit 3) costs 1+2=3 (budget), total profit=1+3=4.  
- Can't buy stock 2 (cost 4) since budget is only 3.*

**Example 3:**  
Input: `present = [3]`, `future = `, `budget = 2`  
Output: `0`  
*Explanation:  
- Can't buy any stock since budget is less than the only stock price (3).*

### Thought Process (as if you’re the interviewee)  

- The core problem is classic 0/1 knapsack:
    - Each stock can either be included or excluded.
    - You can include a stock only if you have at least present[i] budget left.
    - Profit when including: profit[i] = future[i] - present[i].
    - The objective: maximize sum of selected profits, with total cost ≤ budget.
- **Brute-force:** Try all subsets (2ⁿ), sum costs and profits. Exponential, not feasible for n≥20.
- **DP (Dynamic Programming):**
    - Use 1D dp array: dp[j] = max profit with budget j.
    - For each stock, traverse budget in reverse (to avoid reuse per stock).
    - Update: dp[j] = max(dp[j], dp[j-present[i]] + profit[i]) for all j ≥ present[i].
    - This is exactly the space-efficient knapsack algorithm.

Why is this optimal approach?
- Each stock can be picked once, and we need to maximize the total profit without exceeding the budget.
- DP makes it O(n × budget), which passes constraints if budget isn't extremely large.
- In interviews, always recognize this canonical 0/1 knapsack structure.

### Corner cases to consider  
- Empty `present` or `future` arrays: can't buy any stocks.
- All stocks cost more than budget: profit is 0.
- Some stocks have future[i] ≤ present[i]: profit ≤ 0, should never buy these.
- Only one stock, check if can buy.
- Budget is 0: can't buy.
- Negative or zero profits.
- Maximum allowed values for budget (overflow?).

### Solution

```python
from typing import List

class Solution:
    def maximumProfit(self, present: List[int], future: List[int], budget: int) -> int:
        # Compute the number of stocks
        n = len(present)
        # dp[j]: max profit using budget j
        dp = [0] * (budget + 1)
        for i in range(n):
            cost = present[i]
            profit = future[i] - present[i]
            # Only consider stocks which are profitable (optional)
            if profit <= 0:
                continue
            # Traverse budget in reverse so each stock is used at most once
            for j in range(budget, cost - 1, -1):
                # For budget j, check if buying this stock improves profit
                dp[j] = max(dp[j], dp[j - cost] + profit)
        # Maximum profit at full budget
        return dp[budget]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × budget), where n = len(present).  
  For each stock, we iterate from budget down to cost, updating dp.
- **Space Complexity:** O(budget), because we only keep one dp array of size (budget+1).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could buy multiple shares of each stock?
  *Hint: That would become the unbounded knapsack problem.*

- How would you recover the actual list of stocks bought?
  *Hint: Store choice info at each dp step or backtrack from the dp array.*

- What if the budget or present prices are very large (up to 10⁹)?
  *Hint: Classic DP is infeasible; can you find a greedy or approximation algorithm?*

### Summary
The solution uses the **0/1 knapsack DP pattern**, a foundational dynamic programming technique for resource allocation under constraints. Recognizing the mapping between the problem and 0/1 knapsack is key. This pattern is broadly applicable in any scenario where you must choose a subset of items with weights and values under a total capacity. Similar patterns appear in problems on subset sums, partitioning, and resource-limited selection algorithms.


### Flashcard
Classic 0/1 knapsack: dp[j] = max profit with budget j, considering each stock’s cost and profit.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Best Time to Buy and Sell Stock(best-time-to-buy-and-sell-stock) (Easy)
- Best Time to Buy and Sell Stock II(best-time-to-buy-and-sell-stock-ii) (Medium)
- Best Time to Buy and Sell Stock III(best-time-to-buy-and-sell-stock-iii) (Hard)
- Best Time to Buy and Sell Stock IV(best-time-to-buy-and-sell-stock-iv) (Hard)