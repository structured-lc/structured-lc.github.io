### Leetcode 1939 (Easy): Users That Actively Request Confirmation Messages [Practice](https://leetcode.com/problems/users-that-actively-request-confirmation-messages)

### Description  
Given a table of confirmation requests, each with a user_id, time_stamp, and action (such as "confirmed" or "timed out"), find all user_ids who have requested a confirmation message **twice within a 24-hour window** (including exactly 24 hours between requests). The action does not matter—only that the request was made. Return the user_ids in any order.

### Examples  

**Example 1:**  
Input:  
Confirmations table:  
| user_id | time_stamp           | action     |
|---------|----------------------|------------|
|   3     | 2021-06-06 03:30:46  | confirmed  |
|   3     | 2021-06-06 03:37:54  | timed out  |

Output: `[3]`  
*Explanation: User 3 made two requests within ~7 minutes, which is <24 hours.*

**Example 2:**  
Input:  
Confirmations table:  
| user_id | time_stamp           | action     |
|---------|----------------------|------------|
|   2     | 2021-06-12 11:57:29  | timed out  |
|   2     | 2021-06-13 11:57:29  | confirmed  |

Output: `[2]`  
*Explanation: User 2 made two requests exactly 24 hours apart. The problem states “exactly 24 hours apart are considered within the window.” So 2 is included.*

**Example 3:**  
Input:  
Confirmations table:  
| user_id | time_stamp           | action     |
|---------|----------------------|------------|
|   7     | 2021-06-12 11:57:29  | confirmed  |
|   7     | 2021-06-13 11:57:30  | timed out  |

Output: `[]`  
*Explanation: User 7 made requests 24 hours and 1 second apart, which is outside the window, so not included.*

### Thought Process (as if you’re the interviewee)  

- **First idea:** For each user, compare every possible pair of their requests, and check if the time difference is ≤ 24 hours (≤ 86400 seconds). If there’s at least one pair, they are included.
- **Naive implementation:** Use two nested loops to compare each request with every other for the same user. But for large data, this is inefficient (O(n²) per user).
- **Optimization:**  
    - For each user, sort their requests by time.
    - For each consecutive pair (or all forward pairs), check time difference.
    - Since earlier requests can only ever be more than 24 hours away from much later requests, this can be swept efficiently.
    - In SQL, use a self-join or a window function: for each row, find the next request for the same user and compare the time difference.
    - Only care about the time difference between requests, not about the action column: so, skip any filtering by action.

- **Final approach chosen:** For interview code, simulate the time sort and check consecutive (or all pairs) for each user. For SQL, use window functions or a self-join.

### Corner cases to consider  
- Only one request for a user: Should not be included.
- Requests exactly 24 hours apart: Should be included.
- Multiple requests within 24 hours: Still included; only need to find one such pair.
- Requests 24 hours and 1 second apart: Should NOT be included.
- Multiple users meeting the criteria: All should be listed.

### Solution

```python
from collections import defaultdict

def users_within_24hrs(confirmations):
    # confirmations: List of dicts with keys: 'user_id', 'time_stamp'

    # Pre-process: group timestamps per user
    from datetime import datetime

    user_times = defaultdict(list)
    for row in confirmations:
        user_id = row['user_id']
        time_stamp = row['time_stamp'] # String in format "YYYY-MM-DD HH:MM:SS"
        # Convert string to datetime for easy subtraction
        dt = datetime.strptime(time_stamp, "%Y-%m-%d %H:%M:%S")
        user_times[user_id].append(dt)

    result = []
    for user_id, times in user_times.items():
        # Sort timestamps
        times.sort()
        n = len(times)
        # For each pair (i, j) with i < j, check if difference ≤ 86400 seconds (24h)
        found = False
        for i in range(n):
            for j in range(i + 1, n):
                seconds = (times[j] - times[i]).total_seconds()
                if 0 < seconds <= 86400:  # strictly after, and within 24 hours
                    result.append(user_id)
                    found = True
                    break
            if found:
                break
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N²) worst-case per user (because of nested loops), but _usually_ much less if there are few requests per user.  
  If average user has k requests, across M users total of n requests: Approx O(n \* k)  
- **Space Complexity:** O(n), since all request times must be stored, and grouped by user.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize to only look at consecutive timestamps for each user?  
  *Hint: After sorting, only need to check each pair of adjacent timestamps for the minimal time difference.*

- What if you care about the “action” column (e.g., only "timed out" events)?  
  *Hint: Add a pre-filter on the action type before comparison.*

- How would you handle data if it doesn't fit in memory?  
  *Hint: Use streaming, external sorting, or database-like approaches.*

### Summary
This problem is an example of the "window within sorted events per group" pattern—grouping data by key (user), sorting by time, and finding if consecutive (or any) records fall within a time window. This pattern is common for logs, time series, event sequences, or fraud detection. The key coding idea is pre-sorting and then scanning, to avoid n² comparisons. It can be solved efficiently with window/lead functions in SQL, or a two-pointer technique after sorting in Python, and is directly related to sliding window or repeated events in data engineering problems.

### Tags
Database(#database)

### Similar Problems
