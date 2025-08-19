### Leetcode 829 (Hard): Consecutive Numbers Sum [Practice](https://leetcode.com/problems/consecutive-numbers-sum)

### Description  
Given a positive integer **n**, find the number of ways to represent **n** as the **sum of consecutive positive integers**. Each sequence must consist of one or more consecutive numbers. For each sequence, all integers must be positive. Return the total number of such sequences.

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `2`  
*Explanation: 5 can be written as: `5` and `2 + 3`.*

**Example 2:**  
Input: `n = 9`  
Output: `3`  
*Explanation: 9 can be written as: `9`, `4 + 5`, and `2 + 3 + 4`.*

**Example 3:**  
Input: `n = 15`  
Output: `4`  
*Explanation: 15 can be written as: `15`, `7 + 8`, `4 + 5 + 6`, and `1 + 2 + 3 + 4 + 5`.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible start and end for consecutive sequences and add up the sum. For each possible length (1, 2, 3, ...), try to find if a sequence starting with some integer sums up to n. But n can be large (up to 10⁹), so this is too slow.
- **Formula approach:** For a sequence of length k starting at a (a, a+1, ..., a+k-1), the sum is:
  
  sum = k × a + k × (k-1)/2 = n  
  ⇒ a = (n - k × (k-1)/2) / k

  For a to be a **positive integer**, (n - k × (k-1)/2) must be divisible by k and the result must be ≥ 1. So we just need to check for all possible k, where k × (k-1)/2 < n, and test if (n - k × (k-1)/2) is a positive multiple of k. This is efficient, since k grows at most O(√(2n)).
- This is much faster since the possible values of k are limited by the quadratic growth of k × (k-1)/2.

### Corner cases to consider  
- **n is 1:** Only one way (1 itself).
- **n is a large prime:** Only 1 way (n itself).
- **n is a large composite:** Should efficiently handle up to 10⁹.
- Negative results for a (i.e., when sequence goes to 0 or below) must be ignored.
- Input at constraints’ boundaries.

### Solution

```python
def consecutiveNumbersSum(n: int) -> int:
    # Initialize count of ways
    count = 0
    # Try every possible sequence length k (number of terms)
    # k × (k-1) // 2 < n   equivalently k(k-1)/2 < n
    k = 1
    while k * (k - 1) // 2 < n:
        # Calculate numerator for first term a
        numerator = n - k * (k - 1) // 2
        # It must be divisible by k, and a ≥ 1
        if numerator % k == 0:
            a = numerator // k
            if a >= 1:
                count += 1
        k += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√n)  
  For each k, k × (k-1) // 2 < n ⇒ k ≤ O(√(2n)). So the loop runs at most about O(√n) times.

- **Space Complexity:** O(1)  
  Only a few integer variables are used. No recursion or extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize it if asked for the actual sequences, not just the count?  
  *Hint: Store or print the value of a and k whenever valid.*

- What changes if zero or negative numbers are allowed in the consecutive sequence?  
  *Hint: The formula for a changes, and you may have more valid (a, k) pairs to consider.*

- How does the approach change if the sequence must have at least two numbers?  
  *Hint: Start loop from k=2 rather than k=1.*

### Summary
The approach uses **mathematical series equations and divisibility checks** to efficiently count the number of ways to represent n as a sum of consecutive positive integers. This is a classic example of reducing a brute-force search to an O(√n) math-based algorithm, and the same technique applies to many sequence and sum decomposition problems.

### Tags
Math(#math), Enumeration(#enumeration)

### Similar Problems
