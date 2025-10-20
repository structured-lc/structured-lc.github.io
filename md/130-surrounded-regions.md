### Leetcode 130 (Medium): Surrounded Regions [Practice](https://leetcode.com/problems/surrounded-regions)

### Description  
Given a 2D board containing 'X' and 'O', **capture all regions surrounded by 'X'**.  
A region is captured by flipping all 'O's into 'X's in that region.  
A region is considered *surrounded by 'X'* if it is completely surrounded (up, down, left, right) by 'X's and does **not** touch the border, either directly or indirectly (i.e., by connecting to another 'O' that touches the border).  
Any 'O' region that *touches the border* remains as 'O'.  
Only four-directional (not diagonal) connections count.

### Examples  

**Example 1:**  
Input:  
`[["X","X","X","X"], ["X","O","O","X"], ["X","X","O","X"], ["X","O","X","X"]]`  
Output:  
`[["X","X","X","X"], ["X","X","X","X"], ["X","X","X","X"], ["X","O","X","X"]]`  
Explanation.  
- The 'O's in the middle are surrounded by 'X' and flipped to 'X'.
- The 'O' at (3,1) is connected to the border, so it remains.

**Example 2:**  
Input:  
`[["X","O","X"], ["O","O","O"], ["X","O","X"]]`  
Output:  
`[["X","O","X"], ["O","O","O"], ["X","O","X"]]`  
Explanation.  
- All 'O's are either on the border or connected to a border 'O', so none are flipped.

**Example 3:**  
Input:  
`[["X"]]`  
Output:  
`[["X"]]`  
Explanation.  
- No 'O' to flip.

### Thought Process (as if you’re the interviewee)  
**Brute-force idea:**  
- For each 'O', check if it is surrounded on all four sides by 'X'.
- Can DFS/BFS from each 'O' to check if it's connected to the border.
- This is slow: could revisit the same 'O' many times (O((m×n)²)).

**Optimized approach:**  
- The *critical insight:* Only 'O's **not connected to the border** can be flipped.
- Instead of examining all regions, **start from the border** and mark all 'O's connected to the border (either directly or via other 'O's).
- Steps:
  1. Traverse all border cells. Whenever a border cell is 'O', start a DFS or BFS to mark all 'O's connected to it (using a temp marker, e.g., 'E' for escape).
  2. After marking, scan the board:
     - Flip all unmarked 'O's to 'X' (these are truly surrounded).
     - Change all marked 'E' cells back to 'O' (since they should not be flipped).
- **Why this is better:**  
  - Each cell is processed at most twice: once for marking, once to finalize.
  - Avoids repeated unnecessary DFS/BFS from every non-border cell.

### Corner cases to consider  
- Empty board (no rows or no columns)
- 1×n or m×1 boards (everything is on the border)
- Board with only 'X' (nothing changes)
- Board with only 'O' (all touch the border, so no flips)
- Diagonal 'O's: only four-directional connections matter
- Sparse 'O's adjacent to the border (should never flip)
- All 'O's already surrounded by 'X' (flip those)

### Solution

```python
def solve(board):
    """
    Modifies the board in-place by flipping surrounded 'O's to 'X'.
    """
    if not board or not board[0]:
        return

    rows, cols = len(board), len(board[0])

    def dfs(r, c):
        # Out of bounds or not 'O', stop
        if not (0 ≤ r < rows and 0 ≤ c < cols) or board[r][c] != 'O':
            return
        # Mark safe 'O' connected to border as 'E'
        board[r][c] = 'E'
        # Visit all four directions
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    # 1. Mark border-connected 'O's as 'E'
    for r in range(rows):
        for c in [0, cols-1]:
            dfs(r, c)
    for c in range(cols):
        for r in [0, rows-1]:
            dfs(r, c)

    # 2. Flip non-border 'O's to 'X', revert 'E' back to 'O'
    for r in range(rows):
        for c in range(cols):
            if board[r][c] == 'O':
                board[r][c] = 'X'
            elif board[r][c] == 'E':
                board[r][c] = 'O'
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n), where m is the number of rows and n is the number of columns.
  - Each cell is visited at most twice (once during DFS, once during final flip).
- **Space Complexity:** O(1) extra if using DFS and modifying the grid in-place, ignoring recursion stack.
  - Call stack could be O(m×n) in worst-case if the region is very large (can use BFS with a queue for bounded space).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you avoid recursion stack overflow on very large grids?  
  *Hint: Use iterative BFS instead of recursive DFS. Maintain a queue for border-connected 'O's.*

- Can you do it in-place without using extra marker variables (i.e., without 'E')?  
  *Hint: Use bit manipulation or a negative/temporary placeholder.*

- How does this change if connections can be diagonal?  
  *Hint: Update DFS/BFS to also consider diagonal neighbors.*

### Summary  
The approach leverages **multi-source BFS/DFS** to efficiently explore regions from the border. This is a classic grid traversal/connectivity pattern, useful for problems about islands, connected components, and related concepts. The in-place marking step is a common trick for state tracking in modification problems on a grid.


### Flashcard
Mark all 'O's connected to the border using BFS/DFS; flip remaining 'O's to 'X' since only non-border-connected regions are surrounded.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
- Number of Islands(number-of-islands) (Medium)
- Walls and Gates(walls-and-gates) (Medium)