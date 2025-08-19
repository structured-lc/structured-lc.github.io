### Leetcode 1332 (Easy): Remove Palindromic Subsequences [Practice](https://leetcode.com/problems/remove-palindromic-subsequences)

### Description  
Given a string s consisting only of letters 'a' and 'b', return the minimum number of steps to delete the string by repeatedly removing palindromic subsequences. Each removal can take **any** non-empty palindromic subsequence.

### Examples  
**Example 1:**  
Input: `s = "ababa"`  
Output: `1`  
*Explanation: Entire string is a palindrome—remove all at once.*

**Example 2:**  
Input: `s = "abb"`  
Output: `2`  
*Explanation: The string is not a palindrome. Remove either all 'a's or all 'b's in one step, then the remaining string in step 2.*

**Example 3:**  
Input: `s = "baabb"`  
Output: `2`  
*Explanation: Not a palindrome. Remove all 'a's first, then all 'b's, or vice versa.*

### Thought Process (as if you’re the interviewee)  
- If s is empty, 0 steps.
- If s itself is a palindrome, remove all at once (1 step).
- If not, since s consists only of 'a' and 'b', we can remove all 'a's in one step (subsequence), then all 'b's (or vice versa). 2 steps at most.

### Corner cases to consider  
- String is already a palindrome.
- String is empty.
- All same letters (e.g., "aaaaa").
- Single character string.

### Solution

```python
def removePalindromeSub(s: str) -> int:
    # Empty string, nothing to remove
    if not s:
        return 0
    # If whole string is palindrome, 1 step
    if s == s[::-1]:
        return 1
    # Else, two steps: remove all 'a's then 'b's (or vice versa)
    return 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for palindrome check.
- **Space Complexity:** O(1) (no extra structure; string reverse makes a copy, but not counted as extra space for big O).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there can be more than two types of characters?  
  *Hint: The maximum steps would be the number of unique characters if string is not a palindrome.*

- Can you return the actual palindromic subsequences deleted in order?  
  *Hint: Track how you decompose — possibly output which step removes which character subsequence.*

- What changes if we are only allowed to remove contiguous palindromic substrings?  
  *Hint: Much harder; dynamic programming required for "minimum palindrome partitioning".*

### Summary
This problem is a very simple application of palindrome checking logic with a trick due to only two letters: the minimal removal steps are always 1 or 2.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
