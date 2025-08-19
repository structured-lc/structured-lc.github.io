### Leetcode 1620 (Medium): Coordinate With Maximum Network Quality [Practice](https://leetcode.com/problems/coordinate-with-maximum-network-quality)

### Description  
You're given the locations and quality values of towers on a 2D grid and a signal radius. Each tower emits a signal whose quality at a point drops off with its Euclidean distance from that tower, according to the formula:  
*signal quality = ⌊qᵢ / (1 + dist)⌋*,  
where qᵢ is the tower's quality and dist is the Euclidean distance from the tower to the coordinate. Only towers within the given radius contribute.  
Find the **coordinate with the highest total network quality**. If multiple have the same highest, return the one that is lexicographically smallest (smallest x, then y).

### Examples  

**Example 1:**  
Input: `towers = [[1,2,5],[2,1,7],[3,1,9]], radius = 2`  
Output: `[2,1]`  
*Explanation:*
- At (2,1):  
  - From (2,1): ⌊7/(1+0)⌋ = 7  
  - From (1,2): ⌊5/(1+1.41)⌋ = ⌊2.07⌋ = 2  
  - From (3,1): ⌊9/(1+1)⌋ = ⌊4.5⌋ = 4  
  - Total: 7+2+4 = 13 (maximum total)

**Example 2:**  
Input: `towers = [[23,11,21]], radius = 9`  
Output: `[23,11]`  
*Explanation:*
- Only one tower, its own location has full signal: ⌊21/(1+0)⌋ = 21

**Example 3:**  
Input: `towers = [[1,2,13],[2,1,7],[0,1,9]], radius = 2`  
Output: `[1,2]`  
*Explanation:*
- At (1,2):  
  - From (1,2): ⌊13/(1+0)⌋ = 13  
  - From (2,1): ⌊7/(1+1.41)⌋ = ⌊2.91⌋ = 2  
  - From (0,1): ⌊9/(1+1.41)⌋ = ⌊3.73⌋ = 3  
  - Total: 13+2+3 = 18 (best; lex smallest of ties)

### Thought Process (as if you’re the interviewee)  

- **Brute Force**: For each grid cell, sum the quality from all towers within the radius, since grid bounds are small (0 ≤ x, y ≤ 50).
- For each cell, calculate Euclidean distance to all towers, add up the network quality from towers within radius, rounding down as required.
- Track maximum sum seen so far. In case of a tie, prefer smallest x, then y.
- Since the bounds are small (at most 51×51 positions, up to 50 towers), brute force is feasible and simple to reason about.
- An optimized approach could try to limit the region considered (such as only around towers), but for this small input space, it adds complexity for little gain.

### Corner cases to consider  
- Only one tower, or all towers have zero quality.
- Towers with overlapping ranges, causing ties.
- Points equidistant to multiple towers with same results.
- All towers’ signal at some cell are below 1 (no coverage).
- If two or more coordinates tie in network quality, must output lexicographically smallest one (min x, if tie min y).
- Towers at same position.
- Radius is 1 (smallest possible), so only very few grid points affected by each tower.

### Solution

```python
def bestCoordinate(towers, radius):
    # The grid boundaries per the constraints
    MAX_COORD = 50
    max_quality = -1
    result = [0, 0]

    # Try every possible integer coordinate in the allowed grid
    for x in range(0, MAX_COORD + 1):
        for y in range(0, MAX_COORD + 1):
            total = 0
            # For each tower, see if it can contribute to this point
            for tx, ty, q in towers:
                dx = tx - x
                dy = ty - y
                # Euclidean distance
                dist = (dx * dx + dy * dy) ** 0.5
                if dist <= radius:
                    quality = q / (1 + dist)
                    total += int(quality)  # Floor, drop any decimals
            # Track max; prefer lexicographically smallest (smaller x, then y)
            if total > max_quality or (total == max_quality and [x, y] < result):
                max_quality = total
                result = [x, y]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M × N²), where M = number of towers (≤50), N = grid size per dimension (≤51), so up to 51²×50 = 130,050 computations. Each one is a small double/arith step.
- **Space Complexity:** O(1) extra (input and output only; a few ints and floats for tracking sums).

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the coordinate bounds are much larger, and it’s infeasible to check every point?  
  *Hint: Could you restrict to only coordinates around towers, or use some form of grid or spatial partitioning?*

- What if the towers had varying radii, or even non-circular influence shapes?  
  *Hint: For different shapes, you might need spatial trees or explicit region checks.*

- How would you handle floating-point round-off issues in practical code?  
  *Hint: Explicitly use floor (int cast), be careful comparing floats; can precompute or bound the precision needed.*

### Summary
This problem uses a brute-force search across a small bounded grid to select a best coordinate via *aggregation pattern* and max-tracking. The "check every cell and aggregate contribution" technique generalizes to classic "sweep grid" variants and can be used for other grid aggregation or heatmap problems, especially when both grid and contributing sources are small. The key is reducing the brute force to manageable scale by leveraging input constraints and lexicographic tie-breaking logic.

### Tags
Array(#array), Enumeration(#enumeration)

### Similar Problems
