### Leetcode 2660 (Easy): Determine the Winner of a Bowling Game [Practice](https://leetcode.com/problems/determine-the-winner-of-a-bowling-game)

### Description  
Given two integer arrays `player1` and `player2`, each representing the pins knocked down by each player in each round of a bowling game, determine who wins. The twist: If a player scored a strike (10 pins) in either of their previous two turns, the score for their current turn is doubled. After calculating the total score for each, return `1` if Player 1 wins, `2` if Player 2 wins, or `0` if it’s a tie.

### Examples  

**Example 1:**  
Input: `player1 = [4,10,7,9], player2 = [6,5,2,3]`  
Output: `1`  
*Explanation:  
- Player 1:  
    - Turn 0: 4 ×1 = 4  
    - Turn 1: 10 ×1 = 10  
    - Turn 2: 7 ×2 = 14 (strike in previous turn)  
    - Turn 3: 9 ×2 = 18 (strike in previous turn)  
  Total = 4 + 10 + 14 + 18 = 46  
- Player 2:  
    - Turn 0: 6 ×1 = 6  
    - Turn 1: 5 ×1 = 5  
    - Turn 2: 2 ×1 = 2  
    - Turn 3: 3 ×1 = 3  
  Total = 6 + 5 + 2 + 3 = 16  
Player 1 wins (46 > 16).*

**Example 2:**  
Input: `player1 = [3,5,7,6], player2 = [8,10,10,2]`  
Output: `2`  
*Explanation:  
- Player 1: 3+5+7+6 = 21  
- Player 2:  
    - 8 ×1 = 8  
    - 10 ×1 = 10  
    - 10 ×2 = 20 (previous turn 10)  
    - 2 ×2 = 4 (previous two turns both 10)  
  Total = 8 + 10 + 20 + 4 = 42  
Player 2 wins.*

**Example 3:**  
Input: `player1 = [2,3], player2 = [3,2]`  
Output: `0`  
*Explanation:  
Both players: 2+3 = 5 and 3+2 = 5. Tie.*

### Thought Process (as if you’re the interviewee)  
I need to simulate scoring in bowling for both players with an extra rule: if any of the previous two turns scored 10 pins, double this turn’s score.  
- Brute-force: For each player's list, for each turn, check the past two turns for a strike, and double if needed.  
- O(n) for each player's scores since only up to two previous values must be checked.  
- I’ll implement a helper to calculate each player’s score and compare.  
- No need for extra storage, just a running total and simple conditional logic.  
- No further optimization needed since even the brute-force method is efficient.

### Corner cases to consider  
- Only 1 turn for each player (no previous moves, no doubling).  
- Both arrays are equal/tied.
- Strikes at index 0 (should NOT double anything, nothing prior).
- Two consecutive strikes and effect on following turns.
- Arrays of different lengths (should not happen as per problem statement).
- Players score 0 in all turns.

### Solution

```python
def is_strike_in_last_two(arr, i):
    # Returns True if there's a strike in i-1 or i-2
    if i > 0 and arr[i-1] == 10:
        return True
    if i > 1 and arr[i-2] == 10:
        return True
    return False

def calc_score(arr):
    score = 0
    n = len(arr)
    for i in range(n):
        if is_strike_in_last_two(arr, i):
            score += 2 * arr[i]
        else:
            score += arr[i]
    return score

def isWinner(player1, player2):
    # Calculate total scores for both players
    score1 = calc_score(player1)
    score2 = calc_score(player2)
    
    if score1 > score2:
        return 1
    elif score2 > score1:
        return 2
    else:
        return 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of turns. For each player, we only do a single pass and a fixed number of checks per turn.
- **Space Complexity:** O(1). Only a fixed number of variables used, no extra arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the rules change and a strike affects only the very next turn, not two?
  *Hint: Only check i-1 instead of both i-1 and i-2.*
- How would you handle three players or more?
  *Hint: Abstract out the scoring so it works for k player arrays using a loop or mapping structure.*
- What if the input arrays could be different lengths?
  *Hint: Pad the shorter array with zeros, or loop until the max of both lengths and use 0 if out of bounds.*

### Summary
We used a direct simulation approach, traversing turn-by-turn and tallying scores per the problem’s strike doubling rule. This is a *scoring simulation* pattern, often seen in games or competition score-tracking questions. This logic can generalize to many sports/score-keeping variants with “score modifiers” depending on historical events.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
- High Five(high-five) (Easy)