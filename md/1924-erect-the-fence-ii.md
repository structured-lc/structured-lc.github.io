```markdown
### Leetcode 1924 (Hard): Erect the Fence II [Practice](https://leetcode.com/problems/erect-the-fence-ii)

### Description  
You are given a set of trees, each represented as a 2D point (x, y). Your task is to enclose all these trees using a single circular fence (a perfect circle), such that no tree is left outside and the radius of the circle is as small as possible. Return the center (x, y) and the radius r of this smallest enclosing circle as an array [x, y, r]. All input points must lie on or inside the circle, and you want the smallest possible radius.

### Examples  

**Example 1:**  
Input=`[[0,0], [1,0]]`  
Output=`[0.5, 0.0, 0.5]`  
Explanation: The smallest enclosing circle passes through both points. The center is exactly halfway between them, and the radius is half the distance between them.

**Example 2:**  
Input=`[[0,0], [0,2], [2,0], [2,2]]`  
Output=`[1.0, 1.0, 1.41421]`  
Explanation: The smallest enclosing circle is centered at the intersection of the diagonals, and the radius is the distance from the center to any corner—here, √2.

**Example 3:**  
Input=`[[2,2], [3,3], [0,0], [1,1]]`  
Output=`[1.5, 1.5, 1.41421]`  
Explanation: The smallest enclosing circle is still the circumcircle of the square; here, the center is at (1.5, 1.5) and radius remains √2, as it’s the same configuration but with a different order of points.

### Thought Process (as if you’re the interviewee)  

- **Brute Force:** For each possible triplet of points, compute the circumcircle. Check if all other points fit inside or on that circle. The smallest valid radius is the answer. For N trees, this is O(N⁴): O(N³) triplets, and O(N) checks per triplet. Horribly slow!
- **Optimized Geometric Approach:** The problem is known as the “Smallest Enclosing Circle” problem in computational geometry. The best-known optimal solution is Welzl’s algorithm, which randomly iterates through points and recursively finds the minimal enclosing circle. Expected running time is O(N), but worst-case is O(N²). Very tricky to implement optimally, but for interviews, you can explain the idea and trade-offs.
- **Why choose this?** Randomized algorithms like Welzl’s are near-linear in expectation. For N ≤ 10⁵, this is usually acceptable. The trade-off is code complexity versus theoretical run-time. For small N (interview problems), brute force is enough, but mentioning Welzl’s shows deeper knowledge and gets bonus points.

### Corner cases to consider  
- **Empty input:** Should return a reasonable output (e.g., [0,0,0]).
- **Single point:** The circle has zero radius and is centered at the point.
- **Two points:** The smallest circle is centered halfway between them, radius is half their distance.
- **Three or more points:** Some (or all) may lie on the circle.
- **Colinear points:** If all points are colinear, the smallest enclosing circle is the diameter.
- **Duplicate points:** Should be handled gracefully.
- **Many points on the circumference:** The smallest circle must pass through at least two (usually three) of them.
- **Integer overflow:** When computing distances, use floats/doubles to avoid precision loss.

### Solution

```python
import math

def compute_circle(x1, y1, x2, y2):
    """Compute circle passing through two points."""
    center_x = (x1 + x2) / 2.0
    center_y = (y1 + y2) / 2.0
    r = math.hypot(x2 - center_x, y2 - center_y)
    return (center_x, center_y, r)

def is_inside(cx, cy, r, x, y):
    """Check if (x,y) is inside or on the circle (cx,cy,r)."""
    return math.hypot(x - cx, y - cy) <= r + 1e-9

def outer(points, i, c):
    """Recursive routine for Welzl’s algorithm."""
    if len(c) == 3:
        cx, cy, r = circumcircle(*c)
        if all(is_inside(cx, cy, r, x, y) for x, y in points):
            return (cx, cy, r)
        return None
    if i == len(points):
        if len(c) == 2:
            (x1, y1), (x2, y2) = c, c[1]
            cx, cy, r = compute_circle(x1, y1, x2, y2)
            if all(is_inside(cx, cy, r, x, y) for x, y in points):
                return (cx, cy, r)
        return None
    res = outer(points, i+1, c)
    if res: return res
    res = outer(points, i+1, c + [points[i]])
    return res

