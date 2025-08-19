### Leetcode 2298 (Medium): Tasks Count in the Weekend [Practice](https://leetcode.com/problems/tasks-count-in-the-weekend)

### Description  
Given a table `Tasks` with a date column called `submit_date`, report:
- The number of tasks submitted during the **weekends** (Saturday or Sunday), and
- The number of tasks submitted during **weekdays** (Monday to Friday).

The result should have two columns: `weekend_cnt` and `working_cnt`.

The challenge is to correctly identify weekend entries based on the date, aggregate the counts, and present the results accordingly.

### Examples  

**Example 1:**  
Input=`Tasks` table:  
| id | submit_date |
|----|-------------|
| 1  | 2023-06-10  |  
| 2  | 2023-06-13  |  
| 3  | 2023-06-11  |

Output=`  
| weekend_cnt | working_cnt |  
|-------------|-------------|  
|      2      |      1      |  
`  
*Explanation: 2023-06-10 (Saturday) and 2023-06-11 (Sunday) are weekends, so weekend_cnt=2. 2023-06-13 is a Tuesday, so working_cnt=1.*

**Example 2:**  
Input=`Tasks` table:  
| id | submit_date |
|----|-------------|
| 1  | 2023-07-03  |  
| 2  | 2023-07-08  |

Output=`  
| weekend_cnt | working_cnt |  
|-------------|-------------|  
|      1      |      1      |  
`  
*Explanation: 2023-07-08 (Saturday) is a weekend, 2023-07-03 (Monday) is a weekday.*

**Example 3:**  
Input=`Tasks` table:  
| id | submit_date |
|----|-------------|
| 1  | 2023-07-05  |  
| 2  | 2023-07-06  |

Output=`  
| weekend_cnt | working_cnt |  
|-------------|-------------|  
|      0      |      2      |  
`  
*Explanation: Both dates are midweek.*

### Thought Process (as if you’re the interviewee)  
To solve this, I’d start by extracting the **day of the week** from each `submit_date` for all task entries. Most SQL engines provide a `WEEKDAY()` or `DAYOFWEEK()` function:
- With `WEEKDAY(date)`, 0 = Monday, ..., 5 = Saturday, 6 = Sunday.

The brute-force idea is to:  
- For each row, check if its weekday index is 5 or 6 (weekend), else it's a weekday.
- Count the number of records for both cases.

Optimized:  
- Use conditional aggregation:  
    - `SUM(WEEKDAY(submit_date) >= 5)` for weekends.
    - `SUM(WEEKDAY(submit_date) < 5)` for weekdays.

This is efficient, as we sweep the table once using aggregation and arithmetics, and do not require multiple passes or subqueries.

Trade-off:  
- Avoids subqueries/views, more readable and performant.  
- Edge case: If the column allows NULL dates, we need to decide on how to treat them.

### Corner cases to consider  
- The `Tasks` table is empty → Should return 0 for both counts.
- All tasks submitted on weekends or all on weekdays.
- Dates are all the same.
- Unexpected date values (e.g., if `submit_date` is NULL).
- Values fall exactly on Saturday or Sunday: ensure function maps them to weekend.
- Different SQL engines may have different day-of-week numbering.

### Solution

```python
# Since this is an SQL problem, here's the solution template as a string for clarity.

sql = '''
SELECT
    SUM(WEEKDAY(submit_date) >= 5) AS weekend_cnt,
    SUM(WEEKDAY(submit_date) < 5) AS working_cnt
FROM
    Tasks;
'''
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of tasks. Each row is examined once for aggregation.
- **Space Complexity:** O(1), since only two counters are kept regardless of input size (no extra storage per row).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to count per user if there's a `user_id` column?  
  *Hint: Use GROUP BY user_id and aggregate per user.*

- How would you count tasks per day, grouped by weekend/weekday?  
  *Hint: First group by DATE, and include a column to indicate if that day is a weekend.*

- What if you had to count per week or per month?  
  *Hint: Use functions like YEARWEEK(submit_date) or EXTRACT(MONTH FROM submit_date).*

### Summary
This problem leverages **conditional aggregation** and **date extraction** functions to partition and count data based on day-of-week properties. The pattern is common in reporting tasks requiring temporal grouping or filtering, and is highly applicable in business analytics, attendance tracking, and time-based KPI dashboards.

### Tags
Database(#database)

### Similar Problems
