### Leetcode 3235 (Hard): Check if the Rectangle Corner Is Reachable [Practice](https://leetcode.com/problems/check-if-the-rectangle-corner-is-reachable)

### Description  
You are given a rectangle defined from (0,0) to (X, Y) and a set of circles, each given by its center (xᵢ, yᵢ) and radius rᵢ. You start at the bottom-left (0,0) and want to reach the top-right corner (X, Y). You can move freely in the rectangle except that you may not cross or touch any of the circles. Determine if there exists a path strictly inside the rectangle (not touching any circles) from (0,0) to (X,Y).

### Examples  

**Example 1:**  
Input: `X=3`, `Y=3`, `circles=[[2,2,1]]`  
Output: `True`  
*Explanation: The circle at (2,2) with radius 1 doesn't cover a barrier from (0,0) to (3,3), so a path exists.*

**Example 2:**  
Input: `X=3`, `Y=3`, `circles=[[1,1,2]]`  
Output: `False`  
*Explanation: The large circle blocks the entire rectangle, so you can't reach the top-right corner.*

**Example 3:**  
Input: `X=5`, `Y=5`, `circles=[[2,2,1],[4,4,1]]`  
Output: `True`  
*Explanation: There is free space between, so it's possible to move from (0,0) to (5,5).*

### Thought Process (as if you’re the interviewee)  
First, I’d check if the path from (0,0) to (X,Y) is blocked by any of the circles, i.e., is it possible to "walk" from one corner to the other without stepping into a forbidden circle area.  
A brute-force BFS/DFS over a grid is too slow, especially since coordinates can be very large.  
Instead, I recognize the **core obstacle**: a set of circles might collectively block the path by connecting opposite sides of the rectangle (like forming a wall). So, if any cluster of circles "touches" both the left and right, or the bottom and top boundaries, it acts as a barrier.  
To check this, I can treat circles as nodes in a graph, connecting them if their "forbidden areas" (plus radius) overlap. I then identify connected components: for each, check if that group touches opposite sides (left/right or bottom/top). If any group does this, return False; otherwise, True.

### Corner cases to consider  
- No circles at all (always reachable)
- A circle perfectly covers a corner (blocks start or end)
- Circles with zero radius (do not block)
- Circle tangent to a wall but not blocking the path
- Multiple circles forming a continuous wall  
- Large X,Y with sparse small obstacles  
- Circles overlapping at a single point

### Solution

```python
def check_rectangle_corner_is_reachable(X, Y, circles):
    # Helper to check if two circles touch or overlap
    def touch(c1, c2):
        dx = c1[0] - c2[0]
        dy = c1[1] - c2[1]
        dist_sq = dx*dx + dy*dy
        sum_r = c1[2] + c2[2]
        return dist_sq <= sum_r*sum_r

    n = len(circles)
    parent = list(range(n))

    # Union-Find helpers
    def find(u):
        while parent[u] != u:
            parent[u] = parent[parent[u]]
            u = parent[u]
        return u

    def union(u, v):
        pu, pv = find(u), find(v)
        if pu != pv:
            parent[pu] = pv

    # Merge any circles that touch or overlap
    for i in range(n):
        for j in range(i+1, n):
            if touch(circles[i], circles[j]):
                union(i, j)

    from collections import defaultdict
    group = defaultdict(list)
    for i in range(n):
        group[find(i)].append(i)

    # Helper to check if a circle touches a boundary
    def touches_left(c):   return c[0] - c[2] <= 0
    def touches_right(c):  return c[0] + c[2] >= X
    def touches_bottom(c): return c[1] - c[2] <= 0
    def touches_top(c):    return c[1] + c[2] >= Y

    # For each connected group of circles, check if it forms a barrier
    for nodes in group.values():
        left = right = top = bottom = False
        for idx in nodes:
            c = circles[idx]
            if touches_left(c): left = True
            if touches_right(c): right = True
            if touches_bottom(c): bottom = True
            if touches_top(c): top = True
        if (left and right) or (top and bottom):
            # Forms a vertical or horizontal wall
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n is the number of circles, because for each pair, we check if they overlap/touch to perform union operations.
- **Space Complexity:** O(n), for storage in the union-find structure and auxiliary data.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the circles had varying forbidden margin (safe zone)?  
  *Hint: Consider radii as forbidden-range instead of just the physical circle.*

- How would you handle not just circles but also rectangles as obstacles?  
  *Hint: Implement obstacle-to-obstacle overlap for rectangles and mixed types, and generalize side-touch checks.*

- How would the solution scale if you need to find the actual path, not just existence?  
  *Hint: Use A*, and build the actual path avoiding forbidden regions.*

### Summary
This problem uses the **Union-Find (Disjoint Set)** pattern to efficiently group obstacles and check for blockade formation. The key is modeling whether the union of forbidden regions forms a vertical or horizontal barrier. This pattern—a "connectivity causes blockage" check—appears often in grid and geometry problems involving connected obstacles, walls, or percolation. Variants arise in connectivity, flood-fill, and pathfinding with impassable regions.


### Flashcard
Check if circles form a "barrier" connecting opposite rectangle sides using union-find on circle clusters.

### Tags
Array(#array), Math(#math), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Geometry(#geometry)

### Similar Problems
- Queries on Number of Points Inside a Circle(queries-on-number-of-points-inside-a-circle) (Medium)
- Check if Point Is Reachable(check-if-point-is-reachable) (Hard)