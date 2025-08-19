### Leetcode 887 (Hard): Super Egg Drop [Practice](https://leetcode.com/problems/super-egg-drop)

### Description  
Given **k identical eggs** and a building with **n floors**, you need to find the **minimum number of moves** required to determine the highest floor `f` from which an egg can be dropped without breaking (the "critical floor"). If you drop an egg and it breaks, you can't use it again; if it survives, you can reuse it. You want a strategy that guarantees to find this critical floor in the fewest moves, even in the worst case.

For each move, you can pick any floor to drop an egg from. After the drop:
- If the egg breaks, you have one fewer egg and need to search lower floors.
- If it doesn't break, you still have the same number of eggs and can search higher floors.

The goal: **Minimize the maximum number of moves needed to find the threshold floor f, given any values of n and k.**

### Examples  

**Example 1:**  
Input: `k = 1, n = 2`  
Output: `2`  
*Explanation: You have 1 egg and 2 floors.  
- Drop egg from 1st floor: if it breaks, floor 0 is the answer.  
- If it doesn't, drop from 2nd floor: if it breaks, floor 1 is the answer, if not, floor 2 is the answer.  
So, minimum attempts in worst case: 2.*

**Example 2:**  
Input: `k = 2, n = 6`  
Output: `3`  
*Explanation:  
- Drop from floor 3.  
  - If it breaks (eggs left: 1), search floors 1, 2 (need at most 2 more tries).  
  - If it doesn't, go to floor 5 (choices left: floors 4, 5, 6).  
  - Worst case: 3 drops needed to guarantee answer.*

**Example 3:**  
Input: `k = 3, n = 14`  
Output: `4`  
*Explanation: With optimal drops, you can determine the critical floor with just 4 moves.*

### Thought Process (as if you’re the interviewee)  
First, consider brute-force DP:
- Let dp(k, n) = minimum number of moves needed for k eggs and n floors.
- For each floor, choose to drop the egg there.
  - If it breaks, check below with k-1 eggs, i-1 floors.
  - If it doesn't, check above with k eggs, n-i floors.
- For each floor, cost = 1 + max(dp(k-1, i-1), dp(k, n-i))
- Take the minimum across all floors. But that's O(k \* n²), which is too slow for n up to 10⁴.

Optimization: **DP with Binary Search**
- The 'worst-case' formula above is monotonic: as floor increases, the 'breaks' case grows, 'not break' decreases.
- So, use binary search on i (the floor to drop from) to speed up finding the minimum.
- Final DP: O(k \* n \* log n).

Best Optimization: **DP on moves**
- dp[k][m] = max number of floors we can check with k eggs and m moves.
- Recurrence: dp[k][m] = dp[k][m-1] + dp[k-1][m-1] + 1
  - "Try dropping from a floor":
    - If it breaks: you get dp[k-1][m-1] floors below.
    - If not: you get dp[k][m-1] floors above.
- Iterate m until dp[k][m] ≥ n; answer is m.
- This is much faster because the number of moves m needed is at most around 100 for reasonable values.

### Corner cases to consider  
- k = 1 (must check every floor, answer = n)
- n = 0 or 1 (trivially 0 or 1 moves)
- k >= n (only need ⌊log₂n⌋+1 moves)
- Very large n, small k
- Only one floor
- Egg breaks on first drop

### Solution

```python
def superEggDrop(k, n):
    # dp[moves][eggs]: max floors that can be checked with 'eggs' eggs and 'moves' moves
    dp = [0] * (k + 1)
    moves = 0
    while dp[k] < n:
        moves += 1
        # update dp from right to left to avoid overwriting values
        for eggs in range(k, 0, -1):
            # Recurrence: new floors = previous same + previous one egg less + 1
            dp[eggs] = dp[eggs] + dp[eggs - 1] + 1
    return moves
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k × log n)  
  Because in each increment of moves, we add more floors, and the needed moves grow at most log₂(n) scale.
- **Space Complexity:** O(k)  
  Only a 1-D array of size k+1 is needed for DP states.

### Potential follow-up questions (as if you’re the interviewer)  

- If the eggs are not identical (varying strengths), how would you change the strategy?  
  *Hint: Track which egg breaks at which threshold; states are larger.*

- What if you minimize the expected (average) number of moves rather than the worst-case?  
  *Hint: This involves probability and expected value, not just maximums at each step.*

- Can you return the specific sequence of floors to drop from, not just the minimal move count?  
  *Hint: Backtrack through the dp array or maintain trace pointers.*

### Summary
This problem uses **dynamic programming with state compression**; or alternatively, a novel DP formulation by inverting the state so that moves (not floors) are the iteration dimension. This “how many floors can you cover in m moves” pattern is rare but powerful for “minimum moves in worst-case” questions. It is also a standard variation in classic egg drop/decision minimax DP, and can be used in other resource-constrained search problems.

### Tags
Math(#math), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Egg Drop With 2 Eggs and N Floors(egg-drop-with-2-eggs-and-n-floors) (Medium)