### Leetcode 3142 (Easy): Check if Grid Satisfies Conditions [Practice](https://leetcode.com/problems/check-if-grid-satisfies-conditions)

### Description  
You are given a 2D integer grid of size m × n. For each cell at position (i, j):
- If there is a cell directly **below**, the value must be **equal** to that cell (grid[i][j] == grid[i+1][j]).
- If there is a cell immediately **to the right**, the value must be **different** from that cell (grid[i][j] != grid[i][j+1]).
Return True if the grid satisfies these conditions for **every cell**; otherwise, return False.

### Examples  

**Example 1:**  
Input: `grid = [[1,2],[1,3]]`  
Output: `true`  
*Explanation:*
- grid = 1 and grid[1] = 1 ⇒ equal (good).
- grid = 1 and grid[1] = 2 ⇒ different (good).
- grid[1] = 2 and grid[1][1] = 3 ⇒ not checked for below since row 1 is the last.
- grid[1] = 1 and grid[1][1] = 3 ⇒ different (good).
All conditions satisfied.

**Example 2:**  
Input: `grid = [[1,1],[2,2]]`  
Output: `false`  
*Explanation:*
- grid = 1 and grid[1] = 1 ⇒ not different (bad).
As soon as one rule is violated, return false.

**Example 3:**  
Input: `grid = [[1,2,3],[1,3,2],[1,2,3]]`  
Output: `true`  
*Explanation:*
- Every cell below is equal, every cell to the right is different.

### Thought Process (as if you’re the interviewee)  
First, loop through each cell in the 2D grid. 
- For every cell, if it has a neighbor **below**, check grid[i][j] == grid[i+1][j]. 
- For every cell, if it has a neighbor **to the right**, check grid[i][j] != grid[i][j+1].  
Return False as soon as any check fails.

**This is an O(m×n)** brute-force check, but has to be done since every cell pair relevant to the constraints must be checked.  
No further optimization required as each cell's properties are independent and each must be touched at least once.

### Corner cases to consider  
- Single row (no cells below to check).
- Single column (no cells to the right).
- Grid with repeated values.
- Grid where the last row/column should not be checked beyond its bounds.
- Possible negative and large integers.

### Solution

```python
def satisfiesConditions(grid):
    m = len(grid)
    n = len(grid[0])

    # Loop through each cell
    for i in range(m):
        for j in range(n):
            # Check cell below
            if i + 1 < m:
                if grid[i][j] != grid[i+1][j]:
                    return False

            # Check cell to the right
            if j + 1 < n:
                if grid[i][j] == grid[i][j+1]:
                    return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n), where m is the number of rows, n is the number of columns. Each cell is visited once, and each operation inside is O(1).
- **Space Complexity:** O(1) extra space (apart from the input grid), as only loop variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the location of the first cell that violates a rule?  
  *Hint: Instead of returning True/False, return coordinates (i,j) or a list of all such coordinates.*

- Can this be parallelized for very large grids?  
  *Hint: Each cell check is independent (except at borders), so rows or blocks could be processed in parallel.*

- How would you modify this if instead you had to check diagonally-neighboring cells?  
  *Hint: Extend your checking logic to cover all 8 neighbors for each cell, not just right and below.*

### Summary
This problem follows a **brute-force adjacency check** pattern, common with 2D grid traversal where you verify conditions based on adjacent cells.  
Working through each cell and comparing to specific neighbors (right, below) comes up often in matrix-based interviews—e.g., island counting, Game of Life, etc.  
Edge handling (boundaries) and stopping early on first violation are important coding patterns here.


### Flashcard
Loop through grid checking: grid[i][j] == grid[i+1][j] for cells below, and grid[i][j] ≠ grid[i][j+1] for cells to the right.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
- Candy(candy) (Hard)
- Distribute Candies(distribute-candies) (Easy)
- Minimum Cost of Buying Candies With Discount(minimum-cost-of-buying-candies-with-discount) (Easy)