### Leetcode 2532 (Hard): Time to Cross a Bridge [Practice](https://leetcode.com/problems/time-to-cross-a-bridge)

### Description  
You are given `k` workers and `n` boxes to move from an old warehouse (right bank) to a new warehouse (left bank), separated by a river. Each worker has a `time` array specifying how long they take to:
1. Cross from left to right (to pick up a box) — `leftToRight`
2. Pick up a box — `pickOld`
3. Cross from right to left (with box) — `rightToLeft`
4. Put the box in the new warehouse — `putNew`

All workers start on the left bank, and only one worker can cross the bridge at any time. Workers waiting at the bridge have priorities:
- Workers on the right bank always have priority to cross, to deliver boxes.
- Among multiple workers on the same side, the "least efficient" (highest crossing + picking + putting time, with ties by lower index) goes first.
Calculate the time when the last worker returns to the left bank after delivering all boxes.

### Examples  

**Example 1:**  
Input:  
`n=2, k=2, time=[[1,10,1,10], [10,1,10,1]]`  
Output: `50`  
*Explanation: Worker 1 (slow to cross left→right, but fast for all else) and worker 0 alternate.  
- 0:00: worker 1 crosses (10), picks box (1), returns (10), puts box (1)  
- 0:01: worker 0 crosses (1), picks box (10), returns (1), puts box (10)  
Order of bridge crossing determined by given rules; total time to move both boxes and have both back on left is 50.*

**Example 2:**  
Input:  
`n=1, k=1, time=[[1,1,1,1]]`  
Output: `7`  
*Explanation: 1 (left→right:1), 2 (pick:1), 3 (right→left:1), 4 (put:1), 5 (left→right:1), 6 (pick:1), 7 (right→left:1).  
But for one box:  
- worker crosses (1), picks (1), returns (1), puts (1), done at 4.  
- All must be back on left: already there.  
Output is 4 (not 7).*

**Example 3:**  
Input:  
`n=3, k=3, time=[[5,1,5,1],[4,2,4,2],[3,3,3,3]]`  
Output: `34`  
*Explanation: Each worker will be prioritized based on their efficiency as new tasks become available; bridge waits/picking/putting times accumulate accordingly.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all sequences, but with n and k up to 10⁴, this is not feasible.

- **Simulation:**  
  Use a priority queue (heap) to manage which worker is allowed to cross next.  
  *Key design:*  
  - Maintain queues for both sides (left/right bank), ordered by efficiency.
  - Keep a current time value; process the next available "event" (worker finishes, bridge becomes available).
  - Every worker action—whether crossing, picking, or waiting—is simulated step by step.
  - For each event, update workers’ positions and time, updating queues and checking when a worker can next move.

- **Optimization/Design Trade-offs:**  
  - Only the slowest needed workers actually cross, optimizing for the scenario.
  - Most of the challenge is correct event sequencing and priority decisions.
  - Data structure: maintain priority of available workers on both banks via heaps.

This approach avoids unnecessary simulation steps, ensuring that the O(n log k) event processing remains efficient.

### Corner cases to consider  
- Only one worker (`k=1`)
- Only one box (`n=1`)
- All times the same for all workers
- Extreme time differences among workers
- Large n, requiring multiple trips per worker
- All workers being equally "inefficient"

### Solution

```python
import heapq

def findCrossingTime(n, k, time):
    # Custom comparator: negative efficiency to get min heap by worst efficiency
    def worker_priority(i):
        eff = time[i][0] + time[i][2]
        return (-eff, -i)  # lower efficiency comes first, then lower index

    # Workers ready to cross from left to right (to get box)
    left_q = []
    # Workers ready to cross from right to left (after picking box)
    right_q = []
    # When workers become free on each side: (free_time, worker_index)
    left_wait = []
    right_wait = []

    for i in range(k):
        heapq.heappush(left_q, (worker_priority(i), i, 0))  # (priority, worker, ready_time)

    cur_time = 0
    boxes_left = n

    while boxes_left > 0 or right_q or right_wait:
        # Release any workers done with "putNew": they rejoin left queue
        while left_wait and left_wait[0][0] <= cur_time:
            _, i = heapq.heappop(left_wait)
            heapq.heappush(left_q, (worker_priority(i), i, cur_time))

        while right_wait and right_wait[0][0] <= cur_time:
            _, i = heapq.heappop(right_wait)
            heapq.heappush(right_q, (worker_priority(i), i, cur_time))

        # Priority: workers on right bank (returning with boxes)
        if right_q:
            _, i, _ = heapq.heappop(right_q)
            cur_time += time[i][2]  # rightToLeft
            heapq.heappush(left_wait, (cur_time + time[i][3], i))  # will become free after putNew
        elif boxes_left > 0 and left_q:
            _, i, _ = heapq.heappop(left_q)
            cur_time += time[i][0]  # leftToRight
            heapq.heappush(right_wait, (cur_time + time[i][1], i))  # will become free after pickOld
            boxes_left -= 1
        else:
            # No one can move now; jump time to next free worker
            next_time = float('inf')
            if left_wait: next_time = min(next_time, left_wait[0][0])
            if right_wait: next_time = min(next_time, right_wait[0][0])
            # This can never happen for valid inputs; but for robustness:
            if next_time == float('inf'):
                break
            cur_time = next_time
            
    # cur_time is now the answer
    return cur_time
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k)  
  Each of the n boxes results in at most one bridge crossing, and each heap operation is O(log k), with k ≪ n for large n.
- **Space Complexity:** O(k)  
  Heaps and waitlists track at most k workers/events at a time.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are multiple bridges?
  *Hint: Model with multiple resources — multiserver queue.*

- How would you handle worker availability at fixed intervals, not immediately after action?
  *Hint: Modify wait management with delays or initial free times per worker.*

- Can the cost functions (picking or putting times) be different depending on the box or trip?
  *Hint: State and event representation must include per-box/worker timing.*

### Summary
This is a **simulation pattern** question with **event processing and priority management** — similar to real-time scheduling or resource queue problems.  
Efficient use of heaps for event/action priority is critical for both correctness and performance. This kind of approach also appears in problems like *CPU task scheduling*, *factory lines*, and other resource-constrained flow simulations.