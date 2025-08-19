### Leetcode 1275 (Easy): Find Winner on a Tic Tac Toe Game [Practice](https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game)

### Description  
You are given a list of moves played in order on a 3×3 Tic-Tac-Toe board, where players "A" and "B" alternate moves ("A" always goes first). Each move is a pair [row, col], with 0-based indices.  
You need to determine the game's result:  
- If either player completes a row, column, or diagonal with three of their own pieces, return that player's name ("A" or "B").
- If all 9 cells are filled with no winner, return "Draw".
- If the game is unfinished (not all cells filled, and no winner), return "Pending".

### Examples  

**Example 1:**  
Input: `moves = [[0,0],[2,0],[1,1],[2,1],[2,2]]`  
Output: `A`  
*Explanation: "A" wins by occupying (0,0), (1,1), (2,2) — the main diagonal.*

**Example 2:**  
Input: `moves = [[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]]`  
Output: `B`  
*Explanation: "B" wins by occupying (1,1), (1,0), (2,0) — the second column.*

**Example 3:**  
Input: `moves = [[0,0],[1,1],[2,2],[1,0],[1,2],[0,1],[2,0],[0,2],[2,1]]`  
Output: `Draw`  
*Explanation: All cells are filled, and no winner exists.*

### Thought Process (as if you’re the interviewee)  
First, consider brute force: after every move, reconstruct the 3×3 grid, check the row, column, and both diagonals for a win.  
But this is unnecessary since we can track only the counts per row, column, and diagonal for each player.  
Instead, use counters:
- For each move, update that player’s count in their row, column, main diagonal, or anti-diagonal.
- If after any move, any of those counts reaches 3 for a player, that player wins.
- If all moves are played, and no winner, it’s a draw. Otherwise, it’s pending.
This is more efficient, avoids unnecessary board reconstruction, and can be done in a single pass.

### Corner cases to consider  
- Moves array is empty (`[]`) ⇒ Output is "Pending"
- Game finishes before 9 moves (early win)
- All 9 cells filled, but no winner ⇒ "Draw"
- Last move creates a win ⇒ Correctly detect winner even on 9ᵗʰ move
- Moves out of bounds or repeated moves should not occur per problem constraints

### Solution

```python
def tictactoe(moves):
    # Counters for player A (+1) and B (-1)
    rows = [0, 0, 0]
    cols = [0, 0, 0]
    diag = 0
    anti_diag = 0

    for i, (row, col) in enumerate(moves):
        player = 1 if i % 2 == 0 else -1  # 'A' is +1, 'B' is -1

        rows[row] += player
        cols[col] += player
        if row == col:
            diag += player
        if row + col == 2:
            anti_diag += player

        # Check if this move wins
        if abs(rows[row]) == 3 or abs(cols[col]) == 3 or abs(diag) == 3 or abs(anti_diag) == 3:
            return "A" if player == 1 else "B"

    if len(moves) == 9:
        return "Draw"
    return "Pending"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per move, since there are always at most 9 moves and each checks/fills counters in constant time.
- **Space Complexity:** O(1) total, as only a fixed number of counters (rows, columns, diagonals) are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend your solution to an n x n board?
  *Hint: What changes if you have to check n in a row, and the size isn’t fixed?*

- How would you handle invalid moves or repeated cell locations?
  *Hint: Is there a way to guard against duplicate moves as you process the input?*

- How would you return the list of winning cells, not just the winner?
  *Hint: Could you track the specific cell indices in addition to the counters?*

### Summary
This solution uses the simulation/counters pattern and is highly efficient for fixed-size boards, avoiding explicit board storage.  
The same technique can generalize to n × n games or any problem where you count contributions per row/col/diagonal to check for “win” states.  
Detecting “victory via counters” is common in classic board game simulations.

### Tags
Array(#array), Hash Table(#hash-table), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Categorize Box According to Criteria(categorize-box-according-to-criteria) (Easy)