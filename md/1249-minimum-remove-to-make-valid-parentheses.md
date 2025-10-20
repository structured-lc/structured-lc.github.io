### Leetcode 1249 (Medium): Minimum Remove to Make Valid Parentheses [Practice](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses)

### Description  
Given a string `s` containing lowercase letters, '(' and ')', remove the minimum number of parentheses to make the resulting string valid. A string is valid if every opening '(' is closed by a matching ')', with correct order. You may return any valid string after removing the fewest parentheses possible. All remaining lowercase characters must stay in their original order.

### Examples  
**Example 1:**  
Input: `"lee(t(c)o)de)"`  
Output: `"lee(t(c)o)de"`  
*Explanation: The last ')' is unmatched and must be removed to make the string valid.*

**Example 2:**  
Input: `"a)b(c)d"`  
Output: `"ab(c)d"`  
*Explanation: The first ')' has no matching '(' before it; removing it yields a valid string.*

**Example 3:**  
Input: `"()))(("`  
Output: `""`  
*Explanation: All parentheses are unmatched; we must remove them all, resulting in the empty string.*


### Thought Process (as if you’re the interviewee)  
Start by thinking about the definition of a valid parentheses string: every '(' must have a matching ')', in the correct order. The brute-force way is to remove every possible parenthesis and check for validity, but that's exponential and not feasible for interview.

A more effective approach is to use two passes with a stack or counter:
- First, perform a left-to-right scan and remove excess ')' that do not have a '(' before them.
- Then perform a right-to-left scan to remove excess '(' that were left unmatched.

This ensures the absolute minimum removals are made. Alternatively, you can use a stack to track indices of unmatched parentheses, removing them after a single pass, but the two-pointer solution is simpler and readable in code interviews.


### Corner cases to consider  
- Empty string (output should remain empty)
- String with no parentheses (returns unchanged)
- All characters are '(' or ')'
- Nested valid/invalid parentheses intermixed with letters
- Parentheses at the start or end with no matching pair
- Already valid string (should not be changed)


### Solution

```python
# Remove the minimum number of parentheses to make the string valid

def minRemoveToMakeValid(s: str) -> str:
    # First pass: remove all extra ")" and remember positions of "("
    result = []
    open_count = 0
    for c in s:
        if c == '(': 
            open_count += 1
            result.append(c)
        elif c == ')':
            if open_count > 0:
                open_count -= 1
                result.append(c)
            # else: skip extra ')' (no match)
        else:
            result.append(c)
    # Second pass: remove unmatched '('
    final = []
    open_to_remove = open_count
    for c in result:
        if c == '(':
            if open_to_remove > 0:
                open_to_remove -= 1
                continue  # Remove from left
        final.append(c)
    return ''.join(final)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `s`. Both passes go over the string just once.
- **Space Complexity:** O(n), for the extra result arrays storing the intermediate strings.


### Potential follow-up questions (as if you’re the interviewer)  
- What if we want to also report the indices of the removed parentheses?  
  *Hint: Track indices in an array during removal steps.*

- Can you do this in-place without using extra arrays?  
  *Hint: Use a mutable list and mark for removal, then build the string at the end.*

- What if we wanted the lexicographically smallest valid string among all possible outputs?  
  *Hint: Carefully choose which parentheses to remove, potentially with a greedy strategy.*

### Summary
This problem uses a classic stack/parenthesis validation pattern, often called the "Valid Parentheses" or "Balance Parenthesis" problem. The two-pass scan or stack-based approach ensures only the minimum removals are made. It's a fundamental string and stack technique applicable in similar expression-validation or balancing problems.


### Flashcard
Two-pass scan: remove excess ')' in left-to-right, then excess '(' in right-to-left, to make parentheses valid.

### Tags
String(#string), Stack(#stack)

### Similar Problems
- Minimum Number of Swaps to Make the String Balanced(minimum-number-of-swaps-to-make-the-string-balanced) (Medium)
- Check if a Parentheses String Can Be Valid(check-if-a-parentheses-string-can-be-valid) (Medium)