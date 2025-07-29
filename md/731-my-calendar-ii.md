### Leetcode 731 (Medium): My Calendar II [Practice](https://leetcode.com/problems/my-calendar-ii)

### Description  
You need to design a calendar that supports **booking intervals**: each is represented as (start, end) and is half-open (\[start, end)). The calendar should support double-bookings (overlap of two events), but **triple bookings (overlap at any point of three events) are not allowed**.  
Every time a new event is requested:
- If adding it would result in **at any moment having three or more overlapping events**, reject the booking and return False.
- Otherwise, add the booking and return True.

### Examples  

**Example 1:**  
Input:  
book(10, 20) → True  
book(50, 60) → True  
book(10, 40) → True  
book(5, 15) → False  
book(5, 10) → True  
book(25, 55) → True  
Explanation.  
- The first three events do not all overlap at any time, so they're all allowed.  
- book(5, 15) would create a triple overlap (with [10,20] and [10,40]) between 10 and 15, so return False.
- book(5, 10) only overlaps one interval, so allowed.
- book(25, 55) only forms double overlaps, so allowed.

**Example 2:**  
Input:  
book(1, 5) → True  
book(3, 7) → True  
book(4, 6) → False  
Explanation.  
- The 3rd booking would create triple overlap: intervals [1,5], [3,7], [4,6] all overlap at 4 and 5, so it's not allowed.

**Example 3:**  
Input:  
book(20, 30) → True  
book(5, 10) → True  
book(10, 15) → True  
book(15, 25) → True  
book(17, 27) → False  
Explanation.  
- The last booking ([17,27]) would create a triple booking between 17 and 25.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For every new booking, check all pairs of existing bookings for overlap with the new event. If any time is simultaneously covered by three intervals, reject. But this is slow: O(n²) per booking.
- **Better approach:**  
  Maintain two lists:
  - **single_bookings**: intervals booked once.
  - **double_bookings**: intervals already overlapped (double entries).
  
  For every new event:
  - If it overlaps any part of **double_bookings**, reject (would make a triple).
  - For every overlap with single_bookings, add that overlap interval to double_bookings.
  - Add event to single_bookings if allowed.
- **Even more optimal**: Use a line sweep or ordered map to efficiently count active intervals at any time.

I prefer the two-list approach. It’s clean, intuitive, and matches the constraint that triples are forbidden but doubles are allowed.

### Corner cases to consider  
- Booking that shares a start with an existing event.
- Booking that is entirely contained within two other events.
- Bookings that touch at ends: [a, b), [b, c) → should not count as overlapping.
- Empty calendar (first booking).
- Very large intervals.
- Multiple events starting or ending at the same time.

### Solution

```python
class MyCalendarTwo:
    def __init__(self):
        # Stores all booked intervals
        self.booked = []
        # Stores intervals where two bookings overlap
        self.overlaps = []

    def book(self, start: int, end: int) -> bool:
        # Check for triple booking: does this interval overlap any double booking?
        for o_start, o_end in self.overlaps:
            # If [start, end) overlaps [o_start, o_end), not allowed
            if start < o_end and o_start < end:
                return False
        
        # For every previous booking, check if we form a new double booking
        for b_start, b_end in self.booked:
            # Compute overlap, and if overlap exists, add to double bookings
            if start < b_end and b_start < end:
                # Overlap is [max(start, b_start), min(end, b_end))
                overlap_start = max(start, b_start)
                overlap_end = min(end, b_end)
                self.overlaps.append((overlap_start, overlap_end))
        
        # Add to single booking list: okay since it's only double booked at most
        self.booked.append((start, end))
        return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) per booking operation, where n is number of existing bookings, since we may scan all existing bookings and all current overlaps.
- **Space Complexity:** O(n), for storing at most O(n) single and double bookings (since triple intervals aren't allowed, double_bookings is O(n)).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to avoid even double bookings?  
  *Hint: Remove the double_bookings logic—only allow an interval to fit if it does not overlap anything.*

- How would you optimize for very large number of bookings or ranges, e.g., for millions of users?  
  *Hint: Consider balanced trees or segment trees/interval trees to handle fast insertion and overlap detection.*

- Suppose bookings can be cancelled. How would you efficiently update your data structures?  
  *Hint: Need to remove intervals from both lists, or use a map or more dynamic data structure for tracking.*

### Summary
This problem uses the **sweep line** or **interval overlap pattern**—commonly seen in problems where you query or update overlapping intervals. The two-list approach provides a clean, interview-friendly structure and adapts directly to variants with more or less restrictive overlap policies. Similar patterns are used in room booking, meeting scheduling, and train platform allocation problems.