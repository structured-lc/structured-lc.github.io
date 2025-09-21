### Leetcode 3691 (Hard): Maximum Total Subarray Value II [Practice](https://leetcode.com/problems/maximum-total-subarray-value-ii)

### Description  
Given an integer array **nums**, you can choose some **disjoint subarrays** (no overlap, subarrays can be of any size and anywhere in nums). For each chosen subarray, its value is **max(subarray) - min(subarray)**.  
Your goal: Select any number of disjoint subarrays so that the **sum of their values** is maximized. Return this maximum possible total value.

### Examples  

**Example 1:**  
Input: `nums = [1,3,2]`  
Output: `2`  
Explanation:  
Choose the subarray `[1,3]` or `[3,2]`, both have value 2.  
You cannot choose both since they overlap.  
Pick one disarray: value = 2.

**Example 2:**  
Input: `nums = [3,5,1,6]`  
Output: `5`  
Explanation:  
Possible picks:
- Pick `[3,5]` → 2, `[1,6]` → 5 (but they overlap).
- Pick `[3,5,1,6]` as one subarray: value is 6 - 1 = 5.
- The best is to pick only `[1,6]`: value = 5.

**Example 3:**  
Input: `nums = [1,2,3,4,5]`  
Output: `4`  
Explanation:  
Pick `[1,5]`: 5 - 1 = 4.  
No way to get higher total (single subarray).

### Thought Process (as if you’re the interviewee)  

- **Brute-force Idea:**  
  Try all possible sets of disjoint subarrays, compute the value (max - min) for each, and sum. Take the max sum overall.  
  This is infeasible — exponential complexity.

- **Observation:**  
  max(subarray) - min(subarray) is always highest for subarrays where elements are as far apart as possible (i.e., may favor longer subarrays or segments containing global max/min).  
  But can't always just take the whole array (if a single subarray splits into two that yield a higher combined value, must consider that).

- **Dynamic Programming Approach:**  
  Let **dp[i]** = maximum total value for prefix nums[:i].  
  For each **j < i**, try ending a new subarray at position i-1, starting from j.  
  Calculate value = max(nums[j:i]) - min(nums[j:i]), and combine with dp[j] (i.e., previous result for left side).  
  For each i, dp[i] = max(dp[j] + (max(nums[j:i]) - min(nums[j:i])) for all j < i).  
  Need to efficiently calculate max/min in sliding windows.

- **Optimization:**  
  Use a segment tree or monotonic stacks to efficiently compute max/min in O(1) for each possible subarray, or restrict length for efficiency.

- **Trade-Offs:**  
  This DP approach may have O(n²) time if not further optimized, but is manageable for moderate n.

### Corner cases to consider  
- nums of length 1  
- All numbers equal  
- All increasing or decreasing  
- Large negative and positive values  
- Multiple identical subarrays giving same value  
- Picks not overlapping

### Solution

```python
def maximum_total_subarray_value(nums):
    n = len(nums)
    # dp[i]: maximum total value for nums[:i]
    dp = [0] * (n + 1)
    
    for i in range(1, n + 1):
        max_num = nums[i-1]
        min_num = nums[i-1]
        # Try every subarray ending at i-1
        for j in range(i-1, -1, -1):
            max_num = max(max_num, nums[j])
            min_num = min(min_num, nums[j])
            # dp[j]: value to the left, plus current subarray's value  
            dp[i] = max(dp[i], dp[j] + (max_num - min_num))
    
    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For every ending index i, we loop back to 0, so up to n² subarrays checked; within loop, only updating 2 variables.
- **Space Complexity:** O(n)  
  For the dp array; all other variables are O(1).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is extremely large (n > 10⁴)?  
  *Hint: Can you speed up max/min calculation with segment trees or monotonic data structures?*

- What if instead of (max-min) it's defined as max-min+k, or something similar?  
  *Hint: How does the DP recurrence change?*

- Can you generalize this for multidimensional arrays (matrices)?  
  *Hint: Think about how to efficiently maintain max/min for rectangles.*

### Summary
This is a classic **DP on intervals** problem, exploiting the chain structure of the array and the **disjoint subarrays** restriction.  
Pattern used: Partition DP / Interval DP.  
Related to classic "Best Time to Buy and Sell Stock" and "Maximum Subarray" problems, and can extend to complex DP optimizations using segment trees or sparse tables for subarray queries.  
Key idea: For every possible subarray ending at each position, compute the value and use dp to combine best non-overlapping picks.

### Tags


### Similar Problems
