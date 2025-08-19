### Leetcode 1900 (Hard): The Earliest and Latest Rounds Where Players Compete [Practice](https://leetcode.com/problems/the-earliest-and-latest-rounds-where-players-compete)

### Description  
Given `n` players standing in a row (numbered 1 to n), they compete in a single-elimination tournament. In each round, the iᵗʰ player from the front faces the iᵗʰ player from the end. The winner advances.  
If there is an odd number of players, the middle player advances automatically.  
Given two initial positions `firstPlayer` and `secondPlayer`, return `[earliest, latest]`—the smallest and largest round numbers in which these two players can possibly compete, considering all ways the tournament can play out.

### Examples  

**Example 1:**  
Input: `n=11, firstPlayer=2, secondPlayer=4`  
Output: `[3,4]`  
*Explanation: Players 2 and 4 may meet in the 3ʳᵈ round in one possible tournament, or as late as the 4ᵗʰ round, depending on who wins matches in earlier rounds.*

**Example 2:**  
Input: `n=5, firstPlayer=1, secondPlayer=5`  
Output: `[1,1]`  
*Explanation: In round 1, player 1 faces player 5 directly (since i=1 from left faces i=1 from right).*

**Example 3:**  
Input: `n=8, firstPlayer=3, secondPlayer=6`  
Output: `[2,2]`  
*Explanation: Players 3 and 6 can only meet in round 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  - Simulate all possible tournament paths (because in each match, either side may win, affecting future pairings).
  - Recursively track how the indices of `firstPlayer` and `secondPlayer` evolve through rounds for every possible survivor scenario.
  - Record the round if/when these two meet.

- **Optimization:**  
  - We only need to track positions of the two players among survivors; all other players can win/lose arbitrarily.
  - Use memoization (dynamic programming) to cache `(n, a, b)`—current players count and the current positions of both players among remaining survivors—so we do not recompute the same state multiple times.
  - At each round, consider:
    - If players meet: current round is recorded.
    - Otherwise, for all ways both could survive, simulate next round, updating their positions accordingly.

- **Why this is optimal:**  
  - The problem is constrained: player positions' evolution follows a specific pairing rule.
  - Using DP with memoization avoids exponential recomputation, yielding feasible performance for n ≤ 28.

### Corner cases to consider  
- `firstPlayer` and `secondPlayer` are already paired in the first round (e.g., positions mirror: 1\&n, 2\&n-1, etc.).
- Odd number of players: check if either target is the middle survivor.
- Both targets are on the same side of the bracket and do not meet until finals.
- Small n: n=2, only one match possible.
- `firstPlayer` > `secondPlayer`: order should not matter.

### Solution

```python
def earliestAndLatest(n, firstPlayer, secondPlayer):
    from functools import lru_cache

    def normalize(a, b):
        # always treat a < b
        return min(a, b), max(a, b)

    @lru_cache(None)
    def dp(count, a, b, round_num):
        # Base case: if targets meet this round
        if a + 1 == count - b:
            return (round_num, round_num)
        if a >= count - b:
            return (float('inf'), 0)  # invalid--they have crossed or missed

        min_round = float('inf')
        max_round = 0
        pairs = []
        left, right = 1, count
        survivors = []

        # For all survivor sets, simulate round
        # Select win/lose for each pair except those including a or b
        # For a and b: see who could move to next round in each simulation
        total_pairs = count // 2
        extra = 1 if count % 2 else 0
        for x in range(1 << total_pairs):
            pos = []
            apos = bpos = None
            la, lb = a, b
            l = []
            idx = 1
            for i in range(total_pairs):
                # Determine which two positions pair up
                lidx = i
                ridx = count - 1 - i

                # Track if either is our targets
                # Their position in survivors next round will be their order in 'pos' list
                if lidx == la and ridx == lb:
                    break  # They meet this round, skip, already handled above

                # Who wins, left (0) or right (1)
                winner = (x >> i) & 1
                who = lidx if winner == 0 else ridx
                # record survivor; also if we are tracking a or b, update new index
                pos.append(who)
            if count % 2:
                pos.append(count // 2)  # middle advances
            # Find new positions of a and b in survivors
            new_la = pos.index(la)
            new_lb = pos.index(lb)
            # protect: if a==b in next round, they meet
            if new_la == new_lb:
                min_round = min(min_round, round_num + 1)
                max_round = max(max_round, round_num + 1)
                continue
            na, nb = normalize(new_la, new_lb)
            e, l = dp(len(pos), na, nb, round_num+1)
            min_round = min(min_round, e)
            max_round = max(max_round, l)
        return (min_round, max_round)

    a, b = normalize(firstPlayer - 1, secondPlayer - 1)
    return list(dp(n, a, b, 1))
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(2ⁿ × n²): For each round, there are up to 2^{⌊n/2⌋} match outcomes; but with memoization on (count, a, b), number of states is bounded by O(n²) for each n, so total is roughly O(2ⁿ × n²) but works for n ≤ 18-22 in practice.
- **Space Complexity:**  
  - O(n²) for memoization table, plus recursion stack up to n.

### Potential follow-up questions (as if you’re the interviewer)  

- If the tournament matched randomly instead of in pairs (i.e. not always iᵗʰ vs n-i+1ᵗʰ), how would you solve it?
  *Hint: Consider all possible pairings and simulate permutations.*

- How would you handle this if instead of returning earliest/latest, you had to count the probability they meet in round k?
  *Hint: Add probability DP, sum probabilities per round.*

- Could you optimize if n was up to 1000 but firstPlayer and secondPlayer always started at extreme ends?
  *Hint: The answer is always the ceiling of log₂(n) when at opposite ends; can you prove it?*

### Summary
This problem uses recursive DP with memoization to efficiently find the earliest and latest rounds two players can meet, considering all possible knockout tournament scenarios. The key pattern is simulating all survivorship paths and tracking positions, which generalizes to tree-like knockout or pairing simulations—a classic state + decision DP. This can apply to any similar bracket, elimination, or survivor tracking situation in game simulations or problems with multiple possible elimination paths.

### Tags
Dynamic Programming(#dynamic-programming), Memoization(#memoization)

### Similar Problems
