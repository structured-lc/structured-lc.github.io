### Leetcode 3689 (Medium): Maximum Total Subarray Value I [Practice](https://leetcode.com/problems/maximum-total-subarray-value-i)

### Description  
Given an integer array `nums` and an integer `k`, you are to split the array into exactly `k` non-overlapping subarrays. For each subarray, calculate its sum, then take the sum of the maximum subarray values (i.e., the largest sum you can get by selecting exactly `k` non-overlapping subarrays from the array). The goal is to maximize this total value.

- Each subarray must have at least one number.
- Subarrays cannot overlap.
- Return the **maximum possible total value** you can get.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5], k = 2`  
Output: `14`  
Explanation: Select subarrays `[1,2,3,4]` (sum=10) and `[5]` (sum=4). 10 + 4 = 14.

**Example 2:**  
Input: `nums = [2,1,3], k = 1`  
Output: `6`  
Explanation: Only one subarray to select: `[2,1,3]` (sum=6).

**Example 3:**  
Input: `nums = [1,-2,3,4,-5,6], k = 2`  
Output: `13`  
Explanation: Select `[3,4]` (sum=7) and `[6]` (sum=6) for a total of 13.

### Thought Process (as if you’re the interviewee)  
Start with the brute-force approach: try every combination of k non-overlapping subarrays and sum their totals. This has exponential time complexity and is not feasible for large arrays.

The main observations:
- We need to select exactly `k` non-overlapping subarrays that maximize the total sum.
- This is similar to the "Maximum Sum of k Non-Overlapping Subarrays" dynamic programming problem.
- Let’s use DP: `dp[i][j]` = maximum sum using first `i` elements, selecting `j` subarrays.

Transition:
- For each position, either start a new subarray or not.
- Base: `dp=0`
- For each i, for each j, track max sum if starting new subarray at i or extending.

For each j (number of subarrays left), scan the array and for each i, find max subarray sum ending at i, then update dp.

Trade-offs:  
- Brute force is unacceptably slow.  
- DP is efficient: O(n² × k) time if properly optimized.  
- Further optimize by precomputing max subarrays using Kadane's algorithm.

### Corner cases to consider  
- Array with all negative numbers.
- `k` equals the array length (each element is its own subarray).
- `k = 1` (take the maximum sum subarray in the whole array).
- Only positive numbers (`sum(nums)`).
- Input with zeroes.

### Solution

```python
def maximum_subarray_value(nums, k):
    n = len(nums)
    # dp[i][j]: max total value using first i elements with j subarrays
    # 0-indexed: dp[0][0] = 0 (no elements, 0 subarrays)
    dp = [[float('-inf')] * (k + 1) for _ in range(n + 1)]
    dp[0][0] = 0

    for j in range(1, k + 1):
        for i in range(j, n + 1):
            # Try ending the last subarray at i-1 (subarray nums[t:i]),
            # t goes from j-1 (minimum size=1) to i-1.
            max_sub_sum = float('-inf')
            curr_sum = 0
            for t in range(i - 1, j - 2, -1):
                curr_sum += nums[t]
                if dp[t][j - 1] != float('-inf'):
                    max_sub_sum = max(max_sub_sum, dp[t][j - 1] + curr_sum)
            dp[i][j] = max_sub_sum

    return dp[n][k]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × k)
  - For each k, iterate n, and for each i, scan max n times for possible split points.
- **Space Complexity:** O(n × k)
  - DP table size is (n+1)×(k+1).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the size of the subarray must be at least some minimum length?
  *Hint: Adjust your DP so splits are only considered if minimum length is satisfied.*

- Can this be optimized to O(n × k) time?
  *Hint: Precompute prefix sums. Optimize with auxiliary max DP arrays, as in standard "maximum subarray sum with at most k splits".*

- What if you want to return the actual subarrays/indices themselves rather than just the total value?
  *Hint: Keep track of split points during DP.*

### Summary
This problem is a classic example of **DP with subarray partitioning**, closely related to "maximum sum of k non-overlapping subarrays". The approach uses a DP table where each entry tracks the best possible sum for the first i elements and selecting j subarrays. The pattern applies to other partition-based dynamic programming problems (e.g., k-partition maximum sum, painter's partition problem).

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
