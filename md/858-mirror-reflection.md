### Leetcode 858 (Medium): Mirror Reflection [Practice](https://leetcode.com/problems/mirror-reflection)

### Description  
You are given a **square room** with side length `p`. On three corners, there are **receptors** labeled `0`, `1`, and `2`. The southwest corner (bottom-left) is the source of a laser beam that starts off and first hits the eastern wall at height `q` (distance from receptor `0`). The ray then continues to reflect off the room's mirrored walls until it hits one of the receptors. **Determine which receptor it hits first**.

### Examples  

**Example 1:**  
Input: `p = 2, q = 1`  
Output: `2`  
*Explanation: The laser travels in a straight line and bounces off the walls. It reflects once off the east wall, then hits the north wall at corner labeled `2`.*

**Example 2:**  
Input: `p = 3, q = 1`  
Output: `1`  
*Explanation: The beam bounces around the room; after a series of reflections, it finally lands at receptor `1` (top-right corner).*

**Example 3:**  
Input: `p = 4, q = 4`  
Output: `0`  
*Explanation: The beam will hit receptor `0` directly without reflecting off any walls since `q` is aligned for a direct hit.*

### Thought Process (as if you’re the interviewee)  
Let's break down the problem in steps:
- **Brute-force idea**: Simulate each reflection of the laser through the room. Check coordinates after every bounce until it lands exactly on a corner. This would work but be inefficient and complex for larger values.
- **Observation**: Because the room and all reflections are symmetrical, "unfolding" the room into repeated adjacent rooms (mirrored tiles) turns the laser's path into a straight line. The problem becomes: after how many room-widths up and right does the beam land on a corner?
- **Mathematical insight**: The number of times the beam travels up and right before reaching a receptor is tied to the **least common multiple (LCM) of `p` and `q`**:
    - Number of vertical bounces (up): LCM(p, q) / q
    - Number of horizontal bounces (right): LCM(p, q) / p
- **Determine destination**:
    - If vertical bounces is **even**: receptor 0 (directly across east wall).
    - If vertical bounces is **odd** and horizontal bounces is **odd**: receptor 1 (top-right).
    - If vertical bounces is **odd** and horizontal bounces is **even**: receptor 2 (top-left).
- **Optimized approach**: Use math, not simulation, for constant time answer using GCD to compute LCM.

### Corner cases to consider  
- `q = 0`: Laser goes straight to receptor 0 without reflecting.
- `q = p`: Laser goes straight to the opposite wall and lands at an edge.
- `p % q == 0` or `q % p == 0`: Multiples could cause immediate or multiple reflections.
- Large values of `p` and `q`: Should not cause overflow/efficiency issues because math is simple.

### Solution

```python
def mirrorReflection(p: int, q: int) -> int:
    # Helper to compute gcd
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    # Find LCM of p and q
    lcm = p * q // gcd(p, q)

    # Number of vertical and horizontal bounces
    vertical_bounces = lcm // q
    horizontal_bounces = lcm // p

    if vertical_bounces % 2 == 0:
        return 0
    elif horizontal_bounces % 2 == 1:
        return 1
    else:
        return 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₀(max(p, q)))  
  The only non-constant operation is GCD calculation (Euclid's algorithm), which is logarithmic.
- **Space Complexity:** O(1)  
  Uses a constant amount of extra space for variables.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose you want to trace the entire **path** of the laser until it hits the receptor.  
  *Hint: Simulate reflections and track each point; consider mirroring and tiling the room across axes.*

- What if the number of reflections allowed is **limited**?  
  *Hint: Add a counter to the simulation. Return -1 if the count limit is reached before hitting a receptor.*

- How would you generalize to a **rectangular room** (not square; sides of length `a` and `b`)?  
  *Hint: Replace `p` with `a` for horizontal calculations and use `b` for vertical.*

### Summary
The problem is a classic example of **mathematical geometry and symmetry**. Instead of brute-force simulation, we use the properties of mirrors and the idea of "tiling" the room with straight-line paths. The approach leverages **GCD** and **LCM** for efficient computation. This pattern recurs in problems involving cyclical behaviors, periodic paths, or geometric optics, and can apply in billiards, repeating cycles, or lattice travels.