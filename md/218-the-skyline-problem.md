### Leetcode 218 (Hard): The Skyline Problem [Practice](https://leetcode.com/problems/the-skyline-problem)

### Description  
Given a list of buildings—each represented by a triplet [left, right, height]—compute the **city skyline** formed by these buildings. The skyline is a list of "key points": for every position along the x-axis where the visible outline of the buildings changes in height, record the position (x) and the new height. Adjacent points with the same height must be merged (no consecutive horizontal lines with equal height). Output the skyline as a list of [x, height] pairs, sorted left to right.

### Examples  

**Example 1:**  
Input: `[[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]`  
Output: `[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]`  
*Explanation:  
- At x=2, height goes up to 10 (building 1 starts).
- At x=3, height jumps to 15 (building 2 starts, which is taller).
- At x=7, building 2 ends, so max height falls to 12 (building 3 remains).
- At x=12, building 3 ends, height drops to 0 (no overlapping).
- At x=15, building 4 starts (height=10).
- At x=20, building 5 starts (height=8), but building 4 ends, so max height changes.
- At x=24, building 5 ends, height drops to 0.*  

**Example 2:**  
Input: `[[0,2,3],[2,5,3]]`  
Output: `[[0,3],[5,0]]`  
*Explanation:  
- At x=0, building starts (height=3).
- At x=2, right for building 1, but left for building 2 — heights are same, no new key.
- At x=5, all buildings end, height drops to 0.*  

**Example 3:**  
Input: `[]`  
Output: `[]`  
*Explanation:  
- No buildings, the skyline is empty.*

### Thought Process (as if you’re the interviewee)  
My initial brute-force thought is to for each position along the x-axis, find the max height at that position by iterating through all buildings—very inefficient for large input (O(n²)).  

A better approach is the **Sweep Line Algorithm**:  
- Think of moving a vertical “sweep line” from left to right over the x-axis.
- At each critical event (building start or end), update which buildings are “active” (overlapping the line).
- For starts, add height to the active buildings.  
- For ends, remove the corresponding height.  
- Track the current max height with a **max-heap** (priority queue for fast peek/remove).
- When the current max height changes, record this as a key point.
- Avoid consecutive points with the same height.

Why this?  
- Each event (building left/right) can be represented as a tuple which is sorted and processed in one pass.
- Adding/removing from a heap is O(log n), and sorting all events is O(n log n).
- This structure is perfect for cases with overlapping and nested buildings, which would be difficult to handle iteratively or with two pointers.

Alternative is **divide and conquer**—split the buildings, recursively solve for left/right, and merge skylines, but the sweep line with a heap is often preferred due to clearer event handling and direct mapping to problem requirements.

### Corner cases to consider  
- Empty input: `[]`
- All buildings are separate, non-overlapping
- Buildings start/end at same x-position
- Multiple buildings of the same height, fully overlapping
- Very tall, thin building hidden behind wider, shorter building
- All input buildings are of height zero (invalid, but should not crash)
- Large buildings containing many smaller buildings within their x-range

### Solution

```python
import heapq

def getSkyline(buildings):
    # Step 1. Gather all start and end events
    events = []
    for l, r, h in buildings:
        # left edge: add negative height (for start); right: add positive height (for end)
        events.append((l, -h, r))  # Starting edge
        events.append((r, 0, 0))   # Ending edge

    # Step 2. Sort events: 
    # 1. position x ascending; 
    # 2. starts before ends; 
    # 3. higher starts before lower (so taller bldgs processed first)
    events.sort()

    # Step 3. Max-heap: (-height, end)
    res = []
    # (height, end)
    # Initialize with a dummy building (height 0, very far end)
    live = [(0, float('inf'))]

    for x, neg_height, right in events:
        # Start event: push to heap
        if neg_height < 0:
            heapq.heappush(live, (neg_height, right))
        # End event: remove ended buildings
        while live and live[0][1] <= x:
            heapq.heappop(live)
        # Current max height is -live[0][0]
        cur_h = -live[0][0]
        # If result empty or height changed, record new key point
        if not res or res[-1][1] != cur_h:
            res.append([x, cur_h])

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Sorting 2n events: O(n log n)
  - Each event: heap push/pop is O(log n). Total operations linear in events.
- **Space Complexity:** O(n)  
  - O(n) to store events and heap for active buildings.

### Potential follow-up questions (as if you’re the interviewer)  

- What if building coordinates and heights are very large (up to 10⁹)?  
  *Hint: Try coordinate compression or segment trees if memory or access is an issue.*

- If the input buildings are already sorted by their x-coordinates, can you optimize further?  
  *Hint: Avoid redundant sorts, or try a divide and conquer merge.*

- How would you output the silhouette as a filled 2D array or image (not just key points)?  
  *Hint: Post-process the list into segments, or fill intervals between key points.*

### Summary
This problem uses the **sweep line** and **heap** (priority queue) patterns, common in computational geometry and event processing. The structure—processing sorted "events" with efficient tallies—is broadly applicable for interval union, meeting rooms, flight schedules, and histogram problems. The approach elegantly balances clarity and efficiency for handling complex geometric skyline outlines.

### Tags
Array(#array), Divide and Conquer(#divide-and-conquer), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Line Sweep(#line-sweep), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set)

### Similar Problems
- Falling Squares(falling-squares) (Hard)
- Shifting Letters II(shifting-letters-ii) (Medium)