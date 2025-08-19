### Leetcode 1544 (Easy): Make The String Great [Practice](https://leetcode.com/problems/make-the-string-great)

### Description  
Given a string containing upper and lower case English letters, repeatedly remove two **adjacent characters** if they are the same letter but in different cases (e.g., 'a' and 'A'). Continue this process until the string contains no such adjacent pairs. The final string is guaranteed to be unique. If the string becomes empty, return an empty string.

### Examples  

**Example 1:**  
Input: `"leEeetcode"`  
Output: `"leetcode"`  
Explanation: In the first step, remove the bad pair "Ee" at positions 2-3 — this turns `"leEeetcode"` into `"leetcode"`.

**Example 2:**  
Input: `"abBAcC"`  
Output: `""`  
Explanation: Possible reductions: "abBAcC" → "aAcC" (removing "bB") → "cC" (removing "aA") → "" (removing "cC").

**Example 3:**  
Input: `"s"`  
Output: `"s"`  
Explanation: No adjacent bad pairs exist, so the string remains as is.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  I could repeatedly scan the string for any adjacent bad pairs (one uppercase, one lowercase, same letter), remove them, and repeat while such pairs exist. But this would take O(n²) time for repeated scans and removals.

- **Optimized (Stack):**  
  Use a stack to efficiently remove pairs in one pass. For each character in the string:
    - If the stack is not empty and the current character forms a bad pair with the top of the stack (they are the same letter with opposite cases), pop the stack.
    - Otherwise, push the character onto the stack.
  At the end, the stack will contain the resulting good string, which can be joined and returned.  
  This approach is O(n) time and O(n) space, handling all overlapping and nested pairs.

### Corner cases to consider  
- Empty string: Should return "".
- String with no bad pairs: Should return original string.
- String where removal of a pair creates new adjacent pairs (e.g. `"abBA"`).
- Single character string: Should return the same string.
- All pairs are bad and get removed: Should return "".

### Solution

```python
def makeGood(s: str) -> str:
    stack = []
    for c in s:
        if stack and abs(ord(stack[-1]) - ord(c)) == 32:
            # Current and previous form a bad pair (same letter, different case)
            stack.pop()
        else:
            stack.append(c)
    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each character is pushed and popped at most once.
- **Space Complexity:** O(n) in the worst case (if no pairs are removed, the stack stores all n characters).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the string was immutable and you couldn't use extra space?  
  *Hint: Can you use a list to simulate in-place stack operations?*

- Can the logic be adjusted if more than two cases exist for letters (e.g., Unicode with multiple case variants)?  
  *Hint: What defines a "bad pair" when more than just lower/upper case is possible?*

- What if, instead of just adjacent, "bad pairs" can be anywhere in the string, but you can only remove one pair at a time?  
  *Hint: This is a different, more complex problem; how would you model the removals?*

### Summary
This problem leverages the **stack pattern** to efficiently detect and remove adjacent "bad pairs" in a single scan. It’s a classic example of using a stack to handle problems involving matching or canceling out elements (like removing duplicate pairs, handling parentheses, and so on). This stack approach is both efficient and simple, making it a useful pattern for any scenario with forward-only removal of adjacent dependent pairs.

### Tags
String(#string), Stack(#stack)

### Similar Problems
