### Leetcode 2536 (Medium): Increment Submatrices by One [Practice](https://leetcode.com/problems/increment-submatrices-by-one)

### Description  
Given an n × n integer matrix initialized with all zeros, you are given a list of queries. Each query consists of four integers [row₁, col₁, row₂, col₂], and you need to increment by 1 every element in the submatrix from (row₁, col₁) (top left) to (row₂, col₂) (bottom right), inclusive. After performing all queries, return the resulting matrix.

This is similar to the classic "range update" pattern, but applied to a 2D array, and efficient updating is key.

### Examples  

**Example 1:**  
Input: `n = 3, queries = [[1,1,2,2],[0,0,1,1]]`  
Output:  
```
[[1,1,0],
 [1,2,1],
 [0,1,1]]
```  
*Explanation:  
- The first query increases elements {(1,1), (1,2), (2,1), (2,2)}.
- The second query increases corners of the top-left 2x2 submatrix: (0,0), (0,1), (1,0), (1,1).
- After both queries, the aggregated matrix is as shown above.*

**Example 2:**  
Input: `n = 2, queries = [[0,0,1,1]]`  
Output:  
```
[[1,1],
 [1,1]]
```  
*Explanation:  
- All entries in the 2x2 matrix are incremented by 1.*

**Example 3:**  
Input: `n = 4, queries = [[0,0,0,0],[0,0,1,1],[2,2,3,3]]`  
Output:  
```
[[2,1,0,0],
 [1,1,0,0],
 [0,0,1,1],
 [0,0,1,1]]
```  
*Explanation:  
- First query increases (0,0).
- Second query increases 2×2 in the top-left.
- Third query increases elements in bottom-right 2×2.*

### Thought Process (as if you’re the interviewee)  
First idea is brute-force: For each query, loop through all affected cells and increment them by 1. But with up to O(n²) queries on an n×n matrix, this is very slow (O(q·n²)).

Observation: we need to add +1 over many rectangular submatrices efficiently. This leads to using a **2D difference array**—for each query, update only the corners of the affected region, then run prefix sums to get the final values.

- For each query [row₁, col₁, row₂, col₂]:
  - Increment mat[row₁][col₁] by 1 (start of region)
  - Decrement mat[row₂+1][col₁] by 1 (below the region, if in bounds)
  - Decrement mat[row₁][col₂+1] by 1 (right of region, if in bounds)
  - Increment mat[row₂+1][col₂+1] by 1 (bottom-right “over-correction”, if in bounds)

Once all queries are processed this way, take prefix sums along rows, then columns, to get final values.

This reduces the update cost for each query to O(1), and filling out the final matrix is O(n²).

### Corner cases to consider  
- n = 1 (single cell)
- A query covers the entire matrix
- Overlapping queries (should accumulate correctly)
- Queries along the edge (ensure no out-of-bounds corner updates)
- No queries at all
- Large n with many queries (ensure performance)

### Solution

```python
def rangeAddQueries(n, queries):
    # Step 1: Initialize a 2D difference matrix of size n x n, filled with 0
    diff = [[0] * (n + 1) for _ in range(n + 1)]  # one extra col/row for edge cases

    # Step 2: Apply difference for each query on the corners
    for r1, c1, r2, c2 in queries:
        diff[r1][c1] += 1
        if r2 + 1 < n:
            diff[r2 + 1][c1] -= 1
        if c2 + 1 < n:
            diff[r1][c2 + 1] -= 1
        if r2 + 1 < n and c2 + 1 < n:
            diff[r2 + 1][c2 + 1] += 1

    # Step 3: Compute prefix sums (first rows, then columns)
    for i in range(n):
        for j in range(1, n):
            diff[i][j] += diff[i][j - 1]

    for j in range(n):
        for i in range(1, n):
            diff[i][j] += diff[i - 1][j]

    # Step 4: Build the resulting matrix (only n x n portion)
    result = [row[:n] for row in diff[:n]]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² + q). Each query is O(1) for marking. 
  The prefix sum propagates over all n² cells. So total is O(n² + q), which is optimal for n up to 500.
- **Space Complexity:** O(n²) due to the difference/prefix matrix and result matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the queries had other values than just incrementing by one?  
  *Hint: Can you generalize the difference array to arbitrary increments?*

- Can you extend this approach for a mutable 2D matrix supporting range updates and point queries interactively?  
  *Hint: Think about using advanced data structures like 2D segment trees.*

- What if you needed to support both range increment and range sum queries efficiently?  
  *Hint: Prefix sums will not be sufficient; consider Binary Indexed Trees or Segment Trees in 2D.*

### Summary
This problem is a direct application of the **2D Difference Array + Prefix Sum** technique—a powerful optimization for range update queries on matrices. This pattern frequently arises in problems where you need to perform repeated rectangular updates or queries on grids. Understanding it enables efficient solutions for a wide class of advanced grid, submatrix, and interval update challenges.