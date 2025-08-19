### Leetcode 1684 (Easy): Count the Number of Consistent Strings [Practice](https://leetcode.com/problems/count-the-number-of-consistent-strings)

### Description  
Given a string `allowed` containing distinct characters, and an array of strings `words`, return the number of words in `words` that are **consistent**. A word is consistent if *all* its characters are in the string `allowed`.

### Examples  
**Example 1:**  
Input: `allowed = "ab"`, `words = ["ad","bd","aaab","baa","badab"]`  
Output: `2`  
*Explanation: Only "aaab" and "baa" contain only 'a' and 'b'.*

**Example 2:**  
Input: `allowed = "abc"`, `words = ["a","b","c","ab","ac","bc","abc"]`  
Output: `7`  
*Explanation: Every word uses only 'a', 'b', 'c'.*

**Example 3:**  
Input: `allowed = "cad"`, `words = ["cc","acd","b","ba","bac","bad","ac","d"]`  
Output: `4`  
*Explanation: Consistent words are "cc", "acd", "ac", "d".*

### Thought Process (as if you’re the interviewee)  
First, we should convert `allowed` into a set of allowed characters for O(1) lookup. Then, for each word in `words`, check every character—if any character isn’t in `allowed`, that word is inconsistent. Increment a counter for each consistent word.
- Brute force: For each word, check all its characters — works because both the lengths are small.
- Optimization: Build a set for `allowed` for fast lookup.
- Alternate: Could use bitmask, but for interview this set-based solution is clear, readable, and efficient.

### Corner cases to consider  
- `words` is empty — should return 0.
- `allowed` contains all lowercase letters — all words will be consistent.
- Words with repeated characters, all of which are in `allowed`.
- Empty string as a word — should be considered consistent.

### Solution

```python
def countConsistentStrings(allowed, words):
    allowed_set = set(allowed)  # characters that are allowed
    count = 0
    for word in words:
        if all(ch in allowed_set for ch in word):
            count += 1
    return count
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N × K) — N=len(words), K=max length of a word. Every character in every word checked once.
- **Space Complexity:** O(1) — The set of allowed chars takes at most 26 chars (for lowercase alphabet). No extra space grows with input size.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you make your solution faster with bit manipulation?  
  *Hint: Map characters to bits and compare masks for each word.*

- Return not only number, but the list of consistent words?  
  *Hint: Collect words instead of just counting.*

- What if allowed or words can be very large or Unicode?  
  *Hint: Consider scalability and possible character space growth.*

### Summary
This solution uses the **set lookup pattern**: convert constraints to a set for fast membership checks, and filter the main list accordingly. Applicable for string constraint filtering problems and membership validation.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Bit Manipulation(#bit-manipulation), Counting(#counting)

### Similar Problems
- Count Pairs Of Similar Strings(count-pairs-of-similar-strings) (Easy)