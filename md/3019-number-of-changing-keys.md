### Leetcode 3019 (Easy): Number of Changing Keys [Practice](https://leetcode.com/problems/number-of-changing-keys)

### Description  
You are given a 0-indexed string `s` representing keys pressed by a user while typing a text. Each character in `s` corresponds to one key press. Switching between different keys counts as a "change," but **changing the key’s case (i.e., between uppercase and lowercase of the same letter, due to shift/caps lock)** does *not* count as a change.  
You need to return the number of times the user **actually changed** the key pressed (ignoring shifts in letter case).

### Examples  

**Example 1:**  
Input: `s = "aAbBcC"`  
Output: `2`  
*Explanation:  
s="a" to s[1]="A": no key change (same letter, different case)  
s[1]="A" to s[2]="b": key change  
s[2]="b" to s[3]="B": no key change  
s[3]="B" to s[4]="c": key change  
s[4]="c" to s[5]="C": no key change*  

**Example 2:**  
Input: `s = "AaAaAaaA"`  
Output: `0`  
*Explanation:  
All presses are for 'a' or 'A' (same letter, only case differs); no key change.*  

**Example 3:**  
Input: `s = "qwertyQWERTY"`  
Output: `5`  
*Explanation:  
s='q' to s[1]='w': key change  
s[1]='w' to s[2]='e': key change  
s[2]='e' to s[3]='r': key change  
s[3]='r' to s[4]='t': key change  
s[4]='t' to s[5]='y': key change  
s[5]='y' to s='Q': key change  
However, since 'y' and 'Q' are different letters, all these transitions (except those between identical letter case) count. Result: 5*  

### Thought Process (as if you’re the interviewee)  
- First, I’ll traverse the input string from index 1 to the end.
- For each character, I’ll compare it to the previous one, but considering them both in lowercase (so 'A' and 'a' are considered the same).
- If the current character (lowercased) differs from the previous (lowercased), that means the user had to change the key.
- I’ll increment a counter every time such a change happens.
- This approach works in O(n) time, which is optimal for a single scan of the string, and O(1) space.
- Edge cases: single-letter strings should result in 0 (no changes possible).

### Corner cases to consider  
- Empty string: should return 0 (no key pressed, no change)
- Single character: return 0 (no prior key to compare against)
- All same letter (regardless of case): return 0
- Alternating between two different letters (case-insensitive): should count each switch
- Mixed case changes only: not counted
- Large strings: should still work efficiently

### Solution

```python
def countKeyChanges(s: str) -> int:
    # If string is empty or has only one character, no key change can occur
    if not s or len(s) == 1:
        return 0

    # Initialize a counter for key changes
    changes = 0

    # Traverse from the second character to the end
    for i in range(1, len(s)):
        # If current and previous differ (disregard case), increment
        if s[i].lower() != s[i - 1].lower():
            changes += 1

    return changes
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We scan the string once, and each comparison is O(1).
- **Space Complexity:** O(1)  
  Only a fixed number of variables are used; we do not use any additional data structures that scale with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle non-alphabetic keys (digits, symbols)?  
  *Hint: Should you normalize their case?*

- What if the key layout or mapping was different (e.g., custom keyboard layouts)?  
  *Hint: Think about providing a mapping function or lookup table.*

- Can you optimize this further if the string is immutable and can be preprocessed?  
  *Hint: Try to preprocess and store information for multiple queries.*

### Summary
The approach uses a sliding comparison with normalization (lowercasing) to count changes efficiently—classic pattern for counting changes or transitions in a sequence.  
This method is broadly useful wherever you need to count distinct runs, or transitions, in sequences, such as run-length encoding, word segmentation, or tracking changes in state sequences.


### Flashcard
Number of Changing Keys (Easy)

### Tags
String(#string)

### Similar Problems
