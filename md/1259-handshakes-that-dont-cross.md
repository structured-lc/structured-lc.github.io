### Leetcode 1259 (Hard): Handshakes That Don't Cross [Practice](https://leetcode.com/problems/handshakes-that-dont-cross)

### Description  
You are given an **even number** of people (`numPeople`) standing around a circle. Each person must shake hands with exactly one other person, so there are a total of `numPeople / 2` handshakes. Handshakes are only allowed if **no two handshakes cross** each other (think of joining two points on the circumference of a circle with a chord—no two chords should intersect).  
Return the **number of ways** these handshakes can take place **so that none cross**, modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `numPeople = 2`
Output: `1`
Explanation: Only one handshake possible: (person₁, person₂).

**Example 2:**  
Input: `numPeople = 4`
Output: `2`
Explanation: Two ways—either (1,2) & (3,4), or (2,3) & (4,1):
```
o---o       o     o
|   |    or  \   /
o---o         o-o
```
(list: [(1,2),(3,4)] or [(2,3),(4,1)])

**Example 3:**  
Input: `numPeople = 6`
Output: `5`
Explanation: There are 5 non-crossing handshake arrangements for 6 people.

**Example 4:**  
Input: `numPeople = 8`
Output: `14`
Explanation: 14 valid, non-crossing handshake arrangements.

### Thought Process (as if you’re the interviewee)  

First, brute force: try to generate all possible perfect matchings and count those that have no crossing. This is extremely inefficient (factorial time) for `numPeople` up to 1000—there’s no way this will work.

Observing the pattern:
- Once you pick a handshake between person 0 and person i, you cut the circle into two independent subproblems:
  - The people *inside* the handshake 
  - The people *outside* the handshake
- Each such partitioning means the total number of arrangements is the product of both sides.
- This recursive structure is exactly the **Catalan number** recurrence:
  - Cₙ = Σ₀ⁿ⁻¹ (Cᵢ × Cₙ₋₁₋ᵢ)
    - where n is “number of pairs”, so n = numPeople/2

So, this problem is:
- DP[n] = Σ₀ⁿ⁻¹ (DP[i] × DP[n-1-i]) for n ≥ 1; DP = 1 (empty handshake combo)
- We precompute and store DP…DP[n] up to n=500 (since 2≤numPeople≤1000)

Choose dynamic programming with memoization for efficiency: O(n²) time, O(n) space.

### Corner cases to consider  
- numPeople = 2 (minimum, must return 1)
- numPeople = 0 (not given, but if so, should be 1: empty handshake)
- Large input: numPeople = 1000 (should be fast, so no recursion stack overflow or recomputation)
- Only even values: all odd numPeople are invalid

### Solution

```python
MOD = 10**9 + 7

def numberOfWays(numPeople: int) -> int:
    # Catalan number: DP[n] = number of ways to pair up n*2 people
    n = numPeople // 2
    
    dp = [0] * (n + 1)
    dp[0] = 1  # one way: empty set
    
    # DP build-up: for each number of pairs
    for pairs in range(1, n + 1):
        for left in range(pairs):
            dp[pairs] += dp[left] * dp[pairs - 1 - left]
            dp[pairs] %= MOD
    
    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since for each n ≤ 500, each DP[n] sums up to n terms, each with multiplication and addition.
- **Space Complexity:** O(n), storing a DP list up to 500 elements.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you precompute and directly compute the nᵗʰ Catalan number with combinations (math formula)?
  *Hint: Use factorials and modular inverses for large N.*

- How would you change the logic if people didn't stand in a circle but along a line?
  *Hint: The answer is still Catalan numbers due to same non-crossing pairing property.*

- Can you output all the non-crossing handshake arrangements, not just count them?
  *Hint: This would require generating all valid partitions recursively, careful with large N.*

### Summary
This is a classic **Catalan number** dynamic programming problem: subproblems represent independent regions split by each handshake. The DP recurrence is heavily used in problems involving non-crossing partitions (matching brackets, unique BSTs, polygon triangulations). The coding pattern is DP with overlapping subproblems and optimal substructure. Recognition of Catalan numbers allows for quick solution and generalization to related combinatorial problems.


### Flashcard
Use DP with Catalan numbers: total non-crossing handshake arrangements for 2n people is Cₙ, where Cₙ = C₀×Cₙ₋₁ + C₁×Cₙ₋₂ + ... + Cₙ₋₁×C₀.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
