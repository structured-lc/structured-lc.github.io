### Leetcode 1328 (Medium): Break a Palindrome [Practice](https://leetcode.com/problems/break-a-palindrome)

### Description  
You’re given a palindromic string of lowercase letters. Modify **exactly one character** so that the resulting string is **not** a palindrome and is **lexicographically smallest** possible. If it’s impossible (i.e. length 1), return an empty string.

### Examples  

**Example 1:**  
Input: `"abccba"`  
Output: `"aaccba"`  
*Explanation: Changing the first non-'a' character to 'a' breaks the palindrome & is lex smallest.*

**Example 2:**  
Input: `"a"`  
Output: `""`  
*Explanation: Single letter, can't make non-palindrome by 1 replacement.*

**Example 3:**  
Input: `"aa"`  
Output: `"ab"`  
*Explanation: Changing last character to 'b' makes it non-palindromic and lex smallest.*

### Thought Process (as if you’re the interviewee)  
Brute-force: try every character change, generate all non-palindromes, pick the lex smallest. Inefficient! 

Optimized:
- To break a palindrome, change the **leftmost non-'a'** in the first half to 'a' (makes it smallest, and can't still be palindrome except for 'aaaa...a').
- If all are 'a', change the **last** character to 'b'.
- If the string length is 1, can't break palindrome, return empty string.
- Only one replacement allowed.

### Corner cases to consider  
- String is length 1.
- String consists only of 'a'.
- Middle character in odd-length string (changing it may not break palindrome).

### Solution

```python
def breakPalindrome(palindrome: str) -> str:
    n = len(palindrome)
    if n == 1:
        return ""
    palindrome = list(palindrome)
    # Only check first half (excluding middle if odd)
    for i in range(n // 2):
        if palindrome[i] != 'a':
            palindrome[i] = 'a'
            return ''.join(palindrome)
    # All 'a' in first half
    palindrome[-1] = 'b'
    return ''.join(palindrome)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), one pass over half the string.
- **Space Complexity:** O(n), extra array for string manipulation (could optimize to O(1) if modify in place).

### Potential follow-up questions (as if you’re the interviewer)  
- What if you can replace up to k characters?  
  *Hint: Use similar greedy changes in leftmost positions.*

- What if uppercase and lowercase letters are allowed?  
  *Hint: ASCII/lexicographic comparison needs to work for full alphabet.*

- What if string may contain digits or other symbols?  
  *Hint: Extend the check for 'a' to minimum lex character.*

### Summary
This solution uses a greedy **first non-a replacement** to minimize the new string. This is a standard "modify to break property, while keeping result minimal lexicographically" problem — a common pattern when working with palindromic or near-palindromic strings.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
