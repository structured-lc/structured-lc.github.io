### Leetcode 2486 (Medium): Append Characters to String to Make Subsequence [Practice](https://leetcode.com/problems/append-characters-to-string-to-make-subsequence)

### Description  
Given two strings, **s** and **t**, determine the *minimum number of characters* that must be **appended to the end of s** to make **t** a subsequence of the resulting string.  
A subsequence of a string is a new string generated from the original string with some (possibly none) characters deleted without changing the relative order of the remaining characters.  
In other words: Find the minimum characters to add to the *end* of s so that t appears as a subsequence in the new string.

### Examples  

**Example 1:**  
Input: `s = "coaching", t = "coding"`  
Output: `4`  
*Explanation: The longest subsequence of s matching a prefix of t is "coing". The unmatched portion of t is "d", "i", "n", "g" (4 letters), so we need to append them.*

**Example 2:**  
Input: `s = "abcde", t = "a"`  
Output: `0`  
*Explanation: "a" already appears as a subsequence of s, so no characters are needed.*

**Example 3:**  
Input: `s = "z", t = "abcde"`  
Output: `5`  
*Explanation: No characters from t appear in s. So we need to append the entire t: "a", "b", "c", "d", "e".*


### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try all ways to append different suffixes of t to s, check after each whether t becomes a subsequence. This is very inefficient, as checking all suffixes takes O(n\*m) time for large n, m.
- **Optimization:** Use two-pointers.  
    - Pointer i traverses s, pointer j traverses t.
    - For each character in s, if s[i] == t[j], move both pointers; otherwise only i.
    - At the end, if we have matched `j` characters from t, the remaining characters (from j to len(t)-1) must be appended.
    - So, minimal characters to append = len(t) - j.
- **Why this is efficient:** This approach only scans both strings once (O(n+m)), with no backtracking. This is the optimal way for subsequence checking.

### Corner cases to consider  
- s is empty: must append entire t.
- t is empty: no need to append anything (output 0).
- s and t are equal: output 0.
- Some, but not all, of t appears scattered in s.
- Characters in t do not occur at all in s.
- s and/or t contain repeating characters or overlapping areas.
- s is much longer than t, but missing required t chars.

### Solution

```python
def appendCharacters(s: str, t: str) -> int:
    # Pointer for t
    j = 0

    # Traverse each character in s, matching to t whenever possible
    for c in s:
        # If current character matches t[j], move t pointer
        if j < len(t) and c == t[j]:
            j += 1
        # If all characters in t matched, we can stop
        if j == len(t):
            return 0

    # The unmatched part of t must be appended
    return len(t) - j
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of s.  
  Each character in s is checked at most once. t may also be swept once but no nested search occurs.
- **Space Complexity:** O(1), only integer pointers are used for traversal. No additional memory is required beyond constant space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could insert characters anywhere (not just at the end)?  
  *Hint: Think about the "shortest common supersequence"—a more complex dynamic programming problem, similar to edit distance.*

- How would you handle multiple queries efficiently for different t on the same s?  
  *Hint: Preprocess s (build index maps) so you can answer each t in O(m log n) or better.*

- What if you had to also compute which characters must be appended?  
  *Hint: Collect the suffix of t starting from the first unmatched index.*

### Summary
This problem uses the classic **two-pointer subsequence pattern**—efficiently advancing through both strings to match as many of t’s characters as possible in s. The number of unmatched t characters at the end gives the minimal number of characters to append.  
This technique is common in string scanning, subsequence testing, and merging sorted arrays or lists, and provides a foundation for more challenging sequence alignment problems.