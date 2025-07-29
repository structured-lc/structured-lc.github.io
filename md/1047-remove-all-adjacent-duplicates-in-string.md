### Leetcode 1047 (Easy): Remove All Adjacent Duplicates In String [Practice](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string)

### Description  
Given a string consisting of only lowercase English letters, repeatedly remove pairs of **adjacent, identical** characters, performing this process until no such pairs remain. Return the resulting string. The answer is guaranteed to be unique, regardless of removal order.

### Examples  

**Example 1:**  
Input: `s = "abbaca"`  
Output: `"ca"`  
*Explanation: Remove the two 'b's → "aaca". Remove the two 'a's → "ca". No more adjacent duplicates remain.*

**Example 2:**  
Input: `s = "azxxzy"`  
Output: `"ay"`  
*Explanation: Remove the two 'x's → "azzy". Remove the two 'z's → "ay".*

**Example 3:**  
Input: `s = "aababaab"`  
Output: `"ba"`  
*Explanation: "aa"→"babaab", then "bb" (not adjacent) ignored, next "aa"→"bab", next nothing to remove, so answer is "ba".*

### Thought Process (as if you’re the interviewee)  

First, the problem asks that **each time we find two identical adjacent characters, we remove them**, and repeat this until there are none left.  
The brute-force approach is:
- Iterate through the string, scanning for adjacent duplicates.
- Remove them when found, and restart the scan since their removal might create new adjacent duplicates.
- This approach is inefficient for long strings because in the worst case, we may scan the string many times, leading to O(n²) time complexity.

To optimize, I can use a **stack**:
- Iterate through each character of the string.
- If the stack is not empty and its top is the same as the current character, it means we found a pair—pop the stack.
- If not, push the current character onto the stack.
- At the end, the stack contains the reduced string in order (bottom to top).
- Stack operations (push/pop) are O(1), so we process each character once, resulting in O(n) time complexity where n = length of string.

*Trade-offs:*  
- This approach uses O(n) extra space for the stack, but is highly efficient and simple.

### Corner cases to consider  
- Empty string: Input `""` should return `""`.
- All unique characters: Input `"abcdef"` returns `"abcdef"`.
- Entire string made up of a single repeated character: Input `"aaaaaa"` returns `""`.
- Multiple adjacent pairs: Input `"aabbcc"` returns `""`.
- Letters become adjacent after removals: Input `"abba"` after "bb"→"aa"→"".
- Only one character: Input `"a"` returns `"a"`.

### Solution

```python
def removeDuplicates(s: str) -> str:
    stack = []  # Stack to hold the characters

    for ch in s:
        if stack and stack[-1] == ch:
            # Duplicate found, remove the previous character
            stack.pop()
        else:
            # No duplicate, add this character
            stack.append(ch)

    # Stack contains the reduced string in order
    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string.  
  Each character is pushed and popped from the stack at most once.
- **Space Complexity:** O(n), for the stack used to store results.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to remove k adjacent duplicates instead of just 2?
  *Hint: Store a count for each character in the stack along with the character. Remove when count reaches k.*
- Can you do this in-place without using extra space for another stack?
  *Hint: Try simulating a stack with pointer manipulation directly on a character array.*
- How would you handle Unicode or cases where the string contains other characters?
  *Hint: Adjust logic to handle code points or case sensitivity if needed.*

### Summary
This problem is a classic **stack** pattern question, used here to efficiently simulate removing adjacent duplicates in a string. The stack approach processes each character in one pass for O(n) time and is simple to implement. This same pattern frequently appears in string reduction, parsing, and editor simulation problems.