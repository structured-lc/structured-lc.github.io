### Leetcode 2326 (Medium): Spiral Matrix IV [Practice](https://leetcode.com/problems/spiral-matrix-iv)

### Description  
Given a linked list and dimensions m and n, fill an m × n matrix in spiral (clockwise) order with the linked list values, starting from the top-left of the matrix. If the linked list is shorter than m × n, fill the remaining cells with -1. If the list is longer, only fill the first m × n elements.

### Examples  

**Example 1:**  
Input: `m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]`  
Output: `[[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]`  
*Explanation: Fill values in spiral order. When the linked list ends, fill the rest with -1.*

**Example 2:**  
Input: `m = 1, n = 4, head = [1,2,3,4,5]`  
Output: `[[1,2,3,4]]`  
*Explanation: Only room for first 4 elements; remaining list is ignored.*

**Example 3:**  
Input: `m = 2, n = 3, head = [4,7,8]`  
Output: `[[4,7,8],[ -1, -1, -1]]`  
*Explanation: List is shorter than the grid; fill the rest with -1.*

### Thought Process (as if you’re the interviewee)  
- Start by initializing an m × n matrix with all values set to -1, so any unused cells will default correctly.
- Use four pointers (top, bottom, left, right) to keep track of the current layer of the spiral.
- Iterate while the linked list has nodes and the bounds are valid:
    - Fill the top row from left to right.
    - Fill the right column from top+1 to bottom.
    - If needed, fill the bottom row from right-1 to left.
    - Fill the left column from bottom-1 to top+1.
    - After each complete perimeter, update the respective pointers inward.
- Stop when there are no more linked list nodes or the matrix is full.
- This approach is efficient and directly follows the spiral traversal pattern, which avoids extra data structures.

### Corner cases to consider  
- List is empty: all cells should be -1.
- List is longer than m × n: ignore extra nodes.
- List is shorter than m × n: fill empty matrix cells with -1.
- m or n equal to 1 (single row or column).
- Very small matrices (e.g., 1×1).
- Linked list contains negative values (should not impact matrix filling).

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def spiralMatrix(m, n, head):
    # Initialize result matrix with -1
    matrix = [[-1 for _ in range(n)] for _ in range(m)]

    # Spiral traversal pointers
    top, bottom = 0, m - 1
    left, right = 0, n - 1

    curr = head

    while curr:
        # Traverse from left to right on the top row
        for col in range(left, right + 1):
            if not curr: break
            matrix[top][col] = curr.val
            curr = curr.next
        top += 1

        # Traverse from top to bottom on the right column
        for row in range(top, bottom + 1):
            if not curr: break
            matrix[row][right] = curr.val
            curr = curr.next
        right -= 1

        # Traverse from right to left on the bottom row
        if top <= bottom:
            for col in range(right, left - 1, -1):
                if not curr: break
                matrix[bottom][col] = curr.val
                curr = curr.next
            bottom -= 1

        # Traverse from bottom to top on the left column
        if left <= right:
            for row in range(bottom, top - 1, -1):
                if not curr: break
                matrix[row][left] = curr.val
                curr = curr.next
            left += 1

    return matrix
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n). Each cell of the matrix is assigned at most once.
- **Space Complexity:** O(m × n) for the result matrix. No extra space beyond this and the input data.

### Potential follow-up questions (as if you’re the interviewer)  

- What would change if the matrix had to be filled in a counterclockwise spiral?
  *Hint: Change the direction ordering in each spiral rotation.*

- How would you fill the matrix in a zigzag or snake pattern instead of spiral?
  *Hint: Use row alternation (left-to-right, then right-to-left, etc).*

- Can you generalize this code to fill a 3D matrix (cube) in a spiral?
  *Hint: Carefully define and handle faces, layers, and stopping conditions for filling cubes.*

### Summary
The approach uses the **spiral matrix traversal** pattern, leveraging pointer boundaries to efficiently fill the matrix in-place from a linked list, handling edge and corner cases with clear boundary checks. This general spiral technique is common in matrix manipulation problems and is broadly useful for both interview coding and situational programming tasks that involve 2D data traversal.

### Tags
Array(#array), Linked List(#linked-list), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Spiral Matrix(spiral-matrix) (Medium)
- Spiral Matrix II(spiral-matrix-ii) (Medium)
- Spiral Matrix III(spiral-matrix-iii) (Medium)