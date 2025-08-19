### Leetcode 877 (Medium): Stone Game [Practice](https://leetcode.com/problems/stone-game)

### Description  
You are given an even number of piles arranged in a row, each pile contains a positive number of stones. Two players, Alice and Bob, take turns picking up an entire pile from either the start or end of the row. Alice always goes first. The game ends when all piles are taken. Both play optimally. Return `True` if Alice can guarantee a win (that is, end up with more stones than Bob), otherwise return `False`.

### Examples  

**Example 1:**  
Input: `piles = [5,3,4,5]`  
Output: `True`  
*Explanation: Alice takes 5 (from either end), Bob cannot prevent Alice from getting at least as many stones as him; in fact, the best Alice can do is get 10 vs Bob's 7.*

**Example 2:**  
Input: `piles = [3,7,2,3]`  
Output: `True`  
*Explanation: Alice takes 3 (start), Bob then can only take from the ends. Regardless, Alice can always guarantee to win.*

**Example 3:**  
Input: `piles = [1, 100, 2, 99]`  
Output: `True`  
*Explanation: Alice can always arrange her picks to take the larger of two adjacent piles each round, ending with more stones than Bob.*

### Thought Process (as if you’re the interviewee)  
Let's start by modeling the game: On each turn, a player can only pick from the two ends.

A brute-force idea is to try all possible ways Alice and Bob can pick, recursively simulating turns, and pick the maximum possible difference of stones Alice can achieve.

Let `dp(i, j)` represent the best *difference* Alice can achieve playing piles i to j. For each move:
- If Alice picks piles[i], then Bob plays optimally from (i+1 to j)
- If Alice picks piles[j], then Bob plays optimally from (i to j-1)

Recurrence:
- dp(i, j) = max(piles[i] - dp(i+1, j), piles[j] - dp(i, j-1))

The optimal difference can be positive or negative:
- If the final dp(0, n-1) > 0, Alice wins; otherwise, not.

However, because the number of piles is even and the total stones is odd, Alice always wins if both play optimally — there's a mathematical guarantee due to parity and turn order (Alice controls parity, she can always pick odd/even indexed piles)[1][2].

Thus, for this version of the problem, we can return `True` without computation. But a DP/recursive solution still works in O(n²) time for understanding or for slight variations where rules change[1][2][3].

### Corner cases to consider  
- piles of length 2: only two piles, direct win for Alice
- All piles are equal
- Maximum and minimum integer values in piles
- Only two unique values, alternating
- Descending and ascending order piles

### Solution

```python
def stoneGame(piles):
    # As per the problem's guarantee, Alice always wins with even piles and odd sum
    return True

# DP Solution for the full logic, if rules would change:
def stoneGameDP(piles):
    n = len(piles)
    # dp[i][j] = max stones Alice can get more than Bob in piles i..j
    dp = [[0]*n for _ in range(n)]
    for i in range(n):
        dp[i][i] = piles[i]
    for size in range(2, n+1):
        for i in range(n-size+1):
            j = i+size-1
            dp[i][j] = max(
                piles[i] - dp[i+1][j],
                piles[j] - dp[i][j-1]
            )
    return dp[0][n-1] > 0
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(1) for the always-True solution, since we just return.
  - O(n²) for the DP solution, as we compute each subarray interval (i, j).
- **Space Complexity:**  
  - O(1) for the always-True solution.
  - O(n²) for the DP array in the general solution.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of piles is *odd*?  
  *Hint: The mathematical guarantee doesn't hold; implement full DP.*

- What if we return the *score difference* instead of just true/false?  
  *Hint: Use the DP and return dp[n-1].*

- What if only Alice plays optimally but Bob doesn't?  
  *Hint: You have to simulate Bob's greedy moves rather than DP optimal response.*

### Summary
This problem is a classic **minimax/dynamic programming** game logic scenario, but in its Leetcode form, it is reduced to a parity trick because of constraints (even number of piles, odd sum) guaranteeing Alice's win. The DP pattern (`dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])`) is often used in competitive two-player “pick from ends” games. Variants of this appear in "Coins in a line", "Predict the Winner", and other two-player array games.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Game Theory(#game-theory)

### Similar Problems
- Stone Game V(stone-game-v) (Hard)
- Stone Game VI(stone-game-vi) (Medium)
- Stone Game VII(stone-game-vii) (Medium)
- Stone Game VIII(stone-game-viii) (Hard)
- Stone Game IX(stone-game-ix) (Medium)
- Strictly Palindromic Number(strictly-palindromic-number) (Medium)
- Visit Array Positions to Maximize Score(visit-array-positions-to-maximize-score) (Medium)