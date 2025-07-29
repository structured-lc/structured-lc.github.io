### Leetcode 616 (Medium): Add Bold Tag in String [Practice](https://leetcode.com/problems/add-bold-tag-in-string)

### Description  
Given a string and a list of words, wrap `<b>` and `</b>` (HTML bold tags) around every substring of the string that matches any word in the list. If two bold sections overlap or are adjacent, merge them into a single bold section. All matches are case-sensitive.

Example:  
- Input: s = "abcxyz123", words = ["abc", "123"]
- Output: "<b>abc</b>xyz<b>123</b>"

So any segment of s that matches a word in words should be surrounded by bold tags, and overlapping/adjacent matches should not create nested or redundant bold tags.

### Examples  

**Example 1:**  
Input: `s = "abcxyz123", words = ["abc", "123"]`  
Output: `<b>abc</b>xyz<b>123</b>`  
Explanation: The substrings "abc" and "123" match words; no overlap, so both get wrapped with bold tags.

**Example 2:**  
Input: `s = "aaabbcc", words = ["aaa", "aab", "bc"]`  
Output: `<b>aaabbc</b>c`  
Explanation: "aaa" and "aab" overlap on "aaab", and "bc" follows, so the bold section is merged: "aaabbc".

**Example 3:**  
Input: `s = "xyz", words = ["z"]`  
Output: `xy<b>z</b>`  
Explanation: Only the last character "z" matches a word, so only "z" is bolded.

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  For each index in the string, check if any word in words starts at that index. For each match, mark the indices (using a boolean or interval list) as bold.
- **Optimization**:  
  - Use a boolean array (`isBold`) of size len(s), mark ranges, and then merge/extend overlaps as you go.
  - An alternative is to build up a list of [start, end] pairs and merge intervals.
- **Trade-offs**:  
  - The boolean array is simple, readable, and fast for reasonable input sizes since len(s) ≤ 1000.
  - Trie can optimize the multiple substring matches, but given the constraints, it's not strictly needed unless words is huge.
- **Final approach**:  
  Use the boolean array, mark every position that should be bold, then iterate through s, appending characters and opening/closing the bold tags as needed.

### Corner cases to consider  
- No word in words matches: Return s unchanged.
- Overlapping or adjacent matches must be merged into one bold tag.
- Matches at the very start or end of s.
- Empty words list: Nothing should be bold.
- s is a single character.
- Large input sizes.
- All of s is covered by matches.

### Solution

```python
def addBoldTag(s, words):
    n = len(s)
    is_bold = [False] * n  # Boolean mask for bold positions

    # Mark all locations that need to be bolded
    for word in words:
        start = s.find(word)
        while start != -1:
            for i in range(start, start + len(word)):
                is_bold[i] = True
            start = s.find(word, start + 1)

    res = []
    i = 0
    while i < n:
        if is_bold[i]:
            res.append('<b>')
            while i < n and is_bold[i]:
                res.append(s[i])
                i += 1
            res.append('</b>')
        else:
            res.append(s[i])
            i += 1

    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × k × m), where n = len(s), k = len(words), m = average word length.  
  For each word, we scan s to find all the start indices. Each `find` call may touch all of s.
- **Space Complexity:**  
  O(n) for the is_bold array and the output string. No significant extra data structures beyond that.

### Potential follow-up questions (as if you’re the interviewer)  

- What if words contains thousands/millions of entries?  
  *Hint: How would you optimize matching all words against s? (Think Trie or Aho-Corasick algorithm).*

- How would you bold only non-overlapping matches ("left-most-longest" style)?  
  *Hint: Consider matching in descending order of word length and skipping covered positions.*

- How would you extend bolding to support case insensitivity or regular expressions?  
  *Hint: Think about different ways of checking substring matches.*

### Summary
This problem uses **string masking to mark match intervals** and then scan once to insert tags. It's a classic **interval merging / string reconstruction** problem, and similar patterns can apply to annotation, text highlighting, and even processing event logs with intervals. The core pattern is:  
- Mark or collect interval locations for events.  
- Merge/flatten those intervals.  
- Output/aggregate over the original input using the marked locations.