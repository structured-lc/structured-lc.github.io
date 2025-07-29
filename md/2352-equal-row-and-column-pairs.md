### Leetcode 2352 (Medium): Equal Row and Column Pairs [Practice](https://leetcode.com/problems/equal-row-and-column-pairs)

### Description  
Given an n × n integer matrix `grid`, count how many pairs of (rowᵢ, colⱼ) are *equal*: that is, the entire \(i^{th}\) row and the entire \(j^{th}\) column have the same integers, in the same order. For each such matching pair, increment the answer by one. "Equal" means each element matches its position; order and length must be identical.

### Examples  

**Example 1:**  
Input: `grid = [[3,2,1],[1,7,6],[2,7,7]]`  
Output: `1`  
*Explanation: Only one pair is equal. Row 2 `[2,7,7]` matches column 1 `[2,7,7]`.*

**Example 2:**  
Input: `grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]`  
Output: `3`  
*Explanation: Three equal pairs:  
- Row 0 & Col 0: `[3,1,2,2]`  
- Row 2 & Col 2: `[2,4,2,2]`  
- Row 3 & Col 2: `[2,4,2,2]`*

**Example 3:**  
Input: `grid = [[1,2],[2,1]]`  
Output: `1`  
*Explanation: Only one equal pair:  
- Row 1 `[2,1]` matches Column 1 `[2,1]`*.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Compare every row with every column. For each row \(i\) and column \(j\), compare all values one by one. For \(n\) rows and \(n\) columns, that gives \(O(n^3)\) time (since for each of n² combinations we scan n elements).

- **Optimization:**  
  Instead of repeated scanning, convert each row to a tuple, count their frequencies using a hash map. Then, for column \(j\), build its tuple and look up in the map: if present, increment result by its frequency.

  This reduces redundant comparison and avoids repeated row scanning.  
  - **Final Approach:**  
    - Store all row tuples in a hashmap with their counts.
    - For each column, build the tuple, and check how many times this tuple appears among the rows.
    - This brings the time complexity closer to \(O(n^2)\).

### Corner cases to consider  
- Matrix of size 1 × 1.
- All rows and columns unique (output should be 0).
- All rows are the same and equal to all columns (output is n×n).
- Grid with non-symmetric values.
- Large numbers (test for integer size handling).

### Solution

```python
def equalPairs(grid):
    n = len(grid)
    # Count occurrences of each row as a tuple
    row_count = {}
    for i in range(n):
        row = tuple(grid[i])
        row_count[row] = row_count.get(row, 0) + 1

    res = 0
    # For each column, build tuple and look up in row_count
    for j in range(n):
        col = tuple(grid[i][j] for i in range(n))
        res += row_count.get(col, 0)

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  \(O(n^2)\) — For each of n rows and n columns, creating tuples takes \(O(n)\) per row or column. Hashmap operations are \(O(1)\) on average, so total is \(O(n^2)\).

- **Space Complexity:**  
  \(O(n^2)\) — Worst case, if all row/column patterns are unique, need to store \(O(n)\) row tuples of length \(n\), plus a single temporary tuple for each column.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid is not square?  
  *Hint: Think of how to generalize for m×n and n×m.*

- What if values are not integers but strings or complex objects?  
  *Hint: Consider tuple conversion and hashability.*

- Could you solve this in-place, or further reduce space?  
  *Hint: Is direct comparison always needed, or can rows/columns be compared streaming fashion?*

### Summary
This problem is best solved with a **hashmap and tuple encoding** pattern, which is common for recognizing patterns within rows/columns (e.g., anagrams, grouping by frequency, subarrays). The key is to reduce multi-pass nested loops with a *preprocessing and lookup* approach—mapping one structure (rows), then querying with another (columns). This "hash-count and check" strategy is broadly useful in matrix and string problems that ask for equality or grouping by content.