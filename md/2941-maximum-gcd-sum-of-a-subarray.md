### Leetcode 2941 (Hard): Maximum GCD-Sum of a Subarray [Practice](https://leetcode.com/problems/maximum-gcd-sum-of-a-subarray)

### Description  
Given an integer array `nums` and an integer `k`, find the **maximum gcd-sum** among all subarrays with at least `k` elements.  
For a subarray, the **gcd-sum** is defined as:  
- Calculate sum \( s \) of all elements in the subarray.
- Calculate gcd \( g \) of all elements in the subarray.
- The **gcd-sum** is \( s × g \).

Return the maximum value of gcd-sum for any subarray of length ≥ `k`.  

### Examples  

**Example 1:**  
Input: `nums = [6, 2, 8, 4]`, `k = 2`  
Output: `40`  
*Explanation: Consider subarray `[6, 2, 8, 4]` (sum = 20, gcd = 2 → 20 × 2 = 40).  
No subarray of length ≥ 2 has a higher gcd-sum.*

**Example 2:**  
Input: `nums = [2, 4, 6, 8]`, `k = 3`  
Output: `36`  
*Explanation: Subarray `[2, 4, 6]` (sum = 12, gcd = 2 → 12 × 2 = 24)  
Subarray `[4, 6, 8]` (sum = 18, gcd = 2 → 18 × 2 = 36)  
The maximum is 36.*

**Example 3:**  
Input: `nums = [5, 5, 5, 5]`, `k = 1`  
Output: `100`  
*Explanation: Whole array sum = 20, gcd = 5 → 20 × 5 = 100.  
Since k = 1, subarray `[5]` (sum = 5, gcd = 5 → 25) is not as large as the maximum.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every subarray of length ≥ k, compute its sum and gcd, then calculate gcd-sum. Keep track of the max.
  - This is O(n³) — too slow for large arrays (computing gcd for every subarray is expensive).
- **How to optimize:**  
  Notice that as you expand a subarray, its gcd can only *decrease or stay the same*, never increase.  
  So, for each end index `i`, we can maintain all unique gcds and their associated best sums for all possible subarrays ending at `i`.
  - This idea is similar to saving subarray sums in Kadane’s or using a map for unique values at each extension.
  - For each position, keep a map: gcd → (length, sum). When appending `nums[i]` to a previous subarray, update gcd and sum.
  - If length ≥ k, calculate gcd-sum and update the max.

- **Trade-offs:**  
  - We get O(n log(maxnum)) time, where log(maxnum) comes from the number of unique gcds that can appear.
  - Much faster than brute-force. Still somewhat heavy if numbers are large or repeated, but tractable.

### Corner cases to consider  
- Array with all elements the same (max gcd-sum is maximal on the whole array).
- Array where k = 1 (can choose any single element subarray).
- Very large k (only the full array is valid).
- Negative numbers (depending on constraints; typically not allowed in GCD).
- Empty array (undefined; usually k ≥ 1 and array non-empty).
- Minimal size (k = n).

### Solution

```python
from math import gcd

def maxGcdSum(nums, k):
    n = len(nums)
    max_gcd_sum = 0
    prev = dict()  # gcd → (length, sum for max)
    for i, num in enumerate(nums):
        curr = dict()
        # Start a new subarray at current position
        curr_gcd = num
        curr_sum = num
        curr[ curr_gcd ] = (1, curr_sum)
        
        # Extend previous subarrays by adding nums[i], update GCDs
        for g, (length, s) in prev.items():
            new_gcd = gcd(g, num)
            new_sum = s + num
            new_len = length + 1
            # For each unique new_gcd, keep the largest sum seen so far for that (improve if needed)
            if new_gcd in curr:
                prev_len, prev_sum = curr[new_gcd]
                # Prefer longer, or same length with higher sum
                if new_len > prev_len or (new_len == prev_len and new_sum > prev_sum):
                    curr[new_gcd] = (new_len, new_sum)
            else:
                curr[new_gcd] = (new_len, new_sum)
                
        # For any subarray of length ≥ k that ends at i, update max
        for g, (length, s) in curr.items():
            if length >= k:
                max_gcd_sum = max(max_gcd_sum, s * g)
        # Move to next position
        prev = curr

    return max_gcd_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × logM), where logM is the number of unique gcds possible for elements up to max(nums).  
  For each index, we process at most logM unique gcds and their summed values.

- **Space Complexity:**  
  O(logM), as only the current map of possible gcds for each end index is kept (no need to store for every subarray).

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is very large?  
  *Hint: Only consider subarrays of length exactly n (the whole array).*

- Can you output the actual subarray(s) that achieves the maximum gcd-sum?  
  *Hint: Track starting indices and lengths in the dp/map data structure.*

- How would your solution change if GCD were replaced by LCM?  
  *Hint: Extending with new values can only increase or stay the same for LCM, but its growth is less bounded than GCD.*

### Summary
The approach leverages the fact that the GCD of a subarray only stays the same or decreases as elements are added, so we can maintain a dictionary mapping possible gcds (with their max subarray lengths and sums) while extending subarrays step by step.  
This pattern of reducing a state space (here, unique gcds) and pushing forward only "interesting" combinations is similar to dynamic programming and is commonly seen in problems involving GCD/LCM and iterative subarray processing.  
The method efficiently avoids brute-force enumeration and is applicable to any problem where merging elements can only restrict (monotonically) the property of interest.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search), Number Theory(#number-theory)

### Similar Problems
