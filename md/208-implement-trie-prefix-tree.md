### Leetcode 208 (Medium): Implement Trie (Prefix Tree) [Practice](https://leetcode.com/problems/implement-trie-prefix-tree)

### Description  
Implement a **Trie** (also called a *Prefix Tree*), a data structure for storing strings efficiently and allowing for quick prefix-based queries. The Trie class must support:
- `insert(word)`, which adds a word to the trie,
- `search(word)`, which returns `True` if the full word is in the trie,
- `startsWith(prefix)`, which returns `True` if any word in the trie starts with the given prefix.  
Each character in a word corresponds to a child node in the trie. The main idea is to create a path in the trie for each word, marking nodes that represent the end of valid words.

### Examples  

**Example 1:**  
Input:   
```python
trie = Trie()
trie.insert("apple")
trie.search("apple")      # returns True
trie.search("app")        # returns False
trie.startsWith("app")    # returns True
trie.insert("app")
trie.search("app")        # returns True
```
Output:  
`True`,  
`False`,  
`True`,  
`True`  
*Explanation: "apple" is inserted, so searching for "apple" returns True. "app" isn't a word yet, so search returns False, but since "apple" starts with "app", startsWith returns True. After inserting "app", search for "app" is now True.*

**Example 2:**  
Input:   
```python
trie = Trie()
trie.insert("cat")
trie.insert("cater")
trie.search("cat")        # returns True
trie.startsWith("cate")   # returns True
trie.search("catering")   # returns False
```
Output:  
`True`,  
`True`,  
`False`  
*Explanation: Both "cat" and "cater" are inserted. "cate" is a prefix, so startsWith is True, but "catering" wasn't inserted, so search is False.*

**Example 3:**  
Input:   
```python
trie = Trie()
trie.search("nothing")     # returns False
trie.startsWith("no")      # returns False
```
Output:  
`False`,  
`False`  
*Explanation: Trie is empty, so search and prefix queries both return False.*

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force approach: store words in a list or set, then for `search` and `startsWith`, scan or use string matching.  
- **Downside:** Inefficient for prefix searches, as every prefix query may require scanning every word.

A **trie** overcomes this by:
- Using a tree structure: each node represents a single character.
- For each word, create/follow a path from the root node, adding new children as needed.
- Mark nodes that finish a valid word (`is_end` flag).
- For `insert`, walk/add nodes by each character.
- For `search`, walk nodes and check if we reach an `is_end`.
- For `startsWith`, walk nodes and check if path for prefix exists, return `True` if so.

**Trade-offs:**  
- Space-heavy if there are many long or unique words with little overlap, but
- Time per operation is proportional to the length of the word/prefix, not to the number of stored words.

### Corner cases to consider  
- Empty string insert or search.
- Words that are prefixes of others (e.g. "app", "apple").
- Multiple words with common prefixes.
- Searching for a word or prefix not in the trie.
- Very long words or deep tries.
- Repeated insertions.

### Solution

```python
class TrieNode:
    def __init__(self):
        # Children is a dictionary mapping char -> TrieNode
        self.children = {}
        self.is_end = False  # True if this node terminates a word

class Trie:
    def __init__(self):
        # Root node does not contain any character itself
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True  # Mark the end of a word

    def search(self, word: str) -> bool:
        node = self.root
        for c in word:
            if c not in node.children:
                return False
            node = node.children[c]
        return node.is_end  # True if ends at a valid word

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for c in prefix:
            if c not in node.children:
                return False
            node = node.children[c]
        return True  # Path exists for prefix
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `insert(word)`: O(len(word)), process each character once.
  - `search(word)`: O(len(word)), check each character.
  - `startsWith(prefix)`: O(len(prefix)), same as above.

- **Space Complexity:**
  - O(Σ |wordsᵢ|), where Σ is the total number of characters in all inserted words (since each new character needs a node) and minimal extra per node for dict/flag.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the trie to support deletion of words?
  *Hint: Carefully handle removing nodes and cleaning up nodes that are no longer needed, avoiding orphaned branches.*

- How can you optimize the trie for memory when storing only lowercase a-z?
  *Hint: Use an array/list of size 26 for children instead of a dict.*

- How could you store and return all words sharing a given prefix?
  *Hint: Traverse to the prefix node, then perform DFS or BFS to collect all descendant words.*

### Summary
This is the classic **Trie** (Prefix Tree) design pattern, enabling quick word and prefix lookups in O(L) time where L = length of input string, at the cost of increased memory usage. This pattern is fundamental for problems involving dictionary, autocomplete, and spellchecking functionalities, and is a standard approach in many string algorithm questions.