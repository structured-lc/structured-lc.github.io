### Leetcode 1232 (Easy): Check If It Is a Straight Line [Practice](https://leetcode.com/problems/check-if-it-is-a-straight-line)

### Description  
Given an array of points on a 2D plane where each point is represented as [x, y], determine if all the given points lie along a single straight line.  
In other words: Can you draw exactly one straight line that passes through all these points?

### Examples  

**Example 1:**  
Input: `coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]`  
Output: `true`  
*Explanation: The points all follow an increment of +1 for x and y, so they line up perfectly in a straight line (slope of 1).*

**Example 2:**  
Input: `coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]`  
Output: `false`  
*Explanation: The third point breaks the straight-line pattern; not all slopes between consecutive points are equal.*

**Example 3:**  
Input: `coordinates = [[0,0],[0,1],[0,-1],[0,-2]]`  
Output: `true`  
*Explanation: All points have x=0; this is a vertical line.*

### Thought Process (as if you’re the interviewee)  
Start with a brute-force approach: Compare the slope between every pair of points, but that’s O(n²).  
To optimize, pick the first two points and calculate the “reference” slope. Then, loop through each remaining point, checking that the slope between it and the first point is the same as the reference slope.  
To avoid floating-point errors and handle vertical lines (when x differences are zero), compare cross multiplication — that is, check (y - y₁) × (x₂ - x₁) == (y₂ - y₁) × (x - x₁) for all points.  
This method is robust, avoids division by zero, and efficient at O(n) time.

### Corner cases to consider  
- Only 2 points: Always forms a straight line.
- Vertical lines: All x values are the same.
- Horizontal lines: All y values are the same.
- Negative coordinates and large positive/negative values.
- Points not sorted, or duplicate y (or x) values but not in a line.
- Points with large coordinate values, test against overflow.

### Solution

```python
def checkStraightLine(coordinates):
    # Extract x and y of first two points for reference slope
    x1, y1 = coordinates[0]
    x2, y2 = coordinates[1]
    dx = x2 - x1
    dy = y2 - y1
    
    # Compare cross products for all remaining points
    for i in range(2, len(coordinates)):
        x, y = coordinates[i]
        # (y - y1) * (x2 - x1) == (y2 - y1) * (x - x1)
        if (y - y1) * dx != dy * (x - x1):
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we scan the coordinates list once.
- **Space Complexity:** O(1), just a few variables for computation; no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the points were in 3D space instead of 2D?  
  *Hint: Consider direction vectors and their equality.*

- How would you handle floating-point coordinates robustly?  
  *Hint: Use epsilon comparison, or stick with integer math wherever possible.*

- If one point were an outlier (noisy data), how would you efficiently detect and remove it?  
  *Hint: Use RANSAC or find the maximum set of collinear points.*

### Summary
This approach uses the **cross product pattern** to robustly check for collinearity, avoiding floating-point division and handling all edge cases cleanly.  
It’s a common trick for collinearity in computational geometry and comes up often in vector-based and line-detection problems.  
Works with O(n) time and O(1) space — simple, reliable, and powerful for interview use.


### Flashcard
Check if all points have the same slope using cross multiplication to avoid division and floating-point errors.

### Tags
Array(#array), Math(#math), Geometry(#geometry)

### Similar Problems
