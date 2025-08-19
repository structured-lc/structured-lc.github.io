### Leetcode 3082 (Hard): Find the Sum of the Power of All Subsequences [Practice](https://leetcode.com/problems/find-the-sum-of-the-power-of-all-subsequences)

### Description  
Given an array of integers `nums` of length n and a positive integer k, the **power** of a subsequence is defined as the number of its own subsequences whose sum is exactly k. Find the sum of the power of **all** non-empty subsequences of `nums`. Return the answer modulo 10⁹+7.

In simpler terms:  
- For every non-empty subsequence of `nums`, compute the count of *its* subsequences summing to k, and sum up all these counts.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3], k = 3`  
Output: `6`  
*Explanation:*
- Subsequences with non-zero power (i.e., have non-empty subsequences whose sum = k) are:
  - `[1,2]`: has two subsequences `[1,2]` and `[2,1]`, one has sum 3
  - `[3]`: one subsequence `[3]` is itself, sum 3
  - `[1,2,3]`: several subsequences sum to 3.
- Adding counts over all subsequences gives 6.

**Example 2:**  
Input: `nums = [2,2,2], k = 4`  
Output: `7`  
*Explanation:*
- For all combinations of pairs, each `[2,2]` has subsequences that sum to k.
- All valid counts are added for each relevant subsequence.

**Example 3:**  
Input: `nums = [3], k = 3`  
Output: `1`  
*Explanation:*
- Only one subsequence `[3]`, itself sum is k=3, so the answer is 1.

### Thought Process (as if you’re the interviewee)  
Let’s break the problem into steps:
- **Brute-force:** For every non-empty subsequence (2ⁿ-1 in total), try all its non-empty subsequences, check if sum = k, and count. Then sum for all. This is exponential on exponential—utterly intractable.
- **Observation:** "Power of a subsequence" = number of its own subsequences with sum = k. For each subsequence of `nums`, precompute count of its own subsequences (using subset sum DP) with sum=k.
- For all possible subsets S of `nums`, for each S:
    - Use DP to count #subsequences in S that sum to k (classic subset sum)
    - Sum up all these counts.
    - n ≤ 20 would be feasible (since 2ⁿ ≈ 1M at best)
- **Scalability:** Constraints are greater—so we need to reverse: For all possible subset sum scenarios, instead count, for each subset size and sum, in how many super-sequences does it appear.

**Key insight:**  
- For each subset (S), the number of super-sequences (of original nums) containing S is 2^(n - |S|). If S has subsequence power p, total impact is p × 2^(n - |S|).
- Thus, for each *subset* S, find its number of subsequences with sum=k, then multiply by 2^(n-|S|) since the rest of the elements can be in or out freely.
- Use inclusion-exclusion/DP to do this efficiently:
    - Classic subset sum DP: dp[i][sum] = number of ways to select subsequence from first i numbers with total sum = sum
    - Now, for each subset sum=k, for each subset S of length l, the count of supersequences (with rest any selection) is 2^(n-l)
    - For all l and sum=k, accumulate dp[l][k] × 2^(n-l) in result.

### Corner cases to consider  
- Empty array (should not happen, per description)
- k=0 (should not double-count empty subsequences)
- All numbers > k (no valid sums)
- All elements the same, and k is a multiple (causes combinatorial explosion)
- Only one element (matching / not matching k)
- Very large n and/or k (test optimized code path)

### Solution

```python
MOD = 10 ** 9 + 7

def findSumOfPower(nums, k):
    n = len(nums)
    # dp[i][s]: number of ways to select i elements with sum = s
    # dp[0][0] = 1 (base case: empty subset has sum 0)
    dp = [0] * (k + 1)
    dp[0] = 1  # empty subset

    for num in nums:
        # Traverse sum down so each num used at most once per subset
        for s in range(k, num - 1, -1):
            dp[s] = (dp[s] + dp[s - num]) % MOD

    # At this point, dp[s] = number of subsets (any size) with sum = s
    # We need, for each subset S with sum=k, count number of supersequences S can appear in.
    # Power for each S is: count of its subsets with sum=k × number of super masks (2^(n-len(S)))
    # BUT dp[k] gives count of subsets sum=k in original nums.

    # But for all possible subsets, the answer is dp[k] × 2^(n - size_of_S), summed over all S
    # Instead, cumulative for all (since each such S is a subset)

    # Now, for each possible subset that sums to k, how many times does it get counted?
    # Each such subset is present in 2^(n - len(S)) supersequences

    # To get correct answer: For all subsets S with sum = k, their contribution is 2^(n - len(S))

    # So, let's use DP to count, for each subset size, cnt[s][l] = how many subsets of length l sum to s
    cnt = [[0] * (n + 1) for _ in range(k + 1)]
    cnt[0][0] = 1
    for num in nums:
        for s in range(k, num - 1, -1):
            for l in range(n, 0, -1):
                cnt[s][l] = (cnt[s][l] + cnt[s - num][l - 1]) % MOD

    # Now, for each length l, count subsets with sum=k and size=l
    # For each, total impact is cnt[k][l] × 2^(n - l)
    res = 0
    pow2 = [1] * (n + 1)
    for i in range(1, n + 1):
        pow2[i] = (pow2[i - 1] * 2) % MOD

    for l in range(1, n + 1):
        res = (res + cnt[k][l] * pow2[n - l]) % MOD

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* k \* n)  
    - For each number, for each possible sum up to k, for each size up to n.
    - Acceptable as long as n ≤ 100 and k ≤ 1000 (see constraints.)
- **Space Complexity:** O(n \* k)  
    - Extra DP array for subset counts, polynomial in n and k.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize if n is large but k is small?  
  *Hint: Try 1D DP or rolling arrays to reduce space.*

- What if you need to compute for all values of k simultaneously?  
  *Hint: Can you modify your subset sum DP to compute all sums in one pass?*

- If numbers can be negative, how does the approach change?  
  *Hint: Subset sum with negative numbers needs offsetting indices or different techniques.*

### Summary
This problem blends classic subset sum DP (counting subsets meeting sum criteria) and inclusion-exclusion principles (considering how often subsets appear as part of supersequences).  
Common patterns found here include subset DP (knapsack style), careful use of combinatorics for counting, and binary mask enumeration. These appear in many combinatorial enumeration and advanced dynamic programming problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Number of Subsequences That Satisfy the Given Sum Condition(number-of-subsequences-that-satisfy-the-given-sum-condition) (Medium)