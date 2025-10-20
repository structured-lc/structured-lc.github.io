### Leetcode 729 (Medium): My Calendar I [Practice](https://leetcode.com/problems/my-calendar-i)

### Description  
Design a calendar where you can add events represented by an interval \([start, end)\). The calendar must **not allow overlapping events**: if a new event overlaps with any existing event, booking should fail. Implement a `MyCalendar` class with:

- `MyCalendar()`: Initializes the object.
- `book(start, end)`: Books a new event if it does not overlap with any already-booked events. Returns `True` if the event is added successfully; otherwise, returns `False`.

### Examples  

**Example 1:**  
Input: `["MyCalendar", "book", "book", "book"]`, ` [[],[10,20],[15,25],[20,30]]`  
Output: `[null,true,false,true]`  
*Explanation:*
- `MyCalendar()` → initializes the calendar.
- `book(10, 20)` → returns `True` (success, no other events).
- `book(15, 25)` → returns `False` (overlaps with `[10, 20)` at 15-20).
- `book(20, 30)` → returns `True` (no overlap with existing events; `[10,20)` ends at 20).

**Example 2:**  
Input: `["MyCalendar", "book", "book"]`, `[[],[5,10],[10,15]]`  
Output: `[null, true, true]`  
*Explanation:*
- `MyCalendar()` → initializes.
- `book(5, 10)` → returns `True` (calendar empty).
- `book(10, 15)` → returns `True` (no overlap: first event ends at 10, new one starts at 10).

**Example 3:**  
Input: `["MyCalendar", "book", "book"]`, `[[],[5,15],[10,20]]`  
Output: `[null, true, false]`  
*Explanation:*
- `MyCalendar()` → initializes.
- `book(5, 15)` → returns `True` (first event).
- `book(10, 20)` → returns `False` (overlaps with `[5,15)` from 10-15).

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Store all event intervals in a list. For a new booking, check all existing intervals for any overlap. Overlap happens if `not (end ≤ cur_start or start ≥ cur_end)` for **any** existing booking.
- **Trade-offs:**  
  Brute-force is simple and works well for small inputs, but checking every booking for each new event can be slow with many entries (O(n²) time over all queries).
- **Optimize:**  
  - If events are always booked in order, we could binary search.
  - For this problem, since bookings are arbitrary, we can use a sorted list and perform binary search for possible overlaps, but for initial implementation, the brute-force is acceptable due to constraints.
- **Chosen approach:**  
  Use a list for events; for every `book`, check for overlap with all previous bookings using interval comparison logic. Simple, correct, and readable.

### Corner cases to consider  
- Empty calendar (first event always books successfully).
- Back-to-back intervals: `book(5,10)` & `book(10,15)` (should not overlap).
- Complete overlap: New event wholly covers existing event.
- Touching boundaries: End time is equal to the start time of another event (should not overlap).
- Large number of bookings (efficiency consideration).
- Repeated intervals.

### Solution

```python
class MyCalendar:
    def __init__(self):
        # List to store events as (start, end) pairs
        self.bookings = []

    def book(self, start: int, end: int) -> bool:
        # Check for overlap with all existing bookings
        for s, e in self.bookings:
            # Intervals [start, end) and [s, e) overlap if:
            # not (end ≤ s or start ≥ e)
            if not (end <= s or start >= e):
                return False
        self.bookings.append((start, end))
        return True
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Each `book` call checks all previous bookings for overlap: O(n), where n is the number of bookings.
- **Space Complexity:**  
  O(n) for storing all bookings in the list.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize booking if the number of `book` operations becomes very large?  
  *Hint: Consider storing bookings in a balanced BST or using binary search on a sorted list.*

- What if you are to support canceling a booking?  
  *Hint: Modify the data structure to efficiently find and remove intervals.*

- How would you support double bookings (i.e., allow up to two overlapping bookings)?  
  *Hint: Track overlaps and booking counts per interval.*

### Summary
This problem uses the classic **interval overlap** checking pattern. The solution iterates over all existing intervals to prevent any overlap, a technique useful for calendar systems, meeting schedulers, and room reservations. While the brute-force approach is clear and easy to implement, further optimizations (segment tree, BST, or sorted list + binary search) can be considered for performance at scale.


### Flashcard
Store all bookings in a list; for each new event, check all existing intervals for overlap using `not (end ≤ cur_start or start ≥ cur_end)`.

### Tags
Array(#array), Binary Search(#binary-search), Design(#design), Segment Tree(#segment-tree), Ordered Set(#ordered-set)

### Similar Problems
- My Calendar II(my-calendar-ii) (Medium)
- My Calendar III(my-calendar-iii) (Hard)
- Determine if Two Events Have Conflict(determine-if-two-events-have-conflict) (Easy)