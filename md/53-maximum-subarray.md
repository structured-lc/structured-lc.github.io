### Leetcode 53 (Medium): Maximum Subarray [Practice](https://leetcode.com/problems/maximum-subarray/)

### Description  
Given an integer array, find the contiguous subarray (containing at least one number) that has the largest sum and return its sum. The subarray must be contiguous. You may assume the array contains both negative and positive numbers.  
This is commonly known as the "Maximum Subarray Sum" problem, or Kadane's Algorithm problem.

### Examples  

**Example 1:**  
Input: `nums = [-2,1,-3,4,-1,2,1,-5,4]`  
Output: `6`  
*Explanation: The subarray `[4,-1,2,1]` has the largest sum 4 + (-1) + 2 + 1 = 6.*

**Example 2:**  
Input: `nums = [1]`  
Output: `1`  
*Explanation: The only possible subarray is `[1]`.*

**Example 3:**  
Input: `nums = [5,4,-1,7,8]`  
Output: `23`  
*Explanation: The entire array is the maximum subarray: 5 + 4 + (-1) + 7 + 8 = 23.*


### Thought Process (as if you’re the interviewee)  
My first instinct is to consider all possible contiguous subarrays and calculate their sums to find the maximum.  
- For a brute-force approach, consider every possible pair of start and end indices and sum all subarrays defined by those indices.  
- However, the brute-force solution is O(n²), which is too slow for large arrays.

To optimize, I remember this is a classic case for dynamic programming:
- **Kadane’s Algorithm:** As I iterate, I keep track of `current_sum`, the maximum sum ending at the current position. For each index, I either extend the previous subarray or start a new subarray at the current index, based on which option yields a larger sum.
- At each position, I update the overall maximum if `current_sum` exceeds it.  
- Finally, return the largest sum found this way. This approach is O(n) time and O(1) extra space.

Trade-offs:  
- Extra information like the actual subarray can be recovered with some extra bookkeeping, but if we only need the sum, this is as efficient as possible.

### Corner cases to consider  
- Empty array (usually, constraints say at least one element)
- All negative numbers (should return the largest negative number)
- All positive numbers (should return the total sum)
- Single-element arrays
- Arrays where the max subarray is at the start or the end

### Solution

```python
def maxSubArray(nums):
    # Start with the first element as the initial max values
    max_so_far = nums[0]
    current_sum = nums[0]
    
    # Go through the rest of the array
    for i in range(1, len(nums)):
        # Either extend the previous subarray or start new from current element
        current_sum = max(nums[i], current_sum + nums[i])
        # Update the overall maximum if needed
        max_so_far = max(max_so_far, current_sum)
    
    return max_so_far
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each element is visited once.
- **Space Complexity:** O(1), as we use only a constant amount of extra variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return the actual subarray, not just the sum?  
  *Hint: Track the start and end indices as you update `current_sum`.*

- How would you solve it if the numbers are in a stream (cannot store all of them)?  
  *Hint: Maintain a rolling maximum, as in Kadane’s, but with careful memory usage.*

- Can you solve the problem for circular arrays (subarray may wrap around)?  
  *Hint: Use a variation involving total sum minus the minimum subarray sum.*

### Summary
This problem uses the classic dynamic programming approach, specifically "Kadane’s Algorithm". It’s a well-known “prefix sum optimization” or “running window” pattern, and appears in problems involving contiguous subarrays with optimal properties. This coding pattern can be applied to similar maximum (or minimum) sum subarray problems, and has real-world applications in finance, time-series analysis, and computational genomics.