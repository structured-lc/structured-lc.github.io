### Leetcode 308 (Medium): Range Sum Query 2D - Mutable [Practice](https://leetcode.com/problems/range-sum-query-2d-mutable)

### Description  
Design a data structure for a 2D integer matrix which allows:
- **Updating** the value at any cell (row, col) to a new value.
- **Querying** the sum of elements inside any given rectangular submatrix defined by its top-left (row₁, col₁) and bottom-right (row₂, col₂) corners.

You must support both operations efficiently, as both updates and queries can occur frequently and the matrix can be large. The challenge lies in handling dynamic updates along with fast range sum queries.

### Examples  

**Example 1:**  
Input:  
matrix =  
```
[[3, 0, 1, 4, 2], 
 [5, 6, 3, 2, 1], 
 [1, 2, 0, 1, 5], 
 [4, 1, 0, 1, 7], 
 [1, 0, 3, 0, 5]]
```
NumMatrix(matrix)  
sumRegion(2, 1, 4, 3)  
Output: `8`  
*Explanation: The sum of submatrix `[[2,0,1],[0,1,7],[3,0,5]]` inside rows 2..4 and cols 1..3 is 8.*

**Example 2:**  
Input:  
update(3, 2, 2)  
sumRegion(2, 1, 4, 3)  
Output: `10`  
*Explanation: After updating element at (3,2) to 2, the updated region sum is 10.*

**Example 3:**  
Input:  
sumRegion(1, 1, 2, 2)  
Output: `11`  
*Explanation: Region sum of the 2x2 submatrix with top left (1,1) and bottom right (2,2) is 11.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  On each update, set matrix[row][col] to val.  
  On each sumRegion, iterate across every cell inside the rectangular region, summing them up.  
  - **Problem:**  
    sumRegion query is O((row₂-row₁+1)×(col₂-col₁+1)), too slow for large matrices or frequent queries.

- **Optimize using 2D Prefix Sums:**  
  Precompute cumulative sums for submatrices starting at (0,0) to (i,j).  
  sumRegion queries then become O(1):  
    sum = sum(r₂,c₂) - sum(r₁-1,c₂) - sum(r₂,c₁-1) + sum(r₁-1,c₁-1)  
  - **Problem:**  
    Updating a cell is O(mn) since every prefix sum below/right of the cell changes.

- **Efficient solution using 2D Binary Indexed Tree (Fenwick Tree):**  
  - Support O(log m × log n) updates and queries.
  - For each update or sum query, we use 2D BIT logic to propagate changes and compute cumulative sums efficiently.
  - The BIT maintains partial sums for fast calculation and updating of submatrix sums.
  - This approach balances both requirements: dynamic O(log m × log n) updates and fast range sum queries.

### Corner cases to consider  
- Empty matrix (0 rows or 0 columns)
- Matrix with only 1 row or 1 column
- Updates on a corner or edge cell
- Multiple updates on the same cell
- Querying a 1x1 region (single cell)
- Querying the entire matrix
- Very large matrix inputs

### Solution

```python
# 2D Binary Indexed Tree (Fenwick Tree) solution

class NumMatrix:

    def __init__(self, matrix):
        if not matrix or not matrix[0]:
            self.rows = 0
            self.cols = 0
            return
        self.rows = len(matrix)
        self.cols = len(matrix[0])
        # Fenwick Tree needs index +1 so it's 1-indexed internally
        self.BIT = [[0] * (self.cols + 1) for _ in range(self.rows + 1)]
        self.nums = [[0] * self.cols for _ in range(self.rows)]

        for r in range(self.rows):
            for c in range(self.cols):
                self.update(r, c, matrix[r][c])

    def update(self, row, col, val):
        if self.rows == 0 or self.cols == 0:
            return
        delta = val - self.nums[row][col]
        self.nums[row][col] = val
        i = row + 1
        while i <= self.rows:
            j = col + 1
            while j <= self.cols:
                self.BIT[i][j] += delta
                j += (j & -j)
            i += (i & -i)

    def _query(self, row, col):
        # Returns the sum from (0,0) to (row, col) inclusive
        res = 0
        i = row + 1
        while i > 0:
            j = col + 1
            while j > 0:
                res += self.BIT[i][j]
                j -= (j & -j)
            i -= (i & -i)
        return res

    def sumRegion(self, row1, col1, row2, col2):
        if self.rows == 0 or self.cols == 0:
            return 0
        # Inclusion-Exclusion Principle for rectangles
        return (
            self._query(row2, col2)
            - self._query(row1 - 1, col2)
            - self._query(row2, col1 - 1)
            + self._query(row1 - 1, col1 - 1)
        )
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `update` and `sumRegion` are both O(log m × log n) where m and n are number of rows and columns.
- **Space Complexity:**
  - O(m × n) for the two matrices (BIT, nums).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if only sumRegion (range query) but not updates are required?  
  *Hint: 2D prefix sum, O(1) queries, O(mn) preprocess, but O(mn) updates.*

- Can you extend this to higher dimensions (3D, 4D matrices)?  
  *Hint: Generalize BIT logic, but growth in update/query complexity.*

- How would you implement with a Segment Tree instead?  
  *Hint: 2D segment tree; more complicated; similar O(log m × log n) behavior.*

### Summary
This problem uses the **2D Binary Indexed Tree (Fenwick Tree) pattern** to efficiently handle dynamic matrix range queries and point updates. This pattern is fundamental for any problem needing both *range sum queries* and *online updates* on 2D arrays, and generalizes naturally to range sum queries in higher-dimensions, or for building data structures like 2D segment trees. It’s also core for problems in competitive programming and database queries involving multidimensional data.


### Flashcard
Optimize using 2D prefix sums for fast updates and queries on mutable matrices.

### Tags
Array(#array), Design(#design), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Matrix(#matrix)

### Similar Problems
- Range Sum Query 2D - Immutable(range-sum-query-2d-immutable) (Medium)
- Range Sum Query - Mutable(range-sum-query-mutable) (Medium)
- Increment Submatrices by One(increment-submatrices-by-one) (Medium)
- Sum of Matrix After Queries(sum-of-matrix-after-queries) (Medium)