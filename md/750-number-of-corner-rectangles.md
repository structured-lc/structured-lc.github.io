### Leetcode 750 (Medium): Number Of Corner Rectangles [Practice](https://leetcode.com/problems/number-of-corner-rectangles)

### Description  
Given a binary matrix (all elements are 0 or 1), count how many **axis-aligned rectangles** can be formed such that all four corners of the rectangle are cells with value 1. The rectangle sides must be parallel to the axes, and only the corners need to be 1 (the edges/interior can be anything) — the 1s used as corners must be distinct cells.

### Examples  

**Example 1:**  
Input: `[[1,0,0,1,0],[0,0,1,0,1],[0,0,0,1,0],[1,0,1,0,1]]`  
Output: `1`  
Explanation: Only one axis-aligned rectangle with 1s at its corners, at positions [1,2], [1,4], [3,2], [3,4].

**Example 2:**  
Input: `[[1,1,1],[1,1,1],[1,1,1]]`  
Output: `9`  
Explanation: There are nine rectangles that can be formed by picking two rows and two columns where all four cells are 1:
- 4 (2×2): top-left, top-right, bottom-left, bottom-right 2×2 blocks.
- 4 (2×3 or 3×2): rectangles of 2 rows × 3 columns or 3 rows × 2 columns.
- 1 (3×3): the whole matrix.

**Example 3:**  
Input: `[[1,1,1,1]]`  
Output: `0`  
Explanation: Only one row, so it is impossible to form a rectangle (need two *distinct* rows and two *distinct* columns).

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Loop through all possible pairs of 1s in the matrix and check if they can serve as one corner of a rectangle, then check for the presence of the symmetrically opposite corner. However, checking every 4-tuple would be O(m²n²), which is too slow.
- **Optimized Approach:**  
  Realize a rectangle is defined by choosing **two rows** and **two columns** such that all four positions are 1.  
  For every pair of rows (row1, row2), scan through each column and count how many columns have a 1 in both rows.  
  If a pair of rows has k such columns, they form C(k,2) = k×(k-1)/2 rectangles (since every pair of columns creates a unique rectangle with these two rows).
- This reduces the problem to O(m² \* n): for each row pair, check all columns.

### Corner cases to consider  
- Matrices filled with only 0s (no rectangles possible)
- Only one row or one column
- All 1s matrix (large rectangle counts)
- Very sparse 1s (e.g., only one 1 per row)
- Large grid but few 1s

### Solution

```python
def countCornerRectangles(grid):
    # Number of rows and columns
    m, n = len(grid), len(grid[0])
    ans = 0

    # For every pair of rows
    for row1 in range(m - 1):
        for row2 in range(row1 + 1, m):
            count = 0
            # Count columns where both rows have a 1
            for col in range(n):
                if grid[row1][col] == 1 and grid[row2][col] == 1:
                    count += 1
            # For k columns, we can form count×(count-1)//2 rectangles
            ans += count * (count - 1) // 2
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m² × n)  
  For each of the m choose 2 row pairs, we scan all n columns.  
- **Space Complexity:** O(1)  
  Only a constant amount of extra space is used (counters, indices).

### Potential follow-up questions (as if you’re the interviewer)  

- How can you make this faster if the grid is very wide (n very large)?
  *Hint: Can you transpose the matrix or focus on pairs with fewer 1s?*

- If you were allowed to pre-process the grid for multiple such queries, what data structure would help?
  *Hint: Consider pre-computing positions of 1s, or using a hashmap to keep column pairs.*

- How would you handle a streaming input (rows come one at a time), or very large matrix that doesn't fit in memory?
  *Hint: Consider online processing or external storage strategies.*

### Summary
This problem uses the “count pairs” pattern, common in matrix, geometry, and combinatorics problems. The key realization is to reduce the search space from rectangles themselves to **pairs of rows where both have 1s in the same column(s)** — for each such pair, compute combinations. This approach is efficient, clear, and generalizes to other problems involving 2D grids and counting sub-rectangles/structures.