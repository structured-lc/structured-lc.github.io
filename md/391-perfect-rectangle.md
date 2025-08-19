### Leetcode 391 (Hard): Perfect Rectangle [Practice](https://leetcode.com/problems/perfect-rectangle)

### Description  
You are given a list of **N axis-aligned rectangles**. Each rectangle is given by its bottom-left and top-right coordinates: `[x₁, y₁, x₂, y₂]`.  
Your task: **determine if all rectangles together form an exact cover of a single rectangular region** with **no overlaps and no gaps**.  

That is, the union of all rectangles must be exactly one rectangle, and all rectangles must fit perfectly—no missing spots, and none should overlap.

### Examples  

**Example 1:**  
Input: `[[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]`  
Output: `True`  
*Explanation: All 5 rectangles together form an exact cover of a rectangular region.*  

**Example 2:**  
Input: `[[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]`  
Output: `False`  
*Explanation: There is a gap between the two rectangular regions, so it is not an exact cover.*  

**Example 3:**  
Input: `[[1,1,3,3],[3,1,4,2],[1,3,2,4],[3,2,4,4]]`  
Output: `False`  
*Explanation: There is a gap in the top center. The rectangles do not perfectly cover a rectangular region.*  

**Example 4:**  
Input: `[[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]`  
Output: `False`  
*Explanation: Two rectangles overlap with each other, which is not allowed for a perfect rectangle.*  

### Thought Process (as if you’re the interviewee)  
Start by thinking about what makes a perfect rectangle:
- The **total area covered by the input rectangles must be equal to the area of the bounding rectangle** that stretches from the bottom-left to the top-right of all input rectangles.
- **No gaps** and **no overlaps** are allowed.

Brute-force idea:
- Map and mark every unit within each rectangle to ensure full coverage and no overlap.  
- This is too slow and memory intensive for large coordinate ranges.

Optimized approach:
- Use a set to store each **corner** seen across all rectangles.
- For each rectangle:  
  - Add and remove each of its four corners in the set (add if unseen, remove if already in set).  
  - After processing all rectangles, only the four corners of the bounding rectangle should remain in the set—all internal corners are paired/covered an even number of times, so get canceled out.
- Calculate the bounding rectangle’s area and sum all rectangle areas; these must be equal.
- If both area and corner uniqueness conditions are satisfied, it’s a perfect rectangle.

Trade-offs:  
- This approach is efficient, avoids unnecessary memory usage, and ensures both no-overlap and no-gap conditions with simple set operations.

### Corner cases to consider  
- Overlapping rectangles  
- Rectangles with gaps (not touching)  
- Multiple small rectangles perfectly covering a region  
- A single rectangle (should return True)  
- Rectangles with negative coordinates  
- Non-unit rectangles (different widths/heights)  
- Floating point imprecision (if using floats; integer-only in this problem)  
- Rectangles that share only an edge or a corner

### Solution

```python
def isRectangleCover(rectangles):
    # Track all corners in a set
    corners = set()
    min_x = min_y = float('inf')
    max_x = max_y = float('-inf')
    area = 0

    for x1, y1, x2, y2 in rectangles:
        # Update bounding rectangle
        min_x = min(min_x, x1)
        min_y = min(min_y, y1)
        max_x = max(max_x, x2)
        max_y = max(max_y, y2)
        area += (x2 - x1) * (y2 - y1)
        # For each corner, toggle: add if not there, remove if present
        for p in [(x1, y1), (x1, y2), (x2, y1), (x2, y2)]:
            if p in corners:
                corners.remove(p)
            else:
                corners.add(p)

    # The area of the bounding rectangle
    bounding_area = (max_x - min_x) * (max_y - min_y)
    if area != bounding_area:
        return False

    # Only 4 corners should remain
    expected_corners = {(min_x, min_y), (min_x, max_y), (max_x, min_y), (max_x, max_y)}
    return corners == expected_corners
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of rectangles. Each rectangle is processed in constant time.
- **Space Complexity:** O(N), for storing at most 4 × N corner points in the set (but only up to all rectangles' corners). Constants dominate.

### Potential follow-up questions (as if you’re the interviewer)  

- What if rectangles could have negative coordinates?
  *Hint: Does your logic or bounding rectangle computation change?*
  
- How would you adjust the solution if float coordinates were allowed?
  *Hint: Watch out for floating point arithmetic and precision errors.*
  
- How would you report the first detected overlap or gap, not just a True/False answer?
  *Hint: Maintain additional maps or checks for covered areas.*

### Summary
This problem is a **geometry/bitmasking pattern**, using set corner manipulation to check for exact coverage. The algorithm ensures both **area matching** and **corner parity**: no overlaps, no gaps, and corners appear either once (for the bounding rectangle) or even-numbered times otherwise.  
Similar patterns can be seen in problems involving **perfect cover, tiling, grid masking, or region validation**.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Geometry(#geometry), Line Sweep(#line-sweep)

### Similar Problems
