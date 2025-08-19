### Leetcode 2933 (Medium): High-Access Employees [Practice](https://leetcode.com/problems/high-access-employees)

### Description  
You’re given a list of employee access records for a single day, where each record contains an employee’s name and a 4-digit 24-hour access time (e.g. "0800" for 8:00 AM). An employee is considered **high-access** if they have accessed the system **three or more times within any one-hour (60-minute) period** (not crossing the start/end of the day, and exactly 60-minute differences don’t count). Return the names of all such employees, in any order.

### Examples  

**Example 1:**  
Input: `access_times = [["Alice","0815"],["Alice","0820"],["Alice","0825"],["Bob","1300"],["Bob","1310"],["Bob","1350"],["Bob","1401"],["Carol","0910"],["Carol","1005"]]`  
Output: `["Alice","Bob"]`  
*Explanation: Alice’s times 0815, 0820, 0825 are all within 10 minutes.  
Bob’s times 1300, 1310, 1350—the difference between 1300 and 1350 is 50 minutes.  
Carol never has 3 times within an hour.*

**Example 2:**  
Input: `access_times = [["Dave","0005"],["Dave","0025"],["Dave","0045"],["Dave","0106"]]`  
Output: `["Dave"]`  
*Explanation: 0005, 0025, 0045 are within 40 minutes*.

**Example 3:**  
Input: `access_times = [["Eve","1200"],["Eve","1300"],["Eve","1400"]]`  
Output: `[]`  
*Explanation: All accesses are at one-hour intervals (exactly 60 minutes apart), which do not count as within the same one-hour window.*

### Thought Process (as if you’re the interviewee)  
- First, organize the access times **by employee name** using a dictionary.
- Convert all times from string “HHMM” format to minutes since midnight for easy numerical comparison.
- For each employee, **sort** their times.
- Use a **sliding window**: scan through their sorted times and for every group of three consecutive accesses, check if the difference between the earliest and latest is less than 60 minutes.
- If any such window exists, record the employee as high-access.
- This approach ensures that we check all possible sequences of three, efficiently, without redundant checks.

### Corner cases to consider  
- Only one or two accesses for an employee — never high-access.
- Access times not sorted: must sort before processing.
- Accesses with exactly 60 minutes between first and last (not high-access).
- Accesses that occur at day boundaries (e.g. 2350 and 0005 are not within the same period).
- Multiple employees with overlapping or duplicate times.
- Same access time repeated: counts as multiple accesses.

### Solution

```python
def high_access_employees(access_times):
    # Organize all access times by employee name
    employee_times = {}
    for name, time_str in access_times:
        hours = int(time_str[:2])
        minutes = int(time_str[2:])
        total_minutes = hours * 60 + minutes
        if name not in employee_times:
            employee_times[name] = []
        employee_times[name].append(total_minutes)

    # Prepare result list
    result = []

    # For each employee, check for 3 within any 60-minute window
    for name, times in employee_times.items():
        times.sort()
        for i in range(2, len(times)):
            # window is from times[i-2] to times[i]
            if times[i] - times[i - 2] < 60:
                result.append(name)
                break  # Only need to add once per employee

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of access records. This is dominated by sorting the times for each employee. If k is the maximum number of times per employee, their times are sorted in O(k log k), and the total sum of k is n.
- **Space Complexity:** O(n), to store each access time per employee in a dictionary (plus output and temporary variables).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you needed to return the exact time window(s) for each high-access employee?  
  *Hint: Instead of stopping at the first window found, collect all valid windows as you slide. Keep their start and end times.*
  
- What if access_times is so large it doesn't fit into memory?  
  *Hint: Consider streaming/processing data in chunks, or maintaining partial results for each employee. External memory or streaming algorithms may be needed.*

- What if we wanted to generalize to “k or more accesses in t minutes”?  
  *Hint: Parameterize the window size and the count threshold. The sliding window approach still works.*

### Summary
This problem is a classic example of the **grouping** + **sorting** + **sliding window** coding pattern, often used for temporal or sequential event checks. It’s similar to log analysis, detecting suspicious login patterns, or rate limiting. Mastering this pattern helps solve many sequence/window problems, like finding frequent users, longest subarrays under constraints, or event clustering.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
