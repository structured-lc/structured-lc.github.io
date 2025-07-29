### Leetcode 3382 (Hard): Maximum Area Rectangle With Point Constraints II [Practice](https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-ii)

### Description  
Given two lists xCoord and yCoord representing the x- and y-coordinates of n points in the plane, find the **maximum area of a rectangle** (with sides parallel to axes) such that *all four of its corners* are among these points, and **the rectangle contains no other point (from the input) strictly inside or on its border** except its four corners.
Return the maximum area found, or 0 if there is no such rectangle.

### Examples  

**Example 1:**  
Input: `xCoord = [1,2,1,2], yCoord = [1,1,2,2]`  
Output: `1`  
*Explanation: The four points form a square with area 1. No extra points are inside or on the edge besides the four corners.*

**Example 2:**  
Input: `xCoord = [0,0,1,1,2,2], yCoord = [0,2,0,2,0,2]`  
Output: `4`  
*Explanation: Points (0,0),(0,2),(2,0),(2,2) form a rectangle of area 4. There is no extra point inside or on the border besides these four.*

**Example 3:**  
Input: `xCoord = [0,2,2,0], yCoord = [0,0,2,2]`  
Output: `4`  
*Explanation: The four points make a square from (0,0) to (2,2).*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Enumerate every pair of points to form diagonal corners of a potential rectangle.
  - Check if the other two required corners exist in the input.
  - For each valid rectangle, check that *no other point* lies on or inside the rectangle (excluding the corners).

- **Optimization:**  
  - Use a set for O(1) point existence checks.
  - When checking for extra points inside/on the rectangle, only consider points within the rectangle, skipping the four corners.
  - Instead of checking all n⁴ pairs, fix two corners, and deduce the other two, reducing checks.
  - Complexity mainly from the nested loops (choosing corners) plus an O(n) inside check.

- **Trade-offs:**  
  - Most time spent on the “no points inside/on border” check.
  - The rectangle check is O(1), but validation is O(n) for each candidate.

- **Why this approach:**  
  - Rectangle must be axis-aligned and fully determined by its corners.
  - Data structures (set) allow fast lookups.  
  - It's possible to prune impossible candidates early if missing a corner.


### Corner cases to consider  
- Fewer than 4 points (no rectangle possible).
- All points are colinear (area is always 0).
- Duplicate points (shouldn’t affect area, but need deduplication).
- Points forming multiple rectangles, but some contain other points inside/on edge.
- Negative coordinates or large values.


### Solution

```python
def maxRectangleArea(xCoord, yCoord):
    # Step 1: Build set of points for fast lookup and dedup.
    points = set(zip(xCoord, yCoord))
    n = len(xCoord)
    max_area = 0

    # Step 2: Enumerate all pairs of points to serve as diagonally opposite corners.
    for i in range(n):
        for j in range(i + 1, n):
            x1, y1 = xCoord[i], yCoord[i]
            x2, y2 = xCoord[j], yCoord[j]

            # Skip if points are on the same line (cannot form diagonal)
            if x1 == x2 or y1 == y2:
                continue

            # The other two corners needed to complete the rectangle
            corner3 = (x1, y2)
            corner4 = (x2, y1)

            if corner3 in points and corner4 in points:
                # Compute bounds for the rectangle
                left, right = min(x1, x2), max(x1, x2)
                bottom, top = min(y1, y2), max(y1, y2)
                valid = True

                # Check every point if it is inside or on the border, excluding four corners
                for k in range(n):
                    px, py = xCoord[k], yCoord[k]
                    if (px, py) in [(x1, y1), (x2, y2), corner3, corner4]:
                        continue
                    # Point inside rectangle or on its borders
                    if left <= px <= right and bottom <= py <= top:
                        valid = False
                        break
                if valid:
                    area = abs(x1 - x2) * abs(y1 - y2)
                    max_area = max(max_area, area)
    return max_area
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n² × n) = O(n³).  
    - O(n²) for pairs of diagonal corners.
    - For each, O(n) to check all points inside/on edges.
  - Fast set lookup for corner existence is O(1).
- **Space Complexity:**  
  - O(n) for storing points as a set.
  - No extra structures depend on output or recursion: just counters/flags.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize if the points are known to be on a grid?  
  *Hint: Try to leverage structure and coordinate compression.*

- How would you handle if rectangle sides can be non-axis-aligned?  
  *Hint: Would need geometry or vector methods.*

- What’s your approach if you only want to count such rectangles, rather than maximize area?  
  *Hint: Remove area computation, just count established rectangles.*

### Summary
This problem uses an enumeration and validation pattern common in computational geometry, especially where axis-alignment allows O(1) point lookups. The brute-force + set combo is typical for “find rectangles in a set of points” when further constraints (no internal points) must be enforced. This pattern appears in grid, maximal/minimal submatrix/rectangle, or rectangle-finding variations in arrays and geometry problems.