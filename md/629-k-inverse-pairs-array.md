### Leetcode 629 (Hard): K Inverse Pairs Array [Practice](https://leetcode.com/problems/k-inverse-pairs-array)

### Description  
Given two integers n and k, return the number of different arrays consisting of all the numbers from 1 to n such that there are exactly k inverse pairs.  
An **inverse pair** is a pair of indices (i, j) such that 0 ≤ i < j < n and the element at i is greater than the element at j.  
Return the answer modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `n = 3, k = 0`  
Output: `1`  
*Explanation: Only `[1,2,3]` (the fully sorted array) has exactly 0 inverse pairs.*

**Example 2:**  
Input: `n = 3, k = 1`  
Output: `2`  
*Explanation: Arrays `[1,3,2]` and `[2,1,3]` each have exactly 1 inverse pair.*

**Example 3:**  
Input: `n = 4, k = 2`  
Output: `5`  
*Explanation: Arrays `[1,3,2,4]`, `[1,2,4,3]`, `[1,4,2,3]`, `[2,1,3,4]`, `[2,1,4,3]` each have exactly 2 inverse pairs.*

### Thought Process (as if you’re the interviewee)  
First, consider brute force: generate all **n!** possible permutations, count how many have exactly k inverse pairs.  
But n can be up to 1000, so generating all permutations is totally infeasible.

So we need to find a smarter way, likely dynamic programming.

Let dp[n][k] = number of arrays of size n with exactly k inverse pairs.
- If I have an array of size n-1, and I want to add n somewhere, every possible insert position increases the number of inverse pairs by some amount.
- If I insert n at position i (indexed from left), it will create exactly i reverse pairs because it will be larger than all earlier elements.
- So for each x in 0...min(k, n-1), I can add n at position x, adding x inverse pairs to existing arrays of size n-1 with k-x inverse pairs.

So our transition is:  
dp[n][k] = sum over x=0..min(k, n-1) of dp[n-1][k-x]

We can optimize this with prefix sums to avoid O(n²k) time.

### Corner cases to consider  
- n = 1, any k (only possible for k = 0)
- k = 0 (only ascending order is possible)
- k > n × (n - 1) ÷ 2 (cannot have more than the maximum possible inverse pairs)
- k = n × (n - 1) ÷ 2 (only one permutation, descending order)
- Negative k (invalid)

### Solution

```python
MOD = 10**9 + 7

def kInversePairs(n, k):
    # dp[i][j]: number of arrays of size i with exactly j inverse pairs
    dp = [0] * (k + 1)
    dp[0] = 1  # One way to have 0 pairs with [1]

    for i in range(2, n + 1):
        new_dp = [0] * (k + 1)
        # Compute prefix sums for the efficient update
        prefix = [0] * (k + 2)
        for j in range(k + 1):
            prefix[j + 1] = (prefix[j] + dp[j]) % MOD
        for j in range(k + 1):
            # new_dp[j] = sum_{x=0}^{min(j, i-1)} dp[j-x]
            # which is prefix[j+1] - prefix[max(0, j - (i-1))]
            min_j = max(0, j - (i - 1))
            new_dp[j] = (prefix[j + 1] - prefix[min_j]) % MOD
        dp = new_dp
    return dp[k]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n × k). Each n, each k computes array sums using prefix sums.
- **Space Complexity:** O(k). Uses rolling DP arrays, keeping only previous and current.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle returning all the actual arrays rather than just the count?  
  *Hint: Outputting arrays quickly explodes in complexity; only small n,k possible.*

- Can you optimize space further if only a few k values are needed?  
  *Hint: Try restricting DP to only necessary subproblems, or pruning with bounds.*

- What happens if the modulus is removed, or if n, k are larger?  
  *Hint: Discuss overflow and potential combinatorial optimizations.*

### Summary
This problem uses a classic dynamic programming approach with **prefix sums** to efficiently count ways to achieve exactly k inverse pairs while building up arrays from size 1 to n.  
The pattern is closely related to DP for permutation problems, and prefix sums are a standard optimization to turn O(n²k) into O(nk) time.  
This DP + prefix sum trick is very common in counting and partitioning problems.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Count the Number of Inversions(count-the-number-of-inversions) (Hard)