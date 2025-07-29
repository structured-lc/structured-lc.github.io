### Leetcode 711 (Hard): Number of Distinct Islands II [Practice](https://leetcode.com/problems/number-of-distinct-islands-ii)

### Description  
Given a 2D binary grid, where `1`s represent land and `0`s represent water, find the number of **distinct islands**. An island is a group of contiguous `1`s (connected 4-directionally). Two islands are considered the same **if one can be rotated (by 90°, 180°, or 270°) or reflected (flipped horizontally/vertically) to match the other**. The challenge is to count the number of unique shapes of islands, accounting for all such symmetries—simply comparing their raw structure is not enough.

### Examples  

**Example 1:**  
Input:  
```
grid = [
  [1,1,0,0,0],
  [1,0,0,0,0],
  [0,0,0,0,1],
  [0,0,0,1,1]
]
```
Output: `1`  
*Explanation: Both clusters of 1s are "L” shaped. The second can be rotated or reflected to match the first, so they are considered the same.*

**Example 2:**  
Input:  
```
grid = [
  [1,1,1,0,0],
  [1,0,0,0,1],
  [0,1,0,0,1],
  [0,1,1,1,0]
]
```
Output: `2`  
*Explanation: There are two unique island shapes. Neither can be rotated or reflected to produce the other.*

**Example 3:**  
Input:  
```
grid = [
  [1,0],
  [0,1]
]
```
Output: `1`  
*Explanation: Both single '1's are considered the same (can be rotated or reflected onto each other).*

### Thought Process (as if you’re the interviewee)  
- **Naive brute force:** For each island, record all its cells, store their absolute coordinates, and compare every island directly. But that ignores rotation and reflections, so it won’t handle the symmetry requirement.
- **Key challenge:** For two islands, we need to check if their shapes are equivalent under any rotation or reflection. This can be done by normalizing each island’s coordinates in all 8 possible orientations (4 rotations × 2 reflections), then choosing a canonical (lexicographically smallest) form for each.
- **Approach:**  
  - Use DFS/BFS to extract all island cells as relative (x, y) coordinates.
  - For each island, generate all transformed versions (rotations and reflections).
  - Normalize each version (shift so min-x/min-y is at (0, 0)), sort, and serialize (as tuple or string) for uniqueness.
  - Store the canonical form for each island in a set and return the set's size.
- This approach avoids comparing every pair by producing a unique shape signature for each island.

### Corner cases to consider  
- Islands consisting of only a single cell.
- Islands that touch or almost touch at corners.
- Very large/complex shapes, islands at grid edges.
- Multiple islands that look the same but are positioned at different locations.
- All water grid, all land grid.
- Grids with only one island.

### Solution

```python
def numDistinctIslands2(grid):
    # Helper: Run DFS to collect all coordinates of an island
    def dfs(x, y, island):
        grid[x][y] = 0  # Mark visited
        island.append((x, y))
        for dx, dy in ((1,0),(0,1),(-1,0),(0,-1)):
            nx, ny = x + dx, y + dy
            if 0 ≤ nx < len(grid) and 0 ≤ ny < len(grid[0]) and grid[nx][ny] == 1:
                dfs(nx, ny, island)
    
    # Helper: Normalize form of an island under all rotations/reflections
    def canonical(island):
        coords = island
        shapes = []
        # All 8 transformations
        for xf, yf in ((1,1), (1,-1), (-1,1), (-1,-1)):
            trans1 = [(x*xf, y*yf) for x, y in coords]
            trans2 = [(y*xf, x*yf) for x, y in coords]
            for shape in (trans1, trans2):
                # Normalize to (0,0)
                minx = min(x for x, y in shape)
                miny = min(y for x, y in shape)
                norm = sorted((x-minx, y-miny) for x, y in shape)
                shapes.append(tuple(norm))
        return min(shapes)
    
    seen = set()
    m, n = len(grid), len(grid[0])
    
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                island = []
                dfs(i, j, island)
                # Recenter all coordinates relative to origin
                base_i, base_j = island[0]
                rel = [(x-base_i, y-base_j) for x, y in island]
                shape = canonical(rel)
                seen.add(shape)
    return len(seen)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n×k), where m and n are grid dimensions, k≈size of largest island (since for each island, we generate up to 8 transform forms, normalize, and process them).
- **Space Complexity:** O(m×n), for the recursion stack and explicit storage of all discovered islands.

### Potential follow-up questions (as if you’re the interviewer)  

- **How would you handle extremely large grids efficiently?**  
  *Hint: Can you parallelize DFS or preprocess to filter candidate regions?*

- **Can you optimize space by avoiding explicit shape storage?**  
  *Hint: Is string hashing or rolling hash possible for canonical representation?*

- **What if diagonal connections are allowed?**  
  *Hint: Modify DFS to include diagonal moves.*

### Summary
This problem uses a **shape normalization** pattern, which is common when distinct shapes/structures must be compared up to isomorphism under geometric transformations. The main pattern is: “serialize & normalize” all possible variants (rotations/reflections), and pick a canonical form to ensure mathematical uniqueness. This general pattern applies in grid-based puzzles, some subgraph isomorphism problems, and chemical/molecular structure comparison.