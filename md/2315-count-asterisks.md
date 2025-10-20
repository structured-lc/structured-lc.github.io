### Leetcode 2315 (Easy): Count Asterisks [Practice](https://leetcode.com/problems/count-asterisks)

### Description  
Given a string **s** consisting of lowercase English letters, vertical bars `'|'`, and asterisks `'*'`, count the number of asterisks (`'*'`) **not** enclosed by any pair of vertical bars. A vertical bar pair consists of every two consecutive `'|'` in the string, and any characters (including `'*'`) between such a pair are considered enclosed and should not be counted.

### Examples  

**Example 1:**  
Input: `l|*e*et|c**o|*de|`  
Output: `2`  
*Explanation: There are two pairs of vertical bars: positions 1-7 (`|*e*et|`) and 9-12 (`|*de|`). The asterisks between each pair are not counted. Only the two asterisks between positions 8 and 9 (`c**o`) are outside pairs, so Output = 2.*

**Example 2:**  
Input: `iamprogrammer`  
Output: `0`  
*Explanation: There are no asterisks in the input string, so the answer is 0.*

**Example 3:**  
Input: `yo|uar|e**|b|e***au|tifu|l`  
Output: `5`  
*Explanation: The vertical bar pairs are: positions 2-6 (`|uar|`), 10-12 (`|b|`), and 17-22 (`|tifu|`). Only the five asterisks at positions 8, 9, 13, 14, 15 are outside all pairs and counted.*

### Thought Process (as if you’re the interviewee)  

Start by reading and understanding the grouping: pairs of vertical bars '|' define segments to **exclude** from counting.  
A *brute-force* approach would be to:  
- Track when we are **inside** or **outside** a pair of bars while traversing the string.  
- Only count asterisks when we are outside all bar pairs.

**Optimization:**  
- Use a simple flag (boolean) to mark if we are "inside bars".
- Flip the flag at each '|' encountered, since bars always appear in pairs.

This is optimal because we traverse the string once with O(1) extra state.

**Trade-off:**  
- The approach is simple and efficient (O(n)), as every character is processed only once, and no extra collections are needed.

### Corner cases to consider  
- No bars in the string (just count all asterisks).
- Odd number of bars (shouldn’t happen, but input might be malformed—LeetCode ensures valid input).
- Bars at the ends, overlapping pairs.
- Strings with no asterisks.
- Multiple consecutive asterisks or bars.

### Solution

```python
def countAsterisks(s: str) -> int:
    # res stores number of asterisks outside of bar-pairs
    res = 0
    # inside_bar tracks if we are currently inside a |...| pair
    inside_bar = False
    for ch in s:
        if ch == '|':
            inside_bar = not inside_bar  # toggle the inside_bar state
        elif ch == '*' and not inside_bar:
            res += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  *We visit each character in the string once. All other operations are O(1) per character.*
- **Space Complexity:** O(1)  
  *Only a few integer/boolean variables are used for state.*

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle nested bar pairs, if allowed?  
  *Hint: You might need a stack or counter rather than a simple boolean.*

- What if each pair can be unbalanced, i.e., odd number of bars?  
  *Hint: Validate input or enforce correct behavior for odd bars.*

- How would you count asterisks inside bars rather than outside?  
  *Hint: Just flip the counting condition (`if inside_bar`).*

### Summary
We applied the **stateful linear scan** (flag-tracking) approach—typical for string segment problems with delimiter pairs.  
This pattern is common in parsing and "between delimiters" substring counting, such as balanced parentheses, tags, or quotes.  
It's efficient, simple, and easily adaptable to similar string-processing tasks.


### Flashcard
Count '*' only outside pairs of '|'; toggle a flag at each '|' to track inclusion/exclusion.

### Tags
String(#string)

### Similar Problems
