### Leetcode 1585 (Hard): Check If String Is Transformable With Substring Sort Operations [Practice](https://leetcode.com/problems/check-if-string-is-transformable-with-substring-sort-operations)

### Description  
Given two strings s and t of same length containing digits 0-9. You can perform the following operation any number of times: pick any index i (0 ≤ i < n-1) where s[i] > s[i+1], and swap s[i] and s[i+1] (allows only adjacent swaps where left digit is greater). Return true if s can be transformed to t by any sequence of such operations; otherwise, return false.

### Examples  
**Example 1:**  
Input: `s = "84532", t = "34852"`  
Output: `true`  
*Explanation: Can repeatedly move '3' and '4' left using allowed operations.*

**Example 2:**  
Input: `s = "34521", t = "23415"`  
Output: `true`  
*Explanation: Each lower digit can bubble left past higher digits.*

**Example 3:**  
Input: `s = "12345", t = "12435"`  
Output: `false`  
*Explanation: Can't move '3' past '4' as they are in order already.*

### Thought Process (as if you’re the interviewee)  
- Only allowed to swap s[i] > s[i+1] — i.e., digits can only move left by "bubbling" past larger digits.
- To transform s into t, each digit in t must be able to move left to its position in t (in the correct order), without violating the rule.
- For each digit in t, find its location in s; check that all digits blocking its way (left of it) are not lower.
- Use queues to remember positions for each digit in s.
- For each t[j], find the earliest available s[i] position, and ensure that, for all smaller digits, no earlier occurrence blocks the way.

### Corner cases to consider  
- s and t already the same.
- Repeated digits.
- Digits arranged so that a smaller digit cannot pass a larger digit.
- Different lengths or invalid digits (guaranteed same length by constraints).

### Solution

```python
from collections import deque

def isTransformable(s, t):
    pos = [deque() for _ in range(10)]
    for idx, ch in enumerate(s):
        pos[int(ch)].append(idx)
    for ch in t:
        d = int(ch)
        if not pos[d]:
            return False
        curr_idx = pos[d].popleft()
        # For all digits smaller than d, if any appears before curr_idx, cannot swap d to front
        for smaller in range(d):
            if pos[smaller] and pos[smaller][0] < curr_idx:
                return False
    return True
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n × 10), as we scan digits and queues for each t.
- **Space Complexity:** O(n), for all digit queues.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you optimize for giant strings with only a few unique digits?  
  *Hint: Minimize per-operation scan, maybe use indices only for present digits.*

- Can you output the actual transformation sequence?  
  *Hint: Track individual moves while verifying conditions.*

### Summary
This problem is a simulation of restricted bubble sort moves and applies greedy checks based on digit positions with multiple priority queues or deques. It's similar to checking transformability with adjacent swaps under constraints, useful for string and permutation problems.


### Flashcard
For each digit in target, ensure it can bubble left in source past only larger digits; use queues to track digit positions.

### Tags
String(#string), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
