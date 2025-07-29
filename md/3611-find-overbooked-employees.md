### Leetcode 3611 (Medium): Find Overbooked Employees [Practice](https://leetcode.com/problems/find-overbooked-employees)

### Description  
Given a list of employees and their scheduled meeting intervals (start, end times), return the list of employee IDs who are **overbooked** — meaning they have at least two meetings that **overlap** in time.

### Examples  

**Example 1:**  
Input: `schedule = {1: [[9,11],[10,12]]}`  
Output: `[1]`  
*Explanation: Employee 1 has meetings [9,11] and [10,12] which overlap at hour 10-11.*

**Example 2:**  
Input: `schedule = {1: [[9,10]], 2: [[10,11],[11,12]]}`  
Output: `[]`  
*Explanation: No employee has overlapping meetings.*

**Example 3:**  
Input: `schedule = {1: [[9,12],[11,13]], 2: [[8,9],[9,10]]}`  
Output: `[1]`  
*Explanation: Only employee 1 is overbooked, with meetings [9,12] and [11,13] overlapping.*


### Thought Process (as if you’re the interviewee)  
- For each employee, sort their list of meetings by start time.
- Traverse their meetings and check if end time of current meeting > start of next meeting (overlap).
- If found, add to result and break early for that employee.
- Edge case: If only one meeting, cannot be overbooked.

### Corner cases to consider  
- Employee with no meetings
- Employee with only one meeting
- Meetings touch but do not overlap (e.g., end=10, start=10)
- Multiple employees, some with overlap, some not


### Solution

```python
# For each employee, check their meeting intervals for overlap

def find_overbooked_employees(schedule: dict) -> list:
    overbooked = []
    for emp_id, meetings in schedule.items():
        if len(meetings) < 2:
            continue
        # Sort intervals by start time
        meetings.sort()
        for i in range(1, len(meetings)):
            prev_end = meetings[i-1][1]
            current_start = meetings[i][0]
            if current_start < prev_end:
                overbooked.append(emp_id)
                break
    return overbooked
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(M × log M) per employee (for sorting), where M is the number of meetings, total O(NM log M) for N employees.
- **Space Complexity:** O(N), to store results; sorts in-place.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large datasets (thousands of employees, millions of meetings)?
  *Hint: Can you optimize sorting and traversal, parallelize, or process in DB?*

- What if a meeting can span multiple days or has date+time as key?
  *Hint: Parse and compare both date and time parts.*

- How do you report all pairs of overlapping meetings per overbooked employee (not just if there is any overlap)?
  *Hint: Store or return the overlapping pairs as well.*

### Summary
This problem demonstrates the **interval overlap** pattern — sort and linearly check for intersections. The logic is common in calendar, booking, and allocation tasks.