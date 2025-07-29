### Leetcode 3079 (Easy): Find the Sum of Encrypted Integers [Practice](https://leetcode.com/problems/find-the-sum-of-encrypted-integers)

### Description  
Given an array of positive integers `nums`, define an encrypt function where encrypt(x) replaces every digit of x with the largest digit in x. For example, if x = 523, encrypt(x) = 555. Your task is to compute the sum of all encrypted values for every number in `nums`.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `6`  
*Explanation: Each number is a single digit, so their encrypted forms remain `[1, 2, 3]`. 1 + 2 + 3 = 6.*

**Example 2:**  
Input: `nums = [10,21,31]`  
Output: `66`  
*Explanation:*
- 10: max digit = 1 ⇒ encrypt(10) = 11
- 21: max digit = 2 ⇒ encrypt(21) = 22
- 31: max digit = 3 ⇒ encrypt(31) = 33
Sum: 11 + 22 + 33 = 66

**Example 3:**  
Input: `nums = [100,505,999]`  
Output: `1554`  
*Explanation:*
- 100: max digit = 1 → encrypt(100) = 111
- 505: max digit = 5 → encrypt(505) = 555
- 999: max digit = 9 → encrypt(999) = 999
Sum: 111 + 555 + 888 = 1554

### Thought Process (as if you’re the interviewee)  

First, understand and simulate the encrypt function: for any integer, replace each digit with that number’s largest digit.
A brute-force approach is to, for each number, find its max digit, build the encrypted number by repeating it for as many digits, then sum up all these values.

Steps for each number:
- Break number into digits. Track the largest digit.
- Rebuild a new integer where every digit is the max digit, preserving length.
- Add this encrypted value to a running sum.

This is efficient since inputs are small (length ≤ 50, values ≤ 1000), so we don't need further optimization.
No advanced data structures necessary; a simple loop with arithmetic suffices.

### Corner cases to consider  
- Single-digit numbers (e.g., ``) — encrypted number is the same as original.
- Numbers with repeated digits, e.g. ``, all digits are the max.
- Numbers with zeros (e.g., `[101, 202]`).
- All elements are the same, e.g., `[44,44,44]`.
- Length 1 array.
- Maximum value inputs (value = 1000).

### Solution

```python
def sumOfEncryptedInt(nums):
    total = 0

    for num in nums:
        temp = num
        max_digit = 0
        digits = []

        # Step 1: Find max digit and collect digits.
        while temp > 0:
            digit = temp % 10
            digits.append(digit)
            if digit > max_digit:
                max_digit = digit
            temp //= 10

        # Edge case: num == 0 (not possible per constraints, but to be safe)
        if not digits:
            max_digit = 0
            digits_len = 1
        else:
            digits_len = len(digits)

        # Step 2: Build new number with all digits as max_digit
        encrypted = 0
        for _ in range(digits_len):
            encrypted = encrypted * 10 + max_digit

        total += encrypted

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × D) where N = length of nums and D is maximum number of digits (at most 4, since nums[i] ≤ 1000). For each num, we process up to 4 digits.
- **Space Complexity:** O(1) extra — aside from temporary variables, only the result variable is used. The digits list is at most 4 elements (constant space).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do this without converting numbers to strings or lists?
  *Hint: Try using only integer division and modulo for digit processing.*

- What if numbers could be negative or contain zeros?
  *Hint: How are negative signs or leading zeros treated in encryption?*

- If each digit had to be replaced by the sum of digits instead, how would that change your approach?
  *Hint: Think about digit-sum logic and multiple digits.*

### Summary
This problem follows a **digit manipulation** and **accumulation** pattern, often seen in number-processing interviews (e.g., palindromes, digit sums, base conversions). The approach is brute-force but optimal within constraints, iterating through digits with elementary arithmetic. It generalizes to other problems where digits must be inspected, replaced, or counted.