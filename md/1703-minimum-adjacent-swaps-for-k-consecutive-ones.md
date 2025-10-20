### Leetcode 1703 (Hard): Minimum Adjacent Swaps for K Consecutive Ones [Practice](https://leetcode.com/problems/minimum-adjacent-swaps-for-k-consecutive-ones)

### Description  
Given a binary array `nums` (containing only 0’s and 1’s) and an integer `k`, find the minimum number of **adjacent swaps** needed so that there are `k` consecutive 1’s somewhere in the array.  
In each move, only two adjacent elements can be swapped.

### Examples  

**Example 1:**  
Input: `nums = [1,0,0,1,0,1]`, `k = 2`  
Output: `1`  
*Explanation: We can move the last 1 to the right of the middle 1: [1,0,0,0,1,1]. Only 1 move is needed for two consecutive 1’s.*

**Example 2:**  
Input: `nums = [1,0,0,0,0,0,1,1]`, `k = 3`  
Output: `5`  
*Explanation: Move the leftmost 1 rightwards in 5 adjacent swaps: [0,0,0,0,0,1,1,1].*

**Example 3:**  
Input: `nums = [1,1,0,1]`, `k = 2`  
Output: `0`  
*Explanation: [1,1,0,1] already contains 2 consecutive 1’s.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try all possible subarrays of length `k`, and for each, calculate how many swaps are needed to group `k` 1’s at that place. However, this would be too slow (O(n² \* k)).

- **Optimized thinking:**  
  1. Only positions of 1’s matter; their relative distances influence swaps.
  2. Gather indices where nums[i] = 1 into a list `ones`. E.g. for [1,0,0,1,0,1], indices are [0, 3, 5].
  3. We want to select any group of k ones and try to put them into consecutive slots, so that their indices become consecutive positions (like x, x+1, ..., x+k-1).  
  4. **Key:** Number of swaps needed for a group of 1’s to be made consecutive is the sum of distances from their current positions to their desired, consecutive positions.
  5. To minimize moves, align k ones around the _median_ of their indices (because swaps are minimized when you gather numbers around their current center).
  6. Use a prefix sum for efficient calculation of moves for every possible window in the indices-of-ones array.

- **Algorithm:**  
  - Get positions of all 1's: `ones = [i for i, v in enumerate(nums) if v == 1]`
  - For each group of k ones, compute minimal moves if these are brought together.
  - For performance, precompute prefix sums of positions and, for each window, use prefix sums to get total moves to center.
  - To correct for “overlap” due to squished 1’s, subtract moves as if the ones start out at position 0, 1, ..., k-1 and we align them at the center.

### Corner cases to consider  
- nums has exactly k ones, possibly already consecutive  
- All 1’s already grouped together somewhere, so zero moves  
- k = 1 (zero moves, as any single 1 counts)  
- nums has no 1’s (guaranteed to have at least k 1’s by the constraint)  
- nums is very large (need O(n) solution)  
- 1’s at beginning/end  
- Multiple possible minimal-move windows

### Solution

```python
def minMoves(nums, k):
    # Gather indices of all 1's
    ones = []
    for idx, num in enumerate(nums):
        if num == 1:
            ones.append(idx)

    # Build prefix sum of indices for quick range sum queries
    pre = [0]
    for i in range(len(ones)):
        pre.append(pre[-1] + ones[i])

    # Helper to calculate cost for window ones[i : i+k]
    min_moves = float('inf')
    for i in range(len(ones) - k + 1):
        mid = i + k // 2
        # Left/Right: positions up to and after the median
        left = pre[mid] - pre[i]  # sum of first ⌊k/2⌋ elements
        right = pre[i+k] - pre[mid+1]  # sum of last ⌊k/2⌋ elements

        # The desired positions are centered at the median
        left_cnt = mid - i
        right_cnt = i + k - 1 - mid

        moves = (ones[mid] * left_cnt - left) + (right - ones[mid] * right_cnt)
        
        # Since adjacent swaps, need to subtract offset due to compressing 1's into single block:
        # For the k 1's, their "target positions" are consecutive, so in total, moves are
        #    above_cost - offset, where offset = sum_{j=1}^{k/2} j
        # That is, moves = cost - (1+2+...+⌊k/2⌋)
        offset = 0
        if k % 2 == 1:
            offset = (left_cnt * (left_cnt + 1)) // 2 + (right_cnt * (right_cnt + 1)) // 2
        else:
            offset = (left_cnt * (left_cnt + 1)) // 2 + (right_cnt * (right_cnt + 1)) // 2

        min_moves = min(min_moves, moves - offset)

    return min_moves
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we loop through nums once to extract positions, and through at most O(n) windows for k, each O(1) via prefix sums.
- **Space Complexity:** O(n), as we store at most n positions of 1’s and prefix sums.

### Potential follow-up questions (as if you’re the interviewer)  

- **If swaps were not restricted to adjacent elements, how would the answer change?**  
  *Hint: You could just move each 1 directly to its final desired spot, so use absolute position differences.*

- **How would you handle the case if you can swap any element with any other (not just adjacent)?**  
  *Hint: Greedy matching, sort indices of 1’s and assign to consecutive positions.*

- **What if nums contained other numbers besides 0 and 1?**  
  *Hint: The grouping logic changes; perhaps focus on some new grouping property.*

### Summary
The approach efficiently finds the minimal adjacent swaps needed by focusing on the positions of the 1’s, using the sliding window and prefix sum technique. This “group 1s with minimum moves” pattern recurs in various hard problems dealing with grouping or rearrangement under local-move constraints, such as “minimum number of adjacent swaps for K consecutive characters,” or “minimum window operations.” It’s a classic greedy + prefix sum + sliding window optimization.


### Flashcard
Collect indices of all 1's; for each window of k consecutive 1's, calculate swaps needed to center them—minimum over all windows is the answer.

### Tags
Array(#array), Greedy(#greedy), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Minimum Swaps to Group All 1's Together(minimum-swaps-to-group-all-1s-together) (Medium)
- Minimum Number of Operations to Make Array Continuous(minimum-number-of-operations-to-make-array-continuous) (Hard)
- Minimum Adjacent Swaps to Make a Valid Array(minimum-adjacent-swaps-to-make-a-valid-array) (Medium)