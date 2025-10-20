### Leetcode 76 (Hard): Minimum Window Substring [Practice](https://leetcode.com/problems/minimum-window-substring)

### Description  
Given two strings s and t, find the minimum-length substring of s that contains all the characters from t (including duplicates). If such a substring doesn’t exist, return an empty string. The substring must contain *at least* as many occurrences of each character as appears in t, and must be contiguous.

### Examples  

**Example 1:**  
Input: `s = "ADOBECODEBANC", t = "ABC"`  
Output: `"BANC"`  
*Explanation: The shortest substring of s containing A, B, and C is "BANC".*

**Example 2:**  
Input: `s = "a", t = "a"`  
Output: `"a"`  
*Explanation: The single character matches exactly.*

**Example 3:**  
Input: `s = "a", t = "aa"`  
Output: `""`  
*Explanation: There aren’t enough 'a' characters in s to match t; so, the answer is an empty string.*

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force approach:  
- For every possible substring of s, check whether it contains all the characters of t (including counts).  
- This is inefficient since for a string of length n, there are O(n²) substrings, and checking each one could take O(n) time. The overall time is O(n³), which is impractical for large inputs.

To optimize, a **sliding window** approach is appropriate:  
- Use two pointers (left and right) to represent the current window in s.
- Use a map or array to store the required character counts from t, and another structure to store counts from the current window.
- Expand the window by moving the right pointer, adding new characters. If the current window fulfills all character requirements, try to shrink it from the left to find a smaller valid window.
- Keep track of the minimum window encountered that satisfies all requirements.

This approach is efficient: each character is visited at most twice (once by left, once by right), resulting in O(n) time, where n = len(s).

Why choose this?  
- It balances efficiency and clarity.  
- Other alternatives (like binary search on window size) don’t change the overall complexity.

### Corner cases to consider  
- If t has characters not present in s  
- t is longer than s  
- s or t is empty  
- All characters in t are repeated  
- The answer requires the entire string s  
- No valid window exists (should return "")

### Solution

```python
def minWindow(s: str, t: str) -> str:
    # Step 1: Count the frequencies of each character in t
    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1
    
    # Initialize window counts, variables to keep track of the answer
    window = {}
    have = 0
    required = len(need)
    res = ""
    res_len = float('inf')
    l = 0  # left boundary of window

    # Move the right pointer
    for r, c in enumerate(s):
        # Add current character to window
        window[c] = window.get(c, 0) + 1

        # If this character is needed and now satisfied, increment have
        if c in need and window[c] == need[c]:
            have += 1

        # When current window satisfies all required characters
        while have == required:
            # Update answer if a smaller window is found
            if (r - l + 1) < res_len:
                res = s[l:r+1]
                res_len = r - l + 1

            # Prepare to shrink the window from the left
            left_char = s[l]
            window[left_char] -= 1
            if left_char in need and window[left_char] < need[left_char]:
                have -= 1
            l += 1  # Move left pointer to the right

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s). Both left and right pointers move at most n times.
- **Space Complexity:** O(m + n), where m = number of unique characters in t (for maps), and possibly for window storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if upper and lowercase letters should be treated the same?  
  *Hint: Map or compare characters using lower()/upper().*

- How do you handle Unicode or non-ASCII characters efficiently?  
  *Hint: Use default dictionaries or collections for dynamic character sets.*

- If you need to return not only the substring but the indices as well, how would you modify the function?  
  *Hint: Store and return [left, right] when updating for smallest window.*

### Summary
The sliding window technique with hash maps lets you efficiently find the minimum substring containing a given set of characters—including duplicates—in O(n) time. This “variable sliding window” is a classic pattern for substring and subarray problems where order or counts are important, and is widely applicable in searching problems, substring uniqueness, and anagram matching.


### Flashcard
Use sliding window with two pointers and a frequency map to expand right until all t's chars are included, then contract left to minimize the window while maintaining all required counts.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Substring with Concatenation of All Words(substring-with-concatenation-of-all-words) (Hard)
- Minimum Size Subarray Sum(minimum-size-subarray-sum) (Medium)
- Sliding Window Maximum(sliding-window-maximum) (Hard)
- Permutation in String(permutation-in-string) (Medium)
- Smallest Range Covering Elements from K Lists(smallest-range-covering-elements-from-k-lists) (Hard)
- Minimum Window Subsequence(minimum-window-subsequence) (Hard)
- Count Substrings That Can Be Rearranged to Contain a String II(count-substrings-that-can-be-rearranged-to-contain-a-string-ii) (Hard)
- Count Substrings That Can Be Rearranged to Contain a String I(count-substrings-that-can-be-rearranged-to-contain-a-string-i) (Medium)