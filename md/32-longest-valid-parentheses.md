### Leetcode 32 (Hard): Longest Valid Parentheses [Practice](https://leetcode.com/problems/longest-valid-parentheses)

### Description  
Given a string consisting of just the characters '(' and ')', determine the length of the longest contiguous substring of well-formed (balanced and properly nested) parentheses.  
In other words, return the maximum length of a valid parentheses substring that appears anywhere in the input string.

### Examples  

**Example 1:**  
Input: `"(()"`  
Output: `2`  
Explanation: The longest valid substring is `"()"`. The extra '(' at the start can't be matched.

**Example 2:**  
Input: `")()())"`  
Output: `4`  
Explanation: The longest valid substring is `"()()"` (from index 1 to 4). The other ')'s cannot be matched.

**Example 3:**  
Input: `""`  
Output: `0`  
Explanation: The string is empty, so there is no valid substring.

### Thought Process (as if you’re the interviewee)  
First, I'll consider a brute-force approach: check every possible substring to see if it's a valid set of parentheses, track the maximum length. But checking every substring (O(n²) substrings × O(n) per validation) is computationally infeasible for large strings.

To optimize, a common pattern is to use a **stack**:
- Push the indices of '(' onto the stack.
- When a ')' is found, pop from the stack: if the stack isn't empty, we have a matching pair and can calculate the current valid substring's length.
- Use an initial base value (`-1`) on the stack to handle edge cases and help calculate lengths.

Alternatively, a **dynamic programming** (DP) method can work:
- dp[i] = length of the longest valid substring ending at i-1.
- Update based on whether current char is ')' and previous DP states.
- Both stack and DP approaches run in O(n) time and O(n) space.

I'll use the stack approach: it's intuitive for matching parentheses and easy to code; plus, it avoids redundant computation.

### Corner cases to consider  
- Empty string: should return 0.
- All open or all close: e.g., `"(((((("`, `")))))"` → 0.
- Strings with no valid pairs at all.
- Nested parentheses: e.g., `"((()))"`.
- Valid substrings at the very start or end.
- Alternating: e.g., `"()()()()"`.
- Unmatched parentheses at ends.

### Solution

```python
def longestValidParentheses(s: str) -> int:
    # Stack to hold the indices of '('; initialize with -1 for base
    stack = [-1]
    max_len = 0

    for i, char in enumerate(s):
        if char == '(':
            # Push index of '(' onto the stack
            stack.append(i)
        else:
            # Pop the matching '(' if possible
            stack.pop()
            if not stack:
                # If no base, push current index as new base
                stack.append(i)
            else:
                # The length of current valid substring
                max_len = max(max_len, i - stack[-1])
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we go through the string once, and every index is pushed and popped from the stack at most once.
- **Space Complexity:** O(n) in the worst case (if the stack grows as large as the string, e.g., all '('), but typically less.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this in O(1) space (ignoring input string storage)?
  *Hint: Try scanning from left-to-right and right-to-left, counting open/close parentheses.*

- What if you want the actual substring(s), not just the length?
  *Hint: Track start/end indices as you form valid substrings.*

- Extend to strings with other types of brackets: '[]', '{}'.
  *Hint: You may need to use a stack that keeps track of bracket type as well as position.*

### Summary
This problem uses the **stack** pattern for matching parentheses, and sometimes the DP pattern. Tracking indices lets us efficiently measure substring lengths. Parentheses matching, substrings, and balancing logic are common in parsing problems (e.g., stack-based parsing for expressions and compilers).