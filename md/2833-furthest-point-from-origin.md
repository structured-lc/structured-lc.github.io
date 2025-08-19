### Leetcode 2833 (Easy): Furthest Point From Origin [Practice](https://leetcode.com/problems/furthest-point-from-origin)

### Description  
Given a string moves, where each character is either 'L', 'R', or '_', simulate movements along a number line starting at the origin (position 0).  
- 'L' means move left by 1.
- 'R' means move right by 1.
- '_' is flexible: each can be either left or right (your choice).
Find the maximum possible distance you can be from the origin after performing all moves, by optimally assigning each '_'.

### Examples  

**Example 1:**  
Input: `moves = "L_RL__R"`  
Output: `3`  
*Explanation: Convert every '_' to 'L' (or all to 'R'):  
"L R L L L R" ⇒ −1 (L), +1 (R), −1 (L), −1 (L), −1 (L), +1 (R) → total: -2  
The furthest is 3 (absolute value of -3 or +3 is possible).*

**Example 2:**  
Input: `moves = "___"`  
Output: `3`  
*Explanation: All are '_', so assign all to the same direction: either −3 or +3.*

**Example 3:**  
Input: `moves = "LLLR"`  
Output: `2`  
*Explanation: −1 (L), −1 (L), −1 (L), +1 (R): Net = −2. Furthest possible distance is 2.*

### Thought Process (as if you’re the interviewee)  
A brute-force approach would try every possible way to assign each '_' as 'L' or 'R' — but that’s exponential in n (2ⁿ).  
Instead, observe that:
- To maximize distance from origin, you want to maximize the imbalance (difference) between 'L' and 'R'.
- Assign all '_' to favor the direction (left or right) that is already larger.  
Thus, count:
- countL = number of 'L'
- countR = number of 'R'
- count_ = number of '_'  
The maximum possible absolute value from the origin is:  
distance = |countL − countR| + count_

This is because each '_' can be converted to further maximize the dominant direction.

### Corner cases to consider  
- Empty input string: Result is 0.
- All moves are '_': Result is string length.
- All moves are 'L' or all are 'R': Result is string length.
- Equal number of 'L' and 'R' with '_' present.
- No '_': Just |countL − countR|.

### Solution

```python
def furthestDistanceFromOrigin(moves: str) -> int:
    # Count steps to the left, right, and the flexible '_'
    count_L = 0
    count_R = 0
    count_ = 0

    for c in moves:
        if c == 'L':
            count_L += 1
        elif c == 'R':
            count_R += 1
        else:  # must be '_'
            count_ += 1
    # Furthest distance = abs(L - R) + count_
    return abs(count_L - count_R) + count_
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We process each character in the moves string exactly once.
- **Space Complexity:** O(1). Only a few integer variables for counting; no extra space depends on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if moves contained invalid characters?  
  *Hint: Consider input validation or sanitization of moves.*

- How would you modify the logic if '_' could represent a *zero* move instead?  
  *Hint: Would not add to either direction; only count L and R.*

- If the moves were in a 2D grid (e.g., 'U', 'D', 'L', 'R', and '_') and '_' could be any direction—how would you find the furthest distance from origin?  
  *Hint: Consider vector addition for both axes and maximize along a direction.*

### Summary
This is a classic greedy/counting problem — you maximize the net distance by counting the 'L', 'R', and optimally assigning all '_' to one side.  
The logic is simple: maximize |countL − countR| by using all available unconstrained moves ('_') to further bias the net movement.  
The pattern is common in problems that allow flexible assignment to maximize or minimize a metric (e.g., consecutive operations, maximizing imbalance).  
Similar strategies are seen in array manipulation, flipping, or when there's a “wildcard” operator that can be freely assigned.

### Tags
String(#string), Counting(#counting)

### Similar Problems
- Robot Return to Origin(robot-return-to-origin) (Easy)