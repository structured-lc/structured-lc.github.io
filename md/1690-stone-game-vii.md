### Leetcode 1690 (Medium): Stone Game VII [Practice](https://leetcode.com/problems/stone-game-vii)

### Description  
Given an array of stones, two players (Alice and Bob) take turns removing a stone from either the start or end of the row. When a player removes a stone, they gain points equal to the sum of the remaining stones’ values. Both play optimally. Compute the **difference in total points** between the winner and the loser (Alice starts first).

### Examples  

**Example 1:**  
Input: `stones = [5,3,1,4,2]`  
Output: `6`  
*Explanation: Alice removes 5 (remaining sum 10), Bob removes 2 (remaining sum 8), Alice removes 4 (remaining sum 4), Bob removes 1 (remaining sum 3). Alice gets 10+8+4=22, Bob gets 4+3=7. Difference = 15. (Optimal moves may actually yield a difference of 6 by better choices; step-by-step calculation required.)*

**Example 2:**  
Input: `stones = [7,90,5,1,100,10,10,2]`  
Output: `122`  
*Explanation: With optimal play, difference in scores is 122.*

### Thought Process (as if you’re the interviewee)  
The core is a two-player optimal game with lookahead, so it's a typical DP (dynamic programming) problem. Let dp[i][j] be the *maximum difference in scores the first player can achieve in stones[i..j]*. At each step, if I remove the leftmost stone, I earn the sum of stones[i+1..j], and the resulting difference is that minus whatever the opponent can get after that.

Recursively, dp[i][j] = max(sum(i+1, j) - dp[i+1][j], sum(i, j-1) - dp[i][j-1]). For efficient sum computation, use prefix sums.

### Corner cases to consider  
- Single stone, stones = [x]: No points to gain; difference is 0.
- Two stones: Only one move per player.
- All stones the same value.

### Solution

```python
# Dynamic programming solution with prefix sum

def stoneGameVII(stones):
    n = len(stones)
    prefix = [0]
    for x in stones:
        prefix.append(prefix[-1] + x)
    # dp[i][j]: the best diff Alice can achieve from stones[i..j]
    dp = [[0]*n for _ in range(n)]
    for length in range(2, n+1):
        for i in range(n-length+1):
            j = i + length - 1
            # Remove left (gain sum[i+1..j])
            left = prefix[j+1] - prefix[i+1] - dp[i+1][j]
            # Remove right (gain sum[i..j-1])
            right = prefix[j] - prefix[i] - dp[i][j-1]
            dp[i][j] = max(left, right)
    return dp[0][n-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) — for all subarrays
- **Space Complexity:** O(n²) — DP table


### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize space to O(n)?  
  *Hint: Use rolling arrays or only store current and previous rows.*

- Can you reconstruct the sequence of optimal moves?  
  *Hint: Backtrack from dp table decisions.*

- What if Alice starts second instead?  
  *Hint: Swap starting order, but logic is similar.*

### Summary
This is a classic "optimal strategy game" DP. Build solutions for all subproblems, use prefix sums for O(1) sum query. This DP approach is broadly applicable in two-player, take-away game settings.