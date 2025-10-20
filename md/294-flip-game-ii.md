### Leetcode 294 (Medium): Flip Game II [Practice](https://leetcode.com/problems/flip-game-ii)

### Description  
Given a string consisting of only `'+'` and `'-'`, imagine two players play a game, taking turns flipping any two consecutive `'++'` into `'--'`. The game ends when no such pair exists; the last player to make a move wins. You're the first player. Given the initial string `currentState`, determine if you can guarantee a win assuming both players play optimally.

### Examples  

**Example 1:**  
Input: `"++++"`  
Output: `True`  
*Explanation: The starting player can flip the middle "++" (positions 1 and 2) to make `"++--"`, and in the next moves, no matter how the opponent plays, the first player can always secure a win.*

**Example 2:**  
Input: `"+"`  
Output: `False`  
*Explanation: No possible move, so the first player cannot win.*

**Example 3:**  
Input: `"+-+-+"`  
Output: `False`  
*Explanation: There is no pair of consecutive "++" to flip, so the first player cannot make any move.*

### Thought Process (as if you’re the interviewee)  
First, I'd look for every spot where two consecutive `'+'`s appear. At each such location, I can flip them to `'--'` to create a new board state. Then I'd recursively see if, from there, the next player has a forced win. If *any* of my moves leads to a state where the opponent cannot win (i.e., `canWin(new_state)` is `False`), then I choose that move and win myself.  
The brute-force approach is to recursively try all such moves — but the state space grows exponentially, so we'll want to memoize results by storing win/loss status for state strings we've already checked.  
We only need to check all possibilities, so recursion plus memoization (i.e., backtracking with caching) gives optimal performance. Since the string is at most 20 characters (per constraints), this approach is feasible.

### Corner cases to consider  
- Empty string input: `""`
- String contains only `'-'`
- No two consecutive `'+'`
- Input of length 1, 2, or maximum (20: per one source. If 60 is the constraint, solution is still fine)
- Multiple ways to win/lose

### Solution

```python
def canWin(currentState: str) -> bool:
    # Memoization dictionary to cache outcomes for given states
    memo = {}

    def dfs(state: str) -> bool:
        if state in memo:
            return memo[state]
        # Try to flip every "++" to "--"
        for i in range(len(state) - 1):
            if state[i] == '+' and state[i+1] == '+':
                # After flipping, check if opponent can win; if not, I win
                new_state = state[:i] + "--" + state[i+2:]
                if not dfs(new_state):
                    memo[state] = True
                    return True
        memo[state] = False
        return False

    return dfs(currentState)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Exponential in worst case: O(2ⁿ), where n = length of `currentState`. However, memoization reduces the number of unique recursive calls since states can repeat, so practical performance is much better.

- **Space Complexity:**  
  O(2ⁿ) for the memoization storing each unique state, plus recursion stack up to O(n) depth.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize this for very large inputs?
  *Hint: Can you use a numeric or bitmask encoding to store and compare states efficiently?*

- Can you return the actual sequence of moves that guarantees a win (if possible)?
  *Hint: Keep track of operations leading to a win as you recurse.*

- Does the presence of multiple, disconnected '+' segments change your approach?
  *Hint: Can you solve for each segment independently and then combine results (similar to Nim)?*

### Summary
This problem is a classic *backtracking with memoization* scenario, closely related to game theory problems like Nim. The recursive structure checks all possible moves, with memoization caching each state to avoid redundant calculation.  
This approach (and pattern) is reusable in any "two-player, perfect information, alternating move" games where each move can be tried independently and the outcome depends on the resulting subgame: e.g., variants of coin flipping, stone removal, or word games.


### Flashcard
Recursive backtracking with memoization: try all "++" flips, check if opponent has no winning move from resulting state using cached results.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Memoization(#memoization), Game Theory(#game-theory)

### Similar Problems
- Nim Game(nim-game) (Easy)
- Flip Game(flip-game) (Easy)
- Guess Number Higher or Lower II(guess-number-higher-or-lower-ii) (Medium)
- Can I Win(can-i-win) (Medium)