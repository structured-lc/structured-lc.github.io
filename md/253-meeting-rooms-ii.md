### Leetcode 253 (Medium): Meeting Rooms II [Practice](https://leetcode.com/problems/meeting-rooms-ii)

### Description  
Given a list of meeting time intervals where each interval is represented as `[start, end]`, determine the **minimum number of conference rooms required** to hold all the meetings.  
- Each meeting has a start and end time.
- Meetings can overlap.
- You can't split a meeting and a room can only hold one meeting at a time.

For example, if you are using physical meeting rooms in a building, and have a schedule with overlapping timings, what’s the smallest number of rooms you need so that no meetings overlap in the same room?

### Examples  

**Example 1:**  
Input: `[[0,30],[5,10],[15,20]]`  
Output: `2`  
*Explanation: At time 5, there are 2 meetings ongoing (`[0,30]` and `[5,10]`). At most, we need 2 rooms during this overlap.*

**Example 2:**  
Input: `[[7,10],[2,4]]`  
Output: `1`  
*Explanation: The 2 meetings do not overlap. You can reuse the same room.*

**Example 3:**  
Input: `[[1,5],[2,6],[5,8],[7,9]]`  
Output: `2`  
*Explanation: Time 5 is the peak where `[1,5]` and `[2,6]` overlap (need 2 rooms). At time 7, `[5,8]` and `[7,9]` overlap (again need 2 rooms). The answer is 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each meeting, check how many other meetings are overlapping with it, and keep track of the maximum overlaps at any time.  
  - For each interval, compare with every other interval: O(n²) time. Too slow for large inputs.

- **Optimal approach:**  
  Since we care about *overlaps over time*, it's natural to think about sorting the start and end times and using pointers.  
  - Sort all start times and end times separately.
  - Use two pointers (`start_pointer`, `end_pointer`). Scan through start times.
    - If current meeting’s start is **before** the earliest end, need another room.
    - Otherwise, a meeting ended, so a room is freed up.
  - Track the running number of "used rooms" and update the maximum seen.
  - This greedy/interval merging approach is efficient and clean, O(n log n) time due to sorting.

- **Trade-offs:**  
  - No complex data structures required.
  - Alternate: min-heap approach to track room availabilities, but sorting pointers is easier to implement and debug.

### Corner cases to consider  
- Empty intervals list ⇒ Output should be 0.
- Meetings that have the exact same start and end (zero-length intervals).
- Completely overlapping intervals (all start and end at same time).
- Meetings with the same start or end times.
- Nested intervals, or back-to-back (end time equals next start time).
- Large input sizes (tens of thousands intervals).

### Solution

```python
def minMeetingRooms(intervals):
    if not intervals:
        return 0

    # Extract and sort start and end times separately
    start_times = sorted([interval[0] for interval in intervals])
    end_times = sorted([interval[1] for interval in intervals])

    start_pointer = end_pointer = 0
    used_rooms = 0
    max_rooms = 0

    # Iterate over all meetings by start time
    while start_pointer < len(intervals):
        # If next meeting starts before earliest ending finishes, need new room
        if start_times[start_pointer] < end_times[end_pointer]:
            used_rooms += 1
            start_pointer += 1
        else:
            # Meeting ended, room freed
            used_rooms -= 1
            end_pointer += 1
        # Track max rooms needed at any point
        max_rooms = max(max_rooms, used_rooms)
    return max_rooms
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Sorting start times: O(n log n)
  - Sorting end times: O(n log n)
  - Single pass through all intervals: O(n)
  - Total: O(n log n)
- **Space Complexity:** O(n)
  - O(n) for the two lists (starts and ends).
  - O(1) for variables and pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to output the **time periods** when the maximum number of rooms are simultaneously in use?  
  *Hint: Use the prefix sum or a map to track overlap counts at each unique time.*

- How would you modify the solution if meetings could extend or shrink in real time (i.e., with live updates)?  
  *Hint: Think about using a min-heap where you can add or remove meeting end times as meetings are updated.*

- Could you solve this if the intervals are on a very large timeline (like milliseconds over years) and storing all possible times isn't feasible?  
  *Hint: Only store *event points* (start and end events), process by order.*

### Summary
This problem uses the **sweep line** (interval merging) pattern, common for solving overlapping-interval questions. Sorting start/end times and scanning with two pointers makes it efficient and easy to implement. This approach generalizes well for any problem where you want to track overlaps, peak usage, or allocate resources for intervals—like assigning classrooms, CPU scheduling, or even runway management at airports.

### Tags
Array(#array), Two Pointers(#two-pointers), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Prefix Sum(#prefix-sum)

### Similar Problems
- Merge Intervals(merge-intervals) (Medium)
- Meeting Rooms(meeting-rooms) (Easy)
- Minimum Number of Arrows to Burst Balloons(minimum-number-of-arrows-to-burst-balloons) (Medium)
- Car Pooling(car-pooling) (Medium)
- Number of Flowers in Full Bloom(number-of-flowers-in-full-bloom) (Hard)
- Meeting Rooms III(meeting-rooms-iii) (Hard)
- Total Cost to Hire K Workers(total-cost-to-hire-k-workers) (Medium)
- Points That Intersect With Cars(points-that-intersect-with-cars) (Easy)