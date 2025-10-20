### Leetcode 223 (Medium): Rectangle Area [Practice](https://leetcode.com/problems/rectangle-area)

### Description  
Given the coordinates of two axis-aligned rectangles on a 2D plane, calculate the total area covered by both rectangles.  
Each rectangle is defined by its bottom-left corner `(ax1, ay1)` and top-right corner `(ax2, ay2)` (for Rectangle 1), and `(bx1, by1)` and `(bx2, by2)` (for Rectangle 2). Rectangles may overlap. You must avoid double-counting the overlapping area.

### Examples  

**Example 1:**  
Input: `ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2`  
Output: `45`  
*Explanation: Area of Rectangle 1 = 24, Area of Rectangle 2 = 27, Overlap = 6. So, total = 24 + 27 - 6 = 45.*

**Example 2:**  
Input: `ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = 3, by1 = 3, bx2 = 4, by2 = 4`  
Output: `17`  
*Explanation: Rectangles do not overlap. Area 1 = 16, Area 2 = 1. Total = 16 + 1 = 17.*

**Example 3:**  
Input: `ax1 = 0, ay1 = 0, ax2 = 1, ay2 = 1, bx1 = 0, by1 = 0, bx2 = 1, by2 = 1`  
Output: `1`  
*Explanation: Both rectangles completely overlap. Area = 1 + 1 - 1 = 1.*

### Thought Process (as if you’re the interviewee)  
First, compute the area of both rectangles individually:
- Rectangle 1: (ax2 - ax1) × (ay2 - ay1)
- Rectangle 2: (bx2 - bx1) × (by2 - by1)

The challenge is correct handling of **overlapping area**, which should only be counted once.  
To find the overlap:
- The width of overlap: `max(0, min(ax2, bx2) - max(ax1, bx1))`
- The height of overlap: `max(0, min(ay2, by2) - max(ay1, by1))`
If the rectangles don’t overlap, this evaluates to 0.

**Final area:**  
Area 1 + Area 2 - Overlapping area.

This algorithm is easily implementable and works for all input, as overlap detection uses simple arithmetic comparisons.

### Corner cases to consider  
- Rectangles do **not overlap** at all (output is sum of both areas).
- One rectangle is **entirely inside** the other.
- The overlap is reduced to a **line (zero area)** if only edges/tips touch.
- Rectangles **share only a single corner**.
- Rectangle with **zero area** (width or height is zero)
- Negative coordinates or rectangles entirely in the negative quadrant
- Large coordinates.

### Solution

```python
def computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2):
    # Area of rectangle 1
    area1 = (ax2 - ax1) * (ay2 - ay1)
    # Area of rectangle 2
    area2 = (bx2 - bx1) * (by2 - by1)
    
    # Overlap width: intersection over x-axis
    overlap_width = max(0, min(ax2, bx2) - max(ax1, bx1))
    # Overlap height: intersection over y-axis
    overlap_height = max(0, min(ay2, by2) - max(ay1, by1))
    # Overlap area
    overlap_area = overlap_width * overlap_height
    
    # Total area is sum minus overlap
    total_area = area1 + area2 - overlap_area
    return total_area
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  A fixed number of arithmetic and comparison operations.
- **Space Complexity:** O(1)  
  Only a constant number of variables used. No extra space required.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this approach to handle N rectangles, not just two?
  *Hint: Think about union of multiple rectangles (perhaps using scanline or segment tree techniques).*

- What if rectangles are **not axis-aligned**?
  *Hint: Overlapping area becomes much harder — may require geometry or polygon intersection techniques.*

- How would you efficiently check if two rectangles overlap, without computing area?
  *Hint: Check for separation along x or y axis.*

### Summary  
This approach is based on **geometry and interval intersection**. It calculates the possible overlap, avoids double-counting, and returns the right area. The coding pattern of "break the problem into simple arithmetic and then combine" is common, especially in problems involving grids, rectangles, and intervals. This pattern generalizes to interval union, sweep-line, and event-based geometric algorithms.


### Flashcard
Area = area₁ + area₂ − overlap; compute overlap as max(0, min(x₂)−max(x₁)) × max(0, min(y₂)−max(y₁)).

### Tags
Math(#math), Geometry(#geometry)

### Similar Problems
- Rectangle Overlap(rectangle-overlap) (Easy)
- Find the Number of Ways to Place People II(find-the-number-of-ways-to-place-people-ii) (Hard)
- Find the Number of Ways to Place People I(find-the-number-of-ways-to-place-people-i) (Medium)
- Find the Largest Area of Square Inside Two Rectangles(find-the-largest-area-of-square-inside-two-rectangles) (Medium)