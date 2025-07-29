### Leetcode 149 (Hard): Max Points on a Line [Practice](https://leetcode.com/problems/max-points-on-a-line)

### Description  
You’re given a list of points on a 2D plane, where each point is defined by its x and y coordinates. The task is to find the maximum number of points that lie on the same straight line. Your goal: compute the largest group of points that all fall perfectly on some single line.

### Examples  

**Example 1:**  
Input: `[[1,1],[2,2],[3,3]]`  
Output: `3`  
*Explanation: All points lie on the line y = x.*

**Example 2:**  
Input: `[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]`  
Output: `4`  
*Explanation: The line passing through (1,1), (3,2), (5,3), and (2,3) has the most collinear points (slope consistency aligns these 4).* 

**Example 3:**  
Input: `[[0,0],[0,0],[1,1]]`  
Output: `3`  
*Explanation: Duplicate points are all counted, so both (0,0)s and (1,1) lie on y = x.*

### Thought Process (as if you’re the interviewee)  
My initial brute-force thought:  
- For every pair of points, compute the line passing through both (as determined by slope and intercept).
- Count how many points from the list are collinear with that line.
- This would run in O(n³), way too slow for n up to 300.

Optimized approach:  
- Instead of global pairwise checking, for each point, treat it as the anchor and compute the slope between it and every other point.
- Track how many times each slope occurs from that anchor.
- The idea: if multiple points share the same slope with the anchor, they are collinear.
- Handle duplicates separately — if a point appears multiple times, increase a "duplicate" counter.
- At each anchor, the best line is the slope with the highest count (plus the duplicates).
- Finally, keep maximum across all anchors.

Why this works:  
- Each unique pair of points defines a potential line; by anchoring at each point and counting slope duplicates, we efficiently find max collinear counts.
- Key optimization: reduce unnecessary recomputation by focusing on slope frequency, getting O(n²) time.


### Corner cases to consider  
- All points are exactly the same (duplicates only)
- Only one or two points (should simply return the size)
- Vertical lines (undefined or infinite slope, e.g., x-coordinates are the same)
- Large positive or negative coordinate values
- Integer division issues with slopes (reduce slope pairs to their lowest terms)
- Almost collinear, but not quite (ensure proper precision for slope comparison)

### Solution

```python
def maxPoints(points):
    from collections import defaultdict
    import math

    n = len(points)
    if n <= 2:
        return n

    max_points = 0

    for i in range(n):
        slopes = defaultdict(int)
        duplicates = 1  # Counts points identical to anchor
        cur_max = 0

        x1, y1 = points[i]

        for j in range(i + 1, n):
            x2, y2 = points[j]
            dx, dy = x2 - x1, y2 - y1

            if dx == 0 and dy == 0:
                duplicates += 1
                continue

            # Reduce (dx, dy) to avoid floating point issues
            gcd = math.gcd(dx, dy)
            if gcd != 0:
                dx //= gcd
                dy //= gcd

            # Handle sign to keep (dx, dy) unique for the same slope
            if dx < 0:
                dx, dy = -dx, -dy
            elif dx == 0:
                dy = abs(dy)
            elif dy == 0:
                dx = abs(dx)

            slopes[(dx, dy)] += 1
            cur_max = max(cur_max, slopes[(dx, dy)])

        max_points = max(max_points, cur_max + duplicates)

    return max_points
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For each of n points, we check all other points (n), and all slope comparisons and hash insertions are O(1).

- **Space Complexity:** O(n)  
  We store up to n slopes per anchor in a dictionary, and variables scale with the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if floating point precision wasn’t guaranteed safe for slope comparison?  
  *Hint: Use reduced fraction (dx, dy) pairs to avoid float errors.*

- How would you handle huge numbers of duplicate points?
  *Hint: Track duplicates separately, never let them distort slope calculations.*

- Can you extend this for 3D points (max points on a plane)?  
  *Hint: Extend slope to vector normal (cross products)—generalize approach.*

### Summary
We leveraged the "group-by-slope-from-each-anchor" technique—a common hash map pattern to avoid unnecessary recomputation and to efficiently count groupings. This pattern applies in various 2D geometry problems, like collinear groups or finding clusters/shapes by relation. The core trick: represent relations (like slopes) in a normalized, comparable way to count fast.