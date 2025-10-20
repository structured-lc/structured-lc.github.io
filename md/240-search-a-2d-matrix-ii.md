### Leetcode 240 (Medium): Search a 2D Matrix II [Practice](https://leetcode.com/problems/search-a-2d-matrix-ii)

### Description  
Given a matrix where each row is sorted in ascending order (left to right) and each column is sorted in ascending order (top to bottom), determine if a target value exists in the matrix. Return `True` if the target is present, otherwise return `False`. You may assume the matrix contains only integers.

### Examples  

**Example 1:**  
Input: `matrix = [ [1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30] ]`, `target = 5`  
Output: `True`  
*Explanation: Scan the matrix, you find 5 at row 2, column 2 (0-indexed). Target exists.*

**Example 2:**  
Input: `matrix = [ [1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30] ]`, `target = 20`  
Output: `False`  
*Explanation: 20 is not present in any cell, so return False.*

**Example 3:**  
Input: `matrix = [[-5]]`, `target = -5`  
Output: `True`  
*Explanation: Single-element matrix and the value matches the target.*

### Thought Process (as if you’re the interviewee)  
A brute-force solution would be to check every single element, resulting in O(m×n) time. But the matrix has both row-wise and column-wise sorted order.  

Key observation:  
- From any cell, moving right increases the value; moving down increases the value.  
So,  
- Starting from the top-right corner, if the value is greater than target, move left (since everything below is even bigger); if it's less than target, move down (since everything to the left is smaller).  
- This way, we either move left or down at each step, eliminating either a full row or column at each move.  
- This reduces time complexity to O(m + n), far more efficient than any row-wise or column-wise binary search.

### Corner cases to consider  
- Empty matrix `[]`
- Matrix with only one row or column
- Matrix with all elements smaller/larger than target
- Target is the smallest/largest in the matrix
- Duplicate elements might be present in the row or column

### Solution

```python
def searchMatrix(matrix, target):
    # Check for empty matrix
    if not matrix or not matrix[0]:
        return False

    rows = len(matrix)
    cols = len(matrix[0])

    # Start from top right corner
    row = 0
    col = cols - 1

    while row < rows and col >= 0:
        value = matrix[row][col]
        if value == target:
            return True
        elif value > target:
            # Eliminate current column
            col -= 1
        else:
            # Eliminate current row
            row += 1

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n), where m is number of rows and n is number of columns. In each move, we eliminate a row or column, so at most m + n steps.
- **Space Complexity:** O(1), since no extra space is used outside of a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix is very large and cannot fit entirely in memory?  
  *Hint: Can we adapt the search so that only a part of the matrix is loaded at each time?*

- Could you modify the code to return the position(s) where the target appears (if duplicates are possible)?  
  *Hint: Once found, continue searching in the same row and column.*

- How would your code change if the matrix is sorted only row-wise or only column-wise?  
  *Hint: Consider binary search per row or per column.*

### Summary
This is a classic "2D matrix search with sorted rows and columns" problem, leveraging the fact that both dimensions are sorted. The efficient O(m+n) solution relies on greedy elimination from a matrix corner (top-right or bottom-left). This diagonal reduction strategy can also be applied to problems involving row/column sorted matrices, range queries in sorted 2D data, and certain pathfinding scenarios on monotonic grids.


### Flashcard
Start from top-right; move left if current > target, move down if current < target, repeat until found or out of bounds.

### Tags
Array(#array), Binary Search(#binary-search), Divide and Conquer(#divide-and-conquer), Matrix(#matrix)

### Similar Problems
- Search a 2D Matrix(search-a-2d-matrix) (Medium)