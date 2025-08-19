### Leetcode 3027 (Hard): Find the Number of Ways to Place People II [Practice](https://leetcode.com/problems/find-the-number-of-ways-to-place-people-ii)

### Description  
Given a list of unique points on a 2D grid, each point being occupied by a person, you want to select two distinct people: Alice and Bob. You want to place a rectangle on the grid such that Alice and Bob stand on the upper-left and lower-right corners of the rectangle, respectively, and **no other person lies inside or on the boundary** of this rectangle (except Alice and Bob themselves).

Formally, for points Alice = (x₁, y₁) and Bob = (x₂, y₂):
- x₁ < x₂ and y₁ < y₂,
- No other person has a coordinate (x, y) with x₁ ≤ x ≤ x₂ and y₁ ≤ y ≤ y₂, except Alice and Bob.

You are asked: **In how many ways can you choose Alice and Bob as described above?**

### Examples  

**Example 1:**  
Input: `points = [[1,1],[2,3],[4,2],[6,4]]`  
Output: `2`  
*Explanation: The valid pairs are:*
- *(1,1) as Alice and (2,3) as Bob. No other points in or on boundary of rectangle from (1,1) to (2,3).*
- *(4,2) as Alice and (6,4) as Bob. Likewise, they form a rectangle with no other points inside.*

**Example 2:**  
Input: `points = [[1,1],[2,2],[3,3]]`  
Output: `0`  
*Explanation: Any pair will have the third point either inside or on the boundary of the rectangle.*

**Example 3:**  
Input: `points = [[0,0],[2,2],[0,2],[2,0],[1,1]]`  
Output: `0`  
*Explanation: The point (1,1) will always fall inside the rectangle for any possible valid (Alice, Bob).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For each pair of points (Alice, Bob) such that Alice is above and left of Bob (x₁ < x₂, y₁ < y₂), check all other points to see if any lie inside or on the boundary of the rectangle formed by Alice and Bob. Count valid pairs.

- **Optimization:**  
  Since for each pair we might need to check all other points (O(n³)), optimize by:
  - Sorting the points by one coordinate (say, x), and then by y.
  - Using a 2D prefix sum or set structure to quickly check the number of points within a rectangle in O(1) or O(log n).
  - However, with ≤ 2000 points, O(n²) is acceptable if we efficiently check "no point in rectangle" using a set or hashmap lookup.

- **Final approach:**  
  - Store the points in a set for constant lookups.
  - For each ordered pair (i, j) where xᵢ < xⱼ and yᵢ < yⱼ, verify that only Alice and Bob appear in the rectangle [(xᵢ, yᵢ), (xⱼ, yⱼ)].
  - For each pair, check every other point, skipping if it’s Alice or Bob, and quickly abandon the inner loop if an "intruder" is found.

### Corner cases to consider  
- All points in a straight line: can't form rectangles.
- Two points only: always valid, since no intruder possible.
- Very dense grid: almost always impossible unless only corners are used.
- Duplicates: Not present as per problem guarantee, but worth guarding in real scenarios.
- All points forming a rectangle: always one valid way.

### Solution

```python
def numOfWays(points):
    # Map point for O(1) check
    point_set = set((x, y) for x, y in points)
    n = len(points)
    result = 0

    # Try every possible Alice and Bob pair
    for i in range(n):
        x1, y1 = points[i]
        for j in range(n):
            if i == j:
                continue
            x2, y2 = points[j]
            # Alice needs to be upper-left of Bob
            if x1 < x2 and y1 < y2:
                # Check all other points if any are inside/on boundary
                intruder = False
                for k in range(n):
                    if k == i or k == j:
                        continue
                    x, y = points[k]
                    # Boundary (including) but not Alice or Bob
                    if x1 <= x <= x2 and y1 <= y <= y2:
                        intruder = True
                        break
                if not intruder:
                    result += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × n) = O(n³) in the worst case (for each of O(n²) candidate pairs, check all points). For n ≤ 2000 this is borderline, but we could optimize with spatial data structures or clever haircuts.
- **Space Complexity:** O(n) for the point set; no significant extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How could you optimize if the number of points was much larger (e.g., n = 10⁵)?  
  *Hint: Consider spatial index structures or preprocessing with 2D grids/prefix sums.*

- Can you precompute for all rectangles if queries are dynamic?  
  *Hint: Use a 2D prefix sum table or Fenwick tree for fast range sum.*

- Suppose boundaries cannot include Alice and Bob, only strict interior points?  
  *Hint: Slightly adjust your candidate pair check to be exclusive rather than inclusive.*

### Summary
This problem tests brute-force search over O(n²) pairs and emphasizes boundary conditions in 2D. The coding pattern is **nested iteration with rectangle-inclusion checking**; in more advanced cases, **2D prefix sums** or **spatial partitioning** would be essential. This is common in grid-based search, range queries, and is directly relevant for geometric problems, 2D range queries, and computational geometry.

### Tags
Array(#array), Math(#math), Geometry(#geometry), Sorting(#sorting), Enumeration(#enumeration)

### Similar Problems
- Rectangle Area(rectangle-area) (Medium)