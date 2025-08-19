### Leetcode 340 (Medium): Longest Substring with At Most K Distinct Characters [Practice](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters)

### Description  
Given a string s and an integer k, find the length of the longest substring of s that contains at most k distinct characters.  
A substring is a contiguous sequence of characters from the original string. "At most k distinct characters" means the substring can contain k or fewer unique characters, regardless of how many times they occur.  
Your task is to maximize the length of such a substring.

### Examples  

**Example 1:**  
Input: `s = "eceba", k = 2`  
Output: `3`  
*Explanation: The substring "ece" contains only two distinct characters ('e', 'c'). It's the longest substring that satisfies the condition.*

**Example 2:**  
Input: `s = "aa", k = 1`  
Output: `2`  
*Explanation: The substring "aa" contains only one distinct character. The whole string is valid and of length 2.*

**Example 3:**  
Input: `s = "a", k = 0`  
Output: `0`  
*Explanation: With k = 0, there can be no substring with any characters, so the answer is 0.*

### Thought Process (as if you’re the interviewee)  
- Start with brute force: Check every possible substring, count its distinct characters, and keep track of the maximum valid length. This is O(n³) and inefficient.
- To optimize, use the **sliding window** pattern.  
  - Keep two pointers (left and right) defining the window.
  - Expand the right pointer, adding characters and tracking them in a dictionary (char → count).
  - If the number of unique characters exceeds k, move the left pointer to shrink the window until unique count ≤ k.
  - At each step, update the maximum length.
- Why sliding window: Because substring distinct-character constraints can be enforced efficiently by tracking the window's content, avoiding recomputation.

### Corner cases to consider  
- Empty string: s = ""
- k = 0: no substring can be valid.
- k ≥ number of unique characters in s: whole string is valid.
- String with only repeated characters.
- k = 1: only substrings of identical characters are valid.
- Long strings or strings with all unique characters.

### Solution

```python
def lengthOfLongestSubstringKDistinct(s, k):
    # Handle the trivial case where k is 0
    if k == 0 or not s:
        return 0

    left = 0          # Left pointer of the window
    right = 0         # Right pointer of the window
    max_len = 0       # Result to store the max length found
    char_count = {}   # Dictionary to store character counts in the current window

    while right < len(s):
        char = s[right]
        # Add the right character to our window
        char_count[char] = char_count.get(char, 0) + 1
        right += 1

        # If our window has more than k distinct characters, shrink it from the left
        while len(char_count) > k:
            left_char = s[left]
            char_count[left_char] -= 1
            if char_count[left_char] == 0:
                del char_count[left_char]
            left += 1

        # Update max_len if the current window is valid
        max_len = max(max_len, right - left)

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string s. Each character is processed at most twice (once by right, once by left).
- **Space Complexity:** O(k) at most, for the character count dictionary (since at most k unique characters in window at any time).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet is very large or arbitrary (e.g. Unicode)?  
  *Hint: Is your frequency count structure efficient for large alphabets, or would a linked hash map be better?*

- Return the actual substring, not just the length.  
  *Hint: Track the window indices whenever a new maximum is found.*

- What if instead of characters, the input is an array of integers?  
  *Hint: The sliding window logic applies the same; just adjust your counting data structure.*

### Summary
This problem is a classic use-case for the **sliding window** and hash counting pattern, applicable in substring/array problems involving counts or "at most k" constraints.  
Sliding window ensures linear scan, and the hash map allows efficient tracking of character counts.  
Variations of this approach appear in problems like "Longest Substring Without Repeating Characters", "Minimum Window Substring", and more.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Longest Substring Without Repeating Characters(longest-substring-without-repeating-characters) (Medium)
- Longest Substring with At Most Two Distinct Characters(longest-substring-with-at-most-two-distinct-characters) (Medium)
- Longest Repeating Character Replacement(longest-repeating-character-replacement) (Medium)
- Subarrays with K Different Integers(subarrays-with-k-different-integers) (Hard)
- Max Consecutive Ones III(max-consecutive-ones-iii) (Medium)
- Maximize the Confusion of an Exam(maximize-the-confusion-of-an-exam) (Medium)