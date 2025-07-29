### Leetcode 2414 (Medium): Length of the Longest Alphabetical Continuous Substring [Practice](https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring)

### Description  
Given a string s of only lowercase English letters, find the length of the longest substring where the letters are strictly consecutive in the English alphabet.  
For example, "abc" or "xyz" would qualify, but "ac", "ba" or "za" would not. The substring must be continuous—no skipping letters or wrapping around from 'z' to 'a'.

### Examples  

**Example 1:**  
Input: `s = "abacaba"`  
Output: `2`  
*Explanation: The substrings "ab", "ba", "ac", "ca", "ab", and "ba" appear, but only "ab" is a valid alphabetical continuous substring of length 2. Single letters like "a", "b", and "c" are also valid, but length 2 is the maximum here.*

**Example 2:**  
Input: `s = "abcde"`  
Output: `5`  
*Explanation: The entire string "abcde" is consecutive in the alphabet, so its length is 5.*

**Example 3:**  
Input: `s = "a"`  
Output: `1`  
*Explanation: The string only contains a single character, which is a trivial alphabetical continuous substring.*

### Thought Process (as if you’re the interviewee)  
First, for every position in the string, I can check for the longest substring starting from that index that remains strictly consecutive (brute-force). However, this results in an O(n²) solution, which is too slow for large n.

To optimize, I’ll use a sliding window or single pass approach:
- Maintain a running count of the current consecutive chain.
- For each character, if it directly follows the previous character alphabetically (i.e., ord(s[i]) - ord(s[i-1]) == 1), increment the running chain.
- Otherwise, reset the chain length to 1 (starting a new substring).
- Track the maximum chain length observed.

This is O(n) time with O(1) space—very efficient for ⩽10⁵ character strings.

### Corner cases to consider  
- Single character ("a") → output 1  
- String with all same characters ("aaa") → output 1  
- Entire string is consecutive ("abcdefghijklmnopqrstuvwxyz") → output 26  
- Non-continuous separated blocks ("abacdefg")  
- No valid two-letter alphabetic substrings ("azazaz")  
- Long input (performance for n = 10⁵)  
- Characters at z and a (ensure no wrap-around: "yzab" is not valid)

### Solution

```python
def longestContinuousSubstring(s: str) -> int:
    # Start with max_length 1 (since s is non-empty by constraints)
    max_length = 1
    current_length = 1

    for i in range(1, len(s)):
        # Check if s[i] is consecutive to s[i-1]
        if ord(s[i]) - ord(s[i-1]) == 1:
            current_length += 1
        else:
            current_length = 1  # restart from current character
        # Update the max_length if the current chain is longer
        if current_length > max_length:
            max_length = current_length
    return max_length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We make a single pass over the string, comparing each character with the previous.
- **Space Complexity:** O(1). Only a couple of integer variables for tracking lengths; no additional data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string can contain uppercase as well?  
  *Hint: Consider converting all characters to the same case, or handling ASCII differences accordingly.*

- Can this approach be generalized to a circular alphabet? (i.e., after 'z' comes 'a')  
  *Hint: What would the "next" character after 'z' be in this custom order?*

- How would you return all such longest substrings, not just the length?  
  *Hint: Collect substrings as you iterate, when the running length matches max length.*

### Summary
This problem follows the classic sliding window or single-pass scan pattern, ideal for substring or subarray length problems with consecutive/adjacent constraints.  
The key is translating the "alphabetically consecutive" condition into an ASCII code difference and tracking maximal runs on the fly.  
This approach is commonly useful for longest increasing, non-decreasing, or other dynamic contiguous segment problems.