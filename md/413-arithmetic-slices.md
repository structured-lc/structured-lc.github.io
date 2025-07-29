### Leetcode 413 (Medium): Arithmetic Slices [Practice](https://leetcode.com/problems/arithmetic-slices)

### Description  
Given an integer array `nums`, find the number of contiguous subarrays (called *arithmetic slices*) of length at least 3 where the difference between consecutive elements is constant.  
So for any triple (or longer) in the array, check if their intervals are the same. Only contiguous subarrays count, and each must have at least 3 numbers.

### Examples  

**Example 1:**  
Input: `[1,2,3,4]`  
Output: `3`  
*Explanation: The arithmetic slices are `[1,2,3]`, `[2,3,4]`, and `[1,2,3,4]`. Each has consecutive elements differing by 1.*

**Example 2:**  
Input: `[1,3,5,7]`  
Output: `3`  
*Explanation: The arithmetic slices are `[1,3,5]`, `[3,5,7]`, and `[1,3,5,7]`, with a constant difference of 2 between consecutive elements.*

**Example 3:**  
Input: `[1,2,4]`  
Output: `0`  
*Explanation: No subarray of length ≥3 has equal differences between consecutive elements, so the result is 0.*

### Thought Process (as if you’re the interviewee)  
First, you could brute-force by trying every possible subarray of length 3 or more and checking if it's arithmetic.  
That approach would take O(n³) time in the worst case (all possible subarrays, check each for constant difference).  
We can optimize using dynamic programming:

- Notice that if three elements at positions i-2, i-1, and i form an arithmetic progression, and the two prior also did, then any extension of such a run also forms arithmetic slices by appending to the end.
- Use a variable (`current`) to keep track of how many arithmetic sequences end at each position.
- When nums[i] - nums[i-1] == nums[i-1] - nums[i-2]:  
  - it extends the previous sequence; increment `current` and add to result.
- Else, reset `current` to 0.

This gives a linear time O(n) solution.

### Corner cases to consider  
- Array length less than 3: should return 0, as no slice can be formed.
- All elements equal: e.g., `[2,2,2,2,2]`, every triple is arithmetic.
- Strictly increasing/decreasing sequences.
- No valid slice at all: e.g., `[1,1,2,4,7]`.
- Large differences or negative numbers: e.g., `[-1, -3, -5, -7]`.
- Empty array or single element array.

### Solution

```python
def numberOfArithmeticSlices(nums):
    # If the array is too short, cannot have arithmetic slices
    if len(nums) < 3:
        return 0

    result = 0
    current = 0
    for i in range(2, len(nums)):
        # Check if the current triplet forms an arithmetic progression
        if nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]:
            current += 1               # Extend the run of arithmetic slices ending here
            result += current          # Add current count to total result
        else:
            current = 0                # Reset count if pattern breaks

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we scan through the array once.
- **Space Complexity:** O(1), using only a couple of integer variables for state tracking.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return the actual list of arithmetic slices, not just the count?  
  *Hint: Track the start indices and reconstruct subarrays when `current` increments.*

- How would you solve it if the input stream is infinite, e.g., data coming in chunks?  
  *Hint: Maintain a sliding window and state between chunks.*

- What if you were asked for the count of arithmetic slices of exactly length 3, not those of length ≥3?  
  *Hint: Check every window of size 3 for the property and count.*

### Summary
This uses the "count while running" dynamic programming pattern. Instead of recalculating for every possible subarray, we observe that every new valid element can extend previous arithmetic slices, and we accumulate the counts.  
This pattern shows up in sequence/difference-based array DP (like counting subarrays with a property) and can generalize to other contiguous pattern detection problems.