### Leetcode 1554 (Medium): Strings Differ by One Character [Practice](https://leetcode.com/problems/strings-differ-by-one-character)

### Description  
Given a list of strings (all the same length), determine if there exist two strings in the list that differ by exactly one character at the same index.

### Examples  

**Example 1:**  
Input: `words = ["abcd","acbd","aacd"]`  
Output: `True`  
*Explanation: "abcd" and "aacd" differ by one character at index 1 (b vs a).*

**Example 2:**  
Input: `words = ["abc","def","ghi"]`  
Output: `False`  
*Explanation: No two strings differ by exactly one character in same position.*

**Example 3:**  
Input: `words = ["aaa","baa","aba","aab"]`  
Output: `True`  
*Explanation: "aaa" and "baa" differ at index 0 (a vs b).*

### Thought Process (as if you’re the interviewee)  
Brute-force: Compare all pairs (O(n²)) and check character by character. But that's slow for large n.
Optimized: For each word and each index, replace the character at i with a wildcard (e.g. '_'), build a set of these masks. If any masked form repeats, two words exist that differ by only that character.
Iterate for each index (O(len × n)), and for each, build the masked string and check for collisions in a set.

### Corner cases to consider  
- All strings identical (should be False)
- Multiple candidates, need only one pair (any occurrence suffices)
- Short words (length = 1)
- Empty input (should be False)

### Solution

```python
def differByOne(words):
    seen = set()
    for i in range(len(words[0])):
        masks = set()
        for word in words:
            masked = word[:i] + '_' + word[i+1:]
            if masked in masks:
                return True
            masks.add(masked)
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(l × n), where l = length of string, n = number of words
- **Space Complexity:** O(n × l) worst case for masks

### Potential follow-up questions (as if you’re the interviewer)  
- What if you wanted to return the actual pair of strings?  
  *Hint: For each mask that repeats, lookup original words.*

- What if the strings can differ by more than one character?  
  *Hint: Use hamming distance/count non-matching characters.*

- Can you do it with less memory?  
  *Hint: Reuse set for the current index only; maybe not store all at once.*

### Summary
Classic near-duplicate (single-edit distance-1) detection by masking/rolling hash. Generalizes to typo-detection or spell-check, similar to trie masking.

### Tags
Hash Table(#hash-table), String(#string), Rolling Hash(#rolling-hash), Hash Function(#hash-function)

### Similar Problems
- Count Words Obtained After Adding a Letter(count-words-obtained-after-adding-a-letter) (Medium)