### Leetcode 2015 (Medium): Average Height of Buildings in Each Segment [Practice](https://leetcode.com/problems/average-height-of-buildings-in-each-segment)

### Description  
Given a list of buildings, each described by `[start, end, height]`:
- Each building covers the interval `[start, end)`, meaning it starts at `start` and stops *just before* `end`.
- Buildings can overlap, creating complex segments along the street.
- For every continuous segment along the street, compute the **average height** (using integer division) covering that segment.
- Only output non-empty segments (where at least one building exists), with as few segments as possible (merging consecutive intervals with same average).

### Examples  

**Example 1:**  
Input: `buildings = [[1,4,3],[2,5,3],[7,9,2]]`  
Output: `[[1,5,3],[7,9,2]]`  
*Explanation: From 1 to 4, two buildings overlap, both have height 3, so avg = (3+3)/2=3. From 4 to 5, only one building (height 3) remains, so avg = 3. Segment [1,5) all have avg=3, so they are merged. From 7 to 9, avg=2.*

**Example 2:**  
Input: `buildings = [[1,3,2],[2,5,3],[2,8,3]]`  
Output: `[[1,3,2],[3,8,3]]`  
*Explanation: [1,2): only building 0, avg=2. [2,3): all overlap; avg=(2+3+3)/3=2. [3,5), [5,8): buildings 1 & 2 (heights 3,3), so avg=3. [3,8) has same avg, segments merged.*

**Example 3:**  
Input: `buildings = [[1,2,1],[5,6,1]]`  
Output: `[[1,2,1],[5,6,1]]`  
*Explanation: Segments are disjoint. From 1 to 2: avg=1. From 2 to 5: no buildings (skip). From 5 to 6: avg=1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For every possible x-coordinate, tally all active buildings, compute avg for each "atomic interval". This is extremely inefficient for large coordinates (up to 10⁸).

- **Optimize (Line Sweep):**  
  - Compress the problem by only considering change points (starts & ends of all buildings).
  - For each event (start or end), maintain running `height_sum` and count of current buildings.
  - When you move from one change point to another, if there's at least 1 active building, output that segment with average height = height_sum // count.
  - Merge with previous segment if average height is unchanged.
  - Avoid empty intervals (where no building covers).

- **Why Line Sweep?**  
  - Events are sparse (at most 2 per building), yielding at most 2 × len(buildings) points.
  - Only need to process at change points.
  - Ensures minimal segments by merging consecutive ranges with same average.

### Corner cases to consider  
- Buildings that share start or end points.
- Disjoint buildings (with gaps).
- All buildings exactly overlapping.
- All segments have the same average (should be merged).
- Segments with integer division causing round-down.
- Minimum/maximum input size (1 building, 10⁵ buildings).
- Large x-coordinates (avoid array approach).
- Zero-length intervals, or fully overlapping intervals.
- Output should not include empty intervals (no building).

### Solution

```python
def average_height_of_buildings(buildings):
    # Collect all events (start: +height/count, end: -height/count)
    events = []
    for start, end, height in buildings:
        events.append((start, height, 1))  # building starts
        events.append((end, -height, -1)) # building ends

    # Sort by position, then starts before ends (not strictly needed but preferred)
    events.sort()
    
    result = []
    prev_pos = None
    height_sum = 0
    count = 0
    prev_avg = None

    for pos, hdelta, cdelta in events:
        # If not the very first event and at least one building covering last segment
        if prev_pos is not None and prev_pos < pos and count > 0:
            avg = height_sum // count
            # Merge with previous if avg is same
            if result and result[-1][2] == avg and result[-1][1] == prev_pos:
                # Extend last segment to current pos
                result[-1][1] = pos
            else:
                # Create new segment [prev_pos, pos)
                result.append([prev_pos, pos, avg])
        # Update running sums/counter
        height_sum += hdelta
        count += cdelta
        prev_pos = pos

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n) due to sorting 2n events (n = number of buildings). All other steps are O(n).

- **Space Complexity:**  
  O(n) for storing the events and result list.


### Potential follow-up questions (as if you’re the interviewer)  

- What if building heights are so large that integer division may overflow?  
  *Hint: Use 64-bit integers or Python's big int.*

- How would you modify to output all ranges, even empty (gap) segments with height 0?  
  *Hint: In loop, always emit segment, filling with avg=0 where count==0.*

- If you wanted the maximum or minimum height in each segment, how would you change the algorithm?  
  *Hint: Maintain a multiset or heap for heights instead of just sum/count.*

### Summary
This is a classic **line sweep** (or "critical points") interval merging pattern, commonly used in interval covering, skyline, and event-based segment aggregation problems. The same logic applies to problems like the Skyline, union of rectangles/perimeters, or weighted interval queries, whenever changes only happen at known discrete points. The key is to preprocess and only update state at those points, which keeps the algorithm fast and efficient.