### Leetcode 2245 (Medium): Maximum Trailing Zeros in a Cornered Path [Practice](https://leetcode.com/problems/maximum-trailing-zeros-in-a-cornered-path)

### Description  
Given an m × n grid of positive integers, you must find the path within the grid that produces the **maximum number of trailing zeros** in the product of its values. The path must move only in straight lines (either horizontally or vertically), and can make **at most one turn**—thus forming an "L"-shaped (cornered) path. For example:
- You can go right and then down, or up and then left, but never form more than one corner.
The product’s trailing zeros come from the minimal number of times 2 and 5 both divide the product (since 10 = 2 × 5).


### Examples  

**Example 1:**  
Input:  
`grid = [[23,17,15,3,20],[8,1,20,27,11],[9,4,6,2,21],[40,9,1,10,6],[22,7,4,5,3]]`  
Output:  
`3`  
*Explanation: Path: (0,2) → (0,3) → (0,4) → (1,4) → (2,4) → (3,4) → (3,3). Product is 15 × 3 × 20 × 11 × 21 × 6 × 10 = 1188000, which has 3 trailing zeros (as min(count of 2, count of 5) = 3).*

**Example 2:**  
Input:  
`grid = [[10,20],[5,6]]`  
Output:  
`2`  
*Explanation: Path: (0,0) → (1,0). Product is 10 × 5 = 50 (2 trailing zeros).*

**Example 3:**  
Input:  
`grid = [[1,1],[1,1]]`  
Output:  
`0`  
*Explanation: Any path will have product = 1, which results in 0 trailing zeros.*

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  For every starting cell and every possible path that makes at most one turn (four "L" types: right then down, right then up, down then right, down then left), compute the product, and count trailing zeros.  
  But this is too slow since number of paths is huge and products get very large.

- **Key insight:**  
  The number of trailing zeros in a product is min(total factors of 2, total factors of 5) in the path.  
  So, for each cell, **precompute** the prefix sums of number of factors of 2 and 5 for rows and columns.  
  Then, for each "L" path through any cell, use the prefix sums to quickly calculate the total for each direction, combine as per the path, and take the minimum of summed 2s and 5s.

- **Optimized Approach:**  
  1. For each cell, count number of 2s and 5s (use a helper).  
  2. Build prefix sums for the counts along rows and columns (traverse matrix).  
  3. For each cell, and for each of four corner path configurations, sum the counts in both directions, making sure not to double-count the current cell, and find the min for 2s/5s for each path.  
  4. Keep track of maximum min for 2s and 5s.

- **Tradeoff:**  
  This increases code complexity, but brings the time complexity to O(mn), which is necessary for large grids.

### Corner cases to consider  
- Smallest grid size: 1×1, 1×n, n×1 (single row/column).  
- Cell values of 1 (no 2 or 5 factors at all).  
- All values are powers of 2 (no 5s) or powers of 5 (no 2s).  
- Optimal path is straight (no turn).
- Grid with zeros is not possible as per positive integers constraint.

### Solution

```python
def maxTrailingZeros(grid):
    m, n = len(grid), len(grid[0])
    
    # Helper to count number of 2s and 5s for a value
    def count_factors(x):
        twos = fives = 0
        while x % 2 == 0:
            twos += 1
            x //= 2
        while x % 5 == 0:
            fives += 1
            x //= 5
        return (twos, fives)
    
    # Store 2s and 5s factors for each cell
    factor2 = [[0]*n for _ in range(m)]
    factor5 = [[0]*n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            factor2[i][j], factor5[i][j] = count_factors(grid[i][j])
    
    # Prefix sums: left/right for rows; up/down for columns
    left2 = [[0]*(n+1) for _ in range(m)]
    left5 = [[0]*(n+1) for _ in range(m)]
    up2 = [[0]*(n) for _ in range(m+1)]
    up5 = [[0]*(n) for _ in range(m+1)]
    for i in range(m):
        for j in range(n):
            left2[i][j+1] = left2[i][j] + factor2[i][j]
            left5[i][j+1] = left5[i][j] + factor5[i][j]
            up2[i+1][j] = up2[i][j] + factor2[i][j]
            up5[i+1][j] = up5[i][j] + factor5[i][j]
    
    result = 0
    for i in range(m):
        for j in range(n):
            # Four cornered path types:
            # 1. left + up, left + down, right + up, right + down (from cell (i, j))
            
            twos = []
            fives = []
            # left + up: from (i,j) leftwards (row), then upwards (col)
            l = left2[i][j+1]
            r = left2[i][n] - left2[i][j]
            u = up2[i][j]
            d = up2[m][j] - up2[i+1][j]
            fl = left5[i][j+1]
            fr = left5[i][n] - left5[i][j]
            fu = up5[i][j]
            fd = up5[m][j] - up5[i+1][j]

            type1_2 = l + u - factor2[i][j]
            type1_5 = fl + fu - factor5[i][j]
            type2_2 = l + d - factor2[i][j]
            type2_5 = fl + fd - factor5[i][j]
            type3_2 = r + u - factor2[i][j]
            type3_5 = fr + fu - factor5[i][j]
            type4_2 = r + d - factor2[i][j]
            type4_5 = fr + fd - factor5[i][j]

            result = max(result,
                         min(type1_2, type1_5),
                         min(type2_2, type2_5),
                         min(type3_2, type3_5),
                         min(type4_2, type4_5))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × n). Each step—factoring, prefix sums, and checking each cell’s four paths—are all linear in the grid size. (Each prefix sum, plus 4 checks per cell.)

- **Space Complexity:**  
  O(m × n). We store several m × n arrays (factors and prefix sums).

### Potential follow-up questions (as if you’re the interviewer)  

- If the grid contains zeros, how would you handle the infinite zeros in the product?
  *Hint: Treat paths passing through zero separately, special-case the trailing-zero count for such paths.*

- How would you optimize for memory if the grid is very large?
  *Hint: Reuse/compress the prefix sums as you scan, or process row-by-row to save space.*

- Can you generalize this to more than one turn (multiple “corners”)?
  *Hint: Consider dynamic programming for more complex shapes, but complexity grows fast.*

### Summary
This problem showcases the **prefix sum** pattern over 2D matrices, applied to factor-counting rather than basic addition. The key trick is converting a numeric product problem into one about exponents, then summing over segments with prefix arrays. This principle is widely used in problems involving counting factors, range queries, or submatrix properties (“sum over L-shapes”, “sum over rectangles”, etc.).