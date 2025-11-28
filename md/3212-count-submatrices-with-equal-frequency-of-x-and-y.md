### Leetcode 3212 (Medium): Count Submatrices With Equal Frequency of X and Y [Practice](https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y)

### Description  
Given a 2D character matrix `grid` where each entry is either `'X'`, `'Y'`, or `'.'`, count the number of submatrices starting at the top-left corner (i.e., including cell (0,0)) that contain **an equal number of `'X'`s and `'Y'`s**, and **at least one `'X'`**.  
- Only submatrices with their top-left corner at (0, 0) are considered.  
- A submatrix means any rectangle from (0,0) to (i, j) for some \(i, j\).

### Examples  

**Example 1:**  
Input: `grid = [["X","Y"],["Y","X"]]`  
Output: `2`  
*Explanation: The submatrices (0,0)-(0,1) and (0,0)-(1,1) both have 1 'X' and 1 'Y', and at least one 'X'.*

**Example 2:**  
Input: `grid = [["X","X"],["X","Y"]]`  
Output: `0`  
*Explanation: No submatrix contains equal numbers of 'X' and 'Y' and at least one 'X'.*

**Example 3:**  
Input: `grid = [[".","."],[".","."]]`  
Output: `0`  
*Explanation: There are no submatrices with at least one 'X'.*

### Thought Process (as if you’re the interviewee)  
Brute force would enumerate all possible submatrices starting at (0,0) and count the number of 'X'/'Y' for each, but this is too slow for large grids.

To optimize:
- Use **2D prefix sums**:  
  - Maintain two prefix sum matrices, one for 'X' counts and one for 'Y' counts.
  - Any submatrix starting at (0,0) and ending at (i, j) has counts:  
    - Xs: prefixX[i][j], Ys: prefixY[i][j]
- For each (i, j):  
  - If prefixX[i][j] == prefixY[i][j] and prefixX[i][j] > 0, count it.
- This reduces to a double loop over all (i, j), each check in O(1).

Trade-offs:
- This O(m×n) approach is optimal given m, n up to 1000. Memory usage is linear in the area.
- It’s fast because prefix sums allow instant region queries.

### Corner cases to consider  
- All entries are '.'  
- Only one cell total  
- Grid has no 'X's  
- Grid has only one 'X' and no 'Y'  
- Number of 'X's ≠ number of 'Y's everywhere  
- Multiple valid submatrices  
- Large single-row or single-column grids

### Solution

```python
def countSubmatricesWithEqualFrequency(grid):
    # grid: List[List[str]] with only 'X', 'Y', '.'
    m, n = len(grid), len(grid[0])
    # prefixX[i][j]: number of X's in (0,0) to (i,j) inclusive
    # prefixY[i][j]: number of Y's in (0,0) to (i,j) inclusive
    prefixX = [[0] * (n + 1) for _ in range(m + 1)]
    prefixY = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Build prefix sums
    for i in range(m):
        for j in range(n):
            isX = 1 if grid[i][j] == 'X' else 0
            isY = 1 if grid[i][j] == 'Y' else 0
            prefixX[i+1][j+1] = (
                prefixX[i][j+1] + prefixX[i+1][j] - prefixX[i][j] + isX
            )
            prefixY[i+1][j+1] = (
                prefixY[i][j+1] + prefixY[i+1][j] - prefixY[i][j] + isY
            )
    
    # For all bottom-right corners (i,j), submatrix (0,0)-(i-1,j-1)
    count = 0
    for i in range(1, m+1):
        for j in range(1, n+1):
            x_freq = prefixX[i][j]
            y_freq = prefixY[i][j]
            if x_freq == y_freq and x_freq > 0:
                count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n), since we build prefix sums in O(m×n) and check all (i, j) in O(m×n).
- **Space Complexity:** O(m×n), since we store two grids of size (m+1)×(n+1) for prefix sums.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to find all such submatrices, not just those starting at (0,0)?  
  *Hint: Consider how prefix sums allow O(1) region queries, but how would you check all possible rectangles efficiently?*

- How would you modify the approach if the grid had more possible symbols?  
  *Hint: Track separate prefix sums for each symbol of interest.*

- Could you solve for three given symbols having equal counts?  
  *Hint: Now need all three counts per rectangle to be equal and ≥ 1.*

### Summary
This problem uses the **2D prefix sum** pattern to efficiently count properties of all submatrices anchored at the top-left. Prefix sums reduce region queries to O(1) and avoid redundant recalculation, a common technique for submatrix sum/frequency queries. The same method applies to problems involving region statistics for dynamic programming in 2D arrays, histogram-based rectangle counting, and many grid-based counting problems.


### Flashcard
Build 2D prefix sum arrays for 'X' and 'Y' counts; for each cell (i,j), check if prefixX[i][j] == prefixY[i][j] > 0.

### Tags
Array(#array), Matrix(#matrix), Prefix Sum(#prefix-sum)

### Similar Problems
- Maximum Equal Frequency(maximum-equal-frequency) (Hard)
- Count Submatrices With All Ones(count-submatrices-with-all-ones) (Medium)