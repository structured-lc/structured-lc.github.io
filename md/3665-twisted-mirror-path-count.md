### Leetcode 3665 (Medium): Twisted Mirror Path Count [Practice](https://leetcode.com/problems/twisted-mirror-path-count)

### Description  
You are given an n × m grid containing cells that may or may not have *mirrors* (represented by 1 for mirror, 0 for empty).  
You start at the **top-left corner** (0,0), and want to reach the **bottom-right corner** (n-1,m-1).  
You can only move **down** or **right**. However, **if you step into a cell with a mirror, your movement choice is "locked" to a single direction**:
- If you arrived at the mirror from above (i.e., you came down), you *must* continue moving right.
- If you arrived at the mirror from the left (i.e., you came right), you *must* continue moving down.
- If you start from the top-left corner, you can choose either direction.
Count the number of **unique paths** from (0,0) to (n-1,m-1) that follow these twisted mirror rules, **modulo 10⁹+7**.

### Examples  

**Example 1:**  
Input: `grid = [[0,0],[0,0]]`  
Output: `2`  
Explanation:  
There are two possible routes:  
- right → down  
- down → right  

**Example 2:**  
Input: `grid = [[0,1],[0,0]]`  
Output: `1`  
Explanation:  
From (0,0), you can move down to (1,0), then right to (1,1).  
If you try right to (0,1), you enter a mirror from the left, so you're *forced* to move down to (1,1).  
But from (0,1), only (1,1) is possible, so both ways reach the end:  
- down → right = (0,0)→(1,0)→(1,1)  
- right (to mirror) → forced down = (0,0)→(0,1)→(1,1)  
So in total, **2** ways.

**Example 3:**  
Input: `grid = [[0,1,0],[0,1,0],[0,0,0]]`  
Output: `2`  
Explanation:  
Only two valid routes:  
- right→down (mirror, forced right) → down → right  
- down → down → right → right  

### Thought Process (as if you’re the interviewee)  
To solve this, I first thought of the standard DP for grid unique paths: dp[i][j] = dp[i-1][j] + dp[i][j-1].  
But the constraint that **mirrors only allow movement in one direction** depending on how you entered means we must also track the *direction* by which we reach each cell.

So, for every cell (i,j), I maintain two DP states:
- dp[i][j]: #ways to reach (i,j) entering from above (down move)
- dp[i][j][1]: #ways to reach (i,j) entering from left (right move)

Transition logic:
- If cell (i,j) is **not a mirror**:  
  - Arriving from **above**: can try to go **down** or **right**.
  - Arriving from **left**: can try to go **down** or **right**.
- If cell (i,j) is a **mirror**:  
  - If you arrived from above (down), you are *forced* to move right next.
  - If you arrived from left (right), you are *forced* to move down next.

To handle starting at (0,0), I "start" in a special "neutral" state and allow both directions.

I'll use memoized recursion (top-down DP with direction param), or a DP table:  
dp[i][j][dir] where dir=0 ("came from above", about to go down), dir=1 ("came from left", about to go right).

We need to be careful with:
- Boundary conditions (can't step outside)
- Modulo 10⁹+7

### Corner cases to consider  
- n=1 or m=1 (single row/col)
- grid is all mirrors
- grid filled with only empty cells (0)
- Start or end cell is a mirror (should be allowed)
- Only one possible path (all mirrors block all routes but one)
- Mirrors create "dead ends"

### Solution

```python
MOD = 10**9 + 7

def twistedMirrorPathCount(grid):
    n, m = len(grid), len(grid[0])
    # DP memo: (i, j, dir) → #ways to reach (n-1, m-1)
    # dir: 0 = just moved down (arrived from above), 1 = just moved right (arrived from left), 2 = starting (can choose direction)
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dp(i, j, dir):
        # If out of bounds
        if not (0 <= i < n and 0 <= j < m):
            return 0
        # If at the bottom-right cell, one valid path
        if i == n-1 and j == m-1:
            return 1

        res = 0
        if dir == 2:  # starting position, can step down or right
            res = (dp(i+1, j, 0) + dp(i, j+1, 1)) % MOD
        else:
            if grid[i][j] == 1:
                # We're on a mirror, direction is forced
                if dir == 0:
                    # Came from above; MUST go right
                    res = dp(i, j+1, 1)
                else:
                    # Came from left; MUST go down
                    res = dp(i+1, j, 0)
            else:
                # Not a mirror: Can go down or right
                res = (dp(i+1, j, 0) + dp(i, j+1, 1)) % MOD
        return res

    return dp(0, 0, 2)

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m × 2)  
  For each cell, two possible direction states; each state is visited at most once (memoized recursion).
- **Space Complexity:** O(n × m × 2)  
  For memoization cache; stack depth O(n+m).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you *reconstruct the actual paths* instead of just counting them?  
  *Hint: Store the path along with the DP state, or backtrace from end to start.*

- Could you solve this using *bottom-up DP* instead of recursion?  
  *Hint: Carefully define DP[i][j][dir] and process in increasing order of (i+j).*

- What if the grid has *cycles* or *teleport* cells (portals to a specific cell)?  
  *Hint: You'd need to prevent infinite loops, possibly with seen state sets, and adjust transitions.*

### Summary
This is an example of **DP with "extended state"** — here, the key extra state is **"direction of entry"** into each cell.  
Classic patterns:  
- Grid DP (“unique paths”) with additional constraints (forced direction, obstacles, etc)  
- *Memoized recursion with direction state* is useful for problems with “twists” on vanilla grid path counting.  
This technique applies to many variations: chessboard moves, constrained mazes, or robot path problems with extra actions or rules.


### Flashcard
Track DP state as dp[i][j][direction] to count paths reaching (i, j) from a specific direction; mirrors constrain movement based on entry direction.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
