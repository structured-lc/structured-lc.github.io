### Leetcode 2373 (Easy): Largest Local Values in a Matrix [Practice](https://leetcode.com/problems/largest-local-values-in-a-matrix)

### Description  
Given an n × n matrix of integers, generate a new matrix of size (n − 2) × (n − 2) such that each element at position (i, j) in the new matrix is the largest value within the 3 × 3 submatrix of the input grid whose top-left is at (i, j). The output matrix therefore contains for each 3 × 3 square in the original matrix (moving from left to right and top to bottom), the maximum value in that subgrid.

### Examples  

**Example 1:**  
Input: `grid = [[9,9,8,1],[5,6,2,6],[8,2,6,4],[6,2,2,2]]`  
Output: `[[9,9],[8,6]]`  
Explanation:  
- For top-left (0,0): max([9,9,8,5,6,2,8,2,6]) = 9  
- For (0,1): max([9,8,1,6,2,6,2,6,4]) = 9  
- For (1,0): max([5,6,2,8,2,6,6,2,2]) = 8  
- For (1,1): max([6,2,6,2,6,4,2,2,2]) = 6

**Example 2:**  
Input: `grid = [[1,1,1],[1,1,1],[1,1,1]]`  
Output: `[[1]]`  
Explanation:  
Only one 3 × 3 subgrid (the grid itself), all values are 1, so max is 1.

**Example 3:**  
Input: `grid = [[3,7,4,5],[1,6,2,8],[9,3,8,6],[4,2,7,2]]`  
Output: `[[9,8],[9,8]]`  
Explanation:  
- (0,0): max([3,7,4,1,6,2,9,3,8]) = 9  
- (0,1): max([7,4,5,6,2,8,3,8,6]) = 8  
- (1,0): max([1,6,2,9,3,8,4,2,7]) = 9  
- (1,1): max([6,2,8,3,8,6,2,7,2]) = 8

### Thought Process (as if you’re the interviewee)  
- The task is to slide a 3×3 window over the grid and record the maximum value in each window’s position.
- The result matrix will have size (n−2)×(n−2) because you lose the first and last row/column for a full 3×3 window.
- **Naive approach:** For each possible window, scan all nine values and choose the max. This is O(n²) for building the result grid and O(1) for computing each window max (since each is 3×3 = constant).
- Since the grid is small (n ≤ 100), we can afford this brute-force approach, as O(n²) is acceptable.
- Optimizations with queues or dynamic programming aren’t necessary for 3×3 sliding maximums.

### Corner cases to consider  
- Smallest grid: n = 3
- All values equal
- All values different and increasing/decreasing
- Negative values in the grid
- Large n (performance check)
- Empty grid: invalid per constraints, but mention it

### Solution

```python
from typing import List

def largestLocal(grid: List[List[int]]) -> List[List[int]]:
    n = len(grid)
    result = [[0] * (n - 2) for _ in range(n - 2)]

    # Iterate over each possible top-left corner of a 3×3 submatrix
    for i in range(n - 2):
        for j in range(n - 2):
            max_val = grid[i][j]
            # Check each cell in the 3×3 window
            for dx in range(3):
                for dy in range(3):
                    max_val = max(max_val, grid[i + dx][j + dy])
            result[i][j] = max_val
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). There are (n − 2)² windows, and for each, we examine 9 elements (constant factor); overall O(n²).
- **Space Complexity:** O(n²) for the output matrix, as the extra result grid has (n − 2)² elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed the min instead of the max?
  *Hint: Change the comparison in the inner loop.*

- How would you handle a larger window size (e.g. 5 × 5) or variable window?
  *Hint: Consider preprocessing with prefix max/min or using deque/monotonic queue for larger sliding windows.*

- Can you solve this for non-square grids?
  *Hint: Adjust window iteration and result matrix size for m × n grids.*

### Summary
This solution uses a **fixed-size sliding window maximum pattern**. The core is scanning each possible 3×3 subgrid and recording its maximum—simple brute-force due to small data size. It's a classic approach applicable to other local filtering operations in images (e.g., local max pooling), and similar logic extends to other window and filter sizes.


### Flashcard
For each valid (i,j) position, scan the 3×3 window centered at (i+1, j+1) and record the maximum value. O(n²) time.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
