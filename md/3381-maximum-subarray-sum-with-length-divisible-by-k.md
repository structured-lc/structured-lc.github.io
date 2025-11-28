### Leetcode 3381 (Medium): Maximum Subarray Sum With Length Divisible by K [Practice](https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k)

### Description  
Given an integer array **nums** and an integer **k**, return the **maximum sum** of a subarray of **nums** such that the length of the subarray is **divisible by k**.  
The subarray must be contiguous and may contain both positive and negative numbers. 

### Examples  

**Example 1:**  
Input: `nums = [1,2], k = 1`  
Output: `3`  
Explanation: Array length is 2, which is divisible by 1. The entire array `[1, 2]` has sum 3.

**Example 2:**  
Input: `nums = [-1, -2, -3, -4, -5], k = 4`  
Output: `-10`  
Explanation: The maximum sum subarray with length divisible by 4 is `[-1, -2, -3, -4]` with sum -10.

**Example 3:**  
Input: `nums = [-5,1,2,-3,4], k = 2`  
Output: `4`  
Explanation: The subarray `[1,2,-3,4]` has length 4 (divisible by 2) and sum 4, which is the maximum possible.

### Thought Process (as if you’re the interviewee)  
- Brute force approach: Try **all possible subarrays**, check if the length is divisible by k, and track the maximum sum.  
    - There are O(n²) possible subarrays, making this solution inefficient for large inputs.
- Optimization:  
    - **Prefix sum** can be used to quickly compute any subarray's sum.
    - The tricky part is ensuring the subarray's **length** is divisible by k.  
    - For each index, keep track of the **smallest** prefix sum seen so far for each possible mod class (from 0 to k-1). The difference in prefix sums between two indices of equal mod means their subarray has length divisible by k.
    - For every prefix sum `s` at index `i`, check: is there an earlier prefix sum (`f[mod]`) with the **same modulus class**? If so, `s - f[mod]` is the sum for some subarray whose length is divisible by k.
    - Update `f[mod]` to the **minimum** to maximize future subarray sums.

**This is a classical prefix sum + modulus pattern used for subarrays with specific length constraints.**

### Corner cases to consider  
- Array of length 1.
- All numbers are negative.
- All values are equal.
- k = 1 (all subarrays valid).
- k = n (only the whole array is valid).
- Array contains 0s.
- Subarray sum can be negative (so don't just look for positive sums).

### Solution

```python
def maximumSubarraySumWithLengthDivisibleByK(nums, k):
    # prefix_sum: running total of the nums (0 at start)
    s = 0
    # f[mod]: the minimal prefix_sum seen so far at positions with this mod
    f = [float('inf')] * k
    f[0] = 0  # prefix sum at index -1 (empty prefix)
    res = float('-inf')
    for idx, num in enumerate(nums):
        s += num
        mod = (idx + 1) % k  # idx + 1 because subarray is nums[l...idx]
        # f[mod]: minimal prefix sum up to index l - 1 with (l % k == mod)
        # So, if we end here, length is divisible by k i.e. (idx+1) - l is divisible by k
        for j in range(k):
            if f[j] != float('inf') and (idx + 1 - j) % k == 0:
                res = max(res, s - f[j])
        # Now update f[mod] with the minimal prefix seen so far for this mod class
        f[(idx + 1) % k] = min(f[(idx + 1) % k], s)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where n = len(nums). For each element, we check up to k residue classes. This can be optimized to O(n) with more clever tracking, but is often acceptable for the constraints.
- **Space Complexity:** O(k), for the prefix min array of length k.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case if k is much larger than n?  
  *Hint: Is there a way to avoid iterating over all k residue classes?*

- What do you do if you want the subarray with minimal sum instead?  
  *Hint: Think about maximizing negative values.*

- Could this pattern be extended to subarrays with other length constraints (e.g., length mod k equals c for c ≠ 0)?  
  *Hint: Generalize the prefix sum and mod technique.*

### Summary
This problem uses the **prefix sum + modulus/pigeonhole** pattern to efficiently compute max subarrays with a length constraint. Recognizing the correspondence between prefix sum indices and their mod k equivalence allows O(n) or O(n × k) solutions. The same technique generalizes to many problems involving subarray properties mod k.


### Flashcard
Use prefix sums with a map tracking minimum prefix sum for each remainder (i mod k); for each index, find best subarray of length divisible by k.

### Tags
Array(#array), Hash Table(#hash-table), Prefix Sum(#prefix-sum)

### Similar Problems
- Subarray Sums Divisible by K(subarray-sums-divisible-by-k) (Medium)