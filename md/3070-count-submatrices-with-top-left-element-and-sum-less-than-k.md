### Leetcode 3070 (Medium): Count Submatrices with Top-Left Element and Sum Less Than k [Practice](https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k)

### Description  
Given a 0-indexed integer matrix **grid** and an integer **k**, return the number of rectangular submatrices which include the **top-left element** of the grid (position (0,0)), and have a **sum of their elements less than or equal to k**.  
A submatrix must always start at the top-left and can end at any (i, j) within the boundaries of the grid.

### Examples  

**Example 1:**  
Input: `grid = [[7,6,3],[6,6,1]], k = 18`  
Output: `4`  
Explanation:  
The valid submatrices starting from (0,0) and ending at:  
- (0,0): sum = 7  
- (0,1): sum = 7+6 = 13  
- (1,0): sum = 7+6 = 13  
- (1,1): sum = 7+6+6+6 = 25 (> k, not valid)  
But (0,0), (0,1), (1,0), and (1,2): sum = 7+6+3+6+6+1 = 29 (>k)  
The valid ones are the ones with sum ≤18, which are 4 in total.

**Example 2:**  
Input: `grid = [[7,2,9],[1,5,0],[2,6,6]], k = 20`  
Output: `6`  
Explanation:  
Valid submatrices are those starting from (0,0) and ending at:  
- (0,0)  
- (0,1)  
- (0,2)  
- (1,0)  
- (1,1)  
- (2,0)  
All these have sum ≤ 20.

**Example 3:**  
Input: `grid = [[1]], k = 2`  
Output: `1`  
Explanation:  
Only one possible submatrix: (0,0).

### Thought Process (as if you’re the interviewee)  
To solve this problem:
- **Brute-force**: For every possible bottom-right corner (i,j), compute the sum of the submatrix from (0,0) to (i,j) and count if it's ≤ k. This is O(m\*n\*m\*n), which is too slow for large inputs.
- **Optimization**:  
  - Compute a **2D prefix sum matrix** so you can get the sum of any submatrix starting at (0,0) to (i,j) in O(1) time.
  - For each cell (i,j), use the prefix sum to quickly get the submatrix sum, and check if it's ≤ k.
- **Trade-offs**:  
  - This reduces the sum lookups from O(m\*n) per cell to O(1) per cell, keeping the total time at O(m\*n) for the enumeration and sum checking, and O(m\*n) for building prefix sum.

Why final approach works:
- It ensures that you do not recompute sums for overlapping rectangles.
- Prefix sum method is standard for these kinds of matrix sum queries.

### Corner cases to consider  
- Single cell / 1×1 matrix.
- All elements 0, or all exactly equal to k.
- k smaller than any grid element.
- Very large grid (near upper bound) for performance.
- k much larger than total grid sum.

### Solution

```python
def countSubmatrices(grid, k):
    m = len(grid)
    n = len(grid[0])
    # Step 1: Compute 2D prefix sum
    prefix = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m):
        for j in range(n):
            prefix[i+1][j+1] = (
                grid[i][j]
                + prefix[i][j+1]
                + prefix[i+1][j]
                - prefix[i][j]
            )

    count = 0
    # Step 2: Enumerate all bottom-right corners
    for i in range(m):
        for j in range(n):
            # sum of submatrix (0,0) to (i,j)
            total = prefix[i+1][j+1]
            if total <= k:
                count += 1

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m and n are the grid dimensions.  
  Building the prefix sum takes O(m × n).  
  Counting submatrices: O(m × n) (one check per cell).
- **Space Complexity:** O(m × n), for the prefix sum matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to count all submatrices with any given top-left value, not just (0,0)?  
  *Hint: Can you extend the prefix sum to any (i₁, j₁) → (i₂, j₂) range?*

- How would you return the coordinates of all such submatrices as well?  
  *Hint: Store valid (i, j) pairs or build a list as you count.*

- How would you handle updates (changing values in the grid) and then support repeated queries efficiently?  
  *Hint: Consider Binary Indexed Trees or Segment Trees for 2D range sum queries with updates.*

### Summary
This is a classic **prefix sum / precompute** pattern for fast range sum queries in a 2D grid. By precomputing the sums from top-left to each cell, we avoid redundant computation and can solve seemingly brute-force-slow problems efficiently. This pattern applies broadly to sum/range queries on immutable matrices, and is foundational for many matrix-related subarray problems.


### Flashcard
Build 2D prefix sum matrix for O(1) submatrix sum queries; for each (i, j), check if prefix_sum[i][j] ≤ k.

### Tags
Array(#array), Matrix(#matrix), Prefix Sum(#prefix-sum)

### Similar Problems
