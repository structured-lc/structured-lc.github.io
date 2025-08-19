### Leetcode 3257 (Hard): Maximum Value Sum by Placing Three Rooks II [Practice](https://leetcode.com/problems/maximum-value-sum-by-placing-three-rooks-ii)

### Description  
Given an m × n chessboard (2D array) where each cell contains an integer value, place exactly **three rooks** on the board such that **no two rooks attack each other** (i.e., no two are in the same row or same column).  
**Return the maximum possible sum** of the values of the cells on which the rooks are placed.

**Explain in interview:**  
You're given an m × n grid filled with integers. You must pick exactly three different cells so that no two are in the same row or column (i.e., no attacks between any of the three rooks). Your goal is to maximize the sum of the values in the three chosen cells.

### Examples  

**Example 1:**  
Input:  
```
board = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```
Output: `24`  
*Explanation: Place rooks at (2,0)→7, (1,1)→5, (0,2)→3: 7 + 5 + 12 = 24. No two on same row/col.*

**Example 2:**  
Input:  
```
board = [
  [7, -2, 9, 1],
  [5, 16, -3, 2],
  [-4, 6, 11, 8]
]
```
Output: `36`  
*Explanation: Place rooks at (0,2)→9, (1,1)→16, (2,3)→11: 9 + 16 + 11 = 36.*

**Example 3:**  
Input:  
```
board = [
  [-10, -20],
  [-30, -40]
]
```
Output: `-60`  
*Explanation: Only three positions can be chosen; pick any three with minimum overlap. -10 + (-20) + (-30) = -60.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible combinations of three cells such that all three are in different rows and columns.
    - There are heavily nested loops (for m × n cells, pick the first cell, then for the rest, pick a second in a different row/col, then a third in different row/col again).
    - This is O(m²n²), which is fine for small boards but could be slow if m or n are large.

- **Optimized:**  
  We need to select a combination of three distinct rows and three distinct columns, and then maximize the sum of the values taken at those three row/column intersections.
    - For each combination of three distinct rows (m choose 3), and each combination of three distinct columns (n choose 3), pick the permutation (mapping row_i to col_j) that gives the maximum sum.
    - For each set of three rows and three columns, there are 3! = 6 possible bijections (ways to match rows to columns).
    - So, overall, time is O(m³ × n³ × 6), but as m and n are likely small (~100), this is efficient enough for such constraints.

- **Trade-offs:**  
  Instead of storing large intermediate results, we can simply update the answer on each valid placement.

### Corner cases to consider  
- Cells can be negative; maximum sum may be negative.
- m or n < 3 → return 0 or appropriately handle impossible placement.
- All values are negative.
- Board is not square (m ≠ n).
- Large grid with only a few positive values.
- Duplicate values.

### Solution

```python
def maximumValueSum(board):
    m, n = len(board), len(board[0])
    if m < 3 or n < 3:
        return 0  # Cannot place three rooks

    max_sum = float('-inf')

    # Iterate over all combinations of 3 rows
    for r1 in range(m):
        for r2 in range(r1 + 1, m):
            for r3 in range(r2 + 1, m):
                # Iterate over all combinations of 3 columns
                for c1 in range(n):
                    for c2 in range(c1 + 1, n):
                        for c3 in range(c2 + 1, n):
                            # All six permutations of rooks on these rows/cols
                            rows = [r1, r2, r3]
                            cols = [c1, c2, c3]

                            from itertools import permutations

                            for perm in permutations(cols):
                                curr_sum = (
                                    board[rows[0]][perm[0]]
                                    + board[rows[1]][perm[1]]
                                    + board[rows[2]][perm[2]]
                                )
                                if curr_sum > max_sum:
                                    max_sum = curr_sum

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m³ × n³ × 6)  
  - m³: pick 3 distinct rows  
  - n³: pick 3 distinct columns  
  - 6: all permutations for matching rows to columns  
  For reasonable m, n (say ≤ 50), this is feasible.

- **Space Complexity:**  
  O(1) extra space (only a few variables), O(m × n) for the input.  
  No extra storage is needed aside from local vars and input.

### Potential follow-up questions (as if you’re the interviewer)  

- If you needed to place k rooks (for large k), how would you generalize your approach?
  *Hint: Think about DP, matchings, or greedy algorithms for maximum-weight assignment.*

- If there were obstacles (cells you can’t use), how does your implementation change?
  *Hint: Filter out unusable cells before combinations; track feasibility.*

- Can you solve it for a very large board (e.g., m, n up to 1,000,000) but k=3?
  *Hint: Focus on the 3 highest non-conflicting row/col entries; maybe use heaps.*

### Summary
This problem is a combinatorial search for the *maximum sum over independent options* (no row/col collision); it’s similar to assignment and matching problems.  
The key pattern here is **"select k elements, no two share row/column, maximize sum"**, which appears in job assignments or maximum bipartite matching variants.  
The brute approach is viable for k=3, but is not scalable. Generalizing leads to assignment problems (Hungarian Algorithm for bigger k), and can also arise in more classic combinatoric design and grid planning problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix), Enumeration(#enumeration)

### Similar Problems
- Available Captures for Rook(available-captures-for-rook) (Easy)