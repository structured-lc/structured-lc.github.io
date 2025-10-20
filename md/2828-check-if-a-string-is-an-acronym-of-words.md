### Leetcode 2828 (Easy): Check if a String Is an Acronym of Words [Practice](https://leetcode.com/problems/check-if-a-string-is-an-acronym-of-words)

### Description  
Given a list of words (strings) and a string `s`, determine whether `s` is the acronym formed by concatenating the first character of each word in the list, in order.  
Return `True` if so, else `False`.  
For example, if the list is `["apple", "banana", "carrot"]`, the acronym would be `"abc"`.

### Examples  

**Example 1:**  
Input: `words = ["alice", "bob", "charlie"]`, `s = "abc"`  
Output: `True`  
*Explanation: The first letters are 'a', 'b', 'c' → combined is "abc", which matches s.*

**Example 2:**  
Input: `words = ["an", "apple"]`, `s = "a"`  
Output: `False`  
*Explanation: There are two words, so the acronym should be "aa", but s="a".*

**Example 3:**  
Input: `words = ["never", "gonna", "give", "up"]`, `s = "nggu"`  
Output: `True`  
*Explanation: First letters: 'n', 'g', 'g', 'u' → "nggu", matches s.*

### Thought Process (as if you’re the interviewee)  
First, since we form the acronym by concatenating the first letter of each word, if the number of words is not equal to the length of `s`, we can immediately return `False`.

For the main solution:
- Iterate over each word and corresponding character in `s`.
- For each index, compare the first character of the iᵗʰ word with the iᵗʰ character of `s`.  
- If any do not match, return `False`.
- If all match, return `True`.

This approach is straightforward, runs in linear time, and avoids unnecessary string building.

Alternate brute-force approach:  
- Build a string by concatenating all the first characters.
- Compare the built string with `s`.
- Both approaches work, but the main solution allows for early exit on mismatch and avoids extra memory.

### Corner cases to consider  
- Empty `words` and empty `s`: should return `True`.
- `words` non-empty, but `s` is empty: should return `False`.
- `s` longer than `words` or vice versa.
- Words that are empty strings (may not appear in constraints, but good to check).
- Non-alphabetical first characters.
- Very large input.

### Solution

```python
def isAcronym(words, s):
    # If length mismatches, cannot be an acronym
    if len(words) != len(s):
        return False

    # Compare the first character of each word to the corresponding character in s
    for i in range(len(words)):
        if not words[i]:  # In case empty string occurs
            return False
        if words[i][0] != s[i]:
            return False

    # All characters match
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of words. We do a single pass comparing each word's first character to each character of `s`.
- **Space Complexity:** O(1), since we use only a constant amount of extra memory (no extra data structures beyond input).

### Potential follow-up questions (as if you’re the interviewer)  

- What if each word can be empty?  
  *Hint: How will you handle a situation where `word[i]` is ""?*

- How would you extend this if you want to check for a *case-insensitive* acronym?  
  *Hint: Compare using lowercased/uppercased versions of the characters.*

- What if `s` can contain wildcard characters that match any letter?  
  *Hint: How would you implement matching logic for wildcards?*

### Summary
This is a classic **character matching/iteration** pattern, where you check corresponding characters in two sequences.  
It's straightforward but commonly appears in interview warmups or as substeps in more complex parsing/string problems. The logic can be reused in similar string transformation, validation, or abbreviation tasks.


### Flashcard
Check length match first; then verify first character of each word equals corresponding character in s.

### Tags
Array(#array), String(#string)

### Similar Problems
- Word Abbreviation(word-abbreviation) (Hard)