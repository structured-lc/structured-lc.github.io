### Leetcode 939 (Medium): Minimum Area Rectangle [Practice](https://leetcode.com/problems/minimum-area-rectangle)

### Description  
You're given a list of unique points on the 2D coordinate plane. Each point is represented as a pair of integers `[x, y]`.  
Your goal is to find the minimum area of a rectangle (with sides parallel to the X and Y axes) that can be formed using any 4 of these points.  
If no such rectangle exists, return 0.

### Examples  

**Example 1:**  
Input: `points = [[1,1],[1,3],[3,1],[3,3],[2,2]]`  
Output: `4`  
*Explanation: The rectangle can be made using points (1,1), (1,3), (3,1), (3,3). Both width and height are 2, so area = 2 × 2 = 4.*

**Example 2:**  
Input: `points = [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]`  
Output: `2`  
*Explanation: The rectangle with corners (3,1), (3,3), (4,1), (4,3) has width 1 and height 2, so area = 1 × 2 = 2.*

**Example 3:**  
Input: `points = [[0,1],[2,1],[1,1],[1,0],[2,0]]`  
Output: `1`  
*Explanation: Rectangle formed by (1,1), (1,0), (2,1), (2,0). The width is 1, height is 1, so area = 1 × 1 = 1.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to consider every set of 4 points and check if they form a rectangle. If so, compute the area and track the minimum.  
  - This is O(n⁴), which is too slow for large inputs.  
- We can optimize by observing that a rectangle is defined by two pairs of points forming the diagonals. These diagonals must have different x and y coordinates.  
- For each pair of points with different x and y, these can be the diagonally opposite corners of a rectangle. If both the other two corners exist, a rectangle is formed.  
- Use a set to check existence of these other two corners in O(1) time.  
- Iterate through all unique pairs of points, and for each, check if the needed complementary points exist. Compute area and update the minimum accordingly.  
- This reduces the time to O(n²).  
- Key insight: all rectangle sides are axis-aligned.

### Corner cases to consider  
- No rectangles are possible if all points are on the same x or y.
- Less than 4 points — cannot form a rectangle.
- Large number of points (up to 400): efficiency matters.
- Multiple rectangles of the same minimum area.
- Points with very large positive or negative coordinates.

### Solution

```python
def minAreaRect(points):
    # Convert list of points to a set for O(1) lookup
    point_set = set((x, y) for x, y in points)
    min_area = float('inf')
    n = len(points)
    
    for i in range(n):
        x1, y1 = points[i]
        for j in range(i+1, n):
            x2, y2 = points[j]
            
            # Only interested if both x and y differ -- potential diagonal
            if x1 != x2 and y1 != y2:
                # Check if the other two rectangle corners exist
                if (x1, y2) in point_set and (x2, y1) in point_set:
                    area = abs(x2 - x1) * abs(y2 - y1)
                    if area < min_area:
                        min_area = area
                        
    return min_area if min_area < float('inf') else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n = number of points.  
  Each unordered pair of points is checked for forming a diagonal of a rectangle. Checking for presence of other corners is O(1) due to the set.
- **Space Complexity:** O(n) for storing the set of points.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the rectangle sides need not be axis-aligned?  
  *Hint: Requires checking for arbitrary orientation — a different geometric approach is needed.*

- Can you count the number of rectangles (instead of minimum area)?  
  *Hint: Instead of keeping track of minimum area, count every rectangle found using the same diagonal method.*

- How would you solve it if the input was streaming, or too large to store all points in memory?  
  *Hint: Use windowing, hashing, or external memory data structures to track needed information on-the-fly.*

### Summary
This problem follows a common combinatorial geometry pattern — for each pair of diagonal points, check if the complementary pair also exist to form a rectangle, leveraging a set for fast lookup.  
This diagonal+hashing technique is useful in other geometry problems involving point existence queries, rectangle detection, or axis-aligned rectangles in 2D point sets.


### Flashcard
For each pair of points with different x and y, check if the other two rectangle corners exist in the set; track min area.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Geometry(#geometry), Sorting(#sorting)

### Similar Problems
- Minimum Rectangles to Cover Points(minimum-rectangles-to-cover-points) (Medium)
- Maximum Area Rectangle With Point Constraints I(maximum-area-rectangle-with-point-constraints-i) (Medium)
- Maximum Area Rectangle With Point Constraints II(maximum-area-rectangle-with-point-constraints-ii) (Hard)