### Leetcode 1632 (Hard): Rank Transform of a Matrix [Practice](https://leetcode.com/problems/rank-transform-of-a-matrix)

### Description  
Given a m × n matrix, you are to assign a **rank** to each cell such that:
- The rank starts from 1.
- If two elements are in the same row or column and one is strictly smaller, its rank is also strictly smaller.
- The rank should be as small as possible while satisfying the above constraints.

Return the rank matrix for the input.

### Examples  

**Example 1:**  
Input: `matrix = [[1,2],[3,4]]`  
Output: `[[1,2],[2,3]]`  
*Explanation: No two equal elements in any row or column, so ranks grow from top-left to bottom-right.*

**Example 2:**  
Input: `matrix = [[7,7],[7,7]]`  
Output: `[[1,1],[1,1]]`  
*Explanation: All elements equal, so all ranks are 1.*

**Example 3:**  
Input: `matrix = [[20,-21,14],[-19,4,19],[22,-47,24],[8,-7,-2]]`  
Output: `[[4,2,3],[1,3,4],[5,1,6],[2,1,1]]`  
*Explanation: Assign minimal ranks respecting row and column relations. Negative and positive values supported.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each element, check all in same row and column and assign ranks. But this leads to cycles and cannot guarantee minimality efficiently.
- **Optimized idea:**
  - Observe that for each value, we need to increase the rank only if there are strictly less values in the same row/col.
  - Process elements in order of increasing value. For equal elements, process them simultaneously.
  - Use Union Find to group equal elements connected by row/col. For each component, assign rank = 1 + max rank from its row or column.
  - Track the highest rank so far for each row and column, and update as you fill in the rank matrix.

### Corner cases to consider  
- Multiple occurrences of the same value in one row or col.
- Negative values, zeros, and positives.
- Single row/column.
- Matrix with all unique values.
- Matrix with all duplicate values.

### Solution

```python
class DSU:
    def __init__(self, size):
        self.parent = list(range(size))
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    def union(self, x, y):
        self.parent[self.find(x)] = self.find(y)

def matrixRankTransform(matrix):
    from collections import defaultdict
    m, n = len(matrix), len(matrix[0])
    answer = [[0]*n for _ in range(m)]
    value_cells = defaultdict(list)
    for i in range(m):
        for j in range(n):
            value_cells[matrix[i][j]].append((i,j))
    rank = [0]*(m+n)  # max rank for each row/col

    for value in sorted(value_cells):
        dsu = DSU(m + n)
        for i, j in value_cells[value]:
            dsu.union(i, j + m)
        group_max = {}
        for i, j in value_cells[value]:
            root = dsu.find(i)
            group_max[root] = max(group_max.get(root, 0), rank[i], rank[j + m])
        for i, j in value_cells[value]:
            root = dsu.find(i)
            answer[i][j] = group_max[root] + 1
        for i, j in value_cells[value]:
            rank[i] = answer[i][j]
            rank[j + m] = answer[i][j]
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((m × n) × log(m × n))  
  - Sorted traversal and efficient union-find operations keep it reasonable.
- **Space Complexity:** O(m × n) 
  - For data structures to hold mapping and DSU state.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if only rows/only columns enforce ordering?  
  *Hint: Remove the other dimension from DSU and rank maintenance.*
- Can you process updates to the matrix efficiently?  
  *Hint: Consider data structures supporting dynamic connectivity.*
- Handle matrices with 1e6 entries?  
  *Hint: Further DSU optimization and memory use.*

### Summary
A combination of **Union Find** and greedy incremental assignment allows us to compute consistent minimal ranks with respect to row/col constraints. The same pattern appears in constraint satisfaction and other problems needing structure propagation through a bipartite graph.