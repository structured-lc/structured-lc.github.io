### Leetcode 3111 (Medium): Minimum Rectangles to Cover Points [Practice](https://leetcode.com/problems/minimum-rectangles-to-cover-points)

### Description  
Given a list of 2D points and a width w, you need to cover all these points using the minimum number of **axis-aligned rectangles**.  
- Each rectangle:
  - Can extend infinitely in the y-direction (height), but
  - Its width (x₂ - x₁) must be ≤ w.
  - Its bottom side must be on the y = 0 axis (but can go as high as needed).
- A point is covered if it's inside or on the boundary of at least one such rectangle.

Return the **minimum number of rectangles needed**.

### Examples  

**Example 1:**  
Input: `points = [[2,1],[1,0],[1,4],[1,8],[3,5],[4,6]], w = 1`  
Output: `2`  
Explanation:  
Rectangle 1 covers all points with 1 ≤ x ≤ 2: (1,0), (1,4), (1,8), (2,1)  
Rectangle 2 covers all points with 3 ≤ x ≤ 4: (3,5), (4,6)  
So, only 2 rectangles needed.

**Example 2:**  
Input: `points = [[0,1],[3,2],[6,3],[9,4]], w = 2`  
Output: `4`  
Explanation:  
Each point is isolated by at least 3 from the next in the x-axis, so each rectangle can only cover one point: (0,1), (3,2), (6,3), (9,4).  
So, 4 rectangles are needed.

**Example 3:**  
Input: `points = [[1,1],[2,2],[3,3],[10,4],[11,5]], w = 2`  
Output: `2`  
Explanation:  
Rectangle 1 covers (1,1), (2,2), (3,3) because all 3 fit in width 2 (1 to 3 inclusive)  
Rectangle 2 covers (10,4), (11,5) for the same reason.

### Thought Process (as if you’re the interviewee)  
First, brute-force: Try all possible rectangle combinations — but that's exponential and infeasible.

Observations:
- y-coordinates don't affect rectangle placement, since the rectangle can be arbitrarily high.
- Only **x-coordinates** matter: our constraint is that the rectangle’s leftmost and rightmost covered points differ by at most w.
- So, for a set of sorted x-values, the "best" rectangle always starts at the leftmost uncovered point and stretches right as far as possible (up to ≤ w width).

Optimal approach (greedy):
1. Sort all points by x.
2. For each uncovered point:
    - Use a rectangle starting at that point's x value.
    - Count all subsequent points as covered until x > (start_x + w).
    - Move to the next uncovered point, repeat.
Why does this greedy work? Because maximizing the number of consecutive covered points with each rectangle always reduces the number of rectangles.

### Corner cases to consider  
- Empty points: No rectangles needed.
- All points with the same x coordinate.
- Large w: (w greater than any x gap) → only one rectangle needed.
- Smallest possible w: w = 0, each unique x needs its own rectangle.
- Points unordered or with duplicates.
- Negative coordinates.

### Solution

```python
def minRectanglesToCoverPoints(points, w):
    # Only x-coordinates matter for rectangle coverage
    # 1. Extract all x-coordinates
    xs = sorted(point[0] for point in points)
    
    n = len(xs)
    i = 0     # Iterator for points
    count = 0 # Rectangle counter
    
    while i < n:
        # Start a new rectangle at xs[i]
        start = xs[i]
        # Extend rightwards as far as allowed (width ≤ w)
        j = i
        while j < n and xs[j] <= start + w:
            j += 1
        # All points from i to j-1 are now covered
        count += 1
        i = j   # Start the next search from uncovered point
    
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Sorting the x-coordinates is O(n log n).  
  - The sweeping scan is O(n).

- **Space Complexity:** O(n)  
  - To store all x-coordinates.  
  - No extra structures besides the list of x's.

### Potential follow-up questions (as if you’re the interviewer)  

- What if rectangles had a height constraint as well?  
  *Hint: Now you must group both x and y by fitting in both directions, so you’d need a 2D bin packing or greedy covering.*

- Can you optimize if the points are already sorted?  
  *Hint: The scan can be done in O(n) without sorting.*

- If rectangles can cover only up to k points regardless of the width?  
  *Hint: Now you may need to balance count vs. location; a variation of the interval/greedy grouping problem.*

### Summary
The problem is a classic greedy interval covering, specialized to rectangles unlimited in height and width limited by w. By greedily sweeping the x-axis, always maximizing each rectangle's coverage, we achieve an optimal solution using sort + sweep—a **greedy + interval grouping** pattern.  
This technique is broadly useful in other problems involving covering sorted “intervals” or “events” with a minimal set of overlapping containers, such as scheduling, memory paging, bin packing, or broadcast time slots.


### Flashcard
Only x-coordinates matter (y-height is unlimited). Sort x-values, greedily place rectangles: each rectangle starts at leftmost uncovered point and extends right by at most w.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Minimum Area Rectangle(minimum-area-rectangle) (Medium)
- K Closest Points to Origin(k-closest-points-to-origin) (Medium)