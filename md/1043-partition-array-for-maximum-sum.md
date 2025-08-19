### Leetcode 1043 (Medium): Partition Array for Maximum Sum [Practice](https://leetcode.com/problems/partition-array-for-maximum-sum)

### Description  
Given an integer array **arr** and an integer **k**, partition the array into contiguous subarrays, each of length at most **k**. For each subarray, replace every element by the maximum of that subarray, and sum the final array. Return the maximum possible sum.  
Your choice of partitions should maximize the total sum after replacement, so sometimes you may want to make fewer or longer partitions if that increases the maximums being repeated.

### Examples  

**Example 1:**  
Input: `arr = [1,15,7,9,2,5,10], k = 3`  
Output: `84`  
*Explanation: One optimal partition is [1,15,7], , [2,5,10].  
Replace each by their max → [15,15,15], , [10,10,10]. Sum = 15+15+15+9+10+10+10 = 84*

**Example 2:**  
Input: `arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4`  
Output: `83`  
*Explanation: One optimal partition is [1,4,1,5], [7,3,6,1], [9,9,3].  
Replace by their max → [5,5,5,5], [7,7,7,7], [9,9,9]. Sum = 5×4 + 7×4 + 9×3 = 20+28+27=75*

**Example 3:**  
Input: `arr = [1], k = 1`  
Output: `1`  
*Explanation: Only one element; nothing to partition or replace. Sum is 1.*

### Thought Process (as if you’re the interviewee)  
Start by thinking **brute-force**:  
- At each position, try all partition sizes from 1 to **k** (as long as it doesn’t go past array end).
- For each partition ending at index *i* with length *l*, compute the max in that group, and recursively compute the answer for previous elements.
- This would be very slow: O(2ⁿ) time, since each split recurses on previous options.

Now, let’s consider **dynamic programming**:  
- Let **dp[i]** = max sum we can achieve for the subarray arr[0:i] (i.e., arr up to (not including) index i).
- For each position, **look back** at all possible partition sizes ending at i–1:  
    For l from 1 to k:  
      - Compute max in last l elements (`arr[i-l] to arr[i-1]`)
      - Contribution = dp[i-l] + max × l
      - Take the best over all valid l.
- Bottom-up or memoized recursion both work.
- **Why is DP optimal:** At any split, the only thing that matters for future is the sum up to that point, and the remaining suffix can be solved optimally.

This is a classic **partition-DP** pattern: breaking at every possible previous index.

**Trade-offs:**  
- Brute-force is impractical for length > 20.
- DP is efficient: O(n × k) time, O(n) space, suitable for high constraints.

### Corner cases to consider  
- Empty input array (arr = []).
- k = 1 (no partitioning possible, must keep every single as a partition).
- k ≥ len(arr) (whole array can be a single partition).
- All equal elements.
- Array length much less than k.
- Large values, check for integer overflow (guaranteed not to exceed 32-bit).

### Solution

```python
def maxSumAfterPartitioning(arr, k):
    n = len(arr)
    # dp[i] = max sum for arr[0:i]
    dp = [0] * (n + 1)  # dp[0] = 0 (empty array)
    
    for i in range(1, n + 1):
        cur_max = 0
        # Try every partition ending at position i-1 of sizes 1..k
        for l in range(1, min(k, i) + 1):
            cur_max = max(cur_max, arr[i - l])
            # dp[i-l] is best sum for arr[:i-l], add cur_max * l for this partition
            dp[i] = max(dp[i], dp[i - l] + cur_max * l)
    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k)  
    For each of n positions, check up to k possible partitions.
- **Space Complexity:** O(n)  
    dp array of size n+1

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the actual partitions, not just the score?  
  *Hint: Track partition points during DP, reconstruct path backwards.*

- How to handle extremely large arrays, where n and k are both big?  
  *Hint: Is it possible to optimize further, perhaps using optimizations to avoid recomputing max for each lookback window?*

- Suppose each partition has a cost or reward based on size. How would you adapt the DP?  
  *Hint: Add/subtract the partition-specific cost/bonus in your DP formula.*

### Summary
This is a **DP on partitions** problem—similar to problems like word break, palindrome partitioning, etc., which involve breaking an array/string optimally.  
The trick is to define dp[i] as the maximum sum for the prefix of length i, and for each position, try all possible partition sizes ending there, keeping space and time efficient. This approach applies to many “partition at any spot” optimization questions.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Subsequence of Size K With the Largest Even Sum(subsequence-of-size-k-with-the-largest-even-sum) (Medium)
- Partition String Into Minimum Beautiful Substrings(partition-string-into-minimum-beautiful-substrings) (Medium)
- Minimum Substring Partition of Equal Character Frequency(minimum-substring-partition-of-equal-character-frequency) (Medium)