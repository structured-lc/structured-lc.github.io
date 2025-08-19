### Leetcode 1858 (Medium): Longest Word With All Prefixes [Practice](https://leetcode.com/problems/longest-word-with-all-prefixes)

### Description  
Given an array of strings `words`, find the **longest string** in `words` where **every prefix** of the string is also present in `words`.  
- A prefix means for a word "apple", prefixes are ["a", "ap", "app", "appl", "apple"].
- There can be multiple strings of the same maximal length—return the **lexicographically smallest** one.
- If no such word exists, return `""`.

### Examples  

**Example 1:**  
Input: `["k","ki","kir","kira","kiran"]`  
Output: `"kiran"`  
Explanation: "kiran" has prefixes "kira", "kir", "ki", "k", all present in `words`.

**Example 2:**  
Input: `["a","banana","app","appl","ap","apply","apple"]`  
Output: `"apple"`  
Explanation: Both "apple" and "apply" have all prefixes in the list, but "apple" is lexicographically smaller.

**Example 3:**  
Input: `["abc","bc","ab","qwe"]`  
Output: `""`  
Explanation: No word has all its prefixes present in the input.


### Thought Process (as if you’re the interviewee)
- **Brute-force idea:**  
  For every word, check if all its prefixes exist in the array.  
  - For each word \(w\) of length L, check all its prefixes of length 1 to L-1.
  - To make lookups fast, store all words in a set for O(1) access.
  - For every word, if all prefixes are present, update the answer if its length is larger, or if same length but lexicographically smaller.
  - Time complexity is O(N × L²) (N = #words, L = avg word length), because for each word of length L, up to L checks per prefix.

- **Optimized approach:**  
  - **Sort words**: Process short words first (start with prefix "a", then "ap", then "app", etc.). For equal length, sort lexicographically.
  - **Store valid builds only**: Track sets of words that can be built by adding one character at a time (bottom-up).
    - Add a word to the result set only if its prefix (excluding last char) is already a fully-buildable word.
  - **Trie approach:**  
    - Insert all words into a Trie, marking terminal nodes.
    - For each word, traverse the Trie and check at each node if it is terminal; i.e., previous prefix is a word itself.
    - Efficient prefix checking in O(L) per word[2].
  - Both set-based and Trie approaches give O(N × L).

  **Trade-offs:**  
  - Set-based is easy and fast for prefix checking.
  - Trie structure is scalable for very large datasets, allows explicit prefix tracking.

### Corner cases to consider  
- Only single-character strings.
- Duplicate strings in `words`.
- Multiple candidates with same max length and tie-breaking.
- No valid buildable words.
- Words with prefix not in list, e.g. "banana" without "b".

### Solution

```python
def longestWord(words):
    # Store all given words for O(1) lookups.
    word_set = set(words)
    # Sort by length DESC, then lexicographically ASC.
    words.sort(key=lambda x: (-len(x), x))
    
    for word in words:
        # Check all prefixes from length 1 up to len(word) - 1
        valid = True
        for i in range(1, len(word)):
            if word[:i] not in word_set:
                valid = False
                break
        if valid:
            return word
    return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting the array: O(N log N), where N = number of words.
  - For each word, checking all its prefixes (≤L): O(N × L).
  - Total: **O(N × L)**, since L can be up to 10⁵, but overall sum L across all N is bounded (see constraints).
- **Space Complexity:**  
  - O(N×L) to store all words in a set (worst: all different, all long).
  - No recursion or explicit Trie construction here.

### Potential follow-up questions (as if you’re the interviewer)

- If the word list is extremely large (say, millions of words), how would using a Trie improve prefix checks versus a set?
  *Hint: Tries allow prefix validation in a single linear pass per word, especially when validating batch queries.*

- Can you update the code to return all maximal words with the prefix property (not just one)?
  *Hint: Collect all words matching the maximal length, then filter by lexicographic order if needed.*

- How would you find the full chain showing how a result word is built up by its prefixes?
  *Hint: Record parent pointers or reconstruct using prefix splits as you process.*

### Summary
This problem leverages **prefix-building** pattern and can be solved efficiently by set-lookup or Trie-based approaches.  
Both focus on validating that every prefix of a candidate exists; this is a classic use-case for Tries or HashSets.  
Similar logic applies in problems like 'Longest Word in Dictionary' and 'Buildable Words'.  
The key insight is that you can reduce redundant checks by ordering the search or utilizing fast lookup structures for prefix validation.

### Tags
Array(#array), String(#string), Depth-First Search(#depth-first-search), Trie(#trie)

### Similar Problems
- Longest Word in Dictionary(longest-word-in-dictionary) (Medium)