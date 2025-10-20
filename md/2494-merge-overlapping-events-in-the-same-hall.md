### Leetcode 2494 (Hard): Merge Overlapping Events in the Same Hall [Practice](https://leetcode.com/problems/merge-overlapping-events-in-the-same-hall)

### Description  
Given a table of events, each with a hall_id, start_day, and end_day, merge all overlapping events held in the **same hall**. Two events overlap if they share even a single day (i.e., their date ranges intersect, including endpoints). The result should contain non-overlapping intervals for each hall, each represented as (hall_id, start_day, end_day). Events may be listed multiple times in the input. The order of the output rows does not matter.

### Examples  

**Example 1:**  
Input:  
`[[1, '2023-10-01', '2023-10-03'], [1, '2023-10-02', '2023-10-05'], [2, '2023-11-01', '2023-11-02']]`  
Output:  
`[[1, '2023-10-01', '2023-10-05'], [2, '2023-11-01', '2023-11-02']]`  
*Explanation: Events [1, 10-01, 10-03] and [1, 10-02, 10-05] overlap, so they merge into [1, 10-01, 10-05]. Event for hall 2 is separate.*

**Example 2:**  
Input:  
`[[1, '2023-01-01', '2023-01-10'], [1, '2023-01-11', '2023-01-20'], [1, '2023-01-15', '2023-01-25']]`  
Output:  
`[[1, '2023-01-01', '2023-01-10'], [1, '2023-01-11', '2023-01-25']]`  
*Explanation: First event does not overlap with the others. Second and third overlap on 1/15, so are merged to [1, 1-11, 1-25].*

**Example 3:**  
Input:  
`[[1, '2022-12-01', '2022-12-10'], [2, '2022-12-05', '2022-12-15'], [1, '2022-12-11', '2022-12-12'], [1, '2022-12-09', '2022-12-13']]`  
Output:  
`[[1, '2022-12-01', '2022-12-13'], [2, '2022-12-05', '2022-12-15']]`  
*Explanation: Hall 1 events [12-01, 12-10], [12-11, 12-12], [12-09, 12-13] -- all overlap to form [12-01, 12-13]. Hall 2 is standalone.*


### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  For each hall, compare every event to every other event to see if their date ranges overlap, and merge them as needed. However, this is O(n²) for each hall and not efficient.

- **Optimized:**  
  The classic "merge intervals" problem generalized to grouping by hall.  
  - Group all events by hall_id.
  - For each group's events, sort them by start_day.
  - Scan the sorted list, merging current interval with the last if overlapping (current start_day ≤ previous end_day + 1 day).
  - If not overlapping, start a new merged event.

  This approach leverages sorting and a single scan per hall, which is efficient for reasonably sized datasets.

- **Trade-offs:**  
  - More efficient than brute-force because sorting is O(k log k) per hall, followed by an O(k) scan, where k is the number of events in that hall.
  - Simple, clear, and leverages a standard "merge intervals" pattern.

### Corner cases to consider  
- Empty input: No events.
- One event for a hall (should be unchanged).
- Multiple halls, each with no overlaps.
- Events with the exact same start and end dates.
- Events fully contained within other events (should merge fully).
- Events at the edge (end_day of one == start_day of next: should merge, since they overlap on at least one day).
- Duplicate events in the input.

### Solution

```python
from collections import defaultdict

def merge_overlapping_events_in_same_hall(events):
    # events: list of [hall_id, start_day, end_day]
    # Output: list of [hall_id, start_day, end_day] with merged intervals for each hall

    # 1. Group events by hall_id
    halls = defaultdict(list)
    for hall_id, start, end in events:
        halls[hall_id].append((start, end))
    
    result = []

    for hall_id, intervals in halls.items():
        # 2. Sort intervals by start_day
        intervals.sort(key=lambda x: x[0])  # assumes start, end are comparable (e.g., 'YYYY-MM-DD')

        merged = []
        for interval in intervals:
            if not merged:
                merged.append(list(interval))
            else:
                last = merged[-1]
                # To check overlap: new start ≤ last end + 0 days (dates are inclusive)
                # If there is overlap, merge the intervals.
                if interval[0] <= last[1]:
                    # Update the end day to the maximum end day
                    last[1] = max(last[1], interval[1])
                else:
                    merged.append(list(interval))
        for start, end in merged:
            result.append([hall_id, start, end])

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n), where n = total number of events.  
  - Grouping per hall: O(n)
  - For each hall: sorting its events O(k log k), sum k = n
  - Merging scan per hall: O(k)
  - Dominant factor is sorting, total O(n log n).

- **Space Complexity:**  
  O(n) for intermediate storage: groupings, merged events, and final result.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large datasets that do not fit in memory?  
  *Hint: Can you process halls one at a time? Can you leverage external/streaming sorting?*

- Can the solution be adapted for events that cross midnight (intervals using times, not just dates)?  
  *Hint: Does your overlap logic still hold for datetime or time intervals?*

- What if events are in different time zones?  
  *Hint: Consider normalization of time zones before grouping and processing.*

### Summary
This problem is a textbook application of the "merge intervals" pattern, but with an extra grouping step by hall. The standard pattern: **Sort**, then **greedily merge** overlapping intervals, is common for calendars, scheduling, and range-compression problems. The approach is efficient, proven, and reusable whenever you have overlapping intervals within groups.


### Flashcard
Group events by hall, sort by start, merge overlapping intervals within each group.

### Tags
Database(#database)

### Similar Problems
