### Leetcode 246 (Easy): Strobogrammatic Number [Practice](https://leetcode.com/problems/strobogrammatic-number)

### Description  
Given a string representing a number, determine if it is **strobogrammatic**. A strobogrammatic number looks the same when rotated 180°, digit by digit. Only certain digits are valid:  
- **0, 1, 8** remain the same after rotation  
- **6** becomes **9**, and **9** becomes **6**  
Digits like 2, 3, 4, 5, 7 do not map to any valid digit or themselves, so if any such digit appears, the number isn't strobogrammatic.

### Examples  

**Example 1:**  
Input: `"69"`  
Output: `True`  
Explanation: '6' flips to '9', and '9' flips to '6', so "69" becomes "96", which is the original reversed—satisfying the strobogrammatic property.

**Example 2:**  
Input: `"88"`  
Output: `True`  
Explanation: Both digits are '8', which remains '8' after rotation, so "88" stays "88".

**Example 3:**  
Input: `"962"`  
Output: `False`  
Explanation: '2' is not a valid strobogrammatic digit, so the entire number cannot be strobogrammatic.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Flip the whole string by mapping each digit to its rotated counterpart, in reverse order. If the result is the same as the original, return True. Otherwise, False. This approach uses O(n) space.

- **Optimized (Two-pointer):**  
  Use a left and right pointer. For each pair of digits `(left, right)` (moving from outside in), check if:
  - Both digits are valid strobogrammatic digits.
  - The left digit, when rotated, equals the right digit.
  This avoids building a full new string and is O(1) space, O(n) time—more efficient and recommended.

- **Trade-offs:**  
  The two-pointer method is faster in practice (low overhead, no copying), and uses constant space.  
  Building a mapped + reversed string is simpler to code, but uses more memory.

### Corner cases to consider  
- Empty string: Should be True (mirrors itself).
- Single digit: Only '0', '1', '8' are valid.
- Digits like 2, 3, 4, 5, 7: Any presence -> False.
- Strings with valid pairs but one invalid digit.
- Palindromes made with non-strobogrammatic digits should be rejected.
- Leading zeros are valid ('0' is symmetric).

### Solution

```python
def isStrobogrammatic(num: str) -> bool:
    # Map of digit rotations for strobogrammatic numbers
    rotate_map = {
        '0': '0',
        '1': '1',
        '6': '9',
        '8': '8',
        '9': '6'
    }

    left, right = 0, len(num) - 1

    while left <= right:
        left_digit, right_digit = num[left], num[right]
        # If the left digit can't be rotated, or doesn't match the right after rotation
        if left_digit not in rotate_map or rotate_map[left_digit] != right_digit:
            return False
        left += 1
        right -= 1

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. Each character is checked at most once.
- **Space Complexity:** O(1), only a few pointers and the fixed size digit map, no new string or array built.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generate all n-digit strobogrammatic numbers?
  *Hint: Try recursive backtracking or depth-first search—build numbers from outside in with allowed pairs.*

- How do you handle very large input where the string may not fit in memory?  
  *Hint: Can you stream in digit pairs and check on the fly, without storing the whole string?*

- What changes if you need to find all numbers in a range [low, high] that are strobogrammatic?
  *Hint: Generate all strobogrammatic numbers between the lengths of low and high, filter them numerically.*

### Summary
This problem uses the **two-pointer pattern** and character mapping for digit transformation.  
- It highlights validating symmetric properties and digit flipping.
- The general approach works for problems requiring checking pairwise correspondence from both ends of a string, such as palindromes with twists.
- This digit mapping + two-pointer combo recurs in other digit-mirroring, palindrome, and rotational symmetry problems.


### Flashcard
Use two pointers to check if each digit pair is valid and matches when rotated; only digits 0, 1, 6, 8, 9 are strobogrammatic.

### Tags
Hash Table(#hash-table), Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Strobogrammatic Number II(strobogrammatic-number-ii) (Medium)
- Strobogrammatic Number III(strobogrammatic-number-iii) (Hard)
- Confusing Number(confusing-number) (Easy)