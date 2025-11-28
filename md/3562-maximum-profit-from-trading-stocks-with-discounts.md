### Leetcode 3562 (Hard): Maximum Profit from Trading Stocks with Discounts [Practice](https://leetcode.com/problems/maximum-profit-from-trading-stocks-with-discounts)

### Description  
You are given a **company hierarchy** of n employees, labeled `1` to `n` (with employee 1 as the CEO/root of the tree). Each employee can buy one share of stock at a given present-day price and may sell it tomorrow at a projected future price.  
There is a **discount policy**:  
- If an employee’s boss directly purchases their own stock, then the employee can buy their own stock at **half** their present price (integer division).
You are also given a total **budget** constraint:  
- Each employee can buy *at most one* share (or none), and you cannot exceed the total budget.
**Goal:** Maximize the total profit (total sell prices - spent buy prices) possible under these constraints.

### Examples  

**Example 1:**  
Input:  
`n = 3`, `edges = [[1,2],[1,3]]`, `present = [1, 3, 5]`, `future = [6, 5, 2]`, `budget = 5`  
Output: `7`  
*Explanation:  
- It's a tree:  
  ```
      1
     / \
    2   3
  [present: 1,3,5]
  ```
- Buy 1’s stock at 1 (he's the root), budget left=4.
- Because 1 bought, 2 and 3 can buy at half price.
- Buy 2 at ⌊3/2⌋=1. Budget left=3.
- Buy 3 at ⌊5/2⌋=2. Budget left=1.
- Sell: 1→6, 2→5, 3→2.
- Total spent: (1+1+2)=4. Total sell: (6+5+2)=13. **Profit = 9** with spent 4 and budget 5, so output is 9.
But budget=5. Let’s confirm: Buy 1 and 2 only: spent=1+1=2, sell=6+5=11, profit=9. Buy 1 and 3: spent=1+2=3, sell=6+2=8, profit=5. Buy 1 only: spent=1, sell=6, profit=5. Buy 2 only: spent=3, sell=5, profit=2. Buy 3 only: spent=5, sell=2, profit=–3. Best is buy 1 and 2: profit=10.
Hence, **Output=10** (buy 1 and 2, with 1’s purchase unlocking 2’s half-price).

**Example 2:**  
Input:  
`n = 2`, `edges=[[1,2]]`, `present = [2,2]`, `future = [4,9]`, `budget=2`  
Output: `7`  
*Explanation:  
- Tree:
  ```
   1
   |
   2
  [2,2]
  ```
- Only enough budget for a single buy at most.
- If only buy 2 at price 2, sell at 9, profit=7.
- If buy only 1 at 2, sell at 4, profit=2.
- Since both present prices are 2 (no discount possible within budget), best is buy 2 → profit 7.*

**Example 3:**  
Input:  
`n=3`, `edges=[[1,2],[2,3]]`, `present=[2,6,3]`, `future=[8,11,9]`, `budget=6`  
Output: `16`  
*Explanation:  
- Tree:
  ```
   1
   |
   2
   |
   3
  [2,6,3]
  ```
- Buy 1 (cost=2), gives 2 half-price: ⌊6/2⌋=3
- Now, can buy 2 (cost=3), gives 3 half-price: ⌊3/2⌋=1
- Can buy 3 at 1.
- Spent total: 2+3+1=6 (full budget), get sell: 8+11+9=28
- Profit = 28–6=22.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For each node, try every combination of buying/not buying; in each, adjust child prices if parent was bought. Track budget. But this is O(2ⁿ), not tractable for n~160.
- **Optimize:**  
  Recognize this is very similar to "tree DP with state":  
  - At each node, you can **buy** (at full/half price), or **not buy**.  
  - When you buy, the child gets discount. This is like “each subtree can choose how to split the budget between buy and not-buy options for their children.”  
  - For each node, for each possible budget spent so far (up to total budget), track the best profit.
  - DP structure: dp[node][budget][parent\_bought] = max profit
  - Combine DP results bottom-up over the tree. Use small budget limit to drive complexity.
  - For each child, run DP for all budget splits, updating dp accordingly.
  - **Trade-off:** With n and budget both up to 160, DP with O(n × budget × 2) states is feasible since n×budget=~25,000, and combining cost is quadratic, but with memoization/pruning, it works.

### Corner cases to consider  
- Tree with only 1 node (CEO)
- Tree with high budget but poor profits
- Tree where only the CEO buy enables any other purchases (i.e., chain/tree reality)
- When all prices are higher than budget (should return 0)
- When multiple possible buy paths lead to the same profit—choose any.

### Solution

```python
def maximumProfit(n, edges, present, future, budget):
    # Build the tree
    from collections import defaultdict

    tree = defaultdict(list)
    for u, v in edges:
        tree[u - 1].append(v - 1)  # 0-indexed

    # DP[state][budget_spent][was_parent_bought]:
    # At each node, for a given budget, store max profit for either parent bought or not

    # dp[node][budget][parent_bought]
    # returns: [profits if parent not bought at current node, profits if parent bought at current node]

    def dfs(u):
        # dp0: if parent didn't buy, for each budget, profit
        # dp1: if parent did buy, for each budget, profit
        
        dp0 = [float('-inf')] * (budget + 1)  # parent not bought at u
        dp1 = [float('-inf')] * (budget + 1)  # parent bought at u
        dp0[0] = 0
        dp1[0] = 0

        for child in tree[u]:
            c_dp0, c_dp1 = dfs(child)

            # combine current dp0 with child's dp0
            new_dp0 = [float('-inf')] * (budget + 1)
            new_dp1 = [float('-inf')] * (budget + 1)
            # combine dp0
            for b in range(budget + 1):
                if dp0[b] == float('-inf'):
                    continue
                for cb in range(budget + 1 - b):
                    if c_dp0[cb] == float('-inf'):
                        continue
                    if dp0[b] + c_dp0[cb] > new_dp0[b + cb]:
                        new_dp0[b + cb] = dp0[b] + c_dp0[cb]
            dp0 = new_dp0

            # combine dp1
            for b in range(budget + 1):
                if dp1[b] == float('-inf'):
                    continue
                for cb in range(budget + 1 - b):
                    if c_dp1[cb] == float('-inf'):
                        continue
                    if dp1[b] + c_dp1[cb] > new_dp1[b + cb]:
                        new_dp1[b + cb] = dp1[b] + c_dp1[cb]
            dp1 = new_dp1

        result_dp0 = dp0[:]
        result_dp1 = dp1[:]

        # At current node, consider:
        # 1. Do not buy at u -- keep dp0 and dp1 as is.
        # 2. Buy at u:
        #    - If parent not bought: buy at present[u]
        #         (then for children, their parent IS bought: so after this, children use dp1)
        #    - If parent IS bought: buy at present[u] // 2 (discounted)
        #         (then children use dp1 too: since their parent still bought)

        # For both parent_bought=False and True, process buy (with different prices)

        # 2.1. Buy at u, parent not bought
        buy_price = present[u]
        profit = future[u] - buy_price
        # To buy at u, need to have enough budget
        for b in range(buy_price, budget + 1):
            # When buying at u, all children must use dp1 version (parent bought)
            children_profit = dp1[b - buy_price]
            # Check if this improves
            if children_profit + profit > result_dp0[b]:
                result_dp0[b] = children_profit + profit

        # 2.2. Buy at u, parent bought
        buy_price = present[u] // 2
        profit = future[u] - buy_price
        for b in range(buy_price, budget + 1):
            children_profit = dp1[b - buy_price]
            if children_profit + profit > result_dp1[b]:
                result_dp1[b] = children_profit + profit

        return result_dp0, result_dp1

    dp0, dp1 = dfs(0)
    return max(max(dp0), max(dp1))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × budget²).  
  For each of n nodes, within dfs, in worst case for each budget, combine with each possible budget split for children (budget). This gives O(n × budget²), acceptable for n, budget ≤ 160.

- **Space Complexity:** O(n × budget × 2).  
  Each node may maintain two arrays of size budget+1 (for parent bought/not bought). Can be optimized to O(budget) per recursion if needed.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose there’s a limit to **how many stocks** can be bought overall, not just by budget?  
  *Hint: Add another dimension to DP for stock count.*

- What if discounts are **not just for direct children** but for all subordinates when boss buys?  
  *Hint: Need a different tree DP propagation scheme, perhaps track “ancestor bought” state.*

- What if the company structure is not a tree but a **general graph**?  
  *Hint: Tree DP doesn’t work, must handle cycles—likely NP-hard.*

### Summary
This is a classic **tree DP with state propagation**, allied to knapsack-style dynamic programming patterns. Each node considers "to buy or not to buy," with subsequent impact cascading to its children (as discount eligibility). Problems combining hierarchical structures (trees) and budgeted subproblem choices (a kind of multidimensional knapsack) are frequent in interviews and competitive programming. Similar logic applies in problems where you must make budgeted investments/subset selections respecting a hierarchical dependency.


### Flashcard
Use tree DP where each node tracks the maximum profit achievable with a given budget; at each node, decide whether to buy (at full or half price) or skip, and propagate budget constraints to children.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
