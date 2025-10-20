### Leetcode 1957 (Easy): Delete Characters to Make Fancy String [Practice](https://leetcode.com/problems/delete-characters-to-make-fancy-string)

### Description  
Given a string s, you are to transform it into a "fancy string".  
A string is fancy if it **does not** contain any group of three or more consecutive identical characters.  
Your task: **Delete the minimum number of characters from s so that it becomes fancy.**  
Return the final fancy string.  
(Simply put: no character may appear three or more times in a row.)

### Examples  

**Example 1:**  
Input: `s = "aaabaaaa"`  
Output: `"aabaa"`  
*Explanation: We remove the third 'a' and two consecutive 'a's from the end. The result "aabaa" has no three repeating characters in a row.*

**Example 2:**  
Input: `s = "aabbcc"`  
Output: `"aabbcc"`  
*Explanation: No three consecutive identical letters, so the string is already fancy.*

**Example 3:**  
Input: `s = "aabbbbbccde"`  
Output: `"aabbccde"`  
*Explanation: Remove three 'b's in the middle. Final string: "aabbccde".*

### Thought Process (as if you’re the interviewee)  
I want a fancy string with no three consecutive identical characters.  
- **Brute-force:** Try all ways to remove characters until no such triple appears. This is too slow.
- **Greedy approach:**  
  - As I iterate through s, **append each character to the result only if the last two characters are not both the same as the current one**.
  - If the last two are the same as the current, skip adding this character.
- This checks for three-in-a-row and avoids them. It is a classic use of a sliding window or greedy check.
- I choose this approach because it’s **O(n)** time and only requires a list for the result—very efficient.  
- Trade-off: Could optimize space to O(1) with in-place overwrite, but O(n) extra is fine for interview.

### Corner cases to consider  
- Empty string: should return an empty string.
- String length 1 or 2: always fancy, so return as-is.
- All identical characters, e.g., "aaaaaa": should reduce to only two characters ("aa").
- Already fancy: input unchanged.
- Interleaved patterns, e.g., "abababab": unchanged.
- Unicode or non-standard characters.

### Solution

```python
def makeFancyString(s: str) -> str:
    # Result list to build the fancy string
    res = []
    for c in s:
        # If we already have at least two characters, and both are equal to current, skip adding
        if len(res) >= 2 and res[-1] == c and res[-2] == c:
            continue
        res.append(c)
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s), since each character is visited exactly once.
- **Space Complexity:** O(n) for the result list containing at most n characters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the max allowed runs of a character is k, not 2?
  *Hint: Easily generalize by checking the last (k-1) elements in res instead of just 2.*

- Can you do it in place without extra space?
  *Hint: Use a write pointer to overwrite characters as needed in the same list/array.*

- How would your solution change for Unicode or multibyte character sets?
  *Hint: Python strings are Unicode by default, so logic remains the same.*

### Summary
This uses a **greedy string scan**—a common interview pattern. We maintain a rolling check of the last two characters to enforce the “no three in a row” rule.  
This pattern is widely useful: for similar substring constraints, scheduling, or run-length encoding variants.


### Flashcard
Greedily build result by appending each character only if the last two characters differ from current, preventing three consecutive identical characters.

### Tags
String(#string)

### Similar Problems
- Find Maximum Removals From Source String(find-maximum-removals-from-source-string) (Medium)