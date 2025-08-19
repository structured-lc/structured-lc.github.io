### Leetcode 2711 (Medium): Difference of Number of Distinct Values on Diagonals [Practice](https://leetcode.com/problems/difference-of-number-of-distinct-values-on-diagonals)

### Description  
Given a 0-indexed grid of size m × n, you are to generate an answer matrix of the same shape, where each cell answer[r][c] is calculated as follows:
- For each (r, c), consider all cells on its top-left diagonal (i.e., cells above and to the left, not including itself) and count the number of **distinct** values among them.
- Also consider all cells on its bottom-right diagonal (i.e., cells below and to the right, not including itself) and count the number of **distinct** values among them.
- Then, set answer[r][c] = |topLeftDistinctCount - bottomRightDistinctCount|, i.e., the absolute difference of the two counts.

### Examples  

**Example 1:**  
Input: `grid = [[1,2,3],[3,1,5],[3,2,1]]`  
Output: `[[1,2,3],[3,1,1],[0,1,1]]`  
*Explanation:*

- (0,0): top-left=[], bottom-right=[1,5,1] → |0-2|=2
- (0,1): top-left=[1], bottom-right=[5,1] → |1-2|=1
- (0,2): top-left=[1,2], bottom-right=[1] → |2-1|=1
- (1,0): top-left=[1], bottom-right=[2,1] → |1-2|=1
- (1,1): top-left=[1,3], bottom-right=[1] → |2-1|=1
- And so on, filling all cells.

**Example 2:**  
Input: `grid = [[2,4,7],[5,2,3],[3,2,2]]`  
Output: `[[1,2,3],[3,1,1],[0,1,1]]`  
*Explanation:*
- The same diagonal counting applied per cell.

**Example 3:**  
Input: `grid = []`  
Output: `[]`  
*Explanation:*
- Only one cell. No diagonal cells. Both counts are 0, so |0 - 0| = 0.

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  For each cell, traverse diagonally top-left to collect unique values until out of bounds, and do similarly bottom-right. Store them in sets to get the count. This leads to O(mn × min(m,n)) work.

- **Optimize:**  
  Since the diagonal for each cell can be traversed once, we can precompute for all diagonals using hash sets, but since we need "before" for top-left and "after" for bottom-right for each cell, a two-pass approach works efficiently:
    - In the first pass, process diagonals from top-left to bottom-right, maintaining a set for each diagonal and filling in the cell's top-left "distinct count" as we move forward.
    - In the second pass, process from bottom-right to top-left in the same manner, but now gathering the bottom-right distinct counts.
    - This minimizes redundant diagonal traversals and reduces overall time.

- **Trade-offs:**  
  The two-pass diagonal scan is optimal here due to the nature of diagonal independence, using O(mn) extra space for results and (possibly) for diagonal sets.

### Corner cases to consider  
- grid is 1×1 → no diagonals; expect 0
- All elements in grid are the same → all set differences are 0
- Each grid cell unique → more variation in differences
- Grid is not square (more rows than columns, vice versa)
- grid has a single row or single column

### Solution

```python
def differenceOfDistinctValues(grid):
    m, n = len(grid), len(grid[0])
    # Prepare arrays to store counts for top-left and bottom-right
    top_left = [[0]*n for _ in range(m)]
    bottom_right = [[0]*n for _ in range(m)]

    # Pass 1: top-left to bottom-right
    # For each diagonal, process from top-left
    for k in range(-(n-1), m):  # k = row - col: all diagonal keys
        seen = set()
        row, col = (k, 0) if k >= 0 else (0, -k)
        while row < m and col < n:
            top_left[row][col] = len(seen)
            seen.add(grid[row][col])
            row += 1
            col += 1

    # Pass 2: bottom-right to top-left
    for k in range(-(n-1), m):
        seen = set()
        # Find diagonal starting point at bottom-right
        if k >= 0:
            row, col = min(m-1, m-1 - (m-1-k)), min(n-1, n-1 - (m-1-k))
        else:
            row, col = min(m-1, m-1 + k), min(n-1, n-1)
        # Go up the diagonal
        while row >= 0 and col >= 0 and row-col == k:
            bottom_right[row][col] = len(seen)
            seen.add(grid[row][col])
            row -= 1
            col -= 1

    # Build result based on the two arrays
    answer = [[0]*n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            answer[i][j] = abs(top_left[i][j] - bottom_right[i][j])
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n). Each diagonal is traversed once per pass, and each cell is processed in constant time within the pass.
- **Space Complexity:** O(m × n) for the top_left and bottom_right matrices, plus O(min(m, n)) for the sets used at each step.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the grid was extremely large and couldn't fit in memory?
  *Hint: Think about online or streaming computation and block-wise processing.*

- Can you optimize space usage if only the answer is needed and not the intermediate matrices?
  *Hint: Use rolling variables or process row-by-row if possible.*

- How would you handle the problem if you needed to process other shapes, such as anti-diagonals?
  *Hint: Think about coordinate systems for each desired diagonal family.*

### Summary
This problem is a classic double diagonal precompute problem—similar to prefix/suffix sum patterns, but extended to 2D with diagonal traversal. The optimized two-pass approach allows each diagonal to be processed efficiently in both directions, using sets or hash-maps to track uniqueness as we go. This pattern generalizes to other 2D problems where a property must be aggregated or compared along a diagonal relationship.

### Tags
Array(#array), Hash Table(#hash-table), Matrix(#matrix)

### Similar Problems
