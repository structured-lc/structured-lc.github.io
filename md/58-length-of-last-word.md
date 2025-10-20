### Leetcode 58 (Easy): Length of Last Word [Practice](https://leetcode.com/problems/length-of-last-word)

### Description  
Given a string, possibly including spaces at the beginning or end, return the length of the last word in the string.  
A word is defined as a maximal substring consisting of non-space characters only.  
Example: If input is `"Hello World"`, the output should be `5` because the last word is `"World"` and its length is `5`.

### Examples  

**Example 1:**  
Input: `"Hello World"`,  
Output: `5`  
*Explanation: The last word is "World" which has 5 characters.*

**Example 2:**  
Input: `"fly me to the moon"`,  
Output: `4`  
*Explanation: The last word is "moon" which has 4 characters.*

**Example 3:**  
Input: `"luffy is still joyboy"`,  
Output: `6`  
*Explanation: The last word is "joyboy" which has 6 characters.*

**Example 4:**  
Input: `"Hello LeetCode "`,  
Output: `7`  
*Explanation: After trimming spaces, the last word is "LeetCode", length 7.*

**Example 5:**  
Input: `"   singleword   "`,  
Output: `10`  
*Explanation: After removing leading/trailing spaces, the word is "singleword" (length 10).*

### Thought Process (as if you’re the interviewee)  
- Brute-force approach:  
  - Split the string on spaces, filter out empty segments, and return the length of the last word segment.  
  - While easy, this uses extra space for the split list.
- More optimal:  
  - Scan backwards from the end, skipping trailing spaces, then count characters until the next space (or start of string) is found.  
  - This approach is more space-efficient (just simple counters, no extra lists), and only processes what's necessary.
- I choose the backward scan because it works in-place, requires no extra structures, and is the most interview-faithful for string manipulation.

### Corner cases to consider  
- All spaces: `"     "` (should be guaranteed by constraints: at least one word present)
- Trailing/leading spaces: `"hello   "`, `"   hello"`
- Single word: `"hello"`
- Multiple consecutive spaces between words: `"a   b"`
- Word with 1 character: `"h"`
- Word at start and possibly spaces at end: `"word    "`

### Solution

```python
def lengthOfLastWord(s: str) -> int:
    # Start from the end of the string
    i = len(s) - 1

    # Skip all trailing spaces
    while i >= 0 and s[i] == ' ':
        i -= 1

    # Count characters of the last word
    length = 0
    while i >= 0 and s[i] != ' ':
        length += 1
        i -= 1

    return length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string (`s`). We may need to scan all characters in the worst case (e.g., no trailing spaces).
- **Space Complexity:** O(1), since we use only a constant amount of extra variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this function to return the last word itself, not just its length?  
  *Hint: Track the starting and ending index and return the substring.*

- What if there can be non-ASCII or Unicode whitespace?  
  *Hint: You'd need to check for more than just the ASCII space character.*

- How would the approach change if you need to process the string in a streaming fashion (as characters arrive one by one)?  
  *Hint: Maintain a rolling window of word lengths, updating only when a word boundary is crossed.*

### Summary
This is a classic *string manipulation — reverse scan* pattern. You minimize allocations and scan from the end, a very common technique for last-segment and suffix/string problems.  
This pattern applies to problems involving: trimming, extracting last/suffix token, and other right-to-left parsing scenarios.


### Flashcard
Scan from the end, skip trailing spaces, then count characters until the next space to find the last word’s length.

### Tags
String(#string)

### Similar Problems
