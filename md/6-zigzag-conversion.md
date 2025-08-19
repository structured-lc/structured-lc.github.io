### Leetcode 6 (Medium): Zigzag Conversion [Practice](https://leetcode.com/problems/zigzag-conversion)

### Description  
Given a string and a number `numRows`, write the characters of the string in a zigzag pattern:
- Start from the top, place characters vertically down
- Once you reach the bottom, move up diagonally until you reach the top row again, then repeat
After placing all characters in this pattern, **read the rows sequentially** to produce the output string.

Example (for `s = "PAYPALISHIRING"`, `numRows = 3`):

```
P   A   H   N
A P L S I I G
Y   I   R
```
Reading each row: "PAHNAPLSIIGYIR".

### Examples  

**Example 1:**  
Input: `s = "PAYPALISHIRING", numRows = 3`  
Output: `PAHNAPLSIIGYIR`  
*Explanation: P is placed in row 0, A in row 1, Y in row 2, P in row 1 (going upward), and so on. Finally, reading rows top-down and left-right: "PAHNAPLSIIGYIR".*

**Example 2:**  
Input: `s = "PAYPALISHIRING", numRows = 4`  
Output: `PINALSIGYAHRPI`  
*Explanation: The pattern is:*

```
P     I    N
A   L S  I G
Y A   H R
P     I
```

*Reading rows: "PINALSIGYAHRPI".*

**Example 3:**  
Input: `s = "A", numRows = 1`  
Output: `A`  
*Explanation: Only one row, so output is unchanged.*

### Thought Process (as if you’re the interviewee)  

First, I'll consider the **brute-force approach**:  
- Place each character in a 2D array/grid as per the zigzag pattern, then concatenate the rows for the result string.

But, that's unnecessary - instead, I can use a **list of strings (one for each row)**:
- Traverse the string, appending each character to the correct row string.
- Use a variable to track current row and direction (down/up).
- Once completed, join all row strings.

This approach is efficient and avoids creating an unnecessary grid.

**Trade-offs:**  
- With minimal space (just the row strings), and with only a single pass through the input, this is both time- and space-efficient.

### Corner cases to consider  
- `numRows = 1`: Output should be the original string.
- `numRows ≥ len(s)`: Each char will be in its own row, so output is unchanged.
- Empty string: Should return empty string.
- Very short strings.

### Solution

```python
def convert(s: str, numRows: int) -> str:
    # Handle special cases directly
    if numRows == 1 or numRows >= len(s):
        return s

    # Initialize a list for each row
    rows = [''] * numRows
    cur_row = 0
    going_down = False

    # Place each character in the right row
    for c in s:
        rows[cur_row] += c
        # Change direction at the first or last row
        if cur_row == 0 or cur_row == numRows - 1:
            going_down = not going_down
        cur_row += 1 if going_down else -1

    # Concatenate all rows for result
    return ''.join(rows)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s), as each character is processed once.
- **Space Complexity:** O(n), storing up to n characters in total for all row strings.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `numRows` is very large relative to `len(s)`?  
  *Hint: Does it matter if some rows are empty?*

- Can this be done in-place, i.e., with O(1) extra space?  
  *Hint: Consider if string immutability allows this in Python?*

- Can you print the zigzag as a 2D grid, not just return a single string?  
  *Hint: Would you need a 2D array or can you simulate positions?*

### Summary
This approach is a classic **simulation** pattern: traverse with state (direction, row), build the output incrementally. Useful also in similar problems with *patterned string transformations* or *matrix traversals*. The code is simple, avoids unnecessary grids, and efficiently solves the problem with one pass and minimal space.

### Tags
String(#string)

### Similar Problems
