### Leetcode 3260 (Hard): Find the Largest Palindrome Divisible by K [Practice](https://leetcode.com/problems/find-the-largest-palindrome-divisible-by-k)

### Description  
Given two positive integers, **n** and **k**, find the **largest palindrome integer** with **n digits** (as a string) that is **divisible by k**.  
- The number must not have leading zeros.  
- A **palindrome** is a number that reads the same forwards as backwards, such as 121 or 89898.

### Examples  

**Example 1:**  
Input: `n = 3, k = 5`  
Output: `595`  
*Explanation: The largest 3-digit palindrome divisible by 5 is 595.*

**Example 2:**  
Input: `n = 1, k = 4`  
Output: `8`  
*Explanation: The single-digit palindromic numbers divisible by 4 are 4 and 8. 8 is larger.*

**Example 3:**  
Input: `n = 5, k = 6`  
Output: `89898`  
*Explanation: The largest 5-digit palindrome divisible by 6 is 89898.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - Generate all n-digit numbers from the largest (10ⁿ - 1) down to smallest (10ⁿ⁻¹).
  - For each, check if it is a palindrome and divisible by k.
  - This is terribly slow for n ≥ 7, since there are 9 × 10ⁿ⁻¹ numbers to check.

- **Optimization:**  
  - Only consider n-digit palindromic numbers, which are much fewer.
  - For n digits, construct palindromes by building half (the prefix), then mirroring it to make the full number.
  - For each palindrome, start from the largest and check divisibility by k.
  - The number of palindromes for n digits is around 9 × 10^{⌊n/2⌋-1}.

- **Special cases:**  
  - If k = 1, then the answer is the largest n-digit palindrome (all 9s).
  - For small k (≤9), we can just check divisibility directly.

- **Reasoning for final approach:**  
  - Generating palindromes efficiently and checking for divisibility allows us to minimize the search space, making the solution efficient enough for n ≤ 10.

### Corner cases to consider  
- n = 1 (single digit numbers)
- k = 1 (all numbers are valid)
- Palindrome with leading zero (must not be allowed)
- No palindrome is divisible by k (Problem guarantees always at least one solution by constraints)
- n is even or odd (mirroring logic differs)

### Solution

```python
def largest_palindrome_divisible_by_k(n: int, k: int) -> str:
    # Define the number of digits in the first half
    half = (n + 1) // 2

    # The minimum and maximum numbers for the 'half' part
    # First digit cannot be 0 (prevent leading zeros)
    start = 10**(half - 1)
    end = 10**half - 1

    # Iterate from largest to smallest half
    for prefix in range(end, start - 1, -1):
        s = str(prefix)
        # Build palindrome based on even or odd n
        if n % 2 == 0:
            pal_str = s + s[::-1]
        else:
            pal_str = s + s[:-1][::-1]
        pal_num = int(pal_str)
        if pal_num % k == 0:
            return pal_str
    # If none found (should not happen in problem constraints)
    return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(10^{⌊n/2⌋}) — We generate all palindrome candidates with ⌊n/2⌋ to ⌈n/2⌉ digits, checking divisibility for each.

- **Space Complexity:**  
  - O(1) — Only a fixed amount of extra space for variables and string construction.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k could have more digits (e.g. up to 1e9)?
  *Hint: Brute-force checking divisibility for each palindrome may be too slow. Consider divisibility properties or pruning search space.*

- What if n could be up to 100 or 10⁶?
  *Hint: The number of palindromes grows exponentially with n; you may need a mathematical approach or reverse construction.*

- How to count all n-digit palindromes divisible by k?
  *Hint: Consider digit DP or memoization where you count instead of maximizing.*

### Summary
This problem is a classic example of **palindrome generation by prefix mirroring** combined with a divisibility check.  
The **key idea** is drastically reducing the search space from all n-digit numbers to only n-digit palindromes, enabling an efficient solution.  
This prefix–mirror pattern is common in palindrome construction, and the technique is widely applicable in problems involving palindromic numbers or string patterns.


### Flashcard
Generate n-digit palindromes by building the first ⌊n/2⌋ digits and mirroring; check each palindrome for divisibility by k, starting from largest.

### Tags
Math(#math), String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Number Theory(#number-theory)

### Similar Problems
- Palindrome Number(palindrome-number) (Easy)
- Find the Closest Palindrome(find-the-closest-palindrome) (Hard)