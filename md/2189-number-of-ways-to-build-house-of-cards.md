### Leetcode 2189 (Medium): Number of Ways to Build House of Cards [Practice](https://leetcode.com/problems/number-of-ways-to-build-house-of-cards)

### Description  
Given **n** playing cards, determine in how many ways you can build a valid "house of cards" using all cards. A house of cards:
- Is made up of one or more rows of triangles and horizontal cards.
- A triangle uses 2 cards.
- Between every pair of adjacent triangles in any row, 1 horizontal card must be placed.
- Triangles on rows above the first must sit on horizontal cards from the previous (lower) row (no overhangs!).
- Each triangle on a row must occupy the leftmost available slot, starting at the left.
- Two arrangements are different if the distribution of triangles per row for some row differs.

You must use all cards. Return the number of distinct houses.

### Examples  

**Example 1:**  
Input: `n = 16`  
Output: `2`  
*Explanation: The only possible structures are (number denotes number of triangles per row):*  
1. `[4, 3, 2, 1]`  
2. `[3, 2, 1]`  
*Both use all 16 cards. Any deviation either leaves unused cards or violates the structural rules.*

**Example 2:**  
Input: `n = 2`  
Output: `1`  
*Explanation: The one possible house: a single triangle (uses exactly 2 cards), `[1]`.*

**Example 3:**  
Input: `n = 4`  
Output: `0`  
*Explanation: Cannot use all 4 cards and obey all rules. For example, two triangles need 2\*2 = 4 cards plus 1 horizontal card = 5 cards, which is too much. No valid house can be built.*

### Thought Process (as if you’re the interviewee)  
- First, understand the formula for how many cards are needed per row:
  - Row with k triangles needs: `row_cards = 2 × k + (k-1)` (since every two triangles need a horizontal card between).
    - So, `row_cards = 3k -1`.
- For each possible way of stacking rows (starting from base, then decreasing), ensure that:
  - Upper rows cannot have more triangles than the lower row.
  - Each row must be strictly less than the one below it to prevent floating triangles.
- Brute-force: Try every partition of n into valid row sizes, starting from the largest row possible, and recursively try to build above it.
  - But this wastes redundant work.
- Optimization: Use recursion with memoization/dynamic programming. Let `dp[n]` be the number of ways to build houses with n cards.
- For each possible base row (with k triangles), calculate how many cards used, then recursively try all possible next rows with fewer triangles (and update remaining cards).
- The subproblems are overlapping, so DP is suitable.
- Trade-offs:
  - Brute-force: O(2ⁿ) (impractical for n up to 500)
  - DP: O(n²) time

### Corner cases to consider  
- n is less than the minimum needed for any house (i.e., n = 1).
- n is a number that can't possibly be constructed by the formula for row cards (e.g., n = 4).
- All possible rows combinations do not use up all n cards.
- The structure is too short for top rows to sit on lower row horizontals (i.e., "floating" triangles).

### Solution

```python
def houseOfCards(n):
    # Precompute minimal cards needed for a row with k triangles
    row_cards = [0]  # 0th index unused; at least 1 triangle per row
    k = 1
    while True:
        cards_needed = 3 * k - 1  # 2 cards per triangle + (k-1) horizontal
        if cards_needed > n:
            break
        row_cards.append(cards_needed)
        k += 1

    # DP: dp[rem][max_row] = number of ways to build houses
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dfs(rem, max_k):
        if rem == 0:
            return 1  # Used all cards: valid structure
        ans = 0
        for k in range(1, max_k + 1):
            cards_in_row = row_cards[k]
            if cards_in_row > rem:
                break
            ans += dfs(rem - cards_in_row, k - 1)  # Upper row must have ≤ k-1 triangles
        return ans

    # At most ⌊(n+1)/3⌋ triangles in the base row (smallest possible row is 3*1-1=2 cards)
    max_base = len(row_cards) - 1
    return dfs(n, max_base)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). There are n possible remaining-card values, and for each the number of possible `max_row` roughly up to n, resulting in n² subproblems. Each computed once via memoization.
- **Space Complexity:** O(n²) for DP memoization (since dfs(rem, max_k) has two parameters, both up to O(n)).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you only wanted the smallest or largest number of rows possible for n cards?
  *Hint: Keep track of current row count and optimize over min/max during recursion.*

- Can you also print one actual structure (not just count) for a given n?
  *Hint: Add a path array during recursion, and print it when a solution is found.*

- How would you modify your solution to handle up to n = 10⁶?
  *Hint: Precompute possible row combinations or use iterative DP with space optimizations.*

### Summary
The problem is a variation of classic integer partition with constraints, and is solved efficiently using top-down DP (recursion with memoization). Finds use in enumerative combinatorics and fits the "subset sum/partition" DP pattern, often used in tiling, stacking, and restricted composition problems.