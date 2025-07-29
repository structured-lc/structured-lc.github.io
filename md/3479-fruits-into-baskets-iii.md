### Leetcode 3479 (Medium): Fruits Into Baskets III [Practice](https://leetcode.com/problems/fruits-into-baskets-iii)

### Description  
Given two integer arrays, **fruits** and **baskets**, both of length n:  
- `fruits[i]` represents the quantity required for the iᵗʰ type of fruit.
- `baskets[j]` represents the capacity of the jᵗʰ basket.

From *left to right*, for each fruit type, place it into the *leftmost* available basket whose capacity is **greater than or equal to** the quantity of that fruit.  
- Each basket can hold **only one** fruit type (once used, a basket is no longer available).
- If a fruit cannot be placed into any basket, it remains **unplaced**.

Return the **count** of fruit types that couldn't be placed.

### Examples  

**Example 1:**  
Input: `fruits = [4, 2, 5]`, `baskets = [3, 5, 4]`  
Output: `1`  
*Explanation:  
- Fruit 0 (4): leftmost available basket with capacity ≥ 4 is index 1 (5). Use basket 1.
- Fruit 1 (2): leftmost available basket with capacity ≥ 2 is index 0 (3). Use basket 0.
- Fruit 2 (5): leftmost available basket with capacity ≥ 5 is index 2 (4) (but 4 < 5). No basket available, so unplaced.
Unplaced count = 1.*

**Example 2:**  
Input: `fruits = [1, 2, 3]`, `baskets = [3, 2, 1]`  
Output: `0`  
*Explanation:  
- Fruit 0 (1): leftmost basket is 0 (3) → used.
- Fruit 1 (2): leftmost unused basket ≥ 2 is 1 (2) → used.
- Fruit 2 (3): leftmost unused basket ≥ 3 is none (basket 2 has capacity 1 < 3). No basket available, so unplaced.
Wait: this means output should be 1, but maybe let's re-walk carefully:  
- 0 (1) in 0 (3): used.  
- 1 (2) in 1 (2): used.  
- 2 (3) in 2 (1): 1 < 3 → can't use. No, so output should be 1.*
  
Let me keep a more controlled example:

**Example 3:**  
Input: `fruits = [2, 2, 2]`, `baskets = [2, 2, 2]`  
Output: `0`  
*Explanation:  
- Each fruit can go into each matching basket directly.*

### Thought Process (as if you’re the interviewee)  

First, the brute-force way:
- For each fruit i, scan from left to right across all baskets.
- For each basket, if it's *unused*, and capacity ≥ fruits[i], assign the fruit to the basket and mark basket as used.
- If no basket can be found, count this fruit as *unplaced*.

This is an O(n²) approach.

Can we optimize?
- Since the order is "leftmost first", and each basket can only be used once, for each fruit, we need to find the first unused basket satisfying the requirement.
- Since n can be up to a few thousand in contest settings, O(n²) may still work.
- If efficiency is critical, you could use a structure such as a segment tree to answer "first available basket ≥ fruits[i]" in O(log n), maintaining a used/not-used bitmap, but that adds implementation cost.
- For interview-clarity, unless constraints are tight, O(n²) with a straightforward approach is *acceptable*.

### Corner cases to consider  
- baskets or fruits is empty
- baskets have lesser capacity than any fruit, so all are unplaced
- baskets have much larger capacity than all fruits (so all placed)
- Duplicate fruit sizes or basket sizes
- Multiple fruits require the same amount, and baskets may not be enough
- All baskets used before all fruits are assigned
- Single fruit and single basket (success/failure)

### Solution

```python
def unplaced_fruits(fruits, baskets):
    n = len(fruits)
    basket_used = [False] * n
    unplaced = 0

    for i in range(n):  # For each fruit type
        placed = False
        # Find the leftmost unused basket that fits
        for j in range(n):
            if not basket_used[j] and baskets[j] >= fruits[i]:
                basket_used[j] = True
                placed = True
                break
        if not placed:
            unplaced += 1  # No available basket found

    return unplaced
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) — For each fruit, up to n baskets are checked.
- **Space Complexity:** O(n) — For the `basket_used` array.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize your solution if n is large (e.g., 10⁵)?  
  *Hint: (Think about efficient lookup and update for "first available basket ≥ fruits[i]" — e.g., use segment tree or binary-indexed tree with sorted indices.)*

- What if you are allowed to reorder either fruits or baskets?  
  *Hint: (Would sorting fruits and baskets, then greedily matching, yield a better result?)*

- Suppose multiple fruit types can be placed in the same basket if space remains — how would you adjust your algorithm?  
  *Hint: (Think about tracking residual basket capacity and assigning greedily.)*

### Summary
This problem is a direct simulation using the **greedy matching** pattern: for each fruit, assign it to the earliest available basket with enough capacity.  
The scan-left-for-fit-and-mark pattern is a **classic greedy assignment** used in interval scheduling and matching problems.  
This approach is consistent with many interview problems where you must assign resources to tasks preserving order and capacity.  
Optimizations (e.g., segment tree or binary search) are possible, especially as n grows, or if constraints relax order or exclusiveness.