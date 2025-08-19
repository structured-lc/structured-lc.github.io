### Leetcode 2942 (Easy): Find Words Containing Character [Practice](https://leetcode.com/problems/find-words-containing-character)

### Description  
Given an array of strings (indexed from 0) and a target character `x`, return a list of indices for all words in the array which contain `x`. The output indices can be in any order.  
You are to check each word: if it contains character `x`, include that word’s index in the result.

### Examples  

**Example 1:**  
Input: `words=["leet","code"]`, `x="e"`  
Output: `[0,1]`  
*Explanation: Both "leet" and "code" contain the letter 'e', so their indices 0 and 1 go into the output.*

**Example 2:**  
Input: `words=["abc","bcd","aaaa","cbc"]`, `x="a"`  
Output: `[0,2]`  
*Explanation: "abc" at index 0 and "aaaa" at index 2 both contain 'a'. The indices 0 and 2 are included.*

**Example 3:**  
Input: `words=["abc","bcd","aaaa","cbc"]`, `x="z"`  
Output: `[]`  
*Explanation: None of the words contain 'z', so the output is an empty list.*

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to loop through each word and check if the character `x` appears anywhere in it. If so, store that word's index.
- We could use Python’s `in`, Java’s `contains`, or C++'s `find` to check presence of a character.
- No need for optimization, as the problem is simple and direct: a single pass through the list is enough.
- This approach is clean, simple, and optimal for this scenario since all words must be checked, and early exit isn't possible unless you find all possible indices.

### Corner cases to consider  
- `words` is empty → should return `[]`.
- No word contains `x` → should return `[]`.
- All words contain `x` → output is all indices.
- Case sensitivity: 'a' ≠ 'A'.
- `x` is not a lowercase/uppercase English letter (what if digits, symbols?; check constraints on LeetCode).
- Words with length zero (`""`)—should be skipped since they contain no characters.
- Single-word array.

### Solution

```python
def findWordsContaining(words, x):
    # Prepare a result list for the output indices
    res = []
    # Enumerate through the list: gives both index and word
    for i, word in enumerate(words):
        # Check if character x is present in current word
        if x in word:
            res.append(i)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × L),  
  where N is the number of words and L is the average length of a word.  
  For each word, we may check up to all L characters to find x (in the worst case, if x is at the end or not present).
- **Space Complexity:** O(k),  
  where k is the number of resulting indices (no extra data structures except output).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the character x can be a string (substring) instead of a single character?  
  *Hint: How would you change your membership condition from character in word to substring in word?*

- How would you make this work if the words list is very large and cannot fit in memory?  
  *Hint: Can you process each word as a stream and incrementally collect results?*

- If you had to return the indices sorted in decreasing order, how would you change your solution?  
  *Hint: Store indices as before, then sort the output descending.*

### Summary

This problem is a classic example of a **"filter by condition" over a list**, and the coding pattern is "enumerate with filter."  
The approach—iterate through all items, collect indices that match a condition—is a fundamental list-processing technique, useful whenever filtering indices based on content or properties. Similar logic can be applied to searching substrings, filtering lists of numbers by conditions, and more.

### Tags
Array(#array), String(#string)

### Similar Problems
- Find Target Indices After Sorting Array(find-target-indices-after-sorting-array) (Easy)