### Leetcode 1486 (Easy): XOR Operation in an Array [Practice](https://leetcode.com/problems/xor-operation-in-an-array)

### Description  
Given two integers n and start, create an array nums where nums[i] = start + 2 × i for i in 0..n-1. Return the bitwise XOR of all elements in the nums array.

### Examples  

**Example 1:**  
Input: `n=5, start=0`  
Output: `8`  
*Explanation: nums = [0,2,4,6,8]; 0 ^ 2 ^ 4 ^ 6 ^ 8 = 8*

**Example 2:**  
Input: `n=4, start=3`  
Output: `8`  
*Explanation: nums = [3,5,7,9]; 3 ^ 5 ^ 7 ^ 9 = 8*

**Example 3:**  
Input: `n=1, start=7`  
Output: `7`  
*Explanation: nums = ; single element, so output is 7*

### Thought Process (as if you’re the interviewee)  
- The array is defined by a formula: nums[i]=start+2×i.
- A brute-force approach is to generate the array and XOR all numbers.
- Potential for mathematical simplification, but brute-force is fast enough for small n.
- For the best performance, avoid creating the whole array and XOR while generating elements.

### Corner cases to consider  
- n = 1 (single element)
- start is odd or even
- n is very large (efficiency if needed)
- start = 0 (array is just evens)

### Solution

```python
def xorOperation(n, start):
    result = 0
    for i in range(n):
        num = start + 2 * i
        result ^= num
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), single loop through n elements.
- **Space Complexity:** O(1), uses only variables for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it in O(1) time using a math pattern?  
  *Hint: Analyze the XOR sequence properties for consecutive numbers and 2×i.*
- What if the step is not 2, but an arbitrary even number?  
  *Hint: Parametrize step size and check if math pattern holds.*
- Write a function to return the actual array, not just the XOR.  
  *Hint: List comprehension.*

### Summary
A basic array formula/XOR accumulation pattern. Brute-force is optimal for small n; for large n, look for XOR properties of sequences. This pattern appears in bit manipulation and number theory problems.

### Tags
Math(#math), Bit Manipulation(#bit-manipulation)

### Similar Problems
