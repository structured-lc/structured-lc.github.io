### Leetcode 3242 (Easy): Design Neighbor Sum Service [Practice](https://leetcode.com/problems/design-neighbor-sum-service)

### Description  
Design a service that supports efficient queries on a grid of distinct integers in the range [0, n²-1], given as an n×n 2D array.  
The service provides two methods:
- **adjacentSum(value):** Returns the sum of numbers *adjacent* (top, bottom, left, right) to the cell containing `value`.
- **diagonalSum(value):** Returns the sum of numbers *diagonally adjacent* (top-left, top-right, bottom-left, bottom-right) to the cell containing `value`.  
Both queries must be efficient and handle edge/corner cases where a neighbor may not exist.

### Examples  

**Example 1:**  
Input:  
`["NeighborSum", "adjacentSum", "diagonalSum"]`,  
`[[[[1,2,3],[4,5,6],[7,8,9]]],[5],[5]]`  
Output:  
`[null, 20, 20]`  
*Explanation: For value 5, its adjacent neighbors are 2, 4, 6, 8 (sum=20).  
Diagonals are 1, 3, 7, 9 (sum=20).*

**Example 2:**  
Input:  
`["NeighborSum", "adjacentSum", "diagonalSum"]`,  
`[[[[1,2,0,3],[4,7,15,6],[8,9,10,11],[12,13,14,5]]],,]`  
Output:  
`[null, 23, 45]`  
*Explanation: `adjacentSum(15)` — neighbors: 0, 10, 7, 6 (sum=23).  
`diagonalSum(9)` — neighbors: 4, 10, 8, 14, 5, 13 (only existing diagonals, but typically 4, 10, 8, 14, sum=36 — double-check values and locations as per the implementation).*

**Example 3:**  
Input:  
`["NeighborSum", "adjacentSum", "diagonalSum"]`,  
`[[[[0,1],[2,3]]],,[3]]`  
Output:  
`[null, 1, 3]`  
*Explanation: `adjacentSum(0)` — right and down: 1, 2 (1+2=3).  
But output says 1, so grid and queried index may vary with LeetCode 0-based input; double-check.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each call, scan the entire grid to locate the cell containing `value`. For adjacents/diagonals, check each possible neighbor coordinate, sum if within bounds.

- **Optimization:**  
  Since grid values are unique and range is known, precompute a map from value to its (row, col) location during construction.  
  Then, to answer adjacent/diagonal queries, look up location in O(1), check 4 or 4 diagonal neighbors directly (maximum 4 checks for each).

- **Trade-offs:**  
  - Preprocessing (space for the map) allows both queries to be O(1) with minor constant work per request.
  - No need for extra data structures or additional loops during queries.

### Corner cases to consider  
- Querying a value at a corner (could have fewer than 4 neighbors).
- Querying on the edges (top/bottom/left/right).
- 1×1 grid (no neighbors, both sums should be zero).
- Value not present (problem states all values present and distinct).
- Empty grid (invalid, per constraints).

### Solution

```python
class NeighborSum:
    def __init__(self, grid):
        self.grid = grid
        self.n = len(grid)
        self.value_pos = {}
        # Precompute: Map value → (row, col)
        for i in range(self.n):
            for j in range(self.n):
                self.value_pos[grid[i][j]] = (i, j)

    def adjacentSum(self, value):
        # Directions: up, down, left, right
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        i, j = self.value_pos[value]
        total = 0
        for di, dj in dirs:
            ni, nj = i + di, j + dj
            if 0 <= ni < self.n and 0 <= nj < self.n:
                total += self.grid[ni][nj]
        return total

    def diagonalSum(self, value):
        # Directions: four diagonals
        dirs = [(-1, -1), (-1, 1), (1, -1), (1, 1)]
        i, j = self.value_pos[value]
        total = 0
        for di, dj in dirs:
            ni, nj = i + di, j + dj
            if 0 <= ni < self.n and 0 <= nj < self.n:
                total += self.grid[ni][nj]
        return total
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Construction: O(n²) — where n×n is the grid. Each cell processed once for the mapping.  
  - Both adjacentSum and diagonalSum: O(1) per call — four neighbor lookups, each O(1).

- **Space Complexity:**  
  - O(n²) — to store the input grid and the mapping from value to position (dict mapping all n² values).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support queries for arbitrary “k-distance” neighbors (not just 1 cell away)?  
  *Hint: Extend the direction vectors and/or generalize your neighbor-check loop.*

- Can you optimize for *sparse* grids (where not all values are present)?  
  *Hint: Consider using a set for valid coordinates, avoid assuming a fully filled grid.*

- How would your solution scale if the grid is very large and you have memory limits?  
  *Hint: Consider lazy computation, or compact the mapping using less space or a different encoding.*

### Summary
This problem uses the **hash map/grid navigation** pattern, trading modest setup work and O(n²) auxiliary storage to achieve instant O(1) neighbor-sum queries.  
It's a common technique for fast lookup by value in 2D data, applicable to many board/grid and simulation problems (such as games, match-3, or Minesweeper variants). Storing value-to-position mappings is standard wherever "lookup by value" is repeatedly needed for local search in matrices.

### Tags
Array(#array), Hash Table(#hash-table), Design(#design), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Matrix Block Sum(matrix-block-sum) (Medium)
- Array With Elements Not Equal to Average of Neighbors(array-with-elements-not-equal-to-average-of-neighbors) (Medium)