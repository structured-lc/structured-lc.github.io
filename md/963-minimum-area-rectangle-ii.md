### Leetcode 963 (Medium): Minimum Area Rectangle II [Practice](https://leetcode.com/problems/minimum-area-rectangle-ii)

### Description  
Given a set of points on the X-Y plane, find the minimum area of any rectangle that can be formed by these points. The rectangle's sides do **not** have to be parallel to the X or Y axis ― it can be at any angle. If no rectangle can be formed, return `0`. The answer must be within 10⁻⁵ of the actual value.

### Examples  

**Example 1:**  
Input: `[[1,2],[2,1],[1,0],[0,1]]`  
Output: `2.00000`  
Explanation: These four points form a perfect rectangle at 45°, with area 2.

**Example 2:**  
Input: `[[0,1],[2,1],[1,1],[1,0],[2,0]]`  
Output: `1.00000`  
Explanation: The minimum area rectangle can be formed with points [1,0],[1,1],[2,1],[2,0], area 1.

**Example 3:**  
Input: `[[0,3],[1,2],[3,1],[1,3],[2,1]]`  
Output: `0`  
Explanation: No rectangle can be formed from these points.

### Thought Process (as if you’re the interviewee)  
At first glance, the brute-force solution is to check **all quadruplets** of points to see if they form a rectangle. But with up to 100 points, 𝐶(n,4) combinations would be too slow.

**Key insights:**
- For any rectangle (not axis-aligned), its two diagonals are congruent and bisect each other (share the same midpoint and length).
- If I iterate over all **pairs of points** (p₁, p₂), I can:
  - Compute the midpoint and squared length of the diagonal they form.
  - Store all pairs with the same (midpoint, diagonal length) in a hash map.

For each entry in the map:
- For every two pairs with the same midpoint and length, the four points together can be the corners of a rectangle.
- The area can be calculated as the product of the distances between one diagonal and the two adjacent sides.
- Keep track of the smallest area found.

This approach avoids redundant checks and uses geometry properties for efficiency.

### Corner cases to consider  
- Less than 4 points: impossible to form a rectangle → output 0.
- Duplicate points (shouldn't affect, but need to check).
- All points on a straight line.
- Multiple rectangles; the smallest must be found.

### Solution

```python
from collections import defaultdict
from itertools import combinations
import math

def minAreaFreeRect(points):
    # Convert points to tuples for hashability.
    points = [tuple(p) for p in points]
    n = len(points)
    # Map: (center_x, center_y, squared_diagonal_length) -> list of point pairs
    centers = defaultdict(list)
    
    # For every pair of points, group by center and diagonal length.
    for i in range(n):
        x1, y1 = points[i]
        for j in range(i + 1, n):
            x2, y2 = points[j]
            center = ((x1 + x2) / 2.0, (y1 + y2) / 2.0)
            length2 = (x1 - x2)**2 + (y1 - y2)**2
            centers[(center, length2)].append((points[i], points[j]))
    
    res = float('inf')
    for key in centers:
        pairs = centers[key]
        # For each pair of diagonals with same center and length, try forming rectangle
        for (p1, p2), (p3, p4) in combinations(pairs, 2):
            # vector from p1 to p3
            v1x, v1y = p3[0] - p1[0], p3[1] - p1[1]
            # vector from p1 to p4
            v2x, v2y = p4[0] - p1[0], p4[1] - p1[1]
            # Area = |v1| * |v2| (since vectors are perpendicular, as diagonals bisect)
            area = math.hypot(v1x, v1y) * math.hypot(v2x, v2y)
            if area < res and area > 0:
                res = area
    return res if res < float('inf') else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n is the number of points.  
  - We check all pairs of points: O(n²)
  - For each group, combinations can add to total O(n²).
- **Space Complexity:** O(n²), for storing all pairs grouped by their diagonals in the hash map.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle floating point inaccuracy or overflow when calculating midpoints/lengths?
  *Hint: Use normalized or rounded representations for dictionary keys.*

- Could you return the rectangle's coordinates instead of its area?  
  *Hint: Track and reconstruct all four points; area calc uses the same info.*

- Could you optimize further if the points are guaranteed to be axis-aligned?  
  *Hint: For axis-aligned rectangles, hash by x and y separately.*

### Summary
This problem uses geometry and hash maps for grouping (a hash-by-feature pattern). The elegant part is encoding mathematical symmetry―by bisection, diagonals with matching length and midpoint guarantee potential rectangles. This pattern appears in problems involving symmetry or uniqueness by derived features rather than raw coordinates, such as in collinear points, circle detection, and matching geometric objects by invariants.


### Flashcard
For each pair of points, store midpoint and diagonal length; if two pairs share both, they can form a rectangle—compute area for all such combinations and return the minimum.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Geometry(#geometry)

### Similar Problems
