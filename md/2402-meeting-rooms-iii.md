### Leetcode 2402 (Hard): Meeting Rooms III [Practice](https://leetcode.com/problems/meeting-rooms-iii)

### Description  
You are given **n** meeting rooms (numbered 0 to n-1) and a list of meeting requests, each meeting represented as [start, end]. For each meeting:
- If any room is free at the meeting's start, assign it to the available room with the **smallest id**.
- If no room is free, **delay** the meeting until the earliest time a room becomes free (choose the free room with the smallest id), but keep the meeting duration unchanged.
After scheduling all meetings, determine **which room hosted the most meetings** (return the smallest id if there's a tie).

### Examples  

**Example 1:**  
Input: `n = 2, meetings = [[0,10],[1,5],[2,7],[3,19]]`  
Output: `0`  
*Explanation:  
- At time 0: Room 0 is assigned [0,10]  
- At time 1: Room 1 is assigned [1,5]  
- At time 2: Both rooms are busy, meeting delayed until room 1 (free at 5), scheduled [5,11]  
- At time 3: Both rooms busy, meeting delayed until room 0 (free at 10), scheduled [10,26]  
- Room 0 hosts 2 meetings, room 1 hosts 2, but return 0 since it's the smallest id.*

**Example 2:**  
Input: `n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]`  
Output: `1`  
*Explanation:  
- At time 1: Room 0 gets [1,20]  
- At time 2: Room 1 gets [2,10]  
- At time 3: Room 2 gets [3,5]  
- At time 4: All rooms are busy, delay until room 2 (free at 5), assign [5,11]  
- At time 6: Room 2 busy, so assign next meeting [6,8] to room 2 when free at 11  
- Room 1 hosts 1, room 2 hosts 2, room 0 hosts 1. Room 2 has the most meetings (2).*

**Example 3:**  
Input: `n = 1, meetings = [[0,100],[200,230],[300,330]]`  
Output: `0`  
*Explanation:  
- Only one room, all meetings must be assigned sequentially to room 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each meeting, check every room to see if it’s free at the meeting’s start, assign to the lowest id, else scan all rooms to find the earliest free one and delay meeting. Inefficient (O(m × n)).
- **Optimal:**  
  Sort meetings by their start time. Use two min-heaps:  
  - **FreeRoomsHeap** (by room id): keeps available rooms, always return smallest id first.  
  - **BusyRoomsHeap** (by end time, then id): tracks when each room is busy until; at each meeting's start, free up any rooms that have become available.  
  For each meeting, before assigning, pop any rooms from BusyRoomsHeap whose meeting ended by (or before) current meeting’s start and push them to FreeRoomsHeap. If a room is free, use the smallest id room; else, pop the room that gets free the earliest, delay and schedule this meeting. For each room, count its assignments.

  - This approach is efficient and handles overlapping/delayed meetings and priorities automatically.
  - **Trade-offs:**  
    Brute-force is simple to code but very inefficient for large n/m. Heap-based solution is more complex but much faster.

### Corner cases to consider  
- All meetings overlap, forcing consecutive assignment to rooms and maximum delay.  
- All meetings non-overlapping, so each assigned with no delay.
- n = 1 (single room, every meeting queued in order).
- More rooms than meetings (some rooms never used).
- Meetings with equal duration but different start times.
- Meetings array empty.
- Meetings with end == start + 1 (minimal case).

### Solution

```python
import heapq

def mostBooked(n, meetings):
    # Sort meetings by start time
    meetings.sort()
    # Min-heap of free rooms by id
    free_rooms = [i for i in range(n)]
    heapq.heapify(free_rooms)
    # Min-heap for busy rooms: (end_time, room_id)
    busy_rooms = []
    # Count of meetings assigned to each room
    room_count = [0] * n

    for start, end in meetings:
        # Release any rooms that have become free by 'start'
        while busy_rooms and busy_rooms[0][0] <= start:
            available_time, room_id = heapq.heappop(busy_rooms)
            heapq.heappush(free_rooms, room_id)
        if free_rooms:
            # Assign meeting immediately to the smallest id free room
            room_id = heapq.heappop(free_rooms)
            heapq.heappush(busy_rooms, (end, room_id))
        else:
            # All rooms busy: pick room that frees first, delay meeting
            available_time, room_id = heapq.heappop(busy_rooms)
            delay = end - start
            heapq.heappush(busy_rooms, (available_time + delay, room_id))
        room_count[room_id] += 1

    # Room with max meetings (smallest id in case of tie)
    max_meetings = max(room_count)
    for i in range(n):
        if room_count[i] == max_meetings:
            return i
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m log n), where m = number of meetings and n = number of rooms. Each meeting causes at most one heap pop/push per heap (log n each), plus sorting meetings O(m log m).
- **Space Complexity:** O(n + m) for heaps and counting arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if meetings could overlap with the same start time?  
  *Hint: Carefully consider meeting request ordering and whether tie-breaking or pre-sorting is needed.*

- What if rooms have different priorities, and the next available room isn't always the lowest id?  
  *Hint: Adjust the heap key by room priority, not just room index.*

- How could you efficiently support interruptions (meeting cancellations or rescheduling after assignment)?  
  *Hint: You’d need a way to remove arbitrary rooms from the busy heap—maybe with additional structures or indexed removals.*

### Summary
The problem uses the **two min-heap pattern** (priority queues) common in scheduling and interval/merge-based problems. It ensures efficient assignment (and delays) following strict room-id/availability rules. The same pattern is found in problems like “Meeting Rooms II”, real-world resource scheduling, job servers, and cache replacement simulations.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Simulation(#simulation)

### Similar Problems
- Meeting Rooms(meeting-rooms) (Easy)
- Meeting Rooms II(meeting-rooms-ii) (Medium)
- Maximum Number of Events That Can Be Attended(maximum-number-of-events-that-can-be-attended) (Medium)
- Find Servers That Handled Most Number of Requests(find-servers-that-handled-most-number-of-requests) (Hard)
- Maximum Number of Events That Can Be Attended II(maximum-number-of-events-that-can-be-attended-ii) (Hard)