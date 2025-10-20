### Leetcode 2394 (Medium): Employees With Deductions [Practice](https://leetcode.com/problems/employees-with-deductions)

### Description  
You are given two database tables: **Employees** and **Logs**. Each employee has a required number of hours they must work in October 2022 to receive their salary (column: `needed_hours`). Each work session is recorded in **Logs** with an `in_time` and `out_time`. Sessions may cross midnight. For each employee, compute their total worked time by:
- For each session, compute the time difference in minutes, round it up to the nearest minute.
- Total these minutes over all sessions and divide by 60 to get hours.
Find and return the **employee_id** for those who worked *less* than their needed hours.

### Examples  

**Example 1:**  
Input:  
Employees = `[(1, 20), (2, 12), (3, 2)]`  
Logs = `[(1, '2022-10-01 09:00:00', '2022-10-01 17:00:00'), (1, '2022-10-06 09:05:04', '2022-10-06 17:09:03'), (1, '2022-10-12 23:00:00', '2022-10-13 03:00:01'), (2, '2022-10-29 12:00:00', '2022-10-29 23:58:58')]`  
Output: `[2, 3]`
*Explanation:*
- Employee 1: Worked three sessions (>20 hours), meets requirement.
- Employee 2: One session, total minutes = (12h×60 + ~59m) rounded up = 719min ≈ 12h, so meets 12h.
- Employee 3: No logs, so 0 hours (<2h), does NOT meet requirement.

**Example 2:**  
Input:  
Employees = `[(7, 10)]`  
Logs = `[]`  
Output: ``
*Explanation:*  
Employee 7 has no logs. They worked 0 hours, which is less than 10 needed. They are reported.

**Example 3:**  
Input:  
Employees = `[(4, 1)]`  
Logs = `[(4, '2022-10-02 20:00:00', '2022-10-02 21:01:10')]`  
Output: `[]`
*Explanation:*  
The session from 20:00 to 21:01:10 is 61 minutes, rounded up to 62 minutes (since partial minutes should be rounded up for each session), then divided by 60 = 1.03 hours. 1.03 ≥ 1, so employee 4 meets the needed hours.

### Thought Process (as if you’re the interviewee)  
- The brute force approach is:
  - For every employee, sum up all their logged sessions.
  - For each session, calculate duration **in seconds**, divide by 60, and round up to whole minutes.
  - Sum all these minutes, then divide by 60 to get hours worked. Compare to needed_hours.
- Edge: Some employees might have zero logs (should sum to 0).
- To optimize:
  - Use SQL aggregate functions with proper joins.
  - Make sure sessions are grouped by employee.
  - Use CEIL on (seconds / 60) for rounding each session up to the next minute.

Why this approach:
- By grouping logs by employee and applying rounding to each session, calculations are accurate per requirements.
- Using LEFT JOIN ensures employees with no logs are included (their sum defaults to 0).
- The main trade-off is query complexity, but it's efficient given SQL's aggregate power.


### Corner cases to consider  
- Employees with **no logs** at all.
- Sessions **crossing midnight** (make sure time difference accounts for date change).
- **Partial minutes** handled correctly (0 seconds = 0, but e.g. 61s should round up to 2 minutes).
- Employees whose **needed_hours = 0**.
- Multiple small sessions adding up but still below threshold.

### Solution

```python
# This is a SQL problem, but let's conceptually express the logic in Python for clarity and interviewer understanding.

from math import ceil
from collections import defaultdict
from datetime import datetime

def employees_with_deductions(employees, logs):
    # employees: List of tuples (employee_id, needed_hours)
    # logs: List of tuples (employee_id, in_time_str, out_time_str)
    
    # First, sum up worked minutes (rounded up per session) for each employee
    worked_minutes = defaultdict(int)
    for emp_id, in_time_str, out_time_str in logs:
        in_time = datetime.strptime(in_time_str, '%Y-%m-%d %H:%M:%S')
        out_time = datetime.strptime(out_time_str, '%Y-%m-%d %H:%M:%S')
        total_seconds = (out_time - in_time).total_seconds()
        # Round up to next full minute
        minutes = ceil(total_seconds / 60)
        worked_minutes[emp_id] += minutes

    # Prepare result list
    deducted = []
    for emp_id, needed_hours in employees:
        total_worked_hours = worked_minutes.get(emp_id, 0) / 60
        if total_worked_hours < needed_hours:
            deducted.append(emp_id)
    # Usually sorted order expected in SQL result
    return sorted(deducted)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M),  
  where N = number of logs (for processing), M = number of employees (for result assembly).
- **Space Complexity:** O(U),  
  where U = unique employees with logs (for tracking minutes per employee).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **changes in time zone** or logs with inconsistent time zones?  
  *Hint: Must always store and process times in a consistent timezone.*

- What if some logs are **invalid** (e.g., out_time < in_time)?  
  *Hint: Need to validate input data for integrity.*

- Can this be done in **one SQL query** without subqueries or CTEs?  
  *Hint: Consider using aggregation with LEFT JOIN and IFNULL/COALESCE for employees with no logs.*

### Summary
The key insight is to aggregate session durations *per employee*, round up each session to nearest minute, sum, and compare to needed hours.  
This is a classic *aggregation and join* pattern used in SQL and similar problems (attendance, quota fulfillment, etc.), and can be adapted for other HR, attendance, or quota-based queries in databases.


### Flashcard
Group logs by employee_id, sum CEIL(duration_in_seconds / 60) for each session, divide total by 60, and compare to needed_hours using SQL aggregation.

### Tags
Database(#database)

### Similar Problems
