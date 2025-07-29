### Leetcode 3374 (Hard): First Letter Capitalization II [Practice](https://leetcode.com/problems/first-letter-capitalization-ii)

### Description  
Given a string (or multiple database rows of text), capitalize the **first letter of every word**, where a word is defined as any sequence of letters separated by spaces or hyphens ('-').  
- For **hyphenated words** (like "quick-brown"), capitalize the first letter after each hyphen as well.  
- All other letters in the word (including uppercase abbreviations or all-uppercase words) should be converted to lowercase except the first letter after each space or hyphen.

For example, `"the QUICK-brown fox"` becomes `"The Quick-Brown Fox"`.


### Examples  

**Example 1:**  
Input: `"hello world of SQL"`  
Output: `"Hello World Of Sql"`  
*Explanation: Capitalize the first letter of each word and convert the rest to lowercase, including "SQL" → "Sql".*

**Example 2:**  
Input: `"the QUICK-brown fox"`  
Output: `"The Quick-Brown Fox"`  
*Explanation: "QUICK-brown" is treated as two sub-words: "QUICK" and "brown". Output is "Quick-Brown". All words' first letters are capitalized, and the rest are lowercase.*

**Example 3:**  
Input: `"web-based FRONT-end development"`  
Output: `"Web-Based Front-End Development"`  
*Explanation: Both hyphenated words have their first letter after the hyphen capitalized. All other letters are lowercase.*


### Thought Process (as if you’re the interviewee)  

Start with the **brute-force approach**:
- Iterate through the string.
- When you encounter a **space** or **hyphen**, the next character (if it is a letter) should be capitalized.
- For all other characters, convert to lowercase unless it is the first character of the string (should be capitalized if a letter).

**Optimizing:**
- Track a flag (e.g. `capitalize_next`) that is true at the start or after space/hyphen.
- Loop over each character. If it’s a letter and `capitalize_next` is true, capitalize it. Otherwise, lowercase it.
- Set `capitalize_next` to True for the character after space or hyphen; otherwise, False.

**Why this approach?**
- O(n) time, where n is the length of the string.
- Simple state machine; avoids splitting or regex (which might be banned in interviews).
- Handles edge cases: consecutive spaces/hyphens, non-alpha separators, hyphenated words.

### Corner cases to consider  
- Empty string: `""` should return `""`.
- String with multiple spaces or hyphens in a row: `"a--b c"` → `"A--B C"`.
- Leading/trailing spaces: `" hello "` → `" Hello "`.
- All uppercase or all lowercase input.
- Non-alphabetic symbols: `"x-y2z"` → `"X-Y2z"`.
- Strings with numbers and punctuation.


### Solution

```python
def capitalize_words(text):
    # Initialize result as a list for O(1) appends
    result = []
    capitalize_next = True  # Capitalize the first letter

    for ch in text:
        if ch.isalpha():
            if capitalize_next:
                result.append(ch.upper())
            else:
                result.append(ch.lower())
            capitalize_next = False
        else:
            result.append(ch)
            # Check if next character (after space or hyphen) should be capitalized
            if ch == ' ' or ch == '-':
                capitalize_next = True
            else:
                capitalize_next = False
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string, as we process each character exactly once.
- **Space Complexity:** O(n), for the result list which stores the transformed string (not counting output).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle Unicode letters and accents?
  *Hint: Python’s `.isalpha()` works for many Unicode letters, but you may need locale-specific handling in some languages.*

- How would you process in place with O(1) extra space?
  *Hint: Strings are immutable in Python; consider if allowed to modify input (in C/C++ / Java, char arrays may allow this).*

- How does your code handle non-standard separators (like ".", ",", etc.)?
  *Hint: The code only treats space and hyphen as word-breakers for capitalization; punctuation remains unchanged.*


### Summary
This problem is a **string processing pattern** using **state tracking** (capitalization toggling). It’s applicable wherever “title-casing” with custom word boundaries is needed (for example, slug or human-readable formatting).  
The technique easily generalizes, and is a foundation for more advanced tokenization or locale-aware text processing. The code stays efficient and clear by limiting built-ins and focusing on per-character logic.