### Leetcode 2267 (Hard):  Check if There Is a Valid Parentheses String Path [Practice](https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path)

### Description  
You are given an m × n grid, where each cell contains either '(' or ')'.  
Your task: **Determine if there exists a path from the top-left (0,0) to the bottom-right (m-1,n-1), moving only right or down, such that the string formed by concatenating the parentheses along the path is a valid parentheses string.**

A string of parentheses is **valid** if:
- Every opening parenthesis '(' has a matching closing ')'.
- No closing parenthesis ')' appears before a matching '('.
- At the end of the string, all opened parentheses are closed.

**Formally:**  
- Only moves allowed: right or down (per step, one cell).
- Path string must form a valid parentheses sequence as defined above.

### Examples  

**Example 1:**  
Input: `grid = [["(","(","(","],["(","(","(",")"],["(",")",")",")"],["(",")",")",")"]]`  
Output: `true`  
*Explanation: One valid path is: (0,0)→(1,0)→(2,0)→(3,0)→(3,1)→(3,2)→(3,3), which forms "(((())))", a valid string.*

**Example 2:**  
Input: `grid = [["(","(","("],[")","(",")"],["(","(",")"],["(","(",")"]]`  
Output: `false`  
*Explanation: No valid path exists where the parentheses balance at every step and returns to 0 at the end.*

**Example 3:**  
Input: `grid = [["(","(","("],[")",")",")"],["(","(",")"],["(","(",")"]]`  
Output: `false`  
*Explanation: Some paths look promising but at some positions we get more ')' than '(' which is invalid.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Consider all possible paths from (0,0) to (m-1,n-1), check if each path forms a valid parentheses string.  
  This is infeasible: there are exponential number of paths (2^(m+n-2)), and validation itself can be expensive.

- **Optimized Approach:**  
  Notice that to have a valid path, at every cell on the path, the number of ')' should never exceed '(', and at the end, number of '(' should equal number of ')'.  
  We can use **DFS (Depth-First Search)** (or BFS) with a state of (row, col, balance) where 'balance' is the number of open '(' minus ')'.  
  - **If balance < 0 at any point, prune (invalid path).**
  - **If at end, balance == 0, return True (valid).**
  - Memoization is crucial: For each position and balance, if already visited, skip redundant work.
  - Since movement is restricted (right and down), and grid is not too big, this is tractable.

- **Why final approach:**  
  - DFS/BFS with memoization reduces repeated work.
  - State-space is O(m × n × (m+n)) (since balance can never be more than m+n).
  - No need to check all paths; stop as soon as a valid is found.


### Corner cases to consider  
- Grid starts with ')' (immediate invalid, as path can't begin with ')')
- Grid ends with '(' (can't finish open, needs to be balanced)
- Paths where balance becomes negative midway (more ')' than '(').
- Single-cell grid (must be "()")
- Large yet all-valid grid (performance check): e.g. grid full of '('

### Solution

```python
def hasValidPath(grid):
    # Dimensions of the grid
    m, n = len(grid), len(grid[0])

    # Memoization: (row, col, balance) -> bool
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dfs(row, col, balance):
        # Out of bounds
        if row >= m or col >= n:
            return False

        # Update balance
        if grid[row][col] == '(':
            balance += 1
        else:
            balance -= 1

        # Too many ')' - invalid at any point
        if balance < 0:
            return False

        # At end cell: must be exactly balanced
        if row == m-1 and col == n-1:
            return balance == 0

        # Try next moves: right or down
        return (dfs(row+1, col, balance) or
                dfs(row, col+1, balance))

    # Early exit: grid start or end checks
    if grid[0][0] == ')' or grid[m-1][n-1] == '(':
        return False
        
    # Initial call: at (0,0), with 0 balance
    return dfs(0, 0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × (m+n))  
  At most O(m × n × (m+n)) unique (row, col, balance) states. Each state is processed once due to memoization.  

- **Space Complexity:** O(m × n × (m+n))  
  For memoization cache + recursion stack (maximum depth O(m+n)).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize for huge grids?
  *Hint: Could you prune/short-circuit unpromising paths earlier or limit the memory footprint?*

- What if diagonal moves were allowed?
  *Hint: Adjust your transitions and state representation accordingly.*

- Could you find the total number of valid paths, not just existence?
  *Hint: Instead of returning True/False from DFS, accumulate and sum the counts where balance == 0 at the end.*

### Summary
This problem applies typical **stateful DFS/BFS with memoization**, a pattern widely used in grid-based or sequential DP problems with constraints.  
Key to efficiency: encode the correct state (row, col, balance) and aggressively prune invalid search branches.  
This approach is broadly applicable for grid path problems where mid-path validity (not just final state) must be maintained—such as string balancing, energy constraints, or specific resource tracking along the path.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Check if There is a Valid Path in a Grid(check-if-there-is-a-valid-path-in-a-grid) (Medium)
- Check if a Parentheses String Can Be Valid(check-if-a-parentheses-string-can-be-valid) (Medium)