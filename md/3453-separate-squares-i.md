### Leetcode 3453 (Medium): Separate Squares I [Practice](https://leetcode.com/problems/separate-squares-i)

### Description  
Given a list of squares on a 2D plane, each represented as `[x, y, l]` where (x, y) is the bottom-left corner and `l` is the side length, determine the smallest y-coordinate (real number allowed) such that a horizontal line at y splits the union of all squares into two regions of exactly equal area. Overlapping areas should be counted only once.  
*Put another way: Find the lowest possible y so that the area below or at y equals the area strictly above y, considering overlap only once.*

### Examples  

**Example 1:**  
Input: `[[0,0,2],[2,0,2]]`  
Output: `2.0`  
*Explanation: Both squares are side-by-side. Each covers area 4, so total covered area is 8. The line y = 2 passes through the top of the lower squares and divides the region into equal halves.*

**Example 2:**  
Input: `[[0,0,3],[1,0,2]]`  
Output: `1.625`  
*Explanation: The first square covers area 9, the second covers area 4, but they overlap. The horizontal line at y ≈ 1.625 divides total union area into halves.*

**Example 3:**  
Input: `[[0,0,1]]`  
Output: `0.5`  
*Explanation: Only one square of area 1. A line at y = 0.5 divides the square into two equal areas.*

### Thought Process (as if you’re the interviewee)  
First, brute-force: For any possible y, compute the area of the covered region strictly below y and above y, ensuring not to double-count overlaps. This suggests a sweep-line approach.

But we want the **smallest y** where the area below equals the area above — and y can be fractional.  
Brute-force would try every possible y between min and max, but this is inefficient.

Optimization:  
- **Event-based sweep line:** Treat every square's bottom and top (y, y+l) as events. As we sweep up, for each distinct y, we can track the "active" coverage widths, and compute area as width × (y - prev_y).  
- Keep a running total of area as we sweep up through events. When total area exceeds half the union, we’ve just passed the answer — interpolate between prev_y and y to get the exact position where total area = half.

Trade-offs:  
- This is efficient, O(N log N), since events can be sorted and processed quickly.
- We must carefully handle overlaps so area is not double-counted during width computation.

### Corner cases to consider  
- Multiple squares fully overlapping: Check area calculation is not double-counted.
- Very small or zero-length squares.
- Line y splitting through flat edge (touches square edge).
- Only one square.
- Non-overlapping squares.
- Empty input (should not happen per constraints).
- High y coordinates, possible overflow if not careful.

### Solution

```python
def separateSquares(squares):
    # Compute total area of the union of all squares
    events = []
    for x, y, l in squares:
        # Add bottom and top edges as events
        events.append((y, True, x, l))      # entering event at bottom
        events.append((y + l, False, x, l)) # leaving event at top

    events.sort()
    # For union area, we'll process all active intervals horizontally
    import bisect

    def calc_width(intervals):
        # Given a list of active intervals [x0, x0+l0], [x1, x1+l1], ...,
        # compute union length along x (not double counting overlaps)
        if not intervals: return 0
        intervals.sort()
        merged = []
        for start, end in intervals:
            if merged and start <= merged[-1][1]:
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append([start, end])
        return sum(end - start for start, end in merged)

    # 1. Compute total union area
    active = []
    last_y = events[0][0]
    union_area = 0.0

    intervals = []  # list of [start, end] representing current active squares at current sweep
    for y, entering, x, l in events:
        # area gained since last_y
        dy = y - last_y
        width = calc_width(intervals)
        union_area += width * dy

        if entering:
            intervals.append([x, x + l])
        else:
            # Remove corresponding interval
            for idx, (sx, ex) in enumerate(intervals):
                if sx == x and ex == x + l:
                    intervals.pop(idx)
                    break
        last_y = y

    # 2. Do another sweep to find smallest y where bottom area = union_area / 2
    half_area = union_area / 2
    active = []
    last_y = events[0][0]
    acc_area = 0.0
    intervals = []
    answer = 0.0

    for y, entering, x, l in events:
        dy = y - last_y
        width = calc_width(intervals)
        area_here = width * dy

        if acc_area + area_here >= half_area:
            # fraction of dy to reach half_area
            remain = half_area - acc_area
            if width == 0:
                answer = y
            else:
                answer = last_y + remain / width
            break
        acc_area += area_here

        if entering:
            intervals.append([x, x + l])
        else:
            for idx, (sx, ex) in enumerate(intervals):
                if sx == x and ex == x + l:
                    intervals.pop(idx)
                    break
        last_y = y

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N)  
  Explanation: Sorting 2N events. Each event, interval merging is O(N), but in practice very few active intervals; total is O(N log N) amortized.
- **Space Complexity:** O(N)  
  Explanation: For events list and active intervals. No extra structures beyond input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to rectangles (not just squares)?  
  *Hint: Consider a rectangle’s x and y intervals separately when sweeping.*

- What changes if the dividing line must be vertical (x=constant)?  
  *Hint: Swap roles of x and y, do the same sweep on x-coordinates.*

- How would you return the actual split areas (polygons) below and above the cut?  
  *Hint: Track and output the edges being covered at the split y.*

### Summary
This problem is a **2D sweep-line + interval union** pattern, common for area/length union and geometric queries, especially when dealing with overlapping shapes and set-union areas.  
The sweep-line technique allows us to efficiently manage the active set of intervals and compute both the union area and the y-cut position.  
Variations of this pattern are frequently seen in interval problems, union-of-rectangles area, and histogram volume calculation.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
