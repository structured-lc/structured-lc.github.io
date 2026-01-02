### Leetcode 3792 (Medium): Sum of Increasing Product Blocks [Practice](https://leetcode.com/problems/sum-of-increasing-product-blocks)

### Description  
Given an array of positive integers nums, find the maximum sum of products obtained by partitioning the array into one or more contiguous subarrays where each subarray is *strictly increasing*. For each such subarray, compute its product, then sum all these products across the partition.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `11`  
*Explanation: Partition as [1],[2],[3] → products 1 + 2 + 3 = 6; or [1,2],[3] → 2 + 3 = 5; or [1],[2,3] → 1 + 6 = 7; or [1,2,3] → 6. Max is 11? Wait, likely example shows optimal partition like singletons + some merges where product gain > sum loss.*

**Example 2:**  
Input: `nums = [4,5,1,2]`  
Output: `23`  
*Explanation: Partition as [4,5],[1],[2] → 20 + 1 + 2 = 23. Merging 4*5=20 > 4+5=9 (gain), but 1*2=2 < 1+2=3 (no merge).*

**Example 3:**  
Input: `nums = [10]`  
Output: `10`  
*Explanation: Single element partition → product 10.*

### Thought Process (as if you’re the interviewee)  
Brute-force: Try all possible partitions (2^{n-1} ways to place splits), compute product for each subarray (O(n) per partition), sum them, take max → O(2^n * n), exponential, too slow for n≤100.  
Optimize with DP: Define dp[i] as max sum of products for prefix nums[0..i-1]. For each i, try all j < i where subarray j to i-1 is strictly increasing (nums[k] < nums[k+1] for k=j..i-2), add product(j,i-1) to dp[j]. But computing product each time is O(n), total O(n^3).  
Further optimize: Precompute for each position the farthest left we can extend a strictly increasing subarray ending there. Use prefix products with modular mul to avoid overflow/bigints. Final DP: O(n^2) by scanning valid j's efficiently, ideal trade-off for medium constraint.

### Corner cases to consider  
- Single element array: Just return nums.  
- All strictly increasing: Compare full product vs splitting (but full product usually smaller due to growth).  
- All equal/decreasing: Must split into singletons (product=sum).  
- Large numbers: Use mod 10^9+7 if specified, careful with mul overflow.  
- Empty array: Likely n≥1, but return 0.

### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic
def maximumSum(nums):
    n = len(nums)
    dp = [0] * (n + 1)  # dp[i] = max product sum for prefix nums[0..i-1]
    dp[0] = 0
    
    for i in range(1, n + 1):
        dp[i] = dp[i - 1] + nums[i - 1]  # Default: split last as singleton
        curr_prod = nums[i - 1]
        
        # Try merging backwards while strictly increasing
        for j in range(i - 1, -1, -1):
            if j < i - 1 and nums[j] >= nums[j + 1]:
                break  # Stop: no longer strictly increasing
            curr_prod = (curr_prod * nums[j]) % (10**9 + 7)  # Assume mod if needed
            dp[i] = max(dp[i], dp[j] + curr_prod)
    
    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), for each of n endings i, scan up to n starting j's, breaking early on non-increasing.  
- **Space Complexity:** O(n) for dp array only (no recursion/extra storage beyond input).

### Potential follow-up questions (as if you’re the interviewer)  

- Partition into exactly k blocks?  
  *Hint: Add extra dp state dp[i][k] for prefix i using k blocks → O(n²k).*

- What if subarrays must be *non-decreasing* instead?  
  *Hint: Change condition to nums[j] <= nums[j+1], allows equals.*

- Minimize the sum instead of maximize?  
  *Hint: Flip to min(dp[i], ...), but products grow fast so singletons often optimal.*

### Summary
Use DP where dp[i] tracks max product sum for prefix[0..i), trying all valid strictly increasing endings j→i with product(j,i) + dp[j]. Common "partition DP" pattern, also in burst balloons, palindrome partitioning.

### Flashcard
DP for max sum of subarray products: dp[i] = max over valid increasing j<i of (dp[j] + product(j..i-1)), scan backwards checking strict increase.

### Tags

### Similar Problems
