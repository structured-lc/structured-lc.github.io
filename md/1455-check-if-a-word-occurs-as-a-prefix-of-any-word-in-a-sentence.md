### Leetcode 1455 (Easy): Check If a Word Occurs As a Prefix of Any Word in a Sentence [Practice](https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence)

### Description  
Given a sentence (a string of words separated by single spaces) and a searchWord, check if searchWord is a prefix of any word in the sentence. Return the position (1-indexed) of the **first** such word if it exists, else return -1.  
A prefix means the start of the word is exactly equal to the searchWord; e.g., "pro" is a prefix of "problem".  

### Examples  

**Example 1:**  
Input: `sentence = "i love eating burger", searchWord = "burg"`  
Output: `4`  
*Explanation: The 4ᵗʰ word is "burger", and "burg" is a prefix of "burger". Return 4.*

**Example 2:**  
Input: `sentence = "this problem is an easy problem", searchWord = "pro"`  
Output: `2`  
*Explanation: "pro" is a prefix for the 2ⁿᵈ word "problem". Both 2ⁿᵈ and 6ᵗʰ words match, but we return the first match, 2.*

**Example 3:**  
Input: `sentence = "i am tired", searchWord = "you"`  
Output: `-1`  
*Explanation: No word starts with "you". Return -1.*

### Thought Process (as if you’re the interviewee)  
First, I’d split the sentence into words by spaces. For each word, I’d check if it starts with searchWord. If yes, I’d return its position (adding 1 for 1-based indexing).  
A brute-force approach will scan each word and compare each string’s prefix, which is simple and efficient enough since typical sentences are short.  
We could use the built-in `startswith` check for clarity, but in interviews, we could also manually compare the first len(searchWord) characters if needed.  
Any extra optimization (like using a Trie) is unnecessary here, because a single pass is already optimal for small inputs.  
Choosing this approach keeps the logic straightforward and limits unnecessary complexity.

### Corner cases to consider  
- Empty sentence or empty searchWord.  
- searchWord equal to an entire word.  
- searchWord longer than any word in the sentence (should always return -1).  
- Multiple matching words: should return the **first** one (smallest index).  
- Words that contain searchWord but not at the prefix.

### Solution

```python
def isPrefixOfWord(sentence, searchWord):
    # Split the sentence into words (by space)
    words = sentence.split(' ')
    # Iterate with index for 1-based positions
    for idx, word in enumerate(words):
        # Check if searchWord is a prefix of this word
        # Manual check so as not to rely on python conveniences
        n = len(searchWord)
        # Compare only if word is long enough
        if len(word) >= n and word[:n] == searchWord:
            # Position is 1-indexed
            return idx + 1
    # No match found
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of characters in the sentence (for the split and the prefix comparisons).
- **Space Complexity:** O(W), where W is the number of words (extra space for the list after splitting).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input sentence contained punctuation or was not guaranteed to have a single space separating words?  
  *Hint: You’d need to handle separation more robustly—maybe using regex or string processing.*

- Suppose you need to find all positions where searchWord is a prefix, not just the first.  
  *Hint: Collect all matching indices in a result list instead of returning at first match.*

- How would you handle performance if the sentence was extremely large (e.g., a book)?  
  *Hint: Consider streaming/processing lazily, rather than splitting all at once.*

### Summary
This problem uses the **string scanning pattern**: process each word in a sentence sequentially, checking a prefix condition.  
It’s a classic for practicing loops, string slicing, and indexing (especially for 1-based counting). The approach can be applied whenever you need to check for a property within a collection linearly and return the index of the first matching element.


### Flashcard
Split sentence into words, return the 1-based index of the first word starting with searchWord, or -1 if none.

### Tags
Two Pointers(#two-pointers), String(#string), String Matching(#string-matching)

### Similar Problems
- Counting Words With a Given Prefix(counting-words-with-a-given-prefix) (Easy)
- Count Prefixes of a Given String(count-prefixes-of-a-given-string) (Easy)