### Leetcode 1504 (Medium): Count Submatrices With All Ones [Practice](https://leetcode.com/problems/count-submatrices-with-all-ones)

### Description  
Given a binary matrix, count the number of submatrices (rectangles) in which **every cell is 1**. Each such rectangle must form a contiguous block of all 1s.

### Examples  
**Example 1:**  
Input: `mat = [[1,0,1],[1,1,0],[1,1,0]]`
Output: `13`
*Explanation: There are 6 single-cells of 1; several 2x1 verticals and horizontals, and some 2x2, as well as three-rows by 1 ones, totaling 13.*

**Example 2:**  
Input: `mat = [[0,1,1,0],[0,1,1,1],[1,1,1,0]]`
Output: `24`
*Explanation: Richer matrix, more and larger possible all-1 submatrices; need to count all, brute force will time out.*

### Thought Process (as if you’re the interviewee)  
Counting all-1 submatrices naively (O(R⁴C⁴)) is too slow. Instead:
- For each row, treat current row as the **bottom edge** of submatrices. Compute, for every cell, how many consecutive 1s above (including current row) — store as "height" for each column.
- For each cell as the bottom edge, scan left to right: for each cell, look leftward, keep track of min height, and sum these — this counts all-1 rectangles ending at (row, col).

Classic technique: using a **monotonic stack** or histogram approach per row (similar to "maximal rectangle" problems), but instead of largest, we sum up # of rectangles.

### Corner cases to consider  
- Matrix of all zeros (answer is 0).
- All ones (answer is sum over all possible rectangles).
- Single-row or single-column matrix.

### Solution

```python
def numSubmat(mat):
    rows, cols = len(mat), len(mat[0])
    heights = [0] * cols
    total = 0
    for r in range(rows):
        for c in range(cols):
            heights[c] = heights[c] + 1 if mat[r][c] else 0
        for c in range(cols):
            if heights[c] == 0:
                continue
            min_height = heights[c]
            for k in range(c, -1, -1):
                if heights[k] == 0:
                    break
                min_height = min(min_height, heights[k])
                total += min_height
    return total
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(R × C × C). For each cell, look left for a maximal submatrix, can be optimized but accepted for constraints.
- **Space Complexity:** O(C) extra for histogram.

### Potential follow-up questions (as if you’re the interviewer)  
- How can you improve to O(R × C) time?  
  *Hint: Use monotonic stack for left boundary.*
- What if matrix is very large and can't fit in memory?  
  *Hint: Process in streaming fashion, maintain state between rows.*
- How about counting submatrices with at least one zero?  
  *Hint: Inclusion-exclusion or complement method needed.*

### Summary
A **histogram-based matrix-DP** pattern, similar to maximal rectangle and largest rectangle in histogram, but adapted for counting instead of maximal area. Useful for counting structured subarrays/submatrices that satisfy a certain property.