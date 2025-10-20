### Leetcode 2133 (Easy): Check if Every Row and Column Contains All Numbers [Practice](https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers)

### Description  
Given an n × n matrix, determine if **every row and every column** contains all the numbers from 1 to n exactly once (no duplicates or missing numbers). In other words, **each row and each column must be a permutation of 1, 2, ..., n**.  
This is similar to asking if each row/column is like a row/column of a Latin square (like one Sudoku constraint).

### Examples  

**Example 1:**  
Input: `matrix = [[1,2,3],[3,1,2],[2,3,1]]`  
Output: `True`  
*Explanation: Each row and each column contains exactly 1, 2, 3.*

**Example 2:**  
Input: `matrix = [[1,1,1],[1,2,3],[1,2,3]]`  
Output: `False`  
*Explanation: The first row is [1,1,1] (not a permutation of 1–3). Same for first column.*

**Example 3:**  
Input: `matrix = [[2,1],[1,2]]`  
Output: `True`  
*Explanation: Both rows and columns are permutations of 1–2.*

### Thought Process (as if you’re the interviewee)  
The brute-force way is to check, for every row and every column, whether it contains all numbers from 1 to n once. For each row/column, I can use a set to see if its length is n and includes all expected values.

Optimized approach:
- For each row, check that set(row) is size n and covers 1..n.
- For each column, use a similar check (collect values in a set).
- Since n is small (guaranteed by problem constraints), a nested loop is acceptable.
- Alternatively, use arrays of booleans or simple counters since number range is known.

I’ll prefer using a boolean array of size n for validation, as it avoids repeated sorting/set creation and is O(n) per row/column. I first check rows, then check columns. If any duplicate or missing element, return False immediately. Otherwise, return True.

### Corner cases to consider  
- Matrix has only one element (1×1)
- Duplicate numbers in a row/column
- Missing a number in a row/column
- All numbers are the same
- n = 2 (smallest possible meaningful n > 1)
- Large n, e.g. 100 (performance)
- Non-square (shouldn’t happen by problem definition, but robust code may check)


### Solution

```python
def checkValid(matrix):
    n = len(matrix)
    
    # Check each row
    for row in range(n):
        seen = [False] * n
        for col in range(n):
            val = matrix[row][col]
            # Values must be in the range 1..n
            if not (1 <= val <= n):
                return False
            if seen[val - 1]:
                # Duplicate in the row
                return False
            seen[val - 1] = True

    # Check each column
    for col in range(n):
        seen = [False] * n
        for row in range(n):
            val = matrix[row][col]
            if seen[val - 1]:
                # Duplicate in the column
                return False
            seen[val - 1] = True

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  We visit every matrix cell twice: once when checking all rows, once for columns. Each check for duplicates or missing numbers is O(n); total is O(n²).

- **Space Complexity:** O(n)  
  We use an auxiliary boolean array of size n for each row/column check, but not more. No additional storage grows with n².

### Potential follow-up questions (as if you’re the interviewer)  

- If n is very large or the matrix fills from a stream, how to do it efficiently?  
  *Hint: Can you process rows or columns incrementally? Could you parallelize?*

- What changes if you have 0 ≤ matrix[i][j] < n instead of 1-based numbers?  
  *Hint: Offsets in arrays and range checks.*

- What if only rows (or only columns) needed to be checked?  
  *Hint: Can you stop early, or optimize further?*

### Summary
This problem is a matrix/array validation pattern, closely linked to checking permutations and constraints like in Valid Sudoku (row/column uniqueness). The overall approach uses direct validation via auxiliary arrays per row/column (hashing or fixed-size booleans), which is a common trick when the input range is limited and performance matters. This coding pattern also applies to puzzles, grid validation, and game logic.


### Flashcard
For each row and column, check that its set of values equals {1, 2, ..., n} using a set or boolean array.

### Tags
Array(#array), Hash Table(#hash-table), Matrix(#matrix)

### Similar Problems
- Valid Sudoku(valid-sudoku) (Medium)
- Matrix Diagonal Sum(matrix-diagonal-sum) (Easy)
- First Completely Painted Row or Column(first-completely-painted-row-or-column) (Medium)