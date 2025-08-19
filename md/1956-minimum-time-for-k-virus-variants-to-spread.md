### Leetcode 1956 (Hard): Minimum Time For K Virus Variants to Spread [Practice](https://leetcode.com/problems/minimum-time-for-k-virus-variants-to-spread)

### Description  
You’re given an infinite 2D grid with \( n \) virus variants, each starting from certain initial positions. Each day, every cell with a virus variant spreads that variant to its 4 neighbouring (up, down, left, right) cells, so the infection expands as a Manhattan circle around the origin point. If a cell becomes infected by multiple variants, all are present at that cell.  
The task is: **What is the minimal number of days needed for any cell on the grid to simultaneously contain at least \( k \) _different_ virus variants?** Return that minimum.

### Examples  

**Example 1:**  
Input: `points = [[0,0],[2,2],[3,10]], k = 3`  
Output: `5`  
*Explanation: The minimal day when some cell first contains all 3 variants; for these points, that first happens in 5 days.*

**Example 2:**  
Input: `points = [[1,1],[2,2],[3,3]], k = 2`  
Output: `1`  
*Explanation: Each variant spreads 1 cell per day. On day 1, (2,2) is covered by both (1,1) and (2,2) variants, so minimal day is 1.*

**Example 3:**  
Input: `points = [[0,0]], k = 1`  
Output: `0`  
*Explanation: The cell (0,0) instantly has 1 variant at day 0. No time needed for spread.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  Try every day from 0 upwards, simulate the infection expansion, and check for every cell if at least \( k \) variants overlap there. But this is infeasible for infinite/large grid & high \( k \).

- **Key insight:**  
  Rather than expanding the whole grid, realize that any grid cell (x, y) receives the iᵗʰ variant on day = Manhattan distance between its origin & (x, y).  
  So for a given cell, the arrival days for all variants is a list of Manhattan distances:  
  - days = [abs(x - xi) + abs(y - yi)] for all points (xi, yi)
  - Once the “fastest” k variants have reached (x, y), that cell has k variants.  
  - The minimal day needed is max of the k-shortest arrival times (because that's the last of the earliest k to arrive).

- **Optimized approach:**  
  Instead of brute force, perform **binary search** on the number of days:  
  - For each `d`, can we find at least one cell that is within distance `d` of **at least \( k \)** origin points?  
  - For a fixed day `d`, each variant origin covers a diamond (i.e., all grid cells within distance ≤ d).
  - Is there *any* cell where at least k diamonds overlap?  

  To check this efficiently, for each d, you can “cover” the plane with range-diamond per origin, then find if any point is covered by at least k of these diamonds.  
  We can reduce this problem to finding the smallest d such that the intersection of any k diamonds is non-empty.

- **Implementation:**  
  - Binary search on days (left = 0, right = large number, e.g., 2e9).
  - For each trial d, use a **sweep-line** or geometric method:  
    - Compute, for each virus, the vertical and horizontal range it covers.
    - Find if there is a grid cell that is in k or more of these regions.  
  - Observing the diamond equations:  
    - Each virus at (x, y) at day d covers points:
      - (i, j): |i-x| + |j-y| ≤ d
      - Equivalently, u = x+y, v = x-y; each diamond is a rectangle in (u, v) space, simplifies calculations.

### Corner cases to consider  
- Only one variant and k = 1 → answer is 0.
- Multiple variants overlap on start positions.
- k greater than total variants (invalid).
- Very large spread with all points spaced far apart.
- All origin points colinear (doesn’t change the answer).
- Multiple origins at the same coordinate.

### Solution

```python
def minDayskVariants(points, k):
    # Transform each point (x, y) into (u, v) as u = x+y, v = x-y for easier diamond intersection

    uvs = [(x + y, x - y) for x, y in points]

    # Helper function to check for a day 'd' if there exists at least one cell covered by >=k variants
    def is_possible(d):
        us = []
        vs = []
        for u, v in uvs:
            us.append((u - d, u + d))
            vs.append((v - d, v + d))
        # For intersection, among all intervals, pick any k, find intersection box
        # Try all combinations: For each possible set of k intervals, can their overlap be non-empty?
        # But efficient: pick the k largest left-ends and smallest right-ends, check if they overlap

        # Since all diamonds symmetrical, for each direction, find
        # - the k largest left u
        # - the k smallest right u
        # similarly for v

        us_left = sorted([l for l, r in us], reverse=True)[:k]
        us_right = sorted([r for l, r in us])[:k]
        vs_left = sorted([l for l, r in vs], reverse=True)[:k]
        vs_right = sorted([r for l, r in vs])[:k]

        uL = max(us_left)
        uR = min(us_right)
        vL = max(vs_left)
        vR = min(vs_right)

        # The intersection box in (u, v) must not be empty: uL ≤ uR and vL ≤ vR
        return uL <= uR and vL <= vR

    left, right = 0, 2 * 10**9  # days in range [0, 2e9]
    ans = right
    while left <= right:
        mid = (left + right) // 2
        if is_possible(mid):
            ans = mid
            right = mid - 1
        else:
            left = mid + 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log(max_distance)), with n = number of virus origins.  
  For every mid in binary search (log(max_coord)), we scan all the origin points O(n) and do k-sort/select (O(n log k), but with k small and n ≤ 100).
- **Space Complexity:**  
  O(n), just to store transformed (u,v) coords and interval lists. No extra grids used.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose you want the exact cell(s) where the overlap happens—not just the minimal day.
  *Hint: Keep track of where the intervals overlap when is_possible() finds possible intersections.*

- What if you needed to handle weighted/bounded grids instead of infinite?
  *Hint: Restrict u and v intervals to grid size before intersecting and check overlap only within grid bounds.*

- How would you extend this to 3D or higher dimensions?
  *Hint: The Manhattan "diamond" becomes a hypercube; you generalize the interval intersection logic.*

### Summary
This problem is a **geometric binary search pattern** combined with *interval/k-interval intersection*.  
Translating the problem into (u, v) space makes the intersection check straightforward and avoids unnecessary grid simulation.  
The pattern of binary searching for minimal parameter (e.g., number of days, window width) that satisfies a frequency/intersection property is common and appears in other grid or geometric "spread with overlap" questions.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search), Geometry(#geometry), Enumeration(#enumeration)

### Similar Problems
