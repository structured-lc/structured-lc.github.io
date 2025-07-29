### Leetcode 2129 (Easy): Capitalize the Title [Practice](https://leetcode.com/problems/capitalize-the-title)

### Description  
Given a string consisting of one or more words, separated by single spaces, where each word is made up of English letters, capitalize the title as follows:
- If the length of a word is 1 or 2, convert all its letters to lowercase.
- If the length of a word is 3 or more, capitalize its first letter and make the rest lowercase.
Return the new title string with these capitalization rules applied to each word.

### Examples  

**Example 1:**  
Input: `capiTalIze tHe titLe`  
Output: `Capitalize The Title`  
*Explanation: Each word has at least 3 letters, so for each, the first letter is uppercase, the rest lowercase.*

**Example 2:**  
Input: `First leTTeR of EACH Word`  
Output: `First Letter of Each Word`  
*Explanation: "of" is 2 letters, so it is all lowercase; other words have 3+ letters and are title-cased.*

**Example 3:**  
Input: `i lOve leetcode`  
Output: `i Love Leetcode`  
*Explanation: "i" is a 1-letter word, so it is all lowercase; "Love" and "Leetcode" are 4+ letters and get capitalized appropriately.*

### Thought Process (as if you’re the interviewee)  
First, I want to process the input string word by word, so I’ll split the input by spaces. For each word, I need to check its length.  
- If length ≤ 2: convert the whole word to lowercase.
- If length ≥ 3: capitalize the first letter (uppercase), and lowercase all other letters.  
Once processed, I’ll join all the result words with a space to form the final string.

The brute-force way would be to process each word one by one with standard string operations (`lower`, `capitalize`), but since there are small constraints (max 100 characters), this is efficient enough.  
I choose this approach for clarity and direct correspondence with the problem’s requirements. There’s no notable optimization to be had for this problem.

### Corner cases to consider  
- Input contains only one word, with length 1 or 2 or more.
- Words with mixed uppercase and lowercase letters.
- All words are already in correct form.
- Words in all uppercase or all lowercase.
- Multiple 1- or 2-letter words in a row.

### Solution

```python
def capitalizeTitle(title: str) -> str:
    # Split the input string into words
    words = title.split(' ')
    result = []

    # Process each word as per the rules
    for word in words:
        if len(word) <= 2:
            # Words of length 1 or 2: all lowercase
            result.append(word.lower())
        else:
            # Words of length 3 or more: capitalize first, rest lowercase
            # First convert all to lowercase to avoid edge cases, then capitalize first letter
            lowered = word.lower()
            capitalized = lowered[0].upper() + lowered[1:]
            result.append(capitalized)

    # Join the processed words with spaces and return
    return ' '.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the number of characters in the input. Each character is visited a constant number of times (split, process, join).
- **Space Complexity:** O(n) for storing the result array and for the output string, as we need space proportional to the input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input contains punctuation adjacent to words?
  *Hint: Consider how punctuation is handled—should it be considered part of the word or separated?*

- How would you handle arbitrary whitespace between words (e.g., multiple spaces)?
  *Hint: Think about how you split and join the words.*

- Can this be solved in-place (no extra space for a list of words)?
  *Hint: Try processing the string character by character rather than splitting it.*

### Summary
This is a straightforward **string manipulation** problem with simple case handling for each word. The pattern is common for word-wise text transformations and can be applied anywhere titles or headlines need to be standardized (e.g., formatting book/article titles). The approach is direct: split, process, and join—no advanced algorithms or data structures required.