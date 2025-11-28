### Leetcode 3025 (Medium): Find the Number of Ways to Place People I [Practice](https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i)

### Description  
Given `n` points on a 2D plane, each with a person standing at that coordinate, you want to count the number of ways to select two people—Alice and Bob—such that:

- Alice stands at the upper-left corner (with strictly smaller x and y than Bob),
- Bob stands at the lower-right corner,
- If you build a rectangular fence with Alice and Bob at opposite corners, **no other person lies inside or on the rectangle (except Alice and Bob themselves)**.

You must return **the count of such distinct pairs** (Alice, Bob).

### Examples  

**Example 1:**  
Input: `points = [[1,2],[3,4],[2,3]]`  
Output: `2`  
*Explanation: The valid ways are:  
(1,2) as Alice and (3,4) as Bob,  
(1,2) as Alice and (2,3) as Bob.  
No other point is inside/on the rectangle in either case.*

**Example 2:**  
Input: `points = [[0,0],[1,1],[2,2],[3,3]]`  
Output: `3`  
*Explanation: The 3 valid pairs are:  
(0,0)-(1,1), (0,0)-(2,2), and (0,0)-(3,3).  
For each, no other point is inside or on the rectangle.*

**Example 3:**  
Input: `points = [[1,1],[2,2],[1,2],[2,1]]`  
Output: `0`  
*Explanation: **No way** to place Alice and Bob such that no other person is inside/on the rectangle. All rectangles contain extra points.*

### Thought Process (as if you’re the interviewee)  
Let’s work through a possible approach:

- **Brute-force:**  
  For all pairs of points (i, j) where point_i.x < point_j.x and point_i.y < point_j.y, check every other point to see if it’s inside or on the rectangle formed by these two points. This is O(n³) — too slow for large n.

- **Optimization:**  
  Since the rectangle’s corners are axis-aligned and must be strictly increasing in both x and y, we only need to consider pairs (i, j) where xᵢ < xⱼ and yᵢ < yⱼ.

  For each such pair, check if there are any points (excluding i, j) with
  - xᵢ ≤ xₖ ≤ xⱼ and yᵢ ≤ yₖ ≤ yⱼ

  To optimize, we can:
  - **Sort points** by x and y.
  - For each pair, only check the points lying on the rectangle’s borders.
  - For small constraints, just do a filtered scan for each pair (this is O(n² × n)).
  - With preprocessing, we could use a 2D prefix sum bitmap to quickly count how many points are inside a rectangle if the point coordinates are small integers.

  Since coordinates are not necessarily constrained, and n is small for this problem, we can safely do O(n² × n), but try to minimize the checks per pair by holding the points in convenient data structures.

- **Final approach:**  
  For all unordered pairs (i, j), if xᵢ < xⱼ and yᵢ < yⱼ, check if there is any other point inside or on the rectangle (xᵢ, yᵢ)-(xⱼ,yⱼ), excluding i and j. If none, increment count.

### Corner cases to consider  
- Single point or empty input: should return 0
- All points collinear or on rectangle border
- Multiple points with the same x/y values
- All possible rectangles are blocked by extra points
- Points with negative coordinates

### Solution

```python
def numOfWays(points):
    n = len(points)
    count = 0

    for i in range(n):
        x1, y1 = points[i]
        for j in range(n):
            if i == j:
                continue
            x2, y2 = points[j]
            # Alice: upper-left, Bob: lower-right
            if x1 < x2 and y1 < y2:
                found_inside = False
                # Check if any other point lies inside/on the fence
                for k in range(n):
                    if k == i or k == j:
                        continue
                    x, y = points[k]
                    if x1 <= x <= x2 and y1 <= y <= y2:
                        found_inside = True
                        break
                if not found_inside:
                    count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³)  
  For every pair of points (n²), need to scan up to n other points to check for any inside/on the rectangle.

- **Space Complexity:** O(1) extra  
  Only a few counters and temporary variables used; no extra storage based on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize the solution if the coordinates are only from 0..1000?  
  *Hint: Try a 2D prefix sum to count points inside rectangles fast.*

- Can you generalize to include rectangles where Alice and Bob can be at any two opposite corners instead of fixed upper-left/lower-right?  
  *Hint: You’d need to analyze all corner combinations (4 ways) for each pair.*

- What if you needed to return the actual list of valid (Alice, Bob) pairs as output?  
  *Hint: Instead of just counting, store pairs while iterating.*

### Summary
This problem is a classic **2D search with constraints** pattern, requiring you to efficiently examine point-pair rectangles for blocking points.  
The brute-force O(n³) is straightforward and safe for small n, but for large coordinates or larger n, using a **2D prefix sum (grid count table)** is a powerful optimization—common in range counting and fast queries on fixed grids.  
Such techniques appear in image processing (range queries on images), chessboard problems, and computational geometry.


### Flashcard
Find the Number of Ways to Place People I (Medium)

### Tags
Array(#array), Math(#math), Geometry(#geometry), Sorting(#sorting), Enumeration(#enumeration)

### Similar Problems
- Rectangle Area(rectangle-area) (Medium)