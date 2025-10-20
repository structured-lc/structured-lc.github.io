### Leetcode 419 (Medium): Battleships in a Board [Practice](https://leetcode.com/problems/battleships-in-a-board)

### Description  
You are given an m × n 2D grid `board` representing a battleship board.  
Each cell is either:
- `'X'` (part of a battleship),
- or `'.'` (empty water).

Battleships can only be placed either **horizontally** or **vertically**, and always occupy consecutive cells.  
There are no adjacent battleships (meaning, no two 'X's from different battleships are horizontally or vertically or diagonally next to each other).  
Your task: **Return the number of distinct battleships on the board**.


### Examples  

**Example 1:**  
Input: `board = [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]`  
Output: `2`  
*Explanation: There are two battleships: One vertical on the right (column 3) and one horizontal at top left (row 0, column 0).*

**Example 2:**  
Input: `board = [["."]]`  
Output: `0`  
*Explanation: The board is empty. No battleships present.*

**Example 3:**  
Input: `board = [["X","X","X"]]`  
Output: `1`  
*Explanation: All three 'X's belong to a single horizontal battleship.*


### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  I could scan the board for 'X's and whenever I see one, mark all its connected horizontal or vertical 'X's as visited (using either DFS or by mutating the board or keeping a separate visited set). This way, I only count a new ship if it hasn't been seen before. This works but visits each battleship cell multiple times and/or requires O(m n) extra space.

- **Optimized idea (Constant space):**  
  Since ships cannot touch, every ship starts at its "top-left" corner:  
  - For each cell, if it's 'X', check if the cell **above** or **to the left** is also 'X'.  
  - If neither is 'X' (either they are out of bounds or they are '.'), this 'X' is the top-left/corner of a new ship. **Count it.**  
  - Never double-count: all other pieces of the same ship will have a neighbor 'X' up or left.

- **Trade-offs:**  
  - This solution is single-pass, uses no extra space (beyond variables), and is simple.
  - No need to mutate the board or use a stack/queue.


### Corner cases to consider  
- Empty board (0 rows or 0 columns)
- All cells are water ('.')
- Board of size 1 × 1 (single cell)
- One big horizontal or vertical battleship.
- All battleships are of length 1 (no connected 'X's)
- Non-square boards (e.g., 1 × N, M × 1)


### Solution

```python
def countBattleships(board):
    if not board or not board[0]:
        return 0
    m, n = len(board), len(board[0])
    count = 0

    for i in range(m):
        for j in range(n):
            # Only count if board[i][j] is 'X'
            # and there is no 'X' above or to the left (no connected part)
            if board[i][j] == 'X':
                top = i > 0 and board[i-1][j] == 'X'
                left = j > 0 and board[i][j-1] == 'X'
                if not top and not left:
                    count += 1
    return count
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n) — Every cell visited exactly once.
- **Space Complexity:** O(1) — No extra space beyond constants; not even modifying the grid.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you are required to sink (mark) the battleships as you count them (i.e., mutate the board)?
  *Hint: Use DFS/BFS from each discovered 'X' to visit all connected 'X's and mark them as visited.*

- Can you solve it if ships can be touching diagonally?
  *Hint: Carefully track diagonally adjacent cells and avoid double-counting.*

- What if the input is a stream of updates: set or unset ('X' or '.') at any cell and query count at any time?
  *Hint: Might need a Union-Find (DSU) or incremental/online counting structure.*


### Summary
This is a **single-pass counting** pattern — visit each cell, and use local rules to identify features (start of a battleship) without global state or backtracking. It's a variant of "connected components" counting, but because of the non-touching guarantee, it avoids recursion/DFS entirely. This pattern is useful in grid processing when local relationships can uniquely identify larger structures — for example: mine detection, island counting (with separation rule), or text region detection in OCR.


### Flashcard
Count ships by only incrementing when encountering 'X' that has no 'X' directly above or to its left—this marks the top-left corner of each ship without extra space.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Matrix(#matrix)

### Similar Problems
- Number of Islands(number-of-islands) (Medium)
- Walls and Gates(walls-and-gates) (Medium)
- Max Area of Island(max-area-of-island) (Medium)
- Rotting Oranges(rotting-oranges) (Medium)