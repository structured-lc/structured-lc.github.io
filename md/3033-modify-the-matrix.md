### Leetcode 3033 (Easy): Modify the Matrix [Practice](https://leetcode.com/problems/modify-the-matrix)

### Description  
Given a matrix of integers, replace every `-1` in the matrix with the **maximum value of its column**.  
Other values remain unchanged.  
Return the modified matrix.  
*You must do this in-place if asked about space.*

### Examples  

**Example 1:**  
Input:  
```
[[1, 2, -1],
 [4, -1, 6],
 [7, 8, 9]]
```
Output:  
```
[[1, 2, 9],
 [4, 8, 6],
 [7, 8, 9]]
```
*Explanation:  
- Column 0: max is 7  
- Column 1: max is 8  
- Column 2: max is 9  
Replace -1 with respective column max.*


**Example 2:**  
Input:  
```
[[-1, -1],
 [-1, -1]]
```
Output:  
```
[[-1, -1],
 [-1, -1]]
```
*Explanation:  
Here, all entries are -1. Since there's no non-negative value to be the max,
the problem may specify to leave as -1 OR treat -1 as invalid and skip.
(Clarify with interviewer. Sometimes 0 is implied as default, but typical contest cases avoid this.)*

**Example 3:**  
Input:  
```
[[5, -1, 3],
 [2, 7, -1],
 [-1, 4, 8]]
```
Output:  
```
[[5, 7, 3],
 [2, 7, 8],
 [5, 4, 8]]
```
*Explanation:  
- Col 0: max is 5  
- Col 1: max is 7  
- Col 2: max is 8  
Replace -1 with the column max accordingly.*

### Thought Process (as if you’re the interviewee)  

First, for each `-1`, I need to know the **max in its column**.  
A brute-force approach would be:  
- For every `-1`, scan its column to find max (O(m) per cell), total O(m × n × m) time (slow for big inputs).

Can we optimize?  
- Compute **all column maxes first** (O(m × n)), store in a list.
- Then in a second pass, update each cell with value -1 using the precalculated column max (O(m × n)).
- Final complexity is O(m × n), which is acceptable.

Space is O(n) for n columns, or O(1) if we do in-place and reuse given matrix if allowed.

Trade-offs: Less space, code is clean, easy to reason about edge cases.

### Corner cases to consider  
- Empty matrix: [[]] or []
- All elements already >= 0 (no -1)
- All elements are -1 (ambiguous, clarify with interviewer)
- Single row or single column
- Multiple -1 values in the same column
- Mix of negative (other than -1) and positive numbers (should ignore the -1's for max calculation)
- Large integers

### Solution

```python
from typing import List

def modifiedMatrix(matrix: List[List[int]]) -> List[List[int]]:
    if not matrix or not matrix[0]:
        return matrix  # handle empty edge case

    rows = len(matrix)
    cols = len(matrix[0])

    # First, compute the max of each column
    col_max = []
    for j in range(cols):
        mx = float('-inf')
        for i in range(rows):
            if matrix[i][j] != -1:  # Only use value if not -1
                mx = max(mx, matrix[i][j])
        col_max.append(mx)

    # Second, replace -1 with corresponding column max
    for i in range(rows):
        for j in range(cols):
            if matrix[i][j] == -1:
                matrix[i][j] = col_max[j]

    return matrix
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).  
  - First loop: O(m × n) to compute column maxes.
  - Second loop: O(m × n) to update -1 values.
- **Space Complexity:** O(n).  
  - For the col_max array (n columns).
  - Output is in-place unless a new matrix is needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the maximum in a column is also -1 or the whole column is -1?
  *Hint: Should you ignore -1 values, and what default should be used if nothing else exists (e.g., 0 or leave as -1)?*

- Can you do this in-place with O(1) extra space?
  *Hint: How would you update -1s without an auxiliary array? Would you need to precompute first pass, or mark in some way?*

- What if you had to handle streams, or the matrix is too big for memory?
  *Hint: External memory/streaming approaches, chunked processing per column.*

### Summary
This problem uses a **two-pass, column-wise processing pattern**—first to gather column statistics, then to update cells conditionally.  
This is a common pattern in grid/matrix problems (precompute, then transform).  
You can apply this whenever updates rely on column-wise or row-wise aggregates, e.g., max/min/sum per row/col in matrix manipulation, spreadsheet, and table-based interview settings.