### Leetcode 1056 (Easy): Confusing Number [Practice](https://leetcode.com/problems/confusing-number)

### Description  
A **confusing number** is a number that, when each digit is rotated 180°, becomes a *different* valid number. 
- Valid digits and their rotations:
  - 0 → 0
  - 1 → 1
  - 6 → 9
  - 8 → 8
  - 9 → 6
- Digits 2, 3, 4, 5, and 7 are invalid: if any appear in the number, the rotated number is *not* valid.
  
Given an integer `N`, return `True` if it is a confusing number and `False` otherwise.  
A confusing number must:
- Become a different number after rotating all its digits by 180°.
- Not contain any invalid digits.

### Examples  

**Example 1:**  
Input: `6`,  
Output: `True`  
Explanation: Rotating 6 → 9; 9 is valid and ≠ 6.

**Example 2:**  
Input: `89`,  
Output: `True`  
Explanation: Rotating each digit: 8→8, 9→6 (in reverse order: 68). Since 68 ≠ 89, it is confusing.

**Example 3:**  
Input: `11`,  
Output: `False`  
Explanation: Rotating both digits: 1→1, gives 11 (still 11), so not confusing.

**Example 4:**  
Input: `25`,  
Output: `False`  
Explanation: 2 is not a valid digit after rotation; invalid number.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - For each digit of `N`, check if it is rotatable (i.e., in [0, 1, 6, 8, 9]). If any digit is not, immediately return False.
  - Build the rotated number by taking each digit, mapping it, and assembling the new number in reverse order (since visual rotation reverses the digit positions).
  - If the rotated number equals the original, return False.
  - Otherwise, return True.

- **Optimization:**  
  - Since the problem only requires a simple scan and rotate, we can do this efficiently in O(k) where k = number of digits.
  - No special optimization needed as max input size is 10⁹ (≤10 digits).

- **Trade-offs:**  
  - Using a dictionary for mapping keeps the code readable.
  - Working with int or string both work, but string conversion helps for easier reverse assembly.

### Corner cases to consider  
- All digits invalid (e.g., 2, 3, etc.)
- The number is a single digit; only 6 and 9 can be confusing numbers among single digit numbers (since 6 ↔ 9, but 0, 1, 8 rotate to themselves).
- The rotated number has leading zeros (not possible given constraints, but check if reverse logic handles this).
- Number equals its own rotation (e.g., 11, 69→69 after flip? No, 69→96; 96≠69 so okay).
- 0 itself (rotates to itself, so not confusing).
- Large numbers to make sure no overflows.

### Solution

```python
def confusingNumber(N: int) -> bool:
    # Mapping from each valid digit to its 180° rotation
    rotate_map = {0: 0, 1: 1, 6: 9, 8: 8, 9: 6}
    original = N
    rotated = 0
    
    while N > 0:
        digit = N % 10
        if digit not in rotate_map:
            # Invalid digit found
            return False
        # Build rotated number in reverse digit order
        rotated = rotated * 10 + rotate_map[digit]
        N = N // 10
    
    # Rotated must be different from the original
    return rotated != original
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k), where k is the number of digits in N. Each digit is processed once.
- **Space Complexity:** O(1), only constant extra space for integer variables and the fixed mapping.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to generate all confusing numbers below a certain value?
  *Hint: Try backtracking to generate numbers using only valid digits, pruning when the rotated number is equal to the original.*

- How would your solution change if the rotation rules changed—for example, if new digits became valid?
  *Hint: Instead of a hardcoded dictionary, pass rotation rules as input or function argument.*

- Suppose you had to check for "strobogrammatic numbers" (numbers that look the same when rotated by 180°). How would you solve that?
  *Hint: Check if reversed and rotated digits form the same number as original.*

### Summary
The solution uses a **digit mapping pattern** and classic number reversal logic: for each digit, check validity, assemble the rotated number, and compare. This approach is simple and efficient for problems involving digit-level checks, especially for palindrome and strobogrammatic patterns. This rotating-digit idea appears in other LeetCode problems, as well as in certain "mirror image" or "number transformation" variants.

### Tags
Math(#math)

### Similar Problems
- Strobogrammatic Number(strobogrammatic-number) (Easy)
- Confusing Number II(confusing-number-ii) (Hard)