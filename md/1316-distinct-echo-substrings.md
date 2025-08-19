### Leetcode 1316 (Hard): Distinct Echo Substrings [Practice](https://leetcode.com/problems/distinct-echo-substrings)

### Description  
Given a string, return the number of **distinct** non-empty substrings which can be written as `a + a`, meaning the substring consists of some string repeated twice in a row. For example, "abcabc" is valid (since it's "abc" + "abc"), but "aba" is not. Each distinct valid substring is only counted once, regardless of how many times it occurs in the text.

### Examples  

**Example 1:**  
Input: `text = "abcabcabc"`  
Output: `3`  
*Explanation: Echo substrings are: "abcabc", "bcabca", and "cabcab". Each of them can be written as `a + a` for some non-empty substring "a".*

**Example 2:**  
Input: `text = "leetcodeleetcode"`  
Output: `2`  
*Explanation: The substrings "ee" and "leetcodeleetcode" can each be written as `a + a` where "a" is "e" and "leetcode" respectively.*

**Example 3:**  
Input: `text = "aaaaa"`  
Output: `2`  
*Explanation: The substrings "aa" and "aaa" (taking first four: "aa" at positions 0-1, 1-2, 2-3; "aaaa" at positions 0-3, 1-4) but among these only the unique substrings are counted once. "aa" and "aaaa" are two distinct echo substrings.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Check all possible substrings of `text`.
  - For each substring, if the length is even, split it in half and compare both halves. If they're the same, add to a set for uniqueness.
  - Time complexity: O(n³) because there are O(n²) substrings, each comparison can take O(n).
- **Optimize:**  
  - Direct comparison is slow for large substrings. Use hashing (e.g., rolling hash/Rabin-Karp) to efficiently compare substrings. This brings substring comparison to O(1) after preprocessing prefix hashes.
  - For each position, try all possible substring lengths (must be even to form `a + a`), calculate hash for both halves, compare, and add to the result set if they match.
  - With hashing, total time is O(n²) – feasible for n ≤ 2000.
- **Why final approach is better:**  
  - Brute-force works on small inputs but too slow for max constraints. Hashing makes this practical and robust for interview-level coding.

### Corner cases to consider  
- Empty string (not allowed by constraint as n ≥ 1, but worth verifying).
- No echo substrings present at all.
- All letters the same, e.g., "aaaaaaa".
- Length 1 (no echo substring possible).
- Multiple overlapping echo substrings; ensure only *distinct* substrings are counted.
- Palindromic substrings that are not echo substrings (don't confuse).

### Solution

```python
def distinctEchoSubstrings(text):
    n = len(text)
    # Precompute prefix hashes and powers for rolling hash
    base = 131
    mod = 10**9 + 7
    # h[i]: hash of text[0:i] (prefix exclusive)
    h = [0] * (n + 1)
    # p[i]: base**i % mod
    p = [1] * (n + 1)
    for i in range(1, n + 1):
        h[i] = (h[i-1] * base + ord(text[i-1])) % mod
        p[i] = (p[i-1] * base) % mod

    def get_hash(l, r):
        # Get hash of text[l:r] (inclusive, exclusive)
        return (h[r] - h[l] * p[r - l]) % mod

    seen = set()
    # Try every possible half-length (len1), and two halves: [i,i+len1), [i+len1,i+2*len1)
    for length in range(1, n // 2 + 1):
        for i in range(n - 2*length + 1):
            # Compare text[i : i+length] with text[i+length : i+2*length]
            if get_hash(i, i+length) == get_hash(i+length, i+2*length):
                seen.add(get_hash(i, i+2*length))  # store hash for uniqueness
    return len(seen)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). For each possible length (up to n//2), and each starting position, we do O(1) hash comparisons.  
- **Space Complexity:** O(n²) worst-case for storing all possible hashes in the set, plus O(n) for prefix hash/power arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if text length increases to 10⁵, and hash collisions are a concern?  
  *Hint: Consider double hashing (two hash functions with different primes) or use suffix automaton/Suffix Array for linear substring operations.*

- Can you find not just counts but all positions where echo substrings start?  
  *Hint: Store not just hashes, but associated indices when echo match is found.*

- How would your approach change for counting overlapping vs non-overlapping echo substrings?  
  *Hint: Carefully track counts per start position, or adjust scan windows accordingly.*

### Summary
This problem uses the **rolling hash/Rabin-Karp** pattern for fast substring equality checks, classic for substring search or duplicate substring problems. Core concept: reduce O(n³) brute-force to O(n²) by using precomputed hashes. This pattern is widely applicable in string matching, substring distinctness, and plagiarism detection problems. Optimizations like double-hashing or suffix automatons can make solutions robust for very large strings.

### Tags
String(#string), Trie(#trie), Rolling Hash(#rolling-hash), Hash Function(#hash-function)

### Similar Problems
- Find Substring With Given Hash Value(find-substring-with-given-hash-value) (Hard)