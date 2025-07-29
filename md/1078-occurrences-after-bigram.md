### Leetcode 1078 (Easy): Occurrences After Bigram [Practice](https://leetcode.com/problems/occurrences-after-bigram)

### Description  
Given a string text and two strings first and second, return all words that immediately follow the sequence "first second" anywhere in text.  
Imagine the text as a sequence of words. For every occurrence where the word first is immediately followed by second, collect the *next* word (if it exists) and put it in the result list.

### Examples  

**Example 1:**  
Input: `text = "alice is a good girl she is a good student", first = "a", second = "good"`  
Output: `["girl", "student"]`  
*Explanation: The pairs "a good" are found twice. In both cases, the following word is collected: "girl" after the first and "student" after the second.*

**Example 2:**  
Input: `text = "we will we will rock you", first = "we", second = "will"`  
Output: `["we", "rock"]`  
*Explanation: The sequence "we will" appears twice. The words immediately after them are "we" and "rock".*

**Example 3:**  
Input: `text = "hello world", first = "hello", second = "world"`  
Output: `[]`  
*Explanation: "hello world" appears, but there is no word that follows it, so the result is empty.*

### Thought Process (as if you’re the interviewee)  
First, I’ll split the text into a list of words.  
Next, I’ll iterate through the list, stopping at each word and checking if it and the next word form the pair “first second”. If they do, and there’s a word following the pair, I’ll add that word to a results list.  
The brute-force approach is fine here, since we only need one pass through the words (O(n)), comparing and collecting as we go.  
No fancy data structures or optimization are really needed, since the problem is simple and efficient as is.  
This sliding window of three words (checking i, i+1, and collecting i+2 if match) is simple and direct.

### Corner cases to consider  
- The input text is empty.
- The text has fewer than three words.
- The sequence “first second” is not found at all.
- The sequence appears at the very end (with no room for a following word).
- Multiple overlapping occurrences (e.g. in “a a a a”, first=“a”, second=“a”).
- Case sensitivity: input is case sensitive.

### Solution

```python
def findOcurrences(text, first, second):
    # Split the text into a list of words
    words = text.split()
    result = []
    # Iterate through the list, but stop at len(words) - 2
    for i in range(len(words) - 2):
        # Check if current and next word match first and second
        if words[i] == first and words[i + 1] == second:
            # Append the word that comes after the pair
            result.append(words[i + 2])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of words in text. We only loop once through the list.
- **Space Complexity:** O(n) to store the words list and the output result, at worst all words could match.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to handle punctuation or ignore capitalization?
  *Hint: Preprocess and normalize the text (strip punctuation, lower-case all words).*

- How would you do this if the text was *streamed* and you couldn’t load all at once?
  *Hint: Use a sliding buffer to remember only the last two words as you read.*

- How to generalize this to n-grams (e.g., find “first second third” and collect the fourth word)?
  *Hint: Extend your sliding window to n words, check all combinations.*


### Summary
This problem relies on the sliding window pattern, looping through the word list and checking groups of consecutive words. This is a classic pattern for substring, substring-with-lookahead, and sequence detection problems. The approach is direct and requires only a single pass, making it efficient and clean. This pattern is broadly applicable for n-gram analysis and log or text processing tasks.