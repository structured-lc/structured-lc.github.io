### Leetcode 290 (Easy): Word Pattern [Practice](https://leetcode.com/problems/word-pattern)

### Description  
Given a **pattern string** (only lowercase letters) and a string `s` of words separated by spaces, determine if `s` follows the same pattern.  
Each character in `pattern` must map to exactly one word in `s`, and vice versa:  
- No two characters map to the same word.  
- No two words map to the same character.  
If the mapping is consistent for the entire string, return `True`; otherwise, return `False`.

### Examples  

**Example 1:**  
Input: `pattern = "abba", s = "dog cat cat dog"`  
Output: `True`  
*Explanation: 'a' → "dog", 'b' → "cat". Mapping matches throughout both strings.*

**Example 2:**  
Input: `pattern = "abba", s = "dog cat cat fish"`  
Output: `False`  
*Explanation: 'a' should map only to "dog", but the final word "fish" breaks the pattern by mapping 'a' to a new word.*

**Example 3:**  
Input: `pattern = "aaaa", s = "dog cat cat dog"`  
Output: `False`  
*Explanation: All characters in pattern are 'a', so all words should be the same, but words differ.*

### Thought Process (as if you’re the interviewee)  

The core of the problem is matching characters in `pattern` to words in `s` with a **one-to-one mapping** (bijection).

- **Brute-force:**  
  Check all permutations, but this would be extremely inefficient, especially since we have straightforward order to exploit.

- **Optimal approach:**  
  Use **two hash maps**:
  - The first maps each character → its associated word.
  - The second maps each word → its associated character.

  Step-by-step:
  - Split `s` into words.
  - If the number of pattern characters ≠ number of words, return `False` immediately.
  - Iterate over both arrays in parallel.  
    - If a character is mapped to another word (not the current word), return `False`.
    - If a word is mapped to another character (not the current character), return `False`.
    - Otherwise, record the mapping in both directions.

  This guarantees **bijective (one-to-one) mapping**.

### Corner cases to consider  
- Empty string for `pattern` or `s`.
- Number of characters in `pattern` ≠ number of words in `s`.
- Single character in `pattern`, repeated or not.
- Repeated words with different corresponding characters.
- Case where the same word has to be mapped to two different characters (invalid).

### Solution

```python
def wordPattern(pattern, s):
    # Split s into a list of words
    words = s.split()
    
    # Early check: Patterns and words must be of equal length
    if len(pattern) != len(words):
        return False
    
    # Hash maps for character-to-word and word-to-character
    char_to_word = {}
    word_to_char = {}
    
    # Iterate over both pattern and words synchronously
    for c, w in zip(pattern, words):
        # Check char → word mapping
        if c in char_to_word:
            if char_to_word[c] != w:
                return False
        else:
            char_to_word[c] = w
        
        # Check word → char mapping
        if w in word_to_char:
            if word_to_char[w] != c:
                return False
        else:
            word_to_char[w] = c

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - n = number of characters in `pattern` (or words in `s`).  
  - Each character/word is visited once, hash map operations are O(1).

- **Space Complexity:** O(n)  
  - Space needed for two hash maps with up to n entries each (worst case: all characters/words unique).

### Potential follow-up questions (as if you’re the interviewer)  

- Extend to allow wildcards in the pattern (e.g., `.` can match any word).  
  *Hint: How would the mapping rule change if some pattern characters were wildcards?*

- What if words can be separated by multiple spaces or punctuation?  
  *Hint: How would you handle custom splitting and normalization?*

- Could you solve this "pattern to string" checking for patterns in a list of words, not just for a space-separated string?  
  *Hint: What if input is given as a list already? Can you reuse your logic?*

### Summary
This question is a classic **bijection/hash map** problem, vital for mastering **mapping patterns** in strings and arrays—very common in interviews when checking for unique correspondences. Variations of this appear in problems about isomorphic strings, anagrams, or unique transformations. The double-hashmap pattern is frequently reusable in such scenarios.


### Flashcard
Use two hashmaps (char→word and word→char) to enforce bijection; split s into words and check both mappings match at each position.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
- Isomorphic Strings(isomorphic-strings) (Easy)
- Word Pattern II(word-pattern-ii) (Medium)
- Find and Replace Pattern(find-and-replace-pattern) (Medium)