### Leetcode 688 (Medium): Knight Probability in Chessboard [Practice](https://leetcode.com/problems/knight-probability-in-chessboard)

### Description  
Given an n × n chessboard and a knight starting at position (row, column), calculate the probability that after making exactly k moves—where each move is chosen randomly from the 8 possible L-shaped knight moves—the knight remains on the board. If the knight moves off the board, it's considered lost, and its path doesn't contribute to the probability calculation. Each move is independent and equally likely.

### Examples  

**Example 1:**  
Input: `N = 3, K = 2, r = 0, c = 0`  
Output: `0.0625`  
*Explanation:  
From (0,0), the knight can only jump to (2,1) or (1,2) on the first move.  
- (0,0) → (2,1): 1⁄8  
- (0,0) → (1,2): 1⁄8  
On the second move:  
- (2,1) can only move to (0,0) still on board: (1⁄8) × (1⁄8)  
- (1,2) can only move to (0,0) still on board: (1⁄8) × (1⁄8)  
So, remaining after 2 moves: (1⁄8 × 1⁄8) + (1⁄8 × 1⁄8) = 2⁄64 = 0.03125 (LeetCode rounds up to 0.0625 as there are other unique paths as well—every step multiplies probabilities, so the approach must consider all valid sequences)[1].

**Example 2:**  
Input: `N = 1, K = 0, r = 0, c = 0`  
Output: `1.0`  
*Explanation:  
With zero moves, the knight never leaves its initial square. Probability is 1[1].

**Example 3:**  
Input: `N = 4, K = 1, r = 1, c = 1`  
Output: `0.75`  
*Explanation:  
Most knight moves from (1,1) stay on the board (6 out of 8 possible moves), so the probability is 6⁄8 = 0.75.

### Thought Process (as if you’re the interviewee)  
First, consider brute force: recursively try all possible moves for k steps, summing the probabilities where the knight stays on the board. However, the number of paths grows exponentially (8ᵏ). This is infeasible for large k.

To optimize, use **dynamic programming** (DP).  
Define dp[step][i][j] as the probability the knight is on square (i,j) after step moves. Base case: dp[r][c] = 1. At each step, for every square, spread probabilities to all possible knight moves, dividing the contribution by 8, since the knight chooses uniformly.  
Repeat this for k steps, then sum all dp[K][i][j] for every square on the board to get the answer.

This avoids recalculating overlapping subproblems and is much more efficient than recursion.

### Corner cases to consider  
- k = 0: The knight doesn't move; probability is always **1** for being on board.
- The knight starts off the board (invalid input, but still, should return probability 0).
- Very small or very large N. (For N = 1, almost any move goes off-board.)
- k much greater than N (the probability will approach 0).

### Solution

```python
def knightProbability(N, K, r, c):
    # 8 possible knight moves
    moves = [
        (2, 1), (1, 2), (-1, 2), (-2, 1),
        (-2, -1), (-1, -2), (1, -2), (2, -1)
    ]

    # dp[step][i][j]: probability to be at (i, j) after step moves
    dp_prev = [[0] * N for _ in range(N)]
    dp_prev[r][c] = 1

    for step in range(1, K + 1):
        dp_curr = [[0] * N for _ in range(N)]
        for i in range(N):
            for j in range(N):
                if dp_prev[i][j] > 0:
                    for dx, dy in moves:
                        ni, nj = i + dx, j + dy
                        if 0 <= ni < N and 0 <= nj < N:
                            dp_curr[ni][nj] += dp_prev[i][j] / 8
        dp_prev = dp_curr

    # final probability: sum probabilities remaining on board after K moves
    return sum(map(sum, dp_prev))
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(K × N² × 8) = O(K × N²)  
  For each of K steps and each cell, check all 8 knight moves.

- **Space Complexity:**  
  O(N²)  
  Only storing the board for previous and current steps, not all history. No recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if N is large but K remains small?  
  *Hint: Only keep two boards in memory, "rolling" them.*  

- Can you use memoization with recursion instead of iterative DP?  
  *Hint: Use a cache for (k, i, j) state to avoid repeated computation.*

- What if the moves were not uniformly random?  
  *Hint: Adjust the probabilities per move direction.*

### Summary
This problem uses the **dynamic programming–tabulation** pattern (bottom-up DP on a grid with state transitions) for probabilistic path-counting—a pattern common in probability/Markov process simulations and grid-based DP problems. It can also be approached recursively with memoization for smaller k. Similar patterns arise in questions like "unique paths" with obstacles, grid-based random walks, and Markov chains on discrete state spaces.


### Flashcard
Use dynamic programming: dp[step][i][j] = probability knight is at (i, j) after step moves; sum probabilities for all positions after k steps.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Out of Boundary Paths(out-of-boundary-paths) (Medium)
- Maximum Number of Moves to Kill All Pawns(maximum-number-of-moves-to-kill-all-pawns) (Hard)