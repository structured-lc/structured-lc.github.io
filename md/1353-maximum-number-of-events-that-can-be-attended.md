### Leetcode 1353 (Medium): Maximum Number of Events That Can Be Attended [Practice](https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended)

### Description  
Given an array of events where each event is represented as `[startDay, endDay]`, determine the **maximum number of events you can attend**. You can attend only one event per day. Each event must be attended on any day from its `startDay` to `endDay`, and each event takes exactly one day.

### Examples  

**Example 1:**  
Input: `events = [[1,2],[2,3],[3,4]]`  
Output: `3`  
*Explanation: Attend event 1 on day 1, event 2 on day 2, event 3 on day 3.*

**Example 2:**  
Input: `events = [[1,2],[2,3],[3,4],[1,2]]`  
Output: `4`  
*Explanation: Attend event 1 on day 1, event 4 on day 2, event 2 on day 3, event 3 on day 4.*

**Example 3:**  
Input: `events = [[1,4],[4,4],[2,2],[3,4],[1,1]]`  
Output: `4`  
*Explanation: Attend events on their only available days, pick earliest ending each day.*


### Thought Process (as if you’re the interviewee)  
Brute-force: Try all permutations (not feasible). 

Optimal: Greedy – attend as many events as possible by always picking the event with the earliest end day that is available for the current day. Use a min-heap to efficiently choose the next event to attend each day.
- Sort events by start day.
- For each day, add all events starting that day to a min-heap (heap based on end day).
- Each day: 
    - Remove all events from heap that have already ended (end < current day)
    - If heap not empty, pop the event with earliest end day and count as attended.

### Corner cases to consider  
- Multiple events overlapping on the same day
- Events with same start and end day
- Large gaps between events
- Edge case: only one possible event to attend
- All events overlapping

### Solution

```python
import heapq

def maxEvents(events):
    events.sort()  # sort by start day
    min_heap = []
    n = len(events)
    i = 0  # index for events
    res = 0
    day = 1
    last_day = max(e[1] for e in events)

    while day <= last_day:
        while i < n and events[i][0] == day:
            heapq.heappush(min_heap, events[i][1])
            i += 1
        while min_heap and min_heap[0] < day:
            heapq.heappop(min_heap)  # skip expired events
        if min_heap:
            heapq.heappop(min_heap)
            res += 1
        day += 1
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) due to sorting and heap operations for all n events.
- **Space Complexity:** O(n) for the heap and event storage.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you handle very long intervals (e.g. [1, 1e9]) efficiently?
  *Hint: Only process days with new events or pending events, possibly using event pointers.*

- What if you can attend multiple events on the same day?
  *Hint: The answer would be total number of events, just count.*

- How does the solution change if you need to return the list of attended events?
  *Hint: Store event ids when popping from the heap.*

### Summary
This is a greedy scheduling problem using a min-heap, a classic pattern for "max non-overlapping intervals/events attends". Useful in resource allocation, interval scheduling, and event processing.
