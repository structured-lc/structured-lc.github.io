### Leetcode 2539 (Medium): Count the Number of Good Subsequences [Practice](https://leetcode.com/problems/count-the-number-of-good-subsequences)

### Description  
Given a string s of lowercase English letters, count how many **good** subsequences s has.  
A **good** subsequence is not empty, and every character in it appears the same number of times (the frequency of every included character is equal, for example: "aabb", "bb", but not "aab" or "abcdeaa").  
Return the count modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `s = "aabb"`  
Output: `11`  
Explanation:  
All non-empty subsequences = 2⁴ - 1 = 15.  
Bad subsequences (not "good"): subsequences where frequencies are not equal: "a", "b", "aa", "bb", "aab", and the empty string.  
Good ones: ["aabb", "ab", "ba", "baba", ...] (total: 11).

**Example 2:**  
Input: `s = "leet"`  
Output: `12`  
Explanation:  
Total non-empty = 2⁴ - 1 = 15.  
There are three subsequences which are not good: "l", "e", "t", and the empty subsequence.  
So, 15 - 3 = 12.

**Example 3:**  
Input: `s = "abcd"`  
Output: `15`  
Explanation:  
Each letter appears once.  
All 2⁴-1 = 15 non-empty subsequences are good.

### Thought Process (as if you’re the interviewee)  

- **Brute-Force:**  
  Try all subsequences, check the frequency of every character. For each non-empty subset, count occurrences for each letter and see if all nonzero frequencies are equal.  
  This is infeasible for n up to 10⁴, as the number of subsequences is 2ⁿ.

- **Combinatorial Insight:**  
  Each good subsequence is determined by:
    - Choosing a nonzero frequency f (1 ≤ f ≤ max frequency of any letter in s).
    - For each letter with count ≥ f, choose whether to include it in the subsequence. If included, select f occurrences of this letter.
    - The number of ways:  
      ∏( C(cntᵢ, f) + 1 ) over all 26 letters (the '+1' is for picking none of that character), subtract 1 (to exclude the case where none are picked).

- **Implementation Steps:**  
  - Count the frequency of each letter.
  - For freq f = 1 to max(freq), for each character with cnt ≥ f, add (C(cnt, f) + 1). For all other letters use 1 (do nothing).
  - For each f, compute the product, subtract 1, and add to the answer.

- **Trade-offs:**  
  The trickiest part is handling large n and efficiently computing combinations C(n, k). Precompute factorials and inverses modulo MOD for quick C(n, k) computation using Fermat’s Little Theorem.

### Corner cases to consider  
- Very long strings (up to 10⁴).
- All letters unique ("abcd...").
- All same letter ("aaaa").
- Mixture of high and low frequency letters.
- Empty string (but constraints guarantee at least one character).
- Only one character ("a").

### Solution

```python
MOD = 10**9 + 7

def countGoodSubsequences(s: str) -> int:
    # Count frequency of each character ('a' to 'z')
    freq = [0] * 26
    for c in s:
        freq[ord(c) - ord('a')] += 1

    n = len(s)
    max_f = max(freq)
    
    # Precompute factorials and modular inverses for quick combinations
    factorial = [1] * (n + 1)
    inv_factorial = [1] * (n + 1)
    for i in range(1, n + 1):
        factorial[i] = factorial[i-1] * i % MOD

    # Fermat's Little Theorem for modular inverse
    def modinv(x):
        return pow(x, MOD - 2, MOD)

    inv_factorial[n] = modinv(factorial[n])
    for i in range(n-1, 0, -1):
        inv_factorial[i] = inv_factorial[i+1] * (i+1) % MOD

    # Helper to calculate C(n, k) % MOD
    def comb(n, k):
        if n < k or k < 0: return 0
        return factorial[n] * inv_factorial[k] % MOD * inv_factorial[n-k] % MOD

    result = 0
    for f in range(1, max_f + 1):
        prod = 1
        for cnt in freq:
            if cnt >= f:
                prod = prod * (comb(cnt, f) + 1) % MOD
        result = (result + prod - 1) % MOD  # Subtract 1 for the case where none are chosen

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(26 × n + n) = O(n)  
  (Preprocessing factorials, looping maximum frequency (≤ n), and iterating 26 letters for each frequency.)

- **Space Complexity:**  
  O(n) for factorial and inverse tables, plus O(1) for freq array (fixed size 26).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do it without precomputing all factorials?  
  *Hint: Think about using iterative modular inverse only as needed.*

- What if we want to list all the good subsequences, not just count?  
  *Hint: The output size could be exponential, but can be generated recursively or via backtracking for small cases.*

- How would you change the solution if the alphabet was much larger (e.g., Unicode)?  
  *Hint: Only store frequency counts for present characters; avoid a fixed-size array.*

### Summary
This problem is a classic application of **combinatorial enumeration** with optimization through precomputed modular arithmetic. The key pattern is recognizing when to use combinations and inclusion-exclusion principles efficiently. Similar approaches can apply to subset or subsequence counting problems with frequency or group constraints (e.g., grouping anagrams, equal-frequency selections).