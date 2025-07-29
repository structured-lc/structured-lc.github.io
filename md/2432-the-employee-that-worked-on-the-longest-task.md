### Leetcode 2432 (Easy): The Employee That Worked on the Longest Task [Practice](https://leetcode.com/problems/the-employee-that-worked-on-the-longest-task)

### Description  
You are given a log of tasks completed by various employees at a company. The log is a sorted list of records—each record is `[employee_id, leave_time]`—meaning that the employee with `employee_id` finished a task at time `leave_time`. Each task starts right after the previous one ended (the first task starts at time 0). Your job is to find the id of the employee who worked the single longest task. If multiple tasks tie for longest, return the smallest employee id among them.

### Examples  

**Example 1:**  
Input: `n = 2, logs = [[0,3],[1,5],[0,9],[1,15]]`  
Output: `1`  
*Explanation:*
- Task 0: employee 0, from 0 to 3, duration 3
- Task 1: employee 1, from 3 to 5, duration 2
- Task 2: employee 0, from 5 to 9, duration 4
- Task 3: employee 1, from 9 to 15, duration 6  
Longest duration = 6 (by employee 1); so output is 1.

**Example 2:**  
Input: `n = 26, logs = [[1,1],[3,7],[2,12],[7,17]]`  
Output: `3`  
*Explanation:*
- Task 0: employee 1, from 0 to 1, duration 1
- Task 1: employee 3, from 1 to 7, duration 6
- Task 2: employee 2, from 7 to 12, duration 5
- Task 3: employee 7, from 12 to 17, duration 5  
Longest duration = 6 (by employee 3); so output is 3.

**Example 3:**  
Input: `n = 2, logs = [[0,10],[1,20]]`  
Output: `0`  
*Explanation:*
- Task 0: employee 0, from 0 to 10, duration 10
- Task 1: employee 1, from 10 to 20, duration 10  
Tie for longest is 10 (employees 0 and 1), so output is 0 (the smaller id).

### Thought Process (as if you’re the interviewee)  
Let's process the logs sequentially:
- Track the start of each task (`prev_end`), and for each log, compute `leave_time - prev_end` for its duration.
- Keep track of the max duration and the corresponding employee id.
- For ties (same max), choose employee with the smaller id.
A brute-force solution isn't necessary here as only tracking current max/employee and iterating once suffices (O(n)).
No need for extra data structures since we're only tracking a couple of values while iterating.

### Corner cases to consider  
- Only one log (minimum tasks possible)
- Multiple employees with tasks of the same (longest) duration
- Employees' ids are not sorted in `logs`
- Logs of length 1 (smallest constraints)
- Large values of leave times

### Solution

```python
def hardestWorker(n, logs):
    # Track the previous end time (starts at 0)
    prev_end = 0
    # Initialize max duration and best employee id
    max_duration = 0
    best_id = None

    for emp_id, end_time in logs:
        # Compute the time spent on this task
        duration = end_time - prev_end
        # If this is a longer task, update max and best id
        if duration > max_duration or (duration == max_duration and (best_id is None or emp_id < best_id)):
            max_duration = duration
            best_id = emp_id
        # Move the starting point to the end of this task
        prev_end = end_time

    return best_id
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m), where m = length of logs; we scan the list once.
- **Space Complexity:** O(1); only variables for tracking max, id and prev_end. No extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if task logs are not sorted by leave time?  
  *Hint: Would need to sort logs first by leave time before processing.*

- How would you handle if employees can work on consecutive tasks?  
  *Hint: You may need to change constraints or logic for detecting consecutive tasks.*

- Could you do this if logs contain both start and end times, not just end?  
  *Hint: In that case, simply subtract start from end for each row.*

### Summary
This problem uses a **single-pass scan** with simple max tracking, a classic coding pattern for finding min/max over a sequence. The key nuances are:
- Correctly computing each task's duration based on consecutive logs.
- Proper tie-breaking using employee ids.
This pattern applies to cases where max/min value and their position/owner are needed in a sequential data stream.