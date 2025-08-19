### Leetcode 660 (Hard): Remove 9 [Practice](https://leetcode.com/problems/remove-9)

### Description  
Given a positive integer n, return the nᵗʰ positive integer in a special sequence where all numbers containing the digit 9 are removed.  
For example, the sequence starts: 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, ... (skipping 9, 19, 29, etc).  
You are to find the integer that would appear at position n in this list.

### Examples  

**Example 1:**  
Input: `9`  
Output: `10`  
*Explanation: The sequence is: 1,2,3,4,5,6,7,8,10. The 9ᵗʰ number is 10 (notice 9 is skipped).*

**Example 2:**  
Input: `10`  
Output: `11`  
*Explanation: The sequence is: 1,2,3,4,5,6,7,8,10,11. The 10ᵗʰ number is 11.*

**Example 3:**  
Input: `5`  
Output: `5`  
*Explanation: The 5ᵗʰ number is just 5 (all numbers <9 are not skipped).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Start from 1, increment by 1, and skip each number if it contains the digit 9. Continue until you reach the nᵗʰ valid value.
  - This works but is extremely inefficient (O(n × d) where d is the digits checked per number) and will time out for large n (up to 10⁸).

- **Observation:**  
  Removing all numbers containing '9' is equivalent to counting in base 9, because only digits 0–8 occur in each place. For each n, the nth term is the *base-9* representation of n, interpreted as a decimal integer.

- **Optimized approach:**  
  - Convert n to base 9.
  - "Read" the base-9 number as if each digit is in decimal (e.g., n=9 → base9=10 → output 10).
  - This process works for any n and does not require generating the full sequence—just perform base conversion.

- **Why this works / Trade-offs:**  
  The mapping from 1-based positive integers (excluding numbers with a 9) to ordinary counting is precisely the base-9 number system (since 9 is the skipped digit). This is O(log₉(n)), which is effectively O(1) for all practical sizes.

### Corner cases to consider  
- n is very small (1)
- n maps to a number that has a trailing zero (should not introduce a 9)
- Very large n (near 10⁸)
- Multiple leading zeros in result (should not occur, as integers don't display leading zeros)
- n is just before or after a skipped value (boundary between non-9 and new digit)

### Solution

```python
def newInteger(n):
    # Initialize the answer and positional multiplier
    ans = 0
    k = 1
    while n > 0:
        # Take the lowest base-9 digit and place it in decimal number
        ans += (n % 9) * k
        n //= 9
        k *= 10  # Move to the next decimal position
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₉(n)).  
  Each division by 9 shrinks the number by one digit, so there are log₉(n) iterations (which is less than 20 for n up to 10⁸).

- **Space Complexity:** O(1).  
  Only a constant amount of additional variables are used (no arrays or recursion).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to remove all numbers containing another digit, like 3 instead of 9?  
  *Hint: Can you generalize your base conversion technique to any skipped digit?*

- What if you must generate the k numbers preceding and following the nth valid number efficiently?  
  *Hint: Can you easily find the indices and convert back and forth using the base system?*

- What if you need to find the index of a given number in the filtered sequence?  
  *Hint: Can you invert the process by decoding a decimal number with 'no 9s' into its index?*

### Summary
This problem maps to the classic pattern of base conversion, which allows rearrangement of regular counting to skip a digit. The trick is to treat the sequence as base-9 counting. This technique is commonly seen in digit-skipping and number representation problems, and highlights how thinking in number systems can avoid brute force. This is a good example of "math insight" leading to an O(1) solution for large input domains.

### Tags
Math(#math)

### Similar Problems
