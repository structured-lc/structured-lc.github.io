### Leetcode 363 (Hard): Max Sum of Rectangle No Larger Than K [Practice](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k)

### Description  
Given a 2D matrix of integers and an integer **k**, find the maximum sum of any rectangular (contiguous) submatrix such that the sum does **not exceed k**. The matrix can contain both positive and negative numbers. Rectangles are formed by picking any top and bottom row, as well as a left and right column, and including all cells inside that box.

### Examples  

**Example 1:**  
Input: `matrix=[[1,0,1],[0,-2,3]], k=2`  
Output: `2`  
*Explanation: The subrectangle `[[0,1],[-2,3]]` (rows 1-2, columns 2-3) sums to 2, which is the largest sum ≤ 2.*

**Example 2:**  
Input: `matrix=[[2,2,-1]], k=3`  
Output: `3`  
*Explanation: The rectangle is the entire row. Sum is 2+2+(-1)=3, and that's the largest sum ≤ 3.*

**Example 3:**  
Input: `matrix=[[5,-4,-3,4],[ -3,-4,4,5 ],[ 5,1,5,-4 ]], k=10`  
Output: `10`  
*Explanation: The rectangle covering rows 1-1, columns 1-4: 5+(-4)+(-3)+4 = 2. But better: rows 2-3 and columns 3-4 sum to 4+5+5+(-4)=10.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try every possible rectangle (all combinations of top, bottom, left, right), compute the sum, and keep the largest sum ≤ k. Time complexity: O(m² × n²) which is too slow for m, n up to 100.

- **Optimization:**  
  Fix two rows (top and bottom), reduce the problem to a **1D version**: for each column, compute the sum between these two rows, resulting in an array. Now, the task becomes finding the max sum of a subarray ≤ k in this 1D array.  
  For the 1D version:  
  - Use prefix sums and a sorted list to keep track of all prior prefix sums. For each new sum, look for the *smallest* prefix so that (current_sum - prefix) ≤ k (i.e., prefix ≥ current_sum - k). Use binary search to find the best candidate quickly.

- **Trade-offs:**  
  For each row pair (O(m²)), for each column (O(n)), for each prefix sum, use a sorted list + binary search (O(log n)). Total is O(m² × n × log n), which is manageable for these constraints.

- If m >> n (much more rows than columns), fix columns and iterate over row pairs, optimizing for smaller "dimension".

### Corner cases to consider  
- Single-element matrices (test negative/positive/0 vs. k)
- k negative
- All negative numbers
- All rectangle sums greater than k (problem guarantees at least one qualifying rectangle)
- Large matrices
- One row or one column matrices
- Sum exactly equals k

### Solution

```python
# Helper: find the max subarray sum no larger than k
def max_sum_subarray(nums, k):
    import bisect
    prefix_sums = [0]
    curr_sum = 0
    max_sum = float('-inf')
    for num in nums:
        curr_sum += num
        # Find leftmost prefix_sum >= curr_sum - k
        idx = bisect.bisect_left(prefix_sums, curr_sum - k)
        if idx < len(prefix_sums):
            max_sum = max(max_sum, curr_sum - prefix_sums[idx])
        bisect.insort(prefix_sums, curr_sum)
    return max_sum

def maxSumSubmatrix(matrix, k):
    m, n = len(matrix), len(matrix[0])
    max_res = float('-inf')
    for top in range(m):
        # temp array to store sum of elements for each column
        col_sums = [0] * n
        for bottom in range(top, m):
            for col in range(n):
                col_sums[col] += matrix[bottom][col]
            # For current top and bottom, maximize sum ≤ k
            curr_max = max_sum_subarray(col_sums, k)
            if curr_max == k:
                return k
            max_res = max(max_res, curr_max)
    return max_res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m² × n × log n)  
  For each pair of rows (O(m²)), compute column sums (O(n)), and each max subarray sum is found in O(n × log n) due to prefix sum and binary search.
- **Space Complexity:** O(n).  
  Uses an array for column sums and a sorted list of up to n prefix sums.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of rows is much larger than the number of columns?  
  *Hint: Iterate over columns instead and compress over rows.*

- Can you do better if k is very large or very small?  
  *Hint: Try to simplify early exit or use hash instead of sort if possible for special cases.*

- Can this be adapted for an online version, where the matrix can change?  
  *Hint: Persistent prefix sum structures or segment tree.*

### Summary
This approach uses the "reduce 2D to 1D subarray" pattern: fix two boundaries, compress sums along the other axis, and then solve a 1D max subarray with constraints for each fixed slab. The sorted-prefix-sum + binary search trick for "max subarray sum ≤ k" is commonly used in advanced subarray sum problems and 2D interval sums. This pattern can be applied whenever you need constrained submatrix sums or to handle interval constraints after dimension reduction.


### Flashcard
For each pair of rows, reduce to a 1D array and use a TreeSet (or prefix sums + binary search) to find the max subarray sum ≤ k.

### Tags
Array(#array), Binary Search(#binary-search), Matrix(#matrix), Prefix Sum(#prefix-sum), Ordered Set(#ordered-set)

### Similar Problems
