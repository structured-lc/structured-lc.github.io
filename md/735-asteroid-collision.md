### Leetcode 735 (Medium): Asteroid Collision [Practice](https://leetcode.com/problems/asteroid-collision)

### Description  
Given a list of integers representing **asteroids** in a row, each asteroid's direction and size are given by its sign and absolute value, respectively:
- A **positive** value means the asteroid is moving right.
- A **negative** value means it's moving left.
When two asteroids moving in opposite directions meet, a collision occurs:
- The **smaller asteroid explodes**.
- If they're equal in size, **both explode**.
- Asteroids moving in the same direction never collide.
Return the state of the asteroids after all collisions.

### Examples  

**Example 1:**  
Input: `[5, 10, -5]`  
Output: `[5, 10]`  
*Explanation: 10 and -5 collide. 10 survives as it is bigger. 5 moves right and never meets -5.*

**Example 2:**  
Input: `[8, -8]`  
Output: `[]`  
*Explanation: 8 and -8 collide. Both are the same size; both explode.*

**Example 3:**  
Input: `[10, 2, -5]`  
Output: ``  
*Explanation: 2 and -5 collide → -5 survives. -5 and 10 then collide; 10 survives, as it's larger in size.*

### Thought Process (as if you’re the interviewee)  
A brute-force attempt might try to simulate the collision at every pair, but that's unnecessarily complex and inefficient. Instead, note that **collisions can only happen between a right-moving asteroid (positive) and a left-moving asteroid (negative) when they meet**.

Using a **stack** is optimal:
- Iterate through each asteroid.
- If the current asteroid is moving right, push it to the stack.
- If moving left, while the stack is not empty and the last asteroid is moving right, check for collisions:
  - If the top right-moving asteroid is **smaller** (abs value), it pops—keep checking for more collisions.
  - If equal, **both explode** (pop and move on).
  - If the right-mover is **bigger**, the incoming asteroid explodes—stop the collision checks.
- Finally, the stack holds the remaining asteroids in order.

This is efficient (O(n)) since each asteroid is processed a limited number of times.

### Corner cases to consider  
- Empty input: `[]`
- All moving in one direction (all positive or all negative)
- Multiple consecutive collisions (chain reactions)
- Asteroids of equal size meeting
- Only one asteroid
- Non-colliding sequences (e.g., negative at start, positives at end)

### Solution

```python
def asteroidCollision(asteroids):
    stack = []
    for ast in asteroids:
        # Track if current asteroid survives after all possible collisions
        alive = True
        while stack and ast < 0 < stack[-1]:
            # Collision: compare right-mover (stack[-1]) and left-mover (ast)
            if abs(stack[-1]) < abs(ast):
                stack.pop()  # right-moving asteroid explodes
                continue     # continue to check with previous right-mover
            elif abs(stack[-1]) == abs(ast):
                stack.pop()  # both explode
                alive = False
                break
            else:
                alive = False  # left-moving asteroid explodes
                break
        if alive:
            stack.append(ast)
    return stack
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each asteroid is pushed and popped from the stack at most once, leading to linear time.
- **Space Complexity:** O(n) — In the worst case (no collisions), all asteroids are stored on the stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input size is huge (e.g., stream of asteroids)?  
  *Hint: Can you process and output in chunks, or do you always need all of them in memory?*

- How would you handle 2D/extra dimensions (asteroids with x, y, direction)?  
  *Hint: Would your stack model generalize? Do you need a different simulation approach?*

- Suppose some asteroids can split, or new asteroids appear after collisions—how would your approach change?  
  *Hint: Think about how to track "new" asteroids and simulate chain reactions further.*

### Summary
This problem uses the **stack simulation** pattern: pushing and popping elements based on conditional state transitions. It’s common in scenarios with sequential, one-directional interactions (see: Valid Parentheses, Daily Temperatures, Next Greater Element). The key is efficiently tracking chain-reaction events and only keeping survivors, making it ideal for stack use.


### Flashcard
Use a stack to track right-moving asteroids; when left-moving asteroid arrives, pop smaller right-moving ones until collision resolves or stack empty.

### Tags
Array(#array), Stack(#stack), Simulation(#simulation)

### Similar Problems
- Can Place Flowers(can-place-flowers) (Easy)
- Destroying Asteroids(destroying-asteroids) (Medium)
- Count Collisions on a Road(count-collisions-on-a-road) (Medium)
- Robot Collisions(robot-collisions) (Hard)