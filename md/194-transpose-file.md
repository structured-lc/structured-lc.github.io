### Leetcode 194 (Medium): Transpose File [Practice](https://leetcode.com/problems/transpose-file)

### Description  
Given a text file containing a table with rows and columns separated by spaces (fields separated by `' '`), transpose the contents of the file so that rows become columns and columns become rows.  
You may assume every row has the same number of columns. Each field is separated by a single space.

### Examples  

**Example 1:**  
Input:
```
name age
alice 21
ryan 30
```
Output:
```
name alice ryan
age 21 30
```
*Explanation: There are 2 columns (name, age). The first output row collects the first field from each input row: name, alice, ryan. The second output row collects the second field from each input row: age, 21, 30.*

**Example 2:**  
Input:
```
A B C
1 2 3
4 5 6
```
Output:
```
A 1 4
B 2 5
C 3 6
```
*Explanation: 3 columns. Output’s first row gathers all 1ˢᵗ fields (A, 1, 4), then 2ⁿᵈ fields (B, 2, 5), and so on.*

**Example 3:**  
Input:
```
foo bar
baz qux
```
Output:
```
foo baz
bar qux
```
*Explanation: Each output line is made from the corresponding field in each row.*

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to:
- Read every line of the file and **split each into a list of fields by space**.
- Store all lines as a list of lists (matrix).
- To transpose, loop by column index (since all rows have the same number of columns) and for each, gather that column’s value from every row.
- Join the collected column values by space.

Brute-force works because:
- Reading all data into memory is permitted (no constraints given).
- The only repeated operation is going over all (row, column) entries once.
  
Optimizations:
- For very large files, streaming solutions with lower memory are possible, but since each column in the output might require visiting all input rows, some buffering is inevitable.
- Since rows and columns are of manageable size (practical for interview), the above approach is best—straightforward, clear, and matches the real problem statement.

### Corner cases to consider  
- **Empty file:** Should produce no output.
- **Single row:** Output will be each column as one row.
- **Single column:** Output contains all the lines in one row.
- **Whitespace in fields:** Statement guarantees fields are separated by single spaces.
- **All identical:** Test that all values are present in the output.

### Solution

```python
# Read input from a file (e.g., 'file.txt')—simulate as a list of strings here for portability.
def transpose_file(input_lines):
    # Parse all lines into a list of list of strings (matrix)
    matrix = []
    for line in input_lines:
        # Ignore empty lines (if any)
        stripped = line.strip()
        if stripped:
            matrix.append(stripped.split(" "))

    if not matrix:
        return []

    # Number of columns equals len(matrix[0])
    num_cols = len(matrix[0])
    num_rows = len(matrix)

    # Build the transpose: for each column index, collect that element from each row
    transposed_lines = []
    for col in range(num_cols):
        row_items = []
        for row in range(num_rows):
            row_items.append(matrix[row][col])
        transposed_lines.append(" ".join(row_items))
    return transposed_lines

# Example usage:
file_lines = [
    "name age",
    "alice 21",
    "ryan 30"
]
for line in transpose_file(file_lines):
    print(line)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(R × C), where R is the number of rows and C is the number of columns. Every entry in the file is processed exactly once (read and transposed).
- **Space Complexity:** O(R × C) for storing the input matrix, plus O(R × C) for storing the transposed output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle files that cannot fit entirely in memory?  
  *Hint: Can you stream data row by row and buffer only what’s needed for each output line?*

- What if fields are separated by arbitrary whitespace or tabs, not just a single space?  
  *Hint: Use regex or `str.split()` with no arguments to split by any whitespace.*

- How would you process extremely wide tables (thousands of columns)?  
  *Hint: Consider line-by-line or column-by-column output to limit memory footprint.*

### Summary
This approach uses the common “matrix transpose” pattern—collect items column-wise and output them as rows.  
Applicable to CSV parsing, spreadsheet operations, and other table processing problems.  
The coding pattern is standard for 2D array manipulation and is a good demonstration of scan-and-aggregate logic.