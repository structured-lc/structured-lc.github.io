### Leetcode 1225 (Hard): Report Contiguous Dates [Practice](https://leetcode.com/problems/report-contiguous-dates)

### Description  
You are given two tables: **Failed** and **Succeeded**. Each table has a date column indicating which dates the system task failed or succeeded, respectively. For every day from 2019-01-01 to 2019-12-31, the system will have either failed or succeeded. Write a report to output every *contiguous interval* (range of consecutive days) where the system was in the same state, labeled as either **'failed'** or **'succeeded'**. For each interval, output columns: `period_state`, `start_date`, and `end_date`, only for days in 2019, in order by `start_date`.

### Examples  

**Example 1:**  
Input:  
Failed table:  
```
| fail_date   |
|-------------|
| 2018-12-28  |
| 2018-12-29  |
| 2019-01-04  |
| 2019-01-05  |
```
Succeeded table:  
```
| success_date|
|-------------|
| 2018-12-30  |
| 2018-12-31  |
| 2019-01-01  |
| 2019-01-02  |
| 2019-01-03  |
| 2019-01-06  |
```
Output:  
```
| period_state | start_date  | end_date    |
|--------------|-------------|-------------|
| succeeded    | 2019-01-01  | 2019-01-03  |
| failed       | 2019-01-04  | 2019-01-05  |
| succeeded    | 2019-01-06  | 2019-01-06  |
```
*Explanation: The first continuous block (2019-01-01 to 2019-01-03) is all 'succeeded', then two days of 'failed', then one day of 'succeeded' again. Ignore dates from 2018.*


**Example 2:**  
Input:  
Failed table:  
```
| fail_date   |
|-------------|
| 2019-02-01  |
```
Succeeded table:  
```
| success_date|
|-------------|
| 2019-02-02  |
| 2019-02-03  |
| 2019-02-04  |
```
Output:  
```
| period_state | start_date  | end_date    |
|--------------|-------------|-------------|
| failed       | 2019-02-01  | 2019-02-01  |
| succeeded    | 2019-02-02  | 2019-02-04  |
```
*Explanation: Single failed day, then three consecutive succeeded days.*


**Example 3:**  
Input:  
Failed table:  
```
| fail_date   |
|-------------|
| 2019-03-10  |
| 2019-03-12  |
| 2019-03-14  |
```
Succeeded table:  
```
| success_date|
|-------------|
| 2019-03-11  |
| 2019-03-13  |
| 2019-03-15  |
```
Output:  
```
| period_state | start_date  | end_date    |
|--------------|-------------|-------------|
| failed       | 2019-03-10  | 2019-03-10  |
| succeeded    | 2019-03-11  | 2019-03-11  |
| failed       | 2019-03-12  | 2019-03-12  |
| succeeded    | 2019-03-13  | 2019-03-13  |
| failed       | 2019-03-14  | 2019-03-14  |
| succeeded    | 2019-03-15  | 2019-03-15  |
```
*Explanation: Alternating single day blocks between fail and succeed days.*

### Thought Process (as if you’re the interviewee)  
First, I want to find for each day its period state ('failed' or 'succeeded'). I can do this by combining both tables and marking the status for each date.

The brute-force approach is:
- Generate the list of all dates from 2019-01-01 to 2019-12-31.
- For each date, check if it appears in Failed or Succeeded, assign its state.

To find contiguous intervals:
- Iterate over this sorted list of (date, state).
- Group consecutive days with the same state, tracking start and end of each block.

To optimize:
- If the data is already sorted and states are labeled, go through it once and split at transition points (when state changes) to build contiguous groups.
- Using this grouping, output the state, start_date, and end_date for each block.

Trade-offs:
- Simpler and more maintainable to produce a full list and do grouping in a single linear pass.
- This is efficient since the number of days in a year is fixed (≤ 366).

### Corner cases to consider  
- Days missing from both tables (should not happen per problem as each day is either fail or succeed).
- Entire year in one state.
- One-day intervals.
- Adjacent intervals of the same state should *not* be merged if not consecutive.
- Input tables have out-of-2019 data (should ignore before/after 2019-01-01/2019-12-31).

### Solution

```python
from datetime import date, timedelta

def report_contiguous_dates(failed_dates, succeeded_dates):
    # failed_dates: set of date strings (YYYY-MM-DD)
    # succeeded_dates: set of date strings (YYYY-MM-DD)
    # Output: list of [period_state, start_date, end_date] in order
    
    # Generate sorted list of all days in 2019
    all_days = []
    d = date(2019, 1, 1)
    while d <= date(2019, 12, 31):
        date_str = d.isoformat()
        if date_str in failed_dates:
            state = "failed"
        elif date_str in succeeded_dates:
            state = "succeeded"
        else:
            # Per the problem every date is present in exactly one table.
            # But if not, pick as per data integrity.
            continue
        all_days.append((d, state))
        d += timedelta(days=1)
    
    if not all_days:
        return []
    
    # Group by contiguous state
    result = []
    start = all_days[0][0]
    state = all_days[0][1]
    end = start
    for day, st in all_days[1:]:
        if st == state and (day - end).days == 1:
            # Continue current interval
            end = day
        else:
            # Close previous interval
            result.append([state, start.isoformat(), end.isoformat()])
            # Start new interval
            start = day
            end = day
            state = st
    # Add the last interval
    result.append([state, start.isoformat(), end.isoformat()])
    return result

# Example usage:
failed = {'2019-01-04', '2019-01-05'}
succeeded = {'2019-01-01', '2019-01-02', '2019-01-03', '2019-01-06'}
output = report_contiguous_dates(failed, succeeded)
for row in output:
    print(row)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) with respect to the number of days (fixed at 365 for 2019). The main loop iterates once over all days in the year.
- **Space Complexity:** O(1) for intermediate storage if excluding input sizes, O(n) where n is the number of dates in the year for the result and processing (here, up to 365).

### Potential follow-up questions (as if you’re the interviewer)  

- How do you modify the solution if the input period is arbitrary (not just 2019)?
  *Hint: Allow start and end date to be function parameters; handle leap years.*

- How would you compute the number of intervals per state ('failed' vs 'succeeded') in the year?
  *Hint: Once intervals are built, count those with state == 'failed' and 'succeeded'.*

- What if some days are missing from both tables (data gaps)?
  *Hint: Handle unknown state, maybe output a placeholder or skip such dates.*

### Summary
This problem uses the **grouping consecutive elements** or “merge ranges” pattern, often used in time-series analysis, intervals merging, and run-length encoding. The core is to label each day, then scan from oldest to newest, grouping consecutive days with the same state, and outputting each contiguous block as needed. This pattern is common in problems involving calendars, logs, or contiguous value segmentation.