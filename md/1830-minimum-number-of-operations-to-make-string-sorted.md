### Leetcode 1830 (Hard): Minimum Number of Operations to Make String Sorted [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-make-string-sorted)

### Description  
Given a string `s`, you can perform the following operation repeatedly to sort it in lexicographical order:
1. Find the largest index \(i\) (1 ≤ i < n) such that s[i] < s[i-1].
2. Find the largest index \(j\) ≥ \(i\) so that every s[k] for i ≤ k ≤ j is less than s[i-1].
3. Swap s[i-1] and s[j].
4. Reverse s[i:].
Return the minimum number of such operations needed to make `s` sorted, modulo \(10^9 + 7\).

Effectively, this counts the permutation index of `s` among all its possible permutations sorted in lexicographic order.

### Examples  

**Example 1:**  
Input: `s = "cba"`  
Output: `5`  
Explanation:  
All permutations in lex order: ["abc", "acb", "bac", "bca", "cab", "cba"].   
"cba" is the 6ᵗʰ permutation (0-based index 5).  
It takes 5 reverse operations to make it sorted ("abc").

**Example 2:**  
Input: `s = "aabaa"`  
Output: `2`  
Explanation:  
All permutations: ['aaaba', 'aabaa', 'aaba', 'aaba', 'abaaa', 'abaaa'].   
"aabaa" is the 2ⁿᵈ in lex order (0-based index 1), so 1 operation required. 
However, due to repeated characters, you must handle duplicate counts carefully.  

**Example 3:**  
Input: `s = "aabb"`  
Output: `1`  
Explanation:  
Sorted permutations: ["aabb", "abab", "abba", "baab", "baba", "bbaa"].  
"aabb" is in sorted order, so 0 operations needed.

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach**: Generate all permutations, sort, then find the index of the current string. This is too slow, as there can be up to n! permutations, which is intractable for n ≈ 10⁵.
- **Optimized approach**:  
  - Realize that the operation is analogous to the "previous permutation" operation, so the number of times to reach "sorted" is how many permutations are lex greater than the current one.
  - For a string with repeated letters, the number of permutations before the current string can be computed by scanning from the left, at each position counting how many smaller characters could be used and in how many ways letters to the right can be arranged (accounting for repeats).
  - This is a "permutation index with duplicate elements" problem.
  - Keep a frequency count for each character. At each position, for all chars `< s[i]`, count, and adjust for overcount via dividing by factorials of duplicates.
  - Precompute factorials up to n, and use modular inverse for divisions under mod.
  - This approach is efficient and avoids creating all permutations.

### Corner cases to consider  
- Empty string: should return 0 operations.
- All characters the same: string is already sorted, returns 0.
- Already sorted input: returns 0.
- String in exact reverse order: largest number of operations.
- Large strings with repeated characters: must handle duplicate character adjustment.

### Solution

```python
MOD = 10**9 + 7

def makeStringSorted(s: str) -> int:
    n = len(s)
    
    # Precompute factorials and inverse factorials up to n
    fact = [1] * (n+1)
    inv_fact = [1] * (n+1)
    
    for i in range(1, n+1):
        fact[i] = fact[i-1] * i % MOD
    inv_fact[n] = pow(fact[n], MOD-2, MOD)
    for i in range(n, 0, -1):
        inv_fact[i-1] = inv_fact[i] * i % MOD
    
    # Count of each character
    from collections import Counter
    count = [0]*26
    for c in s:
        count[ord(c) - ord('a')] += 1
    
    res = 0
    for i, ch in enumerate(s):
        ch_idx = ord(ch) - ord('a')
        # For all smaller characters
        for j in range(ch_idx):
            if count[j]:
                count[j] -= 1
                # Compute number of permutations with j at position i
                perms = fact[n - i - 1]
                for k in range(26):
                    perms = perms * inv_fact[count[k]] % MOD
                res = (res + perms) % MOD
                count[j] += 1
        count[ch_idx] -= 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* 26) = O(n), as each character and for each possible smaller character (constant 26) we do constant time work, including factorial/inverse lookups.
- **Space Complexity:** O(n), mainly due to factorial and inverse arrays of size n, plus a fixed count array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet can be unicode or unbounded?
  *Hint: How would you adapt your approach if the size of the alphabet is not constant?*

- Can we modify for finding the "k-th" permutation directly (not counting up to the current one)?
  *Hint: Start directly with a formula, rather than sum through all smaller at each step.*

- How can results change if string is extremely repetitive?
  *Hint: How does character repetition affect the total count of unique permutations?*


### Summary
This problem is a classic application of ranking permutations with duplicate elements, often seen in combinatorics and permutation index ranking. The core pattern uses factorial number system, frequency counts, and modular arithmetic including modular inverses for division under mod. Similar patterns show up in questions involving anagrams, unique arrangements, and generation or ranking of lexicographic permutations.