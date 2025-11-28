### Leetcode 3179 (Medium): Find the N-th Value After K Seconds [Practice](https://leetcode.com/problems/find-the-n-th-value-after-k-seconds)

### Description  
You are given two integers: **n** (length of array) and **k** (number of seconds). Start with an array `a` of length n, with all elements initialized to 1:  
`a = [1, 1, ..., 1]` (n times).

Each second, update every element so that `a[i]` becomes the sum of all its current and previous elements (i.e., `a[i] = a + ... + a[i]`). Find the value of the last element `a[n-1]` after k seconds. Return the answer modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `n = 4, k = 5`  
Output: `56`  
Explanation:  
Step-by-step array changes:  
0 seconds: `[1, 1, 1, 1]`  
1 second:  `[1, 2, 3, 4]`  
2 seconds: `[1, 3, 6, 10]`  
3 seconds: `[1, 4, 10, 20]`  
4 seconds: `[1, 5, 15, 35]`  
5 seconds: `[1, 6, 21, 56]`  
The answer is 56.

**Example 2:**  
Input: `n = 5, k = 3`  
Output: `35`  
Explanation:  
Initial:  `[1, 1, 1, 1, 1]`  
1 sec:     `[1, 2, 3, 4, 5]`  
2 sec:     `[1, 3, 6, 10, 15]`  
3 sec:     `[1, 4, 10, 20, 35]`  
Answer: 35.

**Example 3:**  
Input: `n = 1, k = 10`  
Output: `1`  
Explanation:  
No matter how many seconds, single-element arrays always stay `[1]`.

### Thought Process (as if you’re the interviewee)  
First, I would simulate the process per the problem’s description, updating a[i] as the prefix sum up to i for each second.  
However, since n and k can both reach 1000, the brute force O(k × n) is acceptable for constraints but not optimal.

On deeper inspection, forming the array this way is similar to building Pascal’s Triangle:  
The last number (a[n-1]) after k seconds is the number of ways to put k indistinct balls into n bins, i.e., “stars and bars”. This is the combinatorial value:  
C(n + k - 1, n - 1)  
So, I can either simulate or directly use combinatorics for O(n + k) by precomputing factorials and modular inverses for all values up to n+k.

I choose the combinatorial approach because it’s much faster and teaches an excellent pattern for similar problems.

### Corner cases to consider  
- n=1, any k: always 1  
- n ≥ 1, k=0: always 1  
- Very large n and/or k (test MOD is correctly applied)  
- Small n, large k and vice versa  
- k < n

### Solution

```python
def valueAfterKSeconds(n: int, k: int) -> int:
    MOD = 10**9 + 7
    # We want C(n + k - 1, n - 1)
    N = n + k - 1
    K = n - 1

    # Precompute factorials and inverse factorials up to N
    fact = [1] * (N + 1)
    inv = [1] * (N + 1)
    for i in range(1, N + 1):
        fact[i] = fact[i-1] * i % MOD

    # Fermat's little theorem for inverse modulo
    inv[N] = pow(fact[N], MOD-2, MOD)
    for i in reversed(range(N)):
        inv[i] = inv[i+1] * (i+1) % MOD

    return (fact[N] * inv[K] % MOD) * inv[N-K] % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k)  
  Factoring and inverse computation up to n+k, each step O(1). No simulation.
- **Space Complexity:** O(n + k)  
  For storing factorial and inverse arrays up to n+k.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n and k are up to 10⁶ or 10⁸?
  *Hint: Can we maintain only portions of Pascal’s triangle on-the-fly, or use Lucas’ Theorem for modular combinations?*

- Can you explain why the answer is the combinatorial number C(n+k-1, n-1)?
  *Hint: Map the array process to the “stars and bars” combinatorics.*

- Can you solve this with just O(n) space?
  *Hint: Use rolling arrays or only the last row kept (“prefix sum DP”).*

### Summary
This problem uses the **combination (stars and bars)** pattern — mapping array transformations to combinatorics. This is a classic approach for repeated sum-updates and multi-step growth calculations, and applying modular combinations is efficient and widely applicable in similar problems (e.g., distributing coins into piles, counting paths with step constraints, or Pascal’s Triangle queries).


### Flashcard
The array after k seconds follows Pascal's Triangle pattern; a[n−1] equals C(n+k−2, k), the binomial coefficient for "stars and bars."

### Tags
Array(#array), Math(#math), Simulation(#simulation), Combinatorics(#combinatorics), Prefix Sum(#prefix-sum)

### Similar Problems
- Left and Right Sum Differences(left-and-right-sum-differences) (Easy)