### Leetcode 416 (Medium): Partition Equal Subset Sum [Practice](https://leetcode.com/problems/partition-equal-subset-sum)

### Description  
Given an array of positive integers `nums`, determine if it can be split into two subsets such that the sum of both subsets is equal. In other words, is it possible to find a non-empty subset whose sum is exactly half of the total sum of the array? If so, return `True`, otherwise return `False`.  
- The partition does **not** need to be contiguous.  
- All numbers are positive integers.

### Examples  

**Example 1:**  
Input: `nums = [1,5,11,5]`  
Output: `True`  
*Explanation: Split into [1, 5, 5] and . Both sum to 11.*

**Example 2:**  
Input: `nums = [1,2,3,5]`  
Output: `False`  
*Explanation: Total = 11, so both subsets would need to sum to 5.5, which is impossible. No valid partition.*

**Example 3:**  
Input: `nums = [2,2,3,5]`  
Output: `False`  
*Explanation: Total = 12, target = 6. No subset of [2,2,3,5] sums to 6.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  Try every possible subset and see if any sums to exactly half the total. Inefficient — exponential in time (2ⁿ), infeasible for n up to 200.

- **Key insight:**  
  Need to determine if there is a subset that sums to target = total_sum // 2, and total_sum must be even. This is the classic "subset sum" problem, a variation of 0/1 knapsack.

- **Dynamic Programming (DP) optimization:**  
  Use a boolean DP array of size (target+1), where dp[i] indicates whether a subset sum of i is possible:
  - Base: dp = True (empty subset).
  - For each number, update dp from right to left.
  - For each x in nums, and for i from target down to x, set dp[i] |= dp[i-x].
  - Early exit: If dp[target] ever becomes True, we can return immediately.

- **Why use 1D DP:**  
  Since each number can only be used once, we traverse dp array from end to start to avoid reusing a number in the same round.

- **Final approach:**  
  Use 1D DP, with runtime O(n × target), and space O(target).

### Corner cases to consider  
- Array with only 1 element (cannot split into two non-empty).
- Even total sum, but no subset can reach half (e.g. [2,2,3,5]).
- All elements the same (e.g. [2,2,2,2]).
- Empty array (invalid input by constraints, but good to note).
- Large numbers near constraint limits.

### Solution

```python
def canPartition(nums):
    total = sum(nums)
    # If total sum is odd, can't partition
    if total % 2 != 0:
        return False
    target = total // 2
    n = len(nums)
    # dp[i]: can we get sum i from a subset so far?
    dp = [False] * (target + 1)
    dp[0] = True  # Base case: sum 0 is always possible
    for num in nums:
        # Traverse backwards so we don't reuse num in the same round
        for i in range(target, num - 1, -1):
            if dp[i - num]:
                dp[i] = True
        # Early stopping: if exact target found
        if dp[target]:
            return True
    return dp[target]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × target), where n = len(nums), target = total_sum // 2. Each number could potentially “touch” each value from target down to 0 once during DP.
- **Space Complexity:** O(target), using a single 1D DP array of length target + 1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers are allowed?  
  *Hint: Subset sum with negative numbers requires offsetting and possibly 2D DP, since sums can be negative.*

- What if instead of equal sum, we want minimal possible absolute difference?  
  *Hint: This is the classic subset sum variant aiming for closest partition, also solved with DP by tracking all possible sums.*

- Can you reconstruct the subsets themselves, not just return True/False?  
  *Hint: Backtrack using the DP table, or memoize parent choices to retrieve the subset elements.*

### Summary
The core insight is recognizing **Partition Equal Subset Sum** as a Subset Sum (0/1 Knapsack) problem. The 1D DP technique for space-optimized subset sum (using the pattern `for i in range(target, num-1, -1)`) is very common, and the same pattern applies to other problems like:
- Can subset form certain sum (target sum)?
- Find closest partition of difference
- Backpack (knapsack) with weights/values (introduced with extra DP dimensions)

Recognizing problem reduction to subset sum and exploiting target-oriented state DP is a key dynamic programming tactic.