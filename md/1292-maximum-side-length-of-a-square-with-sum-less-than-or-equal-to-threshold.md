### Leetcode 1292 (Medium): Maximum Side Length of a Square with Sum Less than or Equal to Threshold [Practice](https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold)

### Description  
Given a `m x n` matrix of non-negative integers, and an integer **threshold**, find the maximum side length of a square submatrix such that the sum of all elements in that square is less than or equal to **threshold**. Return the largest possible side length.

### Examples  
**Example 1:**  
Input: `mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]]`, `threshold = 4`  
Output: `2`  
*Explanation: The square [[1,1],[1,1]] has sum = 4 and size 2. Any larger square exceeds threshold.*

**Example 2:**  
Input: `mat = [[2,2,2,2],[2,2,2,2],[2,2,2,2]]`, `threshold = 1`  
Output: `0`  
*Explanation: All elements are larger than threshold, no valid square exists.*

**Example 3:**  
Input: `mat = [[1,1,1,1],[1,0,0,0],[1,0,0,0]]`, `threshold = 6`  
Output: `3`  
*Explanation: The 3×3 square top-left has sum 5, which is ≤ 6.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to try every square submatrix in the matrix, compute its sum, and check if it's ≤ threshold. This is too slow for large mat.

To speed up row/col submatrix sum computation, use the **prefix sum matrix** (also known as cumulative sum or integral image). With this, sum of any region can be computed in O(1) time.

Then, use **binary search** on possible side lengths. For each side length, scan the matrix to check if any such square's sum ≤ threshold. Binary search is ideal since the relation is monotonic (if a square length works, all shorter squares work too).

- Precompute prefix sum matrix
- Binary search side length from 0 up to min(m, n)
- For each mid (side length), traverse all possible (top, left) positions and use prefix sums to quickly compute sum of square
- If any works, try larger; else, try smaller

### Corner cases to consider  
- Empty matrix
- threshold is 0
- All numbers are large (no valid square)
- Entire matrix fits within threshold
- Matrix size dimensions 1xN or Mx1

### Solution

```python
def maxSideLength(mat, threshold):
    m, n = len(mat), len(mat[0])
    # Compute prefix sum matrix
    prefix = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m):
        for j in range(n):
            prefix[i + 1][j + 1] = mat[i][j] + prefix[i + 1][j] + prefix[i][j + 1] - prefix[i][j]
    def possible(k):
        for i in range(m - k + 1):
            for j in range(n - k + 1):
                total = prefix[i + k][j + k] - prefix[i + k][j] - prefix[i][j + k] + prefix[i][j]
                if total <= threshold:
                    return True
        return False
    left, right = 0, min(m, n)
    while left < right:
        mid = (left + right + 1) // 2
        if possible(mid):
            left = mid
        else:
            right = mid - 1
    return left
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n × log(min(m, n))). Each binary search checks up to O(mn) squares per candidate length. Prefix sums are O(mn).
- **Space Complexity:** O(m × n) for the prefix sum matrix.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you return the top-left coordinates of such a square as well?  
  *Hint: Store the first valid position you find in the 'possible' helper function.*

- How to handle updates to mat, if elements may change between queries?  
  *Hint: Prefix sums can't be used directly without recomputation; consider using a Binary Indexed Tree or Segment Tree.*

- What if instead of sum, you must find the largest square whose **maximum element** is ≤ threshold?  
  *Hint: Consider using a sliding window maximum/minimum structure.*

### Summary
This problem is a classic use of **prefix sums/integral image**, **binary search on answer**, and region sum queries. Recognizing the monotonic property allows binary search, while prefix sums are a common and reusable pattern for efficient submatrix sum computations.


### Flashcard
Use binary search on possible square side lengths and prefix sums to efficiently check if any square's sum is ≤ threshold.

### Tags
Array(#array), Binary Search(#binary-search), Matrix(#matrix), Prefix Sum(#prefix-sum)

### Similar Problems
