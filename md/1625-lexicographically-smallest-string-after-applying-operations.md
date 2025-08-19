### Leetcode 1625 (Medium): Lexicographically Smallest String After Applying Operations [Practice](https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations)

### Description  
Given a string s of digits (0-9), and integers a and b, you can:
- Add 'a' to every digit at odd indices (wrapping around with mod 10)
- Rotate s to the right by 'b' positions
Apply these operations any number of times, in any order, to obtain the lexicographically smallest possible string.

### Examples  
**Example 1:**  
Input: `s = "5525", a = 9, b = 2`  
Output: `2050`  
*Explanation: Various operations lead to string '2050', which is lex smallest reachable.*

**Example 2:**  
Input: `s = "74", a = 5, b = 1`  
Output: `24`  
*Explanation: After two rotates and add, get '24'.*

**Example 3:**  
Input: `s = "0011", a = 4, b = 2`  
Output: `0011`  
*Explanation: No operation gives smaller string; return original.*

### Thought Process (as if you’re the interviewee)  
There are two non-commuting operations: addition on odd indices and rotation. Since the string length is even (as per constraints), every odd index will return to its place after some rotations. Brute force is possible by trying all combinations: for each possible rotation, try all possible additions for odd digits (there are at most 10 variants by cycling mod 10). Use BFS or set to avoid visiting the same string twice. Track the minimal string seen.

### Corner cases to consider  
- b even/odd: affects reachable rotations
- a = 0 or b = 0 (no effect)
- Already lex smallest string

### Solution

```python
from collections import deque

def find_lex_smallest_string(s, a, b):
    seen = set()
    q = deque([s])
    ans = s
    while q:
        curr = q.popleft()
        if curr < ans:
            ans = curr
        # Odd indices add
        curr_list = list(curr)
        for k in range(10): # At most 10 unique results due to mod-10
            new_list = curr_list[:]
            for i in range(1, len(s), 2):
                new_list[i] = str((int(curr_list[i]) + a * k) % 10)
            new_str = ''.join(new_list)
            # Try all rotations
            rot_str = new_str
            for m in range(0, len(s), b):
                rotated = rot_str[-m:] + rot_str[:-m] if m else rot_str
                if rotated not in seen:
                    seen.add(rotated)
                    q.append(rotated)
    return ans
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n×10) possible states (for each of n rotations, try all 10 odd-index changes)
- **Space Complexity:** O(n×10), for the queue and seen set

### Potential follow-up questions (as if you’re the interviewer)  

- Can you avoid revisiting states for cycles of a/b?  
  *Hint: Visited state set suffices; cycles bounded by string length and mod 10.*

- What if digits are also changeable at even indices?  
  *Hint: Expand add operation logic using similar structure.*

- Extend to strings with variable length/character set?  
  *Hint: Algorithm stays similar; just increase range of add/check.*

### Summary
This is a BFS/visited pattern on the state space of digit-strings, leveraging mod operations and rotations. It's a classic search/enumerate structure for problems with a small enough state space and reversible operations.

### Tags
String(#string), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Enumeration(#enumeration)

### Similar Problems
- Lexicographically Smallest String After Substring Operation(lexicographically-smallest-string-after-substring-operation) (Medium)
- Lexicographically Smallest String After a Swap(lexicographically-smallest-string-after-a-swap) (Easy)