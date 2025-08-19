### Leetcode 3561 (Medium): Resulting String After Adjacent Removals [Practice](https://leetcode.com/problems/resulting-string-after-adjacent-removals)

### Description  
Given a string s of lowercase English letters, repeatedly remove the **leftmost pair** of adjacent characters that are *consecutive in the alphabet* (either ascending or descending, e.g., 'a' and 'b', or 'y' and 'z'). Continue until no such adjacent pair exists. Return the final resulting string.

### Examples  

**Example 1:**  
Input: `s = "abzc"`  
Output: `zc`  
*Explanation: "a" and "b" are adjacent and consecutive. Remove them: "zc". No more pairs—return "zc".*

**Example 2:**  
Input: `s = "cabxba"`  
Output: `cxx`  
*Explanation:  
- "a" and "b" at end are adjacent/consecutive: remove, "cabx".  
- "a" and "b" again at beginning: remove, "cx".  
- No more pairs, so return "cxx". (If input intended as "cabxba", applying in leftmost order:  
"cabxba" → "caxba" (remove 'b','x' not consecutive, but 'a','b' at end) → "cxx"—step-by-step shown for clarity.)*

**Example 3:**  
Input: `s = "bacdc"`  
Output: `dc`  
*Explanation:  
- "b" and "a" at start: remove, "cdc".  
- "c" and "d" now at start: remove, "c".  
- Nothing left to remove, return "c".*

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to loop through the string, find the leftmost adjacent pair of consecutive letters, remove them, shift the string, and repeat. This is O(n²) due to repeatedly scanning and rebuilding the string.

However, using a **stack** can optimize:  
- For each character in s, push onto stack.  
- When the top of the stack is consecutive with the current character, pop from the stack (removing the pair), otherwise push.  
- At the end, the stack gives the resulting string.

The stack solution is O(n) and efficient since each character is pushed and popped at most once.

### Corner cases to consider  
- Empty string (`""`) → should return `""`.
- No consecutive adjacent pairs, e.g., `s = "ace"` → returns `"ace"`.
- All characters pair off, e.g., `s = "abcbac"` → possibly empty or small string.
- Multiple adjacent and overlapping removable pairs, e.g., `s = "abcba"`.
- String with only one character.

### Solution

```python
def resultingStringAfterAdjacentRemovals(s: str) -> str:
    stack = []
    for c in s:
        # Check if stack is not empty and top is consecutive with current char
        if stack and abs(ord(stack[-1]) - ord(c)) == 1:
            stack.pop()  # Remove the consecutive pair
        else:
            stack.append(c)  # Otherwise, add to stack
    # Join the stack to get the resulting string
    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each character is pushed and popped from the stack at most once.
- **Space Complexity:** O(n), in the worst case no removals occur and the stack holds all characters.

### Potential follow-up questions (as if you’re the interviewer)  

- What would change if you had to remove *all* pairs (not just leftmost) in a single pass?  
  *Hint: Could you still use a similar stack?*

- How would you handle upper/lowercase or non-English letters?  
  *Hint: Expand the check for adjacency based on ASCII values or use a custom function.*

- If the input string is very large (e.g., streaming data), what is the optimal approach?  
  *Hint: Stack uses O(n) space—can you do better, or process characters on-the-fly?*

### Summary
This problem is a classic **stack pattern**—similar to remove-adjacent-duplicates or validate-parentheses. The stack tracks only the unresolved characters, letting us efficiently react to removals in O(n) time. The technique applies broadly: nested structure tracking, undo operations, etc. It's essential practice for simulating reduction-based problems.

### Tags
String(#string), Stack(#stack), Simulation(#simulation)

### Similar Problems
