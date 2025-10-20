### Leetcode 2088 (Hard): Count Fertile Pyramids in a Land [Practice](https://leetcode.com/problems/count-fertile-pyramids-in-a-land)

### Description  
Given a 2D grid of size n × m where each cell contains either 0 (barren) or 1 (fertile), count the total number of *pyramidal* and *inverse pyramidal* plots.  
A "pyramid" is a set of consecutive rows forming an isosceles triangle of fertile cells (apex at the top, increasing width by one cell on each side in each row).  
An "inverse pyramid" is the same but upside down (apex at the bottom, expanding upwards).  
You must count all non-degenerate (height at least 2) pyramids and inverse pyramids formed by strictly fertile cells.

### Examples  

**Example 1:**  
Input: `grid = [[0,1,1,1,0],[1,1,1,1,1],[0,1,1,1,0],[0,1,1,1,0]]`  
Output: `13`  
*Explanation: There are 9 upright pyramids:  
- 1 apex at (1,2) with height 3  
- 2 apexes at (1,1) and (1,3) with height 2  
- All (0,1), (0,2), (0,3), (2,1), (2,2), (2,3) with height 1  
And 4 inverted pyramids with apexes at (2,2) and below.*

**Example 2:**  
Input: `grid = [[1,1,1],[1,1,1],[1,1,1]]`  
Output: `8`  
*Explanation:  
- Upright pyramids: (0,1) height 2; (1,1) height 2; (1,0), (1,2), (2,1) height 1  
- Inverted pyramids: (2,1) height 2; (1,1) height 2; (1,0), (1,2), (0,1) height 1*

**Example 3:**  
Input: `grid = [[1,0,1],[0,1,0],[1,0,1]]`  
Output: `0`  
*Explanation: No pyramidal or inverse pyramidal plot, since there's no way to form a triangle of height ≥2.*

### Thought Process (as if you’re the interviewee)  
First, brute force: For every cell, check if it is the apex of a pyramid (try growing height downward), and the apex of an inverse pyramid (try growing height upward). For each, check if all required positions are fertile (`O(n²m)` per apex, very slow for big grids).

To optimize, use **dynamic programming**.  
- For upright pyramids:
    - Start from the bottom row, move upwards. For each cell, dp[i][j] = min(dp[i+1][j-1], dp[i+1][j], dp[i+1][j+1]) + 1 if grid[i][j] is 1, else 0. This gives the maximal pyramid height at (i,j).
    - Any position with pyramid height ≥2 contributes (height - 1) pyramids (one for each possible size).
- For inverted pyramids:
    - Do the same, but scan from top to bottom.

Why this helps: After calculating these dp tables for both orientations, simply sum up all contributions where height ≥2.

Trade-offs:  
- It's more memory and code, but feasible and fast; the naive brute force would timeout for larger cases.

### Corner cases to consider  
- Entirely barren grid (all zeros)
- Tiny grid (1×n or n×1), no possible pyramids
- Only edge fertile cells (can't expand for pyramid)
- Large fully fertile grid
- Nonsquare grid (rectangular, tall, or wide)

### Solution

```python
def countPyramids(grid):
    n = len(grid)
    m = len(grid[0])

    def count(direction):
        # Create a DP grid; base case: all nonzero cells have base height 1, else 0.
        dp = [[0] * m for _ in range(n)]
        total = 0

        rng = range(n-1, -1, -1) if direction == 'up' else range(n)

        for i in rng:
            for j in range(m):
                if grid[i][j] == 0:
                    dp[i][j] = 0
                else:
                    if (direction == 'up' and i < n-1 and 0 < j < m-1):
                        dp[i][j] = min(
                            dp[i+1][j-1],
                            dp[i+1][j],
                            dp[i+1][j+1]
                        ) + 1
                    elif (direction == 'down' and i > 0 and 0 < j < m-1):
                        dp[i][j] = min(
                            dp[i-1][j-1],
                            dp[i-1][j],
                            dp[i-1][j+1]
                        ) + 1
                    else:
                        dp[i][j] = 1
                # Only count pyramids with base at least 2 rows
                # (exclude height=1, which is just a cell)
                if dp[i][j] > 1:
                    total += dp[i][j] - 1
        return total

    # Count upward pyramids (apex at the top, base down)
    up = count('up')
    # Count downward (inverse) pyramids (apex at the bottom, base up)
    # by flipping grid upside-down for simplicity
    down = count('down')
    return up + down
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m) for each direction, so overall O(n × m). Each cell is processed a constant number of times for both upright and inverted pyramids.
- **Space Complexity:** O(n × m) for the DP matrices, minimal extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you had to count pyramids of heights only ≥ k?  
  *Hint: Instead of height > 1, check for height ≥ k before counting contribution.*

- What if you had to report the total area covered by all pyramidal plots, not just the count?  
  *Hint: For each pyramid reported, compute area as sum of its rows (i.e., 1 + 3 + 5 + ... up to base).*

- Could you output the positions of all possible apexes for pyramids of a given height?  
  *Hint: Record (i, j) wherever dp[i][j] ≥ height threshold.*

### Summary
This problem uses a classic *dynamic programming on grids* pattern, leveraging previous row computations for triangle/pyramid shapes. The "minimum of three DP values plus 1" is common for expanding symmetric figures with contiguous growth requirements—applicable in triangle counting, largest square/rectangle, and tiling problems. The pattern can be applied to count/aggregate patterns that grow outward symmetrically in grid-based puzzles.


### Flashcard
Use DP to compute for each cell the largest possible pyramid height (upright and inverted), then sum heights ≥ 2 for all cells.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Count Square Submatrices with All Ones(count-square-submatrices-with-all-ones) (Medium)
- Get Biggest Three Rhombus Sums in a Grid(get-biggest-three-rhombus-sums-in-a-grid) (Medium)