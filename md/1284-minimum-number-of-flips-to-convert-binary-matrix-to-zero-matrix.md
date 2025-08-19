### Leetcode 1284 (Hard): Minimum Number of Flips to Convert Binary Matrix to Zero Matrix [Practice](https://leetcode.com/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix)

### Description  
Given a binary matrix, each time you flip a cell, you flip the cell itself and its 4 direct neighbors (up, down, left, right). Find the minimum number of flips required to turn the matrix into the zero matrix (all elements are 0), or return -1 if not possible.

### Examples  
**Example 1:**  
Input: `mat = [[0,0],[0,1]]`
Output: `3`
*Explanation: Possible flips are (1,1)->(0,1),(1,0)->(1,0),(0,1)->(0,0); all cells become zero.*

**Example 2:**  
Input: `mat = []`
Output: `0`
*Explanation: Already zero, so 0 flips needed.*

**Example 3:**  
Input: `mat = [[1,0,0],[1,0,0]]`
Output: `-1`
*Explanation: No sequence of flips can bring to zero matrix.*


### Thought Process (as if you’re the interviewee)  
Model this as a shortest path/breadth-first search (BFS) on matrix states. Each flip operation is a move; the state is the binary matrix, which can be represented as an integer bitmask for efficiency.

Start BFS from the given matrix. For each state, try flipping each cell, generate the resulting state, and enqueue if not visited. Goal: find the shortest path to all zero state (all bits 0).

There are at most 2^(m×n) possible states, so BFS is feasible for small matrices (usually ≤ 3×3 for constraints to be practical).


### Corner cases to consider  
- The input matrix is already a zero matrix.
- All ones or checkerboard patterns (parity effects).
- Non-square matrices.
- Matrix with dimensions > 3×3 will be too slow for exhaustive search.


### Solution

```python
from collections import deque

def min_flips(mat):
    m, n = len(mat), len(mat[0])
    # Convert board to integer mask
    def mat_to_mask(mat):
        mask = 0
        for i in range(m):
            for j in range(n):
                if mat[i][j]:
                    mask |= 1 << (i * n + j)
        return mask
    # Precompute flip masks for each cell
    flip_masks = []
    for i in range(m):
        for j in range(n):
            mask = 0
            for dx, dy in [(0,0), (0,1), (0,-1), (1,0), (-1,0)]:
                ni, nj = i + dx, j + dy
                if 0 <= ni < m and 0 <= nj < n:
                    mask |= 1 << (ni*n + nj)
            flip_masks.append(mask)
    start = mat_to_mask(mat)
    queue = deque([(start, 0)])
    visited = set([start])
    while queue:
        state, steps = queue.popleft()
        if state == 0:
            return steps
        for flip in flip_masks:
            next_state = state ^ flip
            if next_state not in visited:
                visited.add(next_state)
                queue.append((next_state, steps + 1))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2^{m×n}), since each state of the matrix could be visited once in the BFS. For 3×3, that's 512; practical for small matrices.
- **Space Complexity:** O(2^{m×n}) for visited set and queue.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize for larger matrices?
  *Hint: Look for problem-specific parity tricks, or model as a system of equations (Gaussian elimination over GF(2)).*
- Can the order of flips affect the result?
  *Hint: The state is what matters, not the order; use BFS for minimal steps.*
- Can you track the actual sequence of flips?
  *Hint: Store the path or parent for each state in BFS.*

### Summary
This problem is a classic example of using BFS for shortest path in a state space. The pattern appears in grid puzzles and bitmask DP. For larger matrices, alternate strategies like algebraic methods or heuristics may be necessary.

### Tags
Array(#array), Hash Table(#hash-table), Bit Manipulation(#bit-manipulation), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Minimum Operations to Remove Adjacent Ones in Matrix(minimum-operations-to-remove-adjacent-ones-in-matrix) (Hard)
- Remove All Ones With Row and Column Flips(remove-all-ones-with-row-and-column-flips) (Medium)
- Remove All Ones With Row and Column Flips II(remove-all-ones-with-row-and-column-flips-ii) (Medium)