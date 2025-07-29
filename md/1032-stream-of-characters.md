### Leetcode 1032 (Hard): Stream of Characters [Practice](https://leetcode.com/problems/stream-of-characters)

### Description  
Design an algorithm/class that **receives a continuous stream of characters**, one at a time, and for each character added, tells whether **any suffix of the running stream matches one of a given list of words**.   
- On initialization, you're given an array of words.
- For every new character appended to the stream, you need to support a query operation that returns `True` if **any suffix** of the current stream equals any of the words, otherwise `False`.

### Examples  

**Example 1:**  
Input: `words = ["cd", "f", "kl"], queries = ['a','b','c','d','e','f','k','l']`  
Output:  
```
[False, False, False, True, False, True, False, True]
```
Explanation.  
- After 'a' → False (no suffix "a" in words)  
- After 'a','b' → False  
- After 'a','b','c' → False  
- After 'a','b','c','d' → True ("cd" is a suffix)  
- After next letter, check for suffixes... and so on.

**Example 2:**  
Input: `words = ["hello"]`, queries = ['h','e','l','l','o','x']  
Output:  
```
[False, False, False, False, True, False]
```
Explanation.  
- "hello" matches only after fifth letter.

**Example 3:**  
Input: `words = ["leet","code"], queries = ['l','e','e','t','c','o','d','e']`  
Output:  
```
[False, False, False, True, False, False, False, True]
```
Explanation.  
- After 'l','e','e','t' → "leet" matches  
- After 'c','o','d','e' → "code" matches

### Thought Process (as if you’re the interviewee)  
First, a naive brute-force approach is to, on each query, check all possible suffixes of the stream against the word list. This is too slow, as each query would take O(N·L) time where N is stream length and L is the max word length.

A better way is to check, for every query, whether any of the recent suffixes matches a word efficiently.  
Since we're interested only in **suffixes that could match given words**, and the list of words is known up front, we can use a **Trie (prefix tree)**.  
But we need to match suffixes of the stream, so we build a **Trie of reversed words**, and as the stream comes in, we keep a buffer and query the Trie backwards from the latest character.

At each query, we:
- Append the new char to the buffer.
- Traverse up to the length of the longest word (for memory/time efficiency), following chars in reverse through the Trie.
- If during traversal we hit a node marked as a word, we return True.

This gives very fast query times, because each query is O(L), where L is the max word length.

### Corner cases to consider  
- words contains the same string multiple times
- stream contains repeated or unrelated characters
- some words are prefixes of others (e.g., "a", "ab", "abc")
- empty words list (must always return False)
- querying with non-lowercase or empty character (inputs guarantee lowercase single char)
- very long stream—ensure buffer doesn’t grow without bound (only store ⌊max_word_length⌋ latest chars)

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class StreamChecker:
    def __init__(self, words):
        self.root = TrieNode()
        self.maxlen = 0  # Store max word length
        for word in words:
            self._insert(word[::-1])  # Insert word reversed
            self.maxlen = max(self.maxlen, len(word))
        self.stream = []

    def _insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_word = True

    def query(self, letter):
        self.stream.append(letter)
        # Only need at most maxlen last letters
        n = len(self.stream)
        node = self.root
        for i in range(1, min(self.maxlen, n) + 1):
            c = self.stream[-i]
            if c not in node.children:
                return False
            node = node.children[c]
            if node.is_word:
                return True
        return False
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `__init__`: O(sum of lengths of all words), for building Trie.
  - `query`: O(L), L = max word length, since we check up to L chars per query.
- **Space Complexity:**  
  - Trie: O(sum(\|word\|)), for all characters in all words.
  - Buffer: O(L), only keep last L characters from stream.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle Unicode or case-insensitive words?  
  *Hint: Generalize Trie to use full Unicode or lowercase mapping.*

- What would you do if the words list could change dynamically (insert/delete)?  
  *Hint: Support add/remove in Trie, handle reference counting.*

- Can this be parallelized, or work efficiently for a very high QPS scenario?  
  *Hint: Look for immutable/persistent trie patterns or lockless designs.*

### Summary
This problem uses the **reversed Trie** technique for streaming suffix lookups, a common trick where prefix structures are leveraged in reverse for fast suffix search. This pattern (buffering recent N elements and using Trie or automaton) is a classic for text-searching and online matching scenarios, and variants appear in problems like Aho-Corasick, spell check/autocomplete, and dynamic regex engines.