### Leetcode 3698 (Medium): Split Array With Minimum Difference [Practice](https://leetcode.com/problems/split-array-with-minimum-difference)

### Description  
Given an integer array **nums**, split it into exactly two contiguous subarrays: **left** and **right**.  
- The **left** subarray (from the start to the split index) must be strictly increasing.
- The **right** subarray (from the split index + 1 to end) must be strictly decreasing.
Return the **minimum possible absolute difference** between `sum(left)` and `sum(right)`.  
If no valid split exists (i.e., can't find such a split), return **-1**.

### Examples  

**Example 1:**  
Input: `nums = [1,3,2]`  
Output: `0`  
*Explanation: Split after index 1: left = [1,3] (strictly increasing), right = [2] (strictly decreasing). Sums: 1+3=4, 2; |4-2|=2.  
Alternatively, split after index 0: left = [1], right = [3,2]. 1, 3+2=5, |1-5|=4.  
But minimum possible difference is 0 when split after index 1: left = [1,3], right = [2], |4-2|=2.*

**Example 2:**  
Input: `nums = [2,3,5,4,1]`  
Output: `1`  
*Explanation: Possible split after index 2: left = [2,3,5] (strictly increasing), right = [4,1] (strictly decreasing). Sums: 2+3+5=10, 4+1=5; |10-5|=5.  
Try after index 3: left=[2,3,5,4], right=[1]. Not strictly increasing left. So the minimum is 1 (suppose split after index 1: left=[2,3], right=[5,4,1], but right is not strictly decreasing).  
Optimal (split after index 2): |10-5|=5.*

**Example 3:**  
Input: `nums = [1,2,3,2,1,2,1]`  
Output: `-1`  
*Explanation: No valid split possible where the left is strictly increasing and the right is strictly decreasing.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try every index as the split point. For each:
  - Check left of the split is strictly increasing.
  - Check right is strictly decreasing.
  - Compute `|sum(left) - sum(right)|`.  
  - This is O(n²) (since verifying monotonicity for each split is O(n)), and TLE for large inputs.
- **Optimized:**  
  - Precompute two arrays:
    - `inc[i]` = `True` if nums[0:i+1] is strictly increasing.
    - `dec[i]` = `True` if nums[i:] is strictly decreasing.
  - Use prefix sums for O(1) range-sum queries.
  - For each split, check inc[i]==True and dec[i+1]==True. If so, compute the difference.
  - Overall O(n) for preprocess and O(n) for check; total O(n).
- **Trade-offs:**  
  - O(n) space and time.
  - Handles only splits between valid strictly increasing and decreasing regions.
  - Edge: No possible split? Need to check for that (return -1).

### Corner cases to consider  
- All elements equal or not strictly increasing/decreasing anywhere.
- Array of size 1 or 2 (not possible to split both ways).
- Input is already strictly increasing or strictly decreasing (no valid split).
- Peaks or valleys in the array.
- No valid split exists at all.

### Solution

```python
def minimumDifference(nums):
    n = len(nums)
    if n < 2:
        return -1

    # Precompute array for strictly increasing from left
    inc = [False] * n
    inc[0] = True
    for i in range(1, n):
        inc[i] = inc[i - 1] and (nums[i] > nums[i - 1])

    # Precompute array for strictly decreasing from right
    dec = [False] * n
    dec[-1] = True
    for i in range(n - 2, -1, -1):
        dec[i] = dec[i + 1] and (nums[i] > nums[i + 1])

    # Prefix sum for O(1) subarray sum queries
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] + nums[i]

    min_diff = float('inf')
    # Try every valid split point: left = nums[0:i+1], right = nums[i+1:]
    for i in range(n - 1):
        if inc[i] and dec[i + 1]:
            sum_left = prefix[i+1]
            sum_right = prefix[n] - prefix[i+1]
            diff = abs(sum_left - sum_right)
            min_diff = min(min_diff, diff)

    return min_diff if min_diff != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Scan for increasing/decreasing (O(n)).  
  - One pass for prefix sums (O(n)).  
  - Final scan through possible splits (O(n)).
- **Space Complexity:** O(n)  
  - For inc, dec, prefix arrays (all O(n)).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the requirement changes to non-strictly increasing or decreasing?  
  *Hint: Adjust comparisons to allow equals.*

- Can you do it in O(1) space, if input can be modified?  
  *Hint: Can you reuse original array for markers or prefix sums?*

- How would your algorithm change for k splits (multiple strictly monotone regions)?  
  *Hint: Generalize the prefix and monotone detection logic.*

### Summary
This is a classic **monotonic subarray + prefix sum** problem, optimized by precomputing valid regions and subarray sums.  
The pattern (prefix/suffix properties + prefix sums + sliding window) is extremely common in problems requiring optimal splitting of arrays with additional subarray monotonicity constraints.  
This approach generalizes to related problems like finding split points in mountain arrays or valley arrays, and can be applied to greedy and DP interview settings.


### Flashcard
Information not available in search results.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
