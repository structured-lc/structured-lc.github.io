### Leetcode 758 (Medium): Bold Words in String [Practice](https://leetcode.com/problems/bold-words-in-string)

### Description  
Given a list of **keywords** (`words`) and a string `s`, highlight every occurrence of any keyword in `s` by wrapping it in `<b>` and `</b>` tags. If the bold intervals overlap or touch, merge them so the minimum number of tags is used. The final output should be the string with these bold tags properly inserted. Only lowercase English letters are used in input.

### Examples  

**Example 1:**  
Input: `words = ["ab","bc"], s = "aabcd"`  
Output: `"a<b>abc</b>d"`  
*Explanation: "ab" starts at index 1, "bc" starts at index 2, making "abc" one bold section. Minimum tags used.*

**Example 2:**  
Input: `words = ["ab","cb"], s = "aabcd"`  
Output: `"a<b>ab</b>cd"`  
*Explanation: Only "ab" at index 1 matches; so only "ab" is bolded.*

**Example 3:**  
Input: `words = ["abc","123"], s = "abcxyz123"`  
Output: `"<b>abc</b>xyz<b>123</b>"`  
*Explanation: "abc" and "123" are substituted with bolded versions as they appear disjointly.*

### Thought Process (as if you’re the interviewee)  

First, I’d consider a brute-force approach: For every position in `s`, check if any keyword starts at that position, mark those positions as needing bold tags. After this, scan through the string and add `<b>` when entering a bold section and `</b>` when leaving.  
- This covers overlaps: contiguous or overlapping sections will not create nested tags.
- Trade-off: Brute-force is simple for the problem’s constraint sizes (s length up to 500, words up to 50 and length each up to 10).

To optimize, I could use efficient substring search (like a Trie or Aho-Corasick), but for this size, brute-force has acceptable performance.

Merge intervals after collecting all bold positions to ensure minimum number of tags.

### Corner cases to consider  
- `words` is empty: nothing to bold, return `s` unchanged.
- No keywords found in `s`.
- Multiple overlapping or contiguous matches.
- The entire string is bolded.
- Keywords that are substrings or overlapping with each other.
- Single character string, one element in words.
- Back-to-back matches (adjacent, not overlapping).
- Case when s is empty (though per constraints, s is at least length 1).

### Solution

```python
def boldWords(words, s):
    n = len(s)
    bold = [False] * n
    
    # Mark bold positions
    for word in words:
        start = s.find(word)
        while start != -1:
            for i in range(start, start + len(word)):
                bold[i] = True
            start = s.find(word, start + 1)

    res = []
    i = 0
    # Build the result string with appropriate <b> tags
    while i < n:
        if bold[i]:
            res.append('<b>')
            while i < n and bold[i]:
                res.append(s[i])
                i += 1
            res.append('</b>')
        else:
            res.append(s[i])
            i += 1
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k × w), where n = length of s, k = number of words, w = average length of words.  
  - For every word, we scan s, which has acceptable performance for the given constraint sizes.
- **Space Complexity:** O(n) for the bold array and output string construction.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize if s is very long and words contains many short keywords?  
  *Hint: Think about trie-based or multi-pattern search algorithms like Aho-Corasick.*

- What if the tags should not overlap, or if you were not allowed to merge tags?  
  *Hint: How do you adjust your interval merging logic?*

- How would you handle a Unicode or case-insensitive version of the problem?  
  *Hint: Think about pre-processing and string comparison rules.*

### Summary
This problem is an instance of interval merging and string manipulation. The greedy interval mark-and-merge pattern is common for highlighting or tagging problems (e.g., highlighting overlapping substrings, merging calendar intervals). It is also related to keyword search problems, where trie/Aho-Corasick optimizations apply for larger data. The solution demonstrates a clean simulation approach suitable for small- to medium-sized constraints.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Trie(#trie), String Matching(#string-matching)

### Similar Problems
