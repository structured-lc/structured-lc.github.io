### Leetcode 3161 (Hard): Block Placement Queries [Practice](https://leetcode.com/problems/block-placement-queries)

### Description  
You are given a sequence of queries on an infinite number line. There are two types of queries:

- Type 1: Place an obstacle at index `x`.
- Type 2: Given `x` and `sz`, check if a block of length `sz` can be placed on the segment ending at `x` (i.e., in the interval `[x - sz + 1, x]`) such that the whole segment contains no obstacles.

For each Type 2 query, return `True` if placement is possible, or `False` otherwise. The number line starts with no obstacles.

### Examples  

**Example 1:**  
Input: `queries = [[1,2], [2,3,2], [1,5], [2,7,3]]`  
Output: `[True, False]`  
*Explanation:  
Query 1: Place obstacle at 2.  
Query 2: Can we place a block of size 2 ending at 3? Occupied positions: {2}; so interval [2,3] blocked → False.  
Query 3: Place obstacle at 5.  
Query 4: Can we place a block of size 3 ending at 7? No obstacles in [5,7] (as 5 is blocked, 6,7 free) but [5,7] includes 5, so blocked → False. Actually, [5,7] blocked, but [6,7] isn't length 3, so output is False.*

**Example 2:**  
Input: `queries = [[2,5,3]]`  
Output: `[True]`  
*Explanation:  
Query 1: Can we place a block of size 3 ending at 5? There are no obstacles. Interval [3,4,5] is free → True.*

**Example 3:**  
Input: `queries = [[1,4], [1,7], [2,11,4], [2,8,3]]`  
Output: `[True, False]`  
*Explanation:  
Query 1: Place obstacle at 4.  
Query 2: Place obstacle at 7.  
Query 3: Can we place size 4 block at 11? Interval [8,9,10,11], obstacle at 7 (not in interval), so interval is free → True.  
Query 4: Can we place size 3 block at 8? Interval [6,7,8]. 7 is blocked → False.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  For each Type 2 query, scan backwards from `x` for `sz` positions, checking if any obstacle blocks the interval.  
  For Type 1 queries, record all obstacle positions in a set.  
  This is O(N \* sz), which will time out if queries or sz are large.

- **Optimization:**  
  Since obstacles only ever get added, and Type 2 queries ask for largest gap immediately *before* a point, we can keep all obstacle positions in a sorted structure (e.g. `SortedList`, balanced BST). For each Type 2 query:
    - Use binary search to find the nearest obstacle ≤ x (call it `prevOb`) and nearest obstacle > x (call it `nextOb`).
    - The possible ranges are between obstacles.
    - Interval `[x-sz+1, x]` must not overlap any obstacle: check that there is no obstacle in this range.
    - To do this efficiently, store obstacles in a SortedList, and for each query, use bisect to find obstacles in the relevant range.
    - Insertion/deletion and query are O(log N).

- **Alternate ideas:**  
  Data structures such as Fenwick Tree (Binary Indexed Tree) or Segment Tree can be used to maintain the largest gap between consecutive obstacles.
  For maximum efficiency, process the entire queries in reverse, updating precomputed gaps as obstacles are added or removed.

- **Trade-offs:**  
  Using a balanced BST (SortedList) allows fast range checks; using Fenwick/Segment Tree enables batch processing for max gap queries across dynamic intervals.

### Corner cases to consider  
- Placing obstacles at same location more than once.
- Block of size 1.
- First query is a Type 2 query, before any obstacle.
- Placing block beyond all obstacles.
- Placing obstacle at 0 or very large position.
- Placing a block whose left endpoint is negative (should handle as per question constraints).

### Solution

```python
import bisect

class BlockPlacement:
    def __init__(self):
        # Start with sentinel obstacles at -infty (simulate with -1e14) and +infty (simulate with 1e14)
        self.obstacles = [-10**14, 10**14]
    
    def add_obstacle(self, x):
        bisect.insort(self.obstacles, x)
    
    def can_place(self, x, sz):
        # Find the rightmost obstacle ≤ x
        idx = bisect.bisect_right(self.obstacles, x)
        left_ob = self.obstacles[idx - 1]
        right_ob = self.obstacles[idx]
        # The available interval is (left_ob, right_ob)
        # The block must completely fit inside (left_ob, right_ob), and the right endpoint is x, so need:
        # x - sz + 1 > left_ob
        
        return x - sz + 1 > left_ob

def getResults(queries):
    res = []
    bp = BlockPlacement()
    for q in queries:
        if q[0] == 1:
            bp.add_obstacle(q[1])
        else:
            can = bp.can_place(q[1], q[2])
            res.append(can)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** Each insertion/query is O(log K), where K is the number of obstacles. For Q queries, overall time is O(Q \* log K).
- **Space Complexity:** O(K), for storing obstacles. K ≤ number of Type 1 queries (≤ Q).

### Potential follow-up questions (as if you’re the interviewer)  

- What if obstacles can be removed as well?  
  *Hint: BST/SortedList still works, but need to support deletions.*

- What if the queries are online and very large (e.g. 10⁷)?  
  *Hint: Can we use segmented or block-based structures, e.g., interval trees?*

- What if queries ask for the number of places a block of certain size can fit in range [a, b]?  
  *Hint: Need to find all max gaps between obstacles inside [a, b], and count positions.*

### Summary
The problem is a variant of the *dynamic interval coverage* or *nearest occupied slot* pattern, efficiently solved using a balanced BST or binary search approach. The main trick is storing obstacle locations in sorted order, so for each placement query, we can quickly check if the relevant segment is clear. This approach is common for segment-union, parking lot, seat reservation, or interval-exclusion style problems.


### Flashcard
Keep obstacle positions in a sorted structure (e.g., SortedList or balanced BST); for Type 2 queries, use binary search to find the largest obstacle ≤ x and check if the gap is ≥ sz.

### Tags
Array(#array), Binary Search(#binary-search), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
- Building Boxes(building-boxes) (Hard)
- Fruits Into Baskets III(fruits-into-baskets-iii) (Medium)