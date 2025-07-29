### Leetcode 1459 (Medium): Rectangles Area [Practice](https://leetcode.com/problems/rectangles-area)

### Description  
You are given a table Points that stores the coordinates of points in the 2D plane.  
Each row has an id, an x_value (x-coordinate), and a y_value (y-coordinate).  
Find all pairs of distinct points (P₁, P₂) that can form a rectangle with the axes – meaning the rectangle's sides are parallel to the x- and y-axes.  
For each such rectangle, report the pair of ids (p1, p2) and the computed area.  
Order the results by area in descending order, then by p1, then by p2.  
A rectangle is defined by two opposite corners (i.e., if the x- or y-coordinate is the same, they do not form a rectangle).

### Examples  

**Example 1:**  
Input:  
Table Points:  
| id | x_value | y_value |  
|----|---------|---------|  
| 1  | 1       | 1       |  
| 2  | 2       | 2       |  
| 3  | 1       | 2       |  
| 4  | 2       | 1       |  
Output:  
| p1 | p2 | area |  
|----|----|------|  
| 1  | 2  | 1    |  
| 1  | 4  | 1    |  
| 2  | 3  | 1    |  
| 3  | 4  | 1    |  
*Explanation: All rectangles formed by these opposite corners have area 1.*

**Example 2:**  
Input:  
Table Points:  
| id | x_value | y_value |  
|----|---------|---------|  
| 1  | 1       | 3       |  
| 2  | 4       | 3       |  
| 3  | 1       | 1       |  
| 4  | 4       | 1       |  
Output:  
| p1 | p2 | area |  
|----|----|------|  
| 1  | 4  | 6    |  
| 2  | 3  | 6    |  
*Explanation: Rectangle with width 3 (4-1) and height 2 (3-1) => area 6.*

**Example 3:**  
Input:  
Table Points:  
| id | x_value | y_value |  
|----|---------|---------|  
| 1  | 0       | 0       |  
| 2  | 0       | 1       |  
| 3  | 1       | 0       |  
*Output:  
| p1 | p2 | area |  
(No output, because we cannot form a rectangle as we don't have both pairs of x and y coordinates.)*

### Thought Process (as if you’re the interviewee)  
First, observe that two points can define a rectangle only if their x and y are both different (otherwise, they're aligned either horizontally or vertically, not diagonally).  
For each pair of points, if their x and y differ, you can use them as diagonal corners.  
To calculate the rectangle's area:  
Area = |x₁ - x₂| × |y₁ - y₂|  
To avoid duplicate pairs, select only pairs where id₁ < id₂.

Brute-force: Compare every possible pair of points (n² pairs), check if their x and y differ, and if so, calculate and store the area. This is acceptable for small n.

Optimization: In SQL, just do a self join, filter on x and y not equal, and pick id₁ < id₂ for ordering and to avoid duplicate rectangles. Since the input is meant for SQL, the efficient approach is to exploit SQL joins and filtering logic.

### Corner cases to consider  
- No rectangles can be formed if all points are aligned (same x or same y).
- Multiple points may have the same x or y (should not form rectangles if one coordinate is the same).
- Table with less than 2 points (cannot form a rectangle).
- Rectangle area could be 0 if points are aligned; filter those out.
- Duplicate points (should not result in negative or zero area).
- Negative or zero coordinates (should not affect area calculation).

### Solution

```python
# Since this is based on a SQL table, we'll simulate the logic in Python for learning.
# We'll assume points is a list of tuples (id, x, y)

def rectangles_area(points):
    results = []

    # Generate all unique pairs i < j
    for i in range(len(points)):
        for j in range(i+1, len(points)):
            id1, x1, y1 = points[i]
            id2, x2, y2 = points[j]
            # Rectangles need different x and y coordinates
            if x1 != x2 and y1 != y2:
                area = abs(x1 - x2) * abs(y1 - y2)
                results.append( (id1, id2, area) )

    # Sort: by area desc, then by p1, then by p2
    results.sort(key=lambda x: (-x[2], x[0], x[1]))
    return results

# Example usage:
# points = [(1,1,1), (2,2,2), (3,1,2), (4,2,1)]
# print(rectangles_area(points))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). Every pair of points is compared once; there are ⌊n/2⌋ \* n pairs.
- **Space Complexity:** O(k), where k is the number of pairs that form rectangles and are stored in the results list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the Point table is extremely large and won't fit in memory?  
  *Hint: Can you stream the data or use a database approach (self join with right indexing)?*

- How would you avoid duplicates if rectangles are defined by four points instead of just the diagonally opposite two?  
  *Hint: Think about canonical rectangle representations or hash set for visited rectangles.*

- Can you include rectangles of zero area (degenerate cases), or filter them explicitly?  
  *Hint: Should you include or exclude rectangles where x₁ == x₂ or y₁ == y₂?*

### Summary
This problem is a classic pairwise-comparison challenge and a good example of generating and filtering pairs to satisfy geometric constraints. The coding pattern—nested loops for unique pairs and filtering based on property differences—is common in 2D computational geometry and can be applied to problems involving rectangular detection, pairwise distances, and more. For an SQL solution, the self join with the appropriate WHERE clause is the key insight.