### Leetcode 2961 (Medium): Double Modular Exponentiation [Practice](https://leetcode.com/problems/double-modular-exponentiation)

### Description  
Given a list of variables, each as `[aᵢ, bᵢ, cᵢ, mᵢ]`, and a given integer `target`, return the list of all indices `i` where:  
  `((aᵢ^bᵢ % 10)^cᵢ) % mᵢ == target`.  
You are to check, for every tuple in `variables`, if this condition holds and collect that index as "good".

### Examples  

**Example 1:**  
Input: `variables = [[2,3,4,5],[3,2,3,5],[10,2,2,1]], target = 1`  
Output: `[2]`  
Explanation: For index 2: ((10² % 10)²) % 1 = (0²) % 1 = 0 % 1 = 0. Only if target is 0, index 2 is "good".

**Example 2:**  
Input: `variables = [[1,2,3,4],[2,2,2,4]], target = 1`  
Output: ``  
Explanation:  
- Index 0: ((1² % 10)³) % 4 = (1³) % 4 = 1 % 4 = 1. So index 0 is "good".
- Index 1: ((2² % 10)²) % 4 = (4²) % 4 = 16 % 4 = 0. Not "good".

**Example 3:**  
Input: `variables = [[2,3,3,10],[7,1,1,7],[6,4,2,3]], target = 8`  
Output: ``  
Explanation:  
Index 0: ((2³ % 10)³) % 10 = (8³) % 10 = 512 % 10 = 2. This is not 8, so this input is intended for illustration.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** For each tuple, directly calculate `aᵢ^bᵢ`, then mod 10, then raise to cᵢ, then mod mᵢ, and check if it matches target.
- This is inefficient when bᵢ or cᵢ are large, as repeated multiplication is slow.
- **Optimization:** Use fast (modular) exponentiation to compute powers efficiently in O(log n) time.
- In Python, we can write a helper for modular exponentiation. But since (aᵇ % X) and (X^c % m) can both use fast power, we can compose or nest the fast power functions.
- The actual check is: `if pow(pow(a, b, 10), c, m) == target:` for each entry.
- **Tradeoffs:** Since the constraints give small bᵢ, cᵢ (up to 10³), the pow-based method is fast and numerically safe.

### Corner cases to consider  
- a = 0, b = 0 (0⁰: usually treated as 1 in programming)
- c = 0 (Any number to 0 power is 1; need to handle (a^b % 10)^0)
- m = 1 (Any number % 1 is 0)
- Very large exponent values
- Duplicate tuples
- All outputs matching, or none matching

### Solution

```python
def getGoodIndices(variables, target):
    # List to collect indices where the condition holds
    result = []
    
    # Iterate each variable group with its index
    for i, (a, b, c, m) in enumerate(variables):
        # First: compute a^b % 10 (last digit of a^b)
        mod10 = pow(a, b, 10)
        # Next: (mod10)^c % m
        res = pow(mod10, c, m)
        # Check if condition holds
        if res == target:
            result.append(i)
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × (log b + log c))  
    For each tuple, pow runs in O(log b) for a^b, and O(log c) for (x)^c. n = length of variables.
- **Space Complexity:** O(n)  
    Only for the output array of "good" indices. No recursion or large extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large exponents or a situation where pow is not available?
  *Hint: Implement your own fast modular exponentiation using recursive or iterative method.*

- What would you do if `variables` array is extremely large and you can't keep all results in memory?
  *Hint: Consider yielding the indices using a generator or process them in fixed-size batches.*

- Can you generalize the problem if the modulo in the inner or outer step is not fixed, e.g., both are variable per index?
  *Hint: Update the formula accordingly; analyze if nesting pow can still be efficient.*

### Summary
This problem is about applying **modular exponentiation** twice in sequence and is best solved using **fast power methods** (pow with mod in Python, or manual fast power). This pattern is common in number theory, cryptography, and other algorithm problems where large exponentials with mod need to be computed efficiently. The key “pattern” here is the stackable use of mod power, leveraging math identities and careful computational order for optimization and correctness.