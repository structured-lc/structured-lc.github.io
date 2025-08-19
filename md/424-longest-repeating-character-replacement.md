### Leetcode 424 (Medium): Longest Repeating Character Replacement [Practice](https://leetcode.com/problems/longest-repeating-character-replacement)

### Description  
Given a string containing only uppercase English letters and an integer **k**, you can replace at most **k** characters in the string so that the resulting substring contains only the same letter. Your task is to find the length of the longest substring you can get where all the characters are the same, after making at most **k** replacements.  
You may change any letter to any other letter per operation.

### Examples  

**Example 1:**  
Input: `s = "ABAB", k = 2`  
Output: `4`  
*Explanation: Replace the two 'A's in the middle with 'B' to get "BBBB", or both 'B's with 'A' for "AAAA". The entire string is now composed of the same character, length = 4.*

**Example 2:**  
Input: `s = "AABABBA", k = 1`  
Output: `4`  
*Explanation: Changing the 'A' at index 4 to 'B' results in "AABBBBA" with a maximum substring "BBBB" of length 4. If you change another character, you can't get a longer consecutive run.*

**Example 3:**  
Input: `s = "ABCDE", k = 1`  
Output: `2`  
*Explanation: You can only replace one character. Any pair of matching characters can be made, and the max run is 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For every possible substring, count how many characters need to be replaced to make all its characters the same. If that count is ≤ k, consider its length as a candidate for the answer. This is O(n³) (O(n²) for substrings × O(n) for counting replacements).
- **Optimized approach (sliding window):**  
  We only need to find the window with the maximum number of same letters, then check if we can replace the remaining characters in the window (total window length - count of most frequent character in the window) with up to k moves.
  - Use two pointers: **left** and **right** marking the edges of the window.
  - Maintain a count/frequency of each letter in the window.
  - For every step, compute the count of the most frequent character in the window.
  - If window size - max count > k, slide the left pointer.
  - Update the answer with the maximum window size seen.  
  This approach works in O(n) time because each letter is processed at most twice (entered and exited the window) and the English alphabet size is constant.

### Corner cases to consider  
- Empty string (`s = ''`)
- k = 0 (no replacements are allowed)
- The string already consists of a single repeating character
- k larger than or equal to length of s (the entire string can be made the same)
- All unique characters
- String with length 1

### Solution

```python
def characterReplacement(s: str, k: int) -> int:
    # Array to store frequency of each uppercase letter in the current window
    freq = [0] * 26
    left = 0
    max_count = 0  # count of most frequent character in the current window
    result = 0

    for right in range(len(s)):
        # Convert the current character to an index (0 for 'A', ... 25 for 'Z')
        idx = ord(s[right]) - ord('A')
        freq[idx] += 1

        # Update the max count of a letter in the current window
        max_count = max(max_count, freq[idx])

        # If the window has more than k replacements needed, move left side
        while (right - left + 1) - max_count > k:
            freq[ord(s[left]) - ord('A')] -= 1
            left += 1

        # Update result with the size of the valid window
        result = max(result, right - left + 1)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of s. Each character enters and exits the window at most once. Updating max_count and result is O(1) since alphabet size is fixed.
- **Space Complexity:** O(1) - The frequency array always has 26 elements (constant size, unrelated to input length).

### Potential follow-up questions (as if you’re the interviewer)  

- If the input could contain lowercase or non-English letters, how would you adapt your frequency logic?  
  *Hint: Use a larger count array or a dictionary to support more character types.*

- How would you modify your algorithm to also return the substring itself, not just the length?  
  *Hint: Keep track of pointers or indices for the max window found.*

- What if instead of at most k replacements, you needed exactly k replacements?  
  *Hint: The window check needs to be adjusted to require replacement count to be exactly k.*

### Summary
This problem uses the classic **sliding window** pattern to efficiently maintain a window with the optimal number of same-character replacements. The key trick is only needing to track the count of the most frequent character within the window to compute the required replacements.  
Sliding window is a versatile pattern and commonly applies to substring or subarray optimization problems where operations (replacement, removal, addition) are restricted by a count or cost.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Longest Substring with At Most K Distinct Characters(longest-substring-with-at-most-k-distinct-characters) (Medium)
- Max Consecutive Ones III(max-consecutive-ones-iii) (Medium)
- Minimum Number of Operations to Make Array Continuous(minimum-number-of-operations-to-make-array-continuous) (Hard)
- Maximize the Confusion of an Exam(maximize-the-confusion-of-an-exam) (Medium)
- Longest Substring of One Repeating Character(longest-substring-of-one-repeating-character) (Hard)