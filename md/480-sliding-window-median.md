### Leetcode 480 (Hard): Sliding Window Median [Practice](https://leetcode.com/problems/sliding-window-median)

### Description  
Given an integer array and a window size *k*, slide a window of size *k* from left to right across the array. For each window, return the **median** of the elements inside the window. The median is the middle value when the window’s elements are sorted. If the window has an even length, the median is the average of the two middle values.  
Your task is to return an array with the median for every window position.

### Examples  

**Example 1:**  
Input: `nums = [1,3,-1,-3,5,3,6,7]`, `k = 3`  
Output: `[1, -1, -1, 3, 5, 6]`  
Explanation:  
Window positions and medians:  
- [1, 3, -1] ⟶ median is 1  
- [3, -1, -3] ⟶ median is -1  
- [-1, -3, 5] ⟶ median is -1  
- [-3, 5, 3] ⟶ median is 3  
- [5, 3, 6] ⟶ median is 5  
- [3, 6, 7] ⟶ median is 6

**Example 2:**  
Input: `nums = [2,2,2,2,2]`, `k = 2`  
Output: `[2, 2, 2, 2]`  
Explanation:  
All windows: [2,2], [2,2], [2,2], [2,2], each median is 2.

**Example 3:**  
Input: `nums = [1, 4, 2, 3]`, `k = 4`  
Output: `[2.5]`  
Explanation:  
Window is [1, 4, 2, 3], sorted is [1,2,3,4] ⇒ median is (2+3)/2 = 2.5

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  For each window, copy the k elements, sort, and extract the median. This takes O(k log k) per window, and there are (n − k + 1) windows, so overall O(n × k log k).  
  This is **too slow** for large n or k.

- **Optimized approach – Two Heaps:**  
  Use two heaps:  
  - A max-heap for the left (lower half)  
  - A min-heap for the right (upper half)  
  Always keep their sizes balanced: left can have at most 1 more than right.  
  The median is either the top of left, or the average of the tops (if both have same size).  
  Each insert and erase is O(log k).  
  When sliding, remove the outgoing number, add the new one, rebalance, and record the median.

  - **Removing arbitrary elements from a heap efficiently:**  
    Since heaps don't support O(log k) remove by value, use a hashmap ("delayed") to mark elements for lazy removal, only popping them from the real heap top when needed.

  **Trade-offs:**  
  - Two heaps + hashmap are efficient (O(n log k)).
  - Brute force is simpler but much slower for big data[1][3].

### Corner cases to consider  
- Empty nums or k = 0 (should return [])  
- k = 1 (window is always one number — median is the number itself)  
- k = len(nums) (only one window)  
- Duplicate elements  
- All elements equal  
- Negative numbers  
- Even and odd window sizes  
- Large numbers, possible overflow in sum/average

### Solution

```python
import heapq
from collections import defaultdict

class DualHeap:
    def __init__(self, k):
        # max-heap for lower half, min-heap for upper half
        self.small = []  # max-heap (invert values)
        self.large = []  # min-heap
        self.delayed = defaultdict(int)  # value: count to remove later
        self.k = k
        self.small_size = 0  # number of valid (non-deleted) elements
        self.large_size = 0

    def prune(self, heap):
        # Remove the top element if it's marked for deletion
        while heap:
            num = -heap[0] if heap == self.small else heap[0]
            if self.delayed[num]:
                heapq.heappop(heap)
                self.delayed[num] -= 1
            else:
                break

    def balance(self):
        # Keep sizes within 1
        if self.small_size > self.large_size + 1:
            # Move from small to large
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
            self.small_size -= 1
            self.large_size += 1
            self.prune(self.small)
        elif self.small_size < self.large_size:
            # Move from large to small
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)
            self.large_size -= 1
            self.small_size += 1
            self.prune(self.large)

    def insert(self, num):
        # Always push onto small, then rebalance to maintain ordering
        if not self.small or num <= -self.small[0]:
            heapq.heappush(self.small, -num)
            self.small_size += 1
        else:
            heapq.heappush(self.large, num)
            self.large_size += 1
        self.balance()

    def erase(self, num):
        # Mark for delayed removal
        self.delayed[num] += 1
        if self.small and num <= -self.small[0]:
            self.small_size -= 1
            if -self.small[0] == num:
                self.prune(self.small)
        else:
            self.large_size -= 1
            if self.large and self.large[0] == num:
                self.prune(self.large)
        self.balance()

    def get_median(self):
        if self.k % 2:  # odd k
            return float(-self.small[0])
        else:
            return (-self.small[0] + self.large[0]) / 2

def medianSlidingWindow(nums, k):
    if not nums or k == 0:
        return []
    dh = DualHeap(k)
    result = []
    for i in range(k):
        dh.insert(nums[i])
    result.append(dh.get_median())
    for i in range(k, len(nums)):
        dh.insert(nums[i])
        dh.erase(nums[i - k])
        result.append(dh.get_median())
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k)  
  - Each window slide adds and removes one element, both are O(log k) due to heap operations and lazy deletion. There are n − k + 1 medians to compute[1][3].

- **Space Complexity:** O(k)  
  - Four data structures (2 heaps of size ≤ k, plus a delayed-deletion hashmap and result list). No recursion or deep call stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle streaming data of infinite length?
  *Hint: Can you process efficiently with constant memory for each sliding window?*

- How would you support modifying k at run-time (change window size)?
  *Hint: What structure changes, and how to rebalance?*

- Can you efficiently report sliding min or max in the window instead of median?
  *Hint: Would a double-ended queue (deque) suffice?*

### Summary
This problem combines the **sliding window** and **heap/priority queue** patterns, using a two-heap approach (max-heap + min-heap) with *delayed deletions* to maintain median efficiently as the window slides.  
This pattern recurs in problems needing order statistics over moving windows, such as running median, percentile, and may be adapted for kth largest, median maintenance, or real-time monitoring scenarios.