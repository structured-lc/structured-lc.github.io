### Leetcode 3625 (Hard): Count Number of Trapezoids II [Practice](https://leetcode.com/problems/count-number-of-trapezoids-ii)

### Description  
Given a set of **n** distinct points in 2D Cartesian coordinates, find **how many different quadruples of these points can form a trapezoid**.  
A *trapezoid* here is defined as a convex quadrilateral with **at least one pair of parallel sides** (excluding parallelograms, which have two pairs of parallel sides).  
Return the count of *distinct* quadruples of points that form a trapezoid.

To clarify (explaining in my own words):  
- You are given a list `points` where each point is `[x, y]`.
- You must choose four points, forming a convex quadrilateral, such that exactly one pair of its sides are parallel (not two; those are parallelograms).
- Return the number of different ways to do this.

### Examples  

**Example 1:**  
Input: `points = [[0,0],[0,1],[1,0],[2,1]]`  
Output: `1`  
*Explanation: The only possible quadruple of points forms a unique trapezoid with one pair of parallel sides and not a parallelogram.*

**Example 2:**  
Input: `points = [[0,0],[0,1],[2,1],[3,0]]`  
Output: `1`  
*Explanation: There is one possible quadruple forming a convex quadrilateral where exactly one pair of opposite sides are parallel.*

**Example 3:**  
Input: `points = [[0,0],[1,1],[2,2],[3,3]]`  
Output: `0`  
*Explanation: All points are colinear, so no quadrilateral (thus no trapezoid) can be formed.*

### Thought Process (as if you're the interviewee)  

- **Brute Force:**  
  I could enumerate all quadruples of points (up to C(n,4)), check if the formed quadrilateral is convex, and then for each, check:
  - Is there **exactly one** pair of parallel sides (not two)?
  - Are the sides not all of the same length & direction (i.e., not a parallelogram or rectangle)?
  This would be too slow for \( n \leq 500 \) because C(500,4) is >2 billion.

- **Parallel Sides Identification:**  
  The main property of a trapezoid is that it has *one* pair of parallel sides.
  For each pair of segments (sides) between two points, store their slope and their midpoint.  
  Find pairs of segments that are parallel (slope equal) but not sharing a common vertex, and check whether the quadrilateral formed by their endpoints is convex, and if it is not a parallelogram.

- **Optimization - Hashing by Slope:**  
  - For each pair of points (forming a segment), compute the slope, store the pair in a map (using, say, slope as key and endpoints as value list).
  - For each set of *parallel* non-overlapping segments (sides), check whether:
      - The endpoints are distinct (to make a quadrilateral).
      - The sides are *not* both pairs of parallel (i.e., not parallelogram).
      - The quadrilateral is convex (can be checked via cross products or checking angles).
  - To avoid counting parallelograms, ensure that **only one pair** of sides is parallel.

- **Why this approach?**
  - Hashing segments by slope reduces the problem of finding parallel sides.
  - For each slope, try pairing all non-overlapping segments.
  - For each candidate, check convexity and exclude parallelograms.
  - Still requires care: for every pair of parallel segments, checking whether the remaining sides are not parallel.

- **Trade-Offs:**
  - Complexity is reduced to O(n²) for segment collection + O(k²) for segment pair enumeration (for k segments per slope).
  - Still requires geometric validation, but no need to check all quadruples.

### Corner cases to consider  
- All points are colinear ⇒ No quadrilateral can be formed.
- Four points form a parallelogram ⇒ Not counted as a trapezoid.
- Multiple segments with identical slopes (vertical, horizontal).
- Duplicate quadrilaterals (avoided by canonical ordering of vertex indices).
- Points with overlapping x or y coordinates.
- Tiny quadrilaterals (near-zero area) or degenerate cases.

### Solution

```python
# Count Number of Trapezoids II

from collections import defaultdict
from math import gcd

def countTrapezoids(points):
    n = len(points)
    # Helper: canonical slope representation as tuple (dy, dx) reduced to lowest terms
    def get_slope(p1, p2):
        dx = p2[0] - p1[0]
        dy = p2[1] - p1[1]
        if dx == 0:
            return (1, 0)   # Vertical line slope "infinite"
        if dy == 0:
            return (0, 1)   # Horizontal line
        g = gcd(dx, dy)
        sx = dx // g
        sy = dy // g
        # Ensure canonical direction
        if sx < 0:
            sx, sy = -sx, -sy
        return (sy, sx)

    # For each segment, store: slope -> list of (point index 1, point index 2)
    slope_map = defaultdict(list)
    for i in range(n):
        for j in range(i + 1, n):
            s = get_slope(points[i], points[j])
            slope_map[s].append((i, j))

    result = 0
    # For each set of parallel segments
    for segments in slope_map.values():
        segs = segments
        m = len(segs)
        # For each pair of parallel segments, check if they are disjoint
        for a in range(m):
            i1, j1 = segs[a]
            for b in range(a+1, m):
                i2, j2 = segs[b]
                indices = {i1, j1, i2, j2}
                # Need 4 distinct points
                if len(indices) == 4:
                    idx = list(indices)
                    # Now, check: does the quadrilateral formed by these four points have
                    # - convexity
                    # - exactly one pair of parallel sides (not parallelogram)
                    
                    # Build all 4-point permutations (reduce overcount, fix the order)
                    quad = [points[i] for i in idx]
                    
                    def cross(p, q, r):
                        # Cross product: pq x qr
                        x1, y1 = q[0] - p[0], q[1] - p[1]
                        x2, y2 = r[0] - q[0], r[1] - q[1]
                        return x1 * y2 - x2 * y1
                    
                    # All possible orderings, fix (to avoid overcount):
                    from itertools import permutations
                    count_this = 0
                    for order in permutations(range(4)):
                        p0, p1, p2, p3 = quad[order[0]], quad[order[1]], quad[order[2]], quad[order[3]]
                        # Make polygon
                        poly = [p0, p1, p2, p3, p0]
                        # Check convexity: all cross products have same sign
                        cross_products = []
                        ok = True
                        for k in range(4):
                            cp = cross(poly[k], poly[k+1], poly[(k+2)%5])
                            cross_products.append(cp)
                        if all(c > 0 for c in cross_products) or all(c < 0 for c in cross_products):
                            # Check sides parallelism:
                            # Which pair is parallel is known (indices for a and b)
                            # Let's get the four sides in order, compute slopes
                            sides = []
                            for l in range(4):
                                pA, pB = poly[l], poly[l+1]
                                sides.append(get_slope(pA, pB))

                            # Count parallel sides
                            unique = defaultdict(list)
                            for idx_, s_ in enumerate(sides):
                                unique[s_].append(idx_)
                            count_pairs = sum(len(side_ids) >= 2 for side_ids in unique.values())
                            if count_pairs == 1:
                                count_this += 1
                        # else not convex
                    result += count_this // 8 # each valid quad appears 8 times (4! permutations, divide out)
    return result

```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Building all segments: O(n²)
  - For each slope group with k segments: O(k²) pairs, and for each, checking all permutations (max 24 but typically reduced by canonical ordering).
  - In worst case (many parallel lines), could be O(n⁴) in degenerate distributions; in practice, much less.  
  - For \( n \leq 500 \), optimized for geometric constraints.

- **Space Complexity:**  
  - O(n²) to store all \( n(n-1)/2 \) segments in the slope map.
  - Extra O(1) for loop variables.

### Follow-up questions  
- What if trapezoids with two pairs of parallel sides (parallelograms) should also be counted?  
- How can we speed up further for even larger input sizes or stricter time limits?  
- How would the answer change if points are not guaranteed to be distinct?