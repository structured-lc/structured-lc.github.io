### Leetcode 3047 (Medium): Find the Largest Area of Square Inside Two Rectangles [Practice](https://leetcode.com/problems/find-the-largest-area-of-square-inside-two-rectangles)

### Description  
Given n rectangles on a 2D plane, each described by its bottom-left and top-right coordinates, find the maximum area of a square that can fit *completely inside* the intersection of any two different rectangles. Return 0 if there is no such square.  
- Every rectangle is axis-aligned (sides parallel to axes).
- The square's edges must also be axis-aligned.

### Examples  

**Example 1:**  
Input: `bottomLeft = [[0,0],[1,1]], topRight = [[2,2],[3,3]]`  
Output: `1`  
*Explanation: The overlap of the two rectangles is from (1,1) to (2,2), which is a 1×1 square. So, largest possible square area is 1.*

**Example 2:**  
Input: `bottomLeft = [[1,1],[1,3],[1,5]], topRight = [[5,5],[5,7],[5,9]]`  
Output: `4`  
*Explanation: Rectangles 0 and 1 overlap in a region from (1,3) to (5,5). The side of intersection is min(5-1,5-3)=2, so a 2×2 square fits. Largest area is 4.*

**Example 3:**  
Input: `bottomLeft = [[0,0],[2,2]], topRight = [[1,1],[3,3]]`  
Output: `0`  
*Explanation: The rectangles do not overlap. Thus, no square can fit. Output is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each pair of rectangles (i < j), compute their intersection region. If the intersection exists, its width is min(r₁, r₂) - max(l₁, l₂), and height is min(t₁, t₂) - max(b₁, b₂).  
  The largest square that fits has side-length equal to min(width, height) (if both are positive), so the max area is side × side.  
  Iterate over all pairs, keep track of the maximum found.

- **Optimization:**  
  Given n rectangles, there are only O(n²) pairs, and checking overlap and calculating the area is constant time per pair, so this approach is practical for reasonable n.  
  No further meaningful optimization exists unless we process huge n.

- **Trade-offs:**  
  Could preprocess rectangles’ projections, but as intersection for arbitrary axis-aligned rectangles is fast, brute-force is sufficient and optimal in most case interviews.

### Corner cases to consider  
- No two rectangles overlap at all (result must be 0).
- Overlap exists, but one side is 0 or negative (not a real region).
- All coordinates are negative.
- Only two rectangles are given.
- All rectangles overlap in the same small region, the maximal area comes from one spot.
- Multiple rectangle pairs yield same area.

### Solution

```python
def largestSquareArea(bottomLeft, topRight):
    n = len(bottomLeft)
    max_area = 0

    # Iterate through all unique pairs of rectangles
    for i in range(n):
        for j in range(i + 1, n):
            # Coordinates of first rectangle
            x1, y1 = bottomLeft[i]
            x2, y2 = topRight[i]
            # Coordinates of second rectangle
            x3, y3 = bottomLeft[j]
            x4, y4 = topRight[j]

            # Find intersection
            left   = max(x1, x3)
            right  = min(x2, x4)
            bottom = max(y1, y3)
            top    = min(y2, y4)

            # Calculate width and height of the intersection region
            width  = right - left
            height = top - bottom

            # The largest square has side length = min(width, height), if both > 0
            if width > 0 and height > 0:
                side = min(width, height)
                area = side * side
                if area > max_area:
                    max_area = area

    return max_area
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) for n rectangles, since we check all pairs. Each pair takes O(1) time to compute intersection and area.
- **Space Complexity:** O(1) extra space; we only store a few variables. No additional data structures beyond input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need the coordinates of the largest square as well?
  *Hint: Track not just side length, but also store (left, bottom) of intersection when you find a new max.*

- How would you handle rectangles/squares not aligned with axes (rotated)?
  *Hint: Intersection becomes harder, may need computational geometry library or rotate-coordinates math.*

- What if asked to find the largest rectangle (not restricted to square) in the intersection?
  *Hint: In that case, report width × height for each intersection, not just min(width, height) × min(width, height).*

### Summary
This problem uses the classic geometry pattern of finding the intersection area between pairs of rectangles, then extracting a maximal inscribed square using min(width, height). It's a brute-force pair search (n²), but each step is fast and draws on the key realization that the maximal axis-aligned square within a rectangle is determined by its shorter side. This technique is widely applicable to other intersection, range, or containment queries in 2D geometry.

### Tags
Array(#array), Math(#math), Geometry(#geometry)

### Similar Problems
- Rectangle Area(rectangle-area) (Medium)