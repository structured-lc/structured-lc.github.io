### Leetcode 304 (Medium): Range Sum Query 2D - Immutable [Practice](https://leetcode.com/problems/range-sum-query-2d-immutable)

### Description  
Design a data structure to efficiently answer sum queries for a subrectangle in a 2D integer matrix. Given a matrix of integers, you'll receive multiple queries of the form: “What is the sum of all numbers in the subrectangle from (`row1`, `col1`) to (`row2`, `col2`) inclusive?” The solution needs to precompute information so that each query can be answered in constant time, even when asked repeatedly.

### Examples  

**Example 1:**  
Input:  
matrix = [[3,0,1,4,2],  
          [5,6,3,2,1],  
          [1,2,0,1,5],  
          [4,1,0,1,7],  
          [1,0,3,0,5]]

sumRegion(2,1,4,3)  
Output: `8`  
Explanation:  
Sum of rectangle from (2,1) to (4,3):  
region = [[2,0,1],  
          [1,0,1],  
          [0,3,0]]  
Sum = 2+0+1+1+0+1+0+3+0 = 8

**Example 2:**  
Input:  
sumRegion(1,1,2,2)  
Output: `11`  
Explanation:  
Sum of rectangle from (1,1) to (2,2):  
region = [[6,3],  
          [2,0]]  
Sum = 6+3+2+0 = 11

**Example 3:**  
Input:  
sumRegion(1,2,2,4)  
Output: `12`  
Explanation:  
Sum of rectangle from (1,2) to (2,4):  
region = [[3,2,1],  
          [0,1,5]]  
Sum = 3+2+1+0+1+5 = 12

### Thought Process (as if you’re the interviewee)  
First, the brute-force solution is to loop through every element in the subrectangle for each query. For a rectangle of size (row2-row1+1)×(col2-col1+1), this is slow if queries are frequent or subrectangles are large.

To optimize, the classic method is **2D prefix sums**:
- For each cell (i, j), store the sum of the rectangle from (0, 0) to (i, j).
- For any arbitrary rectangle query, calculate its sum in O(1) using the inclusion-exclusion principle.

The rectangle query formula is:
Sum = pre[row2+1][col2+1]  
      - pre[row1][col2+1]  
      - pre[row2+1][col1]  
      + pre[row1][col1]

This approach has trade-offs:
- Preprocessing takes O(m×n) time/space.
- Each query is O(1) and does not revisit the grid.

This is the optimal solution for static matrices with many rectangle queries.

### Corner cases to consider  
- Empty matrix: `[]`
- Single row or single column
- Negative numbers in the matrix
- Query for a single cell (row1==row2 and col1==col2)
- Out-of-bounds queries (shouldn't occur per problem statement)
- Multiple consecutive sumRegion calls
- Query spanning entire matrix

### Solution

```python
class NumMatrix:
    def __init__(self, matrix):
        if not matrix or not matrix[0]:
            self.pre = []
            return
        m, n = len(matrix), len(matrix[0])
        # Create prefix sum array with extra row & col for easier calculations
        self.pre = [[0] * (n + 1) for _ in range(m + 1)]
        # Compute cumulative sum for each cell
        for i in range(m):
            for j in range(n):
                self.pre[i + 1][j + 1] = (self.pre[i + 1][j] +
                                          self.pre[i][j + 1] -
                                          self.pre[i][j] +
                                          matrix[i][j])

    def sumRegion(self, row1, col1, row2, col2):
        # Inclusion-exclusion to get sum of desired submatrix
        return (self.pre[row2 + 1][col2 + 1]
                - self.pre[row2 + 1][col1]
                - self.pre[row1][col2 + 1]
                + self.pre[row1][col1])
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - Preprocessing: O(m × n) to fill prefix sum matrix.
  - Each `sumRegion` query: O(1), due to direct lookup and arithmetic.
- **Space Complexity:**
  - O(m × n) extra space for the prefix sum array (size (m+1) × (n+1)), aside from the input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix is mutable, i.e., numbers can change, and we still want efficient queries?
  *Hint: Consider segment trees or Binary Indexed Trees for 2D updates and queries.*

- Can you handle very large, sparse matrices more efficiently in space?
  *Hint: Explore usage of hash maps/dictionaries or compressing data only for non-zero entries.*

- How would your solution change for higher-dimensional (3D or more) data?
  *Hint: Generalize the prefix sum approach recursively for higher dimensions.*

### Summary
This problem uses the **2D prefix sum pattern**, a common dynamic programming trick for subarray/submatrix sum queries with immutable data. It's a vital technique for problems that require fast range sum queries over static data, and applies to applications ranging from image processing to spreadsheet optimizations.

### Tags
Array(#array), Design(#design), Matrix(#matrix), Prefix Sum(#prefix-sum)

### Similar Problems
- Range Sum Query - Immutable(range-sum-query-immutable) (Easy)
- Range Sum Query 2D - Mutable(range-sum-query-2d-mutable) (Medium)
- Find the Grid of Region Average(find-the-grid-of-region-average) (Medium)