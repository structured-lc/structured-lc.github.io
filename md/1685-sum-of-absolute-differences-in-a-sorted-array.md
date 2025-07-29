### Leetcode 1685 (Medium): Sum of Absolute Differences in a Sorted Array [Practice](https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array)

### Description  
Given a sorted array of integers `nums`, construct a new array `result` such that `result[i] = sum(|nums[i] - nums[j]|)` for 0 ≤ j < n, for each index i. Return the result array.

### Examples  
**Example 1:**  
Input: `nums = [2,3,5]`  
Output: `[4, 3, 5]`  
*Explanation:*
- result = |2-2| + |2-3| + |2-5| = 0 + 1 + 3 = 4
- result[1] = |3-2| + |3-3| + |3-5| = 1 + 0 + 2 = 3
- result[2] = |5-2| + |5-3| + |5-5| = 3 + 2 + 0 = 5

**Example 2:**  
Input: `nums = [1,4,6,8,10]`  
Output: `[24,15,13,15,21]`  
*Explanation: compute all |nums[i] - nums[j]| and sum for each index.*

**Example 3:**  
Input: `nums = [1]`  
Output: ``  
*Explanation: Only one element, abs difference is zero.*

### Thought Process (as if you’re the interviewee)  
Brute-force is: For each index i, sum |nums[i] - nums[j]| for all j. This is O(n²).

Optimize using the fact that nums is sorted. For index i:
- For all `j < i`, difference = nums[i] - nums[j] (positive)
- For all `j > i`, difference = nums[j] - nums[i] (positive)
This simplifies sum for left/right side:
- `left = i × nums[i] - prefix_sum[i]`
- `right = (prefix_sum[n] - prefix_sum[i+1]) - (n - i - 1) × nums[i]`
So for each i, precompute prefix sums and use the formulas.

### Corner cases to consider  
- nums has length 1 (should return ).
- All numbers are the same.
- Negative numbers in nums (handling works because abs is used)

### Solution

```python
def getSumAbsoluteDifferences(nums):
    n = len(nums)
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] + nums[i]
    res = []
    for i in range(n):
        left = i * nums[i] - prefix[i]
        right = (prefix[n] - prefix[i+1]) - (n - i - 1) * nums[i]
        res.append(left + right)
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — One pass for prefix, one for final calculation.
- **Space Complexity:** O(n) — For prefix sum and result arrays.

### Potential follow-up questions (as if you’re the interviewer)  
- How does your solution change if the input isn’t sorted?  
  *Hint: The formula only works because of sorting; unsorted would need O(n²) or extra processing.*

- Can you do this in-place in the result array?
  *Hint: Carefully manage prefix sums to allow in-place update.*

- How would you solve this if nums can be very large?  
  *Hint: Consider memory usage, maybe process chunks.*

### Summary
This is an example of the **prefix sum pattern** to efficiently compute subarray sums. The approach leverages the sorted order to express sums of absolute differences with O(1) computation for each index. The same pattern applies to range sum and difference calculations in sorted arrays.