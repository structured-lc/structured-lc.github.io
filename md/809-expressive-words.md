### Leetcode 809 (Medium): Expressive Words [Practice](https://leetcode.com/problems/expressive-words)

### Description  
Given a string `s` and a list of query words, return the number of query words that are "stretchy" to `s`.  
A word is **stretchy** if it can become equal to `s` by extending (but not reducing) groups of the same character, and only if:
- The group in `s` has length 3 or more, and
- The corresponding group in the word is shorter, or
- The groups match exactly in length.

For instance, if `s = "heeellooo"` and a query word is `"hello"`, the `'e'` and `'o'` groups in `s` (length 3 each) can be formed by stretching those characters in `"hello"`, making it stretchy. But `"helo"` would fail because the structure does not match.

### Examples  

**Example 1:**  
Input: `s = "heeellooo"`, `words = ["hello", "hi", "helo"]`  
Output: `1`  
*Explanation: Only "hello" can be stretched to "heeellooo" ("hi" and "helo" cannot match the group pattern).*

**Example 2:**  
Input: `s = "aaa"`, `words = ["aaaa"]`  
Output: `0`  
*Explanation: "aaaa" cannot be contracted to "aaa", only extended.*

**Example 3:**  
Input: `s = "heeellooo"`, `words = ["heeellooo", "heeeellooo", "heeello"]`  
Output: `2`  
*Explanation: "heeellooo" matches as is. "heeello" matches by stretching the final `'o'`. "heeeellooo" has an excess `'e'` group, so it doesn't match.*

### Thought Process (as if you’re the interviewee)  
I’d start by understanding when a word is stretchy:
- **Group characters** in both `s` and each query.
- For each group:
  - **Characters must match.**
  - If the group in `s` is less than 3, their lengths must match exactly.
  - If the group in `s` is at least 3, the length in `words` can be less than or equal, but not more.
- Brute-force: For each word, compare groups one by one.
- Optimize: Process both `s` and each word by tracking character groups and counts in parallel, in a single pass.

### Corner cases to consider  
- Empty `s` or empty `words`
- Groups in `words` longer than in `s`
- Groups in `s` less than 3 but of different length than in the word
- `words` entries that are already equal to `s`
- `words` entries longer than `s`
- Sandwiched groups, like `"abbcccaa"` vs `["abccaa"]`

### Solution

```python
def expressiveWords(s: str, words: list[str]) -> int:
    def check(s, t):
        # i: pointer for s, j: pointer for t
        m, n = len(s), len(t)
        i = j = 0
        while i < m and j < n:
            if s[i] != t[j]:
                return False
            # Count repeats in s
            si = i
            while si < m and s[si] == s[i]:
                si += 1
            len_s = si - i
            # Count repeats in t
            tj = j
            while tj < n and t[tj] == t[j]:
                tj += 1
            len_t = tj - j
            # Group length rule check:
            if len_s < len_t:
                return False
            if len_s != len_t and len_s < 3:
                return False
            i, j = si, tj
        return i == m and j == n

    return sum(check(s, word) for word in words)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L × K),  
  where L is the length of `s` and K is the total length of all words (since for each word we iterate in parallel over `s` and `word`).
- **Space Complexity:** O(1) extra space (besides input and output),  
  since only pointers and counters are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we allow group contraction (reducing groups) as well as extension?  
  *Hint: Would need to adjust checks for group length being potentially reduced, not just increased.*

- How would you handle Unicode or non-ASCII characters or multibyte character sets?  
  *Hint: String slicing and character comparisons may not always be constant time.*

- How can you adapt this if the queries come in a stream instead of a batch?  
  *Hint: The check function is stateless, so it can be called on each word as it arrives.*

### Summary
This approach illustrates the **two-pointer** technique, paired with in-parallel group counting, to compare structural patterns between two strings efficiently. This pattern is common in “group sequence matching” and problems that ask for **grouped validation**, and shows up in string compression, run-length encoding, and diff utilities.