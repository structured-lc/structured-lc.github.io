### Leetcode 1695 (Medium): Maximum Erasure Value [Practice](https://leetcode.com/problems/maximum-erasure-value)

### Description  
Given an array of positive integers, find the maximum sum of a subarray with only unique values. You may erase (select) exactly one contiguous subarray so all its elements are unique, and the **score** is the sum of its elements. Return the highest possible score.

### Examples  

**Example 1:**  
Input: `nums = [4,2,4,5,6]`  
Output: `17`  
*Explanation: The subarray [2,4,5,6] is unique; sum is 2+4+5+6=17.*

**Example 2:**  
Input: `nums = [5,2,1,2,5,2,1,2,5]`  
Output: `8`  
*Explanation: The subarray [5,2,1] or [1,2,5] gives max sum 8 with unique elements.*

**Example 3:**  
Input: `nums = [3,2,1,2,3,3]` 
Output: `6`  
*Explanation: [3,2,1] or [1,2,3] gives max sum 6.*

### Thought Process (as if you’re the interviewee)  
- Subarray must only have unique values, and sum must be maximized.
- Naive brute-force: Consider all subarrays, check uniqueness, sum up. This is O(n²) or more.
- Optimal: Classic sliding window pattern. Use a set/hash map to keep track of what’s in the window, move left pointer forward when duplicate seen.
- For every step, keep sum of the current unique subarray and update max if higher.

### Corner cases to consider  
- All elements are unique (best is sum of the array)
- All elements are the same (best is 1 element)
- Duplicates at front or end; all in the middle
- Empty input (by constraints, 1 ≤ length, but always check in code if asked)

### Solution

```python
def maximumUniqueSubarray(nums):
    seen = set()
    left = 0
    curr_sum = 0
    max_sum = 0
    for right in range(len(nums)):
        while nums[right] in seen:
            seen.remove(nums[left])
            curr_sum -= nums[left]
            left += 1
        seen.add(nums[right])
        curr_sum += nums[right]
        if curr_sum > max_sum:
            max_sum = curr_sum
    return max_sum
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — each pointer (left, right) moves at most once through the array.
- **Space Complexity:** O(n) — worst case for the set if all elements are unique.

### Potential follow-up questions (as if you’re the interviewer)  
- How do you solve it if you want to allow up to k duplicates?  
  *Hint: Use a frequency map instead of a set.*

- Can you adapt this for the longest subarray (not max sum) with unique elements?  
  *Hint: Instead of keeping sums, count the window size.*

- What if numbers can be negative?  
  *Hint: Sliding window only works when all are positive; otherwise, more careful tracking is required.*

### Summary
Classic sliding window with hash set for unique window expansion. Common pattern for substring/array uniqueness, longest substring without repeats, etc.

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window)

### Similar Problems
- Longest Substring Without Repeating Characters(longest-substring-without-repeating-characters) (Medium)