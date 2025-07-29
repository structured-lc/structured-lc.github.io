### Leetcode 1925 (Easy): Count Square Sum Triples [Practice](https://leetcode.com/problems/count-square-sum-triples)

### Description  
Given an integer **n**, count the number of square triples (**a**, **b**, **c**) such that:
- All of **a**, **b**, **c** are integers in the range 1 to **n** (inclusive),
- and **a² + b² = c²**.

In other words, find all distinct ordered triples where 1 ≤ a, b, c ≤ n, and the sum of the squares of a and b equals the square of c. Both (a, b, c) and (b, a, c) are valid and counted separately.

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `2`  
*Explanation: The square triples are (3,4,5) and (4,3,5).*

**Example 2:**  
Input: `n = 10`  
Output: `4`  
*Explanation: The square triples are (3,4,5), (4,3,5), (6,8,10), and (8,6,10).*

**Example 3:**  
Input: `n = 1`  
Output: `0`  
*Explanation: There are no a, b, c with 1 ≤ a, b, c ≤ 1 such that a² + b² = c².*

### Thought Process (as if you’re the interviewee)  
- Start with a brute-force approach: try every possible a, b, c in 1...n, check if a² + b² = c². This would be O(n³) -- not efficient even for n up to 250.

- Since order matters (both (a,b,c) and (b,a,c) are allowed), we can loop a and b independently.

- To optimize, instead of iterating c, we can:
  - For each pair (a, b) with 1 ≤ a,b ≤ n, compute t = a² + b².
  - If t is a perfect square, and √t is integer c in 1...n, then count this as a valid triple.

- This reduces time complexity to O(n²), as a and b both loop from 1 to n, and sqrt(t) or t ≤ n²; checking whether c is an integer is quick.

- This problem leverages simple number theory (Pythagorean triples) and careful nested iteration.

- Given n ≤ 250, O(n²) is acceptable.

### Corner cases to consider  
- n = 1 or 2 (should return 0)
- No possible triples exist for small n.
- Both (a,b,c) and (b,a,c) count as separate triples, including when a = b, but a = b = c is not possible as 2c² ≠ c².
- Watch for integer overflow if not careful with squaring.
- Duplicate triples with swapped a/b must both be counted.

### Solution

```python
def countTriples(n):
    # Counter for total valid triples
    res = 0
    # Try all possible pairs (a, b)
    for a in range(1, n + 1):
        for b in range(1, n + 1):
            t = a * a + b * b
            # Compute square root of t
            c = int(t ** 0.5)
            # Check t is a perfect square, and c within range
            if c * c == t and c <= n:
                res += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since for each 1 ≤ a ≤ n, we loop over 1 ≤ b ≤ n – total n × n iterations. Square root and multiplication operations are O(1).
- **Space Complexity:** O(1). We use only a fixed amount of storage, independent of n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the range for n is much larger (up to 10⁵ or more)?
  *Hint: Can you precompute or use mathematical properties of Pythagorean triples?*

- How would you extend this for unordered pairs, i.e., count each (a, b, c) only once regardless of a and b's order?
  *Hint: Only count a ≤ b, or maintain a set of seen unordered pairs.*

- Return the list of all valid triples instead of just the count.
  *Hint: Store tuples (a, b, c) in a result list and sort if needed.*

### Summary
This problem demonstrates the brute-force to quadratic scan transition by using integer arithmetic and square root checks to count valid triples. The approach is a direct application of nested loops with order significance, and checking for perfect squares—a variant of the classic Pythagorean triple counting, but within a bounded domain and with ordered pairs considered. This pattern appears often in enumeration problems and in problems leveraging the number theory of Diophantine equations.