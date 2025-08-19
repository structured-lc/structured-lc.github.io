### Leetcode 2926 (Hard): Maximum Balanced Subsequence Sum [Practice](https://leetcode.com/problems/maximum-balanced-subsequence-sum)

### Description  
Given an integer array **nums**, find the maximum possible sum of a *balanced subsequence* in this array.  
A subsequence `[nums[i₀], nums[i₁], ..., nums[iₖ₋₁]]` is *balanced* if for every pair of consecutive indices (iⱼ₋₁, iⱼ):
- `nums[iⱼ] - nums[iⱼ₋₁] ≥ iⱼ - iⱼ₋₁` for 1 ≤ j < k.
- A subsequence with only one element is always balanced.

You must find the balanced subsequence with the highest possible sum.

### Examples  

**Example 1:**  
Input: `nums = [3,3,5,6]`  
Output: `14`  
*Explanation: Select indices [0,2,3] → [3,5,6]. Differences in values (5-3=2, 6-5=1) are both ≥ their index gaps (2,1). Sum is 3+5+6=14.*

**Example 2:**  
Input: `nums = [5,-1,-3,8]`  
Output: `13`  
*Explanation: Select [0,3] → [5,8]. 8-5=3 ≥ 3 (index gap). Sum is 5+8=13, which is maximal among all balanced subsequences.*

**Example 3:**  
Input: `nums = [-2,-1]`  
Output: `-1`  
*Explanation: The only options are [-2] or [-1]. Both are balanced, but -1 > -2, so output is -1.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force Approach:**  
  For every possible subsequence, check if it’s balanced and calculate its sum. O(2ⁿ) — not feasible for n up to 10⁵.

- **DP Insight:**  
  Let’s define `dp[i]` as the maximum balanced subsequence sum that ends at position `i`.  
  For each i, try to extend a balanced subsequence from every possible previous index j<i — but this would be O(n²).

- **Optimization:**  
  Transform the balancing condition:  
  `nums[i] - nums[j] ≥ i - j`  ⟺  `nums[i] - i ≥ nums[j] - j`  
  So, track for each value of `nums[j]-j` the best possible `dp[j]`.  
  Use a segment tree or map to quickly query and update maximums based on this transformed value.  
  For each i:  
  - Compute key = nums[i] - i  
  - Find the maximum `dp[j]` where `nums[j]-j ≤ nums[i]-i`, then `dp[i] = nums[i] + max(previous dp[j])`  
  - Update the structure with `nums[i]-i : dp[i]`.

- The core idea: This reduces the problem to a variant of maximum increasing subsequence sum, but with a dynamic key (nums[i]-i).

### Corner cases to consider  
- Single element (output that element)
- All negatives, choose the least negative
- All elements equal (subsequence with the most elements)
- No valid pairs (every number needs to be on its own)
- nums contains large positive/negative values near integer limits

### Solution

```python
from collections import defaultdict
import bisect

def maximumBalancedSubsequenceSum(nums):
    # We want to maintain max dp value for each possible key = nums[i] - i
    # Sorted list of keys, and a corresponding max dp array
    keys = []
    dp_map = {}
    n = len(nums)
    result = float('-inf')
    for i, num in enumerate(nums):
        key = num - i

        # Find max dp among all keys ≤ key, i.e., all nums[j]-j ≤ nums[i]-i
        # bisect_right returns position to insert key (all ≤ are left)
        idx = bisect.bisect_right(keys, key)
        max_prev_dp = 0
        if idx > 0:
            # Collect all dp up to idx-1 (max among them)
            max_prev_dp = max(dp_map[keys[j]] for j in range(idx))

        curr_dp = num + max_prev_dp
        result = max(result, curr_dp)

        # Insert/update our key, maintaining the best dp
        if key not in dp_map:
            bisect.insort(keys, key)
            dp_map[key] = curr_dp
        else:
            dp_map[key] = max(dp_map[key], curr_dp)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - For each element, the bisect/insert on the keys list is log n, and we do it for n elements.
  - The inner max is O(log n) per key, traversing up to log n elements in the worst case, but can be tightened with additional data structures.

- **Space Complexity:** O(n)  
  - We store up to n unique keys in keys[] and dp_map.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose nums is very large and you need O(n) time. Can you avoid sorting or bisecting?  
  *Hint: Is there a monotonic property? Can you use a hashmap and only keep maximal entries?*

- What if the constraint on nums[i] is much smaller, can you exploit counting sort-style optimizations?  
  *Hint: Pre-process by bucket, or array-based dp if keys are bounded.*

- Can you return the actual indices of the balanced subsequence, not just the sum?  
  *Hint: Store parent pointers or backtrack using an extra array.*

### Summary
This problem uses a **dynamic programming** approach with **monotonic optimization** by transforming the value/index constraint.  
The solution pattern (DP − sequence transforms + segment/map query for past optimums) is common for "generalized LIS/LDS" or "max subsequence sum with custom constraints" problems.  
You can encounter this structure in variations of weighted LIS, increasing tuple chains, or sequence selection under complex relationships.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
- Number of Pairs Satisfying Inequality(number-of-pairs-satisfying-inequality) (Hard)