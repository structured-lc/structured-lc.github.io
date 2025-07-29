### Leetcode 1576 (Easy): Replace All ?'s to Avoid Consecutive Repeating Characters [Practice](https://leetcode.com/problems/replace-all-s-to-avoid-consecutive-repeating-characters)

### Description  
Given a string consisting only of lowercase English letters and the '?' character, replace every '?' with a lowercase letter so that the resulting string has no consecutive repeating characters. You may not modify any other characters. It's guaranteed there are no consecutive identical letters in the original except possibly due to '?'. You can return any valid solution.

### Examples  

**Example 1:**  
Input: `s = "?zs"`  
Output: `"azs"`  
*Explanation: The '?' at index 0 can be replaced by any letter except 'z', so 'a', 'b', ...,'y' all work here; only 'z' is invalid because it would make 'zzs' (repeat at the start).*  

**Example 2:**  
Input: `s = "ubv?w"`  
Output: `"ubvaw"`  
*Explanation: The '?' at index 3 can't be replaced by 'v' or 'w' as that would create 'vv' or 'ww'. Any other letter works.*  

**Example 3:**  
Input: `s = "??"`  
Output: `"ab"`  
*Explanation: Any two different letters are fine, such as 'ab', 'ba', etc.*  


### Thought Process (as if you’re the interviewee)  
To solve this, I would iterate through the string and whenever I find a '?', I will pick a letter (from 'a', 'b', 'c' for simplicity) that is *different* from its previous and next character (if any).

Why three letters are always enough: Since the alphabet is large and we only need to avoid matches with immediate neighbors (left and right), two letters would be enough unless both neighbors are different, but with three we never run out of options. Only the adjacent characters matter for the replacement at each position, so check those and pick any valid letter.

**Steps:**
- Convert string to a list for easier modification.
- Iterate over each character:
    - If not '?', continue.
    - If '?', check previous and next characters (if any), and choose a letter that doesn't match either.
- Join and return the modified list.

This is an O(n) solution, no extra space except the output.

### Corner cases to consider  
- All characters are '?'.
- '?' at the start or end of the string.
- Consecutive '?', e.g. 'a??b'.
- No '?'.
- Only one character, and it is '?'.

### Solution

```python
def modifyString(s: str) -> str:
    s = list(s)
    for i in range(len(s)):
        if s[i] == '?':
            for ch in 'abc':  # 'a', 'b', 'c'—enough for any situation
                # check previous and next character
                prev = s[i - 1] if i > 0 else ''
                nxt = s[i + 1] if i < len(s) - 1 else ''
                if ch != prev and ch != nxt:
                    s[i] = ch
                    break
    return ''.join(s)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We traverse the string once, with each '?' replacement taking O(1) (since we check at most three letters).
- **Space Complexity:** O(n) — Only for converting string to a list and storing the output.


### Potential follow-up questions (as if you’re the interviewer)  

- What if only the first k lowercase English letters are allowed?
  *Hint: What if k = 2? Is the solution always possible?*

- What if '?' can also appear consecutively for a long run, like '???'? Can we optimize the replacements in-place?
  *Hint: Try greedily assigning different letters in sequence.*

- What if the string is very large (10⁶+), how would you optimize for space?
  *Hint: Avoid list conversion, use array/memory mapping directly.*

### Summary
This problem applies a common greedy replacement pattern, where for each position we make a locally optimal choice (pick the first available letter not matching neighbors). The approach is linear and very efficient. This pattern is common in string and greedy problems where the choice at each index only depends on immediate neighbors.
