# Leetcode 3738 (Medium): Longest Non-Decreasing Subarray After Replacing at Most One Element [Practice](https://leetcode.com/problems/longest-non-decreasing-subarray-after-replacing-at-most-one-element)

## Description

Given an array of integers, find the longest subarray that is non-decreasing (each element ≥ previous element) after replacing **at most one element** anywhere in the array. You need to return the length of this longest subarray. The key insight is that by strategically replacing one element, you might be able to "bridge" two non-decreasing segments or extend an existing segment.

## Examples

**Example 1:**  
Input: `[1, 2, 3, 1, 2]`  
Output: `4`  
*Explanation: Replace nums[3] = 1 with 3 to get [1, 2, 3, 3, 2]. The longest non-decreasing subarray is [1, 2, 3, 3] with length 4.*

**Example 2:**  
Input: `[2, 1]`  
Output: `2`  
*Explanation: Replace nums = 2 with 1 to get [1, 1], which is non-decreasing with length 2.*

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation: Single element is always non-decreasing, length is 1.*

## Thought Process (as if you're the interviewee)

Let me think about this step-by-step:

**Brute Force Approach:** For each position i, try replacing nums[i] with some value and compute the longest non-decreasing subarray. This is inefficient because we'd need to try many replacement values.

**Optimized Insight:** Instead of trying different replacement values, I realize that if I replace nums[i], the optimal replacement would be **any value between nums[i-1] and nums[i+1]** (inclusive). This allows me to potentially connect the non-decreasing segment ending at i-1 with the non-decreasing segment starting at i+1.

**Approach:** Use three DP arrays:
- `left[i]`: Length of the longest non-decreasing subarray ending at i (without any replacement)
- `right[i]`: Length of the longest non-decreasing subarray starting at i (without any replacement)
- For each position i, consider three scenarios:
  1. Don't replace anything: take the maximum from `left` and `right` arrays
  2. Replace nums[i]: if nums[i-1] ≤ nums[i+1], we can bridge them with length `left[i-1] + 1 + right[i+1]`. Otherwise, we extend the longer segment: `max(left[i-1], right[i+1]) + 1`

This gives O(n) time complexity with a single pass to build the arrays.

## Corner cases to consider

- Single element array: returns 1
- Array of length 2: might need one replacement to make it non-decreasing
- All elements equal: already non-decreasing, no replacement needed; return n
- All elements strictly decreasing: we can make any consecutive 2 elements equal by replacing one; returns 2
- Array that's already non-decreasing: no replacement needed; return n
- Replacement cannot help (e.g., [3, 1, 2]): best we can do is fix one break; returns 2

## Solution

```python
def longestNonDecreasingSubarray(nums: list[int]) -> int:
    n = len(nums)
    
    if n == 1:
        return 1
    
    # left[i] = length of non-decreasing subarray ending at i
    left = [1] * n
    for i in range(1, n):
        if nums[i - 1] <= nums[i]:
            left[i] = left[i - 1] + 1
    
    # right[i] = length of non-decreasing subarray starting at i
    right = [1] * n
    for i in range(n - 2, -1, -1):
        if nums[i] <= nums[i + 1]:
            right[i] = right[i + 1] + 1
    
    # Maximum without any replacement
    max_length = max(max(left), max(right))
    
    # Try replacing each element
    for i in range(n):
        # If we replace nums[i], check what we can achieve
        current_length = 1
        
        # Can we extend from left?
        if i > 0:
            current_length = max(current_length, left[i - 1] + 1)
        
        # Can we extend from right?
        if i < n - 1:
            current_length = max(current_length, right[i + 1] + 1)
        
        # Can we bridge left and right?
        if i > 0 and i < n - 1:
            if nums[i - 1] <= nums[i + 1]:
                current_length = max(current_length, left[i - 1] + 1 + right[i + 1])
        
        max_length = max(max_length, current_length)
    
    return max_length
```

## Time and Space Complexity Analysis

- **Time Complexity:** O(n)  
  We build the `left` array in one forward pass (O(n)), build the `right` array in one backward pass (O(n)), then iterate through each position once to consider replacements (O(n)). Total: O(n).

- **Space Complexity:** O(n)  
  We use two auxiliary arrays `left` and `right`, each of size n. The space is proportional to the input size.

## Potential follow-up questions

- (Follow-up question 1) What if you can replace **at most k elements** instead of 1?  
  *Hint: Extend the DP to track the number of replacements used; maintain dp[i][j] = longest subarray ending at i using j replacements.*

- (Follow-up question 2) What if the array is very large and you need O(1) space?  
  *Hint: Instead of storing full arrays, track only necessary values as you iterate; use a sliding window approach.*

- (Follow-up question 3) Can you solve this problem if the array elements can be negative or very large?  
  *Hint: The algorithm is independent of element values (only comparisons matter), so it works for any integer range.*

## Summary

This problem uses a **prefix-suffix decomposition** pattern combined with dynamic programming. The key insight is pre-computing the longest non-decreasing segments that end/start at each position, then leveraging this information to efficiently evaluate the impact of replacing each element. This pattern is useful for problems where you need to understand "what comes before" and "what comes after" a decision point. Similar patterns appear in problems like "Best Time to Buy and Sell Stock", "Trapping Rain Water", and other optimization problems involving subarrays.


### Flashcard
Use dynamic programming tracking the longest non-decreasing subarray ending at each position with 0 or 1 replacements used.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
