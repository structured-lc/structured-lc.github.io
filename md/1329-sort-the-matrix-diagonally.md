### Leetcode 1329 (Medium): Sort the Matrix Diagonally [Practice](https://leetcode.com/problems/sort-the-matrix-diagonally)

### Description  
Given an m × n integer matrix, you must sort each diagonal (top-left to bottom-right) in ascending order, **in-place**. The value at each cell (i, j) must be replaced so that for each diagonal, all elements on that diagonal are sorted in ascending order, while overall matrix structure remains unchanged.

### Examples  

**Example 1:**  
Input: `mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]`  
Output: `[[1,1,1,1],[1,2,2,2],[1,2,3,3]]`  
*Explanation: Each diagonal, from (i,0) and (0,j), sorted:*

**Example 2:**  
Input: `mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]`  
Output: `[[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[28,31,36,33,55,66],[84,22,75,27,68,50]]`  
*Explanation: Each diagonal is sorted as per above rule.*

### Thought Process (as if you’re the interviewee)  
Brute-force thoughts: for each diagonal, extract elements, sort, then put them back. Repeat for all diagonals. To optimize:

- Store diagonals starting from first row (i=0, all j) and first column (all i, j=0), avoiding repeats.
- For each diagonal, collect values, sort, and write back.
- Can use a dictionary with (i-j) as the key, since all elements on same diagonal have i-j equal.
- This approach keeps code clear and efficient for all m, n.

### Corner cases to consider  
- Only one row or one column (trivial, already sorted by default).
- Duplicate values (should not affect sorting).
- Empty matrix.

### Solution

```python
def diagonalSort(mat: list[list[int]]) -> list[list[int]]:
    from collections import defaultdict
    m, n = len(mat), len(mat[0])
    diag = defaultdict(list)
    # Collect diagonal elements
    for i in range(m):
        for j in range(n):
            diag[i - j].append(mat[i][j])
    # Sort each diagonal in reverse for efficient popping
    for d in diag:
        diag[d].sort(reverse=True)
    # Write sorted values back
    for i in range(m):
        for j in range(n):
            mat[i][j] = diag[i - j].pop()
    return mat
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n × log(min(m,n))), as each diagonal is at most min(m,n) long and each element is sorted and reassigned in O(1).
- **Space Complexity:** O(m × n), because we may store all elements in the diagonals (worst-case large square matrix).

### Potential follow-up questions (as if you’re the interviewer)  
- How would you do it in place with only O(1) extra space? *Hint: Only feasible with restriction; otherwise, need auxiliary space for each diagonal.*

- What if the sorting requirement is descending? *Hint: Only adjust the sort order.*

- Can you parallelize the diagonal sorts? *Hint: Yes, since each diagonal is independent.*

### Summary
This solution leverages a **Hash Map by (i-j) diagonal index** to group and sort each diagonal, which is a common matrix manipulation pattern. Useful for problems involving diagonal traversal, custom orderings, or matrix group-wise processing.


### Flashcard
Group matrix elements by diagonal (i−j), sort each group, and write back to restore diagonals in sorted order.

### Tags
Array(#array), Sorting(#sorting), Matrix(#matrix)

### Similar Problems
- Sort Matrix by Diagonals(sort-matrix-by-diagonals) (Medium)