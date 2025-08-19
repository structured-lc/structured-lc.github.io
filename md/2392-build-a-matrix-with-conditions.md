### Leetcode 2392 (Hard): Build a Matrix With Conditions [Practice](https://leetcode.com/problems/build-a-matrix-with-conditions)

### Description  
Given integers k, and two lists rowConditions and colConditions, build a k × k matrix containing each of 1…k exactly once (all other cells are 0), such that:
- For each [a, b] in rowConditions, number a appears **in a row above** b.
- For each [a, b] in colConditions, a appears **in a column to the left** of b.
Return one such matrix, or [] if it's impossible.

This is essentially topologically sorting numbers 1…k by "row-above" and "col-left" constraints, mapping positions by these orders, and populating the matrix.

### Examples  

**Example 1:**  
Input: `k=3, rowConditions=[[1,2],[2,3]], colConditions=[[2,1],[3,2]]`  
Output:  
```
[[3,0,0], 
 [0,2,0], 
 [0,0,1]]
```
*Explanation:  
- rowConditions: 1 above 2, 2 above 3 ⟹ row order is [1,2,3].
- colConditions: 2 left of 1, 3 left of 2 ⟹ col order is [3,2,1].
- Place 1 at [0,2], 2 at [1,1], 3 at [2,0].*

**Example 2:**  
Input: `k=2, rowConditions=[[1,2],[2,1]], colConditions=[]`  
Output: `[]`  
*Explanation: Contradiction: both 1 above 2 & 2 above 1 — impossible topological order.*

**Example 3:**  
Input: `k=2, rowConditions=[[1,2]], colConditions=[[2,1]]`  
Output:  
```
[[0,1], 
 [2,0]]
```
*Explanation:  
- rowConditions: 1 above 2 ⟹ row order [1,2].  
- colConditions: 2 left of 1 ⟹ col order [2,1].  
- Place: 1 at [0,1], 2 at [1,0].*

### Thought Process (as if you’re the interviewee)  

We are being asked to fill a k×k grid so that for every **rowCondition** [a, b], a is above b, and for every **colCondition** [a, b], a is left of b.

Brute-force would be to try every permutation for rows and cols, but this is O(k! ⋅ k!) and impractical for k up to 200.

This is a classic case of resolving **partial order** constraints by **topological sort**:
- For rowConditions, view each [a, b] as "a before b" in rows; same for colConditions in columns.
- If topological sorting is impossible (cycle), the answer is [].
- Otherwise, after getting both row and col orders, place each 1…k at its corresponding (row, col):
  - Row index = a’s index in row order
  - Col index = a’s index in col order

Trade-offs:
- Topological sort is O(k + |edges|), so it’s efficient.
- Only one valid row/col assignment per the sortings.
- Many orderings may work; returning any is fine.

### Corner cases to consider  
- Impossible conditions (cycles in constraints).
- Empty rowConditions/colConditions (any order allowed).
- No constraints at all.
- k = 1 (single cell).
- rowConditions or colConditions with unrelated numbers (disconnected graph).
- Multiple constraints for the same pair (redundancy).
- Constraints involving numbers not in 1…k (should not happen per problem statement).

### Solution

```python
from typing import List

def buildMatrix(k: int, rowConditions: List[List[int]], colConditions: List[List[int]]) -> List[List[int]]:
    # Helper to perform topological sort; returns list of node order or None if impossible (cycle).
    def topo_sort(conditions):
        from collections import defaultdict, deque
        adj = defaultdict(list)
        indeg = [0] * (k + 1)
        for a, b in conditions:
            adj[a].append(b)
            indeg[b] += 1
        q = deque([i for i in range(1, k + 1) if indeg[i] == 0])
        order = []
        while q:
            node = q.popleft()
            order.append(node)
            for nei in adj[node]:
                indeg[nei] -= 1
                if indeg[nei] == 0:
                    q.append(nei)
        if len(order) != k:
            return None  # cycle detected
        return order

    row_order = topo_sort(rowConditions)
    col_order = topo_sort(colConditions)
    if not row_order or not col_order:
        return []  # impossible

    # Map: number → (row position, col position)
    num_to_row = {num: i for i, num in enumerate(row_order)}
    num_to_col = {num: i for i, num in enumerate(col_order)}
    matrix = [[0] * k for _ in range(k)]
    for num in range(1, k + 1):
        r = num_to_row[num]
        c = num_to_col[num]
        matrix[r][c] = num
    return matrix
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(K + |rowConditions| + |colConditions|)  
  Each topological sort is O(k + #edges). Building the matrix is O(k).
- **Space Complexity:** O(k²)  
  For the output matrix. Additional O(k + |edges|) for constructions/maps.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are multiple possible matrices satisfying all constraints?  
  *Hint: Topological sort yields any valid order, so any such matrix is valid.*

- How would you detect and report which constraints are causing the impossible (cycle)?  
  *Hint: Track visited nodes and parent chains during DFS to report cycles.*

- If k is very large but constraints are sparse, can you do better on space?  
  *Hint: Matrix is always k×k, but you could use sparse representations in practice for storage if asked.*

### Summary
This problem is a classic instance of resolving **partial orders** with **topological sort** (Kahn’s algorithm or DFS) applied independently to row and column constraints. The code demonstrates the Topological Sorting pattern, broadly relevant to problems involving dependency ordering, scheduling, and layered graph relations. This pattern frequently appears not only in grid/matrix construction, but also in scheduling tasks or restoring sequences from pairwise order facts.

### Tags
Array(#array), Graph(#graph), Topological Sort(#topological-sort), Matrix(#matrix)

### Similar Problems
- Course Schedule(course-schedule) (Medium)
- Course Schedule II(course-schedule-ii) (Medium)
- Find Eventual Safe States(find-eventual-safe-states) (Medium)
- Loud and Rich(loud-and-rich) (Medium)