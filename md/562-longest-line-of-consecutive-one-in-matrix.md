### Leetcode 562 (Medium): Longest Line of Consecutive One in Matrix [Practice](https://leetcode.com/problems/longest-line-of-consecutive-one-in-matrix)

### Description  
Given a binary matrix (list of lists filled with 0s and 1s), find the length of the longest line of consecutive 1s. The line can be in any of **four directions**: horizontal, vertical, diagonal (top-left to bottom-right), or anti-diagonal (top-right to bottom-left). You must return the length of the longest such line.

### Examples  

**Example 1:**  
Input:  
```
mat = [
  [0,1,1,0],
  [0,1,1,0],
  [0,0,0,1]
]
```
Output: `3`  
*Explanation: The longest line of consecutive 1s is horizontal or vertical, both with length 3.*

**Example 2:**  
Input:  
```
mat = [
  [1,1,0,0],
  [0,1,1,0],
  [0,0,1,1]
]
```
Output: `3`  
*Explanation: The diagonal from (0,0) to (2,2) has three consecutive 1s.*

**Example 3:**  
Input:  
```
mat = [
  [1,0,0,1],
  [0,1,1,0],
  [1,1,0,0]
]
```
Output: `2`  
*Explanation: The maximum line of consecutive 1s is length 2 (there are multiple such lines: horizontal, vertical, or diagonal).*

### Thought Process (as if you’re the interviewee)  
First, consider brute force: for each cell that contains a 1, check in all four directions for the length of 1s. This would mean an O(mn×max(m,n)) solution — too slow for large matrices.

**Optimized Thought Process:**  
We can use dynamic programming to update the counts at every cell for all four directions. At each cell containing a 1, keep track of:
- Horizontal (to the left)
- Vertical (upwards)
- Diagonal (upwards left)
- Anti-diagonal (upwards right)

Store these in a 3D dp array: dp[i][j][direction], where direction ∈ {horizontal, vertical, diagonal, anti-diagonal}. For every cell, calculate based on the previous cell in that direction, or set to 1 if none exists. Always update the max found so far.

This avoids redundant recomputation, processing every cell in O(1) per direction.  
Tradeoff: O(mn) space for the dp array, but code is clean and efficient[1][2][4].

### Corner cases to consider  
- Empty matrix (return 0)
- Matrix with only 0s (return 0)
- Matrix with only 1s (return min(m, n))
- Lines at the matrix borders
- Single row or column
- Only diagonal lines, no horizontal/vertical line longer than one

### Solution

```python
def longestLine(mat):
    if not mat or not mat[0]:
        return 0

    m, n = len(mat), len(mat[0])
    # Directions: 0=horizontal, 1=vertical, 2=diagonal, 3=anti-diagonal
    dp = [[[0]*4 for _ in range(n)] for _ in range(m)]
    maxlen = 0

    for i in range(m):
        for j in range(n):
            if mat[i][j] == 1:
                # Horizontal
                dp[i][j][0] = 1 + (dp[i][j-1][0] if j > 0 else 0)
                # Vertical
                dp[i][j][1] = 1 + (dp[i-1][j][1] if i > 0 else 0)
                # Diagonal
                dp[i][j][2] = 1 + (dp[i-1][j-1][2] if i > 0 and j > 0 else 0)
                # Anti-diagonal
                dp[i][j][3] = 1 + (dp[i-1][j+1][3] if i > 0 and j < n-1 else 0)
                maxlen = max(maxlen, *dp[i][j])
            # else: remain 0 for all directions
    return maxlen
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m is the number of rows and n the columns, as each cell is visited once and a constant amount of work is done for each direction.
- **Space Complexity:** O(m × n), due to the 3D dp array storing four directional counts for each cell.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input matrix is too large to fit in memory?
  *Hint: Think about processing rows one at a time, storing only what's needed for the current and previous rows for each direction.*

- Can you solve this problem with less space?
  *Hint: Do you really need to store the entire matrix for all directions or just a rolling array for each?*

- How would you reconstruct the path of the actual longest line, not just its length?
  *Hint: Keep track of the source cell and direction when updating dp, and trace back the path afterward.*

### Summary
This solution uses the **Dynamic Programming** pattern, commonly applied to matrix-based subproblems where each cell’s result depends on neighbor states (for example, maximal square, maximal rectangle problems). Tracking state in four directions simultaneously is the key — a technique applicable in other matrix traversal problems requiring direction-based aggregation.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
