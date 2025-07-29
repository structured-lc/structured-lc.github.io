### Leetcode 2622 (Medium): Cache With Time Limit [Practice](https://leetcode.com/problems/cache-with-time-limit)

### Description  
Design a class **TimeLimitedCache** that behaves like a key-value store where each key-value pair has a time-to-live (expiration) in milliseconds.  
- `set(key, value, duration)`: Store key→value for `duration` ms. If the key is new or expired, return `false`. If it’s already active, update the value and duration, return `true`.
- `get(key)`: If a key is still active (not expired), return its value; otherwise, return -1.
- `count()`: Return the number of non-expired keys currently in the cache.  

All operations should ensure expired keys are not counted or accessed. Expiry is managed per-key and time is measured in milliseconds since current operation.

### Examples  

**Example 1:**  
Input:  
actions=`["TimeLimitedCache", "set", "get", "count", "get"]`,  
values=`[[], [1, 42, 100], [1], [], [1]]`,  
timeDelays=`[0, 0, 50, 50, 150]`

Output:  
`[null, false, 42, 1, -1]`  
Explanation:  
At t=0, `TimeLimitedCache` is constructed.  
At t=0, `.set(1, 42, 100)` → false (key is new, inserted for 100 ms).  
At t=50, `.get(1)` → 42 (within expiry window).  
At t=50, `.count()` → 1 (key 1 is still valid).  
At t=100, key 1 expires.  
At t=150, `.get(1)` → -1 (key expired).

**Example 2:**  
Input:  
actions=`["TimeLimitedCache","set","set","get","count"]`,  
values=`[[], [1, 10, 20], [1, 20, 30], [1], []]`,  
timeDelays=`[0, 0, 10, 25, 30]`

Output:  
`[null, false, true, 20, 1]`  
Explanation:  
At t=0, construct cache.  
At t=0, `.set(1, 10, 20)` → false (key is new).  
At t=10, `.set(1, 20, 30)` → true (overwrites value and duration since not expired).  
At t=25, `.get(1)` → 20 (value is the updated one, still active).  
At t=30, `.count()` → 1 (key still valid, expires at t=40).

**Example 3:**  
Input:  
actions=`["TimeLimitedCache","get","count"]`,  
values=`[[], [5], []]`,  
timeDelays=`[0, 0, 10]`

Output:  
`[null, -1, 0]`  
Explanation:  
At t=0, constructed.  
At t=0, `.get(5)` → -1 (nothing stored).  
At t=10, `.count()` → 0 (cache is empty).

### Thought Process (as if you’re the interviewee)  
First, each key needs to be stored **with its expiry timestamp** so that expired keys are ignored by all operations.  
- For `set`, check if the key exists and is not expired. If so, update it and return true; otherwise, insert and return false.
- For `get`, check if the key exists and is not expired, or else return -1.
- For `count`, count the number of keys still valid.
A simple dictionary/hashmap will suffice, mapping key → (value, expiry_time). Every access (set/get/count) must check the expiry and optionally clean up expired keys.
- To simulate expiry, store the absolute expiration time (e.g. `current_time + duration`).  
- On each operation, prune expired keys as needed for correctness.

Brute-force: On each operation, remove all expired keys by iterating the whole cache — feasible because max 100 keys.  
Optimized: Could use a priority queue to remove expired keys faster for larger scale, but unnecessary for constraints here.

### Corner cases to consider  
- Multiple `set` on same key with overlapping/non-overlapping durations  
- Expired key should be treated as “absent” for all operations  
- `count()` when all/some/no keys are expired  
- `get` on missing/expired keys  
- `set` with zero duration (immediately expires)  
- Large delays between operations  
- Duration overlap/extension/replacement for same key

### Solution

```python
# LeetCode uses JavaScript for this problem, but here is a Python version with similar logic.

import time

class TimeLimitedCache:
    def __init__(self):
        # key -> (value, expiration_time)
        self.cache = {}
    
    def set(self, key: int, value: int, duration: int) -> bool:
        now = int(time.time() * 1000)
        expired = (key not in self.cache) or (self.cache[key][1] <= now)
        # Insert/update with new expiration time
        self.cache[key] = (value, now + duration)
        # Return true if updated an existing unexpired key, false otherwise
        return not expired

    def get(self, key: int) -> int:
        now = int(time.time() * 1000)
        if key in self.cache and self.cache[key][1] > now:
            return self.cache[key][0]
        # Remove expired key if present
        if key in self.cache and self.cache[key][1] <= now:
            del self.cache[key]
        return -1

    def count(self) -> int:
        now = int(time.time() * 1000)
        # Prune expired keys
        expired_keys = [k for k, (_, expiry) in self.cache.items() if expiry <= now]
        for k in expired_keys:
            del self.cache[k]
        # Remaining keys are unexpired
        return len(self.cache)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `set`: O(1) (setting value in dictionary, simple expiry check)
  - `get`: O(1) (key lookup, expiry check)
  - `count`: O(N) in worst case (needs to scan and remove expired keys; N = number of keys in cache)
- **Space Complexity:**  
  - O(N) for the storage of all active/non-expired keys.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed to support thousands or millions of keys efficiently?  
  *Hint: Think about how to remove expired keys more efficiently than scanning all keys every time.*

- Could this cache survive a server restart?  
  *Hint: Is there a way to persist data and restore expirations?*

- What happens if two sets come in for the same key at nearly the same time?  
  *Hint: Consider the thread-safety or atomicity of your solution in concurrent environments.*

### Summary
This problem is a classic example of the **hashmap time-based cache** pattern, adding per-key expiration logic.  
The solution shows how to manage stateful data with expiry, and maintain “active” data by pruning expired entries.  
Variants of this pattern occur in session management, in-memory TTL caches, rate limiting, etc.  
The trade-off is simplicity/efficiency for small sets; for larger data, one may introduce a heap or scheduling mechanism for quick global expiry.