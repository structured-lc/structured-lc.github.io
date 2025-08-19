### Leetcode 3359 (Hard): Find Sorted Submatrices With Maximum Element at Most K [Practice](https://leetcode.com/problems/find-sorted-submatrices-with-maximum-element-at-most-k)

### Description  
Given a 2D matrix of integers and an integer k, find the number of **submatrices** that satisfy both of these:
- Each submatrix's **maximum element is at most k**.
- In each submatrix, every **row** is sorted in **non-increasing order** (i.e., each value in the row is ≤ its left neighbor).

In simple terms: For all possible rectangular submatrices, count those in which the highest value doesn’t exceed k and every row is sorted left-to-right in non-increasing order.

### Examples  

**Example 1:**  
Input: `matrix = [[4,3,2],[3,2,1],[5,1,1]], k = 3`  
Output: `10`  
*Explanation: The valid submatrices include all 1×1, some 1×2, and some 2×2 blocks where every row inside the block is sorted non-increasingly and max ≤ 3.*

**Example 2:**  
Input: `matrix = [[1,1],[1,1]], k = 2`  
Output: `9`  
*Explanation: All submatrices are valid because all elements are ≤ 2 and all rows are constant (so non-increasing).*

**Example 3:**  
Input: `matrix = [[5]], k = 5`  
Output: `1`  
*Explanation: Single-element submatrix, and 5 ≤ 5, so it counts as 1.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to consider every possible submatrix, check each row inside for non-increasing order, find the max in the block, and check if max ≤ k. This would be far too slow for large inputs (O(m²n² × largest-rectangle-check)), especially because there are O(m²n²) possible submatrices.

To optimize:
- **Row Preprocessing:**  
  For each cell, precompute how far to the right in the row the row stays non-increasing (i.e., for every position, what is the longest non-increasing suffix starting from this cell).  
- **Column-wise calculation:**  
  For each column pair (left, right), walk down the rows, and for each starting row, find how many continuous rows below can form a valid submatrix where:  
    - all rows between left & right are non-increasing,  
    - all elements in rectangle ≤ k.  
- **Monotonicity Optimization:**  
  By treating each column pair, we can use heights arrays, similar to the way we find largest rectangles in binary matrices, but with the twist that "width" is limited by row's non-increasing limit, and "height" is limited by max element constraint.

The final algorithm:
- For each cell, precompute for each starting point in the row how far to right it remains non-increasing.
- For each position (row, col), consider all possible rectangles ending at (row, col) by expanding upwards, restricted by the non-increasing row limit and the current column, while ensuring all inside are ≤ k.

This approach avoids recomputation and leverages DP and preprocessed constraints for early pruning.

### Corner cases to consider  
- Empty matrix (0 rows or 0 columns).
- All elements > k; answer should be 0.
- All elements ≤ k and all rows already non-increasing (rectangles = (m \* (m+1)/2) \* (n \* (n+1)/2)).
- Single row or single column.
- Rectangles of size 1×1 (always valid if the cell ≤ k).

### Solution

```python
def count_sorted_submatrices(matrix, k):
    # m = rows, n = columns
    m, n = len(matrix), len(matrix[0])
    # For every cell, precompute the number of consecutive cells to its right (including itself)
    # where the row remains non-increasing.
    right = [[0]*n for _ in range(m)]
    for i in range(m):
        right[i][n-1] = 1
        for j in range(n-2, -1, -1):
            if matrix[i][j] >= matrix[i][j+1]:
                right[i][j] = right[i][j+1] + 1
            else:
                right[i][j] = 1

    ans = 0
    # For each cell (i,j) as bottom-right corner
    for i in range(m):
        for j in range(n):
            # If cell > k, skip—it can't be part of a valid submatrix
            if matrix[i][j] > k:
                continue
            min_width = right[i][j]
            # Expand upwards
            for up in range(i, -1, -1):
                if matrix[up][j] > k:
                    break  # Can't include this row
                min_width = min(min_width, right[up][j])
                ans += min_width
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Preprocessing `right` array: O(m × n).  
  Main counting (each cell, upwards expansion): In worst case, O(m × n × m) for highly uniform matrices, but usually much better due to pruning on max value or decreasing min_width early.
  
- **Space Complexity:**  
  O(m × n) for storing the `right` array. No extra complicated storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix is huge and you need to report the count for many changing values of k in queries?  
  *Hint: Build segment trees or preprocess cell values for range queries.*

- How would you count submatrices where **columns** are also sorted non-increasingly?  
  *Hint: Need to preprocess both row and column non-increasing lengths, and adjust the counting similarly.*

- If instead of non-increasing, we require that values in each row are **strictly decreasing**, how would you change the approach?  
  *Hint: Tweak the DP relation: matrix[i][j] > matrix[i][j+1] instead of ≥.*

### Summary
This problem is an example of the **matrix prefix processing** and **DP for ranges** pattern, with similarities to rectangle counting, prefix maxima/minima, and monotonic stack approaches. The rightward non-increasing count is a prefix DP per row, which is then used with an upward expansion for rectangles. Variants of this appear in problems about histograms in binary matrices, maximal rectangles, and special submatrix counts.

### Tags
Array(#array), Stack(#stack), Matrix(#matrix), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Maximal Rectangle(maximal-rectangle) (Hard)