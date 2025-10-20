### Leetcode 209 (Medium): Minimum Size Subarray Sum [Practice](https://leetcode.com/problems/minimum-size-subarray-sum)

### Description  
Given an array of positive integers, `nums`, and an integer `target`, find the minimum length of a contiguous subarray whose sum is greater than or equal to `target`. If no such subarray exists, return 0.  
In other words: "What is the smallest number of consecutive elements you can add up to get at least `target`? If you can’t, return 0."

### Examples  

**Example 1:**  
Input: `target = 7, nums = [2,3,1,2,4,3]`  
Output: `2`  
Explanation: The subarray `[4,3]` has a sum of 7, which is the minimal length.

**Example 2:**  
Input: `target = 4, nums = [1,4,4]`  
Output: `1`  
Explanation: The subarray `[4]` (just the element at index 1 or 2) meets the target with length 1.

**Example 3:**  
Input: `target = 11, nums = [1,1,1,1,1,1,1,1]`  
Output: `0`  
Explanation: No subarray meets or exceeds the target sum.

### Thought Process (as if you’re the interviewee)  
- First, brute-force: For every possible subarray (all possible start and end indices), sum its elements, check if the sum is ≥ target, and keep track of the minimum length. This is O(n²), which is too slow for large inputs.
- To optimize, use the **sliding window** approach:
  - Since all numbers are positive, expanding the window increases the sum, and contracting it decreases the sum.
  - Start with both pointers (`left` and `right`) at the beginning.
  - Add `nums[right]` to a running sum, increment `right`.
  - While the sum is ≥ target, update the minimal window length and try to shrink from the left (subtract `nums[left]`, increment `left`).
  - Repeat until you finish the array.
  - If no valid subarray is found, return 0.
- This is O(n) time, which is ideal for this problem.

### Corner cases to consider  
- `nums` is empty: should return 0.
- No subarray can reach `target`: should return 0.
- Single element ≥ target: should return 1.
- Multiple possible subarrays of the same minimal length.
- All elements less than `target`, but sum of entire array ≥ target.

### Solution

```python
def minSubArrayLen(target, nums):
    n = len(nums)
    min_len = n + 1  # Initialize to max possible length + 1
    left = 0
    cur_sum = 0

    for right in range(n):
        cur_sum += nums[right]
        # Try to shrink the window as small as possible while sum ≥ target
        while cur_sum >= target:
            min_len = min(min_len, right - left + 1)
            cur_sum -= nums[left]
            left += 1

    return min_len if min_len <= n else 0
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), since each index is visited at most twice (once by `right`, once by `left`), leading to linear time.
- **Space Complexity:** O(1), only a few pointers and variables are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers are allowed in `nums`?  
  *Hint: Classic sliding window does not work; you may need prefix sums or more advanced techniques.*

- How would you find the actual subarray, not just its length?  
  *Hint: Keep track of window boundaries when you update the minimum.*

- Can you solve this problem in O(n log n) using binary search?  
  *Hint: Use prefix sums and binary search for the earliest valid left index for each right index.*

### Summary  
This problem is a classic example of the **sliding window** pattern, especially effective when dealing with contiguous subarrays and all-positive numbers. It’s a common technique in problems involving minimum window length, target sums, or string substring/window questions. The ability to both grow and shrink the window efficiently is why this solution works in linear time.


### Flashcard
Use sliding window—expand right to increase sum, contract left to minimize length while sum ≥ target; track minimal window.

### Tags
Array(#array), Binary Search(#binary-search), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Minimum Window Substring(minimum-window-substring) (Hard)
- Maximum Size Subarray Sum Equals k(maximum-size-subarray-sum-equals-k) (Medium)
- Maximum Length of Repeated Subarray(maximum-length-of-repeated-subarray) (Medium)
- Minimum Operations to Reduce X to Zero(minimum-operations-to-reduce-x-to-zero) (Medium)
- K Radius Subarray Averages(k-radius-subarray-averages) (Medium)
- Maximum Product After K Increments(maximum-product-after-k-increments) (Medium)
- Shortest Subarray With OR at Least K I(shortest-subarray-with-or-at-least-k-i) (Easy)
- Minimum Positive Sum Subarray (minimum-positive-sum-subarray) (Easy)