### Leetcode 1674 (Medium): Minimum Moves to Make Array Complementary [Practice](https://leetcode.com/problems/minimum-moves-to-make-array-complementary)

### Description  
Given an integer array **nums** of even length \( n \) and an integer **limit**, you can **replace any element** with any integer between 1 and limit (inclusive) in a single move.  
An array is **complementary** if for every index \( i \), \( nums[i] + nums[n-1-i] \) is the same for all \( i \).  
Return the **minimum number of moves** required to make **nums** complementary.

### Examples  

**Example 1:**  
Input: `nums = [1,2,4,3], limit = 4`  
Output: `1`  
*Explanation: Change the 4 to 2. Now the array is `[1,2,2,3]`. For all i: nums[i] + nums[n-1-i] = 1+3 = 2+2 = 4. Only one move needed.*

**Example 2:**  
Input: `nums = [1,2,2,1], limit = 2`  
Output: `2`  
*Explanation: There are only two possible pairs (1,1) and (2,2), so we have to change both 2’s to 1 (or both 1’s to 2) to get sums that match. Two moves needed.*

**Example 3:**  
Input: `nums = [1,2,1,2], limit = 2`  
Output: `0`  
*Explanation: Pairs are already complementary: 1+2 = 2+1 = 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - Try all possible sum targets (from 2 to 2×limit).
  - For every possible sum, count how many changes needed for every pair in the array to reach that sum.
  - This is \( O(n \times limit) \), which is too slow when n and limit are large.

- **Optimized approach:**  
  - For each pair (nums[i], nums[n-1-i]), evaluate:
    - 0 moves needed if their sum equals target.
    - 1 move needed if changing either one can reach the target sum within [1, limit].
    - 2 moves needed otherwise.
  - Use a **difference array** technique to efficiently summarize for all possible sums the total number of moves, using range updates.
    - For each pair, track where transitions between 2, 1, and 0 moves happen as the sum changes.
    - Process all pairs in O(n) time and O(limit) space, accumulate changes for every possible target sum, and get the minimal move count.
  - This is far more efficient and fits the constraints.

### Corner cases to consider  
- Array is already complementary (returns 0).
- All elements are identical.
- Array size is minimum (n = 2).
- Pairs with maximum/minimum values (1 or limit).
- Large limit, small n (or vice versa).
- Elements needing both increases and decreases to reach the target sum.

### Solution

```python
def minMoves(nums, limit):
    n = len(nums)
    d = [0] * (2 * limit + 2)  # difference array for possible sums

    for i in range(n // 2):
        a, b = nums[i], nums[n-1-i]
        
        low = 1 + min(a, b)
        high = limit + max(a, b)
        pair_sum = a + b

        # 2 moves for everything
        d[2] += 2

        # -1 move when sum in [low, pair_sum) => only 1 move needed
        d[low] -= 1
        # -1 more move at exact sum (only 0 moves needed)
        d[pair_sum] -= 1
        # +1 move when sum in (pair_sum, high] done (undo previous minus)
        d[pair_sum + 1] += 1
        d[high + 1] += 1

    curr = 0
    res = float('inf')
    for s in range(2, 2 * limit + 1):
        curr += d[s]
        res = min(res, curr)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + limit)
  - Each pair in O(1) (n//2 pairs). Processing sum range in O(2×limit).
- **Space Complexity:** O(limit)
  - The difference array uses 2×limit+2 space.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if **nums** has odd length?
  *Hint: Can every element be paired? How does unpaired middle element affect the sum?*

- What if we could only change at most **k moves**? How do we check if it’s possible?
  *Hint: Use the computed ranges to find if any sum requires ≤ k moves.*

- What if the allowed replacement range for each element in nums[i] is different?
  *Hint: Your range for each pair becomes specific; adapt the delta array window for each pair's possible contributions.*

### Summary
This problem is a classic case for the **prefix sum/difference array** pattern, which lets us compute the impact of bulk operations across a range. The difference array strategy is highly efficient whenever the brute-force would be quadratic due to iterating possible targets and checking costs for each. This pattern is common for range-update/range-query or frequency analysis scenarios.