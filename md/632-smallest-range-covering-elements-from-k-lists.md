### Leetcode 632 (Hard): Smallest Range Covering Elements from K Lists [Practice](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists)

### Description  
Given several **k** sorted lists of integers, find the **smallest range** (inclusive) that contains at least **one number from each list**.  
We define range [a, b] to be **smaller than** range [c, d] if (b - a < d - c), or if the range lengths are equal and a < c.  
Your goal: return such a smallest range [a, b].

In simpler terms: among all possible intervals that collect at least one number from every list, find the one with the minimal length, and if several, choose the one with the smallest start.


### Examples  

**Example 1:**  
Input: `[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]`  
Output: `[20,24]`  
*Explanation: The range 20-24 contains 24 (from list 1), 20 (from list 2), and 22 (from list 3). It's the smallest such interval; interval [0,5] would also cover all lists but is longer.*

**Example 2:**  
Input: `[[1,2,3],[1,2,3],[1,2,3]]`  
Output: `[1,1]`  
*Explanation: All lists contain 1, so the smallest possible range is just [1,1].*

**Example 3:**  
Input: `[[1],[2],[3]]`  
Output: `[1,3]`  
*Explanation: Each list only has one element; minimum range must include all three, so [1,3].*


### Thought Process (as if you’re the interviewee)  

First, I’d try a brute-force approach:  
- For every combination where you pick one element from each list, find the min and max, and compute the range.  
- Track the minimal range as you try all options.  
- But with k lists of size up to 50 (k × 50 = up to 10,000 numbers), brute-force would be exponential—way too slow.

Optimizing:  
- Since each list is sorted, I can use a **min-heap** to efficiently track the current minimum across all active picks (one from each list).
- Initialize heap with the first element from each list.
- At every step, we know the current min (heap top) and max (tracked separately among chosen elements).
- Remove the smallest element; advance in the list that produced it by one element; push that into the heap.
- Continue until we’re unable to advance (some list is exhausted).
- On each step, compare range (current max - current min) and update answer if it’s better.

This is a common **“k-way merge”** approach—like merging k sorted lists but updating the best range as we traverse.  
Key trade-offs:  
- The algorithm is efficient because it only ever holds k elements in the heap at once, one from each list, and traverses each list at most end-to-end.
- The space and time are thus manageable even for large k.


### Corner cases to consider  
- Any list is empty (not allowed by problem).
- All lists contain the same elements.
- Lists of length 1.
- Lists with overlapping ranges, or all elements identical.
- Some lists much shorter than others.


### Solution

```python
from typing import List
import heapq

def smallestRange(nums: List[List[int]]) -> List[int]:
    # Heap will store tuples: (value, list_index, element_index)
    # Also track current maximum element across the heap
    heap = []
    current_max = float('-inf')
    
    # Initialize heap with first element from each list
    for list_idx, lst in enumerate(nums):
        val = lst[0]
        heapq.heappush(heap, (val, list_idx, 0))
        current_max = max(current_max, val)
    
    # Result range (min_start, min_end)
    min_range = float('inf')
    start, end = -1, -1

    while True:
        min_val, l_idx, e_idx = heapq.heappop(heap)
        
        # Update result if new range is smaller or equally small but starts earlier
        if current_max - min_val < min_range or (
            current_max - min_val == min_range and min_val < start):
            min_range = current_max - min_val
            start, end = min_val, current_max
        
        # Move to next element in this list
        if e_idx + 1 == len(nums[l_idx]):
            break  # One list exhausted
        next_val = nums[l_idx][e_idx + 1]
        heapq.heappush(heap, (next_val, l_idx, e_idx + 1))
        current_max = max(current_max, next_val)

    return [start, end]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log k), where n = total number of elements, k = number of lists. Each element is pushed and popped from the heap at most once, and heap operations take log k time.
- **Space Complexity:** O(k) for the heap (k elements in heap at a time), plus input storage.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case when some of the input lists are empty?  
  *Hint: What does it mean for the answer if any list has zero elements?*

- What changes would you make if the lists were not sorted?  
  *Hint: Could you pre-process the input to sort each list or use another data structure?*

- How would you output all the intervals of minimal length, not just the one with the smallest start?  
  *Hint: Track all intervals with the same length as the minimum found.*

### Summary
This problem uses the **k-way merge** (multi-way heap) pattern, a classic approach for interleaving sorted lists efficiently.  
Key insights include using a min-heap to always advance from the smallest current candidate, and tracking the maximum element seen in the window.  
This pattern is widely applicable: merging logs from multiple sources, finding overlapping intervals, or synchronizing streams.


### Flashcard
Use a min-heap to track current minimum among k lists; expand range by advancing the list with the current min, keeping track of smallest range covering all lists.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sliding Window(#sliding-window), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Minimum Window Substring(minimum-window-substring) (Hard)