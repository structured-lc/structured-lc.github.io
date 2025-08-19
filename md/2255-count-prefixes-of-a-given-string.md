### Leetcode 2255 (Easy): Count Prefixes of a Given String [Practice](https://leetcode.com/problems/count-prefixes-of-a-given-string)

### Description  
Given a list of words and a string s, determine how many of the words are **prefixes** of s.  
A prefix is a substring that starts from the very first character of s and contains only consecutive characters.  
Count and return the number of words which are prefixes of s (not just unique; each occurrence is counted).

### Examples  

**Example 1:**  
Input: `words = ["a","b","c","ab","bc","abc"]`, `s = "abc"`  
Output: `3`  
Explanation: "a", "ab", and "abc" are prefixes of "abc".

**Example 2:**  
Input: `words = ["a","a"]`, `s = "aa"`  
Output: `2`  
Explanation: Both "a" and "a" are counted because each is a prefix.

**Example 3:**  
Input: `words = ["ap"], s = "abc"`  
Output: `0`  
Explanation: "ap" is not a prefix of "abc".

### Thought Process (as if you’re the interviewee)  
First, for each word in the list, I can check if the string s starts with that word — that’s a simple prefix check.  
The brute-force way is to check for each word if s[0:len(word)] == word, and count the matches.  
This is efficient because the constraints are small: words.length up to 1000, word length and s up to 10.

Python’s str.startswith can do this check in a clean way, but to stick to fundamentals, I’ll manually compare characters for interview clarity.

Since each check is independent and word lengths are tiny, further optimization is unnecessary.  
This is a typical direct string scan problem; we can solve it in O(n·m) time where n is the number of words and m is the max word length.

### Corner cases to consider  
- Empty `words` list: should return 0.
- Empty string `s`: unless word="" (empty string), no prefix matches are possible.
- `words` containing empty strings: empty string is always a prefix of any s.
- Duplicates in `words`: count every occurrence.
- `words` contains words longer than s: Never a valid prefix.
- s is a single character; test `words` of length 1 and greater.
- All elements in `words` are the same.

### Solution

```python
def count_prefixes(words, s):
    count = 0
    for word in words:
        # If the word is longer than s, it can't be a prefix
        if len(word) > len(s):
            continue

        # Assume it's a prefix
        is_prefix = True

        # Compare each character
        for i in range(len(word)):
            if word[i] != s[i]:
                is_prefix = False
                break

        if is_prefix:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n = len(words), m = average length of words.  
  For each word, we may need to compare all its characters with the matching prefix of s.
- **Space Complexity:** O(1) extra — no additional storage proportional to input size is used, only counters and flags.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of queries is very large and you need to handle many strings `s`?  
  *Hint: Pre-process the words list, or use a prefix tree (Trie) for fast repeated checks.*

- How would you modify the code if we wanted to count the number of **suffixes** of s?  
  *Hint: Use s.endswith(word) or compare from the end.*

- Can you return the **list of prefixes** found, not just the count?  
  *Hint: Collect qualifying words in a result list as you go, then return the list.*

### Summary
This problem is a classic example of string matching using a simple prefix scan.  
It utilizes the “string starts with” coding pattern, which is common in substring and tokenization problems.  
The approach is direct, efficient for small strings, and easily generalizes to related problems like suffix checks or substring searches.  
Patterns here are applicable in Trie/string-search problems, token scanning, and text preprocessing.

### Tags
Array(#array), String(#string)

### Similar Problems
- Check If a Word Occurs As a Prefix of Any Word in a Sentence(check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence) (Easy)
- Check If String Is a Prefix of Array(check-if-string-is-a-prefix-of-array) (Easy)
- Counting Words With a Given Prefix(counting-words-with-a-given-prefix) (Easy)