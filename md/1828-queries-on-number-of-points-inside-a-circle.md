### Leetcode 1828 (Medium): Queries on Number of Points Inside a Circle [Practice](https://leetcode.com/problems/queries-on-number-of-points-inside-a-circle)

### Description  
Given an array of points in the 2D plane, and an array of queries where each query specifies a circle (with center and radius), count how many of those points lie inside (or exactly on) each circle. Return an array of counts, one for each query.  
A point is *inside or on* a circle if its Euclidean distance to the center is ≤ radius.

### Examples  

**Example 1:**  
Input: `points = [[1,3],[3,3],[5,3],[2,2]], queries = [[2,3,1],[4,3,1],[1,1,2]]`  
Output: `[3,2,2]`  
*Explanation:*
- Query 1: Circle (2,3), r=1 covers [1,3],[2,2],[3,3] ⇒ 3 points.
- Query 2: Circle (4,3), r=1 covers [3,3],[5,3] ⇒ 2 points.
- Query 3: Circle (1,1), r=2 covers [1,3],[2,2] ⇒ 2 points.

**Example 2:**  
Input: `points = [[1,1],[2,2],[3,3]], queries = [[2,2,1],[3,3,1],[1,1,2]]`  
Output: `[2,2,2]`  
*Explanation:*
- Query 1: covers [1,1], [2,2]
- Query 2: covers [2,2], [3,3]
- Query 3: covers [1,1], [2,2]

**Example 3:**  
Input: `points = [[0,0],[5,5]], queries = [[1,1,2],[6,6,1]]`  
Output: `[1,1]`  
*Explanation:*
- Query 1: Only [0,0] is within the circle centered at (1,1) with r=2.
- Query 2: Only [5,5] is within the circle centered at (6,6) with r=1.

### Thought Process (as if you’re the interviewee)  
- First, for each circle, I need to count how many points are within or on its boundary.
- For each query, iterate over all the points, and for each, check if it is "in" the circle using the distance formula:  
  distance² = (x - xc)² + (y - yc)² ≤ r²  (avoid square roots for speed)
- Brute-force is straightforward: For each query, check every point.
- Time complexity is O(#queries × #points), which is acceptable for moderate sizes.
- If both points and queries are very large, we’d need a spatial structure (like a KD-tree or quad-tree), but not required unless scaling is proven to be a bottleneck.
- This problem's constraints do not require an optimized approach beyond the brute-force check.

### Corner cases to consider  
- Empty `points` array → all outputs are 0.
- Empty `queries` array → output is an empty array.
- Points exactly on the circle boundary should be counted.
- Negative coordinates, points at (0,0), very large/small radii.
- Duplicate points or queries.
- Circles with radius 0 → only points exactly at the center are counted.

### Solution

```python
def countPoints(points, queries):
    """
    Arguments:
    points -- List of [x, y] coordinates
    queries -- List of [xc, yc, r] describing circle center and radius

    Returns:
    List of counts, one per query
    """
    res = []
    for xc, yc, r in queries:
        cnt = 0
        r_squared = r * r
        for x, y in points:
            dx = x - xc
            dy = y - yc
            if dx * dx + dy * dy <= r_squared:
                cnt += 1
        res.append(cnt)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(q × n), where q = number of queries, n = number of points.  
  For each query, we check every point once.
- **Space Complexity:** O(q) for the result array.  
  No additional data structures except for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you speed this up if there are millions of points and queries?
  *Hint: Use spatial partitioning (KD-tree, grid bucketing, quad-tree) to efficiently find points near each circle center.*

- If updates are allowed (adding/removing points), how would your approach change?
  *Hint: Use dynamic spatial structures that support updates, like a balanced KD-tree.*

- How do you handle floating-point coordinates or radii?
  *Hint: Use careful floating-point comparison, possibly with a small epsilon.*

### Summary
Simple geometric brute-force using the distance property for circles.  
This pattern—check each object against every query object—is a classic double-loop for range-counting problems; if needed for large input, spatial data structures can improve performance. Similar approaches appear in nearest neighbor, collision, or region-counting queries in 2D computational geometry.

### Tags
Array(#array), Math(#math), Geometry(#geometry)

### Similar Problems
- Count Lattice Points Inside a Circle(count-lattice-points-inside-a-circle) (Medium)
- Count Number of Rectangles Containing Each Point(count-number-of-rectangles-containing-each-point) (Medium)
- Check if the Rectangle Corner Is Reachable(check-if-the-rectangle-corner-is-reachable) (Hard)