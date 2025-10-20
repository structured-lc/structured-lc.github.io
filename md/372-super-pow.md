### Leetcode 372 (Medium): Super Pow [Practice](https://leetcode.com/problems/super-pow)

### Description  
Given a positive integer `a` and a very large positive integer `b`, represented as an array of digits (each digit is in [0-9]), compute (aᵇ) mod 1337. The array `b` may have up to 2000 digits, so you cannot simply construct the number or use regular `pow` due to integer overflow.  
You must use properties of modular exponentiation to compute the result efficiently.

### Examples  

**Example 1:**  
Input: `a = 2`, `b = [3]`  
Output: `8`  
*Explanation: 2³ mod 1337 = 8.*

**Example 2:**  
Input: `a = 2`, `b = [1,0]`  
Output: `1024`  
*Explanation: [1,0] means the exponent is 10, so 2¹⁰ mod 1337 = 1024.*

**Example 3:**  
Input: `a = 1`, `b = [4,3,3,8,5,2]`  
Output: `1`  
*Explanation: Any number powered by anything if base is 1 = 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  A direct approach would be to turn `b` into an int, then compute pow(a, b) % 1337. But `b` can be 2000 digits, which cannot fit in standard types.
- **Optimized:**  
  We use properties of modular exponentiation:  
  For single digit e, (aᵇ) mod k = ((a^{b₁₀} mod k)^{b₁ₑ} × (a^{e}) mod k) mod k.  
  For arrays:  
  - If b = [d₀,d₁, ..., dₙ], represent as:  
       a^{b} = a^{d₀d₁d₂...dₙ}  
       Use recursion: aᵇ mod k = (aᵇ¹⁰ mod k)ᵡ (a^{last digit}) mod k  
  - Compute recursively:
      super_pow(a, [d₀ ... dₙ]) = (super_pow(a, [d₀ ... dₙ₋₁])^{10} × a^{dₙ}) mod 1337
- We use a helper for modular exponentiation for small exponents (0-9), which can be fast.
- We reduce problem size by 1 each recursion, so time is O(n).

### Corner cases to consider  
- a = 0 (0^b, b!=0 ⇒ 0)
- a = 1 (1^b ⇒ 1)
- b =  (Any base to power 0 ⇒ 1)
- b has leading zeros (per constraint, shouldn’t but sanity check)
- Large values for `a`
- b with only one digit

### Solution

```python
def superPow(a, b):
    MOD = 1337

    # Helper: compute a^k % MOD where 0 ≤ k ≤ 9
    def mod_pow(x, k):
        result = 1
        x %= MOD
        for _ in range(k):
            result = (result * x) % MOD
        return result

    if not b:
        return 1  # base^0 = 1

    # Remove the last digit (use recursion)
    last = b.pop()
    part1 = superPow(a, b)
    part1 = pow(part1, 10, MOD)      # (a^{b[0...n-2]})^10 % MOD
    part2 = mod_pow(a, last)         # a^{b[n-1]} % MOD
    return (part1 * part2) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(b). Each recursive call reduces the array size by 1, and each call only does a constant amount of work.
- **Space Complexity:** O(n), due to recursion stack with up to n calls.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if mod was not 1337, but a much larger value (possibly up to 10⁹+7)?  
  *Hint: Does the same method scale? Are there any optimizations if mod is prime?*

- Can you solve it iteratively rather than recursively?  
  *Hint: Try traversing the digits in `b` from left to right, maintaining the answer progressively.*

- What changes if the base is negative or zero?  
  *Hint: Consider the math properties of exponentiation for negative and zero.*

### Summary
This problem is a classic use of modular exponentiation and recursion to handle extremely huge exponents that cannot fit in memory. The coding pattern is "divide the problem into last digit + the rest," a common trick in problems involving arrays as digits.  
Similar strategies apply in RSA, cryptography, and problems involving modular powers with large sizes.


### Flashcard
Use modular exponentiation and recursion: aᵇ mod k = (aᵇ¹⁰ mod k)¹⁰ × (a^{last digit} mod k) mod k.

### Tags
Math(#math), Divide and Conquer(#divide-and-conquer)

### Similar Problems
- Pow(x, n)(powx-n) (Medium)