### Leetcode 1138 (Medium): Alphabet Board Path [Practice](https://leetcode.com/problems/alphabet-board-path)

### Description  
Given an **alphabet board** as a grid:  
```
["abcde", 
 "fghij", 
 "klmno", 
 "pqrst", 
 "uvwxy", 
 "z"]
```
You start at position (0,0) ('a').  
You can move:  
- 'U' (up one row)  
- 'D' (down one row)
- 'L' (left one column)
- 'R' (right one column)  
Each move must remain in bounds on the board—positions without a character are invalid (e.g., only (5,0) is valid for 'z').  
When you reach a character's cell, append '!' to your path to select it.  
Given a target string, find any shortest sequence of moves and '!'s to spell it out.

### Examples  

**Example 1:**  
Input: `target = "leet"`  
Output: `"DDR!UURRR!!DDD!"`  
*Explanation: Start at 'a' (0,0). Go down two ('D','D') to 'l' (2,1), select. Next 'e' (0,4): up twice, right three ('U','U','R','R','R'), select—note we can stay at same cell and select ('!') as needed. Proceed same for next 'e', then down three to 't' (3,4) ('D','D','D','!').*

**Example 2:**  
Input: `target = "code"`  
Output: `"RR!DD!RR!UUL!"`  
*Explanation: From 'a' go right twice to 'c' (0,2), select. Down twice to 'o' (2,4), select. Right twice to 'd' (0,3) (note: must return upwards), select. Up twice, left once to 'e' (0,4), select.*

**Example 3:**  
Input: `target = "z"`  
Output: `"DDDDD!"`  
*Explanation: Move down five times from 'a' to (5,0), select 'z'.*

### Thought Process (as if you’re the interviewee)  
First, map each letter to its (row, col) coordinate on the board.  
Start at (0,0). For each character in the target:
- Find its coordinates.
- Move from the current position to the target position:
  - Must be careful about out-of-bounds moves, especially when moving to or from 'z' (only at (5,0): can't move right from 'z' or go to (5,col>0)).
- To avoid invalid positions:
  - When moving **to 'z'**, move horizontally (L/R) before vertically (D).
  - When moving **away from 'z'**, move vertically (U) before horizontally (R/L).
  - For all other moves, it’s generally safe to move vertical then horizontal.
- For each letter, build up the sequence of 'U', 'D', 'L', 'R' instructions to the next letter, then add '!'.
- Update current position.

Optimized: Build a map of each letter’s position up front. Iterate target; for each, path-find naïvely with movement order-correctness for 'z' cases.

### Corner cases to consider  
- Moving to or from 'z' (must avoid moving onto invalid cells: only col=0 is valid on last row)
- Consecutive duplicate letters (should just add '!' again, no move needed)
- Single-character target (e.g. "a", "z")
- Very long target string, possible performance issues if not handled efficiently
- Letters always present on board, but if coordinates improperly mapped could get index errors

### Solution

```python
def alphabetBoardPath(target: str) -> str:
    # Board mapping: letter to (row, col)
    board = [
        "abcde",
        "fghij",
        "klmno",
        "pqrst",
        "uvwxy",
        "z"
    ]
    char_pos = {c: (r, c_idx)
                for r, row in enumerate(board)
                for c_idx, c in enumerate(row)}
    
    res = []
    cur_row, cur_col = 0, 0
    
    for ch in target:
        next_row, next_col = char_pos[ch]
        # Special case for 'z': move horizontally first then down
        # Otherwise, normal: move vertically, then horizontally
        dr = next_row - cur_row
        dc = next_col - cur_col

        # If moving to 'z', move horizontally (L/R) first THEN vertical
        # If moving from 'z', move up before moving left/right
        if ch == 'z':
            # Move left/right first (only col=0 is valid for 'z')
            if dc < 0:
                res.append('L' * (-dc))
            elif dc > 0:
                res.append('R' * dc)
            if dr > 0:
                res.append('D' * dr)
            elif dr < 0:
                res.append('U' * (-dr))
        else:
            # When moving FROM 'z', must move up first
            if cur_row == 5:
                if dr < 0:
                    res.append('U' * (-dr))
                if dc < 0:
                    res.append('L' * (-dc))
                elif dc > 0:
                    res.append('R' * dc)
                if dr > 0:
                    res.append('D' * dr)
            else:
                # Otherwise, vertical then horizontal is always safe
                if dr < 0:
                    res.append('U' * (-dr))
                elif dr > 0:
                    res.append('D' * dr)
                if dc < 0:
                    res.append('L' * (-dc))
                elif dc > 0:
                    res.append('R' * dc)
        res.append('!')
        cur_row, cur_col = next_row, next_col
    return ''.join(res)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), with N = len(target). Each move is constant time since board and map are fixed size.
- **Space Complexity:** O(1) for board mapping (26 elements), O(N) for result string (with moves and '!' per char).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the board layout changes (e.g. a different board shape)?
  *Hint: Parameterize the board, don’t hard-code rows/columns or mapping.*

- Can you return all shortest paths, not just one?
  *Hint: Need BFS for all minimal paths, track all possible ways at each step.*

- How would you minimize *turns* between moves (fewest direction changes)?
  *Hint: Add direction state, dynamic programming for minimal-turn paths.*

### Summary
This problem uses the **string building** and **mapping** patterns, similar to coordinate pathfinding or "keyboard moves". The care around invalid cells (especially when using a ragged grid like for 'z') is a classic grid navigation consideration and appears in many "minimum move" or "maze" path problems. The approach is greedy—simply calculating row and column deltas per step—and robust for this fixed-size board.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
