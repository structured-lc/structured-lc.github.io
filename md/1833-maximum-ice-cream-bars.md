### Leetcode 1833 (Medium): Maximum Ice Cream Bars [Practice](https://leetcode.com/problems/maximum-ice-cream-bars)

### Description  
Given an array `costs` where costs[i] is the price in coins of the iᵗʰ ice cream bar, and an integer `coins`, return the maximum number of ice cream bars that can be bought with the coins available.  
You may buy the bars in any order.

### Examples  

**Example 1:**  
Input: `costs = [1,3,2,4,1], coins = 7`  
Output: `4`  
*Explanation: Buy bars with costs 1, 1, 2, and 3 (total 7 coins). You can't afford the bar costing 4 after these.*

**Example 2:**  
Input: `costs = [10,6,8,7,7,8], coins = 5`  
Output: `0`  
*Explanation: All bars are more expensive than the coins available, so buy 0 bars.*

**Example 3:**  
Input: `costs = [1,6,3,1,2,5], coins = 20`  
Output: `6`  
*Explanation: Buy all bars (cost total is 1+1+2+3+5+6=18 ≤ 20).*

### Thought Process (as if you’re the interviewee)  
- The prompt asks for the **maximum number** of affordable bars.
- **Brute-force idea:** Try all combinations, track spending and count. But that’s exponential and not feasible for large input.
- **Key Insight:** Bars can be bought in any order, so buy the cheapest ones first to maximize count.
- **Optimized Greedy approach:**  
  - Sort the `costs`.
  - Buy in increasing order of cost, subtracting from coins until you can't afford the next.
  - This is efficient (O(n log n)) and guarantees optimal answer because picking the cheapest first always leaves as much room as possible for the next item.

**Trade-off:**  
- Sorting costs O(n log n), but with unsorted access can’t efficiently find the next cheapest bar.
- There is a counting sort variant if the costs are small positive integers, which can be O(n + k) (k is the range of ice cream bar costs).

### Corner cases to consider  
- Empty `costs` array ⇒ should return 0.
- All `costs` greater than `coins` ⇒ return 0.
- `coins` is 0 ⇒ can’t afford anything, return 0.
- All `costs` exactly equal to `coins` ⇒ can buy only one.
- One element in `costs` array, affordable/unaffordable.

### Solution

```python
def maxIceCream(costs, coins):
    # Sort costs to buy cheapest bars first
    costs.sort()
    count = 0
    for price in costs:
        if coins >= price:
            coins -= price    # Spend coins
            count += 1        # Bought one bar
        else:
            break             # Can't afford more
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — Sorting is the dominant operation. Iterating and buying is O(n).
- **Space Complexity:** O(1) extra (after input). Sorting in-place if allowed. If not, then O(n) for the sorted copy.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the `costs` can be very large (e.g., up to 10⁷ elements) but all costs are small integers?
  *Hint: Is there a way to avoid O(n log n) sorting using a counting array?*

- How would you solve this if you had to report WHICH bars to buy (not just the count)?
  *Hint: Track indices as you purchase (before or after sort), possibly pair with original indices.*

- Suppose coins and/or costs can be negative. How do you handle such input?
  *Hint: Validate input and clarify if negative cost/coin is valid in real scenarios.*

### Summary

This problem is a classic **Greedy** pattern — always make the locally optimal choice (buy the cheapest available). Sorting the price list and consuming until out of budget gives the best global result.  
The algorithm pattern applies widely in maximizing choices given limited resources, such as activity selection, knapsack (greedy variant), and scheduling.  
If all inputs are small integers, a counting/bucket sort pattern can be used for O(n) solutions.