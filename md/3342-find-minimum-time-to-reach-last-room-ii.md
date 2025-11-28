### Leetcode 3342 (Medium): Find Minimum Time to Reach Last Room II [Practice](https://leetcode.com/problems/find-minimum-time-to-reach-last-room-ii)

### Description  
You are given a grid of n × m rooms, represented by a 2D array `moveTime` where `moveTime[i][j]` is the earliest time you are allowed to enter room (i, j).  
You start at the top-left corner (0, 0) at time 0. From each room, you can move to any adjacent room (up, down, left, right). The cost of your steps **alternates**: the 1ˢᵗ move takes 1s, 2ⁿᵈ move 2s, 3ʳᵈ move 1s, 4ᵗʰ move 2s, etc.  
Your goal is to find the minimum time needed to reach the bottom-right room (n-1, m-1).

### Examples  

**Example 1:**  
Input: `moveTime = [[0,4],[4,4]]`  
Output: `7`  
*Explanation:  
- At t=0, at (0,0).  
- Wait until t=4 to enter (1,0) (can't enter before then).  
- First move (odd), takes 1s: arrive at (1,0) at t=5.  
- Now, next move (even), takes 2s. But can't enter (1,1) before t=4, already ok.  
- Move from (1,0) to (1,1): takes 2s, arrive at t=7.*

**Example 2:**  
Input: `moveTime = [[0,2,4],[3,2,4],[5,3,1]]`  
Output: `9`  
*Explanation:  
It's optimal to go right, down, down, right.  
Wait as needed to match room times and alternate move costs.*

**Example 3:**  
Input: `moveTime = [[0,1,3],[1,2,2],[4,3,1]]`  
Output: `7`  
*Explanation:  
Move in a path that times arrivals to match allowed entry times, adjusting for 1s and 2s per move alternately.*

### Thought Process (as if you’re the interviewee)  

First, note this is a **shortest path problem on a grid** with an extra twist:  
- Each move alternates between 1s and 2s.  
- You can't enter a cell before `moveTime[i][j]`.

Brute-force:  
- Try all possible paths with DFS or BFS, but it's too slow for large grids.

Optimized approach:  
- Classic Dijkstra's Algorithm fits if we use (current time, row, col, move count parity) as the state.  
- *Parity* (even/odd move) lets us know if the next move is 1s or 2s.
- For each position, keep track of the *earliest* time we could reach it with even or odd parity.
- Use a min-heap (priority queue) to always process the room with the current lowest arrival time.
- When visiting (i, j), update only if you found a faster arrival for that move parity.

Trade-off:  
- Dijkstra’s with extra state for parity (keeps 2 timings per cell).
- Avoids cycles and unnecessary revisits.

### Corner cases to consider  
- Only one cell: grid 1×1.
- All moveTime[i][j] = 0 (can travel unhindered).
- Some moveTime[i][j] very large, must wait before entering.
- Multiple paths with waiting vs detours: need to optimize.
- Moves must alternate: can't just always do "cheaper" move.

### Solution

```python
import heapq

def findMinimumTime(moveTime):
    n, m = len(moveTime), len(moveTime[0])

    # dist[r][c][parity]: earliest arrival at (r, c) with even/odd move number
    INF = float('inf')
    dist = [[[INF, INF] for _ in range(m)] for _ in range(n)]

    # heapq elements: (arrival_time, r, c, parity)
    heap = []
    dist[0][0][0] = 0  # At start, 0 time, 0 moves made (so next is 1ˢᵗ move: odd)
    heapq.heappush(heap, (0, 0, 0, 0))

    dirs = [(-1,0),(1,0),(0,-1),(0,1)]  # up, down, left, right

    while heap:
        time, r, c, parity = heapq.heappop(heap)
        if (r, c) == (n-1, m-1):
            return time
        # Already visited in less or equal time
        if dist[r][c][parity] < time:
            continue

        # Next move time: alternates between 1 and 2
        step_time = 1 if parity == 0 else 2
        next_parity = 1 - parity

        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m:
                # Wait if needed for moveTime[nr][nc], then add move time
                start_time = max(moveTime[nr][nc], time + step_time)
                if dist[nr][nc][next_parity] > start_time:
                    dist[nr][nc][next_parity] = start_time
                    heapq.heappush(heap, (start_time, nr, nc, next_parity))

    # If unreachable
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n×m×log(n×m)) — Each cell with 2 parities can be updated at most once, with heap operations per update.
- **Space Complexity:** O(n×m) for the distance grid ("earliest arrival per cell and parity") plus the heap.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **diagonal moves** or more complex movement rules?  
  *Hint: Adjust the direction vectors, adjust move rules in loops.*

- What if **moveTime** values depend on something dynamic, e.g., based on the parity?  
  *Hint: State may need to include more than just parity, possibly move number.*

- How would you solve it if the **move costs followed another periodic pattern**?  
  *Hint: Track move count mod k for pattern of length k.*

### Summary
This problem is a classic **grid shortest path** with “extra state” for alternating move times. The main pattern is “Dijkstra’s algorithm with state extension,” commonly seen in shortest path problems with periodically changing costs or other properties (for example, minimum time with doors opening/closing, or two-phase cost functions). This technique can be applied wherever gradually changing or alternating rules affect shortest paths.


### Flashcard
Use Dijkstra with state (time, row, col, parity); parity tracks move count to determine if next move costs 1 or 2 steps, respect moveTime constraints.

### Tags
Array(#array), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix), Shortest Path(#shortest-path)

### Similar Problems
- Minimum Cost to Reach Destination in Time(minimum-cost-to-reach-destination-in-time) (Hard)
- Minimum Time to Visit a Cell In a Grid(minimum-time-to-visit-a-cell-in-a-grid) (Hard)