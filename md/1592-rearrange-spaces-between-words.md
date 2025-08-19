### Leetcode 1592 (Easy): Rearrange Spaces Between Words [Practice](https://leetcode.com/problems/rearrange-spaces-between-words)

### Description  
Given a string `text` containing words and spaces (possibly many in sequence), rearrange the spaces so that the spaces are evenly distributed between words, with any extra spaces at the end. The output should have the same length as the original string.
- Words are sequences of non-space characters.
- There will be at least one word.

### Examples  
**Example 1:**  
Input: `"  this   is  a sentence "`  
Output: `"this   is   a   sentence"`  
*Explanation: 9 spaces, 4 words. Distribute 3 spaces between each word, none left over for the end.*

**Example 2:**  
Input: `" practice   makes   perfect"`  
Output: `"practice   makes   perfect "`  
*Explanation: 7 spaces, 3 words. 3 spaces between words, 1 space left for the end.*

**Example 3:**  
Input: `"hello   world"`  
Output: `"hello   world"`  
*Explanation: 3 spaces, 2 words. All 3 spaces go between the two words.*

### Thought Process (as if you’re the interviewee)  
First, count the total number of spaces. Split the string into words. Then, for N words:
- If only one word, all spaces go to the end.
- Otherwise, number of slots between words is (N - 1). Divide spaces evenly among slots: spaces_per_slot = total_spaces // (N - 1). Any leftover spaces will be appended at the end.
Build the result by joining words with the required spaces, then add trailing spaces as needed.

### Corner cases to consider  
- Only one word (all spaces to the end)
- String starts/ends with spaces
- No leading/trailing spaces
- Many consecutive spaces

### Solution

```python
def reorderSpaces(text: str) -> str:
    # Count total spaces
    total_spaces = text.count(' ')
    # Get all words
    words = [w for w in text.split(' ') if w]
    if len(words) == 1:
        # All extra spaces go to the end
        return words[0] + ' ' * total_spaces
    gaps = len(words) - 1
    spaces_per_gap = total_spaces // gaps
    trailing = total_spaces % gaps
    between = ' ' * spaces_per_gap
    return between.join(words) + ' ' * trailing
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) for a single left-right pass of the string
- **Space Complexity:** O(n) for the list of words and the result string, n = len(text)

### Potential follow-up questions (as if you’re the interviewer)  
- Can you do it in-place if the input is a mutable list of characters?
  *Hint: Two-pointer overwrite approach.*

- What if you want to minimize the number of spaces at the end, and instead keep them as even as possible?
  *Hint: Adjust how you distribute extra spaces and rephrase the logic for different splitting.*

- How would you handle Unicode space separators?
  *Hint: Include all whitespace code points in your check for word splits.*

### Summary
This problem uses string parsing, counting, and recombining. It is a good practice for split, join, and managing edge cases in string manipulation, and can generalize to other even-distribution and in-place problems.

### Tags
String(#string)

### Similar Problems
- Text Justification(text-justification) (Hard)