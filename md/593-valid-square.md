### Leetcode 593 (Medium): Valid Square [Practice](https://leetcode.com/problems/valid-square)

### Description  
Given any four points in the 2D plane (not necessarily ordered), determine if they form a **valid square**. For it to be a square:
- All four **sides** must be of equal, non-zero length.
- All four **angles** must be **right angles** (90°).

You must check for both equal sides and equal diagonals (which indirectly verifies the angles). Coordinates can be any integers within ±10,000, and duplicate/overlapping points must be rejected.

### Examples  

**Example 1:**  
Input: `p1=[0,0], p2=[1,1], p3=[1,0], p4=[0,1]`  
Output: `true`  
*Explanation: These points are the four corners of a unit square aligned with the axes or rotated 45°.  
Sides: 1 unit each; Diagonals: √2 units each.*

**Example 2:**  
Input: `p1=[0,0], p2=[1,1], p3=[1,0], p4=[0,12]`  
Output: `false`  
*Explanation: One point is too far, so side lengths differ, and these cannot form a square.*

**Example 3:**  
Input: `p1=[1,0], p2=[-1,0], p3=[0,1], p4=[0,-1]`  
Output: `true`  
*Explanation: These are the four corners of a square centered at (0,0) with sides of length √2.*

### Thought Process (as if you’re the interviewee)  
A brute-force approach would be to try all possible orderings and check if opposite sides are equal, and diagonals have the correct length. However, with four points, there are only six unique distances between the points.

A better strategy:
- Compute the squared distances between every pair of points (there are 6 distinct pairs).
- For a valid square:
  - There should be **only two unique nonzero values** among these distances:
    - One (the smaller) occurs **4 times** (the four sides).
    - One (the larger) occurs **2 times** (the diagonals).
- Both unique distances must be nonzero, to prevent overlapping points.

This avoids explicit angle checks; checking the count of unique distances (and their frequency) implicitly ensures both side equality and diagonal equality, confirming right angles by the square’s geometry.

### Corner cases to consider  
- All four points are the same (degenerate).
- Three or more points are on a line.
- Two or more points overlap.
- Rectangle: all sides equal, but diagonals unequal (should reject as square).
- Rhombus: all sides equal, diagonals unequal.
- Points given in arbitrary order.
- Negative coordinates or large magnitude values.
- Floating point calculations (not in this problem since points are integers, and use squared distances only).

### Solution

```python
def validSquare(p1, p2, p3, p4):
    # Helper function to compute the squared distance between two points
    def dist2(a, b):
        return (a[0]-b[0]) ** 2 + (a[1]-b[1]) ** 2

    # Put all pairs into a list
    points = [p1, p2, p3, p4]
    dists = []
    for i in range(4):
        for j in range(i+1, 4):
            dists.append(dist2(points[i], points[j]))

    # For a valid square:
    # - There must be only 2 unique nonzero distances
    # - One occurs exactly 4 times (sides)
    # - The other occurs exactly 2 times (diagonals)
    counter = {}
    for d in dists:
        if d == 0:  # overlapping points, invalid
            return False
        counter[d] = counter.get(d, 0) + 1

    values = list(counter.values())
    return sorted(values) == [2, 4]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Total work is fixed since we’re checking 6 pairs and doing a constant amount of work (distances, counts).

- **Space Complexity:** O(1)  
  We store at most 6 distances and at most two unique values in the counter.

### Potential follow-up questions (as if you’re the interviewer)  

- *How would you extend this to 3D to check for a square in space?*  
  *Hint: Compare all 6 side lengths and check for equal sides/diagonals. A cube would require more strict checks.*

- *Suppose you needed to allow for a small floating-point tolerance?*  
  *Hint: Use approximate equality for distance comparison rather than exact ==.*

- *What about rectangles, or identifying the specific type of quadrilateral?*  
  *Hint: Count unique distances and check for pairs/opposite pairs pattern, or compute dot products to check angles.*

### Summary
This is a classic **geometry + hashing/counter** pattern: compute all pairwise relations (here, distances), count their frequency, and check that the count pattern matches the requirements of a square. This “all-pairs with frequency counting” method is widely applicable for identifying structures in small sets of 2D or 3D points, including rectangles, rhombuses, or even other regular polygons. Using squared distances avoids precision problems and unnecessary root calculations.