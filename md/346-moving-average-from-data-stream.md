### Leetcode 346 (Easy): Moving Average from Data Stream [Practice](https://leetcode.com/problems/moving-average-from-data-stream)

### Description  
Given a stream of integers and a fixed window size, design a class that maintains the **moving average** of the last `size` elements. Every time a new value arrives (via the `next(val)` method), the moving average of the *window*—that is, the most recent up-to-`size` values—is returned. When fewer than `size` elements have arrived, calculate the average of all the elements so far.

### Examples  

**Example 1:**  
Input: `MovingAverage(3), next(1), next(10), next(3), next(5)`  
Output: `1.0, 5.5, 4.67, 6.0`  
*Explanation:*
- `next(1)` → window: [1], avg: 1 / 1 = 1.0  
- `next(10)` → [1,10], avg: (1+10)/2 = 5.5  
- `next(3)` → [1,10,3], avg: (1+10+3)/3 ≈ 4.67  
- `next(5)` → [10,3,5], avg: (10+3+5)/3 = 6.0 (oldest value dropped, only last 3 count)[3].

**Example 2:**  
Input: `MovingAverage(2), next(5), next(15), next(10)`  
Output: `5.0, 10.0, 12.5`  
*Explanation:*
- `next(5)` → [5], avg: 5 / 1 = 5.0  
- `next(15)` → [5,15], avg: (5+15)/2 = 10.0  
- `next(10)` → [15,10], avg: (15+10)/2 = 12.5 (5 dropped)[3].

**Example 3:**  
Input: `MovingAverage(1), next(12), next(-2)`  
Output: `12.0, -2.0`  
*Explanation:*
- Each window can have only 1 value, so moving average always equals last value.

### Thought Process (as if you’re the interviewee)  
Initially, a brute-force approach could be to store all previous values in a list and, on every call to `next(val)`, sum up the last `size` elements and divide by how many values present. However, summing up slices every call is inefficient (O(k) per call).

Instead, I can use a queue or a fixed-size list ("sliding window"). As new values come:
- Add value to queue.
- If queue size exceeds `size`, pop oldest value.
- Keep a running sum—add new value, subtract dropped value if any.
- Return running sum divided by number of values (either `size`, if window is full, or fewer if not yet filled).

This reduces time per `next()` to O(1). Trade-off: needs storage for up to `size` elements.

### Corner cases to consider  
- Window size is 1 (single value always the average).
- Window size > number of available elements (use current count as denominator).
- Negative or zero values in stream.
- Repeated or duplicate values.
- Large input stream—efficient memory/CPU is important.

### Solution

```python
from collections import deque

class MovingAverage:
    def __init__(self, size: int):
        # Initialize queue to store window of last 'size' elements
        self.q = deque()
        # Store max window size
        self.size = size
        # Running sum for efficient average computation
        self.running_sum = 0

    def next(self, val: int) -> float:
        # Append new value
        self.q.append(val)
        self.running_sum += val

        # If window exceeds desired size, pop the oldest
        if len(self.q) > self.size:
            removed = self.q.popleft()
            self.running_sum -= removed

        # Compute the moving average
        return self.running_sum / len(self.q)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per `next(val)` call.  
  - Both append and pop from deque run in O(1).
  - Running sum updated in O(1).

- **Space Complexity:** O(k), where k = window size.  
  - The queue holds at most k elements for the window.
  - Auxiliary variables use only constant space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you change the class if the input data stream was infinite and you were asked for the minimum/maximum value in the moving window as well?
  *Hint: Think about using a monotonic queue or additional data structures for tracking min/max efficiently.*

- What if you were asked to return the moving median instead of the moving average?
  *Hint: Using two heaps to maintain lower and upper halves might help.*

- How would you adapt the implementation if the data stream arrived asynchronously from multiple threads?
  *Hint: Consider thread-safety and possible use of locks.*

### Summary
This is a classic *sliding window* problem employing a fixed-size queue and a running sum, a common approach for real-time analytics over streaming data. Patterns here generalize to moving sums, windowed statistics, signal processing, and online algorithms where you only care about the latest k values and need O(1) efficiency per update.


### Flashcard
Use a queue to store the last k values and a running sum; add new value, remove oldest if needed, and return sum ÷ window size.

### Tags
Array(#array), Design(#design), Queue(#queue), Data Stream(#data-stream)

### Similar Problems
- K Radius Subarray Averages(k-radius-subarray-averages) (Medium)