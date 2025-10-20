### Leetcode 14 (Easy): Longest Common Prefix [Practice](https://leetcode.com/problems/longest-common-prefix)

### Description  
Given an array of strings, return the longest starting substring (prefix) that is present in **all** the strings. If no such common prefix exists, return an empty string. For instance, if every word starts with the same set of letters, return those letters; if they diverge at the very first character, return "" (empty string). The function should efficiently find this prefix even as the array size or string length grows.

### Examples  

**Example 1:**  
Input: `["flower","flow","flight"]`  
Output: `"fl"`  
*Explanation: All words share "fl" as their starting characters; the next letters diverge ("o" vs "i"), so "fl" is the answer.*

**Example 2:**  
Input: `["dog","racecar","car"]`  
Output: `""`  
*Explanation: Every string starts with a different letter ("d", "r", "c"), so there is no shared prefix.*

**Example 3:**  
Input: `["interspecies","interstellar","interstate"]`  
Output: `"inters"`  
*Explanation: All strings start with "inters", but diverge at the next character.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify that we’re looking for the common **beginning** substring among all strings, not any shared substring anywhere in the strings.

#### Brute-force idea:
- Start from the first string.
- For each possible prefix of that string (from 1 character up to its full length), check if every other string starts with this prefix.
- If all match, continue growing the prefix; as soon as any string fails, return the prefix collected so far.
- This is inefficient since it can repeatedly scan all strings and recalculates information.

#### Optimized idea:
- Since prefixes must start at position 0, we can check character by character—compare every string at index 0, then 1, and so on.
- The process halts at the first mismatch or if any string runs out of characters.
- In **python**, a horizontal or vertical scanning approach works: iterate over each position of the *shortest* string and ensure all strings share that letter there.
- **Why this approach?** It only does as much work as needed and never checks indices that can’t be possible in all strings (since no prefix can be longer than the shortest string in the array).

### Corner cases to consider  
- Empty input list: `[]` → Output is `""`
- List with one string: `["abc"]` → Output is `"abc"`
- Some strings are empty: `["","abc"]` → Output is `""`
- All strings are identical: `["test","test","test"]` → Output is `"test"`
- No common prefix at all: `["a","b","c"]` → Output is `""`
- Case sensitivity: `["Abc","abc"]` → Output is `""`
- Strings with mixed lengths

### Solution

```python
def longestCommonPrefix(strs):
    if not strs:
        return ""
    
    # Use the first string as the baseline
    for i in range(len(strs[0])):
        char = strs[0][i]
        for s in strs[1:]:
            # If we reach end of any string, or characters differ, return prefix up to this point
            if i == len(s) or s[i] != char:
                return strs[0][:i]
    # All strings matched the first string's length
    return strs[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)
  - `n` = number of strings
  - `m` = length of the **shortest** string (worst case: all equal)
  - Because for each position up to shortest string, we may need to compare that character in every string.
- **Space Complexity:** O(1)
  - Only a constant amount of extra space is used (besides the input and output). No extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large input (gigabytes of strings)?
  *Hint: Can you process character by character, possibly reading from a stream?*
- How would you adapt this problem for Unicode or non-ASCII characters?
  *Hint: Make sure comparison accounts for multibyte characters and normalization/locale.*
- What if strings are so long that storing them in memory isn't possible?
  *Hint: Consider using iterators/generators and compare character by character.*

### Summary
This problem uses the **prefix scanning** pattern, where you repeatedly check a condition across multiple items and gradually narrow the candidate space. It’s often applied in string search, file path grouping, and directory tree processing. The character-by-character comparison is efficient, direct, and works well for small and moderate data sizes. This pattern is a classic in coding interviews and has practical applications in text processing and search autocompletion.


### Flashcard
Compare characters at each position across all strings; return the prefix up to the first mismatch.

### Tags
Array(#array), String(#string), Trie(#trie)

### Similar Problems
- Smallest Missing Integer Greater Than Sequential Prefix Sum(smallest-missing-integer-greater-than-sequential-prefix-sum) (Easy)
- Find the Length of the Longest Common Prefix(find-the-length-of-the-longest-common-prefix) (Medium)
- Longest Common Suffix Queries(longest-common-suffix-queries) (Hard)
- Longest Common Prefix After at Most One Removal(longest-common-prefix-after-at-most-one-removal) (Medium)