### Leetcode 3343 (Hard): Count Number of Balanced Permutations [Practice](https://leetcode.com/problems/count-number-of-balanced-permutations)

### Description  
Given a string `num` consisting only of digits ('0'-'9'), you are to count how many **distinct permutations** of its digits are **balanced**.  
A string is called **balanced** if the sum of the digits at even indices equals the sum at odd indices (indexing is 0-based).  
Return the count modulo 10⁹ + 7.  
A permutation is a rearrangement of the characters of `num`.

### Examples  

**Example 1:**  
Input: `num = "123"`  
Output: `2`  
Explanation: The 6 permutations are "123", "132", "213", "231", "312", "321". Of these, "132" and "231" are balanced.  
- "132": 1 (even) + 2 (odd) + 3 (even) ⇒ even: 1+3=4, odd: 2, not balanced. Oops. Let's write index-wise:  
  - "132": idx 0=1, idx 1=3, idx 2=2 → even indices: idx 0 & 2 → 1+2=3, odd idx 1=3, so even: 3, odd: 3 ✓  
  - "231": idx 0=2, idx 1=3, idx 2=1 → even: 2+1=3, odd: 3, so even: 3, odd: 3 ✓

**Example 2:**  
Input: `num = "112"`  
Output: `1`  
Explanation: The permutations are "112", "121", "211". Only "121" is balanced.  
- "121": idx 0=1, idx 1=2, idx 2=1 → even: 1+1=2, odd: 2

**Example 3:**  
Input: `num = "12345"`  
Output: `0`  
Explanation: None of the permutations are balanced.

### Thought Process (as if you’re the interviewee)  
First, we can brute-force generate all unique permutations of `num`, check each one for "balanced", and count. However, the number of permutations grows as n! (with n up to 80), so this is clearly infeasible.

Let’s look for properties:
- A "balanced" permutation must satisfy that the sum of digits at even indices equals sum at odd indices.
- For length n, the indices split into two groups — positions with even and odd indices.
- The sum for both groups must be equal. So, total sum must be even, otherwise impossible.
- If n is length of the string, even indices count is (n+1) // 2, odd indices count is n // 2.

Key insight: we distribute digits into even and odd positions so their sums become equal, using all digits.

Let’s define:
- Let’s fix how many times each digit goes into even and odd positions. If we can split the multiset of digits into two groups (of sizes as above) with equal sums, count the distinct assignments/permutations that satisfy it.
- Use DP with memoization. For each digit, try allocating 0 to cnt[d] of it in even positions and the rest in odd positions, ensuring that neither group exceeds its slot count.

- To count distinct permutations, account for repeated digits using combinatorics:  
   - For a given arrangement, the number of ways to assign the digits to the even and odd slots is multinomial coefficient.
   - Precompute factorials for efficiency.

### Corner cases to consider  
- `num` with all same digits: e.g., "2222"
- `num` with only two digits: shortest possible
- `num` has total sum odd: always output 0
- When no possible split yields equal sum, should return 0
- Very large n (e.g., 80 digits): solution must be efficient

### Solution

```python
MOD = 10**9 + 7

from functools import lru_cache
from math import comb

def countBalancedPermutations(num: str) -> int:
    # Count occurrences of each digit
    cnt = [0] * 10
    for c in num:
        cnt[int(c)] += 1

    n = len(num)
    total = sum(int(c) for c in num)
    if total % 2 != 0:
        return 0  # cannot split into two equal sums

    even_slots = (n + 1) // 2
    odd_slots = n // 2
    target = total // 2

    # Precompute factorials and inverse factorials for multinomial coefficients
    fac = [1] * (n + 1)
    for i in range(1, n + 1):
        fac[i] = fac[i - 1] * i % MOD

    invfac = [1] * (n + 1)
    invfac[n] = pow(fac[n], MOD - 2, MOD)
    for i in range(n - 1, -1, -1):
        invfac[i] = invfac[i + 1] * (i + 1) % MOD

    @lru_cache(maxsize=None)
    def dfs(i, need, even_left, odd_left):
        if need < 0 or even_left < 0 or odd_left < 0:
            return 0
        if i == 10:
            if need == 0 and even_left == 0 and odd_left == 0:
                # Count permutations: multinomial for both parts, then multiply
                even_multinomial = fac[even_slots]
                odd_multinomial = fac[odd_slots]
                for d in range(10):
                    even_d = used_even[d]
                    odd_d = cnt[d] - even_d
                    even_multinomial = (even_multinomial * invfac[even_d]) % MOD
                    odd_multinomial = (odd_multinomial * invfac[odd_d]) % MOD
                return (even_multinomial * odd_multinomial) % MOD
            return 0
        
        res = 0
        max_even = min(cnt[i], even_left)
        # Use global variable to track the "used" distribution
        for even_take in range(max_even + 1):
            used_even[i] = even_take
            res = (res + dfs(i + 1,
                             need - even_take * i,
                             even_left - even_take,
                             odd_left - (cnt[i] - even_take))) % MOD
        used_even[i] = 0
        return res

    used_even = [0] * 10
    return dfs(0, target, even_slots, odd_slots)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(10 \* n\(^3\) \* total) in worst case.
  - For each digit 0..9, and each possible allocation to even slots (≤ 80), and sum up to total (≤ 80 \* 9).
  - The DP is manageable as n ≤ 80 and sum ≤ 720.

- **Space Complexity:** O(10 \* n\(^2\) \* total) for memoization and factorial arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return some example "balanced" permutations as well as the count?  
  *Hint: Consider enhancing your DP to reconstruct one solution.*

- What if instead of digits, the input is an array of arbitrary numbers?  
  *Hint: How does the solution adapt to arbitrary values/range?*

- Could we do this for k-way balancing (split into k groups with equal sum)?  
  *Hint: Consider how you would generalize the DP allocation.*

### Summary
This problem uses a **digit multiset dynamic programming + combinatorics** pattern: decide how many of each digit to assign to even/odd indices so both sums are equal, then use multinomial coefficients to count unique permutations.  
This pattern applies in advanced counting problems involving multisets and grouping with sum constraints, and maps to problems involving **partitioning or weighted subset selection with duplicates**. The recursive DP (with memoization and combinatorics for counting) is the core pattern.

### Tags
Math(#math), String(#string), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
