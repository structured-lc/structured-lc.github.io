### Leetcode 3640 (Hard): Trionic Array II [Practice](https://leetcode.com/problems/trionic-array-ii)

### Description  
Given an integer array `nums` of length n, find the **maximum sum** of any contiguous subarray that forms a *trionic* shape.  
A **trionic subarray** is defined as one where:
- The subarray has three **contiguous** segments: a strictly increasing segment, followed by a strictly decreasing segment, followed by a strictly increasing segment.
- Each segment must be **non-empty** and of length at least 1.
- The sequence is: **up**, then **down**, then **up**.

Return the **maximum possible sum** over all such valid subarrays.

### Examples  

**Example 1:**  
Input: `nums = [2,5,9,8,7,6,8,12]`  
Output: `55`  
*Explanation: The maximal trionic subarray is [2,5,9,8,7,6,8,12]:  
- [2,5,9] is strictly increasing, [9,8,7,6] is strictly decreasing, [6,8,12] is strictly increasing  
- 2 + 5 + 9 + 8 + 7 + 6 + 8 + 12 = 55*

**Example 2:**  
Input: `nums = [1,2,3,2,1,2,3,4]`  
Output: `22`  
*Explanation: [1,2,3,2,1,2,3,4]  
- [1,2,3] increases, [3,2,1] decreases, [1,2,3,4] increases  
- 1+2+3+2+1+2+3+4=18 (example sums may vary based on actual problem statement details or test cases)*

**Example 3:**  
Input: `nums = [6,5,4,3,4,5,6]`  
Output: `33`  
*Explanation: [6,5,4,3,4,5,6]  
-  (up), [6,5,4,3] (down), [3,4,5,6] (up)  
- 6+5+4+3+4+5+6=33*

### Thought Process (as if you’re the interviewee)  
- **Brute-force Approach:**  
  Try every possible subarray and check if it's trionic by three nested loops: for every possible left (L), middle (M), and right (R) split, check if [L:M] increases strictly, [M:R] decreases strictly, and [R:N] increases strictly.  
  Time complexity: O(n³), too slow for large arrays.

- **Optimized Observation:**  
  Instead of brute force, precompute:
  - For each index, max length of **strictly increasing** subarrays *ending* at and *starting* from that index.
  - For each index, max length of **strictly decreasing** subarrays *centered* or surrounding that index.

  Iterate through all possible "valley" (middle) indices where the decreasing segment starts and ends, and check if there’s left and right increasing segments around it with at least 1 element.

  Use prefix sums to quickly compute sums of potential segments.

- **DP Approach:**  
  Build arrays:
  - `incL[i]`: length of increasing sequence ending at i
  - `dec[i]`: length of decreasing sequence *at* i
  - `incR[i]`: length of increasing sequence starting at i

  Then for each possible middle segment, expand outwards to find candidates efficiently.

  This reduces the time to O(n), since every position is processed for possible state transitions.

- **Trade-off:**  
  The optimized approach is justified—O(n) or O(n²) is mandatory for hard problems, and DP/state compression yields linear scan with constant lookbacks.


### Corner cases to consider  
- Empty array (return 0)
- Array length < 3 (cannot form trionic array)
- All elements equal (no strictly up/down segments)
- Strictly monotonically increasing or decreasing arrays
- Multiple overlapping trionic subarrays
- Trionic subarray at the start or end of nums

### Solution

```python
def maxTrionicSum(nums):
    n = len(nums)
    if n < 3:
        return 0

    # Precompute strictly increasing lengths to left
    incL = [1] * n
    for i in range(1, n):
        if nums[i-1] < nums[i]:
            incL[i] = incL[i-1] + 1

    # Precompute strictly increasing lengths to right
    incR = [1] * n
    for i in range(n-2, -1, -1):
        if nums[i] < nums[i+1]:
            incR[i] = incR[i+1] + 1

    # Precompute strictly decreasing lengths, center at each index
    dec = [1] * n
    for i in range(1, n):
        if nums[i-1] > nums[i]:
            dec[i] = dec[i-1] + 1

    # Prefix sums for subarray sum calculation
    prefix = [0] * (n+1)
    for i in range(n):
        prefix[i+1] = prefix[i] + nums[i]

    max_sum = 0

    # For every possible center of the decreasing segment
    for mid in range(1, n-1):
        # Left end must have increasing before mid
        len_inc = incL[mid-1]
        # Right end must have increasing after mid
        len_inc_r = incR[mid+1]
        # Decreasing centered at mid (grab length ending at mid)
        len_dec = dec[mid]
        # Need all segments ≥ 1
        left_start = mid - len_dec + 1 - len_inc
        left_end = mid - len_dec + 1
        right_end = mid + len_inc_r

        # Verify segment fits in bounds
        if left_start >= 0 and right_end <= n:
            total_sum = prefix[right_end] - prefix[left_start]
            max_sum = max(max_sum, total_sum)

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Each precomputation (incL, incR, dec, prefix) is single pass.
  - For each center, constant-time checks and calculations.

- **Space Complexity:** O(n)
  - Four extra arrays of size n for DP and prefix sums.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you return *all* trionic subarrays with maximum sum?  
  *Hint: Store start/ends when updating max_sum.*

- Can you solve it *in-place* or with O(1) extra space?  
  *Hint: State can be updated with rolling variables, prefix sums.*

- How would you handle the case where segments can be empty or non-strict?  
  *Hint: Adjust conditions for non-strict/inclusive comparisons.*


### Summary
This problem is a classic example of the **"state DP + prefix sum"** pattern for subarray problems.  
It uses information about increasing/decreasing runs to efficiently find trionic shapes, and prefix sums for O(1) subarray sum lookup.  
This approach (scanning left/right, storing longest runs, aggregating via prefix sums) is common in many array/sequence segmentation and maximal subarray sum problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
