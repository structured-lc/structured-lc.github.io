### Leetcode 2756 (Hard): Query Batching [Practice](https://leetcode.com/problems/query-batching)

### Description  
Design a class **QueryBatcher** that batches multiple small queries into a single larger query, optimizing efficiency.  
- You’re given an asynchronous function `queryMultiple(keys)`, which takes an array of unique keys and immediately returns resolved values for each key.  
- Your **QueryBatcher** class should accept this function and an integer `t` (cooldown in ms, e.g., 100) in its constructor.
- When `getValue(key)` is called:
  - If the batcher is not in a cooldown period, immediately call `queryMultiple([key])` and return the value.
  - If in cooldown, queue the calls. When the cooldown ends, all queued requests are grouped as one batch and sent together via `queryMultiple(keys)`.

The goal is to batch as many queries as possible within each cooldown interval.

### Examples  

**Example 1:**  
Input:  
``queryMultiple = async function(keys) { return keys.map(key => key + '!'); }``,  
``t = 100``  
``calls = [ {"key": "a", "time": 10}, {"key": "b", "time": 20}, {"key": "c", "time": 30} ]``  
Output:  
``[ {"resolved": "a!", "time": 10}, {"resolved": "b!", "time": 110}, {"resolved": "c!", "time": 110} ]``  
*Explanation: At t=10ms, 'a' is requested: there’s no cooldown, so it's executed immediately.
At t=20ms and t=30ms, 'b' and 'c' are requested during cooldown. They're queued.
At t=110ms, after cooldown, batch ('b', 'c') resolves together.*

**Example 2:**  
Input:  
``calls = [ {"key": "x", "time": 0}, {"key": "y", "time": 120}, {"key": "z", "time": 130} ]``  
Output:  
``[ {"resolved": "x!", "time": 0}, {"resolved": "y!", "time": 120}, {"resolved": "z!", "time": 220} ]``  
*Explanation: 'x' is immediate.  
'y' is after previous window.  
'z' is within cooldown window started by 'y', so it’s queued and resolved with next batch at t=220ms.*

**Example 3:**  
Input:  
``calls = [ {"key": "a", "time": 10}]``  
Output:  
``[ {"resolved": "a!", "time": 10} ]``  
*Explanation: Only one call, resolved immediately.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - For every call, invoke `queryMultiple([key])` immediately.  
  - This does not leverage batching and is inefficient.

- **Optimized Approach:**  
  - Use a queue to store pending requests during cooldown.
  - Track cooldown status:  
    - If idle, process immediately and start cooldown timer.
    - If cooling down, enqueue the request; when cooldown ends, process all queued requests in one batch.
  - Store, for each queued key, a promise resolver to later resolve them individually since the API returns one value per key.
- **Trade-offs:**  
  - This approach balances latency (immediate response for the first in a batch) and efficiency (batching others).
  - Edge case: batched calls should resolve at the cooldown's end, not before, and must resolve in correct order.

### Corner cases to consider  
- Single query (no batching needed)
- Multiple queries at exactly same millisecond (should be batched if not cooling down)
- Rapid sequences faster than t ms (all should batch)
- Delayed query after idle (should execute immediately)
- No calls at all (no action required)
- Queries with duplicate keys (guaranteed unique per constraints)

### Solution

```python
import asyncio

class QueryBatcher:
    def __init__(self, queryMultiple, t):
        # Store the provided async batch function and cooldown ms
        self.queryMultiple = queryMultiple
        self.t = t

        # Internal state
        self.cooldown = False  # True if batching window active
        self.queue = []        # List of dicts: {'key': k, 'future': Future}
        self.loop = asyncio.get_event_loop()

    async def getValue(self, key):
        # If not cooling down, handle this key immediately and start cooldown
        if not self.cooldown:
            self.cooldown = True
            res = await self.queryMultiple([key])
            # Start a timer to process any new requests during t ms
            self.loop.call_later(
                self.t / 1000, asyncio.create_task, self._flush_queue()
            )
            return res[0]

        # If cooling down, queue up this request and return result via Future
        fut = self.loop.create_future()
        self.queue.append({'key': key, 'future': fut})
        return await fut

    async def _flush_queue(self):
        # If any queued keys, batch-query and resolve their Futures
        if self.queue:
            keys = [item['key'] for item in self.queue]
            results = await self.queryMultiple(keys)
            for item, value in zip(self.queue, results):
                # Resolve the queued Future
                item['future'].set_result(value)
            self.queue.clear()
        self.cooldown = False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each of n calls is processed once, batch or individual; queryMultiple is called at most n times.
- **Space Complexity:** O(n)  
  - In worst-case, all requests arrive very close together and are held in queue; O(n) extra for queues and Futures.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle duplicate keys in the input?  
  *Hint: What if duplicate keys are allowed but should resolve only once per batch? Use a map from key to all their callbacks.*

- What if queryMultiple is slow or unreliable (i.e., can throw exceptions)?  
  *Hint: Consider error handling and rejecting all related promises if batch call fails.*

- If scaling to many users, how would you ensure efficiency under very high request rates?  
  *Hint: Discuss upper bound on batch size, multi-threading, or rate-limiting client-side or server-side.*

### Summary
This problem is a **batching pattern**, commonly used in systems that amortize overhead for multiple similar requests (e.g., database access, network requests, or caching layers). It balances responsiveness and efficiency, and is a typical pattern in high-concurrency backends or APIs. The approach is easily adapted for key deduplication, timeouts, size limits, or error handling.


### Flashcard
Queue requests during cooldown, batch process all queued keys when cooldown ends to minimize API calls.

### Tags

### Similar Problems
