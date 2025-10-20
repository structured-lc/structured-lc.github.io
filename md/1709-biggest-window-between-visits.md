### Leetcode 1709 (Medium): Biggest Window Between Visits [Practice](https://leetcode.com/problems/biggest-window-between-visits)

### Description  
Given a table `UserVisits` with columns `user_id` (int) and `visit_date` (date), where each row records a user's visit to a retailer on a particular date. For each user, find the **largest number of days (window)** between any two of their consecutive visits. If it's their last visit, the difference should be between that visit and `'2021-01-01'` (today). Return the largest window between visits for each user.

### Examples  

**Example 1:**  
Input:  
```
UserVisits = [
  [1, '2020-12-30'],
  [1, '2020-12-31'],
  [2, '2020-12-29'],
  [2, '2020-12-31'],
  [2, '2021-01-01']
]
```
Output:  
```
user_id | biggest_window
------------------------
1       | 2
2       | 2
```
Explanation:  
User 1 visited on 2020-12-30 and 2020-12-31. From last visit (2020-12-31) to 2021-01-01 is 1 day. Max window: max(2020-12-31 - 2020-12-30, 2021-01-01 - 2020-12-31) = 1, 1 → so take 1.
But since user 2 has 2020-12-29 → 2020-12-31 (2 days), 2020-12-31 → 2021-01-01 (1 day). Max window: 2.

**Example 2:**  
Input:  
```
UserVisits = [
  [1, '2020-12-20'],
  [1, '2020-12-25'],
  [1, '2021-01-01']
]
```
Output:  
```
user_id | biggest_window
------------------------
1       | 7
```
Explanation:  
Windows: 2020-12-20 → 2020-12-25 = 5 days, 2020-12-25 → 2021-01-01 = 7 days. Max window: 7.

**Example 3:**  
Input:  
```
UserVisits = [
  [9, '2020-12-31']
]
```
Output:  
```
user_id | biggest_window
------------------------
9       | 1
```
Explanation:  
User 9 only visited once. From 2020-12-31 to 2021-01-01 is 1 day.

### Thought Process (as if you’re the interviewee)  
First, for each user, I need to look at their list of visits in order and calculate the number of days between successive visits. For each visit, the "next" visit is either the next in the date-ascending order or '2021-01-01' if it's the user's last recorded visit.

A brute-force approach would be:
- For each user, sort their visits by date.
- For every consecutive pair, compute the day difference; also, consider the last visit to '2021-01-01'.
- Take the max of all these gaps for each user.

However, in SQL or in code, the optimal way is to precompute the "next visit date" for each visit, then compute the day difference and take the max per user. 

In SQL, a window function (LEAD) can help get each user's next visit or the default '2021-01-01'. In Python, I’d use a similar methodology: for every sorted list of visits, compare each visit date to the next, and for the last one, compare to today.

The optimal approach is O(n log n) per user for user-wise sorting and a single pass per user for max.

### Corner cases to consider  
- User visits only one date.
- Multiple users with overlapping dates.
- Duplicate visits on the same day (difference is 0 days).
- No users (empty input).
- User only visited on '2021-01-01'.
- Visits not ordered in the input.

### Solution

```python
from collections import defaultdict
from datetime import datetime, timedelta

def biggest_window_between_visits(user_visits):
    # Group visits by user_id
    visits = defaultdict(list)
    for user_id, visit_date in user_visits:
        visits[user_id].append(visit_date)

    results = []
    today = datetime(2021, 1, 1)
    
    for user_id in sorted(visits.keys()):
        # Sort dates for each user
        dates = sorted(
            datetime.strptime(date_str, "%Y-%m-%d")
            for date_str in visits[user_id]
        )
        
        max_gap = 0
        for i in range(len(dates)):
            if i + 1 < len(dates):
                diff = (dates[i+1] - dates[i]).days
            else:
                # gap to today for the last visit
                diff = (today - dates[i]).days
            if diff > max_gap:
                max_gap = diff
        results.append([user_id, max_gap])
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) where n is the total number of visits.
  - Grouping by user: O(n)
  - Sorting each user's visits: O(m log m) per user (m = num visits for user)
  - Final scan for window max: O(m) per user
- **Space Complexity:** O(n) for storing grouped visits and parsed dates.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the dataset is massive and cannot fit in memory?  
  *Hint: Can this logic be executed as a streaming algorithm or in SQL only on batches?*

- How would you handle time zones or datetime (not just date) fields?  
  *Hint: Consider normalization, truncation, or precise timedelta calculation*

- How about supporting dynamic "today" instead of a hardcoded date?  
  *Hint: Allow a parameter to control the current reference date.*

### Summary
This problem uses the "sliding window" and "window function" pattern, commonly found in data analytics and time series analysis. Approaches here (LEAD/LAG, grouping, window maximum) are standard for log-gap analysis, anomaly detection, and churn prediction in real-world business data or analytics platforms.


### Flashcard
For each user, sort visits by date, compute gaps between consecutive visits (including '2021-01-01' for last), return the max gap.

### Tags
Database(#database)

### Similar Problems
- Users With Two Purchases Within Seven Days(users-with-two-purchases-within-seven-days) (Medium)