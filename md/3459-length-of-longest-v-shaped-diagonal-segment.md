### Leetcode 3459 (Hard): Length of Longest V-Shaped Diagonal Segment [Practice](https://leetcode.com/problems/length-of-longest-v-shaped-diagonal-segment)

### Description  
Given a 2D integer grid representing a matrix, the task is to find the length of the longest "V-shaped diagonal segment" in the grid.  
A segment:
- Starts at a cell with value **1**.
- After 1, strictly alternates between **2** and **0** along one of the four diagonal directions (top-left ↖, top-right ↗, bottom-left ↙, bottom-right ↘).
- The segment may make **one single 90° clockwise turn** to another diagonal direction but only once.
- The segment must continue the alternation (**2**, then **0**, then **2**, ...), even after the turn.
- The goal is to return the **maximum length** of such a segment in the whole grid. If no such segment exists, return 0.

### Examples  

**Example 1:**  
Input:  
```
grid = [[0,1,2],
        [1,2,0],
        [2,0,1]]
```
Output: `3`  
Explanation:  
Start at (0,1) = 1, move diagonally right-down to (1,2) = 0, then turn at (1,2) and move left-down to (2,1) = 0. The sequence is 1 → 2 → 0; length is 3 (max possible here).

**Example 2:**  
Input:  
```
grid = [[1,2,0,2],
        [2,0,2,0],
        [0,2,0,2],
        [2,0,2,1]]
```
Output: `5`  
Explanation:  
One optimal segment: (0,0)=1 → (1,1)=0 → (2,2)=0 → (3,3)=1; but to satisfy the alternation, best V is (0,0)=1 → (1,1)=0 → (2,2)=0 (before turn), make one 90° turn, then continue the alternation to (2,0)=0, (3,1)=0; length is 5.

**Example 3:**  
Input:  
```
grid = [[2,0,2],
        [0,2,0],
        [2,0,2]]
```
Output: `0`  
Explanation:  
No cell contains 1, so no segment can start.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Start from each cell with value 1. From each, try moving in all 4 diagonal directions, alternately looking for 2 and 0 as defined, allow a single turn (if not done already) to another diagonal, and count the segment length. This is extremely expensive as it requires O(mn) starting points, and possibly searching O(m + n) lengths for each.

- **Optimization:**  
  Since every path must alternate strictly and may have only one turn, we can use dynamic programming (DP) to store, for each cell and each direction, the maximum length we can achieve WITHOUT a turn and WITH a turn used already.  
  - Use DP tables: `dp_no_turn[r][c][dir][expected_value]` and `dp_turn[r][c][dir][expected_value]`
  - Process each direction for every cell, using memoization (to avoid recomputation across overlapping segments).
  - The state includes: cell (r,c), direction, whether a turn has been used, expected numeric value.
  - For every “1” cell, begin in all 4 diagonals, search for longest path (with/without turn).

- **Why final approach:**  
  Four directions, two turn states, two expected next values — all are bounded; grid is at most mn, so full DP per cell per dir/state is feasible. We re-use DP values so the actual solution is tractable.

- **Trade-offs:**  
  Pros: Large speed-up over brute force.  
  Cons: DP is tricky, code is more complex, but handles path dependencies efficiently.

### Corner cases to consider  
- Entire grid contains no 1 (must return 0)
- Only 1s, no 2 or 0 values (cannot form a segment beyond length 1)
- Single row/column
- All adjacent cells violate alternation
- Larger grids (stress test for DP performance)
- The turn at the very first or very last step
- Multiple maximal segments exist

### Solution

```python
# Directions: 0=↘ (down-right), 1=↙ (down-left), 2=↗ (up-right), 3=↖ (up-left)
DIRS = [(1, 1), (1, -1), (-1, 1), (-1, -1)]

def longestVSegment(grid):
    m, n = len(grid), len(grid[0])
    from functools import lru_cache

    # direction: 0,1,2,3; turn: 0=no turn so far, 1=already turned;
    # expected: 0 or 2 (what is needed next)
    @lru_cache(None)
    def dfs(r, c, dir_idx, turn, expect):
        max_len = 0
        dr, dc = DIRS[dir_idx]
        nr, nc = r + dr, c + dc

        # move without turning
        if 0 <= nr < m and 0 <= nc < n:
            if grid[nr][nc] == expect:
                # alternate expectation: if expect is 2, next should be 0; if 0 → 2
                next_val = 0 if expect == 2 else 2
                max_len = max(max_len, 1 + dfs(nr, nc, dir_idx, turn, next_val))

            # try a single 90° clockwise turn (if not turned yet)
            if turn == 0:
                # Map for possible turns (for each dir, only allowed CW turns)
                next_dirs = {
                    0: 2, # ↘ → ↗
                    1: 0, # ↙ → ↘
                    2: 3, # ↗ → ↖
                    3: 1  # ↖ → ↙
                }
                turn_dir = next_dirs[dir_idx]
                tdr, tdc = DIRS[turn_dir]
                tr, tc = r + tdr, c + tdc
                if 0 <= tr < m and 0 <= tc < n:
                    if grid[tr][tc] == expect:
                        next_val = 0 if expect == 2 else 2
                        max_len = max(max_len, 1 + dfs(tr, tc, turn_dir, 1, next_val))

        return max_len

    ans = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 1:
                for dir_idx in range(4):
                    # Next expected is 2 (alternation: 1 → 2)
                    ans = max(ans, 1 + dfs(r, c, dir_idx, 0, 2))
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × n × 4 × 2 × 2) × max(m, n) = O(mn × max(m, n)).  
  For each cell, each direction, turn state, expected value, worst-case path length is grid diagonal.

- **Space Complexity:**  
  O(m × n × 4 × 2 × 2) due to DP/memoization cache and call stack. This is manageable for moderately sized grids.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could turn at most twice instead of once?  
  *Hint: Increase the turn state, adjust DP.*

- How would you generalize to arbitrary sequences (not just 1 → 2 → 0 → 2...)?  
  *Hint: Parameterize the sequence and add a pointer/index in DP state.*

- How do you find the path itself (not just the max length)?  
  *Hint: Track parent state in DP, reconstruct via backtracking.*

### Summary
This problem is a combination of grid recursion, stateful DP/memoization, and careful tracking of path dependencies (direction, alternation, single allowed turn). The solution uses the **"DP on grid with state"** pattern—commonly used for grid-based, path-dependent, and sequence-constrained problems—similar to unique-paths-with-turns or game simulation on grids. It’s a valuable pattern, especially for hard graph/grid dynamic programming challenges.