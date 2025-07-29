### Leetcode 759 (Hard): Employee Free Time [Practice](https://leetcode.com/problems/employee-free-time)

### Description  
Given a list of employees’ work schedules where each employee’s schedule is a list of sorted, non-overlapping intervals `[start, end]`, find all finite intervals when every employee is free.  
This means you are to return the common free intervals shared by all employees, as a list of sorted, positive-length intervals.  
Imagine aggregating all employee working times and looking for the gaps between them—those gaps are the free times you're being asked to find.

### Examples  

**Example 1:**  
Input: `schedule = [[[1,3],[6,7]], [[2,4]], [[2,5],[9,12]]]`  
Output: `[[5,6],[7,9]]`  
Explanation:  
- All intervals: [1,3], [2,4], [2,5], [6,7], [9,12]
- Merged: [1,5], [6,7], [9,12]
- Free times are gaps: [5,6] (all finish at 5, next starts at 6), [7,9] (next starts at 9)

**Example 2:**  
Input: `schedule = [[[1,2],[5,6]], [[1,3]], [[4,10]]]`  
Output: `[[3,4]]`  
Explanation:  
- All intervals: [1,2], [1,3], [4,10], [5,6]
- Merged: [1,3], [4,10] (since [5,6] is within [4,10])
- Free time: [3,4] (gap between merged intervals)

**Example 3:**  
Input: `schedule = [[[1,3]], [[4,6]], [[7,9]]]`  
Output: `[[3,4],[6,7]]`  
Explanation:  
- All intervals: [1,3], [4,6], [7,9]
- Merged: [1,3], [4,6], [7,9]
- Free time: [3,4] and [6,7]

### Thought Process (as if you’re the interviewee)  
- **Naive/Brute-force:**  
  For every minute of the time axis, check if all employees are not working—too slow and not feasible.

- **Towards optimization:**  
  Since all intervals for each employee are already sorted and non-overlapping:
  - Flatten all employees’ intervals into one list.
  - Sort this list by start times.
  - Merge overlapping or adjacent intervals so that we know whenever at least one person is working.
  - The **gaps between merged intervals** are our answer: time ranges where absolutely no one is working.

- **Why this works:**  
  We treat employee schedules like meeting-rooms—finding the times when there are no meetings scheduled at all.

- **Why merging?**  
  Without merging, overlapping or adjacent intervals from different employees would miss some busy periods. Only the merges reveal true global “free” times.

### Corner cases to consider  
- No employees: The output is empty by definition.
- All intervals cover the whole time range: No free time output.
- Only one employee: Gaps between their intervals are “free” but only for that employee, not shared.
- Employees with the same schedule: Gaps between their intervals.
- Some employees’ intervals abut but do not overlap.
- No intervals overlap at all.
- Output intervals must be of positive length (no zero-length gaps).

### Solution

```python
# Definition for an Interval.
class Interval:
    def __init__(self, start, end):
        self.start = start
        self.end = end

def employeeFreeTime(schedule):
    # Flatten all intervals from all employees
    all_intervals = []
    for employee in schedule:
        for interval in employee:
            all_intervals.append(interval)
    
    # Sort all intervals by start time
    all_intervals.sort(key=lambda x: x.start)
    
    # Merge overlapping intervals
    merged = []
    for interval in all_intervals:
        if not merged or merged[-1].end < interval.start:
            merged.append(Interval(interval.start, interval.end))
        else:
            merged[-1].end = max(merged[-1].end, interval.end)
    
    # Find free times: the gaps between merged intervals
    free_times = []
    for i in range(1, len(merged)):
        if merged[i-1].end < merged[i].start:
            free_times.append(Interval(merged[i-1].end, merged[i].start))
    return free_times
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N log N), where N is the total number of intervals across all employees.  
  - Sorting takes O(N log N).
  - Merging takes O(N).
  - Finding gaps also O(N).

- **Space Complexity:**  
  O(N) for storing the flattened list and the merged list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the intervals are not sorted for each employee?  
  *Hint: You would need to sort individual schedules or the flattened list first.*

- What if you have to handle a very large number of intervals that don’t fit in memory?  
  *Hint: Think of interval streams and external sorting/merge algorithms.*

- What if you want to return the earliest k free slots of at least a certain length?  
  *Hint: After finding all free intervals, filter by required length and take the first k.*

### Summary
This is a classic **merge intervals** pattern problem.  
You flatten and sort all intervals, merge them, then look for gaps—applying the same approach as for meeting rooms or calendar union/intersection.  
This pattern reappears in range intersection, free/busy time calculations, and event timeline simulation problems.