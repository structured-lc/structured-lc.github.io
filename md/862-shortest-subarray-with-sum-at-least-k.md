### Leetcode 862 (Hard): Shortest Subarray with Sum at Least K [Practice](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k)

### Description  
Given an integer array **A** (may include negatives) and an integer **K**, find the **length** of the shortest, non-empty, contiguous subarray whose sum is at least **K**. If there is no such subarray, return **-1**.

### Examples  

**Example 1:**  
Input: `A = [1]`, `K = 1`  
Output: `1`  
*Explanation: The only subarray is [1], and its sum is 1, which is ≥ K.*

**Example 2:**  
Input: `A = [1,2]`, `K = 4`  
Output: `-1`  
*Explanation: The only possible subarrays are [1], [2], and [1,2]. All sums are less than 4.*

**Example 3:**  
Input: `A = [2,-1,2]`, `K = 3`  
Output: `3`  
*Explanation: The full array [2,-1,2] sums to 3, which is equal to K. Any shorter subarray has sum < 3.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to check every possible subarray and calculate its sum, returning the shortest length for which sum ≥ K. However, with n up to 50,000, this leads to O(n²) time, which is not suitable.

Since the array can contain negative numbers, a sliding window won’t work like in standard positive-number subarray problems. However, if we use **prefix sums** and a **monotonic deque**, we can optimize the search:

- Create a prefix sum array `P` where `P[i]` is the sum of the first `i` elements of A.
- For each `end` from 0 to n:
    - Remove indices from the front of the deque as long as `P[end] - P[deque] ≥ K`, and update result with `end - deque`.
    - Remove indices from the back if `P[end] ≤ P[deque[-1]]` to maintain increasing order.
    - Append `end` to the deque.
- The deque helps quickly find candidate start points for the shortest valid subarrays without revisiting every subarray.

This yields O(n) time with O(n) extra space for the prefix sum and deque.

### Corner cases to consider  
- Empty array (though problem states at least 1 element)
- All negative numbers, K > 0
- K much larger than sum of array
- Single element equals K
- Array with both positives and negatives
- Subarray with exact sum equals K

### Solution

```python
from collections import deque

def shortestSubarray(A, K):
    n = len(A)
    # Compute prefix sums
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + A[i]

    # Result initialized to impossible value (n+1)
    res = n + 1
    # Monotonic deque to store indices of prefix sums
    dq = deque()
    
    for i in range(n + 1):
        # Check if current prefix - smallest prefix in deque ≥ K
        while dq and prefix[i] - prefix[dq[0]] >= K:
            res = min(res, i - dq.popleft())
        # Maintain monotonicity: remove back if new prefix is smaller
        while dq and prefix[i] <= prefix[dq[-1]]:
            dq.pop()
        dq.append(i)
    
    return res if res <= n else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n); every index is pushed and popped from the deque at most once. Prefix computation is O(n).
- **Space Complexity:** O(n); extra space for prefix sum and the deque.

### Potential follow-up questions (as if you’re the interviewer)  

- What if all numbers are positive?  
  *Hint: Can you use a sliding window with two pointers directly?*

- Can you return the subarray itself, not just the length?  
  *Hint: How do you reconstruct the subarray from prefix sums and deque indices?*

- How would you handle updates or streaming data for such queries?  
  *Hint: Consider using segment trees or other data structures for dynamic ranges.*

### Summary
The problem is a mix of prefix sum and monotonic deque techniques, crucial when dealing with subarrays with possible negative numbers and needing the shortest window. This coding pattern appears in several “maximum sum subarray” problems where a naive window fails due to negatives, and can be broadly useful in interval or range minimum/maximum queries.


### Flashcard
Use prefix sums and a monotonic deque to find the shortest subarray with sum ≥ K, handling negative values.

### Tags
Array(#array), Binary Search(#binary-search), Queue(#queue), Sliding Window(#sliding-window), Heap (Priority Queue)(#heap-priority-queue), Prefix Sum(#prefix-sum), Monotonic Queue(#monotonic-queue)

### Similar Problems
- Shortest Subarray With OR at Least K II(shortest-subarray-with-or-at-least-k-ii) (Medium)
- Shortest Subarray With OR at Least K I(shortest-subarray-with-or-at-least-k-i) (Easy)