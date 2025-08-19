### Leetcode 1827 (Easy): Minimum Operations to Make the Array Increasing [Practice](https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing)

### Description  
Given an integer array nums (0-indexed), you can increment any element by 1 in one operation. You need to return the minimum number of operations needed to make the array **strictly increasing** (i.e., every nums[i] < nums[i+1], 0 ≤ i < n-1).  
For example:  
- If nums = [1,1,1], after 3 operations it can become [1,2,3].

### Examples  

**Example 1:**  
Input: `[1,1,1]`  
Output: `3`  
*Explanation:  
- Increment nums[1]: [1,2,1]  
- Increment nums[2]: [1,2,2]  
- Increment nums[2]: [1,2,3]  
Total of 3 operations to get strictly increasing.*

**Example 2:**  
Input: `[1,5,2,4,1]`  
Output: `14`  
*Explanation:  
- Increment nums[2] to at least 6 (need 4 operations, 2→6).  
- Increment nums[4] to at least 5 (need 4 operations, 1→5).
- Also, nums[3]=4 must be increased to at least 7 (need 3 operations, 4→7).  
Adding all needed operations for each out-of-order increase: total 14.*

**Example 3:**  
Input: ``  
Output: `0`  
*Explanation:  
Single-element arrays are always strictly increasing; 0 operations needed.*

### Thought Process (as if you’re the interviewee)  
First, I would check every adjacent pair in the array.  
If the next number is less than or equal to the previous, increment it enough that it becomes exactly 1 greater.  
For every nums[i] (i ≥ 1):  
- If nums[i] ≤ nums[i-1], then increment nums[i] to nums[i-1] + 1.  
- The number of operations is (nums[i-1] + 1 - nums[i]) if positive.  
I would iterate once through the array and sum these operations.

This greedy, one-pass approach is efficient because once every step is fixed locally, the array will be globally increasing.  
No need for brute force or backtracking—since increasing an element always improves the situation for later elements.

### Corner cases to consider  
- Array of length 1 (no work needed)
- All elements already strictly increasing (should return 0)
- All elements equal (must increment each after the first)
- Highly decreasing array
- Large numbers, but no need for negative or zero elements due to constraints

### Solution

```python
def minOperations(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    operations = 0
    for i in range(1, len(nums)):
        if nums[i] <= nums[i-1]:
            # We have to increment nums[i] up to nums[i-1] + 1
            inc = nums[i-1] + 1 - nums[i]
            operations += inc
            nums[i] += inc  # Make sure the array is strictly increasing
    return operations
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the array. We check each element once and do constant work for each.
- **Space Complexity:** O(1) extra space if in-place modifications are allowed, otherwise O(n) if a copy is used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of increment, you could increment or decrement any element?
  *Hint: Consider sorting or local adjustments, may need dynamic programming.*

- What if each operation had a different cost per position?
  *Hint: Cost-aware greedy or DP.*

- What if you wanted a non-strictly increasing array (nums[i] ≤ nums[i+1])?
  *Hint: Adjust the +1 increments accordingly; the threshold changes.*

### Summary
This is a classic greedy, "adjust-to-fit" array problem: fix local violations to guarantee a global property, using a single pass.  
Pattern: **Array, Greedy, Local-to-Global**.  
Applicable to other problems where you increment/decrement to enforce order or minimum differences, e.g., "Minimum Moves to Make Array Complementary" or "Make Array Strictly Decreasing."

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Minimum Increment to Make Array Unique(minimum-increment-to-make-array-unique) (Medium)
- Make Array Non-decreasing or Non-increasing(make-array-non-decreasing-or-non-increasing) (Hard)
- Maximum Product After K Increments(maximum-product-after-k-increments) (Medium)
- Minimum Replacements to Sort the Array(minimum-replacements-to-sort-the-array) (Hard)
- Minimum Operations to Make Columns Strictly Increasing(minimum-operations-to-make-columns-strictly-increasing) (Easy)