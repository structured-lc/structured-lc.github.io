### Leetcode 855 (Medium): Exam Room [Practice](https://leetcode.com/problems/exam-room)

### Description  
You are given a row of `n` seats labeled from `0` to `n-1` in an exam room. When a student enters the room, they must take a seat such that their distance to the nearest other student is maximized. If there are multiple possible seats, they must choose the smallest seat number. If the room is empty, the student always sits at seat `0`. Additionally, students may leave — you will be told when a student in seat `p` leaves. Your task is to implement a class with two methods:  
- `seat()`: Place a student optimally and return their seat number.  
- `leave(p)`: Mark seat `p` as vacant.  
You must support these functionalities efficiently for up to 10,000 calls and `n` up to 1,000,000,000[2][3][4].  

### Examples  

**Example 1:**  
Input:  
`["ExamRoom","seat","seat","seat","seat","leave","seat"]`,  
`[,[],[],[],[],[4],[]]`  
Output:  
`[null,0,9,4,2,null,5]`  
*Explanation:*
- seat() → 0 (room empty, sits at 0)
- seat() → 9 (farthest from 0)
- seat() → 4 (middle of 0 & 9)
- seat() → 2 (left half, farthest from others)
- leave(4)
- seat() → 5 (now 2 & 5 & 9 occupied, 5 is best)

**Example 2:**  
Input:  
`["ExamRoom","seat","leave","seat"]`  
`[[5],[],,[]]`  
Output:  
`[null,0,null,4]`  
*Explanation:*  
- seat() → 0 (first in)
- leave(0)
- seat() → 4 (farthest possible from *nobody*)

**Example 3:**  
Input:  
`["ExamRoom","seat","seat","leave","seat"]`  
`[[3],[],[],,[]]`  
Output:  
`[null,0,2,null,1]`  
*Explanation:*  
- seat() → 0
- seat() → 2 (farthest from 0)
- leave(0)
- seat() → 1 (middle of 2 and empty)

### Thought Process (as if you’re the interviewee)  
First, the brute-force way would be, after every seat and leave operation, scan all seats to find the best spot. But since `n` can be huge (up to 1e9), we can’t use an actual array of seats.

Instead, we need a structure that efficiently stores and queries *only the occupied seats* (e.g., a sorted list). To seat a student, we:
- Look at the distances between all pairs of *adjacent* occupied seats, as well as leftmost and rightmost gaps.
- The maximal available positions are always either:
    - Start (distance from occupied seat 0 to seat 0),
    - End (distance from last occupied seat to n-1),
    - Middle between two occupied seats (gap/2, choose leftmost if tie).

For high efficiency, a sorted list (or `TreeSet`/`SortedSet`) of currently-occupied seats can be maintained.

When a student leaves, simply remove the seat number from the set.

- seat() = O(len(occupied)) time, since we scan adjacent pairs
- leave(p) = O(log len) if the set is implemented efficiently  
Alternative: There’s also a clever approach using a priority queue/heap to encode “available segments”, but that’s more optimal when `seat()` and `leave()` interleave heavily[3].

### Corner cases to consider  
- Only one seat left
- Room is empty (first student enters)
- All seats occupied and someone leaves from one of the ends
- Multiple adjacent seats available (ensure lowest seat picked)
- leave(p) where p is the only person in the room

### Solution

```python
from bisect import bisect_left, insort

class ExamRoom:
    def __init__(self, n):
        self.n = n
        self.occupied = []

    def seat(self):
        # If room is empty, seat at 0
        if not self.occupied:
            self.occupied.append(0)
            return 0

        max_dist = self.occupied[0]  # possible distance at the left edge
        seat_to_use = 0  # candidate seat

        # Check gaps between consecutive occupied seats
        for i in range(1, len(self.occupied)):
            prev, curr = self.occupied[i-1], self.occupied[i]
            dist = (curr - prev) // 2
            if dist > max_dist:
                max_dist = dist
                seat_to_use = prev + dist

        # Check if n-1 (rightmost seat) is further
        last_empty_dist = self.n - 1 - self.occupied[-1]
        if last_empty_dist > max_dist:
            seat_to_use = self.n - 1

        # Insert seat_to_use while keeping list sorted
        insort(self.occupied, seat_to_use)
        return seat_to_use

    def leave(self, p):
        idx = bisect_left(self.occupied, p)
        if idx < len(self.occupied) and self.occupied[idx] == p:
            self.occupied.pop(idx)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - seat(): O(len(occupied)) per operation, as we scan the sorted list.
  - leave(p): O(log len) for search & remove.
- **Space Complexity:**  
  - O(k) where k is the number of occupied seats (`≤ 10⁴`).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you improve seat() to O(log k) per operation?  
  *Hint: Try maintaining the largest gap in a max heap, storing intervals as (distance, left, right).*

- How would you support a dynamically changing number of seats (e.g., seats being permanently added or removed)?  
  *Hint: Design data structures to allow adding/removing seat indices efficiently.*

- If students always leave from the ends, can you optimize the implementation?  
  *Hint: Keep track of current leftmost and rightmost occupied seats.*

### Summary
This problem is a classic application of *interval management* and greedy selection of maximal/minimal values in a sorted collection. Maintaining a **sorted list of occupied seats** is a standard coding pattern used in various problems involving intervals and range queries, and is highly efficient for moderately-sized data or sparse occupancy. Using a heap of intervals can reduce the seat() time further and is useful for dynamic partitioning scenarios. Variants of this method appear in problems involving parking lots, boarding queues, and processor scheduling.


### Flashcard
Use a sorted list of occupied seats; for each seat() call, scan adjacent gaps and boundaries to find the largest gap, then seat the student in the middle (or at the ends for edge gaps).

### Tags
Design(#design), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set)

### Similar Problems
- Maximize Distance to Closest Person(maximize-distance-to-closest-person) (Medium)