### Leetcode 921 (Medium): Minimum Add to Make Parentheses Valid [Practice](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid)

### Description  
Given a string \( S \) consisting only of the characters '(' and ')', determine the **minimum number of parentheses you must add** (either '(' or ')', anywhere in the string) in order to make the string *valid*.  
A valid parentheses string is defined as either:
- The empty string,
- A concatenation of two valid strings (\( AB \)),
- Or a valid string enclosed in parentheses (\( (A) \)).

Return the minimal number of additions needed for validity.

### Examples  

**Example 1:**  
Input: `())`  
Output: `1`  
*Explanation: The last ')' closes the second '(', but the first '(' is unbalanced. Adding one ')' at the end would balance the string: `())` → `())(` → `())()`.*

**Example 2:**  
Input: `(((`  
Output: `3`  
*Explanation: Each '(' needs a closing ')', so add 3 ')': `(((` → `((()))`.*

**Example 3:**  
Input: `()`  
Output: `0`  
*Explanation: The string is already valid—no changes needed.*

**Example 4:**  
Input: `()))((`  
Output: `4`  
*Explanation: First three ')' can only close one '('. We need to add two '(' at the start and two ')' at the end for balancing.*

### Thought Process (as if you’re the interviewee)  
First, I need a way to determine for every position whether the substring up to that point is valid.  
The brute-force way is to try all possible insertions, but that's very inefficient. Instead, a more optimal approach is to keep track of:
- **Unmatched '('** while iterating ("open" count)
- **Unmatched ')'** we encounter ("close" count when no matching '(' is available)

As I loop through the string:
- For every '(', I increment the `open` counter.
- For every ')', if there's an unmatched '(', I decrement `open`. Otherwise, I increment a `close_needed` counter.
- At the end, I'll need to add as many ')' as there are unmatched '(', and as many '(' as counted in `close_needed`.

**The answer is:** `open + close_needed`.  
This approach is greedy, only counting what's left unmatched in one pass, and clearly minimal.

### Corner cases to consider  
- Empty string: Should return 0.
- All '(' characters: Each must be paired.
- All ')' characters: Each must be paired.
- Alternating, nested, or mismatched patterns: e.g. `(()))(`, `)(((`, `)))`, etc.

### Solution

```python
def minAddToMakeValid(S: str) -> int:
    open_needed = 0   # Counts extra '(' we have to match
    close_needed = 0  # Counts unmatched ')'

    for ch in S:
        if ch == '(':
            open_needed += 1           # We have an extra '(' to match later
        else:  # ch == ')'
            if open_needed > 0:
                open_needed -= 1      # Pair current ')' with a previous '('
            else:
                close_needed += 1     # We need to add a '(' to match this ')'
    return open_needed + close_needed  # Total additions needed

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(S).  
  We traverse the string once, each character is processed in constant time.

- **Space Complexity:** O(1).  
  Only two integer counters are used; no extra space based on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to actually build one valid string, not just count additions?  
  *Hint: Use a stack or keep track of insert positions while iterating.*

- What if the string could contain other characters besides parentheses?  
  *Hint: Filter out non-parenthesis characters before processing, or ignore them during the loop.*

- How would your approach change if you wanted to minimize *removals* instead of *additions*?  
  *Hint: Track and remove unmatched parentheses during a stack-based traversal.*

### Summary
This problem is a classic **parenthesis balancing** problem, commonly tackled with a single pass and a simple counter (greedy approach). It's closely related to stack-use patterns for evaluating expressions or validating matched delimiters, but here we optimize purely for additions. This coding pattern appears in syntax checking, string parsers, and text editor plugins.

### Tags
String(#string), Stack(#stack), Greedy(#greedy)

### Similar Problems
- Minimum Number of Swaps to Make the String Balanced(minimum-number-of-swaps-to-make-the-string-balanced) (Medium)