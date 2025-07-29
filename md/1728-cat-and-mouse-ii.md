### Leetcode 1728 (Hard): Cat and Mouse II [Practice](https://leetcode.com/problems/cat-and-mouse-ii)

### Description  
There's a 2D grid representing a maze with *floors* (.), *walls* (#), a *cat* (C), a *mouse* (M), and *food* (F).  
The mouse and cat take turns. The mouse moves first. Each can jump up to a specified number of cells per move (mouseJump for mouse, catJump for cat) in any of the four cardinal directions — but jumps cannot pass through or land on walls, nor jump out of bounds.  
If the mouse gets to the food first, mouse wins. If the cat gets to the mouse or food first, or the mouse takes 1000 or more moves, cat wins. The goal: determine if the mouse can guarantee a win assuming both players play optimally.

### Examples  

**Example 1:**  
Input:  
```
grid = ["####F",
        "#C...",
        "M...."],
catJump = 1, mouseJump = 2
```
Output: `true`  
Explanation:  
```
Grid:
####F
#C...
M....
```
- Mouse moves first, can reach food before cat. Cat neither catches mouse nor reaches food in time.

**Example 2:**  
Input:  
```
grid = ["M.C...F"],
catJump = 1, mouseJump = 4
```
Output: `true`  
Explanation:  
Mouse can go straight to the food in one move, before the cat can reach it.

**Example 3:**  
Input:  
```
grid = ["M.C...F"],
catJump = 1, mouseJump = 3
```
Output: `false`  
Explanation:  
Cat can potentially intercept the mouse or reach the food before the mouse given optimal play.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** Try all possible moves for both mouse and cat, simulating every possible path. However, the state space explodes quickly due to turns and move options.  
- **Observation:**  
    - The game state is fully determined by: (mouse position, cat position, whose turn, number of turns).  
    - Each can only move to reachable empty cells within jump distance.
    - There’s a strict upper bound (1000 turns).
    - If the same state repeats, it should be avoided (DP memoization).
- **Approach:**  
    - Use DFS with memoization: dp[mouse_pos][cat_pos][turn] stores result: can mouse win from this configuration?
    - For each turn, try all legal moves (given jump), recursively check all outcomes.
    - Prune/early-stop: If it's clear cat wins (catches mouse, gets food, move limit), return immediately.
    - Limit total recursive calls with the 1000-turn cut-off.
- **Why this approach:**  
    - DP+DFS is required for such game-theory, minimax-type problems (both players play optimally).
    - Memoization prevents repeating search of identical states.
- **Trade-offs:**  
    - Time and space expensive, but feasible due to grid/small jump limits and finite turn count.

### Corner cases to consider  
- Walls immediately block all paths.
- Mouse or cat starts next to food.
- Cat and mouse start adjacent — cat can win in one move.
- Mouse or cat cannot reach food due to walls.
- Maximum number of turns is reached (cat wins).
- Only one open cell (food) exists.
- Jump value ≥ grid dimensions (can traverse whole row in one move).

### Solution

```python
from typing import List, Tuple

class Solution:
    def canMouseWin(self, grid: List[str], catJump: int, mouseJump: int) -> bool:
        m, n = len(grid), len(grid[0])
        DIRS = [(-1,0), (1,0), (0,-1), (0,1)]

        # Encode each position as (row, col)
        # Find initial positions
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 'M':
                    mouse_start = (i, j)
                if grid[i][j] == 'C':
                    cat_start = (i, j)
                if grid[i][j] == 'F':
                    food = (i, j)

        from functools import lru_cache

        def is_valid(x, y):
            return 0 <= x < m and 0 <= y < n and grid[x][y] != '#'

        @lru_cache(maxsize=None)
        def dp(mouse: Tuple[int,int], cat: Tuple[int,int], turn: int) -> bool:
            # End conditions:
            if turn >= 1000:
                return False  # Cat wins
            if mouse == cat:
                return False  # Cat eats mouse
            if cat == food:
                return False  # Cat eats food
            if mouse == food:
                return True   # Mouse gets food

            if turn % 2 == 0:
                # Mouse's turn: try all valid moves (up to mouseJump)
                for dx, dy in DIRS:
                    for jump in range(1, mouseJump+1):
                        nx, ny = mouse[0] + dx*jump, mouse[1] + dy*jump
                        if not is_valid(nx, ny): break
                        nxt = (nx, ny)
                        if dp(nxt, cat, turn+1):
                            return True  # If mouse can win from this move
                    # Staying in place allowed
                if dp(mouse, cat, turn+1):
                    return True
                return False  # If no move leads to victory
            else:
                # Cat's turn: try all valid moves (up to catJump)
                for dx, dy in DIRS:
                    for jump in range(1, catJump+1):
                        nx, ny = cat[0] + dx*jump, cat[1] + dy*jump
                        if not is_valid(nx, ny): break
                        nxt = (nx, ny)
                        if not dp(mouse, nxt, turn+1):
                            return False  # If cat can force mouse doom
                # Staying in place allowed
                if not dp(mouse, cat, turn+1):
                    return False
                return True  # Mouse can always dodge cat

        return dp(mouse_start, cat_start, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  The worst-case number of states is O(m² × n² × T), where T = 1000 (move limit), with m × n for each mouse and cat position and at most two turns per round. The constants multiply due to 4 directions and up to max(catJump, mouseJump) per direction. So in practice, with memoization and pruning, it runs feasibly for the given constraints.
  
- **Space Complexity:**  
  O(m² × n² × T) for the memoization cache — one entry for each possible (mouse_pos, cat_pos, turn mod 2, up to move limit), plus recursion stack (at most O(T)).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the move limit was much higher or removed?
  *Hint: Think about cycles and state repeats — would cycle detection or different memo keys help?*

- What if the cat and mouse could remove walls as a move?
  *Hint: Need to encode the modified grid state as part of the DP key/state.*

- What changes if there are multiple mice or cats?
  *Hint: Each creature’s position would become part of the state; combinatorial explosion risk.*

### Summary
This problem uses a **game theory DP with memoization and minimax-style recursion**, a common pattern in optimal two-player game simulations (chess, checkers, etc.), where both players pick the best move each turn. The coding technique generalizes to “win/loss/draw in two-player games with perfect information and deterministic moves.” Optimal DP key design and pruning make the solution tractable.