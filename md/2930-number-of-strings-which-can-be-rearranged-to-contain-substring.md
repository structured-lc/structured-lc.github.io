### Leetcode 2930 (Medium): Number of Strings Which Can Be Rearranged to Contain Substring [Practice](https://leetcode.com/problems/number-of-strings-which-can-be-rearranged-to-contain-substring)

### Description  
You are given an integer **n**. The task is to find how many strings of length **n**, using only lowercase English letters, can be rearranged so that they contain **"leet"** as a substring (i.e., *some arrangement of the string must have "leet" appear consecutively*).  
A string is considered "good" if you can rearrange its letters to form some string that contains "leet" (for example, "eelt" can become "leet", which contains "leet" as a substring). The answer may be large, so return the result modulo 1_000_000_007.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `12`  
*Explanation: There are 4! / (2!) = 12 unique ways to arrange the multiset {l, e, e, t} ("leet", "eelt", "elte", etc), because the minimal string must have at least {l, e, e, t}. All such permutations can form "leet" as a substring.*

**Example 2:**  
Input: `n = 10`  
Output: `83943898`  
*Explanation: The number of strings of length 10 whose letters can be rearranged to contain "leet" as a contiguous substring is 526083947580. The answer modulo 1_000_000_007 is 83943898.*

**Example 3:**  
Input: `n = 7`  
Output: `831600`  
*Explanation: All strings of length 7 can contain "leet" as a substring if their letters can be arranged to include "l", two "e"s, and "t", and the remaining 3 letters can be any combination. Compute all such combinations that ensure "leet" can be formed somewhere in the rearrangement.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to generate all possible strings of length **n**, and for each string, check whether its letters can be rearranged such that "leet" becomes a contiguous substring. However, this is infeasible since total strings is 26ⁿ, which grows exponentially.

Let's analyze "leet":
- "leet" has 4 letters: l, e, e, t (with 'e' repeating twice).
- For any string of length n to be "good", it must contain at least those 4 letters ('l', 'e' × 2, 't') somewhere.
- Rearrangement is allowed, so their positions do not matter except that they must be present and can be grouped together (formed as substring in some rearrangement).

Reducing the problem:  
1. **Where can "leet" go:**  
   For a string of length n, "leet" as a substring can start at any position from 0 to n-4.
2. **Rest of the string:**  
   The other (n-4) positions can be filled with any lowercase letter.
3. **Overlap:**  
   If "leet" appears more than once, and because "leet" has repeating 'e', we need to prevent overcounting.

We need to count all multisets of n letters where some arrangement brings "leet" together as substring.

This is a classic combinatorics + inclusion-exclusion question where:
- For each position (0..n-4) to place "leet", fill the n-4 other spots with any letters (26 choices each).
- But if "leet" can overlap at multiple spots (since "leet" starts at multiple indices in longer n), we need inclusion-exclusion to avoid overcounting cases where "leet" appears in two or more places after rearrangement.

For small n (n = 4), all permutations of {l, e, e, t} are valid: permutations = 4! / 2! = 12 (because 'e' repeats).

For larger n, inclusion-exclusion principle is used, with dp/memoization for efficiency.

### Corner cases to consider  
- **n < 4**: Impossible to have "leet" as substring; answer is 0.
- **n = 4**: Only valid if string is a permutation of "leet".
- **n > 4**: Inclusion-exclusion is essential for multiple placements.
- Cases with repeated letters or 'e' count not matching.
- Ensure modulo arithmetic is used throughout to avoid overflow.

### Solution

```python
MOD = 10**9 + 7

# Precompute factorials for combinatorics up to n = 10^5
def compute_factorials(n, mod):
    fact = [1] * (n+1)
    inv_fact = [1] * (n+1)
    for i in range(1, n+1):
        fact[i] = fact[i-1] * i % mod
    inv_fact[n] = pow(fact[n], mod-2, mod)
    for i in range(n-1, -1, -1):
        inv_fact[i] = inv_fact[i+1] * (i+1) % mod
    return fact, inv_fact

# nCr % mod
def comb(n, k, fact, inv_fact, mod):
    if k < 0 or k > n:
        return 0
    return fact[n] * inv_fact[k] % mod * inv_fact[n-k] % mod

def numberOfGoodStrings(n):
    if n < 4:
        return 0
    
    fact, inv_fact = compute_factorials(n, MOD)
    total = 0
    
    # Inclusion-Exclusion Principle: 
    # number of ways to place "leet" as substring at i of the positions, 
    # subtract overlaps
    for k in range(1, n-4+2):  # k = number of occurrences of "leet" substring
        # number of ways to choose k positions for "leet" substrings (without overlap)
        # There are (n - 4*k + k) = n - 3k slots left after placing k * "leet" substrings at non-overlapping spots
        ways_to_place = comb(n - 3*k, k, fact, inv_fact, MOD)
        # number of ways to fill remaining spots with any letters (26 choices)
        rest_len = n - 4*k
        ways_rest = pow(26, rest_len, MOD)
        # Because placing k substrings, number of ways those cannot overlap: inclusion-exclusion sign
        sign = 1 if k % 2 == 1 else -1
        total = (total + sign * ways_to_place * ways_rest) % MOD
        
    return total % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for precomputing factorials, plus O(n) for the main loop (since at most n/4 "leet" fits in n). Each operation inside the loop takes O(1) due to precomputation.
- **Space Complexity:** O(n) for the factorial and inverse factorial arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this for a different substring (not "leet") or a substring with repeating or non-repeating characters?  
  *Hint: Generalize counting, adjust for character frequencies and overlaps.*

- What would change if the string must have "leet" as a *subsequence* instead of substring?  
  *Hint: Subsequence allows distributed letters, increases search space.*

- Can you optimize for very large values of **n** (n ≥ 1e7)?  
  *Hint: Use Lucas' theorem for combinations, or optimize power/memory usage.*

### Summary
This problem is a classic application of **combinatorics with inclusion-exclusion**, where you count placements for a substring in all possible rearrangements while ensuring no overcount due to overlapping occurrences. The approach generalizes to other substrings and permutation-covering substring search, and the pattern (inclusion-exclusion + combinatorial state counting) often comes up in advanced counting and arrangement questions in interviews and competitions.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
- Count Vowels Permutation(count-vowels-permutation) (Hard)