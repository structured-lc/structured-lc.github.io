### Leetcode 732 (Hard): My Calendar III [Practice](https://leetcode.com/problems/my-calendar-iii)

### Description  
Design a class that counts the maximum number of overlapping events in a calendar. Each event is booked as a half-open interval [start, end), and every event can always be added (no rejection). After each booking, return the largest k such that some time is covered by k events (i.e., what’s the highest level of overlaps so far).

### Examples  

**Example 1:**  
Input: `["MyCalendarThree", "book", "book", "book", "book", "book"]`, `args: [[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10]]`  
Output: `[null, 1, 1, 2, 3, 3]`  
Explanation:  
1. First booking [10, 20): 1 event, max k = 1.  
2. Second [50, 60): no overlap, max k = 1.  
3. Third [10, 40): overlaps [10, 20), now [10, 20) has 2 overlaps, so max k = 2.  
4. Fourth [5, 15): overlaps all existing events in [10, 15), so ([10, 15) has 3 overlaps), max k = 3.  
5. Fifth [5, 10): also overlaps, max k stays 3.

**Example 2:**  
Input: `["MyCalendarThree", "book", "book", "book"]`, `args: [[], [1, 5], [2, 6], [4, 7]]`  
Output: `[null, 1, 2, 3]`  
Explanation:  
- [1, 5)  
- [2, 6) overlaps [1, 5) in [2, 5), so max k = 2.  
- [4, 7) overlaps both previous in [4, 5), so max k = 3.

**Example 3:**  
Input: `["MyCalendarThree", "book", "book", "book"]`, `args: [[], [10, 20], [20, 30], [30, 40]]`  
Output: `[null, 1, 1, 1]`  
Explanation:  
- All bookings are back-to-back; no overlap, always k = 1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each new booking, check overlaps against all previous intervals, and for each time “moment”, count the number of overlaps. This is too slow: O(n²).
- **Optimized:** We only care about the *change points* (start, end). Use a map/dictionary to count +1 at each start and -1 at each end. When booking, update these counts, then scan all unique time points in order, adding up current overlaps, and track the max.
- This technique avoids individually checking all pairs. Basically, it’s a “sweep line”: process each time chronologically, maintain how many events are “active” now, and update the max as you go.
- For better performance with lots of bookings and large coordinate ranges, use a segment tree or ordered map. But since n≤400 per test case (per problem constraints), the sweep-line with ordered dict/map is fast enough.

### Corner cases to consider  
- Booking several identical intervals (repeated [a, b]).
- Booking intervals that just touch at endpoints ([10, 20), [20, 30)): no overlap.
- Bookings with a span of 0, e.g., [30, 30) – should be ignored.
- Bookings that cover all previous intervals (giant range).
- Bookings at very large range (e.g. up to 10⁹).
- Many intervals, but very few unique time points.

### Solution

```python
# MyCalendarThree: using a sweep-line approach
class MyCalendarThree:
    def __init__(self):
        # Stores the change (+1 on start, -1 on end) at each time point
        self.timeline = {}
        self.max_booked = 0

    def book(self, start: int, end: int) -> int:
        # Mark +1 at start, -1 at end
        self.timeline[start] = self.timeline.get(start, 0) + 1
        self.timeline[end] = self.timeline.get(end, 0) - 1

        # Sweep through timeline to find max overlap
        active = 0
        curr_max = 0
        for time in sorted(self.timeline):
            active += self.timeline[time]
            if active > curr_max:
                curr_max = active

        # Update and return the overall max found so far
        self.max_booked = max(self.max_booked, curr_max)
        return self.max_booked
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) per test case (n bookings), as each `book` call sorts all time points (≤2n), so O(n·n log n) in practice. Fast enough for n ≤ 400.
- **Space Complexity:** O(n): only unique start/end points are stored in the timeline dict (maximum 2n entries).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are millions (or billions) of intervals, or `start` and `end` can be any 64-bit integer?  
  *Hint: Use an interval/segment tree or dynamic segment tree to avoid linear scan.*

- Can you return the time(s) where the max k-booking occurs, not just the value k?  
  *Hint: Track when the current active overlaps reaches the max.*

- If intervals can be modified or deleted, how do you efficiently update the max k-booked?  
  *Hint: Deletions are trickier—would need a balanced BST or segment tree with lazy propagation.*

### Summary
This problem is a classic example of the **sweep line** or "count boundaries" pattern, which is commonly used in calendar, interval, and overlapping events problems. The technique generalizes well: it’s used in line segment intersections, skyline problems, and booking systems. If the problem size increases or supports modifications, use an interval tree for efficiency.