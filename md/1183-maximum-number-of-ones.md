### Leetcode 1183 (Hard): Maximum Number of Ones [Practice](https://leetcode.com/problems/maximum-number-of-ones)

### Description  
You are given a matrix of size **width × height**. You can fill each cell with either a **0** or **1**.  
The constraint: Any square sub-matrix of size **sideLength × sideLength** can contain at most **maxOnes** ones.  
**Goal:** Place 1s to maximize their total count, while never having a sideLength × sideLength sub-matrix containing more than maxOnes ones.


### Examples  

**Example 1:**  
Input: `width = 3, height = 3, sideLength = 2, maxOnes = 1`  
Output: `4`  
Explanation:  
Best configuration:
```
[1,0,1]
[0,0,0]
[1,0,1]
```
Each 2×2 square contains ≤1 one.

**Example 2:**  
Input: `width = 3, height = 3, sideLength = 2, maxOnes = 2`  
Output: `6`  
Explanation:  
One valid arrangement:
```
[1,0,1]
[1,0,1]
[1,0,1]
```
Every 2×2 sub-matrix contains ≤2 ones.

**Example 3:**  
Input: `width = 4, height = 4, sideLength = 3, maxOnes = 4`  
Output: `16`  
Explanation:  
Simply fill the whole matrix with 1s:  
Each 3×3 sub-matrix contains at most 4 ones, possible when constraints are loose or matrix is large relative to sideLength.


### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Try all possible ways of placing ones, check all sideLength×sideLength sub-matrices. This is infeasible (NP-hard) for large grids.
  
- **Pattern Realization:**  
  Notice that the sideLength×sideLength constraint **repeats every sideLength rows/cols**.  
  If we design a block of sideLength×sideLength, and tile it across the whole matrix, every large submatrix aligns with some block.  
  So, **decide ONCE where to put the maxOnes per block**, then count how many times each cell in the block "copies" over the whole array.

- **Cell Frequency:**  
  Some cells in the block are included in *more* of these submatrices (e.g., the top-left cell appears in all blocks starting from (0,0), (sideLength,0), etc.).  
  For each coordinate (i, j) with \(0 \leq i, j < \text{sideLength}\), its occurrence in the entire matrix is:
  ```
  freq(i, j) = ((width - i + sideLength - 1) // sideLength) * ((height - j + sideLength - 1) // sideLength)
  ```
  We want to distribute ones to the maxOnes **block cells with the highest frequencies**.

- **Algorithm:**
  1. For all 0 ≤ i, j < sideLength, compute freq(i, j)
  2. Place ones in the maxOnes cells with the largest frequencies
  3. The sum of their frequencies is the answer

*Why final approach works*:  
Exploits periodicity; ensures exactly the maxOnes constraint in every block due to tiling symmetry. Greatly reduces the search space.


### Corner cases to consider  
- **maxOnes = 0:** Return 0, impossible to place any ones.
- **maxOnes = sideLength²:** Every cell in every block can be 1, so the entire grid is filled with ones.
- **width/height < sideLength:** The only block is the entire matrix.
- **width or height not divisible by sideLength:** Some block cells repeat one more time than others; correct frequency calculation is crucial.
- **Small grids (1×1), (1×n), (n×1).**
- **sideLength = 1** (each cell its own block): At most maxOnes ones possible: min(total cells, maxOnes).


### Solution

```python
def maximumNumberOfOnes(width: int, height: int, sideLength: int, maxOnes: int) -> int:
    # Compute frequency for each (i, j) block coordinate
    freqs = []
    for i in range(sideLength):
        for j in range(sideLength):
            # How many times does cell (i, j) appear in the tiled matrix?
            row_count = (width - i + sideLength - 1) // sideLength
            col_count = (height - j + sideLength - 1) // sideLength
            freq = row_count * col_count
            freqs.append(freq)
    # Select maxOnes cells with largest frequency
    freqs.sort(reverse=True)
    # Sum their frequencies
    return sum(freqs[:maxOnes])
```


### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(sideLength² log sideLength²) = O(sideLength² log sideLength)  
  - Calculating frequencies: sideLength²
  - Sorting: sideLength² log sideLength  
  Can ignore width×height in time as we never iterate over the entire matrix.

- **Space Complexity:**  
  O(sideLength²), for storing frequencies


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where the constraint is not for every sideLength × sideLength submatrix, but only for certain positions?
  *Hint: Think about overlapping vs. non-overlapping blocks; the periodicity may not solve it directly.*

- What if each submatrix must have **exactly** maxOnes ones (not at most)?
  *Hint: Uniform tiling may not suffice, maybe impossible in some cases.*

- Can you generalize for non-square grids, or for rectangles of any size a × b instead of sideLength × sideLength?
  *Hint: Try similar block decomposition, careful with overlap calculations.*


### Summary  
The key insight is periodicity: by optimizing the 1s' arrangement within a sideLength×sideLength block and leveraging the block's replication, we maximize the total.  
Pattern: **Greedy selection of the max-frequency block cells**.  
This approach is related to "tiling," modular simulation, and greedy counting.  
This technique also appears in periodic matrices, tessellations, and maximizing values with repeating constraints.


### Flashcard
Design a sideLength×sideLength block with maxOnes, then tile it—constraint repeats every sideLength rows/cols.

### Tags
Math(#math), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
