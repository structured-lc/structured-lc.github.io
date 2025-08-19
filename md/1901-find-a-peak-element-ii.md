### Leetcode 1901 (Medium): Find a Peak Element II [Practice](https://leetcode.com/problems/find-a-peak-element-ii)

### Description  
Given an m × n matrix mat, a **peak element** is an element strictly greater than its adjacent neighbors (left, right, up, and down). Neighbors out of bounds are considered as -1. Find any one peak and return its coordinates [i, j]. No two adjacent cells have equal values. The algorithm must run in O(m log n) or O(n log m) time.

### Examples  

**Example 1:**  
Input: `mat = [[1,4],[3,2]]`  
Output: `[0,1]`  
*Explanation: 4 is a peak (greater than left 1, right N/A (-1), up N/A, down 2). 3 is also a peak, so [1,0] would also be a valid output.*

**Example 2:**  
Input: `mat = [[10,20,15],[21,30,14],[7,16,32]]`  
Output: `[1,1]`  
*Explanation: 30 at [1,1] is a peak (greater than 21, 14, 20, 16). 32 at [2,2] is also a peak, so [2,2] would also be correct.*

**Example 3:**  
Input: `mat = [[5]]`  
Output: `[0,0]`  
*Explanation: Only one element, so it is trivially a peak.*

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to check every cell and see if it’s greater than its neighbors, which takes O(m × n) time—not acceptable here.

To optimize, I notice the constraint on time—O(m log n) or O(n log m) suggests a binary search. Similar to the 1D peak problem, but for 2D:
- I can binary search on columns (or rows), find the global maximum in each column, and then check if that maximum is a peak.
- If it's not a peak, move the search region toward the direction of a larger neighbor, because a peak must exist there.
- Continue this process until a peak is found.

Since all adjacent elements are unique, comparing values is always decisive (no ties).

I'll implement the variant that binary searches over columns, since the two variants are symmetric.

### Corner cases to consider  
- 1×1 matrix (single element).
- All rows or all columns are increasing/decreasing sequences.
- Peaks at the edges or corners.
- Matrix of size 1×n or m×1 (rows or columns only).
- No two adjacent values are equal, so don’t need to handle ties.

### Solution

```python
def findPeakGrid(mat):
    m, n = len(mat), len(mat[0])
    left, right = 0, n - 1

    while left <= right:
        mid = (left + right) // 2
        
        # Find the row of the maximum element in mid column
        max_row = 0
        for i in range(1, m):
            if mat[i][mid] > mat[max_row][mid]:
                max_row = i
        
        mid_val = mat[max_row][mid]
        left_val = mat[max_row][mid - 1] if mid - 1 >= 0 else -1
        right_val = mat[max_row][mid + 1] if mid + 1 < n else -1
        
        # Check if it is a peak
        if mid_val > left_val and mid_val > right_val:
            return [max_row, mid]
        # If left neighbor is bigger, peak must be on left half
        elif left_val > mid_val:
            right = mid - 1
        # If right neighbor is bigger, peak must be on right half
        else:
            left = mid + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × log n)—for each of log n binary search steps across columns, scan m rows to find the column maximum.
- **Space Complexity:** O(1)—only extra variables used, no recursion or extra storage beyond loop indices.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if adjacent cells could have equal values?  
  *Hint: Consider how to break ties in neighbor comparisons.*

- What if the problem required returning all peak coordinates?  
  *Hint: You can’t use binary search for all peaks; may need a full scan.*

- Can you do the same for 3D grids?  
  *Hint: Generalize neighbors and adapt the binary search cut direction.*

### Summary
The binary search in 2D applies a divide-and-conquer principle by examining a middle column (or row), finding its maximum, and recursing toward larger neighbors. This is an example of **two-dimensional peak finding**—an extension of binary search and a core paradigm in "advanced matrix problems." It works efficiently due to the guarantee that no two adjacent cells are equal, and can be adapted to similar structure-searching problems in grids.

### Tags
Array(#array), Binary Search(#binary-search), Matrix(#matrix)

### Similar Problems
- Find Peak Element(find-peak-element) (Medium)
- Find the Peaks(find-the-peaks) (Easy)