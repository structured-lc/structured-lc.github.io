### Leetcode 2144 (Easy): Minimum Cost of Buying Candies With Discount [Practice](https://leetcode.com/problems/minimum-cost-of-buying-candies-with-discount)

### Description  
Given an array where each element represents the cost of a candy, a shop offers a deal: for every two candies you buy, you can take a third (free) candy, but only if its cost is less than or equal to the minimum cost of the two bought. Return the minimum total cost to purchase all candies.

### Examples  

**Example 1:**  
Input: `cost = [1,2,3]`,  
Output: `5`  
*Explanation: Buy candies costing 2 and 3, get the 1 for free. Total = 2 + 3 = 5.*

**Example 2:**  
Input: `cost = [6,5,7,9,2,2]`,  
Output: `23`  
*Explanation: Buy 9 & 7, take 6 free. Buy 5 & 2, take 2 free. Total = 9 + 7 + 5 + 2 = 23.*

**Example 3:**  
Input: `cost = [5,5]`  
Output: `10`  
*Explanation: Only two candies, both must be bought. Total = 5 + 5 = 10.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Try all combinations of which candies to pick for buying/free—far too slow for larger arrays (factorial time).
  
- **Key Observation:**  
  To minimize cost, always get the most expensive candies as "paid", and take the cheapest ones as "free".
  
- **Greedy Approach:**  
  1. **Sort** the cost array in descending order.
  2. For every three candies, *pay* for the two most expensive and *take* the third (cheapest) for free.
  3. Repeat for all groups of 3. Any leftover 1 or 2 candies at the end, just pay for them.

- **Why optimal?**  
  Always maximizing the value of the "free" candy (by making it as expensive as possible) would be suboptimal since its price doesn’t matter. Instead, we want to minimize the price we pay overall—the above rule guarantees that.

- **Trade-offs:**  
  Sorting has O(n log n) time, but since it is only done once, and the rest is a single loop, this is efficient enough.

### Corner cases to consider  
- Only one or two candies: Both must be bought, since no free candy can be taken.
- All candies have the same price.
- Candies already sorted reverse/forward.
- Large arrays (verify O(n log n) still works in time).
- Zero-cost candies (should be handled gracefully in free/paid logic).

### Solution

```python
def minimumCost(cost):
    # Sort the cost array descending so we always pay for the most expensive available candies first
    cost.sort(reverse=True)
    total = 0
    n = len(cost)
    i = 0
    
    # Go through the array, buy 2 candies, possibly get the 3rd for free
    while i < n:
        total += cost[i]    # Pay for the first candy
        if i+1 < n:
            total += cost[i+1]  # Pay for the second candy
        # If there is a third candy, it's free, so just skip it (i+2)
        i += 3  # Process next group
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — dominated by the sorting step. The iteration after sorting is O(n).
- **Space Complexity:** O(1) extra space (sorting in place); if language sorts aren’t in place, then O(n), but no extra data structures are needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could pick any number \( k \) of candies to buy, and get one free for every \( k \) bought?  
  *Hint: Try to generalize the grouping/greedy rule for different group sizes.*

- What if candies have limited inventory (duplicates), or you can only pick unique costs for "free" candies?  
  *Hint: Consider a set or counter to track availability when picking.*

- Would the solution change if the free candy's "cost" must be strictly less than, not less than or equal to, at least one of the two purchased candies?  
  *Hint: Rethink how to group candies and perhaps what to prioritize for the free slot.*

### Summary
This problem is a classic **greedy** selection pattern: sort elements, group by rules, always minimizing cost by "paying" for the highest-priced items. Such patterns are common in discount, coupon, or buy-X-get-Y type problems and appear in inventory management or even interval/meeting scheduling—anywhere you must select elements to maximize a benefit or minimize a cost within batch/group constraints.