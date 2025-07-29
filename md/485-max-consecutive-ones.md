### Leetcode 485 (Easy): Max Consecutive Ones [Practice](https://leetcode.com/problems/max-consecutive-ones)

### Description  
Given a binary array nums, return the maximum number of consecutive 1s in the array.

### Examples  

**Example 1:**  
Input: `nums = [1,1,0,1,1,1]`  
Output: `3`  
*Explanation: The first two 1s and the last three 1s are consecutive, so the maximum is 3.*

**Example 2:**  
Input: `nums = [1,0,1,1,0,1]`  
Output: `2`  
*Explanation: Maximum consecutive 1s is 2 (middle part).*

### Thought Process (as if you're the interviewee)  
This is a simple array traversal problem where I need to track the current consecutive count and update the maximum whenever I encounter a 0 or reach the end.

My approach:
1. **Single pass**: Iterate through array once
2. **Track current consecutive count**: Reset to 0 when seeing 0, increment when seeing 1
3. **Update maximum**: Keep track of the maximum consecutive count seen so far

This is a classic sliding window pattern where the window expands on 1s and resets on 0s.

### Corner cases to consider  
- All 1s (entire array is consecutive)
- All 0s (no consecutive 1s, answer is 0)
- Single element array
- Empty array
- Alternating 1s and 0s
- Consecutive 1s at the beginning or end

### Solution

```python
def findMaxConsecutiveOnes(nums):
    max_count = 0
    current_count = 0
    
    for num in nums:
        if num == 1:
            current_count += 1
            max_count = max(max_count, current_count)
        else:
            current_count = 0
    
    return max_count

# Alternative approach with explicit tracking
def findMaxConsecutiveOnesAlternative(nums):
    max_count = 0
    current_count = 0
    
    for i in range(len(nums)):
        if nums[i] == 1:
            current_count += 1
        else:
            max_count = max(max_count, current_count)
            current_count = 0
    
    # Don't forget to check the last sequence
    max_count = max(max_count, current_count)
    return max_count

# Using two pointers approach
def findMaxConsecutiveOnesTwoPointers(nums):
    max_count = 0
    left = 0
    
    for right in range(len(nums)):
        if nums[right] == 0:
            # Update max count for current window
            max_count = max(max_count, right - left)
            # Move left pointer past the 0
            left = right + 1
    
    # Check the last window
    max_count = max(max_count, len(nums) - left)
    return max_count

# Functional approach using groupby
def findMaxConsecutiveOnesFunctional(nums):
    from itertools import groupby
    
    # Group consecutive elements and find max length of 1s groups
    groups = [(key, len(list(group))) for key, group in groupby(nums)]
    return max((length for key, length in groups if key == 1), default=0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the length of the array, as we traverse the array once.
- **Space Complexity:** O(1) as we only use constant extra space for tracking counts.

### Potential follow-up questions (as if you're the interviewer)  

- What if you could flip at most k zeros to ones? How would you find the maximum consecutive ones then?  
  *Hint: Use sliding window technique with at most k zeros in the current window.*

- How would you solve this for a stream of data where you can't store the entire array?  
  *Hint: The same approach works since we only need to track current and maximum counts.*

- What if the array could contain values other than 0 and 1?  
  *Hint: Modify the condition to check for the target value instead of just 1.*

### Summary
This problem demonstrates the fundamental sliding window pattern for consecutive element counting. It's an excellent example of how simple state tracking can solve array traversal problems efficiently. This pattern extends to many similar problems involving consecutive elements, substring matching, and contiguous subarrays with specific properties.
