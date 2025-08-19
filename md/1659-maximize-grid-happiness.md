### Leetcode 1659 (Hard): Maximize Grid Happiness [Practice](https://leetcode.com/problems/maximize-grid-happiness)

### Description  
You are given a grid with m rows and n columns. You can place up to introvertsCount introverts and extrovertsCount extroverts in the grid. Each cell can have at most one person or be empty. You must maximize the total "happiness," given that:
- Every introvert gets +120 happiness when placed, but loses 30 for each adjacent person.
- Every extrovert gets +40 happiness, and gains +20 for each adjacent person, regardless of who they are.
- Neighbors are the 4-directionally adjacent cells.
Return the maximum happiness you can achieve.

### Examples  

**Example 1:**  
Input: `m = 2, n = 3, introvertsCount = 1, extrovertsCount = 2`  
Output: `240`  
*Explanation: Place introvert and extroverts maximizing their adjacency.*

**Example 2:**  
Input: `m = 3, n = 1, introvertsCount = 2, extrovertsCount = 1`  
Output: `260`  
*Explanation: Place introvert, extrovert, introvert (vertically).* 

**Example 3:**  
Input: `m = 2, n = 2, introvertsCount = 2, extrovertsCount = 1`  
Output: `240`  
*Explanation: Several optimal placements possible.*

### Thought Process (as if you’re the interviewee)  
This is a constraint optimization DP problem. The state is defined by (current cell, previous row state, left/right/top neighbors, introverts left, extroverts left). Enumerate all possible placements for each cell: empty, introvert, extrovert. For each, calculate impact on happiness depending on neighbors (look left and up for O(1)). Use memoization to cache the computed states. The state encoding can use bitmasks or tuples for each row. Time is manageable because max m×n ≤ 25.

### Corner cases to consider  
- Zero introverts or extroverts
- 1x1, 1xN, Nx1 grids
- Only one placement possible
- All positions filled
- No one placed (both counts 0)

### Solution

```python
from functools import lru_cache

def getMaxGridHappiness(m: int, n: int, introvertsCount: int, extrovertsCount: int) -> int:
    # Map: 0=empty, 1=introvert, 2=extrovert
    N = m * n
    
    @lru_cache(maxsize=None)
    def dfs(pos, prev_row, introverts, extroverts):
        if pos == N or (introverts == 0 and extroverts == 0):
            return 0
        row, col = divmod(pos, n)
        # Get up and left neighbor
        up = (prev_row >> (col*2))&3 if row > 0 else 0
        left = (prev_row >> ((col-1)*2))&3 if col > 0 else 0
        ans = dfs(pos+1, prev_row & (~(3 << (col*2))), introverts, extroverts)  # Leave empty

        # Try placing introvert
        if introverts:
            delta = 120
            for d in [up, left]:
                if d == 1: delta -= 60
                elif d == 2: delta -= 10
            next_row = prev_row & (~(3 << (col*2))) | (1 << (col*2))
            ans = max(ans, delta + dfs(pos+1, next_row, introverts-1, extroverts))
        # Try placing extrovert
        if extroverts:
            delta = 40
            for d in [up, left]:
                if d == 1: delta += 20
                elif d == 2: delta += 40
            next_row = prev_row & (~(3 << (col*2))) | (2 << (col*2))
            ans = max(ans, delta + dfs(pos+1, next_row, introverts, extroverts-1))
        return ans
    return dfs(0, 0, introvertsCount, extrovertsCount)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N × 3ⁿ × introvertsCount × extrovertsCount), where N = m×n. Exponential in n; tractable since m×n ≤ 25.
- **Space Complexity:** O(3ⁿ × introvertsCount × extrovertsCount), due to memoization.


### Potential follow-up questions (as if you’re the interviewer)  

- How does the approach change if the adjacencies are diagonal also?
  *Hint: Need to update neighbor check for diagonals, more state.*

- How can you reconstruct the actual placement for the optimal solution?
  *Hint: Store path information in DP or trace back from last optimal state.*

- What optimizations can you leverage due to symmetry or small limits?
  *Hint: Prune equivalent states, exploit row/column symmetry.*

### Summary
This problem uses state compression DP and recursion with memoization. Similar techniques are applied in tiling, coloring, and grid-based DP with local constraints where optimizing global happiness or score is required.

### Tags
Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Memoization(#memoization), Bitmask(#bitmask)

### Similar Problems
