### Leetcode 479 (Hard): Largest Palindrome Product [Practice](https://leetcode.com/problems/largest-palindrome-product)

### Description  
Given an integer n, find the largest palindromic number that is the product of two n-digit numbers. Since the output can be very large, return it modulo 1337.  
A palindrome is a number that reads the same forward and backward. For example, with n=2, the two n-digit numbers range from 10 to 99, and the largest palindrome as a product of two 2-digit numbers should be found.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `9`  
*Explanation: The largest palindrome is 9 (obtained as 3 × 3 or 9 × 1). 9 % 1337 = 9.*

**Example 2:**  
Input: `n = 2`  
Output: `911`  
*Explanation: The largest palindrome is 9009 (99 × 91). 9009 % 1337 = 911.*

**Example 3:**  
Input: `n = 3`  
Output: `123`  
*Explanation: The largest palindrome is 906609 (993 × 913). 906609 % 1337 = 123.*

### Thought Process (as if you’re the interviewee)  
Start with a brute-force idea:  
- Try all products of n-digit numbers in descending order and check if the result is a palindrome.  
- For n=2, check all pairs (i, j), with 99 ≥ i, j ≥ 10, for i × j being a palindrome.  
- This is extremely slow for large n since there are O(10²ⁿ) combinations.

To optimize:  
- Instead of checking every product, we can generate palindromic numbers in descending order and check if they can be factored into two n-digit numbers.  
- For n-digit numbers, the largest n-digit is hi = 10ⁿ-1, the smallest is lo = 10ⁿ⁻¹.  
- For each "head" (left half) from hi down to lo, build a palindrome by mirroring the head.  
- For each palindrome, check if it can be written as i × j, with both i and j being n-digit numbers. Since i × j = palindrome, j = palindrome // i.  
- For efficiency, check i from hi down to lo, and break early if i × i < palindrome.

Trade-offs:  
- This approach leverages properties of palindrome structure and reduces the number of checks drastically, leading to near O(10ⁿ) time, which is tractable for n ≤ 8.

### Corner cases to consider  
- n = 1 (Single-digit): Return 9, since largest 1-digit palindrome product is 9.
- Products with leading zeros or not n-digit.
- palindromes constructed must actually split into two valid n-digit numbers.
- Extremely large results (be sure to only return result % 1337).

### Solution

```python
def largestPalindrome(n: int) -> int:
    if n == 1:
        return 9

    hi = 10 ** n - 1  # Largest n-digit number
    lo = 10 ** (n - 1)  # Smallest n-digit number

    for first_half in range(hi, lo - 1, -1):
        # Construct palindrome: left half + reversed left half
        left = str(first_half)
        palindrome = int(left + left[::-1])
        # Check if palindrome has two n-digit factors
        for i in range(hi, lo - 1, -1):
            if palindrome // i > hi:
                # The other factor will be less than lo-digit, so break
                break
            if palindrome % i == 0:
                # Found two n-digit numbers
                return palindrome % 1337
    return 9  # Should never reach for n > 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(10ⁿ).  
  For each candidate palindrome (roughly O(10ⁿ)), we check divisors up to hi, but inner loop can break early—practically much faster than naïve brute-force O(10²ⁿ).
- **Space Complexity:** O(1), only a few variables are allocated, no extra data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n can be up to 20?  
  *Hint: Can you derive some mathematical patterns or find an analytical shortcut?*

- Can you do this without checking every possible palindrome?  
  *Hint: Study when palindromic numbers can be divisible by two equal-length numbers.*

- How would you adapt this if the modulus was very large or not specified?  
  *Hint: Consider the risk of integer overflow and different ways of representing large products.*

### Summary
This problem uses the pattern of palindrome construction plus reverse factor checking. It's a neat variation of search plus mathematical properties (palindrome structure, factorization). The approach leverages descending order generation and early loop breaks for efficiency, commonly seen in problems focused on maximizing a structured value under constraints. Pattern: generate-and-test with early pruning by structural insight. This methodology is useful in related palindrome problems and certain divisor/factor-check optimizations.

### Tags
Math(#math), Enumeration(#enumeration)

### Similar Problems
