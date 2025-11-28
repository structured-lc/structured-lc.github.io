### Leetcode 3284 (Medium): Sum of Consecutive Subarrays [Practice](https://leetcode.com/problems/sum-of-consecutive-subarrays)

### Description  
Given an array of integers `nums`, return the sum of the values of all *consecutive* subarrays in `nums`.  
A subarray is defined as *consecutive* if for all `1 ≤ i < n`, it either strictly increases by 1 (`arr[i] - arr[i-1] == 1`) or strictly decreases by 1 (`arr[i] - arr[i-1] == -1`).  
Each array of length 1 is also considered consecutive.  
The *value* of a subarray is its sum.  
Return the sum of values of all such consecutive subarrays modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `20`  
*Explanation: The consecutive subarrays are: [1], [2], [3], [1,2], [2,3], [1,2,3].  
Sum = 1 + 2 + 3 + 3 + 5 + 6 = 20*

**Example 2:**  
Input: `nums = [1,3,5,7]`  
Output: `16`  
*Explanation: Only length-1 subarrays are consecutive: [1], [3], [5], .  
Sum = 1 + 3 + 5 + 7 = 16*

**Example 3:**  
Input: `nums = [7,6,1,2]`  
Output: `32`  
*Explanation: The consecutive subarrays are: , , [1], [2], [7,6], [1,2].  
Sum = 7 + 6 + 1 + 2 + 13 + 3 = 32*

### Thought Process (as if you’re the interviewee)  
First, for each subarray, I need to check if it is strictly increasing or decreasing by 1 at each step, or of length 1.  
Naive brute-force: Generate every possible subarray (O(n²)), check if consecutive, then sum. This is O(n³) (since each check can take O(n)), which is slow for n up to 10⁵.

Optimization:  
Notice that in a contiguous run where the difference is always +1 or -1, all *prefix* subarrays of this run are consecutive.  
So scan once, for each position:
- Find the longest increasing-by-1 starting at i ― keep extending as long as nums[j] == nums[j-1]+1.
- Similarly for decreasing-by-1.
- For each such run, for every possible subarray starting at i in this run, sum it up.

But this is tricky to do efficiently for all lengths.
Alternative approach:  
Precompute all **maximal consecutive runs** (increasing or decreasing), then for each run, all possible subarrays within the run are consecutive. Since every subarray within such a run is consecutive, we can compute the sum for all subarrays in this run efficiently.

Since the array can be split into such runs, the total number of subarrays is O(n).
For each run:
- Let run be nums[l:r+1] (inclusive, difference +1 or -1).
- Count all subarrays: for length L, number of subarrays is L × (L+1)/2. For each, compute its sum.
- Precompute prefix sums for fast subarray sum computation.

As a result, we can process in O(n) time using two pointers.

### Corner cases to consider  
- Single element array  
- All elements are the same (no consecutive subarrays other than length 1)  
- Entire array is an increasing-by-1 or decreasing-by-1 sequence  
- Very large n (to check for time complexity issues)  
- Negative numbers (if constraints allow)  
- All numbers separated by ≥2 (no valid subarrays except length 1)

### Solution

```python
def sum_of_consecutive_subarrays(nums):
    MOD = 10 ** 9 + 7
    n = len(nums)
    total = 0

    # Precompute prefix sums for O(1) subarray sum queries
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] + nums[i]

    i = 0
    while i < n:
        # Each element as subarray of length 1 is always valid
        total = (total + nums[i]) % MOD

        # Try to find maximal increasing-by-1 run starting at i
        j = i + 1
        while j < n and nums[j] - nums[j-1] == 1:
            j += 1
        if j - i > 1:
            # For run nums[i:j] (len > 1), sum all subarrays length ≥2
            for start in range(i, j):
                for end in range(start + 1, j):
                    total = (total + prefix[end+1] - prefix[start]) % MOD
            i = j
            continue

        # Try to find maximal decreasing-by-1 run starting at i
        j = i + 1
        while j < n and nums[j] - nums[j-1] == -1:
            j += 1
        if j - i > 1:
            for start in range(i, j):
                for end in range(start + 1, j):
                    total = (total + prefix[end+1] - prefix[start]) % MOD
            i = j
            continue

        i += 1

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in the worst case (worst when every two adjacent elements form a consecutive run), but most practical input patterns hit much less than n² due to maximal runs.  
- **Space Complexity:** O(n) for the prefix sum array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array can contain zeros or negative numbers?  
  *Hint: Does checking for consecutive-by-1 still work with them?*

- Can you solve this problem in strictly O(n) time?
  *Hint: Can you use mathematical formulas to sum all subarrays in a run directly?*

- How would you output the actual list of all consecutive subarrays, not just their total sum?  
  *Hint: Needs explicit storage/enumeration — trade off with runtime and space.*

### Summary
We use a **two-pointers** and **prefix sum** pattern to find maximal runs of consecutive (+1 or -1) subarrays, then compute all valid subarrays’ sums efficiently. This technique leverages the properties of arithmetic runs. The idea of scanning maximal valid subarrays and using prefix sums is common in substring and subarray pattern recognition. This generalizes to problems involving *runs* or *windows* with certain properties (e.g. sliding window, maximum sum subarray, string pattern runs, etc.).


### Flashcard
Identify maximal runs where consecutive elements differ by ±1; within each run of length L, count all valid subarrays using the formula L×(L+1)/2 and sum their contributions.

### Tags
Array(#array), Two Pointers(#two-pointers), Dynamic Programming(#dynamic-programming)

### Similar Problems
