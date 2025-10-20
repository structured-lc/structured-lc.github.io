### Leetcode 1454 (Medium): Active Users [Practice](https://leetcode.com/problems/active-users)

### Description  
Given two tables, Accounts and Logins, find all **active users** — defined as users who have logged in for 5 or more **consecutive days**.  
- The `Accounts` table contains `id` (userId) and `name`.
- The `Logins` table contains `id` (userId) and `login_date`.
Return the IDs and names of the active users, sorted by ID.

### Examples  

**Example 1:**  
Input:  
Accounts =  
```
| id | name  |
|----|-------|
| 1  | Alice |
| 2  | Bob   |
| 3  | Carol |
```
Logins =  
```
| id | login_date |
|----|------------|
| 1  | 2020-01-01 |
| 1  | 2020-01-02 |
| 1  | 2020-01-03 |
| 1  | 2020-01-04 |
| 1  | 2020-01-05 |
| 2  | 2020-01-10 |
| 2  | 2020-01-11 |
| 2  | 2020-01-12 |
| 3  | 2020-01-01 |
| 3  | 2020-01-03 |
| 3  | 2020-01-04 |
| 3  | 2020-01-05 |
| 3  | 2020-01-06 |
| 3  | 2020-01-07 |
```
Output:  
```
| id | name  |
|----|-------|
| 1  | Alice |
| 3  | Carol |
```
*Explanation: Alice and Carol each logged in for at least 5 consecutive days; Bob did not.*

**Example 2:**  
Input:  
Accounts =  
```
| id | name   |
|----|--------|
| 11 | David  |
| 16 | Emma   |
```
Logins =  
```
| id | login_date |
|----|------------|
| 11 | 2021-06-01 |
| 11 | 2021-06-02 |
| 11 | 2021-06-06 |
| 16 | 2021-06-02 |
| 16 | 2021-06-03 |
| 16 | 2021-06-04 |
| 16 | 2021-06-05 |
| 16 | 2021-06-06 |
| 16 | 2021-06-07 |
```
Output:
```
| id | name   |
|----|--------|
| 16 | Emma   |
```
*Explanation: Only Emma has a streak of 5 consecutive days. David has gaps and never reaches 5 in a row.*

**Example 3:**  
Input:  
Accounts =  
```
| id | name  |
|----|-------|
| 19 | Zach  |
```
Logins =  
```
| id | login_date |
|----|------------|
| 19 | 2022-01-01 |
| 19 | 2022-01-01 |
| 19 | 2022-01-02 |
| 19 | 2022-01-05 |
| 19 | 2022-01-06 |
```
Output:
```
| id | name  |
|----|-------|
```
*Explanation: Zach never has 5 unique, consecutive days of login.*

### Thought Process (as if you’re the interviewee)  

- **First idea:** For each user, sort their login dates and check for sequences of 5 consecutive days. This is similar to a sliding window approach, but in SQL or set logic.
- **Brute force:** For every user, collect and sort their login dates, and for every interval of 5, check if the difference between the first and last date is 4 days (since days are inclusive and gaps would show as more). This is not efficient in set-based languages.
- **Window function optimization:**  
  - Assign a "rank" or row number to each login per user, ordered by login date.
  - For each login, subtract the row number from the date. This transforms consecutive sequences into equal "base dates".
  - Group by this difference and count: if any group for a user has 5 or more dates, the user is active.
  - This approach is efficient and works well in SQL. In code, one can simulate this logic.
- **Why final approach:** The window function approach (using ranks) allows detecting all consecutive sequences efficiently and directly. No O(n²) comparisons, just a single scan and grouping.

### Corner cases to consider  
- User logs in the same day multiple times: should consider only unique days.
- User has exactly 5 days, but not consecutive.
- User with fewer than 5 logins.
- Non-overlapping streaks for the same user (should output only once).
- All accounts are inactive (empty result).
- Multiple users with and without active streaks.
- Dates not in order, missing days, empty tables.

### Solution

```python
from collections import defaultdict

def active_users(accounts, logins):
    # Build lookup of userId -> name
    id2name = {acc["id"]: acc["name"] for acc in accounts}
    # Build userId -> set of unique login_dates
    user_logins = defaultdict(set)
    for login in logins:
        user_logins[login["id"]].add(login["login_date"])

    result = []
    for uid, dates in user_logins.items():
        # Convert dates to sorted list of int days for comparison
        sorted_days = sorted(dates)
        # Transform date strings to ordinal (yyyymmdd as int)
        day_ints = [int(d.replace('-', '')) for d in sorted_days]
        day_ints.sort()
        # Simulate row_number() and find consecutive streaks
        streak = 1
        prev = None
        for i in range(1, len(day_ints)):
            # Check for consecutive day (handle date arithmetic)
            y1, m1, d1 = int(sorted_days[i-1][:4]), int(sorted_days[i-1][5:7]), int(sorted_days[i-1][8:])
            y2, m2, d2 = int(sorted_days[i][:4]), int(sorted_days[i][5:7]), int(sorted_days[i][8:])
            from datetime import date, timedelta
            dt1 = date(y1, m1, d1)
            dt2 = date(y2, m2, d2)
            if (dt2 - dt1).days == 1:
                streak += 1
                if streak >= 5:
                    result.append({"id": uid, "name": id2name[uid]})
                    break
            else:
                streak = 1
        # Edge: if user only has 1 date, no streak will occur

    # Must be ordered by id
    return sorted(result, key=lambda x: x["id"])

# Example usage:
accounts = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Carol"},
]
logins = [
    {"id": 1, "login_date": "2020-01-01"},
    {"id": 1, "login_date": "2020-01-02"},
    {"id": 1, "login_date": "2020-01-03"},
    {"id": 1, "login_date": "2020-01-04"},
    {"id": 1, "login_date": "2020-01-05"},
    {"id": 2, "login_date": "2020-01-10"},
    {"id": 2, "login_date": "2020-01-11"},
    {"id": 2, "login_date": "2020-01-12"},
    {"id": 3, "login_date": "2020-01-01"},
    {"id": 3, "login_date": "2020-01-03"},
    {"id": 3, "login_date": "2020-01-04"},
    {"id": 3, "login_date": "2020-01-05"},
    {"id": 3, "login_date": "2020-01-06"},
    {"id": 3, "login_date": "2020-01-07"},
]
print(active_users(accounts, logins))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L log L), where L is the total number of login records. Sorting login dates per user dominates (though usually users have few logins).
- **Space Complexity:** O(L + A), for storing login sets per user (L logins, A accounts), plus the result size.

### Potential follow-up questions (as if you’re the interviewer)  

- **How would you generalize to n consecutive days instead of 5?**  
  *Hint: Make the streak threshold a parameter in your function.*

- **What if the data is huge and doesn't fit in memory?**  
  *Hint: Can the detection be run in a distributed/streaming way per user? Consider batch processing, or chunking by user.*

- **How would you adapt this for logins in different timezones or with timestamps instead of dates?**  
  *Hint: Normalize timestamps to user timezone or UTC day, then proceed as before.*

### Summary
This problem is a classic "find consecutive streaks" challenge, appearing often in user analytics. The optimal pattern is **group by user, sort unique events, and scan for consecutive runs**—which can be simulated by either sliding windows or by "normalizing" with ranks/differences in dates. This technique is generally applicable in problems like tracking customer retention, achievement streaks, and more.


### Flashcard
For each user, sort login dates and use a sliding window to check for any 5 consecutive days with logins.

### Tags
Database(#database)

### Similar Problems
