### Leetcode 850 (Hard): Rectangle Area II [Practice](https://leetcode.com/problems/rectangle-area-ii)

### Description  
Given a list of axis-aligned rectangles represented by their bottom-left and top-right coordinates, compute the total area covered by these rectangles on a 2D plane. Each rectangle is represented by `[x1, y1, x2, y2]`, where `(x1, y1)` is the bottom-left and `(x2, y2)` the top-right corner. Overlapping areas should be counted only once in the total area—so if rectangles overlap, you do not double-count overlap areas.

### Examples  

**Example 1:**  
Input: `rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]`  
Output: `6`  
*Explanation: The area covered by the three rectangles together is 6. Their overlaps are not double-counted. You can visualize the regions to see that only six unit squares are covered.*

**Example 2:**  
Input: `rectangles = [[0,0,1000000000,1000000000]]`  
Output: `1000000000000000000`  
*Explanation: Only one large rectangle. Area is (10⁹ - 0) × (10⁹ - 0) = 10¹⁸.*

**Example 3:**  
Input: `rectangles = [[0,0,1,1],[2,2,3,3]]`  
Output: `2`  
*Explanation: The two rectangles do not overlap. They each have area 1, so total is 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  The naive way is to mark each covered unit square in a sufficiently large 2D grid, summing the covered area. However, coordinates can be huge (up to 10⁹), so this is impractical for both time and space.
  
- **Optimized approach: Line Sweep with Segment Tree:**  
  Instead, treat the problem like a union of intervals—do a sweep-line algorithm vertically or horizontally. For each x-coordinate "event" (the left or right edge of any rectangle), we process "start" and "end" of vertical intervals.

  - **Events:**  
    For each rectangle, create two events:
    - Start event at x₁ that adds its y-interval [y₁, y₂)
    - End event at x₂ that removes its y-interval

  - **Sweep process:**  
    Sort all events by x, and at each event, update the set of active y-intervals. For each adjacent pair of events in x, the currently covered y-intervals dictate the "height" of area covered between the two x's, so Area += width × total_coverage.

  - **Efficient interval management:**  
    To manage dynamic y-intervals efficiently, use a segment tree or interval tree (or, if the number of unique y's is small, use a simple list).

  This method avoids over-counting overlaps and works efficiently even with large coordinates.

### Corner cases to consider  
- Rectangles with zero area (x₁ == x₂ or y₁ == y₂)
- Completely overlapping rectangles
- Touching rectangles with no actual overlapping area
- One rectangle enclosing all others
- Multiple identical rectangles
- Empty input list

### Solution

```python
MOD = 10**9 + 7

class Solution:
    def rectangleArea(self, rectangles):
        # Step 1. Collect all events (start and end of rectangles in x)
        # and all unique y-values for coordinate compression
        OPEN = 1
        CLOSE = -1
        events = []
        y_set = set()
        
        for x1, y1, x2, y2 in rectangles:
            if x1 != x2 and y1 != y2:
                events.append((x1, OPEN, y1, y2))
                events.append((x2, CLOSE, y1, y2))
                y_set.add(y1)
                y_set.add(y2)
        
        # Step 2. Coordinate compression for y to allow use of a small segment tree
        y_list = sorted(y_set)
        y_to_i = {v: i for i, v in enumerate(y_list)}
        
        # Step 3. Prepare list of segments between consecutive unique y-values
        count = [0] * (len(y_list) - 1)  # coverage count per segment
        
        # Step 4. Process events in sorted x order
        events.sort()
        cur_x = None
        area = 0
        
        def covered_y_length():
            total = 0
            for i, c in enumerate(count):
                if c > 0:
                    total += y_list[i+1] - y_list[i]
            return total
        
        for x, typ, y1, y2 in events:
            if cur_x is not None:
                width = x - cur_x
                height = covered_y_length()
                area += width * height
                area %= MOD
            # For this event, update coverage counts
            i = y_to_i[y1]
            j = y_to_i[y2]
            for k in range(i, j):
                count[k] += typ
            cur_x = x
        
        return area % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N log N) for sorting events, plus O(M) per event to sum covered y-length (where M is number of unique y's, ≤ 2N). Segment tree optimization can bring y-coverage computation to O(log M).
- **Space Complexity:**  
  O(N) for events and O(M) for storing unique y-points and count arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if rectangles are not axis-aligned?  
  *Hint: Consider polygon area algorithms or plane sweep with general shapes.*

- Can you further optimize if all rectangles fit within a small coordinate range?  
  *Hint: Consider direct-grid or bitmap simulation approach.*

- How would you adapt this solution if rectangles may be dynamically added or removed?  
  *Hint: Use advanced dynamic segment trees or interval trees.*

### Summary
This problem is a classic example of the **line sweep** (or scanline) algorithm combined with interval/segment counting. The key is to process vertical events and maintain a dynamic set of covered y-intervals, allowing for efficient computation of union of possibly overlapping rectangles. This pattern can be extended to union of 1D/2D intervals, area of polygons, and similar "counting union of regions" in computational geometry.