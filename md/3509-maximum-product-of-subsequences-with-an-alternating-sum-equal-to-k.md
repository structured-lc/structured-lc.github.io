### Leetcode 3509 (Hard): Maximum Product of Subsequences With an Alternating Sum Equal to K [Practice](https://leetcode.com/problems/maximum-product-of-subsequences-with-an-alternating-sum-equal-to-k)

### Description  
Given an integer array **nums**, and integers **k** and **limit**, find the **non-empty subsequence** of nums with:
- **Alternating sum** equal to k, where the alternating sum for subsequence `[a₀, a₁, a₂, ..., aₙ]` is `a₀ - a₁ + a₂ - a₃ + ...`.
- **Product** of selected numbers does not exceed **limit**.
Return the **maximum product** among all such valid subsequences. If no such subsequence exists, return `-1`.

### Examples  

**Example 1:**  
Input: `nums = [2,3,4], k = 1, limit = 24`  
Output: `12`  
*Explanation: Subsequences:*
- `[3,2]`: 3 - 2 = 1, product = 3 × 2 = 6
- `[4,3,2]`: 4 - 3 + 2 = 3; different sum, not used
- `[4,2]`: 4 - 2 = 2; doesn't match k
- `[4,3]`: 4 - 3 = 1, product = 4 × 3 = 12  
Highest valid product is `12`.

**Example 2:**  
Input: `nums = [1,2,3], k = 6, limit = 5`  
Output: `-1`  
*Explanation: No subsequence has alternated sum 6. Output is -1.*

**Example 3:**  
Input: `nums = [3,1,5], k = 2, limit = 15`  
Output: `5`  
*Explanation: Only single element `[5]` (5) gives alternated sum 5, greater than k, so check `[3,1]`: 3 - 1 = 2, product = 3 × 1 = 3; `[1,5]`: 1 - 5 = -4; not matched.  
Best is `[3,1]`: sum=2 (k), product=3.*

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to try every non-empty subsequence, compute alternating sum and product, and return the maximum product for which sum equals k and product ≤ limit.
- This is exponential time (2ⁿ subsequences) and not feasible for n up to 150.
- To optimize:
  - Recognize this problem is a DP/combinatorial subset splitting with 3 states:
    1. **Index** in nums (where we are).
    2. **Current alternating sum** so far.
    3. **Parity** (are we at a plus or minus step in alternate sum).
    4. **Current product** so far.
  - But product can grow fast—limit it so we cap at limit+1, don't bother tracking >limit since such subsequence can't be an answer.
  - State reduction: since product is always multiplied and limited (≤limit), we can treat "product" as a variable but prune paths exceeding limit immediately for efficiency.
  - Use memoization (lru_cache or explicit DP dict) for (index, current_parity, current_sum) to avoid recomputation.
  - For each nums[i], for both pick/not-pick options:
    - If pick, alternate the sum (+ or - depending on step).
    - If not pick, move to next index, keep state.
  - Only return product if we consumed ≥1 element and final alternating sum == k, with product ≤ limit.
- Final approach: Recursive DP with memoization over (index, state—parity, current sum, current product). Try both pick/not pick. Prune bad branches early.

### Corner cases to consider  
- nums contains zeros (product immediately becomes zero)
- There is no valid subsequence (return -1)
- limit is smaller than any nums[i]
- Single element matching k
- All nums negative or positive
- Repeated numbers, duplicates
- Large or negative k (±sum(nums))
- Multiple subsequences possible: must return maximum product

### Solution

```python
from functools import lru_cache

def maxProduct(nums, k, limit):
    n = len(nums)
    MIN = -5000
    # State: (index, parity, current alt sum)
    # Parity: 0 means "+" (even idx), 1 means "-" (odd idx)
    @lru_cache(maxsize=None)
    def dp(i, parity, cur_sum, used, product):
        if product > limit:
            return MIN
        if i == n:
            # Return product if alt sum matches, used at least 1 element
            if used and cur_sum == k:
                return product
            else:
                return MIN
        # Option 1: skip nums[i]
        res = dp(i+1, parity, cur_sum, used, product)
        # Option 2: pick nums[i] and alternate sign
        if parity == 0:
            res = max(res, dp(i+1, 1, cur_sum + nums[i], True, product*nums[i]))
        else:
            res = max(res, dp(i+1, 0, cur_sum - nums[i], True, product*nums[i]))
        return res

    ans = dp(0, 0, 0, False, 1)
    return -1 if ans == MIN else ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × sum_range × 2), where n = len(nums), sum_range = the possible alternating sum values (bounded by ±sum(nums)), and 2 for parity. Product state is not stored in cache, as it's pruned early for exceeding limit. The real size is much less due to memoization pruning, but worst case is exponential in n if all products are ≤ limit.
- **Space Complexity:** O(n × sum_range × 2), from memoization and call stack. Additional stack for recursion depth n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle negative numbers in nums?
  *Hint: Does your DP correctly handle subtraction and negative products?*

- How to optimize further if limit is very small?
  *Hint: Prune states faster if early product exceeds limit.*

- What about the largest sum range—what if nums has large numbers (e.g., ±10⁴)?
  *Hint: Can you compress or scale DP state space, or switch to iterative DP and only track reachable sums?*

### Summary
This problem uses a **subset DP/combinatorial search pattern**, specifically with alternating sign and both sum/product constraints. The core idea is pick/not-pick recursion with memoization to avoid recalculating overlapping states, and state pruning to keep within the product limit. This pattern applies to other "find maximum product sum" or "subsequence by alternating rules" problems with multiple constraints.