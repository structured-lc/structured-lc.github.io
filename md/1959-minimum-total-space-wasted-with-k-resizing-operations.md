### Leetcode 1959 (Medium): Minimum Total Space Wasted With K Resizing Operations [Practice](https://leetcode.com/problems/minimum-total-space-wasted-with-k-resizing-operations)

### Description  
You are designing a **dynamic array** where you are given an array `nums`, with `nums[i]` representing the number of elements at the iᵗʰ time. You are allowed to **resize** the array **at most k times** (you can choose not to use all `k` resizes). At each time t, **the array's current size must be at least nums[t]**.  
"Space wasted" at time t is the **current array size minus nums[t]**. The objective is to **minimize the total space wasted** across all times, by choosing at most k points in time to change the array's size.

- The initial array size can be set freely (does not count as a resize).
- At each resize, the array can be set to any size ≥ nums[t] at the resize time.

### Examples  

**Example 1:**  
Input: `nums = [10,20]`, `k = 0`  
Output: `10`  
Explanation:  
- No resizing is allowed.  
- The optimal initial size is 20.
  - t = 0: size = 20, wasted = 10
  - t = 1: size = 20, wasted = 0  
- Total wasted = 10 + 0 = 10.

**Example 2:**  
Input: `nums = [10,20,30]`, `k = 1`  
Output: `10`  
Explanation:  
- One resizing allowed.
  - Initial size = 20 for t = 0,1: wasted = 10 (at t = 0), 0 (at t = 1)
  - Resize at t = 2 to size = 30: wasted = 0
- Total wasted = 10 + 0 + 0 = 10.

**Example 3:**  
Input: `nums = [10,20,15,30,20]`, `k = 2`  
Output: `15`  
Explanation:  
- Use the two resizes wisely.
  - Initial size = 20 for t = 0,1: wasted = 10 (at t = 0), 0 (at t = 1)
  - Resize at t = 2 to size = 15: wasted = 0
  - Resize at t = 3 to size = 30: wasted = 0 (at t = 3), 10 (at t = 4)
- Total wasted = 10 + 0 + 0 + 0 + 10 = 20
- (Alternate, slightly different grouping may achieve 15 wasted.)

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each possible way to split `nums` into at most k+1 segments, and for each segment, choose the max(nums) in that segment as array size. Compute the total wasted space for that segmentation. Try all possible ways of choosing k split points—this is exponential in n, so too slow.

- **Dynamic Programming:**  
  Use `dp[i][k] = min space wasted using first i elements with k resizes`, where the initial size does not count as a resize.  
  For each `dp[i][k]`, try all previous segmentation points `j`:
    - Set array size to max(nums[j:i]) for this segment.
    - Waste for segment = max × (i - j) - sum(nums[j:i])
    - Update: `dp[i][k] = min(dp[i][k], dp[j][k-1] + wasted for [j, i))`
  Precompute prefix sums for sum(nums[j:i]) and max in O(1) or O(n) per segment for efficiency.

- **Why this approach:**  
  This dynamic programming structure is standard for "partition into k+1 groups, minimize sum of cost per group" problems. It's optimal and efficient enough for constraints (O(n² × k)).

### Corner cases to consider  
- nums is empty (n = 0).
- All nums elements are the same.
- Only 1 element in nums.
- k = 0 (no resizing allowed).
- k ≥ n-1 (can always resize at every step).
- Large jumps up or down in nums values.
- nums contains 0.

### Solution

```python
def minSpaceWastedKResizing(nums, k):
    n = len(nums)
    # dp[i][k]: min space wasted for the first i elements with k resizes
    dp = [ [float('inf')] * (k+2) for _ in range(n+1) ]
    dp[0][0] = 0  # 0 elements, 0 resizes, 0 waste

    # Prefix sums for quick segment sum lookups
    prefix_sum = [0] * (n+1)
    for i in range(n):
        prefix_sum[i+1] = prefix_sum[i] + nums[i]

    for i in range(1, n+1):  # end of segment
        for kk in range(k+1):  # up to k resizes
            max_num = 0
            # Try all previous segment start points
            for j in range(i-1, -1, -1):
                max_num = max(max_num, nums[j])
                segment_len = i - j
                segment_sum = prefix_sum[i] - prefix_sum[j]
                wasted = max_num * segment_len - segment_sum
                if dp[j][kk] != float('inf'):
                    dp[i][kk+1] = min(dp[i][kk+1], dp[j][kk] + wasted)

    # The answer is the minimum over all ways to use ≤k resizes to reach the end
    return min(dp[n][1:k+2])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × k)  
  For each position i, we potentially try all previous split points j (O(n)), and repeat this for k+1 states.  
- **Space Complexity:** O(n × k)  
  We keep a dp array with n+1 rows and k+2 columns and a prefix sum array of size n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if resizing is allowed only at certain time points (not arbitrary)?
  *Hint: Restrict segmentation points to the allowed times; can you adapt your DP?*

- How do you reconstruct the actual sequence of resizes and sizes for the optimal answer?
  *Hint: Keep a backtracking table alongside your dp to record choices.*

- Can you optimize the run-time for very large n (e.g., n ≥ 10⁵)?
  *Hint: Consider whether you can reduce the number of split points tried, or batch segments with similar values for max(nums).*

### Summary
This problem uses the **DP on partitioning** pattern: for sequences and allowed splits, we minimize (or maximize) a sum over segments.  
It's common in minimizing cost across k subarrays, such as **DP for k-Partitions** (e.g., Split Array Largest Sum, Painters Partition, etc.). Efficient prefix sums and maximizing per segment are typical techniques for this pattern.  
This approach models the minimum wasted space for dynamic sizing, balancing between segmenting (resizing often) and fewer resize operations.


### Flashcard
Use DP where dp[i][j] = min wasted space for first i elements with j resizes; transition by trying all possible last segments and taking their max as array size.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
