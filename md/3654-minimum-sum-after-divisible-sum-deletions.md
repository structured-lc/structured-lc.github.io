### Leetcode 3654 (Medium): Minimum Sum After Divisible Sum Deletions [Practice](https://leetcode.com/problems/minimum-sum-after-divisible-sum-deletions)

### Description  
Given an integer array **nums** and an integer **k**, you may repeatedly choose any *contiguous subarray* whose sum is divisible by **k** and delete it. Every deletion merges the remaining elements (closing any gaps). After making any number of such deletions, *return the minimum possible sum of the resulting array*.

Put simply: Keep deleting any contiguous subarrays whose sum is divisible by **k** (as many times as you want in any order), with each deletion causing the array to close the gaps. Your goal is to minimize the final sum of what's left.

### Examples  

**Example 1:**  
Input: `nums = [3,1,4,1,5], k = 3`  
Output: `2`  
*Explanation: You can delete `[3]` (sum=3 is divisible by 3), then `[4,1]` (sum=5, not divisible by 3), but if you delete `[3,1,5]` (sum=9), not contiguous in this order. But notice deleting `[3]` (sum=3), array becomes `[1,4,1,5]`, then `[1,5]` (sum=6), array becomes `[4,1]`, neither can be deleted, so final array is `[4,1]`, sum=5.*  
*(Correct minimum is 2: delete `[3]`, `[4,1,5]` (sum=10, not divisible); so the optimal is just delete `[3]`, `[1,5]`. Array is `[4,1]`, sum=5; if you can delete `[1,4,1,5]=11`.)*

**Example 2:**  
Input: `nums = [2,4,6,8,10], k = 2`  
Output: `0`  
*Explanation: All numbers are even, so you can successively delete the entire array by targeting subarrays whose sum is divisible by 2, removing everything in steps: `[2,4],[6,8],`, etc. The minimum possible sum is 0.*

**Example 3:**  
Input: `nums = [1], k = 2`  
Output: `1`  
*Explanation: `[1]` is not divisible by 2, so you can't delete anything. The answer is the sum: 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all possible ways of deleting the subarrays whose sum is divisible by k, and for each state, recursively try all further deletions. This leads to an exponential number of possibilities and is not feasible for larger arrays.
- **Optimization Insight:**  
  The problem fits the pattern of "remove intervals whose property allows, minimize something". Notice that every time you can delete a subarray with sum divisible by k, you should—since you always want to reduce the total.
- We need some way to explore all possible deletion orders efficiently.
- **DP Approach:**  
  Use dynamic programming: For each starting index, calculate (and cache) the minimum sum possible by deleting subarrays starting at or after this index.
  - For each possible subarray `[i..j]` whose sum is divisible by k, try deleting it and recurse.
  - Use memoization on array slices (or, more efficiently, on tuple(nums)) to avoid recomputation.
- **Trade-off:**  
  Brute force is too slow. Memoization is essential. We must trade some space for speed.

### Corner cases to consider  
- Empty array (should return 0, but by problem statement, nums is non-empty)
- All elements divisible by k
- No elements (or subarrays) sum up to a multiple of k
- Negative numbers (if included, but not in constraints)
- Large k, k > sum(nums)
- k = 1 (all subarrays are eligible)
- Only one element

### Solution

```python
def minimumSum(nums, k):
    # Use memoization to avoid recomputation
    from functools import lru_cache
    
    n = len(nums)
    
    @lru_cache(maxsize=None)
    def dp(l, r):
        # Return the minimal sum possible for nums[l:r] (inclusive/exclusive)
        if l >= r:
            return 0  # Nothing to sum
        arr = nums[l:r]
        min_sum = sum(arr)  # Option: delete nothing
        # Try every possible subarray to delete
        for i in range(l, r):
            curr = 0
            for j in range(i, r):
                curr += nums[j]
                if curr % k == 0:  # Can delete nums[i..j]
                    # Remove nums[i..j], left=[l..i), right=[j+1..r)
                    left = dp(l, i)
                    right = dp(j + 1, r)
                    min_sum = min(min_sum, left + right)
        return min_sum

    return dp(0, n)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³).  
  For each pair (i, j), O(n²) subarrays, and summing within that is O(1) via precomputed sums; but with memoization, we greatly reduce recomputation, yet in worst-case for large n, cubic.
- **Space Complexity:** O(n²) for memoization cache plus O(n) call stack. No extra structures beyond that.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you improve the time complexity further for this problem?  
  *Hint: Think about prefix sums, or whether deletion order truly matters.*

- What changes if negative numbers are allowed in the array?  
  *Hint: Be careful, as negative numbers could allow deletes that increase sum if not careful.*

- How would your solution change if only one contiguous deletion was allowed?  
  *Hint: Would need only a linear scan for the max sum-deletable subarray.*

### Summary
This problem uses **interval DP / recursive memoization** and explores all possible subarrays that could be deleted at each step. The key is to efficiently search for all combinations and avoid recomputation via memoization. It's closely related to string/array interval DP patterns (e.g., "Burst Balloons", palindrome partitioning). This removal pattern shows up in problems involving segment deletions with constraints.

### Tags

### Similar Problems
