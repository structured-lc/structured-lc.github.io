### Leetcode 2047 (Easy): Number of Valid Words in a Sentence [Practice](https://leetcode.com/problems/number-of-valid-words-in-a-sentence)

### Description  
Given a string sentence consisting of lowercase letters, digits, hyphens (-), punctuation marks (! . ,), and spaces, count the number of **valid words** in the sentence.  
A **valid word** is a token (substring without spaces) that satisfies all of the following:
- Only contains lowercase letters, and at most one hyphen or one punctuation mark.
- A hyphen, if present, must be flanked by lowercase letters (i.e., right between two lowercase letters).
- A punctuation mark, if present, must only appear at the end.
- Contains no digits.

### Examples  

**Example 1:**  
Input: `"cat and dog"`  
Output: `3`  
*Explanation: All tokens ("cat","and","dog") are valid — lowercase letters only.*

**Example 2:**  
Input: `"!this 1-s b8d!"`  
Output: `0`  
*Explanation: "this" is invalid (starts with '!'), "1-s" is invalid (contains '1'), "b8d!" is invalid (contains '8').*

**Example 3:**  
Input: `"alice and  bob are playing stone-game10"`  
Output: `5`  
*Explanation: All except "stone-game10" (contains digit '1' and '0').*

**Example 4:**  
Input: `"cat. 1dog- are you-sure? end."`  
Output: `3`  
*Explanation:  
- "cat." is valid (punctuation at end).  
- "1dog-" is invalid (contains digit '1', hyphen not between lowercase letters).  
- "are" is valid.  
- "you-sure?" is invalid (punctuation not at the end, not single).  
- "end." is valid.*

### Thought Process (as if you’re the interviewee)  
First, break the sentence into tokens using whitespace. For each token, check if it is valid by applying the stated rules.  
Brute-force method: For each token, check for digits (invalid if any found), ensure at most one hyphen (and not first/last, must be between lowercase), and at most one end punctuation (if present, only at last character).  
To optimize, do all these checks in a single left-to-right scan for each token, avoiding unnecessary work.  
Trade-off: This is already O(n) time, where n is the length of the sentence. There's not much room for optimization unless memory is a concern.

### Corner cases to consider  
- Multiple spaces between tokens or at edges.
- Hyphen at beginning or end: "-cat", "cat-"
- More than one hyphen: "a-b-c"
- Hyphen not between two letters: "ab-3"
- Punctuation in the middle: "he!llo"
- Digit anywhere in token: "a1b"
- Empty tokens after split.
- Combined errors: "a-b!" (hyphen valid, punctuation valid if at end).  
- Only punctuation: "." (which is valid).
- Hyphen only: "-" (not valid, since not between lowercase letters).

### Solution

```python
def countValidWords(sentence: str) -> int:
    def is_valid(token: str) -> bool:
        if not token:
            return False

        hyphen_used = False
        n = len(token)
        for i, c in enumerate(token):
            if c.isdigit():
                return False
            if c in "!.,":  # punctuation
                if i != n - 1:
                    return False  # must be at end
            if c == '-':
                if hyphen_used:
                    return False  # at most one hyphen
                if i == 0 or i == n - 1:
                    return False  # cannot be at start or end
                if not (token[i - 1].islower() and token[i + 1].islower()):
                    return False  # must be surrounded by lowercase
                hyphen_used = True
        return True

    tokens = sentence.strip().split()
    count = 0
    for token in tokens:
        if is_valid(token):
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the sentence. Each character is visited at most twice: once for splitting, once for checking.
- **Space Complexity:** O(n) for storing tokens after split. No extra data structures depending on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if the sentence could contain uppercase letters?
  *Hint: Think about whether uppercase is allowed as valid, or needs case normalization.*

- Can your function handle Unicode characters, such as accented letters or other scripts?
  *Hint: Consider Python's str methods and what they detect as lowercase.*

- What if we want to extract and return an array of all valid words, rather than just count?
  *Hint: Return a list comprehension with the same check instead of a count.*

### Summary
This approach demonstrates the **tokenization + validation** pattern, scanning each word and performing stepwise checks in linear time. The pattern is broadly useful: parsing or validating log lines, cleaning user input, or token classification in natural-language tasks. The function is easily adapted to related word validation questions with custom rules.


### Flashcard
For each token, check no digits, at most one hyphen (not first/last), at most one punctuation (only at end)—single left-to-right scan per token.

### Tags
String(#string)

### Similar Problems
- Maximum Number of Words Found in Sentences(maximum-number-of-words-found-in-sentences) (Easy)