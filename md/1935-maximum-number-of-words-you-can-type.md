### Leetcode 1935 (Easy): Maximum Number of Words You Can Type [Practice](https://leetcode.com/problems/maximum-number-of-words-you-can-type)

### Description  
You are given a string `text`, which contains words separated by single spaces (with no leading or trailing spaces), and a string `brokenLetters`, representing keys that do not work on a malfunctioning keyboard. Each character in `brokenLetters` is distinct and lowercase.  
Return the **number of words in `text` that can be fully typed** without needing any of the broken letters (i.e., the ones that do not have any character present in `brokenLetters`).  

### Examples  

**Example 1:**  
Input: `text = "hello world", brokenLetters = "ad"`  
Output: `1`  
*Explanation: Only "hello" can be typed. "world" requires the letter 'd', which is broken.*

**Example 2:**  
Input: `text = "leet code", brokenLetters = "lt"`  
Output: `1`  
*Explanation: "leet" can't be typed due to 'l' and 't'. Only "code" can be fully typed.*

**Example 3:**  
Input: `text = "leet code", brokenLetters = "e"`  
Output: `0`  
*Explanation: Both words have the letter 'e', so neither can be typed.*

### Thought Process (as if you’re the interviewee)  
First, break the `text` string into a list of words using split on spaces.  
For each word, check if **any** letter of the word is present in `brokenLetters`:
- If yes, this word can't be typed, so skip it.
- If not, increment your count.

To make the letter lookup efficient, convert `brokenLetters` into a set.  
Brute-force would be to check for each letter of each word if it is in `brokenLetters` (O(n×k), n = words, k = average length).  
This is optimal for the input constraints, since set lookup is O(1).  

### Corner cases to consider  
- `brokenLetters` is empty: **All words are typable.**
- All letters in a word are in `brokenLetters`: **Word is not typable.**
- `text` is a single word.
- All words are not typable (output is 0).
- No letters in text correspond to any in `brokenLetters` (output is len(words)).
- Words with repeated letters: check each unique letter.
- `brokenLetters` contains letters not present in any word (should not affect the result).

### Solution

```python
def canBeTypedWords(text: str, brokenLetters: str) -> int:
    # Convert brokenLetters to a set for O(1) lookups
    broken = set(brokenLetters)
    # Split text into words
    words = text.split(' ')
    # Initialize count for typable words
    res = 0
    for word in words:
        # If none of the letters in word are broken, count it
        if all(letter not in broken for letter in word):
            res += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of letters in `text`. Each letter in each word is checked at most once.
- **Space Complexity:** O(M), where M is the number of broken letters (at most 26), and words array holds O(W), with W = number of words.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to **return the list of typable words** not just the count?  
  *Hint: Build and collect those words in a result array instead of counting only.*

- What if `brokenLetters` is **very long** (e.g., thousands of characters)?  
  *Hint: Use a more memory-efficient data structure than a set, e.g., a bitmask.*

- What if you cannot use extra space at all (in-place solution)?  
  *Hint: Try to process words on the fly, perhaps via index pointers instead of creating the words list.*

### Summary
This problem uses the **string parsing + set lookup pattern** to filter out untypable words efficiently.  
The main pattern here is **word-level filtering with character exclusion**, which recurs in problems about keyboard input validation, spell checking, or text-based input restrictions.  
This logic can be adapted to situations where you need to filter, validate, or count elements that *can't* have any forbidden characters/values.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
