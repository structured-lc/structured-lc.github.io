### Leetcode 2420 (Medium): Find All Good Indices [Practice](https://leetcode.com/problems/find-all-good-indices)

### Description  
Given an array `nums` of size n (0-indexed) and a positive integer `k`, an index i is called *good* if all the following hold:
- `k ≤ i < n - k` (so the index is not too close to either end),
- the k elements immediately **before** index i (i.e., `nums[i-k]` to `nums[i-1]`) are in **non-increasing** order,
- the k elements immediately **after** index i (i.e., `nums[i+1]` to `nums[i+k]`) are in **non-decreasing** order.

Return a list of all good indices, sorted in increasing order.

### Examples  

**Example 1:**  
Input: `nums = [2,1,1,1,3,4,1]`, `k = 2`  
Output: `[2,3]`  
*Explanation:  
- At index 2: `nums[0:2] = [2,1]` (non-increasing), `nums[3:5] = [1,3]` (non-decreasing).  
- At index 3: `nums[1:3] = [1,1]` (non-increasing), `nums[4:6] = [3,4]` (non-decreasing).*

**Example 2:**  
Input: `nums = [2,1,1,2]`, `k = 2`  
Output: `[]`  
*Explanation:  
No index i with 2 ≤ i < 2 (since n = 4, n - k = 2).*

**Example 3:**  
Input: `nums = [5,4,3,2,1,2,3,4,5]`, `k = 3`  
Output: `[4]`  
*Explanation:  
- At index 4: `nums[1:4] = [4,3,2]` (non-increasing), `nums[5:8] = [2,3,4]` (non-decreasing).*

### Thought Process (as if you’re the interviewee)  
First, I’d consider a brute-force approach: for every candidate index `i` (from k to n - k - 1), check manually if the k elements before i are non-increasing, and the k elements after i are non-decreasing. This would require checking up to k elements before and after for every i, leading to O(nk) time.

Since k and n can be large (up to 10⁵), a faster solution is needed.  
Noticing that *prefix* computations can help:  
- For each index i, we can precompute the length of the longest non-increasing sequence ending at i.  
- Similarly, for each index i, track the length of the longest non-decreasing sequence starting at i.  
This way, for every i, it's O(1) to check if the proper subarray (to the left and right) has the required property.

Optimizing further,  
- Use two arrays:  
  - `non_inc[i]`: the length of the current non-increasing streak ending at i
  - `non_dec[i]`: the length of the current non-decreasing streak starting at i
- To check if the k elements before i are non-increasing: non_inc[i-1] ≥ k  
- To check if the k elements after i are non-decreasing: non_dec[i+1] ≥ k

This is O(n) time, O(n) space.

### Corner cases to consider  
- Array length n == 3 (minimum possible for constraints)
- k == 1 (smallest k)
- All elements equal
- Strictly increasing / decreasing arrays
- No good indices (empty result)
- k × 2 ≥ n (so there are no valid indices)
- Large k (close to n/2; only one possible index to check)

### Solution

```python
def goodIndices(nums, k):
    n = len(nums)
    # non_inc[i] = length of non-increasing streak ending at i
    non_inc = [1] * n
    for i in range(1, n):
        if nums[i] <= nums[i-1]:
            non_inc[i] = non_inc[i-1] + 1
        # else, stays at 1

    # non_dec[i] = length of non-decreasing streak starting at i
    non_dec = [1] * n
    for i in range(n-2, -1, -1):
        if nums[i] <= nums[i+1]:
            non_dec[i] = non_dec[i+1] + 1
        # else, stays at 1

    res = []
    # i ranges from k to n-k-1 (inclusive)
    for i in range(k, n - k):
        # k elements before: ends at i-1, starts at i-k
        # so, non_inc[i-1] >= k means all between i-k and i-1 are non-increasing
        # k elements after: starts at i+1, covers to i+k
        # so, non_dec[i+1] >= k means all between i+1 and i+k are non-decreasing
        if non_inc[i-1] >= k and non_dec[i+1] >= k:
            res.append(i)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each element is processed a constant number of times in the for-loops.
- **Space Complexity:** O(n) extra space for two auxiliary arrays of size n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if you were to output the *count* of good indices, not their positions?  
  *Hint: You can return len(res) at the end!*

- What if you want to generalize to non-strictly monotonic streaks or strictly increasing/decreasing?  
  *Hint: Adjust the comparison in the non_inc / non_dec calculation.*

- Could you solve it *in-place* (constant extra space)?  
  *Hint: It’s possible to overwrite one of the arrays if only the final result is required.*

### Summary
This problem uses the *prefix/suffix streaks* pattern, precomputing for each position the length of the longest non-increasing and non-decreasing sequences. It converts what appears to be a sliding window monotonicity check into efficient O(n) derived information with auxiliary arrays—a common technique in array streak or range problems. This pattern is also applicable in problems like "Maximum Size Subarray with k Properties" and others leveraging streaks or windowed segment properties.