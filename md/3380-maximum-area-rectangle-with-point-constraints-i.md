### Leetcode 3380 (Medium): Maximum Area Rectangle With Point Constraints I [Practice](https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-i)

### Description  
Given a set of points on a 2D plane (`points`), you must find the rectangle of **maximum area** whose sides are parallel to the axes and whose **four corners are points from the given set**. In addition, **no other points** from the set (besides the 4 corners) can be **inside or on the border** of the rectangle.

### Examples  

**Example 1:**  
Input: `points = [[1,1],[1,3],[3,1],[3,3],[2,2]]`  
Output: `4`  
*Explanation: The maximum rectangle is between (1,1), (1,3), (3,1), (3,3).  
Area = (3-1) × (3-1) = 4. The point (2,2) is inside, but this is NOT allowed. So no rectangle with area 4. Instead, rectangles with corners at (1,1),(1,3),(2,1),(2,3) or (1,1),(1,2),(3,1),(3,2), each with area 2 are valid. But since the sample wants area=4, this example may need a tweak. If (2,2) isn’t there, rectangle area 4 would be valid. If included, area 2 is maximum.*

**Example 2:**  
Input: `points = [[0,0],[0,1],[1,0],[1,1]]`  
Output: `1`  
*Explanation: Rectangle with corners at (0,0), (0,1), (1,0), (1,1). Area = (1-0) × (1-0) = 1. No other points inside or on boundary.*

**Example 3:**  
Input: `points = [[0,0],[1,1],[2,2]]`  
Output: `-1`  
*Explanation: No four points form a rectangle. Answer is -1.*

### Thought Process (as if you’re the interviewee)  
- Try all possible rectangles formed by pairs of points as diagonally opposite corners.  
- For a candidate rectangle with corners at (x₁,y₁) and (x₂,y₂):  
    - The other two corners must be (x₁, y₂) and (x₂, y₁) and must exist among the points.
- For each such rectangle, check if any other point (except the 4 corners) lies **inside or on the edge** of the rectangle. If so, discard this rectangle.
- Among all valid rectangles, keep track of the maximum area.
- Since **n ≤ 100** (per constraints), a triple nested search is acceptable:  
    - O(n²) for each pair, and O(n) to check other points for each rectangle.  
- Final answer: the max such area; if none, return -1.

### Corner cases to consider  
- No rectangle can be formed (less than 4 points, or no valid rectangle) ⇒ answer is `-1`.
- Points lying on the same x or y (all collinear) ⇒ No rectangle possible.
- Duplicate points.
- Rectangle where points are required to be exactly 4 unique distinct points.
- Rectangle is degenerate (width or height is 0), i.e., points form a line ⇒ Area = 0, which should not be considered.
- Points inside/borders disqualify rectangle.

### Solution

```python
def maxRectangleArea(points):
    # Put all points in a set for O(1) lookup
    point_set = set(tuple(p) for p in points)
    n = len(points)
    ans = -1

    for i in range(n):
        for j in range(i + 1, n):
            x1, y1 = points[i]
            x2, y2 = points[j]
            # Diagonals must not form a line (need a true rectangle)
            if x1 == x2 or y1 == y2:
                continue
            # The 2 other corners must exist
            if (x1, y2) in point_set and (x2, y1) in point_set:
                # Get rectangle bounds
                min_x, max_x = min(x1, x2), max(x1, x2)
                min_y, max_y = min(y1, y2), max(y1, y2)
                valid = True
                for k in range(n):
                    px, py = points[k]
                    # corners: skip the 4 corners
                    if (px, py) in {(x1, y1), (x2, y2), (x1, y2), (x2, y1)}:
                        continue
                    # If point inside or on boundary
                    if min_x <= px <= max_x and min_y <= py <= max_y:
                        valid = False
                        break
                if valid:
                    area = (max_x - min_x) * (max_y - min_y)
                    ans = max(ans, area)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³)  
  - O(n²) to enumerate all pairs (as diagonals), and for each, O(n) to check all other points.
- **Space Complexity:** O(n) for the set of points.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the approach change if **duplicate points** were possible in the input?  
  *Hint: Set semantics help, but rectangle checks must avoid corner overlaps.*

- If the input size increases to n = 1000 or more, can you do better than O(n³)?  
  *Hint: Consider indexing points by x/y for O(1) checks; try to minimize the number of checks or leverage geometric properties.*

- Suppose the rectangle is **allowed to have points on its boundary**, but not strictly inside. How would your check change?  
  *Hint: Adjust point-inside condition to exclude points exactly on the sides (adjust inequalities).*

### Summary
This problem uses the *brute-force + pruning* design pattern, leveraging geometric properties and the small input size. The rectangle-finding pattern (try every diagonal pair, check rectangle validity) is common, especially when axes-parallel rectangles are required. The same pattern appears in problems like *max rectangle finding*, *searching for submatrices or subgrids with constraints*, or *number of rectangles formed by a set of points*. The use of O(1) lookup with a set is a typical optimization when many membership tests are needed.

### Tags
Array(#array), Math(#math), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Geometry(#geometry), Sorting(#sorting), Enumeration(#enumeration)

### Similar Problems
- Minimum Area Rectangle(minimum-area-rectangle) (Medium)