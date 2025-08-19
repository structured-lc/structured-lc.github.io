### Leetcode 1861 (Medium): Rotating the Box [Practice](https://leetcode.com/problems/rotating-the-box)

### Description  
Given an m × n matrix called a box, each cell contains either:
- '#' (a stone),
- '*' (an obstacle), or
- '.' (an empty space).

**Gravity acts to the right:** For each row, stones '#' will fall to the right as far as they can, stopping at obstacles '*' or the edge of the box.  
After the gravity step, rotate the box 90° clockwise (so rightward becomes downward), and return the new box.

### Examples  

**Example 1:**  
Input:  
`box = [ ['#', '.', '#'] ]`  
Output:  
`[ ['.'], ['#'], ['#'] ]`  
*Explanation: Simulate gravity: both stones fall to the right edge, like ['.', '.', '#']. After rotating 90° clockwise, the 1st column becomes the 1st row: `[['.'], ['#'], ['#']]`.*

**Example 2:**  
Input:  
`box = [ ['#', '.', '.'], ['#', '*', '.'] ]`  
Output:  
`[ ['#', '#'], ['.', '*'], ['.', '.'] ]`  
*Explanation:  
Row 0: stone falls right as far as possible (to the 3rd slot).  
Row 1: obstacle at index 1 prevents stone at index 0 from moving past.  
After rotating 90°, the rightmost column is now the first row.*

**Example 3:**  
Input:  
`box = [ ['.', '#', '.'], ['*', '.', '*'] ]`  
Output:  
`[ ['*', '.'], ['.', '#'], ['*', '.'] ]`  
*Explanation: Stones are blocked by obstacles, so after gravity and rotation, the box layout corresponds to the transformed and rotated grid.*

### Thought Process (as if you’re the interviewee)  
First, I need to simulate gravity so that in each row, stones (`#`) slide as far right as possible, stopping at an obstacle (`*`) or another stone. Part 1 is updating each row.  
Next, rotate the resulting matrix 90° clockwise: the last column becomes the first row, but the new dimensions are n × m.  
Brute-force solution: For each row, scan from right to left, pushing stones right whenever possible. After all rows are processed, create a new matrix by mapping (row, col) → (col, m-1-row) for rotation.  
Optimized: Instead of shifting stones one by one, I can scan each row from right to left, filling from the rightmost available positions, skipping over obstacles.

This two-step approach (gravity, then rotation) has clear trade-offs: simulating gravity in-place per row is straightforward, and rotation is just a mapping.

### Corner cases to consider  
- Empty box or box with no stones.
- Obstacles at the edges.
- All stones stacked together.
- Multiple obstacles in a row.
- Very long rows or single row.
- One column.
- All elements are obstacles.

### Solution

```python
def rotateTheBox(box):
    m = len(box)
    n = len(box[0])
    
    # Step 1: Simulate gravity for each row
    for row in box:
        write = n - 1  # Start from the rightmost cell
        for col in reversed(range(n)):
            if row[col] == '*':
                write = col - 1  # Reset write pointer to left of obstacle
            elif row[col] == '#':
                # Move stone to the write position if needed
                row[col], row[write] = '.', '#'
                write -= 1
        # Any '.' or '*' remain as is
    
    # Step 2: Rotate the box 90 degrees clockwise
    rotated = [ [None] * m for _ in range(n) ]
    for i in range(m):
        for j in range(n):
            rotated[j][m - 1 - i] = box[i][j]
    return rotated
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Each cell is visited once for gravity simulation, and once for rotation, so total work is proportional to the box size.

- **Space Complexity:** O(m × n)  
  Output requires a new n × m matrix for the rotated box; gravity adjustment is done in-place per row.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the rotation direction was counterclockwise?
  *Hint: Think about how (row, col) coordinates would be mapped.*

- How would your solution change if gravity pulled stones in the original down (instead of right)?
  *Hint: Simulate gravity in columns instead of rows.*

- Can you simulate both gravity and rotation in a single pass for space efficiency?
  *Hint: Consider converting coordinates as you process gravity.*

### Summary
This is a classic "matrix transformation" and "gravity simulation" problem, solved with a two-stage approach: simulate gravity on each row, then rotate the matrix by remapping coordinates. It demonstrates patterns common in game simulations (like Tetris), or matrix manipulation problems—optimizing for in-place updates and efficient axis-based transformations.

### Tags
Array(#array), Two Pointers(#two-pointers), Matrix(#matrix)

### Similar Problems
