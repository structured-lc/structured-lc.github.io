### Leetcode 1314 (Medium): Matrix Block Sum [Practice](https://leetcode.com/problems/matrix-block-sum)

### Description  
Given an m × n matrix, `mat`, and an integer k, return a new m × n matrix `answer` such that each entry `answer[i][j]` is the sum of all values `mat[r][c]` where:
- i - k ≤ r ≤ i + k,
- j - k ≤ c ≤ j + k,
- and (r, c) stays within the matrix boundaries.

Effectively, each cell in the result contains the sum of the elements within a (2k+1) × (2k+1) block centered at cell (i, j), clipped at the matrix edges.

### Examples  

**Example 1:**  
Input: `mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1`  
Output: `[[12,21,16],[27,45,33],[24,39,28]]`  
*Explanation: Each value is the sum of all surrounding (including itself) numbers within distance 1. For example, answer = 1+2+4+5=12, answer[1][1] = the sum of all elements in the 3×3 matrix = 45, etc.*

**Example 2:**  
Input: `mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2`  
Output: `[[45,45,45],[45,45,45],[45,45,45]]`  
*Explanation: Here, every position’s block covers the entire matrix, because k is large enough.*

**Example 3:**  
Input: `mat = [[5]], k = 1`  
Output: `[[5]]`  
*Explanation: Only one cell, so the block sum is 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every cell (i, j), manually sum all elements within the block boundaries: r from max(0, i-k) to min(m-1, i+k), c from max(0, j-k) to min(n-1, j+k).  
  - Time: O(m × n × k²), which could be up to 100 million operations.
- **Optimization (Prefix Sum):**  
  - Use a 2D prefix sum (also called integral image or summed-area table).
  - Construct a prefix sum matrix so that sum of any subrectangle can be calculated in O(1) time.
  - For each cell, use the prefix sum matrix to get the sum in its block efficiently:
    - For block’s top, bottom, left, right boundaries, compute by:  
      total = S(r₂,c₂) - S(r₁-1,c₂) - S(r₂,c₁-1) + S(r₁-1,c₁-1)
  - Final time: O(m × n).
- **Trade-off:** Building the prefix sum is a bit more code, but for large k or big matrices, it’s a huge speedup.

### Corner cases to consider  
- Empty matrix (mat = []) or zero-sized dimension.
- k = 0 (each cell only looks at itself, so output equals input).
- k large so block covers entire matrix.
- mat with only one row or column.
- All cells have same values or only one unique value.

### Solution

```python
def matrixBlockSum(mat, k):
    m, n = len(mat), len(mat[0])
    # Compute 2D prefix sum where pre[i+1][j+1] is the sum of mat[0...i][0...j]
    pre = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m):
        for j in range(n):
            pre[i+1][j+1] = mat[i][j] + pre[i][j+1] + pre[i+1][j] - pre[i][j]
            
    def get_sum(r1, c1, r2, c2):
        # Ensure the coordinates are within prefix sum valid range
        r1 = max(0, r1)
        c1 = max(0, c1)
        r2 = min(m-1, r2)
        c2 = min(n-1, c2)
        # (+1) since prefix sums is 1-based
        return (pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1])
    
    res = [[0] * n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            r1, c1 = i - k, j - k
            r2, c2 = i + k, j + k
            res[i][j] = get_sum(r1, c1, r2, c2)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n). Building prefix sum: O(m × n), filling output: O(m × n) since get_sum is O(1).
- **Space Complexity:** O(m × n) for the prefix sum matrix, plus O(m × n) for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your algorithm adapt if blocks were not squares but rectangles of different shapes?  
  *Hint: Think about generalizing the prefix sum query function.*

- What if the matrix was very large and you could not store the full prefix sum table in memory?  
  *Hint: Can you process one row or one block at a time to reduce memory usage?*

- If updates to individual matrix elements are frequent and you need to recompute block sums often, how would you handle it?  
  *Hint: Consider advanced data structures like Binary Indexed Tree (Fenwick Tree) or Segment Tree for 2D grids.*

### Summary
This problem uses the **2D prefix sum** (summed-area table) pattern, which is a typical approach for fast range-sum queries in matrices. It's highly efficient when multiple submatrix sums are needed, even if block sizes change. This technique appears in many other 2D problems, e.g., Range Sum 2D-Immutable, image processing, and subrectangle query problems.

### Tags
Array(#array), Matrix(#matrix), Prefix Sum(#prefix-sum)

### Similar Problems
- Stamping the Grid(stamping-the-grid) (Hard)
- Maximum Sum of an Hourglass(maximum-sum-of-an-hourglass) (Medium)
- Design Neighbor Sum Service(design-neighbor-sum-service) (Easy)