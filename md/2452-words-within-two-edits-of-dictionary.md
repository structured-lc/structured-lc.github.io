### Leetcode 2452 (Medium): Words Within Two Edits of Dictionary [Practice](https://leetcode.com/problems/words-within-two-edits-of-dictionary)

### Description  
Given two string arrays: **queries** and **dictionary**.  
All strings have the same length, made up of only lowercase English letters.

*You can change any letter in a word to any other letter. In one edit, you can change only one character. A word from queries is considered a match if you can convert it into any word in dictionary using at most two edits.*

Return all words from queries that match any word in the dictionary with at most two edits.

### Examples  

**Example 1:**  
Input:  
`queries = ["word","note","wood"]`,  
`dictionary = ["wood","joke","moat"]`  
Output:  
`["word","note","wood"]`  
Explanation:  
- "word" can become "wood" by changing 'r' to 'o' (1 edit).  
- "note" can become "joke" by changing 'n' to 'j' and 't' to 'k' (2 edits).  
- "wood" matches "wood" exactly (0 edits).

**Example 2:**  
Input:  
`queries = ["yes","now"]`,  
`dictionary = ["fat","cat","bat"]`  
Output:  
`[]`  
Explanation:  
- Neither "yes" nor "now" can be converted to any dictionary word within two edits.

**Example 3:**  
Input:  
`queries = ["abc","def","ghi"]`,  
`dictionary = ["abd","def","hij"]`  
Output:  
`["abc","def","ghi"]`  
Explanation:  
- "abc" is within 1 edit of "abd".  
- "def" matches "def" exactly (0 edits).  
- "ghi" is within 1 edit of "hij" ('g' to 'h').

### Thought Process (as if you’re the interviewee)  

First, I would clarify the constraints:
- All words are of the same length.
- Only lowercase letters.
- The number of edits allowed is at most 2.

The brute force solution is to compare every word in queries against every word in dictionary, and for each pair, count how many positions their characters differ. If that count is 2 or less, the queried word is a match.

This approach has a complexity of O(Q × D × L), where Q = queries, D = dictionary, and L = word length.

Is there scope for significant optimization? If the arrays are very large or length is big, we might look into advanced techniques (e.g., pre-filtering or hashing close words), but since edit limit is small (2), a nested brute search with early exit should suffice and is easy to implement and verify.

For each query word:
- For each dictionary word:
  - Compare character by character, terminate early if >2 mismatches.
  - If at least one such dictionary word matches (≤2 mismatches), keep the query word.

### Corner cases to consider  
- queries or dictionary is empty (should return empty list).
- All words match exactly (all queries == some dictionary word).
- No query word is close to any dictionary word.
- All possible edits needed (all words are very different).

### Solution

```python
def twoEditWords(queries, dictionary):
    result = []
    for q in queries:
        found = False
        for d in dictionary:
            # Early skip if already found
            diff = 0
            for qc, dc in zip(q, d):
                if qc != dc:
                    diff += 1
                    if diff > 2:
                        break
            if diff <= 2:
                result.append(q)
                found = True
                break
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(Q × D × L),  
  where Q is number of queries, D is dictionary size, L is the word length. Each query is compared to every dictionary word, and for each such pair, we may compare up to L letters.
- **Space Complexity:** O(Q),  
  for storing the result list (in worst case, all queries match).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you extend the solution for k (arbitrary) allowed edits?
  *Hint: Parameterize edit threshold, consider early stopping, but brute force could still work if k is small.*

- What if instead of only substitution (change), we allow insertions and deletions (true edit distance)?
  *Hint: Need to use dynamic programming to compute Levenshtein distance instead of letter-by-letter comparison.*

- How to optimize if queries, dictionary, and word length are all very large?
  *Hint: Consider pre-processing dictionary, perhaps by creating word signatures, using hash-maps for close variations, or applying BK-trees or trie-like structures for fuzzy matching.*

### Summary

This problem is a classic *fuzzy string matching* pattern with a fixed small edit budget. The efficient brute-force approach leverages the very small edit allowance (max 2) and early-out optimization.  
This pattern applies to other error-tolerant matching tasks such as spell checking, suggestion engines, and DNA sequence matching where you only care about "close enough" matches.  
For higher edit budgets or larger input, more advanced data structures (e.g., BK-trees, tries, precomputed variants, or hashing) can be used for efficient approximate search.


### Flashcard
For each query word, check all dictionary words and count character mismatches; if mismatches ≤ 2, it's a match—brute-force O(Q × D × L).

### Tags
Array(#array), String(#string), Trie(#trie)

### Similar Problems
- Word Ladder(word-ladder) (Hard)