### Leetcode 3090 (Easy): Maximum Length Substring With Two Occurrences [Practice](https://leetcode.com/problems/maximum-length-substring-with-two-occurrences)

### Description  
Given a string s, return the **maximum length** of a substring where every character appears **at most twice**.  
In other words:  
- For any valid index interval [L, R] in s, if you look at the substring s[L:R+1], **no character** occurs more than **two times**.  
- Find the longest such substring in s.

### Examples  

**Example 1:**  
Input: `s = "aabbaacc"`  
Output: `8`  
*Explanation: All characters appear at most twice in the whole string. The entire string "aabbaacc" is valid.*

**Example 2:**  
Input: `s = "abcabcabc"`  
Output: `6`  
*Explanation: The substring "bcabca" (indices 1 to 6) is of length 6 and each character appears at most twice:  
- 'b': positions 1, 4  
- 'c': positions 2, 5  
- 'a': positions 3, 6*

**Example 3:**  
Input: `s = "abaccc"`  
Output: `5`  
*Explanation: The substring "abacc" (indices 0 to 4) is valid. At index 5, 'c' would occur three times ("abaccc"), so the substring would no longer be valid.*

### Thought Process (as if you’re the interviewee)  
My first thought is brute force: for every index, check every possible right endpoint, count frequencies, and track the largest valid window. But that's O(n²) and too slow for longer strings.

A better approach is to use the **sliding window (two pointers)** technique:
- Maintain a window [left, right] and a count map for characters in the window.
- Expand right pointer, updating counts.
- If any count exceeds 2, move the left pointer forward (shrink the window from the left) until all counts are ≤2.
- Update the max length for every valid window.

This ensures each character is counted correctly and the window is always valid.  
This approach is efficient because each character is added and removed from the window at most once, yielding O(n) time complexity.

Space complexity is O(1) for the count map, as there are at most 26 letters (for lowercase English).

### Corner cases to consider  
- Empty string: s = ""  
- All unique characters  
- All identical characters (e.g., "aaaaa")  
- String where third occurrence forces window to move immediately  
- Strings shorter than 3 characters  
- Cases with upper/lower boundary condition (string length = 1 or 2)

### Solution

```python
def maximumLengthSubstring(s):
    # Count of letters in current window, 26 for lowercase English letters
    count = [0] * 26
    left = 0
    max_len = 0

    for right in range(len(s)):
        idx = ord(s[right]) - ord('a')
        count[idx] += 1
        
        # Shrink from left until the window is valid (all letters ≤2)
        while count[idx] > 2:
            count[ord(s[left]) - ord('a')] -= 1
            left += 1
        
        # Valid window: update max_len
        max_len = max(max_len, right - left + 1)
    
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of s.  
  Each pointer (left and right) traverses the string at most once. All other operations are O(1).
- **Space Complexity:** O(1), since the count array size is fixed (26).

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of at most 2, the question required at most k occurrences for each letter?  
  *Hint: How would you generalize your count map or window condition?*

- What if the string contained unicode or arbitrary characters, not just lowercase English?  
  *Hint: Could you use a hash map instead of a fixed array?*

- How would you return not just the length, but the actual substring(s) themselves?  
  *Hint: Track window positions when updating max_len.*

### Summary
This problem is a great example of the **sliding window** pattern, especially for substring/array problems with "at most k occurrences/frequencies". The same template appears in problems like "longest substring with at most k distinct characters" and "longest substring without repeating characters".  
You maintain frequency, adjust the window, and track the best found. This approach is highly reusable in string and array interview questions.