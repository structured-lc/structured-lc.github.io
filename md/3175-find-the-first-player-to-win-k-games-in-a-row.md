### Leetcode 3175 (Medium): Find The First Player to win K Games in a Row [Practice](https://leetcode.com/problems/find-the-first-player-to-win-k-games-in-a-row)

### Description  
You are given a queue of n players, each with a unique skill. Players are initially in order 0 to n-1. In every round, the first two players play a match: the one with the higher skill wins and remains in front; the loser moves to the end of the queue. The *first* player to win **k** games in a row is declared the winner. Return the index of this player.

### Examples  

**Example 1:**  
Input: `skills = [2, 1, 3], k = 2`  
Output: `2`  
*Explanation:*
- Round 1: 2 vs 1 → 2 wins. Queue: [2,3,1]
- Wins in a row: 1 (player 0 with skill 2)
- Round 2: 2 vs 3 → 3 wins. Queue: [3,1,2]
- Wins in a row: 1 (player 2 with skill 3)
- Round 3: 3 vs 1 → 3 wins. Queue: [3,2,1]
- Wins in a row: 2 (player 2 with skill 3)
Player 2 (index 2) wins 2 in a row and wins.

**Example 2:**  
Input: `skills = [5,3,1,4], k = 3`  
Output: `0`  
*Explanation:*
- Round 1: 5 vs 3 → 5 wins. Queue: [5,1,4,3]
- Wins: 1
- Round 2: 5 vs 1 → 5 wins. Queue: [5,4,3,1]
- Wins: 2
- Round 3: 5 vs 4 → 5 wins. Queue: [5,3,1,4]
- Wins: 3
Player 0 (skill 5) wins 3 in a row, so output 0.

**Example 3:**  
Input: `skills = [1, 9, 3, 7, 5], k = 1`  
Output: `1`  
*Explanation:*  
- Round 1: 1 vs 9 → 9 wins. Queue: [9,3,7,5,1]
- Wins: 1
Player 1 (skill 9) wins 1 in a row; since k=1, output 1.

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Simulate the entire process using a queue. Each round, pit the first two players. Winner stays, loser moves to the end. Track the number of consecutive wins for the current player at the front. When someone reaches k wins, return their index.

- **Optimization:**  
  Since the strongest player (highest skill) will eventually win all subsequent matches, if k ≥ n-1, the player with the highest skill will always win after n-1 rounds (because they have to beat all others). So we can shortcut if k ≥ n-1.

- **Why this approach:**  
  One-pass simulation is sufficient because every game outcome is deterministic and historyless (unique skills). The queue can be simulated using simple variables (no need for actual queue structure).  
  The solution must handle up to n = 10⁵ efficiently, but since everyone only ever returns to the front at most twice, O(n) is possible.

### Corner cases to consider  
- k=1: Winner is whoever wins the very first match.
- k ≥ n-1: Winner is max skilled player index.
- Only one player: Should return index 0.
- skills already sorted descending: First player always wins.
- All players have to play at least once.
- Large k: check for overflow.

### Solution

```python
def findWinningPlayer(skills, k):
    n = len(skills)
    # If k ≥ n-1, the strongest player will eventually win.
    if k >= n - 1:
        return skills.index(max(skills))
    
    cur_index = 0
    win_count = 0

    for i in range(1, n):
        if skills[cur_index] > skills[i]:
            win_count += 1
        else:
            cur_index = i
            win_count = 1
        if win_count == k:
            return cur_index
    # If never found (shouldn't happen), return cur_index
    return cur_index
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each player can be involved, at most, twice at the queue front; loop runs at most n times in worst case.
- **Space Complexity:** O(1)  
  Only uses a few variables (does not actually rotate queues); no extra storage proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if skills can repeat?  
  *Hint: How would you handle ties; is the process still deterministic?*

- Can you return both the player and the total number of games played until a winner is found?  
  *Hint: Track a total round counter.*

- What if we want the second player to win k games in a row?  
  *Hint: How would you generalize this for non-unique winners?*

### Summary
This is a classic greedy queue simulation with optimization using the problem’s natural structure: tracking the consecutive win count at each step. The O(n) scan and in-place logic echo the "array game winner" or "queue competition" pattern, which appears in similar Leetcode problems involving repetitive matching, leader tracking, or round-based tournaments. This method is useful for problems where history and relative strength determine placement efficiently.