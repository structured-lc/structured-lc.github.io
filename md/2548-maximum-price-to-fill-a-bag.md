### Leetcode 2548 (Medium): Maximum Price to Fill a Bag [Practice](https://leetcode.com/problems/maximum-price-to-fill-a-bag)

### Description  
You are given a list of items, where each item is represented as `[price, weight]`. You also have a bag with a given `capacity`. Each item can be **split** into smaller parts, each part maintaining the original price-per-weight ratio. The goal is to **exactly fill** the bag to the given capacity (not less, not more), by picking some (possibly fractional) items to maximize the total price inside the bag. If it's not possible to exactly fill the bag using these items, return `-1.0`.

### Examples  

**Example 1:**  
Input: `items = [[50,1],[10,8]], capacity = 5`  
Output: `55.00000`  
*Explanation: Take the whole first item (50, 1) and 4 weight units from the second item (price-per-weight = 10/8 = 1.25). Taking 4 weight units gives price 5. Divide second into (5,4)+(5,4), so sum is 50+5=55.0.*

**Example 2:**  
Input: `items = [[100,30]], capacity = 50`  
Output: `-1.00000`  
*Explanation: You cannot fill the bag to capacity 50 with only 30 weight available.*

**Example 3:**  
Input: `items = [[100, 50], [60, 10]], capacity = 60`  
Output: `160.00000`  
*Explanation: Take all weight from both items (50+10=60), so total price = 100+60=160.*

### Thought Process (as if you’re the interviewee)  
- First, I'll check if the **sum of all available weights** is less than `capacity`. If true, it's impossible; I'll return -1.0.
- Since **items can be split**, this is a **fractional knapsack** problem: optimize for maximum price by always picking **highest price-per-weight** chunks first.
- Brute-force (trying all possible combinations) is exponential and not needed due to fractionality.
- So, the best way is **greedy**:  
  1. Compute the price/weight ratio for each item.
  2. Sort items in descending order of this ratio.
  3. Iterate through the items, always taking from the current item as much as possible (without exceeding `capacity`), possibly taking a fraction if needed for the final fit.
  4. When `capacity` reaches zero, stop and sum the prices.

### Corner cases to consider  
- Bag capacity is zero ⇒ answer is 0.
- Total item weights < capacity ⇒ return -1.0.
- Only one item, and its weight ≠ capacity.
- Items with same price-per-weight; their order doesn't matter.
- Items with weight = 0 (shouldn’t happen per constraints).
- Items with price = 0.
- Items with price or weight = 1 (minimum).
- Large input sizes; avoid O(n²).

### Solution

```python
def maximumPrice(items, capacity):
    # Calculate price/weight for each item
    items = [[price, weight, price / weight] for price, weight in items]
    # Sort by price/weight ratio descending
    items.sort(key=lambda x: -x[2])
    
    total_weight = sum(w for _, w, _ in items)
    if total_weight < capacity:
        return -1.0

    price = 0.0
    for p, w, ratio in items:
        # Take as much as possible from highest-ratio item
        if capacity == 0:
            break
        take = min(w, capacity)
        price += ratio * take
        capacity -= take

    return round(price, 5)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting the items by price/weight ratio; then O(n) for processing.
- **Space Complexity:** O(n), for storing item ratios and sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the **items cannot be split**?  
  *Hint: Traditional 0/1 knapsack DP applies; greedy doesn't work.*

- How would you handle **precision errors** in floating math?  
  *Hint: Use built-in float with formatting, and ensure comparisons avoid strict equality on floats; stay within 1e-5.*

- Can you track/return **which items (and their fractions) are picked** to reconstruct the selection?  
  *Hint: Store the index and fraction/weight taken in a result array during the loop.*

### Summary
This problem is a classic **fractional knapsack** greedy pattern: always take as much as possible from the most "valuable" items (by price per unit weight) until reaching the target. The greedy approach is both optimal and efficient for this version because items can be split arbitrarily. This pattern applies anywhere you need to maximize some value under a capacity/constraint and can split the resources—logistics, resource allocation, etc.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
