### Leetcode 661 (Easy): Image Smoother [Practice](https://leetcode.com/problems/image-smoother)

### Description  
You are given a 2D integer matrix, representing a grayscale image where each element is a pixel value between 0 and 255. Your task is to smooth the image by replacing each pixel's value with the average of itself and all its valid neighbors (surrounding 8 cells), rounding down. For boundary pixels (like corners or edges), only average over the valid neighbors within the matrix. The final result should be a new matrix of the same dimensions, where each cell contains its smoothed value.

### Examples  

**Example 1:**  
Input: `img = [[1,1,1],[1,0,1],[1,1,1]]`  
Output: `[[0,0,0],[0,0,0],[0,0,0]]`  
*Explanation: Each pixel is replaced by the floor of the average of itself and its neighbors. For the center (0,0), the nine values are all 1 except the center, which is 0; sum = 8, count = 9, average = 8//9 = 0.*

**Example 2:**  
Input: `img = [[100,200,100],[200,50,200],[100,200,100]]`  
Output: `[[137,141,137],[141,138,141],[137,141,137]]`  
*Explanation: The average for each cell (with correct neighbor counting) is computed:  
- Top-left (100,200,100,200,50): sum = 650, count = 5, average = 130 (incorrect), actual sum for all 9 cells = 1250, count = 9, average = 138. Only valid neighbors are included for edges/corners.*

**Example 3:**  
Input: `img = [[2,3,4],[5,6,7],[8,9,10],[11,12,13],[14,15,16]]`  
Output:  
`[[4,4,5],[5,6,6],[8,9,9],[11,12,12],[13,13,14]]`  
*Explanation:  
- For cell (0,0): Neighbors are (2,3,5,6), sum = 16, count = 4, average = 16//4 = 4.  
- For cell (1,2): Neighbors are (4,7,6,9,10), sum = 36, count = 5, average = 36//5 = 7.*

### Thought Process (as if you’re the interviewee)  
My initial approach is brute-force: For each cell in the matrix, I'll iterate over its 3×3 grid (current cell + up to 8 neighbors), sum all valid pixel values (i.e., those within the grid), and count the number of valid cells. Then, I take the integer division of the sum by the count (floor division) to get the smoothed value. This is done for each cell, constructing a new output matrix of the same size.

Brute-force is acceptable since each cell only examines at most 9 neighbors (constant work), so the whole algorithm runs in O(m×n) time, where m and n are the dimensions of the matrix. No advanced optimization is needed because the constraints are small.

Chose brute-force because:
- Each pixel has at most 8 neighbors, so neighbor-checking is bounded.
- It is simple to understand and easy to implement.
- No significant trade-offs since every cell must be visited, and every neighbor considered.

### Corner cases to consider  
- The input matrix is only 1×1 — edge and corner are the same.
- The matrix is a single row or column — neighbors missing in one dimension.
- All pixel values are the same (output should also be all the same).
- Maximum and minimum pixel values (0 or 255).
- Empty input (though LeetCode will not test with empty).

### Solution

```python
def imageSmoother(img):
    m, n = len(img), len(img[0])  # dimensions
    result = [[0] * n for _ in range(m)]
    
    for i in range(m):
        for j in range(n):
            total = 0
            count = 0
            for dx in [-1, 0, 1]:
                for dy in [-1, 0, 1]:
                    ni, nj = i + dx, j + dy
                    if 0 <= ni < m and 0 <= nj < n:
                        total += img[ni][nj]
                        count += 1
            result[i][j] = total // count  # integer division: floor
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), since we visit each cell, and for each cell, we check up to 9 positions (neighbors and itself), which is constant time for each cell.
- **Space Complexity:** O(m × n), as we allocate a new result matrix of the same size as input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle smoothing if the image had a much larger (e.g., 5x5 or 9x9) kernel?  
  *Hint: Precompute prefix sums for efficient region sum querying.*

- How can this be modified to work on a colored image (3D matrix: rows × cols × RGB)?  
  *Hint: Loop over each pixel and apply smoothing separately for each color channel.*

- What if you need to perform multiple smoothing passes?  
  *Hint: Use the result of the first pass as the input for the next.*

### Summary
The approach uses a classic grid traversal with local neighbor aggregation—a common pattern for image processing, convolution, and board game simulations. This pattern extends to median/mode filtering, flood fill, blurring, and game-of-life type problems. The step-by-step boundary-robust logic makes it especially reusable for many matrix-local-aggregation interview questions.