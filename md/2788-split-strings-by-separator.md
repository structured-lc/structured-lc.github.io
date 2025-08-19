### Leetcode 2788 (Easy): Split Strings by Separator [Practice](https://leetcode.com/problems/split-strings-by-separator)

### Description  
Given a list of strings (`words`) and a single character (`separator`), split each string in `words` into substrings wherever the separator appears. Collect all resulting substrings (excluding empty strings) into a list, preserving the original order. The separator character itself should not be present in the results.

### Examples  

**Example 1:**  
Input: `words = ["one.two.three","four.five","six"]`, `separator = '.'`  
Output: `["one","two","three","four","five","six"]`  
*Explanation: `"one.two.three"` → "one", "two", "three"; `"four.five"` → "four", "five"; `"six"` → "six". All non-empty substrings are collected in order.*

**Example 2:**  
Input: `words = ["$easy$","$problem$"]`, `separator = '$'`  
Output: `["easy","problem"]`  
*Explanation: `"$easy$"` → "easy"; `"$problem$"` → "problem". Empty substrings before/after '$' are excluded.*

**Example 3:**  
Input: `words = ["|||"]`, `separator = '|'`  
Output: `[]`  
*Explanation: Each word is only separators, so all splits are empty and excluded.*

### Thought Process (as if you’re the interviewee)  
First, for each string in `words`, I need to split it at every occurrence of `separator`. In a real coding interview, I should avoid using Python's built-in `split()` directly, so I'll process each character and build substrings manually.

For each word, I:
- Build up a substring character by character.
- When I hit the separator, if my substring isn’t empty, I save it and reset.
- At the end, if I have a leftover substring, I save that too.
- Repeat for all words, gathering non-empty substrings in order.

This approach ensures I do not include any empty strings, and preserves order. It is straightforward and efficient since each character is visited exactly once.

### Corner cases to consider  
- Strings that start or end with the separator, e.g. `"$a$"` or `"a$"`.
- Strings of only separators, e.g. `"|||"`, should yield no output.
- Separator not present in a word, e.g. `"hello"`.
- An empty input list.
- Words that are empty strings.

### Solution

```python
def split_words_by_separator(words, separator):
    result = []
    for word in words:
        current = ''
        for char in word:
            if char == separator:
                # If current is non-empty, add to result
                if current:
                    result.append(current)
                    current = ''
            else:
                current += char
        # Add any trailing substring after last separator
        if current:
            result.append(current)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the sum of lengths of all strings in `words`. Each character is processed once.
- **Space Complexity:** O(N), because the resulting list can be at most the total number of characters (if no separators present), and a small constant for `current` substring storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the separator is a string (possibly multiple characters), not just a single character?  
  *Hint: Sliding window comparison, or handling repeated substrings.*

- How would you split but retain the separator in the output, before or after each split?  
  *Hint: Decide whether to append the separator with the substring or separately.*

- What if you cannot use extra space proportional to the input size?  
  *Hint: Consider yielding substrings (generators), or splitting in-place if possible.*

### Summary
The approach uses basic string traversal and substring-building—classic for custom parsing problems, especially where use of high-level split/join is discouraged. This pattern frequently appears in log parsing, custom delimiters in data files, and anywhere fine-tuned string processing is required, and it trains careful attention to string boundaries and empty substring handling.

### Tags
Array(#array), String(#string)

### Similar Problems
- Split a String in Balanced Strings(split-a-string-in-balanced-strings) (Easy)