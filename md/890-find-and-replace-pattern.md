### Leetcode 890 (Medium): Find and Replace Pattern [Practice](https://leetcode.com/problems/find-and-replace-pattern)

### Description  
Given a list of words and a string pattern, return all words that match the pattern.  
A word matches the pattern if there exists a one-to-one mapping (bijection) between each unique letter in the pattern and each unique letter in the word, and replacing the letters in the pattern with their mapping results in the word. The order of the matched words does not matter.

**In other words:**  
Check if you can consistently replace each unique character in the pattern with a unique character from the word to get the word.

### Examples  

**Example 1:**  
Input: `words = ["abc","deq","mee","aqq","dkd","ccc"], pattern = "abb"`  
Output: `["mee","aqq"]`  
*Explanation: "mee" → "abb" by mapping m→a, e→b and "aqq" → "abb" by mapping a→a, q→b. For "abc" or "deq" each letter is unique, but the pattern repeats the last character, so they do not match.*

**Example 2:**  
Input: `words = ["a","b","c"], pattern = "a"`  
Output: `["a","b","c"]`  
*Explanation: Any single-character word will match the single-character pattern.*

**Example 3:**  
Input: `words = ["aa","ab","cc"], pattern = "bb"`  
Output: `["aa","cc"]`  
*Explanation: "aa" → "bb" by mapping a→b; "cc" → "bb" by mapping c→b. "ab" cannot match since the characters differ at the second place, but the pattern repeats.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force Idea:**  
  For each word, try to check all possible mappings between pattern and word. Each unique letter in pattern must consistently correspond to a unique letter in word (bijection). This is expensive if implemented via generating all mappings.

- **Optimized Approach:**  
  Instead of finding all possible mappings, for each word, we check if a consistent mapping exists as we sweep through the word and pattern simultaneously.
  - Use two mappings:
    - patternToWord: Maps each char in pattern to corresponding char in word.
    - wordToPattern: Maps each char in word to corresponding char in pattern.
  - As we iterate, we:
    - For each index, if mapping is seen before, verify it matches.
    - If mapping is new, create it.
    - If a char was mapped inconsistently, break.
  - If both mappings hold throughout, the word matches the pattern.

- **Why final approach:**  
  The double-mapping (bijection) ensures we don’t end up mapping two different pattern characters to the same word character or vice versa, which would be incorrect in this problem.

### Corner cases to consider  
- pattern and word lengths mismatch (problem guarantees equal length, but always check in implementation)
- repeated letters mapping to non-repeated, or vice versa
- single character pattern (all single character words match)
- all characters in pattern are unique, words with duplicate characters
- words that are substrings or superstrings (shouldn't match if lengths differ)

### Solution

```python
# Check all words to see if there is a consistent bijection between pattern and word.

def findAndReplacePattern(words, pattern):
    def matches(word, pattern):
        # Both directions mapping to check bijection
        p2w, w2p = {}, {}
        for c1, c2 in zip(pattern, word):
            # If mapping exists, check for consistency
            if c1 in p2w:
                if p2w[c1] != c2:
                    return False
            else:
                p2w[c1] = c2
            if c2 in w2p:
                if w2p[c2] != c1:
                    return False
            else:
                w2p[c2] = c1
        return True

    result = []
    for word in words:
        if matches(word, pattern):
            result.append(word)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × m)  
  n = number of words, m = length of pattern (and each word, as guaranteed).  
  Checking each word is linear in m due to simple map checks.

- **Space Complexity:**  
  O(m) per word for the maps (pattern-to-word and word-to-pattern), plus O(n) for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle patterns and words of differing lengths?  
  *Hint: Pre-check with len(word) == len(pattern) before performing mapping logic.*

- Can your approach deal with Unicode or non-lowercase characters?  
  *Hint: Ensure your mapping allows any hashable character.*

- How might you optimize for extremely large input sizes or very long words?  
  *Hint: Consider early termination and pre-compute pattern signatures.*

### Summary
This approach uses the *bijection mapping* pattern—ensuring a 1-1 correspondence between two sequences.  
This is a common requirement in problems involving isomorphism, like checking if two strings are isomorphic, or reconstructing mappings in substitution ciphers.  
The pattern can be reused in problems that require unique correspondence between elements of two collections.


### Flashcard
For each word, check if a bijective mapping exists between pattern and word by tracking forward and reverse mappings as you iterate.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
- Isomorphic Strings(isomorphic-strings) (Easy)
- Word Pattern(word-pattern) (Easy)