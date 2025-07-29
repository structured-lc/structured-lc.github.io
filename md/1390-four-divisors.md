### Leetcode 1390 (Medium): Four Divisors [Practice](https://leetcode.com/problems/four-divisors)

### Description  
Given an integer array, find all numbers with exactly four divisors, and sum of those divisors. Return the total for all such numbers in the array.

### Examples  
**Example 1:**  
Input: `nums=[21,4,7]`  
Output: `32`  
*Explanation: 21’s divisors are 1,3,7,21 (sum=32); 4 (1,2,4) and 7 (1,7) don't qualify.*

**Example 2:**  
Input: `nums=[10,9,5,6]`  
Output: `64`  
*Explanation: 10 (1,2,5,10, sum=18), 9 (1,3,9, NOT 4 divisors), 5 and 6... only those with 4 divisors count.*

**Example 3:**  
Input: `nums=[15,28,14]`  
Output: `80`  
*Explanation: 15→1,3,5,15 (sum 24); 28→1,2,4,7,14,28 (6 divisors, skip); 14→1,2,7,14 (sum 24). 24+24=48.*

### Thought Process (as if you’re the interviewee)  
For each number, find all its divisors. If it has exactly 4, sum them. Quick way: divisors come in pairs (d, n//d), only need to √(n). If a number is p³ (prime cube), or pq (prod of 2 primes), has exactly 4 divisors.
- Go through each num.
- For each, loop through 1 to √(num) to find divisors.
- Count total; if exactly 4, sum.

Optimizations: For each num, once count > 4, break. For speed, check semiprimes (num=p×q, p!=q both prime), as product of 2 distinct primes has 4 divisors: 1, p, q, num.

### Corner cases to consider  
- Numbers < 6 (never 4 divisors)
- Duplicates in nums
- num is square or cube
- num is prime
- Large numbers

### Solution

```python
def sumFourDivisors(nums):
    def get_four_div_sum(x):
        cnt = 0
        total = 0
        for d in range(1, int(x**0.5)+1):
            if x % d == 0:
                q = x // d
                if d != q:
                    cnt += 2
                    total += d + q
                else:
                    cnt += 1
                    total += d
                if cnt > 4:
                    break
        return total if cnt == 4 else 0
    
    return sum(get_four_div_sum(n) for n in nums)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N × √M), N = len(nums), M = max(nums)
- **Space Complexity:** O(1) extra (no storage per num)

### Potential follow-up questions (as if you’re the interviewer)  
- Can you speed up by precomputing for large inputs?
  *Hint: Sieve up to max(nums), mark semiprime numbers*

- How can you do it for very large nums? (nums > 10^9)
  *Hint: Trial division, or check for p × q only, both prime*

- What would change if the question was "exactly k divisors"?
  *Hint: Generalize divisor counting logic*

### Summary
Pattern is divisor counting per number, classic for brute-force number theory + optimizations for semiprimes. Useful pattern for questions about divisor properties, often used in math/code interviews.