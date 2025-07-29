### Leetcode 231 (Easy): Power of Two [Practice](https://leetcode.com/problems/power-of-two)

### Description  
Given an integer n, determine if it is a **power of two**.  
In other words: return True if there exists an integer x such that n == 2ˣ; otherwise, return False.  
For example, 1, 2, 4, 8, 16 are all powers of two.  
Negative numbers and zero are **not** considered powers of two.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `True`  
*Explanation: 2⁰ = 1; so 1 is a power of two.*

**Example 2:**  
Input: `n = 16`  
Output: `True`  
*Explanation: 2⁴ = 16; so 16 is a power of two.*

**Example 3:**  
Input: `n = 3`  
Output: `False`  
*Explanation: No integer x such that 2ˣ = 3; so 3 is not a power of two.*


### Thought Process (as if you’re the interviewee)  
First, I clarify the definition: “Is n a power of two?” That means n must be 2ˣ for x ≥ 0.

**Brute-force:**  
- Check divisibility by 2:  
  - Start with n, and while it’s even, divide by 2.  
  - If we eventually reach 1, return True (it’s 2ˣ).  
  - If at any point we get an odd (non-1) or n ≤ 0, return False.  
- This works in O(log n) time, because with each division, n shrinks by half[2][3].

**Bit manipulation (optimized):**
- Any power of two has **exactly one ‘1’ bit in binary** (e.g., 4=100₂, 8=1000₂).
- n > 0 and (n & (n - 1)) == 0:  
  - This expression is only True for powers of two because (n - 1) flips all bits after the single 1 in n, so their & is zero[3].
- This approach is O(1) time and space.

I’d choose the bit manipulation method; it’s concise and eliminates loops.

### Corner cases to consider  
- n = 0 (zero is not a power of two)
- n < 0 (negative values are not allowed)
- n = 1 (edge case; 2⁰ = 1 is a power of two)
- Large n (should work for up to 32-bit signed integer)

### Solution

```python
def isPowerOfTwo(n: int) -> bool:
    # A power of two must be positive
    if n <= 0:
        return False
    # In binary: power of two ⇒ only one '1' bit
    return (n & (n - 1)) == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), as bitwise operations take constant time and no loops are involved.
- **Space Complexity:** O(1), as only a few variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can’t use bitwise operations?
  *Hint: Try repeated division by 2—works similarly to the brute-force idea.*

- How would you generalize to “power of three”?  
  *Hint: Keep dividing by three and check if you reach one.*

- Would this logic work if n is passed as a string (e.g., for very large numbers)?  
  *Hint: You’d need to handle string-to-integer conversion, and probably write your own big number division function.*

### Summary
This problem is a classic use-case for **bit manipulation**, specifically the singleton bit trick `(n & (n-1)) == 0`.  
It’s a pattern that appears in problems testing binary properties or counting set bits, and can be adapted to questions about powers of other numbers with similar approaches (loop with modulus/division).  
Commonly, this technique appears in coding interviews and competitive programming for efficiency.