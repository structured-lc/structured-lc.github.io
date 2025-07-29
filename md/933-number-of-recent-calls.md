### Leetcode 933 (Easy): Number of Recent Calls [Practice](https://leetcode.com/problems/number-of-recent-calls)

### Description  
You need to design a class **RecentCounter** that keeps track of the number of requests (or "pings") received within the last 3000 milliseconds. Specifically, the class should support:
- Initialization (`RecentCounter()`): starts empty.
- `ping(t)`: Registers a new ping at time ⓣ (measured in milliseconds), where ⓣ is always strictly greater than the previous ping’s timestamp. It returns the number of pings made in the inclusive range [ⓣ − 3 000, ⓣ], including the new ping itself.
- This problem essentially maintains a *sliding window* of the last 3 000 ms and efficiently counts pings that fall within that window[1][2][3].

### Examples  

**Example 1:**  
Input: `["RecentCounter", "ping", "ping", "ping", "ping"]`, ` [[], [1], , [3001], [3002]]`  
Output: `[null, 1, 2, 3, 3]`  
*Explanation:*  
- `RecentCounter()` → initializes the object.  
- `ping(1)` → only one ping in the window [−2999, 1], count = 1.  
- `ping(100)` → pings at 1, 100 in [−2900, 100], count = 2.  
- `ping(3001)` → pings at 1, 100, 3001 in [1, 3001], count = 3.  
- `ping(3002)` → pings at 100, 3001, 3002 in [2, 3002], count = 3.

**Example 2:**  
Input: `["RecentCounter", "ping", "ping", "ping"]`, `[[], , [3000], [3001]]`  
Output: `[null, 1, 2, 2]`  
*Explanation:*  
- `ping(10)` → [−2990, 10], 1 ping at 10.  
- `ping(3000)` → [0, 3000], pings at 10, 3000 → 2 pings.  
- `ping(3001)` → [1, 3001], pings at 3000, 3001 → 2 pings.

**Example 3:**  
Input: `["RecentCounter", "ping", "ping"]`, `[[], [1000], [4000]]`  
Output: `[null, 1, 1]`  
*Explanation:*  
- `ping(1000)` → [−2000, 1000], one ping at 1000.  
- `ping(4000)` → [1000, 4000], one ping at 4000 since 1000 is no longer in the window.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  For each `ping(t)`, iterate through all previous timestamps and count those in the range [t−3 000, t]. But this approach would be inefficient, especially as the number of pings grows.

- **Optimize with Queue:**  
  Because pings arrive in strictly increasing order, a *queue* (FIFO) can represent times inside the current 3 000 ms window:
  - Push new pings to the queue.
  - Remove (pop) from the front all pings with timestamp < (t−3 000).
  - The queue’s length now equals the number of valid requests in range.
  - This is efficient because each ping is inserted and removed at most once, leading to good overall performance[1][2][3][4].

- **Why this approach?**
  - Each time only recent requests are stored.
  - Operations are O(1) amortized for each ping.
  - Very space-efficient, keeping only what's needed.

### Corner cases to consider  
- Multiple pings at the edge of a window: Ensure only pings ≥ t−3 000 are counted.
- Consecutive pings at same distance apart.
- The first ping—no previous timestamps.
- Rapid, closely-packed pings, e.g., t, t+1, …, t+3000.
- Sparse pings, where gaps between them exceed 3000ms.

### Solution

```python
from collections import deque

class RecentCounter:
    def __init__(self):
        # Queue to store the timestamps of recent pings
        self.q = deque()

    def ping(self, t: int) -> int:
        # Add the new ping to the queue
        self.q.append(t)
        # Remove all pings outside the [t-3000, t] window
        while self.q and self.q[0] < t - 3000:
            self.q.popleft()
        # The queue contains only recent pings
        return len(self.q)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(1) amortized per `ping()`.  
  - Each ping is appended once, and each is removed only once.  
- **Space Complexity:** O(W), where W is the number of pings within a 3 000ms window.  
  - At most, only those pings are retained in memory.

### Potential follow-up questions (as if you’re the interviewer)  

- What if pings can arrive out of order?
  *Hint: How would your data structure/algorithm need to change if ordered timestamps were not guaranteed?*

- How would you modify this if the window size changed frequently?
  *Hint: Could you re-use the same queue structure, or would something more general help?*

- How to support retrieving the kth most recent call efficiently?
  *Hint: Does your current data structure make this fast? What about using a doubly-linked list or another approach?*

### Summary
This problem is a classic use of the **queue** data structure and the *sliding window* pattern. By maintaining only relevant elements (within a time window), we achieve excellent efficiency. The approach of popping stale elements and keeping only valid candidates is broadly useful in rate limiting, time-based caches, moving averages, and more.