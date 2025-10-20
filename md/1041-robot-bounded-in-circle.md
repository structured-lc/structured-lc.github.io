### Leetcode 1041 (Medium): Robot Bounded In Circle [Practice](https://leetcode.com/problems/robot-bounded-in-circle)

### Description  
A robot starts at position (0, 0) on an infinite 2D plane, facing **North**. It is given a string of commands, where:
- `'G'`: move forward by 1 unit in the current direction,
- `'L'`: turn 90° to the left,
- `'R'`: turn 90° to the right.

The robot executes the sequence of commands once, then repeats the same sequence indefinitely. Determine if **the robot will always stay within some circle** (i.e., does not wander off to infinity). Return `True` if it does, else `False`.

### Examples  

**Example 1:**  
Input: `"GGLLGG"`  
Output: `True`  
*Explanation: The robot moves north 2 units, turns left twice (now facing south), and moves south 2 units, returning to (0, 0). Since it returns to the origin (or even if not, if after one cycle it's not facing north), repeating the cycle will keep it bounded.*

**Example 2:**  
Input: `"GG"`  
Output: `False`  
*Explanation: The robot moves north twice and remains facing north. Every cycle will move it further north to infinity. So it is unbounded.*

**Example 3:**  
Input: `"GL"`  
Output: `True`  
*Explanation: The robot moves north, turns left (faces west). Next cycle, it'll move west, then south, then east, eventually making a box and returning to origin. Its path is always inside a circle.*

### Thought Process (as if you’re the interviewee)  
Let’s try to simulate one cycle of the instructions:
- The robot starts at (0, 0), facing north.
- Each ‘G’ moves it in its current direction, ‘L’ and ‘R’ change its orientation.
- If after **one iteration**:
    - The robot is back at the origin: It will always repeat this cycle—**bounded**.
    - The robot is **not facing north**: In subsequent cycles, its path will curve and “spiral”, but over at most 4 cycles, it’ll repeat itself and remain in some circle—**bounded**.
    - The robot is **not at the origin and facing north**: Each cycle will move it in the same direction forever—**unbounded**.

Hence, after one pass:
- If the robot is **not facing north** after one cycle, or ends up **at the origin**, it is bounded.
- Otherwise, unbounded.

Optimized idea: Just simulate one pass, tracking position and direction. No need to simulate forever.

### Corner cases to consider  
- Instructions such as all `'L'` or all `'R'` (robot only rotates).
- Instructions with no `'G'` (only turns—never leaves origin).
- Mixed directions that “cancel out” movement.
- Repeated cycles, ensure you handle orientation wrap-around (using modulus).
- String of length 1.
- All movement in only one direction (all `'G'`).
- Multiple direction changes (e.g., "GLGLGLG").

### Solution

```python
def isRobotBounded(instructions: str) -> bool:
    # Directions: N, E, S, W
    dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # x, y transformations
    x, y = 0, 0           # Robot's position
    dir_idx = 0           # Facing North

    for cmd in instructions:
        if cmd == 'G':
            dx, dy = dirs[dir_idx]
            x += dx
            y += dy
        elif cmd == 'L':
            dir_idx = (dir_idx + 3) % 4   # Turn left: -1 mod 4
        elif cmd == 'R':
            dir_idx = (dir_idx + 1) % 4   # Turn right: +1 mod 4

    # Bounded if at the origin or not facing North
    return (x == 0 and y == 0) or (dir_idx != 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the length of the instruction string. Each instruction processed once.
- **Space Complexity:** O(1), only a few integers used; no extra space proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the robot started facing east or south rather than north?
  *Hint: How would you adjust your direction indexing/init?*

- Suppose instructions are streamed (very long/never-ending string)?
  *Hint: Can you still determine boundedness after reading a fixed window?*

- Can you return the minimum bounding circle radius instead of just True/False?
  *Hint: How many unique positions can the robot visit in 4 cycles?*

### Summary
This problem is a simulation + geometry cycle detection question. The key insight is that **robot orientation** and **position** after one cycle determine boundedness; you don’t actually need to run infinite cycles. This “directional state trick” is a common technique in robot simulation/grid traversal and can be applied to movement/cycle/bound problems in grids, mazes, and agent navigation.


### Flashcard
Simulate one cycle; robot is bounded if it returns to origin or is not facing north after one cycle.

### Tags
Math(#math), String(#string), Simulation(#simulation)

### Similar Problems
