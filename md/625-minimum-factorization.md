### Leetcode 625 (Medium): Minimum Factorization [Practice](https://leetcode.com/problems/minimum-factorization)

### Description  
Given a positive integer num, find the smallest positive integer x such that the product of the digits of x equals num. If x does not exist, or if x does not fit in a 32-bit signed integer, return 0.

In other words:  
You are given a number. Construct the smallest possible integer (by its digit order) whose digits multiply to the original number. Each digit must be 2-9 (no 0 or 1 used for multiplication). If it's impossible (like number has a prime factor >9), or the answer is too large, return 0.

### Examples  

**Example 1:**  
Input: `48`  
Output: `68`  
Explanation: 6 × 8 = 48. The smallest such number (not 86).

**Example 2:**  
Input: `15`  
Output: `35`  
Explanation: 3 × 5 = 15. Ordering digits from smallest to largest gives 35.

**Example 3:**  
Input: `1`  
Output: `1`  
Explanation: 1 is already the smallest number whose digits multiply to 1.

**Example 4:**  
Input: `100`  
Output: `455`  
Explanation: 4 × 5 × 5 = 100. The digits are sorted smallest to largest.

**Example 5:**  
Input: `17`  
Output: `0`  
Explanation: 17 is prime and > 9, so it cannot be expressed as a product of digits 2-9. No answer possible.

### Thought Process (as if you’re the interviewee)  
First, brute force would mean trying all possible combinations of numbers and their digits, but that’s too slow—possible combinations explode as num increases.

The goal is to **minimize x**, so digits with larger value should be on the right (ones place). This means we try to break `num` down using the largest digits between 2 and 9. We start from 9 down to 2, greedily dividing num by possible digits when divisible, and collect these digits.

Why not use digits like 1? Because 1 *anything doesn’t help minimize the number of digits, and the output should be the smallest possible number.

We keep collecting digits, repeat division, and when no more division is possible:
- If final `num` is 1: we succeeded. Sort and assemble the collected digits into an integer (smallest possible value).
- If not: that means num has a factor >9 or could not be decomposed. Return 0.

Lastly, check if our answer fits in 32-bit signed int (`≤2³¹ − 1`).

### Corner cases to consider  
- num == 1 should return 1.
- num < 10 should return num itself.
- num has a prime factor >9: return 0.
- Output exceeds 2³¹ − 1: return 0.
- num cannot be broken down with only digits 2-9: return 0.

### Solution

```python
def smallestFactorization(num):
    # Special case: num == 1
    if num == 1:
        return 1

    # To store found digits (as str for easy sorting)
    digits = []

    # Try to break num down using digits 9..2
    for d in range(9, 1, -1):
        while num % d == 0:
            digits.append(str(d))
            num //= d

    # If after factorization, num is not 1, return 0
    if num != 1:
        return 0

    # Sort digits ascending for the smallest number
    digits.sort()
    result = int(''.join(digits))

    # Check 32-bit integer limit
    if result >= 2 ** 31:
        return 0

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(logₙ)  
  For each digit 9 to 2, in worst case we divide num down, so the loop runs a log(num) number of times in total.
- **Space Complexity:** O(logₙ)  
  At most, need space for storing up to log₂(num) digits in worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to output all possible x, not just the smallest?  
  *Hint: Consider backtracking or permutations rather than greedy.*

- How would your approach change if 0 or 1 were allowed in the product?  
  *Hint: Allowing zeros can produce answers like 10, but must avoid leading zeros.*

- Can you optimize further if num is very large, up to 10¹²?  
  *Hint: Consider more efficient prime factorization methods, but the product of digits must always be ≤9.*

### Summary
This is a classic **greedy / digit factorization problem**. The major insight is breaking the number using largest possible digits (from 9 downward), since larger digits in lower places result in a smaller numeric value. Sorting the digits gives the minimum value required by the problem.  
The approach is also seen in questions that ask for integer construction under product/digit constraints, and combines simple factorization with greedy assembly for smallest lexicographical order.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
