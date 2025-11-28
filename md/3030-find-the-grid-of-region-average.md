### Leetcode 3030 (Medium): Find the Grid of Region Average [Practice](https://leetcode.com/problems/find-the-grid-of-region-average)

### Description  
You are given a 2D integer grid image and an integer threshold.
- A **region** is any 3×3 subgrid such that for every pair of adjacent pixels (directly up/down/left/right), the absolute difference of their values is ≤ threshold.
- Many regions can overlap: any given pixel may be included in multiple 3×3 regions.
- For each pixel image[i][j]:
  - If it belongs to at least one region, result[i][j] is ⌊(sum of region averages that include this pixel) ÷ (number of regions pixel is in)⌋.
    - Each region average: ⌊sum of its 9 pixels ÷ 9⌋, always rounding down.
    - For pixels in multiple regions, round down each region’s average, sum them, divide by how many, and round down again.
  - If it belongs to no regions, result[i][j] = image[i][j].

### Examples  

**Example 1:**  
Input:  
`image = [[1,3,2],[5,4,6],[8,7,9]]`, threshold = `2`  
Output:  
`[[4,4,4],[4,4,4],[4,4,4]]`  
*Explanation: The only 3×3 region is the whole grid. All adjacent values differ by ≤2. The region average: ⌊(1+3+2+5+4+6+8+7+9)/9⌋ = ⌊45/9⌋ = 5. Since every pixel is in 1 region with region average 5, result[i][j]=5 for all i,j.*

**Example 2:**  
Input:  
`image = [[10,120,10],[120,10,120],[10,120,10]]`, threshold = `10`  
Output:  
`[[10,120,10],[120,10,120],[10,120,10]]`  
*Explanation: No 3×3 subgrid qualifies as a region since adjacent differences are >10. No region includes any pixel, so result=image.*

**Example 3:**  
Input:  
`image = [[1,1,1,1],[1,100,100,1],[1,100,100,1],[1,1,1,1]]`, threshold = `1`  
Output:  
`[[1,1,1,1],[1,33,33,1],[1,33,33,1],[1,1,1,1]]`  
*Explanation: Four 3×3 regions qualify (the four corners where the '100's are in the center 2×2 area). Each such region:  
```
1 1 1
1 100 100
1 100 100
```  
But since the center region's adjacent pixels' differences exceed 1, actually, no 3×3 subgrid with both 1 and 100 will pass the region check; only those full of 1s or full of 100s will. This makes every pixel outside the center 2×2 be part of a region of all 1s; center cells remain unchanged because they have no valid region.*

### Thought Process (as if you’re the interviewee)  
Let’s clarify the logic:
- For each possible 3×3 subgrid, check if all adjacent pairs have values differing by ≤ threshold.
- If it’s a region:
  - Compute its region average ⌊sum/9⌋.
  - Record for every cell in the region that this cell is included in a region average (may be many).
- For each cell, if included in at least one region, output is the average (rounded down) of all regions it participated in; otherwise, output the pixel’s input value.

**Brute-to-optimized:**
- Brute: For every cell as center of 3×3 region, check all adjacent pairs, store averages—O(mn × 9) per region.
- Optimize average: Use prefix sum to compute 3×3 sum in O(1) time.
- Checking adjacent pairs in a 3×3 block: Must check all up/down/left/right pairs—since each region is small, this overhead is manageable.

Why this approach: Even with prefix sums, still need to check all adjacent pairs in every 3×3 region because pixel differences cannot be reduced to range/min/max, it’s about all pairs.

Trade-off: Slightly high constant per region, but problem constraints likely limit m,n to acceptable sizes.

### Corner cases to consider  
- Grid too small for any 3×3 region (image size < 3 in rows or columns)
- All pixel values the same (all adjacent pairs trivially valid)
- Threshold = 0 (only regions with identical neighbors qualify)
- Threshold very large (all regions valid)
- Pixels on the edge (less than 3×3 region possible)
- Multiple regions overlap a pixel (take proper average)
- No region at all (entire output = input grid)

### Solution

```python
def findGridRegionAverage(image, threshold):
    m, n = len(image), len(image[0])
    result = [[0] * n for _ in range(m)]
    regions_list = [[[] for _ in range(n)] for _ in range(m)]

    # Helper: Sum for 3x3 region using prefix sum for speedup
    prefix = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m):
        for j in range(n):
            prefix[i+1][j+1] = image[i][j] + prefix[i+1][j] + prefix[i][j+1] - prefix[i][j]

    def get_3x3_sum(r, c):
        return (prefix[r+3][c+3] - prefix[r][c+3] - prefix[r+3][c] + prefix[r][c])

    # All up/down/left/right offsets
    dirs = [(-1,0),(1,0),(0,-1),(0,1)]

    # Check if the 3x3 grid with top-left at (r,c) is a region
    def is_region(r, c):
        for i in range(r, r+3):
            for j in range(c, c+3):
                for dx, dy in dirs:
                    ni, nj = i + dx, j + dy
                    if r <= ni < r+3 and c <= nj < c+3:
                        if abs(image[i][j] - image[ni][nj]) > threshold:
                            return False
        return True

    # For each possible region (3x3 window)
    for i in range(m-2):
        for j in range(n-2):
            if is_region(i, j):
                region_avg = get_3x3_sum(i, j) // 9
                # Mark this region for every cell inside it
                for x in range(i, i+3):
                    for y in range(j, j+3):
                        regions_list[x][y].append(region_avg)

    # Compute result for each cell
    for i in range(m):
        for j in range(n):
            if regions_list[i][j]:
                result[i][j] = sum(regions_list[i][j]) // len(regions_list[i][j])
            else:
                result[i][j] = image[i][j]

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m * n * 9) where m, n are rows and columns. Checking each 3×3 region is O(1) for sum (via prefix) and O(1) for adjacent pairs (since 3×3 has 12 such pairs). Total O(m \* n) for all 3×3 regions, plus going through all pixels once more for result aggregation.
- **Space Complexity:** O(m × n) for result and for tracking region averages list per cell. Prefix sum grid also O(m × n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle larger region sizes, like 5×5 windows?
  *Hint: Generalize adjacency checking and window sum, possibly using `for` loops and parameterized region size.*

- Can this be optimized for very large images?
  *Hint: Consider window sliding only for checking adjacent pixel diffs, possibly use rolling buffers, and parallelize region checks.*

- What if the region definition used diagonals as well (8-neighbor adjacency)?
  *Hint: Extend `dirs` to include diagonal directions and adjust the adjacency checks accordingly.*

### Summary
This problem uses the **2D prefix sum** for fast region sum lookups and manual checks for all up/down/left/right neighbors within a window, which is a common matrix-processing pattern. 
The approach of marking every cell with all regions it belongs to, and then aggregating results, is a general technique for "overlapping sliding window" problems where output at each cell depends on overlapping neighborhoods. 
A similar pattern appears in image processing (denoise, blur), convolutional filters, and "median of sliding window" problems.


### Flashcard
For each 3×3 subgrid, check if all adjacent pairs differ by ≤ threshold; compute region average ⌊sum/9⌋ for valid regions.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
- Range Sum Query 2D - Immutable(range-sum-query-2d-immutable) (Medium)
- K Radius Subarray Averages(k-radius-subarray-averages) (Medium)