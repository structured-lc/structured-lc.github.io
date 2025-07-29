### Leetcode 3533 (Hard): Concatenated Divisibility [Practice](https://leetcode.com/problems/concatenated-divisibility)

### Description  
Given an array of positive integers **nums** and an integer **k**, find the **lexicographically smallest permutation** of **nums** (as a list of integers) such that if you concatenate all numbers in that order to form one big integer, this integer is divisible by **k**.  
If no such permutation exists, return an empty list.

### Examples  

**Example 1:**  
Input: `nums = [3,12,45], k = 5`  
Output: `[3,12,45]`  
*Explanation: "31245" is divisible by 5. Another valid permutation is [12,3,45] → "12345" (also divisible by 5), but [3,12,45] is lexicographically smaller.*

**Example 2:**  
Input: `nums = [10,5], k = 10`  
Output: `[5,10]`  
*Explanation: Two permutations: [10,5] → "105", not divisible by 10. [5,10] → "510", "510" % 10 == 0, valid and lex smallest.*

**Example 3:**  
Input: `nums = [2,3,7], k = 13`  
Output: `[]`  
*Explanation: All permutations concatenated are: 237, 273, 327, 372, 723, 732. None is divisible by 13. Return empty list.*


### Thought Process (as if you’re the interviewee)  
First, brute force: Try all permutations of **nums**, for each one form the concatenated integer, check divisibility by **k**, keep track of the smallest found.  
Downside: There are n! permutations, so it's infeasible for n > 8.

Optimization:
- Realize concatenation can be processed using modular arithmetic. When adding digit sequences, the formula for updating mod is:  
  new_mod = (prev_mod × 10^len(next_num) + next_num) % k  
- Use **Dynamic Programming with bitmasking**:  
    - **State**: (mask, mod): the set of used numbers, and the current value modulo k.
    - For each unused number, try to use it next: update the mod, and keep building.
    - The DP should always choose, at ties, the lexicographically smallest sequence.

- Key insight: Precompute powers of 10 mod k for each number's length (since 10^len mod k shows up often).
- At the end, if there’s no way to use up all numbers and get mod == 0, return empty list.

**Trade-offs:**  
- Space and time are exponential but feasible for n ≤ 13 (since 2ⁿ is up to 8,192).
- Requires careful state representation (bitmask, mod) and sequence reconstruction.
- DP ensures only smallest lex result is constructed.


### Corner cases to consider  
- **No permutation is valid** (return []).
- **Leading zeros**: Are numbers with leading zeros allowed? In this problem, all nums are positive, so no "0" elements.
- **Single element**: Only one number, check if it divides k.
- **All elements same**: Multiple identical numbers, be careful to avoid duplicates in permutations.
- **k = 1**: Any permutation is valid (smallest lex order).
- **Num contains 10** or 100 etc., with trailing zeros, potentially impactful for divisibility.


### Solution

```python
def concatenated_divisibility(nums, k):
    n = len(nums)
    nums_str = [str(x) for x in nums]
    lens = [len(s) for s in nums_str]
    pow10 = [pow(10, l, k) for l in lens]

    # Precompute all number mod k
    mods = [x % k for x in nums]

    from functools import lru_cache

    @lru_cache(None)
    def dp(mask, mod):
        # If all used, check mod
        if mask == (1 << n) - 1:
            return [] if mod != 0 else []
        res = None

        for i in range(n):
            if not (mask & (1 << i)):
                next_mod = (mod * pow10[i] + nums[i]) % k
                next_perm = dp(mask | (1 << i), next_mod)
                if next_perm is not None:
                    candidate = [nums[i]] + next_perm
                    if (res is None) or (candidate < res):
                        res = candidate
        return res

    # Since the recursive approach doesn't directly allow differentiating between invalid and valid solutions, define a wrapper
    result = None
    for i in range(n):
        first_mod = mods[i]
        path = dp(1 << i, first_mod)
        if path is not None:
            candidate = [nums[i]] + path
            if ((result is None) or (candidate < result)) and sum(1 for x in candidate if x != []) == n:
                # Ensure all positions are used, candidate contains no empty sublists.
                result = candidate

    return result if result is not None else []
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n² × k)  
    - 2ⁿ states (all subsets), for each, up to n transitions (which number to pick next), and each uses arithmetic mod k.
    - Acceptable for n ≤ 13.
- **Space Complexity:** O(2ⁿ × k)  
    - DP/memoization table stores state for (mask, mod).
    - Extra space for cache and permutation reconstruction.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you return **the number of valid permutations** instead of the smallest one?  
  *Hint: Count valid final states rather than building a particular sequence.*

- How would you handle cases where **nums contains zero or duplicate numbers**?  
  *Hint: Watch for repeated permutations and skip equivalent states, or handle 0 properly for lex order.*

- Can the algorithm be **generalized to other divisibility constraints, such as divisibility by multiple numbers**?  
  *Hint: Extend state to have more mods; efficient only if few constraints.*

### Summary
This problem uses **bitmask dynamic programming with memoization** and combinatorial state traversal. The main pattern is **subset DP**, often applied when permutations or arrangements need to be checked for optimality or property (like Hamiltonian path, the Traveling Salesman Problem).  
This DP + bitmasking template is common for small n and is directly reusable for other problems needing sequence construction and minimal lexicographical results under constraints.