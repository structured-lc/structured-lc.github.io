### Leetcode 745 (Hard): Prefix and Suffix Search [Practice](https://leetcode.com/problems/prefix-and-suffix-search)

### Description  
Design a special dictionary that supports searching for the index of the **word with the largest index** in a list that starts with a given prefix and ends with a given suffix.  
Implement a class `WordFilter`:
- `WordFilter(words)` initializes the object with the given words.
- `f(pref, suff)` returns the highest index of any word starting with the string `pref` and ending with the string `suff`. If there is no such word, return -1.  

*All words and queries are lowercase and at most 7 letters. There can be up to 10⁴ words and queries. Return the largest index if multiple words satisfy the query.*

### Examples  

**Example 1:**  
Input: `WordFilter(["apple"])`, then `f("a", "e")`  
Output: `0`  
*Explanation: The word "apple" at index 0 starts with 'a' and ends with 'e', so return 0.*

**Example 2:**  
Input: `WordFilter(["apple","apply","apex"])`, then `f("ap", "ly")`  
Output: `1`  
*Explanation: "apply" (index 1) starts with "ap" and ends with "ly".*

**Example 3:**  
Input: `WordFilter(["orange","banana","grape"])`, then `f("b", "a")`  
Output: `1`  
*Explanation: "banana" (index 1) starts with "b" and ends with "a".*

### Thought Process (as if you’re the interviewee)  
The brute-force way is, for every query, to check every word and see if it starts with the prefix and ends with the suffix. This would result in O(N \* L) per query, where N is the number of words and L is the word length. For up to 10⁴ queries, this would be too slow.

To optimize, I could try using tries. But since both prefix and suffix are queried, we'd need a data structure able to efficiently support both at once.

The clever trick (also seen in several solutions) is to preprocess all possible (prefix, suffix) pairs for each word and map them to the word’s index. Specifically, for each word, for every possible prefix and every possible suffix, store them in a hashmap as (prefix#suffix) → index. This way, for a query, just look up (pref#suff). This is feasible because words are short (length ≤ 7), so each word generates at most 8 × 8 = 64 unique (prefix, suffix) combinations. This ensures queries are O(1) and acceptable build time.

An alternative high-efficiency approach uses a single trie by combining the suffix and prefix together and storing indices at each node. But the hashmap solution is more direct and less error-prone.

### Corner cases to consider  
- Word list with only one word.
- Duplicated words in the dictionary (latest index should be returned).
- Queries with prefixes or suffixes longer than any word (should return -1).
- Prefix/suffix is the whole word.
- Empty prefix or suffix (should match any).

### Solution

```python
class WordFilter:
    def __init__(self, words):
        # Dictionary to map (prefix#suffix) → index
        self.lookup = {}
        for idx, word in enumerate(words):
            n = len(word)
            prefix_set = [word[:i] for i in range(n + 1)]
            suffix_set = [word[j:] for j in range(n + 1)]
            for pre in prefix_set:
                for suf in suffix_set:
                    # '#' is a separator not in any word (since only lowercase)
                    key = pre + '#' + suf
                    # Always overwrite, to store the largest index
                    self.lookup[key] = idx

    def f(self, pref, suff):
        key = pref + '#' + suff
        return self.lookup.get(key, -1)
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - Constructor: O(N × L²), where N is the number of words and L is max word length (since for each word, all (prefix, suffix) pairs are processed; L ≤ 7).
  - Each query: O(1), as it’s a single dictionary lookup.
- **Space Complexity:**
  - O(N × L²) for the hashmap: each word produces O(L²) key-value pairs.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you optimize further if the prefix or suffix is always the full word?
  *Hint: Think about edge cases or simplifying the mapping when queries are more restricted.*

- How would you handle much longer words or words with Unicode (so slicing is not cheap)?
  *Hint: Consider trie or more space-efficient encodings.*

- What if we allow deletions of words from the filter?
  *Hint: Explore more dynamic data structures than hashmaps or more intelligent key invalidation.*

### Summary
This problem is a classic example of using **preprocessing with hashmaps** to reduce complex search queries to constant time lookups.  
The method takes advantage of **word length constraints**, storing all combinations up front.  
This technique is often seen in "all pairs" problems, especially with short list/sequence length constraints.  
Common coding pattern: **precompute all combinations** for fast query time, trading increased build time and space.