### Leetcode 3129 (Medium): Find All Possible Stable Binary Arrays I [Practice](https://leetcode.com/problems/find-all-possible-stable-binary-arrays-i)

### Description  
Given three positive integers: **zero**, **one**, and **limit**.  
A **stable binary array** is an array of length (zero + one) containing exactly **zero** 0s and **one** 1s, such that **every** subarray of length greater than **limit** contains **at least one 0 and at least one 1** (i.e., there is no subarray of size limit+1 or larger that is all 0s or all 1s).  
Return the **total number of stable binary arrays** possible. Since the answer may be very large, return it modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `zero=1, one=1, limit=2`  
Output: `2`  
Explanation: Arrays `[1,0]` and `[0,1]` both have one 0 and one 1, and all subarrays longer than 2 do not exist, so they are both stable.

**Example 2:**  
Input: `zero=1, one=2, limit=1`  
Output: `1`  
Explanation:  
- Only `[1,0,1]` is stable.  
- `[1,1,0]` and `[0,1,1]` are *not* stable: for them, the subarray `[1,1]` (length 2 > limit) is all 1s, which is not allowed.

**Example 3:**  
Input: `zero=3, one=3, limit=2`  
Output: `14`  
Explanation: There are 14 ways to arrange three 0s and three 1s so that no three consecutive 0s or 1s occur (i.e., no subarray of length 3 is all the same digit).

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  A brute-force approach would be to generate all possible permutations of the array with the given number of 0s and 1s, and for each, check whether it is stable. But this is exponentially slow (combinatorial explosion) for larger numbers.

- **Optimization:**  
  Since subarrays longer than **limit** must contain both 0 and 1, we can't have a run of 0s or 1s of length **limit+1** or more. So, no more than **limit** consecutive 0s or 1s can occur.  
  This is a **classic dynamic programming on combinations with constraints on consecutive element counts**.

- **DP State:**  
  Let `dp(z, o, last, cnt)` be the count of binary arrays with `z` 0s, `o` 1s, where the last placed digit is `last` (0 or 1), and we have just placed `cnt` consecutive `last` digits.  
  - Base case: `z == 0 and o == 0` ⇒ 1 only valid arrangement.
  - For each call, try to place a 0 or 1 (respecting counts and limit on consecutive).
  - Memoize by (z, o, last, cnt).
  - Try both possibilities — extend the current sequence or switch.

- **Why DP:**  
  DP avoids generating every permutation, only counting ways that obey constraints, and reduces redundancy by memoization.

### Corner cases to consider  
- All zeros or all ones (should not happen as both counts are positive, but if limit is large enough, arrays with all 0s/1s must not count).
- limit greater than or equal to sum of zeros or ones (be aware, in that case, restriction is no longer effective; all arrangements possible).
- zero = 0 or one = 0 (edge case, no solution since subarrays would violate the rule if their length > limit).
- Smallest possible input (zero=1, one=1, limit=1).
- Large input sizes (must be efficient).

### Solution

```python
MOD = 10**9 + 7

def findStableBinaryArrays(zero: int, one: int, limit: int) -> int:
    from functools import lru_cache

    # dp(zeros_left, ones_left, last_digit, streak_count)
    @lru_cache(maxsize=None)
    def dp(z, o, last, streak):
        # If we've used all zeros and ones, valid arrangement found
        if z == 0 and o == 0:
            return 1

        total = 0

        # Try to place a 0 next
        if z > 0:
            if last != 0:
                # Can always switch
                total += dp(z-1, o, 0, 1)
            else:
                # Only add a 0 if streak < limit
                if streak < limit:
                    total += dp(z-1, o, 0, streak+1)

        # Try to place a 1 next
        if o > 0:
            if last != 1:
                total += dp(z, o-1, 1, 1)
            else:
                if streak < limit:
                    total += dp(z, o-1, 1, streak+1)
        
        return total % MOD

    # Try starting with either 0 or 1
    ans = 0
    if zero > 0:
        ans += dp(zero-1, one, 0, 1)
    if one > 0:
        ans += dp(zero, one-1, 1, 1)
    return ans % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(zero × one × 2 × limit).  
  There are ≤ zero × one × 2 choices (last is 0 or 1) × limit (streak count ≤ limit), and each state is computed once due to memoization.
- **Space Complexity:** O(zero × one × 2 × limit) for memoization cache.

### Potential follow-up questions (as if you’re the interviewer)  

- If the input array was not binary, but ternary (0/1/2), how would this extend?
  *Hint: DP dimensions increase, but idea is the same — track last digit and streak, and make sure no illegal runs.*

- What if the limit is different for 0s and 1s (limit0, limit1)?
  *Hint: Parameterize the streak limit separately for each value depending on which digit you’re adding.*

- How would you output all the valid arrays rather than count them?
  *Hint: Backtracking with state keeping the path, but prune invalid branches early using the same DP structure.*

### Summary
This problem uses the **Dynamic Programming with constraint on consecutive elements** pattern.  
It’s very similar to classic string construction or valid sequences problems where there’s a maximum allowed run of any value (like "arrangements without more k consecutive identical numbers").  
Such DP ideas are used in problems on **combinatorics with forbidden substrings**, **run-length upper-boundings**, and **balanced parentheses generation with restrictions**.  
Efficient DP memoization yields solution even for large inputs within limits.

### Tags
Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
- Contiguous Array(contiguous-array) (Medium)
- Binary Subarrays With Sum(binary-subarrays-with-sum) (Medium)