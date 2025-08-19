### Leetcode 2854 (Medium): Rolling Average Steps [Practice](https://leetcode.com/problems/rolling-average-steps)

### Description  
Given a table recording users’ daily step counts (`user_id`, `steps_count`, `steps_date`), write a SQL query to calculate the **3-day rolling average** of steps for each user.  
The 3-day rolling average is defined only when the step count is available for **three consecutive days** ending on a given date.  
Return the `user_id`, `steps_date`, and rolling average (rounded to two decimal places), ordered by `user_id` then `steps_date`.

### Examples  

**Example 1:**  
Input:  
Steps table:  
| user_id | steps_count | steps_date  |
|---------|------------|-------------|
| 1       | 395        | 2021-09-05  |
| 1       | 499        | 2021-09-06  |
| 1       | 712        | 2021-09-07  |
| 1       | 576        | 2021-09-08  |

Output:  
| user_id | steps_date  | rolling_average |
|---------|-------------|----------------|
| 1       | 2021-09-07  | 535.33         |
| 1       | 2021-09-08  | 595.67         |

*Explanation:*
- For 2021-09-07: (395 + 499 + 712) / 3 = 535.33
- For 2021-09-08: (499 + 712 + 576) / 3 = 595.67

**Example 2:**  
Input:  
Steps table:  
| user_id | steps_count | steps_date  |
|---------|------------|-------------|
| 2       | 530        | 2021-09-08  |
| 2       | 300        | 2021-09-07  |
| 2       | 480        | 2021-09-06  |

Output:  
| user_id | steps_date  | rolling_average |
|---------|-------------|----------------|
| 2       | 2021-09-08  | 436.67         |

*Explanation:*
- For 2021-09-08: (480 + 300 + 530) / 3 = 436.67

**Example 3:**  
Input:  
Steps table:  
| user_id | steps_count | steps_date  |
|---------|------------|-------------|
| 3       | 945        | 2021-09-04  |
| 3       | 120        | 2021-09-07  |
| 3       | 557        | 2021-09-08  |
| 3       | 840        | 2021-09-09  |
| 3       | 627        | 2021-09-10  |

Output:  
| user_id | steps_date  | rolling_average |
|---------|-------------|----------------|
| 3       | 2021-09-10  | 674.67         |

*Explanation:*
- Only for 2021-09-10 are there step counts for 2021-09-08, 2021-09-09, 2021-09-10 (557 + 840 + 627) / 3 = 674.67


### Thought Process (as if you’re the interviewee)  
- Brute-force: For each user and each date, check if there are exactly 3 consecutive days with step records. Compute the average if so.  
  - This would require self-joins or for-loops, which is inefficient at scale.
- Optimization:  
  - Use SQL window functions:
    - `AVG(steps_count) OVER (PARTITION BY user_id ORDER BY steps_date ROWS 2 PRECEDING)` gets the average of the current and prior 2 rows (3 days).
    - To ensure days are consecutive (not just 3 rows), use `LAG` to get the date 2 rows prior, then filter where the difference is exactly 2 days.
    - `ROUND` to two decimals.
  - This is efficient; works for large data and is idiomatic SQL.

### Corner cases to consider  
- Less than 3 days of data for a user: no rows in output.
- Days not consecutive (gaps in dates): do not report average for those.
- Different users with overlapping dates.
- Steps counts on non-consecutive days—rolling average not supposed to be defined.
- Same steps_date for a user (should not occur by constraints, if it does, undefined).

### Solution

```sql
WITH Rolling AS (
  SELECT
    user_id,
    steps_date,
    ROUND(
      AVG(steps_count) OVER (
        PARTITION BY user_id
        ORDER BY steps_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
      ),
      2
    ) AS rolling_average,
    LAG(steps_date, 2) OVER (
      PARTITION BY user_id
      ORDER BY steps_date
    ) AS two_days_before
  FROM Steps
)
SELECT
  user_id,
  steps_date,
  rolling_average
FROM Rolling
WHERE DATEDIFF(steps_date, two_days_before) = 2
ORDER BY user_id, steps_date;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the Steps table. Each window function scan is linear per partition (per user).
- **Space Complexity:** O(n), as extra columns for window function state and temporary result set—scales linearly with input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize the solution for a k-day rolling average?
  *Hint: Parameterize the number of days and adjust the window and LAG accordingly.*

- What if steps data could have missing or duplicate dates per user?
  *Hint: Consider deduplication and handling of missing values up front.*

- How would you calculate a rolling sum, not an average, or both at once?
  *Hint: Replace AVG() or add SUM() in the window function.*

### Summary
This problem is a classic **SQL window function** question, focusing on rolling aggregates with a strict consecutive-day requirement. It shows how to combine `AVG` (or other aggregates) with windowed `LAG`, and careful use of `DATEDIFF` to enforce data constraints. The core pattern—rolling averages/sums with window frames and data integrity checks—applies widely to time-series analytics, financial calculations, and monitoring.

### Tags
Database(#database)

### Similar Problems
