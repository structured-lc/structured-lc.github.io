### Leetcode 376 (Medium): Wiggle Subsequence [Practice](https://leetcode.com/problems/wiggle-subsequence)

### Description  
Given an integer array, find the length of the **longest subsequence** such that the sequence of differences between successive numbers strictly alternates between positive and negative. The **difference** sequence must alternate in sign; consecutive equal numbers (difference = 0) are not counted as alternating.  
A subsequence is created by deleting some elements (or none) without changing the order of the remaining elements.  
A single element or a two-element sequence with distinct numbers is trivially a wiggle sequence.

### Examples  

**Example 1:**  
Input: `nums = [1,7,4,9,2,5]`  
Output: `6`  
Explanation: The entire sequence is a wiggle sequence with differences (6, -3, 5, -7, 3).

**Example 2:**  
Input: `nums = [1,17,5,10,13,15,10,5,16,8]`  
Output: `7`  
Explanation: One possible wiggle subsequence is [1, 17, 10, 13, 10, 16, 8] with differences (16, -7, 3, -3, 6, -8).

**Example 3:**  
Input: `nums = [1,2,3,4,5,6,7,8,9]`  
Output: `2`  
Explanation: Any two adjacent increasing numbers form a wiggle sequence. No alternating pattern beyond two.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible subsequences and check if they are wiggle sequences. This is exponentially slow due to the number of subsequences, so it’s not practical.

- **Dynamic Programming:**  
  Track, for each index, the longest wiggle subsequence ending at that index with both *up* and *down* (meaning, the last difference was positive or negative).  
  Let up[i] be the length ending at index i with an upward wiggle last, down[i] for downward wiggle last.  
  For each element:
  - If nums[i] > nums[i-1], up[i] = down[i-1] + 1; down[i] = down[i-1]
  - If nums[i] < nums[i-1], down[i] = up[i-1] + 1; up[i] = up[i-1]
  - If equal, carry forward both.
  This can be **optimized to O(1) space** since only the previous state is needed.

- **Why this approach:**  
  - Handles every case efficiently.
  - Covers cases where the best result is not contiguous.
  - O(n) time; only needs two variables after first pass.

### Corner cases to consider  
- Array with **1 or 2 elements**
- All elements **equal**
- Array is **strictly increasing** or **strictly decreasing**
- Elements with **zero differences** in the middle (e.g. [1,1,1,1])
- Alternating pattern starting with increase OR decrease (e.g. [3,8,2])

### Solution

```python
def wiggleMaxLength(nums):
    if not nums:
        return 0

    # Initialize up and down counters
    up = down = 1

    for i in range(1, len(nums)):
        if nums[i] > nums[i-1]:
            up = down + 1
        elif nums[i] < nums[i-1]:
            down = up + 1
        # If nums[i] == nums[i-1], no update needed (same as before)
    
    return max(up, down)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One pass through the nums array, each comparison is constant time.
- **Space Complexity:** O(1) — Only two variables (`up`, `down`) are maintained regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your algorithm change if you had to return the actual longest subsequence, not just its length?  
  *Hint: Consider maintaining parent pointers or storing the sequence dynamically.*

- What if you are given a stream of numbers and can't store them all in memory?  
  *Hint: Can you still track just the length using two counters?*

- How would you adapt the solution if zero differences (nums[i] == nums[i-1]) were allowed as alternations?  
  *Hint: Think about how comparisons in the loop would change.*

### Summary
This problem uses the **dynamic programming - state compression** pattern. By keeping track of the length of wiggle subsequences ending with up or down at each index, then optimizing state to two scalars, we achieve O(n) time and O(1) space. The technique applies to similar sequence or subsequence problems, especially where alternation or switching patterns must be tracked length-wise.