### Leetcode 1997 (Medium): First Day Where You Have Been in All the Rooms [Practice](https://leetcode.com/problems/first-day-where-you-have-been-in-all-the-rooms)

### Description  
You are given **n** rooms labeled from 0 to n-1. Starting on day 0, you always begin by visiting room 0. Each day, the room you visit is determined as follows:
- If the **current** visit count to room *i* is odd (including this visit), on the next day you visit room **nextVisit[i]**, where 0 ≤ nextVisit[i] ≤ i.
- If the count is even, the next room you visit is (i + 1) mod n.
Return the **first day** (0-indexed) such that you have visited *every room* at least once. Since the answer may be very large, return it modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `nextVisit = [0,0]`  
Output: `2`  
*Explanation:  
Day 0: room 0 (odd, nextVisit=0)  
Day 1: room 0 (even, to room 1)  
Day 2: room 1 (done—all visited)*

**Example 2:**  
Input: `nextVisit = [0,0,2]`  
Output: `6`  
*Explanation:  
Visit order: 0 → 0 → 1 → 0 → 0 → 1 → 2 (by day 6, all rooms have been visited)*

**Example 3:**  
Input: `nextVisit = [0,1,2,0]`  
Output: `11`  
*Explanation:  
You need to repeatedly come back to previous rooms per the rules and only by day 11 every room is first visited.*

### Thought Process (as if you’re the interviewee)  
Let’s first simulate with brute force – track the state (room, number of visits per room, etc.) and repeat the process day by day until all rooms are marked visited.  
This quickly becomes too slow for large n, so we need an efficient (DP) approach.

Suppose `dp[i]` is the **first day** on which you visit room i for the first time.  
- To reach room i, you must get to room i−1, visit it **twice** (by the ending rules: one from the previous visit, and then the extra “come back” per odd/even rules), and then progress.  
- Reaching i−1 means following all rules for re-visits as well: each time you finish with i−1 (odd), you go to nextVisit[i-1], and from there must progress forward again.  
So,
```
dp[0] = 0   # Already in room 0 on day 0

For i ≥ 1:
dp[i] = (2 × dp[i-1] - dp[nextVisit[i-1]] + 2) % MOD
```
Each dp[i] depends on:  
- Time to reach i−1 (dp[i−1])
- Time “lost” returning via nextVisit[i-1] since we’re forced back instead of progressing
- 2 extra days (one for each initial and “return” visit to i−1)

This DP gives linear time.

### Corner cases to consider  
- `n = 1`: Only one room, answer is 0.
- All nextVisit[i] = i: Minimal cycles.
- All nextVisit[i] = 0: Frequent restarts.
- nextVisit[i] = i-1: Maximum backward cycles.
- Large arrays to assess mod 10⁹ + 7.
- Repeating values in nextVisit.

### Solution

```python
def firstDayBeenInAllRooms(nextVisit):
    MOD = 10 ** 9 + 7
    n = len(nextVisit)
    dp = [0] * n         # dp[i]: first day to visit room i

    for i in range(1, n):
        # Key DP relation:
        # dp[i] = (2 × dp[i-1] - dp[nextVisit[i-1]] + 2) % MOD
        dp[i] = (2 * dp[i-1] - dp[nextVisit[i-1]] + 2) % MOD

    return dp[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We process each room once, with constant-time calculations per state.
- **Space Complexity:** O(n) — We store an integer dp[i] per room (n rooms).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you also want **the path taken** (not just day count)?
  *Hint: Can you augment the DP or simulate the actual path per rules?*
- Could you solve this for an **infinite loop check** (could it ever be unsolvable)?
  *Hint: Try proving by induction using the rules—can every cycle eventually reach every room?*
- What if **room 0 is not guaranteed as start**? How does the solution change?
  *Hint: Would the recurrence or starting values need to be modified?*

### Summary
This problem is a classic example of **DP with dependency on prior computed states** and a reference back/frame jump (non-monotonic).  
The pattern (DP[i] = function of DP[i-1] and DP[nextVisit[i-1]]) is seen frequently in stateful path problems—especially where rules create cycles or alternate progression.  
This approach can be applied in simulation/robot movement questions, puzzles with return/jump conditions, and more generally, problems needing efficient O(1) state transition between steps.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
