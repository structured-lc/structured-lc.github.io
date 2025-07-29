### Leetcode 247 (Medium): Strobogrammatic Number II [Practice](https://leetcode.com/problems/strobogrammatic-number-ii)

### Description  
Given an integer n, generate all strobogrammatic numbers of length n.  
A **strobogrammatic number** is a number that appears the same when rotated 180°, meaning, the sequence of digits forms a valid number after rotation. Only the digits 0, 1, 6, 8, and 9 can be used:  
- 0 ⇒ 0 (except not as the most significant digit for numbers longer than 1)  
- 1 ⇒ 1  
- 6 ⇔ 9  
- 8 ⇒ 8  
- 9 ⇔ 6  
Return all strobogrammatic numbers of length n as strings, in any order.

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `["11", "69", "88", "96"]`  
Explanation.  
Possible 2-digit combinations are:  
- "11" (1-1),  
- "69" (6-9),  
- "88" (8-8),  
- "96" (9-6);  
"00" is not included since it cannot start with 0.

**Example 2:**  
Input: `n = 1`  
Output: `["0", "1", "8"]`  
Explanation.  
Single digits that are strobogrammatic: "0", "1", "8".

**Example 3:**  
Input: `n = 3`  
Output: `["101", "609", "808", "906", "111", "619", "818", "916", "181", "689", "888", "986"]`  
Explanation.  
All these 3-digit numbers look the same when rotated 180°. For instance, "609" becomes "906" but as we pair 6 and 9 accordingly, such numbers are valid.

### Thought Process (as if you’re the interviewee)  
To generate all strobogrammatic numbers of length n:
- Since only certain digits are strobogrammatic, we first identify pairs that are valid: ("0","0"), ("1","1"), ("6","9"), ("8","8"), ("9","6").
- The problem can be solved recursively by constructing the number from the outside in:  
  - At each recursive step, add a valid pair to the current string (one at the front, one at the end).
  - For base cases:  
    - n == 0: return [""]
    - n == 1: return ["0","1","8"]
- Avoid numbers that start with "0" when n > 1.
- This approach (backtracking/DFS) guarantees that all valid combinations are enumerated and only valid pairs are placed symmetrically each time.
- Brute-force enumeration with all n-digit combinations is very wasteful since most combinations are invalid; the recursive pairing constraint prunes the solution space efficiently.

### Corner cases to consider  
- n = 1: Single digit; allow "0".
- Prevent numbers with leading zeros for n > 1.
- For even n, start with [""] (empty string) and build up with pairs.
- For odd n, start with strobogrammatic digits for the center (["0","1","8"]).
- Test with largest and smallest n for performance.

### Solution

```python
def findStrobogrammatic(n):
    # Helper: return all strobogrammatic numbers of size m, to fill the outer positions of n
    def build(m, N):
        if m == 0:
            return [""]
        if m == 1:
            return ["0", "1", "8"]
        
        res = []
        for s in build(m - 2, N):
            for a, b in [("0","0"), ("1","1"), ("6","9"), ("8","8"), ("9","6")]:
                # Do not let a number of length > 1 start with '0'
                if m != N or a != "0":
                    res.append(a + s + b)
        return res
    
    return build(n, n)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(5^{⌊n/2⌋})  
  At each level (working from outer pairs in), up to 5 pairs are added. For n digits, we add ⌊n/2⌋ pairs, so the total is O(5^{⌊n/2⌋}).
- **Space Complexity:** O(total number of results), which is also O(5^{⌊n/2⌋}), since we must return all valid strings.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this if numbers could have leading zeros?
  *Hint: Remove the check that forbids leading zeros for n > 1.*

- How do you efficiently count the number of strobogrammatic numbers below a certain value?
  *Hint: Not just generate and compare. You need to use a digit-DP approach similar to palindrome count.*

- Could you generate strobogrammatic numbers within a range [low, high] efficiently?
  *Hint: Combine DFS/backtracking generation with string comparison and pruning.*

### Summary
This problem uses a **recursive backtracking** pattern, building a number from its outside inward, enforcing symmetry at every step. The recursive approach leverages properties of digit pairing and strict constraints, closely related to generating palindromes or mirrored numbers. This coding pattern is broadly applicable to any problem where symmetric or center-mirrored construction is required, such as palindromic strings or certain combinatorial generation scenarios.