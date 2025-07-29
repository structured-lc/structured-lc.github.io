### Leetcode 3485 (Hard): Longest Common Prefix of K Strings After Removal [Practice](https://leetcode.com/problems/longest-common-prefix-of-k-strings-after-removal)

### Description  
We are given an array of strings `words` and an integer `k`. For each index `i` (0-based), remove the iᵗʰ string from the array. From the remaining strings, select any `k` strings (indices must be distinct). Compute the length of the **longest common prefix** among these k strings. Output an array where the iᵗʰ value is the answer after removal of `words[i]`. If removing `words[i]` leaves fewer than `k` strings, output 0 for that position.

### Examples  

**Example 1:**  
Input: `words = ["jump", "run", "jump", "run"], k = 2`  
Output: `[3, 4, 4, 3]`  
Explanation:  
- Remove `"jump"` at 0: remaining = ["run", "jump", "run"]. Choose ["run", "run"] → longest common prefix is `"run"` (length 3).  
- Remove `"run"` at 1: remaining = ["jump", "jump", "run"]. Choose ["jump", "jump"] → longest common prefix is `"jump"` (length 4).  
- Remove `"jump"` at 2: similar, choose ["jump", "jump"] → 4  
- Remove `"run"` at 3: remaining = ["jump", "run", "jump"]. Choose ["jump", "jump"] → 3  

**Example 2:**  
Input: `words = ["a","ab","abc","abcd"], k = 2`  
Output: `[1, 1, 1, 1]`  
Explanation:  
- Remove any string: e.g., ["ab","abc","abcd"], longest prefix between any two = "a" (length 1).  

**Example 3:**  
Input: `words = ["abc","abc","abc"], k = 2`  
Output: `[3, 3, 3]`  
Explanation:  
- No matter which one you remove, choosing any two strings they are both `"abc"`, so prefix is `"abc"` (length 3).  


### Thought Process (as if you’re the interviewee)  
The problem asks for the length of the longest common prefix among any k strings, after removing each string in turn.  
**Brute-force approach:**  
- For each i, remove words[i].
- For all subsets of k strings among the rest, compute their common prefix length, and take the maximum.
- This is exponentially slow (combinatorial choice of subsets), and also recomputes many prefixes.

**Optimize:**  
- All common prefixes can be found using a Trie, where values at nodes can store how many words share a certain prefix.
- If we preprocess the Trie for all strings, for every removal, we can quickly "remove" a word, check among the remaining k how deep in the Trie we can go, and put the word back.
- To process all removals efficiently, we need to count, for every node in the Trie, how many words include that prefix. When removing a word, decrement counts along its path; restore it after that query.

- For k = 2, it's about finding the deepest node (longest prefix) that appears in at least `k` strings after removal.  
- For each removal, we descend the Trie and look for deepest node with count ≥ k.

**Trade-offs:**  
- Trie is best here because string comparison at each char can be shared.
- O(L×n) to build the Trie for n words of length at most L.
- For each removal, updating counts is O(L), and querying is O(L) as well.
- Total: O(nL) preprocessing, O(nL) for all queries.


### Corner cases to consider  
- Empty input (`words` empty).
- k > len(words) - 1 ⇒ after removal, not enough strings left.
- All words identical.
- All words distinct.
- Words of length 0.
- k = 1 (trivially always maximum word length after removal).


### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.count = 0  # Number of words containing this prefix

class Solution:
    def longestCommonPrefixAfterRemoval(self, words, k):
        n = len(words)
        # Edge case: if k > n-1, all answers are 0
        if n == 0 or k > n - 1:
            return [0] * n

        # Build the Trie with all words
        root = TrieNode()
        nodes_for_word = []  # Stores Trie nodes along each word's path

        for word in words:
            node = root
            path = []
            for ch in word:
                if ch not in node.children:
                    node.children[ch] = TrieNode()
                node = node.children[ch]
                node.count += 1
                path.append(node)
            nodes_for_word.append(path)

        def get_max_prefix(node, required_count, depth):
            # Find the deepest node reachable with count >= required_count
            max_depth = depth
            for ch, child in node.children.items():
                if child.count >= required_count:
                    d = get_max_prefix(child, required_count, depth+1)
                    if d > max_depth:
                        max_depth = d
            return max_depth

        result = []
        for i in range(n):
            # Remove words[i] by decrementing counts along its path
            for node in nodes_for_word[i]:
                node.count -= 1

            if n - 1 < k:
                res = 0
            else:
                res = get_max_prefix(root, k, 0)
            result.append(res)
            # Restore words[i]
            for node in nodes_for_word[i]:
                node.count += 1
        return result

# Example usage:
# sol = Solution()
# print(sol.longestCommonPrefixAfterRemoval(["jump", "run", "jump", "run"], 2))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × L), where n = number of words, L = max length.  
  - Build Trie for n words: O(n × L)
  - For each query (removal of words[i]): O(L) to update counts, and O(L) to search Trie for prefix, repeated n times.
- **Space Complexity:** O(n × L)  
  - Each unique prefix in the Trie forms a new node. Worst case is one branch per char per word.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k can be as large as n?  
  *Hint: You need to handle 0 answer cases, handle Trie or prefix search more efficiently for n.*

- How would you modify this for streaming input (words arriving one at a time)?  
  *Hint: Try to maintain the Trie and calculate on-the-fly, consider how to incrementally update.*

- If the words are very long or you have to process many such queries, how do you optimize memory?  
  *Hint: Consider storing prefixes up to necessary depth or compressing Trie nodes.*

### Summary
This problem is a variation of the **Longest Common Prefix** pattern, but after dynamic, per-query removal. **Trie (prefix tree)** data structure is key: it allows efficient prefix search and dynamic update/removal. The approach is optimized by updating the prefix counts rather than recomputing all subsets. Similar techniques are used for dynamic dictionary problems, prefix/word recommendations, or problems with "for all subsets after removal" constraints.