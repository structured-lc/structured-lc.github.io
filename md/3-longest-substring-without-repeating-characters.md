### Leetcode 3 (Medium): Longest Substring Without Repeating Characters [Practice](https://leetcode.com/problems/longest-substring-without-repeating-characters)

### Description  
Given a string, find the **length of the longest substring** that contains *no repeating characters*. The substring must consist of consecutive characters, and you should return only the length.  
For example, if the input is "abcabcbb", the output should be 3 since "abc" is the longest substring without repeats.

### Examples  

**Example 1:**  
Input: `s = "abcabcbb"`  
Output: `3`  
*Explanation: The substring "abc" is the longest without repeating characters. The next character, 'a', is a repeat, so the count resets. The process repeats for every starting index, but max length found is 3.*

**Example 2:**  
Input: `s = "bbbbb"`  
Output: `1`  
*Explanation: All characters are 'b', so the longest substring with no repeats is just "b".*

**Example 3:**  
Input: `s = "pwwkew"`  
Output: `3`  
*Explanation: The substring "wke" is the longest substring without repeating characters. "pw" is length 2, but "wke" achieves 3 before another repeat occurs.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would check all possible substrings and track the longest one without duplicates. This would require generating every possible substring and then verifying if it contains unique characters, which leads to high time complexity: O(n³), as there are about n² substrings and each check is O(n).

To optimize, we can use a **sliding window**. The window will expand as long as all characters are unique. If a duplicate is found, move the left side (start) of the window forward until the duplicate is excluded. Use a set (or map) to track characters in the current window for fast lookup. This way, each character is processed at most twice (once when added, once when removed), making the overall solution O(n) time.

I would choose this final approach because it offers an optimal O(n) time complexity with clear logic. It's easy to code and debug, and the trade-off (a bit of extra space to store seen characters) is minimal for the performance gain.

### Corner cases to consider  
- Empty string (`""`), should return 0
- String with all unique characters, e.g. "abcdef": length is string length
- String with all same character, e.g. "aaaa": length is 1
- Strings with spaces or special characters
- Input of length 1 ("a"): should return 1

### Solution

```python
def lengthOfLongestSubstring(s):
    # Set to store unique characters in current window
    seen = set()
    left = 0
    max_len = 0
    
    # Expand the window with right pointer
    for right in range(len(s)):
        # If duplicate found, shrink window from left until unique
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        # Add current character and update max length
        seen.add(s[right])
        max_len = max(max_len, right - left + 1)
    
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string.  
  Each character is added and removed from the set at most once, so the loop  ("right" pointer) and "left" pointer each traverse the string only once.
- **Space Complexity:** O(min(n, m)), where m is the size of the charset (number of possible unique characters). In typical ASCII input, this is O(1), otherwise up to O(n) if all are unique.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contains Unicode characters?
  *Hint: Think about using a map/dictionary instead of a fixed-size array.*

- Can you modify the solution to return the substring itself, not just its length?
  *Hint: Track the start index and update it when a longer substring is found.*

- How would you handle the case sensitivity or support for multi-language input?
  *Hint: Consider the definition of "unique" under the problem’s rules.*

### Summary
This problem uses the **sliding window** pattern—one of the most common approaches for substring and subarray problems in strings and arrays. It allows tracking a dynamic window of candidates, efficiently managing constraints (here, uniqueness) with fast lookup structures like sets or hashmaps. Sliding window strategies can be applied in many similar substring/search problems, such as "Longest Substring with At Most K Distinct Characters" and "Minimum Window Substring".