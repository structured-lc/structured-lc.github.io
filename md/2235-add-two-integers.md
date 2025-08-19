### Leetcode 2235 (Easy): Add Two Integers [Practice](https://leetcode.com/problems/add-two-integers)

### Description  
Given two integers, return their sum.  
You are given two numbers, num₁ and num₂.  
Just add them and return the result.  
There are no special constraints other than the range: -100 ≤ num₁, num₂ ≤ 100.  

### Examples  

**Example 1:**  
Input: `num1 = 12, num2 = 5`  
Output: `17`  
*Explanation: 12 + 5 = 17, so the output is 17.*

**Example 2:**  
Input: `num1 = -10, num2 = 4`  
Output: `-6`  
*Explanation: -10 + 4 = -6, hence the result is -6.*

**Example 3:**  
Input: `num1 = 0, num2 = 0`  
Output: `0`  
*Explanation: Adding 0 + 0 yields 0.*

### Thought Process (as if you’re the interviewee)  
This problem is extremely straightforward as it asks for the sum of two integers.  
- Brute-force thinking: Just add `num1` and `num2` using the `+` operator and return the result.
- No optimization is required, since addition is a constant-time operation and the inputs are always valid within the specified integer range.
- No overflow concerns, as the allowed values safely fit in Python's int type and within standard integer limits in all major languages.

There are no trade-offs or hidden constraints here, so a direct addition is both the simplest and most efficient solution.

### Corner cases to consider  
- Both numbers are zero: num1 = 0, num2 = 0.
- Both numbers are negative: num1 = -50, num2 = -50.
- Numbers with different signs (positive + negative): num1 = -100, num2 = 100.
- Large edge values: num1 = 100, num2 = -100.
- One number at max or min, other at zero.

### Solution

```python
def sum(num1: int, num2: int) -> int:
    # Add the two integers and return the result
    return num1 + num2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Addition of two integers is a single CPU operation, not dependent on input size.

- **Space Complexity:** O(1)  
  No extra space is used, only constant space for local variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input values were outside the -100 to 100 range?  
  *Hint: Consider integer overflow and language-specific integer representations.*

- If you needed to implement addition without using the `+` operator (only bitwise ops), how would you do it?  
  *Hint: Think about XOR and bitwise carry logic.*

- How would you handle summing more than two numbers?  
  *Hint: Consider an input list or variable number of input arguments.*

### Summary
This problem demonstrates the basic operation of integer addition and direct return patterns. It’s a pure math problem with no tricky logic involved, representative of the “implement the formula” pattern. If asked to avoid the `+` operator or expand to more arguments, bitwise tricks or iteration across input collections could be used. The pattern is foundational for problems requiring combining or aggregating data.

### Tags
Math(#math)

### Similar Problems
