### Leetcode 1541 (Medium): Minimum Insertions to Balance a Parentheses String [Practice](https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string)

### Description  
Given a string **s** consisting of '(' and ')', return the minimum number of insertions required to make the string **valid**.  
A parentheses string is valid if:
- Every left parenthesis '(' has exactly **two consecutive** right parentheses ')' that follow : i.e., every '(' must match with '))' as close as possible.
- You may insert parentheses at any position.

### Examples  

**Example 1:**  
Input: `s = "(()))"`  
Output: `1`  
*Explanation: Add 1 '(' at the beginning to get "((()))".*

**Example 2:**  
Input: `s = ")())"`  
Output: `2`  
*Explanation: Add 1 '(' before the first ')' and 1 ')' at the end to match the unmatched '('.*

**Example 3:**  
Input: `s = "((((("`  
Output: `10`  
*Explanation: For each '(', need to insert 2 ')'!* 

### Thought Process (as if you’re the interviewee)  
The requirement is stricter than usual: each '(' must be matched with a pair '))' (not just a single ')').
- We'll traverse the string and keep a **counter for needed right parentheses**.
- For every '(', we add 2 to the counter.
- Each ')' decreases the need. But if we find a standalone ')', we may need to insert an extra ')' (since only pairs are valid after '(').
- If we close a pair without a matching '(', insert an extra '('.
- Finally, after traversing, if any ')' are still needed, we must insert them at the end.

### Corner cases to consider  
- All '(' (need to insert 2 × count ')' at end)
- All ')' (insert '(' at every ')' to start matching)
- Ending with a single ')'
- Combination like '())(()'
- Empty string (no insertions needed)

### Solution

```python
# Greedy linear scan with counting

def minInsertions(s: str) -> int:
    res = 0    # Result: extra insertions
    need = 0   # Number of ')' needed
    i = 0
    n = len(s)
    while i < n:
        if s[i] == '(':  # Each '(' needs 2 ')'
            need += 2
            if need % 2 == 1:
                # Odd number, insert one ')' to even out
                res += 1
                need -= 1
        else:  # handle ')'
            need -= 1
            if need < 0:  # unmatched ')', requires '('
                res += 1
                need = 1  # We have one ')' pending now
        i += 1
    return res + need
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), one pass through the string.
- **Space Complexity:** O(1), only counters/fixed variables.

### Potential follow-up questions (as if you’re the interviewer)  
- What would change if each '(' needed exactly **k** ')' instead of 2?
  *Hint: Update need increment to k instead of 2, handle need logic accordingly.*
- How to output the corrected version of the balanced string?
  *Hint: Keep a builder list and insert as necessary while traversing.*
- How would you adapt your code for streaming input (one char at a time)?
  *Hint: Use the same counters, output insertions in a streaming way.*

### Summary
This is a **greedy parentheses matching** problem with a twist: each '(' needs two consecutive ')'. The pattern is closely related to standard parentheses validation but careful accounting for both required and surplus right parentheses is key. The approach generalizes to other k-matching paren problems as well.


### Flashcard
Traverse the string, tracking needed parentheses and inserting them as necessary.

### Tags
String(#string), Stack(#stack), Greedy(#greedy)

### Similar Problems
- Minimum Number of Swaps to Make the String Balanced(minimum-number-of-swaps-to-make-the-string-balanced) (Medium)