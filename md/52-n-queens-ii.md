### Leetcode 52 (Hard): N-Queens II [Practice](https://leetcode.com/problems/n-queens-ii)

### Description  
Given a chessboard of size n × n, you need to count all the distinct ways to place n queens on the board so that **no two queens attack each other**. Queens can attack other pieces in the same row, column, or either diagonal. The goal is **just to count** all valid board arrangements, not to print or store the boards.

### Examples  

**Example 1:**  
Input:`n = 4`  
Output:`2`  
Explanation: There are 2 valid ways:
```
. Q . .    . . Q .
. . . Q    Q . . .
Q . . .    . . . Q
. . Q .    . Q . .
```
In both, no two queens are in the same row, column, or diagonal.

**Example 2:**  
Input:`n = 1`  
Output:`1`  
Explanation: Only one way to place the queen on a 1×1 board, so the answer is 1.

**Example 3:**  
Input:`n = 2`  
Output:`0`  
Explanation: Any placement puts two queens attacking each other, so no solutions exist.

### Thought Process (as if you’re the interviewee)  
First, it's clear I need to **try every possible way to put n queens on n rows**, ensuring no two threaten each other. Brute-forcing all nⁿ boards is too slow, but I can optimize using **backtracking**:

- Place a queen in each row, one row at a time.
- For each row, try every column.
- Track which columns, "main" diagonals, and "anti" (counter) diagonals are already threatened using sets or bitmasks.
- If a position is safe, place the queen, mark threats, and move to the next row.
- If I reach row n, it’s a valid solution; increment the count.
- After recursing, remove the queen and continue (backtrack).

Brute-force and backtracking both generate all possible boards, but **backtracking prunes invalid paths early** and uses only O(n) extra space for bookkeeping.  
Bit manipulation further optimizes for n ≤ 32, but for n ≤ 9, readable set logic is efficient and clear.

### Corner cases to consider  
- n = 1: Smallest case, should return 1.
- n = 2 or 3: No solutions, the answer is 0.
- n > 1: Check higher n for efficiency; ensure no stack overflow.
- Validity when no queens can be placed (trim checking).
- Test maximum provided input (e.g. n = 9).

### Solution

```python
def totalNQueens(n: int) -> int:
    # Track columns and diagonals where queens are placed
    def backtrack(row, cols, diags, anti_diags):
        if row == n:
            return 1  # Placed all queens successfully
        count = 0
        for col in range(n):
            diag = row - col
            anti_diag = row + col
            if col in cols or diag in diags or anti_diag in anti_diags:
                continue  # Square is attacked; skip
            
            # Place queen
            cols.add(col)
            diags.add(diag)
            anti_diags.add(anti_diag)
            
            count += backtrack(row + 1, cols, diags, anti_diags)
            
            # Backtrack (remove queen)
            cols.remove(col)
            diags.remove(diag)
            anti_diags.remove(anti_diag)
        return count
    
    return backtrack(0, set(), set(), set())
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n!)  
  - For each row, the queen can go in up to n positions; in practice, the search tree size is bounded by n! due to constraints from column and diagonal attacks.
  - For small n (n ≤ 9), this is efficient.
- **Space Complexity:** O(n)  
  - The extra space comes from the recursion stack (at most n deep) and from three sets up to size n each.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n becomes larger (e.g., n > 15)?  
  *Hint: Explore bit manipulation for fast set operations, or discuss the infeasibility of exhaustive search.*

- How would you print all valid board configurations, not just the count?  
  *Hint: Instead of incrementing a counter, store or print board strings during backtracking.*

- Can you generate just one solution efficiently?  
  *Hint: Exit and return once a valid arrangement is found.*

### Summary
We use the **backtracking** pattern, a classic technique for constraint satisfaction, placing one queen per row and backtracking when a conflict arises. This problem is a textbook example of recursive search with pruning and is common in puzzles, constraint satisfaction, and combinatorics. Variants include solving Sudoku and placing non-attacking knights or bishops.