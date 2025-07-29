### Leetcode 796 (Easy): Rotate String [Practice](https://leetcode.com/problems/rotate-string)

### Description  
Given two strings, `s` and `goal`, determine if `goal` can be obtained by rotating `s` any number of times, where a "rotation" means moving the leftmost character of `s` to the rightmost position in each step. You should return `true` if such a rotation exists; otherwise, return `false`.

### Examples  

**Example 1:**  
Input=`"abcde"`, `"cdeab"`  
Output=`true`  
Explanation: If we rotate "abcde" three times (move 'a', then 'b', then 'c' to the end), the string becomes "cdeab".

**Example 2:**  
Input=`"abcde"`, `"abced"`  
Output=`false`  
Explanation: No number of rotations will turn "abcde" into "abced".

**Example 3:**  
Input=`""`, `""`  
Output=`true`  
Explanation: Empty strings are trivially rotated versions of each other.

### Thought Process (as if you’re the interviewee)  
First, I’d check if the two strings are the same length; if not, return `false` immediately.  
The brute-force approach would be to try every possible rotation (from 0 up to length-1), generate the rotated string, and check for equality with `goal`. This works but is inefficient for large strings.  
A smarter approach is to realize that any rotated version of `s` must be a substring of `s+s`. For example, if `s = "abcde"`, then `s+s = "abcdeabcde"`; all possible rotations ("bcdea", "cdeab", etc.) appear in this doubled string. So, if `goal` is a substring of `s+s`, it is a valid rotation.  
This approach is efficient and concise, leveraging the property that doubling a string contains all its rotated forms as substrings.

### Corner cases to consider  
- Both strings are empty (trivially a rotation).
- Strings of different lengths (impossible to be rotations).
- Goal is already equal to `s` (zero rotations required).
- Large strings (efficiency matters, avoid brute force).
- All characters the same (e.g., `"aaa"`, `"aaa"`).
- Repeated patterns (e.g., `"aabaab"`, `"abaaba"`).

### Solution

```python
def rotateString(s: str, goal: str) -> bool:
    # First, check if the lengths match.
    if len(s) != len(goal):
        return False
    # Concatenate s with itself. Any rotation of s is a substring of s+s.
    return goal in (s + s)

    # No extra libraries are used, matching interview constraints.
```

```
Tree representation for the rotated string example (not directly helpful for this problem, but for visualization):

      rotate(s, k) → take first k chars to the end
      Example: rotate("abcde", 3) → "deabc"
      "abcde" → "bcdea" → "cdeab" → "deabc"
```

### Time and Space complexity Analysis  
**Time Complexity:** O(n²) in the worst case because checking for a substring in `s+s` (of length 2n) using naive string matching is O(n²). However, in practice, many languages (including Python) use optimizations, but it’s important to clarify this in an interview setting.  
**Space Complexity:** O(n) because we create `s+s`, which is twice the size of `s`. There’s no recursion and only a constant amount of extra storage beyond the input and the doubled string.

### Potential follow-up questions (as if you’re the interviewer)  
How would you solve this if you could not concatenate the strings for memory reasons?  
Hint: Can you find the starting index of the rotation by matching characters?  
How would your approach change if the strings could contain Unicode (non-ASCII) characters?  
Hint: The core logic remains the same, but ensure equality and containment checks are Unicode-aware.  
Can you name some real-world scenarios where this kind of rotation occurs?  
Hint: Think about log file rotation, or data streams that wrap around a circular buffer.

### Summary  
This problem teaches a common pattern: checking whether a string is a rotation of another by verifying if it is a substring of the concatenation of the original string with itself. This is efficient, readable, and avoids the need to generate all rotations explicitly.  
This technique is useful in circular buffer checks, log rotation detection, and similar problems involving circular or periodic data structures.