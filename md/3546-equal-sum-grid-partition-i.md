### Leetcode 3546 (Medium): Equal Sum Grid Partition I [Practice](https://leetcode.com/problems/equal-sum-grid-partition-i)

### Description  
Given an m × n grid (matrix) of positive integers, determine if you can make a **single horizontal or vertical cut** (not both) so that:
- Each of the two resulting parts is non-empty.
- The sum of the numbers in the two resulting sections is equal.

Return `True` if such a cut exists; otherwise, return `False`.

### Examples  

**Example 1:**  
Input: `grid = [[1,4],[2,3]]`  
Output: `true`  
*Explanation: Cut horizontally after the first row:*
```
[1, 4]
-----
[2, 3]
```
*Both sections sum to 1+4=5 and 2+3=5.*

**Example 2:**  
Input: `grid = [[1,3],[2,4]]`  
Output: `false`  
*Explanation: No horizontal or vertical cut yields equal sums. The four possible splits all have unequal sums.*

**Example 3:**  
Input: `grid = [[2,2],[2,2]]`  
Output: `true`  
*Explanation: Any horizontal or vertical cut splits into two equal sums of 4 each.*

### Thought Process (as if you’re the interviewee)  
First, notice that only horizontal or vertical straight cuts are allowed, and each piece must be non-empty (so you can't cut at the very edge).  
The first key observation is: **If the total sum is odd, splitting it into two equal parts is impossible.**  
If it is even, we check all possible horizontal and vertical cuts to see if any partition yields two parts with equal sum (= total sum / 2).

- **Brute Force:**  
  Try each possible cut and sum both submatrices per cut. This is O(mn\*(m+n)), which is too slow for large grids.

- **Prefix Sum Optimization:**  
  Use prefix sums to efficiently compute row and column sums cumulatively.  
  Try each possible cut:
    - For each possible row cut (after row i, where 0 ≤ i < m-1), sum above and below.
    - For each column cut (after column j, where 0 ≤ j < n-1), sum left and right.
  If at any cut, the running sum equals total sum / 2, return True.

This is optimal for the grid size constraints (since m\*n ≤ 10⁵), and avoids redundant summing.

### Corner cases to consider  
- Grid with only two elements (minimum allowed grid).
- All elements are equal.
- All but one element is zero.
- Rows ≠ columns (non-square grid).
- Only one row or only one column (edge cases).
- Large grid with no valid splits.
- Total sum is odd.
- Some but not all possible cuts work.

### Solution

```python
def can_split_grid_equal_sum(grid):
    m, n = len(grid), len(grid[0])
    total = sum(sum(row) for row in grid)
    
    # If total sum is odd, immediate fail
    if total % 2 != 0:
        return False
    half = total // 2

    # Precompute row and column sums
    row_sums = [sum(row) for row in grid]
    col_sums = [sum(grid[i][j] for i in range(m)) for j in range(n)]
    
    # Check horizontal cuts (between rows)
    acc = 0
    for i in range(m - 1):
        acc += row_sums[i]
        if acc == half:
            return True

    # Check vertical cuts (between columns)
    acc = 0
    for j in range(n - 1):
        acc += col_sums[j]
        if acc == half:
            return True

    # No valid cut found
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Computing total sum, row sums, and column sums all require O(m × n). The rest is linear in m or n.
- **Space Complexity:** O(m + n)  
  Store row sums and column sums (no extra storage beyond that and input).

### Potential follow-up questions (as if you’re the interviewer)  

- If you allow both a horizontal *and* a vertical cut, how would the approach and complexity change?  
  *Hint: Consider how you would partition the entire grid into four rectangles and try to balance them.*

- How would you solve it if negative numbers are allowed in the grid?  
  *Hint: Which assumption(s) break if elements can be negative?*

- Can you count the number of valid cuts instead of a boolean?  
  *Hint: Enumerate all possible valid positions and sum how many match the condition.*

### Summary
This problem uses **prefix sum and cumulative sum patterns** for optimization, a staple in 2D array partitioning and submatrix sum problems. Recognizing the parity trick for early exit, and traversing the grid efficiently, are key. Related problems include matrix subarray sums, balanced partition, and "split array into two equal sum parts" problems.