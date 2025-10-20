### Leetcode 2413 (Easy): Smallest Even Multiple [Practice](https://leetcode.com/problems/smallest-even-multiple)

### Description  
Given a positive integer n, return the smallest positive integer that is a multiple of both n and 2.  
In other words, find the smallest integer that is divisible by both n and 2.  
You can think of it as: "What is the smallest even number that is a multiple of n, or equivalently, what is the least common multiple (LCM) of n and 2?"

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `10`  
*Explanation: 5 is odd. The smallest even multiple is 5 × 2 = 10, since 10 is divisible by both 5 and 2.*

**Example 2:**  
Input: `n = 6`  
Output: `6`  
*Explanation: 6 is already even. The smallest number divisible by both 6 and 2 is 6 itself.*

**Example 3:**  
Input: `n = 7`  
Output: `14`  
*Explanation: 7 is odd. 14 = 7 × 2 is the smallest even multiple.*

### Thought Process (as if you’re the interviewee)  
Let's start with the brute-force approach:  
One way is to iterate from n upwards, checking each integer to see if it's both a multiple of n and even. However, this is inefficient because we only need to consider multiples of n. Every even multiple of n must be n \* k, where k is even if n is odd, or any k if n is even.

Optimizing:  
If n is already even, it's divisible by both n and 2, so n is the answer.  
If n is odd, the smallest even multiple is n × 2, because that’s the first even number that is also a multiple of n.

This leads to a constant-time check:
- If n % 2 == 0, return n.
- Otherwise, return n × 2.

No need for LCM functions; since one of the numbers is 2, only the parity check of n matters.

### Corner cases to consider  
- n is 1 (smallest case): output is 2.
- n is very large, but still positive and fits in integer range.
- n is already even.
- n is odd.
- n equals 2.

### Solution

```python
def smallestEvenMultiple(n):
    # If n is even, n is already divisible by both 2 and n
    if n % 2 == 0:
        return n
    # If n is odd, the smallest even multiple is n * 2
    else:
        return n * 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Only a single division and possibly a multiplication.
- **Space Complexity:** O(1) — No extra space beyond input and a variable for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize this to the smallest positive integer that is a multiple of both n and m?
  *Hint: Think about the formula for least common multiple (LCM).*
- What if n can be negative or zero?
  *Hint: What does it mean for zero or negative values in divisibility problems?*
- How would you implement this in a language with no modulo operator?
  *Hint: Are there efficient alternatives to determine evenness without %?*

### Summary
This is a classic math-based problem that requires recognizing the relationship between parity and divisibility by two. The solution uses a constant-time parity check. This pattern (checking for divisibility and choosing minimal multiples) is common in LCM or "smallest common multiple" type interview questions. It’s also a good example of reducing an apparent search or simulation problem to a direct arithmetic result using problem constraints.


### Flashcard
If `n` is odd, the smallest even multiple is `n × 2`; if `n` is even, it's `n`.

### Tags
Math(#math), Number Theory(#number-theory)

### Similar Problems
- Greatest Common Divisor of Strings(greatest-common-divisor-of-strings) (Easy)
- Three Divisors(three-divisors) (Easy)
- Find Greatest Common Divisor of Array(find-greatest-common-divisor-of-array) (Easy)
- Convert the Temperature(convert-the-temperature) (Easy)
- Minimum Cuts to Divide a Circle(minimum-cuts-to-divide-a-circle) (Easy)