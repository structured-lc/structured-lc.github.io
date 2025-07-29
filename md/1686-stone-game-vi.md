### Leetcode 1686 (Medium): Stone Game VI [Practice](https://leetcode.com/problems/stone-game-vi)

### Description  
Alice and Bob play a game alternating turns picking stones from a row. Each stone has value for Alice (`a[i]`) and Bob (`b[i]`) (arrays of equal length). On their turn, a player picks any remaining stone, gets their value, and it’s removed. Alice starts. The game ends when all stones are picked. If Alice's score > Bob's, Alice wins; if Bob's > Alice's, Bob wins; else it’s a tie.

Return 1 if Alice wins, -1 if Bob wins, and 0 if tie.

### Examples  
**Example 1:**  
Input: `a = [1,3]`, `b = [2,1]`  
Output: `1`  
*Explanation: Alice picks index 1 (gets 3), Bob picks index 0 (gets 2), Alice:3, Bob:2 — Alice wins.*

**Example 2:**  
Input: `a = [1,2]`, `b = [3,1]`  
Output: `0`  
*Explanation: Alice picks (1,2), Bob picks (3,1), both sum 2, tie.*

**Example 3:**  
Input: `a = [2,4,3]`, `b = [1,6,7]`  
Output: `-1`  
*Explanation: Bob can win if both play optimally.*

### Thought Process (as if you’re the interviewee)  
Greedy approach: On each turn, both should prioritize picking stones which maximize the *total* value (their own + opponent's) to deny the opponent the most.
- Before start, compute for each stone: `a[i]+b[i]`.
- Sort indices by decreasing (a[i]+b[i]). Each turn, current player picks the highest remaining.
- Alice picks at even turns (0,2,…), Bob at odd (1,3,…).
- Track total Alice and Bob values.
- After all turns, compare scores.

### Corner cases to consider  
- Both arrays of length 1.
- Multiple stones with same total value.
- Alice and Bob get equal points (tie).

### Solution

```python
def stoneGameVI(a, b):
    n = len(a)
    stones = list(zip(a, b))
    stones.sort(key=lambda x: -(x[0] + x[1]))  # sort by total value descending
    alice, bob = 0, 0
    for i, (av, bv) in enumerate(stones):
        if i % 2 == 0:
            alice += av
        else:
            bob += bv
    if alice > bob:
        return 1
    elif alice < bob:
        return -1
    else:
        return 0
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) — for sorting.
- **Space Complexity:** O(n) — store and sort list of stones.

### Potential follow-up questions (as if you’re the interviewer)  
- How does this change if Alice or Bob can pick two stones per turn?  
  *Hint: Modify picking turns and indices accordingly.*

- What if both play randomly?  
  *Hint: Expectation, simulation, or probabilistic outcome.*

- How do you handle large inputs efficiently?
  *Hint: Ensure sorting step is not a bottleneck and second pass is linear.*

### Summary
This uses the **greedy maximum denial pattern**: rather than maximizing single-player gain, players maximize their value *plus* the value denied to their opponent. This sorting-based pick-order also appears in other combinatorial games, resource allocation, or two-player greedy setups.