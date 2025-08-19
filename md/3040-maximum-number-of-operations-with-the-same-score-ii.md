### Leetcode 3040 (Medium): Maximum Number of Operations With the Same Score II [Practice](https://leetcode.com/problems/maximum-number-of-operations-with-the-same-score-ii)

### Description  
Given an array `nums`, you can repeatedly remove **either** the first two elements, the last two elements, or the first and last element. Each removal's **score** is the sum of the two removed numbers. The key condition is: **all operations performed must have the same score**.  
Your task: **Return the maximum number of such operations you can perform** on the array.

### Examples  

**Example 1:**  
Input: `nums = [3,2,1,2,3,4]`  
Output: `3`  
*Explanation:*
- Remove first two: 3 + 2 = 5, nums = [1,2,3,4]
- Remove first and last: 1 + 4 = 5, nums = [2,3]
- Remove first and last: 2 + 3 = 5, nums = []
All operations used score 5.

**Example 2:**  
Input: `nums = [3,2,6,1,4]`  
Output: `2`  
*Explanation:*
- Remove first two: 3 + 2 = 5, nums = [6,1,4]
- Remove last two: 1 + 4 = 5, nums = 
No more possible, both operations used score 5.

**Example 3:**  
Input: `nums = [1,1,1,1]`  
Output: `2`  
*Explanation:*
- Remove first two: 1 + 1 = 2, nums = [1,1]
- Remove first two: 1 + 1 = 2, nums = []
All operations used score 2.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible choices at each step, but for every operation, ensure all performed operations so far have the *same* score. Restart for each possible initial operation, tracking the chosen score.
- **Observations:** At each step, you can ONLY pick the two ends or the two at the same end. The score must remain constant during ALL operations.
- **State:** The key state is the subarray (`left`, `right` indices), and how many moves you made with the current target score for removals.
- **DP Approach:** For each possible initial pair (first two, last two, first+last), set its score as the current target, then recursively try removing pairs that yield the same score, using DP/memoization to avoid redundant recalculation.
- **Optimization:** Memoize on (left, right, target score). Try all three options at each step if available (first two, last two, first+last), but continue **only** if the score matches the target.
- **Trade-offs:** Full DP is needed due to 2000-size input. Time bounds are \(O(n^2)\) times small constant (3 branches), fits within reasonable time.

### Corner cases to consider  
- Array of length 2: Only one operation possible.
- All numbers equal: Many ways to remove, all pairs will have same score.
- Array where no more than one operation can be performed with any target score.
- Odd vs even length arrays.
- Cases where optimal answer comes from NOT removing the first available pair.

### Solution

```python
def maxOperations(nums):
    n = len(nums)
    from functools import lru_cache

    # Try starting by removing either the first two, last two, or first+last.
    # For each, call recursive DP for remainder. Memoize on (l, r, score).
    @lru_cache(maxsize=None)
    def dp(l, r, score):
        if r - l + 1 < 2:
            return 0
        res = 0
        # Remove first two
        if l + 1 <= r and nums[l] + nums[l+1] == score:
            res = max(res, 1 + dp(l+2, r, score))
        # Remove last two
        if r - 1 >= l and nums[r-1] + nums[r] == score:
            res = max(res, 1 + dp(l, r-2, score))
        # Remove first and last
        if l < r and nums[l] + nums[r] == score:
            res = max(res, 1 + dp(l+1, r-1, score))
        return res

    ans = 0
    if n >= 2:
        # Try all three starting choices, record their scores and recurse.
        ans = max(ans, 1 + dp(2, n-1, nums[0] + nums[1]))
        ans = max(ans, 1 + dp(0, n-3, nums[n-2] + nums[n-1]))
        ans = max(ans, 1 + dp(1, n-2, nums[0] + nums[n-1]))
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). There are O(n²) possible (l, r) subarrays and O(sum of possible scores), but since score range is capped by input constraint (max sum 2000), this is manageable.
- **Space Complexity:** O(n²) for DP/memoization storage, plus recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt your solution if you could remove **any** two elements, not just from ends?
  *Hint: Think about needing to sort, or the combinatorics of all pairs and constraints.*

- What if instead of matching scores, each operation needed to **increase** the score?
  *Hint: Consider tracking max so far, and pruning the branches accordingly.*

- How would you solve this without recursion/DP, maybe greedily?
  *Hint: Is there a greedy choice or does it fail? Try counterexamples.*

### Summary
This problem is classic **DP on intervals** with constraints, requiring tracking choices and the state (current ends and score). The DP pattern (intervals, memoization) is common in range-removal, "burst balloons", or "palindromic substring" style problems. The approach generalizes to any problem where the result depends on previous stateful operations with constraints.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Memoization(#memoization)

### Similar Problems
