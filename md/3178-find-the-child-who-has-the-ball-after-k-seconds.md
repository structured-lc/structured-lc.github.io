### Leetcode 3178 (Easy): Find the Child Who Has the Ball After K Seconds [Practice](https://leetcode.com/problems/find-the-child-who-has-the-ball-after-k-seconds)

### Description  
Given n children sitting in a row (numbered 0 to n-1), a ball starts at child 0 and is passed to the next child every second. The ball always starts moving right. When it reaches either end (0 or n-1), the direction reverses and continues. You are given n and k (seconds). After k seconds, which child has the ball?  
Your task: return the index of the child holding the ball after k seconds.

### Examples  

**Example 1:**  
Input: `n = 3, k = 5`  
Output: `1`  
*Explanation: Ball moves as follows: 0→1 (1s), 1→2 (2s), 2→1 (3s), 1→0 (4s), 0→1 (5s). So after 5 seconds, child 1 has the ball.*

**Example 2:**  
Input: `n = 5, k = 10`  
Output: `2`  
*Explanation: Ball path: 0→1→2→3→4→3→2→1→0→1→2 (10 steps). After k=10 steps, child 2 has the ball.*

**Example 3:**  
Input: `n = 2, k = 3`  
Output: `1`  
*Explanation: Ball moves: 0→1 (1s), 1→0 (2s), 0→1 (3s). Ends at child 1.*

### Thought Process (as if you’re the interviewee)  
Start by thinking how the ball moves:
- Ball moves linearly, changing direction at ends.
- This forms a periodic sequence: right to the end, left to the start, repeat.

**Brute-force:**  
- Simulate second-by-second, changing direction at ends.
- O(k) time. Works, but not efficient for large k.

**Optimized:**  
- The ball's path repeats every cycle of 2 × (n–1) seconds (out and back).
- After full cycles, only care about position within the current cycle.
- Compute position: pos = k % (2 × (n–1))
- Move right for pos < n, then left (mirror) for remaining.
- So if pos < n, return pos, else return (2×(n–1)) – pos
- This reduces time to O(1) and works for all inputs.

**Why this works**:  
- Motion is symmetric, and position at time t depends only on current phase in the repeated sequence.

### Corner cases to consider  
- n = 1 (Only one child, always index 0)
- n = 2 (Reverses every second)
- k = 0 (Ball hasn't moved, child 0)
- Large k (many cycles completed)
- k exactly at an endpoint (e.g., ball at child n–1 or 0 right after reversal)

### Solution

```python
def numberOfChild(n: int, k: int) -> int:
    # Edge case: only one child
    if n == 1:
        return 0

    round_len = 2 * (n - 1)      # One round = right to left, then back
    pos = k % round_len          # Position in current round

    # If still moving right
    if pos < n:
        return pos
    # If moving left (backwards)
    else:
        return round_len - pos
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Just arithmetic calculations, no iteration.

- **Space Complexity:** O(1)  
  Uses only constant extra variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle input if the children were arranged in a circle rather than a line?
  *Hint: Passing never reverses direction; can use (k % n).*

- What if you had to output the sequence of children holding the ball each second up to k?
  *Hint: Simulate with a loop, collect indices in a list.*

- Suppose each child can also drop the ball with certain probability at each pass. How would you simulate expected positions?
  *Hint: Use a stochastic simulation or expected-value analysis with a Markov chain.*

### Summary
This problem leverages **cycle detection** and periodicity. The key insight is recognizing the repeating back-and-forth sequence, allowing for direct O(1) computation instead of brute-force simulation. This cyclic-movement pattern appears in problems involving "bounce" motion, periodic schedules, or circular queues, making the approach widely applicable in both technical interviews and real-world systems.