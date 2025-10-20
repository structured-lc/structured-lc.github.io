### Leetcode 2119 (Easy): A Number After a Double Reversal [Practice](https://leetcode.com/problems/a-number-after-a-double-reversal)

### Description  
Given an integer, reverse its digits to get a new number. Reverse this new number again. If, after these two reversals, the final number is the same as the original, return true; otherwise, return false. When reversing, any leading zeros are removed (i.e., 100 → 1, not 001).

### Examples  

**Example 1:**  
Input: `num = 526`  
Output: `true`  
*Explanation: Reverse 526 → 625. Reverse 625 → 526, which is the original number.*

**Example 2:**  
Input: `num = 1800`  
Output: `false`  
*Explanation: Reverse 1800 → 81 (drop zeros). Reverse 81 → 18, which is not 1800.*

**Example 3:**  
Input: `num = 0`  
Output: `true`  
*Explanation: Reverse 0 → 0. Reverse 0 again → 0. 0 always stays 0 after any reversals.*

### Thought Process (as if you’re the interviewee)  

Start with the brute-force: 
- Reverse the number, then reverse the result, and compare with the original.
- Reversing removes leading zeros, so numbers ending with one or more zeros will not return to their original value, except for 0.

Optimization:
- If num = 0, always return true.
- If num does **not** end with 0, reversing twice always gives the original number.
- If num ends with 0 (and num ≠ 0), after reversing the first time, we lose those trailing zeros. The second reversal will not recover them, so the result changes.

Final approach:  
- If num is 0, return true.
- If num ends with 0 (i.e., num % 10 == 0), return false.
- Otherwise, return true.

### Corner cases to consider  
- num = 0
- num with single digit (not zero)
- num with trailing zeros (e.g., 10, 100)
- num with only zeros (not possible except num = 0)
- Large values of num

### Solution

```python
def isSameAfterReversals(num: int) -> bool:
    # If num is 0, double reversal will always be 0
    if num == 0:
        return True
    # If num ends with 0, reversal removes trailing zeros, so can't get original back
    if num % 10 == 0:
        return False
    # For all other numbers, double reversal gives original
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1).  
  No looping or digit-wise operations, just two constant-time checks.

- **Space Complexity:** O(1).  
  No extra storage beyond input and constant variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers are allowed?  
  *Hint: Consider how reversing handles negative signs; traditional integer reversal doesn’t preserve signs.*

- What if the reversal must be performed digit by digit each time?  
  *Hint: Consider algorithm to actually reverse an integer (pop digit by digit).*

- How would you implement this logic in a language without modular arithmetic?  
  *Hint: Use string manipulation or manual digit extraction for divisibility checks.*

### Summary
This problem is a classic case for considering the effect of digit reversals and integer properties—particularly how trailing zeros are lost. The optimal approach requires only simple arithmetic checks, not actual reversals or string operations. This “parity or structure check” pattern appears often in interview problems, especially where mapping an original state to a restricted transformed state is irreversible under certain conditions.


### Flashcard
Return true if num = 0 or num does not end with 0; otherwise, double reversal loses trailing zeros and changes the number.

### Tags
Math(#math)

### Similar Problems
- Reverse Integer(reverse-integer) (Medium)
- Reverse Bits(reverse-bits) (Easy)