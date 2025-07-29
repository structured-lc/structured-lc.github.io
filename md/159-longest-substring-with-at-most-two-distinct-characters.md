### Leetcode 159 (Medium): Longest Substring with At Most Two Distinct Characters [Practice](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters)

### Description  
Given a string s, return the length of the longest substring that contains at most two distinct characters.  
You need to determine the maximum length among all its substrings that have at most two different characters.

### Examples  

**Example 1:**  
Input: `eceba`  
Output: `3`  
*Explanation: The longest substring with at most two distinct characters is `"ece"`. Its length is 3.*  

**Example 2:**  
Input: `ccaabbb`  
Output: `5`  
*Explanation: The longest such substring is `"aabbb"`. Its length is 5.*

**Example 3:**  
Input: `abcabcabc`  
Output: `2`  
*Explanation: The longest substrings with at most two distinct characters are `"ab"`, `"bc"`, `"ca"`. Each of length 2.*

### Thought Process (as if you’re the interviewee)  

Let’s start by considering the brute-force approach:  
- We could try every possible substring and check if it has no more than 2 distinct characters, recording the maximum length. This would involve generating all substrings (O(n²)) and, for each, checking the number of distinct characters (O(n)), leading to O(n³), which is not efficient for larger strings.

To optimize, we can use a **sliding window** approach:  
- Maintain a window (a substring defined by two indices, left and right). Track the count and types of characters inside the window.
- As we iterate through the string with the right pointer, add each new character. If the window ever contains more than two distinct characters, move the left pointer rightward to shrink the window until only two unique characters remain.  
- At each step, record the maximum window size seen.

Why is this optimal?  
- Each character is added and removed at most once, giving us linear time performance.  
- We use a data structure (like a hash map) to count character frequencies in the sliding window so we know when we need to shrink it.

Trade-offs:  
- Space complexity is O(1) because there are at most 128 ASCII characters (if extended Unicode, O(k), `k` = charset).
- Time complexity is O(n) since we process each character at most twice.

### Corner cases to consider  
- Empty string: Input `""` should return 0.
- String with 1 character: Input `"a"` should return 1.
- String where all characters are the same: Input `"bbbbbb"` should return the string’s length.
- String with exactly 2 unique characters: Input `"abababab"` returns length of whole string.
- String where every character is unique: Input `"abcdef"` returns 2.

### Solution

```python
def lengthOfLongestSubstringTwoDistinct(s):
    # Dictionary to count character frequencies
    char_count = {}
    left = 0
    max_len = 0
    
    # Expand the window
    for right in range(len(s)):
        # Add the current character to the count
        char_count[s[right]] = char_count.get(s[right], 0) + 1
        
        # If the window has more than 2 distinct characters, shrink from the left
        while len(char_count) > 2:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1  # Shrink window
        
        # Update the max window size found so far
        max_len = max(max_len, right - left + 1)
    
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each character is processed at most twice (once when right pointer enters, once when left pointer leaves).
- **Space Complexity:** O(1)  
  We store at most 3 keys in our dictionary at any time (since we shrink window as soon as it exceeds 2 distinct characters).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the question asks for at most *k* distinct characters, not just 2?  
  *Hint: Generalize the solution by replacing hard-coded `2` with a variable `k`.*

- Can you return the substring itself, not just its length?  
  *Hint: Track the indices (start, end) of the maximum window.*

- How would you handle if the input contained Unicode characters or very large character set?  
  *Hint: Your dictionary should accommodate all possible code points; space complexity could increase with charset.*

### Summary
This problem fits the "sliding window with hash map" pattern, common for substring/array window optimizations dealing with constraints like "at most k distinct elements". Recognizing the opportunity for O(n) processing by expanding and contracting a window is a key insight. This technique generalizes to problems like "Longest Substring with At Most K Distinct Characters", "Longest Substring Without Repeating Characters", and others.