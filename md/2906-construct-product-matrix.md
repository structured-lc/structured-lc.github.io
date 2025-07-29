### Leetcode 2906 (Medium): Construct Product Matrix [Practice](https://leetcode.com/problems/construct-product-matrix)

### Description  
Given a 2D integer matrix **grid** of size n × m, construct another matrix **p** of the same size, where each element p[i][j] is the product of all elements in **grid** except grid[i][j], modulo 12345. You must not use division.  
You need to efficiently calculate, for every cell, the product of all elements except the current one, taking modulo in all calculations (because the total product may be very large).

### Examples  

**Example 1:**  
Input: `grid = [[1,2],[3,4]]`  
Output: `[[24,12],[8,6]]`  
Explanation:  
- Exclude (0,0): product = 2×3×4 = 24  
- Exclude (0,1): product = 1×3×4 = 12  
- Exclude (1,0): product = 1×2×4 = 8  
- Exclude (1,1): product = 1×2×3 = 6  

**Example 2:**  
Input: `grid = [[5,7],[2,3],[4,1]]`  
Output: `[[84,60],[210,140],[105,420]]`  
Explanation:  
- Exclude (0,0): product = 7×2×3×4×1 = 168, 168 % 12345 = 168  
  (Apply modulo as needed depending on product size)  
- Each output cell is the product of all grid elements except the excluded one.

**Example 3:**  
Input: `grid = []`  
Output: `[[1]]`  
Explanation:  
- Only one element in the grid – excluding it leaves product 1 (by convention).

### Thought Process (as if you’re the interviewee)  
A brute-force way: For every cell (i, j), iterate through the grid and multiply every element except grid[i][j]. This is O(n²m²), which will time out for large matrices.

Obvious optimization:  
- We can avoid repeated multiplication by precomputing products.
- For 1D arrays (“product of array except self”), we usually use prefix and suffix products.
- For a flattened 2D grid, the same trick works:  
    1. Flatten grid into a 1D array.  
    2. Precompute prefix and suffix products.  
    3. For each coordinate, the required product is prefix product \* suffix product (excluding grid[i][j]) at that position.
- To avoid extra space for flattening, do the computations in matrix-order using two passes:
    - 1st pass (suffix, right-to-left, bottom-to-top): store the product of all cells after (i, j).
    - 2nd pass (prefix, left-to-right, top-to-bottom): compute/accumulate and combine with stored suffix.
    - Always take modulo 12345 after each multiplication to keep numbers manageable.

Why this is efficient: Each cell gets visited twice, all multiplies are O(1). So it’s O(nm).

### Corner cases to consider  
- **1×1 matrix** (single element): The answer should be [[1]].
- **Matrices with 0s**: If the grid contains zeroes, don’t divide — our approach ignores division entirely.
- **Large values**: Take modulo after each multiplication.
- **Empty grid**: Should not occur by constraints, but return [] if it does.
- **Non-square grid**: (e.g., n ≠ m) — should still work.

### Solution

```python
def constructProductMatrix(grid):
    # Compute grid size
    n = len(grid)
    m = len(grid[0])
    MOD = 12345

    # Initialize output matrix with zeros
    p = [[0] * m for _ in range(n)]

    # Suffix product: right-to-left, bottom-to-top
    suffix = 1
    # We process cells in reverse row/col order to store "product of all after"
    for i in range(n - 1, -1, -1):
        for j in range(m - 1, -1, -1):
            p[i][j] = suffix
            suffix = (suffix * grid[i][j]) % MOD

    # Prefix product: left-to-right, top-to-bottom
    prefix = 1
    for i in range(n):
        for j in range(m):
            p[i][j] = (p[i][j] * prefix) % MOD
            prefix = (prefix * grid[i][j]) % MOD

    return p
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m)  
    - Two passes over all n × m cells, constant work per cell.
- **Space Complexity:** O(n × m)  
    - Output matrix of same size as input. Only small additional constants for prefix/suffix.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where the product could be zero?  
  *Hint: How does prefix/suffix logic help naturally avoid issues with zeros?*

- Can you adapt your approach for a 3D matrix (tensor)?  
  *Hint: Can you generalize prefix/suffix logic across more axes or flatten in a well-defined order?*

- What if the numbers are so big that even modulus overflows in intermediate steps?  
  *Hint: Consider using logarithms; would there be rounding issues?*

### Summary
This approach applies the standard “product of array except self” pattern adapted to 2D: we use prefix and suffix product sweeps (scan from ends, combine) so each cell’s value is built from O(1) operations, no division. This pattern is also seen in “product of array except self” and subarray-product problems.  
Careful index handling and modulo arithmetic are key, and the approach generalizes to 1D or flattened N-D grids as well.