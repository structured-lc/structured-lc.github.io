### Leetcode 885 (Medium): Spiral Matrix III [Practice](https://leetcode.com/problems/spiral-matrix-iii)

### Description  
Given a grid with `rows × cols` dimensions, and a **starting position** `(rStart, cStart)`, return the coordinates of all cells in the grid in the order they are visited by moving in a **clockwise spiral**.  
You start at `(rStart, cStart)` and follow the pattern: right → down → left → up.  
After every two turns, the step count for the direction increases by one.  
For example: move 1 right, 1 down, 2 left, 2 up, 3 right, 3 down, etc. Always check if your current cell is inside the grid bounds before adding to output.  
Continue the process until every cell has been visited.

### Examples  

**Example 1:**  
Input: `rows = 1, cols = 4, rStart = 0, cStart = 0`  
Output: `[[0,0],[0,1],[0,2],[0,3]]`  
*Explanation: Only one row, so traverse right from the starting point.*

**Example 2:**  
Input: `rows = 3, cols = 3, rStart = 1, cStart = 1`  
Output: `[[1,1],[1,2],[2,2],[2,1],[2,0],[1,0],[0,0],[0,1],[0,2]]`  
*Explanation: Start at middle, move right to (1,2), down to (2,2), left, up, and continue in spiral.*

**Example 3:**  
Input: `rows = 2, cols = 3, rStart = 0, cStart = 2`  
Output: `[[0,2],[0,1],[1,2],[1,1],[1,0],[0,0]]`  
*Explanation: Start at top-right, spiral around until all cells are visited.*

### Thought Process (as if you’re the interviewee)  
Start by simulating the spiral movement, tracking direction and step increases.  
- Use a directions list: right, down, left, up.
- Maintain how many cells to move in each direction; increase after every two sides.
- At each step, check if you're inside the grid; if so, record the cell.
- Stop when all cells are visited (output length == rows × cols).

**Brute force idea:**  
Walk cell by cell in spiral order, possibly retrying all cell positions. This would repeat work and need extra checks.

**Efficient approach:**  
Use the spiral traversal properties:
- Always know your current direction and step count.
- Don’t visit a cell twice, and only count in-bounds cells.
- Track number of visited cells to know when finished.

This avoids redundant work and ensures O(rows × cols) steps without revisiting.

### Corner cases to consider  
- Single row (e.g. rows=1, cols>1)
- Single column (e.g. cols=1, rows>1)
- Starting at a corner or edge
- Grid size 1×1 or very small grid
- Spiral moves largely outside grid before returning to in-bounds (should not revisit)
- Non-square grids (rectangular, wide or tall)

### Solution

```python
def spiralMatrixIII(rows, cols, rStart, cStart):
    # Directions: right, down, left, up
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    result = [[rStart, cStart]]
    total_cells = rows * cols
    step_length = 1
    r, c = rStart, cStart
    while len(result) < total_cells:
        for direction in range(4):
            # Increase steps after every two directions
            for _ in range(step_length):
                r += directions[direction][0]
                c += directions[direction][1]
                if 0 <= r < rows and 0 <= c < cols:
                    result.append([r, c])
            # After right and left (direction 1 and 3), increment step_length
            if direction % 2 == 1:
                step_length += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(rows × cols)  
  Each position is considered at most once; in total you output every cell in the grid.
- **Space Complexity:** O(rows × cols)  
  Output list holds each cell once; minor constant extra space for pointers/indices.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this algorithm if the matrix is extremely sparse and you cannot store all coordinates in memory?
  *Hint: Consider yielding/generating values on-the-fly instead of storing all.*

- Can you output only the order in which a specific set of coordinates is visited?
  *Hint: Add a filter; skip storage for others.*

- How would you implement this for an infinite grid or a grid with obstacles?
  *Hint: For infinite, keep traversing; for obstacles, mark visited or skip them, avoid cycles.*

### Summary
This is a simulation problem using **spiral traversal** over a grid.  
The approach generalizes to any spiral-walk/search pattern, and the key insight is adjusting step lengths as you change directions.  
This pattern is widely used in **matrix traversal, array rotation**, and some geometric search applications.


### Flashcard
Simulate spiral movement with direction and step counters; record cells within grid bounds until all are visited.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Spiral Matrix(spiral-matrix) (Medium)
- Spiral Matrix II(spiral-matrix-ii) (Medium)
- Spiral Matrix IV(spiral-matrix-iv) (Medium)