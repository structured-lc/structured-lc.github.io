```markdown
### Leetcode 3098 (Hard): Find the Sum of Subsequence Powers [Practice](https://leetcode.com/problems/find-the-sum-of-subsequence-powers)

### Description  
Given an integer array `nums` of length `n`, and a positive integer `k`, find the sum of the "powers" of all subsequences of `nums` that have length exactly `k`. The "power" of a subsequence is defined as the smallest absolute difference between any two of its elements. Since the answer can be very large, return it modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input=`[1,2,3,4]`, `k=3`  
Output=`4`  
Explanation: The 4 subsequences are `[1,2,3]`, `[1,2,4]`, `[1,3,4]`, and `[2,3,4]`. Each has a minimum absolute difference between any two elements (their power) of 1, so the sum is 1 + 1 + 1 + 1 = 4.

**Example 2:**  
Input=`[4, 3, -1]`, `k=2`  
Output=`10`  
Explanation: The 3 subsequences are `[4,3]`, `[4,-1]`, and `[3,-1]`. Their powers are 1, 5, and 4, respectively, so the sum is 1 + 5 + 4 = 10.

**Example 3:**  
Input=`[5,5,5]`, `k=3`  
Output=`0`  
Explanation: There is only one subsequence, `[5,5,5]`. The minimum absolute difference between any two elements is 0, so the sum is 0.

### Thought Process (as if you're the interviewee)  

**Brute Force Approach**  
Enumerate all possible subsequences of size `k` (using combinations), calculate the minimum absolute difference for each, and sum them up. This is correct but combinatorially infeasible for large `n` (O(C(n, k)×k²)), since C(n, k) can be enormous.

**Optimized Approach**  
Sort the array: in a sorted array, adjacent elements will have the smallest differences, so the power of any subsequence is likely determined by adjacent differences.  
Use dynamic programming: track the number of ways to select a subsequence of size `m` with the last element ending at index `i`, and the current minimum difference.  
At each step, consider either including or excluding the current element, and update the minimum difference accordingly.  
This reduces the state to (index, elements taken so far, current minimum difference), leveraging sorting and dynamic programming to avoid recomputation and prune branches with higher minimums than necessary.

**Justification**  
The intuition is that after sorting, the minimum difference in a subsequence is always the difference between some pair of consecutive elements in the subsequence (because inserting a gap would only increase the minimum difference).  
Dynamic programming with memoization is the most reasonable approach given the problem's constraints and complexity.

### Corner cases to consider  
- `k=1`: Every single-element subsequence has a power of infinity (or undefined), but the problem guarantees `k ≥ 2` or considers them as 0.
- All identical elements: All subsequences have a power of 0.
- Duplicate values: Sorting handles this, but care must be taken to avoid overcounting or undercounting.
- `k > n`: No valid subsequences, sum is 0.
- Small `n`, small `k`: Brute force may suffice, but still prefer DP for generalizability.

### Solution

```python
MOD = 10**9 + 7

def sumOfPowers(nums, k):                                              
    nums.sort()                                                      
    n = len(nums)                                                         
    if k < 2 or n < k: return 0                                             
    from functools import lru_cache  

    @lru_cache(maxsize=None)                                                
    def dp(i, m, last_idx, current_min):                                    
        if m == k:                                                         
            return current_min % MOD                                        
        if i == n:                                                         
            return 0                                                        
        # exclude the current element                                       
        res = dp(i + 1, m, last_idx, current_min)                          
        # include nums[i]                                                  
        if last_idx >= 0:                                                  
            new_min = min(current_min, abs(nums[i] - nums[last_idx]))      
        else:                                                              
            new_min = float('inf')                                         
        res += dp(i + 1, m + 1, i, new_min)                                
        res %= MOD                                                         
        return res                                                         

    return dp(0, 0, -1, float('inf'))                                      
```

**Comments:**  
- **Sort** the array to ensure adjacent elements matter most for subsequence power.
- **DP State:** Recursively process the array, tracking: current index, elements taken so far (m), last picked element's index, and the current minimum difference.
- **Base Cases:** If `m == k`, return the current minimum (then backtrack). If processed all elements, return 0.
- **Transition:** Either include the current element (update last picked and minimum), or exclude it.
- **Memoization:** Use `lru_cache` to cache intermediate states.
- **Result:** After sorting and DP, modulo result is returned.

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × k × min_difference_range): Each state (i, m, last, min_diff) is unique. Here, 'min_difference_range' is the maximum possible distinct minimum differences, but since the array is sorted, this is O(n). So, total is O(n³ × k) in the worst case.
- **Space Complexity:** O(n² × k × min_difference_range): For memoization, same as time complexity due to caching.

### Potential follow-up questions (as if you're the interviewer)  

If the array is very large, can you further optimize the space or time?  
*Hint: Consider using iterative DP with optimized state compression, or mathematical insights about the minimum difference distribution.*

How would the solution change if power is defined as the sum of absolute differences instead of the minimum?  
*Hint: Re-examine the combinatorial properties; now the problem might be separable over all pairs, but still requires DP for large k.*

How would you handle duplicates in the array?  
*Hint: Does sorting automatically handle duplicates, or do you need special logic to avoid overcounting certain subsequences?*

### Summary

This problem combines sorting, dynamic programming, and combinatorial counting to efficiently sum the minimum absolute differences for all subsequences of length `k`. The sorting step is crucial for making the dynamic programming approach feasible, as it localizes the key differences to adjacent elements. DP with memoization is a common pattern for combinatorial problems with recursive structure and overlapping subproblems—seen in problems like "Subset Sum" or "Count Subsequences". The key challenge is managing the DP state compactly while efficiently tracking the metric of interest (minimum difference).

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
- Number of Subsequences That Satisfy the Given Sum Condition(number-of-subsequences-that-satisfy-the-given-sum-condition) (Medium)
- Closest Subsequence Sum(closest-subsequence-sum) (Hard)