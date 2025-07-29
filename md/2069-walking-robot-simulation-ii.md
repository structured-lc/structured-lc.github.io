### Leetcode 2069 (Medium): Walking Robot Simulation II [Practice](https://leetcode.com/problems/walking-robot-simulation-ii)

### Description  
A robot moves on the border of a rectangular grid of size `width × height` (width and height ≥ 2).  
- It starts at (0, 0), facing East (right).
- Calling `step(num)` advances the robot by `num` steps along the boundary (in the order: East → North → West → South, then loops).
- If the robot hits a corner, it turns left and continues (always stays on the edge).
- `getPos()` returns current [x, y].
- `getDir()` returns the string direction: "East", "North", "West", or "South".

You need to implement the robot's logic so it moves efficiently for any number of steps, possibly many times around the rectangle.

### Examples  

**Example 1:**  
Input:  
`Robot(6, 3)`  
`step(2)`  
`getPos()`  
`getDir()`  
`step(2)`  
`getPos()`  
`getDir()`  

Output:  
`[2, 0]`  
`"East"`  
`[4, 0]`  
`"East"`  
*Explanation: Start at (0,0), move 2 steps East to (2,0), still facing East.  
After another 2 steps, go to (4,0), still East.*

**Example 2:**  
Input:  
`Robot(6, 3)`  
`step(2)`  
`step(2)`  
`step(2)`  
`step(2)`  
`getPos()`  
`getDir()`  

Output:  
`[0, 1]`  
`"North"`  
*Explanation:  
Start at (0,0) → [2,0] → [4,0] (East), next step turns to North at (5,0), so moves to (5,1) and keeps going.*

**Example 3:**  
Input:  
`Robot(4, 4)`  
`step(20)`  
`getPos()`  
`getDir()`  

Output:  
`[0, 0]`  
`"South"`  
*Explanation:  
Rectangle perimeter is 12. The robot completes 1 loop (12 steps), 20 - 12 = 8 more steps, which returns to (0,0) but the direction becomes "South" because the last move ends at the starting point from the South side.*

### Thought Process (as if you’re the interviewee)  
First, I'd clarify how the robot moves: it is only allowed to move along the boundary (edges), not the inside. If told to move more than the perimeter, it loops as many times as needed and then continues with the remainder.

**Brute-force:**  
One can simulate moving 1 step at a time, changing direction as required. This is simple but inefficient if `num` is very large. Each step must update position and direction, and turning at corners.

**Optimization:**  
Precompute the border path (sequence of all edge positions in order). But storing all, say, 1e6 perimeter points could use lots of space.

**Further Optimization:**  
Instead of storing the path, notice that the border path is predictable and the total number of steps in a loop is always `perimeter = 2 × (width + height - 2)`. So, for any `k` steps, we can compute final position and direction by moving segment by segment.  
On each direction, the robot should move as many as possible along that edge, then turn (modulo the remaining steps) through each edge.

- Always track:
  - current position (x, y)
  - current direction (East, North, West, South)
- For each direction, compute how many steps to edge, move min(remaining, steps available), then turn left and repeat.

Special case: If after a full loop returns to (0,0), the direction should be "South".

This keeps both time and space at O(1) per operation.

### Corner cases to consider  
- Tiny rectangles (width=2 or height=2).
- Steps that end exactly on a corner, especially the starting point (check direction returned).
- Multiple full loops in one command.
- Repeated calls to `step` that cross corners without landing exactly.
- Position wrapping after many loops.
- Direction when ending at (0,0) at end of a full loop.

### Solution

```python
class Robot:

    def __init__(self, width: int, height: int):
        # Directions: East (right), North (up), West (left), South (down)
        self.dirs = [(1, 0), (0, 1), (-1, 0), (0, -1)]
        self.dir_names = ["East", "North", "West", "South"]
        self.width = width
        self.height = height
        # Total steps in a boundary loop: 2(width + height - 2)
        self.perimeter = 2 * (width + height - 2)
        self.x, self.y = 0, 0  # Start at (0, 0)
        self.dir_idx = 0       # 0: East

    def step(self, num: int) -> None:
        # Take num mod perimeter, unless num is 0
        k = num % self.perimeter
        # Special rule: if at (0,0), facing East, and k==0, after 1+ loops, direction becomes South.
        if k == 0 and self.x == 0 and self.y == 0:
            self.dir_idx = 3  # South
            return

        while k > 0:
            # Compute steps available in current direction before next turn
            if self.dir_idx == 0:    # East, moving (1, 0)
                step_to_edge = self.width - 1 - self.x
            elif self.dir_idx == 1:  # North, moving (0, 1)
                step_to_edge = self.height - 1 - self.y
            elif self.dir_idx == 2:  # West, moving (-1, 0)
                step_to_edge = self.x
            else:                    # South, moving (0, -1)
                step_to_edge = self.y

            move = min(k, step_to_edge)
            self.x += self.dirs[self.dir_idx][0] * move
            self.y += self.dirs[self.dir_idx][1] * move
            k -= move

            # If k == 0, we are done
            if k == 0:
                break
            # Otherwise, turn left at the corner and continue
            self.dir_idx = (self.dir_idx + 1) % 4

    def getPos(self) -> [int]:
        return [self.x, self.y]

    def getDir(self) -> str:
        return self.dir_names[self.dir_idx]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per API call (getPos, getDir, step), since segments are constant and each call does bounded work.
- **Space Complexity:** O(1); only a few variables used, regardless of grid size; no extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- Can the robot move to any cell inside the rectangle, not just the border?  
  *Hint: How would you need to change your move and direction logic?*

- What if the robot starts at a different position or direction?  
  *Hint: Generalize starting state to any edge cell and initial direction.*

- If the robot can only make a limited number of turns, how would you simulate with that constraint?  
  *Hint: You may need to record turns and stop or error if limit exceeded.*

### Summary
This problem uses **simulation along a rectangular path**, optimizing via border-perimeter arithmetic to eliminate unnecessary step-by-step simulation. The approach leverages cycle-based math and direction management for constant-time boundary movement, a pattern useful in *cycle detection, path simulation, and toroidal/looped movement problems* (such as robotic vacuum simulators or board games with fixed tracks).