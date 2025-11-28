### Leetcode 3685 (Medium): Subsequence Sum After Capping Elements [Practice](https://leetcode.com/problems/subsequence-sum-after-capping-elements)

### Description  
Given an integer array and a *cap* value, for a chosen subsequence you cap every element to be at most the cap (meaning if a value is greater, you set it to the cap), then sum the resulting subsequence. Return the **maximum possible sum** for any non-empty subsequence after this capping process.  
*This differs from simply summing the whole array after capping; you get to select any subsequence, cap it, and sum.*

### Examples  

**Example 1:**  
Input: `nums = [2, 8, 3], cap = 5`  
Output: `10`  
*Explanation: Selecting subsequence `[8, 3]`: cap(8) = 5, cap(3) = 3 ⇒ sum = 5 + 3 = 8;*
*Selecting all: cap(2) = 2, cap(8) = 5, cap(3) = 3 ⇒ sum = 2 + 5 + 3 = 10.*

**Example 2:**  
Input: `nums = [7, 7, 7], cap = 7`  
Output: `21`  
*Explanation: All elements = cap; Select all for sum = 7 + 7 + 7 = 21.*

**Example 3:**  
Input: `nums = [4], cap = 3`  
Output: `3`  
*Explanation: Select `[4]`; cap(4) = 3.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  Try every possible subsequence, apply the cap to each element, and sum up. Track the maximum sum found.  
  *Downside*: For length n, there are 2ⁿ−1 possible non-empty subsequences. This is computationally infeasible for n > 20.

- **Optimized approach:**  
  Since capping makes every element ≤ cap, to maximize sum you should select all elements (because for any skipped element, you lose either its original value or the cap, whichever is smaller).  
  So, the optimal subsequence is always the full array. For each nums[i], use min(nums[i], cap) and sum up.

- **Trade-off:**  
  This greedy approach is justified since capping potentially increases the value (for elements > cap), and excluding elements only lowers the total.

### Corner cases to consider  
- Empty array (guaranteed non-empty by constraints, but always check!)  
- All elements ≤ cap (no changes needed, sum entire array)  
- All elements ≥ cap (all become cap, sum = n × cap)  
- Mixed values  
- Single element array  
- Large array size for efficiency  

### Solution

```python
def max_subsequence_sum_capped(nums, cap):
    # For each element, take min(nums[i], cap)
    capped_sum = 0
    for num in nums:
        capped_sum += num if num <= cap else cap
    return capped_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is visited once for min and sum.

- **Space Complexity:** O(1)  
  Only a constant amount of extra space for the accumulator.

### Potential follow-up questions (as if you’re the interviewer)  

- What if only subsequences of a certain minimum length are allowed?  
  *Hint: Would you ever skip smaller elements, or always prefer largest possible capped values?*

- Could you optimize for the maximum sum when you can only choose up to k elements in your subsequence?  
  *Hint: Pick k elements with largest min(nums[i], cap).*

- How would the algorithm change if you had to return the actual subsequence, not just the sum?  
  *Hint: Simply collect all indices for nums[i] ≤ cap; any for nums[i] > cap, you can decide.*

### Summary
This problem uses the **greedy sum after transformation** pattern: transform each element (capping), then sum up for the maximum. This is common in array problems where you can preprocess values, then aggregate them for an optimal answer. This pattern is also seen when limiting contributions in profit/cost maximization problems.


### Flashcard
Information not available in search results.

### Tags
Array(#array), Two Pointers(#two-pointers), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
