### Leetcode 3352 (Hard): Count K-Reducible Numbers Less Than N [Practice](https://leetcode.com/problems/count-k-reducible-numbers-less-than-n)

### Description  
Given two integers **n** and **k**, count how many positive integers strictly less than **n** are **k-reducible**.  
A number is **k-reducible** if, when you take its binary representation and repeatedly replace it with the count of 1’s in it, after at most **k** such steps the number becomes 1.  
For example, for x = 11 (binary “1011”):  
→ 1011 → 3 (since three 1’s), 3 → 2 (binary “11”, which has two 1’s), 2 → 1 (binary “10”) — thus reducible in 3 steps.

### Examples  

**Example 1:**  
Input: `n = 6, k = 1`  
Output: `4`  
*Explanation: Numbers less than 6 are 1,2,3,4,5. Their binary 1's counts:  
1 ("1") need 0 steps → 1  
2 ("10") → 2 → 1 (needs 1 step)  
3 ("11") → 2 → 1 (1 step)  
4 ("100") → 1 (0 steps, already 1)  
5 ("101") → 2 → 1 (1 step)  
Count the numbers where it takes at most 1 step to become 1: 1,4,2,3,5 → only 2 and 3 and 5 (with 1 step), 1 and 4 (already 1), that's 4 numbers (excluding n=6 itself).*

**Example 2:**  
Input: `n = 12, k = 2`  
Output: `9`  
*Explanation: Numbers 1..11, for each check steps needed to reach 1:  
- 1 → 1 (0 steps)  
- 2 ("10") → 2→1 (1 step)  
- 3 ("11") → 2→1 (1)  
- 4 ("100") → 1 (0)  
- 5 ("101") → 2→1 (1)  
- 6 ("110") → 2→1 (1)  
- 7 ("111") → 3→2→1 (2)  
- 8 ("1000") → 1 (0)  
- 9 ("1001") → 2→1 (1)  
- 10 ("1010") → 2→1 (1)  
- 11 ("1011") → 3→2→1 (2)  
Count those with steps ≤ 2.\*  

**Example 3:**  
Input: `n = 10, k = 2`  
Output: `8`  
*Explanation: Numbers 1..9, for each count steps to 1 as above. Those with ≤2 steps: 1,2,3,4,5,6,8,9.*

### Thought Process (as if you’re the interviewee)  

Let's clarify:
- For each number x < n, count steps needed for "reduce-to-1" using popcount (count 1’s in binary) process, repeating at most k times.
- We are to count how many x satisfy this property.

**Brute-force idea:**  
- For each x in [1, n-1], simulate the process. For each simulate steps until we reach 1 or pass k, count if it took ≤k steps.

**Why brute-force is too slow:**  
- n can be very large (up to 10¹⁸), making O(n) solution infeasible.

**Optimization Thought:**  
- Notice that at each step, a number reduces rapidly: number of digits in binary decreases.
- For bounded k (say, k ≤ 64), the problem reminds me of digit DP: for all numbers < n, how many reduce within k steps.

**Dynamic Programming (Digit DP / Bitmask DP):**
- Use digit DP: for each position in binary representation of n, try both “use this bit” and “use less” options.
- For each, keep track: how many 1s picked so far.
- For each possible count of 1s, precompute: how many steps are needed for a number with that many 1s to reduce to 1 within k steps.

**Precompute reduce-to-1 steps for popcounts up to maximum possible (max 63 for 64-bit numbers).**

**Steps:**
1. Precompute for popcounts up to 64: for each count, what is the minimum steps to 1.
2. Use digit DP: for position, tight (are we still on n's prefix), count1 (number of 1s used), count numbers less than n with t 1s.
3. For each t where reduce-to-1 steps ≤ k, sum digit DP result.

**Why preferred:**  
- This is efficient for large n because binary digits are ≤64 for n≤10¹⁸.

### Corner cases to consider  
- n = 1 (output 0, as there is no number <1)
- k = 0 (only handle initial ones that are 1 already)
- n is a power of 2 (test how max bits are handled)
- Very large n (test efficiency and possible recursion/memoization limits)
- k very large or very small

### Solution

```python
def count_k_reducible_numbers(n: int, k: int) -> int:
    # Helper: Precompute number of steps needed to reduce each popcount to 1
    # Since counts go down quickly, cache up to (max bits in n) + some slack
    MAX_BITS = 70
    memo = {}

    def count_steps(x: int) -> int:
        # Return steps needed to reduce x to 1 via popcount
        if x == 1:
            return 0
        if x in memo:
            return memo[x]
        steps = 1 + count_steps(bin(x).count('1'))
        memo[x] = steps
        return steps

    # Precompute steps needed for each popcount 1..MAX_BITS
    popcount_to_steps = [0] * (MAX_BITS+1)
    for i in range(1, MAX_BITS+1):
        popcount_to_steps[i] = count_steps(i)

    # Digit DP: dp[pos][count1][tight]
    from functools import lru_cache
    bin_n = bin(n)[2:]
    length = len(bin_n)

    @lru_cache(maxsize=None)
    def dp(pos: int, cnt: int, tight: bool) -> int:
        # At position pos, cnt ones picked so far, are we tight to n's prefix
        if pos == length:
            # At the end: return if cnt needs ≤ k steps
            # Exclude 0: if cnt == 0, EMPTY number (no leading zeros allowed)
            if cnt == 0:
                return 0
            return 1 if popcount_to_steps[cnt] <= k - (0 if cnt == 1 else 1) else 0
        res = 0
        limit = int(bin_n[pos]) if tight else 1
        for d in range(0, limit + 1):
            # Can't have leading zeros (skip if d==0 and cnt==0)
            if cnt == 0 and d == 0:
                continue
            res += dp(pos+1, cnt+d, tight and (d==limit))
        return res

    # Special case: k == 0
    if k == 0:
        return 0

    # Start from pos 0, cnt=0, tight=1 (must agree with n)
    result = dp(0, 0, True)
    return result

```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(L × L), where L = number of bits in n (≤ 64). For each position, possible cnt is ≤L, and tight is 0/1. So total states ≈ 64×64×2.

- **Space Complexity:**  
  O(L × L) due to memoization cache for DP and the popcount steps array; recursion stack up to L.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle even larger n or repeated queries efficiently?  
  *Hint: Can you reuse or precompute for multiple n’s?*

- What if popcount used a different base (e.g., count bits in base 3 representation)?  
  *Hint: Generalize DP for other digit systems.*

- Can you find the smallest k for a given n such that all numbers below n are k-reducible?  
  *Hint: Binary search over k, or analyze the DP more deeply.*

### Summary
This problem applies the **digit DP** pattern to work with constraints in number representations efficiently, specifically for properties reducible by popcount. Patterns of digit DP frequently appear in combinatorial and counting problems where "numbers less than N with a given property" must be counted, such as numbers with certain digits, digit sums, or divisibility. It's a highly reusable approach for bitwise or numerical "reduce-to-value" properties.


### Flashcard
Digit DP to count numbers < n where popcount reduction reaches 1 in ≤k steps; precompute reduction steps for all possible values (≤64 bits), use digit DP with memoization.

### Tags
Math(#math), String(#string), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
