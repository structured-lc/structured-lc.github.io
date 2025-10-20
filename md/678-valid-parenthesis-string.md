### Leetcode 678 (Medium): Valid Parenthesis String [Practice](https://leetcode.com/problems/valid-parenthesis-string)

### Description  
Given a string containing only `'('`, `')'`, and `'*'`, return `True` if the string can be a valid parenthesis sequence.  
- A valid sequence has every `'('` matched with a `')'`, and at no point should more `')'` appear than `'('`.  
- `'*'` can be treated as `'('`, `')'`, or an empty string.  
- The task: can we interpret the `' * '`s to turn the string into a valid parenthesis sequence?

### Examples  

**Example 1:**  
Input: `s = "()"`  
Output: `True`  
Explanation: No wildcards; already a valid balanced parenthesis.

**Example 2:**  
Input: `s = "(*)"`  
Output: `True`  
Explanation: The `*` can be interpreted as `)` to produce `"()"`, which is valid.

**Example 3:**  
Input: `s = "(*))"`  
Output: `True`  
Explanation: The `*` can be interpreted as `(` to produce `"(())"`, which is valid.

**Example 4:**  
Input: `s = "(()"`  
Output: `False`  
Explanation: There is one extra `'('` with nothing to match it; it cannot be resolved even treating any wildcard as `)` or empty.

### Thought Process (as if you’re the interviewee)  
First, I would try brute force: for each `*`, recursively consider all three possibilities: `'('`, `')'`, or nothing. For each possibility, check if the resulting sequence is valid ("backtracking"). However, this is too slow—if there are many `*`, there are up to 3ⁿ possibilities.

To optimize, I look for a greedy or linear scan approach. If I keep a running "range" of possible open left parenthesis counts—as each `*` can either increase or decrease this range—I can efficiently track if a solution is possible in a single pass:

- Keep two variables: `min_open` (minimum possible opens if all `*` so far act as `)`) and `max_open` (maximum possible opens if all `*` act as `(`).
- For `(`: increment both.
- For `)`: decrement both.
- For `*`: decrement `min_open` (treat as `)`), increment `max_open` (treat as `(`).
- If `max_open` drops below zero at any point, return `False` (too many unmatchable `)`).
- If `min_open` goes negative, reset it to zero (it only tracks minimum, can't be less than zero).
- At the end, if `min_open == 0`, there is some valid assignment; otherwise, not.

### Corner cases to consider  
- Empty string: should be valid.
- All `*`: should be valid (treat all as empty).
- All `)': should be invalid.
- More `)` than `(` + `*`—should fail early.
- `*` at the start/end—can they act as a `)`/`(` when needed?
- Strings with only `*` and no parentheses.

### Solution

```python
def checkValidString(s: str) -> bool:
    min_open = 0   # Minimum number of '(' parentheses possible so far
    max_open = 0   # Maximum number of '(' parentheses possible so far
    
    for ch in s:
        if ch == '(': 
            min_open += 1
            max_open += 1
        elif ch == ')':
            min_open -= 1
            max_open -= 1
        else:  # ch == '*'
            min_open -= 1   # Treat '*' as ')'
            max_open += 1   # or as '('
        
        # If max_open < 0, too many ')', impossible to balance
        if max_open < 0:
            return False
        
        # min_open cannot go negative
        if min_open < 0:
            min_open = 0
    
    return min_open == 0  # All opens can be matched at some interpretation
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of s. We scan through the string once, updating counters.
- **Space Complexity:** O(1). Only fixed extra space for counters.

### Potential follow-up questions (as if you’re the interviewer)  

- If you could not use the `*` as empty, how would your approach change?  
  *Hint: Update only possible counts for '(' and ')' on each `*`.*

- How would you adjust your solution if you had to output one valid parenthesis sequence rather than only validity?  
  *Hint: You'd reconstruct a path, maybe using dynamic programming or backtracking.*

- What if `*` could only be '(' or ')' and not empty space?  
  *Hint: Change range updates to exclude the empty option.*

### Summary
This is a **greedy/interval tracking pattern**—by maintaining a possible range of open left parentheses, you efficiently account for all possible wildcard scenarios without recursion or brute force.  
It's a common idea for problems where characters have multiple valid roles or ambiguous choices, and you want to track "all possibilities" compactly through bounds.  
This approach avoids 3ⁿ explosion by only recording necessary aggregate information, making it ideal for string processing and validation problems with ambiguous symbols.


### Flashcard
Track the possible range of open parentheses as you scan; for each '*', update min/max open count since '*' can be '(', ')', or empty—valid if range never goes negative and ends at zero.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Stack(#stack), Greedy(#greedy)

### Similar Problems
- Special Binary String(special-binary-string) (Hard)
- Check if a Parentheses String Can Be Valid(check-if-a-parentheses-string-can-be-valid) (Medium)