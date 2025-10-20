### Leetcode 789 (Medium): Escape The Ghosts [Practice](https://leetcode.com/problems/escape-the-ghosts)

### Description  
You are placed at the starting point (0, 0) on an infinite 2-D grid and need to reach a target point (target, target[1]).  
There are several ghosts on the grid, each starting from their own position ghosts[i] = [xᵢ, yᵢ].  
On each move, you and all ghosts can move 1 unit in the four cardinal directions (north, east, west, or south), all simultaneously.  
You only escape if you reach the target *before* any ghost reaches it. If any ghost reaches the target at the same time as you (or earlier), you lose.  
Determine if it is possible for you to escape under any scenario.  

### Examples  

**Example 1:**  
Input: `ghosts = [[1,0],[0,3]]`, `target = [0,1]`  
Output: `true`  
*Explanation: You start at (0,0).  
Your Manhattan distance to the target is 1 (abs(0-0) + abs(0-1)).  
Ghosts at (1,0) and (0,3) have distances 2 and 3 to the target, so neither can reach the target before you do. Hence, you can escape.*

**Example 2:**  
Input: `ghosts = [[1,0]]`, `target = [2,0]`  
Output: `false`  
*Explanation: You start at (0,0).  
You need 2 moves to reach (2,0).  
Ghost at (1,0) needs 1 move to (2,0), so the ghost can wait for you at the target. Thus, escape is not possible.*

**Example 3:**  
Input: `ghosts = [[2,0]]`, `target = [1,0]`  
Output: `false`  
*Explanation: 
- You: from (0,0) to (1,0), 1 move.
- Ghost: from (2,0) to (1,0), 1 move.
Since the ghost can reach the target at the same time as you, escape is not possible.*

### Thought Process (as if you’re the interviewee)  
First, let's focus on the definition of "escape": I have to reach the target strictly before any ghost; if a ghost reaches at the same time or earlier, I fail.  
Since both I and the ghosts can move one step per turn (in any direction), and all moves happen simultaneously, it's impossible to "outrun" a ghost if it is closer to the target or could tie the arrival.  
So, for each ghost, I’ll compute its minimal number of moves to the target (using the Manhattan distance), and compare it with mine from (0,0). If even one ghost can get there at the same time or faster, I can't escape.

**Brute-force idea:**  
- Try to simulate all possible movements for ghosts and me. This is exponential and unnecessary since both players try to reach the target in minimal moves, and detours would only slow them down.

**Optimized approach:**  
- Use Manhattan distance for both:  
    dist_you = |target| + |target[1]|  
    dist_ghost = |ghost_x - target| + |ghost_y - target[1]|
- If every ghost is strictly farther away (in Manhattan distance), I can escape; if any ghost is closer or as close, I cannot.

### Corner cases to consider  
- Ghosts at same position as target: you can never escape.
- Ghosts at starting position (0,0).
- Ghosts at distance exactly equal to yours.
- Negative coordinates for ghosts or target.
- Multiple ghosts with different (closer/farther) starting positions.
- target is (0,0).

### Solution

```python
def escapeGhosts(ghosts, target):
    # Calculate player's Manhattan distance to the target
    my_dist = abs(target[0]) + abs(target[1])

    # For each ghost, calculate their Manhattan distance to the target
    for ghost in ghosts:
        ghost_dist = abs(ghost[0] - target[0]) + abs(ghost[1] - target[1])
        # If any ghost can reach the target as fast as or faster than you, you cannot escape
        if ghost_dist <= my_dist:
            return False

    # If all ghosts are strictly farther, escape is possible
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of ghosts. For each ghost, we compute a Manhattan distance (constant time per ghost).
- **Space Complexity:** O(1) extra space, since only a fixed number of variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- If ghosts could move diagonally or more than one tile per turn, how would you change your approach?  
  *Hint: Think about the metric for minimal moves; would Manhattan distance still apply?*

- How would you modify the solution if you and the ghosts can move at different speeds?  
  *Hint: Factor speed into your distance calculations before comparing.*

- What if there are obstacles or forbidden cells on the grid?  
  *Hint: Instead of direct Manhattan distance, pathfinding algorithms (BFS/A*) may be needed.*

### Summary
This problem leverages the property of **Manhattan Distance** as a minimal-step metric on a grid with up/down/left/right movement, making the solution both straightforward and efficient.  
The key insight is that you only need to check whether you are strictly closer to the target than all ghosts—no simulation is necessary.  
This is an example of the **greedy pattern** for shortest-path in grid movement without obstacles. Variations of this arise frequently in grid-based shortest-reach problems.


### Flashcard
Escape if your Manhattan distance to the target is strictly less than every ghost’s; otherwise, you cannot escape.

### Tags
Array(#array), Math(#math)

### Similar Problems
- Cat and Mouse II(cat-and-mouse-ii) (Hard)