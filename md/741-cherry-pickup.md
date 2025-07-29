### Leetcode 741 (Hard): Cherry Pickup [Practice](https://leetcode.com/problems/cherry-pickup)

### Description  
Given an n × n grid, where each cell is:
- **0**: empty,
- **1**: contains a cherry,
- **–1**: contains a thorn (block, can't pass),

You start at the top-left corner (0,0) and must move to the bottom-right corner (n–1, n–1), only moving **right** or **down**.  
After reaching the end, you must return to the start, this time only moving **left** or **up**.  
Collect a cherry when you pass through a "1", and that cell becomes "0" (the cherry disappears). Thorns (-1) are impassable.  
Your goal is to collect the **maximum cherries** possible during your trip. If there is no valid round trip, return 0.

### Examples  

**Example 1:**  
Input:  
```
grid = [
  [0, 1, -1],
  [1, 0, -1],
  [1, 1,  1]
]
```
Output: `5`  
*Explanation: Take the path (0,0) → (0,1) → (1,1) → (2,1) → (2,2), collect cherries. On the way back: (2,2) → (1,2) → (1,1) → (0,1) → (0,0). Maximum possible cherries collected: 5.*

**Example 2:**  
Input:  
```
grid = [
  [1, 1, -1],
  [1, -1, 1],
  [-1, 1, 1]
]
```
Output: `0`  
*Explanation: There is no valid path to destination due to blocking thorns.*

**Example 3:**  
Input:  
```
grid = [
  [0,1,1,0,0],
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,1,1,1]
]
```
Output: `8`  
*Explanation: Cherries are collected efficiently during the forward and return trips.*

### Thought Process (as if you’re the interviewee)  
First idea: Try two separate passes—one out, one back. But after picking cherries on the first pass, the state of the grid changes, making a brute-force approach infeasible for large grids.

Optimal approach: View it as **two people moving from (0,0) to (n-1,n-1) at the same time**, and collect cherries along their paths. Each person at any step can either go down or right, so you model all possible movements. The trick: the first person's "return" path can be simulated as if two people are moving from (0,0) to (n-1,n-1) together, both collecting cherries, and not picking the same cherry twice at a time (if both stand on the same cell only one cherry is counted).

We can use a **3D DP**: dp[x₁][y₁][x₂], the max cherries collected when person 1 is at (x₁, y₁), and person 2 is at (x₂, y₂), with y₂ = x₁ + y₁ - x₂.  
This dynamic programming avoids recomputation and handles all valid movement choices recursively with memoization.

This approach is chosen because it covers all paths, efficiently avoids overcounting cherries, and works within time/space limits for reasonable n.

### Corner cases to consider  
- Entire path blocked by thorns (no path exists)
- All cells are cherries, or all zeros
- Grid size is 1×1 or very small
- Impossible return trip
- Both "players" land on the same cell at the same time (count cherry only once)
- Very sparse cherry placement

### Solution

```python
def cherryPickup(grid):
    n = len(grid)
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dp(x1, y1, x2):
        y2 = x1 + y1 - x2  # Because x1 + y1 = x2 + y2 = steps taken
        # Check if out of bounds or stepped on thorn
        if (x1 >= n or y1 >= n or x2 >= n or y2 >= n or
            grid[x1][y1] == -1 or grid[x2][y2] == -1):
            return float('-inf')
        # If both arrive at bottom-right, end
        if x1 == y1 == n-1:
            return grid[x1][y1]
        # Cherries collected at current positions
        result = grid[x1][y1]
        if (x1, y1) != (x2, y2):
            result += grid[x2][y2]
        # Move: (down, down), (down, right), (right, down), (right, right)
        temp = max(
            dp(x1+1, y1, x2+1),   # both down
            dp(x1, y1+1, x2),     # right (1), down (2)
            dp(x1+1, y1, x2),     # down (1), right (2)
            dp(x1, y1+1, x2+1)    # both right
        )
        result += temp
        return result

    res = dp(0, 0, 0)
    return max(res, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³)  
  There are O(n²) positions for each person, with a constraint that steps add to the same value, so the overall number of unique states is O(n³).
- **Space Complexity:** O(n³)  
  Used by memoization (lru_cache) for the recursive function, as well as the recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are multiple types of items to collect?  
  *Hint: Track the state of each cell or use bit-masks for multiple collection types*

- How could you optimize for even larger grids?  
  *Hint: Space-efficient DP with iterative tabulation, or limit the number of recursive states with additional pruning*

- Can you reconstruct the path of maximum cherries?  
  *Hint: Backtrack through the DP decisions, store parent pointers*

### Summary
This is an advanced **state-compression DP** problem, typical of grid and path collection questions. The central idea is simulating two people moving simultaneously with DP to avoid double-counting cherries and combinatorially reducing the problem from exponential to polynomial time using memoization. This pattern is applicable in many **multi-agent pathfinding, collection with constraints**, and grid-based DP competition problems.