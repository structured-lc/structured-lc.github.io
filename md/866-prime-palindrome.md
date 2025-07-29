### Leetcode 866 (Medium): Prime Palindrome [Practice](https://leetcode.com/problems/prime-palindrome)

### Description  
Given an integer `n`, find the **smallest prime palindrome** greater than or equal to `n`.  
A **prime palindrome** is a number that is both:
- **Prime**: only divisible by 1 and itself, and greater than 1
- **Palindrome**: reads the same forwards and backwards

For example, if the input is 13, the output should be 101 because it is the smallest number ≥ 13 that is both prime and a palindrome.

### Examples  

**Example 1:**  
Input: `6`,  
Output: `7`  
*Explanation: 6 is not a prime palindrome. The next candidate is 7, which is both prime and a palindrome.*

**Example 2:**  
Input: `8`,  
Output: `11`  
*Explanation: 8 is not a prime palindrome. 9 is a palindrome but not prime. 10 is not a palindrome nor prime. 11 is a palindrome and prime.*

**Example 3:**  
Input: `13`,  
Output: `101`  
*Explanation: 13 is not a palindrome. 14–99 are not both palindromes and primes. 101 is the smallest such number.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Start at `n` and increment upward.
  - For each number, check if it is a palindrome.
  - If so, check if it is prime.
  - Return the first number meeting both conditions.
- **Optimizing:**  
  - Checking all numbers is slow, especially primes.
  - Most even-length palindromes >11 are not prime because they're divisible by 11.
  - Generate **odd-length palindromic numbers** only for efficiency.
  - Primality test can be improved using trial division up to √n.
  - If `n` hits a range where all candidates are eight-digit even-length palindromes (10⁷ < n < 10⁸), jump to 10⁸.
- **Final approach:**  
  - Generate palindromic numbers ≥n, only odd-length except for 11.
  - For each palindrome, check for primality.
  - Return the first found; since the answer exists and is <2×10⁸, this method is feasible.

### Corner cases to consider  
- n < 2 (smallest prime)
- n is already a prime palindrome (should return n)
- n within eight-digit palindromes (skip, since all are divisible by 11 except 11 itself)
- Very large n near bounds (e.g., n = 10⁸)

### Solution

```python
def is_palindrome(x):
    return str(x) == str(x)[::-1]

def is_prime(x):
    if x < 2: return False
    if x == 2: return True
    if x % 2 == 0: return False
    for i in range(3, int(x ** 0.5) + 1, 2):
        if x % i == 0:
            return False
    return True

def prime_palindrome(n):
    # Only 11 is an even-length palindrome that is prime
    if 8 <= n <= 11:
        return 11

    # Generate all odd-length palindromes with up to 9 digits
    for length in range(1, 6):  # 1 to 5 digits for the root
        start = 10**(length - 1) if length > 1 else 1
        end = 10**length
        for root in range(start, end):
            s = str(root)
            p = int(s + s[-2::-1])  # make palindrome (odd-length)
            if p >= n and is_prime(p):
                return p

    # If not found yet, check the rest up to 2×10⁸
    for p in range(10**7, 2*10**8):
        if is_palindrome(p) and is_prime(p):
            return p
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For small n, loop generates palindromic numbers with up to 9 digits (≤100,000 candidates).
  - Primality check per candidate: O(√n).
  - Worst case: O(M×√N), where M is the number of palindromic numbers up to the limit.
- **Space Complexity:**  
  - O(1) extra space, aside from variables for generating palindromes and checking primality.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you speed up the primality test for very large numbers?
  *Hint: Miller-Rabin or other probabilistic primality tests.*

- Can you generate palindromes more efficiently?
  *Hint: Digit permutations, skip ranges where palindrome property is impossible (even lengths >2 digits).*

- What if we want the kᵗʰ prime palindrome ≥ n?
  *Hint: Adjust loop to count up to k matches instead of stopping after one.*

### Summary
This problem combines two interview classics—palindrome checking and primality testing.  
Key patterns: string reversal for palindromes, trial division for primality, and digit construction for generating odd-length palindromes.  
This "generate candidate, filter condition" pattern is common for custom number generation problems, and optimizing by domain-specific math insights (e.g., primes and palindromes) can greatly speed up brute-force baseline algorithms.