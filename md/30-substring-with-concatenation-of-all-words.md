### Leetcode 30 (Hard): Substring with Concatenation of All Words [Practice](https://leetcode.com/problems/substring-with-concatenation-of-all-words)

### Description  
Given a string `s` and a list of words `words`, where each word is of the same length, **find all starting indices in `s` where the substring is a concatenation of every word in `words`** exactly once and **without any intervening characters**, regardless of order.  
- The substring must include each word from `words` exactly as it appears, possibly in any order.  
- Return the list of all such starting indices.

### Examples  

**Example 1:**  
Input: `s = "barfoothefoobarman"`, `words = ["foo", "bar"]`  
Output: `[0, 9]`  
*Explanation: The substrings starting at indices 0 ("barfoo") and 9 ("foobar") are both concatenations of all the words.*

**Example 2:**  
Input: `s = "wordgoodgoodgoodbestword"`, `words = ["word", "good", "best", "word"]`  
Output: `[]`  
*Explanation: No substring contains all words exactly once; "word" would have to be used twice, but only appears two times in `words`.*

**Example 3:**  
Input: `s = "barfoofoobarthefoobarman"`, `words = ["bar", "foo", "the"]`  
Output: `[6, 9, 12]`  
*Explanation: Substrings at 6 ("foobarthe"), 9 ("barthefoo"), and 12 ("thefoobar") all are valid concatenations.*

### Thought Process (as if you’re the interviewee)  
First, recognize that given all words are of the same length, and the target substring length is `total_words × word_length`.  
- **Brute-force idea:**  
  For every possible substring of `s` with the correct total length, check if it is a valid concatenation of all words. This would require creating a frequency map and comparing, which is O(n × k × L) with n as len(s), k = number of words, L = word length.

- **Optimization (Sliding Window + Hash Map):**  
  - Precompute word counts in `words`.
  - Slide a window of the correct candidate size across `s`. Within the window, split into sequential words, counting occurrences, and checking against the target frequencies.  
  - Only check windows starting at indices aligned with word boundaries (i.e., for `i` in 0 to word_length-1, and then step by word_length inside the loop).  
  - This eliminates the need to check every single index, reducing unnecessary computation.

Trade-offs:  
- Brute-force is simple but inefficient for large inputs.  
- Optimized solution reduces time by aligning checks to word boundaries and skipping checks when a mismatch is found early.

### Corner cases to consider  
- `words` is empty.
- `s` is shorter than the concatenated words.
- Words have duplicates (e.g., words = ["foo", "foo"]).
- Characters in `s` do not allow full concatenation anywhere.
- All words identical.
- Large input with overlapping valid substrings.

### Solution

```python
def findSubstring(s, words):
    # Edge case: empty input
    if not s or not words:
        return []
    
    word_len = len(words[0])
    num_words = len(words)
    substr_len = word_len * num_words
    n = len(s)
    result = []
    
    # Build frequency map for words
    from collections import Counter, defaultdict
    word_count = Counter(words)
    
    # Only need to start at offsets within a word length
    for i in range(word_len):
        left = i
        right = i
        curr_count = defaultdict(int)
        count = 0  # number of words matched
        
        while right + word_len <= n:
            word = s[right:right+word_len]
            right += word_len
            if word in word_count:
                curr_count[word] += 1
                count += 1
                # If more instances than needed, move left pointer
                while curr_count[word] > word_count[word]:
                    left_word = s[left:left+word_len]
                    curr_count[left_word] -= 1
                    left += word_len
                    count -= 1
                # If all words matched
                if count == num_words:
                    result.append(left)
            else:
                curr_count.clear()
                count = 0
                left = right
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(word_len × (n/word_len) × num_words) ≈ O(n × num_words) in worst case, since for every possible window we scan up to num_words within that window.

- **Space Complexity:**  
  O(num_words × L) for frequency counters (`word_count` and `curr_count`), proportional to number of unique words times their lengths.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the words can have *different* lengths?  
  *Hint: Can you still use fixed word alignment?*

- How would you solve it if words may *overlap* in `s`?  
  *Hint: Consider backtracking or modified window logic.*

- Can this be parallelized for very large `s`?  
  *Hint: How would you safely split and merge windows?*

### Summary
This problem is a classic example of the **sliding window + hash map** pattern, specifically tailored for substring search with fixed-length words. It's commonly encountered in problems involving strings, frequency matching, and substring verification. The core optimization is aligning the sliding window to word boundaries, leveraging hash maps for O(1) lookups, and skipping over irrelevant substrings early. Similar patterns appear in topics like "find all anagrams in a string" or substring search problems.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Minimum Window Substring(minimum-window-substring) (Hard)