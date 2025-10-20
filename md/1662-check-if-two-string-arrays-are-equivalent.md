### Leetcode 1662 (Easy): Check If Two String Arrays are Equivalent [Practice](https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent)

### Description  
Given two string arrays, **word1** and **word2**, determine if they represent the same string. Each array represents a string by concatenating its elements in order. Return `True` if both arrays form the same string after concatenation, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `word1 = ["ab", "c"], word2 = ["a", "bc"]`  
Output: `True`  
*Explanation: "ab" + "c" = "abc", "a" + "bc" = "abc". Both form "abc".*

**Example 2:**  
Input: `word1 = ["a", "cb"], word2 = ["ab", "c"]`  
Output: `False`  
*Explanation: "a" + "cb" = "acb", "ab" + "c" = "abc". Not equal.*

**Example 3:**  
Input: `word1 = ["abc", "d", "defg"], word2 = ["abcddefg"]`  
Output: `True`  
*Explanation: Both form "abcddefg" after concatenation.*


### Thought Process (as if you’re the interviewee)  
The most straightforward way is to concatenate the strings in both arrays and compare the results. If they are equal, return True. Otherwise, return False. 

A slightly more space-efficient (and interview-friendly) approach would be to use iterators to scan both arrays in parallel, comparing character-by-character without building the full strings; this is only necessary if constraints demand better space optimization, but concatenation is perfectly fine given the limits (all sizes up to 10³).

### Corner cases to consider  
- Arrays with empty strings as elements: e.g., `["", "abc"]` vs `["a", "b", "c"]`
- Arrays of different lengths but same total string: `["ab", "c"]` vs `["a", "bc"]`
- Arrays where one is a single long string, the other is many short ones
- Arrays with all elements empty: `[""]` vs `[""]`, should return True

### Solution

```python
def arrayStringsAreEqual(word1, word2):
    # Concatenate all strings in word1 and word2
    s1 = ''.join(word1)
    s2 = ''.join(word2)
    # Compare the resulting strings
    return s1 == s2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N = total characters in word1, M = total characters in word2 (as we must process all chars to concatenate and compare).
- **Space Complexity:** O(N + M), as new concatenated strings are created for both arrays.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if you were not allowed to concatenate the strings (i.e., O(1) extra space)?  
  *Hint: Consider pointers or iterators to compare each character of the arrays as you traverse them.*

- What if the arrays are extremely large (streaming input), and you can only process one element at a time?  
  *Hint: Single-pass, character-by-character comparison using generators or iterators.*

- If only ASCII comparison is allowed (no Unicode)?  
  *Hint: The algorithm doesn’t change for ASCII, just ensure no non-ASCII values present.*

### Summary
This problem is a classic example of **string concatenation and comparison**, which is a common array and string-processing pattern. The solution uses the join pattern but can be adapted to a two-pointer or iterator-based approach for efficiency in space-constrained or streaming contexts.


### Flashcard
Concatenate both string arrays and compare results for equality; for space optimization, compare character-by-character with iterators.

### Tags
Array(#array), String(#string)

### Similar Problems
- Check if an Original String Exists Given Two Encoded Strings(check-if-an-original-string-exists-given-two-encoded-strings) (Hard)