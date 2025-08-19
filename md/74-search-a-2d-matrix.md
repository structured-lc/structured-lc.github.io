### Leetcode 74 (Medium): Search a 2D Matrix [Practice](https://leetcode.com/problems/search-a-2d-matrix)

### Description  
Given an **m × n** matrix where:
- Each row is sorted from left to right in non-decreasing order,
- The first integer of each row is strictly greater than the last integer of the previous row,

Write a function that takes the matrix and a target integer and determines if the target exists in the matrix. Return `True` if it does, otherwise `False`.  
Think of the matrix as a single sorted list when searching for the element.

### Examples  

**Example 1:**  
Input: `matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3`  
Output: `True`  
*Explanation: 3 is present at row 0, column 1, so return True.*

**Example 2:**  
Input: `matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13`  
Output: `False`  
*Explanation: 13 is not present in any row or column, so return False.*

**Example 3:**  
Input: `matrix = [[1]], target = 1`  
Output: `True`  
*Explanation: The single element matches the target.*

### Thought Process (as if you’re the interviewee)  
- **Brute force**: Iterate through every element. For m rows and n columns, time is O(m×n). Not efficient.
- **Observation**: Each row is sorted, and the first number of each row is greater than the last number of the previous row. Treating each row as a continuation of the previous, the entire matrix can be viewed as a sorted 1D list of size m×n.
- Can **apply binary search** as on a sorted array, by mapping a 0-based index to 2D indices:  
  - For a flat index `idx`, row = idx // n, column = idx % n.
- This reduces the time to O(log(m×n)), with O(1) extra space.
- **Tradeoffs**: We gain speed and keep implementation clean. No extra storage is needed.

### Corner cases to consider  
- Empty matrix: matrix = []
- Matrix with empty rows: matrix = [[]]
- Target less than the smallest value.
- Target greater than the largest value.
- One-row matrix.
- One-column matrix.
- Matrix with one element.
- Duplicates: (Even though, due to properties, there shouldn't be duplicates across the rows.)

### Solution

```python
def searchMatrix(matrix, target):
    # Edge case: empty matrix or empty rows
    if not matrix or not matrix[0]:
        return False

    num_rows, num_cols = len(matrix), len(matrix[0])
    left, right = 0, num_rows * num_cols - 1

    while left <= right:
        mid = (left + right) // 2
        # Map 1D mid index to 2D row and column
        row = mid // num_cols
        col = mid % num_cols
        val = matrix[row][col]

        if val == target:
            return True
        elif val < target:
            left = mid + 1
        else:
            right = mid - 1

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(m×n)) — Binary search on total number of elements.
- **Space Complexity:** O(1) — Only constant extra variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each row is sorted but the first integer of each row is **not** necessarily larger than the last integer of the previous row?  
  *Hint: Try binary search per row, or search from top-right/bottom-left corner, like in "Search a 2D Matrix II".*

- Could you modify to return the index (row, column) if the target exists?  
  *Hint: Keep track of the row = mid // n and column = mid % n when you find the target.*

- What about searching in matrices where both rows and columns are sorted independently?  
  *Hint: Use a different 2-pointer method (start from top right or bottom left), not 1D mapping.*

### Summary
This approach uses the **binary search** coding pattern, taking advantage of the matrix’s sorted "flattened" property. It’s a classic example of reducing the search space by recognizing sorted sequence patterns, and is commonly applicable in variations of matrix and grid search problems. Other matrix search questions (like "Search a 2D Matrix II") rely on similar observations about sorting within rows or columns.

### Tags
Array(#array), Binary Search(#binary-search), Matrix(#matrix)

### Similar Problems
- Search a 2D Matrix II(search-a-2d-matrix-ii) (Medium)
- Split Message Based on Limit(split-message-based-on-limit) (Hard)