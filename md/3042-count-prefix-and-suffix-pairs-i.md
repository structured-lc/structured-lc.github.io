### Leetcode 3042 (Easy): Count Prefix and Suffix Pairs I [Practice](https://leetcode.com/problems/count-prefix-and-suffix-pairs-i)

### Description  
Given a 0-indexed string array **words**, count the number of pairs of indices (i, j) such that:

- i < j
- The string at words[i] is both a **prefix** and **suffix** of words[j]

A prefix is the starting substring, and a suffix is the ending substring. For example, "cat" is a prefix of "cater", and "ter" is a suffix of "cater". For a pair (i, j), words[i] must completely match the start and end of words[j] (not just contain).

### Examples  

**Example 1:**  
Input: `words = ["ab", "abc", "aab", "ab"]`  
Output: `2`  
*Explanation:*
- Pair (0, 1): "ab" is prefix & suffix of "abc" → false ("c" at end).
- Pair (0, 2): "ab" is prefix & suffix of "aab" → false ("aa" at start).
- Pair (0, 3): "ab" is prefix & suffix of "ab" → true.
- Pair (1, 2): "abc" vs "aab" → false.
- Pair (1, 3): "abc" vs "ab" → false.
- Pair (2, 3): "aab" vs "ab" → false.  
Answer = 1 pair (0, 3).

**Example 2:**  
Input: `words = ["hello", "he", "llohe", "hello"]`  
Output: `2`  
*Explanation:*
- (0, 3): "hello" is a prefix and suffix of "hello".
- (1, 2): "he" is prefix ("he") and suffix ("he") of "llohe".
Answer = 2 pairs.

**Example 3:**  
Input: `words = ["x", "y", "z"]`  
Output: `0`  
*Explanation:*
No word is both a prefix and suffix of any following word.

### Thought Process (as if you’re the interviewee)  

The brute-force approach is to consider every pair of indices (i, j) where i < j, then check if words[i] is *both* a prefix and a suffix of words[j].  
For a prefix: words[j][:len(words[i])] == words[i]  
For a suffix: words[j][-len(words[i]):] == words[i]  

We must ensure words[i] is not longer than words[j], as a string can’t be a prefix/suffix of a shorter string.

Optimizations:
- For the easy version, there are no constraints on N (input size is small), so nested loops are acceptable.
- For improved performance (or the hard version), we could preprocess words into maps by word length or build prefix/suffix trees, but that's unnecessary here.

### Corner cases to consider  
- Empty array: words = []
- All identical strings: ["a","a","a"]
- Single element: ["abc"]
- Prefix matches but not suffix (and vice versa)
- Words of different lengths, including cases where words[i] larger than words[j]

### Solution

```python
def countPrefixSuffixPairs(words):
    count = 0
    n = len(words)
    for i in range(n):
        for j in range(i + 1, n):
            len_i = len(words[i])
            len_j = len(words[j])
            # words[i] must not be longer than words[j]
            if len_i > len_j:
                continue
            # Check prefix
            if words[j][:len_i] != words[i]:
                continue
            # Check suffix
            if words[j][-len_i:] != words[i]:
                continue
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² \* L), where n = len(words), L is average word length.  
  There are O(n²) possible i, j pairs and checking prefix/suffix takes up to O(L).
- **Space Complexity:** O(1) extra space (apart from input), since no auxiliary data structures used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input size is large (e.g., n up to 10⁵)?
  *Hint: Can you preprocess or use tries, hashing or buckets by word length?*

- How would you handle matching with wildcards or patterns?
  *Hint: Consider string matching algorithms like KMP, or regular expressions.*

- What if only prefix OR only suffix was required?
  *Hint: The logic would simplify to just a single substring check, making it O(n²) but faster.*

### Summary
The solution uses a **brute-force nested loop** to check all valid (i, j) pairs for the prefix and suffix property. This is a classic substring search/pair comparison problem well-suited to brute-force for small data. The coding pattern is common for pairwise comparisons (O(n²)), used in problems involving pairs, subarrays, or substring matching. For large-scale inputs, string hashing or tries would be a common optimization.


### Flashcard
Brute-force all pairs (i, j) with i < j; check if words[i] is both prefix and suffix of words[j].

### Tags
Array(#array), String(#string), Trie(#trie), Rolling Hash(#rolling-hash), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
- Implement Trie (Prefix Tree)(implement-trie-prefix-tree) (Medium)
- Design Add and Search Words Data Structure(design-add-and-search-words-data-structure) (Medium)