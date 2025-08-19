### Leetcode 3274 (Easy): Check if Two Chessboard Squares Have the Same Color [Practice](https://leetcode.com/problems/check-if-two-chessboard-squares-have-the-same-color)

### Description  
Given two chessboard coordinates in standard notation (e.g. "a1", "h8"), determine if both squares are the **same color**. Columns are labeled 'a' to 'h', rows '1' to '8'. A chessboard alternates colors, with 'a1' always being black. Coordinates will always be valid.

### Examples  

**Example 1:**  
Input: `coordinate1 = "a1", coordinate2 = "c3"`  
Output: `true`  
*Explanation: Both "a1" and "c3" are black squares on the board.*

**Example 2:**  
Input: `coordinate1 = "a1", coordinate2 = "h3"`  
Output: `false`  
*Explanation: "a1" is black, "h3" is white (different colors).*

**Example 3:**  
Input: `coordinate1 = "b2", coordinate2 = "h8"`  
Output: `true`  
*Explanation: "b2" is white, and "h8" is also white.*

### Thought Process (as if you’re the interviewee)  
First, let’s clarify the core rule: Chessboards alternate colors both by row and column, so whether a square is black or white is determined by the parity (even or odd) sum of its row and column indices.

The brute-force way would be to draw the board and check colors, but that’s tedious and error-prone.

Notice that a square is black if (column index + row index) is even, white if it’s odd.  
To check two squares, just convert both coordinates, calculate column and row indices, sum them, and compare the parity:
- If both are even or both are odd → same color.
- Otherwise → different colors.

This is O(1) time and space, and it’s clear and efficient.

### Corner cases to consider  
- Both coordinates are the same.
- Coordinates on corner squares (like "a1", "h8").
- Different columns, same row.
- Different rows, same column.
- Adjacent squares (they must be different colors).

### Solution

```python
def checkTwoChessboards(coordinate1: str, coordinate2: str) -> bool:
    # Helper to decide "color" parity for a coordinate
    def color_parity(coordinate: str) -> int:
        # col: 'a'-'h' → 1-8, so ord('a') -> 1, ord('b') -> 2, ...
        col = ord(coordinate[0]) - ord('a') + 1
        # row: '1'-'8' as integers
        row = int(coordinate[1])
        # Check if sum is even (Black) or odd (White)
        return (col + row) % 2

    # Same color if parities are equal
    return color_parity(coordinate1) == color_parity(coordinate2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). We do a constant amount of arithmetic and comparisons; does not scale with input.
- **Space Complexity:** O(1). No extra space is allocated; only a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the coordinates are outside the usual chessboard ('i9')?
  *Hint: How could the function handle invalid input gracefully?*

- How would you generalize this to an n × n board with custom dimensions?
  *Hint: How does the color pattern depend on both dimensions?*

- Can you return which color it is (black/white) instead of just same-color or not?
  *Hint: Map parity to colors directly and return a string.*

### Summary
This problem is a classic **parity-check** and grid-coloring issue, common in chessboard and matrix-pattern questions. The color of each cell is derived from the even/odd sum of its zero/one-based indices. The parity trick is widely used in grid or coordinate-based coding tasks and is useful for related problems involving checkerboard patterns or alternating assignments in arrays or matrices.

### Tags
Math(#math), String(#string)

### Similar Problems
- Determine Color of a Chessboard Square(determine-color-of-a-chessboard-square) (Easy)