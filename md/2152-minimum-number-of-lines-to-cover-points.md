### Leetcode 2152 (Medium): Minimum Number of Lines to Cover Points [Practice](https://leetcode.com/problems/minimum-number-of-lines-to-cover-points)

### Description  
Given a set of unique points in the 2D plane, you must cover every point using the minimum number of straight lines, where each line can cover any number of collinear points. In other words, you can draw a line through as many points as you want, but every point must be on at least one of the lines. Return the smallest number of lines needed.

### Examples  

**Example 1:**  
Input: `points = [[0,1],[2,3],[4,5],[4,3]]`  
Output: `2`  
Explanation:  
- One line can go through (0,1), (2,3), and (4,5) (all three are collinear).  
- Another line goes through (2,3) and (4,3).  
- All points are covered.

**Example 2:**  
Input: `points = [[0,2],[-2,-2],[1,4]]`  
Output: `1`  
Explanation:  
- All points are collinear, so they can be covered by a single straight line.

**Example 3:**  
Input: `points = [[1,1],[2,2],[3,3],[4,5]]`  
Output: `2`  
Explanation:  
- (1,1), (2,2), and (3,3) are collinear and can be covered by one line.  
- (4,5) is not on the same line, so needs its own line.

### Thought Process (as if you’re the interviewee)  
Let's start with brute-force.  
If all points are collinear, we just need one line. Otherwise, we must split into subsets of collinear points and cover the rest recursively.  
Since max n = 10 (from constraints), we can try all subsets.

A good way is to use **bitmasks** to represent which points are covered. For every subset of points that are collinear, we can cover them in one line.  
We want to cover all points with the minimum number of such subsets (lines).  
This is a classic **set cover** problem but is tractable thanks to the tiny n.

We can precompute for every pair of points which group of points are collinear with them.  
Then, use DP on bitmask: dp[mask] = min lines needed to cover the points in mask.  
For every subset "new_mask" of points that are collinear, dp[mask | new_mask] = min(dp[mask | new_mask], dp[mask] + 1)

To check collinearity: The points i, j, k are collinear if (yⱼ - yᵢ)\*(xₖ - xᵢ) == (yₖ - yᵢ)\*(xⱼ - xᵢ).

Why this approach?  
- n is so small that 2ⁿ is fast enough.
- No shortcut since "minimum" cover needed.

### Corner cases to consider  
- All points are collinear (answer is 1).
- Each point is unique and not collinear with any other pair (each needs its own line).
- Only one point (answer is 1).
- Two points (always collinear, answer is 1).
- Negative and positive coordinates.
- Overlapping x or y values (vertical and horizontal lines).
- No input points (invalid according to constraints; input always has 1–10 points).

### Solution

```python
def minimumLines(points):
    from math import gcd
    
    n = len(points)
    FULL = (1 << n) - 1
    
    # Precompute all collinear sets: (i, j) → bitmask covering all points collinear with i, j
    lines = dict()
    for i in range(n):
        for j in range(i + 1, n):
            mask = 0
            xi, yi = points[i]
            xj, yj = points[j]
            for k in range(n):
                xk, yk = points[k]
                # Check collinearity by cross product formula
                if (xj - xi) * (yk - yi) == (yj - yi) * (xk - xi):
                    mask |= (1 << k)
            lines[(i, j)] = mask

    # DP for minimum lines needed for each mask
    dp = [float('inf')] * (1 << n)
    dp[0] = 0  # no points covered → 0 lines

    # For every state
    for mask in range(1 << n):
        if dp[mask] == float('inf'):
            continue

        # Try adding one more point (idx) by itself (always allowed)
        for idx in range(n):
            if not (mask & (1 << idx)):
                dp[mask | (1 << idx)] = min(dp[mask | (1 << idx)], dp[mask] + 1)
        # Try all possible lines through pairs of uncovered points
        for i in range(n):
            if not (mask & (1 << i)):
                for j in range(i + 1, n):
                    if not (mask & (1 << j)):
                        cover_mask = lines[(i, j)]
                        dp[mask | cover_mask] = min(dp[mask | cover_mask], dp[mask] + 1)
    return dp[FULL]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n³ × 2ⁿ)  
  - There are O(2ⁿ) bitmasks and for each, O(n²) choices for line (or singleton), but precomputing collinear gives O(n³).  
  - Acceptable for n ≤ 10.

- **Space Complexity:**  
  O(2ⁿ + n³)  
  - DP has 2ⁿ states, and lines dict is at most O(n³).

### Potential follow-up questions (as if you’re the interviewer)  

- If n were up to 1000, could you solve it?
  *Hint: Brute force with bitmask is not practical for large n.*

- What if some points could be used in more than one line?
  *Hint: Problem becomes trivial, but the minimum is always 1 if allowed repeated covers.*

- What changes if duplicate points are allowed?  
  *Hint: Duplicates are always collinear, but you must handle them as a single point.*

### Summary
This problem is a classic **bitmask DP (set cover)** on small sets, with state compression.  
The core technique—DP on **subsets of coverage**—appears in problems like "minimum subset of sets to cover elements," "painting houses with color restrictions," and is a handy general tool for combinatorial search with small \(n\).  
No greedy or direct geometry shortcut works here due to the "minimum" constraint, but bitmask DP is optimal for n ≤ 10.


### Flashcard
For small n, try all subsets of points; use bitmask to represent covered points and find the minimum number of collinear subsets (lines) needed to cover all points.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Geometry(#geometry), Bitmask(#bitmask)

### Similar Problems
- Max Points on a Line(max-points-on-a-line) (Hard)
- Min Cost to Connect All Points(min-cost-to-connect-all-points) (Medium)
- Minimum Lines to Represent a Line Chart(minimum-lines-to-represent-a-line-chart) (Medium)