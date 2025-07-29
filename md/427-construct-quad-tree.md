### Leetcode 427 (Medium): Construct Quad Tree [Practice](https://leetcode.com/problems/construct-quad-tree)

### Description  
Given a 2D grid of 0s and 1s, construct a Quad Tree representation. In a Quad Tree, each node represents a region of the grid. If the region contains all the same values, it's a leaf node. Otherwise, it's divided into four quadrants (top-left, top-right, bottom-left, bottom-right) represented by four children nodes.

### Examples  

**Example 1:**  
Input: `grid = [[0,1],[1,0]]`  
Output: `QuadTree with internal node having 4 leaf children: [0],[1],[1],[0]`  
*Explanation: The 2×2 grid has mixed values, so root is internal with 4 leaf children for each cell.*

**Example 2:**  
Input: `grid = [[1,1,0,0],[1,1,0,0],[1,1,1,1],[1,1,1,1]]`  
Output: `QuadTree with mixed structure based on uniform regions`  
*Explanation: Some regions are uniform (can be represented as single leaf) while others need further subdivision.*

### Thought Process (as if you're the interviewee)  
This is a classic divide-and-conquer problem for building tree structures. The key insight is recursive subdivision of regions until each region is uniform.

My approach:
1. **Check uniformity**: For any region, check if all values are the same
2. **Base case**: If uniform, create a leaf node with that value
3. **Recursive case**: If not uniform, create internal node and recursively build 4 quadrants
4. **Coordinate mapping**: Carefully handle the coordinate transformations for each quadrant

The challenge is correctly mapping coordinates when subdividing regions.

### Corner cases to consider  
- Single cell grid (1×1)
- All cells have same value (entire grid is uniform)
- Grid with alternating pattern
- Power of 2 sized grids vs non-power of 2
- Empty grid (though problem doesn't specify this case)

### Solution

```python
class QuadTreeNode:
    def __init__(self, val=False, isLeaf=False, topLeft=None, topRight=None, bottomLeft=None, bottomRight=None):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight

def construct(grid):
    if not grid or not grid[0]:
        return None
    
    n = len(grid)
    return buildQuadTree(grid, 0, 0, n)

def buildQuadTree(grid, row, col, size):
    # Check if current region is uniform
    if isUniform(grid, row, col, size):
        # Create leaf node with the uniform value
        return QuadTreeNode(val=bool(grid[row][col]), isLeaf=True)
    
    # Region is not uniform, create internal node with 4 children
    half = size // 2
    
    # Recursively build 4 quadrants
    topLeft = buildQuadTree(grid, row, col, half)
    topRight = buildQuadTree(grid, row, col + half, half)
    bottomLeft = buildQuadTree(grid, row + half, col, half)
    bottomRight = buildQuadTree(grid, row + half, col + half, half)
    
    # Create internal node
    return QuadTreeNode(
        val=True,  # Can be any value for internal nodes
        isLeaf=False,
        topLeft=topLeft,
        topRight=topRight,
        bottomLeft=bottomLeft,
        bottomRight=bottomRight
    )

def isUniform(grid, row, col, size):
    # Check if all cells in the region have the same value
    first_val = grid[row][col]
    
    for i in range(row, row + size):
        for j in range(col, col + size):
            if grid[i][j] != first_val:
                return False
    
    return True

# Alternative optimized version with early termination
def constructOptimized(grid):
    def build(r1, c1, r2, c2):
        # Check if region is uniform
        val = grid[r1][c1]
        uniform = True
        
        for i in range(r1, r2):
            for j in range(c1, c2):
                if grid[i][j] != val:
                    uniform = False
                    break
            if not uniform:
                break
        
        if uniform:
            return QuadTreeNode(val=bool(val), isLeaf=True)
        
        # Divide into 4 quadrants
        mid_r = (r1 + r2) // 2
        mid_c = (c1 + c2) // 2
        
        return QuadTreeNode(
            val=True,
            isLeaf=False,
            topLeft=build(r1, c1, mid_r, mid_c),
            topRight=build(r1, mid_c, mid_r, c2),
            bottomLeft=build(mid_r, c1, r2, mid_c),
            bottomRight=build(mid_r, mid_c, r2, c2)
        )
    
    n = len(grid)
    return build(0, 0, n, n)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × log n) where n is the side length of the grid. In worst case, we check uniformity for each region at each level, and there are log n levels.
- **Space Complexity:** O(n²) in worst case for the tree structure when no regions are uniform, plus O(log n) for recursion stack.

### Potential follow-up questions (as if you're the interviewer)  

- How would you optimize for grids where large regions are uniform?  
  *Hint: Use prefix sums to check uniformity in O(1) time after O(n²) preprocessing.*

- Can you modify this to handle grids with more than 2 distinct values?  
  *Hint: Change the uniformity check and possibly use different tree structures (octree for 3D, k-ary trees).*

- How would you serialize and deserialize the QuadTree?  
  *Hint: Use preorder traversal with markers for leaf vs internal nodes.*

### Summary
This problem demonstrates the divide-and-conquer paradigm for building hierarchical data structures. The QuadTree efficiently represents spatial data by subdividing regions until they become uniform. This pattern is widely used in computer graphics, image compression, collision detection, and geographic information systems where spatial partitioning provides significant performance benefits.
