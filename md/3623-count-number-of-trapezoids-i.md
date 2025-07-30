### Leetcode 3623 (Medium): Count Number of Trapezoids I [Practice](https://leetcode.com/problems/count-number-of-trapezoids-i)

### Description  
Given a set of distinct integer points on a 2D Cartesian plane, count how many **different trapezoids with exactly two parallel horizontal sides** (parallel to the x-axis) can be formed.  
- A **trapezoid** is defined here as a quadrilateral with exactly one pair of sides parallel (the horizontal segments), which must be on two different y-levels.
- The points that make up a horizontal segment must have the same y-coordinate and different x-coordinates.
- Each trapezoid chosen must use two top points (forming one horizontal segment at one y), two bottom points (another horizontal segment at a different y), and connect the endpoints.

### Examples  

**Example 1:**  
Input: `points = [[1,0],[2,0],[3,0],[2,2],[3,2]]`  
Output: `3`  
*Explanation:  
We have:*
- *Bottom y = 0: (1,0),(2,0),(3,0) → segments: (1,0)-(2,0), (1,0)-(3,0), (2,0)-(3,0)*
- *Top y = 2: (2,2),(3,2) → one segment: (2,2)-(3,2)*
- *Every (bottom segment) × (top segment) forms a unique trapezoid.*
- *Number of trapezoids: C(3,2)\*C(2,2) = 3\*1 = 3*

**Example 2:**  
Input: `points = [[1,1],[2,1],[3,2],[4,2]]`  
Output: `1`  
*Explanation:  
Only possible horizontal segments:*
- *At y=1: (1,1)-(2,1)*
- *At y=2: (3,2)-(4,2)*
- *Total: 1 segment at each level → 1 unique trapezoid.*

**Example 3:**  
Input: `points = [[1,0],[2,0],[3,1]]`  
Output: `0`  
*Explanation:  
- Only one y-value has two points (y=0: (1,0) and (2,0)), but y=1 has only one point, so can't form any horizontal segment at different levels.*

### Thought Process (as if you're the interviewee)  

- **Brute-force idea:**  
  - List all pairs of y-levels.
  - For each y, try all pairs of points to form all possible horizontal segments.
  - For every pair of horizontal segments at different y-levels, count as a valid trapezoid.
  - This is O(N³) or worse, where N is the number of points. Not scalable.

- **How to optimize:**  
  - Observe: **To have a horizontal side, need at least 2 points at the same y.**
  - For each y, count how many ways to pick two points (segments): C(n,2) if there are n points on that y-level.
  - Suppose all horizontal segments at y₁ and all at y₂ (y₁ ≠ y₂). All pairs give trapezoids: multiply C(n₁,2) × C(n₂,2).
  - Instead of looping over all pairs of y-levels, keep prefix sum of the C(n,2) counts to efficiently compute total pairs.

- **Why this works:**  
  - The order of y doesn't matter; for each y going from bottom up, as you process all C(n,2) so far, you can multiply with the next layer's.
  - This approach only scans the points, groups by y, and then combines using a running sum—O(N + K), where K is number of y-values.

- **Trade-offs:**  
  - Efficient, straightforward.
  - Main challenge is handling the accumulation in a way that counts unique trapezoids, not double-counted.

### Corner cases to consider  
- No y-level has 2 or more points (cannot make horizontal segment at all).
- Only one y-level has 2 or more points (can't pair to separate levels).
- Multiple y-levels but all with only 1 point (no segments possible).
- Very large number of points on one y-level (possible integer overflow; use modulo).
- Negative and positive y-values—shouldn't affect, all logic is based on counts.
- Input list may be empty.

### Solution

```python
from collections import defaultdict

MOD = 10**9 + 7

def countTrapezoids(points):
    # Step 1: Group all points by y-coordinate, count for each y
    y_count = defaultdict(int)
    for x, y in points:
        y_count[y] += 1
        
    # Step 2: For each y, compute number of horizontal segments (pairs of points)
    ys_sorted = sorted(y_count)
    seg_counts = []
    for y in ys_sorted:
        n = y_count[y]
        # Only possible if at least 2 points
        seg_count = n * (n - 1) // 2
        seg_counts.append(seg_count)
        
    # Step 3: Count total trapezoids as sum over all pairs of y-levels
    ans = 0
    pre_sum = 0  # sum of all seg_counts for lower y-levels
    for sc in seg_counts:
        ans = (ans + sc * pre_sum) % MOD
        pre_sum = (pre_sum + sc) % MOD
        
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + K log K)
    - N = number of input points (for grouping).
    - K = number of unique y-levels, sorting them.
    - For each y-level, calculations are O(1). Thus, overall efficient.
- **Space Complexity:** O(K)
    - Due to hashmap for grouping and list for segment counts.
    - No big auxiliary structures.

### Follow-up questions  
- How would you adapt the solution if given floating-point y-values (with possible tolerance)?
- If the problem asked for all trapezoids (not just horizontal-parallel-sided), how would you generalize?
- Can you output the actual set of points for each trapezoid, not just the count?