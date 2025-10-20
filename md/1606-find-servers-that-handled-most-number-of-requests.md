### Leetcode 1606 (Hard): Find Servers That Handled Most Number of Requests [Practice](https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests)

### Description  
You have **k** servers (numbered 0 to k-1) handling incoming requests. Each request arrives at a certain time, and takes some time (the load) to process. Each server can process only one request at a time. For each request:
- Try to assign it to server (i % k), where i is the request's index.
- If that server is busy, try the next server (wrapping around if needed) until either an available server is found or all are busy.
- If all servers are busy, drop the request.
After all requests, return the server(s) that handled the most requests.

### Examples  

**Example 1:**  
Input: `k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3]`  
Output: `[1]`  
*Explanation:*
- Request 0 assigned to server 0 (busy until 6).
- Request 1: server 1 is available (busy until 4).
- Request 2: server 2 is available (busy until 6).
- Request 3: server 0 busy, try 1 (busy), try 2 (busy) – all busy ⇒ drop.
- Request 4: server 1 will be free at 4, and arrival is 5, so assign to 1 (busy until 8).
- Count: server 0 = 1, 1 = 2, 2 = 1. Busiest: [1].

### Thought Process (as if you’re the interviewee)  
- **Naive approach:** Simulate as given: for each request, iterate through servers starting at (i % k), check if available; assign if free. Track requests per server.
- **Optimization:** Naive is O(nk) and can be slow for large n or k. To speed up, keep two sorted structures:
    - (1) Heap for busy servers (ready time, server idx)
    - (2) Balanced tree/set/SortedList for available servers.
  At each request, release finished servers to available,
  then assign by searching for the next available >= (i % k), wrap if needed. This makes assignment O(log k) per request.
- **Trade-off:** Priority queue (heap) and balanced tree for efficient state management, small space usage for counters and heaps.

### Corner cases to consider  
- No requests, empty arrival/load arrays.
- All servers busy at all arrivals; all requests dropped.
- Multiple servers tie for max requests.
- Request arrives same time as server becomes free.

### Solution

```python
import heapq
from bisect import bisect_left, insort

def busiest_servers(k, arrival, load):
    n = len(arrival)
    res = [0]*k  # requests count for each server
    busy = []    # (end_time, server_idx)
    available = list(range(k))
    
    for i, (start, duration) in enumerate(zip(arrival, load)):
        # Free servers that have completed before now
        while busy and busy[0][0] <= start:
            end_time, idx = heapq.heappop(busy)
            insort(available, idx)  # Keep available sorted by index
        if not available:
            continue
        # Find the next available server >= (i % k)
        pos = bisect_left(available, i % k)
        server_idx = available[pos] if pos < len(available) else available[0]
        available.pop(pos if pos < len(available) else 0)
        res[server_idx] += 1
        heapq.heappush(busy, (start + duration, server_idx))
    max_req = max(res)
    return [i for i, cnt in enumerate(res) if cnt == max_req]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k): Each request might trigger a log k operation (insertion, removal). n = requests, k = servers.
- **Space Complexity:** O(k): busy and available lists, plus counter array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle requests if servers could process multiple in parallel (up to capacity)?  
  *Hint: Track how many are running at each server; use a different logic for freeing slots.*

- Suppose loads can be zero -- can two requests start at same time?  
  *Hint: Adjust server available logic for zero-duration (maybe use < instead of ≤ in your comparison).* 

- If you must process all requests in strict order, but the server selection can be parallelized, how would you redesign?  
  *Hint: Investigate parallel processing or use multi-threaded assignment for large n.*

### Summary
Efficient simulation using a heap (for busy servers) and sorted structure or balanced set (for available servers). Pattern is *sweep line/priority queue for asynchronous resource management*, common in interval scheduling, meeting rooms, or network request assignments.


### Flashcard
Use a min-heap for busy servers and a sorted set for available servers; at each request, release finished servers and assign the next available in round-robin order.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set)

### Similar Problems
- Meeting Rooms III(meeting-rooms-iii) (Hard)