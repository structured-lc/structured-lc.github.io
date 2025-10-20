### Leetcode 2983 (Hard): Palindrome Rearrangement Queries [Practice](https://leetcode.com/problems/palindrome-rearrangement-queries)

### Description  
You are given a string `s` and a list of queries. Each query consists of four integers `[l1, r1, l2, r2]`. For a query, you must determine whether the substring `s[l1..r1]` can be *rearranged* to become a palindrome if and only if the substring `s[l2..r2]` can also be rearranged to become a palindrome, and if so, return `True`; otherwise, return `False`.

A substring can be rearranged as a palindrome if at most one character in the substring appears an odd number of times.

### Examples  

**Example 1:**  
Input:  
`s = "babaacdaddececabb"`  
`queries = [[0,2,7,9],[1,4,12,15],[0,7,4,11]]`  
Output:  
`[True,False,True]`  
*Explanation:*

- Query 1: "bab" and "dad" can both be rearranged as palindrome ("bab" → "aba", "dad" is already a palindrome)
- Query 2: "abaa" and "cabb" → Only "abaa" can be rearranged as palindrome, but "cabb" can't (since "cabb" has two odd counts: 'c':1, 'a':1, 'b':2)
- Query 3: Both spans are of length 8 and character counts are similar for a palindromic rearrangement.

**Example 2:**  
Input:  
`s = "abcba"`  
`queries = [[0,4,4,4]]`  
Output:  
`[True]`  
*Explanation:*

- Query: "abcba" and "a" — both can be rearranged as palindromes ("abcba" is already a palindrome, "a" itself is a palindrome).

**Example 3:**  
Input:  
`s = "abccba"`  
`queries = [[0,2,3,5],[1,4,2,5]]`  
Output:  
`[True,False]`  
*Explanation:*

- Query 1: "abc" and "cba" — both can be rearranged as palindromes.
- Query 2: "bccb" and "cba" — "bccb" can be rearranged as "bccb" or "bcbc", but "cba" only has one arrangement with all different letters, so only one can be a palindrome.

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  For each query, get the character frequency of both substrings, check if both can be rearranged to be a palindrome (check ≤1 odd count for both). Time: O(q × n), not efficient for large n or many queries.

- **Optimize:**  
  Precompute prefix frequency counts for each character a-z so we can get substring counts in O(1) per query.  
  For each query, get count for each substring, count odd freq, and compare.

- **Hash/Bitmask Trick:**  
  Since palindromic rearrangement only depends on counts' parity, use bitmasks: for each prefix, maintain a bitmask where the iᵗʰ bit toggles for every occurrence of cᵢ ('a'+i).  
  To get parity mask of a substring, XOR prefix masks: prefix_mask[r+1] ⊕ prefix_mask[l].
  Both substrings' parity bitmask must have ≤1 bit set — and for the queries, both must or must not be rearrangeable to palindrome at the same time (symmetric).

- **Final Approach:**  
  Use prefix masks; for each query, compare the parity results for both substrings, and require that both either can or cannot form palindrome.

### Corner cases to consider  
- Empty substring queries (if allowed; usually not allowed with given constraints).
- Single character substrings — always a palindrome.
- Substrings with all even-count characters.
- Substrings where all but one character have even counts.
- Extremely large s and queries — efficiency crucial.

### Solution

```python
def can_make_palindrome(s, queries):
    n = len(s)
    # Prefix parity mask: mask[i] = parity of s[0..i-1]
    mask = [0] * (n + 1)
    for i, c in enumerate(s):
        mask[i + 1] = mask[i] ^ (1 << (ord(c) - ord('a')))
        
    res = []
    for l1, r1, l2, r2 in queries:
        m1 = mask[r1 + 1] ^ mask[l1]
        m2 = mask[r2 + 1] ^ mask[l2]
        
        def can_pal(m):
            # At most one bit set → ≤1 odd freq
            return bin(m).count('1') <= 1
        
        res.append(can_pal(m1) == can_pal(m2))  # must agree
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q), where n = len(s) and q = number of queries.  
  - O(n) to compute prefix bitmasks.
  - O(1) per query.

- **Space Complexity:** O(n) for prefix mask array; O(q) for result; negligible extra space (no recursion).

### Potential follow-up questions (as if you’re the interviewer)  

- If s contains uppercase and lowercase, how do you handle case sensitivity?  
  *Hint: Normalization (convert to lowercase or track both cases separately).*

- What if the queries are dynamic (e.g., support character update in s)?  
  *Hint: Use segment tree or Binary Indexed Tree with parity masks.*

- How would you generalize to support unicode or larger alphabets efficiently?  
  *Hint: Trade-off between bitmask (fast for small) and array for larger alphabets.*

### Summary
The solution uses the classic **palindrome permutation** check with prefix **bitmask for parity** of character counts, a smart use of bitwise manipulation for O(1) substring checks.  
This technique is common in palindrome substring, even/odd count tracking, and fast range queries; it's broadly applicable to problems involving parity or subset frequency queries.


### Flashcard
Precompute prefix frequency arrays for characters a-z. For each query's two substrings, extract character counts in O(1) and check if both can form palindromes (≤1 character with odd count each) using frequency comparison.

### Tags
Hash Table(#hash-table), String(#string), Prefix Sum(#prefix-sum)

### Similar Problems
- Longest Chunked Palindrome Decomposition(longest-chunked-palindrome-decomposition) (Hard)