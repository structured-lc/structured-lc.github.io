### Leetcode 3222 (Easy): Find the Winning Player in Coin Game [Practice](https://leetcode.com/problems/find-the-winning-player-in-coin-game)

### Description  
Given two **positive integers** `x` and `y`, where:  
- `x` = number of coins with value 75  
- `y` = number of coins with value 10  

Alice and Bob take turns, starting with Alice. On each turn, the player **must** pick coins totaling **exactly 115** from the available coins.  
- If a player cannot pick coins that total exactly 115 on their turn, they lose.  
- Both play optimally.  
Return the name ("Alice" or "Bob") of the **winning player**.

### Examples  

**Example 1:**  
Input: `x = 2, y = 7`  
Output: `Alice`  
*Explanation: Alice picks 1 coin of 75 (leaving 1), and 4 coins of 10 (leaving 3): 75 + 10×4 = 115. Bob cannot pick another 75 + 10×4 (not enough 10s), so Alice wins.*

**Example 2:**  
Input: `x = 4, y = 11`  
Output: `Bob`  
*Explanation:  
Turn 1: Alice picks 1×75 + 4×10 (leaving x=3, y=7).  
Turn 2: Bob picks 1×75 + 4×10 (leaving x=2, y=3).   
Turn 3: Alice cannot take 75 + 10×4: not enough 10s. Bob wins.*

**Example 3:**  
Input: `x = 1, y = 3`  
Output: `Bob`  
*Explanation: Alice cannot collect 115 in any form (three 10s and one 75 only make 105), so she loses immediately. Bob wins by default.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible combinations for coins chosen on every turn (simulate each possible sequence). But since the moves are forced to sum exactly 115 and coin quantities are small, we can look for a pattern.
- **Observations:** Only combinations of coins that sum to 115 work; options are 1 coin of 75 and 4 coins of 10 (75 + 10×4 = 115).
- Each move always removes 1 coin of 75 and 4 of 10.
- The game becomes a counting game: how many "moves" (turns) can you perform before one type of coin runs out? Number of full moves is min(x, y // 4).
- Whoever cannot make the next move loses. Alice plays first. If the number of full moves is odd, Alice moves last and wins. If even, Bob wins.
- This is a standard "turn-taking" game theory scenario.

### Corner cases to consider  
- x < 1 or y < 4: Alice can't make the first move, so Bob wins.
- x = y = 1: Not enough coins for even one move; Bob wins.
- x = y = very large, but y ≪ 4\*x: Number of moves depends on y // 4, not x.
- Both coins just enough for exactly one or several moves.
- Maximum input sizes (check calculation works for upper bound).

### Solution

```python
def find_winning_player(x: int, y: int) -> str:
    # Number of available "turns": remove 1 coin of 75 and 4 of 10 per turn
    moves = min(x, y // 4)
    # If moves is odd, Alice wins (she moves first). If even, Bob wins.
    return "Alice" if moves % 2 == 1 else "Bob"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Only a constant number of arithmetic and comparison operations, regardless of input values.
- **Space Complexity:** O(1) — No extra storage used outside a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are other coin denominations?  
  *Hint: How would you generalize the turn logic? What if coin choices aren't unique?*

- How would you return the sequence of moves, not just the winner?  
  *Hint: Simulate the process and record each player's choices per turn.*

- What if players could pick any combination summing to 115?  
  *Hint: Do you need to check all combinations, or does the optimal play remain the same?*

### Summary
This problem is a classic **game theory**/simulation with a fixed move: each turn removes a fixed set of coins (1 × 75, 4 × 10). It becomes a pure counting and parity game—compute how many turns fit, and parity (odd/even) determines the winner. The pattern here ("take a fixed bundle each time, play alternately") is common in problems like Nim or "Stone Game," so this approach applies in many combinatorial games with a fixed move size and alternating turns.


### Flashcard
Only valid move is removing 1 coin of 75 and 4 coins of 10 (sum = 115); count how many moves possible, then determine winner by parity.

### Tags
Math(#math), Simulation(#simulation), Game Theory(#game-theory)

### Similar Problems
- Can I Win(can-i-win) (Medium)
- Predict the Winner(predict-the-winner) (Medium)