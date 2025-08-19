### Leetcode 3568 (Medium): Minimum Moves to Clean the Classroom [Practice](https://leetcode.com/problems/minimum-moves-to-clean-the-classroom)

### Description  
A student volunteer is tasked with **collecting all litter items** ('L') in an m×n classroom grid. Each cell can be:
- 'S': the starting position (exactly one in the grid).
- 'L': a cell with litter to collect.
- 'R': a reset station that restores your energy to the full starting value.
- 'X': an obstacle (impassable).
- '.': an empty cell.

You can move to any of the 4 adjacent cells (up, down, left, right).  
You start at 'S' with a given **energy** (an integer, say k), which decreases by 1 for every move.  
If you reach a reset cell 'R', your energy is refilled to k.
To **collect all ‘L’ cells with the minimum moves** (each litter auto-collects when you step on it), return the minimum moves required.  
If it’s impossible, return -1.

### Examples  

**Example 1:**  
Input: `classroom = ["S.", "XL"], energy = 2`  
Output: `2`  
*Explanation: Start at (0,0) → (0,1) → (1,1). You quickly reach the only 'L'.*

**Example 2:**  
Input: `classroom = ["LS", "RL"], energy = 4`  
Output: `3`  
*Explanation:  
Start at (0,1):  
- Move to (0,0) (collect 'L', used 1 energy left 3)  
- Move to (1,0) (reset, energy back to 4)  
- Move to (1,1) (collect second 'L').  
In total, 3 moves.*

**Example 3:**  
Input: `classroom = ["SXL", "..."], energy = 2`  
Output: `-1`  
*Explanation: There’s not enough energy to detour around 'X' and reach all litter.*

### Thought Process (as if you’re the interviewee)  
First brute-force idea:  
- Try all possible paths from 'S', using BFS, tracking current position, collected litter, and remaining energy.
- For each position, moving costs 1 energy. If you step on 'R', reset energy to max.

Optimizations:  
- Since litter can be collected in any order, and there can be up to 15 'L' cells, use a **bitmask** to record which litters are collected.
- BFS will need to track (row, col, bitmask_of_collected_litter, energy_left) as the state to avoid revisiting states.
- Use a queue for BFS; prioritize fewer moves.
- Only revisit a state if you have strictly more energy left (to avoid unnecessary visits).
- If BFS completes without collecting all litters (mask == (1<<num_lit)-1), return -1.

Trade-offs:  
- BFS ensures minimum moves due to level-order traversal.
- State explosion possible but practical for ≤15 'L' cells and max grid size m\*n ≤ 100.

### Corner cases to consider  
- No 'L' in the grid (answer is 0).
- Impossible to reach some 'L' (blocked by 'X').
- 'R' unreachable or not useful.
- Need to collect 'L' then refill on 'R' before reaching isolated litters.
- Energy too small to take even one step.
- Multiple optimal routes—must return the minimum moves.

### Solution

```python
from collections import deque

def min_moves_to_clean_classroom(classroom, energy):
    # Parse grid
    m, n = len(classroom), len(classroom[0])
    litter_positions = []
    start = None

    for i in range(m):
        for j in range(n):
            if classroom[i][j] == 'S':
                start = (i, j)
            elif classroom[i][j] == 'L':
                litter_positions.append((i, j))

    if not litter_positions:
        return 0  # No litter to collect

    litter_idx_map = {pos: idx for idx, pos in enumerate(litter_positions)}
    full_mask = (1 << len(litter_positions)) - 1
    
    # BFS: (row, col, litter_mask, energy_left)
    queue = deque()
    queue.append( (start[0], start[1], 0, energy, 0) )  # append (x, y, mask, energy_left, steps)
    visited = dict()  # (x, y, mask) -> max energy_left we've seen here
    
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]

    while queue:
        x, y, mask, e_left, steps = queue.popleft()
        key = (x, y, mask)
        # Prune: skip states we visited with equal or more energy remaining
        if key in visited and visited[key] >= e_left:
            continue
        visited[key] = e_left

        # If at litter, update mask
        if (x, y) in litter_idx_map:
            mask |= (1 << litter_idx_map[(x, y)])

        if mask == full_mask:
            return steps

        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            # Validate new position
            if 0 <= nx < m and 0 <= ny < n and classroom[nx][ny] != 'X':
                ne = e_left - 1
                if ne < 0:
                    continue
                # If landing on reset, refill energy
                if classroom[nx][ny] == 'R':
                    ne = energy
                queue.append( (nx, ny, mask, ne, steps + 1) 
                )
    return -1  # Impossible

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m \* n \* 2ˡ \* energy) — Each state is identified by position (m×n), litter mask (2ˡ, l = number of litters ≤15), and possible energy (energy ≤k). Each move is O(1).
- **Space Complexity:** O(m \* n \* 2ˡ) — For visited dictionary; queue may approach that size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are recharge cells ('R') but you can only visit each recharge cell once?
  *Hint: Add a collected set for recharge as part of the state.*

- How would you optimize if energy is extremely large, so energy tracking in state explodes?
  *Hint: Only need to track useful energy states (e.g., shortest path, or group equivalent states).*

- What if there are additional types of obstacles or temporary bonuses?
  *Hint: Adjust state to track more, but still structure as BFS with additional state bits.*

### Summary
This problem is a **multi-state BFS/bitmask** search, where each state is position, collected litter, and energy.  
It fits the **"collect all targets minimally"** pattern, often seen in grid pathfinding (e.g., "minimum steps to visit all keys" or "clean the room" types).  
The use of bitmask to track collectibles and BFS to guarantee minimal steps is canonical and broadly applicable for small numbers of targets. Pattern applies to robot vacuum, traveling salesman grid variants, and key/lock puzzles.

### Tags
Array(#array), Hash Table(#hash-table), Bit Manipulation(#bit-manipulation), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
