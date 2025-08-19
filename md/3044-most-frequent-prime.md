### Leetcode 3044 (Medium): Most Frequent Prime [Practice](https://leetcode.com/problems/most-frequent-prime)

### Description  
Given a 2D matrix of digits, generate numbers by moving from each cell in any of the eight possible directions (up, down, left, right, and the four diagonals). While moving, form numbers by appending the value of the cell you step on (so, each number is built digit-by-digit as you continue moving). Each prefix of this movement (including just the starting cell) is considered a number. Your task is to find the **prime number greater than 10** that appears most frequently among all such numbers. If there are multiple such primes with the highest frequency, return the largest one. If no prime number greater than 10 is generated, return -1.

### Examples  

**Example 1:**  
Input: `mat = [[1,3,1],[1,1,1],[1,3,1]]`  
Output: `13`  
*Explanation: Numbers are formed like 1, 13, 131, 3, 31, 311, etc., as you traverse in all 8 directions from every cell. 13 is the most frequently occurring prime > 10 in this matrix.*

**Example 2:**  
Input: `mat = [[2,2,2],[2,2,2],[2,2,2]]`  
Output: `-1`  
*Explanation: All possible numbers are repetitions of the digit 2 (e.g., 2, 22, 222, etc.). None of them are primes greater than 10.*

**Example 3:**  
Input: `mat = [[4,5,7]]`  
Output: `457`  
*Explanation: From the leftmost cell, moving only east forms 4, 45, and 457. 457 is a prime and is the only such prime > 10.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For every cell, start a separate generation in each of the eight directions. Keep moving, adding the next digit to the number as a string or integer. For each prefix that becomes a number, check if it is a prime greater than 10, and maintain a frequency count of such primes.  
- **Optimization:**  
  - Avoid generating numbers with leading zeros unless the starting cell is zero.
  - Instead of re-checking primality for the same number multiple times, cache previous primality results.
  - For small numbers, use trial division for primality check; for larger ranges, sieve could be considered but here, numbers will likely be in a reasonable bound.
- **Final Choice:**  
  - Simple simulation with memoized primality checking works, since the grid is small (constraints are usually ≤10 for row/col), and movement steps are limited by grid size.  
  - Trade-off: More efficient primality check for repeated numbers could matter if matrix is large; otherwise, the count-dictionary and brute-force path generation are sufficient.

### Corner cases to consider  
- Input grid consisting of all the same digit.
- All prime candidates are ≤10.
- No prime numbers generated at all.
- Multiple primes with the same frequency—need to return the largest.
- Movement reaches matrix edge before completing number formation.
- Matrix of size 1 × 1 or 1 × n or n × 1 (single row or column).

### Solution

```python
def most_frequent_prime(mat):
    def is_prime(n):
        if n <= 1:
            return False
        if n == 2:
            return True
        if n % 2 == 0:
            return False
        for i in range(3, int(n ** 0.5) + 1, 2):
            if n % i == 0:
                return False
        return True

    from collections import defaultdict

    m, n = len(mat), len(mat[0])
    freq = defaultdict(int)
    dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]

    # For caching repeated primality results
    prime_cache = {}

    for i in range(m):
        for j in range(n):
            for dx,dy in dirs:
                x, y = i, j
                num = 0
                # Step from current cell, extend up to max(m, n) steps (worst-case)
                steps = max(m, n)
                for k in range(steps):
                    if 0 <= x < m and 0 <= y < n:
                        num = num * 10 + mat[x][y]
                        if num > 10:
                            if num in prime_cache:
                                isprime = prime_cache[num]
                            else:
                                isprime = is_prime(num)
                                prime_cache[num] = isprime
                            if isprime:
                                freq[num] += 1
                        x += dx
                        y += dy
                    else:
                        break

    ans, maxfreq = -1, 0
    for v, f in freq.items():
        if f > maxfreq or (f == maxfreq and v > ans):
            maxfreq = f
            ans = v
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × n × 8 × max(m, n) × sqrt(V)), where  
  - for each cell (m × n), check 8 directions, each can go up to max(m, n) steps,  
  - and for each formed number (potentially O(1) per direction per starting cell), primality check for value up to V (max-possible value, O(sqrt(V)) per check).  
  - Primality cache can speed up repeat checks.
- **Space Complexity:**  
  - O(K) for frequency dictionary (K = number of different primes generated)  
  - O(K) for prime cache  
  - Input storage (matrix) is O(m × n).

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the matrix is very large (1000 × 1000), how would you optimize?  
  *Hint: Consider limiting path length, batch processing, or precomputing primes with a sieve up to largest possible number.*

- What if you need to count all numbers, not just primes?  
  *Hint: Adjust the counting to all values, without the prime check.*

- If numbers can be negative (signed digits in matrix), how will you adapt?  
  *Hint: Adjust logic to handle concatenating negative signs, which is ambiguous—likely prohibit negative digits.*

### Summary
We simulate all directional paths from every cell, generating numbers by concatenating digits, and count frequencies for those that are primes greater than 10. We use a frequency dictionary and cache prime checks to optimize for repeated values. This simulation/backtracking approach is common for matrix traversal problems involving prefix property checks, and the pattern applies to similar "generate as you go" substring or subarray counting problems.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Matrix(#matrix), Counting(#counting), Enumeration(#enumeration), Number Theory(#number-theory)

### Similar Problems
