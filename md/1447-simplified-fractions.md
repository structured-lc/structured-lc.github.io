### Leetcode 1447 (Medium): Simplified Fractions [Practice](https://leetcode.com/problems/simplified-fractions)

### Description  
Given an integer `n`, return a list of all simplified fractions between 0 and 1 (exclusive) such that the denominator is less than or equal to `n`. Only return fractions in their simplest form (i.e., numerator and denominator are coprime).

### Examples  

**Example 1:**  
Input: `n = 2`
Output: `["1/2"]`
*Explanation: Only possible fraction is 1/2.*

**Example 2:**  
Input: `n = 3`
Output: `["1/2", "1/3", "2/3"]`
*Explanation: Valid fractions are 1/2, 1/3, and 2/3 (2/4 is not simplified).*  

**Example 3:**  
Input: `n = 4`
Output: `["1/2","1/3","1/4","2/3","3/4"]`
*Explanation: Fractions like 2/4, 2/4, 3/6 not included, as they're not simplified.*

### Thought Process (as if you’re the interviewee)  
For every denominator from 2 to n, and numerator from 1 to (denominator - 1), check if numerator and denominator are coprime (gcd(numerator, denominator) == 1). If so, include in the result as "numerator/denominator".
A brute-force nested loop is fine for moderate n, since at most O(n²) pairs.

### Corner cases to consider  
- n = 1 (output should be empty, no valid fractions)
- Check for duplicate fractions (should not happen with simplified rule)
- Large n to check efficiency

### Solution

```python
from math import gcd

def simplifiedFractions(n: int) -> list[str]:
    result = []
    for denom in range(2, n+1):
        for numer in range(1, denom):
            if gcd(numer, denom) == 1:
                result.append(f"{numer}/{denom}")
    return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n² × log n), as we check gcd for each numerator and denominator pair.
- **Space Complexity:** O(k), where k is the number of simplified fractions generated (≤ n²).

### Potential follow-up questions (as if you’re the interviewer)  
- How would you efficiently generate all fractions up to a larger n?
  *Hint: Consider using a sieve for coprimality, or optimize gcd calculations.*

- How would you sort the fractions if asked for ascending order?
  *Hint: Fractions numer/denom, compare with numer × d2 vs numer2 × denom.*

- What if you are asked for fractions in (0,1], i.e. include 1?
  *Hint: Only add numer==denom if allowed by problem.*

### Summary
We use a double loop and check coprimality (gcd) to list all unique simplified fractions. This coprime/gcd approach is a standard way to generate simplified ratios or fractions for problems involving number theory and rational enumeration.