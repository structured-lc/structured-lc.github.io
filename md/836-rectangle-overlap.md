### Leetcode 836 (Easy): Rectangle Overlap [Practice](https://leetcode.com/problems/rectangle-overlap)

### Description  
Given two axis-aligned rectangles, each represented by a list of four integers `[x1, y1, x2, y2]`, where `(x1, y1)` is the bottom-left corner, and `(x2, y2)` is the top-right corner, determine whether these two rectangles **overlap**. Two rectangles overlap if the area of their intersection is positive—touching only at the edge or corner does **not** count as overlap.

### Examples  

**Example 1:**  
Input: `rec1 = [0,0,2,2]`, `rec2 = [1,1,3,3]`  
Output: `True`  
*Explanation: The two rectangles share the area from (1,1) to (2,2). This intersection is not empty, thus they overlap.*

**Example 2:**  
Input: `rec1 = [0,0,1,1]`, `rec2 = [1,0,2,1]`  
Output: `False`  
*Explanation: The right edge of the first rectangle and the left edge of the second rectangle just touch at x=1. No area is shared, so they do not overlap.*

**Example 3:**  
Input: `rec1 = [0,0,1,1]`, `rec2 = [2,2,3,3]`  
Output: `False`  
*Explanation: The rectangles are far apart and do not overlap at all.*

### Thought Process (as if you’re the interviewee)  
First, think of the **basic geometry**: overlap requires that the intersection of the two rectangles forms a non-zero area. That is, the rectangles must share **some region** that is neither just an edge nor a single point.

A brute-force way would be to check every possible point where the two could overlap, but since the rectangles are axis-aligned and defined by corners, it’s better to use their coordinates directly.

To determine if there is **no overlap**, one rectangle has to be:
- Completely to the left of the other (`x2 ≤ x3` or `x4 ≤ x1`)
- Completely above the other (`y2 ≤ y3` or `y4 ≤ y1`)
  
If none of these are true, then there must be some overlap.

So, check **the opposite**: 
Return `not (rec1 is to the left of rec2 or rec1 is to the right of rec2 or rec1 is above rec2 or rec1 is below rec2)`.

### Corner cases to consider  
- Rectangles that share only an edge or corner (should return `False`)
- Rectangles with zero area (e.g., top-right equals bottom-left for either rectangle)
- Negative coordinates (rectangles still overlap geometrically)
- Rectangles fully contained inside each other (should return `True`)
- Very large or very small coordinates

### Solution

```python
def isRectangleOverlap(rec1, rec2):
    # Unpack coordinates for both rectangles
    x1, y1, x2, y2 = rec1
    x3, y3, x4, y4 = rec2

    # Check for no overlap condition
    if x2 <= x3 or x4 <= x1:  # rec1 is left or right of rec2
        return False
    if y2 <= y3 or y4 <= y1:  # rec1 is above or below rec2
        return False
    # Otherwise, rectangles overlap
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). Only a fixed set of arithmetic and logical comparisons are done, regardless of input values.
- **Space Complexity:** O(1). No extra space, just unpacking four values from each input list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **N rectangles** and return which pairs overlap?
  *Hint: Try a sweep line or interval tree approach for increased efficiency on larger datasets.*

- Can you calculate the **area of overlap**, not just the existence?
  *Hint: Use `max(min(x2, x4) - max(x1, x3), 0)` and similarly for y.*

- How would you apply this to **3D cuboids**?
  *Hint: Extend the check to z-coordinates, i.e., make sure there is overlap on all three axes.*

### Summary
This is a classic **geometry/interval overlap** pattern problem, often asked to test understanding of axis-aligned bounding boxes and edge/corner cases. The approach is pure logic with primitive operations, and generalizes to other shapes (lines, boxes) for bounding box collision detection, a common pattern in computer graphics and game design.

### Tags
Math(#math), Geometry(#geometry)

### Similar Problems
- Rectangle Area(rectangle-area) (Medium)