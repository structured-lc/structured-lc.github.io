### Leetcode 67 (Easy): Add Binary [Practice](https://leetcode.com/problems/add-binary)

### Description  
Given two strings `a` and `b` representing **binary numbers** (only '0' and '1'), return their sum as a binary string. You should perform the addition without using built-in binary conversion functions. The rules are the same as decimal addition, except that in binary, if the sum of two bits is 2, carry over 1 to the next position.

### Examples  

**Example 1:**  
Input: `a = "11", b = "1"`  
Output: `"100"`  
*Explanation: 11 (binary) = 3, 1 (binary) = 1, 3 + 1 = 4. 4 in binary is 100.*

**Example 2:**  
Input: `a = "1010", b = "1011"`  
Output: `"10101"`  
*Explanation: 1010 (binary) = 10, 1011 (binary) = 11. 10 + 11 = 21. 21 in binary is 10101.*

**Example 3:**  
Input: `a = "0", b = "0"`  
Output: `"0"`  
*Explanation: Both numbers are 0, and their sum is also 0.*

### Thought Process (as if you’re the interviewee)  
Start by thinking about how you add two numbers by hand: you start from the rightmost digit, add each pair (plus the carry if needed), then move to the next digit. The **same logic applies to binary strings**. We'll use two pointers, one for each string, going from the end towards the beginning, and a carry variable. At each step, add the corresponding digits and the carry, then set the new digit and update the carry. Continue even if the strings are of different lengths.

A brute-force approach would be to convert both strings to integers, add, and convert back to string, but **that's not allowed in most interviews**—and doesn't practice the required skill!

The optimal approach is to simulate binary addition digit-by-digit:
- Use two pointers to iterate from the end of each string.
- Add corresponding digits and carry.
- Build the result string by appending the resulting bit each time.
- After the loop, if a carry remains, add it to the front.

This avoids shortcuts and matches typical expectations in interviews.

### Corner cases to consider  
- One or both strings are `"0"` (should output `"0"`).
- Different string lengths (e.g., `"1"` and `"111"`).
- There’s a final carry at the end (e.g., `"1"` + `"1"` = `"10"`).
- Large string inputs.
- Only one string is empty (not specified in the problem spec, so assume it doesn't happen).

### Solution

```python
def addBinary(a: str, b: str) -> str:
    # Result list to collect the bits (reversed)
    result = []
    # Set pointers at the end of each string
    i, j = len(a) - 1, len(b) - 1
    carry = 0

    # Loop until both strings are processed and no carry remains
    while i >= 0 or j >= 0 or carry:
        total = carry
        # Add bit from a if available
        if i >= 0:
            total += int(a[i])
            i -= 1
        # Add bit from b if available
        if j >= 0:
            total += int(b[j])
            j -= 1
        # Append the current bit (total % 2)
        result.append(str(total % 2))
        # Update carry for next step
        carry = total // 2

    # The result is built in reverse
    return ''.join(reversed(result))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(max(len(a), len(b))).  
  We process each character of both strings at most once, from right to left.
- **Space Complexity:** O(max(len(a), len(b))).  
  We store the result, which in the worst case is one digit longer than the longest input string (due to a final carry).

### Potential follow-up questions (as if you’re the interviewer)  

- What if one of the inputs could be an empty string?  
  *Hint: How would you handle empty input—should it be treated as "0"?*

- Can you perform the addition without building the result string (for a streaming scenario)?  
  *Hint: How would you output the result bit by bit if you couldn't store all bits at once?*

- How would you extend this to add numbers in any base, not just binary?  
  *Hint: What would you generalize in the per-digit sum and carry logic?*


### Summary
This problem demonstrates the standard **string, two-pointer, and carry-over addition** pattern, often seen in linked list sum and base conversion problems. It’s a very common pattern for simulating manual addition/subtraction on numbers represented as strings or arrays. This technique can also apply to problems in base \(B\), or to adding numbers represented as linked lists (such as Leetcode 2: Add Two Numbers).

### Tags
Math(#math), String(#string), Bit Manipulation(#bit-manipulation), Simulation(#simulation)

### Similar Problems
- Add Two Numbers(add-two-numbers) (Medium)
- Multiply Strings(multiply-strings) (Medium)
- Plus One(plus-one) (Easy)
- Add to Array-Form of Integer(add-to-array-form-of-integer) (Easy)