### Leetcode 3703 (Medium): Remove K-Balanced Substrings [Practice](https://leetcode.com/problems/remove-k-balanced-substrings)

### Description  
Given a string `s` of only '(' and ')', and an integer `k`, you need to repeatedly remove all non-overlapping *k-balanced* substrings from the string until you can no longer find any.  
A substring is *k-balanced* if it consists of exactly `k` consecutive '(' followed by `k` consecutive ')', i.e., a segment like `'('*k + ')'*k`.  
After all possible removals, return the resulting string.

### Examples  

**Example 1:**  
Input: `s = "()"`, `k = 1`  
Output: ``  
Explanation: The substring "()" (positions 0-1) is 1-balanced and can be removed. No characters are left.

**Example 2:**  
Input: `s = "((()))"`, `k = 3`  
Output: ``  
Explanation: The entire string is "((()))", which is 3-balanced ('(((' + ')))'). It is removed fully.

**Example 3:**  
Input: `s = "(()())"`, `k = 1`  
Output: ``  
Explanation:
1. Remove "()" at positions 0-1 → String: "()())"
2. Remove "()" at positions 0-1 → String: "())"
3. Remove "()" at positions 1-2 → String: ")"
But string ")" is not 1-balanced, so output is `")"`.
(Note: If the string is entirely removable, the output is empty.)

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  The naive idea is to scan the string every time for the pattern `('('*k + ')'*k)`, remove all non-overlapping occurrences, and repeat this process until no more can be removed. This works but is inefficient, especially for large strings.

- **Optimization:**  
  We need to avoid repeated rescanning and focus on efficiently matching k-balanced patterns during a single traversal. A **stack** can help us keep track of characters, count consecutive `'('`, and detect when a k-balanced pattern forms in the top of the stack.  
  Each time the top 2×k stack elements look like `'('*k + ')'*k`, we pop those 2k elements.  
  Continue this process until the end; this approach simulates the repeated removal within a single pass.

- **Why this is efficient:**  
  We traverse the string in O(n) since each character is pushed and popped at most once.  
  This avoids TLE that comes from rescanning on every removal.

### Corner cases to consider  
- Empty string: Output is empty.
- k greater than string length: No removal is possible, output is the input string.
- No k-balanced substrings: Output is the input string.
- Overlapping vs non-overlapping: Always remove leftmost possible.
- k = 0: Invalid since an empty substring is ambiguous, clarify constraints.
- Nested and sequential patterns: Ensure nested and chained removals work.

### Solution

```python
def remove_k_balanced_substrings(s: str, k: int) -> str:
    stack = []
    count_open = 0  # track consecutive '(' at top
    count_close = 0 # track consecutive ')' after k '('

    for ch in s:
        stack.append(ch)
        # Only check if stack has enough length to possibly remove pattern
        if len(stack) >= 2 * k:
            # Check if the last 2k elements match k '(' then k ')'
            if (all(stack[-2*k + i] == '(' for i in range(k)) and
                all(stack[-k + i] == ')' for i in range(k))):
                # Remove k '(' and k ')'
                del stack[-2*k:]
    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s). Each character is pushed and popped from the stack at most once.
- **Space Complexity:** O(n) in the worst case (stack stores the whole string if no k-balanced pattern is found). No extra storage proportional to input size otherwise.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input had other characters than '(' and ')'?
  *Hint: Consider filtering or generalizing pattern matching.*

- How would you handle very large input (multiple gigabytes) with strict memory limits?
  *Hint: In-place simulation, or batch processing streams.*

- What if removal should be done in-place and you can only use O(1) extra space?
  *Hint: Two-pointer overwrite or simulating stack in-place.*

### Summary
The stack-based pattern removal is a common approach for problems related to well-formed parentheses and pattern removal (like "Remove All Adjacent Duplicates in String"). This method is efficient because each pattern can only be formed and removed once per character. The same pattern is useful for problems involving repeated pattern removal, balance checking, and parsing nested structures.

### Tags
String(#string), Stack(#stack), Simulation(#simulation)

### Similar Problems
