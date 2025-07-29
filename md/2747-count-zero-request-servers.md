### Leetcode 2747 (Medium): Count Zero Request Servers [Practice](https://leetcode.com/problems/count-zero-request-servers)

### Description  
Given **n** servers (numbered 0 to n-1), each of which may receive network requests over time, you are given:
- `logs`, where each entry is `[server_id, time]`, indicating the iᵗʰ request is handled by server `server_id` at timestamp `time`.
- An integer `x`. For each query, a server is considered "busy" if it has processed at least one request in the interval `[query - x, query]`.
- A list of `queries`, each being a timestamp.

For each `query`, **count how many servers did not process any request in `[query - x, query]`**. Return a list where the iᵗʰ value is the number of zero-request servers for `queries[i]`.

### Examples  

**Example 1:**  
Input: `n = 3, logs = [[1,3],[2,6],[1,5]], x = 5, queries = [10,11]`  
Output: `[1,2]`  
*Explanation:*

- For `queries=10` (interval [5,10]):  
  Server 1: request at 5 (inside interval)  
  Server 2: request at 6 (inside interval)  
  Server 0: no request in [5,10] → **counts as zero-request**  
  → 1 server

- For `queries[1]=11` (interval [6,11]):  
  Server 1: no request in [6,11]  
  Server 2: request at 6  
  Server 0: no request  
  → servers 1 and 0 have no request → **2 servers**

**Example 2:**  
Input: `n = 3, logs = [[2,4],[2,1],[1,2],[0,1]], x = 2, queries = [3,4]`  
Output: `[0,1]`  
*Explanation:*

- For `queries=3` (interval [1,3]):  
  Each server handles a request at time 1, 2, or 4 (but 4 is outside interval), so all have at least one within interval → **0 servers**

- For `queries[1]=4` (interval [2,4]):  
  Server 2: request at 4 (inside interval)  
  Server 1: request at 2 (inside interval)  
  Server 0: last request at 1 (outside interval)  
  Only server 0 is zero-request → **1 server**

**Example 3:**  
Input: `n = 2, logs = [], x = 10, queries = [5,10]`  
Output: `[2,2]`  
*Explanation:*

- No requests at all. So for both queries, both servers are zero-request.

### Thought Process (as if you’re the interviewee)  

Let's first think of the brute-force approach:
- For each query, check every server and see if it has any request in `[query - x, query]`. For each server, scan all the logs to look for qualifying requests.
- This is O(len(queries) × n × len(logs)), which is inefficient if any dimension is large.

Optimization:
- Can we preprocess logs per server for faster interval queries?
  - For each server, store the times it received requests (sorted).
  - For each query, for each server, binary search to check if it has a request in interval `[query - x, query]`.
  - This brings us to O(len(queries) × n × log L), where L = number of logs/server.

Even more optimal:
- Since both queries and logs can be sorted by time, can we use a sliding window over logs for all queries (offline processing)?
  - Sort queries and logs by time.
  - As we process increasing query times, maintain a sliding window of logs inside interval `[query - x, query]`:
    - For each query, keep a count of how many logs each server has inside current window.
    - Servers with count zero are the answer for that query.
  - This is more efficient for large data due to once-through log and query lists.

I would choose the sliding window approach for best efficiency and real problem sizes/tradeoffs, since saving repeated per-server per-query binary search if there are many logs.

### Corner cases to consider  
- No logs at all: All servers are zero-request for any query.
- Some servers never get a request.
- Multiple requests for a server in the same interval.
- Overlapping/lapping queries.
- x = 0: Only requests occurring exactly at query time counted.
- n = 1 or n = 0 (though n = 0 is typically not allowed).

### Solution

```python
def countServers(n, logs, x, queries):
    # Attach query original indices for output order restoration
    qlist = sorted([(q, i) for i, q in enumerate(queries)])
    logs.sort(key=lambda e: e[1])
    
    ans = [0] * len(queries)
    left = 0   # left of sliding window
    cnt = [0] * n  # Server request count in current window
    inside = 0     # How many servers currently have at least one request
    j = 0          # right sliding window pointer over logs
    
    for query_time, q_idx in qlist:
        # Move right end: include logs within [query_time - x, query_time]
        while j < len(logs) and logs[j][1] <= query_time:
            server = logs[j][0]
            cnt[server] += 1
            if cnt[server] == 1:
                inside += 1
            j += 1
        # Move left end: exclude logs before (query_time - x)
        while left < len(logs) and logs[left][1] < query_time - x:
            server = logs[left][0]
            cnt[server] -= 1
            if cnt[server] == 0:
                inside -= 1
            left += 1
        ans[q_idx] = n - inside  # Zero-request servers are those not in window

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting logs: O(L log L)  
  - Sorting queries: O(Q log Q)  
  - Sliding window: O(L + Q)  
  - Overall: O(L log L + Q log Q), where L = len(logs), Q = len(queries)

- **Space Complexity:**  
  - O(n) for `cnt` array  
  - O(Q) for output and query-indexed queries

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if each query interval was NOT fixed length x, but given as individual `[start, end]` per query?  
  *Hint: Custom interval support may break the sweep-line optimization; consider binary search on logs per server.*

- What if queries arrive online (one by one), not all at once?  
  *Hint: We can't process offline/slide ahead; may need per-query binary search if logs are processed.*

- Can you return *which* servers are zero-request for each query, not just how many?  
  *Hint: Instead of just a count, collect the ids of servers with zero requests in the window.*

### Summary
This problem uses the **offline query sliding window technique** — a common pattern for handling interval queries on time-sorted data, achieving much better performance versus naive per-query search by leveraging pre-sorting and a moving window. It's a template that applies to any problem where queries and updates are both time-based and queries are given upfront (offline), such as range queries, minimum/maximum-in-window, and interval frequency counts.