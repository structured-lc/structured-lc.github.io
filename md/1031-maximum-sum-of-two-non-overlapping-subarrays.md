### Leetcode 1031 (Medium): Maximum Sum of Two Non-Overlapping Subarrays [Practice](https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays)

### Description  
Given an array of integers (`nums`) and two integers `firstLen` and `secondLen`, your task is to find the **maximum possible sum** of two non-overlapping (contiguous) subarrays in `nums`, where one has length `firstLen` and the other has length `secondLen`. The two subarrays can appear in any order (firstLen before secondLen or vice versa), but they must not overlap at all.

### Examples  

**Example 1:**  
Input: `A = [0,6,5,2,2,5,1,9,4], L = 1, M = 2`  
Output: `20`  
*Explanation: Choose  (length=1) and [6,5] (length=2). Their sum is 9+6+5=20.*

**Example 2:**  
Input: `A = [3,8,1,3,2,1,8,9,0], L = 3, M = 2`  
Output: `29`  
*Explanation: Choose [3,8,1] (length=3) and [8,9] (length=2). 3+8+1+8+9 = 29.*

**Example 3:**  
Input: `A = [2,1,5,6,0,9,5,0,3,8], L = 4, M = 3`  
Output: `31`  
*Explanation: Choose [5,6,0,9] (length=4) and [3,8] (length=3). 5+6+0+9+3+8 = 31.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:** Try every possible position for the firstLen subarray. For each, try every possible non-overlapping position for the secondLen subarray. Track the max sum found. This is O(n²), so too slow for large arrays.
- **Optimize:** Since we're looking for max *non-overlapping* sums, a key observation is that for each possible end index of one window, it's useful to know the *maximum sum* of the *other window* that doesn't overlap with it.
- **Efficient plan:**  
  - Use **prefix sums** to compute window sums efficiently.
  - Scan left-to-right: for each position where a secondLen window ends, keep track of the maximum sum of all possible firstLen windows that came *before* (non-overlapping). Add the two for potential answer.
  - Do the reverse: scan right-to-left as well, in case the second window comes before the first.
  - The final answer is the best among all these possibilities.
- **Trade-offs:** This method is O(n), only needs few passes, and is easy to code and reason about.

### Corner cases to consider  
- Arrays shorter than firstLen + secondLen (impossible to fit both windows)
- firstLen or secondLen = 0 or negative (should not happen by constraints)
- All zeros or negative/positive numbers
- firstLen or secondLen = 1 (windows of length 1)
- Overlapping windows: must skip these when summing

### Solution

```python
def maxSumTwoNoOverlap(nums, firstLen, secondLen):
    # Helper to find max total with the two windows in a given order
    def maxSum(L, M):
        # rolling maximum sum of L-length window to the left of current M-window
        sumL, maxL = sum(nums[:L]), sum(nums[:L])
        sumM = sum(nums[L:L+M])
        result = maxL + sumM
        # i: right end of current M window
        for i in range(L+M, len(nums)):
            # Slide L window 1 to right
            sumL += nums[i-M] - nums[i-M-L]
            maxL = max(maxL, sumL)
            # Slide M window 1 to right
            sumM += nums[i] - nums[i-M]
            result = max(result, maxL + sumM)
        return result
    
    # Try both orders: firstLen before secondLen, and flipped
    return max(maxSum(firstLen, secondLen), maxSum(secondLen, firstLen))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we scan through the array a constant number of times with fixed-size sliding windows.
- **Space Complexity:** O(1) extra (apart from inputs), as we only use a few variables and rolling sums.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to find three or more non-overlapping subarrays of specified lengths?
  *Hint: Try extending the rolling max idea, possibly with DP for K partitions.*

- Can you generalize to non-contiguous subarrays?
  *Hint: This becomes a different DP problem; for non-contiguous, consider maximum subsequence sums, not intervals.*

- What if elements can be negative? Does the algorithm change?
  *Hint: No, the method works the same, since negative numbers are handled by rolling max.*

### Summary
The approach is a **two-pass sliding window** combined with prefix sums and rolling maximums. It’s a variation of the “Maximum Subarray” (Kadane) and “Sliding Window” coding patterns, adapted for use with non-overlapping windows. This kind of handling is frequently used when combining fixed-interval optimizations on arrays (see also: “Maximum Sum of 3 Non-Overlapping Subarrays”, “Best Time to Buy and Sell Stock III”).

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window)

### Similar Problems
