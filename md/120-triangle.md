### Leetcode 120 (Medium): Triangle [Practice](https://leetcode.com/problems/triangle)

### Description  
Given a triangle as a list of lists of integers, find the minimum path sum from the top to the bottom. At each step, you may move to one of the two adjacent numbers in the row below (i.e., if you're at index j in row i, the next step can be at index j or j+1 in row i+1). The goal is to determine the minimum sum possible by moving from the top to the bottom of the triangle.[1][2]

### Examples  

**Example 1:**  
Input: `triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]`  
Output: `11`  
*Explanation: The path 2 → 3 → 5 → 1 forms the minimum sum: 2 + 3 + 5 + 1 = 11.*

**Example 2:**  
Input: `triangle = [[-10]]`  
Output: `-10`  
*Explanation: Only one element to take: -10.*

**Example 3:**  
Input: `triangle = [[1],[2,3],[3,6,7],[8,9,6,1]]`  
Output: `13`  
*Explanation: The path 1 → 2 → 3 → 6 gives 1 + 2 + 3 + 6 = 12; but 1 → 3 → 6 → 1 is not possible as moves must be to adjacent indices. The correct minimum is 1 + 2 + 3 + 8 = 14; 1 + 2 + 6 + 1 = 10 is also not possible because after 2 (index 0 of row 1) we must choose index 0 or 1 next (3 or 6). The correct minimum is 1 + 2 + 3 + 8 = 14.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible paths from top to bottom, summing each path and taking the minimum. This yields exponential time (2ⁿ possible paths), not practical for n up to 200.

- **Recursion with memoization:**  
  Use recursion from the top. At each cell `(i, j)`, recursively compute the minimum path by moving to `(i+1, j)` and `(i+1, j+1)`, memoizing intermediate results to avoid recomputation.

- **Dynamic Programming (Bottom-Up):**  
  Notice we only need to know the minimum sums of the row below to compute the current row. Work from the bottom row upwards, iteratively updating a single list:  
  - For each cell, the min sum is its value plus min(sum from both adjacent children in the row below).
  - By overwriting the same list/array, we use O(n) extra space.

Trade-offs:  
- Pure recursion is simplest, but too slow.
- DP with bottom-up is efficient in both time and space; this is the most scalable.

### Corner cases to consider  
- Single element triangle (just one number).
- Negative numbers, or all negatives.
- Triangle rows of varying lengths (must be valid input: row i has i+1 elements).
- Large input size (triangle with 200 rows).
- All numbers are the same.

### Solution

```python
def minimumTotal(triangle):
    # Start from the bottom row and move upwards
    # dp holds the minimum sum for each position
    dp = triangle[-1][:]
    n = len(triangle)
    
    # Process each row from second-last to the top
    for i in range(n-2, -1, -1):
        for j in range(len(triangle[i])):
            # For triangle[i][j], choose the min path from the two children below
            dp[j] = triangle[i][j] + min(dp[j], dp[j+1])
            
    # dp[0] now holds the min path sum from top to bottom
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  There are about n rows, and each row i has i+1 elements (sum is n(n+1)/2 operations).
- **Space Complexity:** O(n)  
  Only one array (the size of the bottom row), reused and overwritten, for intermediate results.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the actual minimum path, not just the sum?  
  *Hint: Store parent pointers or choices at each step and trace the path after computing dp.*

- What if the triangle is huge and doesn’t fit in memory?  
  *Hint: Think about processing row by row from a stream or file, storing only two rows at a time.*

- Could you solve this using a top-down DP? What changes?  
  *Hint: Build a DP table from the top, dp[i][j] = triangle[i][j] + min(dp[i-1][j], dp[i-1][j-1]).*

### Summary
This problem uses the classic **bottom-up dynamic programming** pattern, where optimal substructure allows solving from simpler subproblems (smallest rows) up to the answer. The pattern is common in path minimization and triangle/grids, and appears in similar problems (e.g., minimum falling path sum in a matrix). The space optimization, reducing from O(n²) to O(n), is a practical application of "rolling array" DP.


### Flashcard
Use bottom-up DP starting from last row, updating each cell as itself plus minimum of two adjacent cells below, reducing space to O(n) by overwriting triangle in-place.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
