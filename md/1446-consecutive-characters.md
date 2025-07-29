### Leetcode 1446 (Easy): Consecutive Characters [Practice](https://leetcode.com/problems/consecutive-characters)

### Description  
Given a string `s`, return the length of the longest substring containing only a single repeating character. For example, in `"abbcccddddeeeeedcba"`, the longest run is `'eeeee'`, which has length 5.

### Examples  

**Example 1:**  
Input: `s = "leetcode"`
Output: `2`
*Explanation: The longest run is "ee".*

**Example 2:**  
Input: `s = "abbcccddddeeeeedcba"`
Output: `5`
*Explanation: The longest run is "eeeee".*

**Example 3:**  
Input: `s = "triplepillooooow"`
Output: `5`
*Explanation: The longest run is "ooooo".*

### Thought Process (as if you’re the interviewee)  
Iterate through the string, keep a count of the current consecutive character sequence, and track the maximum as we go. If the current character matches the previous one, increment the count; otherwise, reset to 1.
This is a simple linear pass with a few variables.

### Corner cases to consider  
- Empty string input (should return 0).
- All characters are unique.
- The entire string is made of one repeating character.
- String of length 1.

### Solution

```python
def maxPower(s: str) -> int:
    if not s:
        return 0
    max_len = 1
    cur_len = 1
    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            cur_len += 1
            max_len = max(max_len, cur_len)
        else:
            cur_len = 1
    return max_len
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is length of `s` (single scan through the string).
- **Space Complexity:** O(1), only uses a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify to return the actual substring, not just the length?
  *Hint: Track start/end indices when updating max.*

- How can this be adapted to return all longest runs if there are ties?
  *Hint: Collect substrings into an array when updating max.*

### Summary
This is a classic sliding window / run-length problem with a linear scan. This pattern is useful for consecutive element detection, string runs, and basic sequence analysis.