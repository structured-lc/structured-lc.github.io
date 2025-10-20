### Leetcode 764 (Medium): Largest Plus Sign [Practice](https://leetcode.com/problems/largest-plus-sign)

### Description  
Given an integer `n`, representing an `n × n` grid, and a list of mines (coordinates where the cell will be set to 0), determine the order of the largest axis-aligned plus sign that can be formed using only 1’s.  
A plus sign of order *k* has a center cell set to 1, and four arms of length *k-1* also made entirely of 1’s stretching left, right, up, and down (but not diagonally). The goal is to find the highest *k* possible. If no plus sign exists (all cells are mines), return 0.

### Examples  

**Example 1:**  
Input: `n = 5, mines = [[4,2]]`  
Output: `2`  
Explanation: The largest plus sign in this grid has arms of length 1, so the order is 2. Arm cells (to left, right, up, and down) from the center can extend to 1 cell before hitting a mine or grid edge.

**Example 2:**  
Input: `n = 1, mines = [[0,0]]`  
Output: `0`  
Explanation: The only cell is a mine, so no plus sign can be formed.

**Example 3:**  
Input: `n = 3, mines = [[0,0],[0,2],[2,0],[2,2]]`  
Output: `1`  
Explanation: The central cell (1,1) can form a plus sign of order 1 (just itself), since all arms are blocked immediately at the edges or by mines.

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would be:  
- For every cell in the grid, check the max length you can expand the arms in all four directions before hitting a mine or going off the grid.
- This is very inefficient (O(n³)) since for every cell you could scan in four directions up to size n.

To optimize:
- Use dynamic programming.  
- For every cell, precompute (for every direction: up, down, left, right) the maximum number of consecutive 1’s.
- For each cell, the order of plus sign it could be the center of is the smallest of these four directions (since all arms must be present).
- The final answer is the maximum order you find as you scan the grid.

Why use DP arrays?  
- Reduces redundant scanning; each directional count can be computed in a single pass per row/column.

### Corner cases to consider  
- n = 1, and the only cell is a mine (output 0).
- All mines (every cell set to 0, output 0).
- No mines at all (output should be ⌊n/2⌋+1).
- Mines at border; still possible to form a plus sign if a center exists.
- Multiple plus signs: must return the largest order.

### Solution

```python
def orderOfLargestPlusSign(n, mines):
    # Initialize DP grid with n's (max possible for each arm)
    dp = [[n] * n for _ in range(n)]
    mines_set = set((x, y) for x, y in mines)

    # Scan left to right
    for i in range(n):
        count = 0
        for j in range(n):
            if (i, j) in mines_set:
                count = 0
            else:
                count += 1
            dp[i][j] = min(dp[i][j], count)
        # Scan right to left
        count = 0
        for j in range(n - 1, -1, -1):
            if (i, j) in mines_set:
                count = 0
            else:
                count += 1
            dp[i][j] = min(dp[i][j], count)

    # Scan top to bottom
    for j in range(n):
        count = 0
        for i in range(n):
            if (i, j) in mines_set:
                count = 0
            else:
                count += 1
            dp[i][j] = min(dp[i][j], count)
        # Scan bottom to top
        count = 0
        for i in range(n - 1, -1, -1):
            if (i, j) in mines_set:
                count = 0
            else:
                count += 1
            dp[i][j] = min(dp[i][j], count)

    # The result is the largest value in dp
    res = 0
    for row in dp:
        for val in row:
            res = max(res, val)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  Each grid cell is visited four times (once per direction). Setting up the mine set takes O(m), but overall, O(n²) is the dominant term.
  
- **Space Complexity:** O(n²)  
  Storing the DP grid; extra set for mines is at most O(m).

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if the grid was not square?
  *Hint: Think of using “rows” and “cols” instead of just “n”.*

- What if you also need to return the coordinates of any center of the largest plus sign?
  *Hint: Keep track and store coordinates while updating the result.*

- How would you modify the solution if the grid is extremely large and memory is limited?
  *Hint: Consider doing one direction at a time, or reusing arrays for in-place calculations to reduce space.*

### Summary
This problem is a classic example of **preprocessing with dynamic programming (DP) in a 2D grid**, where you want to be able to efficiently query properties that depend on multiple directions.  
The same approach can be applied to other “maximum cross/plus sign” or “largest shape area” problems—such as counting consecutive values in grids, DP for submatrices, or dealing with blockages (obstacles) in spatial data.


### Flashcard
Precompute consecutive 1’s in all four directions for each cell; the largest plus sign order at each cell is the minimum among these.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximal Square(maximal-square) (Medium)