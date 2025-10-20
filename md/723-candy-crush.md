### Leetcode 723 (Medium): Candy Crush [Practice](https://leetcode.com/problems/candy-crush)

### Description  
You're given a 2D integer grid `board` representing the state of a Candy Crush game. Each cell contains a positive integer (indicating a candy type) or `0` (an empty cell). Your task is to simulate the game:

- **Crushing:** If 3 or more candies of the same type are adjacent either horizontally or vertically, they are considered "crushable".
- **Process:** All such candies are marked and simultaneously set to `0`.
- **Gravity:** After crushing, candies above empty spaces fall down, filling the gaps, and new empty cells appear at the top.
- Repeat the "crush" and "gravity" process until no groups of 3 or more can be crushed.
- Return the final state of the board once it is stable.

### Examples  

**Example 1:**  
Input:  
`board = [ [110,5,112,113,114], [210,211,5,213,214], [310,311,3,313,314], [410,411,412,5,414], [5,1,512,3,3], [610,4,1,613,614], [710,1,2,713,714], [810,1,2,1,1], [1,1,2,2,2], [4,4,4,514,514] ]`  
Output:  
`[ [0,0,0,113,114], [0,0,0,213,214], [0,0,0,313,314], [110,0,0,0,414], [210,0,0,0,3], [310,211,0,513,3], [410,311,412,613,614], [610,411,212,713,714], [710,511,512,1,1], [810,1,2,2,2] ]`  
*Explanation: The candies in the first three columns form several groupings and are repeatedly crushed, and above candies fall until board is stable.*

**Example 2:**  
Input:  
`board = [ [1,2,3], [4,5,6], [7,8,9] ]`  
Output:  
`[ [1,2,3], [4,5,6], [7,8,9] ]`  
*Explanation: No groups of 3+ identical adjacent candies, so the board does not change.*

**Example 3:**  
Input:  
`board = [ [1,1,1], [2,2,2], [3,3,3] ]`  
Output:  
`[ [0,0,0], [0,0,0], [0,0,0] ]`  
*Explanation: All rows are groups of three, so everything is crushed and the board empties.*

### Thought Process (as if you’re the interviewee)  
Let's simulate the actual Candy Crush mechanics:

- **Naive brute-force idea**: Repeatedly scan the entire board, for each cell check if it's part of a horizontal or vertical sequence of 3 or more identical candies.
    - If so, mark them for crushing.
    - After all crushable groups are marked, set those cells to 0.
    - Simulate gravity by letting all candies fall down in each column.
    - Repeat until no more crushes are possible.
- **Implementation details**:
    - Need to make sure to only "crush" after marking, so that searches for crush groups in the current round don't get confused by cells we've already zeroed out.
    - For marking: possible to temporarily mark cells with e.g. negative values (as a flag) then zero them all at once.
    - Gravity: process each column bottom-up, moving down the non-zero values.
- **Optimizations**:
    - Board is at most 100×100, so O(m×n) per round is okay. If the board is much larger, we could try to only process potentially changed regions, but for this problem it's unnecessary.
- **Trade-offs**: Marking in-place saves on space, iterating until stable may take multiple passes, but it is straightforward and robust.

### Corner cases to consider  
- Board with no crushable candies (already stable)
- Board with some columns having all cells crushed (entire column becomes zeros)
- Chained crushing: new groups form after gravity, so process must repeat
- All cells are the same (everything gets crushed in the first pass)
- Minimum board size: 1×1, 2×2
- Negative or zero values shouldn't appear in final board except for spaces

### Solution

```python
def candyCrush(board):
    rows = len(board)
    cols = len(board[0])
    todo = True

    while todo:
        todo = False
        # Mark candies to crush, use negative to indicate "crush this" (but keep original type).
        for r in range(rows):
            for c in range(cols):
                val = abs(board[r][c])
                if val == 0:
                    continue
                # Check horizontal group
                if c + 2 < cols and abs(board[r][c+1]) == val and abs(board[r][c+2]) == val:
                    k = c
                    while k < cols and abs(board[r][k]) == val:
                        board[r][k] = -val
                        k += 1
                    todo = True
                # Check vertical group
                if r + 2 < rows and abs(board[r+1][c]) == val and abs(board[r+2][c]) == val:
                    k = r
                    while k < rows and abs(board[k][c]) == val:
                        board[k][c] = -val
                        k += 1
                    todo = True

        # Set all marked cells to 0 (crushed)
        for r in range(rows):
            for c in range(cols):
                if board[r][c] < 0:
                    board[r][c] = 0

        # Apply gravity: let candies fall
        for c in range(cols):
            write_row = rows - 1
            for r in reversed(range(rows)):
                if board[r][c] > 0:
                    board[write_row][c] = board[r][c]
                    write_row -= 1
            for r in reversed(range(write_row+1)):
                board[r][c] = 0

    return board
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((rows × cols)²)
    - Each pass over the board is O(rows × cols), and in the worst chain crush scenario, we might need O(rows × cols) passes (though usually far fewer in practice).
- **Space Complexity:** O(1) extra space
    - In-place marking and gravity operations. No additional data structures besides some pointers and counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the board is very large—can you minimize the area scanned each round?
  *Hint: Track which rows/columns changed, or only process regions actually affected last round.*

- Could you solve this in a single pass, or is simulation required?
  *Hint: Think about cases where new matches only appear after gravity, making simulation necessary.*

- How would you add special candies (stripes, wrappers, etc.) like in the real game?
  *Hint: Add extra properties or markers to cells, extend the grouping/crushing rules.*

### Summary
This problem is a **grid simulation** using repeated passes. The key patterns are board state scanning, marking to avoid premature overwriting, and simulating gravity. The same technique can be applied to match-3 game clones, Tetris-like simulations, or avalanche dynamics in physics models. No advanced data structures are needed—careful in-place updates and a loop until stabilization suffice.


### Flashcard
Repeatedly mark and crush groups of ≥3 same candies, set to 0, then let candies fall down; repeat until stable.

### Tags
Array(#array), Two Pointers(#two-pointers), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
