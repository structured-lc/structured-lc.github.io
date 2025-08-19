### Leetcode 342 (Easy): Power of Four [Practice](https://leetcode.com/problems/power-of-four)

### Description  
Given an integer `n`, determine if it is a **power of four**. In other words, return `True` if there exists an integer k ≥ 0 such that n = 4ᵏ, otherwise return `False`.  
You should NOT use any libraries for logarithms or exponentiation.

Explain in an interview:  
You're given a number and need to decide if it looks like 1, 4, 16, 64, 256, etc.—all the possible powers you get by multiplying 4 repeatedly. Return a boolean answer.


### Examples  

**Example 1:**  
Input: `n = 16`  
Output: `True`  
*Explanation: 16 = 4 × 4; 4² = 16, so it is a power of 4.*

**Example 2:**  
Input: `n = 5`  
Output: `False`  
*Explanation: 4¹ = 4 and 4² = 16. 5 does not fall between them, so not a power of 4.*

**Example 3:**  
Input: `n = 1`  
Output: `True`  
*Explanation: 4⁰ = 1, so 1 is considered a power of 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute-Force / Iterative Division:**  
  - Start with `n`.
  - If `n ≤ 0`, immediately return False, since powers of 4 are positive.
  - Keep dividing `n` by 4 as long as `n` is divisible by 4.
  - If the result becomes 1, return True; otherwise, return False.
  - This is simple and always works in O(log₄n) time.

- **Bit Manipulation (Optimal O(1) approach):**  
  - All powers of 4 are also powers of 2, so `n` must have exactly one bit set.
  - But for `n` to be a *power of four*, the single set bit must be in an even index (0-based).
  - First, check `n > 0`.
  - Second, check `n & (n-1) == 0` (ensures only one bit set; i.e., power of 2).
  - Third, check `(n & 0xAAAAAAAA) == 0`. The mask 0xAAAAAAAA is all 1s in the odd positions (for 32-bit integers); being 0 means the bit is in an even position.
  - This triple-check gives us O(1) time, clear, and fast.

- **Why pick this?**  
  - Bit manipulation is more efficient and elegant—interviewers love it if you can explain the logic.
  - However, for clarity or if constraints are small, iterative division is totally valid in interviews.

### Corner cases to consider  
- n = 0 (should be False)
- n < 0 (should be False—negative numbers cannot be powers of 4)
- n = 1 (edge; 4⁰ = 1, should be True)
- Large powers (validate efficiency and integer limits)
- n not divisible by 4 at any step

### Solution

```python
def isPowerOfFour(n: int) -> bool:
    # Condition 1: n must be positive
    if n <= 0:
        return False

    # Condition 2: n must be a power of 2 (only one '1' bit)
    if n & (n - 1) != 0:
        return False

    # Condition 3: Single set bit must be in an even position
    # 0xAAAAAAAA has '1's in all odd positions (32-bit)
    if n & 0xAAAAAAAA != 0:
        return False

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Only a constant number of operations are performed regardless of input size due to simple bitwise checks.
- **Space Complexity:** O(1) — No extra space is used outside of a few variables; no recursion or data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize your solution to check if n is a power of k for any integer k > 1?
  *Hint: Think about using a loop or logarithmic properties, but avoid using inbuilt math library functions.*

- What if you were not allowed to use bit operations at all?
  *Hint: Try the repeated division or multiplication approach.*

- Can you write a version that supports arbitrarily large integers (not just 32-bit)?
  *Hint: Pay attention to overflows or specific language data type restrictions.*

### Summary
This problem is a classic example of **bit manipulation** and pattern recognition: powers of 4 only have a single set bit at *even positions* (indexing from 0).  
The solution uses three quick checks: positivity, single set bit (power of 2), and set bit in an even position.  
This bit-pattern idea pops up in similar “power of k” or bitmasks problems, and is a common test of bitwise mastery in interviews.

### Tags
Math(#math), Bit Manipulation(#bit-manipulation), Recursion(#recursion)

### Similar Problems
- Power of Two(power-of-two) (Easy)
- Power of Three(power-of-three) (Easy)