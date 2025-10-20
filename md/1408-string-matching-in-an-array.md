### Leetcode 1408 (Easy): String Matching in an Array [Practice](https://leetcode.com/problems/string-matching-in-an-array)

### Description  
Given an array of strings, return all strings from the array that are a substring of another string in the array. Duplicate strings in the input should be handled normally. The output can be returned in any order.

### Examples  
**Example 1:**  
Input: `["mass", "as", "hero", "superhero"]`  
Output: `["as","hero"]`  
*Explanation: "as" is a substring of "mass", and "hero" is a substring in "superhero".*

**Example 2:**  
Input: `["leetcode","et","code"]`  
Output: `["et","code"]`  
*Explanation: Both "et" and "code" are substrings of "leetcode".*

**Example 3:**  
Input: `["blue","green","bu"]`  
Output: `[]`  
*Explanation: None of the words are substrings of the others.*

### Thought Process (as if you’re the interviewee)  
First, for each word in the array, check if it is a substring of any other word (excluding itself). The brute-force way is to check every pair (i, j), for i ≠ j, and see if words[i] is in words[j]. For optimization, since the array size is small (≤ 100), this O(n²) solution is acceptable. To avoid duplicates, use a set to collect matching substrings.

### Corner cases to consider  
- Empty array input (output is empty).  
- Strings that appear more than once; should include each occurrence (not just unique).
- Overlapping substrings (e.g., "abc", "bca", "cab").
- Strings that are equal; self-matching is not allowed.

### Solution

```python
def stringMatching(words):
    res = []
    for i in range(len(words)):
        for j in range(len(words)):
            if i != j and words[i] in words[j]:
                res.append(words[i])
                break  # Found, no need to check further
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n² × m), where n = number of words, m = average word length. For each word, you check against all other words for substring.
- **Space Complexity:** O(n) for the result list, as at most all words could be included.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you optimize if input is very large?  
  *Hint: Consider using Trie or Suffix Array.*

- How to avoid extra space allocation?  
  *Hint: Return indices or modify in-place if permissible.*

- What if you want all pairs (i, j) such that words[i] is a substring of words[j]?  
  *Hint: You'll need to store and report all (i, j) combinations satisfying the condition.*

### Summary
This problem is a variant of the substring search pattern. The brute-force nested loop is acceptable for small input. This code shows how to implement clear pairwise substring checks common in interview string manipulation questions.


### Flashcard
Iterate through each word in the array, checking if it is a substring of any other word. Use a set to collect unique matching substrings.

### Tags
Array(#array), String(#string), String Matching(#string-matching)

### Similar Problems
- Substring XOR Queries(substring-xor-queries) (Medium)