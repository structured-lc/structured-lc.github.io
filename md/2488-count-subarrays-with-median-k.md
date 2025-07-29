### Leetcode 2488 (Hard): Count Subarrays With Median K [Practice](https://leetcode.com/problems/count-subarrays-with-median-k)

### Description  
Given an array nums with n distinct integers (a permutation of 1..n) and an integer k, count all non-empty subarrays whose **median is exactly k**.  
The median of a subarray is the element in the ⌊len/2⌋ position after sorting (left middle if even length).  
Example:  
- For [2, 3, 1, 4], after sorting it's [1, 2, 3, 4]. Median is 2 (since ⌊4/2⌋ = 2nd element, 0-based).

### Examples  

**Example 1:**  
Input: `nums = [3,2,1,4,5]`, `k = 4`  
Output: `3`  
*Explanation:*
- [4] → median 4
- [4,5] → sorted: [4,5], median is 4 (left middle)
- [1,4,5] → sorted: [1,4,5], median is 4

**Example 2:**  
Input: `nums = [2,3,1]`, `k = 3`  
Output: `1`  
*Explanation:*
- [3] → median 3

**Example 3:**  
Input: `nums = [1, 5, 4, 8, 6, 7, 2, 3]`, `k = 7`  
Output: `2`  
*Explanation*:  
-  → median 7  
- [6,7,2] → sorted: [2,6,7], median is 6 (not valid)  
- [8,6,7] → sorted: [6,7,8], median is 7  
So, , [8,6,7] are valid.

### Thought Process (as if you’re the interviewee)  
- **Naive / Brute-force:**
  - Check every subarray, sort, and compute its median.
  - For each subarray, check if median is k.
  - Time: O(n³) (total subarrays O(n²), each sort O(n)).
  - **Not feasible for n up to 1e5.**

- **Optimal Approach:**
  - **Observation:** Since nums is a permutation with all elements distinct, focus on subarrays containing k.
  - Fix subarrays that contain k at some position.
  - Track, for elements to the left and right of k, how many counts are greater or less than k.
  - **Balance approach:** 
    - Assign: +1 for num > k, -1 for num < k, 0 for num = k.
    - For each subarray containing k, count how the "balance" of (>k) and (<k) on both sides can center the k as the median.
  - Use prefix sums to count various possible balances on left/right and combine their frequencies for all valid subarrays.

- **Trade-offs:**  
  - The prefix-sum method allows us to count efficiently by reusing previously computed states; we avoid checking all subarrays.
  - Hash map usage is justified for fast frequency lookup of balances.

### Corner cases to consider  
- Array of length 1: only one subarray ([k])  
- k is at the start or end  
- No subarray with k as the median (e.g., k not present — but by constraints, k ∈ nums always)  
- Subarrays with only increasing or only decreasing elements  
- Large input size (up to 1e5), need O(n) algorithm

### Solution

```python
def countSubarrays(nums, k):
    # Find the position of k in nums
    k_idx = nums.index(k)
    n = len(nums)
    
    # Map to store 'balance' frequency on the left of k (including k itself)
    balance_count = {}
    balance = 0
    balance_count[0] = 1  # empty prefix with balance 0

    # Step 1: Scan left part (from k_idx-1 down to 0)
    for i in range(k_idx-1, -1, -1):
        if nums[i] < k:
            balance -= 1
        else:
            balance += 1
        balance_count[balance] = balance_count.get(balance, 0) + 1

    # Step 2: Scan right part (from k_idx to n-1)
    result = 0
    balance = 0
    # balance = 0 means equal number of >k and <k on right side
    for i in range(k_idx, n):
        if nums[i] < k:
            balance -= 1
        elif nums[i] > k:
            balance += 1
        # To have k as median, total balance (left + right) should be 0 or 1
        result += balance_count.get(-balance, 0)
        result += balance_count.get(1-balance, 0)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each pass (left and right) is a single traversal of nums.
  - Hash map operations are O(1) expected per operation.

- **Space Complexity:** O(n)  
  - Storing up to O(n) balance states in the hash map.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if nums may contain duplicates (not just a permutation)?
  *Hint: Think about how median definition and possible ties affect the balance logic. Consider sorted order and how counting "less than"/"greater than" pairs changes.*

- How to find the count if instead of exactly equal, we want all subarrays whose median is ≤ k?
  *Hint: Prefix sum can be adapted to count subarrays in which k is not necessarily the median but an upper or lower bound.*

- How to find all subarrays with a mean (average) equal to k?
  *Hint: Would prefix sums or balance tracking still work? What challenges are introduced with mean instead of median?*

### Summary
This problem uses the **prefix sum and hash map** pattern, especially with the idea of tracking balance of greater/lesser-than-median values to efficiently count subarrays with a given median.  
This approach is common for median/rank problems, and the prefix sum balancing trick appears in other hard subarray counting challenges (e.g., number of subarrays with sum K, number of subarrays with median/mean/mode constraints).  
It demonstrates the power of prefix/mapping state compression in O(n) solutions for counting problems over contiguous subarrays.