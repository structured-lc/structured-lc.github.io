### Leetcode 1616 (Medium): Split Two Strings to Make Palindrome [Practice](https://leetcode.com/problems/split-two-strings-to-make-palindrome)

### Description  
Given two strings **a** and **b** of equal length, you can choose an index to split both strings into two substrings each. For both strings, the split creates a prefix and a suffix (which may be empty). The goal is to check if **concatenating `a_prefix + b_suffix` or `b_prefix + a_suffix` yields a palindrome**. Return `true` if any combination can create a palindrome, otherwise `false`.

### Examples  

**Example 1:**  
Input: `a = "x"`, `b = "y"`  
Output: `true`  
*Explanation: Splitting anywhere gives you "x" or "y", both are palindromes.*

**Example 2:**  
Input: `a = "ulacfd"`, `b = "jizalu"`  
Output: `true`  
*Explanation: Split at index 3: `a_prefix = "ula"`, `a_suffix = "cfd"`; `b_prefix = "jiz"`, `b_suffix = "alu"`. Checking `a_prefix + b_suffix = "ulaalu"` is a palindrome.*

**Example 3:**  
Input: `a = "abcdef"`, `b = "fedcba"`  
Output: `true`  
*Explanation: Splitting at index 0 (or full length) gets "abcdef" + "" or "" + "fedcba", both not palindromes. But split at index 3: `a[0:3] = "abc"`, `b[3:] = "cba"`, so "abc" + "cba" = "abccba", which is a palindrome.*

### Thought Process (as if you’re the interviewee)  
- Brute-force would be to check every possible split (from 0 to n) for both combinations and verify if any forms a palindrome.
- But that's O(n²), as each substring check costs up to O(n).
- Key observation: When forming `a_prefix + b_suffix`, checking from outside inwards, as long as `a[i] == b[n-1-i]`, keep incrementing `i`. The first mismatch means the palindrome *could* still be formed if the rest (entirely within `a` or `b` between indices `i` and `n-1-i`) is already a palindrome.
- So, for both `a` and `b` as a base, use a **two-pointer** strategy to compare the matching halves, then check in O(n) if any substring is a palindrome. That makes the solution O(n).
- Test both ways: `a_prefix + b_suffix` and `b_prefix + a_suffix`.

### Corner cases to consider  
- Empty strings or strings of length 1 (should return true)
- Strings that are already palindromes
- Cases where palindrome requires split at boundary (full `a` + empty `b`, and vice versa)
- No possible way to form palindrome at all
- All characters are the same

### Solution

```python
def check_palindrome(s, i, j):
    # Checks if s[i...j] is a palindrome
    while i < j:
        if s[i] != s[j]:
            return False
        i += 1
        j -= 1
    return True

def check(a, b):
    n = len(a)
    i, j = 0, n - 1
    # Find max stretch where a[i] == b[j]
    while i < j and a[i] == b[j]:
        i += 1
        j -= 1
    # Now check if the remainder is palindrome in a or b
    return check_palindrome(a, i, j) or check_palindrome(b, i, j)

def checkPalindromeFormation(a, b):
    # Try both combinations
    return check(a, b) or check(b, a)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is the length of strings, since we only traverse at most twice the string once each way, and the two-pointer comparison plus possible palindrome check is linear.
- **Space Complexity:** O(1) extra space, as only variables and pointers are used (no extra data structures).

### Potential follow-up questions (as if you’re the interviewer)  
- What if the strings are not equal length?  
  *Hint: How does changing the split logic affect substring pairing?*
- What if there's a cost associated with each split, and you want to minimize the cost among palindromic splits?  
  *Hint: Track split index and extension.*
- Can you return the actual split index or palindromic combination, not just a boolean?  
  *Hint: Record i where split occurs and output substrings used.*

### Summary
A classic application of the **two-pointer** technique on strings. By tracking maximal matching prefixes and suffixes from both strings and verifying the remainder for being a palindrome, we reduce brute-force O(n²) to O(n). This pattern recurs in other palindromic and string merging problems.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
