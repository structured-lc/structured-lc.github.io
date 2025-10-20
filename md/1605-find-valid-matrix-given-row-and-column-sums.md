### Leetcode 1605 (Medium): Find Valid Matrix Given Row and Column Sums [Practice](https://leetcode.com/problems/find-valid-matrix-given-row-and-column-sums)

### Description  
Given two integer arrays rowSum and colSum, construct any matrix (of size m × n) of non-negative integers such that the sum of each row i is rowSum[i] and of each column j is colSum[j]. Multiple valid outputs may exist. Return any one.

### Examples  

**Example 1:**  
Input: `rowSum = [3,8], colSum = [4,7]`
Output: `[[3,0],[1,7]]`
*Explanation: Row 0 sum is 3 (all in column 0), row 1 is 8 (1 in col 0, 7 in col 1). Column sums also match.*

**Example 2:**  
Input: `rowSum = [5,7,10], colSum = [8,6,8]`
Output: `[[5,0,0],[3,4,0],[0,2,8]]`
*Explanation: Each cell picks as much as possible from row/column quota, makes all sums satisfied.*

**Example 3:**  
Input: `rowSum = , colSum = `
Output: `[]`
*Explanation: Simple 1×1 matrix.*

### Thought Process (as if you’re the interviewee)  
- At each cell [i][j], assign the minimum of the remaining rowSum[i] and colSum[j], then subtract that amount from both.
- This process resembles greedy resource allocation: "take as much as possible here, fill other cells in subsequent steps".
- Multiple valid fills are possible, but greedy works since constraints guarantee solution exists.

### Corner cases to consider  
- Only one row or one column
- Some row or column sums are 0
- All row and column sums are equal
- Some sums are large

### Solution

```python
def restoreMatrix(rowSum, colSum):
    m, n = len(rowSum), len(colSum)
    res = [[0]*n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            pick = min(rowSum[i], colSum[j])
            res[i][j] = pick
            rowSum[i] -= pick
            colSum[j] -= pick
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n). Each cell is assigned once.
- **Space Complexity:** O(m × n) for matrix storage.

### Potential follow-up questions (as if you’re the interviewer)  
- What if entries must all be binary (0 or 1)?  
  *Hint: Use flow or assignment with lower/upper bounds.*

- What if row and column sums don't match (no possible solution)?  
  *Hint: Check total sums before assignment.*

- Can you generate all possible matrices?  
  *Hint: Consider backtracking or enumerate possibilities.*

### Summary
This is basically greedy resource allocation. The approach generalizes to supply-demand, transportation (min-cost flow), or coloring problems where we iteratively "fit as much as possible" until all quotas are met.


### Flashcard
Greedily fill each cell with the minimum of remaining row and column sums, then adjust both sums accordingly.

### Tags
Array(#array), Greedy(#greedy), Matrix(#matrix)

### Similar Problems
- Reconstruct a 2-Row Binary Matrix(reconstruct-a-2-row-binary-matrix) (Medium)