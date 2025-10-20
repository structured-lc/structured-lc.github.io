### Leetcode 1030 (Easy): Matrix Cells in Distance Order [Practice](https://leetcode.com/problems/matrix-cells-in-distance-order)

### Description  
Given a matrix with `rows` and `cols`, each cell at position (r, c) is identified by its row and column indices. A center cell (`rCenter`, `cCenter`) is given. Return all matrix cell coordinates sorted by their **Manhattan distance** from the center cell. Manhattan distance between (r₁, c₁) and (r₂, c₂) is |r₁–r₂| + |c₁–c₂|.  
The list should be sorted by increasing distance.

### Examples  

**Example 1:**  
Input: `rows=1, cols=2, rCenter=0, cCenter=0`  
Output: `[[0,0],[0,1]]`  
*Explanation: Cell [0,0] has distance 0. Cell [0,1] has distance 1. Sorted by distance.*

**Example 2:**  
Input: `rows=2, cols=2, rCenter=0, cCenter=1`  
Output: `[[0,1],[0,0],[1,1],[1,0]]`  
*Explanation:  
[0,1] is the center (distance 0).  
[0,0], [1,1] both have distance 1.  
[1,0] has distance 2.  
Order is preserved among same-distance cells.*

**Example 3:**  
Input: `rows=3, cols=3, rCenter=1, cCenter=1`  
Output: `[[1,1],[0,1],[1,0],[1,2],[2,1],[0,0],[0,2],[2,0],[2,2]]`  
*Explanation:  
[1,1] (center): distance 0  
[0,1], [1,0], [1,2], [2,1]: distance 1  
[0,0], [0,2], [2,0], [2,2]: distance 2*

### Thought Process (as if you’re the interviewee)  
First, for every cell in the matrix, I can calculate its Manhattan distance from the center and place all cells into a list.  
- Brute-force:  
  - Store coordinates of every cell and their distance to the center.  
  - Sort all cells by distance.  
  - Time is O(rows × cols × log(rows × cols)), space is O(rows × cols).

Optimize:  
Sorting is not strictly required. Since distance is always between 0 and max(|rCenter-0|+|cCenter-0|, |rCenter-(rows-1)|+|cCenter-(cols-1)|), we could use **bucket sort** (group by distance, then flat-map each group).  
- This is O(rows × cols) time and space.  
- Or, BFS (Breadth-First Search) from the center will visit cells in order of increasing distance, also yielding O(rows × cols) time and space, and may use less memory if we prune visited cells as we go.

I’d likely choose either **bucket sort** for simplicity or **BFS** if I need to generate the result in-order without sorting.

### Corner cases to consider  
- rows = 1 or cols = 1 (single row/column)
- Only one cell (1×1 matrix)
- Center at a boundary or corner
- Very large matrices

### Solution

```python
def allCellsDistOrder(rows, cols, rCenter, cCenter):
    # Bucket sort: For each cell, put it in the bucket indexed by its Manhattan distance
    from collections import defaultdict
    buckets = defaultdict(list)
    for r in range(rows):
        for c in range(cols):
            d = abs(r - rCenter) + abs(c - cCenter)
            buckets[d].append([r, c])
    # All possible distances will be in [0 ... rows+cols-2]
    result = []
    distance = 0
    while distance in buckets:
        result.extend(buckets[distance])
        distance += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(rows × cols), since each cell is visited once to build the buckets, and then all are collected once more.
- **Space Complexity:** O(rows × cols), due to the storage of all cell coordinates and grouping in buckets.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize for huge matrices where memory is constrained?  
  *Hint: Generate coordinates in order without storing all at once, possibly using BFS with a generator approach.*

- Can you write a version where the result is printed (or processed) in order, without allocating the full result list?  
  *Hint: Use BFS or a heap to emit next-closest coordinates on demand.*

- What changes if the metric is Euclidean distance instead of Manhattan distance?  
  *Hint: Distance calculation and sorting must now use square roots and sort accordingly.*

### Summary  
This problem uses a **bucket sort pattern** (grouping data by a computed property—in this case, Manhattan distance—to avoid explicit sorting). Alternatively, BFS is an example of using traversal order to impose structure. This pattern is common in grid pathfinding, spatial problems (e.g., flood fill, distance transforms), and problems requiring sorted output by a metric.


### Flashcard
For each cell, compute Manhattan distance to (rCenter, cCenter), then sort all cells by distance.

### Tags
Array(#array), Math(#math), Geometry(#geometry), Sorting(#sorting), Matrix(#matrix)

### Similar Problems
- Cells in a Range on an Excel Sheet(cells-in-a-range-on-an-excel-sheet) (Easy)