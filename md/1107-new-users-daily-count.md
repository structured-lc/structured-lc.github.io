### Leetcode 1107 (Medium): New Users Daily Count [Practice](https://leetcode.com/problems/new-users-daily-count)

### Description  
Given a `Traffic` table with columns (`user_id`, `activity`, `activity_date`), report for every date within at most 90 days from '2019-06-30' the number of users who logged in for the first time on that date. Only count the user's first 'login' activity. The table might have duplicate rows, and the `activity` column includes actions like 'login', 'logout', etc.

The output should return for each first-login date (in the 90-day window) the total count of new users who logged in for the first time on that exact date.

### Examples  

**Example 1:**  
Input:  
```
Traffic Table:
| user_id | activity  | activity_date |
|---------|-----------|--------------|
|   1     | login     | 2019-05-01   |
|   1     | homepage  | 2019-05-01   |
|   2     | login     | 2019-06-21   |
|   3     | login     | 2019-01-01   |
|   4     | login     | 2019-06-21   |
|   5     | login     | 2019-06-21   |
|   5     | login     | 2019-03-01   |
```
Output:  
```
| login_date  | user_count |
|-------------|------------|
| 2019-05-01  |     1      |
| 2019-06-21  |     3      |
```
*Explanation: For '2019-05-01', only user 1 logged in for the first time; for '2019-06-21', users 2, 4, and 5 had their first login (user 5 had an earlier login, so only their first counts). All are in the 90 days before '2019-06-30'.*

**Example 2:**  
Input:  
```
Traffic Table:
| user_id | activity   | activity_date |
|---------|------------|--------------|
|   1     | logout     | 2019-04-01   |
|   2     | login      | 2019-05-01   |
|   3     | login      | 2019-05-01   |
|   4     | homepage   | 2019-04-29   |
```
Output:  
```
| login_date | user_count |
|------------|-----------|
| 2019-05-01 |      2     |
```
*Explanation: Only users 2 and 3 performed a 'login' and both for the first time on 2019-05-01.*

**Example 3:**  
Input:  
```
Traffic Table: Empty
```
Output:  
```
(empty set)
```
*Explanation: No records, so no output.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:
  - For each user, scan all their login activity, pick the earliest date for 'login'.
  - For every distinct 'login_date' in the recent 90 days, count how many users had their first login that day.

- **Optimized approach**:
  - Filter only rows where activity = 'login'.
  - For each user, find their earliest activity_date (MIN).
  - Group the results by date, counting the number of users who first logged in on that date.
  - Filter the dates for the window 2019-04-01 to 2019-06-30.

- This is chosen because SQL's GROUP BY, MIN, and COUNT efficiently solve each aggregation step, and this avoids unnecessary processing of irrelevant activities or redundant entries.

### Corner cases to consider  
- No data in the table (empty Traffic).
- A user who logs in multiple times; only their earliest matters.
- Non-login activities present – should be ignored.
- Users whose first login is outside the 90-day window.
- Duplicate rows.
- Multiple users with the same first login date.

### Solution

```python
# Since this is a SQL problem, here's a step-by-step transformation of the logic.
# Given Python for logic illustration.

def new_users_daily_count(traffic, today='2019-06-30', window=90):
    # Step 1: Only consider 'login' activities
    login_activities = [
        row for row in traffic if row['activity'] == 'login'
    ]

    # Step 2: For each user, find their first login date
    from collections import defaultdict
    user_first_login = {}
    for row in login_activities:
        user_id = row['user_id']
        date = row['activity_date']
        if user_id not in user_first_login or date < user_first_login[user_id]:
            user_first_login[user_id] = date

    # Step 3: Count number of users for each first login date
    from collections import Counter
    login_date_counter = Counter(user_first_login.values())
    
    # Step 4: Filter for login_dates within window days from 'today'
    import datetime
    today_dt = datetime.datetime.strptime(today, '%Y-%m-%d')
    filtered_results = []
    for login_date, count in login_date_counter.items():
        login_dt = datetime.datetime.strptime(login_date, '%Y-%m-%d')
        days_diff = (today_dt - login_dt).days
        if 0 <= days_diff <= window:
            filtered_results.append({
                'login_date': login_date,
                'user_count': count
            })
    return filtered_results
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the Traffic table. Each row is visited a constant number of times across all steps (filtering, aggregation).
- **Space Complexity:** O(u + d), where u = unique users, d = unique first login dates. Additional temporary storage for counters/maps.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle users who change their timezones or activity dates (e.g., due to user error)?
  *Hint: Consider data cleaning or standardizing dates before processing.*

- If the table is very large, how can this query be made more efficient or scalable?
  *Hint: Indexing, partitioning, and aggregating on only necessary columns.*

- How would you generalize this to rolling windows of other lengths, or for arbitrary 'today' dates?
  *Hint: Parameterize the window and use variables to make the date calculation dynamic.*

### Summary
This problem uses the **group-by aggregation** and **filtering** pattern, which is fundamental for data analytics (FAQ-style SQL queries). The approach can be applied to any "first event" counting problem, like “first purchase per user” or cohort analysis. The core logic (find minimum date per group, then aggregate by that date) is a classic in SQL and data-heavy backends.

### Tags
Database(#database)

### Similar Problems
