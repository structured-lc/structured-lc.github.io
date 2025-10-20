### Leetcode 487 (Medium): Max Consecutive Ones II [Practice](https://leetcode.com/problems/max-consecutive-ones-ii)

### Description  
You are given a binary array (containing only 0s and 1s). Find the maximum number of consecutive 1s in the array if you are allowed to flip at most **one** 0 to 1. In other words, you can change a single 0 to a 1, and want the longest run of consecutive 1s you could form as a result.

### Examples  

**Example 1:**  
Input: `nums = [1,0,1,1,0]`  
Output: `4`  
*Explanation: Flip the first 0 (index 1) to 1. The array becomes [1,1,1,1,0], so there are 4 consecutive 1s (indices 0-3).*

**Example 2:**  
Input: `nums = [1,0,1,1,0,1]`  
Output: `4`  
*Explanation: Flip the last 0 (index 4) to 1. The array becomes [1,0,1,1,1,1], so there are 4 consecutive 1s (indices 2-5).*

**Example 3:**  
Input: `nums = [1,1,1,1,1]`  
Output: `5`  
*Explanation: No zeros to flip, so the maximum consecutive 1s is 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Consider every 0 in the array, flip it to 1 momentarily, and count the length of the run of consecutive 1s containing that 0. This would involve, for each position, scanning left and right, yielding O(n²).
- **Optimized Approach:** Use a **sliding window**. Allow at most one 0 in the current window. Every time there are two zeros in the window, slide the left pointer to the right until there is only one or zero zeros within the window. Keep track of the maximum window size seen.
- **Why sliding window?** Because the problem is similar to finding the longest subarray with at most k zeros, and `k = 1` here. Sliding window allows for O(n) time and constant space.

### Corner cases to consider  
- Array contains only 1s: No zeros to flip, so result is the whole length.
- Array contains only 0s: Only one 0 can be flipped, so result is 1.
- Array is empty: Return 0.
- Single-element array, either  or [1].
- Zeros at the edges or at the center.
- Several consecutive zeros.

### Solution

```python
def findMaxConsecutiveOnes(nums):
    # Initialize pointers for the sliding window
    left = 0
    max_len = 0
    zero_count = 0

    for right in range(len(nums)):
        # If we see a 0, increment the zero counter
        if nums[right] == 0:
            zero_count += 1
        # If there are more than one zero, shrink window from the left
        while zero_count > 1:
            if nums[left] == 0:
                zero_count -= 1
            left += 1
        # Update maximum window length
        max_len = max(max_len, right - left + 1)
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as each index is visited at most twice (once by right, once by left pointer).
- **Space Complexity:** O(1), only a few variables used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if you could flip at most k zeros?
  *Hint: Generalize the sliding window to track up to k zeros in the window.*
- How to solve this if the array is immutable and there are multiple queries?
  *Hint: Precompute prefix sums of 0s and use binary search or two pointers for queries.*
- How would you handle zeros with varying flip costs, and a fixed budget?
  *Hint: Use sliding window and accumulate costs within the window instead of just count.*

### Summary
The approach uses the classic **sliding window** pattern, where you expand the right pointer while maintaining the window validity (at most one zero inside). Once invalid, advance the left pointer. This ensures all subarrays considered have at most one zero, yielding the maximum possible length with a single flip. This is a standard approach for variable-length subarray or substring problems constrained by a count or budget, and can be generalized to similar “longest substring with at most k X” problems.


### Flashcard
Use sliding window allowing at most one zero; expand window on 1s, shrink when more than one zero, track max length.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window)

### Similar Problems
- Max Consecutive Ones(max-consecutive-ones) (Easy)
- Max Consecutive Ones III(max-consecutive-ones-iii) (Medium)
- All Divisions With the Highest Score of a Binary Array(all-divisions-with-the-highest-score-of-a-binary-array) (Medium)