### Leetcode 408 (Easy): Valid Word Abbreviation [Practice](https://leetcode.com/problems/valid-word-abbreviation)

### Description  
Given a string **word** and a string **abbr** representing a possible abbreviation of the word, determine if abbr is a valid abbreviation.  
A valid abbreviation replaces **non-adjacent, non-empty** substrings of characters in word with their lengths (as numbers in abbr). Abbreviated numbers cannot have leading zeros. As you traverse abbr:
- If you encounter a letter, it must exactly match the letter from word at this position.
- If you encounter a digit (number), it denotes skipping that many characters in word.
- You must reach the end of both word and abbr at the same time for abbr to be valid.

### Examples  

**Example 1:**  
Input: `word = "internationalization", abbr = "i12iz4n"`  
Output: `True`  
*Explanation: 'i' matches, then '12' skips 12 characters ('nternationaliz'), 'iz' matches, '4' skips 'atio', and 'n' matches the final 'n'.*

**Example 2:**  
Input: `word = "substitution", abbr = "s10n"`  
Output: `True`  
*Explanation: 's' matches, '10' skips 'ubstitutio', then 'n' matches.*

**Example 3:**  
Input: `word = "substitution", abbr = "s010n"`  
Output: `False`  
*Explanation: The abbreviation contains a number with leading zero '010', which is not valid.*

### Thought Process (as if you’re the interviewee)  
I’ll use a **two-pointer** approach: one pointer for word, one for abbr.  
- Traverse abbr:
    - If abbr[j] is a **letter**, check if it matches word[i]. If not, return False. Move both pointers.
    - If abbr[j] is a **digit**, first ensure it's not '0' (no leading zeros allowed). Parse the full number (accounting for multiple digits), then advance the word pointer by that number.  
- At the end, both pointers should have consumed their strings fully.  
This is O(N) time, since each character in abbr and word is processed at most once.  
The main trade-off: this approach is efficient and straightforward to implement, but needs careful handling of edge cases (digits, leading zeros, synchronizing both pointers).

### Corner cases to consider  
- abbr is empty, word is not (and vice versa)
- abbr skips more characters than word’s length
- abbr contains a number with leading zeros (e.g. "s01n")
- abbr has only letters, no numbers
- abbr is longer or shorter than it “should” be after abbreviation expansion
- Multiple consecutive numbers in abbr
- abbr ends with a number
- Numbers in abbr are >1 digit

### Solution

```python
def validWordAbbreviation(word: str, abbr: str) -> bool:
    i = 0  # Pointer for word
    j = 0  # Pointer for abbr

    while j < len(abbr) and i <= len(word):
        if abbr[j].isalpha():
            # Letter in abbreviation must match letter in word
            if i >= len(word) or word[i] != abbr[j]:
                return False
            i += 1
            j += 1
        else:
            # Leading zeros are not allowed
            if abbr[j] == '0':
                return False

            num = 0
            while j < len(abbr) and abbr[j].isdigit():
                num = num * 10 + int(abbr[j])
                j += 1
            i += num  # Skip num characters in word

    return i == len(word) and j == len(abbr)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M + N), where N is the length of word and M is the length of abbr. Each character in abbr and word is examined once, due to two-pointer approach.  
- **Space Complexity:** O(1), as only a few integer variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if numbers (abbreviation counts) can have leading zeros?  
  *Hint: Discuss how parsing would change, and whether leading zeros would have semantic meaning.*

- How would you handle matching if abbr might abbreviate multiple words (e.g. abbreviate “New York” as “N3 Y2”)?  
  *Hint: Consider splitting input on whitespace and applying validation per word.*

- Can you support expansion (i.e. given abbr, expand it to the possible original word)?  
  *Hint: This is possible only if there is no information loss or ambiguity.*

### Summary
The **two-pointer** technique shines when simulating parallel traversals over two related strings. It's a common coding pattern for problems like this where we validate two mapping structures step by step (as in string parsing or edit distance problems). This pattern helps avoid extra space and makes for linear, efficient, easy-to-debug code.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Minimum Unique Word Abbreviation(minimum-unique-word-abbreviation) (Hard)
- Word Abbreviation(word-abbreviation) (Hard)
- Check if an Original String Exists Given Two Encoded Strings(check-if-an-original-string-exists-given-two-encoded-strings) (Hard)