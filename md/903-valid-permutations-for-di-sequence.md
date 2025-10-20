### Leetcode 903 (Hard): Valid Permutations for DI Sequence [Practice](https://leetcode.com/problems/valid-permutations-for-di-sequence)

### Description  
Given a string S consisting only of 'D' and 'I', where 'D' stands for "Decreasing" and 'I' stands for "Increasing".  
You need to count how many valid permutations of the numbers {0, 1, ..., n} (where n = len(S)) can be formed so that:
- For every 'I' at position i: P[i] < P[i + 1]
- For every 'D' at position i: P[i] > P[i + 1]  
Return the count modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `"DID"`  
Output: `5`  
*Explanation:  
For S = "DID", n = 3.  
Valid permutations: [2,1,3,0], [1,3,2,0], [1,2,3,0], [2,3,1,0], [3,2,1,0].  
So there are 5 valid.*

**Example 2:**  
Input: `"II"`  
Output: `1`  
*Explanation:  
Only possibility is [0,1,2], which is strictly increasing.*

**Example 3:**  
Input: `"DD"`  
Output: `1`  
*Explanation:  
Only possibility is [2,1,0], which is strictly decreasing.*

### Thought Process (as if you’re the interviewee)  
First, if I brute-force generate all permutations of {0..n}, then validate each one against the pattern, this is factorial time (O(n!)), which is infeasible for n > 8-10.

The pattern asks about the sequence of relative comparisons, so dynamic programming fits well:
- Let dp[i][j]: number of valid sequences for the first i+1 numbers, ending with the jᵗʰ smallest unused number.
- For each position, we decide what number to use, depending on whether S[i-1] is 'I' or 'D':
  - For 'I', the next element must be larger (so we sum over the "right" options).
  - For 'D', the next element must be smaller (sum over the "left" options).

We can optimize further:
- Only need the previous row at every step—space-optimized DP.
- Use prefix sums to speed up transitions.
- Final answer is dp[n] or sum(dp[n]) depending on finalization.

This 2D/1D DP reduces complexity to O(n²), feasible even for n ≈ 200.

### Corner cases to consider  
- S is empty (`""`): Only one valid permutation .
- All 'I' or all 'D' cases.
- Alternating 'D', 'I', 'D', 'I'...
- Patterns that cause max/min values to shift rapidly.
- Large n (robustness, performance).

### Solution

```python
def numPermsDISequence(S: str) -> int:
    MOD = 10**9 + 7
    n = len(S)
    # dp[i][j] = number of ways to place first i+1 numbers, where the last number is the jᵗʰ smallest unused number
    dp = [ [0] * (n+1) for _ in range(n+1) ]
    # At the end, any starting point is possible for the first number
    for j in range(n+1):
        dp[0][j] = 1
    
    for i in range(1, n+1):
        if S[i-1] == "I":
            # dp[i][j] = sum of dp[i-1][k] for k=j+1..n-i+1
            total = 0
            for j in range(n-i, -1, -1):
                total = (total + dp[i-1][j+1]) % MOD
                dp[i][j] = total
        else:
            # dp[i][j] = sum of dp[i-1][k] for k=0..j
            total = 0
            for j in range(n-i+1):
                total = (total + dp[i-1][j]) % MOD
                dp[i][j] = total
    return dp[n][0] % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  At each position i, for each j, we do a constant amount of work, potentially leveraging prefix or postfix sums.
- **Space Complexity:** O(n²)  
  because we're storing the DP table for (n+1) × (n+1) states. Space can be optimized to O(n) by rolling arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize space usage in your DP solution?  
  *Hint: You only need the previous row of DP, so a 1D rolling array suffices.*

- Can you print one such valid permutation, or all, not just count?  
  *Hint: Standard backtracking or reconstruct with DP.*

- What if the sequence involved three kinds of instructions, e.g., 'I', 'D', and '='?  
  *Hint: Adjust transition logic to account for equality.*

### Summary
This is a dynamic programming problem, using permutations constrained by a string pattern. The core pattern is similar to "counting DP with state transitions based on prefix sums," common in permutation count and sequence arrangement problems. The optimization of summing valid states with prefix/postfix sums, and reducing from 2D to 1D states, is widely applicable, including pattern-restricted subarray counts and interval DP.


### Flashcard
Use DP where dp[i][j] = number of ways to arrange first i+1 numbers ending with jᵗʰ smallest unused; for each 'I', sum dp[i-1][0..j-1], for each 'D', sum dp[i-1][j..i-1], yielding O(n²) time.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
