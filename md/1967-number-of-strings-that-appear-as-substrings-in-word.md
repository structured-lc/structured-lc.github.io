### Leetcode 1967 (Easy): Number of Strings That Appear as Substrings in Word [Practice](https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word)

### Description  
Given a list of **patterns** (strings) and another string **word**, count how many strings in **patterns** appear as substrings anywhere inside **word**.  
You need to check each pattern and see if it can be found as a consecutive part (substring) of **word**.

### Examples  

**Example 1:**  
Input: `patterns = ["a","abc","bc","d"], word = "abc"`  
Output: `3`  
*Explanation: "a" is a substring of "abc", "abc" is a substring of "abc", and "bc" is a substring of "abc". "d" is not found. Total = 3.*

**Example 2:**  
Input: `patterns = ["a","b","c"], word = "aaaaabbbbb"`  
Output: `2`  
*Explanation: "a" and "b" are substrings of "aaaaabbbbb", but "c" does not appear.*

**Example 3:**  
Input: `patterns = ["xy","z","ab"], word = "xyz"`  
Output: `2`  
*Explanation: "xy" and "z" appear in "xyz" as substrings.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** For each pattern in the list, check if it appears as a substring within **word**.  
  This can be done simple using `pattern in word` for every pattern.
- Since patterns are typically short and **word** is not extremely large (per usual problem constraints), this approach will be efficient enough for the provided constraints.
- **Optimization**: If the number of patterns, or the length of patterns, or word was much larger, we could consider building a Trie of patterns and scan word once (Aho-Corasick), but this is not required for this problem’s simplicity.
- I choose the direct approach because it's highly readable, efficient enough, and matches what most interviewers expect for this level of question.

### Corner cases to consider  
- patterns is empty ⇒ should return 0.
- word is an empty string ⇒ only empty-string patterns would count as substrings.
- patterns contains duplicates (e.g. ["a", "a"]), both are checked separately, both counted if found.
- pattern is longer than word ⇒ can't be substring, so must not be counted.
- pattern is the empty string: by definition, the empty string is a substring of any string, including another empty string.

### Solution

```python
def numOfStrings(patterns, word):
    # Initialize a counter for valid substrings found
    count = 0
    # For each pattern in patterns, check if it appears as a substring in word
    for pattern in patterns:
        if pattern in word:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × L), where N = number of patterns and L = average length of pattern.  
  For each pattern, we use the substring search (in), which on average is O(len(word)).  
  Since patterns are usually small, and word length is moderate, this is efficient in practice.
- **Space Complexity:** O(1) extra space (ignoring input).  
  Only a counter variable is used as extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if **patterns** and **word** are both extremely large?
  *Hint: Look into a Trie or Aho-Corasick automaton for efficient multi-pattern searching.*

- What if we need to return the list of matching patterns, not just the count?
  *Hint: Instead of incrementing count, collect the matching patterns in a result array.*

- What if we are to count overlapping occurrences of each pattern?
  *Hint: For each pattern, look for all appearance positions inside word, not just if it appears once.*

### Summary
This problem uses the basic **substring search** or the “pattern matching” coding pattern—checking if any item exists inside a larger context.  
It’s a direct application of string containment and is a foundational check in text processing.  
Variants of this pattern appear in plagiarism checking, log scanning, and many string problems.  
For harder scenarios, the multi-pattern search can be solved efficiently by Trie-based or automaton-based approaches.


### Flashcard
For each pattern in patterns, check if pattern appears as substring in word using built-in substring search; count matches.

### Tags
Array(#array), String(#string)

### Similar Problems
