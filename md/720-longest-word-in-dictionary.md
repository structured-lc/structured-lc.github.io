### Leetcode 720 (Medium): Longest Word in Dictionary [Practice](https://leetcode.com/problems/longest-word-in-dictionary)

### Description  
Given a list of strings representing words in an English dictionary, find the **longest word** that can be built one character at a time by other words in the same list. Each newly added character must be at the end (right side) of an existing, smaller word.  
If there are multiple such longest words, return the **lexicographically smallest** one.  
If no such word exists, return the empty string.

### Examples  

**Example 1:**  
Input: `["w", "wo", "wor", "worl", "world"]`  
Output: `"world"`  
*Explanation: Each prefix of "world" ("w", "wo", "wor", "worl") is present in the list so "world" is valid and the longest.*

**Example 2:**  
Input: `["a", "banana", "app", "appl", "ap", "apply", "apple"]`  
Output: `"apple"`  
*Explanation: Both "apple" and "apply" can be built by successively adding one letter to words in the list:  
"a" → "ap" → "app" → "appl" → "apple"/"apply".  
"apple" comes before "apply" lexicographically.*

**Example 3:**  
Input: `["yo", "y", "ya", "yay", "yaya", "yayaya"]`  
Output: `"yayaya"`  
*Explanation: "y" → "ya" → "yay" → "yaya" → "yayaya".  
All prefixes except the first character are present, so "yayaya" is valid.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
    For each word, check if all its prefixes (minus the last character, minus two, etc.) exist in the list.  
    For each prefix, check if it exists, which could be slow (\(O(n \cdot k^2)\)), where \(k\) is the max word length.

- **Optimization:**  
    Store the words in a set for \(O(1)\) prefix lookup.  
    Sort the word list:  
      - First by length (so longer words come after their possible prefixes).
      - For equal length, sort lexicographically (to break ties).  
    Iterate over sorted words and, for each, check that **all prefixes** exist in the set. Keep the longest valid word (or the smallest in lex order if tied).

    Alternatively, a **Trie** could be used, but with set and sorting, it’s simpler for the constraints.

### Corner cases to consider  
- Words with only 1 letter (must allow them as base case)  
- Input contains only 1 word  
- Multiple equally long words possible (return the lex smallest)  
- No buildable word (output should be "")  
- Prefixes exist for some, but not the longest word  
- All words with length > 1 are missing the necessary prefixes  
- Duplicates in input (should not affect answer, but not expected per problem)

### Solution

```python
def longestWord(words):
    # Use a set for O(1) lookup of prefixes
    word_set = set(words)
    result = ""

    # Sort: first by length, then by lex order (so we get desired tiebreaker)
    words.sort()
    words.sort(key=len)

    for word in words:
        # For single-letter words, they're valid
        if len(word) == 1 or all(word[:k] in word_set for k in range(1, len(word))):
            # Longer or lex smaller gets priority
            if len(word) > len(result) or (len(word) == len(result) and word < result):
                result = word

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting is O(n log n) for n words  
  - For each word, check up to k prefixes (total word chars summed is S), checking each in O(1)  
  - So O(n log n + S) overall

- **Space Complexity:**  
  - O(n × k) for storing words in set (n words, each up to length k)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large dictionaries or streaming input?  
  *Hint: Consider Trie data structures or incremental prefix storage.*

- Can you optimize for repeated queries for different word lists?  
  *Hint: Prefix trees with memoization or dynamic programming on subchains.*

- What if you needed to return **all** buildable words of maximal length, not just the lex smallest?  
  *Hint: Store all candidates in a list and filter at the end.*

### Summary
This solution uses **sorting** and **prefix checking** with a set for quick lookups.  
The coding pattern is set-based validation with iteration over sorted inputs, common in "build-by-prefix" type problems.  
Similar approaches work in **Trie prefix problems**, dictionary sequence validation, and word-ladder type questions.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Trie(#trie), Sorting(#sorting)

### Similar Problems
- Longest Word in Dictionary through Deleting(longest-word-in-dictionary-through-deleting) (Medium)
- Implement Magic Dictionary(implement-magic-dictionary) (Medium)
- Longest Word With All Prefixes(longest-word-with-all-prefixes) (Medium)