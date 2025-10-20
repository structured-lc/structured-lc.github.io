### Leetcode 1438 (Medium): Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit [Practice](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit)

### Description  
Given an integer array nums and integer limit, find the length of the longest continuous subarray such that the absolute difference between any two elements in the subarray is less than or equal to limit.

### Examples  

**Example 1:**  
Input: `nums = [8,2,4,7], limit = 4`  
Output: `2`  
*Explanation: Subarrays: [8,2] diff 6 > 4, [2,4] diff 2, [4,7] diff 3, [2,4,7] diff 5 > 4. So, max is 2 ([2,4] or [4,7]).*

**Example 2:**  
Input: `nums = [10,1,2,4,7,2], limit = 5`  
Output: `4`  
*Explanation: [2,4,7,2] is a valid subarray: max=7, min=2 ⇒ 7-2=5 ≤ 5.*

**Example 3:**  
Input: `nums = [4,2,2,2,4,4,2,2], limit = 0`  
Output: `3`  
*Explanation: subarrays with only equal elements are valid since diff=0. Max length is 3.*

### Thought Process (as if you’re the interviewee)  
We need the **sliding window** where the window is valid as long as max - min ≤ limit. Maintaining max/min efficiently as we move both ends can be done with two monotonic deques (to store current window's max & min), which allow O(1) update/removal of out-of-window elements. As we expand right, if the window is invalid, move left pointer to shrink window until valid.

### Corner cases to consider  
- All numbers equal
- limit = 0, so only equal subarrays are valid
- Subarray at the start/end/entire array
- Only 1 element in nums

### Solution

```python
from collections import deque

def longestSubarray(nums, limit):
    max_deque = deque()
    min_deque = deque()
    left = 0
    ans = 0
    for right, val in enumerate(nums):
        while max_deque and nums[max_deque[-1]] < val:
            max_deque.pop()
        max_deque.append(right)
        while min_deque and nums[min_deque[-1]] > val:
            min_deque.pop()
        min_deque.append(right)
        while nums[max_deque[0]] - nums[min_deque[0]] > limit:
            if max_deque[0] == left:
                max_deque.popleft()
            if min_deque[0] == left:
                min_deque.popleft()
            left += 1
        ans = max(ans, right - left + 1)
    return ans
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — each index enqueued and dequeued at most once.
- **Space Complexity:** O(n) — for deques in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you adapt to allow k outliers in the window?  
  *Hint: Tolerate skipping elements with mismatch.*

- What if you need the actual subarray, not just its length?  
  *Hint: Track start and end indices when new longest window is found.*

- Can you solve in O(n log n) with a TreeMap or balanced BST?  
  *Hint: Use stdlib tree/heap if no monotonic deque available.*

### Summary
This is a classic monotonic deque / sliding window maximum/minimum pattern, vital in windowed signal, price or statistical analysis. Template generalizes to problems involving window-based range constraints.


### Flashcard
Use two monotonic deques to maintain window max/min for sliding window; expand right, shrink left when max−min > limit.

### Tags
Array(#array), Queue(#queue), Sliding Window(#sliding-window), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set), Monotonic Queue(#monotonic-queue)

### Similar Problems
- Partition Array Such That Maximum Difference Is K(partition-array-such-that-maximum-difference-is-k) (Medium)
- Count Subarrays With Fixed Bounds(count-subarrays-with-fixed-bounds) (Hard)