### Leetcode 377 (Medium): Combination Sum IV [Practice](https://leetcode.com/problems/combination-sum-iv)

### Description  
Given an array of distinct integers **nums** and an integer **target**, find the number of possible combinations where the numbers in **nums** (repetition allowed, order matters) sum up to **target**. Return the total number of such combinations.

*In other words:*
How many sequences (of any length) can you make using the numbers from **nums** that add up, in order, to exactly **target**? Each element in **nums** can be used **any number of times** (including zero), and **different orderings count as separate combinations**.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`, `target = 4`  
Output: `7`  
*Explanation:  
All possible combinations (where order matters):  
[1,1,1,1], [1,1,2], [1,2,1], [1,3], [2,1,1], [2,2], [3,1]
There are 7 unique ordered ways.*

**Example 2:**  
Input: `nums = `, `target = 3`  
Output: `0`  
*Explanation:  
There is no way to sum to 3 using 9.*

**Example 3:**  
Input: `nums = [2,3,5]`, `target = 8`  
Output: `6`  
*Explanation:
All combinations:  
[2,2,2,2], [2,3,3], [3,2,3], [3,3,2], [3,5], [5,3]*

### Thought Process (as if you’re the interviewee)  
- **Brute-force (Backtracking/DFS):**  
  Start from target, repeatedly subtract any element from **nums** as long as the remainder is ≥ 0.  
  For each choice, recurse. Each path is a combination.
  But this leads to exponential time (many repeated subproblems).

- **Top-Down DP (Memoization):**  
  Repeatedly solving the same subproblems makes memoization attractive.  
  Record: `dp[t] = number of ways to reach sum t`.
  Base: `dp = 1` (one way: no numbers).
  For any `t > 0`,  
    `dp[t] = sum(dp[t - num]) for each num in nums if t - num ≥ 0`.

- **Bottom-Up DP:**  
  Build up from 0 to target iteratively.
  For each sub-target from 1 to target, try all **nums**.
  For each `num`, if `i - num ≥ 0`,  
    update: `dp[i] += dp[i - num]`.

- **Order Matters:**  
  Unlike Coin Change's classic version, **permutations** are counted, not just combinations (and nums are distinct, so no duplicate numbers).  
  That's why we iterate **target first, then nums** to allow all orderings.

- **Optimal Approach:**  
  Use **Bottom-Up DP** for best time and no recursion stack usage.

### Corner cases to consider  
- nums = [], target > 0 ⇒ output = 0  
- nums has only one element > target ⇒ output = 0  
- nums = [1], target = 1 ⇒ output = 1  
- target = 0 ⇒ output = 1 (always one way: use nothing)  
- Duplicates in nums? (Per problem: nums are distinct)  
- Large target (test efficiency/scaling)

### Solution

```python
def combinationSum4(nums, target):
    # dp[i] = number of combinations to sum up to i
    dp = [0] * (target + 1)
    dp[0] = 1  # One way to make 0: use nothing
    
    # For every sum from 1 to target
    for t in range(1, target + 1):
        # Try adding each number
        for num in nums:
            if t >= num:
                dp[t] += dp[t - num]
    return dp[target]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(target × k), where k = len(nums).  
  We compute all dp[1] through dp[target], and for each sub-target, consider every number in nums.
  
- **Space Complexity:** O(target).  
  We use a dp array of size target + 1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if **order does not matter** and only unique combinations are counted?
  *Hint: Think of classic coin change problem; switch the order of the DP loops—nums outer, targets inner.*

- What if the input array **nums** contains negative numbers?
  *Hint: Is the number of possible combinations always finite? What happens with negative cycles?*

- How would you **output the actual combinations** instead of just the count?
  *Hint: Use DFS or reconstruct paths using a path list along with backtracking.*

### Summary

This problem uses the **permutation dynamic programming** pattern, specifically bottom-up DP, similar to Coin Change, but with order of elements counting (so inner/outer loop order is swapped).  
This pattern applies broadly to problems where the *order* of choices **matters**, and you want to count or generate all possible sequences that reach a specific goal using a bag of items repeatedly.