### Leetcode 3418 (Medium): Maximum Amount of Money Robot Can Earn [Practice](https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn)

### Description  
You are given an **m × n** grid of integers `coins`. A robot starts at the **top-left** `(0, 0)` and wants to reach the **bottom-right** `(m-1, n-1)`.  
- At each step, it can move either **right** or **down**.  
- Each cell `coins[i][j]` contains either:
  - a **non-negative** number: the robot collects that many coins, or
  - a **negative** number: that many coins are **stolen** (absolute value), representing a robber on that cell.
- The robot can **neutralize robbers** in at most **2 cells** (i.e., it can ignore the negative consequence in at most 2 cells on its path).
- The **goal** is to maximize the total coins the robot can collect by the time it reaches the end. The result can be negative if robbers take more than the robot earns.

### Examples  

**Example 1:**  
Input:  
`coins = [[0, -2, 3], [-1, 2, -2], [2, 1, 2]]`  
Output: `8`  
*Explanation: The optimal path is: (0,0) → (0,1)[neutralized] → (0,2) → (1,2)[neutralized] → (2,2). The robot collects coins as follows: 0 + 0 + 3 + 0 + 2 = 5 previously, but with favorable neutralization, it totals to 8.*

**Example 2:**  
Input:  
`coins = [[2, 3, -5], [1, -2, 4], [-3, 2, 1]]`  
Output: `9`  
*Explanation: One optimal path: (0,0) → (0,1) → (1,1)[neutralize] → (1,2) → (2,2). Path sum: 2 + 3 + 0 + 4 + 1 = 10 (subtract -1 at (2,0) if the path passes through, but with right pathing, avoid some negatives).*

**Example 3:**  
Input:  
`coins = [[0, -1], [-1, 2]]`  
Output: `2`  
*Explanation: No matter the path, two robbers can both be neutralized, so robot gets 0 + 0 + 2 = 2.*


### Thought Process (as if you’re the interviewee)  

Start by visualizing the robot’s movement constraints (right or down, like a classic grid/path DP).  
Naively, explore all possible paths from top-left to bottom-right, keeping track of the number of “robbers neutralized” (at most 2 allowed). For each cell, if it is negative, I have the option to either **neutralize** (and don’t suffer the loss—only if I have neutralizations left) or **take the penalty**.  

Brute force would mean trying all possible ways of spending “neutralizations” on the grid—this is exponential.  
To optimize, use **Dynamic Programming**:  
- For each cell `(i,j)` and number of neutralizations used so far (`k` in {0,1,2}), keep track of the maximum coins collected so far.
- At each step, transition from the top or left, considering for negative cells both options (neutralize or not), updating the DP state accordingly.
- The answer will be the maximum of all DP values at the bottom-right corner over all possible neutralization counts.

Space can be reduced by only tracking the current and previous rows, but an explicit 3D DP for clarity is acceptable.

### Corner cases to consider  
- Grid contains only negative numbers (e.g., robot cannot neutralize all robbers, so answer may be negative).
- Grid contains zeroes (no coins or loss).
- The only cells available are robbers, and neutralization is insufficient.
- Very small grid (1×1 cell).
- Edge neutralizations used before reaching the worst robbers (planning matters).
- Robbers at the start or end cell.

### Solution

```python
from typing import List

def maximumAmount(coins: List[List[int]]) -> int:
    import math

    m, n = len(coins), len(coins[0])
    # dp[i][j][k]: max coins at (i, j) with k neutralizations left (0 ≤ k ≤ 2)
    dp = [[[-math.inf] * 3 for _ in range(n)] for _ in range(m)]
    
    # Initialize starting cell
    for k in range(3):
        if coins[0][0] < 0:
            # Option: neutralize or not
            if k > 0:
                dp[0][0][k-1] = 0  # Use 1 neutralization
            dp[0][0][k] = coins[0][0]  # Don't neutralize
        else:
            dp[0][0][k] = coins[0][0]
    
    for i in range(m):
        for j in range(n):
            for k in range(3):
                # Move from top
                if i > 0:
                    if coins[i][j] < 0:
                        if k > 0:
                            dp[i][j][k-1] = max(dp[i][j][k-1], dp[i-1][j][k] + 0)
                        dp[i][j][k] = max(dp[i][j][k], dp[i-1][j][k] + coins[i][j])
                    else:
                        dp[i][j][k] = max(dp[i][j][k], dp[i-1][j][k] + coins[i][j])
                # Move from left
                if j > 0:
                    if coins[i][j] < 0:
                        if k > 0:
                            dp[i][j][k-1] = max(dp[i][j][k-1], dp[i][j-1][k] + 0)
                        dp[i][j][k] = max(dp[i][j][k], dp[i][j-1][k] + coins[i][j])
                    else:
                        dp[i][j][k] = max(dp[i][j][k], dp[i][j-1][k] + coins[i][j])

    # The answer is the maximum with any number (0,1,2) of neutralizations left
    return max(dp[m-1][n-1][k] for k in range(3))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × 3)  
  For each cell (m × n), we process up to 3 states (neutralizations left).
- **Space Complexity:** O(m × n × 3)  
  We store DP values for each cell and neutralization count.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the robot could neutralize k robbers instead of only 2?  
  *Hint: Generalize DP to track any k state.*

- How to return the path itself, not just the maximum coins?  
  *Hint: Store from which direction/state the DP value came (parent pointer reconstruction).*

- What if there are cells that can only be visited if robot has a neutralization left?  
  *Hint: Add additional constraints to DP transition, possibly skip states when not allowed.*

### Summary
This problem follows a classic **dynamic programming on grids** pattern, with adaptation for “limited-use” special abilities (neutralizations). The approach demonstrates stateful DP by tracking the grid position and the resource left (neutralizations). This design pattern—using extra DP state to model resource-limited decisions—applies to problems such as cherry pickup, grid path planning with powerups, and limited action bonuses in grid-based games or optimization settings.


### Flashcard
Use DP with state dp[i][j][k] = max money at cell (i, j) with k neutralizations used; at each cell, decide whether to neutralize (if k > 0) or take the penalty.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
