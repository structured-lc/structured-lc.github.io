### Leetcode 1886 (Easy): Determine Whether Matrix Can Be Obtained By Rotation [Practice](https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation)

### Description  
Given two n×n binary matrices (lists of lists) mat and target, determine if you can make mat equal to target by rotating mat in 90-degree increments (clockwise), any number of times (0–3 rotations). Each rotation rotates all elements 90° clockwise. Return true if possible, otherwise false.

### Examples  

**Example 1:**  
Input: `mat = [[0,1],[1,0]], target = [[1,0],[0,1]]`  
Output: `true`  
*Explanation: Rotating mat 90° makes it equal to target:*

```
Original:
0 1
1 0

Rotate 90°:
1 0
0 1
```

**Example 2:**  
Input: `mat = [[0,1],[1,1]], target = [[1,0],[0,1]]`  
Output: `false`  
*Explanation: No matter how you rotate mat, it will never equal target.*

**Example 3:**  
Input: `mat = [[0,0,0],[0,1,0],[1,1,1]], target = [[1,1,1],[0,1,0],[0,0,0]]`  
Output: `true`  
*Explanation: Rotating mat 90° twice gives:*
```
Original:
0 0 0
0 1 0
1 1 1

90° once:
1 0 0
1 1 0
1 0 0

90° twice:
1 1 1
0 1 0
0 0 0
```


### Thought Process (as if you’re the interviewee)  
First, try to align mat with target by rotating mat 0, 90, 180, or 270 degrees. For each rotation, check if mat == target.  
To rotate a matrix 90 degrees clockwise, for each cell at (i, j), it moves to (j, n-1-i). We can rotate mat in-place or create a new rotated matrix at each step. As n is small (≤10), both options are fine.  
Check at each step if mat equals target; if any rotation matches, return True. If after 4 (all) rotations none match, return False.  
Optimized further, since the max size is small, brute-force is acceptable, and clarity is best.


### Corner cases to consider  
- n = 1 (single element matrix)
- mat is already equal to target (0 rotations)
- mat matches target after 180 or 270 degrees (need to check all 4 cases)
- All elements in mat are 0 or all are 1
- mat and target have different patterns impossible to match (never matches whatever the rotation)

### Solution

```python
def findRotation(mat, target):
    """
    Rotates mat 0, 90, 180, 270 degrees and checks if any rotation equals target.
    Assumes mat and target are n x n matrices with integer elements.
    """
    n = len(mat)
    def rotate(matrix):
        # Rotates a matrix 90° clockwise.
        rotated = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(n):
                rotated[j][n - 1 - i] = matrix[i][j]
        return rotated

    for _ in range(4):
        if mat == target:
            return True
        mat = rotate(mat)
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) for each rotation (since we scan all n×n cells to rotate and compare), and at most 4 rotations: total O(n²).
- **Space Complexity:** O(n²) for making a new matrix during each rotation (if not in-place).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrices are very large (e.g., n = 10⁵)?  
  *Hint: How would you handle in-place rotation or memory constraints?*

- Could you optimize the comparison step, or reduce unnecessary rotations?  
  *Hint: Early returns if partial mismatch, or compare row/column hashes.*

- What if you could only rotate in multiples of 180 degrees?  
  *Hint: Is the code general enough? What changes are needed?*

### Summary
This problem uses the simulation/coding pattern of *matrix rotation*, repeated up to 4 times with row/column remapping. The brute-force method is efficient enough given n small. The approach also applies to problems in image processing, puzzle games, and manipulating square grids.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
- Rotate Image(rotate-image) (Medium)