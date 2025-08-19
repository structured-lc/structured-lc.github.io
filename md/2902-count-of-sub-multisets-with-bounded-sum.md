### Leetcode 2902 (Hard): Count of Sub-Multisets With Bounded Sum [Practice](https://leetcode.com/problems/count-of-sub-multisets-with-bounded-sum)

### Description  
Given an array **nums** of non-negative integers (may contain duplicates) and two integers **l** and **r**, count how many ways you can choose a (multi)set (can use each number at most the number of times it appears in nums) such that the sum of chosen elements is in the range **[l, r]**.  
Order does not matter, and sets can be empty (if sum in range). Return answer modulo 1,000,000,007.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2,3], l = 6, r = 6`  
Output: `1`  
Explanation: Only `{1,2,3}` gives sum = 6.

**Example 2:**  
Input: `nums = [2,1,4,2,7], l = 1, r = 5`  
Output: `7`  
Explanation: Valid multisets: `{1}`, `{2}`, `{4}`, `{2,2}`, `{1,2}`, `{1,4}`, `{1,2,2}`.

**Example 3:**  
Input: `nums = [1,2,1,3,5,2], l = 3, r = 5`  
Output: `10`  
Explanation: There are 10 sub-multisets with sums 3, 4, or 5. (See below in trace.)

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try all possible sub-multisets (2ⁿ possibilities), calculate their sums, count if sum in [l, r].  
  Too slow for n > 20, exponential time.

- **DP (Knapsack style):**  
  Since each element can be picked at most its count times, we can use DP:  
  Let dp[s] = number of sub-multisets with sum = s.  
  For each unique value v with frequency f, for each sum i (from r down to 0),  
  Add ways for using v 0...f times:
  - For k in 1...f: dp[i + k\*v] += dp[i]  
  But this can be slow for large f and r.

- **Optimized DP using prefix sums:**  
  Use prefix sums (or "bounded knapsack optimization") to speed up adding contributions in O(r) per item, not O(f \* r).  
  Special case: if there are multiple 0's, multiply result by (number of 0's + 1), since zero does not change sum but increases count of multisets.

- **Why use this approach:**  
  Avoids recomputation, handles duplicate numbers efficiently, polynomial in n, sum, r.

### Corner cases to consider  
- All elements are zero (sum is always zero, many multisets!)
- l = 0 or r = 0 (empty subset may be valid)
- n = 0 (empty nums)
- Large frequency of a single value
- l > r (output zero)
- nums containing only one value
- Very large r but small max(nums)

### Solution

```python
from collections import Counter

def countSubMultisets(nums, l, r):
    MOD = 10**9 + 7
    count = Counter(nums)
    zeros = count.pop(0, 0)  # process zeroes at end

    # dp[i] = number of multisets with sum i
    dp = [1] + [0] * r
    for num, freq in count.items():
        # compute prefix sum for fast bounded knapsack
        pre = [0] * (r + 2)
        for i in range(r + 1):
            pre[i + 1] = (pre[i] + dp[i]) % MOD
        for i in range(r, -1, -1):
            left = i - num * freq
            if left >= 0:
                dp[i] = (pre[i + 1] - pre[left]) % MOD
            else:
                dp[i] = pre[i + 1] % MOD

    # every multiset can be combined with (zeros + 1) ways for zeros    
    total = sum(dp[l:r+1]) % MOD
    return (total * pow(2, zeros, MOD)) % MOD  # since each 0 can be included or not

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* r), where n = number of unique elements (after counting), r = max sum considered.  
  Each unique value processes all possible sums from 0 to r.
- **Space Complexity:** O(r), as we keep only dp[0..r].

### Potential follow-up questions (as if you’re the interviewer)  

- What if r > 10⁶?  
  *Hint: Is there a way to avoid scanning all sums up to r? Could you use generating functions?*

- How to list all the multisets, not just count?  
  *Hint: How would you reconstruct choices from the DP?*

- Can you compute the total sum of all valid multisets’ sums?  
  *Hint: Modify the DP to also store running sum of all subsets that match criteria.*

### Summary

This is a classic **bounded subset sum** problem (bounded knapsack with counts), solved by DP where dp[s] = number of multisets achieving sum s. It's optimized using prefix sums to process each value efficiently.  
The technique applies to any problem counting subset sums with usage limits, and is common for knapsack with frequency bounds, dice roll probabilities, and coin change when each coin is limited.  
Patterns: Bounded knapsack, DP over sums, prefix sum DP optimization.

### Tags
Array(#array), Hash Table(#hash-table), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window)

### Similar Problems
- Coin Change(coin-change) (Medium)
- Coin Change II(coin-change-ii) (Medium)