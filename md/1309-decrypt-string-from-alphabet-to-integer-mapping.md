### Leetcode 1309 (Easy): Decrypt String from Alphabet to Integer Mapping [Practice](https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping)

### Description  
Given a string s consisting of digits ('0' - '9') and hash symbols ('#'), decrypt it using the mapping: 1→'a', 2→'b',..., 9→'i', 10#→'j', 11#→'k',..., 26#→'z'. For single digits, map to corresponding lowercase letters, while for two digits followed by '#', map it to the letter for that number (10-26).

### Examples  
**Example 1:**  
Input: `s = "10#11#12"`  
Output: `"jkab"`  
*Explanation: 10# → 'j', 11# → 'k', 12 → 'l', so result = "jkl"*

**Example 2:**  
Input: `s = "1326#"`  
Output: `"acz"`  
*Explanation: 1→'a', 3→'c', 26#→'z'*

**Example 3:**  
Input: `s = "25#"`  
Output: `"y"`  
*Explanation: 25#→'y'*

### Thought Process (as if you’re the interviewee)  
The key is recognizing when to take two digits and a '#' as a group (to decode 10#–26# to a letter) or a single digit otherwise. I can process from left to right, checking at each step if s[i+2] == '#'. If so, decode s[i:i+2], else decode s[i]. Continue until end of input string.

### Corner cases to consider  
- Input contains only single-digit numbers.
- Input only contains two-digit numbers with '#'.
- Consecutive '#' characters do not occur.
- Input may end on a single digit, not a '#'.
- Empty string input.

### Solution

```python
def freqAlphabets(s):
    res = []
    i = 0
    while i < len(s):
        # Check for two digits + '#'
        if i + 2 < len(s) and s[i + 2] == '#':
            num = int(s[i:i+2])
            res.append(chr(ord('a') + num - 1))
            i += 3
        else:
            num = int(s[i])
            res.append(chr(ord('a') + num - 1))
            i += 1
    return ''.join(res)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), scan the string of length n once.
- **Space Complexity:** O(n) for result string, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  
- How would the solution change if the mapping was not continuous?  
  *Hint: Use a dict for arbitrary mappings.*

- Can we do this in-place if the input is a mutable array of characters?  
  *Hint: Use additional pointers or in-place overwrite.*

- How to handle malformed input (e.g., missing '#', invalid number)?  
  *Hint: Add error checks or try/except handling.*

### Summary
This is a classic string parsing and greedy lookahead problem. The pattern: look ahead to identify special multi-character patterns, otherwise consume single characters, is common in decoder/parser problems and practical tokenization.

### Tags
String(#string)

### Similar Problems
