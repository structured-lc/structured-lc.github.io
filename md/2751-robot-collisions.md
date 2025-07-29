### Leetcode 2751 (Hard): Robot Collisions [Practice](https://leetcode.com/problems/robot-collisions)

### Description  
You are given `n` robots, each with a unique position along a number line, a positive integer health, and a movement direction: either left (`'L'`) or right (`'R'`). All robots move simultaneously at the same speed (one unit per second) in their respective directions. If two robots meet at the same position at the same time, they collide. In a collision, the robot with lower health is destroyed; if both have the same health, both are destroyed. If one survives, its health decreases by 1. The task is to return the healths of the surviving robots, in the original order.

### Examples  

**Example 1:**  
Input:  
positions = `[5, 4, 3, 2, 1]`,  
healths = `[2, 17, 9, 15, 10]`,  
directions = `"RRRRR"`  
Output:  
`[2, 17, 9, 15, 10]`  
*Explanation: All robots move to the right; their paths never cross, so no collisions occur.*

**Example 2:**  
Input:  
positions = `[3, 5, 2, 6]`,  
healths = `[10, 10, 15, 12]`,  
directions = `"RLRL"`  
Output:  
``  
*Explanation:  
- After sorting by position:  
  positions = [2, 3, 5, 6],  
  healths = [15, 10, 10, 12],  
  directions = R, R, L, L  
- Collisions occur:  
  - The robot at 5(L) meets right-movers at 3(R) and 2(R). The collision outcome leaves only one robot alive (final health 14).*

**Example 3:**  
Input:  
positions = `[1, 2, 5, 6]`,  
healths = `[10, 10, 11, 11]`,  
directions = `"RLRL"`  
Output:  
`[]`  
*Explanation:  
- Sorted: [1, 2, 5, 6], [10, 10, 11, 11], [R, L, R, L]  
- Several collisions occur; ultimately, all robots are destroyed.*

### Thought Process (as if you’re the interviewee)  
Let’s start with the brute-force idea:  
Simulate all movements, for each time step, tracking robot positions and resolving collisions. This is very inefficient due to the unbounded space and time until all collisions play out.

To optimize:  
- **Observation:** Collisions only happen when a right-mover meets a left-mover at some position (robots going in the same direction never collide).
- **Sort robots by position:** This allows us to process robots as they might meet.
- Use a **stack** to simulate collision logic:  
  - As we iterate from left to right, for each robot:
    - If the robot moves right, push it onto the stack.
    - If moving left:
      - Pop stack elements (i.e., right-movers) and resolve collisions until either this left-mover is destroyed, the top right-mover is destroyed, or there are no right-movers left to collide with.
      - When two robots collide:
        - If their healths differ, one is destroyed, the survivor loses one health and may have future collisions.
        - If same health, both are destroyed.

This ‘monotonic stack’ pattern is typical for resolving sequential conflicts (used in Next Greater Element, Asteroid Collision, etc.).

Finally, collect and return healths for all surviving robots in original input order.

### Corner cases to consider  
- All robots moving in one direction (no collisions).
- Initial positions that are very close, but moving away—no collision.
- All robots destroy each other in a ‘chain reaction.’
- Robots with equal health hitting head-on.
- Only one robot in input.
- Robots with complex overlapping collisions.

### Solution

```python
from typing import List

def survivedRobotsHealths(positions: List[int], healths: List[int], directions: str) -> List[int]:
    # Create robots as: (position, health, direction, original_index)
    n = len(positions)
    robots = sorted(
        [(positions[i], healths[i], directions[i], i) for i in range(n)],
        key=lambda x: x[0]
    )
    
    stack = []  # stores indices of robots moving right

    # Copy healths so we can modify as per collision, start all as alive
    curr_health = [robot[1] for robot in robots]
    alive = [True] * n

    for idx, (pos, health, d, input_idx) in enumerate(robots):
        if d == 'R':
            stack.append(idx)
        else:
            # Collide with all 'R' on the stack
            while stack and curr_health[idx] > 0:
                r_idx = stack[-1]
                # Only right-moving robots can collide with left-movers
                if curr_health[r_idx] == 0:
                    stack.pop()
                    continue
                # Collision occurs: highest left-most 'R'
                if curr_health[r_idx] < curr_health[idx]:
                    # right robot dies, left loses 1 health
                    curr_health[r_idx] = 0
                    alive[r_idx] = False
                    curr_health[idx] -= 1
                    stack.pop()
                elif curr_health[r_idx] > curr_health[idx]:
                    # left robot dies, right loses 1 health
                    curr_health[r_idx] -= 1
                    curr_health[idx] = 0
                    alive[idx] = False
                    break
                else:
                    # Both destroyed
                    curr_health[r_idx] = 0
                    curr_health[idx] = 0
                    alive[r_idx] = False
                    alive[idx] = False
                    stack.pop()
                    break
            # If survived, do nothing (already marked alive)
            
    # Gather surviving robots' health, mapped back to original indices
    res = []
    for idx, (pos, health, d, input_idx) in enumerate(robots):
        if alive[idx] and curr_health[idx] > 0:
            res.append((input_idx, curr_health[idx]))
    # Sort back to input order
    res.sort()
    return [h for (_, h) in res]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) because of the initial sorting by position. Every robot is pushed/popped from the stack at most once, so the collision simulation is O(n).
- **Space Complexity:** O(n) for storing the stack, intermediate arrays, and robot objects.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cases where robots may start at the same position?  
  *Hint: Consider resolution order; are simultaneous collisions valid—should this be prevented or handled as unordered events?*

- Can this simulation be done with strictly O(1) extra space (in-place modification)?  
  *Hint: Can you encode state within the original arrays?*

- What if robots move at different speeds?  
  *Hint: Modeling the time and position at which two robots meet becomes necessary. More complicated collision resolution.*

### Summary
We used the **monotonic stack** approach after sorting to efficiently resolve robot collisions—each collision is managed as a local, sequential interaction. This stack pattern is common in problems involving sequential conflict or absorption (e.g., Asteroid Collision, Next Greater Element). The solution demonstrates a classic “build, sort, simulate with stack” design for efficiently resolving chain-reaction events in sequences.