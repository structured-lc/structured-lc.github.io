### Leetcode 3567 (Medium): Minimum Absolute Difference in Sliding Submatrix [Practice](https://leetcode.com/problems/minimum-absolute-difference-in-sliding-submatrix)

### Description  
Given an m×n integer matrix **grid** and an integer **k**, for every continuous k×k submatrix of **grid**, compute the **minimum absolute difference** between any two distinct values in that submatrix. Return a 2D array **answer** of size (m-k+1)×(n-k+1), where **answer[i][j]** holds this minimum for the submatrix with top-left at (i, j). If all values in the submatrix are equal, its minimum absolute difference is 0.

### Examples  

**Example 1:**  
Input: `grid = [[1,8],[3,-2]], k = 2`  
Output: `[[2]]`  
*Explanation: Only one 2×2 submatrix:  
```
1 8
3 -2
```
Unique values: 1, 3, 8, -2.  
Sort: [-2, 1, 3, 8].  
Min difference: 1 - -2 = 3, 3 - 1 = 2, 8 - 3 = 5 → **min = 2** (|1-3|).*

**Example 2:**  
Input: `grid = [[3,-1]], k = 1`  
Output: `[[0,0]]`  
*Explanation: Each 1×1 submatrix only has one element; minimum difference is 0.*

**Example 3:**  
Input: `grid = [[5,5],[5,5]], k = 2`  
Output: `[]`  
*Explanation: Only one 2×2 submatrix. All values are 5, so minimum difference is 0.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach is to iterate over all possible k×k submatrices, collect their elements, and for each, compute all possible pairs’ differences.  
This has high time complexity: for each submatrix (O(mn)), we need to scan k×k elements and check all pairs (O(k²)).  
To optimize, since we're seeking the minimum difference among distinct values:
- Gather all elements of the submatrix, sort them (O(k² log k)), then scan sorted list for the smallest difference between adjacent unique numbers.
- For each window, repeat this step.  
This removes the need to check all O(k⁴) pairs, reducing it to O(k² log k) per window.

Trade-off:  
- This approach is often efficient, as k is usually small (for large k, this will be slow).

### Corner cases to consider  
- All numbers in submatrix are identical (output 0).
- k = 1 (every submatrix is a single element, so answer is always 0).
- Negative numbers, repeated numbers, large spanning grids.
- Grids smaller than k×k (should not happen as per constraints).
- Multiple minimum differences (should always output the smallest).

### Solution

```python
def min_abs_diff_in_sliding_submatrix(grid, k):
    m = len(grid)
    n = len(grid[0])
    ans = [[0 for _ in range(n - k + 1)] for _ in range(m - k + 1)]
    
    for i in range(m - k + 1):
        for j in range(n - k + 1):
            # Collect all elements for the current k×k submatrix
            vals = []
            for r in range(i, i + k):
                for c in range(j, j + k):
                    vals.append(grid[r][c])
            # Sort the values
            vals.sort()
            # Find minimum absolute difference between adjacent distinct elements
            min_diff = float('inf')
            for idx in range(1, len(vals)):
                # Only consider pairs with different values
                if vals[idx] != vals[idx - 1]:
                    min_diff = min(min_diff, abs(vals[idx] - vals[idx - 1]))
            # If all values are equal, set 0; otherwise set min_diff
            ans[i][j] = 0 if min_diff == float('inf') else min_diff
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((m-k+1) × (n-k+1) × (k² log k)).  
  For each possible submatrix (there are (m-k+1) × (n-k+1)), gathering k² elements, sorting them (k² log k), scanning through them once (k²).
- **Space Complexity:** O(k²) temporary storage for each submatrix’s values.  
  The result array is size (m-k+1) × (n-k+1).

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize this if k is very large or the grid is huge?
  *Hint: Think about sliding window techniques, data structures like balanced BST/multiset within sliding 2D window.*

- How would you handle range queries for minimum difference dynamically (not just sliding windows)?
  *Hint: Consider using segment trees or binary search over possible differences and frequency counters.*

- How to modify the solution if allowed to preprocess and answer many queries for different k?
  *Hint: Think in terms of rolling hash or precomputing statistics (prefix counts) for quick submatrix access.*

### Summary
This solution uses the **2D sliding window** and **sorting** with single pass for adjacent differences, a common technique for submatrix query problems where a direct rolling update is hard and k is not too big. The approach is similar for any minimum difference/sliding window problem for small k, but for larger windows or dynamic queries, more advanced data structures may be needed. This pattern is widely seen in grid sliding window and minimum/maximum submatrix queries.


### Flashcard
For each k×k submatrix, collect and sort its elements; scan the sorted list to find the minimum difference between consecutive distinct values.

### Tags
Array(#array), Sorting(#sorting), Matrix(#matrix)

### Similar Problems
