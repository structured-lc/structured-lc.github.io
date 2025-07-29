### Leetcode 1780 (Medium): Check if Number is a Sum of Powers of Three [Practice](https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three)

### Description  
Given a number n, determine if it can be represented as the sum of distinct powers of 3. In other words, check if there exists a subset of numbers {3⁰, 3¹, 3², ...}, each used at most once, whose sum equals n.  
You cannot use the same power of 3 multiple times, and you must use only positive exponents (including 0).

### Examples  

**Example 1:**  
Input: `n = 12`  
Output: `true`  
*Explanation: 12 = 9 + 3 = 3² + 3¹. Both 9 and 3 are distinct powers of 3.*

**Example 2:**  
Input: `n = 91`  
Output: `true`  
*Explanation: 91 = 81 + 9 + 1 = 3⁴ + 3² + 3⁰. All are distinct powers of 3.*

**Example 3:**  
Input: `n = 21`  
Output: `false`  
*Explanation: 21 cannot be written as the sum of distinct powers of 3. For example, using 9 + 9 + 3 violates the distinctness requirement.*

### Thought Process (as if you’re the interviewee)  
First, I recognize that every number has a unique representation in base 3, somewhat similar to how every number has a unique binary representation using powers of 2.

**Brute Force Idea:**  
- Enumerate all possible powers of 3 up to n (i.e., 1, 3, 9, 27, ...)
- Try all possible combinations (subsets) to see if their sum is n.  
This is not efficient, as the number of subsets grows rapidly (exponential in the number of available powers).

**Observation:**  
- Each power of 3 can be used at most once.
- In base-3 representation—if there’s any digit 2, that means the number would require using a given power of 3 twice, which is not allowed by the problem.
- So if the base-3 representation of n contains only digits 0 or 1, then n can be represented as a sum of distinct powers of 3. If any digit is 2, it cannot.

**Optimized Solution:**  
- Convert n to base 3.
- Check for digits: if any digit is '2', return False.
- Otherwise, return True.

This approach is efficient and leverages the uniqueness of n’s representation in base 3.

### Corner cases to consider  
- n = 1 (smallest case) → Output should be true (1 = 3⁰)
- n is a single power of 3 (like 27) → Output should be true
- n = 2 (cannot be made with only 1s in base 3) → Output should be false
- n = 0 (problem constraint says n ≥ 1)
- Large n with multiple consecutive '1's in base 3 → should be handled correctly.

### Solution

```python
def checkPowersOfThree(n: int) -> bool:
    # While n is still positive
    while n > 0:
        n, r = divmod(n, 3)
        # If any digit is 2, cannot represent n as sum of distinct powers of 3
        if r == 2:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₃n)  
At each iteration, n is divided by 3, so the number of steps is proportional to the number of digits in base 3 (≈ log₃n).
- **Space Complexity:** O(1)  
We use only a constant number of variables, no extra storage or recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are allowed to use each power more than once?  
  *Hint: Base-3 digits can be >1, so just check if n > 0*

- How would you extend this to powers of another base k instead of 3?  
  *Hint: Use base-k representation, check digits*

- What if you are to output the actual powers used in the sum?  
  *Hint: Track indices where base-3 digits are 1*

### Summary
This is a classic “representation in base k” or “unique sum of powers” problem. The main insight is that a sum of distinct powers of 3 is analogous to a base-3 number where each digit is at most 1. This base-conversion technique is a common coding pattern and can be applied to similar problems for powers of 2 (“sum of distinct powers of 2”), or to “subset sum” variants with restricted item use.