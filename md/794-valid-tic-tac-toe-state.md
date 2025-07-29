### Leetcode 794 (Medium): Valid Tic-Tac-Toe State [Practice](https://leetcode.com/problems/valid-tic-tac-toe-state)

### Description  
Given a 3×3 Tic-Tac-Toe board (as a string array), determine whether it represents a state possible in a valid game following classic rules:
- Two players, where the first always plays 'X', the second always plays 'O'.
- Players alternate moves, marking empty spots.
- The game ends when either one player wins (makes a line — row, column, or diagonal), or all squares are filled.
- No moves can happen after someone has won, and both players cannot win at once.
Your task: verify if a given board configuration is reachable by following all rules.

### Examples  

**Example 1:**  
Input: `["O  ","   ","   "]`  
Output: `False`  
*Explanation: 'O' cannot play before 'X'.*

**Example 2:**  
Input: `["XOX"," X ","   "]`  
Output: `False`  
*Explanation: Space count invalid; only possible to have (X==O) or (X==O+1).*

**Example 3:**  
Input: `["XOX","O O","XOX"]`  
Output: `True`  
*Explanation: X and O move count and finished game state are valid and consistent.*

### Thought Process (as if you’re the interviewee)  
First, any Tic-Tac-Toe state must follow player-turn rules: 'X' goes first, and at every stage, the number of 'X's is either equal to or one more than the number of 'O's. So my first check is to **count** the X's and O's.  
Then, I need to check endgame conditions:
- If both players have a win line, the state can't exist.
- If 'X' won, there must be one more 'X' than 'O'.
- If 'O' won, the counts must be equal.
If no one has won, only the move order and player turn counts matter.
To check for a winner, I’ll write a helper to test all 8 possible lines (3 rows, 3 columns, 2 diagonals).

Brute-force works since the board is 3×3, but any “clever” speedup is unnecessary; correctness and handling all branches is most important for interviews.

### Corner cases to consider  
- The board has too many 'O's or 'X's (invalid turn order).
- Both X and O have a winning line (impossible).
- The first move is an 'O'.
- Winning, but move counts don’t match up (e.g., O wins but X has extra move).
- The game is ‘done’ (has a winner), but extra moves were played.

### Solution

```python
def validTicTacToe(board):
    # Count 'X' and 'O' on the board
    x_count = sum(row.count('X') for row in board)
    o_count = sum(row.count('O') for row in board)

    # Rule: X always goes first, so O can't have more moves
    if o_count > x_count or x_count - o_count > 1:
        return False

    # Helper to check if a player has a winning line
    def is_winner(player):
        # All rows
        for i in range(3):
            if all(board[i][j] == player for j in range(3)):
                return True
        # All columns
        for j in range(3):
            if all(board[i][j] == player for i in range(3)):
                return True
        # Diagonal
        if all(board[i][i] == player for i in range(3)):
            return True
        # Anti-diagonal
        if all(board[i][2 - i] == player for i in range(3)):
            return True
        return False

    x_win = is_winner('X')
    o_win = is_winner('O')

    # Both players can't win
    if x_win and o_win:
        return False
    # If X wins, should have one extra X than O
    if x_win and x_count != o_count + 1:
        return False
    # If O wins, should be equal number of X and O
    if o_win and x_count != o_count:
        return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Board is a fixed 3×3 grid, so checking lines or counting is constant time.
- **Space Complexity:** O(1) — Only a few counters and no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the board was N×N instead of 3×3?  
  *Hint: How does winning condition checking scale in code with variable board size?*

- What if you had to return the sequence of moves that led to this state (if possible)?  
  *Hint: Can you construct backwards, or is the state sometimes ambiguous?*

- How would you handle a misconfigured input with symbols other than 'X', 'O', ' '?  
  *Hint: Input validation step before main logic.*

### Summary
The approach relies on simulation and validation of game invariants: **counting**, **turn order**, and **winner detection** in all line directions. The pattern is commonly used for board game state checks and can be applied to other games needing sequential, rule-based validation of states.