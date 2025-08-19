### Leetcode 1958 (Medium): Check if Move is Legal [Practice](https://leetcode.com/problems/check-if-move-is-legal)

### Description  
Given an 8×8 Othello/Reversi-like board, each cell contains '.', 'W', or 'B' (empty, white, black).  
You are given a proposed move: place a disc of a given color at (rMove, cMove).  
A move is legal if, after placing, there exists a straight line (horizontal, vertical, or diagonal) containing at least three cells such that:
- This move is at one end of the line.
- The other end is the same color.
- All cells in between are the opposite color (with no empty cells in between).

Return True if the move is legal, False otherwise.

### Examples  

**Example 1:**  
Input:  
board =  
```
[[".",".",".","B",".",".",".","."],
 [".",".",".","W",".",".",".","."],
 [".",".",".","W",".",".",".","."],
 [".",".",".","W",".",".",".","."],
 [".",".",".","B",".",".",".","."],
 [".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".","."]]
```
rMove=4, cMove=3, color='B'  
Output: `True`  
*Explanation:*
Place 'B' at (4,3). The vertical line (2,3)-(4,3)-(0,3): (B,W,W,W,B) is a "good" line: 'B' at both ends, all between are 'W'.

**Example 2:**  
Input:  
board =  
```
[[".",".",".",".",".",".",".","."],
 [".","B",".",".",".",".",".","."],
 [".",".","W",".",".",".",".","."],
 [".",".",".","W",".",".",".","."],
 [".",".",".",".","W",".",".","."],
 [".",".",".",".",".","B",".","."],
 [".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".","."]]
```
rMove=2, cMove=2, color='B'  
Output: `False`  
*Explanation:*
After the move, there is no direction (vertical, horizontal, diagonal) where you get a segment with both ends 'B' and all between 'W'.

**Example 3:**  
Input:  
board =  
```
[["B","B",".",".",".",".",".","."],
 [".","W",".",".",".",".",".","."],
 [".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".","."],
 [".",".",".",".",".",".",".","."]]
```
rMove=0, cMove=2, color='B'  
Output: `False`  
*Explanation:*
After placing 'B' at (0,2), no line of at least length 3 with only the other color between two 'B's.

### Thought Process (as if you’re the interviewee)  
- Brute-force idea:
  - For each of the 8 directions (horizontal, vertical, diagonals), check if a line can be created starting from the move, continuing outwards.
  - Look for a consecutive segment of at least 3 cells: ends with our color, in between only opposite color, and no empty spaces.
- Approach:
  - Try all directions from the move.
  - Move stepwise in that direction: the first cell must be the opposite color, then continue with opposite-color discs only.  
  - Only if at least one cell of the opposite color exists before finding a same color piece, and that same color piece appears further along, the move is legal.
- Why pick this approach:
  - The board is fixed size (8×8), so a per-move brute-force is acceptable.
  - All possible lines are short; complexity is not an issue.
  - No need to optimize for bigger boards.

### Corner cases to consider  
- Starting cell is not empty (should not happen based on the problem, but check if needed).
- The immediate neighbor in a direction is not the opposite color.
- There are empty cells between the move and a same-color disc.
- The line is of length 2 (minimum needed is 3).
- No valid line found in any direction.
- Multiple valid directions, but only one needed.

### Solution

```python
def checkMove(board, rMove, cMove, color):
    # Directions: right, left, down, up, down-right, down-left, up-right, up-left
    DIRS = [
        (0, 1),  (0, -1),
        (1, 0),  (-1, 0),
        (1, 1),  (1, -1),
        (-1, 1), (-1, -1),
    ]
    n = 8
    opp = 'B' if color == 'W' else 'W'
    
    for dr, dc in DIRS:
        i, j = rMove + dr, cMove + dc
        count = 0
        # Step 1: The immediate neighbor must be the opposite color.
        if not (0 <= i < n and 0 <= j < n):
            continue
        if board[i][j] != opp:
            continue
        # Step 2: Continue moving in the same direction.
        i += dr
        j += dc
        while 0 <= i < n and 0 <= j < n:
            if board[i][j] == opp:
                count += 1
                i += dr
                j += dc
            elif board[i][j] == color:
                # Only valid if we've passed at least one opp color
                if count >= 1:
                    return True
                else:
                    break
            else: # Empty cell
                break
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  The board size is always 8×8, so we check at most 8 directions, and for each at most 8 steps. All work is constant time.
- **Space Complexity:** O(1)  
  Only a few variables for looping and directions; no extra space grows with input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this for a variable-sized board?
  *Hint: Generalize the direction checks, and make board dimensions dynamic.*

- Can you modify the board directly after a legal move and flip the appropriate pieces?
  *Hint: Track the cells that need to be flipped in each direction, then flip if the move is legal.*

- What if you need to return all legal moves for the current player?
  *Hint: Iterate over every empty cell, using current logic to check for each.*

### Summary
This problem is a classic *simulation on a constant-sized grid*, leveraging direction vectors and careful step-by-step checks.  
The pattern used—directional grid traversal with early pruning—is common in board game logic (like Othello/Reversi), and can be applied in any such 2D "scan in directions" problem (e.g., word search, connect-4, path-finding with local constraints). The brute-force is justified by the small, fixed grid size.

### Tags
Array(#array), Matrix(#matrix), Enumeration(#enumeration)

### Similar Problems
