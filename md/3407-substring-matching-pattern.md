### Leetcode 3407 (Easy): Substring Matching Pattern [Practice](https://leetcode.com/problems/substring-matching-pattern)

### Description  
Given a string **s** and a pattern string **p** (which contains **exactly one '\*'** character), determine if by replacing '\*' in **p** with any sequence (including empty) of characters, **p** can be made to occur as a substring of **s**.

- The '\*' in **p** can represent any sequence of zero or more characters.
- Return **True** if **p** (after replacement) can be a substring of **s**; otherwise, return **False**.

### Examples  

**Example 1:**  
Input: `s = "leetcode"`, `p = "ee*e"`  
Output: `True`  
*Explanation: The '\*' can be replaced by "tcod", forming "eetcode" which is a substring of "leetcode".*

**Example 2:**  
Input: `s = "car"`, `p = "c*v"`  
Output: `False`  
*Explanation: There is no way to replace '\*' in "c*v" to match any substring of "car".*

**Example 3:**  
Input: `s = "luck"`, `p = "u*"`  
Output: `True`  
*Explanation: Replacing '\*' by "", "c", or "ck" gives "u", "uc", or "uck", any of which are found in "luck".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try every possible substring of **s** that matches the non-'*' sections before and after '\*' in **p**. For each position, check if a substring starts with the prefix before '\*' and ends with the suffix after '\*'.

- **Optimized approach:**  
  Notice that **p** splits into two parts, left (before '\*') and right (after '\*'):
  - If **p = left*right**, for some substring in **s** to match, it must contain "left" as a prefix and "right" as a suffix (with any string in between).
  - Search for occurrences of "left" in **s** (can be empty if '\*' at start), then check if "right" appears after that (can also be empty).
  - Because string sizes are limited (length ≤ 50), a simple search suffices.

- **Why this approach?**  
  - Very efficient since only two direct string comparisons and slicing are needed.
  - No complex regular expression or backtracking is required.
  - O(n) time (where n = length of **s**) is sufficient for constraints.

### Corner cases to consider  
- **p** or **s** is a single character.
- '\*' is the first or last character of **p** (so left or right is empty).
- "left" or "right" matches overlapping substrings in **s**.
- The pattern is just '\*', i.e. **p = "*"** (always match).
- No match at all.

### Solution

```python
def match_substring_pattern(s: str, p: str) -> bool:
    # Split pattern p into left and right part using '*'
    star = p.index('*')
    left = p[:star]
    right = p[star+1:]
    
    # Since only one '*', check all possible substrings that start with left and end with right
    # The substring between left and right can be any (including empty)
    # That means, look for left as prefix and right as suffix in any substring of s where
    # their combined length <= length of s
    
    for i in range(len(s) - len(left) - len(right) + 1):
        # Check if s[i:] starts with left and ends with right
        # The candidate substring starts at i, has length len(left) + x + len(right) ≤ len(s) - i
        if s[i:i+len(left)] == left and s[i+len(left):i+len(left)+(len(s)-i-len(left)-len(right)+1)].endswith(right):
            return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of s.  
  - We only check each possible starting position at most once, and the checks use slicing and comparisons over short substrings.
- **Space Complexity:** O(1) extra space, aside from input and pattern splitting (tiny, as length ≤ 50).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the pattern can have multiple '\*' characters?  
  *Hint: Consider splitting at each '\*' and try matching subsequence constraints, possibly using two-pointers or dynamic programming.*

- How would you handle patterns containing '?' wildcard (matches exactly one character)?  
  *Hint: Add logic to compare each character in pattern to each in substring, treating '?' as a match-all for one character.*

- Can you generalize this pattern-matching for regular expressions?  
  *Hint: Look at state machines / finite automata or backtracking approaches for more complex matching needs.*

### Summary  
This approach demonstrates the typical two-part string matching pattern:  
- Split by the special wildcard, then match fixed prefixes/suffixes allowing flexible middles.  
- This pattern is common in filesystem globbing, simple pattern-matching, and certain substring search variants.  
- The code is straightforward and leverages small input sizes for efficient direct checks, making it suitable for both interviews and production settings where only one wildcard is present.