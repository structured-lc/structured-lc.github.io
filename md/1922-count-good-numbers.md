### Leetcode 1922 (Medium): Count Good Numbers [Practice](https://leetcode.com/problems/count-good-numbers)

### Description  
Given a positive integer n, count how many n-digit strings (with leading zeros allowed) are "good".  
A "good" number is defined as:
- At every **even index** (0-based), the digit is **even** (from {0, 2, 4, 6, 8}).
- At every **odd index**, the digit is a **prime digit** (from {2, 3, 5, 7}).

Return the count of all such possible n-digit numbers modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `5`  
*Explanation: Only the 0th position exists (even indexed), so it must be one of {0,2,4,6,8} (5 choices).*

**Example 2:**  
Input: `n = 2`  
Output: `20`  
*Explanation:  
Index 0 (even): 5 options (0,2,4,6,8).  
Index 1 (odd): 4 options (2,3,5,7).  
Total = 5 × 4 = 20.*

**Example 3:**  
Input: `n = 4`  
Output: `400`  
*Explanation:  
Even indices: 0,2 → each has 5 choices → 5² = 25  
Odd indices: 1,3 → each has 4 choices → 4² = 16  
Total = 25 × 16 = 400.*

### Thought Process (as if you’re the interviewee)  

The brute-force approach would be to generate all n-digit numbers, check each for the even/prime rule, and count the good ones.  
But since n can be up to 10¹⁵, brute force is impossible.

Instead, observe:
- At every even index: 5 choices.
- At every odd index: 4 choices.

Let cₑ = count of even-indexed positions = ⌈n/2⌉.  
Let cₒ = count of odd-indexed positions = ⌊n/2⌋.  
So the answer is: 5^(cₑ) × 4^(cₒ)

For large exponents, use **binary exponentiation** (fast power algorithm), since regular pow is too slow for big n.

Trade-offs:  
- Binary exponentiation is efficient (O(log n)), doesn’t require extra space, and handles very large n.

### Corner cases to consider  
- n = 1 (should work for single digit case)
- n = very large value (test efficiency)
- Modulo required (watch for overflows)
- Input always ≥ 1 (no 0 or negative n per problem statement)

### Solution

```python
MOD = 10**9 + 7

def power(x, n):
    # Computes xⁿ mod MOD using binary exponentiation
    res = 1
    x = x % MOD
    while n > 0:
        if n % 2 == 1:
            res = (res * x) % MOD
        x = (x * x) % MOD
        n //= 2
    return res

def countGoodNumbers(n):
    # Number of even positions (0,2,4,...): ⌈n/2⌉
    even_positions = (n + 1) // 2
    # Number of odd positions (1,3,5,...): ⌊n/2⌋
    odd_positions = n // 2
    # Compute (5^even_positions) × (4^odd_positions) mod 1e9+7
    return (power(5, even_positions) * power(4, odd_positions)) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), as we compute two exponents using binary exponentiation.
- **Space Complexity:** O(1), no extra storage besides a few variables (no recursion stack, no structures scale with n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the sets of "even" and "prime" digits change (e.g., different number base or allowed digits)?  
  *Hint: Think about how to parameterize the solution based on the size of allowed digits.*

- What if instead of counting, you had to actually list all "good numbers" for small n?  
  *Hint: Consider backtracking or iterative generation for small n.*

- Suppose you need to support multiple queries for different n efficiently—can you precompute powers?  
  *Hint: Can you precompute an array of powers and use it for repeated queries?*

### Summary
This problem is a direct application of **combinatorics** and **modular exponentiation**:
- Counting sequences under certain digit rules leads to product of choices per position.
- Handling big exponents efficiently is a classic use-case for binary exponentiation, which is a common pattern in **fast power**, **modulo arithmetic**, and combinatorial counting problems with large constraints.
This technique generalizes to a wide range of digit-constrained counting questions and is a must-know pattern for coding interviews.


### Flashcard
The count is 5^(⌈n/2⌉) × 4^(⌊n/2⌋)—use fast exponentiation for large n.

### Tags
Math(#math), Recursion(#recursion)

### Similar Problems
- Count the Number of Arrays with K Matching Adjacent Elements(count-the-number-of-arrays-with-k-matching-adjacent-elements) (Hard)