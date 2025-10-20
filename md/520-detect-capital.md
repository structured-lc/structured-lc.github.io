### Leetcode 520 (Easy): Detect Capital [Practice](https://leetcode.com/problems/detect-capital)

### Description  
Given a word (string), determine if its capitalization usage is correct. **A "correct" usage** is defined as:
- All letters are uppercase (example: `"USA"`).
- All letters are lowercase (example: `"leetcode"`).
- Only the first letter is uppercase and the rest are lowercase (example: `"Google"`).

Return `True` if the word follows one of these rules; otherwise, return `False`.

### Examples  

**Example 1:**  
Input: `"USA"`  
Output: `True`  
*Explanation: All letters are uppercase, so this matches the first rule.*

**Example 2:**  
Input: `"leetcode"`  
Output: `True`  
*Explanation: All letters are lowercase, which fits the second rule.*

**Example 3:**  
Input: `"Google"`  
Output: `True`  
*Explanation: Only the first letter is uppercase, matching the third rule.*

**Example 4:**  
Input: `"FlaG"`  
Output: `False`  
*Explanation: The letters do not fit any of the allowed capitalization patterns (`la` is lowercase, `F` and `G` uppercase—the mix is not permitted).*

### Thought Process (as if you’re the interviewee)  

Start by reviewing the **three valid capitalization cases**:

- All characters are uppercase.
- All characters are lowercase.
- Only the first character is uppercase, and the rest are all lowercase.

Given these definitions, a brute-force approach would be to check each rule independently:
- Compare the string to its uppercase/lowercase version for the first two rules.
- For the third rule, check that the first character is uppercase and the rest are all lowercase.

Another approach: **Count the number of uppercase letters** in the word:
- If count equals the length, it's all uppercase.
- If count is 0, it's all lowercase.
- If count is 1, and the first character is uppercase, it's the third pattern.

This single-pass approach is both clear and efficient. It only needs a counter.

**Why this approach?**  
It's simple, needs only O(n) time and O(1) space, and is easy to code without relying on Python library shortcuts like `word.isupper()`, which are not always allowed in interviews.

### Corner cases to consider  
- The word has only one letter (should always be valid).
- The word is empty (depending on constraints, this could be invalid).
- The word has only uppercase or only lowercase letters.
- The word has mixed capitalization not matching any rule, e.g., "GoOGLE", "gOOGLE".
- Non-alphabetic characters are present (problem assumes letters only).

### Solution

```python
def detectCapitalUse(word):
    # Edge case: empty string is not valid
    if not word:
        return False
    
    capital_count = 0
    n = len(word)
    
    # Count uppercase letters
    for ch in word:
        if 'A' <= ch <= 'Z':
            capital_count += 1
    
    # Rule 1: All uppercase
    if capital_count == n:
        return True
    # Rule 2: All lowercase
    if capital_count == 0:
        return True
    # Rule 3: Only the first letter is uppercase
    if capital_count == 1 and 'A' <= word[0] <= 'Z':
        return True
    
    # None of the rules matched
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We scan the entire word once to count uppercase letters; n = length of the word.
- **Space Complexity:** O(1) — We just use a few counters/variables; no extra space proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle Unicode characters or words with non-English alphabets?  
  *Hint: `ord()` and language-specific casing rules may differ—consider internationalization.*

- What if you need to find incorrect capital words in a list of words?  
  *Hint: Run this check per word and collect the invalid ones into a result list.*

- Can you do this in a single pass without counting capitals first?  
  *Hint: Early return when detecting an invalid pattern.*

### Summary

This problem employs simple **string pattern checking** (case analysis) and counting, a classic coding interview pattern. It's representative of situations where multiple rules can be verified with a **linear scan** and a couple of counters. The approach is efficient, clear, and generalizes well for similar pattern-validation questions.


### Flashcard
Check if all letters are uppercase, all lowercase, or only the first is uppercase and the rest lowercase.

### Tags
String(#string)

### Similar Problems
- Capitalize the Title(capitalize-the-title) (Easy)
- Count the Number of Special Characters II(count-the-number-of-special-characters-ii) (Medium)
- Count the Number of Special Characters I(count-the-number-of-special-characters-i) (Easy)