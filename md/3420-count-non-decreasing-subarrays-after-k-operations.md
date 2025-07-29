### Leetcode 3420 (Hard): Count Non-Decreasing Subarrays After K Operations [Practice](https://leetcode.com/problems/count-non-decreasing-subarrays-after-k-operations)

### Description  
Given an integer array **nums** of length n, and an integer **k**:  
For every possible subarray, you can perform up to k operations *on that subarray*, where each operation allows you to increment *any* element of the subarray by 1.  
Count how many subarrays can be made **non-decreasing** (each next element ≥ previous) after at most k such operations (per subarray).

*In essence: for each subarray, you have k increments—use them however you like—to try to make it non-decreasing. For each subarray, independently count if this is possible.*

### Examples  

**Example 1:**  
Input: `nums = [1,2,1], k = 1`  
Output: `5`  
Explanation:  
- Subarrays `[1]`, `[2]`, `[1]` (all length 1): already non-decreasing.
- Subarray `[1,2]`: already non-decreasing.
- Subarray `[2,1]`: need to increment `1` in `[2,1]` to `2`; uses 1 operation (ok).  
- Subarray `[1,2,1]`: needs to increment the last `1` twice to at least `2` (`[1,2,1]`→`[1,2,3]` needs 2 ops), which exceeds k=1, so **cannot**.

Final count: 5.

**Example 2:**  
Input: `nums = [6,3,1,2,4,4], k = 7`  
Output: `17`  
Explanation:  
All subarrays except `[6,3,1]`, `[6,3,1,2]`, `[6,3,1,2,4]`, `[6,3,1,2,4,4]` can be made non-decreasing within 7 operations.

**Example 3:**  
Input: `nums = [1,1,1], k = 0`  
Output: `6`  
Explanation:  
All subarrays are already non-decreasing, and no operation is needed as k=0.

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  For each subarray (O(n²)), count the minimum operations needed to make it non-decreasing by simulating the increments.  
  For each subarray `[l..r]`:  
    - Set cur = nums[l];  
    - For each position i from l+1 to r: if nums[i] < cur, increment to cur (cost += cur - nums[i]);  
    - At each step, cur = max(cur, nums[i]) (to ensure non-decreasing).  
    - If total cost ≤ k, count subarray.

  This is O(n³): O(n²) subarrays × O(n) to compute needed operations for each subarray.

- **Optimized Approach:**  
  We need to efficiently compute how many subarrays can be made non-decreasing with at most k operations.
  - Think sliding window with two pointers.  
  - For each left, expand right as far as possible so that the *minimum* number of operations needed for [left, right] ≤ k.

  Key idea:
  - As you expand right, keep track of how many operations are needed to make [left, right] non-decreasing.
  - To efficiently calculate, the main expense is whenever a number decreases relative to its left—those are the increments needed.

  There are several advanced ways (monotonic deque, greedy), but the common optimal is O(n):
  - Iterate from right to left, use a **monotonic deque** to efficiently track where increments are needed and how much cost they comprise.
  - For each left, move the right pointer as far as operations permit, and count that window.

### Corner cases to consider  
- Empty array (trivial, 0)
- All elements equal
- Array of length 1
- k = 0  
- k large, e.g., all decrements can be compensated
- Array strictly increasing or strictly decreasing
- Negative numbers, zeros

### Solution

```python
def countNonDecreasingSubarrays(nums, k):
    # Sliding window with monotonic deque.
    n = len(nums)
    res = 0
    cost = 0
    from collections import deque

    dq = deque()
    right = n - 1

    # Traverse left pointer from rightmost to leftmost
    for left in range(n - 1, -1, -1):
        # Maintain the deque for non-increasing order from left
        while dq and nums[dq[-1]] < nums[left]:
            last = dq.pop()
            next_idx = dq[-1] if dq else right
            cost += (next_idx - last + 1) * (nums[left] - nums[last])
        dq.append(left)

        while cost > k:
            # Move right to left, shrink window, remove cost
            if dq[0] == right:
                dq.popleft()
            cost -= nums[dq[0]] - nums[right]
            right -= 1

        res += right - left + 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each element is pushed/popped from the deque at most once, and left/right pointers together process O(n) moves.
- **Space Complexity:** O(n), for the deque in the worst case (all elements decreasing).


### Potential follow-up questions (as if you’re the interviewer)  

- How do you handle negative numbers or zeros?  
  *Hint: Test edge cases with negatives; does the logic/monotonicity hold?*

- Can this approach be adapted for strictly increasing subarrays?  
  *Hint: Adjust the inequality check in increment logic.*

- What if each operation can increment by any amount (not just +1)?  
  *Hint: Greedy jump to needed value in one step, reduces to a different cost formula.*

### Summary
This problem uses an **advanced sliding window with monotonic deque/prefix cost** pattern to hit O(n) for counting subarrays that can be made non-decreasing under a global constraint.  
It generalizes well to "minimum operations for monotonic subarrays" and demonstrates the power of careful two pointers plus hierarchy tracking (monotonic structures).  
This pattern appears in certain DP optimizations and range query situations (range non-decreasing, min increments/subarray cost).