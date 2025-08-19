### Leetcode 3081 (Medium): Replace Question Marks in String to Minimize Its Value [Practice](https://leetcode.com/problems/replace-question-marks-in-string-to-minimize-its-value)

### Description  
Given a string s consisting of lowercase English letters and `'?'`, replace all `'?'` characters with any lowercase English letter so that the total value of the string is minimized.  
The value is computed as follows:  
For every character at position i, the value increases by the count of occurrences of s[i] in the prefix s[0...i-1].  
Finally, if multiple strings achieve the minimal value, return the lexicographically smallest one among them.

### Examples  

**Example 1:**  
Input: `s = "a?b?a"`  
Output: `"aabae"`  
*Explanation: Replace the first `'?'` with `'a'` (so far, only 1 `'a'` on prefix), and the second `'?'` with `'e'` (no prior `'e'`). The value: 0 (first 'a') + 1 ('a' at index 1) + 0 ('b') + 0 ('a' at index 3) + 0 ('e') = 1. This is minimal and lex smallest.*

**Example 2:**  
Input: `s = "a??"`  
Output: `"abc"`  
*Explanation: Replace `'?'` with smallest unused letters ('b','c'). The cost: 0 ('a') + 0 ('b') + 0 ('c') = 0.*

**Example 3:**  
Input: `s = "???"`  
Output: `"abc"`  
*Explanation: All letters are `'?'`. Use distinct lowest letters to keep the value 0 and be lex smallest.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:** Try all possible combinations of replacements and calculate value for each. However, with up to 26 options per `'?'`, this is exponentially slow and infeasible.
- **Optimization idea:**  
  - To minimize the value, for every `'?'` encountered, always select the letter that has been used the fewest times so far (ideally zero). This way, each replacement does not add new repeated letters unless necessary.
  - To ensure lexicographical minimality, among the minimal frequency letters, always choose the lex smallest.
  - For each `'?'`, scan the frequency counter of all 26 letters, picking the best option.
  - Update the counter as you build the string from left to right.
- **Trade-offs:**  
  - Maintaining a frequency counter for each letter.
  - For each `'?'`, a potential O(26) scan to find the right letter.
  - Overall, efficient for reasonable string lengths.

### Corner cases to consider  
- All characters are `'?'` (should fill in `'a','b','c',...`).
- String contains no `'?'`.
- Adjacent `'?'` (make sure not to repeat).
- `'?'` at the beginning or end.
- Input is a single character (either `'?'` or a letter).
- Only one letter is present except for `'?'`.

### Solution

```python
def minimizeStringValue(s: str) -> str:
    # Frequency counter for prior letters
    freq = [0] * 26  # 26 lowercase English letters
    result = []
    
    for c in s:
        if c != '?':
            # If letter already known
            result.append(c)
            freq[ord(c) - ord('a')] += 1
        else:
            # For '?', pick the letter with minimum freq (break ties by lex order)
            min_freq = min(freq)
            chosen = -1
            for idx in range(26):
                if freq[idx] == min_freq:
                    chosen = idx
                    break  # smallest lex
            result.append(chr(ord('a') + chosen))
            freq[chosen] += 1

    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(26 × n), where n = len(s). For each `'?'`, we scan 26 letters (constant), so overall linear.
- **Space Complexity:** O(1), since frequency counter is always of size 26, independent of input length. The output string uses O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if s length is much greater than 26? Can we optimize further?  
  *Hint: Is it possible to find the next letter with minimal frequency in sub-O(26) time?*
  
- Suppose only vowels/consonants can be used for replacement, how would you modify the approach?  
  *Hint: Adjust the candidates for replacement in the frequency array.*

- If we need to output the minimal value instead of the resulting string, what should we change?  
  *Hint: Update to maintain and return the accumulated value rather than the string reconstruction.*

### Summary
This problem uses the greedy pattern: at every `'?'`, replace with the lowest frequency letter (ensuring lexicographical order among ties), to minimize running cost as defined by prefix matches.  
It's a variant of the greedy "replace/assign to minimize global cost" pattern—appearing in problems like rearrangement, string construction, and lexicographically minimal transformations.

### Tags
Hash Table(#hash-table), String(#string), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Counting(#counting)

### Similar Problems
- Lexicographically Smallest String After Substring Operation(lexicographically-smallest-string-after-substring-operation) (Medium)