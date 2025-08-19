### Leetcode 598 (Easy): Range Addition II [Practice](https://leetcode.com/problems/range-addition-ii)

### Description  
Given an *m* × *n* matrix initialized with all 0's, you are given a list of operations.  
Each operation is a pair [a, b] meaning: increment by 1 every element `matrix[i][j]` where 0 ≤ i < a and 0 ≤ j < b (i.e., the top-left a×b submatrix).  
After applying all operations, return the **number of elements in the matrix that contain the maximum integer value**.

### Examples  

**Example 1:**  
Input: `m = 3, n = 3, ops = [[2,2],[3,3]]`  
Output: `4`  
*Explanation: First operation [2,2] increments a 2×2 top-left block. Second operation [3,3] increments the whole matrix. After both, only the 2×2 top-left block is incremented twice, rest of the matrix once. Four elements contain the max value 2.*

**Example 2:**  
Input: `m = 3, n = 3, ops = []`  
Output: `9`  
*Explanation: No operations, so max value is 0 and all cells are max. All 9 elements in the matrix have value 0.*

**Example 3:**  
Input: `m = 4, n = 5, ops = [[3,3],[2,4]]`  
Output: `6`  
*Explanation: After applying [3,3] and [2,4], the region where all operations overlap is rows 0,1 and columns 0,1,2, i.e., a 2×3 block. So, 2×3 = 6 elements have the maximum.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach would be to actually construct the matrix, apply each operation, and then count the max values at the end. But with large m and n, this is not practical due to time and especially space limits.
- Let's analyze the pattern: each operation increases a submatrix, and all overlapping regions get incremented multiple times.
- The cells that receive the maximum increments are those that are included in **every operation**.  
- Thus, the area that is covered by every operation is the overlap (i.e., the smallest a and the smallest b from all operations): only those cells are part of every increment.
- So, after all operations, max value will be the number of operations, and the count of max value cells will be `min_a × min_b` where `min_a` and `min_b` are the minimum values of a and b from all operations.
- If no operations are given, every element remains at 0 (which is the max), so all cells count.

### Corner cases to consider  
- No operations (`ops` is empty): entire matrix is answer.
- Only one operation: affected area is exactly the count.
- Operations with a/b of different sizes; must find the overlap by min.
- m or n = 1 (row/column matrix).
- Some operations might cover entire matrix (a = m, b = n).

### Solution

```python
def maxCount(m, n, ops):
    # If no operations, entire matrix is max (all 0)
    if not ops:
        return m * n

    # Find the intersection area; smallest a, b from all operations
    min_a = m
    min_b = n

    for op in ops:
        min_a = min(min_a, op[0])
        min_b = min(min_b, op[1])

    # The region min_a × min_b will be incremented by every operation
    return min_a * min_b
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k) where k is number of operations (size of `ops`). We iterate through all operations only once.
- **Space Complexity:** O(1), just using a couple variables; no extra storage relative to m, n, or ops size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if operations can remove increments (e.g., negative operations)?
  *Hint: Negative increments are allowed; need a way to efficiently track min/max regions and counts.*

- Can you output the maximum element value itself efficiently?
  *Hint: It's just the number of operations applied, or count of overlapping operations for intersection.*

- How would you handle if ops is extremely large, i.e., streaming input?
  *Hint: Only need to update min_a and min_b as you parse ops, don't store them all.*

### Summary
This problem uses a classic "intersection of ranges" math pattern. By recognizing that only the area overlapped by **all** operations is incremented the most, we reduce the problem to simple min-finding across all ops, avoiding any need to simulate the full matrix. This pattern applies to similar range update/count problems, especially when only overlapping results matter.

### Tags
Array(#array), Math(#math)

### Similar Problems
- Range Addition(range-addition) (Medium)
- Sum of Matrix After Queries(sum-of-matrix-after-queries) (Medium)