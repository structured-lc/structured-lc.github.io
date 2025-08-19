### Leetcode 1942 (Medium): The Number of the Smallest Unoccupied Chair [Practice](https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair)

### Description  
You are given the arrival and leaving times of n friends attending a party, where each friend is numbered from 0 to n−1. When a friend arrives, they must sit on the smallest unoccupied chair (chairs are numbered from 0 upward). When a friend leaves, their chair becomes available. You're also given a target friend's number (friendTarget). Find and return the number of the smallest unoccupied chair the target friend will sit on upon arrival.

### Examples  

**Example 1:**  
Input: `times = [[1,4],[2,3],[4,6]], friendTarget = 1`  
Output: `1`  
*Explanation:*
- Friend 0 arrives at 1, takes chair 0.
- Friend 1 arrives at 2, chair 1 is free, so they take chair 1.
- Friend 2 arrives at 4, Friend 0 leaves at 4 (frees chair 0). Friend 2 takes chair 0.
- friendTarget=1, so answer is 1.

**Example 2:**  
Input: `times = [[3,10],[1,5],[2,6]], friendTarget = 0`  
Output: `2`  
*Explanation:*
- Friend 1 arrives at 1, takes chair 0.
- Friend 2 arrives at 2, takes chair 1.
- Friend 0 arrives at 3, chair 2 is free, takes chair 2.
- friendTarget=0, answer is 2.

**Example 3:**  
Input: `times = [[5,10],[2,4],[3,6],[1,7]], friendTarget = 2`  
Output: `0`  
*Explanation:*
- Friend 3 arrives at 1, takes chair 0.
- Friend 1 arrives at 2, takes chair 1.
- Friend 2 arrives at 3, chair 2 is free, takes chair 2.
- Friend 1 leaves at 4 (frees chair 1).
- Friend 0 arrives at 5, chair 1 is free, takes chair 1.
- friendTarget=2, answer is 2.

### Thought Process (as if you’re the interviewee)  
- At first, I might think to simulate each friend's arrival by starting from chair 0 and finding the first unoccupied chair every time a friend arrives. This brute-force check for every friend would be O(n²), since chair finding could scan O(n) at every arrival.
- However, whenever a friend leaves, their chair gets freed, and the next arriving friend should take the smallest free chair. This is a classic "dynamic allocation of smallest available number" problem.
- The optimal way is to:
  - Sort the friends by their arrival times; process their "arrive" events in time order.
  - As friends leave, we must track when each chair gets freed (ideally, with a min-heap on departure time).
  - To track available chairs, use a min-heap of free chairs.
- For each arrival, before seating:
  - Release all friends whose departure time is ≤ current arrival time (make their chair available).
  - Then, seat the arriving friend at the smallest heap-free (or next unused) chair.
- As soon as the target friend sits, we return their chair number.

### Corner cases to consider  
- Multiple friends arrive at the same time (need to allocate smallest chairs in input order).
- Friends leave and new friends arrive at the exact same time (process releases before new arrivals).
- One friend (n=1).
- friendsTarget is the first to arrive or the last.
- Very large intervals (arrival and leave times not continuous).
- All friends arriving before any leaves.

### Solution

```python
import heapq

def smallestChair(times, friendTarget):
    n = len(times)
    # Annotate each interval with friend index: [arrive, leave, index]
    labeled = sorted([(start, end, idx) for idx, (start, end) in enumerate(times)],
                    key=lambda x: x[0])
    # Free chairs: min-heap so we always get smallest number
    free_chairs = []
    # Track [leave_time, chair_number] for occupied chairs
    occupied = []
    # Next new chair we can allocate (if none available in free_chairs)
    next_chair = 0
    for arr, dep, idx in labeled:
        # Release all chairs whose owner left by now
        while occupied and occupied[0][0] <= arr:
            _, chair = heapq.heappop(occupied)
            heapq.heappush(free_chairs, chair)
        # Allocate chair for current friend
        if free_chairs:
            chair_assigned = heapq.heappop(free_chairs)
        else:
            chair_assigned = next_chair
            next_chair += 1
        heapq.heappush(occupied, (dep, chair_assigned))
        if idx == friendTarget:
            return chair_assigned
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of friends. Sorting takes O(n log n), and each heap push/pop is O(log n) for at most 2n operations.
- **Space Complexity:** O(n), for storing occupied events and the free chair heap, as their maximum length is proportional to the number of friends.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this if each friend brought a group of m people and all need chairs together?
  *Hint: Track available intervals of size ≥ m, or use a data structure to efficiently find m contiguous chairs.*
- Can you do it if there are reserved (pre-booked/unavailable) chair numbers?
  *Hint: Prepopulate the free chairs heap with only non-reserved numbers, or mark reserved chairs as never available.*
- What changes if the list of arrivals and departures is given in a streaming fashion (i.e., cannot sort upfront)?
  *Hint: Use a priority queue for arrivals as well, and maintain an event-driven simulation.*

### Summary
This problem is a heap allocation simulation, frequently encountered in "resource allocation" tasks (like meeting rooms, CPU scheduling, parking slots, etc.). The use of two min-heaps facilitates efficient allocation and freeing of the smallest resource index. The approach is closely related to "Minimum Meeting Rooms" and "Process Tasks Using Servers" patterns. This greedy + heap method is widely applicable wherever a "smallest available resource" needs to be tracked dynamically.

### Tags
Array(#array), Hash Table(#hash-table), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
