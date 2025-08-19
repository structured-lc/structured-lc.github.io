### Leetcode 2056 (Hard): Number of Valid Move Combinations On Chessboard [Practice](https://leetcode.com/problems/number-of-valid-move-combinations-on-chessboard)

### Description  
Given an 8×8 chessboard and up to 4 chess pieces (rook, bishop, or queen), each starting at a specified position, find the total number of valid ways for all these pieces to move to any square (including staying where they are) such that none of the pieces block each other's movement. Each piece can move any number of squares per its movement rules, and their moves must not pass through or stop on the same square as another piece unless swapping places in a single tick.

### Examples  

**Example 1:**  
Input: `pieces = ["rook"], positions = [[1,1]]`  
Output: `15`  
*Explanation: The rook at (1,1) can reach every square in its row and column except its starting square, so there are 15 valid destinations.*

**Example 2:**  
Input: `pieces = ["queen"], positions = [[1,1]]`  
Output: `22`  
*Explanation: The queen at (1,1) can reach every square in its row, column, and both diagonals (except its starting position), for a total of 22 valid destinations.*

**Example 3:**  
Input: `pieces = ["bishop"], positions = [[4,3]]`  
Output: `12`  
*Explanation: The bishop at (4,3) can move to all squares along its diagonals, excluding its own position, for a total of 12 reachable squares.*

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  Try all possible destinations for each piece. For each combination of destinations, check step by step if any piece is blocked by others (cannot pass through or land on another, unless swapping).
- **Observation:**  
  Since n ≤ 4, brute-force via DFS/backtracking is tractable. For each possible destination set, simulate all movements in sync: at time t, each piece either moves one step toward its chosen destination or waits. If two pieces land on the same square at the same second, only allowed if they're swapping.
- **Optimization:**  
  Prune combinations early if pieces' paths collide in a forbidden way.
  - For each piece, precompute all possible paths (direction, length).
  - Use DFS to loop over possible destinations for each piece, and for each, enumerate all possible orderings of moves ("move k steps in that direction; wait after destination if others aren't done").
  - During simulation, use a visited grid or a position map per tick to detect illegal overlaps.
- **Final solution:**  
  Backtrack over all destination and timing assignments, simulate all progressions, count only the valid ones.

### Corner cases to consider  
- Pieces overlap at start (not allowed per problem).
- Piece doesn't move at all (stays on starting square).
- Two pieces reach the same square at the same tick (valid only if they cross, i.e. swap places).
- Paths only "touch" at endpoints (swap at the same tick is allowed).
- Pieces move in parallel but their paths overlap at different times — that's invalid.

### Solution

```python
def countCombinations(pieces, positions):
    # Directions for each piece type
    dirs = {
        "rook":  [(1,0), (-1,0), (0,1), (0,-1)],
        "bishop":[(1,1), (1,-1), (-1,1), (-1,-1)],
        "queen": [(1,0), (-1,0), (0,1), (0,-1), (1,1), (1,-1), (-1,1), (-1,-1)]
    }
    
    n = len(pieces)
    moves = []
    
    # For each piece, generate all possible path endpoints (excluding start)
    for idx in range(n):
        ptype = pieces[idx]
        x0, y0 = positions[idx]
        locs = []
        for dx, dy in dirs[ptype]:
            step = 1
            while 0 < x0 + dx*step <= 8 and 0 < y0 + dy*step <= 8:
                locs.append( (x0 + dx*step, y0 + dy*step, dx, dy, step) )
                step += 1
        # Add start position as "stay"
        locs.append( (x0, y0, 0, 0, 0) )
        moves.append(locs)
        
    from itertools import product, permutations

    result = 0

    def calc_paths(src, dst, dx, dy, steps):
        # Return the step-by-step path (including start, ending with dst)
        x, y = src
        path = []
        for _ in range(steps):
            x += dx
            y += dy
            path.append( (x, y) )
        return path

    for plan in product(*moves):
        # plan[i] = destination for piece i: (x, y, dx, dy, steps)
        paths = []
        maxlen = 0
        # Build the full move trace for each piece (they may "wait" at end)
        for i in range(n):
            x0, y0 = positions[i]
            x1, y1, dx, dy, steps = plan[i]
            path = calc_paths( (x0, y0), (x1, y1), dx, dy, steps )
            paths.append(path)
            maxlen = max(maxlen, len(path))
        # All need to reach destination at same time, so wait after arrival
        for wait_times in product(*[range(maxlen - len(p)+1) for p in paths]):
            # time_steps: t = 0...(maxlen-1), positions at each tick
            trace = []
            for idx, path in enumerate(paths):
                full = path + [path[-1]]*wait_times[idx] if path else [positions[idx]]*maxlen
                full += [full[-1]]*(maxlen - len(full))
                trace.append(full)
            valid = True
            for t in range(maxlen):
                seen = {}
                for i in range(n):
                    pos = trace[i][t] if trace[i] else positions[i]
                    if pos in seen:
                        # If two pieces swap: only allowed if pos == prev_pos_of_other and vice-versa
                        j = seen[pos]
                        if t == 0:
                            valid = False
                            break
                        prev_i = trace[i][t-1]
                        prev_j = trace[j][t-1]
                        if prev_i != trace[j][t-1] or prev_j != trace[i][t-1]:
                            valid = False
                            break
                    seen[pos] = i
                if not valid:
                    break
                # No two pieces cross paths at same tick unless swap allowed
                # Additionally, need to check for pass-through in the same second
                passed = set()
                for i in range(n):
                    if t == 0: continue
                    curr = trace[i][t]
                    prev = trace[i][t-1]
                    if curr != prev:
                        key = (prev, curr)
                        if key in passed:
                            valid = False
                            break
                        passed.add(key)
                if not valid:
                    break
            if valid:
                result += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Roughly O(29ⁿ × kⁿ), where n is the number of pieces (≤4), 29 is the maximum destination count for a queen, and k is the possible wait timings per piece (again ≤ 15). This is feasible only because n ≤ 4.

- **Space Complexity:**  
  O(n × k), storing every path-option and time-step trace per combination, but since n is small, space remains moderate.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution scale if there were more pieces?
  *Hint: Is brute-force/DFS still feasible? What optimizations or approximations could help with larger n?*

- Can you adapt this to custom-shaped boards or movement rules?
  *Hint: Generalize direction/board limits and movement logic.*

- What if pieces could block each other once one has reached its destination?
  *Hint: Model "arrival" state separately per piece, and forbid new conflicts afterward.*

### Summary
This problem demonstrates advanced backtracking, simulation, and synchronizing multi-agent movement with collision rules. The pattern is "permutation combination+DFS+simulation", common for enumeration and movement/interleaving puzzles. The simulation can be adapted to any movement with strict anti-collision rules.

### Tags
Array(#array), String(#string), Backtracking(#backtracking), Simulation(#simulation)

### Similar Problems
