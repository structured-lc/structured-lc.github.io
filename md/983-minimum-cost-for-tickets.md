### Leetcode 983 (Medium): Minimum Cost For Tickets [Practice](https://leetcode.com/problems/minimum-cost-for-tickets)

### Description  
Given a list of **days** representing the specific days you want to travel within a year (days are between 1 and 365), and an array **costs** of three integers where:
- `costs` is the price of a 1-day pass,
- `costs[1]` is the price of a 7-day pass,
- `costs[2]` is the price of a 30-day pass,

Return the *minimum cost* you need to spend on tickets such that you can travel on each of the given days. You can buy passes in any order and in any quantity.

### Examples  

**Example 1:**  
Input: `days = [1,4,6,7,8,20]`, `costs = [2,7,15]`  
Output: `11`  
*Explanation: Buy a 7-day pass on day 6 ($7, covers days 6-12) and 1-day passes on days 1 and 4 (2 + 2). Total = 2 + 2 + 7 = 11.*

**Example 2:**  
Input: `days = [1,2,3,4,5,6,7,8,9,10,30,31]`, `costs = [2,7,15]`  
Output: `17`  
*Explanation: Buy a 7-day pass on day 1 ($7, covers days 1-7), a 7-day pass on day 8 ($7, covers days 8-14), and 1-day passes for days 30 and 31 (2 + 2). Total = 7 + 7 + 2 + 2 = 18, but with a 30-day pass for days 1-30 ($15) and a 1-day pass for day 31 ($2): 15 + 2 = 17 (minimum).*

**Example 3:**  
Input: `days = [2,10,25,26,27,28,29,30]`, `costs = [3,12,28]`  
Output: `15`  
*Explanation: Buy a 1-day pass for day 2 ($3), 1-day pass for day 10 ($3), and a 7-day pass for day 25 ($12, covers days 25-31). Total = 3 + 3 + 12 = 18, but if we buy a 30-day pass for all days at once ($28), it's more expensive, so answer is 18. But actually a 7-day for days 25-31 ($12) and 1-days on 2 and 10 ($3 + $3): 12 + 3 + 3 = 18.*

### Thought Process (as if you’re the interviewee)  
First, let's consider a brute-force approach: for each travel day, try buying each possible ticket (1-day, 7-day, or 30-day pass), recursively, and compute the total minimum cost. We'd have to track which days are covered by each pass and compute the minimum sum covering all trips.

However, as the number of possible combinations grows large (exponentially), pure recursion without optimization is not feasible.

To optimize, notice two key points:
- The problem has optimal substructure (best way to cover first i days uses the best way to cover the previous days).
- There is overlapping subproblem structure (many subproblems are computed multiple times).

By using **Dynamic Programming**, store the minimum cost up to each day. There are two standard approaches:
- **Top-down recursion with memoization:** For each travel day, try all ticket-purchasing options (1, 7, 30-day). Use `bisect` or pointers to skip to the next day not covered by the pass, and memoize results.
- **Bottom-up DP:** Create a DP array where `dp[d]` is the min cost to travel up to day d. For each day, carry forward the cost or consider buying each type of pass.

Since there are at most 365 days, both DP approaches are efficient.

Choosing the bottom-up DP is easier to debug and intuitive here. We loop through each day up to the largest travel day, and for each, decide how to get to this day at minimal cost using previous computed values.

### Corner cases to consider  
- Only one travel day, or travel days are far apart.
- Travel days are all consecutive.
- Costs are such that always buying 1-day passes is best.
- Very big gap between some travel days (e.g., buy two 1-day instead of 7-day).
- Days array is empty or None (should return 0).
- Costs are all equal.

### Solution

```python
def mincostTickets(days, costs):
    # Initialize a set for quick lookup of travel days
    dayset = set(days)
    # The last day we need to travel
    last_day = days[-1]
    # DP array initialization: dp[i] = minimum cost to cover days up to day i
    dp = [0] * (last_day + 1)

    for d in range(1, last_day + 1):
        if d not in dayset:
            # If not a travel day, no extra cost, same as previous day
            dp[d] = dp[d-1]
        else:
            # Option 1: buy 1-day pass
            cost1 = dp[d-1] + costs[0]
            # Option 2: buy 7-day pass
            cost7 = dp[max(0, d-7)] + costs[1]
            # Option 3: buy 30-day pass
            cost30 = dp[max(0, d-30)] + costs[2]
            dp[d] = min(cost1, cost7, cost30)
    # The answer is at dp[last_day]
    return dp[last_day]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(D), where D is the range covered by days; at most 365. For each day from 1 to last day in **days**, we do constant-time checks.
- **Space Complexity:** O(D), for the DP array of size up to 366.

### Potential follow-up questions (as if you’re the interviewer)  

- What if days covers the whole year (every day from 1 to 365)?  
  *Hint: Think about cases where always buying the longest pass is better.*

- Can you do this in O(n) time, where n = number of travel days, instead of O(D) where D is up to 365?  
  *Hint: Use pointers only for travel days, skip non-travel days.*

- Suppose passes can be of arbitrary lengths (not just 1, 7, 30), given as a list. How would you generalize?  
  *Hint: Try a loop over pass durations and dynamically simulate choices.*

### Summary
This problem is a classic example of the **DP on time/intervals** pattern, commonly used for scheduling and cost minimization problems. The key idea is to use DP to store the minimum cost up to each relevant point, and for each step, consider *all options* and choose the optimal one. This pattern appears in problems like coin change, word segmentation, and others dealing with "covering" with the fewest or cheapest resources.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Coin Change(coin-change) (Medium)
- Most Expensive Item That Can Not Be Bought(most-expensive-item-that-can-not-be-bought) (Medium)