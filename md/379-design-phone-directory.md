### Leetcode 379 (Medium): Design Phone Directory [Practice](https://leetcode.com/problems/design-phone-directory)

### Description  
Design a phone directory that manages a pool of available phone numbers from 0 to maxNumbers-1.  
You should support:
- **get()**: Provide an available number that hasn’t been assigned yet. Return -1 if none is available.
- **check(number)**: Return true if number is available, false if assigned.
- **release(number)**: Recycle/release the number so it’s available for future get calls.

The directory must efficiently allocate, check, and release phone numbers.

### Examples  

**Example 1:**  
Input:  
```
directory = PhoneDirectory(3)
directory.get()
directory.get()
directory.check(2)
directory.get()
directory.check(2)
directory.release(2)
directory.check(2)
```
Output:  
```
0
1
True
2
False
None
True
```
*Explanation:*
- directory initialized with 0,1,2.
- First get gives 0 (now assigned).
- Second get gives 1.
- check(2) is True (2 is available).
- Third get gives 2.
- check(2) is False (2 has been assigned).
- release(2) returns None (2 is now available).
- check(2) is True (2 is back in the pool).

**Example 2:**  
Input:  
```
directory = PhoneDirectory(1)
directory.get()
directory.get()
directory.check(0)
directory.release(0)
directory.get()
```
Output:  
```
0
-1
False
None
0
```
*Explanation:*
- Only one number (0) available. First get gives 0, next get returns -1 (empty pool).
- check(0) is False (already assigned).
- release(0) puts 0 back in the pool.
- get() can now return 0 again.

**Example 3:**  
Input:  
```
directory = PhoneDirectory(2)
directory.release(0)
directory.get()
directory.get()
directory.get()
```
Output:  
```
None
0
1
-1
```
*Explanation:*
- Releasing a number that was never assigned does nothing (safe).
- get() gives 0 and 1, then next get returns -1 (all assigned).

### Thought Process (as if you’re the interviewee)  

Brute-force approach:  
- Store a list/array for all numbers, and a parallel boolean mask to track if each number is assigned.
  - On get(), search for the first unassigned, mark it assigned.
  - On check(), just lookup status.
  - On release(), mark as unassigned.
  - Downside: get() could be O(n)—slow for large n.

Optimized:  
- To achieve O(1) for all operations:
  - Use a queue (or set) to store available numbers.
  - Use a set (or array) to track which numbers are in the pool.
  - get(): pop from queue.
  - check(): lookup presence in set.
  - release(): if not yet in pool, push to queue and add to set.
- This supports efficient constant time for all operations; trade-off is slightly higher space for the set/queue.

I will use a queue (collections.deque) for available numbers, and a set for quick checks.

### Corner cases to consider  
- release(number) when number is already available: don’t add duplicates.
- get() when pool is empty: must return -1.
- check(number) for numbers outside [0, maxNumbers-1]: should handle gracefully.
- release(number) for out-of-bounds numbers: should ignore/do nothing.
- Multiple calls to release for the same number: should be idempotent.

### Solution

```python
from collections import deque

class PhoneDirectory:
    def __init__(self, maxNumbers):
        # All numbers start in available queue
        self.available = deque(range(maxNumbers))
        # Set to track which numbers are currently available
        self.available_set = set(range(maxNumbers))
        # For range checks
        self.maxNumbers = maxNumbers

    def get(self):
        if not self.available:
            return -1
        num = self.available.popleft()
        self.available_set.remove(num)
        return num

    def check(self, number):
        if 0 <= number < self.maxNumbers:
            return number in self.available_set
        return False  # out-of-range numbers are never available

    def release(self, number):
        if 0 <= number < self.maxNumbers and number not in self.available_set:
            self.available.append(number)
            self.available_set.add(number)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - get(): O(1) (pop from queue, remove from set)
  - check(): O(1) (set lookup)
  - release(): O(1) (membership + insert)
- **Space Complexity:**  
  - O(n) for storing the queue and set, where n = maxNumbers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the phone directory had to support billions of numbers?
  *Hint: Can you use a more space-efficient data structure or lazy allocation?*

- How would you persist or restore the allocated/available state for fault-tolerance?
  *Hint: Can you serialize the state and recover reliably?*

- Can the approach be made thread-safe for concurrent multi-threaded usage?
  *Hint: Think about locking or atomicity.*

### Summary  
This problem uses the **Queue/Set pattern**, allowing for efficient allocation, checking, and recycling of unique resources.  
It's a typical **resource pool management** scenario and can be applied to inventory management, session usage, or generating unique IDs in real-time systems. The combination of deque and set is a common technique for handling unique assignments and fast lookup.

### Tags
Array(#array), Hash Table(#hash-table), Linked List(#linked-list), Design(#design), Queue(#queue)

### Similar Problems
- Seat Reservation Manager(seat-reservation-manager) (Medium)