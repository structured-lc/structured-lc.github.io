### Leetcode 2400 (Medium): Number of Ways to Reach a Position After Exactly k Steps [Practice](https://leetcode.com/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps)

### Description  
You are on an infinite number line starting at position `startPos`. Each move, you can go one step left or right. The goal is to reach `endPos` in **exactly** `k` steps. Two ways are considered different if the *sequence of left/right moves* differs. Since the answer could be very large, return the result modulo 1,000,000,007.  
The line includes negative integers; you can move freely in either direction.

### Examples  

**Example 1:**  
Input: `startPos = 1, endPos = 2, k = 3`  
Output: `3`  
*Explanation: There are 3 ways:  
- 1 → 2 → 3 → 2  
- 1 → 2 → 1 → 2  
- 1 → 0 → 1 → 2*

**Example 2:**  
Input: `startPos = 2, endPos = 5, k = 10`  
Output: `0`  
*Explanation: It's impossible to reach 5 from 2 with exactly 10 steps; the minimum number of steps required is 3 (but parity won't match in 10 steps).*

**Example 3:**  
Input: `startPos = 3, endPos = 3, k = 2`  
Output: `2`  
*Explanation:  
- 3 → 4 → 3  
- 3 → 2 → 3  
Both sequences take exactly 2 steps and return to 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Recursively/DFS, simulate each possible step (left/right) and count all sequences that end at `endPos` after `k` steps.
- **Observation:** Number line is infinite, so no boundary. But brute-force is exponential: O(2ᵏ), which is infeasible for k = 1000.
- **Key Insight:**  
  - The *net movement* after k steps must be exactly `endPos - startPos`.  
  - Let rightStep = steps right; leftStep = steps left. We have:
    - rightStep + leftStep = k
    - rightStep - leftStep = endPos - startPos
  - Solve for rightStep:
    - 2×rightStep = k + endPos - startPos  
    - rightStep = (k + endPos - startPos) // 2
  - For valid integer solution, (k + endPos - startPos) must be even and rightStep in [0, k].
- **Subproblem:** Count sequences with exactly rightStep right moves and k - rightStep left moves: that's "k choose rightStep" (binomial coefficient).
- **Approach Chosen:** Dynamic programming or combinatorial formula for binomial coefficient with modulus for speed and feasibility.

### Corner cases to consider  
- startPos == endPos, k even or odd: can you stay still in k steps? Only possible if k is even.
- Impossible to reach if abs(endPos - startPos) > k (not enough steps).
- (k + endPos - startPos) odd: impossible as rightStep must be integer.
- k == 0: only possible if startPos == endPos.
- Very large k, test modulo logic.

### Solution

```python
def numberOfWays(startPos: int, endPos: int, k: int) -> int:
    MOD = 10**9 + 7
    diff = abs(endPos - startPos)
    
    # Check if the target is reachable in exactly k steps
    if diff > k or (k + endPos - startPos) % 2 != 0:
        return 0

    # Compute right steps
    right = (k + endPos - startPos) // 2
    left = k - right
    if right < 0 or left < 0:
        return 0

    # Compute C(k, right) modulo MOD
    # Use Fermat's Little Theorem for modular inverse of factorials

    fact = [1] * (k + 1)
    for i in range(1, k + 1):
        fact[i] = fact[i-1] * i % MOD

    def modinv(x):
        # Modular inverse by Fermat's Little Theorem
        return pow(x, MOD - 2, MOD)

    result = fact[k] * modinv(fact[right]) % MOD
    result = result * modinv(fact[left]) % MOD
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k)  
  Precompute factorials up to k, each in O(1), and powers for modular inverse.

- **Space Complexity:** O(k)  
  For the factorial array of size k + 1.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if some positions are blocked?  
  *Hint: Consider dynamic programming, where transitions avoid blocked cells.*

- Can you generalize this to 2D or more dimensions (like a grid)?  
  *Hint: Need to count multiset permutations, or apply similar combinatorics along each axis.*

- What if the modulus is not prime?  
  *Hint: Precomputing inverse using Fermat's Little Theorem only works if modulus is prime; otherwise consider alternative modular division methods.*

### Summary
This problem is a classic **combinatorics** and **dynamic programming** (DP) variant. The main insight is to map walks on a line to combinations (binomial coefficients) and rephrase the constraints to arithmetic equations on step counts. The coding pattern is widely used in problems involving walks or random walks with fixed steps and can be applied to similar variations in grid path counting, lattice walks, and related fields.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
- Unique Paths(unique-paths) (Medium)
- Climbing Stairs(climbing-stairs) (Easy)
- Reach a Number(reach-a-number) (Medium)
- Reaching Points(reaching-points) (Hard)
- Number of Ways to Stay in the Same Place After Some Steps(number-of-ways-to-stay-in-the-same-place-after-some-steps) (Hard)