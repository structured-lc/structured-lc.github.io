### Leetcode 3320 (Hard): Count The Number of Winning Sequences [Practice](https://leetcode.com/problems/count-the-number-of-winning-sequences)

### Description  
You are given a string `s` representing Alice's moves in a game similar to Rock-Paper-Scissors, using moves: 'F', 'W', and 'E'. For each position, Bob must also choose a move ('F', 'W', or 'E'), with the property that *Bob cannot pick the same move as in the previous round*. Bob wins a round if his move beats Alice's (using some fixed cyclical rule like rock-paper-scissors). Bob wins the sequence if he wins **more rounds than Alice**.  
Count how many possible move sequences Bob can choose to win, modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `s = "FWE"`  
Output: `3`  
Explanation.  
Suppose:  
- Bob's options: never repeat prev move, 3 choices each turn except the first.  
Possible win sequences (e.g. "WFW", "FWF", "WEW") where Bob wins > Alice.

**Example 2:**  
Input: `s = "FFE"`  
Output: `1`  
Explanation.  
Carefully enumerate options: Only one valid move sequence for Bob lets him win more rounds than Alice.

**Example 3:**  
Input: `s = "FW"`  
Output: `1`  
Explanation.  
Smaller string, only one sequence gives Bob more wins than Alice.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible sequences for Bob (\(3^{n}\), since 3 options per move, except can’t repeat move; actually, fewer because of restriction). For each, count Bob vs Alice wins; keep if Bob wins > Alice.

- **Optimization:**  
  Use **dynamic programming** plus memoization.  
  - State: for each position `i`, current score difference (Bob wins - Alice wins), last move Bob played.
  - For each move, if it's not equal to last, try it, update score diff by round result:
    - If Bob wins the round, +1; loses, -1; draw, 0.
  - Only keep cases where after n rounds, Bob won more than Alice (score diff > 0).

  Memoize `(i, score_diff, last_move)` to avoid recomputation.

- **Why this works:**  
  Only care about relative score difference and last move (to prevent repeats), not actual move history.  
  Time: O(n² × 3).

### Corner cases to consider  
- Empty string (`s=""`): No moves, should return 0 (cannot win).
- All same moves: test that no repeated moves can be exploited.
- All ties: ensure does not count as win.
- Minimal length (1 or 2).
- Bob never able to win: ensure output is 0.
- Bob must always alternate moves (length > 1).

### Solution

```python
MOD = 10**9 + 7

def countWinningSequences(s):
    # Map the moves to indices: F=0, W=1, E=2
    move_map = {'F': 0, 'W': 1, 'E': 2}
    n = len(s)
    
    from functools import lru_cache

    # Helper to compute result for Bob's move vs Alice's move
    def judge(a, b):
        # returns: 1 if Bob wins, -1 if Bob loses, 0 if tie
        if a == b:
            return 0
        # Win conditions: (Bob, Alice): (0,2), (1,0), (2,1)
        if (b, a) in [(0,2), (1,0), (2,1)]:
            return 1
        return -1

    @lru_cache(None)
    def dp(i, diff, last_bob):
        # i: index in s, diff: Bob wins - Alice wins so far, last_bob: prev Bob move (0/1/2), -1 for first round
        if i == n:
            # At end, does Bob have more wins?
            return 1 if diff > 0 else 0
        total = 0
        for bm in range(3):
            if bm == last_bob:
                continue
            # Current round result
            res = judge(move_map[s[i]], bm)
            total = (total + dp(i+1, diff + res, bm)) % MOD
        return total

    return dp(0, 0, -1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
    For every position (n), difference (up to 2n+1 options since can be negative), and last move (3 values), so O(n×n×3) == O(n²).
- **Space Complexity:** O(n²).  
    DP memoization stores for each position, difference, and last_move.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the moves set is larger than 3 (e.g. k moves)?
  *Hint: How would you generalize the DP state and win-logic?*

- What if Bob can repeat a move k times in a row (like up to twice, not strict no-repeat)?
  *Hint: Add to DP state a counter of consecutive moves or history.*

- Can you output not just the total count, but reconstruct one such winning sequence efficiently?
  *Hint: Use parent pointers during DP or supplement with path reconstruction step.*

### Summary
Dynamic programming with memoization, tracking current position, score difference, and last move, provides an efficient way to generate all non-repeating-move sequences for Bob such that he wins.  
This pattern—**DP over position, summary state, and history**—is common for sequence/restriction/turn-based games, and appears in problems about generating valid move strings, subarray games, or simulating adversarial sequences.