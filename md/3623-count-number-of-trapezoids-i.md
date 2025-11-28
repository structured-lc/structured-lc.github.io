### Leetcode 3623 (Medium): Count Number of Trapezoids I [Practice](https://leetcode.com/problems/count-number-of-trapezoids-i)

### Description  
Given a set of points on a plane, count the number of *trapezoids* you can form where both pairs of horizontal sides are parallel to the x-axis and sit on different y-levels. Specifically, a valid trapezoid is formed by picking two pairs of points on two different horizontal lines (y-values), so that the points on each line can be connected to form the horizontal sides of the trapezoid. The order in which you pick y-levels or the sides doesn't matter—just count all distinct trapezoids as per the described rules.

### Examples  

**Example 1:**  
Input: `points = [[1,0],[2,0],[3,0],[2,2],[3,2]]`  
Output: `1`  
*Explanation: On y=0 we have (1,0),(2,0),(3,0). On y=2 we have (2,2),(3,2). Both horizontal levels can form a pair of horizontal segments (choose 2 from 3 at y=0, and the only pair at y=2), so there is 1 trapezoid possible.*

**Example 2:**  
Input: `points = [[1,1],[2,1],[3,1],[1,3],[2,3],[3,3]]`  
Output: `9`  
*Explanation: Each y-level has 3 points, and you can choose 2 points from each to form horizontal sides. Number of pairs on each level = 3, so total trapezoids = 3 × 3 = 9.*

**Example 3:**  
Input: `points = [[0,0],[1,1],[2,2]]`  
Output: `0`  
*Explanation: No two points share a y-value, so no horizontal side can be formed—so no trapezoids.*

### Thought Process (as if you’re the interviewee)  
First, to form a trapezoid as described, you need two distinct y-levels, and at each level, you need at least two points (so you can form a horizontal "side").  
The brute-force way would be:  
- For all pairs of y-levels,
  - For each, count how many ways we can pick 2 points at y-level A and 2 points at y-level B.
- For large N, this is inefficient.

Instead, precalculate for each y-value, how many pairs of points (so, combinations C(n, 2)) exist.  
Now, for each pair of *different* y-levels, the total trapezoids you can form using those levels is the product of the pairs from both levels.  
Rather than check every pair, we can process all y-levels in order, and for each, accumulate the number of already seen pairs. For each y-level i, multiply its count of pairs by the total for all earlier y-levels, and sum this.

**Trade-offs:**  
This optimized counting is O(M), where M is the number of distinct y-values, so it's much faster.

### Corner cases to consider  
- No two points share a y-level (output = 0).
- Only one y-level has ≥ 2 points (output = 0).
- Multiple y-levels with < 2 points (skip).
- Duplicate points (if not possible per problem, otherwise don't double count).
- Large inputs (efficiency matters).

### Solution

```python
# Leetcode 3623 - Count Number of Trapezoids I

def countTrapezoids(points):
    from collections import defaultdict

    MOD = 10**9 + 7
    y_groups = defaultdict(int)

    # Count points per y-level
    for x, y in points:
        y_groups[y] += 1

    # For each y, count all possible pairs ("horizontal sides") we can form
    y_levels = sorted(y_groups.keys())
    pair_counts = [ (y_groups[y] * (y_groups[y] - 1) // 2) % MOD for y in y_levels ]
    
    ans = 0
    prefix_sum = 0
    for cnt in pair_counts:
        ans = (ans + cnt * prefix_sum) % MOD
        prefix_sum = (prefix_sum + cnt) % MOD
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N is number of points, M is number of unique y-values (since sorting the y-levels, usually much less than N), and total work is linear over y-levels.
- **Space Complexity:** O(M), for storing the count of points for each distinct y-level.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we care about *all* types of trapezoids, not just those with horizontal sides?
  *Hint: You'll need to consider all pairs of parallel segments, so check for all possible slopes (not just zero). Possible use of hashing by slope.*

- Can you output the actual coordinates of all possible trapezoids, not just the count?
  *Hint: For each y-level pair, you can enumerate all pairs at each level, generating combinations. What's the complexity of listing everything?*

- Suppose some points are repeated. How does it affect your counting?
  *Hint: If duplicate coordinates are allowed, how do you avoid double-counting?*

### Summary
This is a classic *combinatorics and grouping* problem: group by y-level, count combinations, then combine in a way that avoids double counting using prefix sums. This pattern is common in geometry, combinatorics, and problems involving pairs of events or groupings across distinct classes (e.g., two-sum style, rectangles in a grid, etc.). Fast reduction from O(N²) brute force to O(N) accumulative logic is key.


### Flashcard
Precompute for each y-level the number of point pairs C(count, 2); for each pair of y-levels, multiply their pair counts to get trapezoid count.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Geometry(#geometry)

### Similar Problems
