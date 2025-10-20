### Leetcode 2850 (Medium): Minimum Moves to Spread Stones Over Grid [Practice](https://leetcode.com/problems/minimum-moves-to-spread-stones-over-grid)

### Description  
Given a 3×3 grid where each cell contains a certain number of stones (possibly zero), you can move a stone from one cell to any other cell, one move at a time. The goal is to ensure **each cell contains exactly one stone** while minimizing the total number of moves. A "move" consists of picking any stone from a cell with at least two stones and moving it to any empty cell (cell with zero stones). Return the minimum number of moves needed.

### Examples  

**Example 1:**  
Input: `grid = [[1,1,0],[1,1,1],[1,2,1]]`  
Output: `3`  
*Explanation:  
1. Move one stone from (2,1) to (2,2).  
2. Move one stone from (2,2) to (1,2).
3. Move one stone from (1,2) to (0,2).
In total, it takes 3 moves to place one stone in each cell.*

**Example 2:**  
Input: `grid = [[1,3,0],[1,0,0],[1,0,3]]`  
Output: `4`  
*Explanation:  
1. Move one stone from (0,1) to (0,2).
2. Move one stone from (0,1) to (1,1).
3. Move one stone from (2,2) to (1,2).
4. Move one stone from (2,2) to (2,1).
In total, 4 moves are needed.*

**Example 3:**  
Input: `grid = [[1,1,1],[1,1,1],[1,1,1]]`  
Output: `0`  
*Explanation:  
Every cell already has exactly one stone, so no moves are needed.*

### Thought Process (as if you’re the interviewee)  
I would first note that the *total number of stones is always exactly 9* for the 3×3 grid, so it is always possible to achieve the goal.

- **Brute-force idea:** Try all ways of distributing stones by repeatedly moving from surplus cells to zero-cells. But with 9 positions and possibly multiple surplus/deficit combinations, this quickly becomes exponential.
- **Optimize it:**
  - *Key insight:* This is a classic assignment problem—match surplus stones to deficit cells and minimize the sum of the Manhattan distances (as moves).
  - Build two lists:
    - `zeros`: cells needing stones (where grid[i][j] == 0).
    - `extras`: for every extra stone at grid[i][j] (when grid[i][j] > 1), add that position to `extras` multiple times (once for every surplus stone).
  - Use DP with bitmasking to assign each surplus stone to a zero cell in an order that minimizes cost. Typical Hungarian Algorithm is overkill for 9 elements: with bitmask DP, number of states is manageable (9!).
  - At each state, track which stones have been used for which holes. For each possible surplus-zero assignment, calculate the minimum total moves.  
  - This approach is feasible because 9! is only 362,880, and for most grids with fewer zeros/extras, it's much smaller.

- **Why this approach?**
  - Brute-force/backtracking might TLE even for a 3×3 grid.
  - Greedy fails if you always match closest; optimal matching over all permutations is needed, hence the DP.

### Corner cases to consider  
- Grid already balanced (all 1s) ⇒ 0 moves.
- Only one zero and one cell with 2 stones ⇒ 1 move.
- All stones stacked in one cell ≫ 1, rest 0 ⇒ maximum distance sum.
- Multiple zeros, all surplus stones at maximal distance from zeros.
- Minimum/maximum possible stones in any cell (0 and up to 9 in one cell).
- Non-unique optimal assignments: several ways to achieve minimal moves.

### Solution

```python
def minimumMoves(grid):
    # Record positions needing stones and positions supplying extra stones
    zeros = []
    extras = []
    for i in range(3):
        for j in range(3):
            if grid[i][j] == 0:
                zeros.append((i, j))
            elif grid[i][j] > 1:
                for _ in range(grid[i][j] - 1):
                    extras.append((i, j))
    
    n = len(zeros)
    m = len(extras)

    # memo[mask] is the minimum moves to fill zeros[bits in mask already filled]
    memo = {}
    def dp(mask):
        if mask == (1 << n) - 1:
            return 0  # all zeros filled
        if mask in memo:
            return memo[mask]
        k = bin(mask).count('1')  # how many zeros have been filled so far
        res = float('inf')
        for i in range(n):
            if not (mask & (1 << i)):
                # Assign extras[k] to zeros[i]
                cost = abs(zeros[i][0] - extras[k][0]) + abs(zeros[i][1] - extras[k][1])
                res = min(res, cost + dp(mask | (1 << i)))
        memo[mask] = res
        return res

    if not zeros:
        return 0
    return dp(0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k!), where k = number of zeros (deficient cells), because all assignments are considered (factorial in the number of zeros/extras, at most 9).
- **Space Complexity:** O(2ᵏ), for memoization table (with k ≤ 9, manageable).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid size were larger (e.g., n×n)?  
  *Hint: Is your algorithm efficient for n > 10? Would Hungarian or another matching algorithm be better?*

- What if some cells were blocked and could not have stones moved to/from them?  
  *Hint: How would you modify the state space or DP?*

- What if the cost to move a stone between cells were not always the Manhattan distance?  
  *Hint: Can the assignment graph handle arbitrary cost? Would the approach change?*

### Summary
This problem is a classic assignment/minimum-cost matching problem, made tractable by the small 3×3 size. We use bitmask DP to optimally assign surplus stones to zero cells, minimizing total Manhattan distance moved. This general **assignment pattern** appears in many grid-matching, task-assignment, or resource-allocation problems, especially where minimal global cost must be found across permutations. For larger instances, more advanced algorithms (Hungarian method or min-cost flow) may be needed.


### Flashcard
Model as an assignment problem—match surplus stones to deficit cells and minimize total moves by summing Manhattan distances for each stone moved.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Minimum Number of Operations to Move All Balls to Each Box(minimum-number-of-operations-to-move-all-balls-to-each-box) (Medium)
- Minimum Number of Operations to Make X and Y Equal(minimum-number-of-operations-to-make-x-and-y-equal) (Medium)