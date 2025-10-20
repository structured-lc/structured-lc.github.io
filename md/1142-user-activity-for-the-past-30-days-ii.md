### Leetcode 1142 (Easy): User Activity for the Past 30 Days II [Practice](https://leetcode.com/problems/user-activity-for-the-past-30-days-ii)

### Description  
Given a table **Activity**, which records user session activity for a social media website, write an SQL query to **find the average number of sessions per user** over the 30-day period ending on 2019-07-27 (inclusive). Each session is uniquely linked with a user, and a session counts only if it had at least one activity in this period. The result should be rounded to 2 decimal places. Return 0.00 if there is no data in the range.

The `Activity` table:
- `user_id` (int): user identifier
- `session_id` (int): session identifier
- `activity_date` (date): the date an activity occurred
- `activity_type` (enum): ENUM('open_session', 'end_session', 'scroll_down', 'send_message')

### Examples  

**Example 1:**  
Input:  
Activity table:
```
user_id | session_id | activity_date | activity_type
   1    |     1      |  2019-07-20   | open_session
   2    |     2      |  2019-07-21   | open_session
   3    |     3      |  2019-07-22   | open_session
   3    |     4      |  2019-07-25   | open_session
```
Output:  
`1.33`  
Explanation.  
User 1: 1 session, User 2: 1 session, User 3: 2 sessions.  
Average = (1 + 1 + 2) / 3 = 1.33.

**Example 2:**  
Input:  
Activity table:
```
user_id | session_id | activity_date | activity_type
   1    |     1      |  2019-06-01   | open_session
   2    |     2      |  2019-08-01   | open_session
```
Output:  
`0.00`  
Explanation.  
No activity falls within the '2019-06-28' to '2019-07-27' window, so the output is 0.00.

**Example 3:**  
Input:  
Activity table: empty
Output:  
`0.00`  
Explanation.  
No data, so result is 0.00.


### Thought Process (as if you’re the interviewee)  
- Start by **filtering activity records** to only those between '2019-06-28' and '2019-07-27'.
- **Identify all unique sessions for each user** (since only sessions with activity during this period are counted).
- **Count distinct session_id for each user** to get sessions per user.
- Calculate the **average number of sessions per user**: total sessions divided by total users (both distinct counts).
- Use **ROUND(val, 2)** to round to 2 decimals and handle null/empty cases with IFNULL (MySQL returns NULL for division by zero, so set to 0.00).
- Avoid using window functions since they're not necessary or supported in this context.
- The challenge is ensuring accuracy with DISTINCT counts, especially with possible duplicate activity rows.

### Corner cases to consider  
- No activity records at all.
- No sessions in the required date range.
- All users have same number of sessions.
- A user with multiple sessions, multiple activities per session.
- Duplicate rows in the Activity table (need DISTINCT).
- Only one user.
- Only one session.

### Solution

```python
# This is an SQL problem; in Python, the equivalent would be with an input list of dictionaries, but for clarity,
# here's a direct MySQL query as would be used in an interview:

"""
SELECT IFNULL(
         ROUND(COUNT(DISTINCT session_id) / COUNT(DISTINCT user_id), 2),
         0.00
       ) AS average_sessions_per_user
FROM Activity
WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27';
"""

# In a Python (for interview) simulation:
def average_sessions_per_user(activity_table):
    # Filter activities in date range
    filtered = [
        row for row in activity_table
        if '2019-06-28' <= row['activity_date'] <= '2019-07-27'
    ]
    
    if not filtered:
        return 0.00
    
    user_sessions = {}
    for row in filtered:
        user = row['user_id']
        session = row['session_id']
        # Add unique sessions per user
        if user not in user_sessions:
            user_sessions[user] = set()
        user_sessions[user].add(session)
    
    if not user_sessions:
        return 0.00
    
    total_sessions = sum(len(sessions) for sessions in user_sessions.values())
    total_users = len(user_sessions)
    avg_sessions = round(total_sessions / total_users, 2)
    return avg_sessions
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of activity records. Each record is processed once to filter and maintain sets.
- **Space Complexity:** O(U × S), where U is unique users and S is the average number of sessions per user, due to storing sets of sessions per user.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where the time window is variable, or user-provided?  
  *Hint: Consider parameterizing the date range.*

- How would you optimize the solution if the data doesn't fit in memory?  
  *Hint: Discuss using databases, indexes, or streaming aggregation.*

- What if you wanted per-user or per-day session averages instead?  
  *Hint: Think about GROUP BY user_id or activity_date.*

### Summary
This problem demonstrates the *aggregation by distinct values* pattern commonly used in SQL for analytics—especially, counting unique entities and averaging across groups. It tests knowledge of filtering data by date, handling possible nulls or divides by zero, and rounding results. The pattern applies widely in analytics queries where you need groupings and averages, such as user engagement, daily actives, or traffic metrics.


### Flashcard
Filter activities in date range; count distinct session_ids per user, then compute average sessions per user, rounded to 2 decimals.

### Tags
Database(#database)

### Similar Problems
