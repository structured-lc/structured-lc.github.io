### Leetcode 3556 (Medium): Sum of Largest Prime Substrings [Practice](https://leetcode.com/problems/sum-of-largest-prime-substrings)

### Description  
Given a string consisting entirely of digits, find all **unique prime numbers** that can be made by interpreting any of its substrings as integer numbers (convert substrings—ignoring leading zeros—into integers). Return the **sum of the three largest unique prime numbers** found. If there are fewer than three, return the sum of all unique primes found. If there are none, return 0.  
Each prime should only be counted once, no matter how many substrings generate that prime.

### Examples  

**Example 1:**  
Input: `s = "12234"`  
Output: `1469`  
*Explanation: Unique prime substrings are: 2, 3, 23, 223, 1223. The 3 largest are 1223, 223, and 23 (sum = 1469).*

**Example 2:**  
Input: `s = "111"`  
Output: `11`  
*Explanation: Only unique prime from all substrings is 11.*

**Example 3:**  
Input: `s = "2357"`  
Output: `2357`  
*Explanation: Unique primes: 2, 3, 5, 7, 23, 37, 53, 57, 235, 357, etc., but only primes are 2, 3, 5, 7, 23, 53, 37, 73, 257, 523,  2357. The 3 largest are 2357, 523, 257; sum = 3137.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Generate all possible substrings of s (since length ≤ 10, total substrings ≤ 55).  
  - Convert substring to int (ignore leading zeros).
  - For each unique value, check if it’s a prime (need efficient, accurate is_prime function).
  - Store unique primes in a set.
  - Sort all primes found, sum the top 3 (or all if <3).

- **Optimization:**  
  - The bottleneck is prime checking on potentially large numbers (up to 10⁹+ since up to 10 digits).
  - Use a simple Miller-Rabin or deterministic trials for small n (workable since number of checks is small).
  - Deduplicate as we compute for efficiency.

- This is feasible since s.length ≤ 10, meaning no substring value exceeds 10 digits, and number of substrings is quadratic.

- **Trade-offs:**  
  - Do not precompute with sieve above 10⁶, since primes of up to 10 digits are possible.
  - Fast, correct primality test is the main technical demand.

### Corner cases to consider  
- s = "1" → no prime can be formed (1 is not prime), expect 0.
- s = "0" or only zeros → no prime possible, expect 0.
- String is all the same digit, e.g., "9999999999".
- Primes formed from substrings with leading zeros, e.g., "011" yields prime 11, not 011.
- Substrings producing the same prime—should be unique in final set.
- s with no valid primes at all—return 0.

### Solution

```python
def sum_largest_prime_substrings(s: str) -> int:
    # Helper function: Primality test (for numbers up to 10**10),
    # Using deterministic Miller-Rabin bases covering 64-bit
    def is_prime(n):
        if n < 2: return False
        if n in (2, 3): return True
        if n % 2 == 0 or n % 3 == 0:
            return False
        if n < 1373653:
            for a in (2, 3):
                if not miller_rabin_base(n, a):
                    return False
            return True
        # For up to 32-bit, these are sufficient bases
        for a in (2, 3, 5, 7, 11):
            if not miller_rabin_base(n, a):
                return False
        return True

    # Miller-Rabin base test
    def miller_rabin_base(n, a):
        d, s = n-1, 0
        while d % 2 == 0:
            d //= 2
            s += 1
        x = pow(a, d, n)
        if x == 1 or x == n-1:
            return True
        for _ in range(s-1):
            x = pow(x, 2, n)
            if x == n-1:
                return True
        return False

    primes = set()
    n = len(s)
    for i in range(n):
        for j in range(i+1, n+1):
            val = int(s[i:j])  # leading zeros ignored by int()
            if is_prime(val):
                primes.add(val)
    if not primes:
        return 0
    largest = sorted(primes, reverse=True)[:3]
    return sum(largest)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n² × K) where n is string length, K is the time for primality check (very small n, fast in practice).
  - Main cost is number of substrings (n(n+1)/2), each primality check is low-constant if the Miller-Rabin implementation is efficient.
- **Space Complexity:**  
  - O(U) where U is the number of unique primes found (very small, as n ≤ 10).

### Potential follow-up questions (as if you’re the interviewer)  

- What if s could be up to 1000 digits long?  
  *Hint: How would you avoid generating all substrings or optimize primality testing at large scale?*

- If the primes are to be listed, not summed, how would you alter your approach?  
  *Hint: Focus on sorting and output changes, not on substring/gen approach.*

- How would you efficiently handle the case where substrings are required to be non-overlapping?  
  *Hint: Consider DP for maximum-sum prime partitioning.*

### Summary
This problem is a classic example of substring generation combined with a set-based uniqueness constraint and numeric property check (primality), with a final top-k aggregation (sum of k largest).  
Typical patterns: Generate all substrings, filter with a predicate (here: is_prime), deduplicate via set.  
The pattern is commonly applicable to digit-string transformation and "find maximal substructure with property" problems.  
Key challenge lies in the efficient correctness of the prime check, which is crucial for numbers possibly up to 10 digits.


### Flashcard
Generate all substrings (≤55 for length 10), convert to integers, check primality for each unique value, and sum the top 3 largest primes.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Sorting(#sorting), Number Theory(#number-theory)

### Similar Problems
