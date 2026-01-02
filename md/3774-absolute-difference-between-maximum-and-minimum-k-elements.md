# Leetcode 3774 (Easy): Absolute Difference Between Maximum and Minimum K Elements [Practice](https://leetcode.com/problems/absolute-difference-between-maximum-and-minimum-k-elements)

### Description
Given an integer array `nums` and an integer `k`, find the **absolute difference** between the sum of the `k` largest elements and the sum of the `k` smallest elements in the array. Return this difference as an integer.

### Examples

**Example 1:**
Input: `nums = [5, 2, 2, 4], k = 2`
Output: `5`
*Explanation: The 2 largest elements are 5 and 4 (sum = 9). The 2 smallest elements are 2 and 2 (sum = 4). Absolute difference = |9 - 4| = 5.*

**Example 2:**
Input: `nums = [1, 2, 3, 4, 5], k = 1`
Output: `4`
*Explanation: The 1 largest element is 5 (sum = 5). The 1 smallest element is 1 (sum = 1). Absolute difference = |5 - 1| = 4.*

**Example 3:**
Input: `nums = , k = 1`
Output: `0`
*Explanation: The 1 largest element is 100 (sum = 100). The 1 smallest element is 100 (sum = 100). Absolute difference = |100 - 100| = 0.*

### Thought Process (as if you're the interviewee)

The brute-force approach would be to manually iterate through the array multiple times to find the k largest and k smallest elements, which would be inefficient.

A better approach is to **sort the array** once. After sorting in ascending order:
- The first `k` elements are the `k` smallest elements
- The last `k` elements are the `k` largest elements

We can sum both groups and return their absolute difference. This eliminates the need for multiple passes and leverages sorting to organize the data efficiently.

The trade-off: We pay O(n log n) for sorting, but gain simplicity and clarity. For the given constraints (n ≤ 100), this is more than acceptable.

### Corner cases to consider

- **Single element array (k = 1):** The largest and smallest are the same element; difference is 0.
- **All elements equal:** Sum of k largest equals sum of k smallest; difference is 0.
- **k = n:** All elements are both largest and smallest (conceptually); difference is 0.
- **Array with positive integers only:** No negative numbers to handle, simplifies calculations.

### Solution

```python
def absoluteDifference(nums, k):
    # Sort the array in ascending order
    nums.sort()
    
    n = len(nums)
    
    # Sum of k smallest elements (first k elements after sorting)
    sum_smallest = 0
    for i in range(k):
        sum_smallest += nums[i]
    
    # Sum of k largest elements (last k elements after sorting)
    sum_largest = 0
    for i in range(n - k, n):
        sum_largest += nums[i]
    
    # Return absolute difference
    return abs(sum_largest - sum_smallest)
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(n log n)
  - Sorting the array takes O(n log n)
  - Summing k elements twice takes O(k), which is at most O(n)
  - Overall: O(n log n) dominated by sorting

- **Space Complexity:** O(1)
  - Sorting is done in-place (Python's sort modifies the input)
  - Only a few integer variables for sums and indices
  - No additional data structures proportional to input size

### Potential follow-up questions (as if you're the interviewer)

- Can you solve this without sorting? What if the array is immutable?
  *Hint: Consider using a heap or priority queue to extract k largest/smallest in O(n log k) time.*

- How would you optimize if the array is already partially sorted or if you only need to call this function once with different k values?
  *Hint: Think about whether sorting once and answering multiple queries is better than re-sorting.*

- What if the array contains negative numbers? Does your solution still work?
  *Hint: Your current solution handles negatives correctly; verify by tracing through with negative values.*

### Summary

The key pattern here is **sort-then-partition**: sort the array once, then access the k smallest from the start and k largest from the end. This transforms a complex problem into a simple one with straightforward indexing. The approach is commonly applied to problems requiring k largest/smallest elements (e.g., Kth largest element, top K frequent elements). For this problem's constraints, sorting is the most efficient and readable solution.

### Flashcard

Sort the array, then sum the first k elements (smallest) and last k elements (largest), and return their absolute difference. Simple yet optimal for finding k extremes.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
