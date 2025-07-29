### Leetcode 3093 (Hard): Longest Common Suffix Queries [Practice](https://leetcode.com/problems/longest-common-suffix-queries)

### Description  
Given two arrays of strings, **wordsContainer** and **wordsQuery**, for each string in wordsQuery, find the index of a string in wordsContainer that shares the **longest common suffix** with it.  
- If there are multiple candidates with the same longest suffix length, choose the **shortest** one.  
- If still tied, pick the one occurring **earliest** in wordsContainer.  
Return an array of these indices, one per query.

### Examples  

**Example 1:**  
Input:  
wordsContainer = `["abc", "bc", "c", "abcd"]`,  
wordsQuery = `["xc", "dc", "ab"]`  
Output: `[2, 1, 0]`  
*Explanation:*
- For "xc": "c" is the longest common suffix (matches with "abc", "bc", and "c"). "c" (index 2) is the shortest, so return 2.
- For "dc": "c" is the longest suffix. "c" (index 2) is the shortest, so return 2.
- For "ab": "ab" is the suffix for "abc", so return index 0.

**Example 2:**  
Input:  
wordsContainer = `["racecar", "car", "scar", "acecar"]`,  
wordsQuery = `["racecar", "star", "tar"]`  
Output: `[0, 2, 2]`  
*Explanation:*
- For "racecar": "racecar" matches exactly at index 0.
- For "star": "tar" is the longest suffix (`scar` at index 2), so return 2.
- For "tar": "tar" (suffix in "scar"), so index 2.

**Example 3:**  
Input:  
wordsContainer = `["alpha", "beta", "gamma"]`,  
wordsQuery = `["ta", "ma", "a"]`  
Output: `[1, 2, 0]`  
*Explanation:*
- "ta": "beta" (index 1) ends with "ta".
- "ma": "gamma" (index 2) ends with "ma".
- "a": all end with "a", but "alpha" (index 0) is shortest, so return 0.

### Thought Process (as if you’re the interviewee)  
Start with brute force:  
- For each query, compare with each string in wordsContainer from end (suffix), find common suffixes, and choose by tie-breakers.  
- This is O(Q × C × L), where Q=#queries, C=#container items, L=max string length. Too slow for large inputs.

**Optimization:**  
Suffix queries suggest Trie, but normal Trie works for prefixes. For suffixes, build a Trie of **reversed** wordsContainer strings.  
- While inserting each reversed word, store its index and length at each node when updating minimal length or first occurrence.
- For each query, reverse the string and walk as deep as possible into the Trie, recording the latest-best candidate as you go.

**Why this approach?**  
- Suffix queries made prefix trie (on reversed strings) a natural fit.
- Allows fast lookup (O(L) per query), plus fast tie-breaking.
- Total preprocessing: O(total wordsContainer chars), queries: O(total wordsQuery chars).

### Corner cases to consider  
- Both arrays are empty or all strings are empty.
- Queries with no matching suffix at all.
- More than one candidate with same suffix and tie-breakers apply.
- Suffix match possible with full word.
- Query is longer than every word in wordsContainer.
- Repeated strings in wordsContainer.

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        # Track: (word length, index in wordsContainer)
        self.min_len = float('inf')
        self.min_idx = -1

def longestCommonSuffixQueries(wordsContainer, wordsQuery):
    # Build a trie of reversed wordsContainer
    root = TrieNode()
    for idx, word in enumerate(wordsContainer):
        node = root
        word_rev = word[::-1]
        for ch in word_rev:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
            # Update with better candidate if:
            # shorter word OR same length but earlier index
            if len(word) < node.min_len or (len(word) == node.min_len and idx < node.min_idx):
                node.min_len = len(word)
                node.min_idx = idx

    result = []
    for query in wordsQuery:
        node = root
        query_rev = query[::-1]
        best_len = -1
        best_idx = -1
        cur = node
        for i, ch in enumerate(query_rev):
            if ch in cur.children:
                cur = cur.children[ch]
                if (len(query) - i - 1 + cur.min_len) >= cur.min_len:
                    # Found a better suffix match
                    if i + 1 > best_len or (
                        i + 1 == best_len and
                        (cur.min_len < wordsContainer[best_idx] if best_idx != -1 else True)
                    ):
                        best_len = i + 1
                        best_idx = cur.min_idx
            else:
                break
        # If no match at all, choice is undefined; by problem spec, there is always something
        result.append(best_idx if best_idx != -1 else 0)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(S + Q × L),  
  S = sum of all chars in wordsContainer, Q = #queries, L = longest string in queries.  
  Justification: Trie build is O(S), each query walks up to O(L) in Trie.
- **Space Complexity:** O(S + Q),  
  Trie nodes proportional to total input characters, output array is O(Q).

### Potential follow-up questions (as if you’re the interviewer)  

- (What if wordsContainer is updated frequently?)  
  *Hint: Think about dynamic Trie with insert & delete support.*

- (What if queries are online and huge?)  
  *Hint: Consider amortized cost of Trie vs. per-query scan.*

- (What if you need not just index but the actual string(s) with that suffix?)  
  *Hint: Store extra info or track lists at trie nodes.*

### Summary
This problem is a strong illustration of using a **suffix Trie** (by reversed insertion) to turn a brute suffix search into a highly efficient lookup. Variants of this pattern appear in problems like substring or pattern matching, string suggestion engines, and DNA fragment overlap.  
The main trick is realizing that reversing strings converts a suffix challenge into a prefix one, unlocking classic Trie efficiency.  
The solution uses custom Trie nodes with storage for fast tie-breaking and is an example of "Trie plus metadata".