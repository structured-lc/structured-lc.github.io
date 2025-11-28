### Leetcode 3508 (Medium): Implement Router [Practice](https://leetcode.com/problems/implement-router)

### Description  
Design a **Router** data structure to efficiently manage data packets in a network router.  
- Each packet has: **source** (int), **destination** (int), and **timestamp** (int).
- You are to implement:
  - **Router(memoryLimit)**: initializes with a capacity limit, i.e., the max number of packets the router can store at any time.
  - **addPacket(source, destination, timestamp)**: inserts a new packet. If adding exceeds memoryLimit, remove the oldest packet (by arrival/timestamp).
  - **forwardPacket()**: removes and returns the destination of the oldest packet. If empty, return -1.
  - **getCount(destination, startTime, endTime)**: returns the count of packets with *destination* value in the given inclusive time window `[startTime, endTime]`.

### Examples  

**Example 1:**  
Input:  
`["Router","addPacket","addPacket","getCount","forwardPacket","getCount"]`  
`[[2],[1,2,100],[3,2,105],[2,100,110],[],[2,100,110]]`  
Output:  
`[null,true,true,2,2,1]`  
Explanation:  
- Router(2) ← Limit 2 packets.  
- addPacket(1,2,100) → true. Stored: [(1,2,100)]  
- addPacket(3,2,105) → true. Stored: [(1,2,100),(3,2,105)]  
- getCount(2,100,110) → 2 (Both packets match dest=2 within time window)  
- forwardPacket() → 2 (removes (1,2,100), returns destination=2)  
- getCount(2,100,110) → 1 (Now only (3,2,105) remains, matches)  

**Example 2:**  
Input:  
`["Router","addPacket","addPacket","addPacket","addPacket"]`  
`[[2],[1,2,100],[1,2,105],[2,3,110],[4,4,120]]`  
Output:  
`[null,true,true,true,true]`  
Explanation:  
Router(2). Only 2 packets stored at any time.  
After each add:  
- [(1,2,100)]  
- [(1,2,100),(1,2,105)]  
- [(1,2,105),(2,3,110)]  (100 is evicted, oldest out)  
- [(2,3,110),(4,4,120)]  (105 is evicted)

**Example 3:**  
Input:  
`["Router","addPacket","forwardPacket","forwardPacket","forwardPacket"]`  
`[[1],[1,2,100],[],[],[]]`  
Output:  
`[null,true,2,-1,-1]`  
Explanation:  
- addPacket → stores (1,2,100)  
- forwardPacket() → returns 2  
- further forwardPacket() calls → -1 (since Router is empty)

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Start with a plain queue/list for packets. Forwarding and memory capping is simple: enqueue at tail, dequeue from head if over capacity.  
  For getCount, traverse the list to check all packets in O(n) time each call.

- **Bottleneck:**  
  getCount can be slow if many packets.

- **Optimization:**  
  To make **getCount(destination, startTime, endTime)** faster, maintain:
  - A queue (for order/eviction, forwardPacket).
  - For each destination, a *sorted list* (use bisect) of timestamps currently in router→ allows efficient count of timestamps within a range using binary search (O(log k) for k packets for that destination).

- **When evicting:**  
  Remove from both the queue and the per-destination structure.

- **Trade-offs:**  
  Pays a little storage and extra work on add-for-evict, but getCount becomes fast.

### Corner cases to consider  
- Add when router is at memory limit (must evict oldest).
- Forward from empty router (should return -1).
- GetCount when router is empty (should return 0).
- GetCount with a time window where no packets match.
- Packets with same destination and timestamps.
- Packets evicted before getCount is called.

### Solution

```python
from collections import deque, defaultdict
import bisect

class Router:
    def __init__(self, memoryLimit):
        # Queue for (source, destination, timestamp), storing packets in arrival order
        self.queue = deque()
        self.memoryLimit = memoryLimit
        # Map: destination → *sorted* list of timestamps present in router
        self.dest_times = defaultdict(list)

    def addPacket(self, source, destination, timestamp):
        # If memory limit reached, evict oldest packet
        if len(self.queue) == self.memoryLimit:
            old_source, old_dest, old_time = self.queue.popleft()
            # Remove old_time from sorted list for old_dest
            idx = bisect.bisect_left(self.dest_times[old_dest], old_time)
            self.dest_times[old_dest].pop(idx)
            # Clean up mapping if needed
            if not self.dest_times[old_dest]:
                del self.dest_times[old_dest]
        # Add new packet
        self.queue.append((source, destination, timestamp))
        # Insert timestamp into sorted list for destination
        bisect.insort(self.dest_times[destination], timestamp)
        return True

    def forwardPacket(self):
        if not self.queue:
            return -1
        source, destination, timestamp = self.queue.popleft()
        # Remove timestamp from sorted list for this destination
        idx = bisect.bisect_left(self.dest_times[destination], timestamp)
        self.dest_times[destination].pop(idx)
        if not self.dest_times[destination]:
            del self.dest_times[destination]
        return destination

    def getCount(self, destination, startTime, endTime):
        # Return count of timestamps ∈ [startTime, endTime] for this destination
        if destination not in self.dest_times:
            return 0
        times = self.dest_times[destination]
        left = bisect.bisect_left(times, startTime)
        right = bisect.bisect_right(times, endTime)
        return right - left
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `__init__`: O(1)
  - `addPacket`: O(log k), where k is the number of packets for that destination (for bisect.insort).
    - Includes eviction: removing from queue (O(1)) and per-destination list (O(log k)).
  - `forwardPacket`: O(log k), removal from per-destination list.
  - `getCount`: O(log k) for bisect (lower and upper bounds on a sorted list).
- **Space Complexity:**
  - O(n), where n is memoryLimit, as both the queue and dest_times together only store up to memoryLimit packets' info.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to handle billions of packets with frequent getCount calls?  
  *Hint: (Think about indexing, using external memory structures, sharding, or approximate counting.)*

- How would you support arbitrary attributes or generalized queries (e.g. get packets from source X to destination Y)?  
  *Hint: (Consider multi-level or composite-key mapping, maybe secondary indexes.)*

- How do you ensure thread-safety if multiple threads call these methods?  
  *Hint: (Consider locks/mutexes for queue and each map, or redesign for lock-free approaches.)*

### Summary
This problem uses a **queue** for FIFO eviction and per-destination **sorted lists** to enable fast time-window counting. The approach combines the **sliding window**, **binary search**, and **double data structure** patterns for efficient O(log n) queries. Variations of this structure are useful in real network routers, cache design, and sliding window analytics systems, where efficient eviction, lookup, and time-based queries are crucial.


### Flashcard
Maintain a queue for packet order and a hash map per destination with sorted timestamps for O(log n) range queries instead of O(n) traversal.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Design(#design), Queue(#queue), Ordered Set(#ordered-set)

### Similar Problems
