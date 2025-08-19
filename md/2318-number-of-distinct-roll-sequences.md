### Leetcode 2318 (Hard): Number of Distinct Roll Sequences [Practice](https://leetcode.com/problems/number-of-distinct-roll-sequences)

### Description  
You are given an integer n. You roll a fair 6-sided die n times. Find how many **distinct sequences of rolls** are possible, satisfying:

- **Adjacent rolls are coprime**: For every adjacent pair in the sequence, their greatest common divisor (GCD) is 1.  
- **Repetition rule**: The same die value cannot appear if there isn’t at least a gap of 2 between occurrences (i.e., the same value must be separated by at least 2 other rolls).

Return the total number of valid sequences modulo 1,000,000,007.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `6`  
*Explanation: All values 1–6 are possible for one roll.*

**Example 2:**  
Input: `n = 2`  
Output: `30`  
*Explanation: For each of the 6 choices for the first roll, there are only the numbers coprime to it available for the second roll (and not equal to the previous). There are 30 valid pairs in total.*

**Example 3:**  
Input: `n = 3`  
Output: `150`  
*Explanation: Similar logic: for each valid pair, there are a limited set of values for the third die (based on coprimality to previous, not equal to previous or the one before). For n=3, there are 150 total valid sequences.*

### Thought Process (as if you’re the interviewee)  
Let’s break it down:

- **Brute force**: Try all possible n-length sequences, filter ones that obey the two constraints. This is infeasible for large n: O(6ⁿ), clearly too slow.
- **Optimization**: Notice:
  - Each decision depends only on the previous two rolls (for the “gap of 2” constraint) and the most recent roll (for coprimality).
  - **DP state:** We can define dp[pos][prev1][prev2] = number of valid sequences for position pos, given that prev1 and prev2 were the last two die faces.
  - For each possible die value at position pos, check:
    - It’s coprime with prev1.
    - Not equal to prev1 or prev2.
  - Memoize DP to avoid redundant computations.
- **Base case:** At pos==n, return 1 (valid sequence completed).
- **Transition:** Try all die for the next roll, applying constraints.

**Trade-offs**: The key is that the state space is small: pos ≤ n, prev1/prev2 ∈ [0..6], so about n \* 7 \* 7 possible states, efficient under the problem constraints.

### Corner cases to consider  
- n = 1: Only six possible values, all are valid.
- n = 2: All pairs where numbers are coprime, and not repeated.
- n = 3+: Need to skip if die value equals prev1 or prev2.
- Handling prev1/prev2 = 0 on first two positions (i.e., no constraint if we haven’t rolled yet).
- Large n: Must avoid recomputation with efficient memoization.

### Solution

```python
MOD = 10 ** 9 + 7

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

from functools import lru_cache

def distinctSequences(n: int) -> int:
    # Precompute for coprimality: g[i][j] is True if i and j are coprime
    g = [[False] * 7 for _ in range(7)]
    for i in range(1, 7):
        for j in range(1, 7):
            if gcd(i, j) == 1:
                g[i][j] = True

    @lru_cache(maxsize=None)
    def go(pos, prev1, prev2):
        if pos == n:
            return 1
        res = 0
        for die in range(1, 7):
            if die != prev1 and die != prev2 and (prev1 == 0 or g[die][prev1]):
                res = (res + go(pos + 1, die, prev1)) % MOD
        return res

    return go(0, 0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 7 × 7 × 6). For each position (n total), prev1 (7), prev2 (7), we try up to 6 dice. But thanks to memoization, total DP calls ≤ n × 7 × 7. Each call does O(6) work.
- **Space Complexity:** O(n × 7 × 7) for the DP/memoization cache and O(1) for additional variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the die had k faces (instead of 6)?  
  *Hint: Generalize coprimality checks and DP grid to k instead of 6.*

- Can you optimize space if n is large and you only care about the numeric answer (not reconstructing the sequence)?  
  *Hint: Use rolling arrays for DP, as only last 2 prev states matter.*

- If we relax the coprimality constraint, how does this simplify the problem?  
  *Hint: Just handle the “gap of 2 same value” part, much simpler!*

### Summary
We use **top-down DP with memoization**, where each state is determined by the position and the last two rolled values. This is a classic DP/state compression pattern—tracking limited history to enforce roll constraints. This DP pattern is powerful for string/sequence construction under local windowed rules, and applies to scheduling, tiling, or Markov-model style problems.

### Tags
Dynamic Programming(#dynamic-programming), Memoization(#memoization)

### Similar Problems
- Dice Roll Simulation(dice-roll-simulation) (Hard)
- Paint House III(paint-house-iii) (Hard)