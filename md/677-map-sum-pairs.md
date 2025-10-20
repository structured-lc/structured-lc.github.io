### Leetcode 677 (Medium): Map Sum Pairs [Practice](https://leetcode.com/problems/map-sum-pairs)

### Description  
Given a collection of words with their integer values, design a data structure that supports two operations:

- **insert(key, val)**: Inserts the key-value pair into the structure. If the key already exists, update its value.
- **sum(prefix)**: Returns the sum of all values whose keys start with the given prefix.

For example, after `insert("apple", 3)` and `insert("app", 2)`, `sum("ap")` should return 5.

### Examples  

**Example 1:**  
Input:  
`insert("apple", 3)`  
`sum("ap")`  
Output:  
`3`  
*Explanation: Only "apple" matches the prefix "ap", so sum is 3.*

**Example 2:**  
Input:  
`insert("apple", 3)`  
`insert("app", 2)`  
`sum("ap")`  
Output:  
`5`  
*Explanation: Both "apple" and "app" match "ap"; their values (3 + 2) sum to 5.*

**Example 3:**  
Input:  
`insert("apple", 3)`  
`insert("apple", 2)`  
`sum("apple")`  
Output:  
`2`  
*Explanation: Second insert updates "apple" to 2. So sum("apple") returns 2.*

### Thought Process (as if you’re the interviewee)  

First, a brute-force idea is to keep a hash map of key-value pairs. For `sum(prefix)`, iterate over all keys and sum those that start with the prefix. This is inefficient for large datasets.

A better approach is to use a **Trie (prefix tree)**, where each node represents a prefix. Each node can store the cumulative sum of all values whose keys pass through this node. When inserting, if the key already exists, adjust the sum by the difference between the new and old value. For sum, traverse the Trie based on the prefix and return the sum stored at the node.

Using a Trie provides efficient prefix-based lookups and updates.

### Corner cases to consider  
- Inserting the same key multiple times with different values (handle updates correctly — cumulative sums should not keep adding up).
- Summing for a prefix that does not exist (should return 0).
- Edge case: empty string as a key or prefix (input guarantee?).
- Inserting multiple keys with overlapping prefixes.
- Large number of operations (need efficient Trie, not brute-force search).

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.sum = 0  # sum of all mapped values under this prefix

class MapSum:
    def __init__(self):
        # Store actual key->val mapping to handle updates
        self.map = {}
        self.root = TrieNode()

    def insert(self, key: str, val: int) -> None:
        # Find how much the value is changing (0 if new key)
        delta = val - self.map.get(key, 0)
        self.map[key] = val

        node = self.root
        node.sum += delta
        for char in key:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.sum += delta

    def sum(self, prefix: str) -> int:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return 0
            node = node.children[char]
        return node.sum
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `insert`: O(k), where k is the length of the key string — traverse each character in the key.
  - `sum`: O(p), where p is the length of the prefix.
- **Space Complexity:**  
  - O(N × k), where N is the number of unique keys and k is the average length of keys.  
    Each TrieNode may have up to 26 children (for lowercase English).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet is not only lowercase English?  
  *Hint: Adjust children structure (may need hash maps instead of arrays, maybe for unicode characters).*

- How would you modify the data structure to support delete operations?  
  *Hint: Remove value from key’s Trie nodes, reduce sum as you do with insert, and clean up nodes if needed.*

- What if you want to support sum for not just prefixes but arbitrary substrings?  
  *Hint: Trie is efficient for prefixes, for substrings you might need a Suffix Trie or other data structure.*

### Summary
This is a classic **Trie (Prefix Tree)** pattern, enhanced to store prefix sums. It enables efficient insert and prefix sum in O(k) time per operation (where k is string length). The approach is commonly used for any prefix-based search, autocomplete, or dictionary applications, and variants apply in problems like [implementing prefix search](https://leetcode.com/problems/implement-trie-prefix-tree), [word search](https://leetcode.com/problems/word-search-ii), and more.


### Flashcard
Use Trie to store prefix sums; for sum(prefix), traverse Trie to node matching prefix and return its cumulative value.

### Tags
Hash Table(#hash-table), String(#string), Design(#design), Trie(#trie)

### Similar Problems
- Sort the Jumbled Numbers(sort-the-jumbled-numbers) (Medium)
- Sum of Prefix Scores of Strings(sum-of-prefix-scores-of-strings) (Hard)