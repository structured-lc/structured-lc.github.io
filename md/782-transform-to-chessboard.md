### Leetcode 782 (Hard): Transform to Chessboard [Practice](https://leetcode.com/problems/transform-to-chessboard)

### Description  
Given an n × n binary grid (board), where each cell is a 0 or 1, you can **swap any two rows** or **any two columns** any number of times. Your goal is to transform the board into a **chessboard**—a grid such that no two adjacent cells (up, down, left, right) have the same value (so every row and every column alternates 0,1,0,1,... or 1,0,1,0,...).  
Return the **minimum number of row and column swaps** needed to reach this chessboard configuration.  
If impossible, return -1.

### Examples  

**Example 1:**  
Input: `[[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]`  
Output: `2`  
*Explanation: Swap the first and second column (now each row is alternating), then swap the second and third rows. Now, every row and every column alternates properly.*

**Example 2:**  
Input: `[[0,1],[1,0]]`  
Output: `0`  
*Explanation: Already a chessboard; no swaps needed.*

**Example 3:**  
Input: `[[1,0],[1,0]]`  
Output: `-1`  
*Explanation: Both rows are the same, but in a chessboard, each pair of adjacent rows/cols must be opposite. Not possible to fix this by swapping rows or columns.*

### Thought Process (as if you’re the interviewee)  
First, observe that swapping rows or columns lets us reorder them, but we can't change row/column *content*.  
A chessboard has only two kinds of rows (alternating 0,1,0,1,... and 1,0,1,0,...), and they must be perfect opposites.  
So:
- All rows must be either equal to one template row or its complement.
- The same is true for columns.

If any row/column is "different" (not matching template or complement), it’s impossible.

Steps:
1. Check that all rows are only two types, and they are bitwise opposites.
2. Check the same for columns.
3. Count the minimal swaps needed to arrange rows and columns in alternating order.
   - For a valid n × n chessboard, half the rows (⌊n/2⌋ each) must be of each type (or ⌈n/2⌉, etc. if n is odd).
   - The minimal swaps are calculated by matching the current arrangement to a "target" (alternating) arrangement.

Why can't we brute-force? Too many permutations; O((n!)²) is intractable for n=30.  
The final approach uses two linear O(n²) scans for validation and O(n) to count swaps. Optimized and guaranteed.

### Corner cases to consider  
- n is even vs odd (affects swap counting, e.g., which pattern to target)
- Board contains only one unique row/col (invalid unless n=1)
- Not all rows/cols are opposites
- Already a chessboard (returns 0)
- Swappable but requires multiple moves

### Solution

```python
def movesToChessboard(board):
    n = len(board)
    
    # Step 1: Check all rows (and columns) are either same as the first row, or its complement
    def count_pattern(lines):
        pattern1 = tuple(lines[0])
        pattern2 = tuple(1 - x for x in pattern1)
        count1 = count2 = 0
        for row in lines:
            if tuple(row) == pattern1:
                count1 += 1
            elif tuple(row) == pattern2:
                count2 += 1
            else:
                return -1, -1, None, None  # Invalid board
        return count1, count2, pattern1, pattern2
    
    rows = [row[:] for row in board]
    cols = [ [board[r][c] for r in range(n)] for c in range(n) ]
    
    r1, r2, row_a, row_b = count_pattern(rows)
    c1, c2, col_a, col_b = count_pattern(cols)
    if r1 == -1 or c1 == -1:
        return -1
    
    # Both row and col patterns must appear the right number of times
    if not (abs(r1 - r2) <= 1 and r1 + r2 == n and abs(c1 - c2) <= 1 and c1 + c2 == n):
        return -1
    
    # Step 2: Count minimal swaps for rows and columns
    def min_swaps(patterns):
        pattern = patterns[0]
        ones = sum(pattern)
        ideal = [i % 2 for i in range(n)]
        swaps = sum(pattern[i] != ideal[i] for i in range(n))
        if n % 2 == 0:
            return min(swaps, n - swaps) // 2  # can flip target start
        else:
            if swaps % 2 == 0:
                return swaps // 2
            else:
                return (n - swaps) // 2
    
    row_swaps = min_swaps(row_a)
    col_swaps = min_swaps(col_a)
    return row_swaps + col_swaps
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) — We scan every row and column twice for validation and each pattern.  
- **Space Complexity:** O(n²) — to store lists of rows and columns, but we don’t use extra storage proportional to n² otherwise.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the board was not square?
  *Hint: How would the alternating pattern adapt if the board was m × n?*

- What changes if we can only swap adjacent rows/columns?
  *Hint: Does the minimum swap count become harder to compute?*

- Can you generalize for k (not just 2) possible cell values?
  *Hint: What is the k-color chessboard property?*

### Summary
This problem uses the "canonical form checking" pattern—check that all patterns are legal, then track minimal swaps to match alternating patterns.  
This approach appears in problems involving board normalization or grid state transformation.  
It uses bit manipulation, pattern matching, and minimal swap counting.  
Efficient in time and space, avoids combinatorial explosion by leveraging board properties.

### Tags
Array(#array), Math(#math), Bit Manipulation(#bit-manipulation), Matrix(#matrix)

### Similar Problems
- Minimum Moves to Get a Peaceful Board(minimum-moves-to-get-a-peaceful-board) (Medium)