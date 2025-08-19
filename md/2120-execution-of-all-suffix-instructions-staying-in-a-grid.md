### Leetcode 2120 (Medium): Execution of All Suffix Instructions Staying in a Grid [Practice](https://leetcode.com/problems/execution-of-all-suffix-instructions-staying-in-a-grid)

### Description  
You are given an n × n grid and a robot starting at a certain position, startPos = [row, col]. There is a string s of instructions, each character being one of {'L', 'R', 'U', 'D'}. For each position i in the instruction string, you are to compute how many instructions the robot can execute, starting from instruction i (and at startPos), without moving out of the grid. Execution stops as soon as the robot moves out of bounds or the string is exhausted. The output is a list where output[i] is how many of s[i:] would be successfully executed from startPos.

### Examples  

**Example 1:**  
Input: `n=3, startPos=[0,1], s="RRDDLU"`  
Output: `[1,5,4,3,1,0]`  
*Explanation:*
- From i=0 ('R'): Can't go right from (0,1) twice (because column 3 is out). So only the first move is successful.
- From i=1 ('R'): Five steps possible: R (to 0,2), D (1,2), D (2,2), L (2,1), U (1,1) before the next move would go out.
- i=2: Four moves: D, D, L, U.
- i=3: Three moves: D, L, U.
- i=4: One move: L (to 0,0), but the next would go out.
- i=5: U (would try to go off the top row, so 0).

**Example 2:**  
Input: `n=2, startPos=[1,1], s="LURD"`  
Output: `[4,1,0,0]`  
*Explanation:*  
- i=0: L (to 1,0), U (to 0,0), R (to 0,1), D (to 1,1) — all possible, so 4 moves.
- i=1: U (to 0,1), R tries to go to (0,2) which is out, so only 1 move.
- i=2: R tries to go to (1,2), out of bounds.
- i=3: D (to 2,1), out of bounds.

**Example 3:**  
Input: `n=1, startPos=[0,0], s="LRUD"`  
Output: `[0,0,0,0]`  
*Explanation:*  
- Any move will take the robot out of the only grid cell, so zero moves are possible at every suffix.

### Thought Process (as if you’re the interviewee)  
First, the brute-force solution is to simulate, for every possible starting index i (where 0 ≤ i < len(s)), restarting from startPos and applying s[i], s[i+1], ... as long as the moves stay in-bounds. For each move, convert the instruction to a delta and track the robot's position, stopping if it goes off the grid.  
This is simple and direct simulation, with time complexity O(m²) if s has length m (since for each i, up to m moves processed).  
No real optimization is possible since the robot can revisit the same cell or cross paths, so memoization is unlikely to help. Given that m is at most 500 (per problem limits), O(m²) is acceptable in practice.

### Corner cases to consider  
- The robot starts at a grid edge or corner.
- All moves are out-of-bounds from the start (1×1 grid).
- Instructions string is empty.
- Moves are a no-op (no moves).
- Long instruction string: verify no stack or memory overflow.
- Large grid, but startPos at the edge.

### Solution

```python
def executeInstructions(n, startPos, s):
    # Directions mapping: R = right, L = left, U = up, D = down
    delta = {'R': (0, 1), 'L': (0, -1), 'U': (-1, 0), 'D': (1, 0)}
    m = len(s)
    ans = []
    
    # For each possible instruction suffix starting at i
    for i in range(m):
        r, c = startPos
        count = 0
        # Try to execute moves from s[i:] as long as possible
        for ch in s[i:]:
            dr, dc = delta[ch]
            r += dr
            c += dc
            if 0 <= r < n and 0 <= c < n:
                count += 1
            else:
                break
        ans.append(count)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m²), where m = len(s). For each suffix (O(m)), we may process up to m moves, so O(m²) total.
- **Space Complexity:** O(m) for the output list and negligible (O(1)) for other variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a much larger string s, say where m=10⁶?
  *Hint: Is there a way to preprocess or use caching/memoization for overlapping suffixes?*

- What changes if the robot can "wrap" around the grid instead of being blocked?
  *Hint: Modify bounds checking to perform wrap-around (modulo arithmetic).*

- How would you extend this to 3D grids (n × n × n, instructions may include moving up and down in the z-axis)?
  *Hint: Add movement mappings for z-axis and generalize direction translation.*

### Summary
This problem uses the classic **simulation** coding pattern, where you directly track the problem statement's step-by-step logic. It's a textbook case of grid simulation, and the brute-force approach is optimal under provided limits. This pattern is useful in other robot navigation, bounded-walk, or game simulation problems where revisiting and state branching are allowed.

### Tags
String(#string), Simulation(#simulation)

### Similar Problems
- Out of Boundary Paths(out-of-boundary-paths) (Medium)
- Robot Return to Origin(robot-return-to-origin) (Easy)