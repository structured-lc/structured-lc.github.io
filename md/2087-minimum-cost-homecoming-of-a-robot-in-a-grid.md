### Leetcode 2087 (Medium): Minimum Cost Homecoming of a Robot in a Grid [Practice](https://leetcode.com/problems/minimum-cost-homecoming-of-a-robot-in-a-grid)

### Description  
You are given a grid (not explicitly constructed) with m rows and n columns. A robot starts at position startPos = [start_row, start_col] and must reach homePos = [home_row, home_col].  
When the robot moves to a new row, it pays cost rowCosts[new_row].  
When it moves to a new column, it pays cost colCosts[new_col].  
The robot can move in any direction (up, down, left, right) and can only stay within the grid.  
Return the **minimum total cost** for the robot to travel from startPos to homePos (it does not pay for the starting position).

### Examples  

**Example 1:**  
Input:  
startPos = [0,1], homePos = [2,3], rowCosts = [5,4,3], colCosts = [8,2,6,7]  
Output: `18`  
*Explanation:  
One optimal path is:  
- Move down to row 1 ➝ pay rowCosts[1] = 4  
- Move down to row 2 ➝ pay rowCosts[2] = 3  
- Move right to col 2 ➝ pay colCosts[2] = 6  
- Move right to col 3 ➝ pay colCosts[3] = 7  
Total cost = 4 + 3 + 6 + 7 = 20, but if you move right first, it's 2 (col 2) + 6 (col 3) + 4 (row 1) + 3 (row 2) = 15.  
The minimal path always adds each unique row/col cost once between start and home, so total = (rowCosts[1]+rowCosts[2]) + (colCosts[2]+colCosts[3]) = 4+3+6+7 = `20`. (If going backwards, adjust indices accordingly.)*

**Example 2:**  
Input:  
startPos = [0,0], homePos = [0,0], rowCosts = [5], colCosts =   
Output: `0`  
*Explanation:  
Already at home, so total cost is 0.*

**Example 3:**  
Input:  
startPos = [2,3], homePos = [0,1], rowCosts = [5,4,3], colCosts = [8,2,6,7]  
Output: `15`  
*Explanation:  
One optimal path: Up to row 1 (pay 4), up to row 0 (pay 5), left to col 2 (pay 6), left to col 1 (pay 2): 4+5+6+2=17, but the minimum is found by always adding all the required transitions regardless of order, so sum of rowCosts[1:3] and colCosts[1:4] (or the equivalent in reverse).*


### Thought Process (as if you’re the interviewee)  
- **Naive/brute-force idea:** Try all possible paths using BFS/DFS, but since each move always costs the next row/col cost, order does not matter, and there are no obstacles.
- **Optimal observation:** The minimal cost is simply the sum of all row/col costs of the **unique rows and columns visited between start and home** (excluding initial position). So, you add the cost for every row step between start_row and home_row, and every column step between start_col and home_col.
- **Implementation:**  
  - For rows: For every row index traveled (between start_row and home_row, exclusive of the start), accumulate rowCosts.  
  - For columns: For every col index traveled, accumulate colCosts.
  - The total is the sum of these.  
- **Why is this correct?** Since going up/down/left/right is symmetric and the robot must pay the cost to enter a new row/column, regardless of path order, total cost is the sum of all visited rows and columns (excluding the start cell).

### Corner cases to consider  
- startPos == homePos (robot is already at home)
- Only 1 row or 1 column
- start_row > home_row / start_col > home_col (moving up or left)
- Large |start_row - home_row| or |start_col - home_col| (test performance)
- rowCosts or colCosts of length 1 (robot can't move in that direction)

### Solution

```python
def minCost(startPos, homePos, rowCosts, colCosts):
    """
    Returns the minimum cost for the robot to travel from startPos to homePos.
    """
    start_row, start_col = startPos
    home_row, home_col = homePos
    total_cost = 0
    
    # Move along rows first (down or up)
    # Determine step direction: +1 (down) or -1 (up)
    row_step = 1 if home_row > start_row else -1
    for r in range(start_row + row_step, home_row + row_step, row_step):
        total_cost += rowCosts[r]
    
    # Move along columns (right or left)
    col_step = 1 if home_col > start_col else -1
    for c in range(start_col + col_step, home_col + col_step, col_step):
        total_cost += colCosts[c]
    
    return total_cost
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n)  
  - Where m = abs(start_row - home_row), n = abs(start_col - home_col). We may visit each row and column once between start and home.
- **Space Complexity:** O(1)  
  - No extra space beyond variables for counting; not using auxiliary arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the robot can only move right or down?  
  *Hint: Now the order matters, but the sum logic still applies with only forward indices.*

- What if there are obstacles in certain cells?  
  *Hint: Now you need Dijkstra or BFS with min-cost per cell (classic weighted pathfinding).*

- What if each cell has its own cost instead of row/column cost arrays?  
  *Hint: Model as grid with cellCost[i][j] and use Dijkstra's algorithm.*

### Summary
This approach is a classic **greedy grid traverse** where path order doesn't matter because every step brings an unavoidable cost. Thus, adding all the required row and column transition costs on the path yields the minimum. This pattern is very common in grid shortest path problems *when movement costs are fixed per row/column or cell* and no obstacles exist, and can be extended to classic shortest path with obstacles by switching to BFS or Dijkstra's algorithm.


### Flashcard
The minimal cost is the sum of all row costs between start_row and home_row plus all column costs between start_col and home_col.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Unique Paths(unique-paths) (Medium)
- Minimum Path Sum(minimum-path-sum) (Medium)
- Bomb Enemy(bomb-enemy) (Medium)
- Count Square Submatrices with All Ones(count-square-submatrices-with-all-ones) (Medium)
- Paths in Matrix Whose Sum Is Divisible by K(paths-in-matrix-whose-sum-is-divisible-by-k) (Hard)
- Check if There is a Path With Equal Number of 0's And 1's(check-if-there-is-a-path-with-equal-number-of-0s-and-1s) (Medium)