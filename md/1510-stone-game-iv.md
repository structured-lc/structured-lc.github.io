### Leetcode 1510 (Hard): Stone Game IV [Practice](https://leetcode.com/problems/stone-game-iv)

### Description  
Given an integer n, two players (Alice and Bob) take turns removing a non-zero square number of stones from a pile of n stones. The player who cannot make a move loses. Assuming both play optimally and Alice plays first, return true if Alice wins the game, otherwise false.

### Examples  
**Example 1:**  
Input: `n = 1`  
Output: `true`  
*Explanation: Alice removes 1 stone and wins.*

**Example 2:**  
Input: `n = 2`  
Output: `false`  
*Explanation: Alice can only remove 1; Bob takes 1 and wins.*

**Example 3:**  
Input: `n = 7`  
Output: `false`  
*Explanation: No sequence of square numbers Alice can pick guarantees her a win.*

**Example 4:**  
Input: `n = 17`  
Output: `true`  
*Explanation: Alice can always respond so Bob is left with a pile of 0 at the end.*

### Thought Process (as if you’re the interviewee)  
First idea: Try all moves using recursion (DFS/backtracking), but that's exponential and times out fast. Can we avoid re-exploring subproblems? Yes—this is a classic DP (Dynamic Programming) game theory problem because subproblems repeat: The state is just the number of stones left. The key property: If there is *any* move that forces the next player into a losing state, current state is winning, else it is losing. Thus, we define dp[k] = True if the first player can force a win with k stones, otherwise False. Base case: dp = False (nothing to play, current player loses). For every dp[n], check all square numbers <= n, see if dp[n - square] is a *losing* state for the opponent. If so, Alice can force a win from n stones. DP runs in O(n * sqrt(n)).

### Corner cases to consider  
- n = 1 (smallest positive n)
- n = 0 (not allowed, but worth considering)
- n is a perfect square
- Large n (performance test)

### Solution

```python
def winnerSquareGame(n: int) -> bool:
    # dp[i] is True if Alice can force a win with i stones remaining
    dp = [False] * (n + 1)
    for k in range(1, n + 1):
        x = 1
        while x * x <= k:
            # If removing x*x stones leaves opponent in losing state, Alice can win
            if not dp[k - x * x]:
                dp[k] = True
                break
            x += 1
    return dp[n]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n × √n), since for each integer k we try every square ≤ k.
- **Space Complexity:** O(n), space to hold DP states for each number of stones.

### Potential follow-up questions (as if you’re the interviewer)  
- What if players can remove any cube number of stones?
  *Hint: Replace x*x with x^3 in the DP transition.*

- How would you print the actual winning move sequence?
  *Hint: Store prev-state or choices alongside DP.*

- Can you optimize space?
  *Hint: Only previous dp values are needed; array is minimal already.*

### Summary
This problem uses classical DP patterns in combinatorial game theory. Knowing if a state is 'winning' or 'losing' for the first player is key—DP encodes the answer for every state. This approach works for a large class of games (e.g., Nim, coin games) and is a foundational competitive programming and interview pattern.
