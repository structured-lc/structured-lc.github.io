### Leetcode 239 (Hard): Sliding Window Maximum [Practice](https://leetcode.com/problems/sliding-window-maximum)

### Description  
Given an integer array and a window size k, slide a window of size k from left to right across the array. At each step, find and return the *maximum* value in the current window. The goal is to output a list containing the maximum for every possible k-sized window as it moves from the start to the end of the array.

### Examples  

**Example 1:**  
Input: `nums = [1,3,-1,-3,5,3,6,7]`, `k = 3`  
Output: `[3,3,5,5,6,7]`  
*Explanation:*
- Windows: [1,3,-1] → max = 3  
- [3,-1,-3] → max = 3  
- [-1,-3,5] → max = 5  
- [-3,5,3] → max = 5  
- [5,3,6] → max = 6  
- [3,6,7] → max = 7  

**Example 2:**  
Input: `nums = [1]`, `k = 1`  
Output: `[1]`  
*Explanation:*
- Only one window: [1] → max = 1  

**Example 3:**  
Input: `nums = [9, 11]`, `k = 2`  
Output: ``  
*Explanation:*
- Only one window: [9, 11] → max = 11  

### Thought Process (as if you’re the interviewee)  
First, a brute-force idea is to examine every window of size k in the array and find the maximum by scanning all k elements for each window. This takes O((n - k + 1) × k) time, which is inefficient for large inputs.

To optimize, observe that while sliding the window, much of the work is redundant: most values overlap with the next window. We want a way to quickly update the maximum as the window moves.

A good approach is to use a **monotonic deque** (double-ended queue). We'll maintain indices of potential maximum elements in decreasing order in the deque:
- When moving the window, remove indices of values that move out of the window from the front of the deque.
- Remove from the back all indices whose corresponding values are less than the new element’s value (as they can’t be maximum for any future window).
- The front of the deque contains the index of the maximum value for the current window.

This way, each element is added and removed from the deque at most once, giving linear O(n) time.

### Corner cases to consider  
- Empty array (`nums = []`)
- k = 1 (every element is its own maximum)
- k = length of nums (window is entire array)
- All elements are equal (e.g., `[2,2,2,2]`)
- k > length of nums (undefined — may return empty or error)
- Negative numbers, zeros, or large values
- nums contains only one element

### Solution

```python
from typing import List
from collections import deque

def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
    # Monotonic deque to keep indices of potential maximum elements
    dq = deque()
    res = []
    for i, num in enumerate(nums):
        # Remove indices that are outside the current window
        if dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove from back while current num is greater than deque's last index value
        while dq and nums[dq[-1]] < num:
            dq.pop()
        
        # Add current element's index
        dq.append(i)
        
        # If window is at least k elements, collect the max (at dq[0])
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is added and removed from the deque at most once, so the total is proportional to n.
- **Space Complexity:** O(k)  
  The deque stores indices, at most k of them for each window. The output array takes O(n - k + 1) space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the window size k keeps changing for each query?
  *Hint: Preprocessing using segment trees or a data structure allowing dynamic range max queries.*

- How would you solve this for a stream of data where nums is infinite/very large?
  *Hint: Maintain only necessary data in deque, output on the fly.*

- How would you modify the deque to find the minimum of each window instead?
  *Hint: Flip the comparison direction — maintain increasing order for minimum.*

### Summary  
This problem uses the classic **sliding window** technique in conjunction with a **monotonic deque** (double-ended queue). The pattern (deque + window) is frequently used for problems that require fast updates and retrievals of sliding maximums or minimums, and appears in time series analytics, stock price windows, and many more real-world streaming scenarios.