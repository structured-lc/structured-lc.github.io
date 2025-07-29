### Leetcode 1453 (Hard): Maximum Number of Darts Inside of a Circular Dartboard [Practice](https://leetcode.com/problems/maximum-number-of-darts-inside-of-a-circular-dartboard)

### Description  
You are given a set of dart throws on a 2D wall, each represented by a 2D integer coordinate. You also have a circular dartboard of a given radius, and you can place it anywhere on the wall. Your task: Find the **maximum number of darts (points)** that can fit **inside or on the boundary** of any dartboard of that radius. In other words, what is the largest number of the given points you can cover with a circle of the specified radius placed anywhere?

### Examples  

**Example 1:**  
Input: `points = [[-2,0],[2,0],[0,2],[0,-2]]`, `r = 2`  
Output: `4`  
*Explanation: Centering the dartboard at (0,0) with radius 2 will include all four points since they all lie on the boundary.*

**Example 2:**  
Input: `points = [[-3,0],[3,0],[2,6],[5,4],[0,9],[7,8]]`, `r = 5`  
Output: `5`  
*Explanation: Placing the center at (0,4) with radius 5 will cover all points except (7,8).*

**Example 3:**  
Input: `points = [[-2,0],[2,0],[0,2],[0,-2]]`, `r = 1`  
Output: `1`  
*Explanation: Any circle of radius 1 can only cover one of the given points at a time.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each point, check how many points are within distance `r` of it. But the optimal circle center might not be exactly on a given point—it could be anywhere.  
- **Observation:** For **any two points** that can both be covered by the same circle of radius `r`, there is a set of possible circle centers: specifically, the centers of **circles of radius `r` that pass through both points**. For two points inside the circle, this always yields zero, one, or two possible centers.
- For **every pair** of points, compute the centers of such circles.  
- For each such center, count all the given points that are within distance ≤ `r` of it.  
- Track and return the maximum such count.
- **Optimization:** Since n ≤ 100, O(n² × n) = O(n³) is acceptable.

**Why this approach?**  
- Covers all circle placement possibilities involving two points on the boundary, avoiding missing optimal centers not aligned to the input points.
- Pure geometry, no library shortcuts.

### Corner cases to consider  
- All points collinear.
- All points coincide.
- Circle radius is too small to include more than one point.
- All points are already within a small region.
- Single-point input.
- Radius is 0 (edge case: how many points at exact same location?).
- Floating-point inaccuracy in distance comparisons.

### Solution

```python
import math

def num_points(points, r):
    def get_centers(p1, p2, r):
        # Returns 0, 1, or 2 centers of circle radius r that pass through p1 and p2
        (x1, y1), (x2, y2) = p1, p2
        dx = x2 - x1
        dy = y2 - y1
        d_sq = dx * dx + dy * dy
        d = math.hypot(dx, dy)
        if d > 2 * r:
            return []
        # Midpoint
        mx = (x1 + x2) / 2
        my = (y1 + y2) / 2
        h = math.sqrt(r * r - (d / 2) ** 2)
        # (dx, dy) rotated 90 deg and normalized
        if d == 0:
            return [(mx, my)]
        ox = -dy * h / d
        oy = dx * h / d
        center1 = (mx + ox, my + oy)
        center2 = (mx - ox, my - oy)
        return [center1, center2]

    max_count = 1
    n = len(points)
    for i in range(n):
        for j in range(i + 1, n):
            for center in get_centers(points[i], points[j], r):
                count = 0
                cx, cy = center
                for px, py in points:
                    dist_sq = (px - cx) ** 2 + (py - cy) ** 2
                    if dist_sq <= r * r + 1e-8:  # Allow small epsilon for float errors
                        count += 1
                max_count = max(max_count, count)
    return max_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³)  
  - For each pair of points (O(n²)) and each center (up to 2), count in a third loop over all points (O(n)).
  - Acceptable because n ≤ 100.
- **Space Complexity:** O(1) extra  
  - Only using simple variables; no additional storage proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you improve the algorithm if the points are guaranteed to be within a small bounding box?  
  *Hint: Could spatial hashing or grid bucketization help?*

- What if the radius or the coordinates can be non-integer or very large?  
  *Hint: Consider numerical stability and floating-point errors.*

- If you needed to return the **actual center location(s)**, how would you modify your solution?  
  *Hint: Track the candidate centers along with the counts.*

### Summary
This is a **geometry with search** problem, using a brute-force scan over all possible pairs of points and all possible circle centers they determine. The key insight is that any two points on the boundary of a circle of radius `r` uniquely determine up to two such circles. This pattern is common in computational geometry, and similar principles apply in problems involving circle or sphere fitting, clustering, and maximum covering.