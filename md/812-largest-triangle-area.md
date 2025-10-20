### Leetcode 812 (Easy): Largest Triangle Area [Practice](https://leetcode.com/problems/largest-triangle-area)

### Description  
You are given an array of points on the X–Y plane, with each point represented as `[xi, yi]`. Find and return the area of the largest triangle that can be formed using any three unique points from this list. The answer should be accurate within 10⁻⁵.  

### Examples  

**Example 1:**  
Input: `[[0,0],[0,1],[1,0],[0,2],[2,0]]`  
Output: `2.00000`  
*Explanation: The triangle with vertices (0,2), (2,0), and (0,0) forms the largest triangle with area 2. All triangles are checked and this one has the maximum area.*

**Example 2:**  
Input: `[[1,0],[0,0],[0,1]]`  
Output: `0.50000`  
*Explanation: The only triangle formed occupies half a unit square: area = 0.5.*

**Example 3:**  
Input: `[[0,0],[100,0],[0,100],[100,100],[50,50]]`  
Output: `5000.00000`  
*Explanation: The triangle (0,0), (100,0), (0,100) has area 0.5 × 100 × 100 = 5000.*

### Thought Process (as if you’re the interviewee)  
To solve this, notice:
- A triangle can be formed using any three different points.
- For each triple, compute the area.
- The optimal solution is the maximum area among all possible triangles.

Brute-force:
- Loop through all possible sets of three points (since input size ≤ 50, so ⌊n/2⌋ combinations is very manageable).
- To compute the area for points (x₁, y₁), (x₂, y₂), (x₃, y₃), use the shoelace (determinant) formula:
  Area = 0.5 × |x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|

Since this is only 50 choose 3 (max ~20,000 combinations), a triple-nested loop is acceptable and clear.

Optimization:
- For much larger lists, convex hull could be used, but for this constraint brute-force is both simplest and fastest to implement.

### Corner cases to consider  
- All points are collinear (area zero).
- Minimum allowed number of points (exactly 3).
- Very large or negative coordinates.
- Some input triangles will have area zero or extremely small (all possible output values should be checked).

### Solution

```python
def largestTriangleArea(points):
    max_area = 0
    n = len(points)
    
    # Iterate over all combinations of three points
    for i in range(n):
        for j in range(i+1, n):
            for k in range(j+1, n):
                x1, y1 = points[i]
                x2, y2 = points[j]
                x3, y3 = points[k]
                # Shoelace formula for area of triangle given three points
                area = abs(
                    x1 * (y2 - y3) +
                    x2 * (y3 - y1) +
                    x3 * (y1 - y2)
                ) / 2
                if area > max_area:
                    max_area = area
    return max_area
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³), since all combinations of three points (n ≤ 50) are checked with three nested loops.
- **Space Complexity:** O(1), excluding input size; no extra data structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if `n` was much larger, say 10,000?
  *Hint: Think about geometric algorithms like the convex hull, which restricts the search space for maximum-area triangles.*

- Can you return not just the area, but the actual points forming that triangle?
  *Hint: Store indices or points along with the maximum area as you iterate.*

- How would you modify the solution if repeated points were allowed?
  *Hint: Take care to skip identical indices and handle degenerate (zero-area) cases robustly.*

### Summary
This is a **brute-force combination problem**: check all possible triangles from the given points, using the **shoelace formula** for calculating triangle areas in 2D. This "all combinations" approach is simple and fully acceptable due to the small `n`. The pattern of "check all k-combinations" is commonly applied in geometry or combinatorial problems with low input bounds.


### Flashcard
Try all point triples and compute area using the shoelace formula; return the maximum area found.

### Tags
Array(#array), Math(#math), Geometry(#geometry)

### Similar Problems
- Largest Perimeter Triangle(largest-perimeter-triangle) (Easy)