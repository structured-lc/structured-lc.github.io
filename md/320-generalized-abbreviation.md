### Leetcode 320 (Medium): Generalized Abbreviation [Practice](https://leetcode.com/problems/generalized-abbreviation)

### Description  
Given a word, generate all possible generalized abbreviations where any number of non-overlapping substrings are replaced by their respective lengths. For each character in the word, you can either keep the character as is, or abbreviate a substring of consecutive characters with the number of characters abbreviated. The order of the output does not matter. For example, "word" could be abbreviated as "w1rd" by replacing "o" with '1', or as "1ord" by replacing "w" with '1'.

### Examples  

**Example 1:**  
Input: `"word"`  
Output: `["word", "1ord", "w1rd", "wo1d", "wor1", "2rd", "w2d", "wo2", "1o1d", "1or1", "w1r1", "1o2", "2r1", "3d", "w3", "4"]`  
Explanation.  
Each abbreviation either replaces a substring by its length, or keeps characters. For instance, `"1ord"`: the 'w' is abbreviated (1), the rest are unchanged. `"w1rd"`: the 'o' is abbreviated (1), rest are unchanged, etc.

**Example 2:**  
Input: `"a"`  
Output: `["a", "1"]`  
Explanation.  
The single character can be left as is, or be abbreviated with '1'.

**Example 3:**  
Input: `""`  
Output: `[""]`  
Explanation.  
There is only one abbreviation for an empty string: itself.

### Thought Process (as if you’re the interviewee)  
First, notice that at each character, we have two choices:  
- Abbreviate one or more characters (increase current count of abbreviated chars).
- Keep the current character as is (append count, if any, then the character itself).

This binary choice at each character naturally suggests a **backtracking / recursion** approach:  
- As we walk through the string, track the current position, current building abbreviation, and how many characters have been abbreviated but not yet appended (to be appended *when* we keep the next char).
- When we reach the end of the word, flush any pending abbreviation count and add the result to the output.

Why not brute-force? Listing all substrings to replace would be more complex. Tracking per-character choices using recursion is much more elegant and systematic, and avoids duplicates. There are 2ⁿ possible abbreviations for a word with n characters, because every character can be either abbreviated or not.

### Corner cases to consider  
- The input string is empty: return `[""]`.
- The input string has one character: should return the character and the abbreviation.
- All characters same / all different: Ensure no accidental grouping of distinct abbrevs.
- Last character abbreviation: Pending abbreviation counts must be flushed at end.

### Solution

```python
def generateAbbreviations(word):
    result = []

    def backtrack(pos, cur, count):
        # If we've processed all characters
        if pos == len(word):
            # If any abbreviation count left, append it
            if count > 0:
                cur += str(count)
            result.append(cur)
            return
        # Option 1: Abbreviate this character
        backtrack(pos + 1, cur, count + 1)
        # Option 2: Keep this character
        new_cur = cur
        # If there was an abbreviation count, append it before the character
        if count > 0:
            new_cur += str(count)
        new_cur += word[pos]
        backtrack(pos + 1, new_cur, 0)

    backtrack(0, "", 0)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n), where n is the length of the word.  
  - There are 2ⁿ possible abbreviations (since each char is abbreviated or not).
  - Each result string can be up to size n, and operations for building and storing results also cost up to O(n).

- **Space Complexity:** O(2ⁿ × n) for the output list and the stack/temporary strings.  
  - The space to store all abbreviations is dominant.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large strings efficiently?
  *Hint: Can you generate abbreviations on-the-fly, or stream results with a generator instead of creating all at once?*

- What if you wanted only abbreviations of a certain length, or matching a pattern?
  *Hint: Add pruning logic to your backtrack calls, or pass additional filters as arguments.*

- How might the approach change if non-consecutive abbreviations were allowed (e.g., abbreviating only certain chosen positions)?
  *Hint: Adjust the backtracking branching to allow/forbid skips or skips of only certain lengths.*

### Summary
This problem follows a classic **recursion/backtracking** pattern, exploring all binary choices per character (abbreviate or not). This technique is broadly applicable for “all combinations” or “power set” styled problems, where the number of combinations is exponential, and each step can be modeled as an include/exclude decision. The main challenge is managing the abbreviation count (buffering it until a letter is appended), which is also common in substring and grouping problems.