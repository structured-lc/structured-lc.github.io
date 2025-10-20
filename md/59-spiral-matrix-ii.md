### Leetcode 59 (Medium): Spiral Matrix II [Practice](https://leetcode.com/problems/spiral-matrix-ii)

### Description  
Given a positive integer **n**, create an n × n matrix filled with numbers from 1 to n² in spiral order.  
You start from the top-left corner and fill the matrix numbers in a clockwise direction: right → down → left → up, repeating this spiral until the matrix is completely filled.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `[[1,2,3],[8,9,4],[7,6,5]]`  
*Explanation: Start with 1 at the top-left, move right (1,2,3), then down the right side (4), then left across the bottom (5,6,7), finally up the left edge (8), and the inner center is 9.*

**Example 2:**  
Input: `n = 1`  
Output: `[[1]]`  
*Explanation: Only one cell, so just fill it with 1.*

**Example 3:**  
Input: `n = 4`  
Output: `[[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]`  
*Explanation: Top row fills 1-4, right column fills downwards (5-6), bottom row fills right-to-left (7-10), left column fills upwards (11-12), then an inner spiral fills the rest.*

### Thought Process (as if you’re the interviewee)  
- My main goal is to fill out an n × n matrix in spiral order, incrementing numbers from 1 to n².
- The straightforward way is to keep **boundaries** for each side (top, bottom, left, right). I can then iterate:
  - Fill the top row (left → right).
  - Fill the right column (top → bottom).
  - Fill the bottom row (right → left).
  - Fill the left column (bottom → top).
  - After each pass, move the corresponding boundary inward by one step, and repeat.
- As soon as I’ve filled n² numbers, I stop.
- Another approach is to use a **direction vector** and change direction every time I hit an edge or a filled cell, but the boundary technique is easier to avoid off-by-one errors[1][2][4].
- Edge cases are when n = 1, or even/odd n.

### Corner cases to consider  
- n = 1 (single cell)
- n = 2 (smallest n with a spiral turn)
- Even n (inner spiral is 2×2)
- Odd n (center is a single cell)
- Confirm that all numbers from 1 to n² are present and unique
- Negative or zero n (invalid per constraints—should not be called)

### Solution

```python
def generateMatrix(n):
    # Initialize n x n matrix with zeros
    matrix = [[0] * n for _ in range(n)]
    num = 1
    left, right = 0, n - 1
    top, bottom = 0, n - 1

    while left <= right and top <= bottom:
        # left to right
        for j in range(left, right + 1):
            matrix[top][j] = num
            num += 1
        top += 1

        # top to bottom
        for i in range(top, bottom + 1):
            matrix[i][right] = num
            num += 1
        right -= 1

        # right to left
        if top <= bottom:
            for j in range(right, left - 1, -1):
                matrix[bottom][j] = num
                num += 1
            bottom -= 1

        # bottom to top
        if left <= right:
            for i in range(bottom, top - 1, -1):
                matrix[i][left] = num
                num += 1
            left += 1

    return matrix
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). We fill n × n cells in total, each cell filled once.
- **Space Complexity:** O(n²) for the resulting matrix itself. No extra space except for counters and indices.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you have to do this for a rectangular m × n matrix, not just a square?
  *Hint: How would your boundary logic change for rows vs. columns?*
  
- Can you write the solution recursively?
  *Hint: Process outer layer, then call recursively for the inner (n-2) × (n-2) submatrix.*

- Could you fill the spiraling matrix in anti-clockwise order instead?
  *Hint: Adjust the order in which you fill each edge.*

### Summary
This solution uses a **layered simulation** (four boundary pointers) to fill the matrix in a spiral pattern. This is a common coding pattern for spiral, zigzag, or layer-by-layer traversal problems in 2D arrays—also seen in “Spiral Matrix I”, matrix rotation tasks, or snake-like patterns. The method is general, robust to most edge cases, and easy to adapt for rectangular matrices.


### Flashcard
Fill an n×n matrix in spiral order by incrementing numbers and updating four boundaries after each edge is filled.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Spiral Matrix(spiral-matrix) (Medium)
- Spiral Matrix III(spiral-matrix-iii) (Medium)
- Spiral Matrix IV(spiral-matrix-iv) (Medium)