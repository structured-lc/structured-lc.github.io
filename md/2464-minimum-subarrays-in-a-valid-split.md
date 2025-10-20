### Leetcode 2464 (Medium): Minimum Subarrays in a Valid Split [Practice](https://leetcode.com/problems/minimum-subarrays-in-a-valid-split)

### Description  
Given an integer array, split it into the **minimum number of contiguous subarrays** so that, for each subarray, the **greatest common divisor (GCD)** of the first and last element is **greater than 1**.  
- Each array element must belong to **exactly one subarray** (the split is a partition).
- If there is no way to split the array to meet this condition, return `-1`.

### Examples  

**Example 1:**  
Input: `nums = [2,6,3,4,3]`  
Output: `2`  
*Explanation: Split as [2,6] | [3,4,3].  
GCD(2,6)=2 (>1), GCD(3,3)=3 (>1). Minimum splits: 2.*

**Example 2:**  
Input: `nums = [2,3,3,2,3]`  
Output: `2`  
*Explanation: One possible split is [2,3,3,2] | [3].  
GCD(2,2)=2 (>1), GCD(3,3)=3 (>1).*

**Example 3:**  
Input: `nums = [5,15,21,7,5]`  
Output: `-1`  
*Explanation: There is **no way to partition** this array such that all subarrays start and end with GCD>1. Any attempt will leave some subarray with GCD=1 at some point.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:** Try all possible partitions, check if each satisfies the GCD condition.  
  - This is exponential in time and infeasible for large arrays.  
- **Subproblem:** For each index, what is the minimal number of splits needed for nums from that position to the end? This is a classic **DP over prefix**.
- **Define DP:** Let dp[i] = minimum splits needed for nums[i:].
  - For each position i, try all positions j ≥ i such that GCD(nums[i], nums[j]) > 1, and everything in between can be part of the same subarray. Then set dp[i] = 1 + dp[j+1].
- **Optimization:** To quickly check splits, only need to know GCD(nums[i], nums[j]) > 1. Since array size is moderate, O(n²) solution is acceptable.
- **Base case:** If we have covered all elements (i == n), 0 splits needed. If no split is possible from i, return infinity.
- **Result:** If dp < inf, return dp; else, return -1.

### Corner cases to consider  
- An array where every GCD(first, last) == 1 (impossible).
- All identical numbers.
- Large primes (can't split).
- Only one element.
- Array with ones (GCD(1,x) always 1, so impossible).
- Valid split only at very end.

### Solution

```python
def validSubarraySplit(nums):
    n = len(nums)
    # dp[i]: min splits for nums[i:]
    dp = [float('inf')] * (n + 1)
    dp[n] = 0  # no elements left, no split needed

    # Pre-compute GCDs to avoid recalculation
    from math import gcd

    for i in range(n - 1, -1, -1):
        # Try to extend the subarray from i to j
        for j in range(i, n):
            if gcd(nums[i], nums[j]) > 1:
                # We found a valid subarray nums[i...j]
                if dp[j + 1] != float('inf'):
                    dp[i] = min(dp[i], 1 + dp[j + 1])

    return dp[0] if dp[0] != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) — For each position, we may scan every endpoint after it to test a possible valid subarray and compute the GCD. GCD is constant time for small numbers.
- **Space Complexity:** O(n) — for the dp array.

### Potential follow-up questions (as if you’re the interviewer)  

- If the array length is large (\(10^5\)), can you do better than O(n²)?  
  *Hint: Try to find jumps or intervals where splits are forced, pre-process factorization or use union-find.*

- If allowed to return the actual subarrays (not just count), how would you reconstruct the solution?  
  *Hint: Keep track of split points by backtracking during DP reconstruction.*

- What changes if the condition is GCD of *all* numbers in the subarray > 1, not just first and last?  
  *Hint: Sliding window and GCD accumulation, but split points now more dynamic.*

### Summary
This problem is a good example of **DP on intervals/positions** and using a greedy extension with a GCD condition. The coding pattern (dp[i] = min number of valid splits from i onward) is common in **array partitioning** and **min-cut segmentation** problems, seen in string segmentation or jump game variants. The problem also emphasizes classic GCD logic and thinking about contiguous subarrays efficiently.


### Flashcard
Use DP where dp[i] = min splits for nums[i:]; for each j ≥ i, if GCD(nums[i..j]) > 1, try splitting at j+1.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Number Theory(#number-theory)

### Similar Problems
- Minimum Split Into Subarrays With GCD Greater Than One(minimum-split-into-subarrays-with-gcd-greater-than-one) (Medium)