def circumcircle(a, b, c):
    """Circumcircle through points a, b, c."""
    ax, ay = a
    bx, by = b
    cx, cy = c
    d = 2 * (ax*(by-cy)+bx*(cy-ay)+cx*(ay-by))
    if d == 0:  # colinear, handle two-point case
        ((x1,y1), (x2,y2)) = min_enc_circle_2pts([a, b, c])
        return (x1+x2)/2, (y1+y2)/2, math.hypot(x1-x2,y1-y2)/2
    cx = ((ax**2+ay**2)*(by-cy) + (bx**2+by**2)*(cy-ay) + (cx**2+cy**2)*(ay-by)) / d
    cy = ((ax**2+ay**2)*(cx-bx) + (bx**2+by**2)*(ax-cx) + (cx**2+cy**2)*(bx-ax)) / d
    radius = math.hypot(cx - ax, cy - ay)
    return (cx, cy, radius)

def min_enc_circle_2pts(pts):
    """Finds endpoints of minimum enclosing circle for two colinear points."""
    max_dist = 0
    p1, p2 = pts, pts[1]
    for i in range(len(pts)):
        for j in range(i+1, len(pts)):
            x1, y1 = pts[i]
            x2, y2 = pts[j]
            d = math.hypot(x1-x2, y1-y2)
            if d > max_dist:
                max_dist = d
                p1, p2 = pts[i], pts[j]
    return (p1, p2)

def external(c1, c2, c3=None):
    """Helper: smallest enclosing circle for 1,2,3 points."""
    if c3 is None:
        x1, y1 = c1
        x2, y2 = c2
        return (x1+x2)/2, (y1+y2)/2, math.hypot(x1-x2,y1-y2)/2
    return circumcircle(c1, c2, c3)

def external_through(point, c):
    """Helper: smallest enclosing circle going through 'point' and enclosing 'c'."""
    if len(c) == 2:
        cx, cy, r = compute_circle(c, c[1], c[1], c[1][1])
    elif len(c) == 3:
        cx, cy, r = circumcircle(*c)
    else:
        cx, cy, r = 0, 0, 0
    x, y = point
    dx, dy = x - cx, y - cy
    dist = math.hypot(dx, dy)
    if dist <= r:
        return (cx, cy, r)
    # new circle passes through 'point'
    radius = (r + dist) / 2
    center_x = cx + (dist - r) * dx / (2 * dist)
    center_y = cy + (dist - r) * dy / (2 * dist)
    return (center_x, center_y, radius)

def min_enc_circle(points):
    """Main function: returns [x, y, r] for smallest enclosing circle."""
    if not points: return [0.0, 0.0, 0.0]
    if len(points) == 1: return [points, points[1], 0.0]
    # Welzl’s algorithm backbone here
    best = None
    for p in points:
        if best is None or not is_inside(best, best[1], best[2], p, p[1]):
            best = external(p, points)
            for q in points:
                if not is_inside(best, best[1], best[2], q, q[1]):
                    best = external(p, q)
                    for r in points:
                        if not is_inside(best, best[1], best[2], r, r[1]):
                            best = external(p, q, r)
    return best

def minCircle(points):
    return min_enc_circle(points)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  The brute-force version runs in O(N⁴) in the worst case, but use Welzl’s algorithm: expected O(N), worst-case O(N²). For most interview problems, the worst case is impractical to hit.
- **Space Complexity:**  
  O(1): only constant extra space is used (variables for centers, radii, etc.). The recursion stack is O(k) where k ≤ 3, so still O(1).

### Potential follow-up questions (as if you’re the interviewer)  

How would you scale this to handle a stream of points arriving over time?  
  Hint: Think about dynamic data structures and incremental updates versus recomputing from scratch.  
How can you visualize the progress of the algorithm on some sample data?  
  Hint: Draw intermediate circles and prove which points cannot be on the boundary.  
How would you extend this to 3D (spheres) or higher dimensions?  
  Hint: The concept generalizes, but the math becomes much harder, and computational geometry gets tricky.

### Summary  
This problem asks for the smallest enclosing circle of a 2D point set—a classic in computational geometry. The optimal solution is Welzl’s randomized algorithm, balancing clever recursion with expected linear runtime. The pattern—recursively reduce the problem size by moving boundary points in/out—is rare but powerful. The same idea appears in some Voronoi, Delaunay, and higher-D minimum enclosing sphere problems. For interviews, understand both the brute-force and randomized solutions, and be able to hand-write the key math for a triangle’s circumcircle.

### Tags
Array(#array), Math(#math), Geometry(#geometry)

### Similar Problems
- Erect the Fence(erect-the-fence) (Hard)