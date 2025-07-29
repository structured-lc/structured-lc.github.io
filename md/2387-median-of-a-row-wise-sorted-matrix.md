### Leetcode 2387 (Medium): Median of a Row Wise Sorted Matrix [Practice](https://leetcode.com/problems/median-of-a-row-wise-sorted-matrix)

### Description  
Given an m × n matrix where each row is sorted in non-decreasing order, and both m and n are odd, find the **median** of the matrix. The matrix contains an odd number of elements, and a brute-force solution (like collecting and sorting all values) is not allowed. You must achieve better than O(m × n) time complexity.

The median is defined as the middle value when all elements are sorted. For even-sized lists, the median is the left-middle element.

### Examples  

**Example 1:**  
Input: `grid = [[1,1,2],[2,3,3],[1,3,4]]`  
Output: `2`  
*Explanation: All elements sorted: 1,1,1,2,2,3,3,3,4. The 5ᵗʰ smallest (n=9, so median at index 4, 0-based) is 2.*

**Example 2:**  
Input: `grid = [[1,1,3,3,4]]`  
Output: `3`  
*Explanation: All elements: 1,1,3,3,4. Median (at index 2, 0-based) is 3.*

**Example 3:**  
Input: `grid = [[5]]`  
Output: `5`  
*Explanation: Only one element, so the median is 5.*

### Thought Process (as if you’re the interviewee)  
My first idea is to simply flatten the entire matrix into a list, sort it, and pick the middle value. But this would take O(m × n × log(mn)) time, which is too slow.

Since the matrix rows are sorted, but the whole matrix is not, I need a method that leverages that per-row order. The key is that for any value x, I can count quickly how many numbers in the matrix are ≤ x by doing a binary search in each row (since the rows are sorted).

So, I can do a **binary search on the possible answer** (the value of the median itself), searching the value range rather than index range. For each candidate median (mid), I count how many elements in the matrix are ≤ mid:

- If the count is less than or equal to half the total number of elements, then the median must be larger.
- Otherwise, search lower.

I continue this process until the lowest value that satisfies count > total//2 is found. This value is the median.

The main challenge is choosing correct search space and ensuring the count is efficient. Because values can be very large, my left/right bounds should be the minimum and maximum of the matrix.

### Corner cases to consider  
- 1 × 1 matrix.
- All elements are the same.
- Rows with duplicate values.
- Values at integer limits, or very large/small grid values (ensure binary search value space is correct).
- Some rows could have values repeated at the ends, e.g. [[1,2,3],[3,3,3],[3,3,3]].

### Solution

```python
def matrixMedian(grid):
    # Matrix dimensions
    m = len(grid)
    n = len(grid[0])
    total = m * n
    # Minimum and maximum element in the matrix to define search space
    lo = min(row[0] for row in grid)
    hi = max(row[-1] for row in grid)
    
    # Helper: For a given value x, count of numbers ≤ x in the matrix
    def count_le(x):
        count = 0
        for row in grid:
            # Binary search in each row
            l, r = 0, n
            while l < r:
                mid = (l + r) // 2
                if row[mid] <= x:
                    l = mid + 1
                else:
                    r = mid
            count += l
        return count

    # Binary search for the median value
    left, right = lo, hi
    while left < right:
        mid_val = (left + right) // 2
        c = count_le(mid_val)
        if c <= total // 2:
            left = mid_val + 1
        else:
            right = mid_val
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × log(max – min) × log n)
    - The outer binary search is over the value space between the matrix min and max, up to log₂(10⁶) ≈ 20 or so iterations.
    - For each candidate value, count_le runs binary search in each of m rows (each O(log n)).
    - Total: O(m × log(max – min) × log n)
- **Space Complexity:** O(1) extra, not counting the input; all work is done in-place without extra arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix is not guaranteed to have both m and n odd?  
  *Hint: How do we define the median for even-size lists?*

- How would you handle very large matrices that don't fit into memory?  
  *Hint: Can you process one row at a time? External storage?*

- Could you explain how the logic changes if only the columns (not rows) are sorted?  
  *Hint: How does row-wise binary search depend on row sorting?*


### Summary
This problem uses the **binary search on answer** pattern, where we leverage the sorted property (per row) to efficiently decide for a candidate value how many values are ≤ that candidate, by binary searching in each row. This lets us avoid needing to flatten and sort the whole matrix, keeping the solution efficient. The pattern is widely used in similar median or K-th smallest queries in matrices, and is seen in problems like "Kth Smallest Element in a Sorted Matrix".