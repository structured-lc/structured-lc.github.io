### Leetcode 2174 (Medium): Remove All Ones With Row and Column Flips II [Practice](https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips-ii)

### Description  
You are given an m × n binary matrix (only 0s and 1s). In one operation, you can choose any cell grid[i][j] where grid[i][j] == 1, and set all elements in row i and column j to 0.  
The task is to return the minimum number of such operations needed to remove all 1s from the grid.

### Examples  

**Example 1:**  
Input: `grid = [[1,1,1],[1,1,1],[0,1,0]]`  
Output: `2`  
Explanation:  
- First operation: pick cell (1,1). Set all of row 1 and all of column 1 to 0.  
  Grid becomes:  
  ```
  [1,0,1]
  [0,0,0]
  [0,0,0]
  ```
- Second operation: pick cell (0,0). Set row 0 and column 0 to 0.  
  Final grid:  
  ```
  [0,0,1]
  [0,0,0]
  [0,0,0]
  ```
  Actually, the remaining 1 is at (0,2). So next, pick (0,2):  
  - Set row 0 and column 2 to 0, grid is all 0. But optimal path is:
  - First pick (1,1) as above.  
  - Second pick (0,0) covers [0,0] and last 1s are at [0,2], but you can't pick [0,2] since it would be 1. However, the puzzle requires 2 steps—by picking the best sets, it's possible.

**Example 2:**  
Input: `grid = [[0,1,0],[1,0,1],[0,1,0]]`  
Output: `2`  
Explanation:  
- First operation: pick (1,0). Set entire row 1 and column 0 to 0.
  Grid becomes:
  ```
  [0,1,0]
  [0,0,0]
  [0,1,0]
  ```
- Second operation: pick (2,1). Set row 2 and column 1 to 0.
  Final grid:
  ```
  [0,0,0]
  [0,0,0]
  [0,0,0]
  ```

**Example 3:**  
Input: `grid = [[0,0],[0,0]]`  
Output: `0`  
Explanation:  
The grid is already all zeros.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible sequences of chosen (i, j) positions where grid[i][j] == 1, and perform the operation, recursively until the grid is all zeros.  
  This is essentially "minimum set cover" problem, but with an operation that wipes out a row and column at once.

- **State Compression & BFS/DFS:**  
  Because m, n ≤ 15 and m × n ≤ 15, we can encode the entire grid as a bitmask of length m×n (i.e., use integers for states).  
  Then, do BFS/DFS with memoization to find the minimal number of operations to reach the all-zero state.  
  At every state, for every cell that is 1, we can apply the row+col removal, and recurse.

- **DP/memoization:**  
  For each state (bitmask of grid), memoize the minimal operations needed to clear all 1s from this state.
  Top-down DP is suitable since the total number of states (2¹⁵) is manageable.

- **Why this works:**  
  Each operation can overlap (removes all 1s in a row and column at once), so greedily removing just any 1 is not optimal; must consider different sequences.  
  State compression allows us to reduce redundant computation and use memoization to optimize.

### Corner cases to consider  
- grid is already all 0s  
- grid is size 1×1  
- grid has only one 1 left  
- grid is full of 1s  
- sparse case: only corners are 1  
- picking (i, j) does not remove any new ones

### Solution

```python
def removeOnes(grid):
    # m, n: grid size
    m = len(grid)
    n = len(grid[0])

    # Precompute cell-to-index in state bitmask
    def idx(i, j):
        return i * n + j

    # Encode the grid as a state bitmask (int)
    def encode(grid):
        state = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j]:
                    state |= 1 << idx(i, j)
        return state

    from functools import lru_cache

    @lru_cache(None)
    def dp(state):
        if state == 0:
            return 0  # base case: all zeros
        res = float('inf')
        # Try picking any cell with 1
        for i in range(m):
            for j in range(n):
                if (state >> idx(i, j)) & 1:
                    # Apply operation: zero out row i and col j
                    nstate = state
                    # zero out row i
                    for k in range(n):
                        nstate &= ~(1 << idx(i, k))
                    # zero out col j
                    for k in range(m):
                        nstate &= ~(1 << idx(k, j))
                    res = min(res, 1 + dp(nstate))
        return res

    return dp(encode(grid))
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(2^(m×n) × m × n × max(m, n))  
  There are up to 2^(m×n) possible states, for each state, try every (i, j) presence of 1 (up to m×n), and for each operation, zero out n+m - 1 bits.

- **Space Complexity:**  
  O(2^(m×n)) for memoization table (storing up to that many grid states).

### Potential follow-up questions (as if you’re the interviewer)  

- What if grid can be much larger (say, m×n > 30)?
  *Hint: Exponential state compression is not feasible. Need heuristics or approximation.*

- If we can only select unique (i, j) positions exactly once, how would you solve it?
  *Hint: It becomes a set cover / hitting set problem.*

- Can you prove that greedily picking the cell covering the most 1s isn't always optimal?
  *Hint: Counter-example with overlapping 1s.*

### Summary
This problem uses **state compression and memoization (DP)** on a bitmask to encode the state of the small grid.  
This pattern—using DFS/BFS/DP with bitmask state for all grids or graphs with small state space—appears often in problems with up to ~16 variables.  
Useful for all problems where the state space is large but compressible and the operation has complex global effects.  
Common in puzzles, grid-flipping, and multi-move game simulations.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Set Matrix Zeroes(set-matrix-zeroes) (Medium)
- Minimum Number of Flips to Convert Binary Matrix to Zero Matrix(minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix) (Hard)
- Remove All Ones With Row and Column Flips(remove-all-ones-with-row-and-column-flips) (Medium)