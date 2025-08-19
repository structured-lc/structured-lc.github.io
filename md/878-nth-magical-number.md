### Leetcode 878 (Hard): Nth Magical Number [Practice](https://leetcode.com/problems/nth-magical-number)

### Description  
Given three positive integers n, a, and b, we define a "magical number" as any integer divisible by either a or b. The task is to determine the nᵗʰ magical number in the ascending sequence of all such numbers. Since the result can be very large, return the answer modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `n = 1, a = 2, b = 3`  
Output: `2`  
*Explanation: The magical numbers are 2, 3, 4, 6, ... The 1ˢᵗ is 2.*

**Example 2:**  
Input: `n = 4, a = 2, b = 3`  
Output: `6`  
*Explanation: The magical numbers are 2, 3, 4, 6, ... The sequence is [2, 3, 4, 6]. The 4ᵗʰ is 6.*

**Example 3:**  
Input: `n = 5, a = 2, b = 4`  
Output: `10`  
*Explanation: The magical numbers are 2, 4, 6, 8, 10, ... The 5ᵗʰ is 10.*

**Example 4:**  
Input: `n = 3, a = 6, b = 4`  
Output: `8`  
*Explanation: The magical numbers are 4, 6, 8, 12, ... The sequence is [4, 6, 8], so the 3ʳᵈ is 8.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to iterate through each integer and count those divisible by either a or b until we've found the nᵗʰ magical number. However, the values of n can be very large (up to 10⁹), making brute-force computationally infeasible.

The optimized approach is to recognize this as a "k-th smallest in sorted union of two arithmetic progressions" problem.  
- For a given number x, the count of magical numbers ≤ x is:  
  count = ⌊x / a⌋ + ⌊x / b⌋ - ⌊x / lcm(a, b)⌋  
- We can use binary search to find the minimum x such that `count` is at least n.
- Binary search bounds: lower is 0, upper is n × min(a, b), since in the worst case every magical number is a multiple of the smaller of a or b.
- Each time, at mid, count numbers ≤ mid that are magical, adjust the range accordingly.

The key rationale: counting efficiently via inclusion-exclusion, and shrinking the search space logarithmically ensures performance.

### Corner cases to consider  
- n = 1 (smallest non-trivial n)
- a == b (all magical numbers are multiples of a, so answer is a × n)
- a and b are co-prime (no overlaps except multiples of a × b)
- a or b divides the other (e.g., a = 4, b = 2), so lcm = max(a, b)
- Maximum constraints: n up to 10⁹, a or b up to 4 × 10⁴

### Solution

```python
def nthMagicalNumber(n, a, b):
    # Helper function to get gcd
    def gcd(x, y):
        while y:
            x, y = y, x % y
        return x

    # Helper to get lowest common multiple
    def lcm(x, y):
        return x * y // gcd(x, y)

    MOD = 10**9 + 7

    lcm_ab = lcm(a, b)
    left = 0
    right = n * min(a, b)  # Upper bound: all magical numbers could be a or b

    while left < right:
        mid = (left + right) // 2
        # Count magical numbers ≤ mid
        count = mid // a + mid // b - mid // lcm_ab
        if count < n:
            left = mid + 1
        else:
            right = mid

    return left % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(n × min(a, b))). Binary search is applied over the range [0, n × min(a, b)], each check is O(1) arithmetic, so total is logarithmic in search space size.
- **Space Complexity:** O(1). Only a constant number of variables are used; no extra storage depending on n, a, or b.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of two numbers (a, b) we want the nᵗʰ number divisible by at least one of k numbers?
  *Hint: Can you generalize the inclusion-exclusion principle for k numbers?*

- How would you find the sequence of the first n magical numbers, not just the nᵗʰ one?
  *Hint: Can you efficiently merge two arithmetic progressions up to n elements?*

- What changes if n, a, or b could be very large, but you only want an approximate answer?
  *Hint: Is there a way to estimate density or use probabilistic methods?*

### Summary
This problem relies on **binary search over the answer space** and inclusion-exclusion counting. It's a classic approach for problems where you can efficiently count candidates but not generate them explicitly—found in scheduling, streaming, and numerical sequence intersection problems. The modular math and LCM/GCD logic frequently appear in problems dealing with divisibility and arithmetic progressions.

### Tags
Math(#math), Binary Search(#binary-search)

### Similar Problems
