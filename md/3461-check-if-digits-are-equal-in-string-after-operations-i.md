### Leetcode 3461 (Easy): Check If Digits Are Equal in String After Operations I [Practice](https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-i)

### Description  
Given a string `s` composed only of digits, repeatedly perform the following operation until the string has exactly two digits:
- For each pair of consecutive digits, compute their sum modulo 10, from left to right, and form a new string with these digits.
After all reductions, return `True` if the final two digits are equal and `False` otherwise.  
The operation “sum modulo 10” means given two digits a and b, their sum is (a + b) % 10.  
Think of it as repeatedly “condensing” the string, one pass per operation, until only two digits remain.  
The order of digits matters and is always preserved per pass.

### Examples  

**Example 1:**  
Input: `s = "3902"`  
Output: `True`  
*Explanation:*
- 1st pass: (3+9)%10=2, (9+0)%10=9, (0+2)%10=2 → "292"
- 2nd pass: (2+9)%10=1, (9+2)%10=1 → "11"
- Final string: "11" (both digits equal) → return True

**Example 2:**  
Input: `s = "123456"`  
Output: `False`  
*Explanation:*
- 1st pass: (1+2)%10=3, (2+3)%10=5, (3+4)%10=7, (4+5)%10=9, (5+6)%10=1 → "35791"
- 2nd pass: (3+5)%10=8, (5+7)%10=2, (7+9)%10=6, (9+1)%10=0 → "8260"
- 3rd pass: (8+2)%10=0, (2+6)%10=8, (6+0)%10=6 → "086"
- 4th pass: (0+8)%10=8, (8+6)%10=4 → "84"
- Final string: "84" (digits not equal) → return False

**Example 3:**  
Input: `s = "77"`  
Output: `True`  
*Explanation:*
- The string already contains two identical digits → return True

### Thought Process (as if you’re the interviewee)  
Start by recognizing that the most direct way is to **simulate each operation** exactly as described:  
- Until the string is reduced to two digits, for each pass, convert the string into a new one by taking the sum of every adjacent pair modulo 10.  
- When only two digits remain, compare them.

Brute-force simulation is straightforward given typical constraints (string length is reasonably small), and avoids unnecessary complexity.  
Trying to find a direct mathematical shortcut is possible (using combinatorial math/Catalan coefficients), but that's overkill for most inputs and increases bug risk.

Trade-offs:
- The simulated approach is easy to reason about, code, and debug.  
- For very large inputs, a combinatorial formula (using Lucas' Theorem etc.) can get the answer in O(n) instead of many passes, but that’s only necessary if constraints demand it.

Interviewers value correctness and clarity over unneeded complexity for an "Easy" problem.

### Corner cases to consider  
- Empty string (`""`) or length 1: (Should never happen per constraints, but always worth checking.)
- Input with two digits, both equal (e.g., `"99"`) and not equal (e.g., `"98"`)
- All digits the same (e.g., `"88888"`)
- Increasing digit sequence, decreasing sequence
- `s` contains '0' digits; verify modulo reduces correctly.
- Large input size: does simulation stay efficient?
- Odd vs. even length strings.

### Solution

```python
def check_digits_equal_after_operations(s: str) -> bool:
    # Simulate the operation until only two digits remain
    while len(s) > 2:
        next_s = []
        for i in range(len(s) - 1):
            # Sum adjacent digits, mod 10
            digit_sum = (int(s[i]) + int(s[i+1])) % 10
            next_s.append(str(digit_sum))
        s = ''.join(next_s)
    # Check if the final two digits are equal
    return s[0] == s[1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) worst case.  
  Each pass reduces string length by 1; total number of operations is (n-1) + (n-2) + ... + 2 + 1 ≈ n(n-1)/2.
- **Space Complexity:** O(n) for holding intermediate strings; at most two lists of size n during execution.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to handle very large strings efficiently?
  *Hint: Explore if a formula or combinatorial relation determines the final two digits directly using binomial coefficients mod 10.*

- How would you modify the function if you wanted to check whether the last two digits are NOT equal?
  *Hint: Just invert the result at the end.*

- Can you return the minimum number of operations needed to make the last two digits equal?
  *Hint: Track operations and check at each step if the last two digits have become equal before the string size is reduced to two.*

### Summary
This problem uses a **Simulation / String reduction** pattern: iteratively condense a sequence based on adjacency rules. It's a classic "process until condition" implementation, and variants are common in digit games, elimination games, catalan-type reductions, or some dynamic programming transitions. The simulation pattern is broadly applicable—good for problems where operations are tightly coupled step by step and output relies on repeated transformation rather than direct math.


### Flashcard
Simulate the operation: repeatedly replace each adjacent pair with (digit₁ + digit₂) mod 10 until two digits remain, then compare.

### Tags
Math(#math), String(#string), Simulation(#simulation), Combinatorics(#combinatorics), Number Theory(#number-theory)

### Similar Problems
