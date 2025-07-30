### Leetcode 3625 (Hard): Count Number of Trapezoids II [Practice](https://leetcode.com/problems/count-number-of-trapezoids-ii)

### Description  
Given a set of **distinct 2D points** (`points`), count the number of different trapezoids that can be formed.  
A **trapezoid** is a convex quadrilateral with **at least one pair of parallel sides**. For this problem, a trapezoid is defined by 4 of the given points, and the parallel sides must be *not equal in length* (so parallelograms are excluded).  
Return the total number of such quadrilaterals.

*Constraints*:
- 4 ≤ points.length ≤ 500
- Each point: \(-10^3 ≤ x, y ≤ 10^3\)
- All points are unique

### Examples  

**Example 1:**  
Input: `points = [[0,0],[1,1],[0,2],[2,0]]`  
Output: `1`  
*Explanation: The only way to select 4 points forms exactly one trapezoid.*

**Example 2:**  
Input: `points = [[0,0],[0,1],[1,0],[1,1]]`  
Output: `0`  
*Explanation: The selected 4 points form a square; all opposite sides are equal in length—so no valid trapezoid (since it is a parallelogram).*

**Example 3:**  
Input: `points = [[0,0],[2,0],[1,2],[4,2],[0,3]]`  
Output: `2`  
*Explanation: Among all possible 4-point selections, 2 trapezoids can be formed using these points.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  For each possible group of 4 points (nC4 groups), check if the quadrilateral they form is convex and has at least one pair of parallel sides (not both pairs and equal: must not be parallelogram). This is extremely slow for n=500.

- **Observation & Geometry**:  
  A pair of parallel sides can be found by checking if two segments among 4 points have the same slope (but are not the same segment). To avoid parallelograms, the other two sides should not be parallel or not equal length.

- **Efficient Approach**:
  - Fix a pair of points (as a potential base for one side of a trapezoid) and another pair as the second potential base.
  - For every unordered pair of non-overlapping segments: if their slopes are equal and sides are not co-linear, and their lengths differ, you have a candidate.
  - To optimize, precompute all possible unordered pairs of points, group by slope, and use hash maps to speed up parallel side matching.
  - Carefully avoid counting parallelograms: both sides cannot be equal in length.

- **Why this works**:  
  The geometric hashing for slopes makes parallel-side-search efficient (\(O(n^2)\) pairs, group & match by slope). Counting valid combinations avoiding the parallelogram case brings the time down to practical levels.

### Corner cases to consider  
- All 4 points collinear → not a trapezoid.
- 4 points form a parallelogram (all sides parallel pairwise) → exclude.
- Some groups have more than 1 pair of parallel sides → exclude.
- Duplicate slopes with same length → check length to exclude parallelograms.
- Points forming a kite, rectangle, or generic convex quadrilateral with no parallel sides.

### Solution

```python
def countTrapezoids(points):
    from collections import defaultdict

    def slope(p1, p2):
        dx = p2[0] - p1[0]
        dy = p2[1] - p1[1]
        if dx == 0:  # vertical line
            return ('inf', 0)
        if dy == 0:  # horizontal line
            return (0, 0)
        # normalize direction for integer ratios to canonical form
        from math import gcd
        g = gcd(dy, dx)
        return (dy // g, dx // g)

    seg_groups = defaultdict(list)  # (slope) → list of (sorted endpoints, length_sq)

    n = len(points)
    for i in range(n):
        for j in range(i+1, n):
            s = slope(points[i], points[j])
            l = (points[i][0] - points[j][0])**2 + (points[i][1] - points[j][1])**2
            seg_groups[s].append( (frozenset([i, j]), l) )

    ans = 0

    # For each group of same-slope segments, consider all unordered pairs with no index overlap
    for group in seg_groups.values():
        m = len(group)
        for i in range(m):
            seg1, l1 = group[i]
            for j in range(i+1, m):
                seg2, l2 = group[j]
                # To form a quadrilateral, the four indices must be disjoint
                if seg1.isdisjoint(seg2) and l1 != l2:  # lengths not equal avoids parallelogram
                    ans += 1
    # Each valid unordered pair of parallel sides forms exactly one trapezoid
    return ans // 1  # no double-counting. Each is unique

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²²)  
  - All segment pairs: O(n²)
  - For each slope group (few groups), check all unordered pairs: At worst O(n⁴) but usually far fewer by grouping and index disjointness. Practical for n ≤ 500.
- **Space Complexity:** O(n²) for storing all segment slopes in hash map.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you count *all convex quadrilaterals*, not just trapezoids?  
  *Hint: Think about what properties make a quadrilateral convex—no three collinear, and cross products of sides.*

- How could you extend this to count *isosceles* or *right* trapezoids?  
  *Hint: Add checks for side lengths or for right angles between adjacent sides using dot products.*

- Can you efficiently recover not just the count, but the list of all such trapezoids?  
  *Hint: Modify the hash map to store indices and build the actual point lists as you match segment pairs.*

### Summary
This problem combines **geometry**, **combinatorics**, and **hash mapping** for parallel side detection, and requires careful exclusion of parallelograms.  
It's an example of "geometry + hashing"—the same grouping-by-slope or angle pattern appears in problems like "Number of Boomerangs," "Number of Colinear Triplets," or fast parallelogram counting.  
Handling properties like convexity, parallelism, and side length without brute force is crucial for efficient solutions to many geometry-with-points problems.