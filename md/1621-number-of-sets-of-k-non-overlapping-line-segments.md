### Leetcode 1621 (Medium): Number of Sets of K Non-Overlapping Line Segments [Practice](https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments)

### Description  
Given n points, labelled 0 to n-1 on a line, how many ways can you draw exactly k non-overlapping line segments between these points? Each segment connects two different points and every pair of points can be connected by at most one segment. Segments must not overlap (though they can touch at endpoints). Return the answer modulo 10⁹+7.

### Examples  
**Example 1:**  
Input: `n=4, k=2`  
Output: `1`  
*Explanation: The only way is to use segments (0,1) and (2,3).*

**Example 2:**  
Input: `n=3, k=1`  
Output: `3`  
*Explanation: The segments can be (0,1), (1,2), or (0,2).*

**Example 3:**  
Input: `n=5, k=2`  
Output: `6`  
*Explanation: Possible: (0,1)+(2,3), (0,1)+(3,4), (0,1)+(2,4), (1,2)+(3,4), (1,2)+(2,3), (1,2)+(2,4).*

### Thought Process (as if you’re the interviewee)  
Start by considering all possible pairs of endpoints to create a segment. For non-overlapping, once you select a segment, you can't pick another segment that shares any points except touching at endpoints. Notice the subproblem: for a given last used point, how many ways for remaining k-1?

Dynamic Programming is suitable: dp[n][k] = number of ways to choose k segments among n points. Either the last segment ends at i (and recursively count), or we skip the iᵗʰ point entirely. Base cases: dp[x]=1 (zero segments), dp[y][x<y]=0. Use memoization or bottom-up DP.

### Corner cases to consider  
- n < 2 (not enough points for any segment)
- k = 0 (always 1 way: choose none)
- Large n or k
- Multiple endpoints touching but not overlapping

### Solution

```python
def count_combinations(n, k):
    MOD = 10 ** 9 + 7
    # dp[i][j] = number of ways to place j segments among i points
    dp = [[0] * (k+1) for _ in range(n+1)]
    for i in range(n+1):
        dp[i][0] = 1  # Base: 1 way to select zero segments
    for i in range(2, n+1):
        for j in range(1, k+1):
            # dp[i-1][j]: don't use i-th point
            # dp[m][j-1]: add a segment ending at i-1 (start at m < i-1)
            dp[i][j] = dp[i-1][j]
            for m in range(i-1):
                dp[i][j] = (dp[i][j] + dp[m][j-1]) % MOD
    return dp[n][k]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²k), for each (i, j) inner loop up to i
- **Space Complexity:** O(nk), for DP table

### Potential follow-up questions (as if you’re the interviewer)  

- Optimize to O(nk) solution?  
  *Hint: Can you use prefix sums for faster range-sum queries over DP?*

- What if each segment must be at least length 2?  
  *Hint: Adjust range for valid segment starts.*

- Return the actual sets, not just the count.  
  *Hint: Backtrack to construct combinations using DP parent tracking.*

### Summary
Use a dynamic programming pattern for pick or skip, similar to combinatorial subset selection with additional non-overlapping constraint. Optimize inner sum via prefix sums for better performance. Useful for interval selection/counting problems.


### Flashcard
Use dynamic programming to count the number of ways to choose k non-overlapping segments from n points, considering subproblems based on the last used point.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
