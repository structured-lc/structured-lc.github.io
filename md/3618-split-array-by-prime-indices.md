### Leetcode 3618 (Medium): Split Array by Prime Indices [Practice](https://leetcode.com/problems/split-array-by-prime-indices)

### Description  
Given an integer array, split it into two arrays A and B:
- **A** contains elements from `nums` whose indices are prime numbers.
- **B** contains elements from `nums` at all other (non-prime) indices.

Return the absolute difference between the sums of A and B:  
`|sum(A) - sum(B)|`

A “prime index” is any index i ≥ 2 where i is prime. Remember: array indices start at 0.

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 4]`  
Output: `1`  
Explanation:  
Prime indices: `[2]`  
A = `[4]`, B = `[2, 3]`.  
|4 - (2+3)| = |4-5| = 1

**Example 2:**  
Input: `nums = [-1, 5, 7, 0]`  
Output: `3`  
Explanation:  
Prime indices: `[2, 3]`  
A = `[7, 0]`, B = `[-1, 5]`.  
|(7 + 0) - (-1 + 5)| = |7 - 4| = 3

**Example 3:**  
Input: `nums = [10, -2, 6, 9, 11, 8]`  
Output: `8`  
Explanation:  
Prime indices: `[2, 3, 5]`  
A = `[6, 9, 8]`, B = `[10, -2, 11]`  
|(6+9+8) - (10+(-2)+11)| = |23 - 19| = 4

### Thought Process (as if you’re the interviewee)  
First, let's clarify:  
- For each index i (starting at 0), check if i is prime.
- If so, move nums[i] to A. Otherwise, to B.
- Finally, return |sum(A) - sum(B)|.

**Brute-force:**  
- For each index i, check if i is prime by trial division O(√i). For each i, that would be O(n√n) time for the array.
- This is suboptimal for large n.

**Optimization:**  
- Use the **Sieve of Eratosthenes** to quickly precompute prime indices up to n-1.
- Sieve is O(n log log n). Then, a simple scan splits A and B in one pass.

**Trade-offs:**  
- Sieve is optimal for large arrays.
- This avoids redundant computation and keeps code simple and efficient.

### Corner cases to consider  
- Empty array (`nums = []`): the result is 0.
- Array with 1 or 2 elements: prime indices start at 2, so A will be empty.
- All elements at non-prime indices.
- Negative values in nums.
- All elements are 0.
- Very large or small integer values.
- No prime indices at all.

### Solution

```python
def splitArrayByPrimeIndices(nums):
    n = len(nums)
    # Sieve of Eratosthenes to find all primes up to n-1
    is_prime = [False, False] + [True] * (n - 2)  # indices 0 and 1 are not prime
    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n, i):
                is_prime[j] = False

    sum_A = 0  # sum of elements at prime indices
    sum_B = 0  # sum of all other elements
    for i, val in enumerate(nums):
        if i >= 2 and is_prime[i]:
            sum_A += val
        else:
            sum_B += val

    return abs(sum_A - sum_B)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log log n) for the sieve, plus O(n) for the scan through nums. Overall: O(n log log n).
- **Space Complexity:** O(n) for the is_prime list; other variables use constant space outside the input.

### Potential follow-up questions (as if you’re the interviewer)  

- If the array is extremely large, can you handle memory limits?
  *Hint: Use a space-efficient sieve (bit array) or segmented sieve.*

- Can you split by different “index rules” (e.g., Fibonacci indices, even/odd indices)?
  *Hint: Abstract out the logic for which indices to pick.*

- If indices are 1-based (not 0-based), what would change?
  *Hint: Adjust offsets and clarify what counts as the 1ˢᵗ element.*

### Summary
This approach uses the classic Sieve of Eratosthenes pattern to preprocess prime indices for efficient array splitting. This problem is an example of the “index-based grouping” and “precompute/memoize to accelerate queries” patterns, both of which are very common in coding interviews. Variants often appear when you must bucket elements based on the properties of their indices, not values.

### Tags
Array(#array), Math(#math), Number Theory(#number-theory)

### Similar Problems
