### Leetcode 3392 (Easy): Count Subarrays of Length Three With a Condition [Practice](https://leetcode.com/problems/count-subarrays-of-length-three-with-a-condition)

### Description  
Given an integer array `nums`, return the number of subarrays of length 3 such that **the sum of the first and third numbers equals exactly half of the second number**. In other words, for a subarray [nums[i], nums[i+1], nums[i+2]], check if nums[i] + nums[i+2] == nums[i+1] ⧸ 2.

### Examples  

**Example 1:**  
Input: `[1,2,1,4,1]`,  
Output: `1`  
Explanation:  
Only one subarray of length 3 matches: [1,4,1] (indices 2,3,4).    1 + 1 = 2, and 4 ⧸ 2 = 2, so condition holds.

**Example 2:**  
Input: `[1,1,1]`,  
Output: `0`  
Explanation:  
Only one subarray [1,1,1], but 1 + 1 ≠ 1 ⧸ 2.

**Example 3:**  
Input: `[2,8,2,2,6]`,  
Output: `0`  
Explanation:  
No subarray meets the required condition.

### Thought Process (as if you’re the interviewee)  
First, to fulfill the requirements, we need to iterate through all subarrays of length 3. For each triplet, we check the condition:  
nums[i] + nums[i+2] == nums[i+1] ⧸ 2.

Brute-force way is okay since 3 ≤ n ≤ 100, so one pass over the array is acceptable.  
For each i from 1 to n-2, select nums[i-1], nums[i], nums[i+1]; check if (nums[i-1] + nums[i+1]) × 2 == nums[i].

Key detail: since nums[i+1] ⧸ 2 may not be integer, avoid float division by rewriting as 2 × (nums[i-1] + nums[i+1]) == nums[i] to prevent float/integer mismatch.

Final approach:  
- Loop i from 1 to len(nums) - 2.
- For each, check if nums[i] == 2 × (nums[i-1] + nums[i+1]).
- Count the number of matches.

This approach is O(n). No need for optimization beyond a simple pass.

### Corner cases to consider  
- Array of exactly 3 elements (single subarray).
- No matching subarrays at all (all output 0).
- Negative numbers and zero in input.
- Repeated numbers (all equal).
- Large/small numbers (but always integer division).
- Input of length greater than 3.
- Odd/even middle element (must be divisible by 2).

### Solution

```python
def countSubarrays(nums):
    # Number of valid subarrays
    count = 0
    # We only consider windows [i-1, i, i+1] for i in 1 to len(nums)-2
    for i in range(1, len(nums)-1):
        # If middle value is exactly double the sum of the ends
        if nums[i] == 2 * (nums[i-1] + nums[i+1]):
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of elements in nums. We make a single pass, and each check is O(1).
- **Space Complexity:** O(1), since we only use a constant counter for the answer (no extra storage based on input size).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this solution if the subarray length was k instead of 3?  
  *Hint: Would a sliding window or prefix sum help?*

- What if the condition changed to “sum of first and last is equal to the sum of the rest of the elements in subarray”?  
  *Hint: Try generalizing the sum expression and check efficiency.*

- Can you return the starting indices of all qualifying subarrays instead of just the count?  
  *Hint: Collect indices in a list while iterating.*

### Summary
This problem is a classic fixed-size sliding window check: examine all subarrays of a certain length (3), and check a mathematical condition that relates their elements. The approach is direct and avoids premature optimization; it's a representative example of using for-loop and windowed access for local array conditions, and the pattern frequently appears in other problems involving fixed-length subarrays and elementwise relationships.

### Tags
Array(#array)

### Similar Problems
