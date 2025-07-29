### Leetcode 1800 (Easy): Maximum Ascending Subarray Sum [Practice](https://leetcode.com/problems/maximum-ascending-subarray-sum)

### Description  
Given an array of positive integers, find the **maximum sum** of any contiguous subarray where the numbers are strictly ascending. An ascending subarray is one where every next value is larger than the previous. A single element counts as ascending (since it has no previous element).

### Examples  

**Example 1:**  
Input: `nums = [10, 20, 30, 5, 10, 50]`  
Output: `65`  
*Explanation: [5, 10, 50] is an ascending subarray and its sum is 65, which is higher than any other ascending subarray.*

**Example 2:**  
Input: `nums = [10, 20, 30, 40, 50]`  
Output: `150`  
*Explanation: The entire array is ascending: 10 < 20 < 30 < 40 < 50. Sum = 10 + 20 + 30 + 40 + 50 = 150.*

**Example 3:**  
Input: `nums = [12, 17, 15, 13, 10, 11, 12]`  
Output: `33`  
*Explanation: [10, 11, 12] is ascending and sum is 33. No longer ascending subarrays in the array beat this sum.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible subarrays and, for each, check if it is strictly ascending and compute the sum. This approach checks all possible subarrays, leading to O(n²) time complexity.

- **Optimized approach:**  
  One-pass linear scan.  
  - Start with the first element as the current sum.
  - As you iterate, if the current value is greater than the previous, add it to the running sum.
  - If not, reset the running sum to the current value (because a new ascending subarray must start).
  - Always track the maximum sum seen so far.  
  This method covers every ascending subarray and updates the answer on the fly, giving O(n) time and O(1) extra space.

- **Trade-offs:**  
  The optimized method is simple and optimal for the problem's constraints. There is no need for complicated data structures.

### Corner cases to consider  
- Single element array: should return that element.
- All elements are equal: should return the maximum single element.
- All strictly descending: should return the maximum single element.
- Entire array is ascending.
- Ascending subarrays appear at the start, end, or middle.
- nums contains the minimum or maximum allowed value (1 or 100).

### Solution

```python
def maxAscendingSum(nums):
    # Initialize variables for max sum and the current sum
    max_sum = nums[0]
    current_sum = nums[0]
    
    # Iterate from the 2¹ˢᵗ element
    for i in range(1, len(nums)):
        # If strictly ascending, add to current sum
        if nums[i] > nums[i - 1]:
            current_sum += nums[i]
        else:
            # Not ascending, reset current sum to current element
            current_sum = nums[i]
        # Update max_sum if we've found a greater sum
        max_sum = max(max_sum, current_sum)
        
    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of elements in `nums`. We process each element once.
- **Space Complexity:** O(1), no extra storage is used besides a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the values could be negative?
  *Hint: Think about whether ascending order matters more than the sum when negatives are involved.*

- Could you return the subarray itself, not just its sum?
  *Hint: Store start and end indices when you reset or update the max.*

- How would you adapt the method for non-strictly increasing (allow repeats)?
  *Hint: Change the comparison from '>' to '>=' at the check.*

### Summary
This problem is a classic example of the **"sliding window for subarray problems"** or **"one-pass cumulative sum with reset"** pattern. It's efficient, uses constant space, and can be adapted for related problems like finding maximum sum of non-decreasing or other monotonic subarrays. The approach is common in interview settings for array segment optimizations.