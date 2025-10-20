### Leetcode 498 (Medium): Diagonal Traverse [Practice](https://leetcode.com/problems/diagonal-traverse)

### Description  
Given an m×n matrix, traverse its elements in a diagonal order: start from the top-left element, then move up-right diagonally; when a matrix edge is hit, switch to the next diagonal in the opposite down-left direction. Alternate directions at each boundary, continuing this zigzag until all elements are output in a single list.

### Examples  

**Example 1:**  
Input: `mat = [[1,2,3],[4,5,6],[7,8,9]]`  
Output: `[1,2,4,7,5,3,6,8,9]`  
*Explanation: Traverse diagonally; after moving up-right hits edge, switch to down-left, and so on. The order: 1 → 2 → 4 → 7 → 5 → 3 → 6 → 8 → 9.*

**Example 2:**  
Input: `mat = [[2,5],[8,4],[0,-1]]`  
Output: `[2,5,8,0,4,-1]`  
*Explanation: Start at 2 (top-left), move up-right → 5, down-left → 8, up-right → 0, down-left → 4, up-right → -1.*

**Example 3:**  
Input: `mat = [[3]]`  
Output: `[3]`  
*Explanation: Single element, so output is just [3].*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Store all diagonals separately, using a hash map where keys are (row+col) sums. For each element at row r, col c, collect mat[r][c] in the correct diagonal bucket.
  - After bucketization, for each diagonal: if its index is even, reverse the order (since direction alternates); if odd, keep as is.
  - Collect all diagonals into a single output list.

- **Optimized single pass (O(m×n))**:  
  - Traverse diagonals as the sum of indices (row + col) from 0 up to (m + n - 2).
  - For each diagonal, determine its start coordinates: when the sum s = i + j is even, traverse upwards (decreasing row, increasing col); if s is odd, traverse downwards.
  - Avoid extra memory by collecting elements directly in the output array, managing the order as we go.
  - This approach is chosen for clear traversal logic and in-place diagonal ordering. Space is O(1) extra (besides output).

### Corner cases to consider  
- Empty matrix (`mat = []`, or `mat = [[]]`)
- Matrix with single row or column
- m ≠ n (rectangular matrix)
- Very large matrix
- Negative numbers, zeros, duplicate values
- Only one element

### Solution

```python
def findDiagonalOrder(mat):
    # Get dimensions
    if not mat or not mat[0]:
        return []
    m, n = len(mat), len(mat[0])
    result = []
    for diag in range(m + n - 1):
        intermediate = []
        # Determine the row/col we start from:
        # If diag < n --> first row, else last column
        row = 0 if diag < n else diag - n + 1
        col = diag if diag < n else n - 1
        
        # Collect the diagonal
        while row < m and col >= 0:
            intermediate.append(mat[row][col])
            row += 1
            col -= 1
        # Reverse order depending on diagonal parity
        if diag % 2 == 0:
            result.extend(intermediate[::-1])
        else:
            result.extend(intermediate)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), as each element is visited exactly once in the matrix.
- **Space Complexity:** O(1) extra space (not counting the output), since only temporary lists of at most min(m, n) per diagonal are made.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize your code for matrices stored in sparse format?  
  *Hint: Think about keys you would use for diagonals, and how traversals are affected if not all cells exist.*

- Could you diagonal traverse from bottom-left to top-right instead?  
  *Hint: Try reversing directions and adjusting row/col start points.*

- How would you return all diagonals as separate lists, not a flat list, with consistent order?  
  *Hint: Use buckets for diagonals and pay attention to output orientation per diagonal.*

### Summary
This problem uses the diagonal traversal pattern—frequent in matrix problems and sometimes in trees—where elements are grouped and traversed by index-sum. The approach is a variation on “group by diagonal” and “traverse with direction alternation.” This pattern appears in zigzag matrix traversal, and in some binary tree view/diagonal view problems. The in-place alternation is an efficient way to avoid extra post-processing.


### Flashcard
Traverse diagonals by sum of indices; reverse even-indexed diagonals, concatenate for final order.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Decode the Slanted Ciphertext(decode-the-slanted-ciphertext) (Medium)