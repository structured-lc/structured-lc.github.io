### Leetcode 648 (Medium): Replace Words [Practice](https://leetcode.com/problems/replace-words)

### Description  
Given a list of **root words** (dictionary) and a sentence, replace every word in the sentence with the shortest root from the dictionary that is a prefix of it. If a word in the sentence does not have any such root, leave it unchanged. Return the modified sentence.

### Examples  

**Example 1:**  
Input: `dictionary = ["cat","bat","rat"]`, `sentence = "the cattle was rattled by the battery"`  
Output: `"the cat was rat by the bat"`  
*Explanation: "cattle" → "cat" (prefixed by "cat"), "rattled" → "rat" ("rat"), "battery" → "bat" ("bat"). Other words have no root and remain unchanged.*

**Example 2:**  
Input: `dictionary = ["a","b","c"]`, `sentence = "aadsfasf absbs bbab cadsfafs"`  
Output: `"a a b c"`  
*Explanation: Each word starts with a root ("a", "b", "c"), so every word is replaced with its shortest possible root.*

**Example 3:**  
Input: `dictionary = ["abc","abcd"]`, `sentence = "abc abcd abcdx"`  
Output: `"abc abcd abc"`  
*Explanation: "abc" has root "abc"; "abcd" has root "abcd"; "abcdx" has prefixes "abc" and "abcd", but "abc" is shorter, so use "abc".*

### Thought Process (as if you’re the interviewee)  
Start by thinking about how to check if a word in the sentence has any prefix in a set of root words:
- **Brute force:** For each word in the sentence, loop through all words in the dictionary and check if the word starts with that root. This would be very slow — for every word, O(len(dictionary)) checks each potentially O(len(word)) long — so the time is O(m × n × L), where m is number of words in the sentence, n is dictionary size, L is the max length.
- **Using a HashSet:** To improve speed, put all roots in a set; then for each word in the sentence, check each prefix from length 1 to word-length, and as soon as you find a match, use it. This is much better than the brute force.
- **Trie Optimization (Best):** Building a Trie from all roots gives even better speed. While scanning each word, we traverse the Trie letter by letter, and at the first stop where a node marks end of a root, we use that prefix.
  - As soon as we find the shortest possible root, we can stop checking longer prefixes.
  - Trie reduces time per word to O(L), much better for large dictionaries.

I’d choose the Trie approach for optimal efficiency and clarity.

### Corner cases to consider  
- No roots match any word in the sentence (should return sentence unchanged).
- Dictionary or sentence is empty.
- Multiple roots can be prefixes — always use the shortest.
- Roots that are themselves full words in the sentence.
- Words much shorter than any roots.
- Duplicate roots in the dictionary.
- Sentence with extra spaces, punctuation, or empty strings.

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_root = False  # Marks end of root word

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_root = True  # Mark the end of a root word
    
    def get_shortest_root(self, word):
        curr = self.root
        prefix = ""
        for char in word:
            if char not in curr.children:
                return None
            curr = curr.children[char]
            prefix += char
            if curr.is_root:
                return prefix  # Return as soon as a root is found (guaranteed shortest)
        return None

def replaceWords(dictionary, sentence):
    trie = Trie()
    # Insert all roots into the Trie
    for root in dictionary:
        trie.insert(root)
    
    res = []
    # Process each word in the sentence
    for word in sentence.split():
        root = trie.get_shortest_root(word)
        if root:
            res.append(root)
        else:
            res.append(word)
    return " ".join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Building the Trie: O(sum(len(root)) for all roots).
  - For each word in sentence: O(len(word)) to scan for shortest root.
  - Total: O(D + S), where D is sum of lengths of all dictionary roots, and S is sum of word lengths in the sentence.

- **Space Complexity:**  
  - Trie storage: up to O(D) for all letters in dictionary.
  - Output space: O(S) for the output sentence.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the roots are dynamic and frequently inserted/deleted?
  *Hint: Consider augmenting the Trie with deletion flags or alternative data structures depending on the operation frequency.*

- How would you handle punctuation or non-alphabetic characters in the sentence?
  *Hint: Carefully tokenize or pre-process, or update Trie traversal to skip these characters.*

- How to speed it up for billions of queries on a static, huge root dictionary?
  *Hint: Optimize Trie further (bit-packed, minimized Trie), or precompute common prefixes.*

### Summary

This problem is a classic example of *string prefix matching*, efficiently solved with the **Trie pattern**. The approach is especially suitable for text normalization and stemming problems. Trie is a frequently used data structure whenever there are prefix/grouping queries on strings — other use cases include word search, autocomplete, and implementing dictionaries for compilers.