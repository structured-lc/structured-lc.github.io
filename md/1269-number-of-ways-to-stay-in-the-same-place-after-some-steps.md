### Leetcode 1269 (Hard): Number of Ways to Stay in the Same Place After Some Steps [Practice](https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps)

### Description  
You're on an infinite number line: initially at position 0. On each step, you can move left, right, or stay in the same place—but you can't go left beyond 0 or right beyond arrLen-1 (effectively, you can move only within an array of size arrLen). In total, you take `steps` moves. **How many different ways can you end up at index 0 after all steps?** Return the answer modulo 10⁹ + 7.

### Examples  
**Example 1:**
Input: `steps = 3, arrLen = 2`
Output: `4`
*Explanation: The four ways are (R, L, S), (L, S, R), (S, L, R), (S, S, S)—using Right, Left, Stay (and respecting bounds).* 

**Example 2:**
Input: `steps = 2, arrLen = 4`
Output: `2`
*Explanation: Only (R,L) and (S,S) will stay at 0 after 2 steps.*

**Example 3:**
Input: `steps = 4, arrLen = 2`
Output: `8`
*Explanation: All combinations that never move out of bounds.*

### Thought Process (as if you’re the interviewee)  
This is a **Dynamic Programming** problem, tracking the number of ways to get to each index at step s. At each step, from each possible position, we can go left (i-1), stay (i), or right (i+1)—but not past boundaries. 
- The max index you can actually reach is min(steps, arrLen-1), since any move past this can't be made with steps moves.
- Use a DP table: dp[step][pos] = number of ways to reach `pos` at `step` steps.
- Transition: dp[step][pos] = dp[step-1][pos] (stay) + dp[step-1][pos-1] (left) + dp[step-1][pos+1] (right), within bounds.

### Corner cases to consider  
- arrLen larger than steps (cannot move farther than steps)
- arrLen == 1 (can only stay at 0)
- Only one move allowed
- Very large number of steps (needs modulus)

### Solution

```python
MOD = 10**9 + 7

def numWays(steps, arrLen):
    max_pos = min(steps, arrLen - 1)

    # DP: previous step's positions
    prev = [0] * (max_pos + 1)
    prev[0] = 1
    for s in range(1, steps + 1):
        curr = [0] * (max_pos + 1)
        for p in range(0, max_pos + 1):
            # Stay
            curr[p] = prev[p]
            # Move left
            if p > 0:
                curr[p] = (curr[p] + prev[p-1]) % MOD
            # Move right
            if p < max_pos:
                curr[p] = (curr[p] + prev[p+1]) % MOD
        prev = curr
    return prev[0]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(steps × k), k = min(steps, arrLen) — For each step, update up to k positions
- **Space Complexity:** O(k) — only previous and current rows needed

### Potential follow-up questions (as if you’re the interviewer)  
- What if the allowed moves (directions) change at each step?  
  *Hint: Adjust the transition for each step.*

- Can you reconstruct one of the valid paths?  
  *Hint: Backtrack from dp table, recording choices.*

- What if you want to count the number of ways to end up at any given position?  
  *Hint: Return dp[steps][target_pos].*

### Summary
This problem is a classic **bounded 1D DP** (state compression), reusing rows for efficiency. The pattern often appears in random walks, probability paths, and state machine transitions constrained by boundaries.


### Flashcard
Use DP: dp[step][pos] = ways to reach pos at step; transition by moving left, right, or staying, bounded by steps and arrLen.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Number of Ways to Reach a Position After Exactly k Steps(number-of-ways-to-reach-a-position-after-exactly-k-steps) (Medium)