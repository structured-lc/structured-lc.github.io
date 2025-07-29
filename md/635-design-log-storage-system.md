### Leetcode 635 (Medium): Design Log Storage System [Practice](https://leetcode.com/problems/design-log-storage-system)

### Description  
Design a **log system** that:
- Stores log entries, each associated with a unique integer **ID** and a **timestamp** in "YYYY:MM:DD:HH:MM:SS" format.
- Supports two operations:
  - **put(id, timestamp):** Store a log entry with the given ID and timestamp.
  - **retrieve(start, end, granularity):** Return the IDs of all logs whose timestamps fall within [start, end] **inclusive**. The *granularity* parameter (e.g., "Year", "Day", "Hour") specifies how much of the timestamp is considered; any more precise part is ignored.
  
For example, if the *granularity* is "Day", only the year, month, and day fields are compared during retrieval (hours, minutes, and seconds are ignored) [1][2][3].

### Examples  

**Example 1:**  
Input:  
`put(1, "2017:01:01:23:59:59")`  
`put(2, "2017:01:01:22:59:59")`  
`put(3, "2016:01:01:00:00:00")`  
`retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year")`  
Output:  
`[1,2,3]`  
*Explanation: At "Year" granularity, only the first 4 chars are compared, so all three logs in 2016 and 2017 are included.*

**Example 2:**  
Input:  
`retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour")`  
Output:  
`[2,3]`  
*Explanation: At "Hour" granularity, the first 13 chars are checked. Only logs with timestamps between the given range at the hour level are included.*

**Example 3:**  
Input:  
`retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Second")`  
Output:  
`[]`  
*Explanation: No logs are present with timestamps exactly in the second-level range.*

### Thought Process (as if you’re the interviewee)  
- **Naive approach**: Store a list of `(id, timestamp)` pairs. On each retrieve, loop through all logs and, for each, check if the timestamp (up to the specified granularity) falls within the [start, end] range after truncating timestamp, start, and end at the correct granularity.
- **Granularity details**: Since timestamps are fixed-width and zero-padded, string slicing up to the necessary position for the granularity is sufficient. For example, for "Day", use timestamp[:10].
- **Optimizations**: If the number of logs is huge and retrieves are frequent, consider sorting logs or using a search structure (not required here, since naive loop meets constraints).
- Chose the naive loop due to simplicity and clarity. Further optimization only justified by tighter constraints.

### Corner cases to consider  
- Repeated calls to retrieve before any logs are inserted.
- Start/end outside the range of all logs.
- Multiple logs with the same timestamp.
- Start timestamp after end.
- All timestamps outside the truncation caused by granularity (e.g., logs in a different year when querying by "Day").
- Logs with leading zeroes or smallest/largest possible timestamps.

### Solution

```python
class LogSystem:
    def __init__(self):
        # Store (id, timestamp) tuples
        self.logs = []
        # Map granularity to their corresponding index in timestamp string
        self.granularity_idx = {
            'Year': 4,
            'Month': 7,
            'Day': 10,
            'Hour': 13,
            'Minute': 16,
            'Second': 19
        }

    def put(self, id: int, timestamp: str) -> None:
        # Add the log to storage
        self.logs.append((id, timestamp))

    def retrieve(self, start: str, end: str, granularity: str):
        idx = self.granularity_idx[granularity]
        # Truncate timestamps according to granularity
        start_cmp = start[:idx]
        end_cmp = end[:idx]
        results = []
        for id, ts in self.logs:
            ts_cmp = ts[:idx]
            # Compare string slices (zero-padded, so lex order works)
            if start_cmp <= ts_cmp <= end_cmp:
                results.append(id)
        return results
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `put`: O(1) per log.
  - `retrieve`: O(m), where m is the number of stored logs (since each retrieve iterates all logs).
- **Space Complexity:**  
  - O(m): one entry per log.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if the number of logs is huge and retrieval times become slow?  
  *Hint: Binary search on sorted logs, preprocess by granularity.*

- How would you support deletion of logs?  
  *Hint: Use a data structure that supports fast insert/delete (dict or tree).*

- Can this design be extended to support queries for logs "before"/"after" a timestamp, or to count logs efficiently?  
  *Hint: Use index or segment trees for range counts.*

### Summary
This solution applies a common pattern for **design questions with range retrieval** — store entries, and filter in O(n) per query. Slicing the timestamp by granularity leverages string ordering for zero-padded numbers, making comparison easy. This design pattern is broadly applicable to time-series storage and range queries where timestamp matches can be compressed to prefix matching.