### Leetcode 999 (Easy): Available Captures for Rook [Practice](https://leetcode.com/problems/available-captures-for-rook)

### Description  
Given an 8×8 chessboard grid, each cell contains:
- `'R'`: a **white rook** (exactly one on the board)
- `'B'`: white bishops (zero or more)
- `'p'`: black pawns (zero or more)
- `'.'`: empty squares

Your goal: **Determine how many black pawns ('p') the rook can capture in a single move.**
- The rook can move in the four cardinal directions (up, down, left, right), stopping if it hits the edge, a white bishop (cannot pass/fight through friendly pieces), or after capturing a pawn.
- The rook cannot move through bishops, and after capturing a pawn, cannot move further in that direction.
- Only count pawns that the rook can reach unimpeded in each direction.

### Examples  

**Example 1:**  
Input:  
`[[".",".",".",".",".",".",".","."], [".",".",".","p",".",".",".","."], [".",".",".","R",".",".",".","p"], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".","p",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."]]`  
Output: `3`  
*Explanation: The rook at (2,3) can capture pawns at (2,7), (3,3), and (5,3) in one move. All are unobstructed by bishops.*

**Example 2:**  
Input:  
`[[".",".",".",".",".",".",".","."], [".","B",".","p",".",".",".","."], [".",".",".","R",".",".",".","p"], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".","p",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."]]`  
Output: `2`  
*Explanation: The bishop at (1,1) blocks the rook's path to one pawn, so only 2 pawns can be captured from the rook's position.*

**Example 3:**  
Input:  
`[[".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".","R",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."]]`  
Output: `0`  
*Explanation: There are no pawns for the rook to capture anywhere on the board.*

### Thought Process (as if you’re the interviewee)  

- First, **find the rook's position** by scanning the board.  
- Next, for each of the **four directions** (up, down, left, right), move cell by cell:
    - If we encounter a **pawn**, increment the capture count and stop searching in that direction.
    - If we encounter a **bishop**, stop searching in that direction (cannot pass).
    - If an empty square, continue moving in that direction.
    - If the board edge is reached, stop.
- This simulates the rook's possible moves per chess rules; since the board is always 8×8, this approach is efficient.
- The **brute-force method** is fast enough, but to avoid unnecessary checks, we stop scanning a direction at the first pawn or bishop.

### Corner cases to consider  
- The rook is at the edge/corner of the board.
- Pawns are behind bishops (cannot be reached).
- No pawns present.
- No bishops at all (rook can potentially capture in all four directions).
- Rook is surrounded entirely by bishops or the edge.
- Multiple pawns in the same direction (only first one is capturable).

### Solution

```python
def numRookCaptures(board):
    # Find the position of the rook
    for i in range(8):
        for j in range(8):
            if board[i][j] == 'R':
                rook_x, rook_y = i, j

    captures = 0
    # Directions: up, down, left, right
    directions = [(-1,0), (1,0), (0,-1), (0,1)]

    for dx, dy in directions:
        x, y = rook_x, rook_y
        while True:
            x += dx
            y += dy
            # Check board bounds
            if not (0 <= x < 8 and 0 <= y < 8):
                break
            if board[x][y] == 'B':
                break  # Bishop blocks the way
            if board[x][y] == 'p':
                captures += 1  # Pawn can be captured
                break  # Stop in this direction after capturing
            # Continue if empty square

    return captures
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(32)  
  *For each of the four directions, in the worst case the rook could traverse up to 7 cells, so at most 28 checks, i.e., O(1) as board size is constant.*  
- **Space Complexity:** O(1)  
  *No extra space used beyond a few variables; input size is fixed (8×8).*

### Potential follow-up questions (as if you’re the interviewer)  

- What if the board could be of *any* size (not always 8×8)?  
  *Hint: Adjust bounds check and initial scan, code would remain the same otherwise.*

- How would you handle if there were multiple rooks and you needed the number of captures for each?  
  *Hint: Store positions of all rooks, repeat the process for each one.*

- Suppose the rook could move an arbitrary number of steps per turn (like a Queen or Bishop), and not just as a rook?  
  *Hint: Abstract the direction and movement logic; add more directions for Queen or diagonal checks for Bishop.*

### Summary
This is a classic **grid scanning** simulation problem using **direction vectors**—a frequent pattern in chessboard, grid, and matrix puzzles. 
The method of “move outward in each possible direction until stopped” is widely applicable in games, path-finding, and some flood-fill algorithms. The fixed 8x8 board size allows a straightforward approach without optimization concerns.


### Flashcard
From the rook’s position, scan in all four directions; count the first pawn encountered before any bishop or edge in each direction.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Count Unguarded Cells in the Grid(count-unguarded-cells-in-the-grid) (Medium)
- Minimum Moves to Capture The Queen(minimum-moves-to-capture-the-queen) (Medium)
- Maximum Value Sum by Placing Three Rooks II(maximum-value-sum-by-placing-three-rooks-ii) (Hard)
- Maximum Value Sum by Placing Three Rooks I(maximum-value-sum-by-placing-three-rooks-i) (Hard)