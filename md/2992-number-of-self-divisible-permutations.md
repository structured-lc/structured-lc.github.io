### Leetcode 2992 (Medium): Number of Self-Divisible Permutations [Practice](https://leetcode.com/problems/number-of-self-divisible-permutations)

### Description  
Given an integer `n`, find the number of permutations of the 1-indexed array `nums = [1, 2, ..., n]` such that for every position \(i\) (1-based), either the iᵗʰ element divides \(i\), or \(i\) divides the iᵗʰ element.  
A permutation is **self-divisible** if for every 1 ≤ i ≤ n, `a[i] % i == 0` or `i % a[i] == 0`.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `3`  
*Explanation: The valid self-divisible permutations are:  
[1, 3, 2], [2, 1, 3], [3, 2, 1].*

**Example 2:**  
Input: `n = 2`  
Output: `2`  
*Explanation: The valid self-divisible permutations are:  
[1, 2] (since 1 % 1 == 0, 2 % 2 == 0),  
[2, 1] (since 2 % 1 == 0, 1 % 2 == 1 but 1 divides 2).*

**Example 3:**  
Input: `n = 1`  
Output: `1`  
*Explanation: The only permutation is [1], which is self-divisible.*

### Thought Process (as if you’re the interviewee)  
To solve the problem, I need to count permutations such that at each position i (1-indexed), the number at that position divides i or is divisible by i.  

- **Brute-force approach:**  
  Generate all n! permutations and verify the self-divisible property for each. This is too slow for n > 7 due to factorial growth.

- **Optimization idea:**  
  Use backtracking, but prune early. At each step, only place unused numbers at position i that satisfy: num % i == 0 or i % num == 0.

- **Further optimization:**  
  Use a DP (memorization) strategy based on:
  - The current position (1-based)
  - The set of numbers left to use (as a bitmask).
  For each state, try all unused numbers and recur if the divisibility rule holds.

- **State representation:**  
  Since n ≤ 12 (implied by backtracking and practical enumeration), can encode used numbers in an int bitmask.  
  This reduces the states to O(n × 2ⁿ), which is practical for n up to 12.

### Corner cases to consider  
- `n = 1` (trivial case, only one permutation)
- All numbers are prime (not all positions may be available)
- Maximal n (to check performance and stack usage)
- No valid permutations (the count can be zero, rare, but possible for some n)
- Ensure 1-indexing is handled everywhere

### Solution

```python
def count_self_divisible_permutations(n):
    # Memoization: dp[mask] = number of valid perms with used numbers == mask
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dfs(mask):
        pos = bin(mask).count('1') + 1  # current position (1-indexed)
        if pos > n:
            return 1  # found a valid permutation
        total = 0
        for num in range(1, n+1):
            bit = 1 << (num - 1)
            if not (mask & bit):
                if num % pos == 0 or pos % num == 0:
                    total += dfs(mask | bit)
        return total

    return dfs(0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 2ⁿ)  
  For each bitmask (2ⁿ), try up to n numbers. The memoization ensures each state is computed once.

- **Space Complexity:** O(2ⁿ)  
  For memoization storage (number of possible bitmasks). The recursion stack is O(n) deep.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generate all such self-divisible permutations, not just count them?  
  *Hint: Instead of returning a count, backtrack accumulating the sequence and collect valid permutations.*

- Can you generalize to k-divisible, where the relation is based on another function?  
  *Hint: Parameterize the check from (num % pos == 0 or pos % num == 0) to any boolean.*

- What if n is much larger (e.g., up to 30)?  
  *Hint: Analyze combinatorial explosion and discuss why DP+bitmasking does not scale for much larger n.*

### Summary
This problem uses the backtracking with state compression (bitmask DP) pattern. We use a bitmask to represent used numbers and prune invalid choices early, making the solution efficient for moderate n (up to 12-14). The pattern also applies to permutation and arrangement problems with constraints on relative order/positions, such as the "Beautiful Arrangement" problem and N-Queens.