### Leetcode 3477 (Easy): Fruits Into Baskets II [Practice](https://leetcode.com/problems/fruits-into-baskets-ii)

### Description  
Given two arrays, `fruits` and `baskets`, both of length n:  
- `fruits[i]` is the quantity of the iᵗʰ type of fruit.
- `baskets[j]` is the capacity of the jᵗʰ basket.

You need to place each fruit type into the leftmost available basket whose capacity is greater than or equal to that fruit's quantity.  
- Each basket can only hold one type of fruit.
- If a fruit can't fit into any remaining basket, it remains unplaced.

Return the number of fruit types that remain unplaced after all possible allocations.

### Examples  

**Example 1:**  
Input: `fruits = [4,2,5]`, `baskets = [3,5,4]`  
Output: `1`  
*Explanation:  
- Place 4 (first fruit) into basket[1]=5 → baskets: [3, X, 4]
- Place 2 into basket=3 → baskets: [X, X, 4]
- Place 5 into basket[2]=4 (not enough capacity) → fruit remains  
Only 1 fruit remains unplaced.*

**Example 2:**  
Input: `fruits = [3,6,1]`, `baskets = [6,4,7]`  
Output: `0`  
*Explanation:  
- Place 3 into basket=6 → baskets: [X, 4, 7]
- Place 6 into basket[2]=7 → baskets: [X, 4, X]
- Place 1 into basket[1]=4 → baskets: [X, X, X]  
All fruits placed.*

**Example 3:**  
Input: `fruits = [7,8,9]`, `baskets = [1,2,3]`  
Output: `3`  
*Explanation:  
No basket is large enough for any fruit, so all 3 remain unplaced.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For every fruit, scan all baskets to find one that's unused and has enough capacity. If found, mark the basket as used.
- This is O(n²), but since both lists are length n (likely small), we can optimize.
- **Optimal:** Use a boolean array to track if a basket is used. For each fruit, iterate left-to-right through baskets, placing it in the first available basket big enough.  
- The problem's constraints stipulate that we must use the leftmost available basket, so we can't sort the arrays for greedy matching.
- Trade-off: Accept simple O(n²) (worst-case) with two pointers or a visited array, as n is not large.

### Corner cases to consider  
- Empty array: `fruits` and `baskets` both empty
- All baskets too small for all fruits
- All baskets exactly fit fruits
- Some fruits much larger than any basket
- Duplicate fruit quantities or basket sizes
- Basket capacity exactly matches fruit quantity

### Solution

```python
def unplaced_fruit_types(fruits, baskets):
    n = len(fruits)
    used = [False] * n  # Track used baskets
    unplaced = 0        # Counter for unplaced fruits

    for fruit_qty in fruits:
        placed = False
        for i in range(n):
            # If basket unused and can fit the fruit
            if not used[i] and baskets[i] >= fruit_qty:
                used[i] = True  # Mark basket as used
                placed = True
                break  # Move to next fruit
        if not placed:
            unplaced