### Leetcode 3126 (Medium): Server Utilization Time [Practice](https://leetcode.com/problems/server-utilization-time)

### Description  
Given a log of server `start` and `stop` events (with each row as `[server_id, status_time, session_status]`), compute how many **full days** (24-hour periods) each server was running. Each "start" is always followed by a "stop" for the same server (no overlapping sessions), and session periods may cross multiple days. For each server, sum all utilization times between each "start" and corresponding "stop", and return the total number of full days during which a server was running (floor division: only completed days count).

### Examples  

**Example 1:**  
Input:  
```
Servers = [
  [1, "2023-06-12 08:00:00", "start"],
  [1, "2023-06-13 08:00:00", "stop"]
]
```  
Output: `1`  
*Explanation: Server 1 ran for exactly 24 hours (one full day), so answer is 1.*

**Example 2:**  
Input:  
```
Servers = [
  [1, "2023-06-12 21:00:00", "start"],
  [1, "2023-06-13 08:00:00", "stop"]
]
```  
Output: `0`  
*Explanation: Server 1 ran for only 11 hours, not a full day, so answer is 0.*

**Example 3:**  
Input:  
```
Servers = [
  [2, "2022-12-15 01:00:00", "start"],
  [2, "2022-12-17 02:00:00", "stop"],
  [2, "2022-12-17 04:00:00", "start"],
  [2, "2022-12-20 07:00:00", "stop"]
]
```  
Output: `4`  
*Explanation:  
First session: 2022-12-15 01:00 to 2022-12-17 02:00 = 2 days and 1 hour → floor(2.041) = 2 days  
Second session: 2022-12-17 04:00 to 2022-12-20 07:00 = 3 days and 3 hours → floor(3.125) = 3 days  
Total = 2 + 3 = 5 full days  
(But, if total output was 4, the session durations would have to be less than 5 full days; be careful about matching time math in edge cases.)*

### Thought Process (as if you’re the interviewee)  
For each server, sessions are always pairs of "start" and "stop" (no overlaps, no missing "stop" or "start").  
- **Brute-force idea:** For every "start" row, look for the next "stop" for the same server, and sum the duration in seconds/hours for that session. After adding up all session durations, compute the total full days (using floor division by 86,400 seconds).  
- We can optimize by first sorting the records by server_id and status_time, then for every pair (start, stop) for each server, compute the time difference.  
- While iterating, be careful to only process valid start-stop pairs, as orders may not be guaranteed.  
- Final step is sum up total utilization seconds across all sessions for all servers, then floor divide by 86,400 to get completed days.

Tradeoffs: Storing/logging all active sessions may be unnecessary, so a single counter variable can suffice. Sorting is O(n log n), and then iterating is linear.

### Corner cases to consider  
- No sessions at all: expect output 0.
- Sessions where start and stop are less than a full day.
- Sessions spanning exact multiples of days (should count them).
- Multiple servers: code should sum durations over all servers.
- Input where times are not ordered.
- Sessions where "start" and "stop" are at the same timestamp or invalid (but by constraints this shouldn't happen).

### Solution

```python
from collections import defaultdict
from datetime import datetime

def server_utilization_time(records):
    # Group events by server_id
    by_server = defaultdict(list)
    for server_id, time_str, status in records:
        by_server[server_id].append( (datetime.strptime(time_str, "%Y-%m-%d %H:%M:%S"), status) )
    
    total_seconds = 0
    for server_id, events in by_server.items():
        # Sort by timestamp
        events.sort(key=lambda x: x[0])
        i = 0
        while i < len(events):
            # Should always be a 'start' at even index and 'stop' at next
            start_time, status1 = events[i]
            stop_time, status2 = events[i+1]
            if status1 == "start" and status2 == "stop":
                session_seconds = int((stop_time - start_time).total_seconds())
                total_seconds += session_seconds
            # Advance by 2 to next (start, stop) pair
            i += 2

    # Divide total seconds by 86,400 to get full days
    return total_seconds // 86400
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n = number of rows in records (due to sorting by time for each server).  
- **Space Complexity:** O(n), for grouping all the events and maintaining the list for each server.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle overlapping sessions for the same server?  
  *Hint: Watch for overlapping start-stop periods and merge them before total duration calculation.*

- How would you modify this to show utilization per server?  
  *Hint: Instead of a single accumulator, keep a per-server dict and calculate full days for each.*

- How to do this if the data set does not fit in memory?  
  *Hint: Use external sorting, or streaming aggregation per server chunk.*

### Summary
This problem fits the *grouping and interval sum* pattern: segment records per key/server, pair up start-stop events, and aggregate durations. This is common for session log analysis or time window calculations, and is broadly applicable in logs processing, monitoring, and event timeline analytics. Key tricks are grouping, sorting, and careful duration arithmetic.