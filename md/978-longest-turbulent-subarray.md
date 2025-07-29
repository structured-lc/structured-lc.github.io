### Leetcode 978 (Medium): Longest Turbulent Subarray [Practice](https://leetcode.com/problems/longest-turbulent-subarray)

### Description  
Given an integer array, find the length of the longest turbulent subarray.  
A **turbulent** subarray is a contiguous part of the array where the comparison (`>`, `<`) between every adjacent pair of elements flips (alternates) for every step.  
For example, for a subarray `[a, b, c, d]`, it's turbulent if either:
- a > b < c > d, **or**
- a < b > c < d

In other words, for indices i ≤ k < j:
- If k is even: arr[k] > arr[k+1]; if k is odd: arr[k] < arr[k+1], **or**
- If k is even: arr[k] < arr[k+1]; if k is odd: arr[k] > arr[k+1]  
Return the length of the longest contiguous turbulent subarray.

### Examples  

**Example 1:**  
Input: `[9,4,2,10,7,8,8,1,9]`  
Output: `5`  
*Explanation: The subarray `[4,2,10,7,8]` forms a turbulent sequence: 4 > 2 < 10 > 7 < 8.*

**Example 2:**  
Input: `[4,8,12,16]`  
Output: `2`  
*Explanation: Any adjacent pair is a valid turbulent subarray. The sequence doesn't alternate, so the answer is 2.*

**Example 3:**  
Input: ``  
Output: `1`  
*Explanation: A single element is trivially turbulent.*

### Thought Process (as if you’re the interviewee)  

First, brute-force: try all possible subarrays and, for each, check if it's turbulent by comparing all pairs and ensuring the signs alternate.  
But that is O(n²) time — too slow.

To optimize, we can use a **sliding window**:  
- Maintain a window `[start, end]` such that the subarray remains turbulent.  
- Compare arr[i-2], arr[i-1], arr[i]: If the turbulence property breaks (either adjacent numbers are equal, or the comparison sign doesn't flip), move the start forward.
- Always keep track of the maximum window length.

Even better, use two variables tracking sequences ending in up or down:
- up[i] — longest turbulent subarray ending at i, last jump is up (arr[i-1] < arr[i])
- down[i] — longest turbulent subarray ending at i, last jump is down (arr[i-1] > arr[i])

But since we only care about the last state, we can do this in O(1) space (just two variables).  
This is optimal: **time O(n)**, **space O(1)**.

### Corner cases to consider  
- Array of length 1 → Output is 1  
- Array with all elements equal  
- Sequences where no turbulence is possible (monotonic array)  
- Arrays with alternating equal and distinct elements  
- Longest turbulent subarray is at the start or end

### Solution

```python
def maxTurbulenceSize(arr):
    if not arr:
        return 0
    n = len(arr)
    max_len = 1
    up = down = 1   # up: last comparison arr[i-1] < arr[i]; down: arr[i-1] > arr[i]
    
    for i in range(1, n):
        if arr[i] > arr[i-1]:
            up = down + 1
            down = 1
        elif arr[i] < arr[i-1]:
            down = up + 1
            up = 1
        else:
            up = down = 1
        max_len = max(max_len, max(up, down))
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We traverse the array once, updating variables in O(1) time per step.
- **Space Complexity:** O(1). Only a few integer variables used, no additional storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return the indices of the actual subarray?
  *Hint: Try keeping track of the window start position whenever the turbulence property is lost.*
  
- How would you adapt this for a stream of incoming numbers (online window)?
  *Hint: Only keep track of the latest two numbers and states.*

- Can you solve this if ties (equal elements) continue the turbulence?
  *Hint: Change your sign logic so equality doesn’t break the window.*

### Summary
This problem is a classic application of the **sliding window** and **stateful DP** patterns, where you only need information from the previous step to update your current state. The use of two state variables (up/down) is common in such comparison/oscillation problems; similar patterns appear in "wiggle subsequence", "peak valleys" problems, and can be adapted to problems requiring bidirectional state transitions.