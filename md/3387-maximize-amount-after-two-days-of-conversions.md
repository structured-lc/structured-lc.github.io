### Leetcode 3387 (Medium): Maximize Amount After Two Days of Conversions [Practice](https://leetcode.com/problems/maximize-amount-after-two-days-of-conversions)

### Description  
You are given the name of an initial currency and you start with **1.0** unit of that currency.  
On **Day 1**, you have a list of currency exchange pairs and their conversion rates—each pair `[from, to]` lets you convert from one currency to another (and vice versa, at the reciprocal rate). You can perform any number of conversions (including zero) using any of the given pairs.  
On **Day 2**, you get a possibly different set of pairs and rates and are again allowed any number of conversions (including zero) using only those rates.  
After two days, you want to have your entire amount in the *initial currency*.  
**What is the maximum amount of initial currency you could possibly have after conversions on both days (in order)?**

### Examples  

**Example 1:**  
Input:  
`initialCurrency = "USD"`,  
`pairs1 = [["USD", "EUR"]]`,  
`rates1 = [0.9]`,  
`pairs2 = [["EUR", "USD"]]`,  
`rates2 = [1.2]`  
Output: `1.08`  
*Explanation: Day 1: convert 1 USD → 0.9 EUR.  
Day 2: convert 0.9 EUR → 1.08 USD.  
Profit because of different rates.*

**Example 2:**  
Input:  
`initialCurrency = "A"`,  
`pairs1 = [["A", "B"], ["B", "C"]]`,  
`rates1 = [2.0, 2.0]`,  
`pairs2 = [["C", "A"]]`,  
`rates2 = [0.125]`  
Output: `1.0`  
*Explanation:  
Day 1: A → B → C: 1 A → 2 B → 4 C.  
Day 2: 4 C → 0.5 A.  
But staying in A (no conversion) gives 1.0.  
Max is 1.0.*

**Example 3:**  
Input:  
`initialCurrency = "X"`,  
`pairs1 = [["X", "Y"], ["Y", "Z"]]`,  
`rates1 = [3.0, 5.0]`,  
`pairs2 = [["Z", "X"], ["Y", "X"]]`,  
`rates2 = [0.02, 0.04]`  
Output: `0.6`  
*Explanation:  
Day 1: X → Y → Z: 1 X → 3 Y → 15 Z.  
Day 2: 15 Z → 0.3 X.  
Alternatively, X → Y: 3 Y. 3 Y → 0.12 X.  
Best is 0.3 X.  
Not converting gives 1 X.  
Max: 1 X.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force**: Explore every possible sequence of conversions each day. For every currency path on day 1, consider all on day 2 for every currency. This is exponential and not scalable.

- **Optimization**:
    - Notice that on each day, repeatedly converting between currencies is allowed, and cycles with rates > 1 could expand amounts indefinitely. But since we finish by returning to the initial currency, cycles that lose value should be avoided.
    - The problem reduces to:  
      For every possible currency, after day 1, compute the **maximum amount achievable** via any path.  
      On day 2, from each possible currency, compute the **maximum amount achievable back to the initial currency**.  
    - This is a "maximum product path" problem for each day, which is effectively solved by modified Bellman-Ford (Floyd-Warshall max-product for all pairs).
    - For both days, build a **graph** for each day's exchanges including backward edges (with 1/rate), and use Bellman-Ford (with log rates for classic arbitrage, but here can use direct multiplication for max product).
    - For each currency `cur` at the end of day 1, final amount = amount_after_day1[cur] × best_possible_rate_for_day2[cur][initialCurrency], and the answer is the maximal over all such paths.

- **Why this approach**:  
  - Brute-force with all conversion orders is infeasible.  
  - DP on "best amount per currency per day" is optimal and matches the problem constraints.  
  - Graph approach gives a clean, scalable solution.

### Corner cases to consider  
- Some currencies cannot reach the initial currency on day 2.
- Rates <1 or >1 (profit/loss cycles).
- Only one currency, or empty pairs/rates.
- Repeated currencies, or unrelated currencies.
- Floating point precision (small epsilon error handling).

### Solution

```python
def maximize_amount_after_two_days(
    initialCurrency: str,
    pairs1: list[list[str]],
    rates1: list[float],
    pairs2: list[list[str]],
    rates2: list[float]
) -> float:
    # Helper to run Bellman-Ford to find the max amount for all reachable currencies
    def max_reachable(currencies, pairs, rates, start_currency):
        from collections import defaultdict, deque
        
        graph = defaultdict(list)
        for (s, t), r in zip(pairs, rates):
            graph[s].append((t, r))
            graph[t].append((s, 1 / r))
        
        # Max amount for each currency starting with 1 of start_currency
        max_amount = defaultdict(float)
        max_amount[start_currency] = 1.0
        queue = deque([start_currency])
        
        while queue:
            u = queue.popleft()
            for v, r in graph[u]:
                amt = max_amount[u] * r
                if amt > max_amount[v] + 1e-12:  # handle floating point glitch
                    max_amount[v] = amt
                    queue.append(v)
        return max_amount

    # All involved currencies from both days
    all_currencies = set()
    for p in pairs1 + pairs2:
        all_currencies.update(p)

    # Day 1: For each currency, best possible amount after conversions
    amount_after_day1 = max_reachable(all_currencies, pairs1, rates1, initialCurrency)

    # Day 2: For each possible currency after day 1, best possible amount of initialCurrency after conversions
    # Run best-from-X-to-initialCurrency, so for each X use as start currency
    # But since all trades are invertible, we can just run Bellman-Ford from all to initialCurrency by reversing edges.
    # So, run max_reachable from each candidate(currency) to initialCurrency, return their max initialCurrency.
    best_total = amount_after_day1.get(initialCurrency, 1.0)  # If no conversions, retain 1.0
    for currency, amt in amount_after_day1.items():
        # On day 2, see how much initialCurrency is reachable from currency
        down_amounts = max_reachable(all_currencies, pairs2, rates2, currency)
        if initialCurrency in down_amounts:
            best_total = max(best_total, amt * down_amounts[initialCurrency])
    
    return best_total
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(V × E) per Bellman-Ford traversal. Here, V = number of unique currencies, E = number of pairs per day.  
  We may traverse for each currency on day 2, but as implemented, it remains O(V × E) as each edge is relaxed only when it improves the best product.

- **Space Complexity:**  
  O(V + E) for the adjacency list and reachable currency set for each day.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle transactions with fees (or slippage)?
  *Hint: Incorporate a fee by multiplying the rate by (1-fee) at each step.*

- How to handle currencies with transaction limitations or forbidden conversions?
  *Hint: Remove corresponding edges or limit conversions in the graph construction.*

- What if some conversions are only allowed once per day?
  *Hint: Use DFS/BFS with state tracking of usage, or DP with bitmasks for used conversions.*

### Summary
This problem is a classic **maximum product path in a weighted, bidirectional graph**, solved efficiently via a dynamic programming approach using modified Bellman-Ford.  
The coding pattern—graph max product DP/BFS—is common for **arbitrage**, **currency exchange**, and similar optimal conversion/cost minimization problems.  
The template can be applied to networks of rates/odds/efficiency (e.g., supply chain conversions, chemical reactions).


### Flashcard
On each day, find the best conversion path (currency chain) that maximizes the final amount; use BFS/DFS or dynamic programming to explore all reachable conversions.

### Tags
Array(#array), String(#string), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
- Evaluate Division(evaluate-division) (Medium)