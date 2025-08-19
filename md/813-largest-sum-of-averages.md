### Leetcode 813 (Medium): Largest Sum of Averages [Practice](https://leetcode.com/problems/largest-sum-of-averages)

### Description  
Given an integer array **nums** and an integer **k**, you need to partition **nums** into at most **k** non-empty, contiguous subarrays. Every element must be used in exactly one subarray. The **score** of a partition is the sum of the averages of each subarray. Return the **maximum possible score** you can achieve.

- You can choose to use fewer than **k** partitions.
- Each subarray consists of consecutive elements.
- The score for a subarray is its average: total sum divided by the length.

### Examples  

**Example 1:**  
Input: `nums = [9,1,2,3,9]`, `k = 3`  
Output: `20.0`  
*Explanation: The best split is , [1,2,3], .  
Averages: 9.0, 2.0, 9.0.  
Total = 9.0 + 2.0 + 9.0 = 20.0.*

**Example 2:**  
Input: `nums = [1,2,3,4,5,6,7]`, `k = 4`  
Output: `20.5`  
*Explanation: An optimal partition is [1,2,3], [4,5], , .  
Averages: 2.0, 4.5, 6.0, 7.0.  
Total = 2.0 + 4.5 + 6.0 + 7.0 = 19.5  
But with [1,2,3,4,5], ,  you get:  
Average = 3.0, 6.0, 7.0 → Total = 16.0, which is less.  
Most partitions typically yield a higher score because the effect of averaging is lower.*

**Example 3:**  
Input: `nums = [5,5,5,5]`, `k = 2`  
Output: `10.0`  
*Explanation: Splitting into [5,5], [5,5].  
Averages: 5.0, 5.0.  
Total = 5.0 + 5.0 = 10.0.*

### Thought Process (as if you’re the interviewee)  

Start by defining the problem as maximizing the sum of averages over a certain number (≤ k) of contiguous subarrays:
- **Brute force:** Try all possible ways to split the array into ≤ k parts. For each possible split, calculate the score.
  - For each of the n-1 places between elements, we can either split or not. Up to k-1 places can have a split.
  - The number of splits grows combinatorially, so brute force will not work for large n.

**Optimization:**  
- Use **Dynamic Programming (DP):**
  - Let `dp[i][j]` be the largest sum of averages for the first `i` elements using `j` partitions.
  - For each combination, try all positions to partition the last group; take the max over all possible partitions.
  - Use prefix sums for O(1) average calculations.

- Alternatively, use **recursion with memoization**:
  - Start at position i with k partitions remaining: try every possible end of the current group, recursively compute for the rest; store results for each (i, k).

**Why DP?**
- Overlapping subproblems: Many partitions reuse the same subarrays.
- Optimal substructure: The optimal partition ending at j is the sum of optimal subproblems.

**Trade-offs:**  
- The space usage is O(n × k) for cache.
- The time is O(n² × k), as for each subarray and split, every possible partition point is considered.

### Corner cases to consider  
- `k` = 1: Must take one partition, the average of the whole array.
- `n` = 1: Just return the element.
- All elements are equal: Any partitioning results in same score.
- `k` ≥ n: Each element can be its own partition; sum is total of elements.
- Array length much larger than `k`: Use `k` partitions, but subarrays become longer.

### Solution

```python
def largestSumOfAverages(nums, k):
    n = len(nums)
    # Precompute prefix sums for O(1) averages
    prefix = [0.0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]
    
    from functools import lru_cache

    # Memoization: dp(i, k) = max score starting at i with k groups left
    @lru_cache(maxsize=None)
    def dp(i, k_left):
        if k_left == 1:
            # One group: take the average of the rest
            return (prefix[n] - prefix[i]) / (n - i)
        max_avg = 0
        # We need at least k_left elements remaining
        for j in range(i + 1, n - k_left + 2):
            avg = (prefix[j] - prefix[i]) / (j - i)
            score = avg + dp(j, k_left - 1)
            if score > max_avg:
                max_avg = score
        return max_avg

    return dp(0, k)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × k)  
  For each starting index (`i`), and partitions left (`k`), up to n possible partition points are tried.

- **Space Complexity:** O(n × k)  
  Due to memoization for each (i, k_left) pair. Prefix sum storage is O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we have to print the actual partitions themselves, not just the sum?  
  *Hint: Track choices at each dp state. Reconstruct path recursively.*

- How would the solution change if negative numbers were allowed?  
  *Hint: No changes necessary; averages can be negative, sum logic stays the same.*

- Can you optimize the space if k is very small or n is very large?  
  *Hint: Try to keep only two rows/arrays of DP, drop recursion for bottom-up.*

### Summary
This is a classic **DP on partitions** problem, where subproblems correspond to "what is the best sum of averages from position i with k groups left". The solution uses prefix sums and recursion with memoization for efficiency. This pattern applies to similar partitioning/maximization problems, for example: "Minimize the largest subarray sum", "Split array into k groups for min/max criteria", and more.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
