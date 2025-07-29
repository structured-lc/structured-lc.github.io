### Leetcode 2614 (Easy): Prime In Diagonal [Practice](https://leetcode.com/problems/prime-in-diagonal)

### Description  
Given a 0-indexed n × n integer matrix `nums`, return the **largest prime number** that is located on *at least one* of the two main diagonals.  
- Diagonal-1: Top-left to bottom-right, i.e., elements `nums[i][i]`.
- Diagonal-2: Top-right to bottom-left, i.e., elements `nums[i][n-1-i]`.
A prime is any integer >1 with no divisors other than 1 and itself.
If **no primes** are found on the diagonals, return 0.

### Examples  

**Example 1:**  
Input: `[[1,2,3],[5,6,7],[9,10,11]]`  
Output: `11`  
*Explanation: Diagonal elements are [1,6,11] and [3,6,9]. Primes among them: 3, 11. The largest is 11.*

**Example 2:**  
Input: `[[1,2,3],[5,17,7],[9,11,10]]`  
Output: `17`  
*Explanation: Diagonal elements are [1,17,10] and [3,17,9]. Primes: 3, 17, 11. The largest is 17.*

**Example 3:**  
Input: `[[4,6,8],[10,12,14],[16,18,20]]`  
Output: `0`  
*Explanation: Diagonal elements are [4,12,20] and [8,12,16]. No primes on any diagonal.*

**Example 4:**  
Input: `[[5]]`  
Output: `5`  
*Explanation: Only one value, which appears on both diagonals. 5 is prime.*

### Thought Process (as if you’re the interviewee)  
- First, identify **all diagonal elements**: iterate i=0 to n-1, collect `nums[i][i]` and `nums[i][n-1-i]`. Add each to a set to avoid duplicate checking.
- For each collected diagonal element, check if it is **prime** (using basic prime check: divisibility up to √x).
- Track the **maximum prime** seen. Return 0 if none.
- Brute force is fine here, as matrix size is at most 300 × 300, and cell values ≤ 4×10⁶. Checking each diagonal element (2n at worst, but with overlap) for primality is fast since prime checking for values ≤ 4×10⁶ is efficient.

### Corner cases to consider  
- Single cell matrix (1x1), e.g., []: Appears on both diagonals.
- No primes at all on either diagonal: Should return 0.
- Primes present on only one diagonal, or only at the intersections.
- Both diagonals overlap at center element for odd n (avoid double-counting but doesn’t affect outcome).
- Large values near upper bound (test time complexity/primality checks).

### Solution

```python
def diagonalPrime(nums):
    # Helper to check if a number is prime
    def is_prime(x):
        if x < 2:
            return False
        if x == 2:
            return True
        if x % 2 == 0:
            return False
        for d in range(3, int(x ** 0.5) + 1, 2):
            if x % d == 0:
                return False
        return True

    n = len(nums)
    max_prime = 0

    for i in range(n):
        main_diag = nums[i][i]
        if is_prime(main_diag):
            if main_diag > max_prime:
                max_prime = main_diag

        anti_diag = nums[i][n - 1 - i]
        # Avoid double-checking center cell in odd n
        if i != n - 1 - i and is_prime(anti_diag):
            if anti_diag > max_prime:
                max_prime = anti_diag

    return max_prime
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × √m), where n is matrix size and m is the largest value on diagonal. For each of 2n-1 diagonal cells, check primality in O(√m) time.
- **Space Complexity:** O(1): Only a few integer variables for tracking, no extra data structures required.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to report **all** prime numbers on both diagonals, not just the largest?
  *Hint: Store each found prime in a set or list instead of a max variable.*

- What if the matrix is **not square** (rectangular)?
  *Hint: Adjust how you select diagonal indices, and handle out-of-bounds cases accordingly.*

- Could you **optimize the primality check** for repeated numbers or large datasets?
  *Hint: Use a Sieve of Eratosthenes up to max possible value, or memoize results for repeated checks.*

### Summary
This solution uses the **matrix diagonal traversal and basic number theory (prime checking up to √n)** pattern. It is space-efficient and leverages direct access and iteration, common for matrix diagonal problems. The primality check is optimized for the given bounds. This approach is widely applicable for similar “find-limited-feature-on-a-diagonal” problems, or when matrix cells should be filtered by custom test conditions.