### Leetcode 1845 (Medium): Seat Reservation Manager [Practice](https://leetcode.com/problems/seat-reservation-manager)

### Description  
Design a system to handle seat reservations for a theater (or similar venue) with seats numbered from 1 to n.  
- You must always reserve the **smallest-numbered unreserved seat** when asked.
- When a seat is unreserved, it becomes available for reservation again.
- Support:
  - `reserve()`: Reserves and returns the smallest available seat number.
  - `unreserve(seatNumber)`: Makes a previously reserved seat available again.

---

### Examples  

**Example 1:**  
Input: `["SeatManager","reserve","reserve","unreserve","reserve","reserve","reserve","reserve"]`, `[ [5],[],[],[2],[],[],[],[] ]`  
Output: `[null,1,2,null,2,3,4,5]`  
*Explanation:*
- SeatManager(5) initializes seats [1,2,3,4,5] as available.
- reserve() → 1 (now, available: [2,3,4,5])
- reserve() → 2 (now, available: [3,4,5])
- unreserve(2) (available: [2,3,4,5])
- reserve() → 2 (now, available: [3,4,5])
- reserve() → 3 (now, available: [4,5])
- reserve() → 4 (now, available: [5])
- reserve() → 5 (now, available: [])

**Example 2:**  
Input: `["SeatManager","reserve","reserve","reserve","unreserve","reserve"]`, `[[2],[],[],[],[2],[]]`  
Output: `[null,1,2,3,null,2]`  
*Explanation:*
- SeatManager(2) → [1,2]
- reserve() → 1 ([2])
- reserve() → 2 ([])
- reserve() → 3 (error if n=2; but in contest system will not call more than n times without unreserving)
- unreserve(2) ([2])
- reserve() → 2 ([])

**Example 3:**  
Input: `["SeatManager","reserve","unreserve","reserve"]`, `[[1],[],[1],[]]`  
Output: `[null,1,null,1]`  
*Explanation:*
- Only seat 1 exists.
- reserve() → 1 ([])
- unreserve(1) ([1])
- reserve() → 1 ([])

---

### Thought Process (as if you’re the interviewee)  
First, brute-force:  
- Track reserved/unreserved using an array, scan 1..n each time to find the smallest unreserved seat.
- This would make reserve() O(n), which is too slow for large n.

Optimization:  
- We want O(log n) for both operations.
- Use a **min-heap** (priority queue) to always pop the smallest free seat efficiently.
- For constant time returns, keep a pointer `next` to the next sequential seat not yet reserved. For seats freed/unreserved out-of-order, add them into the min-heap.
- reserve():  
  - If the heap is not empty, pop and return the smallest seat from the heap.
  - Otherwise, return `next` and increment `next`.
- unreserve(seatNumber):  
  - Push seatNumber into the heap.

Trade-offs:
- The min-heap allows fast access to the next smallest freed seat, and sequential allocation of not-yet-reserved seats.
- Both operations are O(log k), where k is the number of unreserved (freed) seats in the heap—optimal for this type of query.

---

### Corner cases to consider  
- All seats are reserved, then unreserved, then reserved again (stress all branches).
- Unreserve the same seat more than once (problem states this won't happen, but code should not break).
- Reserve and unreserve operations are called in arbitrary order.
- n = 1 (only one seat).
- Call sequence causes heap to grow/shrink heavily.

---

### Solution

```python
import heapq

class SeatManager:
    def __init__(self, n):
        # Pointer to the next seat we can allocate (incremental allocation)
        self.next_seat = 1
        # Min-heap to manage seats that were freed (unreserved out of order)
        self.available = []

    def reserve(self):
        # If there are any unreserved seats in the heap, allocate the smallest one
        if self.available:
            return heapq.heappop(self.available)
        # Otherwise, assign the next sequential seat
        seat = self.next_seat
        self.next_seat += 1
        return seat

    def unreserve(self, seatNumber):
        # Add the seat back to the heap of available seats
        heapq.heappush(self.available, seatNumber)
```

---

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `reserve()`: O(log k) if the heap is used, O(1) if using next_seat (when no seat freed).
  - `unreserve()`: O(log k) for the heap push.
  - Thus, both operations are efficiently O(log n) worst-case.

- **Space Complexity:**
  - O(n) for the min-heap in the worst case (if all seats are unreserved out of order).
  - O(1) additional variables.

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle batch reservations/unreservations efficiently?
  *Hint: Is it possible to split and merge intervals or use segment trees/range-based structures?*

- What if reservations come with priority or user fairness guarantees?
  *Hint: Could you use additional queueing or mapping data structures?*

- How would you extend this to support more attributes (e.g., seat class, zones, user IDs)?
  *Hint: Is there a way to organize by multiple heaps or more complex mappings?*

---

### Summary

This solution uses the **min-heap (priority queue)** pattern, efficiently supporting always assigning the lowest available seat number and unreserving operations in log-time.  
This pattern—greedy allocation and fast recycle of unique IDs/numbers—is widely applicable for resource pools, ID recycling, connection management, and similar systems where the smallest available resource should be assigned/designed efficiently.