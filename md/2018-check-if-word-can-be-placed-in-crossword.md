### Leetcode 2018 (Medium): Check if Word Can Be Placed In Crossword [Practice](https://leetcode.com/problems/check-if-word-can-be-placed-in-crossword)

### Description  
Given a 2D board representing a crossword puzzle, where each cell contains a lowercase letter, space `' '` (empty), or `'#'` (blocked), and a target word, determine if the word can be placed either horizontally or vertically (including both directions: left-to-right/right-to-left, top-down/bottom-up) according to these rules:
- The word cannot overlap with any `'#'`.
- Each letter of the word must either:
  - Overwrite an empty cell, or
  - Match a pre-filled letter in the board.
- Word cannot "continue" through blank cells/letters right before or after it (i.e., must fit exactly within an unbroken segment, not extend into it).
- Placement must fit within board boundaries.

### Examples  

**Example 1:**  
Input:  
board =
```
[[' ', '#', 'a'],
 [' ', '#', 'c'],
 [' ', '#', 'a']]
word = "ac"
```
Output: `True`  
Explanation:  
The word `"ac"` can be placed vertically starting at (0,2). It matches the existing 'a' and then 'c'. Above and below it are blocked or out-of-bounds, so the fit is valid.

**Example 2:**  
Input:  
board =
```
[['#', ' ', '#'],
 [' ', ' ', '#'],
 ['#', 'c', ' ']]
word = "abc"
```
Output: `False`  
Explanation:  
No suitable segment (horizontal or vertical) can take the word `"abc"` according to the rules.

**Example 3:**  
Input:  
board =
```
[[' ', 'b', ' '],
 [' ', '#', ' '],
 [' ', 'c', ' ']]
word = "abc"
```
Output: `True`  
Explanation:  
The word `"abc"` can be placed vertically (top-down) in the first column starting from (0,0): cells are [' ', ' ', ' '], so we can put 'a', 'b', 'c' there. No blocked cell before/after the word.

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to try placing the word at every possible starting cell, in every possible direction (horizontally and vertically, and each direction), checking strict rules as specified.
- For each candidate segment, check the following:
  - Segment must be exactly the word's length.
  - No cells are `'#'` inside the segment and before/after borders the board or is immediately adjacent to a `'#'`.
  - Each cell in the segment is either empty or matches the word (at that letter).
  - Repeat this for both the original word and its reverse (to cover both directions).
- This requires checking every possible segment of length = len(word) in row and column directions.  
- We can process each row/column as a list to identify valid "slots" where word fits, giving us modular logic.

### Corner cases to consider  
- Word longer than row/column (impossible).
- There are multiple adjacent empty spaces, not separated by a `'#'`, but not exactly word length.
- Pre-filled letters do not match the word.
- Valid placements at the very start or end of the row/column.
- Word must terminate tightly against the board boundary or a `'#'`.
- Blocked/filled cells before or after the segment.
- Word or board may contain only blocked cells.
- Board or word length is 0 (empty).

### Solution

```python
def placeWordInCrossword(board, word):
    rows, cols = len(board), len(board[0])
    
    def can_place(segment, word):
        # check that segment and word have the same length and all cells allow placement
        for cell, ch in zip(segment, word):
            if cell != ' ' and cell != ch:
                return False
        return True
    
    def check_line(line, word):
        n = len(line)
        w = len(word)
        i = 0
        while i <= n - w:
            # check if this window fits the rules
            if (i == 0 or line[i-1] == '#') and (i + w == n or line[i+w] == '#'):
                segment = line[i:i+w]
                if '#' not in segment and can_place(segment, word):
                    return True
            # Move to next possible start
            # Skip this run if a '#' appears within window: valid window must not cross a '#'
            while i < n and line[i] != '#':
                i += 1
            i += 1
        return False
    
    # check all rows and columns for both word directions
    for _ in range(2):
        for r in range(rows):
            line = [board[r][c] for c in range(cols)]
            if check_line(line, word) or check_line(line, word[::-1]):
                return True
        # transpose board to check columns as rows
        board = [list(row) for row in zip(*board)]
        rows, cols = cols, rows
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × w), where m,n are the board dimensions and w = len(word), because we check each row and column, examining every potential window of length w.
- **Space Complexity:** O(max(m,n)), mainly for storing temporary row/column arrays during checking and for the transposed board.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this to place all possible words from a dictionary?
  *Hint: Think about preprocessing slots and efficient candidate matching for bulk checks.*

- Can you return all valid placements (positions and directions) instead of just True/False?
  *Hint: Track segment index and direction; collect when condition is satisfied.*

- How would you optimize it if words are frequently inserted or removed from the crossword (dynamic update)?
  *Hint: Consider incremental updates or additional space for fast slot lookup.*

### Summary
This problem is an application of the *scan and check pattern*—sliding a window and verifying segment rules—in both rows and columns of a grid. The approach modularizes the slot checking, handles both directions by reversing, and fits grid processing problems found in crossword, word search, seating, or scheduling questions. It's a versatile pattern useful for puzzles, games, and grid constraint checking in interviews.


### Flashcard
Check if a word can be placed in a crossword by trying all possible placements and checking for validity.

### Tags
Array(#array), Matrix(#matrix), Enumeration(#enumeration)

### Similar Problems
