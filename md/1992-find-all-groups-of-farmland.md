### Leetcode 1992 (Medium): Find All Groups of Farmland [Practice](https://leetcode.com/problems/find-all-groups-of-farmland)

### Description  
We are given a 2D grid `land` where each cell is either `1` (farmland) or `0` (not farmland). A *group of farmland* forms a rectangle filled with 1s, and no two groups touch each other horizontally or vertically.  
Our task is to find all such groups and return a list containing the coordinates of the top-left and bottom-right corners of each group, represented as `[r1, c1, r2, c2]` for every rectangle found.  

### Examples  

**Example 1:**  
Input: `land = [[1,0,0],[0,1,1],[0,1,1]]`  
Output: `[[0,0,0,0],[1,1,2,2]]`  
*Explanation:  
- The first group is at (0,0) itself.
- The second group forms a rectangle from (1,1) to (2,2).*

**Example 2:**  
Input: `land = [[1,1],[0,0]]`  
Output: `[[0,0,0,1]]`  
*Explanation:  
- Only one rectangle from (0,0) to (0,1).*

**Example 3:**  
Input: `land = [[1,0,1],[0,0,0],[1,1,1]]`  
Output: `[[0,0,0,0],[0,2,0,2],[2,0,2,2]]`  
*Explanation:  
- First group: cell (0,0).
- Second group: cell (0,2).
- Third group: rectangle from (2,0) to (2,2).*

### Thought Process (as if you’re the interviewee)  
A brute-force way: For every cell, if it's a `1`, perform a DFS/BFS to identify the extent of its group (the bottom-right coordinate), while marking visited cells to avoid revisiting them in other groups.

However, that involves a lot of overhead with queue space and marking, though in this problem, the rectangles never touch, so each 1 only belongs to one rectangle, and each rectangle is solid.

To optimize:
- Iterate over each cell. If `land[i][j] == 1`, it's the top-left corner of some group, as earlier groups would have already visited or set prior cells to 0.
- From that cell, scan right (to find right-most column where `1` continues) and down (to find bottom-most row where `1` continues).
- After getting the rectangle's range, set all its 1s to 0 to mark the group as visited.
- Record `[i, j, bottom, right]`.

This greedy sweep approach is O(m\*n), avoids recursion stack/extra data structures, and suits this uniquely unambiguous rectangle scenario.

### Corner cases to consider  
- Empty grid, e.g. `land = []` or `land = [[]]`
- No farmland at all, e.g. all zeroes
- All grid is one big farmland rectangle
- Each cell is separate farmland
- Farmland rectangles at corners/edges only
- Farmland rectangles of size 1x1 (single points)

### Solution

```python
def findFarmland(land):
    m = len(land)
    n = len(land[0]) if m else 0
    results = []
    
    for i in range(m):
        for j in range(n):
            if land[i][j] == 1:
                # Find the bounds of this rectangle
                row = i
                col = j
                # Move down to find last row of group
                while row + 1 < m and land[row + 1][j] == 1:
                    row += 1
                # Move right to find last col of group
                temp_col = j
                while temp_col + 1 < n and land[i][temp_col + 1] == 1:
                    temp_col += 1
                # Mark all cells of this rectangle as visited (set to 0)
                for x in range(i, row + 1):
                    for y in range(j, temp_col + 1):
                        land[x][y] = 0
                results.append([i, j, row, temp_col])
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n), since every cell is visited at most once to either detect a new rectangle or be marked as part of an existing one.
- **Space Complexity:** O(1) extra, as we only use variables for bounds and the `results` array. (Input grid is modified in-place; if not allowed, would copy first, so O(m×n)).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there could be arbitrary-shaped (not rectangular) farmland groups?  
  *Hint: "Now you need a flood fill (DFS/BFS labeling) for any shape."*

- What if you cannot modify the input grid?  
  *Hint: "Use a separate visited matrix instead."*

- Can you find farmland groups efficiently if groups can border each other diagonally (allow diagonal connection)?  
  *Hint: "Extend the group expansion to consider 8-connected neighbors rather than just four."*

### Summary
This uses the "connected components" and "rectangle detection" patterns, with a greedy scan tailored to the fact that every group is a distinct, non-overlapping rectangle.  
The scan-and-mark pattern is common for grid traversal problems where groups are non-overlapping and well-structured, such as "number of islands" or "find rectangles in a binary matrix." This approach avoids recursion and extra data structures by leveraging problem constraints.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Number of Islands(number-of-islands) (Medium)
- Count Sub Islands(count-sub-islands) (Medium)