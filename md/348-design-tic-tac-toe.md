### Leetcode 348 (Medium): Design Tic-Tac-Toe [Practice](https://leetcode.com/problems/design-tic-tac-toe)

### Description  
Design a class `TicTacToe` to manage gameplay between two players on an n × n Tic-Tac-Toe board.  
- Players can place their mark (Player 1 or 2) in any empty cell.
- The class should support two operations:
  - Initialization with a board size n.
  - `move(row, col, player)`: Player places their mark at (row, col).
- Return 0 if no one wins after the move, or the player number if they have filled an entire row, column, or diagonal.

### Examples  

**Example 1:**  
Input:  
```
TicTacToe toe = TicTacToe(3)
toe.move(0, 0, 1)   # return 0
toe.move(0, 2, 2)   # return 0
toe.move(2, 2, 1)   # return 0
toe.move(1, 1, 2)   # return 0
toe.move(2, 0, 1)   # return 0
toe.move(1, 0, 2)   # return 0
toe.move(2, 1, 1)   # return 1
```
Output:  
```
[0, 0, 0, 0, 0, 0, 1]
```
*Explanation: Player 1 wins with a row at row 2: (2, 0), (2, 1), (2, 2).*

**Example 2:**  
Input:  
```
TicTacToe toe = TicTacToe(2)
toe.move(0, 1, 1)   # return 0
toe.move(1, 1, 2)   # return 0
toe.move(1, 0, 1)   # return 1
```
Output:  
```
[0, 0, 1]
```
*Explanation: Player 1 wins with a row at row 1: (1, 0), (1, 1).*

**Example 3:**  
Input:  
```
TicTacToe toe = TicTacToe(3)
toe.move(0, 0, 2)   # return 0
toe.move(1, 1, 2)   # return 0
toe.move(2, 2, 2)   # return 2
```
Output:  
```
[0, 0, 2]
```
*Explanation: Player 2 wins with the main diagonal: (0, 0), (1, 1), (2, 2).*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach is to keep an n × n board. After each move, scan the affected row, column, and diagonals to see if the same player occupies all cells—O(n) time per move.

However, this can be optimized.  
Rather than storing the board, I can keep separate arrays to count the number of times each player has marked each row, column, and diagonal.  
- For each move at (row, col), increment player-specific counters:
  - rows[row], cols[col], and if (row == col) the main diagonal, if (row + col == n-1) the anti-diagonal.
- If any counter equals n, that player wins.
This approach achieves O(1) time per move and O(n) space per counter, avoiding repeated board scanning.

Trade-offs:
- Do not need to store the whole board unless moves must be validated (problem says moves are valid).
- Good for large n; saves time per move.

### Corner cases to consider  
- Board size n = 1 (first move is always a win).
- Moves on edge positions (affect diagonals/anti-diagonals).
- Both diagonals overlap at the center when n is odd.
- Already finished game: no further moves (problem says "once a winning condition is reached, no more moves are allowed").
- All moves are placed but no winner (implicit draw, but per problem spec, just return 0).

### Solution

```python
class TicTacToe:
    def __init__(self, n):
        # Store board size
        self.n = n
        # Each index counts the sum for that row or column
        self.rows = [0] * n
        self.cols = [0] * n
        # Diagonals: main and anti-diagonal
        self.diag = 0
        self.anti_diag = 0

    def move(self, row, col, player):
        # player 1: +1, player 2: -1
        add = 1 if player == 1 else -1

        self.rows[row] += add
        self.cols[col] += add

        if row == col:
            self.diag += add
        if row + col == self.n - 1:
            self.anti_diag += add

        # If any gets to n or -n, a player has filled a row, col, or diagonal
        if (abs(self.rows[row]) == self.n or
            abs(self.cols[col]) == self.n or
            abs(self.diag) == self.n or
            abs(self.anti_diag) == self.n):
            return player
        return 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per move, since only a constant number of counters are updated and checked.
- **Space Complexity:** O(n) for rows and cols, plus O(1) for the two diagonals; total O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted to support checking for a draw?
  *Hint: Track the total number of moves. If moves == n × n with no winner, it's a draw.*

- How would you modify the solution if the board is larger (e.g., 1000 × 1000)?
  *Hint: This solution still works efficiently, as no O(n²) operations are performed.*

- If arbitrary k-in-a-row (not necessarily n) is required for victory, what would change?
  *Hint: You'd need to scan along rows, cols, and diagonals, not just increment counters, as the streak could begin anywhere.*

### Summary
This approach uses the counting pattern to efficiently detect win conditions by maintaining row, column, and diagonal counts per player. It avoids storing the entire board and enables O(1) move processing, a technique valuable for scalable grid games or generalized "connect-k" rule checkers. This pattern is widely seen in array and grid-based design problems.