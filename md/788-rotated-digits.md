### Leetcode 788 (Medium): Rotated Digits [Practice](https://leetcode.com/problems/rotated-digits)

### Description  
Given a positive integer **n**, return the count of *good* numbers in the range 1 to **n** (inclusive).  
A number is **good** if, after rotating each digit (by 180°) individually, we get a **valid number** that is **different** from the original.  
- Only the digits 0, 1, 2, 5, 6, 8, 9 are valid for rotation:
    - 0, 1, 8 → remain the same
    - 2 ↔ 5
    - 6 ↔ 9
    - 3, 4, 7 → invalid (cannot be rotated)
- Every digit must be rotated for the number to be *good* (so numbers made up of only 0, 1, 8 are **not** good, since they'd remain unchanged).

### Examples  

**Example 1:**  
Input: `n = 10`  
Output: `4`  
*Explanation: The good numbers are 2, 5, 6, 9. Their rotations are 5, 2, 9, 6. All are valid and different from the original.*

**Example 2:**  
Input: `n = 1`  
Output: `0`  
*Explanation: 1 rotates to itself, so it's not good.*

**Example 3:**  
Input: `n = 2`  
Output: `1`  
*Explanation: Only 2 is good (2 rotates to 5, which is different).*

### Thought Process (as if you’re the interviewee)  

Start with **brute-force**:  
- For every number X from 1 to n:
  - Check each digit to see if it's rotatable.
  - Track if, after rotation, the result differs from X.
- If any digit is invalid (3, 4, 7), not good.
- If all digits valid, and at least one digit changes (e.g., 2↔5 or 6↔9), then it's good.

Optimization possibilities:
- Precompute what each digit can rotate into.
- Use a DP or state array: For every number track if:
    - -1: invalid (contains unrotatable digit)
    - 0: rotates to itself (all digits are 0, 1, or 8)
    - 1: rotates to a different number (good)
- For numbers ≥10, their status can be determined from left and right parts (DP on digits).

Given the constraint (n ≤ 10,000), brute-force is acceptable but DP is cleaner and avoids redundant recomputation.

### Corner cases to consider  
- n = 1, smallest case (returns 0, as 1 is not good).
- Numbers containing 3, 4, or 7 anywhere (should be skipped).
- Numbers with all digits 0, 1, or 8 (not good as rotations are unchanged).
- Multiple digits, some rotatable, some not.

### Solution

```python
def rotatedDigits(n):
    # dp[i]: -1 if invalid, 0 if valid but same, 1 if valid and good (changes)
    dp = [0] * (n + 1)
    cnt = 0
    
    for i in range(1, n + 1):
        if i < 10:
            # Digits 0,1,8 -> valid but unchanged
            if i in (0, 1, 8):
                dp[i] = 0
            # Digits 2,5,6,9 -> valid and change
            elif i in (2, 5, 6, 9):
                dp[i] = 1
                cnt += 1
            # Digits 3,4,7 -> invalid
            else:
                dp[i] = -1
        else:
            a, b = dp[i // 10], dp[i % 10]
            if a == -1 or b == -1:
                dp[i] = -1
            elif a == 1 or b == 1:
                dp[i] = 1
                cnt += 1
            else:
                dp[i] = 0
    return cnt
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We visit each integer once up to n (≤10,000), and per integer, do constant time work.
- **Space Complexity:** O(n).  
  We store one integer per value up to n (the DP array).

### Potential follow-up questions (as if you’re the interviewer)  

- What if **n** is much larger (say, up to 10⁹)?  
  *Hint: Try digit DP, work one digit at a time using memoization.*

- How would you count good numbers in a **range [A, B]** instead of 1 to n?  
  *Hint: Use your function for B and subtract result for (A-1).*

- Could you **return a list** of all good numbers, not just the count?  
  *Hint: Instead of just counting, store numbers that pass the good check.*

### Summary
We use **digit DP** (bottom-up table) to check, for each number, whether it consists only of rotatable digits, and whether at least one digit changes on rotation. This is a classic state DP: each number can be classified as invalid, unchanged (not good), or good (valid, changes when rotated).  
This **pattern** applies in similar digit transformation/counting problems, especially those where certain digits or transitions are restricted, e.g., "Confusing Number", "Mirror Reflection", or general digit-DP counting questions.


### Flashcard
For each number ≤ n, check if all digits are valid after rotation and at least one digit changes; count such numbers.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
