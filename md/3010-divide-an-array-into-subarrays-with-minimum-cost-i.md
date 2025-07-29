### Leetcode 3010 (Easy): Divide an Array Into Subarrays With Minimum Cost I [Practice](https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-i)

### Description  
Given an array `nums` of length n ≥ 3, divide it into **three contiguous, disjoint subarrays** (no overlap, all elements used).  
The *cost* of a subarray is the value of its first element.  
**Return the minimum possible sum of costs of these three subarrays.**

Put simply: Split `nums` into three blocks, and for each block, pay the first element's value. Pick your split so the total cost is as small as possible.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,12]`  
Output: `6`  
*Explanation: Split as [1], [2], [3,12]. First elements: 1, 2, 3 → Sum = 6.*

**Example 2:**  
Input: `nums = [5,4,3]`  
Output: `12`  
*Explanation: Split as [5], [4], [3]. First elements: 5, 4, 3 → Sum = 12.*

**Example 3:**  
Input: `nums = [9,1,3,7,3,6]`  
Output: `7`  
*Explanation:  
One option is , [1], [3,7,3,6] → 9+1+3=13  
Another: [9,1], [3], [7,3,6] → 9+3+7=19  
But the best: , [1,3], [7,3,6] → 9+1+7=17  
But better still: [9,1], [3,7], [3,6] → 9+3+3=15  
But the minimum is: , [1,3], [7,3,6] (by trying all), so output is 7.  
(This is illustrative. In fact, the best is sum of first, second, and third smallest elements after pos 0.)*

### Thought Process (as if you’re the interviewee)  
- Since the cost for each subarray depends only on its first element, and we must use all elements in three chunks, every valid split can be described by two split-points: after position i and after position j (`0 < i < j < n`).
- The *first subarray* always starts at index 0.  
  Its cost is `nums`.
- For the *other two subarrays*, their first elements are at index i and index j.
- The minimum total cost will be `nums + min(nums[1:]) + min(nums[2:])`, **but**:  
  Actually, the splits enforce that the three subarrays are contiguous and together cover the whole array, so the first elements of subarrays are: 
    - nums,
    - nums[i] where 1 ≤ i < n-1,
    - nums[j] where i+1 ≤ j < n

  Because the subarrays must be **disjoint and contiguous**, and together cover the array, pick two split points i, j, try all `1 ≤ i < n` and `i+1 ≤ j < n`, and compute sum: nums + nums[i] + nums[j].

- **Brute-force:** For each possible i, j, compute the cost. But since n is small (problem restricts n ≤ 50),  
  this approach is acceptable.

- **Optimization:** Notice in the problem, each subarray must be non-empty. Therefore, loop:
    - for i = 1 to n-2:
        - for j = i+1 to n-1:
            - cost = nums + nums[i] + nums[j]
            - record minimum

- This is O(n²), which is performant for n ≤ 50.

### Corner cases to consider  
- Array is exactly length 3 → Only 1 way to split: [a], [b], [c].
- Elements may be equal (e.g., [1,1,1]).
- All elements are increasing/decreasing.
- Negative values (if allowed by constraints).
- Large values or repeated minimums.

### Solution

```python
def minimumCost(nums):
    n = len(nums)
    min_cost = float('inf')
    # The first split point i: end of 1st subarray, must be at least index 1 (so 1st subarray non-empty)
    # The second split point j: end of 2nd subarray, must be at least index i+1 (so 2nd subarray non-empty)
    for i in range(1, n - 1):  # 1 ≤ i < n-1
        for j in range(i + 1, n):  # i+1 ≤ j < n
            # The three subarrays:
            # nums[0:i]     (starts at 0)
            # nums[i:j]     (starts at i)
            # nums[j:n]     (starts at j)
            # Their costs: first elements
            cost = nums[0] + nums[i] + nums[j]
            if cost < min_cost:
                min_cost = cost
    return min_cost
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since we try all i and j where 1 ≤ i < n-1, and i+1 ≤ j < n.
- **Space Complexity:** O(1), only a variable for min_cost, no extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to split it into k subarrays?  
  *Hint: Can you generalize for k splits? Try dynamic programming or recursion.*

- What if the array can be very large (n > 10⁵)?  
  *Hint: Is there a greedy or precompute/min-lookup solution?*

- What if the cost is the *sum* of each subarray (not just first element)?  
  *Hint: Standard partitioning, try prefix sums and DP.*

### Summary
This array partition problem is a **brute-force search within small bounds**, using nested loops to try every split. The coding pattern is classic "all possible partition points," which also appears in interval DP, partition logic, and cut-based dynamic programming for arrays or strings when k is constant and input is short.