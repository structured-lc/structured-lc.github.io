### Leetcode 3045 (Hard): Count Prefix and Suffix Pairs II [Practice](https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii)

### Description  
Given an array of strings `words`, count the number of unique pairs of indices (i, j) with i < j such that `words[i]` is both a prefix *and* a suffix of `words[j]`.  
In other words, for each pair (i, j):  
- `words[j]` starts with `words[i]`  
- `words[j]` ends with `words[i]`  

The task is to efficiently compute the total count of such pairs.

### Examples  

**Example 1:**  
Input: `["one", "onenote", "note"]`  
Output: `1`  
*Explanation: "one" is both a prefix and a suffix of "onenote". Pair (0,1) is valid.*

**Example 2:**  
Input: `["apple","applepie","pie"]`  
Output: `1`  
*Explanation: "apple" is both a prefix and suffix of "applepie". Pair (0,1) is valid.*

**Example 3:**  
Input: `["abc", "123", "abcdefg", "efgabc"]`  
Output: `0`  
*Explanation: No string is both a prefix and suffix of any string after it.*

### Thought Process (as if you’re the interviewee)  

- **Brute force approach:**  
  For each pair of indices (i, j) with i < j, check if `words[j]` starts with `words[i]` *and* ends with `words[i]`.  
  This is O(n² * L), where L is the average word length—not feasible for large inputs.

- **Optimize:**  
  We notice that for a given word `s` at index i, we want to efficiently find future words which have `s` as both prefix and suffix.  
  If we process the array from left to right, for each new word, we can keep track of all smaller words we've seen, using a data structure that allows prefix and suffix matching.  
  However, to *improve even further*, we can model the problem as storing for each possible prefix-suffix pair what words have appeared so far, then, for a new word, count the number of previous words for which this word has them as both prefix and suffix.

- **Efficient Solution (Trie on prefix-suffix pairs):**  
  For each string, consider all previous strings as a sequence of (char at position i, char at position m-1-i) pairs layer-by-layer, as we build the trie.  
  For each word, insert into the trie, at each step matching the prefix and reverse-suffix at the same time, and for each node, count how many times we have reached this (prefix, suffix) combination from previous words.

  The insight is:  
  - For each word, as you insert pairs (char from beginning, char from end), you know how many previous words have had the same (prefix, suffix) sequence up to this length by checking the count at that trie node.  
  - Each new word queries the trie for matches and updates counts for future words.

  This reduces the time complexity to O(n L), where L is the max word length, and avoids repeated substring checks.

### Corner cases to consider  
- Empty input array (should return 0)
- Words array with all identical words
- Words that are both prefix and suffix of themselves (but i < j, so not pairing a word with itself)
- Words of length 1
- Cases where no valid pairs exist
- Case sensitivity (as per problem spec)

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.count = 0

def countPrefixSuffixPairs(words):
    # Root of the trie
    root = TrieNode()
    ans = 0

    for s in words:
        node = root
        m = len(s)
        # For each character pair (prefix, suffix)
        for i in range(m):
            # Use a tuple of (begin, end) char as key
            pair = (s[i], s[m - i - 1])
            if pair not in node.children:
                node.children[pair] = TrieNode()
            node = node.children[pair]
            # Each time we follow an existing path, 
            # it means we've seen a word with this (prefix, suffix) path before
            ans += node.count
        node.count += 1  # Mark this path as visited for this word
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × L), where n is the number of words, and L is the maximum word length.  
  For each word, we traverse at most L nodes in the trie, and each edge insertion, lookup, and increment is O(1).

- **Space Complexity:** O(n × L), for the trie. In the worst case, all prefix-suffix character-pair paths are unique, so the trie stores O(n × L) nodes.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you adapt this approach for very large alphabets or Unicode strings?  
  *Hint: Optimize the character-pair mapping in the trie for space.*

- How would you modify the solution to only count pairs where the prefix and suffix are the *entire* word?  
  *Hint: Change the way you traverse or record in the trie.*

- How would you return the actual pairs of indices, not just the count?  
  *Hint: At each node, store indices of words ending at that (prefix, suffix) path.*

### Summary
This problem is a classic trie application, where each path encodes combined prefix and suffix character pairs. The pattern of "simultaneous prefix and suffix matching" via trie traversal is powerful and can be extended to other problems where two ends or palindromic properties are checked together. Efficiently counting string pairs by leveraging trie-based aggregation avoids quadratic brute-force and demonstrates a strong understanding of advanced data structures.

### Tags
Array(#array), String(#string), Trie(#trie), Rolling Hash(#rolling-hash), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
- Implement Trie (Prefix Tree)(implement-trie-prefix-tree) (Medium)
- Design Add and Search Words Data Structure(design-add-and-search-words-data-structure) (Medium)