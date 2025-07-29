### Leetcode 1406 (Hard): Stone Game III [Practice](https://leetcode.com/problems/stone-game-iii)

### Description  
You are given an array of integers `stoneValue`, where each element represents the value of a stone in a row. Alice and Bob take turns; each turn, a player can take 1, 2, or 3 stones from the *start* of the row. Each tries to maximize their own total. The player with more points wins, or it's a "Tie" if both have the same score. Your task: Return "Alice" if Alice wins, "Bob" if Bob wins, or "Tie".

### Examples  

**Example 1:**  
Input: `stoneValue = [1,2,3,7]`  
Output: `"Bob"`  
*Explanation: Alice takes 1, Bob takes [2,3,7]=12 -> highest, Bob wins.*

**Example 2:**  
Input: `stoneValue = [1,2,3,-9]`  
Output: `"Alice"`  
*Explanation: Alice can win by optimal play (take 1, give Bob 2/3, etc).*

**Example 3:**  
Input: `stoneValue = [1,2,3,6]`  
Output: `"Tie"`  
*Explanation: Both can tie if play optimally.*

### Thought Process (as if you’re the interviewee)  
- This is a two-player prefix game: at each position, we can pick 1–3 stones and the rest becomes a subproblem.
- Use dynamic programming: for each index, compute maximum score difference Alice can achieve from that point on, if both play optimally.
- State: dp[i] = maximum score difference Alice can achieve (her score minus Bob's) starting at i.
- Recurrence: try all 1–3 picks, calculate the sum taken and subtract result of opponent's best for the rest.

### Corner cases to consider  
- Negative stone values in the array
- All zeros
- Only 1 or 2 stones in the array
- Large input size

### Solution

```python
def stoneGameIII(stoneValue):
    n = len(stoneValue)
    dp = [float('-inf')] * (n+1)
    dp[n] = 0  # Base: no stones left
    for i in range(n-1, -1, -1):
        total = 0
        for k in range(1, 4):
            if i + k <= n:
                total += stoneValue[i + k - 1]
                dp[i] = max(dp[i], total - dp[i+k])
    if dp[0] > 0:
        return 'Alice'
    if dp[0] < 0:
        return 'Bob'
    return 'Tie'
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — One pass, each position tries 3 options.
- **Space Complexity:** O(n) — For dp array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can take up to k stones per turn, with variable k?  
  *Hint: Generalize inner loop to k options.*

- Can you reconstruct the actual optimal moves for Alice?  
  *Hint: Track move choices along with dp.*

- What if you want to know exact final scores for both players?  
  *Hint: Track cumulative sums and best Alice/Bob points, not just difference.*

### Summary
This is a classic DP for two-player zero-sum games, with each player minimizing the other's potential. The difference-based DP is a standard minimax-with-memory (Game Theory) approach, reusable for similar multiple-take games.