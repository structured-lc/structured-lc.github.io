### Leetcode 2688 (Medium): Find Active Users [Practice](https://leetcode.com/problems/find-active-users)

### Description  
Given a `Users` table with columns `user_id`, `item`, `created_at`, and `amount`, find all user_ids of **active users**.  
An *active user* is defined as a user who made a **second purchase within 7 days** of any other of their purchases (i.e., there exists at least one pair of purchases for that user within 7 days apart, not necessarily consecutive).

### Examples  

**Example 1:**  
Input:  
Users table:  
```
| user_id | item                | created_at  | amount  |
|---------|---------------------|-------------|---------|
| 5       | Smart Crock Pot     | 2021-09-18  | 698882  |
| 6       | Smart Lock          | 2021-09-14  | 11487   |
| 6       | Smart Thermostat    | 2021-09-10  | 674762  |
| 8       | Smart Light Strip   | 2021-09-29  | 630773  |
| 4       | Smart Cat Feeder    | 2021-09-02  | 693545  |
| 4       | Smart Bed           | 2021-09-13  | 170249  |
```
Output:  
```
| user_id |
|---------|
| 6       |
```
*Explanation:  
User 6 has purchases on 2021-09-10 and 2021-09-14, which are 4 days apart (≤ 7 days).  
Users 4, 5, and 8 do not meet the criteria:  
- User 4: purchases are 11 days apart.  
- Users 5 and 8: only one purchase, so can't qualify as active.*

**Example 2:**  
Input:  
```
| user_id | item      | created_at  | amount  |
|---------|-----------|-------------|---------|
| 1       | X         | 2021-01-01  | 100     |
| 1       | Y         | 2021-01-03  | 101     |
| 2       | Z         | 2021-01-01  | 200     |
```
Output:  
```
| user_id |
|---------|
| 1       |
```
*Explanation:  
User 1 has two purchases 2 days apart. User 2 has only one purchase.*

**Example 3:**  
Input:  
```
| user_id | item      | created_at  | amount  |
|---------|-----------|-------------|---------|
| 9       | ABC       | 2020-12-10  | 10      |
| 9       | EFG       | 2020-12-20  | 20      |
| 9       | HIJ       | 2020-12-29  | 15      |
```
Output:  
```
| user_id |
|---------|
```
*Explanation:  
All purchases for user 9 are at least 10 days apart, so user 9 is not active.*

### Thought Process (as if you’re the interviewee)  
To solve this:
- **Brute-force**: For each user, compare the `created_at` date of every pair of purchases. If any pair is within 7 days, mark the user as active.
  - For SQL: Use a self-join on the Users table where user_ids match but the created_at dates are different.
  - Check if the absolute difference between created_at dates is ≤ 7.
- **Optimized**: Since SQL is well suited for set-based operations, a self-join is the typical approach. Grouping and window functions are less useful since the condition isn't only for consecutive purchases.
- **Trade-offs**: The self-join will result in O(n²) comparisons per user, which is acceptable as DBs optimize joins well for moderate data.

No further optimization is possible for this requirement in plain SQL unless indexing or denormalization is allowed.

### Corner cases to consider  
- Table is empty: No active users.
- User has only one purchase: Can't be active.
- User has multiple purchases, but all gaps are > 7 days: Not active.
- Multiple users are active.
- All purchases in the same day (should be counted as active).

### Solution

```python
# This is the core SQL; for Python, use input as list of dicts if needed
# Since the problem is SQL-focused, here is the SQL:
#
# SELECT DISTINCT u1.user_id
# FROM Users u1
# JOIN Users u2
#   ON u1.user_id = u2.user_id
#   AND u1.created_at <> u2.created_at
#   AND ABS(DATEDIFF(u1.created_at, u2.created_at)) <= 7

# If you want a Python implementation for educational purposes:
from collections import defaultdict
from datetime import datetime

def find_active_users(records):
    # records: list of dicts with keys: user_id, item, created_at, amount
    user_dates = defaultdict(list)
    for rec in records:
        date_obj = datetime.strptime(rec['created_at'], '%Y-%m-%d')
        user_dates[rec['user_id']].append(date_obj)
    
    active_users = set()
    for user, dates in user_dates.items():
        n = len(dates)
        if n < 2:
            continue
        dates.sort()
        for i in range(n):
            for j in range(i + 1, n):
                # calculate the number of days between two purchases
                if abs((dates[i] - dates[j]).days) <= 7:
                    active_users.add(user)
                    break  # no need to check further
            if user in active_users:
                break
    return list(sorted(active_users))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k × n²) where k is unique users and n their purchases, due to pairwise comparison in worst case.
- **Space Complexity:** O(k × n) for storing users' purchase dates.

### Potential follow-up questions (as if you’re the interviewer)  

- How to handle very large volumes of data?
  *Hint: Indexes on user_id and created_at can speed up join and filtering; consider distributed systems for scale.*

- What if the time window changes frequently (not always 7 days)?
  *Hint: Parameterize the interval for flexibility in both SQL and application.*

- How would you find users who have *at least N* purchases within any X-day window?
  *Hint: Use window functions or sliding window grouping by user_id with counts per time window.*

### Summary
This problem is a classic application of **self-join** for comparing records within the same group, a common SQL pattern for time windows and event-based "activity" queries.  
It generalizes to fraud detection, retention analysis, or any time-dependent pairwise event query. Knowing how to efficiently join and compare grouped records by time is a key database/in-memory pattern.

### Tags
Database(#database)

### Similar Problems
