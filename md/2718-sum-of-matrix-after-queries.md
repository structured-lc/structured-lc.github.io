### Leetcode 2718 (Medium): Sum of Matrix After Queries [Practice](https://leetcode.com/problems/sum-of-matrix-after-queries)

### Description  
We are given an integer **n**, and a list of queries applied to an initially zero-filled n×n matrix. Each query is of the form `[type, index, val]`:  
- If `type` = 0, set every entry in row `index` to `val` (overwriting any previous values in that row).  
- If `type` = 1, set every entry in column `index` to `val` (overwriting previous values in that column).  
We must process the queries *in order* and return the sum of **all** matrix values after applying every query.

### Examples  

**Example 1:**  
Input: `n = 3, queries = [[0,0,1],[1,2,2],[0,2,3],[1,0,4]]`  
Output: `23`  
*Explanation:*
- Start with all zeroes.
- [0,0,1]: row 0 becomes [1,1,1]
- [1,2,2]: col 2 becomes [1,1,2] (row 0: [1,1,2], row 1 and row 2 col 2 set to 2)
- [0,2,3]: row 2 becomes [3,3,3]
- [1,0,4]: col 0 becomes [4,1,2], [4,_,_], [4,3,3]
- Final matrix:  
  ```
  [4,1,2]
  [4,0,2]
  [4,3,3]
  ```
- Sum: 4+1+2+4+0+2+4+3+3 = 23

**Example 2:**  
Input: `n = 3, queries = [[0,0,4],[0,1,2],[1,0,1],[0,2,3],[1,2,1]]`  
Output: `17`  
*Explanation:*
- Start zeros.
- [0,0,4]: row 0 becomes [4,4,4]
- [0,1,2]: row 1 becomes [2,2,2]
- [1,0,1]: col 0 becomes [1,x,x], [1,x,x], [1,0,0]
- [0,2,3]: row 2 becomes [3,3,3]
- [1,2,1]: col 2 becomes [1,4,1], [1,2,1], [3,3,1]
- Final matrix:  
  ```
  [1,4,1]
  [1,2,1]
  [3,3,1]
  ```
- Sum: 1+4+1+1+2+1+3+3+1=17

**Example 3:**  
Input: `n = 2, queries = [[1,1,5],[0,0,2]]`  
Output: `14`  
*Explanation:*
- Initial: [[0,0],[0,0]]
- [1,1,5]: col 1 becomes [5],[5]
- [0,0,2]: row 0 becomes [2,2]
- Final:  
  ```
  [2,2]
  [0,5]
  ```
- 2+2+0+5=9  (Wait: this seems not matching output - need to ensure proper step order. Let's do this carefully.)
- [1,1,5]: col 1 becomes [5],[5] => [[0,5],[0,5]]
- [0,0,2]: row 0 becomes [2,2] => [[2,2],[0,5]]
- Final sum: 2+2+0+5=9

(Corrected Output: `9`)


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For every query, directly update the entire row or column in a real n×n matrix. After all queries, sum up all cells.  
  - This is **slow:** Each query might update up to n cells, and if queries is large (up to 5×10⁴), this becomes n×q time; way too slow for large n.

- **Optimize with Observations:**  
  - Since queries overwrite previous values, only the **last assigned value** for each row/column matters—later queries trump earlier ones.  
  - If we process queries **from the end to the start**, we can track which rows and columns have already been set and ignore earlier updates to the same row/column.
  - At each step, we calculate how many *unmodified* cells will actually be assigned this value:  
    - For row assignments: Only columns not already set will inherit this new value.
    - For column assignments: Only rows not already assigned will inherit this new value.

- **Optimized Strategy:**  
  1. Initialize two sets: `painted_rows` and `painted_cols`.
  2. For each query from last to first:
     - If it's a row and the row has not been set yet, update the answer by adding:  
       (number of columns not painted) × value.
     - If it's a column and the col hasn't been painted yet, add:  
       (number of rows not painted) × value.
     - Mark the row/col as painted so future queries to it are ignored.
  3. No actual matrix is needed.

- **Complexity:** This is O(n + q).

### Corner cases to consider  
- n = 1 (matrix is 1×1, only one cell).
- Repeat queries on same row/col.
- All queries of same type (e.g., "all rows").
- Last operation determines total overwrite.
- Large n and number of queries.
- Val=0 assignments (cells zero-ed out again).

### Solution

```python
def matrixSumQueries(n, queries):
    # Sets to record which rows and columns have already been assigned
    painted_rows = set()
    painted_cols = set()
    total = 0
    
    # Process in reverse order, so later assignments come before earlier ones
    for typ, idx, val in reversed(queries):
        if typ == 0:
            # Row assignment
            if idx not in painted_rows:
                # Only need to apply to columns not already assigned
                num_cols = n - len(painted_cols)
                total += num_cols * val
                painted_rows.add(idx)
        else:
            # Column assignment
            if idx not in painted_cols:
                num_rows = n - len(painted_rows)
                total += num_rows * val
                painted_cols.add(idx)
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q)  
  We process each query once; at most n rows and n cols are ever tracked, so all `add` and `len` are O(1).  
- **Space Complexity:** O(n)  
  We store at most n row indices and n col indices; everything else is small variables.

### Potential follow-up questions (as if you’re the interviewer)  

- Can this solution work if the matrix is not square, i.e., m × n?  
  *Hint: Adjust use of two sets and counts for m and n separately.*

- How do you extend this for partial overwrite, i.e., only a submatrix per query?  
  *Hint: Consider segment trees or difference arrays for range updates.*

- Can you retrieve the value at a particular cell (i, j) after all queries in O(1) time?  
  *Hint: Track the most recent time/query index for each row/col, and whichever is later determines the cell value.*

### Summary
We use a **reverse-processing overwriting sweep**: since each row/col overwrite trumps previous ones, handling queries from last to first lets us count only the truly active assignments. No actual matrix is built, yielding O(n + q) time and O(n) space. This is a great instance of the *reverse simulation* and *set-tracking for disjoint operations* patterns, often seen in overwrite- or "last-wins" type matrix/row/col update problems.


### Flashcard
Track the last value set for each row and column; sum up the contributions for all unique row and column assignments.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Range Sum Query 2D - Mutable(range-sum-query-2d-mutable) (Medium)
- Range Addition II(range-addition-ii) (Easy)