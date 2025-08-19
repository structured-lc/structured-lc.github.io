### Leetcode 1914 (Medium): Cyclically Rotating a Grid [Practice](https://leetcode.com/problems/cyclically-rotating-a-grid)

### Description  
Given an m × n grid (both m and n are even), imagine the grid as composed of concentric rectangular "layers" like an onion. The task is: for each layer, **cyclically rotate the elements in the layer k times in the counter-clockwise direction**, and return the grid after performing these rotations on all layers.

**Key points:**
- Layers are defined as rectangular "rings" starting from the outermost (top/left sides) moving inward.
- A single cyclic rotation moves each element one place counter-clockwise in its own layer.
- For efficiency, rotations are done modulo the layer length, since after L rotations (where L = number of elements in the layer), the layer returns to its original state.

### Examples  

**Example 1:**  
Input: `grid = [[40,10],[30,20]], k = 1`  
Output: `[[10,20],[40,30]]`  
*Explanation: The outer layer [40, 10, 20, 30] after one counter-clockwise rotation becomes [10, 20, 30, 40], and mapped back to original positions gives the result.*

**Example 2:**  
Input: `grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], k = 2`  
Output: `[[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]`  
*Explanation:  
For layer 0 (outermost):  
Original = [1 2 3 4 8 12 16 15 14 13 9 5]  
After 2 rotations: [3 4 8 12 16 15 14 13 9 5 1 2]  
For layer 1 (inner 2×2):  
Original = [6 7 11 10]  
After 2 rotations: [11 10 6 7]  
Placed back as: [[3 4 8 12],[2 11 10 16],[1 7 6 15],[5 9 13 14]]*

**Example 3:**  
Input: `grid = [[10,20,30,40,50,60],[70,80,90,100,110,120],[130,140,150,160,170,180],[190,200,210,220,230,240]], k = 4`  
Output: `[[50,60,120,180,240,230],[40,100,110,170,220,220],[30,90,150,160,210,210],[20,80,140,130,200,190]]`  
*Explanation:  
Layer 0 and layer 1 are separated and rotated individually by 4 places. The results are inserted back accordingly.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** For each layer, copy elements to a list, perform k rotations by shifting each element one by one k times, and copy back. But this is slow for large k.
- **Optimization:** Instead of rotating step by step, treat each layer as a 1D list, and rotate it by k modulo L (where L = number of elements in the layer). This can be done efficiently by slicing: result = vals[k:] + vals[:k].
- **Layer extraction:** For each layer, traverse the perimeter in order (top, right, bottom, left edges), collect elements in a list for easier rotation, then put rotated values back into the grid.
- **Repeat for all layers:** Increment inward (layer 0, layer 1, …) until running out of possible layers.

This approach is efficient and avoids unnecessary work, since we process in-place and minimize extra space and time.

### Corner cases to consider  
- A 2×2 grid (the minimum even dimensions)
- k is much larger than the layer, e.g., k ≫ L
- The grid has more columns than rows or vice versa
- Layers where the perimeter is degenerate (e.g., a 2×N or M×2 shape)
- All elements are the same
- Only one layer (single ring grid)

### Solution

```python
def rotateGrid(grid, k):
    m, n = len(grid), len(grid[0])
    layers = min(m, n) // 2

    for p in range(layers):
        vals = []

        # top edge (left to right)
        for j in range(p, n - p - 1):
            vals.append(grid[p][j])
        # right edge (top to bottom)
        for i in range(p, m - p - 1):
            vals.append(grid[i][n - p - 1])
        # bottom edge (right to left)
        for j in range(n - p - 1, p, -1):
            vals.append(grid[m - p - 1][j])
        # left edge (bottom to top)
        for i in range(m - p - 1, p, -1):
            vals.append(grid[i][p])

        L = len(vals)
        rot = k % L
        rotated = vals[rot:] + vals[:rot]

        idx = 0

        # fill top edge
        for j in range(p, n - p - 1):
            grid[p][j] = rotated[idx]
            idx += 1
        # fill right edge
        for i in range(p, m - p - 1):
            grid[i][n - p - 1] = rotated[idx]
            idx += 1
        # fill bottom edge
        for j in range(n - p - 1, p, -1):
            grid[m - p - 1][j] = rotated[idx]
            idx += 1
        # fill left edge
        for i in range(m - p - 1, p, -1):
            grid[i][p] = rotated[idx]
            idx += 1

    return grid
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Each element is visited exactly twice: once during extraction and once during re-insertion, for each layer.
- **Space Complexity:** O(min(m, n))  
  For each layer, we use a temporary list of size up to the perimeter of a layer, which is at most O(m + n). No additional storage is required beyond this; the grid is modified in place.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle grids where m or n is odd?
  *Hint: What happens to the center row or column? Are they a valid layer by problem statement?*

- Can you rotate layers in the opposite (clockwise) direction with minimal code changes?
  *Hint: Adjust how you slice or use negative k.*

- How can you optimize rotations when k is much larger than the layer size?
  *Hint: Use k modulo layer length to minimize unnecessary cycles.*

### Summary
This problem utilizes the **layer-by-layer perimeter traversal** ("onion peeling") pattern, commonly seen in matrix manipulation challenges (like spiral order, matrix rotation). We treat each layer as a 1D cycle, extract, rotate, and insert, processing each layer independently. This approach efficiently solves the problem in O(m × n) time with only minimal temporary storage per layer—for each layer, rotations are handled via list slicing, which is a standard and robust coding pattern for interview questions dealing with 2D grids and cyclic shifts.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
