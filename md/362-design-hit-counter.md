### Leetcode 362 (Medium): Design Hit Counter [Practice](https://leetcode.com/problems/design-hit-counter)

### Description  
Design a **hit counter** that records hits at given timestamps (in seconds) and can quickly return the number of hits received in the past 5 minutes (i.e., the last 300 seconds) from any given timestamp. The system should support:
- `hit(timestamp)`: Log a hit at a specific timestamp.
- `getHits(timestamp)`: Return the number of hits recorded in the last 300 seconds **up to and including** the given timestamp.
Timestamps are provided in non-decreasing order and multiple hits can be logged at the same second.

### Examples  

**Example 1:**  
Input:  
`["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]`,  
`[[], [1], [2], [3], [4], , , ]`  
Output:  
`[null, null, null, null, 3, null, 4, 3]`  
Explanation:  
```
hit(1)   # log at 1s
hit(2)   # log at 2s
hit(3)   # log at 3s
getHits(4)   # 3 hits occurred in [4-299,4] = [1,4] => Output: 3
hit(300)     # log at 300s
getHits(300) # hits in [1,300]: hits at 1,2,3,300 => Output: 4
getHits(301) # hits in [2,301]: hits at 2,3,300 => Output: 3
```

**Example 2:**  
Input:  
`["HitCounter","getHits"]`,  
`[[],]`  
Output:  
`[null, 0]`  
Explanation:  
No hits have been logged yet when queried at timestamp 100.

**Example 3:**  
Input:  
`["HitCounter","hit","getHits"]`,  
`[[],[1700],[2100]]`  
Output:  
`[null, null, 0]`  
Explanation:  
A single hit was logged at 1700, but getHits(2100) only considers hits in [1801,2100].

### Thought Process (as if you’re the interviewee)  
At first, I could use a list to store *all* timestamps of hits. Each time `getHits(timestamp)` is called, I would filter for timestamps within the last 300 seconds and count them.
- **Downside:** If millions of calls, time and space are O(n).

To optimize, I notice:
- The last 300 seconds is a fixed-size window.
- I only care about "aggregate" hit count per second, not the exact sequence.
- Timestamps are always provided in increasing order.

**Circular Array Approach**:  
- Use two arrays of length 300:  
  - `times` — the timestamp stored for each slot
  - `counts` — # hits at that second  
- For each hit:
  - Use `ts % 300` for the index
  - If `times[idx]` is not the current timestamp, reset `counts[idx] = 1`, else increment
- For getHits:
  - Add `counts[i]` if `times[i]` is within 300 seconds of now

**Tradeoffs:**
- Pros: O(1) for hit and getHits, and fixed O(1) extra space
- Cons: Only works if timestamps move forward in time and within integer limits

### Corner cases to consider  
- No hits logged in the last 300 seconds (getHits should return 0)
- Many hits at the same timestamp (counts accumulates properly)
- getHits at exactly 300 seconds after first hit: only 1st hit should be ousted
- Sparse hits: e.g., hit(50), hit(100), getHits(600)
- Multiple `hit(t)` at same second

### Solution

```python
class HitCounter:
    def __init__(self):
        # For 300 seconds: index = timestamp % 300
        self.times = [0] * 300   # stores the last timestamp for the slot
        self.counts = [0] * 300  # counts of hits at that timestamp

    def hit(self, timestamp: int) -> None:
        idx = timestamp % 300
        if self.times[idx] != timestamp:
            # New timestamp for this slot, reset
            self.times[idx] = timestamp
            self.counts[idx] = 1
        else:
            # Already used in this second
            self.counts[idx] += 1

    def getHits(self, timestamp: int) -> int:
        total = 0
        for i in range(300):
            # Only add if within 300 seconds window
            if timestamp - self.times[i] < 300:
                total += self.counts[i]
        return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) for `hit` and O(1) for `getHits`, since 300 is constant (only ever 300 iterations).
- **Space Complexity:** O(1) fixed, only 2×300 arrays needed.

### Potential follow-up questions (as if you’re the interviewer)  

- If hits can arrive out of order, or there's backfilling, how would you modify the solution?  
  *Hint: Consider a self-cleaning queue or binary search on timestamped structures.*

- What if you want to support windows much larger than 5 minutes efficiently?  
  *Hint: Bucketing and summarization, or using a Dynamic Segment Tree.*

- How to handle extremely high hit rates (millions per second)?  
  *Hint: Use integer counters and sharding at the infrastructure level.*

### Summary
This approach uses a **fixed-size circular buffer pattern**, counting hits in each second modulo 300 for O(1) operations and space. It’s an example of "time window aggregation" and is also applicable to rate limiting, moving window averages, or "sliding window" algorithm design where only a fixed interval of event history matters.

### Tags
Array(#array), Binary Search(#binary-search), Design(#design), Queue(#queue), Data Stream(#data-stream)

### Similar Problems
- Logger Rate Limiter(logger-rate-limiter) (Easy)