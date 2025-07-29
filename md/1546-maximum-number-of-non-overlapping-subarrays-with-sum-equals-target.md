### Leetcode 1546 (Medium): Maximum Number of Non-Overlapping Subarrays With Sum Equals Target [Practice](https://leetcode.com/problems/maximum-number-of-non-overlapping-subarrays-with-sum-equals-target)

### Description  
Given an array of integers `nums` and an integer `target`, return the **maximum number of non-empty non-overlapping subarrays** such that the sum of values in each subarray is equal to `target`. Subarrays must not overlap, and you want to count as many such intervals as possible.

### Examples  

**Example 1:**  
Input: `nums = [1,1,1,1,1]`, `target = 2`  
Output: `2`  
*Explanation: We can form 2 non-overlapping subarrays [1,1] and [1,1], each summing to 2. The last single '1' is left out.*

**Example 2:**  
Input: `nums = [-1,3,5,1,4,2,-9]`, `target = 6`  
Output: `2`  
*Explanation: Three options sum to 6: [5,1], [4,2], and [3,5,1,4,2,-9]; but [5,1] and [4,2] are the largest set with no overlap.*

**Example 3:**  
Input: `nums = [0,0,0]`, `target = 0`  
Output: `3`  
*Explanation: Each , ,  is a valid non-overlapping subarray summing to 0.*

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to check for every possible subarray start and end: for each subarray, check if it sums to `target`, skip overlapping subarrays. This approach is too slow (O(n²)).

To optimize, we use **prefix sums** and a **greedy approach**:
- Keep a running cumulative sum. For each position, if (currentSum - target) exists in a set of previous cumulative sums, we found a subarray. After counting it, reset state so future subarrays don't overlap.
- This is efficient because every time we find a valid subarray, we "mark" that all previous prefix sums are non-overlapping, so we restart from the current position and don't allow overlap.

**Implementation:** Use a set to store prefix sums. On finding a valid sum, clear the set and restart. This gives O(n) time.

### Corner cases to consider  
- nums contains only zeros and target is 0 (e.g., [0, 0, 0], target=0)
- Negative numbers in nums
- No subarray sums to target
- Only one subarray sums to target (e.g., entire array)
- Overlapping possible, but you must skip overlaps
- Single element equals target
- Large input arrays (performance and memory)

### Solution

```python
# O(n) solution using prefix sums and a hash set.
def maxNonOverlapping(nums, target):
    count = 0        # Count of non-overlapping subarrays
    prefix_sum = 0   # Running sum
    seen = set([0])  # Prefix sums seen so far (reset upon finding a subarray)
    for num in nums:
        prefix_sum += num
        if (prefix_sum - target) in seen:
            count += 1
            prefix_sum = 0
            seen = set([0])  # Reset to only include 0 after a cut
        else:
            seen.add(prefix_sum)
    return count
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), as we iterate the nums array only once and each prefix sum insertion/check in the set is O(1) amortized.
- **Space Complexity:** O(n) in worst case for the prefix sums in seen set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return the actual subarrays, not just the count?  
  *Hint: Store start/end indices of partitions each time you cut.*

- How would you modify the solution if overlap was allowed?  
  *Hint: Brute-force or dynamic programming for maximum count, but logic changes.*

- What if target could change between subarrays (list of targets)?  
  *Hint: Avoid global reset, track state per possible target.*

### Summary
This approach uses prefix sum and hashing, a **classic non-overlapping subarray partitioning** pattern. The greedy strategy (resetting on each cut) is crucial for non-overlap. This coding pattern applies to other problems of summing up segments with constraints on overlap or uniqueness.