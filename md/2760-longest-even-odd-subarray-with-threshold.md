### Leetcode 2760 (Easy): Longest Even Odd Subarray With Threshold [Practice](https://leetcode.com/problems/longest-even-odd-subarray-with-threshold)

### Description  
Given an integer array **nums** and an integer **threshold**, return the length of the longest contiguous subarray that starts with an even number, alternates parity (even, odd, even, ...), and every number is ≤ threshold.  
In other words:  
- The subarray begins with an even number.
- Every consecutive number alternates: even/odd/even/odd, etc.
- Every subarray element ≤ threshold.
- Output is the length of the longest such subarray.


### Examples  

**Example 1:**  
Input: `nums = [3, 2, 5, 4], threshold = 5`  
Output: `3`  
*Explanation: Start at index 1 (`2`), [2, 5, 4]. 2 (even), 5 (odd), 4 (even), all ≤ 5, and alternating. Length is 3.*

**Example 2:**  
Input: `nums = [1, 2], threshold = 2`  
Output: `1`  
*Explanation: Only possible "valid" subarray is [2] (starts with even, alternates, and ≤ 2).*

**Example 3:**  
Input: `nums = [2, 4, 6], threshold = 3`  
Output: `1`  
*Explanation: Only [2] is valid, as 4 and 6 are > 3. So length is 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** For every index, if `nums[i]` is even and ≤ threshold, expand to the right checking alternation and threshold. Keep max length found. O(n²) due to nested loop for each possible start.
- **Optimize:** There’s redundancy in re-checking portions. Use two pointers or a single pass.  
  - Iterate from left to right. For each starting index where nums[i] is even and ≤ threshold:
    - Extend as long as alternation and threshold constraints hold.
    - Update global maximum length.
  - Early exit: If at any index the element isn’t even or > threshold, skip to next index directly.
- **Even better:** Only need a single pointer; as we scan, maintain a current valid window, and if broken, reset start.

- **Final Approach:**  
  - Loop over all possible starts (`i`), but only if nums[i] is even and ≤ threshold.  
  - For each such start, extend `j` as long as parity alternates AND every nums[j] ≤ threshold.
  - Keep track of the max.

### Corner cases to consider  
- Array of all odd numbers, or all elements > threshold → output `0`.
- Only one element, which might be valid (even and ≤ threshold) or not.
- All numbers are ≤ threshold and alternate perfectly.
- Subarrays at the end of nums.
- Large input arrays.
- nums is not even.
- Multiple disjoint valid subarrays of same max length.

### Solution

```python
def longestAlternatingSubarray(nums, threshold):
    n = len(nums)
    maxlen = 0

    i = 0
    while i < n:
        # only start if nums[i] is even and ≤ threshold
        if nums[i] % 2 == 0 and nums[i] <= threshold:
            curr_len = 1
            prev = nums[i]
            # try extend as much as possible
            for j in range(i + 1, n):
                # check threshold and alternation
                if nums[j] > threshold:
                    break
                if nums[j] % 2 == prev % 2:
                    break
                curr_len += 1
                prev = nums[j]
            maxlen = max(maxlen, curr_len)
        i += 1

    return maxlen
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in worst case. For every i, we could "expand" up to n times. Although on average much better, for worst cases with all alternating values ≤ threshold, O(n²) expansion arises.
- **Space Complexity:** O(1). No extra data structures; just variables for counters and indexes.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reduce the time complexity?
  *Hint: Is it necessary to restart the search at every index, or can you slide a window efficiently?*

- How would you handle very large datasets or need to return all subarrays, not just the longest length?
  *Hint: Consider efficient two-pointer or sliding window techniques.*

- Could you generalize this method for k different parities or value transitions, instead of just even/odd?
  *Hint: What would change for more complex patterns of constraints?*

### Summary
This problem uses the **window expansion** (a variant of the brute-force + greedy one-pass), checking all possible starts that meet constraints and expanding as much as possible to find the longest "alternating" subarray. A classic application of **window scanning** for subarray problems under strict element/position constraints. This approach often appears in "longest XXX subarray" LeetCode-style problems and helps build intuition for sliding-window and greedy analysis.


### Flashcard
For each valid starting position (even and ≤ threshold), extend right while maintaining alternation and threshold constraints.

### Tags
Array(#array), Sliding Window(#sliding-window)

### Similar Problems
