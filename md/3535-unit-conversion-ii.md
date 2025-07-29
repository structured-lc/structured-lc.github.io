### Leetcode 3535 (Medium): Unit Conversion II [Practice](https://leetcode.com/problems/unit-conversion-ii)

### Description  
You are given a series of *n* unit types and a list of *n - 1* conversions, where each conversion gives you the integer scaling factor between two *adjacent* unit types. For each query (unitA, unitB), you are to answer: "If I have 1 unit of type unitA, how many units of type unitB does it equal?"  
The conversion can be direct or can require traversing a path (in either direction) through other units. If the conversion leads to a non-integer value, return the result as an integer modulo 10⁹+7, using the multiplicative inverse when necessary.

### Examples  

**Example 1:**  
Input:  
n = 3, conversions = \[3, 4\], queries = \[\[0,2\], \[1,0\]\]  
Output:  
\[12, 1/3\]  
*Explanation: From 0 → 2: 0→1 (\*3), 1→2 (\*4). So 1 of 0 = 3×4 = 12 of 2. To go 1 → 0, take reciprocal ⇒ 1.*

**Example 2:**  
Input:  
n = 4, conversions = \[2, 5, 10\], queries = \[\[3,0\]\]  
Output:  
\[1/100\]  
*Explanation: Path: 3→2 (/10), 2→1 (/5), 1→0 (/2): total factor = 1/(10×5×2) = 1/100.*

**Example 3:**  
Input:  
n = 5, conversions = \[2, 3, 4, 5\], queries = \[\[0,4\], \[4,0\]\]  
Output:  
\[120, 1/120\]  
*Explanation: 0→1 (\*2), 1→2 (\*3), 2→3 (\*4), 3→4 (\*5). Forward: 2×3×4×5 = 120. Reverse: reciprocal, 1/120.*

### Thought Process (as if you’re the interviewee)  
First, this is a conversion graph with *n* units and *n-1* direct conversion links, so it's a **tree** (a line, actually). Each conversion allows us to convert in either direction (reciprocal factor for backward move).

If we want to convert unitA to unitB, we need to find the product of the conversion factors (or their reciprocals if traversing in reverse) along the path from unitA to unitB.

Brute-force: For every query, walk the path (DFS or BFS) from unitA to unitB, multiplying/dividing the factors as we go. Since *n* is small (≤10⁵), and the paths are short (a line), this is efficient enough.

Optimal: Since queries may be many, we can **precompute** for all nodes their "conversion to root" factor (where root can be unit 0). Then,  
conversion from A to B = (factor from root to A) / (factor from root to B).  
Division in modular arithmetic requires a **modulo multiplicative inverse**.

### Corner cases to consider  
- Querying the same unit (unitA == unitB): result should be 1.
- Factor or inverse is not integer: must use modulo inverse.
- Large number of conversions: ensure no integer overflow.
- Forward and backward conversions in path.
- Path direction matters: must handle reciprocals correctly.
- Empty queries.

### Solution

```python
MOD = 10**9 + 7

def modinv(x):
    # Modular inverse in MOD (x^{-1} mod MOD)
    return pow(x, MOD - 2, MOD)

def unitConversion(n, conversions, queries):
    # Precompute conversion factor of each unit to the root (unit 0).
    # factor[i] = number of units of type i in 1 unit of type 0
    factor = [1] * n
    # units are connected like a line: 0-1-2-...-n-1
    # factor[i] = factor[i-1] * conversions[i-1]
    for i in range(1, n):
        factor[i] = (factor[i-1] * conversions[i-1]) % MOD

    results = []
    for u, v in queries:
        if u == v:
            results.append(1)
            continue
        # conversion factor from u to v:
        # multiply by factor[v]^{-1}, multiply by factor[u]
        numerator = factor[u]
        denominator = factor[v]
        res = (numerator * modinv(denominator)) % MOD
        results.append(res)
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n) for preprocessing conversion factors from root.
  - O(q) for answering q queries (constant-time for each, due to precomputation).
  - Total: O(n + q).

- **Space Complexity:**  
  - O(n) extra space for the factor array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the conversion graph was not a chain but a general tree?
  *Hint: Precompute parent and conversion factor up the tree for fast path reconstruction.*

- What if the conversion graph had cycles?
  *Hint: Use Union-Find or DFS with visited map; ensure no inconsistent cycles (i.e., check for logical contradictions).*

- What if conversion factors could be float?
  *Hint: Deal carefully with floating point precision or use rational numbers for exactness; may not fit modulo arithmetic.*

### Summary
We use a **conversion to root** pattern (tree prefix products), which is a classic prefix product/cumulative product technique. This allows O(1) query time after O(n) preprocessing.  
The modular inverse is essential for division under modulo arithmetic. This approach is common for multiplicative path queries or when edge reciprocals must be handled efficiently, such as ratio graphs, scaling queries, or currency conversion trees.