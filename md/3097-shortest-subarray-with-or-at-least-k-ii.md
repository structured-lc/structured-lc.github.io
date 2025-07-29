### Leetcode 3097 (Medium): Shortest Subarray With OR at Least K II [Practice](https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii)

### Description  
Given an array of **non-negative** integers `nums` and an integer `k`, find the length of the **shortest non-empty subarray** whose bitwise **OR** is **at least** `k`.  
Return `-1` if no such subarray exists.

A subarray is "special" if the OR over its elements is at least `k`.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3], k = 2`  
Output: `1`  
*Explanation: Subarray `[3]` has OR `3` which is ≥ `2`.*

**Example 2:**  
Input: `nums = [2,1,8], k = 10`  
Output: `3`  
*Explanation: All subarrays of length <3 have OR values <10. Only entire array `[2,1,8]` gives OR `11` ≥ `10`.*

**Example 3:**  
Input: `nums = [1,2], k = 0`  
Output: `1`  
*Explanation: Any element has OR ≥ 0, so shortest subarray is length `1`.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - Check every subarray, compute the OR, track minimum length where OR ≥ k.
  - O(n²) time — too slow for `n` up to 2×10⁵.

- **Observation:**  
  - The OR operation is monotonic: once a bit is set, it cannot be unset by adding more elements to the subarray.

- **Optimization:**  
  - Use **sliding window** (two pointers) and bit manipulation.
  - Instead of recalculating OR for each subarray, we can add elements to the right, updating the OR, then try shrinking window from the left as much as possible while maintaining OR ≥ k.

- **Challenge:**  
  - Cannot efficiently "remove" an element's contribution to bytewise OR when moving left pointer.
  - Solution: Use a bit counter (`cnt`):  
    - For each element added to window, increment count for each set bit.  
    - When removing, decrement; recalculate OR using `cnt`.
  - This lets us efficiently compute current subwindow's OR as left pointer increases.

- **Trade-offs:**  
  - Slight constant-factor overhead for maintaining the bit counts.
  - Time complexity is O(n × 30), as for each index, we may count up to 30 bits.

### Corner cases to consider  
- Array length = 1.
- Array contains zeros only and k > 0 (no valid subarray).
- k = 0 (shortest subarray is always length 1).
- All elements already ≥ k.
- Very large values (near 10⁹).

### Solution

```python
def shortest_subarray_with_or_at_least_k(nums, k):
    n = len(nums)
    ans = n + 1  # Impossible initial value
    left = 0
    cnt = [0] * 32  # Bit counters for each position
    curr_or = 0

    for right, val in enumerate(nums):
        # Add current element to the OR (and bit count)
        curr_or |= val
        for b in range(32):
            if (val >> b) & 1:
                cnt[b] += 1

        # Try to shrink left pointer while OR of window >= k
        while left <= right and curr_or >= k:
            ans = min(ans, right - left + 1)
            # Remove nums[left] from OR (update bit counter)
            for b in range(32):
                if (nums[left] >> b) & 1:
                    cnt[b] -= 1
            left += 1
            # Recalculate OR after removal
            temp_or = 0
            for b in range(32):
                if cnt[b]:
                    temp_or |= (1 << b)
            curr_or = temp_or

    return -1 if ans > n else ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 32) = O(n). For each window movement, updating the bit counters takes O(32), and each element enters and leaves the window once.
- **Space Complexity:** O(32) = O(1). All extra space is the size-32 counter array; input remains O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contains negative integers?  
  *Hint: How does bitwise OR behave with negatives?*

- Can this solution be made faster if only one bit may be set in numbers?  
  *Hint: Does single-bit simplify computation?*

- How would you solve if we asked for the **longest** subarray?  
  *Hint: What changes in window expansion/contraction logic?*

### Summary
This problem uses the **sliding window** technique in combination with **bit manipulation** and a per-bit count array, a pattern useful for problems where we want to efficiently maintain a window over the array with certain bitwise properties.  
Patterns like this apply to bitwise AND window problems, or other monotonic aggregation in subarrays.