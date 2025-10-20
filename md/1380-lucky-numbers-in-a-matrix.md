### Leetcode 1380 (Easy): Lucky Numbers in a Matrix [Practice](https://leetcode.com/problems/lucky-numbers-in-a-matrix)

### Description  
Given a m×n matrix of distinct integers, a "lucky number" is defined as a number that is the minimum element in its row and the maximum in its column. Return all lucky numbers in any order.

### Examples  

**Example 1:**  
Input: `matrix = [[3,7,8],[9,11,13],[15,16,17]]`
Output: ``
*Explanation: 15 is the minimum in its row [15,16,17] and the maximum in its column [15,9,3].*

**Example 2:**  
Input: `matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]`
Output: ``
*Explanation: 12 is minimum in its row [15,16,17,12] and is the max in its column [2,7,12].*

**Example 3:**  
Input: `matrix = [[7,8],[1,2]]`
Output: ``
*Explanation: 7 is the min in row [7,8] and max in column [7,1].*

### Thought Process (as if you’re the interviewee)  
- For each row, find the minimum value (and its position).
- For each column, find the maximum value.
- For every row minimum, check if it matches the column's maximum.
- Input constraint: numbers are all distinct, so no duplicates to check.

### Corner cases to consider  
- Multiple lucky numbers in the matrix.
- Lucky number at matrix corners.
- No lucky number exists.
- 1×1 matrix.

### Solution

```python
def luckyNumbers (matrix):
    res = []
    # Step 1: Find min in each row (keep value and col index)
    for i in range(len(matrix)):
        row_min = min(matrix[i])
        col_idx = matrix[i].index(row_min)
        # Step 2: Check if row_min is max in its column
        col_vals = [matrix[r][col_idx] for r in range(len(matrix))]
        if row_min == max(col_vals):
            res.append(row_min)
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m×n) — Each row and col scanned once.
- **Space Complexity:** O(1) — Only result list uses extra memory.

### Potential follow-up questions (as if you’re the interviewer)  

- How to return the lucky numbers sorted?
  *Hint: Just sort the resulting list before returning.*

- What if values are not distinct?
  *Hint: Check all occurrences, but definition still applies if position matches both row min and col max.*

- Can you do it in a single matrix pass?
  *Hint: Compute all row mins and col maxes, then their intersection.*

### Summary
This involves element-wise matrix processing — a frequent coding pattern in matrix, DP, and grid traversal problems.


### Flashcard
For each row, find the min; for each column, find the max; collect numbers that are both row min and column max.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
