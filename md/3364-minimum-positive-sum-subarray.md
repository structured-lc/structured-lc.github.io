### Leetcode 3364 (Easy): Minimum Positive Sum Subarray  [Practice](https://leetcode.com/problems/minimum-positive-sum-subarray)

### Description  
Given an integer array **nums** and two integers **l** and **r**, find the **minimum** sum of a **subarray** whose size is between **l** and **r** (inclusive) and whose sum is **greater than 0**.   
Return the minimum such sum, or **-1** if no such subarray exists.

A **subarray** is a contiguous non-empty sequence of elements within the array.

### Examples  

**Example 1:**  
Input: `nums = [1, -1, 2, 3], l = 2, r = 3`  
Output: `2`  
*Explanation: Subarrays of length 2 or 3 are: [1,-1]=0, [-1,2]=1, [2,3]=5, [1,-1,2]=2, [-1,2,3]=4. Only [2,3] and [-1,2,3] and [1,-1,2] have sum > 0. The minimum such sum is 2.*

**Example 2:**  
Input: `nums = [-3, -2, -1], l = 1, r = 2`  
Output: `-1`  
*Explanation: All subarrays have sum ≤ 0. There is no valid subarray, so return -1.*

**Example 3:**  
Input: `nums = [4, 2, -5, 6], l = 1, r = 2`  
Output: `2`  
*Explanation: Subarrays of length 1 or 2: [4]=4, [2]=2, [-5]=-5, =6, [4,2]=6, [2,-5]=-3, [-5,6]=1. All positive sums are [4]=4, [2]=2, =6, [4,2]=6, [-5,6]=1. The minimum is 1.*

### Thought Process (as if you’re the interviewee)  
Start by brute force: for every possible subarray of lengths l to r, calculate its sum and keep track of the minimum sum that is greater than 0.  
This means, for every index i, try all subarrays starting at i, with valid lengths, and check their sum.  
Since the sum of each subarray is required, it could be optimized with prefix sums, but since r-l can be large and r can approach n, a simple double loop is good for small sizes.  
For each start index, incrementally update the running sum as we expand the subarray, and check if the current subarray length and sum qualify. If so, update the minimum.  
If none found, return -1.  
This is O(n²) time, O(1) space, which is practical for small n (e.g., n ≤ 10⁴).

### Corner cases to consider  
- All elements negative (should return -1)
- All elements zero (should return -1)
- Single valid element (nums of size 1, l=1, r=1)
- l > n or r < 1 (no subarray possible)
- Multiple subarrays share the same minimum sum
- Large values (to test integer overflows)

### Solution

```python
def minimumSumSubarray(nums, l, r):
    n = len(nums)
    min_sum = float('inf')
    
    # Iterate over all possible start indices
    for i in range(n):
        current_sum = 0
        # Expand subarray from i to at most n-1
        for j in range(i, min(n, i + r)):
            current_sum += nums[j]
            length = j - i + 1
            # Check if subarray length in [l, r] and sum > 0
            if l <= length <= r and current_sum > 0:
                min_sum = min(min_sum, current_sum)
    
    return -1 if min_sum == float('inf') else min_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) — Double loop where both i and j run up to n, justified by the need to consider every possible subarray of sizes l to r.
- **Space Complexity:** O(1) — No extra storage except a few integer variables; no auxiliary data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize further if r-l is small and n is large?  
  *Hint: Think of prefix sum/precompute window sums.*

- What if you had to find the minimum positive sum for all possible subarray lengths?  
  *Hint: Apply sliding window for each window size.*

- Could you adapt this for max sum subarray within l, r?  
  *Hint: Change the comparison direction and conditions.*

### Summary
This problem uses the **sliding window** and **brute force** subarray enumeration pattern. The brute-force nested loop is justified since constraints aren’t huge and the window range is controllable. This pattern often appears in substring or subarray minimum or maximum sum/range queries with fixed window constraints. If further optimization is necessary, using **prefix sums** or **deque** for sliding window minima can help in more advanced variants.

### Tags
Array(#array), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Minimum Size Subarray Sum(minimum-size-subarray-sum) (Medium)