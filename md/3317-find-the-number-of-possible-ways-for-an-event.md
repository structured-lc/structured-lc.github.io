### Leetcode 3317 (Hard): Find the Number of Possible Ways for an Event [Practice](https://leetcode.com/problems/find-the-number-of-possible-ways-for-an-event)

### Description  
You have **n** performers and **x** stages. Each performer is assigned to one of the x stages (multiple performers can be on the same stage and some stages may be empty). After groups ("bands") are formed on each stage, the jury scores each band independently—each score is an integer between 1 and **y** (inclusive).  
Return the total number of possible ways the event can occur, considering every possible assignment of performers to stages and every possible band scoring combination. If the answer is large, return it modulo 10⁹+7.

- Two events are considered *different* if any performer is assigned to a different stage, or if any band receives a different score.

### Examples  

**Example 1:**  
Input: `n = 1, x = 2, y = 3`  
Output: `6`  
*Explanation: Performer can be assigned to either stage 1 or 2 (2 ways). Each stage (band) can be awarded a score from 1 to 3. Since only one band will have performers, and the other will be empty, that's 2 stages × 3 scores = 6 ways.*

**Example 2:**  
Input: `n = 5, x = 2, y = 1`  
Output: `32`  
*Explanation: Each performer independently picks 1 of 2 stages, so 2⁵ = 32 assignments. Each band can only have score 1 (y=1), so only the performer assignments matter. Total is 32 ways.*

**Example 3:**  
Input: `n = 3, x = 3, y = 4`  
Output: `684`  
*Explanation: There are 3 stages. For all possible assignments:
Each possible grouping of performers (potentially empty) is a band.  
For each non-empty band, jury assigns any score from 1 to 4.  
All possible assignments are considered, and each band's score options are multiplied accordingly.  
(Total is more complex combinatorially, see solution below.)*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every possible way to assign the n performers to x stages (there are xⁿ such assignments), for every non-empty band (stage with ≥1 member), assign each a score from 1 to y. Total for each assignment: yᵏ, where k = number of non-empty bands.  
  Sum over all possible performer assignments.  
  This is exponential—totally infeasible for n, x up to 1000.

- **Key insight / Optimization:**  
  - The process can be separated into:  
    1. Number of ways to partition n performers among k (1 ≤ k ≤ min(n, x)) non-empty stages (bands)
    2. Number of ways to choose which x stages are used for the k bands (`C(x, k)`)
    3. For each configuration, number of ways to assign scores: each band can get y possible scores, so yᵏ

  - *Stirling numbers of the second kind*, S(n, k), give number of ways to partition n objects into k non-empty groups (bands).
  - For each k = 1..min(n, x):
      - Ways to assign: S(n, k) × C(x, k) × yᵏ

  - Total answer = sum for all valid k.

- **Why this approach?**  
  This breaks down the combinatorics, reduces the complexity, and makes use of efficient dynamic programming to calculate S(n, k) and C(x, k).  
  Final time: O(n × x), as S(n, k), combinations, and power can all be computed efficiently with DP and precomputations.

### Corner cases to consider  
- n = 1 (single performer, multiple stages)
- x = 1 (only one stage)
- y = 1 (only one possible score)
- x ≥ n (more stages than performers)
- All performers on one stage (potentially, must handle partitions with k = 1)
- Some stages can be empty (don't require that every stage is filled)

### Solution

```python
MOD = 10 ** 9 + 7

def find_number_of_ways(n, x, y):
    # Precompute factorials for combinations
    fact = [1] * (max(n, x) + 2)
    for i in range(1, len(fact)):
        fact[i] = fact[i-1] * i % MOD

    # Precompute inverse factorials
    inv_fact = [1] * len(fact)
    inv_fact[-1] = pow(fact[-1], MOD-2, MOD)
    for i in range(len(fact)-2, -1, -1):
        inv_fact[i] = inv_fact[i+1] * (i + 1) % MOD

    # Combination C(n, k)
    def comb(a, b):
        if b < 0 or b > a: return 0
        return fact[a] * inv_fact[b] % MOD * inv_fact[a - b] % MOD

    # Precompute Stirling numbers of the second kind (n+1) x (x+1)
    S = [[0] * (x + 2) for _ in range(n + 2)]
    S[0][0] = 1
    for i in range(1, n + 1):
        for k in range(1, x + 1):
            S[i][k] = (S[i-1][k-1] + k * S[i-1][k]) % MOD

    result = 0
    for k in range(1, min(n, x) + 1):
        part = S[n][k]                # Ways to partition n performers into k non-empty bands
        part = part * comb(x, k) % MOD    # Ways to assign k bands to x stages
        part = part * pow(y, k, MOD) % MOD   # Ways to assign scores to k bands
        result = (result + part) % MOD

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × x)  
  - Filling the DP for Stirling numbers is O(n × x)
  - Precomputing factorials and inverse factorials is O(max(n, x))
  - Combination and power computations in outer loop are negligible.

- **Space Complexity:** O(n × x)  
  - Storing Stirling numbers requires O(n × x) space.
  - Factorial arrays O(max(n, x)). No recursion stack required.

### Potential follow-up questions (as if you’re the interviewer)  

- If stages must all be non-empty, how does the answer change?  
  *Hint: Only count partitions where every stage has at least one performer.*

- Can you find the probability that exactly k bands are formed?  
  *Hint: Use the breakdown above and calculate the number of ways only for a specific k.*

- If scoring is not independent across bands, but based on the total number of non-empty bands, how does that impact the formula?  
  *Hint: The scoring phase can depend on k, and you may need a new combinatorial breakdown.*

### Summary
This problem is a **combinatorial counting** problem using **Stirling numbers of the second kind** with combinations and exponentiation patterns.  
The approach precomputes dynamic programming values, factorials, and combinations.  
This pattern is common in problems involving set partitions, assignments to groups, and combinatorial function compositions (common in both competition and real software for counting unique configurations).  
It can also be seen in grouping/partitioning people into teams, assigning tasks, and distributing rewards in unique ways.


### Flashcard
Separate into two parts: (1) count surjective functions from n performers to x stages = x! × S(n,x) where S is Stirling number; (2) multiply by yˣ for score assignments.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
- Kth Smallest Amount With Single Denomination Combination(kth-smallest-amount-with-single-denomination-combination) (Hard)