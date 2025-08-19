### Leetcode 1072 (Medium): Flip Columns For Maximum Number of Equal Rows [Practice](https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows)

### Description  
Given a binary matrix (each cell is 0 or 1), you may flip any set of columns (flip means changing every cell in that column from 0→1 or 1→0). After any number of such column flips, return the largest number of rows that can be made entirely equal (all 0s or all 1s).

### Examples  

**Example 1:**  
Input: `matrix = [[0,1],[1,1]]`  
Output: `1`  
Explanation: If you do not flip any columns, only the second row is all the same (1,1).

**Example 2:**  
Input: `matrix = [[0,1],[1,0]]`  
Output: `2`  
Explanation: Flip the first column. The matrix becomes:
```
[[1,1],
 [0,0]]
```
Both rows have equal values after the flip.

**Example 3:**  
Input: `matrix = [[0,0,0],[0,0,1],[1,1,0]]`  
Output: `2`  
Explanation: Flip the last column. The matrix becomes:
```
[[0,0,1],
 [0,0,0],
 [1,1,1]]
```
Now two rows are identical (second and third).

### Thought Process (as if you’re the interviewee)  
Start by brute-forcing: try every possible combination of column flips; but this is O(2ⁿ × m × n) (n=columns), far too slow.

Key insight: **Rows can be made equal if their patterns are the same after the same column flips**. If you flip a column where two rows differ, both can match.

Suppose you want all rows to look the same as row A. For each row, figure out which columns must be flipped to make that row identical to A. If two rows can be made identical under the *same* set of flips, their "deltas" to row A will be the same.

In practice, pick each row as a "base" (or equivalently, try all), and, for each row, encode for each other row whether you need to flip 0 or 1 in each column to match that base row. Rows with the same "delta pattern" (row[i][j] ^ base[j]) can be made equal via the same set of flips.

So, for every row, normalize it so its first column is always 0 (subtract its first element from each; or xor with its first element), then count how many rows share that pattern. The result is the count of the most common pattern.

This trick reduces the problem to grouping rows by a normalized pattern.

### Corner cases to consider  
- Empty matrix
- Matrix with only one row or one column
- Every row already equal
- All rows unique, can't be made equal even after flips
- All 0s or all 1s
- Matrix with all possible different patterns

### Solution

```python
def maxEqualRowsAfterFlips(matrix):
    # Each pattern will be stored as a tuple
    pattern_count = {}
    for row in matrix:
        # Normalize the row: treat row[0] as the base (to enforce all rows to 'start' at 0)
        # This makes all rows that can be made equal by column flips have the same pattern
        base = row[0]
        normalized = tuple(cell ^ base for cell in row)
        pattern_count[normalized] = pattern_count.get(normalized, 0) + 1
    # The max frequency among all normalized patterns is the answer
    return max(pattern_count.values())
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n). Each row is processed in O(n) and there are m rows. Counting/finding maximum is O(m).
- **Space Complexity:** O(m). At most, there can be m unique pattern keys in the hashmap.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the elements are not just 0 or 1 but more general integers?  
  *Hint: How do you generalize a 'flip' in higher-alphabet?*

- What if you can only flip up to K columns?  
  *Hint: Try all column-flip combinations of size K.*

- If we are not allowed to use extra space proportional to the number of rows, how should we solve it?  
  *Hint: Is it possible to sort the normalized rows and count consecutive runs?*

### Summary
This problem uses a **hashing and pattern normalization** technique to reduce a combinatorial flipping problem to counting identical "delta" patterns, which is common in bit manipulation and equivalence-based grouping problems. This normalization trick can be applied whenever you must make items equal by inverting or toggling independent dimensions, such as making arrays/lists similar by flipping/subtracting in some positions.

### Tags
Array(#array), Hash Table(#hash-table), Matrix(#matrix)

### Similar Problems
