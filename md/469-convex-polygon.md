### Leetcode 469 (Medium): Convex Polygon [Practice](https://leetcode.com/problems/convex-polygon)

### Description  
You are given a list of points representing vertices of a polygon in order (clockwise or counterclockwise). Your task is to determine if the polygon is **convex**. A polygon is convex if all its internal angles are less than 180°, i.e., it has no "indentations" or concave angles, and no three consecutive points are collinear. You must return True if the polygon is convex, otherwise False.

### Examples  

**Example 1:**  
Input: `points = [[1,1],[2,2],[2,0],[1,0]]`  
Output: `True`  
*Explanation: This polygon is a convex quadrilateral (roughly a square). All turns go in the same direction and there are no collinear consecutive points.*

**Example 2:**  
Input: `points = [[1,1],[2,2],[3,3]]`  
Output: `False`  
*Explanation: The three points are collinear, which means the polygon is not convex.*

**Example 3:**  
Input: `points = [[0,0],[0,1],[1,1],[1,0],[0,0]]`  
Output: `True`  
*Explanation: This is a square polygon (closed by repeating the first point) and is convex.*

### Thought Process (as if you’re the interviewee)  
To determine if a polygon is convex, a brute force idea is to check all interior angles whether they are less than 180°. Calculating angles might be complex and inefficient. Instead, I would consider the orientation of consecutive triples of points using cross products—it tells us the "turn direction" as we move around the polygon.

- Compute the cross product of vectors formed by every three consecutive points (points[i], points[i+1], points[i+2]).
- The sign of the cross product indicates the direction of the turn (clockwise or counterclockwise).
- If all the cross products have the same sign (all positive or all negative), it means all turns are in the same direction, thus the polygon is convex.
- If any cross product changes sign, it indicates a concave (inward) angle, so we return False.
- Also, if the cross product is 0 (indicating points are collinear), the polygon isn’t strictly convex.

This approach is efficient, requires a single pass through the points, and uses O(1) extra space. The main trade-off is careful handling of cross product computations and modular arithmetic for cyclic indexing of points.

### Corner cases to consider  
- Polygon with exactly 3 points (minimum polygon, always convex if not collinear).
- Three consecutive points collinear (cross product = 0).
- Polygon where points form a straight line.
- Polygons with repeated points (should be unique as per problem constraints).
- Large polygons with up to 10^4 points (ensure O(n) complexity).
- Both clockwise and counterclockwise ordered polygons.

### Solution

```python
def isConvex(points):
    # Number of points in polygon
    n = len(points)
    if n < 3:
        return False  # Not a polygon
    
    prev_cross = 0  # Store sign of previous cross product
    
    for i in range(n):
        # Get three consecutive points using modulo for wrap-around
        p1 = points[i]
        p2 = points[(i + 1) % n]
        p3 = points[(i + 2) % n]
        
        # Vector from p1 to p2
        x1 = p2[0] - p1[0]
        y1 = p2[1] - p1[1]
        
        # Vector from p2 to p3
        x2 = p3[0] - p2[0]
        y2 = p3[1] - p2[1]
        
        # Cross product of vectors (p1->p2) × (p2->p3)
        cross = x1 * y2 - y1 * x2
        
        # If cross product is zero, points are collinear; polygon not convex
        if cross == 0:
            return False
        
        # Check the sign of cross product for consistency
        if prev_cross == 0:
            prev_cross = cross
        else:
            # If sign changes, polygon is concave
            if cross * prev_cross < 0:
                return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), where n is the number of points. We do a single pass through all points calculating cross products.

- **Space Complexity:**  
  O(1) additional space. Only a few variables used for cross product and indices.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the polygon vertices are not guaranteed to be ordered?  
  *Hint: You might need to sort points or find the polygon hull first.*

- Can this approach detect if the polygon vertices contain self-intersections (complex polygon)?  
  *Hint: This problem assumes a simple polygon, but general polygon intersection detection requires additional checks.*

- How would you handle floating point coordinates with numerical precision issues?  
  *Hint: Consider using epsilon tolerance for comparisons or robust geometric predicates.*

### Summary  
The problem is a classic application of the **cross product sign consistency** pattern to verify polygon convexity by checking polygon turns direction as you walk through vertices. This pattern is common in computational geometry problems like checking convex hull edges or polygon intersection and can be applied wherever orientation testing is required.


### Flashcard
Check the sign of the cross product for every three consecutive points; if all are the same, the polygon is convex.

### Tags
Array(#array), Math(#math), Geometry(#geometry)

### Similar Problems
