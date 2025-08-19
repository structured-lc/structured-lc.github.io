### Leetcode 1498 (Medium): Number of Subsequences That Satisfy the Given Sum Condition [Practice](https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition)

### Description  
Given an integer array nums and an integer target, find the number of subsequences (possibly empty, but must have at least one element) such that the sum of the minimum and maximum element in the subsequence is ≤ target. Return the answer modulo 10⁹+7.

### Examples  
**Example 1:**  
Input: `nums = [3,5,6,7], target = 9`  
Output: `4`  
*Explanation: Valid subsequences: [3], [3,5], [3,5,6], [3,6].*

**Example 2:**  
Input: `nums = [3,3,6,8], target = 10`  
Output: `6`  
*Explanation: Valid subsequences: [3], [3], [3,3], [3,6], [3,3,6], [3,8].*

**Example 3:**  
Input: `nums = [2,3,3,4,6,7], target = 12`  
Output: `61`  
*Explanation: Many valid subsequences with min+max ≤ 12. Must count efficiently.*


### Thought Process (as if you’re the interviewee)  
- Try all subsequences: too slow.
- Note min and max matter, rest don't.
- **Sort** nums, use two pointers (i: min, j: max).
- For each possible (i,j) pair with nums[i]+nums[j] ≤ target, count number of subsequences between (i,j): there are 2⁽ʲ⁻ⁱ⁾ possible combinations (include/exclude each element in between).
- Move i forward when sum too large, j backward when sum valid.
- Precompute all powers of two for efficiency, since need large computations.


### Corner cases to consider  
- Empty nums.
- All nums larger than target.
- Only one element in nums.
- Duplicates in nums.
- Large array sizes.


### Solution

```python
MOD = 10**9 + 7

def numSubseq(nums, target):
    nums.sort()
    n = len(nums)
    pow2 = [1] * (n)
    for i in range(1, n):
        pow2[i] = pow2[i-1] * 2 % MOD
    res = 0
    left, right = 0, n - 1
    while left <= right:
        if nums[left] + nums[right] <= target:
            res = (res + pow2[right-left]) % MOD
            left += 1
        else:
            right -= 1
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) for sorting, O(n) for two-pointer sweep.
- **Space Complexity:** O(n) for storing powers of 2.


### Potential follow-up questions (as if you’re the interviewer)  
- How do you handle very large n efficiently?  
  *Hint: Precompute and use modulo properties carefully.*
- How to reconstruct the valid subsequences efficiently?  
  *Hint: Recursion/backtracking or binary search.*
- What if the subsequence must be of length ≥ k?  
  *Hint: Adjust count formula or filter combinations.*

### Summary
Uses two-pointer and precompute power-of-2 patterns. Widely applicable to sliding window, counting subsets with constraints, range-based DP, and pruning combinations based on min/max or sum bounds.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
- Minimum Operations to Form Subsequence With Target Sum(minimum-operations-to-form-subsequence-with-target-sum) (Hard)
- Find the Sum of Subsequence Powers(find-the-sum-of-subsequence-powers) (Hard)
- Find the Sum of the Power of All Subsequences(find-the-sum-of-the-power-of-all-subsequences) (Hard)