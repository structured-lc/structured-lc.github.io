### Leetcode 2116 (Medium): Check if a Parentheses String Can Be Valid [Practice](https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid)

### Description  
Given a string `s` containing only '(' and ')', and a corresponding string `locked` with the same length containing only '0' and '1':  
- If locked[i] == '1', s[i] cannot be changed.
- If locked[i] == '0', s[i] can be changed to either '(' or ')'.

Return `True` if we can transform the string into a valid parentheses string by substituting any of the unlocked parentheses as needed. A valid parentheses string is one where every opening parenthesis has a corresponding closing parenthesis and follows the usual pairing rules.  
Example: "(()())" is valid, but "())(" is not.

### Examples  

**Example 1:**  
Input: `s = "))()))", locked = "010100"`  
Output: `True`  
*Explanation: Only unlocked indices 1, 3, 5 can be changed. We can swap s[1]='1' and s[5]='0' to '(', and s[3]='0' to '('. The result "(()())" is valid.*

**Example 2:**  
Input: `s = "()()", locked = "1111"`  
Output: `True`  
*Explanation: All characters are locked and already form a valid parentheses string.*

**Example 3:**  
Input: `s = "))()", locked = "1001"`  
Output: `False`  
*Explanation: Only s[1] and s[2] can be changed. It's impossible to fix the string to become valid.*

### Thought Process (as if you’re the interviewee)  
First, to have a valid parentheses string, the length must be even. If it's not, immediately return False.

A brute force approach would be to try all combinations for unlocked positions, but that is exponential time and clearly not efficient.

To optimize, I want to ensure anywhere in the string, we never have more ')' than '('.  
I can scan from left-to-right, simulating the **minimum** and **maximum** possible open parentheses at each step:
- If locked[i] is '1' and s[i] == '(', increment both min_open and max_open by 1.
- If locked[i] is '1' and s[i] == ')', decrement both min_open and max_open by 1.
- If locked[i] is '0', this character could be either '(' or ')', so:
  - min_open decrements by 1 (if we imagine it's ')'), but not below 0.
  - max_open increments by 1 (if we imagine it's '(').

If at any index max_open < 0, there are more ')' than '(' and we can't fix it.

Once finished, min_open must be 0 for a valid string (all opens can be paired with closes).

This is a known greedy two-pointer technique, often used for parentheses validation with flexible positions.

### Corner cases to consider  
- String of odd length (`len(s) % 2 != 0`)
- All parentheses locked, and balanced/unbalanced
- All locked = '0', can be changed arbitrarily
- Unlocked parentheses insufficient to fix the string
- Only one character ("/(" or ")")
- Strings starting or ending with too many locked ')'

### Solution

```python
def canBeValid(s: str, locked: str) -> bool:
    n = len(s)
    # If length is odd, can't have valid parentheses
    if n % 2 != 0:
        return False

    # Left to right scan
    open_min = open_max = 0
    for i in range(n):
        if locked[i] == '1':
            if s[i] == '(':
                open_min += 1
                open_max += 1
            else:  # ')'
                open_min -= 1
                open_max -= 1
        else:
            # unlocked: can be either '(' or ')'
            open_min -= 1    # if we choose ')'
            open_max += 1    # if we choose '('

        # Clamp open_min to 0 (can't have fewer than 0 open)
        open_min = max(open_min, 0)

        # Too many ')' - cannot fix
        if open_max < 0:
            return False

    # All opens must be closed
    return open_min == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s).  
  - Single pass through the string.
- **Space Complexity:** O(1), only uses a fixed number of counters; does not use stacks or extra arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would this solution change if unlocked characters could be any character, not just parentheses?  
  *Hint: Can you pre-filter or preprocess the input to focus only on valid options?*

- Could you reconstruct one valid parenthesis string (if possible), rather than just answering True/False?  
  *Hint: Think how the greedy algorithm could be adapted to record choices.*

- What if you needed to count the total number of ways to create a valid string, considering different selections for unlocked positions?  
  *Hint: Dynamic Programming, as greedy would not suffice for counting solutions.*

### Summary
This problem uses a classic greedy scan technique for parenthesis balancing, extended to handle "locked" (fixed) and "unlocked" (flexible) positions. The pattern is widely applicable in parentheses/string validation tasks, particularly where multiple characters can play different roles depending on constraints. The memory usage is constant, making it suitable for long strings as well.

### Tags
String(#string), Stack(#stack), Greedy(#greedy)

### Similar Problems
- Valid Parentheses(valid-parentheses) (Easy)
- Generate Parentheses(generate-parentheses) (Medium)
- Valid Parenthesis String(valid-parenthesis-string) (Medium)
- Minimum Remove to Make Valid Parentheses(minimum-remove-to-make-valid-parentheses) (Medium)
-  Check if There Is a Valid Parentheses String Path(check-if-there-is-a-valid-parentheses-string-path) (Hard)