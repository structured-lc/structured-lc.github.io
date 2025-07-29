### Leetcode 1025 (Easy): Divisor Game [Practice](https://leetcode.com/problems/divisor-game)

### Description  
Alice and Bob play a game with a number `n` on a chalkboard. They take turns; Alice starts first.  
On each turn, the current player picks any `x` such that `0 < x < n` and `n % x == 0` (i.e., `x` is a divisor of `n`). The player subtracts `x` from `n`, replacing `n` with `n - x`.  
The game continues until a player cannot make a move (i.e., when `n == 1`). That player loses.  
Determine if Alice can guarantee a win given `n`, assuming both play optimally.

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `True`  
*Explanation: Alice picks 1 (the only possible move), so n = 1, and Bob cannot move. Alice wins.*

**Example 2:**  
Input: `n = 3`  
Output: `False`  
*Explanation: Alice can only pick 1, so n = 2. Bob now picks 1, n = 1. Alice is stuck and loses.*

**Example 3:**  
Input: `n = 4`  
Output: `True`  
*Explanation: Alice has two options: pick 1 (n = 3) or pick 2 (n = 2).  
If she picks 1 (n = 3), Bob loses as shown earlier.  
If she picks 2 (n = 2), Bob picks 1 and loses. Either way, Alice can win.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
    - Try all possible moves for Alice each turn, simulating the game using recursion. On Alice’s turn, for every valid divisor x, recursively solve for (n - x) and see if there is any move where Alice forces Bob to lose.
    - If for some choice Alice can force a win, she wins.

- **Pattern Observation:**  
    - Compute for small values:  
        - n = 1: Lose  
        - n = 2: Win  
        - n = 3: Lose  
        - n = 4: Win  
    - Pattern: Alice wins if n is even, loses if n is odd.  
    - Why?  
        - If Alice starts with even n, she can always make n odd for Bob.  
        - Whatever odd x Bob picks, n = odd - odd = even. So, Alice always hands back an odd to Bob, and thus eventually Bob is stuck on n = 1.

- **Optimal Solution:**  
    - Simply return `n % 2 == 0`.

- **Trade-offs:**  
    - Brute-force or DP is possible but overkill for this specific game.

### Corner cases to consider  
- n = 1 (immediate loss for the starter)
- n is very large (should not cause performance issues)
- Ensure that the logic works for both small and very large values

### Solution

```python
def divisorGame(n: int) -> bool:
    # If n is even, Alice can always win using the pattern observation.
    return n % 2 == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
    - Just a parity check.

- **Space Complexity:** O(1)  
    - No extra space used.

### Potential follow-up questions (as if you’re the interviewer)  

- If both players play randomly, what is the probability that Alice wins?  
  *Hint: Try simulating several games and compare.*

- If the players can use divisors other than 1 (e.g., only prime divisors), how does that affect the outcome?  
  *Hint: Redefine the move set and look for new patterns.*

- Implement the solution using recursion or dynamic programming for practice.  
  *Hint: Simulate and memoize the win/lose status for each n.*

### Summary
This problem is classic game theory and parity (even-odd) analysis. The coding pattern is pattern recognition; the optimal move depends on maintaining an even/odd status.  
Related: “Nim Game”, “Stone Game”, and similar take-away games that rely more on mathematical insight than brute simulation.