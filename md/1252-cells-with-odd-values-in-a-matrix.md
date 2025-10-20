### Leetcode 1252 (Easy): Cells with Odd Values in a Matrix [Practice](https://leetcode.com/problems/cells-with-odd-values-in-a-matrix)

### Description  
Given m rows and n columns, initialize an m×n matrix with zeros. You are given a list of indices, where each is a pair [ri, ci]. For each index, increment all the cells in row ri and column ci by 1. After performing all operations, return the number of cells with odd values.

### Examples  
**Example 1:**  
Input: `m = 2, n = 3, indices = [[0,1],[1,1]]`  
Output: `6`  
*Explanation: Initial matrix:
[[0,0,0],
 [0,0,0]]
After incrementing row 0 and col 1:
[[1,1,1],
 [0,1,0]]
After incrementing row 1 and col 1:
[[1,2,1],
 [1,2,1]]
Count of odd numbers: 6*

**Example 2:**  
Input: `m = 2, n = 2, indices = [[1,1],[0,0]]`  
Output: `0`  
*Explanation: Final matrix:
[[2,2],
 [2,2]]
All values are even.*

### Thought Process (as if you’re the interviewee)  
Brute-force solution is to build the matrix and increment as told, but this is inefficient for large m, n. Instead, track how many times each row and each column are incremented using arrays. The value at cell (i, j) is increased by row_counts[i] + col_counts[j]. The cell is odd if this sum is odd. Count such cells.

### Corner cases to consider  
- Empty indices (matrix remains all zeros)
- m or n is 1 (single row/column)
- Multiple indices updating the same row or column
- No odd cells (all even)

### Solution

```python
def oddCells(m, n, indices):
    row_counts = [0] * m
    col_counts = [0] * n
    for r, c in indices:
        row_counts[r] += 1
        col_counts[c] += 1
    result = 0
    for i in range(m):
        for j in range(n):
            if (row_counts[i] + col_counts[j]) % 2 == 1:
                result += 1
    return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m×n + k), where k is number of indices, due to checking every cell.
- **Space Complexity:** O(m + n), storing row and column counts.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you calculate the answer without checking every cell?
  *Hint: Count parity of increments in rows/columns and use math to get odd cells count directly.*

- How would your solution change if the matrix was very large?
  *Hint: You'd want an O(1) space answer, maybe compute counts as you go.*

- Can you track the number of times each cell is incremented?
  *Hint: Only if you simulate, otherwise only the parity matters for odds.*

### Summary
This is standard simulation or counting problem. The key insight is to count row/column increments, then determine odds by math, not by explicit simulation. Pattern is widely applicable for grid operations.


### Flashcard
Track row and column increment counts; a cell is odd if row_count[i] + col_count[j] is odd—count such cells for the answer.

### Tags
Array(#array), Math(#math), Simulation(#simulation)

### Similar Problems
