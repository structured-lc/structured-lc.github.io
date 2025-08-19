### Leetcode 2849 (Medium): Determine if a Cell Is Reachable at a Given Time [Practice](https://leetcode.com/problems/determine-if-a-cell-is-reachable-at-a-given-time)

### Description  
Given an infinite 2D grid, you are at starting position (**sx**, **sy**). You want to reach position (**fx**, **fy**) in **t** seconds.  
- At each second, you **must move to one of the 8 adjacent cells**, including diagonals (i.e., up, down, left, right, or any of the four diagonals).
- The same cell can be visited more than once.
Return **True** if it is possible to reach (**fx**, **fy**) from (**sx**, **sy**) in exactly **t** seconds; otherwise, return **False**.

### Examples  

**Example 1:**  
Input: `sx=2, sy=4, fx=7, fy=7, t=6`  
Output: `True`  
*Explanation: The maximum of |7-2|=5 and |7-4|=3 is 5, which means you can reach the target in 5 seconds by always moving diagonally when possible, and you can spend 1 extra step moving back and forth or looping. Since t=6 ≥ 5, return True.*

**Example 2:**  
Input: `sx=3, sy=1, fx=7, fy=3, t=2`  
Output: `False`  
*Explanation: The minimum required steps is max(|7-3|, |3-1|) = max(4,2) = 4. Since t=2 < 4, it is impossible to reach the target.*

**Example 3:**  
Input: `sx=1, sy=1, fx=1, fy=1, t=3`  
Output: `True`  
*Explanation: You start and end at the same cell. Since t>1, you can leave and come back, possibly looping around, and stand at (1,1) again at exactly t seconds.*

**Example 4:**  
Input: `sx=1, sy=1, fx=1, fy=1, t=1`  
Output: `False`  
*Explanation: You must "move" on each time step, so at t=1 you must leave (1,1). It's impossible to return to your starting cell in only 1 step.*

### Thought Process (as if you’re the interviewee)  
- At every second, you **must move to an adjacent cell**. Diagonal movement allows shortening travel time: to reach (fx, fy) from (sx, sy), the **minimum time is max(|fx-sx|, |fy-sy|)**.
  - Reason: You can close both dx, dy distances simultaneously by moving diagonally until one coordinate aligns, then just move along one axis.
- If t < minimum required steps, **impossible**.
- If t = minimum required steps, **possible**.
- If t > minimum steps, is it always possible?
  - Yes, unless a special case: If **start == finish** (i.e., you're already at the target) and t == 1, it's impossible, because you must leave and you can't return in one move to the original cell.
  - If t > 1 and start == finish, you can leave and return with sufficient steps (e.g., loop around), so it's possible.

- So, the core logic is:
  - If start == finish: return (t != 1)
  - Else: return (min_steps ≤ t)
- Brute-force simulation unnecessary: Minimum steps calculation with max(dx, dy) is enough and handles all movement efficiently.

### Corner cases to consider  
- Start and finish are the same, t == 1 (must be False)
- Start and finish are the same, t > 1 (True)
- t < min_steps (False)
- t = min_steps (True)
- Large grid (no limitation)
- Negative coordinates (grid is infinite)
- t = 0 (only possible if start == finish and t != 1)

### Solution

```python
def isReachableAtTime(sx, sy, fx, fy, t):
    dx = abs(fx - sx)
    dy = abs(fy - sy)
    # If start and finish are the same
    if dx == 0 and dy == 0:
        return t != 1
    # Else, minimum needed is max(dx, dy)
    return max(dx, dy) <= t
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Only basic arithmetic and a comparison; no loops or recursion.
- **Space Complexity:** O(1)  
  Uses only constant extra space for variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if movement were only allowed in 4 directions (no diagonals)?  
  *Hint: Try using Manhattan distance instead of max(dx, dy).*

- What if you were restricted from revisiting a cell?  
  *Hint: You'd need to track visited cells, and this could raise reachability issues in limited grids or with obstacles.*

- How would you approach this on a finite grid with obstacles?  
  *Hint: You’d use BFS/DFS and consider obstacles and visited states.*

### Summary
This problem uses the **minimum steps calculation for 8-directional movement** on a grid (Chebyshev distance).  
The main pattern is recognizing how the minimum number of steps is governed by max(dx, dy) for diagonal-capable grids, and dealing carefully with the must-move constraint when start == finish. This pattern appears in grid pathfinding with varying allowed moves, and is a classic interview problem for understanding movement dynamics and edge case reasoning.

### Tags
Math(#math)

### Similar Problems
- Reaching Points(reaching-points) (Hard)