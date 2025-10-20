### Leetcode 258 (Easy): Add Digits [Practice](https://leetcode.com/problems/add-digits)

### Description  
Given a non-negative integer **num**, repeatedly add all its digits until the result is a single digit. For example, start with 38: first add 3 + 8 = 11, then 1 + 1 = 2. The process continues until there's only one digit left. Return that single digit.  
The interviewer may also ask: Can you do it without using recursion or loops, in constant time?

### Examples  

**Example 1:**  
Input: `num = 38`  
Output: `2`  
*Explanation: 3 + 8 = 11, 1 + 1 = 2. Result is one digit.*

**Example 2:**  
Input: `num = 0`  
Output: `0`  
*Explanation: 0 is already a single digit.*

**Example 3:**  
Input: `num = 1234`  
Output: `1`  
*Explanation: 1 + 2 + 3 + 4 = 10; 1 + 0 = 1.*

### Thought Process (as if you’re the interviewee)  
First, I recognize that I'm repeatedly summing the digits of a number until a single digit remains.  
- **Brute-force approach:** I can use a loop or recursion. Extract digits (using modulus and integer division), sum them, and repeat as long as the number has more than one digit.  
- **Optimization:** The prompt asks for a no-loop, no-recursion, O(1) approach. I recall that the "digital root" in number theory, using properties of mod 9, helps here.
    - For any number n > 0, the digital root is:  
      (n−1) mod 9 + 1  
    - For n = 0, the result is 0.  
The advantage is that this formula gets the answer instantly, without repeated digit extraction or summing. It's a clever use of math, trading iteration for a direct computation.

### Corner cases to consider  
- num = 0 (should output 0)
- num already is a single digit (1–9, should return num)
- Large numbers (to test if iterating is too slow; O(1) math solves this)
- Numbers like 10, 19, ensuring cycling through digits works
- Negative numbers (problem specifies non-negative num, so don’t need to handle them)

### Solution

```python
def addDigits(num: int) -> int:
    # Edge case: if num is 0, its digital root is 0.
    if num == 0:
        return 0
    # Digital root formula for n > 0: (num - 1) % 9 + 1
    return 1 + (num - 1) % 9
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). The solution contains only arithmetic operations, regardless of the size of num.
- **Space Complexity:** O(1). No extra space beyond the input and a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement the repeated sum of digits **without using extra space/recursion**?
  *Hint: Could you use a mathematical formula for single-digit reduction? (Digital root)*

- Can you explain why the digital root formula works?
  *Hint: Try looking at the process of digit summing in terms of modulo 9 properties of numbers.*

- What if negative input values were allowed?
  *Hint: Would you use abs(), or do you need to handle negative results differently?*

### Summary
This problem is a classic application of the **digital root** concept in number theory. The O(1) approach leverages a mathematical insight, avoiding explicit iteration or recursion. This pattern appears in problems dealing with digit manipulations or numeric cycles, and highlights the value of knowing number patterns and properties to optimize brute-force algorithms.


### Flashcard
Add Digits

### Tags
Math(#math), Simulation(#simulation), Number Theory(#number-theory)

### Similar Problems
- Happy Number(happy-number) (Easy)
- Sum of Digits in the Minimum Number(sum-of-digits-in-the-minimum-number) (Easy)
- Sum of Digits of String After Convert(sum-of-digits-of-string-after-convert) (Easy)
- Minimum Sum of Four Digit Number After Splitting Digits(minimum-sum-of-four-digit-number-after-splitting-digits) (Easy)
- Calculate Digit Sum of a String(calculate-digit-sum-of-a-string) (Easy)
- Difference Between Element Sum and Digit Sum of an Array(difference-between-element-sum-and-digit-sum-of-an-array) (Easy)
- Alternating Digit Sum(alternating-digit-sum) (Easy)