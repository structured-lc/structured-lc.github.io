### Leetcode 1735 (Hard): Count Ways to Make Array With Product [Practice](https://leetcode.com/problems/count-ways-to-make-array-with-product)

### Description  
Given an integer array `queries` where each query is `[n, k]`, you are to determine for each such pair: **how many ways can you fill an array of size `n` with positive integers so that the product of its elements is exactly `k`?**  
- The order of array elements matters (i.e., different permutations are different ways).  
- Each element must be a positive integer (≥1).
- As the answer can be very large, return it modulo 10⁹+7.  
- Return a result array `answer` where `answer[i]` gives the answer to the iᵗʰ query.

### Examples  

**Example 1:**  
Input: `queries = [[2,6],[5,1],[73,660]]`  
Output: `[4, 1, 50734910]`  
*Explanation:*
- Query 1: n=2, k=6 → Possible arrays: [1,6], [2,3], [3,2], [6,1] (4 ways)
- Query 2: n=5, k=1 → Only [1,1,1,1,1] is valid (1 way)
- Query 3: n=73, k=660 → Large number of ways due to many combinations and placements of 660’s prime factors.

**Example 2:**  
Input: `queries = [[1,1],[2,2],[3,3],[4,4],[5,5]]`  
Output: `[1, 2, 3, 10, 5]`  
*Explanation:*
- 1 element, product must be 1 → [1]
- 2 elements, product 2 → [1,2], [2,1] (2 ways)
- 3 elements, product 3 → All permutations of [1,1,3], [1,3,1], [3,1,1] (3 ways)

**Example 3:**  
Input: `queries = [[3,12]]`  
Output: ``  
*Explanation:*
- 3 elements, product 12 → Many decompositions, e.g.: [1,1,12], [1,2,6], [1,3,4], [2,2,3], ... with all orderings. In total, 18 ways.

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try all possible ways to fill length-n arrays with positive integers where the product is k.  
    - Extremely inefficient. For large n or large k, would require enumerating exponential possibilities.
- **Key insight**: The order matters, and every decomposition of `k` into n factors (allowing duplicates and 1s) is valid.
- **Number Theory**: Factorize k into prime factors. Distribute these exponents among n positions.
- If `k = p₁ᵉ¹ × p₂ᵉ² × ... × pₘᵉᵐ`, we must distribute exponent eⱼ among n indices (allowing zero in any part).
- For each prime factor, distributing eⱼ indistinguishable balls (exponents) into n bins (array slots) is **stars-and-bars**: ways = C(n + eⱼ - 1, eⱼ)
- Final answer for a query is the product (over all prime factors of k) of these combinations:
  - ans = Πⱼ C(n + eⱼ - 1, eⱼ)
- Precompute factorials up to needed size for efficiency. Use modular inverse for combinations mod 10⁹+7.

### Corner cases to consider  
- `k = 1` (only way is filling the array with 1s)
- `n = 1` (only one factor; must be equal to k, one way for any k)
- Prime k (single exponent, straightforward)
- Large exponents with small n, or small exponents with large n
- Queries with repeated values for memoization

### Solution

```python
MOD = 10**9 + 7
MAX = 10000 + 100

# Precompute factorials and modular inverses
fact = [1] * (MAX * 2)
inv = [1] * (MAX * 2)
for i in range(1, MAX * 2):
    fact[i] = (fact[i-1] * i) % MOD
inv[-1] = pow(fact[-1], MOD-2, MOD)
for i in range(len(inv)-2, 0, -1):
    inv[i] = (inv[i+1] * (i+1)) % MOD

def comb(n, k):
    if k < 0 or n < k:
        return 0
    return fact[n] * inv[k] % MOD * inv[n-k] % MOD

def prime_factors(x):
    factors = dict()
    d = 2
    while d * d <= x:
        while x % d == 0:
            factors[d] = factors.get(d, 0) + 1
            x //= d
        d += 1
    if x > 1:
        factors[x] = factors.get(x, 0) + 1
    return factors

def ways_to_fill(n, k):
    factors = prime_factors(k)
    ans = 1
    for exp in factors.values():
        # Distribute 'exp' indistinguishable exponents to 'n' slots
        ans = ans * comb(n + exp - 1, exp) % MOD
    return ans

def waysToFillArray(queries):
    res = []
    for n, k in queries:
        res.append(ways_to_fill(n, k))
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** For each query:  
  - Prime factorization is O(√k) per query (k ≤ 10⁴)  
  - Each combination: O(1) with precomputation (since factorials are precomputed up to limits)
  - So, O(Q × √k_max), where Q = number of queries

- **Space Complexity:**  
  - O(MAX) for factorial and inverse precomputation
  - O(number of queries) for result storage

### Potential follow-up questions (as if you’re the interviewer)  

- If k could be much larger (e.g., up to 10⁹ or 10¹⁸), how would you factorize it efficiently?
  *Hint: Precompute primes or use Pollard’s rho for large integers.*

- What if arrays could include zeros, or negative numbers?
  *Hint: Zeros kill the product; negatives add sign complexity.*

- If you wanted only unique (unordered) combinations, how would the answer change?
  *Hint: This becomes integer partition with multiplicity, ignore permutation order.*

### Summary
This problem is a classic **stars-and-bars** combinatorics application layered with prime factorization—distribute all exponents of each prime among all array slots. The key pattern is multichoose/combination with repetition, combined with fast modular combination computation. This is a standard technique for math combinatorial questions and appears in problems about partitions, compositions, and distributing indistinguishable objects into bins.