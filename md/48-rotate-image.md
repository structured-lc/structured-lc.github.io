### Leetcode 48 (Medium): Rotate Image [Practice](https://leetcode.com/problems/rotate-image)

### Description  
Given an n × n 2D matrix representing an image, rotate the image by 90° clockwise in place.  
That means, modify the original matrix directly, without allocating another matrix. For every matrix cell, elements need to be rearranged such that the top row becomes the rightmost column, the rightmost column the bottom row, etc.

### Examples  

**Example 1:**  
Input: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`  
Output: `[[7, 4, 1], [8, 5, 2], [9, 6, 3]]`  
*Explanation: The matrix gets rotated by pulling up the columns into rows.  
Original:
```
1 2 3
4 5 6
7 8 9
```
Rotated:
```
7 4 1
8 5 2
9 6 3
``
[1]

**Example 2:**  
Input: `matrix = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]`  
Output: `[[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]`  
*Explanation:  
Original:
```
 5  1  9 11
 2  4  8 10
13  3  6  7
15 14 12 16
```
Rotated:
```
15 13  2  5
14  3  4  1
12  6  8  9
16  7 10 11
``
[1]

**Example 3:**  
Input: `matrix = [[1]]`  
Output: `[[1]]`  
*Explanation: 1×1 matrix remains unchanged after any rotation.

### Thought Process (as if you’re the interviewee)  
First, I think about what rotation by 90° means for a square matrix:
- The element at position (i, j) in the original matrix moves to (j, n-1-i) in the rotated matrix.

**Brute-force Approach**:  
I could allocate a second n×n matrix and copy each original[i][j] to result[j][n-1-i], then copy result back to the original.  
But the problem wants in-place modification, so that’s not allowed.

**Optimal Approach**:  
We need to rotate in place.
I notice that a 90° clockwise rotation can be achieved in two steps:
- **Step 1:** Reverse the matrix vertically (swap rows, e.g., first with last, second with second last, ...).
- **Step 2:** Transpose the matrix (swap matrix[i][j] with matrix[j][i] for i < j).

This sequence correctly maps every element to its new position.  
- Both steps can be done in-place, require only swapping, and no more than O(1) extra space.

Trade-offs:  
- Time complexity is O(n²).
- No extra storage is used (in-place).
- Logic is clear and easy to verify/debug.

### Corner cases to consider  
- n = 1 (1×1 matrix): should remain unchanged  
- n = 2 (smallest nontrivial case)  
- Rows with identical values  
- Negative numbers or zeros  
- Matrix with maximum/minimum allowed values  

### Solution

```python
def rotate(matrix):
    n = len(matrix)
    # Step 1: Reverse the rows (vertical flip)
    for i in range(n // 2):
        matrix[i], matrix[n-1-i] = matrix[n-1-i], matrix[i]

    # Step 2: Transpose (swap symmetric over main diagonal)
    for i in range(n):
        for j in range(i):
            # Swap matrix[i][j] with matrix[j][i]
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since both reversing rows and transposing touch each element once.
- **Space Complexity:** O(1), as all operations are in-place and do not use extra space beyond a few temporaries.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you rotate the matrix counter-clockwise instead?  
  *Hint: Try swapping the order of steps or reverse in the other direction.*

- Can you generalize this for non-square (n×m) matrices?  
  *Hint: 90° rotation for non-square results in a different shaped output, so in-place is not possible.*

- What if you wanted to rotate by 180°, or by any multiple of 90°?  
  *Hint: Apply the rotation steps multiple times, or use similar transformations.*

### Summary
This problem is a classic example of **in-place array manipulation**. Rotating a 2D matrix by 90° clockwise elegantly combines the patterns of **reversing** (flip) and **transposing** (swap version of symmetry). These techniques often show up in grid-based algorithms, image processing, and matrix puzzles.