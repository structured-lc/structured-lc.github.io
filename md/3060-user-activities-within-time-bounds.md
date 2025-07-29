### Leetcode 3060 (Hard): User Activities within Time Bounds [Practice](https://leetcode.com/problems/user-activities-within-time-bounds)

### Description  
Given a database (often modeled in an interview as a list of records) of user activity session logs, each consisting of:
- **user_id**
- **session_start** (timestamp)
- **session_end** (timestamp)
- **session_type** (string/categorical)

Return all **user_id** values where, for any given session, there exists a previous session (of the same user and same session_type) such that the current session_start is within 12 hours from the previous session's session_end. That is, you need to identify users who have at least two sessions of the same type that are at most 12 hours apart.

### Examples  

**Example 1:**  
Input:  
Sessions =  
```
[
  [1, '2024-06-18 08:00', '2024-06-18 09:00', 'chat'],
  [1, '2024-06-18 20:00', '2024-06-18 21:00', 'chat'],
  [2, '2024-06-18 10:00', '2024-06-18 11:00', 'chat'],
  [2, '2024-06-19 08:00', '2024-06-19 09:00', 'chat']
]
```
Output: `[]`  
Explanation: User 1’s sessions are 11 hours apart but not consecutive (session_end of first is 09:00, next session_start is 20:00). That gap is greater than 12 hours. For user 2, the sessions are almost a day apart.

**Example 2:**  
Input:  
Sessions =  
```
[
  [5, '2024-06-20 08:00', '2024-06-20 10:00', 'gaming'],
  [5, '2024-06-20 15:00', '2024-06-20 16:00', 'gaming'], # 5h from previous end
  [3, '2024-06-19 22:00', '2024-06-20 05:00', 'music'],
  [3, '2024-06-20 10:00', '2024-06-20 17:00', 'music']
]
```
Output: `[5]`  
Explanation: Only User 5 has two gaming sessions that are less than 12h apart (10:00 → 15:00 is 5h gap).

**Example 3:**  
Input:  
Sessions =  
```
[
  [7, '2024-06-20 09:00', '2024-06-20 10:00', 'video'],
  [7, '2024-06-21 09:05', '2024-06-21 10:05', 'video'],
  [7, '2024-06-21 10:10', '2024-06-21 12:00', 'video']
]
```
Output: ``  
Explanation: On 2024-06-21, the two video sessions are only 5m apart (10:05 to 10:10), which is under 12h.

### Thought Process (as if you’re the interviewee)  
- Brute-force approach: For every user and every session_type, for each session, compare its session_start to the session_end of every previous session of that type for the same user. This is O(n²).
- Optimize:  
  - Group by (user_id, session_type)
  - Sort sessions by session_start (or session_end)
  - For each group, compare each session’s start time to the previous session’s end time (single pass).  
  - If the difference is ≤ 12 hours, add user_id to result set.
- Benefit: Reduced to O(n log n) time (from sort) and O(n) space.  
- Tradeoff: If sessions per user are huge, performance could degrade, but for practical n this is efficient.

### Corner cases to consider  
- Only one session for a user-type: cannot qualify.
- Consecutive sessions far apart (>12h): no output.
- Multiple qualifying session pairs: output user only once.
- Sessions of different types: only same-type sessions compare.
- Different users, same session_type: do not mix across users.
- Times given are unordered: must sort by session times for each group.
- Negative/out-of-order timestamps: input validation (typically clarified with interviewer).

### Solution

```python
from typing import List
from datetime import datetime, timedelta

def parse_time(t):
    # Assumes ISO-like format, e.g. '2024-06-18 10:15'
    return datetime.strptime(t, '%Y-%m-%d %H:%M')

def user_activities_within_time_bounds(sessions: List[List]) -> List[int]:
    # Group sessions by (user_id, session_type)
    from collections import defaultdict

    user_sessions = defaultdict(list)
    for user_id, start, end, session_type in sessions:
        user_sessions[(user_id, session_type)].append(
            (parse_time(start), parse_time(end))
        )

    result = set()
    # For each group, sort by session_start
    for (user_id, session_type), sess_list in user_sessions.items():
        sess_list.sort()
        prev_end = None
        for s_start, s_end in sess_list:
            if prev_end is not None:
                diff = (s_start - prev_end).total_seconds() / 3600
                if diff <= 12:
                    result.add(user_id)
                    break # Only need one qualifying pair
            prev_end = s_end

    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n = total number of sessions. Each user's sessions are sorted (log k per user; sum k = n), and each is processed in a single linear scan.
- **Space Complexity:** O(n), storing all sessions by user-type grouping, and O(u) for result set (u = unique user count).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle millions of sessions—what changes if the data cannot fit in memory?  
  *Hint: Think about streaming processing and external sorting, maybe database SQL.*

- What if "12 hours" is a variable—how would you generalize?  
  *Hint: Accept parameter for time delta, or store as column in a config.*

- Can you do this in a single SQL query efficiently?  
  *Hint: Use window functions like LAG or LEAD to access prior session’s end time on same partition, then filter.*

### Summary
This is a classic **group-by/sort + sliding window** pattern. Group and sort by keys to efficiently find qualifying pairs in O(n log n) time. The grouping/sorting by (user_id, session_type) is common in data-log analytics questions. Patterns here apply to session analysis, event sequence correlation, and many temporal database problems.