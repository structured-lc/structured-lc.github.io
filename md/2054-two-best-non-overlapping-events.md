### Leetcode 2054 (Medium): Two Best Non-Overlapping Events [Practice](https://leetcode.com/problems/two-best-non-overlapping-events)

### Description  
Given a list of events, each as `[startᵢ, endᵢ, valueᵢ]`, you can attend **at most two** non-overlapping events. You can’t attend events that overlap (even by a single point: next must start at end + 1 or later). Each event has a `value`. Find the maximum total `value` you can get by attending one or two non-overlapping events (or just picking one if that’s the best).

---

### Examples  

**Example 1:**  
Input: `events = [[1,3,2],[4,5,2],[2,4,3]]`  
Output: `4`  
*Explanation: Take events 0 ([1,3,2]) and 1 ([4,5,2]) as they don't overlap. Sum their values: 2 + 2 = 4.*

**Example 2:**  
Input: `events = [[1,3,2],[2,4,3],[3,10,5]]`  
Output: `5`  
*Explanation: Best is to attend event 2 ([3,10,5]) alone. Any pair will overlap according to the rules.*

**Example 3:**  
Input: `events = [[1,1,1],[2,2,2],[3,3,3]]`  
Output: `6`  
*Explanation: Pick any two events, e.g. [1,1,1] and [2,2,2]. Their times don't overlap. Max sum = 1 + 2 = 3 or pick [2,2,2] and [3,3,3] or [1,1,1] and [3,3,3]. The max is 2 + 3 = 5, but with the right picks, maximum is 3 + 2 = 5. Correction: Actually, sum of best two is 5.*

---

### Thought Process (as if you’re the interviewee)  
- **Brute force:** Try all pairs of non-overlapping events. For every event pair, check if they overlap. This is O(n²) and will be too slow for large n.
- **Optimization:** Since the constraints are big, O(n log n) is needed. Sort events by end time. For each event, use binary search to find another event that ends before the current start. Track the highest-value event so far as you sweep.
- **Approach:**  
  - Sort events by start (or end).
  - For each event, consider picking:  
    - Only that event.
    - That event and the best earlier non-overlapping event.
  - Use an array of max values (prefix max) and binary search for previous non-overlapping.
- **Trade-off:** O(n log n) time for sort and search is acceptable. Space O(n) for storing max prefix values.

---

### Corner cases to consider  
- Empty `events`.
- All events overlap.
- Only one event.
- Multiple events with same start & end.
- Best answer might use only one event.
- Events with zero value.
- Events that touch but don’t overlap (end₁+1 == start₂).

---

### Solution

```python
from bisect import bisect_right

def maxTwoEvents(events):
    # Sort events by end time for binary search convenience
    events.sort(key=lambda x: x[0])  # sort by start

    # Build list of [start, end, val], with ends[] for binary search
    starts = [event[0] for event in events]
    ends = [event[1] for event in events]
    n = len(events)
    
    # Sort events by end time for easier prefix max storage
    events_by_end = sorted(events, key=lambda x: x[1])
    prefix_max = [0] * n  # prefix_max[i] = max value among events_by_end[:i+1]
    max_so_far = 0
    for i, e in enumerate(events_by_end):
        max_so_far = max(max_so_far, e[2])
        prefix_max[i] = max_so_far

    # For each event, find the last event that ends before its start
    result = 0
    for e in events:
        # Only current event
        result = max(result, e[2])
        # Binary search: in events_by_end, find max among events ending before e[0]
        idx = bisect_right([ev[1] for ev in events_by_end], e[0] - 1) - 1
        if idx >= 0:
            result = max(result, e[2] + prefix_max[idx])
    return result
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n).  
  - Sorting: O(n log n)
  - For each event: Binary search O(log n)
  - Total O(n log n)
- **Space Complexity:** O(n) for prefix arrays and auxiliary structures.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could attend `k` non-overlapping events?  
  *Hint: Think of DP similar to weighted interval scheduling with k states.*

- What if the events are in real time and not all given upfront?  
  *Hint: Use an interval tree or segment tree to maintain max values in streaming mode.*

- How would you output the actual events (indices) picked, not just the max value?  
  *Hint: Store backtracking pointers during DP/binary search step.*

---

### Summary
The problem uses a **Sorting + Prefix Max + Binary Search** pattern, a classic sweep for non-overlapping intervals. This is a common approach also seen in Weighted Interval Scheduling DP and non-overlapping interval selection problems. Mastery here helps solve advanced scheduling, calendar, and reservation-style interview problems.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Maximum Profit in Job Scheduling(maximum-profit-in-job-scheduling) (Hard)
- Maximum Number of Events That Can Be Attended II(maximum-number-of-events-that-can-be-attended-ii) (Hard)
- Maximize Win From Two Segments(maximize-win-from-two-segments) (Medium)
- Maximum Score of Non-overlapping Intervals(maximum-score-of-non-overlapping-intervals) (Hard)