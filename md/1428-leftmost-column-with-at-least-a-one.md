### Leetcode 1428 (Medium): Leftmost Column with at Least a One [Practice](https://leetcode.com/problems/leftmost-column-with-at-least-a-one)

### Description  
You are given a **binary matrix** (values 0 and 1 only), where each **row is sorted in non-decreasing order** (all the 0s come before any 1s in a row). Your task is to find the **index of the leftmost column that contains at least one 1**. If no such column exists, return -1.

You can only access the matrix through a provided interface (`BinaryMatrix`), which limits direct access and requires you to minimize the total number of calls. 

The main challenge is to **efficiently** find the leftmost 1, given the matrix access constraints and the sorted structure of the rows.

### Examples  

**Example 1:**  
Input: A matrix  
```
[
 [0, 0, 0, 1],
 [0, 1, 1, 1],
 [0, 0, 1, 1],
 [0, 0, 0, 0]
]
```
Output: `1`  
Explanation: The leftmost column with at least one 1 is column 1 (second column), as the second row contains a 1 there.

**Example 2:**  
Input:  
```
[
 [0, 0],
 [0, 0]
]
```
Output: `-1`  
Explanation: There is no 1 present in any column, so the function returns -1.

**Example 3:**  
Input:  
```
[
 [0, 1, 1, 1],
 [0, 0, 1, 1],
 [0, 0, 0, 1]
]
```
Output: `1`  
Explanation: The first occurrence of a 1 in any column is again at index 1.

### Thought Process (as if you’re the interviewee)  
Start with the idea of brute-force: Check every element in every column for each row. But this would take O(m × n) time, which is not efficient for large matrices.

Since every row is sorted, we can do better:

- **Approach 1 (Binary Search):**  
  For each row, perform binary search to find the first 1. Track the minimum column index where 1 is found across all rows.  
  Time complexity: O(n × log m) where n = number of rows, m = number of columns.

- **Approach 2 (Optimal - Walk from Top-Right):**  
  Start at the **top-right corner** of the matrix.  
  - If the current value is 1, move **left** (there could be a 1 in an earlier column).  
  - If the current value is 0, move **down** (check next row, as all values to the left are also 0).  
  Repeat till you move out of bounds.  
  This takes O(n + m) time, much more efficient.

I would choose the second approach as it minimizes calls and leverages the row/column monotonicity.

### Corner cases to consider  
- Matrix contains only 0s (should return -1).
- Matrix contains only 1s (should return 0).
- Matrix has only one row or one column.
- There are multiple rows but only one row contains a 1.
- Large matrices (to ensure time/space is optimal).
- Matrix is empty (should handle gracefully).

### Solution

```python
# The BinaryMatrix API is provided and only supports get(row, col) and dimensions() methods.
# No direct access to the full 2D array!
# Assume BinaryMatrix.get(row, col) returns the value at (row, col)

def leftMostColumnWithOne(binaryMatrix):
    n, m = binaryMatrix.dimensions()
    row = 0
    col = m - 1
    leftmost = -1

    while row < n and col >= 0:
        if binaryMatrix.get(row, col) == 1:
            leftmost = col
            col -= 1  # Go left, as there might be an earlier 1
        else:
            row += 1  # Go down, as there isn't a 1 in this column for this row

    return leftmost
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = rows, m = columns.  
  We move at most n steps down and m steps left. Every step brings us closer to the matrix edge.
- **Space Complexity:** O(1), since we use only constant extra space for counters and state variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each column is also sorted, not just each row?  
  *Hint: Does this extra structure further optimize your approach?*

- Suppose you are only allowed a very limited number of `get` calls (e.g., less than n × log m).  
  *Hint: How does minimizing queries change your approach?*

- If the matrix is not sorted, how does your solution change?  
  *Hint: Can you still use the efficient linear or binary search?*

### Summary
This problem uses the **matrix search** pattern, taking advantage of sorted structure in a 2D array—similar to the “Search a 2D Matrix” classic problem. The optimal O(n + m) approach is sometimes called the **"Staircase Search"** and is a key pattern for interview favorites involving monotonic 2D arrays. This pattern can be applied to many other search problems in sorted matrices, especially where monotonicity allows cutting down the search space efficiently.