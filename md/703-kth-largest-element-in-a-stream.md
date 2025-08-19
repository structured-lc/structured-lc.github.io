### Leetcode 703 (Easy): Kth Largest Element in a Stream [Practice](https://leetcode.com/problems/kth-largest-element-in-a-stream)

### Description  
Design a class that can efficiently return the kᵗʰ largest element from an ongoing stream of integers.  
- You are given an integer k and an initial list of numbers nums.  
- The class should provide a method to add more values to the stream, and after each addition, return the current kᵗʰ largest element from the stream.
- The kᵗʰ largest element means the element that would appear at index (n-k) in the sorted array, allowing duplicates.  
- The data structure needs to quickly handle dynamic updates as numbers are continuously added.

### Examples  

**Example 1:**  
Input: `KthLargest(3, [4,5,8,2])`, `add(3)`, `add(5)`, `add(10)`, `add(9)`, `add(4)`  
Output: `4, 5, 5, 8, 8`  
*Explanation: Initial stream = [4,5,8,2], sorted = [2,4,5,8].  
add(3): stream = [4,5,8,2,3] → [2,3,4,5,8], 3ʳᵈ largest is 4.  
add(5): [2,3,4,5,8,5] → [2,3,4,5,5,8], 3ʳᵈ largest is 5.  
add(10): [2,3,4,5,5,8,10] → [2,3,4,5,5,8,10], 3ʳᵈ largest is 5.  
add(9): [2,3,4,5,5,8,10,9] → [2,3,4,5,5,8,9,10], 3ʳᵈ largest is 8.  
add(4): [2,3,4,5,5,8,9,10,4] → [2,3,4,4,5,5,8,9,10], 3ʳᵈ largest is 8.*

**Example 2:**  
Input: `KthLargest(1, [])`, `add(-3)`, `add(-2)`, `add(-4)`, `add(0)`, `add(4)`  
Output: `-3, -2, -2, 0, 4`  
*Explanation: Start with empty stream. add(-3): stream = [-3], 1ˢᵗ largest is -3. After each addition, the 1ˢᵗ largest (the only or max value) gets updated.*

**Example 3:**  
Input: `KthLargest(2, )`, `add(-1)`, `add(1)`, `add(-2)`, `add(-4)`, `add(3)`  
Output: `-1, 0, 0, 0, 1`  
*Explanation: Initial stream = .  
add(-1): [0, -1] → [-1, 0], 2ⁿᵈ largest = -1.  
add(1): [0, -1, 1] → [-1, 0, 1], 2ⁿᵈ largest = 0.  
add(-2): [-1, 0, 1, -2] → [-2, -1, 0, 1], 2ⁿᵈ largest = 0.*

### Thought Process (as if you’re the interviewee)  
The brute-force idea would be to store all elements and sort the list every time a new value is added, then fetch the kᵗʰ largest. But sorting each time is inefficient (O(n log n)).

A better approach: If I always keep the k largest elements, the smallest of those is the kᵗʰ largest value.  
- Use a **min-heap** of size k. Store the k largest elements seen so far.
- On each add(val): 
  - If the heap has fewer than k elements, add val.
  - If heap is full and val is larger than heap's min, pop the heap min and insert val.
- The top of the heap (min) is always the current kᵗʰ largest.

Trade-offs:  
- This solution uses O(k) memory and O(log k) time per addition, which is very efficient for a long stream[1][4].

### Corner cases to consider  
- Fewer than k elements: What to return? (Specification says to always return the kᵗʰ largest assuming enough elements; initial population should ensure that.)
- Duplicates: The structure should handle repeated elements correctly.
- Negative numbers, zeros.
- Large k vs. small k (e.g., k = 1, k = len(nums)).
- Stream starts empty or nums is empty.

### Solution

```python
import heapq

class KthLargest:
    def __init__(self, k, nums):
        # Initialize with k and a min-heap
        self.k = k
        self.min_heap = []
        # Push elements from nums into the heap
        for num in nums:
            self.add(num)

    def add(self, val):
        # Add new value to heap
        if len(self.min_heap) < self.k:
            heapq.heappush(self.min_heap, val)
        else:
            # Only add if the new value is larger than the smallest of k elements
            if val > self.min_heap[0]:
                heapq.heappushpop(self.min_heap, val)
            else:
                # Do nothing if val would not change kᵗʰ largest
                pass
        # The root of heap is the kᵗʰ largest
        return self.min_heap[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log k) per add operation. Initial construction takes O(n log k), where n = len(nums), since at most k elements are kept in the heap.
- **Space Complexity:** O(k), as only k elements are ever stored regardless of the total stream size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to support delete operations as well?
  *Hint: How would this impact the heap structure and time complexity?*

- How would you find the k largest elements, not just the kᵗʰ largest?
  *Hint: The heap already stores them, but in what order and how to output them sorted?*

- How would you optimize further if you have many more add operations than queries for kᵗʰ largest?
  *Hint: Is there a data structure that has better amortized update or query times for this scenario?*

### Summary
This problem is a classic example of the **Heap (Priority Queue) pattern**, where you maintain a fixed-size min-heap to track k largest elements in a dynamic stream.  
The approach is very efficient and broadly applicable, such as in finding top-k elements in logs, leaderboard systems, or real-time analytics.

### Tags
Tree(#tree), Design(#design), Binary Search Tree(#binary-search-tree), Heap (Priority Queue)(#heap-priority-queue), Binary Tree(#binary-tree), Data Stream(#data-stream)

### Similar Problems
- Kth Largest Element in an Array(kth-largest-element-in-an-array) (Medium)
- Finding MK Average(finding-mk-average) (Hard)
- Sequentially Ordinal Rank Tracker(sequentially-ordinal-rank-tracker) (Hard)