### Leetcode 2081 (Hard): Sum of k-Mirror Numbers [Practice](https://leetcode.com/problems/sum-of-k-mirror-numbers)

### Description  
Given two integers, **k** (base, k ≥ 2) and **n**, find the **sum of the first n positive integers** that are palindromic *both*:
- as a base-10 number (the ordinary way we write numbers), and
- when written in base-k.

A **k-mirror number** is a positive integer (without leading zeros) that is a palindrome in base-10 and also a palindrome when written in base-k.

In other words: find the n smallest numbers that are palindromes in base-10 and, for each, check if their base-k representation is *also* a palindrome. Then add them together and return the sum.

### Examples  

**Example 1:**  
Input: `k = 2, n = 5`  
Output: `25`  
Explanation:  
The 5 smallest 2-mirror numbers and their representations in base-2:  
1 → 1  
3 → 11  
5 → 101  
7 → 111  
9 → 1001  
Sum = 1 + 3 + 5 + 7 + 9 = 25

**Example 2:**  
Input: `k = 3, n = 7`  
Output: `499`  
Explanation:  
The 7 smallest 3-mirror numbers are:  
1→1, 2→2, 4→11, 8→22, 121→11111, 151→12121, 212→21212  
Sum = 1 + 2 + 4 + 8 + 121 + 151 + 212 = 499

**Example 3:**  
Input: `k = 10, n = 5`  
Output: `45`  
Explanation:  
In base-10, palindromes are palindromes in base-10, so the answer is just the sum of the first 5 palindromes: 1 + 2 + 3 + 4 + 5 = 15. But for larger n, only palindromic numbers in both bases are summed.

### Thought Process (as if you’re the interviewee)  

Brute-force:  
- For each integer starting from 1, check if it's a palindrome in base-10 **and** in base-k.
- If so, keep it; when n found, sum them.

Why Brute-force is too slow:  
- Most numbers are *not* palindromes in base-10, so limits the search.
- Enumerating all numbers and testing both conditions is computationally wasteful.

Optimization:  
- **Only generate base-10 palindromes:**  
  Instead of checking every number, generate numbers with palindromic structure in base-10 (single-digit, then multi-digit by mirroring digits).
- For each such palindrome, convert it to base-k and check if the representation is also a palindrome.
- Continue until n such numbers are found.
- This drastically reduces the search space.

Trade-offs:  
- Generating decimal palindromes is efficient — can build them by length, for odd and even cases.
- Checking for palindromicity in base-k requires base conversion but is manageable per palindrome.

### Corner cases to consider  
- k = 2 (minimum base, binary): Check small and large numbers.
- n = 1 (smallest n)
- Very large n (make sure search isn’t too slow)
- All single-digit numbers are palindromes in both bases, so for small n the solution is fast.
- Palindrome with leading zeros is not valid (must avoid generating such cases).
- Base-10 palindromes that are NOT palindromes in base-k.

### Solution

```python
def is_palindrome(s):
    # Return True if the string/list s is a palindrome
    return s == s[::-1]

def to_base_k(n, k):
    # Return the base-k digits of n as a list (most significant digit first)
    if n == 0:
        return [0]
    digits = []
    while n > 0:
        digits.append(n % k)
        n //= k
    return digits[::-1]

def generate_palindromes(length):
    # Generate all base-10 palindromes of given length (no leading zeros)
    res = []
    half = (length + 1) // 2
    start = 10 ** (half - 1)
    end = 10 ** half
    for first_half in range(start, end):
        s = str(first_half)
        # For odd length, mirror all but last digit
        if length % 2 == 0:
            pal = int(s + s[::-1])
        else:
            pal = int(s + s[-2::-1])
        res.append(pal)
    return res

def k_mirror(k, n):
    result = 0
    count = 0
    length = 1
    while count < n:
        palindromes = generate_palindromes(length)
        for num in palindromes:
            base_k_digits = to_base_k(num, k)
            if is_palindrome(base_k_digits):
                result += num
                count += 1
                if count == n:
                    return result
        length += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For each decimal palindrome generated, we check palindromicity in base-k.  
  Generating all length-L palindromes is O(10^{⌊L/2⌋}), and for each, conversion and checking is O(logₖN).
  Since we need only the first n k-mirror numbers, worst-case is O(m × logN), where m is some factor larger than n, but much better than brute-force.

- **Space Complexity:**  
  O(log N) for base conversion and intermediate storage per number. Total extra storage is negligible.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you further optimize for very large n or k?  
  *Hint: Think about restricting to palindromes of certain forms, or pruning non-promising branches when generating palindromes.*

- How would you extend this for numbers palindromic in three (or more) bases?  
  *Hint: Re-use the palindrome enumeration and increase checks per base; consider early termination if test fails in any base.*

- Suppose k is large (e.g., k = 1e6): Can the base conversion be optimized?  
  *Hint: Direct digit extraction using modulo and division is still efficient, but memory usage can increase for very large k.*

### Summary
We use the **"palindrome enumeration" pattern**: systematically generate all palindromic numbers in base-10 (by length and structure), and for each, check if its base-k representation is also palindromic. This skips unnecessary checking for numbers that are not decimal palindromes, resulting in significant speed-up. This **generation-and-filter** strategy is common in problems involving structural constraints (like digit-palindromic numbers), and can be adapted for various cross-base or cross-criteria search problems.

### Tags
Math(#math), Enumeration(#enumeration)

### Similar Problems
- Strobogrammatic Number II(strobogrammatic-number-ii) (Medium)
- Prime Palindrome(prime-palindrome) (Medium)