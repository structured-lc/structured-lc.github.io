### Leetcode 2847 (Medium): Smallest Number With Given Digit Product [Practice](https://leetcode.com/problems/smallest-number-with-given-digit-product)

### Description  
Given a **positive integer** n, return the **smallest positive integer** as a string such that the **product of its digits is exactly n**. If no such number exists, return "-1".

In other words:  
Find the smallest integer (without leading zeroes) whose digits multiply up to n. If such a number can't be built using digits 1-9, return "-1".

### Examples  

**Example 1:**  
Input: `n = 105`  
Output: `357`  
*Explanation: 3 × 5 × 7 = 105. No smaller number can be made since using only digits 1-9 for multiplication, so "357" is the answer, digits arranged in ascending order for the smallest number.*

**Example 2:**  
Input: `n = 7`  
Output: `7`  
*Explanation: 7 is already a single-digit number, so the smallest such number is "7".*

**Example 3:**  
Input: `n = 44`  
Output: `-1`  
*Explanation: 44 cannot be expressed as the product of only digits 1-9. We cannot factor it into such digits, so the return is "-1".*

### Thought Process (as if you’re the interviewee)  
First, let's think of the **brute force**: try every permutation of digits 1-9, checking the product. This is not feasible for large n.

The **key insight** is that any digit in the result must be between 1-9 (inclusive). So, if we can factor n only using numbers from 2 to 9, that's what we want. To get the **smallest number**, larger digits should occur at lower significance — this means we should factor n using the largest possible digits first (from 9 down to 2), and then sort the digits in ascending order for the smallest number.

The steps are:
- For d in 9 down to 2:
    - While n is divisible by d, divide n by d, and add d to our result digits.
- If at the end n > 1, impossible: return "-1".
- Otherwise, sort the digits in ascending order and concatenate them as a string. This ensures the smallest possible number.

This works efficiently because n ≤ 10¹⁸, but we only loop through primes ≤ 9 repeatedly—not factorial time.

### Corner cases to consider  
- n = 1: The product of digits should be 1, so "1" is the answer.
- n < 10: For 2–9, "n" itself is the answer.
- n contains prime factor(s) > 9: Impossible, return "-1".
- Very large n with only factors 2–9: Make sure algorithm handles large input.
- n = 0: Not allowed as per constraints (n ≥ 1).

### Solution

```python
def smallestNumber(n: int) -> str:
    # Special case: product 1 can be achieved only by digit 1
    if n == 1:
        return "1"
    # List to collect digits in result
    res = []
    # Start factoring n from largest digit possible down to 2
    for d in range(9, 1, -1):
        while n % d == 0:
            res.append(str(d))
            n //= d
    # If n could not be fully factored into 2-9 (n > 1), impossible
    if n > 1:
        return "-1"
    # To get smallest number, digits should be sorted ascending
    res.sort()
    return "".join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(log n), where the number is divisible fully into digits 2–9; each division reduces n multiplicatively, and the number of digits collected is bounded.
- **Space Complexity:**  
  O(1) excluding the output, since at most ⌊log₂(n)⌋ digits needed; plus storage for the result digits (very small, maximum ≈60 for n within 10¹⁸).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were asked for the largest such number instead?  
  *Hint: Sort the digits in descending instead of ascending order.*

- How would you handle "return every such number in the range [L, R]"?  
  *Hint: Factor every number in that range, but this would be slow, so consider sieving or special properties.*

- What changes if n can contain a zero digit?  
  *Hint: Product including 0 is always 0, but zero is not a valid digit to start except for n = 0.*

### Summary
This problem is a classic application of **greedy factorization**: break a number into digit factors using the largest allowed digits, then organize them to form the minimal number. The pattern of **factorization using bounded primes**, with **post-processing order for minimal value**, is common in digit-product or root problems, and the technique is useful for other digit-construction or minimal/maximal value composition challenges.