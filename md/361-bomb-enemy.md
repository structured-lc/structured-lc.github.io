### Leetcode 361 (Medium): Bomb Enemy [Practice](https://leetcode.com/problems/bomb-enemy)

### Description  
Given a 2D grid where each cell contains either a wall ('W'), an enemy ('E'), or an empty cell ('0'), your task is to find the *maximum number of enemies* that can be killed by placing a single bomb in any empty cell.  
- The bomb destroys all enemies visible in the same row and column from the planted cell, *stopping at walls*—walls block the explosion.
- You may only place the bomb in empty ('0') cells.

### Examples  

**Example 1:**  
Input: `[["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]`  
Output: `3`  
*Explanation: Placing a bomb at cell (1,1) kills the three enemies in the same row and column, as the wall blocks further explosion.  
Grid:  
0 E 0 0  
E 0 W E  
0 E 0 0*

**Example 2:**  
Input: `[["W","W","W"],["0","0","0"],["E","E","E"]]`  
Output: `1`  
*Explanation: The best you can do is kill one enemy from any empty cell in the middle row, all separated by a wall above.*

**Example 3:**  
Input: `[["0","W","E"],["E","0","W"],["0","E","0"]]`  
Output: `2`  
*Explanation: Placing the bomb at (0,0) or (2,2) kills 2 enemies for either, before hitting a wall.*

### Thought Process (as if you’re the interviewee)  
Start with a brute-force approach: for every empty cell, loop up, down, left, and right, counting enemies until you hit a wall. This works but is too slow for large grids (O(mn(m+n)), as each empty cell could scan the whole row and column).

To optimize:
- Notice overlapping work: when scanning a row, the number of enemies between two walls is the same for every empty cell in between.
- Precompute, for each cell:
  - Number of enemies in its row *segment* (between two walls)
  - Number in its column segment (same idea)
- Only recompute after hitting a wall, otherwise reuse the last computed count in that segment.
- For each '0', sum its row and column enemy counts—keep track of the max.
- This reduces time to O(mn): each cell’s segment processed once per direction.

Trade-offs:  
- Slightly more complex code, but major efficiency gain for dense/interleaved grids.

### Corner cases to consider  
- Empty grid
- Grid with no empty cells (should return 0)
- No enemies at all (should return 0)
- All cells walls (should return 0)
- Only one empty cell
- Multiple walls separating enemies and bombs
- Large grids: performance!

### Solution

```python
def maxKilledEnemies(grid):
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    max_enemies = 0
    row_hits = 0
    col_hits = [0] * cols

    for i in range(rows):
        for j in range(cols):
            # Recompute row_hits when at the start or after a wall
            if j == 0 or grid[i][j-1] == 'W':
                row_hits = 0
                k = j
                # Count row enemies for this segment
                while k < cols and grid[i][k] != 'W':
                    if grid[i][k] == 'E':
                        row_hits += 1
                    k += 1

            # Recompute col_hits[j] when at top or after wall above
            if i == 0 or grid[i-1][j] == 'W':
                col_hits[j] = 0
                k = i
                # Count column enemies for this segment
                while k < rows and grid[k][j] != 'W':
                    if grid[k][j] == 'E':
                        col_hits[j] += 1
                    k += 1

            # For empty cell, sum up row and col hits
            if grid[i][j] == '0':
                enemies = row_hits + col_hits[j]
                if enemies > max_enemies:
                    max_enemies = enemies

    return max_enemies
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Each cell is visited once for recomputation. Each segment (between walls) is processed at most once per row and once per column, so the total is O(mn).
- **Space Complexity:** O(n)  
  Only a single integer for row, and O(n) for col_hits. No extra matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to output all grid coordinates where the maximum enemies are killed?
  *Hint: Keep a list when you update max count, not just the value.*

- How would the solution change if bombs could also pass through 'W' walls?
  *Hint: Walls separation logic would be different or ignored entirely.*

- How to adapt if each bomb can be placed in any cell (not just '0')?
  *Hint: Change condition to allow any non-wall cell.*

### Summary
This problem uses the *dynamic programming and sliding window* technique on a 2D matrix, optimizing by reusing calculations for segments divided by walls.  
It’s a common pattern for matrix range queries (e.g., number of visible cells, max consecutive elements), applicable in problems like “maximum number of 1s after flipping,” or “flood fill” with barriers. The essence is segmenting the problem by natural blockers (walls) and reusing work within those segments.