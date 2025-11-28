### Leetcode 3156 (Hard): Employee Task Duration and Concurrent Tasks [Practice](https://leetcode.com/problems/employee-task-duration-and-concurrent-tasks)

### Description  
Given a list of tasks for multiple employees, where each task has an `employee_id`, `start_time`, and `end_time`, compute for each employee:
- The **total duration** of all their tasks, counting any overlapping periods only once.
- The **maximum number of concurrent tasks** that employee was handling at any point in time.

In other words, for each employee, merge overlapping task intervals to obtain the true total time worked, and determine the peak load (maximum number of overlapping tasks at any instant).

### Examples  

**Example 1:**  
Input:  
Tasks = [
  [1001, "08:00", "09:00"],
  [1001, "08:30", "10:30"],
  [1001, "11:00", "12:00"],
  [1001, "13:00", "15:30"],
  [1002, "09:00", "10:00"],
  [1002, "09:30", "11:30"],
  [1003, "10:00", "12:00"]
]  
Output:  
[
  [1001, 360, 2],  
  [1002, 150, 2],  
  [1003, 120, 1]  
]  
*Explanation:*  
- Employee 1001:  
  Intervals: [08:00,09:00], [08:30,10:30], [11:00,12:00], [13:00,15:30]  
  - 08:00-09:00 and 08:30-10:30 overlap by 30 min — combine to [08:00,10:30] (150 min)  
  - Total: [08:00,10:30] (150 min), [11:00,12:00] (60 min), [13:00,15:30] (150 min) ⇒ 150+60+150=360  
  - Maximum concurrent: 2 tasks overlap from 08:30 to 09:00  
- Employee 1002:  
  [09:00,10:00] and [09:30,11:30] overlap by 30 min ⇒ merged [09:00,11:30] (150 min)  
  Max concurrent: 2 (overlap 09:30-10:00)  
- Employee 1003: No overlap, just 120 min, max concurrent 1.

**Example 2:**  
Input:  
Tasks = [
  [101, "09:00", "10:00"],
  [101, "09:15", "10:15"],
  [101, "10:10", "11:00"]
]  
Output:  
[
  [101, 120, 2]
]  
*Explanation:*  
Merged intervals: [09:00,10:15] and [10:10,11:00] ⇒ overall 09:00–11:00 (120 min, accounting for 10:00–10:10 only once).  
Max concurrent: 2 from 09:15–10:00.

**Example 3:**  
Input:  
Tasks = [
  [2001, "08:00", "08:30"],
  [2001, "08:35", "08:40"]
]  
Output:  
[
  [2001, 35, 1]
]  
*Explanation:*  
No overlap. Total = (30+5)=35. Max concurrent = 1.

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  For each employee, look at all pairs of tasks to merge overlaps and count concurrent intervals.  
  This is slow: merging all pairs is O(n²).

- **Optimized plan:**  
  For each employee:
  - Collect all their intervals (start, end).
  - Sort intervals, merge overlaps to compute the union duration.
  - For max concurrent:  
    - Convert interval endpoints to events: (time, +1 for start, -1 for end).
    - Sort events. Sweep line: track live count, update max.
  - Output [employee_id, duration, max_concurrent].

- **Trade-offs:**  
  Sorting enables merging and event sweeping efficiently (O(n log n)).  
  This approach is scalable for large numbers of tasks per employee.

### Corner cases to consider  
- No tasks for an employee (should output zero).
- Tasks with exact same times (full overlap).
- Tasks that touch at endpoints (no overlap).
- Completely nested intervals.
- Input times not in order.
- Large input range.
- Multiple employees with only one interval.

### Solution

```python
# timestring in format "HH:MM"
def to_minutes(timestring):
    hours, minutes = map(int, timestring.split(":"))
    return hours * 60 + minutes

def employee_task_summary(tasks):
    from collections import defaultdict

    # Group tasks per employee
    emp_tasks = defaultdict(list)
    for emp_id, start, end in tasks:
        start_min = to_minutes(start)
        end_min = to_minutes(end)
        emp_tasks[emp_id].append((start_min, end_min))

    answer = []

    for emp_id in sorted(emp_tasks.keys()):
        intervals = emp_tasks[emp_id]

        # 1. Merge intervals to get total duration
        intervals.sort()  # sort by start time
        merged = []
        for s,e in intervals:
            if not merged or s > merged[-1][1]:
                merged.append([s,e])
            else:
                merged[-1][1] = max(merged[-1][1], e)
        total_duration = sum(e-s for s,e in merged)

        # 2. Sweep line for max concurrent tasks
        events = []
        for s,e in intervals:
            events.append( (s, 1) )   # +1 for start
            events.append( (e, -1) )  # -1 for end
        events.sort()

        cur = 0
        max_concurrent = 0
        for _, delta in events:
            cur += delta
            if cur > max_concurrent:
                max_concurrent = cur

        answer.append( [emp_id, total_duration, max_concurrent] )
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Grouping = O(n)  
  - For each employee, sorting tasks and events = O(m log m), where m is tasks per employee  
  - Merging intervals, sweeping events = O(m)  
  - Overall: O(n log mₘₐₓ), where mₘₐₓ is max number of tasks for any employee.

- **Space Complexity:**  
  - O(n) for storing grouped employee tasks, intervals, and events.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle time zones or date boundaries in start/end times?  
  *Hint: Store times in UTC or convert all times to a common basis.*

- Can this be solved with a SQL query?  
  *Hint: Use window functions and lead/lag or event simulation with SQL groupings.*

- If tasks were being updated/added in real time, how would you maintain these summaries efficiently?  
  *Hint: Consider interval trees or maintaining an event count heap for real-time concurrent calculation.*

### Summary
This problem combines **merging intervals** (to find union duration) and the **line sweep/event counting technique** (to compute max concurrent intervals). These are classic patterns for interval-related problems, useful in scheduling, calendar overlaps, and resource utilization. The efficient use of sorting and event-based counters makes the solution scalable.


### Flashcard
For each employee, sort intervals and merge overlaps to get union duration; use sweep-line (events at start/end times) to find max concurrent tasks.

### Tags
Database(#database)

### Similar Problems
