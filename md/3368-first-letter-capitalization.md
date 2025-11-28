### Leetcode 3368 (Hard): First Letter Capitalization [Practice](https://leetcode.com/problems/first-letter-capitalization)

### Description  
Given a table of text snippets, return each text converted to “Title Case”: the first letter of every word should be uppercase and all other letters lowercase. Treat all non-space boundaries (spaces, possibly hyphens or punctuation) as separators.  
For example, “the QUICK brown fox” → “The Quick Brown Fox”.  
You need to handle all-uppercase, mixed-case, and single-letter words.  
The task is to create an algorithm that outputs both the original and the converted texts for each content.

### Examples  

**Example 1:**  
Input: `content_text = "hello world of SQL"`  
Output: `"Hello World Of SQL"`  
*Explanation: Each word's first character is capitalized, and the rest is lowercase.*

**Example 2:**  
Input: `content_text = "the QUICK brown fox"`  
Output: `"The Quick Brown Fox"`  
*Explanation: Converts all words to title case, regardless of original casing.*

**Example 3:**  
Input: `content_text = "TOP rated programming BOOKS"`  
Output: `"Top Rated Programming Books"`  
*Explanation: Handles fully capitalized and mixed-case words. "TOP" becomes "Top", "BOOKS" to "Books".*

**Example 4:**  
Input: `content_text = "data science AND machine learning"`  
Output: `"Data Science And Machine Learning"`  
*Explanation: Handles short uppercase “AND” to "And".*

### Thought Process (as if you’re the interviewee)  
- Brute-force approach:  
  - Split the string by spaces.  
  - For each word:  
    - Convert the first letter to uppercase, and the rest to lowercase.  
  - Join the words back using spaces.
  - Edge: Watch out for multiple spaces, empty words, or punctuation.
- This can be improved by walking through the string and detecting word boundaries (to generalize for non-space separators, though in most examples only space splits).
- Alternative: If the character is at the start of the string or follows a space, capitalize it; otherwise, lowercase it.
- Trade-offs:  
  - Using string split and join is very readable and handles most edge cases unless there are non-standard delimiters.
  - Manual iteration handles more edge cases (multiple spaces, tabs, punctuation).
- I would choose the word-based, split-map-join method for code simplicity and correctness in standard space-delimited input.

### Corner cases to consider  
- Empty input string.
- Input with only spaces or multiple spaces between words.
- Punctuation next to words (e.g., “hello, world!”).
- Single-letter words.
- Words that are already in proper case.
- Words in all uppercase or all lowercase.
- Words with digits or non-letter characters.

### Solution

```python
def capitalize_text(content_text):
    # Split the text by spaces to get individual words
    words = content_text.split(' ')
    result_words = []
    for word in words:
        if word:  # skip empty strings from multiple spaces
            # Capitalize the first character, lowercase the rest
            first = word[0].upper()
            rest = word[1:].lower() if len(word) > 1 else ''
            result_words.append(first + rest)
        else:
            # Handle multiple spaces (keep empty for join to preserve spaces)
            result_words.append('')
    # Join back with spaces to preserve original spacing
    return ' '.join(result_words)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. Each character is read once (splitting, processing each word, rejoining).
- **Space Complexity:** O(n), due to storage for the split word list and output string.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there may be multiple different types of delimiters (tabs, hyphens, punctuation…)?
  *Hint: Consider regular expressions or manually checking word boundaries while iterating.*
- How would you handle Unicode or language-specific capitalization?
  *Hint: Use locale-aware string methods or libraries.*
- Can you do it in-place without extra space (for very long strings)?
  *Hint: Modify a character array representation in-place if language permits.*

### Summary
This problem is a classic string manipulation challenge, illustrating the “scan and transform tokens” pattern.  
The map-transform-join style is broadly applicable: title-casing names, correcting headings, or standardizing natural language input before further processing.  
It’s common in preprocessing stages for NLP, user-input normalization, and data cleaning tasks.


### Flashcard
Iterate through the string and capitalize the first letter of each word (after spaces or at the start); convert other letters to lowercase.

### Tags
Database(#database)

### Similar Problems
