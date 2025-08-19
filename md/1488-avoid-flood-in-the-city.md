### Leetcode 1488 (Medium): Avoid Flood in The City [Practice](https://leetcode.com/problems/avoid-flood-in-the-city)

### Description  
You are given an array `rains`, where `rains[i]` is:
- A lake number (positive integer) if it rains over that lake on day i (fills the lake), or
- 0 if the day is sunny (can dry any lake).
Every time it rains on a full lake, the city floods. On sunny days, you can dry **any** one lake (that is currently full). Return an array ans where:
- ans[i] = -1 if it rained that day (must rain, can't dry)
- ans[i] = the lake number the person dries on that sunny day (choose optimally to avoid flood, or arbitrary if no lake to dry).
If it's impossible to prevent a flood, return an empty array.

### Examples  

**Example 1:**  
Input: `rains = [1,2,0,0,2,1]`  
Output: `[-1,-1,2,1,-1,-1]`  
*Explanation: Day 0: rain on 1 (fill), Day 1: rain on 2 (fill), Days 2-3: dry, dry. Day 4: rain on 2 (must dry 2 before now), Day 5: rain on 1 (must dry 1 before now).* 

**Example 2:**  
Input: `rains = [1,2,0,1,2]`  
Output: `[]`  
*Explanation: Can't avoid flooding; both 1 and 2 are full when it rains again.*

**Example 3:**  
Input: `rains = [1,2,3,4]`  
Output: `[-1,-1,-1,-1]`  
*Explanation: Only rain; no dry needed.*

### Thought Process (as if you’re the interviewee)  
- The problem is about greedy scheduling to avoid a flooded lake.
- Track for each lake when it was last filled, and the next time it will be filled. On a sunny day, greedily choose to dry the lake that will fill again soonest.
- Use a map to keep track of currently full lakes.
- Use a priority queue or TreeSet to efficiently pick the lake to dry for upcoming rains.
- For each sun (0), keep a list of future dry positions and assign them wisely when a rain event would re-fill a full lake.

### Corner cases to consider  
- All days rain (no sunshine)
- sunshine days exceed possible lakes to fill
- Multiple sunny days in a row
- Rain on the same lake twice in a row (if not dried, must flood)
- Empty rains array
- Large input

### Solution

```python
import heapq

def avoidFlood(rains):
    lake_next_rain = {}
    full = set()
    dry_days = []
    ans = [-1]*len(rains)
    from collections import defaultdict
    future = defaultdict(list)
    # Preprocess: for each lake, record the days it will rain
    for i, lake in enumerate(rains):
        if lake:
            future[lake].append(i)
    # For each lake, maintain a pointer to its next rain
    next_rain_pos = {}
    for lake in future:
        future[lake] = iter(future[lake])
        next_rain_pos[lake] = next(future[lake], None)
    dry_available = []  # (next time, which lake)
    lake_to_next = {}
    for i, lake in enumerate(rains):
        if lake:
            if lake in full:
                return []  # flood occurs
            full.add(lake)
            next_rain_pos[lake] = next(future[lake], None)
            if next_rain_pos[lake] is not None:
                # push time, lake
                heapq.heappush(dry_available, (next_rain_pos[lake], lake))
            ans[i] = -1
        else:
            # Use sunny day to dry lake needed soonest
            dried = 1
            if dry_available:
                next_time, l = heapq.heappop(dry_available)
                ans[i] = l
                full.remove(l)
            else:
                ans[i] = 1  # arbitrary lake, optional
    return ans
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N log N), N = days, due to heap operations.
- **Space Complexity:** O(N), for heaps, maps, and answer.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you prove this greedy strategy is optimal?  
  *Hint: Consider if greedy always prevents floods if possible.*
- What if you could dry more than one lake per sunny day?  
  *Hint: Adapt strategy to batch-dry lakes.*
- How would you return ALL possible valid answers?  
  *Hint: Backtracking or storing choices at each branch.*

### Summary
This is a greedy + scheduling/heap pattern. Key is to allocate scarce dry opportunities to lakes that will flood soonest, which is solved using future rain info and a min-heap. This method is similar to optimal cache replacement and job scheduling.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
