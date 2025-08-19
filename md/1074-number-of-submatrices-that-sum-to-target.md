### Leetcode 1074 (Hard): Number of Submatrices That Sum to Target [Practice](https://leetcode.com/problems/number-of-submatrices-that-sum-to-target)

### Description  
Given a **matrix** of integers and a **target sum**, count how many rectangular submatrices (continuous blocks of cells) in the matrix have elements that sum exactly to the target. Each submatrix is defined by a top-left and a bottom-right coordinate. Counting is based on the position of the submatrix, so two submatrices with the same values but at different positions count as distinct.

### Examples  

**Example 1:**  
Input:  
matrix =  
```
[
  [1, -1],
  [-1, 1]
]
target = 0
```
Output: `5`  
*Explanation: The five submatrices that sum to 0 are: each of the four individual cells with value 0 themselves (cells where 1 and -1 cancel each other out), and the whole matrix.*

**Example 2:**  
Input:  
matrix =  
```
[
  [0,1,0],
  [1,1,1],
  [0,1,0]
]
target = 0
```
Output: `4`  
*Explanation: Four submatrices add up to 0: the single cell at (0,0), the single cell at (0,2), and the two submatrices covering the first and last columns in row 1 and row 2.*

**Example 3:**  
Input:  
matrix =  
```
[
  [1,2,3],
  [4,5,6]
]
target = 6
```
Output: `2`  
*Explanation: The two submatrices that sum to 6 are: [1,2,3] in the top row from (0,0)-(0,2), and the single cell  at (1,2).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Try all possible submatrices. Each submatrix is identified by its top-left (r1, c1) and bottom-right (r2, c2) corners.  
  - Calculate the sum for each such submatrix and increment the answer when it matches the target.
  - Complexity: O(m²n²(m+n)), which is not feasible for large matrices.

- **Optimize with prefix sums:**  
  - Precompute prefix sums so any submatrix sum can be computed in constant time.
  - Iterate over all pairs of rows r1 and r2. For each such 'vertical slab', reduce the problem to: for each column, what's the sum of elements in that slab? This forms a 1D array for each (r1, r2) pair.
  - For each such 1D array, count the number of subarrays with sum == target, using a hash map to track running prefix sums and their frequencies.
  - This converts the 2D matrix problem to several 1D subarray sum problems, leveraging the classic “subarray sum equals k” pattern.

- **Final approach**: Use row pairs + hash map for cumulative column sums to efficiently count submatrices.  
  - Time: O(m² n), which is practical and efficient for the problem constraints.

### Corner cases to consider  
- Empty matrix or matrix with empty rows  
- Single cell equals target  
- All elements are zero  
- Large positive/negative integers  
- Matrix where every cell is the target  
- No submatrix matches the target  

### Solution

```python
def numSubmatrixSumTarget(matrix, target):
    m, n = len(matrix), len(matrix[0])
    res = 0

    # Compute prefix sums for each row
    for row in matrix:
        for col in range(1, n):
            row[col] += row[col-1]

    # Enumerate all pairs of columns
    for c1 in range(n):
        for c2 in range(c1, n):
            counter = {0: 1}  # Maps running sum → count of times seen
            curr_sum = 0
            for r in range(m):
                # Sum between c1 and c2 in current row
                row_sum = matrix[r][c2] - (matrix[r][c1-1] if c1 > 0 else 0)
                curr_sum += row_sum
                res += counter.get(curr_sum - target, 0)
                counter[curr_sum] = counter.get(curr_sum, 0) + 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² m), where n is the number of columns and m is the number of rows. This is due to enumerating all pairs of columns, and for each, scanning all rows once, with O(1) per operation.
- **Space Complexity:** O(m), for the hash map that tracks running sums for each row when counting subarrays.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you count submatrix sums for multiple targets at once?
  *Hint: Can you slightly modify the hash map approach to return multiple target counts?*
- Can this be further optimized for sparse matrices or when the target is very large?
  *Hint: Could you compress storage or pre-filter with sparse representations and skip irrelevant cells?*
- How would you modify the solution for very large matrices that don't fit in memory?
  *Hint: Streaming, block processing, or distributed computation ideas.*

### Summary
This problem combines **prefix sum**, **hash map subarray sum counting**, and reduction from 2D to 1D to efficiently compute the number of submatrices matching a target sum. The coding pattern is common in matrix subarray/submatrix problems and is widely applicable for other 2D substructure sum queries. Recognizing the row-pair approach and exploiting cumulative sum tricks are key insights for matrix scanning problems.

### Tags
Array(#array), Hash Table(#hash-table), Matrix(#matrix), Prefix Sum(#prefix-sum)

### Similar Problems
- Disconnect Path in a Binary Matrix by at Most One Flip(disconnect-path-in-a-binary-matrix-by-at-most-one-flip) (Medium)