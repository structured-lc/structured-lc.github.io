### Leetcode 1163 (Hard): Last Substring in Lexicographical Order [Practice](https://leetcode.com/problems/last-substring-in-lexicographical-order)

### Description  
Given a string s, return the substring that is **largest (last) in lexicographical order**.  
Lexicographical order is the same as dictionary order: compare two substrings character by character, and as soon as one is greater, it is considered larger. If all compared characters match and the substrings are of different lengths, the longer one is considered larger.  
In other words: among all possible substrings, return the one that comes last if you sort them as words in a dictionary.

### Examples  

**Example 1:**  
Input: `s = "abab"`  
Output: `"bab"`  
Explanation:  
Substrings: `"a"`, `"ab"`, `"aba"`, `"abab"`, `"b"`, `"ba"`, `"bab"`.  
The lexicographically largest is `"bab"`.

**Example 2:**  
Input: `s = "leetcode"`  
Output: `"tcode"`  
Explanation:  
Substrings: `"l"`, `"le"`, ..., `"t"`, `"tc"`, `"tco"`, `"tcod"`, `"tcode"`, `"c"`, ..., `"e"`  
The largest lexicographically is `"tcode"`.

**Example 3:**  
Input: `s = "aaa"`  
Output: `"aaa"`  
Explanation:  
All substrings are `"a"`, `"aa"`, `"aaa"`. All equal, so the whole string is returned.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - Generate all possible substrings, sort or track the maximum.  
  - Substrings can be of size O(n²), and comparing them can take O(n), leading to O(n³) time. Too slow!
- **Optimized Insight:**  
  - The largest substring must be a **suffix** of the string. Any prefix of a suffix that is not lex greatest can never become lex greatest if further extended.
  - Instead of all substrings, **compare suffixes starting at different indices**.
  - Bruteforce: Sort all suffixes (O(n²logn)), but that's inefficient for large n.
- **Optimal Solution with Two Pointers:**  
  - Use pointers `i` (current best candidate starting index) and `j` (next candidate).
  - For each step:
    - Compare chars at i+k and j+k. If s[i+k] == s[j+k], increment k.
    - If s[i+k] < s[j+k], move i to i+k+1. If s[i+k] > s[j+k], move j to j+k+1.
    - Ensure i≠j. Always set j > i.
  - This avoids all unnecessary comparisons and runs in O(n) time.
- **Why this works:**  
  - At each moment, maintain only the start index of the best candidate substring.

### Corner cases to consider  
- Extremely short string (one character, e.g. `"a"`)
- All characters the same (e.g. `"aaaaa"`)
- The largest character appears multiple times, possibly consecutive or non-consecutive
- String is already sorted in reverse lexicographic order
- Very large strings (tests time efficiency, e.g. 10⁵ or 4×10⁵ characters)

### Solution

```python
def lastSubstring(s: str) -> str:
    n = len(s)
    i = 0    # pointer to current best start
    j = 1    # pointer to next candidate
    k = 0    # offset from i and j for comparison

    while j + k < n:
        if s[i + k] == s[j + k]:
            k += 1
        elif s[i + k] < s[j + k]:
            # Found a better candidate at j
            i = max(i + k + 1, j)
            j = i + 1
            k = 0
        else:
            # Current 'i' is better, skip over this 'j'
            j += k + 1
            k = 0

    return s[i:]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each character is compared at most twice due to the clever skipping logic with two pointers.
- **Space Complexity:** O(1)  
  - Uses only a few pointers and counters. No extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input contains **uppercase and lowercase**?  
  *Hint: How does lexicographical order change if ASCII order is used?*

- Can you generalize this to **find the k-th largest substring**?  
  *Hint: Think about Suffix Arrays and advanced sorting.*

- How would you handle **streamed input** (string is too large for RAM)?  
  *Hint: Can you process with a sliding window and external memory?*

### Summary
This problem uses the **two pointer** pattern for substring comparison, avoiding full suffix sorting or unnecessary subarray generation.  
It’s closely related to problems about lexicographical ordering, substring search, and Suffix Arrays but solved here via an elegant linear scan.  
This approach generalizes to related interview questions: e.g., finding repeated substrings, Suffix Automaton, or lexicographical minimal substring.