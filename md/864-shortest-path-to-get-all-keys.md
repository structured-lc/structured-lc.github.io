### Leetcode 864 (Hard): Shortest Path to Get All Keys [Practice](https://leetcode.com/problems/shortest-path-to-get-all-keys)

### Description  
You are given a 2D grid representing a maze where:
- `'.'` is an open cell you can walk on.
- `'#'` is a wall you cannot cross.
- `'@'` is your starting position.
- Lowercase letters (`a`‒`f`) represent keys you must collect.
- Uppercase letters (`A`‒`F`) are locks for which you need the corresponding key.

You can move up, down, left, or right (no diagonals). The goal is to collect **all** keys in the shortest number of steps. If it isn't possible, return -1.

### Examples  

**Example 1:**  
Input:  
```
["@.a.#","###.#","b.A.B"]
```
Output: `8`  
*Explanation: You start at '@', go right to 'a' (collect key), then move down and around to collect 'b', while only passing through doors when the key has been obtained.*

**Example 2:**  
Input:  
```
["@..aA","..B#.","....b"]
```
Output: `6`  
*Explanation: Pick up 'a' before passing 'A', then get to 'b' avoiding blocked tiles.*

**Example 3:**  
Input:  
```
["@Aa"]
```
Output: `-1`  
*Explanation: There is a door but no way to pick up the key since the start position prevents it.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Simulate every possible path using backtracking/DFS, collecting keys and only passing through doors if allowed. This quickly becomes intractable: the branching factor is huge, and we'll repeat the same state many times.

- **Optimized idea:**  
  Notice that the *state* is defined by: current position (r, c) and the set of keys held so far.  
  This suggests a BFS traversal, where each state is uniquely represented by (r, c, keys_bitmask).  
  Using BFS ensures the shortest path, and a `visited` set prevents reprocessing the same state.

- **Implementation points:**  
  - Map each key ('a'-'f') to a bit position in a bitmask: e.g., 'a' → 0ᵗʰ, ..., 'f' → 5ᵗʰ.
  - Compute the total number of keys (k). The completion condition: keys_bitmask == (1<<k) - 1.
  - For each step: skip walls, only pass locks if you have the right key, collect keys as you proceed, and avoid loops by marking states visited.

- **Trade-offs:**  
  - BFS with (position, keys_bitmask) state ensures the shortest path.
  - Memory is O(m × n × 2ᵏ), but k≤6, so space is tractable.

### Corner cases to consider  
- No keys in the grid (should return 0).
- Some keys are unreachable (enclosed by walls).
- Locks with no corresponding key in the grid.
- Multiple keys/doors but not all must be collected to finish.
- Start immediately surrounded by walls.
- One cell grid with just '@' and nothing else.

### Solution

```python
from collections import deque

def shortestPathAllKeys(grid):
    rows, cols = len(grid), len(grid[0])
    num_keys = 0
    start_r = start_c = 0
    
    # Find starting position and count number of keys
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '@':
                start_r, start_c = r, c
            if 'a' <= grid[r][c] <= 'f':
                num_keys |= (1 << (ord(grid[r][c]) - ord('a')))
    
    all_keys_mask = num_keys
    
    queue = deque()
    # Each state: (row, col, keys_bitmask)
    queue.append((start_r, start_c, 0, 0))  # (r, c, keys_bitmask, steps)
    visited = set()
    visited.add((start_r, start_c, 0))
    
    directions = [(-1,0),(1,0),(0,-1),(0,1)]
    
    while queue:
        r, c, keys, steps = queue.popleft()
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                cell = grid[nr][nc]
                if cell == '#':
                    continue
                new_keys = keys
                # Collect key if present
                if 'a' <= cell <= 'f':
                    new_keys |= (1 << (ord(cell) - ord('a')))
                    if new_keys == all_keys_mask:
                        return steps + 1
                # Hit lock; skip if missing key
                if 'A' <= cell <= 'F':
                    if not (new_keys & (1 << (ord(cell) - ord('A')))):
                        continue
                state = (nr, nc, new_keys)
                if state not in visited:
                    visited.add(state)
                    queue.append((nr, nc, new_keys, steps + 1))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × 2ᵏ).  
  - For each cell (m×n), and each possible keys_bitmask (up to 2ᵏ, k = number of keys ≤6).
  - Each state is processed at most once.

- **Space Complexity:** O(m × n × 2ᵏ) for `visited` and queue.
  - Each state includes row, col, and keys_bitmask.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you change your approach if the number of keys could be up to 20 or more?  
  *Hint: 2ᵏ states becomes unfeasible. Could you use heuristics or an A* search?*

- What if the keys could be picked in any order, but opening certain doors gave extra bonuses?  
  *Hint: You might want to keep track of additional state (e.g., collected bonuses).*

- Can you optimize further to handle dynamic walls or dynamic key/lock changes?  
  *Hint: BFS state would need to encode not only keys, but walls/lock/door state.*

### Summary  
This problem is a classic variant of **multi-state shortest path** using a BFS with a compact state encoding, where the *bitmask* is a canonical trick to quickly represent sets of small size (here, keys). The pattern used here can apply anywhere you need minimal steps to reach a “finished” state in a search, where the state includes multiple “tokens” (e.g., coins, switches, collectibles) besides location.


### Flashcard
BFS with state (r, c, keys_bitmask); expand to adjacent cells, collecting keys and passing doors only with matching keys.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
