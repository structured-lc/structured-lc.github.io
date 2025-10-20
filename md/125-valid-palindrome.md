### Leetcode 125 (Easy): Valid Palindrome [Practice](https://leetcode.com/problems/valid-palindrome)

### Description  
Given a string, determine if it is a valid palindrome. A valid palindrome reads the same forward and backward after removing all non-alphanumeric characters (letters and digits) and ignoring case differences. The check should work for sentences or phrases by skipping spaces, punctuation, and case.

### Examples  

**Example 1:**  
Input: `"A man, a plan, a canal, Panama!"`  
Output: `True`  
*Explanation: After removing non-alphanumerics and lowercasing: `"amanaplanacanalpanama"`. It reads the same forward and backward.*

**Example 2:**  
Input: `"race a car"`  
Output: `False`  
*Explanation: After removing non-alphanumerics and lowercasing: `"raceacar"`. Its reverse is `"racacear"`, which is not the same.*

**Example 3:**  
Input: `"No lemon, no melon!"`  
Output: `True`  
*Explanation: After removing non-alphanumerics and lowercasing: `"nolemonnomelon"`, which is a palindrome.*

### Thought Process (as if you’re the interviewee)  
A brute-force idea is to:
- Filter all alphanumeric characters.
- Lowercase all characters to ignore case.
- Build the cleaned string, then compare it to its reverse.

This works, but can use extra space for the filtered string and its reverse.

A better solution uses two pointers (left and right), starting at each end:
- Move pointers inward, skipping non-alphanumeric characters.
- At each valid character, compare ignoring case.
- If a mismatch is found, return False. Otherwise, continue until pointers cross.

The two-pointer approach:
- Avoids extra space for new strings.
- Makes early exit possible as soon as a mismatch is detected.
- Is the most efficient in interviews due to O(1) space and O(n) time.

### Corner cases to consider  
- Empty string: should return True (an empty string is trivially a palindrome).
- String with only non-alphanumeric characters (like `"!!!"`): should return True.
- Single character: should return True.
- Case with only digits or only letters.
- Spaces at the ends or within the string.

### Solution

```python
def isPalindrome(s: str) -> bool:
    # Initialize two pointers at both ends of the string
    left, right = 0, len(s) - 1
    
    while left < right:
        # Skip left pointer if not alphanumeric
        while left < right and not s[left].isalnum():
            left += 1
        # Skip right pointer if not alphanumeric
        while left < right and not s[right].isalnum():
            right -= 1
        # Compare lowercase characters
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. Each character is visited at most once by either pointer.
- **Space Complexity:** O(1), constant extra space — we are not using extra arrays or strings for the result, just a few pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if you had to support Unicode (like accented characters or emojis)?  
  *Hint: Consider using Python's `str.isalnum()` or external Unicode libraries. Case conversion for Unicode.*

- What if you can only process the string in a single pass and cannot use extra memory at all?  
  *Hint: Stick to the two-pointer method and only constant variables.*

- Can you generalize this routine to ignore whitespace or punctuation according to a customizable rule?  
  *Hint: Pass a filtering function for what “valid” means.*

### Summary
This problem uses the classic **two-pointer technique** for string comparison, a pattern that appears in many palindrome and substring problems. By intelligently skipping non-alphanumeric characters and ignoring case, we achieve an optimal solution with minimal space and linear time. The logic and pattern here can be directly applied to variants like "Valid Palindrome II" (where one removal is allowed) or checking mirrored substrings.


### Flashcard
Use two pointers (left, right) to scan inward, skipping non-alphanumeric chars and comparing case-insensitively; return false on mismatch, true if pointers cross.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Palindrome Linked List(palindrome-linked-list) (Easy)
- Valid Palindrome II(valid-palindrome-ii) (Easy)
- Maximum Product of the Length of Two Palindromic Subsequences(maximum-product-of-the-length-of-two-palindromic-subsequences) (Medium)
- Find First Palindromic String in the Array(find-first-palindromic-string-in-the-array) (Easy)
- Valid Palindrome IV(valid-palindrome-iv) (Medium)
- Maximum Palindromes After Operations(maximum-palindromes-after-operations) (Medium)