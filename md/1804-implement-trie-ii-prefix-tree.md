### Leetcode 1804 (Medium): Implement Trie II (Prefix Tree) [Practice](https://leetcode.com/problems/implement-trie-ii-prefix-tree)

### Description  
Implement a prefix tree (Trie) data structure that supports the following operations efficiently:
- **insert(word)**: Add `word` to the Trie.
- **countWordsEqualTo(word)**: Return the number of times `word` has been inserted.
- **countWordsStartingWith(prefix)**: Return the number of stored words that start with `prefix`.
- **erase(word)**: Remove one occurrence of `word` from the Trie (guaranteed the word exists).

You must be able to insert, count, and erase strings (composed of lowercase letters a-z) while efficiently tracking counts for both entire words and prefixes.

### Examples  

**Example 1:**  
Input:  
```
["Trie","insert","insert","countWordsEqualTo","countWordsStartingWith","erase","countWordsEqualTo","countWordsStartingWith"]
[[],["apple"],["apple"],["apple"],["app"],["apple"],["apple"],["app"]]
```
Output:  
```
[null,null,null,2,2,null,1,1]
```
Explanation:  
Insert "apple" twice.  
countWordsEqualTo("apple") returns 2.  
countWordsStartingWith("app") returns 2 ("apple" and "apple").  
erase("apple") removes one occurrence.  
countWordsEqualTo("apple") returns 1 (one left).  
countWordsStartingWith("app") returns 1 ("apple").

**Example 2:**  
Input:  
```
["Trie","insert","insert","insert","countWordsEqualTo","countWordsEqualTo","countWordsStartingWith","erase","countWordsEqualTo","countWordsStartingWith"]
[[],["apple"],["app"],["apple"],["apple"],["app"],["app"],["apple"],["apple"],["app"]]
```
Output:  
```
[null,null,null,null,2,1,3,null,1,2]
```
Explanation:  
Insert "apple", "app", and "apple".  
"apple" inserted twice, so countWordsEqualTo("apple") is 2.  
"app" inserted once, so countWordsEqualTo("app") is 1.  
countWordsStartingWith("app") is 3 (two "apple", one "app").  
erase("apple") removes one "apple", leaving one "apple" and one "app".

**Example 3:**  
Input:  
```
["Trie","insert","insert","insert","erase","erase","countWordsEqualTo","countWordsStartingWith"]
[[],["banana"],["banana"],["band"],["banana"],["band"],["band"],["ba"]]
```
Output:  
```
[null,null,null,null,null,null,0,1]
```
Explanation:  
Insert "banana" twice and "band" once.  
Erase "banana" once, then erase "band".  
After erasing "band", countWordsEqualTo("band") is 0.  
countWordsStartingWith("ba") is 1 ("banana" remains).

### Thought Process (as if you’re the interviewee)  
- A brute-force approach would use a dictionary/hashmap to count occurrences for each word and prefix, but that would be inefficient for memory and not optimal for prefix-based queries.
- A trie (prefix tree) efficiently supports prefix-based operations by representing words in shared prefix structures.
- Each Trie node will have:
  - An array/dictionary (size 26) for children (a–z).
  - An integer `end_count` (how many words end here).
  - An integer `prefix_count` (how many words pass through here).
- For **insert**, traverse from root, for each character create child if not exists, increment `prefix_count` at each node, increment `end_count` at the end.
- For **countWordsEqualTo**, traverse along the word, return `end_count` if word ends, else 0.
- For **countWordsStartingWith**, follow prefix, return `prefix_count` at last character node.
- For **erase**, traverse to word, decrement `prefix_count` at each node and `end_count` at the end.

**Why this approach works:**  
- Efficient prefix and word-count operations, as all are proportional to the word's length.
- Clean deletion and count management, as prefix and end counts mirror the actual number of inserts/erases.

### Corner cases to consider  
- Inserting duplicate words.
- Erasing words until count reaches zero.
- Querying for non-inserted words or prefixes.
- Empty strings (should not occur by constraints, but still worth noting).
- Large number of prefix overlaps (e.g., "app", "apple", "apples", etc.).

### Solution

```python
class TrieNode:
    def __init__(self):
        # Children: 26 slots, one for each lowercase a-z
        self.children = [None] * 26
        # How many times a word ends at this node
        self.end_count = 0
        # How many words pass through or end at this node (prefix count)
        self.prefix_count = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def _char_to_index(self, ch):
        # helper to map char to index 0-25
        return ord(ch) - ord('a')
    
    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            idx = self._char_to_index(ch)
            if not node.children[idx]:
                node.children[idx] = TrieNode()
            node = node.children[idx]
            node.prefix_count += 1
        node.end_count += 1
    
    def countWordsEqualTo(self, word: str) -> int:
        node = self.root
        for ch in word:
            idx = self._char_to_index(ch)
            if not node.children[idx]:
                return 0
            node = node.children[idx]
        return node.end_count
    
    def countWordsStartingWith(self, prefix: str) -> int:
        node = self.root
        for ch in prefix:
            idx = self._char_to_index(ch)
            if not node.children[idx]:
                return 0
            node = node.children[idx]
        return node.prefix_count
    
    def erase(self, word: str) -> None:
        node = self.root
        stack = []
        for ch in word:
            idx = self._char_to_index(ch)
            stack.append((node, idx))
            node = node.children[idx]
        node.end_count -= 1
        # Decrement prefix_count for all nodes along word
        for parent, idx in stack:
            parent.children[idx].prefix_count -= 1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Each operation (insert, countWordsEqualTo, countWordsStartingWith, erase) requires traversing the word/prefix character by character.  
  - Each operation: O(L), where L is the word or prefix length.

- **Space Complexity:**  
  - Worst-case: O(N × L) for N unique words of average length L (one node per character).
  - Each TrieNode has an array of 26 child pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- Support Unicode or upper-case characters?  
  *Hint: What changes if the character set is larger? (Use dictionary instead of array for children)*

- How would you return all words with a given prefix?  
  *Hint: Traverse to prefix node, then collect all words via DFS from there.*

- How to optimize space if the trie becomes too large with sparse nodes?  
  *Hint: Substitute the 26-element array with a hash/dictionary for children.*

### Summary
This problem is a classic application of the Trie (prefix tree) data structure, which is highly effective for prefix and whole-word counting operations and enables fast insert/search/delete for strings. This structure is widely used in autocomplete, word dictionaries, and search engines. The pattern of maintaining per-node prefix and end counters is also applicable to other variants like pattern-matching tries.


### Flashcard
Trie node stores end_count (words ending here) and prefix_count (words passing through); update both counts on insert/erase for O(L) operations.

### Tags
Hash Table(#hash-table), String(#string), Design(#design), Trie(#trie)

### Similar Problems
- Implement Trie (Prefix Tree)(implement-trie-prefix-tree) (Medium)
- Encrypt and Decrypt Strings(encrypt-and-decrypt-strings) (Hard)