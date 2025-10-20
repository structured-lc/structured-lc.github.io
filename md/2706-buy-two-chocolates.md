### Leetcode 2706 (Easy): Buy Two Chocolates [Practice](https://leetcode.com/problems/buy-two-chocolates)

### Description  
Given an array of integers `prices` representing the cost of chocolates in a store and an integer `money` representing how much you have, you need to buy exactly **two** chocolates so that you still have **non-negative** money left. The goal is to minimize the money left after buying—the two chocolates should be as expensive as possible while still within your budget.  
If it is **not possible** to buy any two chocolates within your budget, return the initial amount of `money` (since you buy nothing).

### Examples  

**Example 1:**  
Input: `prices = [1,2,2]`, `money = 3`  
Output: `0`  
*Explanation: Buy the chocolates priced 1 and 2. Total cost = 3, remaining money = 0.*

**Example 2:**  
Input: `prices = [3,2,3]`, `money = 3`  
Output: `3`  
*Explanation: The cheapest pair costs 2+3=5, but you have only 3. So, you cannot buy two, return your initial money (3).*

**Example 3:**  
Input: `prices = [4,4,4,4]`, `money = 8`  
Output: `0`  
*Explanation: Any two chocolates cost 8, which matches the budget exactly. Remaining money = 0.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Test all pairs of chocolates (for all 0 ≤ i < j < n), check if sum ≤ money, and track the largest sum not exceeding `money`. Subtract from `money` for the answer.  
  This would take O(n²) time.

- **Optimization:**  
  Buying the two *cheapest* chocolates will minimize leftover money, because if you can't even afford the two cheapest, you can't afford any other pair.  
  So:
    - Sort the `prices`.
    - Get the sum of the two smallest (prices + prices[1]).
    - If `sum` ≤ money: return `money - sum`.
    - Else: return `money`.

- **Trade-offs:**  
  Sorting is O(n log n), better than checking all pairs (O(n²)). Code is clean, easy to justify why minimal pair suffices.

### Corner cases to consider  
- Fewer than 2 chocolates in the array.
- All prices are higher than `money`.
- Exactly two chocolates in the array.
- All prices equal.
- Some prices are zero.
- `money` is zero.
- Large values (potential integer overflow in other languages).

### Solution

```python
def buyChoco(prices, money):
    # Sort prices to find the two cheapest easily
    prices.sort()
    
    # If not enough chocolates to buy two, just return original money
    if len(prices) < 2:
        return money

    # Cost for two cheapest chocolates
    total_cost = prices[0] + prices[1]
    
    # If affordable, return money left after purchase, else return original money
    if total_cost <= money:
        return money - total_cost
    else:
        return money
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n) — Sorting the price array dominates. All other operations are O(1).

- **Space Complexity:**  
  O(1) extra — Sorting can be in-place (ignoring input storage). No auxiliary data structures used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to buy **k** chocolates instead of two?  
  *Hint: Find the sum of the k smallest prices. What if prices is smaller than k?*
  
- Could you solve this in O(n) time?  
  *Hint: Find the two minimums in a single pass.*

- What should you return if no chocolates can be bought at all (i.e., all prices > `money`) or if only one can be bought?  
  *Hint: Handle degenerate cases explicitly.*

### Summary
We use a **greedy two-pointer/min-heap**-like approach by first sorting prices and considering only the sum of the two cheapest (guaranteed minimal cost). Sorting ensures correctness in O(n log n) time, and the coding pattern is typical for "pick k smallest/largest" themed problems.  
This "pick-two-smallest after sort" technique is broadly applicable for any "combine k items for minimal/maximal sum" variation. For tightest efficiency, we could do it in O(n) by linearly finding the two lowest prices instead of sorting.


### Flashcard
Sort prices and, if you can afford the two cheapest chocolates, subtract their sum from money; otherwise, return money.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
