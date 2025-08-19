### Leetcode 3301 (Medium): Maximize the Total Height of Unique Towers [Practice](https://leetcode.com/problems/maximize-the-total-height-of-unique-towers)

### Description  
Given an array maximumHeight where maximumHeight[i] denotes the maximum height you can assign to the iᵗʰ tower, assign a unique positive height (≤ maximumHeight[i]) to each tower such that **no two towers have the same height** and the **total assigned height is maximized**.  
If you cannot assign unique positive heights (because of conflicting limits), return -1.

### Examples  

**Example 1:**  
Input: `maximumHeight = [2,3,4,3]`  
Output: `10`  
Explanation: Assign heights `[1,2,4,3]` to towers. Each is ≤ its maximum, all heights are unique.  
Total = 1 + 2 + 4 + 3 = 10.

**Example 2:**  
Input: `maximumHeight = [15,10]`  
Output: `25`  
Explanation: Assign heights `[15,10]`. Both are unique, ≤ limits.  
Total = 15 + 10 = 25.

**Example 3:**  
Input: `maximumHeight = [1,1,1]`  
Output: `-1`  
Explanation: Since each tower's max is 1, but all heights must be unique, this is impossible.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible permutations of unique heights ≤ their respective limits; but that’s factorial time — not feasible for arrays of size up to 10⁵.

- **Observation:**  
  To maximize the total, always try to assign the tallest possible unique values, starting from the largest allowed. But we have to ensure that the tallest assigned so far remains unique. For each next tower, its assigned height should be the minimum of its own maximum and "one less than the previous assigned value" (to ensure uniqueness and positivity).

- **Optimized approach (Greedy):**  
  1. **Sort** the maximumHeight array in descending order.
  2. Set `mn = ∞` (mn = the previous assigned height +1 initially).
  3. For each tower (from largest allowed to smallest):
      - Assign `height = min(maximumHeight[i], mn - 1)`.
      - If `height == 0`, it's impossible: return -1.
      - Accumulate the height, update mn = height.
  This way, each height is unique and as tall as possible, for maximal total sum.

- **Why this works:**  
  The constraint to ensure uniqueness (each assigned is < previous assigned) forces a strictly decreasing sequence (down to 1). This greedy approach both satisfies the constraint and keeps the sum maximized.

### Corner cases to consider  
- All elements equal and very small (e.g., [1,1,1]) — impossible to assign all unique.
- Some maximumHeight < number of towers — not enough possible unique values.
- Ascending, descending, random orders.
- Only one tower — always possible; assign its maximum.
- Arrays with large numbers, but need to keep heights positive.

### Solution

```python
def maximumTotalSum(maximumHeight):
    # Sort in descending order so we assign highest possible first
    maximumHeight.sort(reverse=True)
    ans = 0
    mn = float('inf')
    for maxh in maximumHeight:
        # Assign the min of its allowed or one below the last assigned (for uniqueness)
        assign = min(maxh, mn - 1)
        if assign == 0:
            return -1  # Not enough unique positive heights
        ans += assign
        mn = assign  # Next assigned must be less than this
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n) for sorting + O(n) for the single pass assignment.  
  So, overall: O(n log n).

- **Space Complexity:**  
  O(1) extra (if sorting is in-place; otherwise O(n) if language requires new array for sorted).

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if some towers had minimum allowed heights (instead of just a maximum)?
  *Hint: Would the greedy logic still work if both min and max per tower?*

- Could you solve it if you had to maximize the product, not the sum, of the assigned unique heights?
  *Hint: What changes in your assignment order and choices?*

- How would you count the number of valid assignments (not just the optimal sum)?
  *Hint: DP or combinatorial consideration over allowed values?*

### Summary
This is a classic sorting + greedy allocation problem, where maximizing under uniqueness constraints leads to a strictly decreasing assignment pattern.  
The same pattern appears in maximizing unique values under bounded choices, common in subset/partition and greedy scheduling variants.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
