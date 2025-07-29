### Leetcode 2765 (Easy): Longest Alternating Subarray [Practice](https://leetcode.com/problems/longest-alternating-subarray)

### Description  
Given an integer array `nums`, find the length of the longest subarray that is *alternating*.  
- A subarray is *alternating* if its elements are contiguous, of length at least 2,  
- and follows a strict pattern:  
  - The first difference `nums[1] - nums` must be +1.  
  - Then the next difference alternates between -1 and +1 at each step.  
  - Formally: for a subarray starting at index s, the differences:
    - nums[s+1] - nums[s] = +1
    - nums[s+2] - nums[s+1] = -1
    - nums[s+3] - nums[s+2] = +1
    - etc...

Return the length of the longest such subarray, or -1 if no such subarray exists.

### Examples  

**Example 1:**  
Input: `nums = [3,4,3,4,3]`  
Output: `5`  
*Explanation: Entire subarray alternates (4-3 = +1), (3-4 = -1), (4-3 = +1)... full length = 5.*

**Example 2:**  
Input: `nums = [4,5,6]`  
Output: `2`  
*Explanation: Only [4,5] alternates (+1), can't proceed further as 6-5=+1 and doesn't follow required alternation (-1).*

**Example 3:**  
Input: `nums = [2,3,4,3,4,3,6]`  
Output: `4`  
*Explanation: [3,4,3,4] is a valid alternating subarray: 4-3=+1, 3-4=-1, 4-3=+1.  
[2,3,4] is not valid past index 2 because 4-3=+1 and previous diff was also +1.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to try every possible pair (start, end), check if the subarray from start to end is alternating by following the difference pattern (+1, -1, +1, ...). This would be O(n²).
- But since each new starting index only cares about the +1 pattern for its first two elements, and checks continue with a known expected diff, we can optimize:
  - For every index, if nums[i+1] - nums[i] == +1, expand rightwards as long as the alternating pattern continues.
  - Use a sliding window: when the pattern breaks, reset at the next possible start position.
- Overall, traverse with O(n) by always moving start to the breaking point + 1.
- This is a pattern detection and sliding window/two-pointer problem.

### Corner cases to consider  
- Array length < 2 → return -1.
- No valid subarray (e.g., all same numbers, or no consecutive +1 at the start of any window).
- Entire array is a valid alternating subarray.
- Alternation broken by duplicate or jump values.
- Multiple candidate subarrays, must return the maximum length.

### Solution

```python
def alternating_subarray(nums):
    n = len(nums)
    maxlen = -1
    i = 0
    
    while i < n - 1:
        # Check if subarray could start at i
        if nums[i+1] - nums[i] == 1:
            length = 2  # At least nums[i], nums[i+1]
            sign = -1   # Starting, so next diff should be -1
            j = i + 1
            while j + 1 < n:
                expected = nums[j] + sign
                if nums[j+1] == expected:
                    length += 1
                    sign *= -1
                    j += 1
                else:
                    break
            maxlen = max(maxlen, length)
            # Next valid start can be at i+1
        i += 1
    return maxlen
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each position is checked at most once for a possible window—`i` only increases, and inside the while, `j` runs forward and never decreases.
- **Space Complexity:** O(1). Only constant extra variables used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of +1/-1, the increments could be any alternating a and -a?  
  *Hint: Allow for arbitrary jumps and parametrize the diff step.*

- What if you had to return the indices of the longest subarray instead of its length?  
  *Hint: Track the start and end whenever you set `maxlen`.*

- What changes if you need to find the longest alternating *subsequence* (not subarray)?  
  *Hint: This may require dynamic programming, not just contiguous checks.*

### Summary
This problem uses a sliding window/two-pointer scan to efficiently find the longest continuous subarray with strict alternating +1, -1 difference pattern.  
The main insight is that the alternation pattern constraint allows you to validate possible windows in one forward pass.  
This "pattern detection" approach appears in problems like substring with alternating parity, or maximum-length wiggle subarrays.