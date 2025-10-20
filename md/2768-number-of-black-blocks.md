### Leetcode 2768 (Medium): Number of Black Blocks [Practice](https://leetcode.com/problems/number-of-black-blocks)

### Description  
Given an m × n grid, some cells are colored black (given as a list of coordinates); all others are white. A **block** is any 2 × 2 subgrid.  
Return an array of size 5, where the iᵗʰ entry is the number of 2 × 2 blocks that contain exactly i black cells (for i from 0 to 4).  

You need to efficiently count, for every possible 2 × 2 block, how many black cells it contains, and produce the counts for 0–4 black cells.

### Examples  

**Example 1:**  
Input: `m = 3, n = 3, coordinates = [[0,0]]`  
Output: `[3,2,0,0,0]`  
*Explanation:  
All possible 2 × 2 blocks are: (top-left corner of each 2 × 2 block)  
(0,0): contains (0,0),(0,1),(1,0),(1,1) → has 1 black  
(0,1): contains (0,1),(0,2),(1,1),(1,2) → has 0 black  
(1,0): contains (1,0),(1,1),(2,0),(2,1) → has 0 black  
(1,1): contains (1,1),(1,2),(2,1),(2,2) → has 0 black  
Total:  
- 0 black: 3 blocks  
- 1 black: 2 blocks  
Rest: 0*

**Example 2:**  
Input: `m = 3, n = 3, coordinates = [[0,0],[0,1],[1,1]]`  
Output: `[1,2,1,0,0]`  
*Explanation:  
Block at (0,0): {0,0},{0,1},{1,0},{1,1}: 3 black  
Block at (0,1): {0,1},{0,2},{1,1},{1,2}: 2 black  
Block at (1,0): {1,0},{1,1},{2,0},{2,1}: 1 black  
Block at (1,1): {1,1},{1,2},{2,1},{2,2}: 0 black*

**Example 3:**  
Input: `m = 2, n = 2, coordinates = [[0,0],[0,1],[1,0],[1,1]]`  
Output: `[0,0,0,0,1]`  
*Explanation:  
Only one block at (0,0), fully black (all four cells).*


### Thought Process (as if you’re the interviewee)  

First, notice that every 2 × 2 block can be uniquely identified by its top-left coordinate, and the total number of such blocks in an m × n grid is (m-1) × (n-1).  
Brute-force would be: iterate all blocks, and for each, check how many black cells it contains. That's O(mn × 4) if implemented naively (could be too slow for large grids).

But:  
- Each black cell affects at most 4 blocks (the blocks for which the black cell is at each corner).  
- For every black cell (x, y), the 2 × 2 blocks it can be in are: top-left corners (x-1, y-1), (x-1, y), (x, y-1), (x, y) (but only if they're in bounds).  
So, for all black cells, we increment the black count in the affected blocks.

We can use a counter/dictionary to store, for each block, how many black cells it contains.  
At the end, for each possible block, count how many have 0, 1, 2, 3, 4 black cells.  
- The blocks *not* in the counter have 0 black cells; number of such blocks is (m-1)×(n-1) minus number of blocks counted in the counter.

This is O(k), where k = number of black cells, and the rest is proportional to the number of affected blocks.

This avoids the brute-force and is the most efficient and scalable.

### Corner cases to consider  
- No black cells (all blocks are 0)
- All cells black (if min(m, n) ≥ 2, only 2 × 2, all with count 4)
- Black cell in a corner or on an edge: only some blocks affected (watch boundaries)
- Smallest possible grid (m or n = 1): no 2 × 2 blocks at all
- Duplicates in coordinate input (should not happen, but clarify for interview)
- Large m, n with sparse black cells: O(black cells) solution required

### Solution

```python
def countBlackBlocks(m, n, coordinates):
    # Map to store count of black cells per 2x2 block (top-left corner)
    cnt = {}
    for x, y in coordinates:
        # For each black cell, it can contribute to up to 4 blocks
        for dx in (0, -1):
            for dy in (0, -1):
                i, j = x + dx, y + dy
                # Only consider blocks fully inside grid
                if 0 <= i < m - 1 and 0 <= j < n - 1:
                    if (i, j) not in cnt:
                        cnt[(i, j)] = 1
                    else:
                        cnt[(i, j)] += 1

    res = [0] * 5
    # First, all blocks have 0 black cells
    total_blocks = (m - 1) * (n - 1)
    res[0] = total_blocks
    for val in cnt.values():
        # Subtract blocks which have at least 1 black cell from "0"
        res[0] -= 1
        # Increment respective count (for 1,2,3,4)
        res[val] += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k), where k = number of black cells; each black cell contributes to ≤4 blocks, so total iterations ≈ 4k. Final step is O(number of blocks with at least one black cell), which is ≤4k.
- **Space Complexity:** O(k), maximum size of the dictionary is up to 4k (but far smaller than total number of blocks for sparse black cells).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the approach to return the actual coordinates of blocks with exactly i black cells?
  *Hint: Instead of just counting, store and filter block coordinates for each count.*

- What if the block size was larger (e.g., 3 × 3 or k × k)?
  *Hint: For large k, a prefix sum or sliding window might be better for efficiency.*

- How would you optimize for extremely large grids but very few black cells?
  *Hint: Only process blocks affected by black cells, not the whole grid.*


### Summary
This approach utilizes a hash map to efficiently count affected 2 × 2 blocks for each black cell, providing an efficient solution pattern for problems involving local neighborhoods in a grid (often called "sparse update" or "affect by neighbors"). This pattern is applicable to other problems where only cells affected by points/events need to be processed, rather than touching every location in the grid.


### Flashcard
Each black cell affects at most 4 blocks (where it can be a corner), increment counters for those blocks only.

### Tags
Array(#array), Hash Table(#hash-table), Enumeration(#enumeration)

### Similar Problems
