### Leetcode 931 (Medium): Minimum Falling Path Sum [Practice](https://leetcode.com/problems/minimum-falling-path-sum)

### Description  
Given an n × n integer matrix, find the **minimum sum of any falling path** through the matrix.  
A *falling path* starts at any cell in the first row, and at each step moves to either the cell directly below, below-left, or below-right in the next row until reaching the last row.  
Return the minimum possible falling path sum.

### Examples  

**Example 1:**  
Input: `matrix = [[2,1,3],[6,5,4],[7,8,9]]`  
Output: `13`  
*Explanation: You can start at 1 (matrix[1]) → 4 (matrix[1][2]) → 8 (matrix[2][1]). That path sum is 1 + 4 + 8 = 13, which is the minimum.*

**Example 2:**  
Input: `matrix = [[-19,57],[-40,-5]]`  
Output: `-59`  
*Explanation: Start at -19 (matrix) → -40 (matrix[1]). Path sum: -19 + (-40) = -59.*

**Example 3:**  
Input: `matrix = []`  
Output: `100`  
*Explanation: Only one element, so minimum path sum is 100.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Crawl every possible falling path starting from each cell in the first row, exploring all allowed moves at each step, and pick the path with the minimum sum. This is exponential: O(3ⁿ⁻¹ × n).

- **Optimization with Dynamic Programming:**  
  - **Recursion with memoization:**  
    For each cell (row, col), recursively compute the minimum falling path sum to the bottom, caching results to avoid recomputation.
  - **Bottom-up DP:**  
    Instead of recursion, fill a DP table from the *bottom* row upwards. At each cell, its minimum path sum is its value plus the minimum of the three possible cells below.
    - For the last row, dp[row][col] = matrix[row][col].
    - For higher rows, dp[row][col] = matrix[row][col] + min(dp[row+1][col-1], dp[row+1][col], dp[row+1][col+1]).
  - **Space Optimization:**  
    We only need the current and previous DP rows—can use a 1D array and update in-place.

- **Why bottom-up DP is preferred:**  
  It's clear, uses less memory, and is usually more cache-friendly for this type of grid DP.

### Corner cases to consider  
- Empty matrix or one-element matrix
- All elements are positive, all are negative, or a mix
- Very large or very small integers (overflow checks)
- Non-square (should not apply per problem, but check)
- Starting or following outside the matrix bounds

### Solution

```python
def minFallingPathSum(matrix):
    n = len(matrix)
    # Edge case: 1×1 matrix
    if n == 1:
        return matrix[0][0]
    # We'll update each row of matrix, so copy it if mutation is not allowed
    dp = matrix[-1][:]
    # Process from 2nd-last row upwards
    for row in range(n-2, -1, -1):
        new_dp = [0] * n
        for col in range(n):
            # Find min in the next row from col-1, col, col+1 (if in range)
            min_below = dp[col]
            if col > 0:
                min_below = min(min_below, dp[col - 1])
            if col < n - 1:
                min_below = min(min_below, dp[col + 1])
            new_dp[col] = matrix[row][col] + min_below
        dp = new_dp
    # The answer is the min from the top row
    return min(dp)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For each of n rows, we process all n columns, with O(1) work per cell.

- **Space Complexity:** O(n)  
  Only two O(n) arrays are needed (current and next DP rows).  
  If allowed to mutate the input, can achieve O(1) extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix is rectangular (not always square)?  
  *Hint: The logic works, just iterate up to matrix dimensions.*

- How would you reconstruct the actual path?  
  *Hint: Store parent pointers during DP, or trace back from the min index.*

- Could you solve in place?  
  *Hint: Overwrite input matrix from bottom up for O(1) extra space if mutation is allowed.*

### Summary
This problem is a classic case of **grid dynamic programming**. The bottom-up DP approach (also known as tabulation) is both efficient and clear, representing a common pattern for minimum/maximum path sum problems on grids. This general method reoccurs in classic problems like “minimum path sum in triangle”, “unique paths”, and more. The pattern focuses on reducing exponential path choices to manageable, tractable O(n²) computation by systematic subproblem reuse.