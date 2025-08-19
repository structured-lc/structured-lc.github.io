### Leetcode 2064 (Medium): Minimized Maximum of Products Distributed to Any Store [Practice](https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store)

### Description  
Given **n** stores and an array **quantities** of length m, where each quantities[i] is the number of units for the iᵗʰ product type, distribute all product units to stores such that:
- Each store can receive at most one type of product.
- A store can receive any (possibly zero) amount of their chosen product type.
- The goal is to **minimize the highest number of products given to any store**.

In other words, find the smallest integer x such that it is possible to distribute all products and no store receives more than x units.

### Examples  

**Example 1:**  
Input: `n = 5, quantities = [11, 6]`  
Output: `4`  
*Explanation:*
- Distribute product 0 (11 units) into 3 stores: each takes at most 4 units → ⌈11/4⌉ = 3 stores.
- Distribute product 1 (6 units) into 2 stores: each takes at most 4 units → ⌈6/4⌉ = 2 stores.
- Total stores needed = 3 + 2 = 5 = n.
- No lower x would allow this, as you would need more stores.

**Example 2:**  
Input: `n = 6, quantities = [15, 10, 10]`  
Output: `5`  
*Explanation:*
- For 15: ⌈15/5⌉ = 3 stores.
- For 10: ⌈10/5⌉ = 2 stores.
- For 10: ⌈10/5⌉ = 2 stores.
- Total = 7 > 6. Try x=6: ⌈15/6⌉=3, ⌈10/6⌉=2, ⌈10/6⌉=2 → 3+2+2=7. Try x=7: ⌈15/7⌉=3, ⌈10/7⌉=2, ⌈10/7⌉=2 → 7. Try x=8: ⌈15/8⌉=2, ⌈10/8⌉=2, ⌈10/8⌉=2 → 6. So output is `8`.

**Example 3:**  
Input: `n = 4, quantities = [7, 4, 5]`  
Output: `5`  
*Explanation:*
- For 7: ⌈7/5⌉=2, for 4: ⌈4/5⌉=1, for 5: ⌈5/5⌉=1 → total stores = 2+1+1=4.

### Thought Process (as if you’re the interviewee)  
I need to minimize the maximum products a store receives, ensuring all products are assigned and **no store splits between different products**.

**Brute Force:**  
Try every possible maximum number (from 1 up to max quantity), computing for each if the allocation is possible with n stores.  
For each x: For every product, compute how many stores are needed, sum up. If within n, x is feasible.  
It's too slow for large inputs.

**Optimal:**  
Use **binary search** over possible answers (1 to max(quantities)):
- For a given x, calculate for each product: stores_needed = ⌈quantity/x⌉.
- Sum over products; if total stores_needed ≤ n, x is possible.
- Try to minimize x using binary search.

**Trade-offs:**  
- Brute force is exponential/very slow.
- Binary search with a greedy check makes it efficient: O(m × log(max(quantities))), where m = number of products.

### Corner cases to consider  
- n much larger than product sum: answer is 1.
- quantities with only 1 element: distribute evenly.
- All quantities are 0: answer is 0.
- quantities contains large numbers, n=1: answer is sum(quantities).
- n < number of types / not enough stores: impossible (but input guarantees always possible in Leetcode).

### Solution

```python
def minimizedMaximum(n, quantities):
    # Helper: check if possible to distribute with a given max per store x
    def canDistribute(x):
        needed = 0
        for q in quantities:
            # Each store can have up to x units of a single type
            # So for q units, we need ceil(q/x) stores
            needed += (q + x - 1) // x  # Efficient integer ceil(q/x)
        return needed <= n
    
    # Binary search the minimum feasible x in range [1, max(quantities)]
    left, right = 1, max(quantities)
    while left < right:
        mid = (left + right) // 2
        if canDistribute(mid):
            right = mid  # Try to minimize x
        else:
            left = mid + 1
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × log(max_quantity)), where m = number of product types, max_quantity = largest element of quantities.  
  For each binary search "guess," you scan all m product types. Binary search takes log(max_quantity) steps.
- **Space Complexity:** O(1) extra space, aside from input. Only variables and counters for search/check.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle different store capacities?
  *Hint: Can the "max store load" be specific per store?*

- What if stores could hold multiple product types?
  *Hint: This becomes a variant of bin-packing (NP-hard).*

- Can you output an actual distribution, not just the minimized maximum?
  *Hint: Track assignments while counting stores; potentially backtrack.*

### Summary
This problem uses the **binary search + greedy feasibility check** pattern, common for "minimize the maximum" and similar workload allocation/balancing problems.  
Patterns like this appear in "Split Array Largest Sum", "Capacity to Ship Packages Within D Days", etc., where binary search helps tune a target threshold and a greedy/counting check validates feasibility each step.

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy)

### Similar Problems
- Koko Eating Bananas(koko-eating-bananas) (Medium)
- Capacity To Ship Packages Within D Days(capacity-to-ship-packages-within-d-days) (Medium)
- Maximum Candies Allocated to K Children(maximum-candies-allocated-to-k-children) (Medium)
- Find the Smallest Divisor Given a Threshold(find-the-smallest-divisor-given-a-threshold) (Medium)
- Magnetic Force Between Two Balls(magnetic-force-between-two-balls) (Medium)
- Minimum Limit of Balls in a Bag(minimum-limit-of-balls-in-a-bag) (Medium)
- Minimum Time to Complete Trips(minimum-time-to-complete-trips) (Medium)
- Maximum Number of Robots Within Budget(maximum-number-of-robots-within-budget) (Hard)