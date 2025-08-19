### Leetcode 1972 (Hard): First and Last Call On the Same Day [Practice](https://leetcode.com/problems/first-and-last-call-on-the-same-day)

### Description  
Given a table `Calls` with columns `caller_id`, `recipient_id`, and `call_time`, each row represents a phone call between two users at a specific time. For every *user* on every *day*, find those users whose *first* and *last* calls (regardless of whether they are caller or recipient) were with the *same person*.

Return the IDs of such users. The order does not matter.

### Examples  

**Example 1:**  
Input:  
```text
Calls table:
caller_id | recipient_id | call_time
8         | 4            | 2021-08-24 17:46:07
4         | 8            | 2021-08-24 19:57:13
8         | 16           | 2021-08-25 05:18:23
8         | 4            | 2021-08-25 07:25:35
```
Output:  
`8`  
Explanation:  
On 2021-08-24, user 8's first and last calls (17:46:07 and 19:57:13) were both with user 4.

**Example 2:**  
Input:  
```text
Calls table:
caller_id | recipient_id | call_time
1         | 2            | 2023-06-01 10:00:00
2         | 3            | 2023-06-01 13:00:00
3         | 1            | 2023-06-01 18:00:00
```
Output:  
`(empty)`  
Explanation:  
For each user and each day, their first and last calls are not with the same person.

**Example 3:**  
Input:  
```text
Calls table:
caller_id | recipient_id | call_time
5         | 6            | 2024-01-01 08:00:00
6         | 5            | 2024-01-01 08:30:00
5         | 6            | 2024-01-01 09:00:00
```
Output:  
`5`  
`6`  
Explanation:  
For 2024-01-01, both user 5 and user 6 had only calls with each other; so first and last calls were with the same person.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For every user and every day, collect all calls (as caller or recipient), sort them by time, identify their first and last communication partner, and check if they are the same person. This would require iterating through all rows multiple times and is not efficient for large datasets.

- **Optimized SQL Approach:**  
  Since phone call records can be viewed bidirectionally, for each call, treat both parties as “user”, and the other as the “partner”. For each user and day, create a unified list of all call interactions, then:
    - Rank calls by time (ascending for first, descending for last).
    - Identify the partner for the *first* and *last* call (per user, per day).
    - If both partners are the same for that day, return the user.

  Use SQL’s UNION to treat both caller and recipient symmetrically, and window functions (such as RANK or DENSE_RANK over date partitions) to efficiently get first and last calls.  
  This approach is efficient and concise.

### Corner cases to consider  
- Users with only one call on a day.
- Multiple calls with the same person on the same day.
- Users who are only ever recipients but never callers (and vice versa).
- Calls around midnight (make sure day separation is handled).
- Empty table (no calls at all).
- Multiple users can qualify for the same day.
- Calls with multiple persons (group calls) are not part of the schema.

### Solution

```python
# Since this is a SQL problem, here's the equivalent core logic in Python for clarity.
# (In interviews, they might ask for SQL or for you to sketch the logic in Python.)

# Each call contributes two records to a unified "events" list:
# For event in calls:
#   add (user=caller, partner=recipient, time, date)
#   add (user=recipient, partner=caller, time, date)
# For each user and each day:
#   Collect all their events; sort by time.
#   Check if first and last partner is the same.

from collections import defaultdict

def first_and_last_call_same_person(calls):  # calls = List of (caller_id, recipient_id, call_time)
    from datetime import datetime

    user_day_events = defaultdict(list)
    for caller, recipient, time_str in calls:
        date = time_str[:10]  # YYYY-MM-DD
        user_day_events[(caller, date)].append((time_str, recipient))
        user_day_events[(recipient, date)].append((time_str, caller))
    
    res = set()
    for (user, date), events in user_day_events.items():
        events.sort()  # sort by time_str
        first_partner = events[0][1]
        last_partner = events[-1][1]
        if first_partner == last_partner:
            res.add(user)
    return list(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the total number of calls. Each call generates two events; sorting per user per day dominates.
- **Space Complexity:** O(n), due to storage of per-user, per-day call lists.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle calls that cross midnight (e.g., calls starting at 23:59 and ending 00:01)?  
  *Hint: Should day be based on call start or both start and end?*

- If group calls were possible (i.e., >2 participants), how would the schema/logic need to change?  
  *Hint: Consider a "participants" mapping table.*

- What queries could efficiently answer *“which user had the most first-last matched days over the year”?*  
  *Hint: Aggregate results per user and sort.*

### Summary
This problem is a classic *windowed grouping and aggregation* pattern commonly found in SQL and analytics:  
- Normalize calls to treat both participants symmetrically.
- Partition/group by user and date.
- Use time-rank to extract first/last events.
- Efficient solution leverages either SQL window functions or a lightweight per-group sort in imperative code.  
This approach can also be used in problems about first/last transactions, recurring meeting patterns, or other “sequence per group” analytics.

### Tags
Database(#database)

### Similar Problems
