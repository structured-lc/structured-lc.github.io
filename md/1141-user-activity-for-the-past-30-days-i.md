### Leetcode 1141 (Easy): User Activity for the Past 30 Days I [Practice](https://leetcode.com/problems/user-activity-for-the-past-30-days-i)

### Description  
Given a table `Activity` with columns `user_id`, `session_id`, `activity_date`, and `activity_type`, find the **number of daily active users** for each day in the last 30 days ending on (and including) '2019-07-27'.  
A user is considered active on a day if they performed at least one activity on that day.  
Only include days where there was at least one active user in the output.

### Examples  

**Example 1:**  
Input:  
- Activity table:  
```
user_id | session_id | activity_date | activity_type
------- | ---------- | ------------- | -------------
   1    |    100     | 2019-07-27    | open_session
   2    |    101     | 2019-07-27    | send_message
   2    |    102     | 2019-07-26    | end_session
   3    |    103     | 2019-07-25    | open_session
   1    |    104     | 2019-07-25    | send_message
```
Output:  
```
day         | active_users
------------|-------------
2019-07-27  |     2
2019-07-26  |     1
2019-07-25  |     2
```
*Explanation: On 2019-07-27, users 1 and 2 were both active (distinct users). On 2019-07-26, only user 2 was active. On 2019-07-25, users 1 and 3 were active.*

**Example 2:**  
Input:  
- Activity table is empty.  
Output:  
*No rows returned.*

*Explanation: There are no activities in the last 30 days, so no results should be returned.*

**Example 3:**  
Input:  
- All activities are before 2019-06-28.  
Output:  
*No rows returned.*

*Explanation: Since the window is 2019-06-28 to 2019-07-27 inclusive, old records do not count.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force**: For each of the last 30 days, count unique users who did any activity. This would be very inefficient if done one day at a time.
- **Optimized SQL**: 
  - Use a filter to select only the activities from the desired date window.
  - Group by `activity_date`.
  - For each group, count distinct `user_id`.
- The final SQL query is:
  ```
  SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users
  FROM Activity
  WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27'
  GROUP BY activity_date
  ```
- This leverages SQL's grouping and filtering to compute the desired counts efficiently.

### Corner cases to consider  
- Table is empty
- All activity outside the relevant 30-day window
- Multiple activities by a user on the same day (should count once)
- Days with no activity (should not show in result)
- User active on multiple days

### Solution

```python
# Since this is a SQL problem, here is a representative query explained with Python pseudo-SQL logic for clarity:

def daily_active_users(activity):
    # Assume activity is a list of dicts, each representing a row
    from collections import defaultdict
    from datetime import datetime, timedelta

    # Set window bounds
    end = datetime.strptime('2019-07-27', '%Y-%m-%d')
    start = end - timedelta(days=29)   # 30 days inclusive

    day_user_set = defaultdict(set)
    for row in activity:
        date = datetime.strptime(row['activity_date'], '%Y-%m-%d')
        if start <= date <= end:
            day_user_set[row['activity_date']].add(row['user_id'])

    # Build result, sorted by day if needed
    result = []
    for day, users in sorted(day_user_set.items()):
        result.append({'day': day, 'active_users': len(users)})
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of rows in the Activity table. Each row is processed exactly once.
- **Space Complexity:** O(D + K), where D is the number of distinct days in range, and K is the number of unique (date, user_id) pairs.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution to get a rolling 7-day active user count?
  *Hint: Use a rolling window by date and count unique users across the interval.*
- How would you handle different time zones?
  *Hint: Normalize activity_date to a standard timezone before grouping.*
- What if you want inactive users as well (days with 0 users)?
  *Hint: Use a calendar table or generate the date range and LEFT JOIN with activity data.*

### Summary
This problem follows a **group-by and count-distinct** pattern, extremely common in SQL analytics and analytics coding interviews. Filtering data in a date window, grouping by a field (like day), and aggregation (like counting unique users) are universal techniques, useful in churn analysis, DAU/WAU/MAU reporting, and more reporting scenarios.


### Flashcard
For each of the last 30 days, count distinct user_ids with activity using GROUP BY and COUNT DISTINCT in SQL.

### Tags
Database(#database)

### Similar Problems
