### Leetcode 3487 (Easy): Maximum Unique Subarray Sum After Deletion [Practice](https://leetcode.com/problems/maximum-unique-subarray-sum-after-deletion)

### Description  
Given an integer array **nums**, you may delete any number of its elements (cannot delete all, so at least one must remain). After these deletions, choose a contiguous subarray such that:
- All elements in the subarray are **unique**.
- The **sum** of the subarray is **maximized**.
Return the **maximum sum** you can get for any such unique subarray after any number of deletions.  
This means: It’s allowed to delete to simplify the array, possibly removing duplicates or negative values, to create the best possible scenario for a unique maximal subarray sum.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5]`  
Output: `15`  
*Explanation: All numbers are unique, so take the whole array: 1 + 2 + 3 + 4 + 5 = 15.*

**Example 2:**  
Input: `nums = [1,1,0,1,1]`  
Output: `1`  
*Explanation: All numbers except '1' appear as duplicates. By deleting every 1 except one, we are left with [1] or [0,1] or [1,0] but only one unique subarray is possible for sum; choosing [1] gives maximum sum = 1.*

**Example 3:**  
Input: `nums = [1,2,-1,-2,1,0,-1]`  
Output: `3`  
*Explanation: Delete both -1 and -2 from the array (as they only lower the total) so the best subarrays are either [1,2], [2,1], [1,0], or [2,1,0]. The maximum unique subarray you can form is [2,1] (sum = 3).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible deletion pattern, and then for each resulting array, try every possible unique subarray, sum it, and take the maximum. However, this is infeasible—exponential number of deletions for even small arrays.

- **Optimization/Greedy:**  
  Notice:
  - We want a contiguous subarray with all unique elements and maximal sum.
  - Because we can delete, we can (in effect) "remove" repeated elements and negative values to maximize the sum.
  - If all numbers are negative, the optimal single-element subarray is just the largest single number.
  - If there are positives, the best is to pick unique positive numbers.

- **Efficient approach:**  
  - Remove all negatives (since any inclusion of negative lowers total sum). Only consider non-negative numbers.
  - Any duplicate positive numbers: only keep one copy to guarantee uniqueness.
  - The max sum is then the sum of all distinct positive numbers (or max number if all numbers are ≤ 0).

- Why? Because any larger sum must either repeat or include negative numbers. Both are disallowed or counterproductive.

- **Implementation:**  
  - Build a set of all unique positive numbers.
  - If the set is empty (all ≤ 0), return the maximum element in nums.
  - Else, return sum of set.

### Corner cases to consider  
- All numbers are negative, e.g., `[-3,-5,-9]`.
- Array has repeating non-negative numbers, e.g., `[5,5,5]`.
- Array is all zeros: `[0,0,0]`.
- Only one number: `` or `[-2]`.
- Mix of zeros, positives, negatives with repeats, e.g., `[2,0,-1,2,3,0]`.

### Solution

```python
def maximum_unique_subarray_sum_after_deletion(nums):
    # Find all unique positive numbers
    unique_positives = set()
    has_positive = False
    for num in nums:
        if num > 0:
            unique_positives.add(num)
            has_positive = True
            
    if has_positive:
        # Return the sum of all distinct positive numbers
        return sum(unique_positives)
    else:
        # All non-positive: just the max element (since can't remove everything)
        return max(nums)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - One pass to build the set (O(n) insertions), one possible extra O(n) for sum calculation (but the set cannot be bigger than n).
- **Space Complexity:** O(n)
  - At most one set holding all unique positive numbers (O(n)).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are not allowed to delete elements, only select a subarray?
  *Hint: Use the sliding window to maximize the unique subarray sum.*

- How would you solve this if subarrays do **not** need to be contiguous (i.e. subsequences)?
  *Hint: Use the set of distinct numbers, negatives complicate the sum.*

- What if every deletion has a cost?
  *Hint: Now, balance between removing and keeping numbers based on cost and benefit.*

### Summary
This is a unique twist on the "Maximum Unique Subarray Sum" problem, expanded to allow deletions. The solution uses a **greedy set-building** pattern: take all unique positive numbers for the largest sum, or just the maximum otherwise. This sets up a template for questions mixing unique-value collections and subset/sum optimizations, and highlights how problem constraints (deletion allowed, sum maximized, uniqueness required) invite greedy reasoning over brute-force searching.