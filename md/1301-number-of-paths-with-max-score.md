### Leetcode 1301 (Hard): Number of Paths with Max Score [Practice](https://leetcode.com/problems/number-of-paths-with-max-score)

### Description  
Given a square board as an array of strings, each cell contains a character: 'S' (start, lower-right), 'E' (end, upper-left), a digit ('1'-'9'), or 'X' (obstacle). You can move from 'S' to 'E' by going up, left, or diagonally up-left at each step. Skip over 'X' cells. Collect the digits you pass through (excluding 'S' and 'E') to maximize your score. Return two integers:
- The **maximum sum** you can collect along any path from 'S' to 'E'.
- The **number of different paths** that allow you to achieve this maximum score (modulo 10⁹ + 7).
If no path exists, return `[0, 0]`.

### Examples  
**Example 1:**  
Input: `["E23","2X2","12S"]`  
Output: `[7,1]`  
*Explanation: Only one path: S → (2) → (2) → (3) → E. Sum = 2+2+3=7, 1 path.*

**Example 2:**  
Input: `["E12","1X1","21S"]`  
Output: `[4,2]`  
*Explanation: Two max score paths, both with sum 4. S→1→1→2→E or S→2→1→E.*

**Example 3:**  
Input: `["E11","XXX","11S"]`  
Output: `[0,0]`  
*Explanation: There is no possible path from S to E due to obstacles.*


### Thought Process (as if you’re the interviewee)  
- First, we recognize that this is a **grid DP** problem. At each cell, you want to record both:
  - The **maximum score** possible to reach this cell.
  - The **number of ways** to achieve that score.
- We can use a DP table `dp[i][j] = (max_score, num_paths)` for each cell, filled from bottom-right ('S') to top-left ('E').
- For each cell, look to the three cells you can come from: (down, right, down-right). For each, if reachable and not an 'X', pull its (score, ways). Take the largest score, sum up the number of ways among those cells that got to this score, and add the digit of the current cell (if it's a digit, not 'S'/'E').
- Obstacle cells are skipped. For 'S', paths start at (score=0, ways=1); for 'E', do not add its value to score, just treat it like a normal cell.
- If at the end no path exists to 'E' (score remains at initial invalid value at dp), return [0,0].


### Corner cases to consider  
- All paths blocked by 'X': return [0, 0].
- 'S' or 'E' is next to an obstacle, reducing possible directions to one or zero.
- Board size 1x1 or 2x2.
- Multiple max-score paths.
- No digits on the path, so max score is 0.


### Solution

```python
from typing import List

def pathsWithMaxScore(board: List[str]) -> List[int]:
    n = len(board)
    MOD = 10**9 + 7
    # dp[i][j] = (max_score, num_paths)
    dp = [[(-1, 0) for _ in range(n)] for _ in range(n)]
    # Start from 'S' (bottom-right)
    dp[n-1][n-1] = (0, 1)

    for i in range(n-1, -1, -1):
        for j in range(n-1, -1, -1):
            if board[i][j] == 'X':
                continue
            # Do not count S and E's digits
            cell_value = 0
            if board[i][j].isdigit():
                cell_value = int(board[i][j])
            # Find previous max_score among (down, right, down-right)
            max_score = -1
            num_paths = 0
            for dx, dy in ((1, 0), (0, 1), (1, 1)):
                ni, nj = i + dx, j + dy
                if 0 <= ni < n and 0 <= nj < n:
                    score, ways = dp[ni][nj]
                    if score == -1:
                        continue
                    new_score = score + cell_value
                    if new_score > max_score:
                        max_score = new_score
                        num_paths = ways
                    elif new_score == max_score:
                        num_paths = (num_paths + ways) % MOD
            # For 'S', skip (keep as initialized)
            if (i, j) != (n-1, n-1) and max_score != -1:
                dp[i][j] = (max_score, num_paths % MOD)
    result_score, result_paths = dp[0][0]
    if result_score == -1 or result_paths == 0:
        return [0, 0]
    return [result_score, result_paths]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²), as we visit every cell once and check up to 3 neighbors.
- **Space Complexity:** O(n²), for the DP table storing (score, ways) per cell.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the allowed moves were extended to all eight directions?
  *Hint: Update neighbors list, but check if score/ways logic generalizes and consider possible cycles.*

- How would your solution change for a very large, sparse board?
  *Hint: Consider memoization with DFS instead of full tabulation, or compress the DP.*

- What if you had to output all actual paths that give the maximum score?
  *Hint: Need to store not just counts, but also backtrack via path-building.*

### Summary
This uses a **dynamic programming** pattern on grids, maintaining for each cell both the optimal-score and number of paths. The DP state stores a tuple (score, ways), and each cell considers its three possible incoming neighbors, propagating scores/ways toward the top-left. This is a classic 2D DP table problem, broadly applicable to many grid navigation and optimal-path variants.


### Flashcard
Use DP from bottom-right to top-left, tracking both max score and number of ways to reach each cell; for each cell, consider moves from down, right, and down-right.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
