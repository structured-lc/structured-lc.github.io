### Leetcode 2371 (Hard): Minimize Maximum Value in a Grid [Practice](https://leetcode.com/problems/minimize-maximum-value-in-a-grid)

### Description  
Given an m × n grid of distinct positive integers, **assign a new positive integer to each cell** so that:
- For any two cells in the same row or column, if one cell had a greater value than the other **originally**, it must remain greater after the change.
- Our goal: **Minimize the largest value in the entire grid** after the changes.

In other words, we want to relabel the matrix with positive integers while preserving the original orderings row-wise and column-wise, but making the maximum as small as possible.

### Examples  

**Example 1:**  
Input:  
```
grid = [
  [2,4],
  [1,3]
]
```  
Output:  
```
[
  [2,4],
  [1,3]
]
```  
*Explanation: The grid already has the minimum maximum value (4) and respects all row/column order constraints.*

---

**Example 2:**  
Input:  
```
grid = [
  [10, 20],
  [30, 40]
]
```  
Output:  
```
[
  [1,2],
  [2,3]
]
```  
*Explanation: Relabel values so the order in each row and column is preserved, while making the largest value (which is 3) minimal.*

---

**Example 3:**  
Input:  
```
grid = [
  [30,12,45],
  [21,33,18]
]
```  
Output:  
```
[
  [3,1,4],
  [2,4,2]
]
```  
*Explanation: By carefully assigning increasing values while respecting orderings, maximum value can be minimized to 4.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try all possible assignments of numbers that preserve order in rows and columns, track the maximum; but clearly, this is infeasible as the number of possible assignments grows factorially.

- **Observation:**  
  Since the original matrix has unique values, the relative orderings are strict. This is like resolving all row and column precedence constraints.

- **Key insight:**  
  If we process the numbers in increasing order, always placing the smallest valid number that maintains order, we guarantee that:  
  - No number is unnecessarily high,  
  - Row/col ordering is always respected.

- **Optimized Approach:**  
  - Sort all grid cells in increasing original value.  
  - For each cell as we process:
    - Assign it the max of (row_max[i], col_max[j]), plus 1.
    - Update row_max and col_max trackers for its row & column.
  - This is a greedy assignment: always take the maximum prior assignment in the same row/col, so every new element is minimally increased but never violates the order.

- **Trade-off:**  
  - Time complexity is dominated by the sorting of all positions (m×n ‧ log(m×n)).
  - Always correct since greedy assignment after sorting strictly maintains relative order.

### Corner cases to consider  
- One element grid (1×1 case).
- All elements in a row/column are strictly increasing or decreasing.
- Non-square matrices (m ≠ n).
- Very large or very small values in the grid (does not affect logic, but check for overflow if in other languages).
- Ascending, descending, or random arrangements.

### Solution

```python
def minimizeMaxValueGrid(grid):
    m, n = len(grid), len(grid[0])
    # Collect all positions
    idxs = []
    for i in range(m):
        for j in range(n):
            idxs.append((grid[i][j], i, j))
    # Sort all positions by their original value (ascending)
    idxs.sort()

    # Initialize row and column trackers: row_max[i], col_max[j] - last assigned value for each
    row_max = [0] * m
    col_max = [0] * n
    # Prepare output grid
    result = [[0]*n for _ in range(m)]

    for val, i, j in idxs:
        # Assign cell: must be higher than any previous assignment in its row or col
        new_val = max(row_max[i], col_max[j]) + 1
        result[i][j] = new_val
        # Update the last max for its row/col
        row_max[i] = new_val
        col_max[j] = new_val

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m×n × log(m×n)) for sorting all grid entries; assignment and updating is O(m×n).

- **Space Complexity:**  
  O(m×n) for output grid and list of positions; O(m + n) additional for row/col tracking.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the original grid contained duplicate values?  
  *Hint: Would need to ensure strict (or non-strict) ordering, likely via topological sorting or union.*

- Can you retrieve an optimal relabeling for specific cells only, not the whole grid?  
  *Hint: Process dependencies only for the queried cells.*

- What if you had to support dynamic updates to the grid between queries?  
  *Hint: Consider segment trees or advanced data structures for updates + queries.*


### Summary
This is a classic **matrix relabeling under precedence constraints** problem. It relies on greedy + sorting, with tracking arrays for row and column "frontiers." The pattern is applicable to other problems involving grid relabeling, scheduling, DP with row/col monotonicity, and other "topological order" settings.

### Tags
Array(#array), Union Find(#union-find), Graph(#graph), Topological Sort(#topological-sort), Sorting(#sorting), Matrix(#matrix)

### Similar Problems
- Candy(candy) (Hard)