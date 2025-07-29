### Leetcode 2025 (Hard): Maximum Number of Ways to Partition an Array [Practice](https://leetcode.com/problems/maximum-number-of-ways-to-partition-an-array)

### Description  
Given an integer array `nums` of length n and an integer k:  
- You can choose at most one index in nums and change nums[i] to k (or leave the array unchanged).
- Define a **partition** as a split after some index `pivot` (1 ≤ pivot < n), so the sum of left and right parts are equal:  
  nums + ... + nums[pivot-1] == nums[pivot] + ... + nums[n-1].
- Your task: After *at most* one change (or zero), compute the **maximum number of valid partitions** possible in the resulting array.

Think of it as: maximize the number of indices where you can split the array into two non-empty parts of equal sum, with at most one edit to set an element to k.

### Examples  

**Example 1:**  
Input: `nums = [2, -1, 2], k = 3`  
Output: `1`  
*Explanation:  
Without change: possible pivot at index 1: left=[2], right=[-1,2], sums=2,1 ≠.  
After change nums[1]→3: nums=[2,3,2]. Now, at index 1: left=[2], right=[3,2]. Sums: 2 vs 5.  
At index 2: left=[2,3], right=[2]. 2+3=5, right=2.  
No pivot gives equal sum, but after changing nums→3: nums=[3,-1,2], index 2: left=[3,-1]=2, right=[2]=2.  
So one way (pivot=2).*

**Example 2:**  
Input: `nums = [0, 0, 0], k = 1`  
Output: `2`  
*Explanation:  
Original: prefix sums at pivot 1 (0) and 2 (0). Both partitions equal. So 2 ways.
If you change any zero to 1, prefix sums change so only one way or none.
So maximum ways is 2 (no change).*

**Example 3:**  
Input: `nums = [22, 6, 7, 8, 2], k = 8`  
Output: `0`  
*Explanation:  
Try all possible changes: No way to split into equal sum parts after any single edit or no edit.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each i, try changing nums[i]→k or keeping all unchanged. For each variant, count the valid pivots. O(n²) per variant, O(n³) total (not efficient).
- **Optimize:**  
  - Only one change is allowed, so precompute the ways *without any edit* (using prefix sums).
  - For each i (potential edit), simulate changing nums[i]→k:
    - When nums[i] is replaced with k, only partition sums where i is on one side and the rest is untouched get affected.
  - Key: Changing nums[i] increases/decreases the left sum for pivots strictly after i, and the right sum for pivots ≤ i.
- Use prefix sum and a hash map to track counts of possible sums before and after i (like prefix frequency).
- Walk through the array:
    - Build prefix sum array.
    - For each possible pivot (1 ≤ pivot < n), store diff: prefixSum[pivot] - totalSum/2.
    - For each i, if nums[i] changes, only partitions with the imbalance caused at that i matter. Update hash counts and find where the prefix differences get zeroed by the change.
- **Optimized approach:** O(n) pre-processing, O(n) per edit, so total O(n²) naive. With clever precompute of prefix stats and single scan, can be done in O(n).

### Corner cases to consider  
- Empty array or n=1: No partitions possible.
- All elements the same (e.g., all zeros).
- Changing k makes all elements equal.
- Changing an element doesn’t help (no improvement).
- k is the same as the element being replaced.
- Multiple ways without any edit; edit decreases the count.

### Solution

```python
def waysToPartition(nums, k):
    n = len(nums)
    prefix = [0] * n
    prefix[0] = nums[0]

    for i in range(1, n):
        prefix[i] = prefix[i-1] + nums[i]

    total = prefix[-1]

    # Count ways without any change
    res = 0
    diff_count_right = {}
    for i in range(n - 1):
        left = prefix[i]
        right = total - left
        diff = left - right
        diff_count_right[diff] = diff_count_right.get(diff, 0) + 1

    res = diff_count_right.get(0, 0)

    from collections import defaultdict
    # Prepare prefix and suffix diff counters
    left_count = defaultdict(int)
    right_count = diff_count_right.copy()

    ans = res

    for i in range(n):
        # Consider changing nums[i] to k
        delta = k - nums[i]

        cnt = 0

        # For pivots < i, these are in left of modified element (partition doesn’t contain nums[i] in right)
        cnt += left_count.get(delta, 0)
        # For pivots >= i, on the right side (partition includes nums[i] on right, so opposite sign)
        cnt += right_count.get(-delta, 0)

        ans = max(ans, cnt)

        # Update diff maps as we sweep from left to right
        if i < n - 1:
            # Remove this diff from right_count, add to left_count
            current_diff = prefix[i] - (total - prefix[i])
            right_count[current_diff] -= 1
            left_count[current_diff] += 1

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Single pass for prefix sums, counting, and one more sweep. Each map operation is O(1) amortized.
- **Space Complexity:** O(n) for prefix sums and diff counters.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do it in less space: keep only a running tally instead of storing all prefix differences?  
  *Hint: Will storing only frequency of each diff suffice? Think about rolling update.*

- What if you can change up to two elements to k?  
  *Hint: Consider all combinations, but prune unnecessary changes.*

- How would you adapt this if allowed to change an arbitrary element to any value?  
  *Hint: Tie in with dynamic programming or greedy frequency tallying.*

### Summary
This is a **prefix sum + hash map frequency** problem, similar to partition-equal-subset problems but with a dynamic modification twist. By precomputing prefix imbalances and scanning, we efficiently consider the effect of a single change per split.  
Useful in partition, balancing, or dynamic update scenarios, especially where one (or few) update(s) can have global effects. This principle applies to problems involving one change or query to maximize array or partition properties.