### Leetcode 3621 (Hard): Number of Integers With Popcount-Depth Equal to K I [Practice](https://leetcode.com/problems/number-of-integers-with-popcount-depth-equal-to-k-i)

### Description  
Given two integers, **n** and **k**, count how many numbers **x** (1 ≤ x ≤ n) have **popcount-depth** equal to **k**.  
- The **popcount** of a number is the number of 1's in its binary representation.
- The **popcount-depth** of a number is how many times you must repeatedly apply popcount to it before reaching 1.
    - Example: For 10 (binary 1010): popcount(10) = 2  →  popcount(2) = 1. So popcount-depth = 2.

### Examples  

**Example 1:**  
Input: `n = 5, k = 1`  
Output: `2`  
*Explanation: Numbers with popcount-depth = 1 are 1 (1₁), 2 (10₂).*

**Example 2:**  
Input: `n = 10, k = 2`  
Output: `3`  
*Explanation: 4 (100₂) → popcount(4)=1 (depth 1), so skip. 6 (110₂) → 2 (10₂) → 1 (depth 2). 9 (1001₂) → 2 (10₂) → 1 (depth 2). 10 (1010₂) → 2 (10₂) → 1 (depth 2). There are 3 such numbers (6, 9, 10).*

**Example 3:**  
Input: `n = 20, k = 3`  
Output: `1`  
*Explanation: 14 (1110₂) → 3 → 2 → 1 (depth 3). Only 14 has popcount-depth 3 up to 20.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
    - For each x = 1 to n, calculate its popcount-depth.  
    - Inefficient for large n (up to 10⁹ or higher), since iterating and computing repeatedly would not scale.

- **Optimize:**  
    - Notice: Only the count of bits (popcount) matters at each iteration. We can precompute the popcount-depth for all possible bit counts up to 64 (since n fits in 64 bits).  
    - For each 1 ≤ x ≤ n, the popcount-depth depends on how many 1's (let's call this b) are in x's binary.
    - We use **digit DP**: For each position, choose whether to use 1 or 0—track how many 1's have been used so far, and how many numbers with b 1’s ≤ n exist.
    - For each possible b (1 ≤ b ≤ max bits), if popcount-depth[b] = k, sum the count of numbers ≤ n with exactly b 1’s.  
    - The count of numbers ≤ n with exactly b 1’s in their binary representation can be computed by digit DP, or, if no ≤ bound, with binomial coefficients C(total bits, b).

    - Final approach:
        - Precompute all popcount-depth[b] for 1 ≤ b ≤ 64.
        - For each target b such that popcount-depth[b] = k, count numbers ≤ n with exactly b 1’s using digit DP.

- **Why Digit DP?**
    - Because “≤ n” is a bound, and we need to count all numbers (not just up to 2^b-1), so combinatorics alone won’t work—digit DP ensures we only count eligible numbers.

### Corner cases to consider  
- n is very small or very large  
- k is bigger than maximum possible popcount-depth  
- n = 1  
- k = 1 (look for numbers directly with popcount = 1)  
- n includes numbers with leading zeros (binary representation)

### Solution

```python
def numberOfIntegersWithPopcountDepthEqualToK(n: int, k: int) -> int:
    # Precompute popcount-depth for b in [1, 64]
    popcount_depth = [0] * 65  # index = number of 1's in binary (b)
    popcount_depth[0] = 0  # By definition (should never be called)
    for b in range(1, 65):
        cnt, num = 0, b
        while num != 1:
            num = bin(num).count('1')
            cnt += 1
        popcount_depth[b] = cnt + 1  # +1 for the last step to reach 1

    from functools import lru_cache

    bits = []
    tmp = n
    while tmp:
        bits.append(tmp & 1)
        tmp >>= 1
    bits = bits[::-1]
    L = len(bits)

    # Digit DP: f(pos, cnt, tight): position, 1's picked so far, prefix tight to n
    @lru_cache(None)
    def dp(pos, one_cnt, tight):
        if pos == L:
            # If the number is not 0 and its popcount-depth is k
            if one_cnt == 0:
                return 0
            return int(popcount_depth[one_cnt] == k)
        res = 0
        max_digit = bits[pos] if tight else 1
        for d in range(0, max_digit + 1):
            res += dp(pos + 1,
                      one_cnt + d,
                      tight and (d == max_digit))
        return res

    # Special case: k = 0, only x = 0 (not in 1≤x≤n)
    if k == 0:
        return 0
    return dp(0, 0, True)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L × 64), where L is the number of bits in n (≤ 64). For each bit position and possible 1's count, with tight constraint. Efficient memoization ensures each state is visited only once.
- **Space Complexity:** O(L × 64), memoization for dp states, plus O(64) for `popcount_depth`.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is so large that even memoization isn't enough?
  *Hint: Can you restrict recursion, or discard states with impossible popcount-depth?*

- Can you generalize the concept to other iterative function types, e.g., digital root?
  *Hint: Try to abstract “popcount” to any iterative process.*

- How would you output all such x, not just count?
  *Hint: Use similar DP but store actual numbers or reconstruct them.*

### Summary
This problem uses **digit dynamic programming (digit DP)** and popcount-depth precomputation. The core insight is to precompute for all possible bit counts, and use digit DP to count exactly the number of numbers ≤ n with a set number of 1’s. This approach is seen in problems where constrained counting over binary/bits representation is required, especially with “numbers ≤ n” and digit-based operations. Common patterns: digit DP, iterative function fixed points (e.g., popcount, digital root), combinatoric counting with constraints.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Combinatorics(#combinatorics)

### Similar Problems
- Find Pattern in Infinite Stream II(find-pattern-in-infinite-stream-ii) (Hard)