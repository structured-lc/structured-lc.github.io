### Leetcode 1401 (Medium): Circle and Rectangle Overlapping [Practice](https://leetcode.com/problems/circle-and-rectangle-overlapping)

### Description  
Given a circle center (**xCenter**, **yCenter**) with radius **radius**, and a rectangle whose sides are parallel to the axes and are defined by (x₁, y₁), (x₂, y₂) (bottom left and top right corners). Determine if the circle and rectangle overlap (even partially touching at border/corner is considered overlap).

### Examples  
**Example 1:**  
Input: `radius = 1, xCenter = 0, yCenter = 0, x1 = 1, y1 = -1, x2 = 3, y2 = 1`
Output: `True`
*Explanation: Rectangle is to the right of circle, but the circle touches the rectangle border at (1,0).*

**Example 2:**  
Input: `radius = 1, xCenter = 1, yCenter = 1, x1 = 1, y1 = -3, x2 = 2, y2 = -1`
Output: `False`
*Explanation: The rectangle is completely below the circle, with no overlap/touching.*

**Example 3:**  
Input: `radius = 1, xCenter = 0, yCenter = 0, x1 = -1, y1 = 0, x2 = 0, y2 = 1`
Output: `True`
*Explanation: Rectangle shares edge with the circle: overlap considered True.*

### Thought Process (as if you’re the interviewee)  
- For overlap, if any point on or inside the circle is also inside the rectangle, or vice versa, it's overlapping.
- The minimal distance from the circle center to the rectangle is the key determinant. If this distance is ≤ radius, return True.
- Find the closest point P=(px,py) in the rectangle to the circle center. The distance from (xCenter, yCenter) to (px,py) should be ≤ radius.
- This reduces to clamping x/y coordinates for closest rectangle boundary point.

### Corner cases to consider  
- Circle center inside rectangle
- Circle entirely outside but touching rectangle at edge or corner
- Rectangle and circle do not touch at all

### Solution

```python
def checkOverlap(radius, xCenter, yCenter, x1, y1, x2, y2):
    # Clamp center to rectangle bounds
    closest_x = max(x1, min(xCenter, x2))
    closest_y = max(y1, min(yCenter, y2))
    # Compute squared distance
    dx = xCenter - closest_x
    dy = yCenter - closest_y
    return dx * dx + dy * dy <= radius * radius
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(1), constant work
- **Space Complexity:** O(1), constant

### Potential follow-up questions (as if you’re the interviewer)  
- What if rectangle sides are not axis-aligned?  
  *Hint: Need to rotate/transform coordinates first.*

- What about 3D (sphere with cuboid)?  
  *Hint: Same reduction, just expanded dimensions.*

- If need area of overlap, not just boolean?  
  *Hint: More complicated, requires geometry formulas/integration.*

### Summary
This is a classic geometric "distance-to-rectangle" problem, solved via clamp and Euclidean distance. Pattern occurs widely in graphics, geometry, and collision detection.


### Flashcard
Circle and rectangle overlap if the minimal distance from circle center to rectangle is ≤ radius.

### Tags
Math(#math), Geometry(#geometry)

### Similar Problems
