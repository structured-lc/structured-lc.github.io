### Leetcode 1750 (Medium): Minimum Length of String After Deleting Similar Ends [Practice](https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends)

### Description  
Given a string s, you can repeatedly delete a *non-empty* prefix and a *non-empty* suffix which are made up of the same character, and are *disjoint* (do not overlap). This means, as long as s starts and ends with the same character, you can strip all the matching consecutive same-character prefix and suffix at once. Keep doing this repeatedly until you cannot remove further.  
Return the minimum possible length of s after performing this process as many times as you want.

### Examples  

**Example 1:**  
Input: `s = "ca"`  
Output: `2`  
*Explanation: No prefix and suffix are the same, so the string remains unchanged.*

**Example 2:**  
Input: `s = "cabaabac"`  
Output: `0`  
*Explanation:  
First, remove prefix "c" and suffix "c" → "abaaba".  
Then, remove prefix "a" and suffix "a" → "baab".  
Remove prefix "b" and suffix "b" → "aa".  
Remove prefix "a" and suffix "a" → "" (empty string).*

**Example 3:**  
Input: `s = "aabccabba"`  
Output: `3`  
*Explanation:  
First, remove prefix "a" and suffix "a" ("abccabb").  
Then, prefix "a" ≠ suffix "b", cannot continue. Remaining string is "bccab", still not matching, so answer is length 3 (substring "bcc").*

### Thought Process (as if you’re the interviewee)  
Brute-force would try all possible pairs of prefixes and suffixes which is slow and redundant.
- Key insight: Whenever the start and end character are equal, we can remove the block of same characters on both ends at once, then repeat.  
- Set two pointers: left and right at start/end of the string.  
- While left < right and s[left] == s[right]:  
    - Move left pointer rightwards over all consecutive s[left] characters.  
    - Move right pointer leftwards over all consecutive s[right] characters (they must be same as s[left]/s[right]).  
    - Repeat.  
- Whenever left ≥ right or s[left] ≠ s[right], stop.  
- Length is right - left + 1.

Trade-offs:  
- O(n) time and O(1) space.
- No need for stack or recursion or rebuilding strings.

### Corner cases to consider  
- Empty string (`""`)  
- One character only, e.g., `"a"`
- All characters the same, e.g., `"aaaaaa"`
- No matching prefix/suffix, e.g., `"abcde"`
- Only two characters, e.g., `"aa"`, `"ab"`
- Prefixes/suffixes that entirely consume the string, e.g., `"cabaabac"`

### Solution

```python
def minimumLength(s: str) -> int:
    # Set up two pointers
    left, right = 0, len(s) - 1

    # Process as long as left < right and chars at ends are equal
    while left < right and s[left] == s[right]:
        char = s[left]
        # Move left pointer right for all chars equal to char
        while left <= right and s[left] == char:
            left += 1
        # Move right pointer left for all chars equal to char
        while left <= right and s[right] == char:
            right -= 1
    # The resultant length is (right - left + 1)
    return right - left + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each character is at most processed once from each end.
- **Space Complexity:** O(1). Only pointers and variables, no extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you implement this without using two pointers?  
  *Hint: Think about recursion/stack, but clarify why two pointers is optimal.*

- What if the removal rule allowed removing prefixes and suffixes with different characters?  
  *Hint: Consider dynamic programming for all substring pairs.*

- What would change if the prefix and suffix could overlap?  
  *Hint: Discuss how allowing overlap alters the invariant and possible solutions.*

### Summary
This problem is a classic *two-pointer* pattern, where you scan from both ends and process inwards as long as a local rule holds. There’s no need to rebuild strings, making it efficient in both time and space. This approach can be extended to various substring or array reduction problems where matching or pairing from both ends is required (palindromes, diff removal, etc.).

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
