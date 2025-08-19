### Leetcode 1856 (Medium): Maximum Subarray Min-Product [Practice](https://leetcode.com/problems/maximum-subarray-min-product)

### Description  
Given an integer array **nums**, find the maximum "min-product" of any non-empty contiguous subarray.  
The "min-product" of a subarray is defined as:  
  Minimum value in the subarray × Sum of all elements in the subarray.  
Return the maximum min-product found, modulo 10⁹ + 7.  
You need to consider all possible contiguous subarrays and return the largest min-product.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 2]`  
Output: `14`  
*Explanation: The best subarray is [2, 3, 2]. Minimum is 2, sum is 7, so min-product = 2 × 7 = 14.*

**Example 2:**  
Input: `nums = [2, 3, 3, 1, 2]`  
Output: `18`  
*Explanation: The best subarray is [3, 3, 1, 2]. Minimum is 1, sum is 9, so min-product = 1 × 9 = 9.  
However, if you pick [3, 3], minimum is 3, sum is 6, min-product = 3 × 6 = 18.*

**Example 3:**  
Input: `nums = [3, 1, 5, 6, 4, 2]`  
Output: `60`  
*Explanation: The best subarray is [5, 6, 4, 2]. Minimum is 2, sum is 17, min-product = 2 × 17 = 34.  
However, [5, 6, 4] gives minimum 4, sum 15, min-product = 4 × 15 = 60, which is larger.*

### Thought Process (as if you’re the interviewee)  
Brute-force approach would iterate through all O(n²) possible subarrays, compute their minimum and sum each time. This results in O(n³) overall time, which is not efficient for large n.

For optimization:
- Notice that for each element, we might want to treat it as the minimum of some subarray, and find how far left and right we can extend while keeping it the minimum.
- For each nums[i], find the largest subarray `[left, right]` such that nums[i] is the minimum in that window.
- Compute prefix sums to get the sum of any subarray in constant time.
- To find left/right bounds quickly, use a *monotonic stack* (similar to "Largest Rectangle in Histogram" problem).
- The answer is the maximum over all nums[i] of `nums[i] × (sum of subarray where it is the min)`.

This is optimal due to:
- Each element is the "minimum" in some maximal window. We only need to consider those windows.
- The overall time complexity using this approach is O(n): O(n) for prefix sum + O(n) for two stack passes + O(n) for the final computation.

### Corner cases to consider  
- Array of length 1.
- All elements are equal.
- Elements in increasing (or decreasing) order.
- Large numbers (to check modulus).
- Subarray with only negative numbers (if allowed, otherwise per constraints).
- Test if number boundaries are handled (e.g., all 0's, or maximum possible number values).

### Solution

```python
def maxSumMinProduct(nums):
    MOD = 10**9 + 7
    n = len(nums)
    
    # Compute prefix sums for efficient range sum queries
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]
    
    # Left: for each index, the first index to the left (exclusive) less than nums[i]
    left = [0] * n
    stack = []
    for i in range(n):
        while stack and nums[stack[-1]] >= nums[i]:
            stack.pop()
        left[i] = stack[-1] if stack else -1
        stack.append(i)
    
    # Right: for each index, the first index to the right (exclusive) less than nums[i]
    right = [n] * n
    stack = []
    for i in range(n - 1, -1, -1):
        while stack and nums[stack[-1]] >= nums[i]:
            stack.pop()
        right[i] = stack[-1] if stack else n
        stack.append(i)
    
    # For each index, treat nums[i] as the minimum in its maximal subarray
    res = 0
    for i in range(n):
        total = prefix[right[i]] - prefix[left[i] + 1]
        res = max(res, nums[i] * total)
    
    return res % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - O(n) to build prefix sums.
  - O(n) for two monotonic stack passes for left and right.
  - O(n) for the final computation.
- **Space Complexity:** O(n)  
  - O(n) for prefix sum storage, O(n) for left/right arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the array were streaming and you couldn't store it all in memory?  
  *Hint: Consider using a sliding window, or processing chunks, though exact solution for arbitrary subarrays may not be possible without extra storage.*

- Can you do this for a circular array (subarrays wrap around from end to start)?  
  *Hint: Consider duplicating the array and handling mod n indexing, but handle overlapping carefully.*

- How would you extend this to 2D arrays, for rectangles in a matrix?  
  *Hint: Adapt histogram techniques, possibly iterating row-by-row and applying similar stack logic.*

### Summary
This problem uses the **monotonic stack** pattern, similar to "Largest Rectangle in Histogram". It efficiently identifies maximal windows for which each element is the minimum, using prefix sums for efficient subarray sum computation.  
This technique is broadly applicable to problems involving range queries with monotonicity, such as histogram largest area, subarray min/max queries, and variants.

### Tags
Array(#array), Stack(#stack), Monotonic Stack(#monotonic-stack), Prefix Sum(#prefix-sum)

### Similar Problems
- Subarray With Elements Greater Than Varying Threshold(subarray-with-elements-greater-than-varying-threshold) (Hard)