### Leetcode 2428 (Medium): Maximum Sum of an Hourglass [Practice](https://leetcode.com/problems/maximum-sum-of-an-hourglass)

### Description  
You’re given an m × n integer matrix `grid`. Your task is to find the **maximum sum** of an "hourglass" in the matrix. An hourglass is a subset of 7 elements in the following shape:

```
a b c
  d
e f g
```

For a given center cell grid[i][j], the hourglass includes these positions:

- Top Row: grid[i-1][j-1], grid[i-1][j], grid[i-1][j+1]
- Middle: grid[i][j]
- Bottom Row: grid[i+1][j-1], grid[i+1][j], grid[i+1][j+1]

The hourglass must be **fully contained** within the matrix and **cannot be rotated or reflected**.

### Examples  

**Example 1:**  
Input: `[[6,2,1,3], [4,2,1,5], [9,2,8,7], [4,1,2,9]]`  
Output: `30`  
*Explanation: Maximum hourglass is:*
```
6 2 1
  2
9 2 8
```
*Sum = 6 + 2 + 1 + 2 + 9 + 2 + 8 = 30*

**Example 2:**  
Input: `[[1,2,3], [4,5,6], [7,8,9]]`  
Output: `35`  
*Explanation: Only one hourglass:*
```
1 2 3
  5
7 8 9
```
*Sum = 1 + 2 + 3 + 5 + 7 + 8 + 9 = 35*

**Example 3:**  
Input: `[[1,1,1,1,1], [1,1,1,1,1], [1,1,2,1,1], [1,1,1,1,1], [1,1,1,1,1]]`  
Output: `9`  
*Explanation: Multiple hourglasses exist but all have sum 9 (unless the 2 is at center, then sum is 10):*
```
1 1 1
  2
1 1 1
```
*Sum = 1 + 1 + 1 + 2 + 1 + 1 + 1 = 8 or 10 depending on position.*

### Thought Process (as if you’re the interviewee)  
- First, notice that an hourglass is always a fixed 3×3 section with four corner elements excluded, so we only compute the central 'hourglass' elements for every possible center cell that is not on the border.
- Brute force idea: For every cell (i, j) that could be the center, calculate the sum of the 7 elements in the hourglass centered at (i, j).
- The center cell must be at least 1 row and 1 column away from the borders: 1 ≤ i < m-1, 1 ≤ j < n-1.
- For each such position, sum the corresponding elements, keep a running max.
- The complexity is acceptable because the grid is at most 150×150 and calculation per center is constant time.
- Optimization: No need for any prefix sum, as we only need to retrieve 7 elements for each valid center quickly.
- Decision: Simple double for loop is optimal. Sliding window or prefix sum does not optimize further.

### Corner cases to consider  
- Minimal grid of size 3×3 (only one hourglass possible).
- All elements identical.
- Large numbers (close to 10⁶).
- Negative values (if allowed; here 0 ≤ grid[i][j] ≤ 10⁶).
- Multiple hourglasses with same maximal sum.
- Rectangular matrices (not just square).

### Solution

```python
def maxSum(grid):
    m = len(grid)
    n = len(grid[0])
    max_sum = 0  # Since grid elements are ≥0, 0 is safe as initial value

    # Loop over all possible hourglass centers
    for i in range(1, m-1):
        for j in range(1, n-1):
            # Sum up the hourglass centered at (i, j)
            top = grid[i-1][j-1] + grid[i-1][j] + grid[i-1][j+1]
            mid = grid[i][j]
            bottom = grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1]
            glass_sum = top + mid + bottom

            if glass_sum > max_sum:
                max_sum = glass_sum

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).  
  For each inner cell (center of hourglass, total ~ (m-2)×(n-2)), we do a constant amount of work (sum of 7 numbers).

- **Space Complexity:** O(1).  
  No extra data structures, just a few variables for counters and maximum.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix can have negative numbers?
  *Hint: Initial max_sum should be set to float('-inf') instead of 0.*

- How would you return the coordinates of the maximum hourglass?
  *Hint: Track (i, j) whenever a new max is found.*

- How would you find the second largest unique hourglass sum?
  *Hint: Store all hourglass sums in a set, remove the max, return next highest.*

### Summary
This problem is a classic **matrix scan** with a fixed-shaped window, closely related to fixed-size sliding window patterns in 2D arrays. The main trick is correct iteration bounds to avoid out-of-bounds indices and summing only the fixed hourglass cells. This approach generalizes to similar problems like maximum-sum submatrix with a given pattern or size, but works here because the hourglass pattern is small and easily described by offsets.


### Flashcard
For each valid center cell (1 ≤ i < m−1, 1 ≤ j < n−1), sum the 7 hourglass elements and track maximum. O(m×n) single pass solution.

### Tags
Array(#array), Matrix(#matrix), Prefix Sum(#prefix-sum)

### Similar Problems
- Matrix Block Sum(matrix-block-sum) (Medium)