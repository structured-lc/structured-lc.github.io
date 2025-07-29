### Leetcode 3366 (Medium): Minimum Array Sum [Practice](https://leetcode.com/problems/minimum-array-sum)

### Description  
You are given an integer array **nums**, and three integers: **k**, **op1**, and **op2**.  
You can perform the following operations (at most once per index, each operation limited by op1 and op2 respectively):

- **Operation 1:** Divide nums[i] by 2, rounding up. This can be used at most **op1** times (max once per index).
- **Operation 2:** Subtract **k** from nums[i], if nums[i] ≥ k. This can be used at most **op2** times (max once per index).

Both ops can be used on the same index, but not more than once each. Find the minimum possible sum of nums after using these operations in any order on any elements.

### Examples  

**Example 1:**  
Input: `nums = [5,7], k = 3, op1 = 1, op2 = 1`  
Output: `6`  
*Explanation:  
- Apply op1 to 7: ceil(7/2) → 4, nums = [5,4]
- Apply op2 to 5: 5-3 → 2, nums = [2,4]
- Sum: 2+4 = 6 (Optimal)*

**Example 2:**  
Input: `nums = [8,2], k = 4, op1 = 1, op2 = 1`  
Output: `6`  
*Explanation:  
- Apply op2 to 8: 8-4 → 4, nums = [4,2]
- Apply op1 to 4: ceil(4/2) → 2, nums = [2,2]; sum: 2+2 = 4
- However, with one op1 allowed, optimal is sum 6 (by only applying one op).
- So, best is: only op2 on 8: [4,2] sum = 6.*

**Example 3:**  
Input: `nums = [1,1,1], k = 2, op1 = 1, op2 = 1`  
Output: `3`  
*Explanation:  
- Neither op can be used (nums[i] < k, op1/op2 insufficient).
- Return the sum as-is: 1+1+1 = 3.*

### Thought Process (as if you’re the interviewee)  
First, I’d consider brute-force: try every possible subset of indices for both operations within their op1/op2 limits, apply ops in all orderings, and take the sum. This is exponential.

We observe:
- Each op is used at most once per index, and with a global budget for each op.  
- Both ops can be used on an index (any order), or neither, or just one.

So, at each index, we have up to four choices:
1. **Apply neither.**
2. **Apply only op1.**
3. **Apply only op2** (if nums[i] ≥ k).
4. **Apply both** — can be in either order, but (since both only legal if nums[i] and/or divided value ≥ k), compute both variants.

Optimal substructure: for each index and a given count of op1/op2 used so far, keep the minimal sum up to that point. This fits dynamic programming.

Define dp[i][a][b] = minimal sum of nums[i:] using at most a op1 and b op2 left.  
At each step, try all valid op-applications and recurse. Use memoization to avoid recomputation.

This approach is tractable for small n (since n, op1, op2 ≤ 100-ish for this problem), and we never redo extra work.

### Corner cases to consider  
- Array is empty (`nums = []`), return 0.
- k = 0 (subtraction always legal, may subtract 0).
- op1/op2 = 0 (no allowed operations).
- nums[i] < k (op2 can’t be applied at some places).
- op1 or op2 exceed array length (don’t apply more than once per index).
- Large nums[i], small ops.

### Solution

```python
def minimumArraySum(nums, k, op1, op2):
    # Memoization: dp(index, op1_left, op2_left)
    from functools import lru_cache
    import math

    n = len(nums)

    @lru_cache(maxsize=None)
    def dp(i, o1, o2):
        if i == n:
            return 0  # sum beyond end is 0

        res = nums[i] + dp(i+1, o1, o2)  # Option 1: do nothing

        # Option 2: apply op1 if available
        if o1 > 0:
            divided = (nums[i]+1)//2
            res = min(res, divided + dp(i+1, o1-1, o2))

        # Option 3: apply op2 if available and nums[i] ≥ k
        if o2 > 0 and nums[i] >= k:
            sub_k = nums[i] - k
            res = min(res, sub_k + dp(i+1, o1, o2-1))

        # Option 4: apply op1 and then op2 (if possible)
        if o1 > 0 and o2 > 0:
            divided = (nums[i]+1)//2
            if divided >= k:
                both1 = divided - k
                res = min(res, both1 + dp(i+1, o1-1, o2-1))
            # Option 5: apply op2 then op1 (if possible)
            if nums[i] >= k:
                after_k = nums[i] - k
                divided2 = (after_k + 1)//2
                res = min(res, divided2 + dp(i+1, o1-1, o2-1))
        return res

    return dp(0, op1, op2)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For each state: index (n), op1 in 0..op1, op2 in 0..op2.  
  So, O(n × op1 × op2), since each state is visited once due to memoization.

- **Space Complexity:**  
  O(n × op1 × op2) for memoization table, plus recursion stack of up to n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if n is very large?
  *Hint: Could you use iterative DP or greedy strategy for specific parameter regimes?*

- What if operation 2 can be applied multiple times to the same index?
  *Hint: Model with unbounded knapsack-like or account for unlimited subtracts.*

- If only one operation is allowed per index (not both), how would you adapt?
  *Hint: Skip ‘do both’ cases in the DP transitions.*

### Summary
We use **DP with memoization**, capturing the state as (index, op1_left, op2_left) and trying all valid operations per position, always choosing the minimal outcome at each step.  
This is a common **bounded resource + state optimization** pattern—DP is critical because local greedy choices may not yield globally optimal sums.  
Similar DP patterns show up in limited-use operations, resource-constrained scheduling, or restricted state transitions in arrays.