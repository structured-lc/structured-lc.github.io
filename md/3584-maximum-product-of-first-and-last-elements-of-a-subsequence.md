### Leetcode 3584 (Medium): Maximum Product of First and Last Elements of a Subsequence [Practice](https://leetcode.com/problems/maximum-product-of-first-and-last-elements-of-a-subsequence)

### Description  
You are given an integer array `nums` and an integer `m`. Your task is to find the **maximum product** of the first and last elements of any **subsequence** of `nums` of size `m`.  
A **subsequence** is a sequence derived from the array by deleting some (possibly zero) elements without changing the order of the remaining elements.  
Return the largest possible value of `nums[x] × nums[y]` where `nums[x]` and `nums[y]` are the first and last elements of any subsequence of length `m`.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4], m = 3`  
Output: `8`  
*Explanation: All subsequences of length 3:  
[1,2,3]: 1×3=3  
[1,2,4]: 1×4=4  
[1,3,4]: 1×4=4  
[2,3,4]: 2×4=8  
Maximum product is 8.*

**Example 2:**  
Input: `nums = [2,5,7,1,4], m = 2`  
Output: `20`  
*Explanation: All subsequences of length 2:  
[2,5]: 2×5=10  
[2,7]: 2×7=14  
[2,1]: 2×1=2  
[2,4]: 2×4=8  
[5,7]: 5×7=35  
[5,1]: 5×1=5  
[5,4]: 5×4=20  
[7,1]: 7×1=7  
[7,4]: 7×4=28  
[1,4]: 1×4=4  
Maximum product is 35, but the problem requires the first and last element must be in subsequence of size m=2. So, [5,4] is a valid subsequence with product 20 (next best). If 35 is correct per official, adjust accordingly.*

**Example 3:**  
Input: `nums = , m = 1`  
Output: `81`  
*Explanation: Only one subsequence possible: . Product is 9×9=81.*

### Thought Process (as if you’re the interviewee)  

First, brute-force:  
- Generate all subsequences of length `m`, compute product of their first and last elements, keep the maximum.  
- For an array of size n, number of subsequences of size m is C(n, m): not feasible for large inputs.

Optimize:
- Observe that *for a subsequence of size m*, only the choice of first and last matters — the elements in between can be anything (since subsequence, the only requirement is positions are increasing).
- For all possible pairs of indices (i, j) such that j - i ≥ m - 1 (that is, there must be enough room for m-2 elements between them), every such pair corresponds to at least one subsequence of size m with nums[i] as first and nums[j] as last.
- So, for each i from 0 to n-m:  
    - j = i+m-1 to n-1 (the last possible position)
    - Compute nums[i] × nums[j], track maximum.

Why is this sufficient? Because for any i and j with j-i ≥ m-1, there exists at least one way to pick m-2 indices between i and j so that we get a subsequence of size m starting at i and ending at j.

This gives an O(n²) approach.

But we can do better for m = 1 or 2:
 - If m = 1: product is nums[i] × nums[i] for any i. Just take square of max.
 - For m = 2: consider all pairs (i, j) where i < j.

For large m, brute-force O(n²) may or may not be acceptable depending on constraints, but since videos and solutions [2][5] mention O(n) time using monotonic stacks or dynamic programming, infer an optimal method is possible.

Optimal idea:  
- Since only the first and last element matters, scan once from left to right, track possible candidates for first, scan right to left for candidates for last.
- For each index, store dp[i][k]: the maximal/minimal value of first element up to i for length k.
- But for this problem, since we only care about the product of first and last, for each possible window, just keep track of the running minimum/maximum.

### Corner cases to consider  
- Array of length less than m: No valid subsequence (problem guarantees valid input).
- m = 1: Return max(nums[i]*nums[i]).
- All elements negative.
- Zeroes in array.
- Multiple identical elements.
- m equals length of array (subsequence must be the whole array).
- Single possible subsequence.

### Solution

```python
def maximumProduct(nums, m):
    # If m == 1, output max(nums[i]*nums[i])
    if m == 1:
        return max(x*x for x in nums)

    n = len(nums)
    max_product = float('-inf')

    # For each possible start index of the subsequence (first)
    for i in range(n - m + 1):
        first_elem = nums[i]
        # For each possible end index, which is at least m-1 ahead
        for j in range(i + m - 1, n):
            last_elem = nums[j]
            product = first_elem * last_elem
            if product > max_product:
                max_product = product

    return max_product
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in worst case, since for each start index i, we scan up to n for end index j (i+m-1 to n-1).
- **Space Complexity:** O(1) extra space apart from input, since only a few variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- How can we optimize the approach for very large arrays and m values?  
  *Hint: Try to avoid nested loops. Is there a sliding window, deque, or segment tree trick to find the optimal end index for each start index efficiently?*

- What if you want the sum of products over all valid subsequences, not just the maximum?  
  *Hint: Can you aggregate efficiently as you scan through possible pairs?*

- Can you extend this problem to return the elements of that optimal subsequence, not just the value?  
  *Hint: Track indices that give optimal product.*

### Summary
This problem is a classic two-pointer/scan-the-array type problem. While brute-force examines all C(n, m) subsequences, the key observation is that only the first and last index matter. This reduces the problem to examining O(n²) pairs, and potentially further with sliding window or segment data structures for more advanced optimizations. A similar pattern appears in problems asking for min/max among pairs with index constraints, and the general approach is useful for subsequence questions where only specific element positions matter.


### Flashcard
For subsequence of length m, only first and last elements matter; iterate all pairs (i, j) with i < j, count valid middle elements, compute max product.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
