### Leetcode 1492 (Medium): The kth Factor of n [Practice](https://leetcode.com/problems/the-kth-factor-of-n)

### Description  
Given two positive integers `n` and `k`, find the kᵗʰ smallest factor of `n`. A factor of `n` is a positive integer that divides `n` evenly (i.e., without any remainder). If `n` has fewer than `k` factors, return `-1`.  
The factors must be listed in ascending order.

### Examples  

**Example 1:**  
Input: `n=12, k=3`  
Output: `3`  
*Explanation: Factors of 12 in order are [1, 2, 3, 4, 6, 12]. The 3ʳᵈ factor is 3.*

**Example 2:**  
Input: `n=7, k=2`  
Output: `7`  
*Explanation: Factors of 7 in order are [1, 7]. The 2ⁿᵈ factor is 7.*

**Example 3:**  
Input: `n=4, k=4`  
Output: `-1`  
*Explanation: Factors of 4 are [1, 2, 4]. There is no 4ᵗʰ factor, so output is -1.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force approach:  
- Iterate from 1 to n, check if each number divides n with no remainder.  
- For each such divisor, decrement k.  
- As soon as k==0, return the current number as the answer.  
- If the loop completes and k is still not zero, return -1.

Optimization:  
- Since checking factors up to n can require up to n iterations, for small n this is acceptable.  
- For larger n, we can also notice that factors come in pairs (`i` and `n//i`). By iterating only up to √n and storing unique factors, we could reduce time if needed.  
- However, for the constraints (n ≤ 1000), the simple iterative approach is efficient, requires no extra storage, and is more readable.

Trade-off:  
- O(n) time, O(1) space.  
- Slightly more optimal methods (O(√n)) require collecting and sorting factors, which isn't always necessary unless n is very large or k is very large.

### Corner cases to consider  
- k > number of factors of n  
- n is 1 (only one factor)  
- k = 1  
- n is a prime number (only two factors: 1 and n)  
- k equals number of factors of n (should return largest factor, n)

### Solution

```python
def kthFactor(n: int, k: int) -> int:
    # Loop through all numbers from 1 to n
    for i in range(1, n+1):
        # Check if i is a factor of n (n % i == 0)
        if n % i == 0:
            k -= 1    # Every time we find a factor, decrement k
            if k == 0:
                return i  # If k reaches 0, return the current factor
    # If we exit the loop and k > 0, that means there aren't enough factors
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because in the worst case, we check every integer from 1 to n.
- **Space Complexity:** O(1), as no extra data structures are used aside from a few integers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is extremely large (e.g., up to 10⁹)?  
  *Hint: Can you avoid iterating up to n? Consider factor pairs and sqrt(n).*

- What if you need to return the list of all factors, not just the kth one?  
  *Hint: Collect factors in a list as you iterate.*

- How would your approach change if k can be extremely large?  
  *Hint: Efficiently count and track factors without generating all of them.*

### Summary
This problem uses the classic divisor-check pattern, iterating through 1 to n and checking divisibility.  
It’s a straightforward O(n) brute-force algorithm, suitable due to small n limits in this problem.  
The direct count-down approach avoids storing unnecessary data (like a factor list), making it efficient in space.  
Similar logic applies for finding divisors or factors in other math/number theory problems, and extensions can use factor pair logic for large-scale n.