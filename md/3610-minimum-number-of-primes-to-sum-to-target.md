### Leetcode 3610 (Medium): Minimum Number of Primes to Sum to Target [Practice](https://leetcode.com/problems/minimum-number-of-primes-to-sum-to-target)

### Description  
Given a positive integer target, return the minimum number of 
**prime numbers** (repeated use allowed) that sum up to **target**. If it is impossible, return -1.

This is essentially the **coin change** problem, with coins as all primes less than or equal to target. Use as many of each as needed to reach the sum.

### Examples  

**Example 1:**  
Input: `target = 6`  
Output: `2`  
*Explanation: 3 + 3 = 6. (1 + 5, or 2 + 2 + 2 also valid)*

**Example 2:**  
Input: `target = 7`  
Output: `1`  
*Explanation: 7 is prime, so only one needed.*

**Example 3:**  
Input: `target = 1`  
Output: `-1`  
*Explanation: 1 cannot be written as a sum of primes.*


### Thought Process (as if you’re the interviewee)  
- At first glance, this is analogous to the **coin change** problem, with primes as coins.
- We need to generate all prime numbers ≤ target.
- Use dynamic programming (bottom-up) to compute for each sum up to target the minimum number needed.
- For each number i (from 2 to target), for each coin (prime) ≤ i, see if using it leads to a smaller count.
- Return the computed answer at dp[target].
- Special case: if target < 2, return -1 immediately.


### Corner cases to consider  
- target < 2 (no primes; invalid)
- target is itself a prime
- target cannot be made with available primes (shouldn't happen for target ≥ 2)
- target = 0
- target is exactly the sum of two (or more) same primes (e.g., 6 = 3 + 3)


### Solution

```python
# Sieve of Eratosthenes to get all primes up to target
# Standard bottom-up DP for coin change (min number of coins)

def min_number_of_primes(target: int) -> int:
    if target < 2:
        return -1
    # Step 1: Generate all primes up to target
    is_prime = [True] * (target + 1)
    is_prime[0:2] = [False, False]
    for i in range(2, int(target ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, target + 1, i):
                is_prime[j] = False
    primes = [i for i, val in enumerate(is_prime) if val]
    # Step 2: DP to fill in min number of primes to reach each value
    dp = [float('inf')] * (target + 1)
    dp[0] = 0
    for i in range(1, target + 1):
        for p in primes:
            if p > i:
                break
            if dp[i - p] + 1 < dp[i]:
                dp[i] = dp[i - p] + 1
    return dp[target] if dp[target] != float('inf') else -1
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(target × sqrt(target)) (for sieve) + O(target × π(target)) for DP, where π(target) is the number of primes ≤ target.
- **Space Complexity:** O(target) (for sieve list and dp array)


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is very large (e.g., target up to 10⁹), but we only need a yes/no answer?
  *Hint: Can you use more memory-efficient/sparse DP or greedy, or just test Goldbach's conjecture?*

- How to output one possible list of used primes, not just the count?
  *Hint: Track path/backtracking for reconstruction.*

- What if only given a list of available primes rather than all ≤ target?
  *Hint: Modify the prime generation step to not assume all primes ≤ target are available.*

### Summary
This is a classic **dynamic programming** problem with the twist that the coin set is all primes up to a certain number. It directly follows the minimum coin change DP pattern and can be repurposed for other similar "make up target value using elements with repetition" tasks.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Number Theory(#number-theory)

### Similar Problems
