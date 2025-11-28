### Leetcode 3708 (Medium): Longest Fibonacci Subarray [Practice](https://leetcode.com/problems/longest-fibonacci-subarray)

### Description  
Given a list of integers `nums`, find the length of the longest **contiguous subarray** which follows the Fibonacci pattern:  
For every element after the first two, it equals the sum of the two preceding numbers:  
nums[i] = nums[i-1] + nums[i-2] for all indexes i ≥ 2 in the subarray.  
Return the length of the longest such subarray. If no subarray of length ≥ 3 exists, return 2 (since subarrays of length 1 and 2 trivially satisfy the property).

### Examples  

**Example 1:**  
Input: `[5,2,7,9,16,10]`  
Output: `5`  
*Explanation: The longest Fibonacci subarray is `[5,2,7,9,16]`.  
5+2=7, 2+7=9, 7+9=16. The sequence is broken at 16+9≠10.*

**Example 2:**  
Input: `[1,3,4,7,11,18,2,4]`  
Output: `6`  
*Explanation: The subarray `[3,4,7,11,18,2]` can only go till `[3,4,7,11,18]`:  
3+4=7, 4+7=11, 7+11=18. Next, 11+18≠2, so the streak ends.  
Length is 5, but the initial `[1,3,4,7,11,18]` also forms a Fibonacci subarray of length 6.*

**Example 3:**  
Input: `[1,1,2,3,5,8,13]`  
Output: `7`  
*Explanation: The entire array is a Fibonacci subarray:  
1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  I could check every possible subarray starting at each index and check, for every subsequent element, if nums[i] = nums[i-1] + nums[i-2]. This would be O(n²) time since for each starting index I may scan the whole array.
- **Optimized Iteration:**  
  Since we only need contiguous subarrays, I can use a sliding window:  
  - For i from 2 to n-1:  
    - If nums[i] == nums[i-1] + nums[i-2], extend the current streak.  
    - Otherwise, reset the streak counter starting from the previous two elements.
- **Why chose final approach:**  
  The linear scan is efficient, simple, and handles only contiguous regions, unlike subsequence-based problems.  
  No need for hashmaps or DP; just maintain a window and update the max.

### Corner cases to consider  
- Array length < 2 (return array length because any length-1 or -2 is trivially Fibonacci).
- All numbers the same (should always return 2, since a length-3 subarray cannot satisfy the Fibonacci property except possibly if all elements are zero).
- No subarray of length ≥ 3 forming Fibonacci (return 2).
- Negative numbers or zero (for completeness, but problem uses positive integers).
- The longest Fibonacci subarray appears at the end.
- Multiple valid subarrays, but must return the longest.

### Solution

```python
def lenLongestFibonacciSubarray(nums):
    n = len(nums)
    if n <= 2:
        return n  # Subarrays of length 1 or 2 are always Fibonacci

    max_len = 2  # The minimal length of Fibonacci subarray is 2
    curr_len = 2

    for i in range(2, n):
        # Check if current element equals sum of the previous two
        if nums[i] == nums[i-1] + nums[i-2]:
            curr_len += 1
        else:
            curr_len = 2  # Reset the count for a new sequence

        if curr_len > max_len:
            max_len = curr_len

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums.  
  Only one pass is needed to check all possible contiguous subarrays.
- **Space Complexity:** O(1), since only a few variables are used for counting; no extra storage beyond input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to return the actual subarray instead of the length?  
  *Hint: Track the starting index of the current streak whenever you reset the count.*

- Could you modify the function to handle negative numbers or zeros, if allowed?  
  *Hint: The core logic remains, just check the sum property.*

- How would the approach change if you needed **subsequences** (not subarrays) following Fibonacci?  
  *Hint: Requires dynamic programming and hash maps for efficient O(n²) solutions.*

### Summary
This problem uses the sliding window / streak length pattern for contiguous sequences with a sum property. Identifying window boundaries and maintaining counters is a common technique—applies whenever searching for longest contiguous patterns (e.g., arithmetic subarrays, constant-difference runs, or character substrings with properties). The solution is straightforward: linear scan, no sophisticated data structures, just counters.


### Flashcard
Iterate through the array and extend a Fibonacci streak when nums[i] = nums[i-1] + nums[i-2]; reset and track the maximum streak length.

### Tags
Array(#array)

### Similar Problems
