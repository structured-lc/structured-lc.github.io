### Leetcode 2249 (Medium): Count Lattice Points Inside a Circle [Practice](https://leetcode.com/problems/count-lattice-points-inside-a-circle)

### Description  
Given a list of circles on a 2D grid, where each circle is given by its center coordinates (xᵢ, yᵢ) and its radius rᵢ, count **how many unique lattice points** (points with integer coordinates) lie inside **at least one** of the circles (including the circumference). In other words, count how many integer-coordinate points’ Euclidean distance from a circle's center is ≤ its radius.

### Examples  

**Example 1:**  
Input: `circles = [[2,2,1]]`  
Output: `5`  
*Explanation: The circle centered at (2,2) with radius 1 covers the points (1,2), (2,1), (2,2), (2,3), (3,2). Only these 5 lattice points are inside or exactly on the circle.*

**Example 2:**  
Input: `circles = [[2,2,2],[3,4,1]]`  
Output: `16`  
*Explanation: Both circles together cover 16 unique lattice points, including overlaps. Some are (0,2), (2,0), (2,4), (3,2), and (4,4).*

**Example 3:**  
Input: `circles = [[1,1,1],[1,1,2]]`  
Output: `13`  
*Explanation: Both circles are centered at (1,1), but with different radii. The total unique lattice points inside at least one circle is 13.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  For each circle, loop over all possible integer points inside its bounding box (x−r to x+r, y−r to y+r). Use the formula (dx)² + (dy)² ≤ r² to check if a point lies inside or on the boundary.

- Add each valid point to a set to avoid double counting (since points may be inside multiple circles).

- After processing all circles, the size of the set gives the answer.

- **Optimizations:**   
  - The bounding box approach for each circle limits unnecessary checks.  
  - Since coordinates and radii are bounded (≤ 100), inspecting all relevant points is feasible (max 200 circles × ~πr² ≲ 60,000 possible points).

- **Why this approach:**  
  - This ensures uniqueness (with the set).
  - It doesn't rely on advanced geometry or math — just a direct simulation with pruning via bounding boxes.

### Corner cases to consider  
- Multiple circles overlap — ensure points aren't double-counted.
- All circles share the same center.
- Circles at the grid’s boundary (ensure negative indices/coordinates handled).
- Smallest possible input (single circle of radius 1).
- Maximum constraints (200 circles, maximal radii).

### Solution

```python
def countLatticePoints(circles):
    # Set to store unique lattice points
    points = set()
    
    for x, y, r in circles:
        # For each possible integer lattice point within bounding box of the circle
        # x - r ≤ i ≤ x + r, y - r ≤ j ≤ y + r
        for i in range(x - r, x + r + 1):
            for j in range(y - r, y + r + 1):
                dx = i - x
                dy = j - y
                # Check if within (or on) the circle
                if dx * dx + dy * dy <= r * r:
                    points.add( (i, j) )
                    
    return len(points)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × r²), where n = number of circles, and for each we check (2r + 1) × (2r + 1) points inside its bounding box. With problem constraints (r ≤ 100, n ≤ 200), this is efficient.
- **Space Complexity:** O(K), where K = number of unique lattice points inside any circle (at most all points in the relevant bounding boxes). The set tracks all covered points.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose radii and coordinate bounds are much larger (e.g., ≤ 10⁶). Can you avoid iterating every inner lattice point?
  *Hint: Try counting per vertical or horizontal cross-sections, or use mathematical formulas.*

- What if you were asked to count only those points that lie **inside all** circles (intersection rather than union)?
  *Hint: For each candidate point, check if it's inside every circle rather than at least one.*

- How would you enumerate and list the actual points, not just count them?
  *Hint: Store or print the contents of your set after filtering.*

### Summary
This problem is a classic **geometry brute-force** set-counting task: iterate candidate grid points, check inclusion by the circle formula, and use a set for uniqueness. The pattern—a bounded grid brute-force filtered by mathematical constraints and deduplication via set—applies to many "unique points in geometric regions" scenarios. Optimizations may be needed if parameter ranges grow large, but for this scope, direct simulation is both clean and robust.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Geometry(#geometry), Enumeration(#enumeration)

### Similar Problems
- Queries on Number of Points Inside a Circle(queries-on-number-of-points-inside-a-circle) (Medium)