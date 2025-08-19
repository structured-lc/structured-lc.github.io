### Leetcode 295 (Hard): Find Median from Data Stream [Practice](https://leetcode.com/problems/find-median-from-data-stream)

### Description  
Design a data structure that supports these two operations efficiently on a running stream of integers:
- **addNum(num)**: Add a new integer from the stream into your data structure.
- **findMedian()**: Return the median of all elements so far. The median is the center value if the list is odd-sized, or the average of the two center values if even-sized.
Your implementation should make both operations efficient, even as the number of elements grows.  
Example: if the stream is [1, 2, 3], the median is 2. If it becomes [1, 2, 3, 4], the median is (2 + 3) / 2 = 2.5.

### Examples  

**Example 1:**  
Input: `addNum(1), addNum(2), findMedian()`  
Output: `1.5`  
*Explanation: After adding 1 and 2, the data structure holds [1, 2]. Median = (1 + 2) / 2 = 1.5.*

**Example 2:**  
Input: `addNum(1), addNum(2), addNum(3), findMedian()`  
Output: `2`  
*Explanation: After adding 1, 2, 3, it holds [1, 2, 3], Median = 2.*

**Example 3:**  
Input: `addNum(2), findMedian(), addNum(1), findMedian()`  
Output: `2, 1.5`  
*Explanation: First median: [2] Median = 2. After adding 1: [1, 2], Median = (1 + 2) / 2 = 1.5.*

### Thought Process (as if you’re the interviewee)  
- **Initial Idea:**  
  My first idea would be to collect numbers in an array, then sort it each time `findMedian()` is called. This works, but sorting each time is O(n log n), which is inefficient for repeated queries[4].
- **Optimization:**  
  The main challenge is keeping the list sorted efficiently. Ideally, we want O(log n) insertion and O(1) or O(log n) median retrieval.
- **Heaps Approach:**  
  Using two heaps is optimal:
  - A *max-heap* for the smaller half,
  - A *min-heap* for the larger half[1].
  Always maintain either both heaps with equal size or max-heap with one more.  
  - Adding a number: Push to max-heap, then rebalance by moving the largest of max-heap to min-heap, then, if min-heap is larger, move its smallest back to the max-heap.
  - Median: If sizes are equal, it’s the average of heap tops; otherwise, it’s the top of the heap with more elements[1].

### Corner cases to consider  
- Adding only one number (median is the number itself)
- Even count of numbers (average of the two center numbers)
- Odd count of numbers
- Negative numbers, duplicates
- Large data stream (ensure performance)
- Data stream with all identical numbers

### Solution

```python
import heapq

class MedianFinder:
    def __init__(self):
        # Max-heap for lower half (invert values for max-heap in Python)
        self.small = []
        # Min-heap for upper half
        self.large = []

    def addNum(self, num: int) -> None:
        # Add to max-heap (invert sign to simulate a max-heap)
        heapq.heappush(self.small, -num)
        # Move the largest of small to large (min-heap)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        # Balance: if large has more, move back to small
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        # If even count, average of two heap tops
        if len(self.small) == len(self.large):
            return (-self.small[0] + self.large[0]) / 2.0
        # If odd, small has one extra
        else:
            return -self.small[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `addNum`: O(log n) per add (heap operations)[1].
  - `findMedian`: O(1), just peeking at heap tops and possibly averaging.
- **Space Complexity:**  
  - O(n) to store all stream elements in two heaps.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle deleting numbers from the stream?  
  *Hint: Think about lazy deletion or using extra hash maps to mark deleted elements.*

- What if you receive a continuous stream with millions of numbers, but only need the median of the last k numbers?  
  *Hint: Sliding window — consider double-ended queue, augmented BST, or synchronized heaps.*

- How would you generalize this to efficiently compute the kᵗʰ smallest element at any time—not just the median?  
  *Hint: Multi-balanced heaps or order-statistics tree.*

### Summary
This problem uses the **two heaps pattern**, specifically a max-heap and min-heap to continually keep the lower and upper halves of the data stream. By balancing the heaps, you can add elements and find the running median efficiently. This is a classic streaming/online algorithm problem and the heap-balancing pattern applies to other problems involving medians or percentile computations in a dynamic list.

### Tags
Two Pointers(#two-pointers), Design(#design), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Data Stream(#data-stream)

### Similar Problems
- Sliding Window Median(sliding-window-median) (Hard)
- Finding MK Average(finding-mk-average) (Hard)
- Sequentially Ordinal Rank Tracker(sequentially-ordinal-rank-tracker) (Hard)
- Minimum Operations to Make Median of Array Equal to K(minimum-operations-to-make-median-of-array-equal-to-k) (Medium)
- Minimum Operations to Make Subarray Elements Equal(minimum-operations-to-make-subarray-elements-equal) (Medium)
- Minimum Operations to Make Elements Within K Subarrays Equal(minimum-operations-to-make-elements-within-k-subarrays-equal) (Hard)