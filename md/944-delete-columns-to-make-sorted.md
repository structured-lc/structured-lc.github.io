### Leetcode 944 (Easy): Delete Columns to Make Sorted [Practice](https://leetcode.com/problems/delete-columns-to-make-sorted)

### Description  
Given an array of strings of equal length, treat them as rows of a grid. Each string forms a row, and each character at the same index in every string forms a column. Your task is to count the number of columns that are **not sorted** in lexicographical order (i.e., alphabetical order, top to bottom), and return that count. A column is **not sorted** if any character is lower than the one directly above it.

### Examples  

**Example 1:**  
Input: `strs = ["cba","daf","ghi"]`  
Output: `1`  
Explanation:  
The grid:  
```
c b a
d a f
g h i
```
- Column 0 ('c', 'd', 'g') is sorted  
- Column 1 ('b', 'a', 'h') is **not** sorted (`b > a`)  
- Column 2 ('a', 'f', 'i') is sorted  
So only column 1 needs to be deleted.

**Example 2:**  
Input: `strs = ["a","b"]`  
Output: `0`  
Explanation:  
The grid:  
```
a
b
```
There is only one column and it is sorted. No columns need to be deleted.

**Example 3:**  
Input: `strs = ["zyx","wvu","tsr"]`  
Output: `3`  
Explanation:  
The grid:  
```
z y x
w v u
t s r
```
All three columns are **not** sorted (`z > w > t`, `y > v > s`, `x > u > r`). All columns need to be deleted.

### Thought Process (as if you’re the interviewee)  
To solve this, I’d:

- **Brute-force:** For each column, check each pair of adjacent rows; see if any character in a row is smaller than the corresponding character above.  
- If so, this column is considered unsorted and should be counted for deletion.
- Complete this for all columns and return the count.

**Optimization:**  
The naive approach works well since the constraints allow up to 100 strings of length up to 1000, but column-wise checking avoids unnecessary string manipulation.  
No extra data structures are needed, and the row and column access are both efficient.

**Trade-offs:**  
- Memory usage is O(1) (apart from input), as only counters are stored.
- Early stopping inside the column check saves computation if an unsorted pair is found.

### Corner cases to consider  
- Empty grid (shouldn’t happen per constraints, but good to consider)
- All columns are sorted (should return 0)
- All columns are unsorted (should return number of columns)
- Only one row (cannot be unsorted, so 0)
- Maximum length strings or number of strings (should not exceed time/space limit)

### Solution

```python
def minDeletionSize(strs):
    # Number of columns, since all strings are same length
    num_cols = len(strs[0])
    num_rows = len(strs)
    count = 0
    
    # Iterate over each column
    for col in range(num_cols):
        # Check if this column is sorted
        for row in range(1, num_rows):
            # Compare current row with previous row at this column
            if strs[row][col] < strs[row - 1][col]:
                count += 1
                break   # No need to check further for this column
    
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n),  
  where m is number of columns (length of each string), n is the number of strings. We visit each cell at most once.
- **Space Complexity:** O(1) (apart from the input); we only use a few integer variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to **return the indices** of the columns to be deleted, instead of just their count?  
  *Hint: Collect and store indices where the order is violated instead of just incrementing the count.*

- If columns can be reordered, what is the **minimum number of columns to delete so the grid is sorted left-to-right**?  
  *Hint: This is similar to finding the longest increasing subsequence among columns.*

- Columns can have **uppercase and lowercase** characters. How would you adapt sorting to be case-insensitive?  
  *Hint: Convert both characters being compared to lowercase or uppercase before comparison.*

### Summary
This problem illustrates a **grid/column-wise traversal** pattern: treat a 2D structure where the key logic is comparing adjacent entries column-by-column.  
Such patterns appear in spreadsheet data-cleaning, lex sort checks, and are common in string grid or matrix alignment problems.  
The final approach is a direct scan, often the most efficient route under simple constraints, and shows the value of **early loop break** for optimization.


### Flashcard
For each column, if any row below has a smaller char than the row above, count column for deletion.

### Tags
Array(#array), String(#string)

### Similar Problems
