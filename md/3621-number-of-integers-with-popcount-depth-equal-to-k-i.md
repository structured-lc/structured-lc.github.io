### Leetcode 3621 (Hard): Number of Integers With Popcount-Depth Equal to K I [Practice](https://leetcode.com/problems/number-of-integers-with-popcount-depth-equal-to-k-i)

### Description  
Given integers **n** and **k**, count how many integers \( x \) such that \( 1 \leq x \leq n \) have **popcount-depth** exactly **k**. The **popcount-depth** of an integer is the number of times you need to apply `popcount` (the number of 1's in the binary representation) until you reach 1.  
For example, for \( x = 7 \):  
- 7 in binary = '111' → popcount = 3  
- 3 in binary = '11' → popcount = 2  
- 2 in binary = '10' → popcount = 1  
So, popcount-depth(7) = 3 steps.

### Examples  

**Example 1:**  
Input: `n = 10, k = 2`  
Output: `5`  
*Explanation:  
The numbers with popcount-depth 2 are 3, 5, 6, 9, 10. For each:  
- 3: 11₂ → popcount=2 → 10₂ → popcount=1  
- 5: 101₂ → popcount=2 → 10₂ → popcount=1  
- 6: 110₂ → popcount=2 → 10₂ → popcount=1  
- 9: 1001₂ → popcount=2 → 10₂ → popcount=1  
- 10: 1010₂ → popcount=2 → 10₂ → popcount=1*

**Example 2:**  
Input: `n = 7, k = 3`  
Output: `1`  
*Explanation:  
Only number 7 has popcount-depth 3:  
- 7: 111₂ → popcount=3 → 11₂ → popcount=2 → 10₂ → popcount=1*

**Example 3:**  
Input: `n = 15, k = 1`  
Output: `1`  
*Explanation:  
Only number 1 has popcount-depth 1:  
- 1: 1₂, already 1, so depth is 1.*

### Thought Process (as if you're the interviewee)  
First, understand what **popcount-depth** means: for each integer, repeatedly apply the popcount function until the result is 1, and count the steps.

**Brute-Force Approach:**  
- For each \( x = 1 \) to \( n \):  
    - Compute its popcount-depth by looping until reaching 1.
    - Count if the depth equals \( k \).
- **Inefficient** for large \( n \) (up to \( 10^{12} \) or higher).

**Optimization:**  
Notice that **popcount** is based on the number of 1's in the binary representation.  
Let’s precompute the popcount-depth for all possible popcounts. Since at each step, the number gets smaller, the popcount-depth for a number can be determined recursively.

Use **digit DP** (Dynamic Programming on the bits of \( n \)):  
- State: (current bit position, how many 1's chosen so far, tight or not (limit)).
- At the end, if total 1's leads to popcount-depth \( k-1 \) (since the first step is just counting 1's), count that path.

Precompute popcount-depth for possible values (since the number of 1's can't exceed 64, precompute depths for 0 to 64).  
Final answer: For each possible number of 1's, see if its popcount-depth is \( k-1 \), then use DP to count how many numbers \(\leq n\) have that many 1's (i.e., combinations).

**Trade-offs:**  
- Precomputation makes checking depth fast.
- Digit DP reduces time from \( O(n) \) to \( O(\text{number of bits}^2) \), which is tractable.

### Corner cases to consider  
- \( n = 1 \): Only a single number.
- \( k = 1 \): Only numbers that are 1 (binary).
- \( k \) greater than possible for \( n \).
- \( n \) is all 1's (like \( 2^m - 1 \)).

### Solution

```python
def number_of_integers_with_popcount_depth_equal_to_k(n: int, k: int) -> int:
    # Precompute popcount-depth for 0 to 100
    MAX_POP = 100
    popcount_depth = [0] * (MAX_POP + 1)
    popcount_depth[0] = -1  # 0 is undefined, but won't be used
    popcount_depth[1] = 1   # base: depth of 1 is 1
    for i in range(2, MAX_POP+1):
        pc = bin(i).count('1')
        popcount_depth[i] = popcount_depth[pc] + 1

    from functools import lru_cache

    bits = list(map(int, bin(n)[2:]))

    @lru_cache(None)
    def dp(idx, ones, is_limit, is_num):
        if idx == len(bits):
            # Only care if number is chosen and ones > 0
            if is_num and k > 0 and ones > 0 and popcount_depth[ones] == k:
                return 1
            return 0

        res = 0
        up = bits[idx] if is_limit else 1
        # Option: put 0 here
        if not is_num:
            # Not started, can skip this digit (leading zero)
            res += dp(idx + 1, ones, False, False)
        for d in range(0 if is_num else 1, up + 1):
            res += dp(idx + 1,
                      ones + d,
                      is_limit and (d == up),
                      is_num or d)
        return res

    return dp(0, 0, True, False)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    \( O(\text{bit\_length}(n)^2) \) due to Digit DP (number of positions \(\times\) possible sum of ones, both up to ~64).
- **Space Complexity:**  
    \( O(\text{bit\_length}(n) \times \text{max\_ones}) \) for DP memoization storage.

### Follow-up questions  
- How would you optimize for multiple queries with different \( n \), but the same \( k \)?  
- What if you're required to return the actual numbers with a given popcount-depth, rather than just the count?