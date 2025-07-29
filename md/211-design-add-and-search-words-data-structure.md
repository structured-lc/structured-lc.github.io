### Leetcode 211 (Medium): Design Add and Search Words Data Structure [Practice](https://leetcode.com/problems/design-add-and-search-words-data-structure)

### Description  
Design a data structure, `WordDictionary`, that supports adding new words and searching for a previously added word.  
- Words consist of lowercase English letters.
- The `search` function supports queries where each `.` character can match any single letter (wildcard).

**Implement these methods:**
- `addWord(word)`: Adds a word to the data structure.
- `search(word)`: Returns `True` if any stored word matches the query (dots can match any letter), or `False` otherwise.

Your design must efficiently handle insertions and wildcard searches.

### Examples  

**Example 1:**  
Input:  
`["WordDictionary","addWord","addWord","addWord","search","search","search","search"]`  
`[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]`  
Output:  
`[null,null,null,null,false,true,true,true]`  
*Explanation:*
- Add "bad", "dad", "mad".
- Search "pad" → `False` (not found).
- Search "bad" → `True` (exists).
- Search ".ad" → `True` ("bad", "dad", "mad" all match).
- Search "b.." → `True` ("bad" matches as b + any two chars).

**Example 2:**  
Input:  
`["WordDictionary","addWord","search"]`  
`[[],["a"],["."]]`  
Output:  
`[null,null,true]`  
*Explanation:*
- Add "a".
- Search "." → `True` ("a" matches one wildcard).

**Example 3:**  
Input:  
`["WordDictionary","addWord","search"]`  
`[[],["longword"],["........."]]`  
Output:  
`[null,null,true]`  
*Explanation:*
- Add "longword".
- Search "........." (nine dots) → `True` (all chars wildcards, length matches "longword").

### Thought Process (as if you’re the interviewee)  

I need a data structure that allows:
- Fast insertion of words.
- Fast searching; queries can contain wildcards (.), which can match any single character.

**Brute-force:**  
- Store all words in a Python list.  
- For `search(word)`:
  - For each stored word, check if the query matches (wildcards handled during check).
  - Inefficient: Each search O(N × L), where N = #stored words and L = word length.

**Optimized (Trie):**  
- Use a Trie (prefix tree) for all added words.
- For `addWord`, insert each char sequentially; O(L) time.
- For `search`:
  - Traverse Trie based on chars of the query.
  - If char is a letter: go to that child node.
  - If char is `.`: try all possible child nodes at this level recursively.
  - Efficient for most queries; recursion only branches at `.`.

**Trade-offs:**  
- Trie reduces unnecessary comparisons and quickly rules out non-matching prefixes.
- Wildcard (`.`) queries may still branch a lot, but in practice, this is much faster than brute-force.

### Corner cases to consider  
- Search for a word not added.
- Search when no words added at all.
- Words of different lengths; search query must match length.
- Search with all wildcards (e.g., "....").
- Add duplicate words.
- Words with only one character.
- Search with no wildcards (normal lookup).
- Search with more wildcards than any word length.

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}  # maps char to TrieNode
        self.is_end = False  # marks end of word

class WordDictionary:

    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word):
        return self._searchHelper(word, 0, self.root)

    def _searchHelper(self, word, idx, node):
        # Base case: if at end of word
        if idx == len(word):
            return node.is_end
        ch = word[idx]
        if ch == '.':
            # Try all possible children
            for child in node.children.values():
                if self._searchHelper(word, idx + 1, child):
                    return True
            return False
        else:
            if ch not in node.children:
                return False
            return self._searchHelper(word, idx + 1, node.children[ch])
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `addWord`: O(L), where L is word length (traverse/insert each letter).
  - `search`: O(26^K × L) in the worst case, where K is the number of dots in the query, and L is word length. In practice, typically much less unless lots of wildcards.
- **Space Complexity:**  
  - O(N × L) for N words of average length L (each unique prefix represents a node in Trie).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your code if you had to support deleting words from the data structure?  
  *Hint: Implement recursive Trie node deletion, unflagging word ends, and pruning dead branches.*

- What if queries had an unlimited number of wildcards, or wildcards representing 0 or more chars ("*")?  
  *Hint: Explore backtracking and dynamic programming within the Trie.*

- How might you optimize your solution for memory, given millions of words?  
  *Hint: Consider compressed tries (radix trees) or sharing nodes across words (DAWG).*

### Summary
This problem is a classic **Trie design** problem with backtracking to handle wildcard (dot) queries. The Trie enables quick lookups and pruning of non-matching paths, making searches efficient even with some wildcards. This pattern is widely applicable for autocomplete, prefix/suffix matching, regex engines, and dictionary-based problems.