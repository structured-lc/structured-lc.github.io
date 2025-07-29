### Leetcode 1230 (Medium): Toss Strange Coins [Practice](https://leetcode.com/problems/toss-strange-coins)

### Description  
You are given a list of coins, where each coin `i` has a probability `probabilities[i]` of landing heads when flipped. You flip all the coins exactly once. Compute the probability that exactly `target` coins land on heads.  
Each coin can have a different probability, and you need to find the combined probability of ending up with exactly `target` heads after tossing all the coins.

### Examples  

**Example 1:**  
Input: `probabilities = [0.4], target = 1`  
Output: `0.4`  
*Explanation: Only one coin, probability of getting exactly 1 head is 0.4.*

**Example 2:**  
Input: `probabilities = [0.5, 0.5], target = 1`  
Output: `0.5`  
*Explanation:  
- Head, Tail: 0.5 × 0.5 = 0.25  
- Tail, Head: 0.5 × 0.5 = 0.25  
Total probability for exactly 1 head: 0.25 + 0.25 = 0.5.*

**Example 3:**  
Input: `probabilities = [0.2, 0.8, 0.5], target = 2`  
Output: `0.36`  
*Explanation:  
- Coin 1 head, Coin 2 head, Coin 3 tail: 0.2 × 0.8 × 0.5 = 0.08  
- Coin 1 head, Coin 2 tail, Coin 3 head: 0.2 × 0.2 × 0.5 = 0.02  
- Coin 1 tail, Coin 2 head, Coin 3 head: 0.8 × 0.5 × 0.5 = 0.2  
Total probability: 0.08 + 0.02 + 0.2 = 0.3  
(This exact value is for illustration; you would sum all valid possibilities where exactly two coins are heads.)*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to try all 2ⁿ possible coin result combinations, count how many result in exactly `target` heads, and sum their probabilities. But this is exponential time and not feasible for up to 1000 coins.

Instead, I recognize this fits the **probabilistic Dynamic Programming (DP)** pattern:  
- For each coin, at each count of heads so far (from 0 to `target`), store the probability of achieving that many heads.
- For each coin, update the probabilities:
  - If current coin is *tail*: probability × previous with same head count.
  - If *head*: probability × previous with (head count - 1).
- Do it iteratively for each coin using a 1D DP array.

This is efficient (O(n × target) time, O(target) space).  
This is much better than DFS with recursion and memoization in both speed and clarity when target is small compared to n.

### Corner cases to consider  
- `probabilities = []`, target = 0 (should return 1.0; no coins, zero heads is possible)
- `probabilities = [x, y, ...]`, target = 0 (probability that all coins are tails)
- target > len(probabilities) (cannot get more heads than coins)
- target < 0 (impossible, return 0)
- All probabilities = 1 or 0 (will always have all heads or all tails)
- target == len(probabilities) (probability that all coins are heads)

### Solution

```python
from typing import List

def probabilityOfHeads(probabilities: List[float], target: int) -> float:
    n = len(probabilities)
    # dp[j]: probability of getting j heads after tossing coins so far
    dp = [0.0] * (target + 1)
    dp[0] = 1.0  # Probability of 0 heads (all tails) initially is 1

    for p in probabilities:
        # Update in reverse to avoid overwriting needed values
        for j in range(target, -1, -1):
            # If this coin is tails, stay at j heads
            dp[j] *= (1 - p)
            # If this coin is heads, move from (j-1) heads to j
            if j > 0:
                dp[j] += p * dp[j - 1]

    return dp[target]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × target)  
  Each of the n coins loops over up to (target + 1) head counts.
- **Space Complexity:** O(target)  
  Maintain a 1D DP array of (target + 1) entries; other space is negligible.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle extremely large values of `n` or `target`?
  *Hint: Could you approximate the probability, or use alternate mathematical/statistical methods?*

- Suppose you want the probability of *at least* k heads, not *exactly* k?
  *Hint: Sum probabilities for all head counts ≥ k.*

- What if coin probabilities can change dynamically?
  *Hint: Might need to recalculate parts of DP; can you update efficiently?*

### Summary
This is a classic **probabilistic DP** problem, analogous to subset-sum but with probabilities. The in-place 1D DP update pattern is common for rolling window/counting problems, including subset counting, knapsack, and dice roll simulations. This approach is both time- and space-efficient and is applicable to many problems involving independent choices with probabilities.