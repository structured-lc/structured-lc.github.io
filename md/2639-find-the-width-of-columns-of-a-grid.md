### Leetcode 2639 (Easy): Find the Width of Columns of a Grid [Practice](https://leetcode.com/problems/find-the-width-of-columns-of-a-grid)

### Description  
Given a grid (2D list) of integers, find the width of each column.  
The **width** of a column is the maximum number of characters needed to represent a value in that column—including the '-' sign for negative numbers. For each column, return its width as an array.  
For example, in a column with values -100, 2, and 56, the width is 4 (since '-100' has 4 characters).

### Examples  

**Example 1:**  
Input: `grid = [[1,22,333],[44,555,6],[7777,8,999]]`  
Output: `[4,3,3]`  
*Explanation:  
- Column 0: values are [1, 44, 7777] → max widths: 1, 2, 4 → max = 4  
- Column 1: [22, 555, 8] → 2, 3, 1 → max = 3  
- Column 2: [333, 6, 999] → 3, 1, 3 → max = 3*

**Example 2:**  
Input: `grid = [[-12],,[4]]`  
Output: `[3]`  
*Explanation:  
- Only one column: values are [-12, 333, 4] → widths: 3 ('-12'), 3 ('333'), 1 ('4') → max = 3*

**Example 3:**  
Input: `grid = [[-20,10],[0,-999]]`  
Output: `[3,4]`  
*Explanation:  
- Column 0: [-20, 0] → widths: 3, 1 → max = 3  
- Column 1: [10, -999] → 2, 4 → max = 4*

### Thought Process (as if you’re the interviewee)  
- First, since we must look for the longest string representation in each column, brute force is fine, since the size is manageable.
- Idea: For each column, look at all rows, convert each element to a string, and measure its length (handles both negatives and digit count).
- For every column, track the maximum length seen.
- This results in an O(m × n) approach, where m is the number of rows and n is the number of columns.
- Tried to think if any shortcuts: Can't avoid converting to string, as the '-' sign is counted.
- Chose to collect values column-wise using zip(), then map str and len. Very readable and elegant in Python.
- This approach trades negligible extra space (for the result array, and potentially temporary zipping) for code clarity.

### Corner cases to consider  
- Grid with a single row or single column.
- Grid where some numbers are negative and others positive in a column.
- Grid where numbers have equal width.
- Mixed digit counts in a column (e.g., [5, 77, 888]).
- All zeros.
- Very large (or very small/negative) integers.
- Grid with only one element.

### Solution

```python
def findColumnWidth(grid):
    # Number of rows (m) and columns (n)
    m = len(grid)
    n = len(grid[0]) if m else 0

    # List to store width for each column
    column_widths = [0] * n

    # For each column, find the maximum string length among all rows
    for j in range(n):
        max_width = 0
        for i in range(m):
            # Length of string including '-' for negatives
            width = len(str(grid[i][j]))
            if width > max_width:
                max_width = width
        column_widths[j] = max_width

    return column_widths
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n) — We loop through every cell exactly once: m rows by n columns.
- **Space Complexity:** O(n) — For the result list, where n is the number of columns. No extra large structures; string conversion is per-cell and fits in constant space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large integer values or non-integer inputs in the grid?  
  *Hint: Discuss input validation and error handling for other data types.*

- Can you format the output as a dictionary mapping column indices to widths, instead of a list?  
  *Hint: Use a dictionary comprehension or modify your aggregation step.*

- What if you had to return the widths for rows (max string length in each row) instead of columns?  
  *Hint: Consider similar logic, iterating row-wise instead of column-wise.*

### Summary
This problem leverages the **matrix traversal** pattern with a column-major order. The core operation—taking the string length of an integer—ensures that negative signs and digit counts are included properly. The approach is simple and efficient (O(m × n)), and the pattern applies to similar tasks like finding sums, max/min values, or other aggregations per column or row in 2D matrices.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
- Next Greater Numerically Balanced Number(next-greater-numerically-balanced-number) (Medium)