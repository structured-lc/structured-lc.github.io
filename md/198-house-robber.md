### Leetcode 198 (Medium): House Robber [Practice](https://leetcode.com/problems/house-robber)

### Description  
You are a professional robber planning to rob houses along a street. Each house has some money stashed, but you cannot rob two adjacent houses because their security systems are connected—robbing two consecutive houses will trigger an alarm. Given an integer array `nums` where each element represents the money in a house, find the **maximum amount of money you can rob** without alerting the police.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,1]`  
Output: `4`  
*Explanation: Rob the 1st and 3rd houses (1 + 3 = 4). Robbing adjacent houses is not allowed, so [2, 3] or [2, 1] is not possible.*

**Example 2:**  
Input: `nums = [2,7,9,3,1]`  
Output: `12`  
*Explanation: Rob the 1st, 3rd, and 5th houses (2 + 9 + 1 = 12). Any other combination, like (7 + 3 + 1) = 11, is smaller.*

**Example 3:**  
Input: `nums = [1,1,1]`  
Output: `2`  
*Explanation: Rob 1st and 3rd houses, total = 1 + 1 = 2. Any two adjacent houses would trigger the alarm.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force approach:** Consider every subset of the houses where no two adjacent houses are chosen. This would mean trying all combinations recursively. The time complexity would be **O(2ⁿ)**, not feasible for large `n`.
- **Recursive DP:** For each house `i`, you decide:  
    - Rob it? Then you must skip house `i-1` and take the answer till `i-2`.  
    - Skip it? Then your answer is the maximum till `i-1`.  
  This leads to the formula: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`
- **Iterative DP:** Use the above formula iteratively, which reduces time to **O(n)** and can be further improved to **O(1)** space since only the previous two values are needed.
- **Why final approach?**  
  - The iterative DP is chosen for its simplicity and efficiency.
  - No need for recursion stack or a complete DP array.

### Corner cases to consider  
- Empty array: Should return `0`.
- Only one house: Rob it.
- All houses have zero money.
- All amounts are the same.
- Two houses: Rob the max of the two.
- Large input sizes.

### Solution

```python
def rob(nums):
    # Edge case: empty array
    if not nums:
        return 0
    n = len(nums)
    # Edge cases: 1 or 2 houses
    if n == 1:
        return nums[0]
    if n == 2:
        return max(nums[0], nums[1])

    # prev1: max money till i-1
    # prev2: max money till i-2
    prev2 = nums[0]
    prev1 = max(nums[0], nums[1])
    for i in range(2, n):
        curr = max(prev1, prev2 + nums[i])
        prev2 = prev1
        prev1 = curr
    return prev1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), with `n` being the length of `nums`, since we scan the list once.
- **Space Complexity:** O(1), because we track only two previous states, not the entire DP array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if houses are arranged in a circle (first and last are adjacent)?
  *Hint: Try splitting into two linear cases, excluding either the first or last house (see "House Robber II").*

- What if you also want to list which houses are robbed?
  *Hint: Track choices with a backtracking or auxiliary array.*

- What about negative or non-integer values?
  *Hint: Adjust input constraints or explain why it's not supported.*

### Summary
This problem is a classic example of the **dynamic programming** pattern called "maximum sum of non-adjacent elements." The approach only needs to keep track of the last two best solutions, using the `max` function to determine whether to rob a house or skip it. This same underlying pattern appears in variants like "House Robber II" (circle) and some stock trading problems.