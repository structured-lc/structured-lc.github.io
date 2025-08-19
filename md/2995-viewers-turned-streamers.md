### Leetcode 2995 (Hard): Viewers Turned Streamers [Practice](https://leetcode.com/problems/viewers-turned-streamers)

### Description  
Given a sessions table with columns: user_id, session_type (either "Viewer" or "Streamer"), and session_start (timestamp), find users **whose very first session was as a Viewer** and, for each such user, **count how many of their sessions were as a Streamer**. Return the result as a table of [user_id, sessions_count], sorted by sessions_count (descending), then user_id (descending).

Core ask:
- Only users *whose first ever session* was as a "Viewer" are considered.
- For these users, count the number of their sessions of type "Streamer".
- Sort by: sessions_count ↓, then user_id ↓.

### Examples  

**Example 1:**  
Input=`[  
  [101, "Viewer", "2023-04-01 10:00"],  
  [101, "Streamer", "2023-04-03 12:00"],  
  [102, "Streamer", "2023-04-01 09:00"],  
  [101, "Streamer", "2023-04-07 18:00"],  
  [103, "Viewer", "2023-04-01 10:10"]  
]`  
Output=`[  
  [101, 2]  
]`  
Explanation.  
- 101's first session is "Viewer" (so is eligible) and has 2 "Streamer" sessions.
- 102's first session is "Streamer" (excluded).
- 103 has only "Viewer" sessions, so 0 "Streamer" (excluded from output because at least one streamer session is needed).

**Example 2:**  
Input=`[  
  [201, "Viewer", "2024-01-02 08:00"],  
  [201, "Streamer", "2024-01-02 10:00"],  
  [201, "Streamer", "2024-01-02 13:00"],  
  [202, "Viewer", "2024-01-01 09:00"],  
  [202, "Viewer", "2024-01-01 13:00"],  
  [203, "Streamer", "2024-01-05 09:00"],  
]`  
Output=`[  
  [201, 2]  
]`  
Explanation.  
- 201 first session is "Viewer", 2 stream sessions.
- 202 only "Viewer" sessions, so not output (must have at least one "Streamer" session).
- 203 first session "Streamer", excluded.

**Example 3:**  
Input=`[  
  [301, "Streamer", "2023-12-25 20:00"],  
  [302, "Viewer", "2023-12-25 21:00"],  
  [303, "Viewer", "2023-12-26 22:00"],  
  [302, "Streamer", "2023-12-26 23:00"],  
  [303, "Viewer", "2023-12-27 22:00"],  
]`  
Output=`[  
  [302, 1]  
]`  
Explanation.  
- 302 first session: "Viewer", then 1 "Streamer" session.
- 303 first is "Viewer" but never streamed (output excludes users with zero "Streamer" sessions).
- 301 first session "Streamer", excluded.

### Thought Process (as if you’re the interviewee)  
- Start by grouping all sessions by user_id and ordering by session_start to find the first session for each user.
- Check which users’ first session_type is "Viewer".
- For these users, count how many of their sessions are "Streamer".
- Exclude users whose "Streamer" session count is zero.
- Finally, output [user_id, sessions_count], sort by sessions_count (desc), user_id (desc).

**Brute-force:**
- For every user, sort sessions by time, inspect the first.
- If "Viewer", filter further for that user’s "Streamer" sessions.
- O(n log n) per user due to sorting.

**Optimized:**
- Use a pre-pass: for each user, always track their earliest session; after all data loaded, know which ones qualify.
- Then, for those, count streamer sessions in a second pass. 
- Two passes but only O(n) per pass if dicts are used.

**Why this approach?**
- No need for complex structures; just use standard dicts for first session and counting.
- Sorting can be avoided by single pass storing min timestamp per user.

### Corner cases to consider  
- Users with only Viewer sessions (should be excluded from output).
- Users whose first session is Streamer (excluded entirely).
- Timestamps not sorted in the input (must sort within users).
- Multiple users with same number of streamer sessions and tie on user_id.
- Exactly one session per user (either Viewer or Streamer).
- Duplicate sessions or sessions at the same time (spec undefined, but should handle).
- Empty input.

### Solution

```python
def viewers_turned_streamers(sessions):
    # Store first session per user: user_id -> (session_type, session_start)
    first_session = {}
    # Store all streamer sessions per user
    streamer_count = {}

    for user_id, session_type, session_start in sessions:
        # Parse time for correct ordering if needed
        # If timestamp in format "YYYY-MM-DD HH:MM", it is lexicographically sortable
        if (user_id not in first_session) or (session_start < first_session[user_id][1]):
            first_session[user_id] = (session_type, session_start)

    for user_id, session_type, session_start in sessions:
        # Only consider if user's first session is "Viewer"
        if first_session[user_id][0] == "Viewer" and session_type == "Streamer":
            if user_id not in streamer_count:
                streamer_count[user_id] = 0
            streamer_count[user_id] += 1

    # Build output: only users with >=1 streamer session
    out = []
    for user_id, count in streamer_count.items():
        out.append([user_id, count])

    # Sort: sessions_count desc, then user_id desc
    out.sort(key=lambda x: (-x[1], -x[0]))

    return out
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is number of sessions.
  - Two single-pass traversals through sessions plus O(k log k) for final sort where k is # of qualified users.
- **Space Complexity:** O(u), where u is the number of unique users (for first_session and streamer_count dicts, output array).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to include users with zero streamer sessions?  
  *Hint: Carefully check the filter in the code; possibly include all users whose first session is "Viewer".*

- How would you do this if the dataset does not fit in memory?  
  *Hint: Consider grouping/sorting by user_id before processing, or using a DB.*

- Could this logic be expressed as a SQL query?  
  *Hint: Use window functions (like RANK/PARTITION) and CTEs to get first sessions and counts.*

### Summary
This problem is a *group-by and aggregation* challenge with a filtering twist—processing time-order per group. It’s common for reporting, log processing, and event stream analysis tasks in data engineering. The windowing/pivoting pattern and tracking “first” per-user appears in churn modeling, onboarding flows, and custom cohort analysis.

### Tags
Database(#database)

### Similar Problems
