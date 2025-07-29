### Leetcode 2390 (Medium): Removing Stars From a String [Practice](https://leetcode.com/problems/removing-stars-from-a-string)

### Description  
You are given a string **s** that contains lowercase English letters and the '*' character.  
For each '*' in the string, **remove the nearest non-star character to its left and remove the '*' itself**.  
Repeat this process until there are no more stars.  
Return the string after all stars have been removed.  
It is guaranteed that the operation is always possible (input is designed such that every '*' has a character on its left to remove), and the result is unique.

### Examples  

**Example 1:**  
Input: `s = "leet**cod*e"`  
Output: `"lecoe"`  
*Explanation:  
- 't' is immediately to the left of the first '*' → remove 't' and that '*': "lee*cod*e"  
- 'e' is left of the next '*': remove 'e' and '*': "lecod*e"  
- 'd' is to the left of the next '*': remove 'd' and '*': "lecoe"  
No more stars left. Final string: "lecoe"*

**Example 2:**  
Input: `s = "erase*****"`  
Output: `""`  
*Explanation:  
Every letter has a `*` after it.  
Remove each letter (from right to left, as you process the string) and corresponding '*'.  
All characters are removed; final result is "".*

**Example 3:**  
Input: `s = "ab*cd*e*"`  
Output: `"a"`  
*Explanation:  
'ab*' → remove 'b', '*' → "acd*e*"
'c' before '*' → remove 'c', '*' → "ade*"
'e' before '*' → remove 'e', '*' → "a"*

### Thought Process (as if you’re the interviewee)  
- **Brute-Force Idea:**  
  For each '*' found, scan left to find the nearest non-star, remove both.  
  But removing characters in a string directly is expensive (O(n) per removal), so not efficient for large strings.

- **Optimized Approach:**  
  Use a **stack** (list in Python):  
  - Iterate through the string left to right.  
    - If the character is **not** a '*', append it to the stack (it might stay).
    - If the character **is** a '*', we remove (pop) the last character from the stack (the nearest valid non-star), and do not push '*'.
  - Join the stack at the end for the result.  
  This simulates the removal efficiently, runs in O(n) time and space.

- **Why this works:**  
  Stars always remove the nearest valid left character, so a stack naturally models this process, ensuring we always remove the correct character.  
  No need to process the string repeatedly.

### Corner cases to consider  
- Only stars at the end: `"abc***"` → `""`
- All non-star characters: `"abc"` → `"abc"`
- Interleaved stars: `"a*b*c*"` → `""`
- No stars: `"hello"` → `"hello"`
- 1-letter string: `"a"` → `"a"`
- Edge case: The stack is never empty when a '*' is encountered (guaranteed by problem).

### Solution

```python
def removeStars(s: str) -> str:
    # Initialize an empty stack to simulate the removals
    stack = []
    for c in s:
        if c == '*':
            # Pop the nearest left non-star character
            stack.pop()
        else:
            # Push normal characters, as they might remain
            stack.append(c)
    # Join the stack to get the final string
    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each character is processed exactly once: pushed or popped from the stack.
- **Space Complexity:** O(n) — In the worst case (no stars), we store all characters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we had to support Unicode or capital letters in the string?  
  *Hint: Think about character set, but algorithm stays unchanged.*

- Could you solve this problem in-place if the input string was mutable?  
  *Hint: Try two-pointer approach with a character array.*

- How would you handle a version where stars can be "stacked", i.e., "**" removes the two nearest characters on the left?  
  *Hint: Maintain a count for consecutive stars, pop that many elements.*

### Summary
This problem showcases a **classic stack simulation pattern** for "remove past items with a trigger" (like matching parentheses, backspace string compare).  
The "process left to right, maintain an answer stack" is reusable for problems involving adjacent pair removals or historical undo/redos.  
Efficient stack-based processing often leads to linear time and is a preferred interview pattern for such problems.