### Leetcode 3138 (Medium): Minimum Length of Anagram Concatenation [Practice](https://leetcode.com/problems/minimum-length-of-anagram-concatenation)

### Description  
Given a string **s**, which is known to be a concatenation of **anagrams** of some string **t**, return the minimum possible length of string **t**.  
*An anagram* means any permutation, so for instance, "aab", "aba", and "baa" are all anagrams of "aab".  
Our goal: Find the smallest length **k** (k ≥ 1) so that s consists of repeated anagrams of some t with length k.

### Examples  

**Example 1:**  
Input: `s = "abba"`  
Output: `2`  
*Explanation: The string can be split into ["ab", "ba"], both are anagrams of "ab", so min t length = 2.*

**Example 2:**  
Input: `s = "cdef"`  
Output: `4`  
*Explanation: "cdef" cannot be split further, so t = "cdef" itself, with min t length = 4.*

**Example 3:**  
Input: `s = "abcabcabcabc"`  
Output: `3`  
*Explanation: Split into ["abc", "abc", "abc", "abc"], which are all anagrams of "abc", so min t length = 3.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try every possible substring length k (1 to n), check if s can be split into parts of k that are anagrams of each other.
    - For each k, check if n is divisible by k. For each segment of length k, count character frequencies and compare.
    - Time heavy if implemented naively, as you'd compare each chunk using collections.
- **Optimization**:  
    - Since s is built from repeated anagrams, the **length of t must divide the length of s**.
    - Count characters in the entire s. For a candidate k, for every letter, count_i must be divisible by n // k, i.e., # of chunks.  
    - For each possible k (from 1 to n), if k divides n (where n = len(s)), and the count of each character is divisible by (n//k), then k could be the answer.
    - Return the smallest such k.
- **Why this works**:  
    - In order to always form a collection of segments that are anagrams, each letter must be distributed evenly among all segments.

### Corner cases to consider  
- Length 1 string.
- All letters the same.
- No repeating characters (t = s).
- String of length n, but not all divisor k will work, e.g., counts not matching per chunk.
- Letters with high frequency but k too small.
- s = ‘aabb’, answer is 2 because [‘aa’,’bb’] fails, but [‘ab’,‘ab’] works.

### Solution

```python
def minAnagramLength(s):
    n = len(s)
    # 1. Count frequency of each character in s
    freq = [0] * 26
    for c in s:
        freq[ord(c) - ord('a')] += 1

    # 2. Try all possible k (length of t), k must divide n
    for k in range(1, n + 1):
        if n % k != 0:
            continue  # k must divide n
        chunk_count = n // k
        possible = True
        for count in freq:
            if count % chunk_count != 0:
                possible = False
                break
        if possible:
            return k  # Found the smallest k

    return n  # In the worst case, t = s itself
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × sqrt(n)).  
    - We iterate through all divisors k of n (≤ sqrt(n) for finding all divisors), and for each try, we check all 26 letters (constant). So O(sqrt(n) × 26) ~ O(sqrt(n)), plus O(n) for initial counting.  
- **Space Complexity:** O(1)
    - Only 26 for the freq array, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if s can contain uppercase and lowercase letters?
  *Hint: How would you modify for a larger charset or case differences?*

- Can you reconstruct a possible minimum t, not just find its length?
  *Hint: Think about distributing letters equally.*

- Suppose the input is a stream of characters; can you solve this efficiently without storing the whole string?
  *Hint: Is only the frequency map enough? When would it not be?*

### Summary
This is a **divisor/frequency analysis pattern**: The answer relies on properties of divisibility for chunked regularity, and frequency checks for "anagram-ness." The main technique (character counting + divisor enumeration) is common in substring construction problems, string periodicity, and can be used in questions like minimal string rotation, or period-finding in cyclic patterns. The solution is also efficient, requiring only counting, and divisor logic.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
