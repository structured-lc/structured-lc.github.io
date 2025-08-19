### Leetcode 1392 (Hard): Longest Happy Prefix [Practice](https://leetcode.com/problems/longest-happy-prefix)

### Description  
Given a string `s`, return its longest non-empty prefix which is also a suffix (excluding the entire string itself). For example, in the string "level", "l" is both a prefix and a suffix, but "level" itself can't be the answer. If there's no such prefix, return the empty string. This is a classic string matching/processing problem.

### Examples  

**Example 1:**  
Input: `s = "level"`  
Output: `"l"`  
*Explanation: Prefixes are "l", "le", "lev", "leve". Suffixes (excluding itself) are "l", "el", "vel", "evel". The largest prefix that is also a suffix is "l".*

**Example 2:**  
Input: `s = "ababab"`  
Output: `"abab"`  
*Explanation: Prefixes are "a", "ab", "aba", "abab", "ababa". Suffixes (excluding itself) are "babab", "abab", "bab", "ab", "b". "abab" is both a prefix and a suffix, and the longest one.*

**Example 3:**  
Input: `s = "abcdef"`  
Output: `""`  
*Explanation: No prefix (other than empty) is also a suffix.*

### Thought Process (as if you’re the interviewee)  
First, brute-force would check every possible prefix and see if it matches with the corresponding suffix. Try all lengths from n-1 down to 1 and, for each length, compare `s[:length]` with `s[-length:]`. But this gives O(n²) time.

To optimize, realize this is similar to computing the "prefix function" in KMP (Knuth-Morris-Pratt) pattern matching. The prefix function for each position j is the length of the longest proper prefix which is also a suffix for the substring s[:j+1]. The last value of this prefix function for the full string gives the required answer. Using this allows us to solve it in linear O(n) time.

### Corner cases to consider  
- Input string length is 1: always return "" (since we can't pick the full string).
- No repeated characters at all: return "" (e.g., "abcdefg").
- Whole string is the same char: return the prefix of length n-1 (e.g., "aaaaa" → "aaaa").
- Prefix and suffix overlap: For palindromes or repeated substrings, check for correct overlap.
- Input contains only two different chars: scenarios like "ababab" or "aaaaabaaaaa".

### Solution

```python
def longestPrefix(s: str) -> str:
    n = len(s)
    # prefix table: prefix[i] = length of the longest prefix that is also a suffix for s[:i+1]
    prefix = [0] * n
    j = 0  # length of the previous matching prefix

    # Start from the second character, loop over the string
    for i in range(1, n):
        while j > 0 and s[i] != s[j]:
            # If characters don't match, fall back in the prefix table
            j = prefix[j - 1]
        if s[i] == s[j]:
            j += 1
            prefix[i] = j
        # No need for else, since if characters don't match and j == 0,
        # prefix[i] will stay 0 (as initialized)

    # The value at prefix[-1] is the length of the longest happy prefix
    return s[:prefix[-1]]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — The prefix table is built in one pass, each character is visited at most twice due to fall-back.
- **Space Complexity:** O(n) — Just for the prefix table; no extra structures. The output ignores the cost of printing the substring.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution to return all "happy prefixes" (not just the longest)?  
  *Hint: Use the prefix table; every position with a non-zero value indicates a happy prefix.*

- How would this approach change for larger alphabets or Unicode strings?  
  *Hint: The KMP algorithm doesn't care about the alphabet size, just equality checks.*

- Can you do this without extra storage, i.e. O(1) space?  
  *Hint: You'd need to avoid explicitly storing the prefix array, maybe by recomputing on demand, but that would lose the linear time.*

### Summary
This problem is a classic example of the string prefix-suffix problem, efficiently solved using the KMP algorithm's prefix function. This approach avoids brute-force O(n²) by building a partial match table in linear time. Recognizing the "overlapping prefix-suffix" requirement is key, and this pattern often arises in string search problems like substring matching and finding repeated patterns.

### Tags
String(#string), Rolling Hash(#rolling-hash), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
- Sum of Scores of Built Strings(sum-of-scores-of-built-strings) (Hard)
- Maximum Deletions on a String(maximum-deletions-on-a-string) (Hard)
- Minimum Time to Revert Word to Initial State II(minimum-time-to-revert-word-to-initial-state-ii) (Hard)
- Minimum Time to Revert Word to Initial State I(minimum-time-to-revert-word-to-initial-state-i) (Medium)