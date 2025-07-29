### Leetcode 3050 (Medium): Pizza Toppings Cost Analysis [Practice](https://leetcode.com/problems/pizza-toppings-cost-analysis)

### Description  
Given a list of pizza toppings with their costs, return all unique 3-topping pizza combinations, their total cost (rounded to two decimals), sorted by cost descending, then pizza name ascending.  
- Each pizza must have 3 **distinct** toppings.
- Toppings in a pizza must be listed in **alphabetical order**.
- No duplicate pizzas (e.g., "Cheese,Cheese,Chicken" is invalid).
- Result sorted by: total_cost (descending), then pizza string ascending.

### Examples  

**Example 1:**  
Input:  
```
Toppings = [ 
  ['Pepperoni', 0.50], 
  ['Sausage', 0.70], 
  ['Chicken', 0.55], 
  ['Extra Cheese', 0.40] 
]
```
Output:  
```
[
  ["Chicken,Pepperoni,Sausage", 1.75],
  ["Chicken,Extra Cheese,Sausage", 1.65],
  ["Extra Cheese,Pepperoni,Sausage", 1.60],
  ["Chicken,Extra Cheese,Pepperoni", 1.45]
]
```
*Explanation: All unique 3-topping combinations are generated in alphabetical order. Costs are summed and rounded to 2 decimals. Sorted by cost descending, then name ascending.*

**Example 2:**  
Input:  
```
Toppings = [
  ['Mushroom', 0.39], 
  ['Spinach', 0.60], 
  ['Tomato', 0.62]
]
```
Output:  
```
[
  ["Mushroom,Spinach,Tomato", 1.61]
]
```
*Explanation: Only one 3-topping combination is possible, alphabetically ordered.*

**Example 3:**  
Input:  
```
Toppings = [
  ['Olives', 0.20], 
  ['Bacon', 0.80]
]
```
Output:  
```
[]
```
*Explanation: Fewer than 3 toppings, so no 3-topping pizzas possible.*

### Thought Process (as if you’re the interviewee)  
First, think brute-force:  
- Enumerate all possible 3-topping combinations (order doesn't matter, so use combinations).
- Alphabetically sort the toppings within each combo.
- Compute total cost and round to 2 decimals.
- Store each combo as "topping1,topping2,topping3" string, along with its cost.
- Sort the results by total_cost (descending), then by pizza name (ascending).

For n toppings, number of combos is C(n,3), which is acceptable for reasonable n (e.g., n ≤ 30).  
Optimized approach: use itertools.combinations, sort toppings only once, process as you go.  
Be careful with floating point—round to 2 decimal places per requirements.  
Trade-offs: SQL can do this with self-joins; in Python, processing is efficient for small n, no advanced structures needed.

### Corner cases to consider  
- Empty toppings list
- Fewer than 3 toppings
- All costs identical / duplicate costs
- Topping names with same cost but different names
- Topping names requiring alphabetical tie-break
- Floating point costs needing rounding (e.g., 0.333...)

### Solution

```python
from typing import List

def pizza_topping_combinations(toppings: List[List]):
    # Step 1: Edge case: not enough toppings
    if len(toppings) < 3:
        return []

    # Step 2: Sort the toppings by name to ensure consistent combination order
    toppings_sorted = sorted(toppings, key=lambda x: x[0])

    n = len(toppings_sorted)
    result = []

    # Step 3: Generate all combinations of 3 different toppings (alphabetical order guaranteed)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                names = [
                    toppings_sorted[i][0],
                    toppings_sorted[j][0],
                    toppings_sorted[k][0]
                ]
                # Step 4: Pizza name is "name1,name2,name3"
                pizza = ",".join(names)

                # Step 5: Calculate total cost and round to 2 decimals
                total_cost = round(
                    toppings_sorted[i][1] +
                    toppings_sorted[j][1] +
                    toppings_sorted[k][1],
                    2
                )
                result.append([pizza, total_cost])

    # Step 6: Sort result by total_cost descending, then by pizza name ascending
    result.sort(key=lambda x: (-x[1], x[0]))

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n³ + n³ log n³)  
  - Generating all C(n,3) = n(n-1)(n-2)/6 triplets ≈ O(n³)
  - Sorting result list with O(n³) items: O(n³ log n³)
  - Overall: O(n³ log n) due to small constant factors for reasonable n.

- **Space Complexity:**  
  O(n³)  
  - Store all possible combinations (output size) is O(n³).  
  - Extra space for intermediate lists and sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where you need all k-topping pizzas, not just 3?  
  *Hint: How can you generalize the combinations generation for any k?*

- What if the list of toppings is very large (n > 1000)?  
  *Hint: Is brute-force still feasible? Could a generator help? Do we need to limit combos stored/returned?*

- How would you handle duplicate toppings (same name and cost)?  
  *Hint: Should combinations allow repeated toppings, or are toppings strictly unique by name?*

### Summary
The problem uses the **combinatorial pattern**: generate all size-3 combinations from a list, process and sort results by custom rules. Alphabetical order and proper sorting logic prevent duplicates and ensure canonical output. This combinatorics approach is common in problems involving unique groupings, selection tasks, and listing k-element subsets from a pool (like subset, k-sum, team-chooser, etc.).