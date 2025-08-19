### Leetcode 3588 (Medium): Find Maximum Area of a Triangle [Practice](https://leetcode.com/problems/find-maximum-area-of-a-triangle)

### Description  
Given a list of points in the 2D Cartesian plane (as an n×2 array), find the largest area of a triangle formed by any three of these points such that **at least one side of the triangle is parallel to the x-axis or y-axis**. If multiple triangles have the same maximum area, use any. If there's no such triangle, return -1. **Return twice the maximum area** (i.e., for area A, return 2 × A). Triangles with zero area are not valid.

### Examples  

**Example 1:**  
Input: `points = [[1,1],[2,3],[2,7],[3,1]]`  
Output: `6`  
*Explanation: The triangle with vertices (1,1), (2,3), (2,7) has base parallel to the x-axis (x=2 for two points). Area = 1/2×|3-1|×|7-3| = 1/2×2×4 = 4; return 2×4 = 8. But the largest is the triangle with (1,1),(2,7),(3,1): base (from (1,1) to (3,1)) is parallel to x-axis, length 2; height is 6 (from y=1 to y=7); area=1/2×2×6=6, double=12. Output 12.*

**Example 2:**  
Input: `points = [[0,0],[0,2],[2,0],[2,2]]`  
Output: `8`  
*Explanation: The triangle with (0,0),(2,0),(2,2) has base parallel to x-axis, length=2, height=2. Area=1/2×2×2=2, double=4, but actually, maximum triangle here is 1/2×2×2=2, so output is 4.*

**Example 3:**  
Input: `points = [[1,1],[1,1],[1,1]]`  
Output: `-1`  
*Explanation: All points are the same, no triangle with non-zero area exists.*


### Thought Process (as if you’re the interviewee)  
First, to get triangles, pick all combinations of three points. There are O(n³) possible combinations (brute-force). For each, check if at least one side is parallel to x or y axis.  
- A side is parallel to x-axis if its two endpoints have the same y coordinate.  
- A side is parallel to y-axis if its two endpoints have the same x coordinate.

Once we have a valid triangle, compute its area using the standard 2D formula (shoelace formula or directly for right triangles).

But O(n³) is slow for n up to 200.  
Instead, group points by x and by y using hashmaps.  
- For each pair sharing x or y, iterate third point to try to maximize area, since the pair gives a fixed base parallel to an axis, and the third point gives the height.

This reduces to O(n²) (all pairs of base, then for each, scan all third points).

### Corner cases to consider  
- All points colinear: area zero, should return -1.
- Duplicate points.
- Less than three points.
- No side can be parallel to axes (no two points with same x or y).
- Inputs with negative coordinates.

### Solution

```python
def max_triangle_area(points):
    # Group by x and y coordinates
    from collections import defaultdict
    
    x_dict = defaultdict(list)
    y_dict = defaultdict(list)
    n = len(points)
    max_area2 = 0  # area × 2
    
    # Build maps for fast lookup
    for x, y in points:
        x_dict[x].append(y)
        y_dict[y].append(x)
    
    used = set(tuple(pt) for pt in points)  # To check if point exists
    
    # Case 1: Sides parallel to x-axis (same y)
    for y, xs in y_dict.items():
        xs = sorted(xs)
        # Try all base pairs sharing y
        for i in range(len(xs)):
            for j in range(i+1, len(xs)):
                x1, x2 = xs[i], xs[j]
                base = abs(x2 - x1)
                if base == 0:
                    continue  # skip degenerate
                # For every possible third point with x = x1 or x2 but y ≠ y (height)
                for y3 in x_dict[x1]:
                    if y3 != y:
                        height = abs(y3 - y)
                        area2 = base * height  # doubled area
                        if area2 > max_area2:
                            max_area2 = area2
                for y3 in x_dict[x2]:
                    if y3 != y:
                        height = abs(y3 - y)
                        area2 = base * height
                        if area2 > max_area2:
                            max_area2 = area2
    
    # Case 2: Sides parallel to y-axis (same x)
    for x, ys in x_dict.items():
        ys = sorted(ys)
        for i in range(len(ys)):
            for j in range(i+1, len(ys)):
                y1, y2 = ys[i], ys[j]
                base = abs(y2 - y1)
                if base == 0:
                    continue
                # For every possible third point with y = y1 or y2 but x ≠ x (height)
                for x3 in y_dict[y1]:
                    if x3 != x:
                        height = abs(x3 - x)
                        area2 = base * height
                        if area2 > max_area2:
                            max_area2 = area2
                for x3 in y_dict[y2]:
                    if x3 != x:
                        height = abs(x3 - x)
                        area2 = base * height
                        if area2 > max_area2:
                            max_area2 = area2

    return max_area2 if max_area2 > 0 else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since for each group sharing a coordinate we check all pairs, and for each look-up for vertical/horizontal poles. (In worst case, number of such pairs is O(n²).)
- **Space Complexity:** O(n), for the hash maps and possible storage of input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if input can be up to 10⁵ points?  
  *Hint: Can you preprocess all coordinates to support O(1) queries?*

- What if triangle can have a side parallel to any arbitrary angle (e.g., not just axes)?  
  *Hint: Can you generalize your grouping approach for arbitrary slopes?*

- How to count number of maximum area triangles (not just one)?  
  *Hint: Use a set to track distinct maximum triangles.*

### Summary
This problem uses the **geometry + hashing/grouping** pattern, leveraging the fact that vertical/horizontal sides arise with repeated coordinates. Similar grouping tricks frequently appear in computational geometry and optimization problems, especially those involving rectangles or axis-aligned figures. This approach avoids brute force and exploits hash maps for speed. Patterns and hash maps are especially valuable when grouping and then combining with another iteration is necessary.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Greedy(#greedy), Geometry(#geometry), Enumeration(#enumeration)

### Similar Problems
