### Leetcode 820 (Medium): Short Encoding of Words [Practice](https://leetcode.com/problems/short-encoding-of-words)

### Description  
Given an array of words, return the length of the shortest possible reference string, such that every word can be reconstructed by reading a substring from an index until the '#' character is reached. In other words, for each word, it should appear as a suffix in the reference string ending with '#'. The challenge is to maximize overlaps between words that are suffixes of others, and thus minimize the reference string length.

### Examples  

**Example 1:**  
Input: `["time", "me", "bell"]`  
Output: `10`  
Explanation. The reference string is `"time#bell#"` — "me" is a suffix of "time", so we don't need to encode "me" separately. The total length is 10.

**Example 2:**  
Input: `["t"]`  
Output: `2`  
Explanation. The reference string is `"t#"`, total length is 2.

**Example 3:**  
Input: `["me", "time", "ime"]`  
Output: `6`  
Explanation. The reference string is `"time#"` — both "me" and "ime" are suffixes of "time", so only "time" is encoded. Length is 5 + 1 = 6.


### Thought Process (as if you’re the interviewee)  
Brute-force:  
- Try to concatenate every word with "#".
- If another word is a suffix of any already encoded word, we skip it.
- This requires checking, for each pair of words, if one is a suffix of the other, which is potentially O(n² × L), where L is the max word length.

Optimized:  
- Since suffixes are the key, we can utilize a set:
  - Add all words into a set.
  - For each word, remove every possible suffix (excluding the word itself) from the set.
- After the removal, only those words that are not suffixes of others remain.
- The answer is sum of (word length + 1) for every word left (to account for '#').

Scalability:  
- For further optimality, use a Trie (built over reversed words) to avoid redundant storage and lookups when handling overlapping suffixes.
- Only the leaves in this Trie represent words that need to be explicitly encoded. Total encoded length = sum of (word length + 1) for leaves[1][2].

Why this approach:  
- Using a set is succinct and efficient given small word lengths and tight uniqueness limits.
- The Trie approach is best for interview demonstration, showing knowledge of data structures relevant to string suffix aggregation problems.

### Corner cases to consider  
- Multiple duplicates in input (`["a", "a", "a"]`)
- Words that are full suffixes of others (`["me", "time"]`)
- No suffixes overlaps at all (`["a", "b", "c"]`)
- Single word list
- Words with length 1
- Empty input array (though per constraints, not required)

### Solution

```python
# Solution using set + suffix removal (interview efficient, readable)

def minimumLengthEncoding(words):
    # Remove duplicates for efficiency
    words = set(words)
    
    # Remove all suffixes (not including full word itself) from the set
    for word in list(words):
        for k in range(1, len(word)):
            suffix = word[k:]
            words.discard(suffix)
            
    # The remaining words are not suffixes of others
    return sum(len(word) + 1 for word in words)

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × L²)
  - For n words of maximal length L, inner loop does up to L work per word, plus set removals.
  - In practice, L is capped at 7, so this is very efficient.
- **Space Complexity:** O(n × L)
  - For storing the set of words and any intermediary collections.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this to return the actual reference string `S` (not just its length)?
  *Hint: Collect the set of words that remain after suffix removal and concatenate them with '#'.*
  
- How does this approach scale if the maximum word length increases significantly?
  *Hint: Set-based approach’s inner loop scales poorly with longer words; Trie becomes more useful.*

- What if we want to support online (incremental) addition of words and update the encoding length efficiently?
  *Hint: Maintaining/updating a Trie can allow dynamic suffix checks and encoding updates efficiently.*

### Summary
This problem leverages **Suffix Elimination** and/or **Trie building** for suffix overlap detection efficiently. The key is removing redundancy by not encoding words that are suffixes of others. The core pattern applies broadly to problems of string compression, minimal encoding, and common prefix/suffix aggregation, with Tries being a go-to data structure for such scenarios.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Trie(#trie)

### Similar Problems
