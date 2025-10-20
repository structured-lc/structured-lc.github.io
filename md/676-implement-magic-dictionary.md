### Leetcode 676 (Medium): Implement Magic Dictionary [Practice](https://leetcode.com/problems/implement-magic-dictionary)

### Description  
Design a data structure called **MagicDictionary** that supports two primary methods:

- **buildDict(words):** Initialize the dictionary from a list of unique words.
- **search(word):** Given a string, determine if by *modifying exactly one character* in the given word, the result is a valid word in the dictionary. Only substitutions are allowed (no insertions or deletions)[4].

For example, if "hello" is in the dictionary, then searching for "hhllo" should return `True` (since you can change the second character 'h' to 'e'), but searching for "hello" itself should return `False` (since no characters change), and searching for "hell" or "helloo" should return `False` (lengths are different).

### Examples  

**Example 1:**  
Input:  
`buildDict(["hello", "leetcode"])`  
`search("hello")`  
Output:  
`False`  
*Explanation: The search word is identical to a dictionary word, so no character has been modified.*

**Example 2:**  
Input:  
`search("hhllo")`  
Output:  
`True`  
*Explanation: Changing the 2ⁿᵈ character from 'h' to 'e' gives "hello", which is in the dictionary.*

**Example 3:**  
Input:  
`search("hell")`  
Output:  
`False`  
*Explanation: No dictionary word of length 4, so cannot match by modifying one character.*

**Example 4:**  
Input:  
`search("leetcoded")`  
Output:  
`False`  
*Explanation: No dictionary word with matching length, so can't match with one modification[4].*

### Thought Process (as if you’re the interviewee)  

To solve this problem, we need to efficiently support two operations:
- Adding a list of words
- Checking if a word exists in the dictionary after *exactly* one character substitution

#### Brute-force:
- For every **search** query, for each word of the same length already in the dictionary, check character by character how many positions differ.
- If *exactly one* position differs for any word, return `True`.

Drawbacks: If dictionary is large and searched words are long, brute-force will be slow (O(N×L) per search, where N is dictionary size, L is word length).

#### Optimization:
- Store the dictionary as a set for O(1) lookup.
- For search(word), generate all possible strings by changing each character to any other letter ('a'-'z'), skipping if the character stays the same. Check if any modified string is in the dictionary set (excluding the original word).
- Alternatively, preprocess during dictionary build: for each word, for every position, replace it with '*' (or similar), and map wildcarded patterns to a count. For search, create all possible wildcarded versions and check if the pattern exists for another word[2][3].

**Trade-off:**  
- Pattern-based (wildcard) map is faster for searches, as we look up patterns quickly.  
- Space complexity increases as we store multiple versions of each word (with one wildcard).

### Corner cases to consider  
- Empty dictionary (buildDict called with [])
- All words in the dictionary are the same length
- Search word not in dictionary, but matches after one change
- Search for a word already in the dictionary (must return False)
- Input words with repeated characters
- Search word with only one character
- No match is possible due to length mismatch

### Solution

```python
class MagicDictionary:
    def __init__(self):
        # Maps wildcarded pattern to set of original words that fit that pattern
        self.patterns = dict()
        self.words = set()

    def buildDict(self, dictionary):
        self.words = set(dictionary)
        for word in dictionary:
            for i in range(len(word)):
                # Use * as the wildcard; replace iᵗʰ character with *
                pattern = word[:i] + '*' + word[i+1:]
                if pattern not in self.patterns:
                    self.patterns[pattern] = set()
                self.patterns[pattern].add(word)

    def search(self, word):
        for i in range(len(word)):
            # Replace iᵗʰ character with *
            pattern = word[:i] + '*' + word[i+1:]
            # Are there any words with this pattern (excluding original word)?
            for candidate in self.patterns.get(pattern, set()):
                # Only allow if word != candidate (i.e., at least one letter modified)
                if candidate != word:
                    return True
        return False
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `buildDict`: For each word of length L, insert L patterns. For N words, O(N×L).
  - `search`: For a search word of length L, generate L patterns, each with O(1) lookup and check – O(L) per search.
- **Space Complexity:**
  - O(N×L) for storing all word patterns and the original words.

### Potential follow-up questions (as if you’re the interviewer)  

- What if more than one character change is allowed?
  *Hint: How can your mapping generalize to k modifications? Consider using variations of edit distance or more generalized wildcarding.*

- How would your solution change if search queries have to support insert or delete (not just substitution)?
  *Hint: You might need to allow search patterns of length one more/less than original, or use Trie with edits.*

- How can you minimize space if dictionary is huge?
  *Hint: Consider using a Trie structure or compressing patterns to only what’s needed at query time.*

### Summary

This problem uses the **Dictionary with One Modification Pattern**, where all one-off wildcard patterns of each dictionary word are precomputed to optimize search. It highlights efficient pattern matching and preprocessing techniques, common in problems like spell-checkers and fuzzy string matching. This approach can be adapted for k-modifications, edit distance, and approximate string matching challenges.


### Flashcard
Store wildcarded patterns for each word; for search, check if any pattern matches a dictionary word differing by exactly one character.

### Tags
Hash Table(#hash-table), String(#string), Depth-First Search(#depth-first-search), Design(#design), Trie(#trie)

### Similar Problems
- Implement Trie (Prefix Tree)(implement-trie-prefix-tree) (Medium)
- Longest Word in Dictionary(longest-word-in-dictionary) (Medium)