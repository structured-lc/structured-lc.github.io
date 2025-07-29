### Leetcode 2931 (Hard): Maximum Spending After Buying Items [Practice](https://leetcode.com/problems/maximum-spending-after-buying-items)

### Description  
Given an m × n matrix `values` representing prices for m×n different products in m different shops (each row is a shop, each column is a product type). On each day, you can buy any one *not yet bought* product from any shop, and you must eventually buy *all* products. The price you pay is the item's value × the day number (1-based).  
You must buy *exactly one* product each day and want to maximize your total spending.  
Return the **maximum total amount** you can spend after purchasing all products.

### Examples  

**Example 1:**  
Input: `values = [[8,5,2],[6,4,1],[9,7,3]]`  
Output: `285`  
*Explanation:  
- Day 1: Buy `values[1][2]=1` → 1×1=1  
- Day 2: Buy `values[2]=2` → 2×2=4  
- Day 3: Buy `values[2][2]=3` → 3×3=9  
- Day 4: Buy `values[1][1]=4` → 4×4=16  
- Day 5: Buy `values[1]=5` → 5×5=25  
- Day 6: Buy `values[2][1]=7` → 7×6=42  
- Day 7: Buy `values[1]=6` → 6×7=42  
- Day 8: Buy `values=8` → 8×8=64  
- Day 9: Buy `values[2]=9` → 9×9=81  
Total = 1 + 4 + 9 + 16 + 25 + 42 + 42 + 64 + 81 = 285.*

**Example 2:**  
Input: `values = [[10,8,6,4,2],[9,7,5,3,2]]`  
Output: `386`  
*Explanation:  
- Buy smallest values first. 
- Day 1: `values[4]=2` → 2×1=2
- Day 2: `values[1][4]=2` → 2×2=4
- Day 3: `values[1][3]=3` → 3×3=9
- Day 4: `values[3]=4` → 4×4=16
- Day 5: `values[1][2]=5` → 5×5=25
- Day 6: `values[2]=6` → 6×6=36
- Day 7: `values[1][1]=7` → 7×7=49
- Day 8: `values[1]=8` → 8×8=64
- Day 9: `values[1]=9` → 9×9=81
- Day 10: `values=10` → 10×10=100
Total = 2+4+9+16+25+36+49+64+81+100 = 386.*

**Example 3:**  
Input: `values = [[1]]`  
Output: `1`  
*Explanation: Single product, bought on day 1. Value is 1×1=1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every possible order to buy m×n products (all permutations). For each, calculate the total cost.  
  This is not feasible for large m×n due to factorial time complexity.
- **Optimal approach:**  
  We are maximizing sum of value×(day bought), i.e., we want highest values bought on the largest days.  
  So, **sort all prices in ascending order**; buy the smallest first, save the largest for last, to maximize their day multiplier.
  - This is the opposite of the classic "minimize cost" (where you buy expensive items early). Here, buy *cheapest first* and save *most expensive* till highest day.
- **Implementation:**  
  - Flatten the matrix to a list.
  - Sort ascending.
  - For each i-th smallest element, buy it on (i+1)-th day: total += value × (i+1).
  - Return final total.

### Corner cases to consider  
- m or n is 0 (empty matrix): total spending is 0.
- All items have the same value.
- Values already sorted ascending/descending.
- Single shop or single product.
- Large values which could cause integer overflow (if language limited).
- Negative values (if allowed by problem).

### Solution

```python
def maximumSpending(values):
    # Flatten the m×n matrix into a list of all item values
    items = []
    for shop in values:
        for price in shop:
            items.append(price)
    # Sort all items by value (ascending, so cheapest first)
    items.sort()
    # Calculate total maximum spending:
    # Buy iᵗʰ smallest item on day (i+1)
    total = 0
    for i in range(len(items)):
        total += items[i] * (i + 1)
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n log(m×n)), due to sorting the flattened matrix of all items.
- **Space Complexity:** O(m×n) to store all prices in a flat list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the approach if each product can only be bought from a specific shop?  
  *Hint: Adjust flattening to enforce the constraints, possibly change the sorting logic.*

- How would the solution change if you could buy more than one product per day?  
  *Hint: Think about assignment of values to different day multipliers; adapt batching.*

- Can you optimize for memory if m and n are both very large?  
  *Hint: Use a heap or process values in place if constraints allow.*

### Summary
The approach here is a classic greedy strategy: buy the cheapest products first to "waste" the smallest day multipliers, and reserve the priciest products for the days with the highest multipliers. This maximizes the sum total (contrary to minimizing cost in ordinary shopping optimizations). This pattern (assigning biggest weights to the biggest values) appears in similar optimal assignment or scheduling problems.