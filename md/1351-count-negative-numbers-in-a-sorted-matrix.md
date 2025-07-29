### Leetcode 1351 (Easy): Count Negative Numbers in a Sorted Matrix [Practice](https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix)

### Description  
Given a matrix `grid` where each row and column is sorted in **non-increasing** order, count the total number of **negative numbers** present. You need to do this efficiently by leveraging the sorted property.

### Examples  

**Example 1:**  
Input: `grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]`  
Output: `8`  
*Explanation: Negative numbers are highlighted as bold: [[4,3,2,**-1**],[3,2,1,**-1**],[1,1,**-1**,**-2**],[**-1,-1,-2,-3**]]. There are 8 negative numbers.*

**Example 2:**  
Input: `grid = [[3,2],[1,0]]`  
Output: `0`  
*Explanation: No negative numbers present.*

**Example 3:**  
Input: `grid = [[-1]]`  
Output: `1`  
*Explanation: Only one negative number in the matrix.*


### Thought Process (as if you’re the interviewee)  
First, a brute-force approach would involve scanning all elements and counting negatives (O(m×n)). However, since each row and column is sorted in non-increasing order, when we find a negative entry (say, in row i and column j), all values to the right (columns > j) and all values below (rows > i) in that row or column are also negative.

Optimal approach: Start from the **bottom-left** (or top-right) corner. If `grid[i][j] < 0`, all values to the right in the row are negative, so add those to the count and move up a row. If not negative, move right a column. This drastically reduces checks, making it O(m+n).

### Corner cases to consider  
- Empty matrix (should return 0)
- All negative numbers
- No negative numbers
- Rows or columns with no negatives or all negatives
- Single row or column
- Multiple rows with negatives starting at different columns


### Solution

```python
# O(m + n) solution using sorted property

def countNegatives(grid):
    if not grid or not grid[0]:
        return 0

    m, n = len(grid), len(grid[0])
    row, col = m - 1, 0 # start from bottom-left
    count = 0

    while row >= 0 and col < n:
        if grid[row][col] < 0:
            # all elements to the right are negative
            count += n - col
            row -= 1 # move up
        else:
            col += 1 # move right
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n) because in each step, we either move up one row or right one column, never revisiting any cell.
- **Space Complexity:** O(1) extra space -- only variables for indices and count are used. No extra storage.


### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the matrix was not sorted?
  *Hint: You'd have to check each entry (O(m×n)).*

- What if each column and row were sorted in increasing order?
  *Hint: How does your traversal starting position change?*

- How could you adapt this for very large matrices stored on disk?
  *Hint: Process rows sequentially, keep memory usage low.*

### Summary
Uses the two-pointer matrix traversal pattern, common with sorted 2D matrices (searching, counting, etc.). Recognizing the sorted property is key to reducing brute-force O(m×n) to O(m+n) time. This pattern applies to other problems like search in a 2D matrix, kth smallest/largest in a sorted matrix, etc.
