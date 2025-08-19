### Leetcode 174 (Hard): Dungeon Game [Practice](https://leetcode.com/problems/dungeon-game)

### Description  
You are given a 2D dungeon grid where each cell represents one room:  
- A *positive value* increases the knight’s health (magic orb).  
- A *negative value* decreases health (demon).  
- The knight starts at the top-left (0,0) and must reach the princess at the bottom-right (m-1,n-1), moving only right or down.  
- The knight **dies** immediately when his health drops to 0 or below at any point.  
Your task: **Return the minimum initial health required** so the knight can rescue the princess and survive, assuming both play optimally.  

### Examples  

**Example 1:**  
Input: `dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]`  
Output: `7`  
*Explanation: The knight must start with at least 7 health. One optimal path: down→down→right→right. Step-by-step:  
Start with 7 → 7-2=5 → 5-5=0 (would die) so that's not optimal.  
Taking optimal: Right, Right, Down, Down: 7-2=-1 (not possible).  
So try all optimal and minimum is 7.*

**Example 2:**  
Input: `dungeon = []`  
Output: `1`  
*Explanation: The knight only needs 1 health to survive since there’s no negative value.*

**Example 3:**  
Input: `dungeon = []`  
Output: `1`  
*Explanation: Since entering the goal cell, minimum health required is just 1.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force (DFS/backtracking):** Try every path from (0,0) to (m-1,n-1), keeping track of health required.  
  - This quickly becomes exponential, as each cell has up to two choices (down, right), so not practical for large grids.  
- **Greedy?** Not possible since the choice at each cell depends on future rooms' values and health.  
- **Dynamic Programming:**  
  - Optimal substructure: The minimal health required to *enter* a given cell only depends on the minimal health needed in its *neighbors* (right, down).  
  - Work *backwards* from the goal.  
    - Let dp[i][j] = the minimum health needed to ENTER (i,j) to eventually rescue the princess.  
    - At each dp cell:  
      - When stepping into (i, j), your health should be at least:  
        `max(1, min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j])`  
        (need at least 1 regardless, and after leaving the cell, must have enough for the best path ahead)  
    - Base case: dp[m-1][n-1] (princess cell): need at least max(1, 1 - dungeon[last_cell_value]) to survive.  
  - Fill dp table from bottom-right to top-left.

### Corner cases to consider  
- 1x1 dungeon (single cell)  
- All positive cells (no loss of health)  
- Deep negative on path  
- Entry (0,0) is negative enough to require >1 start  
- Entry (0,0) is positive, but needs more to survive further  
- Large grids, performance  

### Solution

```python
def calculateMinimumHP(dungeon):
    m, n = len(dungeon), len(dungeon[0])
    # dp[i][j] = min health needed to ENTER cell (i,j)
    dp = [[float('inf')] * (n + 1) for _ in range(m + 1)]
    # Boundary: Need 1 health in the cell after princess (setting for convenience)
    dp[m][n-1] = dp[m-1][n] = 1

    # Fill dp table from bottom-right to top-left
    for i in reversed(range(m)):
        for j in reversed(range(n)):
            min_needed = min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j]
            dp[i][j] = max(1, min_needed)

    return dp[0][0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n), where m and n are the dungeon’s dimensions. Each cell computed exactly once.
- **Space Complexity:** O(m×n), due to the extra dp table.

### Potential follow-up questions (as if you’re the interviewer)  

- How can this solution be optimized for space?
  *Hint: Since only current and next row are needed at once, can you compress to O(n) space?*

- Can you reconstruct the actual path (not just minimum health needed)?
  *Hint: Track the choices at every step or backtrack using the dp table.*

- What if instead of moving only right and down, the knight could also move left and up?
  *Hint: The recurrence changes and you'd need to handle cycles / memoization carefully or even BFS.*

### Summary
This problem uses the **Reverse DP** pattern, where we work from the goal back to the start to guarantee feasibility at each move. Similar patterns occur in "minimum cost path" and other grid-based DP problems with constraints that are tightest at the destination. This is a classic example of *backwards DP* and grid traversal.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Unique Paths(unique-paths) (Medium)
- Minimum Path Sum(minimum-path-sum) (Medium)
- Cherry Pickup(cherry-pickup) (Hard)
- Minimum Path Cost in a Grid(minimum-path-cost-in-a-grid) (Medium)
- Minimum Health to Beat Game(minimum-health-to-beat-game) (Medium)
- Paths in Matrix Whose Sum Is Divisible by K(paths-in-matrix-whose-sum-is-divisible-by-k) (Hard)
- Check if There is a Path With Equal Number of 0's And 1's(check-if-there-is-a-path-with-equal-number-of-0s-and-1s) (Medium)