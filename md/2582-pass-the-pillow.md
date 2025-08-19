### Leetcode 2582 (Easy): Pass the Pillow [Practice](https://leetcode.com/problems/pass-the-pillow)

### Description  
Given *n* people standing in a line, labeled 1 to n, the first person holds a pillow. Each second, the pillow is passed to the next person in the line. When it reaches the last person, the direction reverses, and it goes back toward the first person. This back-and-forth passing continues. Return the index (1-based) of the person holding the pillow after *time* seconds.

### Examples  

**Example 1:**  
Input: `n = 4, time = 5`  
Output: `2`  
*Explanation: Passes: 1 → 2 → 3 → 4 → 3 → 2. After 5 seconds, person 2 holds the pillow.*

**Example 2:**  
Input: `n = 3, time = 2`  
Output: `3`  
*Explanation: Passes: 1 → 2 → 3. After 2 seconds, person 3 holds the pillow.*

**Example 3:**  
Input: `n = 5, time = 7`  
Output: `4`  
*Explanation: Passes: 1 → 2 → 3 → 4 → 5 → 4 → 3 → 2. After 7 seconds, person 4 holds the pillow.*

### Thought Process (as if you’re the interviewee)  
First, I thought to simulate each second by keeping a 'current' pointer and direction (forward or backward). But this is inefficient for large values.  
  
Notice that whenever the pillow reaches one end (person 1 or person n), the direction reverses. One full "cycle" (from 1 to n and back to 1) takes 2×(n-1) seconds.

If we count how many complete forward or backward traversals we've done, we can figure out both the current direction and effective offset:
- Each (n-1) seconds, the pillow hits an endpoint, which changes the direction.
- Let cycles = time // (n-1)
- let remainder = time % (n-1)
- If cycles is even, we move forward (from 1), offset by remainder.
- If cycles is odd, we move backward (from n), offset by remainder.

This math approach gives us O(1) solution and avoids unnecessary simulation.

### Corner cases to consider  
- n == 1 (single person; should always return 1 regardless of time)
- time == 0 (pillow hasn’t been passed yet; should be person 1)
- time exactly lands on an endpoint (direction flips right after)
- Large n or time (should not cause overflow or timeout)
- n == 2 (direction keeps reversing every second)

### Solution

```python
def pass_the_pillow(n: int, time: int) -> int:
    # Calculate how many times the pillow has reached an end
    cycles = time // (n - 1)
    remainder = time % (n - 1)
    
    # If cycles is even, direction is forward (from 1 to n)
    if cycles % 2 == 0:
        return 1 + remainder
    # If cycles is odd, direction is backward (from n to 1)
    else:
        return n - remainder
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), because all operations are simple arithmetic.
- **Space Complexity:** O(1), no extra storage or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the circle was "circular" (person n passes to person 1 directly instead of reversing)?
  *Hint: Modulo arithmetic with n instead of bouncing direction.*

- How would you handle this if instead of 1-second intervals, each person had a list of custom pass times?
  *Hint: Prefix sum to find at which point the time falls.*

- Can you generalize to k directions (not just two)?
  *Hint: Track direction phases; adjust the index calculation per phase.*

### Summary
This problem is a classic case of periodic array/path traversal with direction reversal, similar to a simulation of a "ping pong" or "bouncing pointer". The key insight is to realize the passing forms a repeating cycle; thus, it can be solved using simple division and modulo arithmetic for efficient O(1) computation. Problems with repeated forward-backward traversals, alternating patterns, or periodic state changes often benefit from this pattern.

### Tags
Math(#math), Simulation(#simulation)

### Similar Problems
- Find the Student that Will Replace the Chalk(find-the-student-that-will-replace-the-chalk) (Medium)