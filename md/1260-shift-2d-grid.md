### Leetcode 1260 (Easy): Shift 2D Grid [Practice](https://leetcode.com/problems/shift-2d-grid)

### Description  
Given a 2D grid of size m × n and an integer k, perform the following operation k times: shift every element in the grid one position to the right. Elements wrap to the next row, and the last element moves to the start of the grid. After k shifts, return the new grid.

Each "shift" operates as:
- grid[i][j] moves to grid[i][j+1]
- grid[i][n-1] moves to grid[i+1]
- grid[m-1][n-1] moves to grid

### Examples  

**Example 1:**  
Input: `grid=[[1,2,3],[4,5,6],[7,8,9]]`, `k=1`  
Output: `[[9,1,2],[3,4,5],[6,7,8]]`  
*Explanation: All elements are shifted once to the right with wrapping. 9 moves to front.*

**Example 2:**  
Input: `grid=[[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]]`, `k=4`  
Output: `[[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]`  
*Explanation: After 4 shifts, each element appears 4 positions ahead, wrapping to the next row as needed.*

**Example 3:**  
Input: `grid=[[1],[2],[3],[4],[5],,,,,]`, `k=3`  
Output: `[,,,[1],[2],[3],[4],[5],,]`  
*Explanation: Single-column, so shifting 3 times moves the last 3 elements to the top.*

### Thought Process (as if you’re the interviewee)  
First, I’d try a brute-force approach: perform k shift operations directly, moving each number right one by one, k times. This works for very small inputs, but is inefficient: each shift is O(m×n), and total time is O(k×m×n).

To optimize, I’ll look for a mathematical way to map elements after k shifts. Flattening the 2D grid into a 1D array helps:
- The element at position i moves to (i + k) % (m×n).
- We can reverse this mapping: For each cell in the output grid, compute which element from the old grid should appear here by using modular arithmetic.

Final approach:
- For each element, calculate its final position after k shifts and build the output grid in O(m×n) time, O(m×n) space.
- Trade-off: uses an extra grid, but is optimal for time and clear to implement.

### Corner cases to consider  
- grid is empty ([])
- Only one row or one column
- k is 0 (no shift)
- k ≥ m×n (full wraparounds, so use k % (m×n))
- All elements are identical or only one element
- grid with non-square (rectangular) shape

### Solution

```python
def shiftGrid(grid, k):
    # Get grid dimensions
    m, n = len(grid), len(grid[0])
    # Total number of elements
    total = m * n
    # To avoid extra cycles if k is large
    k = k % total

    # Build the answer grid initialized to zeros
    ans = [[0 for _ in range(n)] for _ in range(m)]

    for i in range(m):
        for j in range(n):
            # 1D index of the current element
            idx = i * n + j
            # New index after k shifts
            new_idx = (idx + k) % total
            # 2D position in ans
            new_i = new_idx // n
            new_j = new_idx % n
            ans[new_i][new_j] = grid[i][j]
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n) — We visit each cell once to compute its new position.
- **Space Complexity:** O(m×n) — The answer grid needs the same size as input. No extra data structures beyond that.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you solve it in-place, i.e., O(1) extra space (excluding the output grid)?
  *Hint: Consider cyclical in-place swaps or rearranging elements in cycles.*

- If k is extremely large or negative, how would you optimize further?
  *Hint: k = k % (m×n) since a full wrap returns to original state.*

- Could you shift the grid up, left, or down—generalizing for any direction?
  *Hint: Try representing directions as index transformations and making the code reusable.*

### Summary
The optimal approach leverages array flattening and index mapping for efficient simulation of the shifting process. This pattern of 2D-to-1D conversions is common in grid or matrix manipulation problems, enabling efficient in-place or auxiliary-array solutions for rotation, shifting, or rearrangement tasks.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
