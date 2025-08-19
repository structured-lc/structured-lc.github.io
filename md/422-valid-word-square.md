### Leetcode 422 (Easy): Valid Word Square [Practice](https://leetcode.com/problems/valid-word-square)

### Description  
Given a list of strings, check if they form a **valid word square**.  
A word square means that, for every index k, the kᵗʰ row and kᵗʰ column should be exactly the same when read left-to-right and top-to-bottom:  
- Row i, character j == Row j, character i for all valid indices.  
Rows can have different lengths, and the "square" is not always n×n. It’s only valid if the vertical and horizontal alignments agree.

### Examples  

**Example 1:**  
Input: `["abcd","bnrt","crmy","dtye"]`  
Output: `True`  
*Explanation:  
Rows and columns read:  
0: "abcd" == "abcd"  
1: "bnrt" == "bnrt"  
2: "crmy" == "crmy"  
3: "dtye" == "dtye"  
All lines match.*

**Example 2:**  
Input: `["abcd","bnrt","crm","dt"]`  
Output: `True`  
*Explanation:  
0: "abcd" == "abcd"  
1: "bnrt" == "bnrt"  
2: "crm"  == "crm"  
3: "dt"   == "dt"  
Even though some rows are shorter, all corresponding verticals match.*

**Example 3:**  
Input: `["ball","area","read","lady"]`  
Output: `False`  
*Explanation:  
Row 2 is "read", but column 2 is "lead", so mismatch.*

**Example 4:**  
Input: `["abc", "b"]`  
Output: `False`  
*Explanation:  
Row 1: "b", column 1: "b", that’s fine.  
But column 2 doesn’t exist in row 1, so it’s not a square.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Compare, for every i and j, words[i][j] with words[j][i].  
  Need to check bounds, since rows can be different lengths.
- **Step-by-step:**  
  - For each row i:
    - For each character j in row i:
      - Check if the corresponding row j exists and has a character at position i.
      - If not, it's not a valid square.
      - If yes, check that words[i][j] == words[j][i].
- **Why this approach:**  
  - It’s direct and checks only what's needed without building additional data structures.
  - Early exit on the first mismatch.
  - Trade-off is slightly more code for bounds checks, but space-efficient.

### Corner cases to consider  
- Empty input: `[]` or `[""]`
- Single row
- Rows much shorter than the number of rows (triangle shapes)
- Rows much longer than the number of strings
- All rows/columns match except for a late mismatch
- words where not all rows/columns are equal length

### Solution

```python
def validWordSquare(words):
    # Iterate through each row index
    for i in range(len(words)):
        for j in range(len(words[i])):
            # Check if row j exists and has enough length for char at position i
            if j >= len(words) or i >= len(words[j]):
                return False
            # Compare the characters at positions (i, j) and (j, i)
            if words[i][j] != words[j][i]:
                return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n = number of rows (since we may check each cell in the n × n square grid; but we stop early on mismatch).
- **Space Complexity:** O(1) extra space. Only uses a few variables for looping and checking (no extra grid is created).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large grids efficiently?  
  *Hint: Is there a way to avoid redundant checks or do a lazy check only if hash signatures differ up to a certain row or column?*

- What if Unicode characters or mixed cases are allowed?  
  *Hint: Make sure comparisons handle encoding or normalization properly.*

- Could this approach be modified for validation in-place for an actual matrix/grid, not just strings?  
  *Hint: If the input is a list of list of chars, can you adapt bounds checking?*

### Summary
This solution uses a **symmetry-checking pattern**—directly verifying word square properties by comparing row and column characters. The key insight is careful bounds checking because word lengths can differ. This problem is a classic **matrix-transpose symmetry** check, and the approach is broadly useful anywhere row/column consistency is important, like crossword generation, sudoku validation, or spreadsheet data checks.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
- Word Squares(word-squares) (Hard)
- Toeplitz Matrix(toeplitz-matrix) (Easy)