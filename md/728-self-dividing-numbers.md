### Leetcode 728 (Easy): Self Dividing Numbers [Practice](https://leetcode.com/problems/self-dividing-numbers/)

### Description  
Given two integers `left` and `right`, return a list of all *self-dividing numbers* in the inclusive range \[left, right\].  
A **self-dividing number** is a number that is divisible by every digit it contains and does **not** contain the digit 0 (since division by zero is undefined).  
For example, 128 is self-dividing: 128 % 1 == 0, 128 % 2 == 0, 128 % 8 == 0. However, 120 is not self-dividing because it contains a 0 and 120 % 0 is undefined.

### Examples  

**Example 1:**  
Input: `left=1, right=22`  
Output: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]`  
*Explanation: Each number in the range is checked. For example, 14 has digits 1 and 4. Since 14 % 1 == 0 but 14 % 4 != 0, 14 is NOT included. Numbers like 10 are skipped because they contain a 0.*

**Example 2:**  
Input: `left=47, right=85`  
Output: `[48, 55, 66, 77]`  
*Explanation: These numbers in the range have no digit 0 and are divisible by all their digits. For example, 55 has digits 5 and 5, and 55 % 5 == 0. 49 is excluded because 49 % 4 != 0.*

**Example 3:**  
Input: `left=1, right=1`  
Output: `[1]`  
*Explanation: 1 is trivially self-dividing since it is divisible by itself.*

### Thought Process (as if you’re the interviewee)  

- I need to iterate over every number from `left` to `right` inclusive.
- For each number, I should check all its digits:
    - If it contains a 0, immediately skip it, since division by 0 is not possible.
    - For every non-zero digit, check if the number is divisible by that digit.
    - If all digits divide the number evenly, the number is self-dividing; collect it in the result list.
- Brute-force works here since the upper limit (right ≤ 10,000) is reasonable.
- To examine the digits, I can extract them either as string characters or by using modulo operations.
- Trade-offs: String conversion is readable, but modulo approach uses only math, avoids string ops, and could be faster for large-scale systems.
- The core logic should be implemented as a helper function (e.g., is_self_dividing), for neat code separation and readability.

### Corner cases to consider  
- Ranges that include 0 or numbers containing 0 (e.g., 10, 101)
- Single-element range (e.g., left == right)
- Negative numbers (based on the problem, left and right are positive, but still good to check)
- Large numbers, but always ≤ 10,000 per problem constraints
- Digits that repeat (e.g., 11, 22, 33): should handle this normally

### Solution

```python
def selfDividingNumbers(left: int, right: int):
    def is_self_dividing(num):
        original = num
        while num > 0:
            digit = num % 10        # Extract the last digit
            if digit == 0 or original % digit != 0:   # Zero check and divisibility check
                return False
            num //= 10              # Drop the last digit
        return True

    result = []
    for number in range(left, right + 1):
        if is_self_dividing(number):
            result.append(number)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((right - left + 1) × d), where d is the max number of digits (at most 5 for numbers up to 10,000). For each number in the range, we check all its digits.  
- **Space Complexity:** O(k), where k is the number of self-dividing numbers (since we only store the answer list; function uses only a constant amount of extra space for variables and digit checks).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the algorithm if the input bounds were much larger (e.g., up to 10⁹)?
  *Hint: Consider if there’s a mathematical shortcut or early pruning of candidate numbers based on their digits.*

- Can you solve this problem without using any string conversion at all?
  *Hint: Use only arithmetic (modulo and division) operations to extract and process digits.*

- How would you return the *count* of self-dividing numbers, rather than the full list?
  *Hint: Instead of appending to a list, simply increment a counter when a valid number is found.*

### Summary

This problem follows the brute-force pattern, iterating through a range and filtering based on digit properties (digit extraction and divisibility). The key insight is digit-wise filtering and modular checks. Patterns like digit separation (mod 10 & integer division) are common and can be applied to problems like palindrome numbers, reversing digits, or digit sum calculation. This is a straightforward filter-by-property pattern for numbers.