### Leetcode 3107 (Medium): Minimum Operations to Make Median of Array Equal to K [Practice](https://leetcode.com/problems/minimum-operations-to-make-median-of-array-equal-to-k)

### Description  
You are given an integer array **nums** and an integer **k**. In one operation, you can increase or decrease any element by 1.  
Return the minimum number of operations to make the *median* of nums equal to k.  
The *median* is the middle element of the sorted array. If there are two middle values (array length even), the *larger* one is the median.

### Examples  

**Example 1:**  
Input: `nums = [2,5,6,8,4], k = 4`  
Output: `2`  
*Explanation: After sorting: [2,4,5,6,8]. Median is 5.  
To make median = 4, decrement 5 to 4 using 1 operation, but after that the order changes.  
We also need to decrement 6 (next element) to 4, so after two operations: [2,4,4,4,8].  
Median is now 4. Two operations.*

**Example 2:**  
Input: `nums = [1,3,4,9], k = 6`  
Output: `2`  
*Explanation: Sorted: [1,3,4,9], median is 4 (since n=4, so larger one of indices 1 and 2).  
Need to increment median and all right-of-median elements that are < k until position 2 is 6:  
Increment 4 to 6 (2 ops), now [1,3,6,9]. Median is 6.*

**Example 3:**  
Input: `nums = , k = 10`  
Output: `3`  
*Explanation: Single element array.  
Increase 7 to 10 (3 operations). Median becomes 10.*

### Thought Process (as if you’re the interviewee)  

- **Initial idea (brute force):**  
  Try every way to increment/decrement elements such that the median after sorting becomes k. The brute force checks all combinations, but that's clearly too slow.

- **Optimization:**  
  - The median of a sorted array of length n is at index ⌊n/2⌋, and tiebreaks are resolved by the higher value.
  - The only way for the median to be k after operations is to ensure element at median index is k and, after sorting, all elements after median are ≥ k, before are ≤ k.
  - To achieve this with minimum ops, sort nums, then transform the median element and, if needed, adjust other elements that "block" k from being the median.
  - For a sorted array, either:
    - If median < k: Increment median and all elements right of median up to k.
    - If median > k: Decrement median and all elements left of median down to k.
  - The minimal operations is simply ∑|nums[i] - k| for all indices i on one side of the median including the median.

- **Implementation plan:**  
  - Sort nums.
  - Compute median index: m = ⌊n/2⌋.
  - Loop:
    - If nums[m] < k, increment nums[m], nums[m+1], ... up to any that are < k.
    - If nums[m] > k, decrement nums[m], nums[m-1], ... down to any that are > k.
    - Each step is |nums[i] - k| with one direction.
  - Return total steps as sum of differences.

### Corner cases to consider  
- nums already has median = k (should return 0)
- All nums equal, e.g., [5,5,5], k=5 (should return 0), or k ≠ 5 (sum up |5-k| per element)
- Single element array [a], k ≠ a
- Even length arrays: which element is considered "median"
- nums with negative values and/or k negative
- k far outside original nums’ min/max

### Solution

```python
def min_operations_to_make_median_k(nums, k):
    # Sort nums to make reasoning about the median easier
    nums.sort()
    n = len(nums)
    median_idx = n // 2  # ⌊n/2⌋ as per problem definition, for even n gets the higher
    ans = 0
    # If median < k, need to increase all elements from median_idx to n-1 up to k (if less)
    if nums[median_idx] < k:
        for i in range(median_idx, n):
            if nums[i] < k:  # Only increment if less than k
                ans += k - nums[i]
    # If median > k, need to decrease all elements from 0 to median_idx down to k (if more)
    elif nums[median_idx] > k:
        for i in range(0, median_idx + 1):
            if nums[i] > k:  # Only decrement if greater than k
                ans += nums[i] - k
    # Median already k: ops = 0
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), as sorting dominates. The following for-loop is O(n).
- **Space Complexity:** O(1) additional (if sorting in place); otherwise, O(n) if making a copy.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can only increment/decrement adjacent elements in one op, not arbitrary elements?  
  *Hint: Consider minimum operations to propagate changes using more complex logic.*

- What if the cost to change each element by 1 depended on its index (i.e., costs array)?  
  *Hint: Could require prefix/suffix cost arrays or weighted medians.*

- Can this be solved without sorting if the input is guaranteed to be nearly sorted?  
  *Hint: Explore efficient selection algorithms for median in O(n), and see if you can keep track of adjustments efficiently.*

### Summary
This problem leverages the idea of **greedily adjusting** only the critical portion of the array (the part containing the median), using **sorting** and **absolute difference summing** as the key operations.  
The coding pattern—sort, find median, adjust only in one direction to the target—is a frequent motif in questions involving medians and cost minimization for aligning values. It is applicable in situations like "minimum moves to equal elements," "minimize cost/ops to centralize array values," and is related to the concept of the median minimizing sum of absolute deviations.


### Flashcard
Sort array, identify median index ⌊n/2⌋. Make median equal to k, then ensure all elements left of median are ≤ k and all right are ≥ k, minimizing total operations.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Find Median from Data Stream(find-median-from-data-stream) (Hard)
- Sliding Window Median(sliding-window-median) (Hard)