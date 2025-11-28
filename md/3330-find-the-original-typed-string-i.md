### Leetcode 3330 (Easy): Find the Original Typed String I [Practice](https://leetcode.com/problems/find-the-original-typed-string-i)

### Description  
Alice is typing a string on her computer, but she might accidentally hold down a key, causing a character to repeat multiple times — but this "held key" accident can happen at most once in the whole string.  
Given the final string (`word`) shown on the screen, return the number of possible original strings Alice might have intended to type. Each possibility is due to a group of consecutive identical letters that could have resulted from such a mistake; for each such group, you can remove some of the duplicates (down to 1 occurrence), and Alice could have typed the string correctly with no mistake as well.

### Examples  

**Example 1:**  
Input: `word = "abbcccc"`  
Output: `5`  
*Explanation: Possible original strings: `'abbcccc'`, `'abbccc'`, `'abbcc'`, `'abbc'`, `'abcccc'`.*

**Example 2:**  
Input: `word = "abcd"`  
Output: `1`  
*Explanation: No repeated characters, so only `'abcd'` could be original.*

**Example 3:**  
Input: `word = "aaaa"`  
Output: `4`  
*Explanation: Possible original strings: `'aaaa'`, `'aaa'`, `'aa'`, `'a'`.*

### Thought Process (as if you’re the interviewee)  
First, let's clarify: Alice could have made the "held key" mistake at most once, so only one group of consecutive repeated letters can be shortened.  
To find all possible original strings:
- For each group of consecutive identical characters, record the length.
- For each such group, imagine it is the "mistake"; for a group of length L, there are L possibilities (keeping between 1 and L of the letter, with one of those possibilities representing the 'no mistake anywhere' scenario).
- Only one group can be shortened (or none), so walk through the string and for each group, the number of possible originals is simply the sum over all groups with length L of (L-1) + 1 (for the correct typing).
- A more direct approach: The answer is 1 (for "no mistake") plus the sum, for each group of identical letters with length L > 1, of (L-1) (the possible shortenings within that group).
- Or, more simply: answer = number of consecutive repeated letters in the string + 1.

Final approach:
- Initialize answer = 1.
- Walk over the string; for each pair of consecutive identical characters, increment answer.
- Time/space are both efficient.

### Corner cases to consider  
- The input string is a single character.  
- The input string has no repeated characters.  
- All characters are the same.  
- Multiple "groups" of repeated characters, but mistake can only apply to one group.  
- Empty string (but per constraints, length ≥ 1).

### Solution

```python
def possibleStringCount(word: str) -> int:
    # There is always at least 1 possible original (no mistake anywhere).
    ans = 1

    # Iterate through the word, compare each char with the previous one.
    for i in range(1, len(word)):
        if word[i] == word[i - 1]:
            # Each additional repeat gives a new possibility
            ans += 1

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(word), since we scan the string once.
- **Space Complexity:** O(1), only a constant amount of extra storage (the counter).

### Potential follow-up questions (as if you’re the interviewer)  

- What if Alice could have held a key for too long multiple times in different groups?  
  *Hint: Try to count for each group, independently, all possible ways to shorten each group and take the product of counts.*

- What if you had to generate all possible original strings, not just count them?  
  *Hint: Build a set of strings by generating the possible reductions for each group — but only for one group at a time.*

- How would the solution change if the input string could contain uppercase and lowercase letters mixed?  
  *Hint: Make sure your comparisons are case sensitive, if that is required.*

### Summary
This problem uses a classic **string traversal** and *adjacent grouping* pattern: scan for runs of repeated characters and count their implications. Such patterns show up in problems involving character groups, substrings, or typo corrections. The answer logic — "number of places where consecutive characters are the same + 1" — is a direct application of this scan-and-count pattern, making it both optimal and easy to understand.


### Flashcard
For each group of consecutive identical characters, try treating it as the "held key" mistake; generate all possible original strings by varying that group's length from 1 to its current length.

### Tags
String(#string)

### Similar Problems
- Keyboard Row(keyboard-row) (Easy)
- Faulty Keyboard(faulty-keyboard) (Easy)