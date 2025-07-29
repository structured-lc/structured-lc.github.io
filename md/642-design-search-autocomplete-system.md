### Leetcode 642 (Hard): Design Search Autocomplete System [Practice](https://leetcode.com/problems/design-search-autocomplete-system)

### Description  
You need to **design an autocomplete system** to suggest up to three sentences to the user as they type. The system is initialized with a set of sentences and their corresponding historical frequencies (how many times each was entered before).  
- Every time the user types a character (except `'#'`), the system suggests up to three historical sentences that match the current input prefix.
- Suggestions are **ranked by frequency** (higher first), then **lexicographically** (alphabetical) if there's a tie.
- If the user types the special character `'#'`, it signals the completion of a sentence. The system must update its records accordingly and reset the current input for the next search.

### Examples  

**Example 1:**  
Input:  
AutocompleteSystem(["i love you", "island", "ironman", "i love leetcode"], [5,3,2,2])  
input('i')  
Output: `["i love you", "island", "i love leetcode"]`  
*Explanation: Four sentences match prefix 'i'. "i love you" has highest frequency, then "island" (3 times), then both "ironman" and "i love leetcode" have 2 times, but "i love leetcode" comes first because it is lexicographically smaller. Only the top 3 are returned.*

**Example 2:**  
Input:  
input(' ')  
Output: `["i love you", "i love leetcode"]`  
*Explanation: The current prefix is now "i ". Both matches are returned, ordered by frequency.*

**Example 3:**  
Input:  
input('a')  
Output: `[]`  
*Explanation: No historical sentence starts with prefix "i a".*

input('#')  
Output: `[]`  
*Explanation: The sentence "i a" is complete and added to the system's history for future searches.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Store all sentences and their frequencies in a hashmap.
  - Every time a new character is typed, iterate through every sentence and check if it starts with the current prefix.  
  - Sort matches by frequency then lexicographically, return top 3.
  - This is inefficient as the dataset grows.

- **Optimized Approach:**  
  - Use a **Trie** to store sentences. Each Trie node keeps a reference to sentences passing through it.
  - Efficiently traverse down the tree as the user types, quickly finding all prefixes.
  - For each input, descend to the node matching the current prefix, collect all sentences below via DFS or maintaining a top-3 heap at each node.
  - Update frequencies and insert new sentences on `'#'`: insert into both Trie and hashmap.
  - **Heaps/Priority Queues:** To keep suggestions at each step sorted by frequency and lex order efficiently.
  - **Tradeoffs:** More memory use, but makes suggestions fast (O(prefix\_length + log n) for insert/search).

### Corner cases to consider  
- User types a sentence that was never seen before.
- Two or more sentences have the exact same frequency and prefix.
- User continually enters only the special character `'#'`.
- User types a prefix that matches no sentence: return empty list.
- Empty initialization.
- Sentences containing spaces or non-alphabetic characters.
- Updating the frequency on repeated completions of the same sentence.

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.sentences = set()  # Track sentences passing through this node

class AutocompleteSystem:
    def __init__(self, sentences, times):
        # Map sentence -> frequency
        self.freq = {}
        for i, s in enumerate(sentences):
            self.freq[s] = times[i]
        # Build the trie
        self.root = TrieNode()
        for s in sentences:
            self._insert(s)
        self.curr = self.root  # Current trie node as we type
        self.input_str = ""    # Current prefix

    def _insert(self, sentence):
        node = self.root
        for ch in sentence:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
            node.sentences.add(sentence)

    def input(self, c):
        if c == '#':
            self.freq[self.input_str] = self.freq.get(self.input_str,0) + 1
            self._insert(self.input_str)
            # reset for new typing
            self.input_str = ""
            self.curr = self.root
            return []
        self.input_str += c
        if not self.curr or c not in self.curr.children:
            self.curr = None
            return []
        self.curr = self.curr.children[c]
        # Gather all candidate sentences for this prefix
        candidates = list(self.curr.sentences)
        # Sort by frequency desc, then lex
        candidates.sort(key=lambda s: (-self.freq[s], s))
        return candidates[:3]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each input (except `'#'`) takes O(L + S log S), where L is the prefix length (trie traversal), S is the number of sentences matching the prefix (for sorting the suggestions).
  - Insert/update per sentence: O(L), where L is the sentence length.

- **Space Complexity:**  
  - O(N × L), where N is the number of unique sentences, L is the max sentence length (each trie node can track all sentences passing through).
  - Storing sentence frequencies: O(N).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large datasets (millions of sentences)?
  *Hint: Consider limiting sentence storage per node, or using disk-backed data structures, or sharding the trie.*

- What if we want to suggest more than three (top-k) sentences?
  *Hint: Replace fixed size with min-heap or allow returning k suggestions.*

- How to support more complex queries (wildcards, typo tolerance)?
  *Hint: Extend trie to a DAWG (Directed Acyclic Word Graph) or use Levenshtein distance algorithms.*

### Summary
This solution uses a classic **Trie** augmented with sets/heaps and a hashmap for frequency counting—a pattern common in autocomplete, prefix search, and word suggestion engine problems. The patterns used here apply broadly to other string matching applications such as spell-check, search engines, and command line suggestions.