### Leetcode 1065 (Easy): Index Pairs of a String [Practice](https://leetcode.com/problems/index-pairs-of-a-string)

### Description  
Given a string **text** and an array of strings **words**, find all substring intervals \([i, j]\) such that the substring `text[i...j]` is exactly one of the words in the array. Each pair \([i, j]\) gives starting and ending indices (inclusive) of a substring in `text` that matches any word in `words`. Return all such pairs sorted first by *i* and then *j* in case of ties. Matches can overlap.

### Examples  

**Example 1:**  
Input: `text = "thestoryofleetcodeandme"`, `words = ["story","fleet","leetcode"]`  
Output: `[[3,7],[9,13],[10,17]]`  
Explanation:  
`"thestoryofleetcodeandme"` contains "story" at [3,7], "fleet" at [9,13], and "leetcode" at [10,17]. Indices are inclusive.

**Example 2:**  
Input: `text = "ababa"`, `words = ["aba","ab"]`  
Output: `[[0,1],[0,2],[2,3],[2,4]]`  
Explanation:  
"ab" at [0,1], "aba" at [0,2], "ab" at [2,3], "aba" at [2,4]. Overlapping matches are possible.

**Example 3:**  
Input: `text = "dogcat"`, `words = ["cat", "dog"]`  
Output: `[[0,2],[3,5]]`  
Explanation:  
"dog" at [0,2], "cat" at [3,5].

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each index in `text`, check all substrings beginning at that index and see if any match a word in `words`. For each substring, check against every word—this leads to O(n² × m × k) complexity where n = len(text), m = len(words), k = average word length.  
- **Optimized approach:**  
  Since all words are unique and their max size is ≤ 50, and text length ≤ 100, we can:  
  - Place all words in a set for O(1) substring lookups.
  - For each index i in text, for each possible end index j with substring length ≤ max length of words, check if `text[i...j]` is in the set.
- **Further Optimization:**  
  Building a Trie from `words` allows you to traverse character by character, checking for matches as you go, reducing unnecessary substring checks, especially when many words share prefixes.

  Given problem constraints, set-based approach is simple and efficient.

### Corner cases to consider  
- text or words contains 1 character  
- No matches found at all  
- Multiple words sharing prefixes or suffixes  
- Overlapping words (e.g., "ab", "aba" as in Example 2)  
- All words longer than text  
- All words are of minimum or maximum length  
- Duplicates in output are forbidden by prompt (since words are unique and each substring instance is a single match)

### Solution

```python
def indexPairs(text, words):
    # Place all words in a set for O(1) lookup
    word_set = set(words)
    pairs = []
    max_word_len = max(len(w) for w in words)

    for i in range(len(text)):
        # Check all substrings starting at i, up to max_word_len
        for l in range(1, max_word_len + 1):
            j = i + l - 1
            if j >= len(text):
                break
            substr = text[i:j+1]
            if substr in word_set:
                pairs.append([i, j])
    # Sort results by i, then j
    pairs.sort()
    return pairs
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × L), where n = len(text), L = max length of words. For every start index, check up to L substrings. Creating the set takes O(m), m = len(words). Sorting is O(k log k) where k is the number of matches, but k ≤ n × L.
- **Space Complexity:**  
  O(m × L) for the set holding all words (m = len(words)), plus O(k) for the result list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large text and words, where performance is crucial?  
  *Hint: Consider Trie/PREFIX TREE structures to minimize redundant substring checks.*

- What if many words share the same prefix?  
  *Hint: Trie would efficiently group shared prefixes and speed up searches.*

- How would you return only the first match for each starting point?  
  *Hint: Break after the first found match in the inner loop, or track indices.*

### Summary
This problem fits the *substring search* or *sliding window* pattern. Brute-force is viable due to tight constraints, but using a Trie can optimize for larger inputs or heavy prefix reuse. The direct approach—using word-set membership and scanning substrings up to max word length—is efficient and easy to implement. This technique is applicable to problems where you need to find all substrings in a text matching a dictionary, such as word break or string matching with multiple patterns.