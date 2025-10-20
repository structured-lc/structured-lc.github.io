### Leetcode 638 (Medium): Shopping Offers [Practice](https://leetcode.com/problems/shopping-offers)

### Description  
Given a list of items in a store (each with a price), and a set of special offers (where each offer gives you certain quantities of items for a discounted price), you need to buy a specified amount of each item. The goal is to determine the minimum cost to buy exactly the quantities you need, using any combination of individual purchases and special offers. Each offer can be used any number of times, as long as you don’t buy more items than needed.

- **price**: List of the individual price for each item.
- **special**: List of offers (quantities for each item, plus the total offer price).
- **needs**: List specifying how many of each item you need.
- You cannot buy more than you need for any item.

### Examples  

**Example 1:**  
Input:  
`price = [2, 5]`, `special = [[3,0,5],[1,2,10]]`, `needs = [3,2]`  
Output:  
`14`  
*Explanation: Buy special offer #2 once for 1A + 2B ($10), then buy 2A individually ($2 × 2 = $4). 10 + 4 = 14.*

**Example 2:**  
Input:  
`price = [2,3,4]`, `special = [[1,1,0,4],[2,2,1,9]]`, `needs = [1,2,1]`  
Output:  
`11`  
*Explanation: Take offer #1 once (1A + 1B for $4), and buy 1B ($3) and 1C ($4) individually. 4 + 3 + 4 = 11. Offers give no savings in this case.*

**Example 3:**  
Input:  
`price = [2]`, `special = [[1,3]]`, `needs = [2]`  
Output:  
`4`  
*Explanation: Only one item, no benefit from offers (since offer gives 1A for $3, but 2 × $2 = $4 is better), so buy individually.*

### Thought Process (as if you’re the interviewee)  

First, the brute-force idea is to try all possible combinations of offers and purchases—at each point, for a remaining need, try every applicable offer (including not using any), subtract the quantities in the offer from the need, recursively solve for the new need, and keep track of the minimum.  

Given that `n` (number of items) is small (≤ 6), and each need ≤ 6, the total state space is small (about 7⁶ for all needs). So brute-force recursion with memoization is feasible.

1. **Base case:** If all needs are zero, total cost is 0.
2. **Transition:** For current `needs`:
    - Try every offer. If the offer can be applied (doesn't exceed any need), subtract offer’s items from needs, add offer’s price, solve remaining needs recursively.
    - Always consider the case of buying all items individually (no offer).
3. **Optimization:** Use memoization (DP with state as tuple of remaining needs) to avoid recomputation.

Trade-offs:
- No need to worry about cycles, as we only apply offers if they fit.
- Can’t buy more than needed as it doesn’t help; memoization is a must.

### Corner cases to consider  
- Needs array is all zeros, i.e., nothing to buy (min cost is 0).
- Offers that are more expensive than buying items individually (should be ignored).
- Offers that can't be used as they'd lead to buying more than needed.
- Needs contain only one kind of item.
- Offers that don't give any item for needed types.
- Multiple useless offers.

### Solution

```python
def shoppingOffers(price, special, needs):
    # Memoization to store results of subproblems
    memo = {}

    def dfs(cur_needs):
        needs_tuple = tuple(cur_needs)
        if needs_tuple in memo:
            return memo[needs_tuple]

        # Minimum cost (default: buy all remaining needs at original price)
        cost = sum(
            cur_needs[i] * price[i] for i in range(len(price))
        )
        
        for offer in special:
            valid = True
            updated_needs = []
            for i in range(len(price)):
                if offer[i] > cur_needs[i]:
                    valid = False
                    break
                updated_needs.append(cur_needs[i] - offer[i])
            # Only apply offer if possible
            if valid:
                offer_cost = offer[-1] + dfs(updated_needs)
                if offer_cost < cost:
                    cost = offer_cost

        memo[needs_tuple] = cost
        return cost

    return dfs(needs)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(7ⁿ × m), where n is the number of items (≤ 6) and m is the number of offers. 7ⁿ is the size of possible needs states (from 0 to needs[i] for each item).
- **Space Complexity:** O(7ⁿ) for memoization storage (number of unique needs states).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could *buy more than needed* if an offer saves money?
  *Hint: Requires adjusting logic to allow overshooting needs and track excess.*

- What if *offers* can only be used *once*?
  *Hint: Need to add a state parameter to track used offers.*

- How would you *efficiently prune* useless offers (those not cheaper than buying individually)?
  *Hint: Preprocess and remove such offers before recursion.*

### Summary
This problem uses the **classic recursive DFS with memoization (DP over states)** pattern, commonly applied in *combination optimization* under constraints with a small number of dimension variables. Similar patterns are frequent in "shopping offers," "multi-dimensional knapsack," "coin change," and "shortest path with state constraints" problems.


### Flashcard
Use recursion with memoization; for each need, try all offers and direct purchases, cache results for each state to minimize total cost.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Memoization(#memoization), Bitmask(#bitmask)

### Similar Problems
