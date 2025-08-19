### Leetcode 2180 (Easy): Count Integers With Even Digit Sum [Practice](https://leetcode.com/problems/count-integers-with-even-digit-sum)

### Description  
Given a positive integer *num*, return how many positive integers less than or equal to *num* have an even digit sum. The digit sum of a positive integer is the sum of all its digits. For example, for num = 123, the digit sum is 1+2+3 = 6. You need to count how many numbers in the range [1, num] have an even digit sum.

### Examples  

**Example 1:**  
Input: `num = 4`  
Output: `2`  
*Explanation: Only 2 and 4 have even digit sums (2: sum=2, 4: sum=4).*

**Example 2:**  
Input: `num = 30`  
Output: `14`  
*Explanation: The fourteen numbers are 2, 4, 6, 8, 11, 13, 15, 17, 19, 20, 22, 24, 26, 28. For each, the sum of its digits is even.*

**Example 3:**  
Input: `num = 12`  
Output: `5`  
*Explanation: Numbers are 2, 4, 6, 8, 11 (their digit sums are 2, 4, 6, 8, and 2, respectively).*

### Thought Process (as if you’re the interviewee)  
- The naive approach is to check each number 1 to num, compute its digit sum, and check for evenness.
- For each number, I can repeatedly take modulo 10 and divide by 10 to sum its digits.
- This brute force will work since the constraints are modest (num ≤ 1000).
- Observing further, for larger num, a formulaic approach can help: For any number, the parity of its digit sum determines if it should be counted.
- There exists an O(log n) math shortcut:  
  The answer is (num - digit_sum(num) % 2) // 2.  
  This leverages properties of sequential number digit sums, but can be derived with some number theory.
- For interviews, the brute-force solution is straightforward, but demonstrating a math shortcut can show deeper insight.

### Corner cases to consider  
- num = 1 (smallest input, should return 0)
- num where all numbers' digit sums are odd (such as num = 1, 3, 5)
- num where every number to num has an even digit sum (unlikely except for small cases)
- num at largest value (1000), so no performance issues should occur but worth checking for off-by-one.

### Solution

```python
def countEven(num):
    # Helper function to find the digit sum of a number
    def digit_sum(x):
        s = 0
        while x > 0:
            s += x % 10
            x //= 10
        return s

    count = 0
    # Iterate from 1 to num (inclusive)
    for val in range(1, num + 1):
        if digit_sum(val) % 2 == 0:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × d), where n is num and d is the number of digits per number (at most 4 for num ≤ 1000). For each of the n numbers, we compute digit sum. Effective for small n.
- **Space Complexity:** O(1). Only a constant number of variables are used. No extra arrays or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the solution if num is very large (e.g., up to 10⁹)?
  *Hint: Look for a math pattern in how even-odd digit sum numbers repeat / distribute.*

- What if you were only asked for numbers with odd digit sums?
  *Hint: Simple logic flip. What changes in your code?*

- Can you generalize for any range of numbers [a, b] instead of [1, num]?
  *Hint: How would you count for [1, b], [1, a-1], and subtract?*

### Summary
This is a classic *digit sum property* problem, often solved by brute-force for reasonable input bounds, but can be optimized using mathematical insights about number properties. The coding pattern is helpful in any problems involving properties of digits in a sequence — such as "count digit with even/odd sum," "find numbers under constraints on their digit sum," and so on. These ideas frequently appear in number theory, combinatorics, and digit dynamic programming problems.

### Tags
Math(#math), Simulation(#simulation)

### Similar Problems
- Sum of Numbers With Units Digit K(sum-of-numbers-with-units-digit-k) (Medium)
- Sum of Digits of String After Convert(sum-of-digits-of-string-after-convert) (Easy)
- Number of Ways to Buy Pens and Pencils(number-of-ways-to-buy-pens-and-pencils) (Medium)
- Separate the Digits in an Array(separate-the-digits-in-an-array) (Easy)
- Find if Digit Game Can Be Won(find-if-digit-game-can-be-won) (Easy)