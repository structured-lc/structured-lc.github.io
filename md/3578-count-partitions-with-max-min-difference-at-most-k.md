### Leetcode 3578 (Medium): Count Partitions With Max-Min Difference at Most K [Practice](https://leetcode.com/problems/count-partitions-with-max-min-difference-at-most-k)

### Description  
You are given an integer array **nums** and an integer **k**.  
Partition **nums** into one or more non-empty contiguous segments, such that for each segment, the difference between the **maximum** and **minimum** values is **at most k**.  
Return the total number of ways to partition the array, modulo 10⁹+7.

Each partition is made by placing zero or more "cuts" between elements, so that each segment (between cuts) is valid.

### Examples  

**Example 1:**  
Input: `nums = [9,4,1,3,7]`, `k = 4`  
Output: `6`  
*Explanation: There are 6 valid partitions:*
- `[, [4], [1], [3], ]`
- `[, [4], [1], [3, 7]]`
- `[, [4], [1, 3], ]`
- `[, [4, 1], [3], ]`
- `[, [4, 1], [3, 7]]`
- `[, [4, 1, 3], ]`

**Example 2:**  
Input: `nums = [3,3,4]`, `k = 0`  
Output: `2`  
*Explanation: Only these partitions are valid:*
- `[[3], [3], [4]]`
- `[[3, 3], [4]]`

**Example 3:**  
Input: `nums = [1,1,1]`, `k = 0`  
Output: `4`  
*Explanation: The valid partitions are:*
- `[[1], [1], [1]]`
- `[[1,1], [1]]`
- `[[1], [1,1]]`
- `[[1,1,1]]`

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible ways to cut the array into segments, check if each segment is valid — but this is exponential, since for n elements, there are 2ⁿ⁻¹ ways to partition (by putting a cut or not at each possible spot). With n up to 5×10⁴, this is not feasible.

- **Recursive DP (top-down):**  
  Define dp[i] as the number of ways to partition the subarray nums[i:]. For each start i, try all possible ends j, and if nums[i..j] is valid (max - min ≤ k), recurse on j+1. But to find max/min for each segment naïvely takes O(n), which is too slow.

- **Efficient DP + Sliding Window / Monotonic Deque:**  
  Since we need to frequently find max/min in a sliding window, monotonic queues/deques let us dynamically maintain max/min in O(1) per step.  
  Let dp[i] = number of ways to partition prefix nums[0..i-1].  
  For every i, try ending segments at i-1 (as last element in the current segment).  
  For each segment nums[j:i], check if max-min ≤ k (using queues), then add dp[j] to dp[i].

- **Prefix Sum for DP:**  
  To efficiently sum dp[j] over valid candidates, maintain a prefix sum array.

- **Final Choice:**  
  Use a two-pointer (sliding window) approach where pointers `left` to `i-1` mark the valid starting points for segment ending at i-1. For each i, maintain window so that max-min ≤ k, and accumulate dp[left] to dp[i].

### Corner cases to consider  
- Empty array (by constraints: not possible, n ≥ 2).
- All elements the same (many possible partitions if k=0).
- k = 0 (segment valid only if no two different numbers).
- k very large (every partition allowed, all cuts valid).
- Array is strictly increasing or decreasing.
- Array with one element (by constraints: not possible).
- Maximum element values.

### Solution

```python
MOD = 10**9 + 7

def countPartitions(nums, k):
    n = len(nums)
    dp = [0] * (n + 1)
    dp[0] = 1  # empty prefix has 1 way

    from collections import deque

    # prefix sums for quick range add
    prefix = [0] * (n + 2)
    prefix[0] = 1

    # left: left pointer of window
    left = 0

    min_queue = deque()
    max_queue = deque()
    
    for right in range(1, n + 1):
        num = nums[right - 1]

        # maintain min_queue (increasing)
        while min_queue and nums[min_queue[-1]] >= num:
            min_queue.pop()
        min_queue.append(right - 1)

        # maintain max_queue (decreasing)
        while max_queue and nums[max_queue[-1]] <= num:
            max_queue.pop()
        max_queue.append(right - 1)

        # Move left pointer to make window valid
        while nums[max_queue[0]] - nums[min_queue[0]] > k:
            left += 1
            # pop from queues if out of window
            if min_queue[0] < left:
                min_queue.popleft()
            if max_queue[0] < left:
                max_queue.popleft()

        # dp[right] = sum of dp[left..right-1]
        # Use prefix sums
        dp[right] = (prefix[right - 1] - prefix[left - 1] + MOD) % MOD

        # update prefix sums
        prefix[right] = (prefix[right - 1] + dp[right]) % MOD

    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n). Each index is pushed & popped at most once from monotonic queues. Prefix sums, dp, and window movement are all O(n).

- **Space Complexity:**  
  O(n). For dp, prefix sum array, and monotonic queues. No recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if you had to count partitions into *exactly* m segments?
  *Hint: Add another DP dimension to track number of segments.*

- What if the segments could be non-contiguous?
  *Hint: This would drastically change the problem, making it combinatorial rather than sliding window.*

- If k is very small or very large, can your code be optimized further?
  *Hint: Analyze early outs: if k ≥ max(nums)-min(nums), all partitions are valid; if k == 0 and all elements unique, only one partition possible.*

### Summary
This problem uses the **DP with sliding window and monotonic deque** pattern for efficiently enumerating partition points where each window [left, right] can be validated for max-min in O(1) time. This technique is common for problems involving dynamic properties over subarrays—especially when combined with prefix sums, it enables optimal O(n) solutions for sliding intervals with expensive aggregations (max/min). This approach can be reused for many interval DP problems involving range-limited partitions.