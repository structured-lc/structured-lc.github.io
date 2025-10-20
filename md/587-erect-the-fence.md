### Leetcode 587 (Hard): Erect the Fence [Practice](https://leetcode.com/problems/erect-the-fence)

### Description  
You are given an array of points, trees, where each element trees[i] = [xᵢ, yᵢ] represents the position of a tree in a garden on a 2D plane.  
You must use the minimum-length rope to fence the garden. The fence has to enclose *all* the trees, but it must pass exactly through some trees' positions.  
Return the coordinates of the trees that are **exactly on the perimeter of the fence** (i.e., those the rope touches).  
If there are multiple answers, return them in any order.  

### Examples  

**Example 1:**  
Input: `[[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]`  
Output: `[[1,1],[2,0],[4,2],[3,3],[2,4]]`  
*Explanation: Trees at these positions form the tightest convex fence. The other point (2,2) is inside so not included.*

**Example 2:**  
Input: `[[1,2],[2,2],[4,2]]`  
Output: `[[1,2],[2,2],[4,2]]`  
*Explanation: All three trees are colinear. The fence passes through all, so all are returned.*

**Example 3:**  
Input: `[[0,0]]`  
Output: `[[0,0]]`  
*Explanation: With only one tree, the fence must simply go through it (degenerate case).*

### Thought Process (as if you’re the interviewee)  

First, brute-force:  
- Consider all permutations of points to find the convex hull, but as the number of trees grows, this is inefficient.

Optimized approach:  
- **Convex Hull Algorithm:** The fence must trace the convex hull of the set—smallest polygon enclosing all trees.
- Standard algorithms: **Graham scan**, **Andrew’s monotone chain** (easier to implement, handles colinear boundary points robustly).
- We need to include all **colinear points on the convex hull's edge**, not just corner vertices.

**Final choice:** Andrew's monotone chain, as it works in O(n log n) by sorting, and is simple to adapt so colinear points are included.

**Why not other methods?**
- Other variants might skip colinear points; requirement is to *include* such points.

Trade-offs:
- Sorting dominates runtime.
- Handles all degenerate and edge cases, including duplicates and lines.

### Corner cases to consider  
- Single point, two points, or all points colinear.
- Multiple colinear points on edges of the hull.
- Duplicates in input (though problem usually says all points are unique).
- Points forming a perfect square vs. those all along a line.
- Minimal number of trees (1 or 2).
- Very large n.

### Solution

```python
def erectFence(trees):
    # Helper to compute cross product (O, A, B): >0 left turn, <0 right, =0 colinear
    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    # Sort points lexicographically
    trees = sorted(map(tuple, trees))
    n = len(trees)
    if n <= 1:
        return trees

    lower = []
    for pt in trees:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], pt) < 0:
            lower.pop()
        lower.append(pt)
    
    upper = []
    for pt in reversed(trees):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], pt) < 0:
            upper.pop()
        upper.append(pt)

    # Remove the last point of each: it's the starting point of the other
    result = set(lower[:-1] + upper[:-1])

    return [list(point) for point in result]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Sorting the points lexicographically is O(n log n).
  - Building the lower and upper hulls are each O(n).
- **Space Complexity:** O(n)  
  - Extra storage for the hull points and set for output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if all points are colinear?  
  *Hint: Ensure your code includes all colinear points; don't just return the endpoints.*

- How would you handle fences with millions of points?  
  *Hint: Discuss the bottleneck at sorting and potential tricks (bucket sort if coordinates are bounded).*

- Could this algorithm be extended for 3D (erecting a fence on points in space)?  
  *Hint: Think about convex hull algorithms in higher dimensions, such as Quickhull.*

### Summary
**Approach:**  
This problem uses the convex hull pattern, specifically *Andrew's monotone chain* algorithm.  
It’s commonly applicable in computational geometry for “smallest enclosing polygon” type questions—used in fencing, clustering, shape analysis, and graphics.  
The pattern emphasizes a two-pass scan (lower, upper), using cross products to maintain hull invariants and include all boundary points, even in colinear cases.


### Flashcard
Use a convex hull algorithm (e.g., monotone chain) to find the minimal fence enclosing all trees, including colinear boundary points.

### Tags
Array(#array), Math(#math), Geometry(#geometry)

### Similar Problems
- Erect the Fence II(erect-the-fence-ii) (Hard)
- Sort the Students by Their Kth Score(sort-the-students-by-their-kth-score) (Medium)