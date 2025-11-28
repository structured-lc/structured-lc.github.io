### Leetcode 3463 (Hard): Check If Digits Are Equal in String After Operations II [Practice](https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-ii)

### Description  
Given a string `s` consisting only of digits, repeatedly perform the following operation until the string has exactly two digits:
- For each pair of consecutive digits in the string, calculate a new digit as `(s[i] + s[i + 1]) mod 10`.
- Replace `s` with the sequence of these newly computed digits, in order.
Return `True` if the final two digits are the same, or `False` otherwise.

Essentially, you repeatedly compress the string by taking the sum of each consecutive pair modulo 10, always reducing the string by 1 each time, until only two digits remain. You then check if those two digits are equal.

### Examples  

**Example 1:**  
Input: `s = "3902"`  
Output: `True`  
*Explanation:*
- 3 + 9 = 12 → 2, 9 + 0 = 9, 0 + 2 = 2 → forms "292"
- 2 + 9 = 11 → 1, 9 + 2 = 11 → 1 → forms "11"
- Now two digits: 1 and 1 (equal), so output is True.

**Example 2:**  
Input: `s = "2311"`  
Output: `False`  
*Explanation:*
- 2 + 3 = 5, 3 + 1 = 4, 1 + 1 = 2 → forms "542"
- 5 + 4 = 9, 4 + 2 = 6 → forms "96"
- 9 and 6 (not equal), so output is False.

**Example 3:**  
Input: `s = "7777"`  
Output: `True`  
*Explanation:*
- 7 + 7 = 14 → 4, 7 + 7 = 14 → 4, 7 + 7 = 14 → 4 → forms "444"
- 4 + 4 = 8, 4 + 4 = 8 → forms "88"
- 8 and 8 (equal), so output is True.

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  A straightforward way is to literally simulate each step: repeatedly form the next string by taking the sum of each pair mod 10, until only two digits remain, and then compare. This has a time complexity of O(n²) for input size n, as each pass shortens the string by one and sums each pair.

- **Optimization:**  
  This is inefficient for large `s`. We look for patterns or mathematical properties.  
  Notice: The iᵗʰ digit of the original string can affect both final digits, but the process is linear and based on repeatedly summing modulo 10.  
  There is a result (cf. Lucas Theorem and combinatorics mod 10) that allows us to directly compute the final digits using binomial coefficients, i.e., for the left and right final digits, the contribution of the iᵗʰ character is scaled by nCk modulo 10 for some k, where n is the length of the string. This allows O(n) solution without simulating every step.

- **Final approach:**  
  Compute the final two digits as a linear combination of the original digits, where the coefficients are binomial coefficients mod 10, and compare.

### Corner cases to consider  
- Strings of length 2 (simply compare the two digits).
- Strings with repeating or all equal digits.
- Strings containing '0's.
- Large input strings.

### Solution

```python
import math

class Solution:
    def hasSameDigits(self, s: str) -> bool:
        n = len(s)
        # Compute contributions to the first and second digit in the final step

        num1, num2 = 0, 0

        for i in range(n - 1):
            # Coefficient for this position, using Lucas theorem for nCk mod 10
            coefficient = self._nCkMod10(n - 2, i)
            # For first final digit: Contribution from s[i]
            num1 = (num1 + coefficient * int(s[i])) % 10
            # For second final digit: Contribution from s[i+1]
            num2 = (num2 + coefficient * int(s[i + 1])) % 10

        return num1 == num2

    def _nCkMod10(self, n: int, k: int) -> int:
        # Compute nCk mod 10 using Lucas theorem and Chinese Remainder Theorem
        # Since 10=2*5 we compute modulo 2 and 5 separately, then use lookup
        mod2 = self._lucasTheorem(n, k, 2)
        mod5 = self._lucasTheorem(n, k, 5)
        lookup = [
            [0, 6, 2, 8, 4],  # for mod2 == 0
            [5, 1, 7, 3, 9]   # for mod2 == 1
        ]
        return lookup[mod2][mod5]

    def _lucasTheorem(self, n, k, prime):
        # Recursive Lucas theorem for nCk mod prime, where prime is 2 or 5
        res = 1
        while n > 0 or k > 0:
            n_mod = n % prime
            k_mod = k % prime
            if k_mod > n_mod:
                return 0
            res = (res * math.comb(n_mod, k_mod)) % prime
            n //= prime
            k //= prime
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Only O(n) calls to the Lucas/binomial functions, each O(log n), but n ≤ 10⁵ so this is efficient. There is no need to simulate O(n²) string reductions.

- **Space Complexity:** O(1)  
  Only constant extra space is used beyond the input (`num1`, `num2`, and a few ints).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string could be much longer (10⁶, 10⁷)?  
  *Hint: Can you avoid computing binomial coefficients for every position? Can you precompute some values or use more number theory tricks?*

- What if instead of base 10, the base was arbitrary k?  
  *Hint: How would Lucas Theorem and the decomposition work for other moduli?*

- Can you generalize for comparing the first and last digit after k rounds, not just until two remain?  
  *Hint: Track the process as a state machine or touch on polynomials?*

### Summary
This problem uses a combinatorial insight that after a series of pairwise sum-and-reduction steps, the final output digits are linear combinations of the original digits, weighted by binomial coefficients (mod 10). By using Lucas' Theorem and the Chinese Remainder Theorem for efficient binomial computations modulo 10, we avoid brute-force simulation, making the method practical for large inputs. The approach is an instance of "linearity of process under mod", and these techniques often arise in combinatorics-heavy coding contest problems.


### Flashcard
Recognize that digit i in the original string contributes to the final result via binomial coefficients; use modular arithmetic to compute directly without simulation.

### Tags
Math(#math), String(#string), Combinatorics(#combinatorics), Number Theory(#number-theory)

### Similar Problems
- Pascal's Triangle(pascals-triangle) (Easy)