### Leetcode 3537 (Medium): Fill a Special Grid [Practice](https://leetcode.com/problems/fill-a-special-grid)

### Description  
You are given a non-negative integer **n** representing a **2ⁿ × 2ⁿ** grid.  
You must fill the grid with all integers from 0 to **2^(2n) - 1** (each used exactly once), so that:
- All numbers in the **top-right** quadrant are less than those in the **bottom-right** quadrant.
- All numbers in the **bottom-right** quadrant are less than those in the **bottom-left** quadrant.
- All numbers in the **bottom-left** quadrant are less than those in the **top-left** quadrant.
- Each of the four quadrants itself must also be a "special" grid by this definition (recursively).

In other words: the grid is recursively partitioned into quadrants, and at each level, the above ordering must be satisfied for numbers across quadrants.

### Examples  

**Example 1:**  
Input: `n = 0`  
Output: `[]`  
*Explanation: With n = 0, the grid is 1×1. Only one number (0) fits the conditions.*

**Example 2:**  
Input: `n = 1`  
Output:  
```
[[12, 13, 14, 15],
 [ 8,  9, 10, 11],
 [ 4,  5,  6,  7],
 [ 0,  1,  2,  3]]
```
*Explanation: For n = 2 (4×4), numbers are filled so that each quadrant follows the "special" rules and is recursively well-ordered.*

**Example 3:**  
Input: `n = 2`  
Output:  
```
[[48, 49, 50, 51, 52, 53, 54, 55],
 [56, 57, 58, 59, 60, 61, 62, 63],
 [32, 33, 34, 35, 36, 37, 38, 39],
 [40, 41, 42, 43, 44, 45, 46, 47],
 [16, 17, 18, 19, 20, 21, 22, 23],
 [24, 25, 26, 27, 28, 29, 30, 31],
 [ 0,  1,  2,  3,  4,  5,  6,  7],
 [ 8,  9, 10, 11, 12, 13, 14, 15]]
```
*Explanation: The numbers fill the grid recursively, satisfying the quadrant ordering at every level.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** We could try all permutations of the numbers and check if the requirements are satisfied. This is not feasible for even very small n because the number of ways to fill a 2ⁿ × 2ⁿ grid is (2^{2n})! — astronomically large.
- **Observation:** The problem’s recursive quadrant definition strongly suggests a *divide-and-conquer* approach.
- For a given n, we can:
  - Build four grids of size 2ⁿ⁻¹ × 2ⁿ⁻¹ recursively.
  - Then, assign offsets for each quadrant so that their numbers do not overlap, and their values maintain the required relations:
    - Top-left: use offset 3 \* S
    - Top-right: use offset 2 \* S
    - Bottom-left: use offset 1 \* S
    - Bottom-right: use offset 0 \* S
    - Where S = size of a quadrant (2^{2(n-1)})
- Assemble the quadrants into a grid so that the quadrant ordering matches problem rules (see example).
- This recursive structure guarantees each subgrid is also special.
- **Trade-offs:** This approach uses recursion and some extra space for combination; time and space are both efficient compared to brute force.

### Corner cases to consider  
- n = 0 (grid is 1×1)
- Smallest non-trivial grid (n = 1, grid is 2×2)
- Larger n (test for recursion stack)
- Verify all numbers 0 ... 2^{2n}-1 are present exactly once
- Are the quadrant orderings correct at all levels of recursion?

### Solution

```python
def fillSpecialGrid(n):
    # Base case: 1 x 1 grid, just return [[0]]
    if n == 0:
        return [[0]]
    
    # Recursively fill a smaller grid
    smaller = fillSpecialGrid(n - 1)
    side = 1 << (n - 1)  # side length of smaller grid
    size = side * 2      # side length of current grid
    S = side * side      # number of elements in each quadrant
    
    # New grid
    grid = [[0] * size for _ in range(size)]
    
    # Offsets for each quadrant to keep values in order
    # TL: 3*S, TR: 2*S, BL: 1*S, BR: 0*S
    for i in range(side):
        for j in range(side):
            grid[i][j] = smaller[i][j] + 3 * S           # top-left
            grid[i][j + side] = smaller[i][j] + 2 * S    # top-right
            grid[i + side][j] = smaller[i][j] + 1 * S    # bottom-left
            grid[i + side][j + side] = smaller[i][j] + 0 * S  # bottom-right
    
    return grid
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(4ⁿ)  
  At each level, we recursively build grids for four quadrants of size 2ⁿ⁻¹ × 2ⁿ⁻¹, leading to a total of 4ⁿ cells filled once each. The copy/assembly at each step is also proportional to the cell count. Therefore, total time is proportional to the number of cells.
  
- **Space Complexity:** O(4ⁿ)  
  The returned grid contains 4ⁿ elements. Recursion stack depth is O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do it in place without creating new grids at each recursion?
  *Hint: Try reusing one grid and working with indices instead of creating new lists.*

- How do you validate that your output satisfies all the properties for all n?
  *Hint: Write property-based tests. Recursively check quadrant constraints and uniqueness.*

- What would you change if the numbers for each cell didn't need to be unique, but only the ordering between quadrants mattered?
  *Hint: You could use a single base pattern rather than filling with unique integers.*

### Summary
This problem uses the **divide and conquer** pattern, leveraging recursion and quadrant ordering to efficiently construct a 2ⁿ × 2ⁿ "special" grid. The key is to recursively solve for a smaller grid, then fill each quadrant with the correct offset to satisfy the constraints. This technique resembles recursive construction and assembling subproblems, widely applicable in multi-dimensional divide-and-conquer scenarios, such as certain tiling, image processing, or matrix problems.