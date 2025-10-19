### Leetcode 3648 (Medium): Minimum Sensors to Cover Grid [Practice](https://leetcode.com/problems/minimum-sensors-to-cover-grid)

### Description  
You are given an n × m grid. A **sensor** can be placed in any cell, and every sensor has a *radius* k, which means it covers all cells at most *k* Manhattan distance away from its center. A cell is *covered* if it lies within the Manhattan distance *k* from some sensor. Your task: return the **minimum number of sensors needed to cover every cell in the grid**.  
- Manhattan distance between (x₁, y₁) and (x₂, y₂) is |x₁ - x₂| + |y₁ - y₂|.


### Examples  

**Example 1:**  
Input: `n = 5, m = 5, k = 1`  
Output: `4`  
Explanation:  
Placing sensors at (0, 3), (1, 0), (3, 3), and (4, 1) covers every cell.  
Visualization for n=5, m=5, k=1, S=sensor, X=covered grid:  
```
. . . S .  
S X X X X  
. . . S .  
X X X X S  
. . . . .  
```

**Example 2:**  
Input: `n = 4, m = 6, k = 2`  
Output: `2`  
Explanation:  
Placing sensors at (1, 2) and (1, 5) covers all cells, since each covers a large diamond area of radius 2.  

**Example 3:**  
Input: `n = 3, m = 7, k = 1`  
Output: `3`  
Explanation:  
Sensors at (0, 1), (1, 4), (2, 6) is enough; every cell falls within k=1 distance from one.  


### Thought Process (as if you’re the interviewee)  
First, brute-force: try all sensor placements, check every subset.  
But for larger grids or k > 0, this quickly becomes infeasible -- exponential time.  
So, can we use **tiling**?  
- One sensor at (i, j) covers a diamond-shaped region (all cells with |i-x|+|j-y| ≤ k).  
- So each sensor can cover up to (2k+1) × (2k+1) cells near the grid center, less at the edges.

Key idea:
- Think of the grid as being "tiled" by sensors' coverage areas (diamonds).
- For minimum sensors: Arrange sensors in a regular pattern so their coverage areas minimally overlap, covering all cells.  
  - For each axis (rows, cols), sensors can be placed every (2k+1) rows/cols.
  - We can scan grid in "blocks" of (2k+1) rows and (2k+1) columns. Place one sensor per block, centered optimally.
- Handle leftovers at grid borders.

So the minimum number of sensors is:  
ceil(n / (2k+1)) × ceil(m / (2k+1))  
(where ceil(x) means ⌈x⌉, the next integer if x isn't whole).

Justification: Sensors placed every (2k+1) rows and columns, grid fully covered.

**Why is this correct?**  
- Every cell is at most k rows/columns from a sensor (by construction).  
- Minimizes sensors as no two can share full responsibility for any cell outside their range.


### Corner cases to consider  
- Very small grids (e.g., n = 1, m = 1 or n,m ≤ 2k+1).
- k = 0 (sensor only covers itself: need n × m sensors).
- Grids where n or m is not a multiple of (2k+1).
- Large k relative to grid (sensor covers all, need 1).
- Empty grid (n = 0 or m = 0): edge case, return 0.
- k > min(n, m), sensor covers outside of grid.


### Solution

```python
def minNumberOfSensors(n: int, m: int, k: int) -> int:
    """
    Returns the minimum number of sensors needed to cover an n x m grid,
    where each sensor covers all cells within manhattan distance k.
    """
    # Size of each sensor's "block" is (2k+1) in both row and col
    block = 2 * k + 1

    # Number of sensor rows needed
    num_rows = (n + block - 1) // block  # ceiling division

    # Number of sensor columns needed
    num_cols = (m + block - 1) // block  # ceiling division

    # Total sensors is num_rows * num_cols
    return num_rows * num_cols
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1).  
  Only computes a few expressions, constant-time math (no loops, no recursion).
- **Space Complexity:** O(1).  
  Stores only local variables, not size-dependent.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you return the **actual placement coordinates** of each sensor?  
  *Hint: Iterate through grid indices in blocks of (2k+1), centering each sensor.*

- What if some grid cells are blocked and need not be covered?  
  *Hint: You'd need a covering set (possibly NP-hard), maybe greedy set cover algorithms.*

- What if sensors can't be placed at some cells (forbidden cells)?  
  *Hint: Need to skip placement, may require backtracking, matching, or graph techniques.*

### Summary
This problem is a classic **tiling/covering** pattern, where you partition the grid using the maximal area covered by each sensor and pack them without overlap. The code uses ceil-division to find how many sensors per axis, then multiplies them. This greedy-block tiling applies to many grid minimum covering or dominating set problems, e.g. minimal routers, guards, or similar sensor placement tasks.

### Tags
Math(#math)

### Similar Problems
