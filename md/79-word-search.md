### Leetcode 79 (Medium): Word Search [Practice](https://leetcode.com/problems/word-search)

### Description  
You’re given a 2D grid of letters (board) and a target string (word). The task is to determine whether the word can be constructed by sequentially moving through adjacent cells (up, down, left, right—no diagonals). You cannot reuse a cell in a single word path; each board cell may be used only once per search. Return true if the word exists on the board, otherwise return false.

### Examples  

**Example 1:**  
Input:  
`board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`,  
`word = "ABCCED"`  
Output: `true`  
*Explanation: Use the path A→B→C→C→E→D. Each cell is adjacent and used once.*

**Example 2:**  
Input:  
`board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`,  
`word = "SEE"`  
Output: `true`  
*Explanation: Use the path S→E→E, starting at (2,1) → (2,2) → (1,2).*

**Example 3:**  
Input:  
`board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`,  
`word = "ABCB"`  
Output: `false`  
*Explanation: The path would require reusing a cell (the last 'B'), which is not allowed.*

### Thought Process (as if you’re the interviewee)  
First, I’d check every position on the board as a possible starting point for searching the word. For each cell, I can do a depth-first search (DFS) recursively, moving up, down, left, or right, to match the next character. To ensure each cell is used only once, I need to mark visited cells on the current path—often by temporarily modifying the board or using a separate visited grid.

Brute-force would try all possible paths, but to optimize, I can:
- Prune the search as soon as any character does not match.
- Backtrack efficiently by undoing the visited marking as I return from recursion.

Given the grid is small (max 6x6), this approach will be reasonably efficient.

**Trade-offs:**  
- DFS recursion is simple to implement and matches the constraints.
- I need to be careful with visited cell marking to avoid accidental reuse.

### Corner cases to consider  
- One-letter board and one-letter word.
- Word longer than total grid cells (immediate false).
- Board with all identical letters, word with repeated letters (tests no-reuse rule).
- Empty board or empty word (should be handled if constraints allow).
- Grid has 1 row/column (test boundary movement).
- Word requires moving diagonally (should be false, since diagonals aren’t allowed).

### Solution

```python
def exist(board, word):
    # Dimensions of the board
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c, index):
        # If we've matched all characters in word
        if index == len(word):
            return True
        # Out of bounds or char doesn't match or cell already visited
        if (r < 0 or r >= rows or
            c < 0 or c >= cols or
            board[r][c] != word[index]):
            return False
        
        # Mark current cell as visited (temporarily set to None or another symbol)
        temp = board[r][c]
        board[r][c] = '#'  # Any non-alpha symbol works
        
        # Search all four directions
        found = (dfs(r+1, c, index+1) or
                 dfs(r-1, c, index+1) or
                 dfs(r, c+1, index+1) or
                 dfs(r, c-1, index+1))
        
        # Restore the original value (backtrack)
        board[r][c] = temp
        return found
    
    for row in range(rows):
        for col in range(cols):
            if dfs(row, col, 0):
                return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(M × N × 4ᴸ), where M × N is the number of cells, and L is the length of the word.  
  Each DFS call may branch in up to 4 directions, for up to L steps, but in practice, visited marking and pruning reduce this.

- **Space Complexity:**  
  O(L) for the recursion stack (max depth is length of the word), plus O(1) extra space since marking visited cells is done in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- How do you efficiently handle very large boards (hundreds or thousands of cells)?  
  *Hint: Discuss iterative DFS to avoid stack overflow, maybe Trie optimizations for multiple words.*

- What if you had to find multiple words on the same board?  
  *Hint: Preprocess all words into a Trie and search simultaneously (Word Search II).*

- Can you modify the solution to return all possible paths or the path taken, not just True/False?  
  *Hint: Change the recursion to collect and return the path along with checking each step.*

### Summary
This problem uses backtracking and depth-first search (DFS) to explore all valid paths forming the word. The classic technique is useful for puzzles, games, and logic grid problems where you need to make reversible choices and explore alternatives. The pattern here is often seen in maze search, Sudoku, and constraint satisfaction tasks.


### Flashcard
For each cell, use DFS to search for the word, marking cells as visited to avoid reuse, and backtrack if the path fails.

### Tags
Array(#array), String(#string), Backtracking(#backtracking), Depth-First Search(#depth-first-search), Matrix(#matrix)

### Similar Problems
- Word Search II(word-search-ii) (Hard)