### Leetcode 3268 (Hard): Find Overlapping Shifts II [Practice](https://leetcode.com/problems/find-overlapping-shifts-ii)

### Description  
Given a table of employee shifts, where each record has `employee_id`, `start_time`, and `end_time`, find for each employee:
- The **maximum number of overlapping shifts** at any point in time (for that employee), and
- The total accumulated **overlapping duration** (in minutes) across all pairs of overlapping shifts for that employee.

This means for each employee:
- Count how many of their shifts can overlap at once (max concurrent count).
- Find the sum over all pairwise intervals where two or more of their shifts overlap.

### Examples  

**Example 1:**  
Input:  
Assume shifts for employee 1:  
`[{"start_time": 12:00, "end_time": 15:00}, {"start_time": 14:00, "end_time": 17:00}, {"start_time": 16:00, "end_time": 18:00}]`  
Output:  
Employee 1: max_overlapping_shifts=3, total_overlap_duration=120  
*Explanation:  
- From 14:00 to 15:00 — two shifts overlap (12-15 & 14-17)  
- From 16:00 to 17:00 — all three shifts overlap  
- Overlapping durations: 14:00-15:00 (60 min), 16:00-17:00 (60 min)  
- Total=120 min, max overlapped at once=3 (from 16:00–17:00)*

**Example 2:**  
Input:  
Employee 2:  
`[{"start_time": 09:00, "end_time": 10:00}, {"start_time": 10:00, "end_time": 11:00}]`  
Output:  
Employee 2: max_overlapping_shifts=1, total_overlap_duration=0  
*Explanation:  
No overlap, so max=1, total=0*

**Example 3:**  
Input:  
Employee 3:  
`[{"start_time": 13:00, "end_time": 16:00}, {"start_time": 13:30, "end_time": 15:00}, {"start_time": 15:30, "end_time": 16:30}]`  
Output:  
Employee 3: max_overlapping_shifts=2, total_overlap_duration=90  
*Explanation:  
- Overlap from 13:30–15:00: (13:00–16:00 & 13:30–15:00) = 90 min  
- Overlap from 15:30–16:00: (13:00–16:00 & 15:30–16:30) = 30 min  
- So, total_overlap_duration=90+30=120 min, but each overlap only once, so sum up the respective durations for each pair.  
- Max overlap is 2 (no time with 3)*

### Thought Process (as if you’re the interviewee)  
- First, for each employee, collect all their shifts as intervals.
- **Brute-force:** For every pair of their shifts, check if they overlap and sum all overlapping durations, and also track how many overlaps occur at each timestamp. This is O(n²) per employee—too slow for many records.
- **Optimal:** Use a sweep line algorithm:
    - For each shift, create two events: (start, +1), (end, -1).
    - Sort all events by time. Sweep through events, keeping a running count of concurrent shifts.
    - At each step, track:
        - The maximum seen so far.
        - If running count ≥2, add interval until next event to the total_overlap_duration.
    - This approach is much faster: O(n log n) per employee.
- Trade-offs: Sweep line is optimal in real interviews for any overlapping interval-count or max concurrency.

### Corner cases to consider  
- No shifts for an employee.
- Only one shift (=> max=1, overlap=0).
- Shifts with exact matching start/end times (should not double-count; only overlap if intervals actually overlap).
- Back-to-back shifts (e.g., ends at 10:00, another starts at 10:00→ not overlapping).
- Shifts entirely encompassed by another.
- Multiple shifts start or end at the same timestamp.

### Solution

```python
from collections import defaultdict

def find_overlapping_shifts(shifts):
    """
    shifts: List of dicts, each with keys: employee_id, start_time, end_time
    Assumes start_time and end_time are integers (e.g. minutes since day start)
    Returns: Dict: employee_id -> (max_overlapping_shifts, total_overlap_duration)
    """
    result = {}
    # 1. Group shifts by employee
    employee_shifts = defaultdict(list)
    for shift in shifts:
        employee_shifts[shift['employee_id']].append(
            (shift['start_time'], shift['end_time'])
        )

    # 2. For each employee, process their shifts
    for emp_id, intervals in employee_shifts.items():
        # Build event points: (time, +1 for start, -1 for end)
        events = []
        for start, end in intervals:
            events.append((start, 1))
            events.append((end, -1))
        # Sort by time, with start events before end events at same time
        events.sort()
        max_concurrent = 0
        current = 0
        total_overlap = 0
        prev_time = None
        for time, delta in events:
            if prev_time is not None and current >= 2:
                # Duration is (time - prev_time)
                total_overlap += (time - prev_time)
            current += delta
            max_concurrent = max(max_concurrent, current)
            prev_time = time
        result[emp_id] = (max_concurrent, total_overlap)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(E × N log N) where E = number of employees, N = max number of shifts per employee.  
  Explanation: For each employee, we sort the 2N events (N shifts), then make a single pass through them.

- **Space Complexity:**  
  O(E × N) for grouping the shifts, O(N) for events per employee during processing.

### Potential follow-up questions (as if you’re the interviewer)  

- What if shifts can be extremely long (spanning multiple days)?  
  *Hint: Test for very large intervals; consider integer overflow or memory usage for storing times.*

- How would you handle if employees can have thousands of shifts?  
  *Hint: Is your solution scalable, or do you need to batch or process in streaming fashion?*

- What if some records have invalid (end_time ≤ start_time) data?  
  *Hint: Where in your code would you filter or correct such data?*

### Summary
This problem uses the **sweep line (scanline) algorithm**, which is a common pattern for processing event intervals efficiently.  
It's especially applicable for: calculating max overlapping events, merging intervals, and calendar/meeting availability.  
Patterns like this are frequently seen in interval scheduling, meeting rooms, and time-window aggregation problems.


### Flashcard
Use a sweep-line algorithm—create events (start, +1) and (end, -1) for each shift, sort by time, and track concurrent shifts to compute overlap durations.

### Tags
Database(#database)

### Similar Problems
