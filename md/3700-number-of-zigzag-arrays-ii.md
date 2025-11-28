### Leetcode 3700 (Hard): Number of ZigZag Arrays II [Practice](https://leetcode.com/problems/number-of-zigzag-arrays-ii)

### Description  
Given three integers n, l, and r, return the number of **length-n arrays** formed using only values in the range [l, r] (inclusive), such that the array is **zigzag**:
- An array a is zigzag if for all i (1 ≤ i ≤ n-2), either:
  - (aₖ₋₁ < aₖ > aₖ₊₁), or 
  - (aₖ₋₁ > aₖ < aₖ₊₁)
In other words, the values must strictly alternate up/down, and no two adjacent values can be equal.
Return the count modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `n=3, l=1, r=3`  
Output: `10`  
*Explanation: The valid arrays are: [1,2,1], [1,3,1], [1,3,2], [2,1,2], [2,1,3], [2,3,1], [2,3,1], [3,1,2], [3,2,1], [3,2,1]. (Combinations where adjacent elements are equal are not allowed; each step must zigzag.)*

**Example 2:**  
Input: `n=4, l=1, r=3`  
Output: `24`  
*Explanation: Arrays like [1,2,1,2], [2,1,2,1], [1,3,1,2], etc., meet the zigzag requirement for all middle positions.*

**Example 3:**  
Input: `n=2, l=5, r=6`  
Output: `2`  
*Explanation: Only possible zigzag arrays are [5,6] and [6,5]; arrays with repeated elements (e.g., [5,5]) are not allowed as adjacent values must differ.*

### Thought Process (as if you’re the interviewee)  
- First, brute force: try all possible length-n arrays from [l, r] and count those that are zigzag. This is exponential, O((r-l+1)ⁿ), not feasible for big n!
- Dynamic programming (DP): 
  - Let upₖ[𝚟] = number of length-k zigzag arrays ending at value 𝚟, where last movement was "up" (aₖ₋₁ < aₖ).
  - dₖ[𝚟] = ... "down".
  - For step k, each possible value can transition from smaller (‘down’) or larger (‘up’) values.
  - Recurrence: upₖ₊₁[𝚟] = sum of dₖ[𝚞] for all 𝚞 < 𝚟, dₖ₊₁[𝚟] = sum of upₖ[𝚞] for all 𝚞 > 𝚟.
  - DP solution is O(n × m²), m = (r-l+1), but that’s too slow for large n (up to 1e9)!
- Matrix exponentiation:
  - The recurrence can be encoded as a transition matrix (size 2m × 2m).
  - The result is found as first state vector times the matrix ^ (n-1).
  - This reduces time to O(m³ log n), much faster but still challenging for large m.
- Trade-offs: 
  - Brute-force and direct DP impractical for large n; only transition-matrix power works for such constraints.
  - Memory is O(m²).

### Corner cases to consider  
- n = 1: any value allowed, so result = r-l+1.
- n = 2: arrays with adjacent unequal values only.
- l = r: only one value possible, so n > 1 ⇒ 0 valid arrays.
- Large n (up to 1e9).
- Edge cases, e.g. empty or negative range (invalid).

### Solution

```python
MOD = 10**9 + 7

def numberOfZigZagArrays(n: int, l: int, r: int) -> int:
    # Number of possible values in the range
    m = r - l + 1

    # If only one value is allowed, only valid if n==1
    if m == 1:
        return 1 if n == 1 else 0

    # Build the transition matrix (2m x 2m)
    # First m: "up" states (ending with movement up)
    # Next m: "down" states (ending with movement down)
    size = 2 * m
    M = [[0] * size for _ in range(size)]
    for to in range(m):
        # up_k+1[to] = sum of down_k[smaller_u]
        for from_ in range(to):
            M[to][m + from_] = 1  # from "down", to "up"
        # down_k+1[to] = sum of up_k[larger_u]
        for from_ in range(to + 1, m):
            M[m + to][from_] = 1  # from "up", to "down"

    # Initial DP vector: all possible starts, each can be "up" or "down"
    vec = [1] * m + [1] * m  # [up_1[0..m-1], down_1[0..m-1]]

    def matmul(a, b):
        # a, b: size x size
        res = [[0] * len(b[0]) for _ in range(len(a))]
        for i in range(len(a)):
            for k in range(len(b)):
                if a[i][k]:
                    for j in range(len(b[0])):
                        res[i][j] = (res[i][j] + a[i][k] * b[k][j]) % MOD
        return res

    def matvecmul(mat, vec):
        res = [0] * len(vec)
        for i in range(len(mat)):
            for j in range(len(vec)):
                res[i] = (res[i] + mat[i][j] * vec[j]) % MOD
        return res

    def matpow(mat, power):
        # Matrix exponentiation
        size = len(mat)
        res = [[int(i==j) for j in range(size)] for i in range(size)]
        while power:
            if power % 2 == 1:
                res = matmul(res, mat)
            mat = matmul(mat, mat)
            power //= 2
        return res

    if n == 1:
        return m

    Mexp = matpow(M, n-1)
    final_vec = matvecmul(Mexp, vec)
    # Sum of all possible ways (all up and down states)
    result = sum(final_vec) % MOD
    return result

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m³ × log n), where m = r - l + 1
  - Matrix exponentiation dominates; every multiplication is O(m³), and log n multiplications are required.
- **Space Complexity:** O(m²) for matrix storage, plus O(m) for vectors.

### Potential follow-up questions (as if you’re the interviewer)  

- If r-l+1 is also very large, can you optimize further?
  *Hint: Is there a combinatorial or closed-form?*

- What if adjacent equal values are allowed?
  *Hint: How does DP recurrence change?*

- If you can only use O(m) space, can you optimize?
  *Hint: Most work is in matrix multiplication; can you do better with sparse representation?*

### Summary
This problem is a **dynamic programming with state compression** combined with **fast matrix exponentiation** pattern, commonly used when n (sequence length) is huge but transitions are regular. The matrix formulation comes from the recurrence structure, and transition counting is reduced to linear algebra. Patterns like this appear in *linear recurrence*, *paths in graphs*, and constrained sequence counting.


### Flashcard
Information not available in search results.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
