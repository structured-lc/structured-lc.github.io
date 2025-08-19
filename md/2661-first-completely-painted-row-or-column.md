### Leetcode 2661 (Medium): First Completely Painted Row or Column [Practice](https://leetcode.com/problems/first-completely-painted-row-or-column)

### Description  
Given a 0-indexed array **arr** and a matrix **mat** of size m × n, both containing all the integers in the range [1, m × n] (uniquely), you "paint" a cell in **mat** whenever its value appears in **arr**, following the order in **arr**.  
Return the smallest index `i` such that after painting **arr** to **arr[i]**, **at least one row or one column** in **mat** is completely painted.

### Examples  

**Example 1:**  
Input: `arr = [1,3,4,2]`, `mat = [[1,4],[2,3]]`  
Output: `2`  
*Explanation:  
Index 0, paint cell with 1 → [X, 4], [2, 3]  
Index 1, paint 3 → [X, 4], [2, X]  
Index 2, paint 4 → [X, X], [2, X]  
At this point, the first row and the second column are both fully painted. So output is 2.*

**Example 2:**  
Input: `arr = [2,8,7,4,1,3,5,6,9]`, `mat = [[3,2,5],[1,4,6],[8,7,9]]`  
Output: `3`  
*Explanation:  
Index 0, paint 2 → [3, X, 5], [1, 4, 6], [8, 7, 9]  
Index 1, paint 8 → [3, X, 5], [1, 4, 6], [X, 7, 9]  
Index 2, paint 7 → [3, X, 5], [1, 4, 6], [X, X, 9]  
Index 3, paint 4 → [3, X, 5], [1, X, 6], [X, X, 9]  
After painting 4, the second column is fully painted: [X, X, X]. Output is 3.*

**Example 3:**  
Input: `arr = [6,2,4,1,7,5,3]`, `mat = [[4,3,2],[7,6,5],[1,8,9]]`  
Output: `4`  
*Explanation:  
Indices:  
0 paint 6 → [[4,3,2],[7,X,5],[1,8,9]]  
1 paint 2 → [[4,3,X],[7,X,5],[1,8,9]]  
2 paint 4 → [[X,3,X],[7,X,5],[1,8,9]]  
3 paint 1 → [[X,3,X],[7,X,5],[X,8,9]]  
4 paint 7 → [[X,3,X],[X,X,5],[X,8,9]]  
Now, second row is fully painted: [X, X, 5], [X, X, X] after index 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For every step, after each painting, check each row and column to see if they're fully painted. This would take O((m + n) × m × n) in the worst case—not efficient since the check would be repeated many times.
- **Optimize:** Since mat and arr only use unique values in [1, m × n], map each value to its position in mat with a quick lookup (dictionary). As we process arr, increment counters (row_count, col_count) for the row and column of each painted cell. As soon as any row_count crashes n, or col_count reaches m, we've found our answer.
- **Why this works:**  
  - Only need to check the counts to know if a row or column is completed; O(1) per painting.
  - Track counts with two arrays row_count and col_count.
  - Mapping each mat value for lookup is O(m × n), painting phase is O(m × n).

### Corner cases to consider  
- arr and mat are 1 × 1: answer is index 0.
- The first operation might already complete a row or column (possible if n = 1 or m = 1).
- All values are unique and guaranteed in range, so no missing values.
- Painting crosses off both a row and a column at the same time—still okay, as you return index as soon as either happens.

### Solution

```python
def firstCompleteIndex(arr, mat):
    m, n = len(mat), len(mat[0])
    
    # Map value to its (row, col) position
    pos = {}
    for i in range(m):
        for j in range(n):
            pos[mat[i][j]] = (i, j)
    
    # Track counts for each row and each column
    row_count = [0] * m
    col_count = [0] * n
    
    for i, v in enumerate(arr):
        r, c = pos[v]
        row_count[r] += 1
        if row_count[r] == n:
            return i
        col_count[c] += 1
        if col_count[c] == m:
            return i
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
    - Mapping mat: O(m × n)
    - Processing arr: O(m × n)
    - Each operation is O(1).
- **Space Complexity:** O(m × n)  
    - For mapping value → (row, col): O(m × n)
    - row_count and col_count: O(m + n)

### Potential follow-up questions (as if you’re the interviewer)  

- What if mat or arr were not guaranteed to cover every number from 1 to m × n?  
  *Hint: How does your mapping and count logic adjust?*

- How would you handle a scenario where arr could contain repeated numbers?  
  *Hint: Avoid double counting cells, maybe use a painted set?*

- Could you generalize for diagonals or “blocks” instead of only rows and columns?  
  *Hint: Think about more generalized counter arrays or functions for “regions”.*

### Summary
This approach uses the efficient **counter pattern** by mapping each cell and updating row and column counts as we simulate the painting operations. It's a common pattern for "first completion among rows/cols" problems, and similar strategies are seen in problems like Bingo, matrix marking, and subgrid completeness. It shows a blend of hashmap-for-indexing and early-exit on aggregate counts.

### Tags
Array(#array), Hash Table(#hash-table), Matrix(#matrix)

### Similar Problems
- Check if Every Row and Column Contains All Numbers(check-if-every-row-and-column-contains-all-numbers) (Easy)
- Difference Between Ones and Zeros in Row and Column(difference-between-ones-and-zeros-in-row-and-column) (Medium)