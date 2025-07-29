### Leetcode 54 (Medium): Spiral Matrix [Practice](https://leetcode.com/problems/spiral-matrix)

### Description  
Given an m×n matrix, return all elements of the matrix in **spiral order**.  
You start at the top-left and move right, then down the right-most column, then left along the bottom, then up the left-most column, repeating inward layer-by-layer.  
You stop when all elements have been visited.  
This pattern works for both square and rectangular matrices.

### Examples  

**Example 1:**  
Input: `matrix = [[1,2,3],[4,5,6],[7,8,9]]`  
Output: `[1,2,3,6,9,8,7,4,5]`  
*Explanation: Start at 1, move right to 2, 3; down to 6, 9; left to 8, 7; up to 4; finally, 5 in the center.*

**Example 2:**  
Input: `matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]`  
Output: `[1,2,3,4,8,12,11,10,9,5,6,7]`  
*Explanation: Move right (1→4), down (8→12), left (11→9), up (5), then traverse remaining row (6,7).*

**Example 3:**  
Input: `matrix = [[2,3,4]]`  
Output: `[2,3,4]`  
*Explanation: Only 1 row; output left to right.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to simulate the spiral traversal by keeping track of visited elements, possibly using an auxiliary boolean matrix.  
But that's unnecessary and uses extra space.  
A better approach is **four pointers**: `top`, `bottom`, `left`, `right`, representing current boundaries.

- Move **right** along top row, then increment `top`.
- Move **down** right column, then decrement `right`.
- Move **left** along bottom row (if `top ≤ bottom`), then decrement `bottom`.
- Move **up** left column (if `left ≤ right`), then increment `left`.

Continue until `top > bottom` or `left > right`.  
This avoids marking cells, naturally handles rectangles, and covers all elements exactly once.

### Corner cases to consider  
- Empty matrix (no rows or columns)
- Just one row or one column
- Only one element (1×1)
- Non-square (m ≠ n), e.g. 3×7 or 4×2
- Matrix with varied types (strings, negatives, etc.)

### Solution

```python
def spiralOrder(matrix):
    # Handle corner case: empty matrix
    if not matrix or not matrix[0]:
        return []

    res = []
    m, n = len(matrix), len(matrix[0])
    top, bottom = 0, m - 1
    left, right = 0, n - 1

    while top <= bottom and left <= right:
        # Traverse from left to right along the current top row
        for col in range(left, right + 1):
            res.append(matrix[top][col])
        top += 1

        # Traverse from top to bottom along the current right column
        for row in range(top, bottom + 1):
            res.append(matrix[row][right])
        right -= 1

        # Traverse from right to left along the current bottom row, if still within bounds
        if top <= bottom:
            for col in range(right, left - 1, -1):
                res.append(matrix[bottom][col])
            bottom -= 1

        # Traverse from bottom to top along the current left column, if still within bounds
        if left <= right:
            for row in range(bottom, top - 1, -1):
                res.append(matrix[row][left])
            left += 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n).  
  Every element is visited exactly once in the spiral order.

- **Space Complexity:** O(1) extra (excluding output).  
  No additional structures are used apart from the result list, which is required for output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the approach to spiral a matrix _in place_ (without allocating extra storage for output)?  
  *Hint: You might reverse elements or swap in a certain pattern layer by layer.*

- How would you print the spiral _in reverse order_?  
  *Hint: Collect spiral order as usual, reverse before print or traverse boundaries outward-in instead.*

- Could you extend this approach to 3D matrices ("spiral cube")?  
  *Hint: Consider face-by-face, or coordinate boundaries in three dimensions.*

### Summary
This problem is a classic **simulation** and **matrix traversal** question, solved elegantly with the four-pointer technique for layer-by-layer iteration.  
This pointer pattern can also handle problems requiring perimeter traversal or "peeling off" layers, and is commonly applied in problems involving in-place matrix modification (like rotating images, zigzag traversal, boundary layer rearrangement, etc.).