### Leetcode 1140 (Medium): Stone Game II [Practice](https://leetcode.com/problems/stone-game-ii)

### Description  
Alice and Bob are playing a game with a row of piles of stones, where each pile has a positive number of stones (`piles[i]`).  
Alice goes first, and they take turns.  
On each turn, the current player can take all stones from the first `X` remaining piles, where `1 ≤ X ≤ 2 × M` (`M` starts at 1).  
After taking `X` piles, `M` is updated to `max(M, X)`.  
Play continues until all piles are taken.  
Both play optimally, and the goal is to maximize Alice’s number of stones.

### Examples  

**Example 1:**  
Input: `piles = [2,7,9,4,4]`,  
Output: `10`  
*Explanation: Alice can take 1 pile (2 stones), Bob then takes 2 piles (7+9=16), then Alice takes the last 2 piles (4+4=8). Alice totals 2+8=10 stones.*

**Example 2:**  
Input: `piles = [1,2,3,4,5,100]`,  
Output: `104`  
*Explanation: Optimal play allows Alice to take 1 pile (1), Bob takes 2 piles (2+3), Alice then can take the rest (4+5+100=109). But the optimal approach is Alice taking more in the first move, leading to her gaining 104 stones total.*

**Example 3:**  
Input: `piles = [1]`,  
Output: `1`  
*Explanation: Only one pile; Alice takes it all.*

### Thought Process (as if you’re the interviewee)  
Start by considering brute force: For every choice of how many piles to take (`X`), recursively calculate the remainder of the game.  
But this is exponential time – we need to memoize states to avoid recomputation.

Key state:  
- The index of the current pile we process (start position)
- Current value of M  

So, for each state (index, M), store and reuse the result — classic DP with memoization.

The main DP question: At position i with current M, what's the **maximum stones Alice can get**?  
Simulate all choices for X from 1 to min(2 × M, remaining piles), letting the opponent make the next optimal move.  
We want to **maximize** Alice’s score, which is **sum of taken stones + (remaining stones - maximum Bob can get in his turn)**.

At each DP call, we aim to get the best possible score for the current player if both play optimally.

This is optimal because it simulates both players trying to maximize their own stones at every decision.

### Corner cases to consider  
- Only one pile: Alice collects everything.
- All piles of length 1.
- M gets much larger than length of remaining piles: must cap choices to remaining stones.
- Long input arrays (test memoization works efficiently).
- Equal pile sizes (forces tie-breaking by lookahead).
- Large numbers in last piles.

### Solution

```python
def stoneGameII(piles):
    n = len(piles)
    # suffix_sum[i]: total stones from i to end
    suffix_sum = [0] * (n + 1)
    for i in range(n - 1, -1, -1):
        suffix_sum[i] = piles[i] + suffix_sum[i + 1]

    from functools import lru_cache
    
    # dp(i, m): max stones Alice can get starting from pile i with current M=m
    @lru_cache(maxsize=None)
    def dp(i, m):
        if i >= n:
            return 0
        max_stones = 0
        # Try taking X piles, X in 1..min(2 * m, n-i)
        for x in range(1, min(2 * m, n - i) + 1):
            # Stones taken now: suffix_sum[i] - suffix_sum[i + x]
            # Next player starts at i + x, new M = max(m, x)
            # Bob will take best from remaining


### Flashcard
Use DP with memoization; for each state (index, M), try all X (1 ≤ X ≤ 2M), recursively maximize stones for current player.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum), Game Theory(#game-theory)

### Similar Problems
- Stone Game V(stone-game-v) (Hard)
- Stone Game VI(stone-game-vi) (Medium)
- Stone Game VII(stone-game-vii) (Medium)
- Stone Game VIII(stone-game-viii) (Hard)
- Stone Game IX(stone-game-ix) (Medium)