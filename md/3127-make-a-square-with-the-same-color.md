### Leetcode 3127 (Easy): Make a Square with the Same Color [Practice](https://leetcode.com/problems/make-a-square-with-the-same-color)

### Description  
You are given a **3 × 3** grid, where each cell is either `'B'` (black) or `'W'` (white).  
You may change **at most one cell’s color** (i.e., swap `'B'`→`'W'` or `'W'`→`'B'`).  
Your task is to determine **if it is possible** to make the grid contain any **2 × 2** square where all 4 cells inside are the same color.

### Examples  

**Example 1:**  
Input: `[['B','W','B'],['B','W','W'],['B','W','B']]`  
Output: `true`  
*Explanation: Change grid[2] from 'B'→'W', making the 2×2 block at top-right and mid-right all 'W':*
```
Before:
B W B
B W W
B W B

After changing grid[0][2]:
B W W
B W W
B W B
```
This 2×2 block
```
W W
W W
```
(all 'W') can be formed.

**Example 2:**  
Input: `[['B','W','B'],['W','B','W'],['B','W','B']]`  
Output: `false`  
*Explanation: No matter which single cell you change, you cannot create any 2×2 block with all identical colors.*

**Example 3:**  
Input: `[['B','W','B'],['B','W','W'],['B','W','W']]`  
Output: `true`  
*Explanation: The 2×2 bottom-right block is already all 'W':*
```
W W
W W
```
So no change is needed.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Since the grid is always 3×3, there are only 4 possible 2×2 squares. For each, check if it already consists of a single color.
- If not already achieved, for each cell (total 9), simulate changing its color. For each such change, check all four 2×2 blocks again to see if any block has become a uniform color.
- If at any point, a valid homogeneous 2×2 block is found, return True.
- Otherwise, after all these checks, return False.

**Why this approach:**  
- The state space is tiny (9 candidate cells × 4 squares × 2 colors), so brute-force is very fast and simple.
- No need for further optimization; the constraints make brute-force efficient and easy to code.

### Corner cases to consider  
- Grid already contains a 2×2 square with the same color.
- All cells the same color: trivially true.
- Need to change a cell that belongs to multiple 2×2 blocks.
- Changing one cell leads to multiple valid blocks (still counts as True).
- No possible change can fix any square: must return False.

### Solution

```python
def can_make_square(grid):
    # Helper to check if any 2x2 block is all same color
    def has_uniform_square(g):
        for i in range(2):      # rows: 0,1
            for j in range(2):  # cols: 0,1
                s = {g[i][j], g[i][j+1], g[i+1][j], g[i+1][j+1]}
                if len(s) == 1:
                    return True
        return False

    if has_uniform_square(grid):
        return True

    # Try changing each cell
    for i in range(3):
        for j in range(3):
            orig = grid[i][j]
            flipped = 'B' if orig == 'W' else 'W'
            grid[i][j] = flipped
            if has_uniform_square(grid):
                grid[i][j] = orig
                return True
            grid[i][j] = orig  # reset

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)
  - The grid is always 3×3 (constant size). Maximum 9 cells × 4 squares per change = 36 checks. Each check is O(1).
- **Space Complexity:** O(1)
  - Uses a constant number of variables. No extra memory except a few locals.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid size was not fixed at 3×3, but m×n?
  *Hint: How many possible 2×2 subgrids can you check for general m and n? What would be the impact on time complexity?*

- What if you could change up to k cells instead of just one?
  *Hint: Think in terms of BFS or DFS; model as state transitions with changes remaining.*

- Can you return the minimum number of changes required, if any?
  *Hint: For each 2×2 block, count mismatched cells, and find the block with minimal required changes.*

### Summary
We used **brute-force enumeration** of all possible cell changes because the grid is fixed and small.  
The key pattern is simulation and subgrid detection on small matrices, which generalizes to sliding-window/grid problems.  
Similar techniques apply whenever exhaustive simulation for small constraints is viable, such as games with grids, or tasks like Tic-Tac-Toe checking, and is also a practical pattern for interview settings with tight problem constraints.

### Tags
Array(#array), Matrix(#matrix), Enumeration(#enumeration)

### Similar Problems
