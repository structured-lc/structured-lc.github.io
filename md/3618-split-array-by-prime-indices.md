### Leetcode 3618 (Medium): Split Array by Prime Indices [Practice](https://leetcode.com/problems/split-array-by-prime-indices)

### Description  
Given an integer array **nums**, split it into two arrays, **A** and **B**, using this rule:
- Elements at **prime indices** (where the index itself is a prime number) must go into array **A**.
- All other elements (indices that are not prime) go into array **B**.
Return the **absolute difference** between the sums of the two arrays:  
\[\lvert \text{sum}(A) - \text{sum}(B) \rvert\]  
*Prime indices* are indices in the array that correspond to prime numbers (0-based). A **prime number** is a natural number greater than 1 that has no positive divisors other than 1 and itself.

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 4]`  
Output: `1`  
Explanation:  
Prime indices: 2 (only `2` is prime)  
Array A: [4]  
Array B: [2, 3]  
\(|4 - (2+3)| = |4-5| = 1\)

**Example 2:**  
Input: `nums = [-1, 5, 7, 0]`  
Output: `3`  
Explanation:  
Prime indices: 2, 3  
Array A: [7, 0]  
Array B: [-1, 5]  
\(|(7+0) - (-1+5)| = |7-4| = 3\)

**Example 3:**  
Input: `nums = [10, 99, 1, 2, 3]`  
Output: `102`  
Explanation:  
Prime indices: 2, 3  
Array A: [1, 2]  
Array B: [10, 99, 3]  
\(|(1+2) - (10+99+3)| = |3-112| = 109\)

### Thought Process (as if you're the interviewee)  
Brute force approach:  
- For each index \(i\), check if \(i\) is a prime.
- If yes, add nums[i] to A; otherwise, to B.
- Finally, calculate and return the absolute difference between sum(A) and sum(B).

Optimizations:  
- Checking if a number is prime for every index could be costly (O(n√n)).  
- Since we need to know for every index (from 0 to n-1) whether it is prime, we can precompute all primes up to n using the **Sieve of Eratosthenes** (O(n log log n)).  
- Then, one pass over nums, separating based on whether each index is prime.

Trade-offs:  
- Sieve provides the most efficient way for this range of repeated prime checks.
- The space and time usage is both minimal and efficient for \( n \leq 10^5 \).

### Corner cases to consider  
- Empty array: nums = []. Should return 0.
- Array with a single element: only index 0 (not prime), so goes to B.
- All array indices are non-prime (length 2): both go to B.
- All array indices are prime (impossible except for indices 2+).
- Negative numbers in input.
- All nums are equal.
- Large arrays to check efficiency.

### Solution

```python
def splitArrayByPrimeIndices(nums):
    n = len(nums)
    # Step 1: Sieve of Eratosthenes to identify prime indices up to n-1
    is_prime = [False, False] + [True] * (n - 2)  # 0 and 1 are not prime
    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n, i):
                is_prime[j] = False

    sum_A = 0  # Sum of elements at prime indices
    sum_B = 0  # Sum of elements at non-prime indices

    for idx, val in enumerate(nums):
        if is_prime[idx]:
            sum_A += val
        else:
            sum_B += val

    return abs(sum_A - sum_B)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sieve of Eratosthenes: \(O(n \log \log n)\)
  - Single pass through nums: \(O(n)\)  
  - Overall: **O(n \log \log n)**
- **Space Complexity:**  
  - To store primality info for indices: \(O(n)\)
  - Small constant space otherwise.

### Follow-up questions  
- What if we want to generalize to other "special index" functions, not just primes?
- What if the array is streaming, i.e., elements come one-by-one? Can you process without storing the whole primality sieve?