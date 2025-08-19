### Leetcode 1572 (Easy): Matrix Diagonal Sum [Practice](https://leetcode.com/problems/matrix-diagonal-sum)

### Description  
Given a square matrix (n×n), compute the sum of its main diagonal and its secondary (anti-)diagonal elements. If the center element is counted twice (i.e., n is odd and the element is on both diagonals), only count it once. Return the total sum.

### Examples  

**Example 1:**  
Input: `mat = [[1,2,3],[4,5,6],[7,8,9]]`  
Output: `25`  
*Explanation: Diagonals are [1,5,9] and [3,5,7]; sum is 1+5+9+3+7=25 (5 counted once).*  

**Example 2:**  
Input: `mat = [[5]]`  
Output: `5`  
*Explanation: Only one element: 5; appears in both diagonals but counted once.*

**Example 3:**  
Input: `mat = [[1,2],[3,4]]`  
Output: `10`  
*Explanation: Diagonals are [1,4] and [2,3]; sum is 1+4+2+3=10.*


### Thought Process (as if you’re the interviewee)  
The brute-force idea is to sum both diagonals by looping over the rows. The main diagonal uses mat[i][i], and the secondary diagonal uses mat[i][n-1-i]. For odd-sized matrices, the center element at (n//2, n//2) appears in both; so subtract it once at the end if n is odd. This is a simple O(n) solution (since only n elements per diagonal).

### Corner cases to consider  
- Matrix is 1×1 (center counted once)
- Matrix is even-sized (no duplicate center)
- All zeros (sum is 0)
- Very large n


### Solution

```python
def diagonalSum(mat):
    n = len(mat)
    total = 0
    for i in range(n):
        # main diagonal
        total += mat[i][i]
        # secondary diagonal
        total += mat[i][n-1-i]
    # if n is odd, subtract center (counted twice)
    if n % 2 != 0:
        total -= mat[n//2][n//2]
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), single pass through the matrix rows.
- **Space Complexity:** O(1), only an integer accumulator used, no extra structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve for rectangular matrices or only one diagonal?
  *Hint: Generalize row/col pairs or index bounds.*

- What if the matrix is very large and stored in a sparse format?
  *Hint: Only access non-zero diagonal positions as needed.*

- Can you solve with only one loop and minimize accesses further?
  *Hint: Use optimal addressing; conditionally count center for odd n.*

### Summary
This problem is an example of simple matrix traversal with index calculations. The pattern is typical for diagonal sums, anti-diagonal traversals, and related problems on square matrices. Counting overlaps (like the center) is a standard trick for O(n) efficient answers.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
- Check if Every Row and Column Contains All Numbers(check-if-every-row-and-column-contains-all-numbers) (Easy)
- Check if Matrix Is X-Matrix(check-if-matrix-is-x-matrix) (Easy)