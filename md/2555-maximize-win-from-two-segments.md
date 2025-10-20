### Leetcode 2555 (Medium): Maximize Win From Two Segments [Practice](https://leetcode.com/problems/maximize-win-from-two-segments)

### Description  
Given a sorted array **prizePositions** representing the locations of prizes on a number line, and an integer **k**, you can choose two segments of length **k** (possibly overlapping or adjacent) anywhere on the number line.  
Your goal is to select the positions of these two segments, so that the total number of prizes covered (possibly counting overlaps only once) is maximized.  
Each segment \([L, R]\) collects all prizes at positions between \(L\) and \(R\), with \(R - L \leq k\).  
Return the **maximum** number of unique prizes that can be collected by optimally choosing both segments.

### Examples  

**Example 1:**  
Input: `prizePositions = [1,1,2,2,3,3,5]`, `k = 2`  
Output: `7`  
*Explanation: Choose segments [1, 3] and [3, 5]. All 7 prizes (including overlapping positions) are covered.*

**Example 2:**  
Input: `prizePositions = [1,2,3,4]`, `k = 0`  
Output: `2`  
*Explanation: With k=0, each segment covers only prizes at a single spot. Two segments can each cover a unique prize, so the maximum is 2.*

**Example 3:**  
Input: `prizePositions = [1,2,4,5,6]`, `k = 1`  
Output: `4`  
*Explanation: The best is to pick [1,2] (covers 1,2) and [5,6] (covers 5,6), for a total of 4 prizes.*

### Thought Process (as if you’re the interviewee)  
- Brute-force: Try every possible pair of segments of size k, count the number of unique prizes covered. This is O(n²), which is too slow for large n.
- Observation: Since prizePositions is sorted, we can use sliding window to quickly compute how many prizes can be covered by a segment of length k anywhere.
- For each segment ending at index i, use two pointers to find the maximum prizes covered in [prizePositions[i]-k, prizePositions[i]]. Collect for all positions the best gain up to that index.
- For combining two segments: For each possible end of the 2ᵗʰ window, track the maximum number of prizes you could have gathered in a first segment ending before it.
- Main loop: For each i, choose one segment ending at i and combine it with the maximum value of a segment ending before the current window. Take care not to double-count prizes in overlapping windows.

There are two main patterns here:  
- **Sliding Window** to efficiently compute segment coverage  
- **Dynamic Programming / Prefix Maxima** to store optimal answers for one window, and use for the 2-window combination.

This reduces the complexity to O(n), which is suitable for large input.

### Corner cases to consider  
- Empty prizePositions list (edge).
- All prizes at the same position.
- k = 0 (segments can cover only a single position).
- n = 1 (one prize only).
- All prizes spaced more than k apart (so no overlap is possible).
- Large k (when one segment can cover all prizes).
- Duplicates in prizePositions (multiple prizes at the same position).

### Solution

```python
def maximizeWin(prizePositions, k):
    n = len(prizePositions)
    dp = [0] * n  # dp[i]: max prizes covered by a segment ending at or before i
    max_dp = [0] * n  # max_dp[i]: max of dp[0..i]
    
    left = 0
    for right in range(n):
        # Move left pointer so (prizePositions[right] - prizePositions[left] > k)
        while prizePositions[right] - prizePositions[left] > k:
            left += 1
        window = right - left + 1
        dp[right] = window
        max_dp[right] = window if right == 0 else max(max_dp[right-1], window)
    
    ans = max_dp[-1]  # handle the case with only one segment
    left = 0
    for right in range(n):
        # Find window [left, right] s.t. prizePositions[right] - prizePositions[left] <= k
        while prizePositions[right] - prizePositions[left] > k:
            left += 1
        window = right - left + 1
        # Combine: pick max_dp[left-1] if possible (first segment strictly before left)
        if left > 0:
            ans = max(ans, window + max_dp[left-1])
        else:
            ans = max(ans, window)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each pointer (left/right) traverses the array at most once, and all other operations are O(1).
- **Space Complexity:** O(n). Storing the dp and max_dp arrays of length n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you're allowed 3 or more segments?  
  *Hint: How would you extend your two-window logic to k-windows using DP?*

- What if segments must be non-overlapping?  
  *Hint: Update the combination logic to not select overlapping windows using two-pointer technique or binary search.*

- What if the input array prizePositions is not sorted?  
  *Hint: You'd have to sort it first, which is O(n log n).*

### Summary
This problem uses a **two-pointer sliding window** to efficiently compute window sizes and dynamic programming to combine two windowed results. The combination of the sliding window and prefix max is a common pattern for max-sum-of-k-intervals on a sorted sequence.  
This approach (sliding window + prefix max for intervals) is broadly useful in interval coverage and range query problems, like "Maximum Sum of Two Non-Overlapping Subarrays", and gives an efficient O(n) solution.


### Flashcard
Use sliding window to find max prizes in any segment of size k; then, for each segment, find the best non-overlapping segment.

### Tags
Array(#array), Binary Search(#binary-search), Sliding Window(#sliding-window)

### Similar Problems
- Best Time to Buy and Sell Stock III(best-time-to-buy-and-sell-stock-iii) (Hard)
- Two Best Non-Overlapping Events(two-best-non-overlapping-events) (Medium)