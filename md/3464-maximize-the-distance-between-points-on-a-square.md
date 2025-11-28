### Leetcode 3464 (Hard): Maximize the Distance Between Points on a Square [Practice](https://leetcode.com/problems/maximize-the-distance-between-points-on-a-square)

### Description  
You are given a square with side length `side` and some points located on its boundary. Each point lies exactly on one of the square’s edges. You need to choose `k` points among these to maximize the minimum distance between any two selected points measured along the square’s perimeter.

More specifically, think of "unfolding" the square’s perimeter into a linear line of length `4 * side`. Each point corresponds to a unique coordinate on this line (based on how far it is from a fixed corner along the perimeter). The goal is to select `k` points from these perimeter coordinates so that the minimum distance between any two chosen points (in the circular boundary sense) is as large as possible.

---

### Examples  

**Example 1:**  
Input:  
`side = 4, points = [[0,4], [4,4], [4,0], [0,0]], k = 2`  
Output:  
`8`  
*Explanation:* The points lie at four corners of the square. Mapping to perimeter coordinates:  
(0,4) => 4 (top-left corner), (4,4) => 8 (top-right), (4,0) => 12 (bottom-right), (0,0) => 0 (bottom-left).  
Choosing points at perimeter coordinates 0 and 8 gives the maximum distance 8 along the boundary.

**Example 2:**  
Input:  
`side = 5, points = [[0,0], [5,5], [3,5], [5,0]], k = 3`  
Output:  
`7`  
*Explanation:* Points map to perimeter coordinates as: (0,0)=0, (3,5)=5+3=8, (5,5)=10, (5,0)=15.  
Selecting points at coordinates 0, 8, and 15, the minimum gap among chosen points is 7.

**Example 3:**  
Input:  
`side = 10, points = [[0,0], [0,7], [10,10], [5,10], [10,5]], k = 4`  
Output:  
`12`  
*Explanation:* After mapping points to perimeter coordinates and sorting, using binary search we find 12 as the maximum minimum distance to place 4 points.

---

### Thought Process (as if you’re the interviewee)  
- The points lie on the perimeter of the square, which can be visualized as a 1D ring of length `4 * side`.  
- **Key insight:** Convert each (x, y) on the square boundary into a single coordinate on this ring representing its distance from a fixed corner (e.g., bottom-left) along the perimeter.  
- Once mapped, the problem reduces to: *pick k points on a circular array to maximize the minimum spacing between any two chosen points*.  
- **Brute force**: Check all combinations of points, but it's infeasible given possibly large input sizes.  
- Optimization uses **binary search** on the minimum allowed distance `d`:  
  - For a candidate `d`, check if it's possible to pick `k` points with pairwise minimum distances at least `d`.  
  - To handle circular wrap-around, duplicate the perimeter array shifted by `4 * side` to simulate the ring.  
  - Use a greedy approach to select points starting from each candidate and jump forward by at least `d` using binary search.  
- Keep narrowing `d` until you find the maximum feasible minimum distance.

Trade-offs:  
- The binary search approach reduces complexity from exponential to O(n log(side)).  
- Space used is O(n) to store and extend the perimeter coordinates array.

---

### Corner cases to consider  
- All points are at the same location (minimum distance is 0).  
- Points are evenly spaced around the square perimeter.  
- `k` equals 1 (distance can be maximum perimeter length).  
- Points on only two adjacent edges of the square.  
- The minimum gap equals zero if multiple points overlap.

---

### Solution

```python
from bisect import bisect_left
from typing import List

def maxDistance(side: int, points: List[List[int]], k: int) -> int:
    # Convert each (x, y) on the square boundary to a coordinate on the perimeter line of length 4*side
    perimeter_coords = []
    for x, y in points:
        if x == 0:
            coord = y  # left edge going up from (0,0)
        elif y == side:
            coord = side + x  # top edge going right from (0, side)
        elif x == side:
            coord = 3 * side - y  # right edge going down from (side, side)
        else:  # y == 0
            coord = 4 * side - x  # bottom edge going left from (side, 0)
        perimeter_coords.append(coord)
        
    perimeter_coords.sort()
    n = len(perimeter_coords)
    
    def can_place(distance: int) -> bool:
        # Check if we can select k points so minimum spacing between chosen points along the perimeter is at least distance
        if distance == 0:
            return True
        
        # Extend the perimeter coords by adding 4*side to simulate circular wrap
        extended_coords = perimeter_coords + [p + 4 * side for p in perimeter_coords]
        
        for start in range(n):
            count = 1  # count first point at perimeter_coords[start]
            current = start
            # Try to select next k-1 points greedily with jumps >= distance
            for _ in range(k - 1):
                target = extended_coords[current] + distance
                # Use binary search to find the smallest index >= target
                next_pos = bisect_left(extended_coords, target, current + 1, current + n)
                if next_pos == current + n:  # couldn't place next point
                    break
                current = next_pos
                count += 1
            if count == k:
                # Check the span between first and last chosen point to ensure feasibility within perimeter
                span = extended_coords[current] - extended_coords[start]
                if span <= 4 * side:
                    return True
        return False
    
    low, high = 0, side * 4 + 1
    while low < high - 1:
        mid = (low + high) // 2
        if can_place(mid):
            low = mid
        else:
            high = mid
    return low
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log(side))  
  - Sorting points: O(n log n)  
  - Binary search on distance: O(log(side))  
  - Each feasibility check: O(n log n) due to binary searches over an extended array of size 2n  
- **Space Complexity:** O(n)  
  - Storing the coordinates and extended coordinates arrays.

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if points could be anywhere inside the square, not just on the perimeter?  
  *Hint: This would require a different distance metric and possibly computational geometry or graph-based methods.*

- How can you modify the approach to not only output the maximum distance but also the actual selected points?  
  *Hint: Keep track of indices chosen during the feasibility check and reconstruct after the binary search.*

- If you need to process multiple queries with different k's but the same points, how can you optimize the solution?  
  *Hint: Precompute data structures or use parametric search methods to handle multiple k efficiently.*

---

### Summary  
This problem involves transforming a 2D boundary placement scenario into 1D ring selection and applying a binary search with greedy feasibility checking. The coding pattern is a classic *binary search on answer* combined with *greedy placement using binary search*. This technique is widely used in problems involving maximization/minimization of intervals or spacing, such as placing antennas or splitting arrays by a threshold.


### Flashcard
Map square perimeter to a 1D circular array; reduce to selecting k points on a ring maximizing minimum spacing (binary search on spacing).

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy)

### Similar Problems
- Maximum Number of Integers to Choose From a Range II(maximum-number-of-integers-to-choose-from-a-range-ii) (Medium)
- Maximum Points Inside the Square(maximum-points-inside-the-square) (Medium)