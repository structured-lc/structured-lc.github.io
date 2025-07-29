### Leetcode 2787 (Medium): Ways to Express an Integer as Sum of Powers [Practice](https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers)

### Description  
Given two integers, **n** and **x**, find **how many unique ways we can express n as the sum of the xᵗʰ powers of unique positive integers**.  
In other words, you are to count the number of ways to pick a set of unique integers \[a₁, a₂, ..., aₖ\] so that a₁ˣ + a₂ˣ + ... + aₖˣ = n.  
Return the answer modulo 10⁹+7.  
- All picked integers must be unique and > 0.
- Order of selection does not matter (i.e., sets not sequences).

### Examples  

**Example 1:**  
Input: `n = 10, x = 2`  
Output: `1`  
*Explanation: Only {1² + 3² = 1 + 9 = 10} works. No other combination of unique squares adds to 10.*

**Example 2:**  
Input: `n = 100, x = 2`  
Output: `3`  
*Explanation:  
The 3 ways are:  
- {10²} = 100  
- {8² + 6² = 64 + 36 = 100}  
- {1² + 3² + 4² + 5² + 7² = 1 + 9 + 16 + 25 + 49 = 100}*

**Example 3:**  
Input: `n = 160, x = 3`  
Output: `2`  
*Explanation:  
160 can be written as:  
- {2³ + 3³ + 5³ = 8 + 27 + 125 = 160}  
- {4³ + 4³ = 64 + 64 = 128} (Not allowed, repeats 4, so invalid)  
- {1³ + 2³ + 3³ + 4³ + 5³ = 1 + 8 + 27 + 64 + 125 = 225} (Too big)  
- Only 2 valid unique sets sum to 160 (actual breakdown found through code).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try all subsets of positive integers in \[1, 2, ..., upper bound\], raise each to the power x, sum, and count matches to n. This is 2ᴷ complexity, where K is # of allowable base integers, which is too slow for n ≤ 1000.

- **Optimize:**  
  Notice this is like the Classic Subset Sum Problem, where elements are iˣ instead of i, and each can be used at most once.  
  Use **dynamic programming**:  
  - dp[i]: number of ways to write i as a sum of xᵗʰ powers of unique positive integers  
  - Transition: For every candidate "base" integer (from 1 up to the floor of n^{1/x}), process all total sums in descending order, updating dp[s + baseˣ] += dp[s].

- **Final plan:**  
  - Precompute all possible terms (iˣ ≤ n).
  - Standard 1D DP: "0/1" knapsack, move right-to-left to ensure each base is considered at most once.
  - Modulo after every addition (mod 10⁹+7).

### Corner cases to consider  
- n = 0 (trivial, 1 way: empty sum, but as per constraints n > 0)
- x = 1 (all subsets of \[1, 2, ..., n\] summing to n)
- n < smallest power (no way)
- Only one base integer hits the sum (e.g., n == kˣ for some k)
- No combination possible (output 0)
- Very large x (only possible to use 1¹, as >1ˣ would exceed n)
- Duplicate base numbers (should NOT be allowed)

### Solution

```python
def numberOfWays(n: int, x: int) -> int:
    MOD = 10**9 + 7

    # Compute all possible bases whose xth power ≤ n
    bases = []
    i = 1
    while (val := i ** x) <= n:
        bases.append(val)
        i += 1

    # dp[s] = # of ways to write s using unique bases
    dp = [0] * (n + 1)
    dp[0] = 1  # 1 way to make sum 0 (choose nothing)

    # For each base, classic 0/1 knapsack update (right-to-left)
    for base_val in bases:
        for s in range(n, base_val - 1, -1):
            dp[s] = (dp[s] + dp[s - base_val]) % MOD
    
    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where k = ⌊n^(1/x)⌋  
  For every base (up to k), the dp is updated for all sums up to n.
- **Space Complexity:** O(n)  
  Single dp array of length n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if order matters?  
  *Hint: Consider permutations (like coin change, not knapsack).*

- What if repeats are allowed (bases can be picked multiple times)?  
  *Hint: This becomes the "unbounded" knapsack (coin change) variant.*

- Can you print all valid unique sets, not just count?  
  *Hint: Use backtracking or build paths in DP.*

### Summary
This problem is a variation of the classic **0/1 Knapsack DP**, adapted for powers.  
It highlights the standard pattern:  
- Process candidates (here, base values)  
- Update ways to reach each sum without using any number twice (right-to-left DP update)  
The approach generalizes to similar subset-sum and combinational sum problems, and is common for Leetcode DP, knapsack, and combinatorial counting interview questions.