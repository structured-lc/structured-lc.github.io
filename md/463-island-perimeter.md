### Leetcode 463 (Easy): Island Perimeter [Practice](https://leetcode.com/problems/island-perimeter)

### Description  
You are given a row × col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water. Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells). The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. Determine the perimeter of the island.

### Examples  

**Example 1:**  
Input: `grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]`  
Output: `16`  
*Explanation: The perimeter is the 16 yellow stripes around the island cells.*

**Example 2:**  
Input: `grid = [[1]]`  
Output: `4`  
*Explanation: Single cell island has perimeter 4.*

**Example 3:**  
Input: `grid = [[1,0]]`  
Output: `4`  
*Explanation: Single cell island surrounded by water and grid boundary.*


### Thought Process (as if you're the interviewee)  
We need to calculate the perimeter of an island formed by connected land cells.

**Key Insight:**
Each land cell contributes to the perimeter based on how many of its sides are exposed (either to water or to the grid boundary).

**Approach 1 - Count Exposed Sides:**
For each land cell, check all 4 directions (up, down, left, right). If a direction leads to water or is out of bounds, that side contributes 1 to the perimeter.

**Approach 2 - Mathematical Formula:**
- Start with 4 × (number of land cells) - this assumes each cell is isolated
- Subtract 2 for each pair of adjacent land cells (since they share an edge)
- Adjacent pairs can be counted by looking at horizontal and vertical connections

**Why Approach 1 is simpler:**
It's more intuitive and easier to implement correctly in an interview setting. We iterate through each cell and directly count exposed edges.

**Implementation:**
1. Iterate through all cells in the grid
2. For each land cell (grid[i][j] == 1), check its 4 neighbors
3. Add 1 to perimeter for each neighbor that is water or out of bounds


### Corner cases to consider  
- Single cell island: Should return 4  
- Grid with only water: Should return 0 (though problem states there's exactly one island)  
- Island touching grid boundaries: Boundary edges count as perimeter  
- L-shaped or complex island shapes: Algorithm should handle any shape  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def islandPerimeter(grid):
    if not grid or not grid[0]:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    perimeter = 0
    
    # Directions for checking 4 neighbors: up, down, left, right
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    # Iterate through each cell in the grid
    for i in range(rows):
        for j in range(cols):
            # Only process land cells
            if grid[i][j] == 1:
                # Check all 4 directions for this land cell
                for di, dj in directions:
                    ni, nj = i + di, j + dj
                    
                    # If neighbor is out of bounds or is water, 
                    # this side contributes to perimeter
                    if (ni < 0 or ni >= rows or 
                        nj < 0 or nj >= cols or 
                        grid[ni][nj] == 0):
                        perimeter += 1
    
    return perimeter

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n) where m is the number of rows and n is the number of columns. We visit each cell once and for each land cell, we check its 4 neighbors in constant time.
- **Space Complexity:** O(1) - We only use a constant amount of extra space for variables and the directions array.


### Potential follow-up questions (as if you're the interviewer)  

- What if the grid could have multiple islands and you need to return the perimeter of the largest island?  
  *Hint: Use DFS/BFS to identify each connected component and calculate perimeter for each, then return the maximum*

- How would you solve this if you needed to find the perimeter of a specific island given a starting cell?  
  *Hint: Use DFS/BFS starting from the given cell to explore only that island, counting perimeter during traversal*

- What if you needed to return the perimeter of all islands combined?  
  *Hint: The current algorithm already works for this case - it counts all land cells regardless of which island they belong to*

### Summary
This problem demonstrates a straightforward grid traversal approach with neighbor checking. The key insight is that each land cell contributes to the perimeter based on how many of its sides are exposed to water or grid boundaries. This pattern of checking neighbors in a grid appears frequently in problems involving islands, connected components, and area/perimeter calculations. The solution is efficient and easy to understand, making it a good example of how to approach grid-based problems systematically.
