### Leetcode 762 (Easy): Prime Number of Set Bits in Binary Representation [Practice](https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation)

### Description  
Given two integers **L** and **R**, you need to count how many numbers in the inclusive range [L, R] have a **prime number** of set bits in their binary representation.  
A set bit means the bit is 1 (e.g., the number of 1s in the binary representation).  
For example, 21 in binary is 10101, which has 3 set bits.

### Examples  

**Example 1:**  
Input: `L = 6, R = 10`  
Output: `4`  
*Explanation:*
- 6 → 110 (2 set bits, 2 is prime)
- 7 → 111 (3 set bits, 3 is prime)
- 8 → 1000 (1 set bit, 1 is not prime)
- 9 → 1001 (2 set bits, 2 is prime)
- 10 → 1010 (2 set bits, 2 is prime)

Numbers: 6, 7, 9, 10 have a prime number of set bits.

**Example 2:**  
Input: `L = 10, R = 15`  
Output: `5`  
*Explanation:*
- 10 → 1010 (2 set bits, 2 is prime)
- 11 → 1011 (3 set bits, 3 is prime)
- 12 → 1100 (2 set bits, 2 is prime)
- 13 → 1101 (3 set bits, 3 is prime)
- 14 → 1110 (3 set bits, 3 is prime)
- 15 → 1111 (4 set bits, 4 is not prime)

Numbers: 10, 11, 12, 13, 14 have a prime number of set bits.

**Example 3:**  
Input: `L = 1, R = 2`  
Output: `1`  
*Explanation:*  
- 1 → 1 (1 set bit, not prime)
- 2 → 10 (1 set bit, not prime)

None have prime. Output: 0

### Thought Process (as if you’re the interviewee)  
Start by iterating through all numbers from L to R. For each number, count the number of set bits in its binary representation (can do this by repeatedly shifting and counting).  
Check if that count is a prime number. If yes, increment the answer.  
Brute-force is fine since (R-L) ≤ 10,000.  
For optimization:  
- The max number in range is 10⁶, which has at most 20 set bits.
- So we can precompute all primes up to 20 and use a set for fast lookup.  
Final approach:  
For each number in [L, R], find its set bits, check if in the precomputed prime set, and count.

### Corner cases to consider  
- L = R (single number)
- Number with 0 set bits (input includes 0)
- Numbers at the bounds (1 and 10⁶)
- No numbers have a prime set bit count
- All numbers have a prime set bit count

### Solution

```python
def countPrimeSetBits(L: int, R: int) -> int:
    # Primes ≤ 20 (the largest possible number of set bits for numbers ≤ 10^6)
    prime_set = {2, 3, 5, 7, 11, 13, 17, 19}

    def count_set_bits(num):
        count = 0
        while num:
            count += num & 1
            num >>= 1
        return count

    result = 0
    for x in range(L, R + 1):
        bits = count_set_bits(x)
        if bits in prime_set:
            result += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(R − L + 1 × logN), where logN is from counting set bits in each number. For numbers up to 10⁶, this is manageable since max bits = 20.
- **Space Complexity:** O(1) — only a small set of primes and a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the range [L, R] can be much larger?  
  *Hint: Consider precomputing set bit counts for a block or using caching/memoization.*

- What if you’re given queries on different ranges?  
  *Hint: Think about preprocessing with a prefix sum so you can answer queries in constant time.*

- Can you speed up set bit counting?  
  *Hint: Use bit manipulation tricks like Kernighan’s algorithm or built-in functions if allowed.*

### Summary
This problem is a classic example of:  
- Preprocessing for small input-size (prime lookup for small numbers)
- Bit manipulation (count the number of set bits)
- Brute-force on a reasonably sized range  
The approach is simple and robust; this bit-counting technique is extremely common and reusable in subsets/enumeration/bitmask DP problems. Precomputing a limited set of results (like primes up to 20) can often improve code clarity and performance.


### Flashcard
For each number in [L, R], count set bits and increment answer if the count is in a precomputed set of primes ≤ 20.

### Tags
Math(#math), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Number of 1 Bits(number-of-1-bits) (Easy)