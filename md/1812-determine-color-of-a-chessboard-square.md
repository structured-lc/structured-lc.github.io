### Leetcode 1812 (Easy): Determine Color of a Chessboard Square [Practice](https://leetcode.com/problems/determine-color-of-a-chessboard-square)

### Description  
Given a string like `"a1"` or `"h8"`, representing the coordinates of a square on a classic 8×8 chessboard (`a`-`h` for columns, `1`-`8` for rows), determine whether this square is **white** or **black**. The board alternates colors, starting with black at `"a1"`.  
Return `true` if the square is **white**; otherwise, return `false`.

### Examples  

**Example 1:**  
Input: `coordinates = "a1"`  
Output: `false`  
*Explanation: 'a' is column 1, '1' is row 1. Both are odd. Chessboard starts black in bottom left (a1). 'a1' is black.*

**Example 2:**  
Input: `coordinates = "h3"`  
Output: `true`  
*Explanation: 'h' is column 8, '3' is row 3. Column 8 (even), row 3 (odd) ⇒ one odd, one even ⇒ white square.*

**Example 3:**  
Input: `coordinates = "c7"`  
Output: `false`  
*Explanation: 'c' is column 3, '7' is row 7. Both indices are odd: 'c'=(3), '7'=(7). Both odd ⇒ black.*

### Thought Process (as if you’re the interviewee)  
The first approach is to **visualize the chessboard** and label the colors.  
Notice that the color alternates every column, and also every row. `"a1"` is black, `"a2"` is white, `"b1"` is white, `"b2"` is black, etc.

If the sum of the column index (a→1, b→2, ..., h→8) and row index (1–8) is **even**, the square is black; if **odd**, it's white.  
Alternatively, the *color depends on the parity (even/odd) of the indices*:  
- If both are even or both are odd, the square is black.  
- If one is even and the other odd, the square is white.

Optimal check: `is_white = (column_index + row_index) % 2 == 1`  
Use ASCII codes: `ord(coordinates) - ord('a') + 1` for columns.  
But since ASCII 'a'=97, 'b'=98, etc., and '1' = 49, so we can simply compare `ord(letter) % 2 != int(digit) % 2`.

### Corner cases to consider  
- First or last column or row (`'a1'`, `'h8'`)
- Every other square toggling color—ensure right order for mapping 
- Validity of input: Not needed, as constraint says input is always valid

### Solution

```python
def squareIsWhite(coordinates: str) -> bool:
    # Extract column and row from the input, e.g., 'c7' -> 'c', '7'
    letter = coordinates[0]   # 'a' to 'h'
    digit = coordinates[1]    # '1' to '8'
    
    # Determine the color:
    # - If the parity of column and row indices differs, it's white; else black
    return (ord(letter) % 2) != (int(digit) % 2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Only a fixed number of operations on a 2-character input; no loops or recursion.
- **Space Complexity:** O(1)  
  Uses a constant number of variables and no additional structures.

### Potential follow-up questions (as if you’re the interviewer)  

- If the board had size n × n and the columns or rows could be longer than a single character, would your logic still work?  
  *Hint: Consider mapping multi-letter columns (like Excel columns: 'aa', 'ab', etc.) to indices.*

- How would you return not just white/black, but the full pattern of colors for an arbitrary coordinate list?  
  *Hint: Use list comprehension and the same parity trick for all inputs.*

- What if the bottom left square of the board (e.g., 'a1') was white instead of black?  
  *Hint: Invert your Boolean check.*

### Summary
This problem is a classic **parity check pattern**—determining a property (here, color) based on whether the sum of two indices is odd or even. The approach generalizes to any 2D problem involving checkerboard‐like patterns (e.g. coloring grids, tiling). The resulting code is concise and easy to reason about, relying on ASCII codes and integer parity.


### Flashcard
Convert column letter to number; sum (column + row); return true if sum is odd (white square), false if even (black square).

### Tags
Math(#math), String(#string)

### Similar Problems
- Check if Two Chessboard Squares Have the Same Color(check-if-two-chessboard-squares-have-the-same-color) (Easy)