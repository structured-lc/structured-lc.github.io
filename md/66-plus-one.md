### Leetcode 66 (Easy): Plus One [Practice](https://leetcode.com/problems/plus-one)

### Description  
Given a non-empty array of digits representing a non-negative integer (with the most significant digit at the head of the list), increment the integer by one and return the resulting array.  
Each entry in the array contains a single digit (0-9), and there are no leading zeros except for the number 0 itself.  
Imagine how you perform addition manually, digit by digit from least significant to most significant, carrying over as needed.

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `[1,2,4]`  
*Explanation: The number is 123. Adding one gives 124, so the result is [1,2,4].*

**Example 2:**  
Input: `[4,3,2,1]`  
Output: `[4,3,2,2]`  
*Explanation: The number is 4321. Adding one gives 4322, so the output is [4,3,2,2].*

**Example 3:**  
Input: `[9,9,9]`  
Output: `[1,0,0,0]`  
*Explanation: The number is 999. Adding one causes a carry at every digit, resulting in 1000, so the result is [1,0,0,0].*

### Thought Process (as if you’re the interviewee)  

- **Initial brute-force idea:** Convert the list to an integer, add 1, then split the integer back to a list.  
  - *Downside:* This approach won't handle really large integers, which may not fit in standard data types.

- **Optimal approach:**  
  - Mimic the manual addition process, working backwards (from the least significant digit at the end of the list).
  - For each digit:
    - If it's less than 9, increment and return the array.
    - If it's 9, set to 0 and continue to the next more significant digit (carry over 1).
  - If all digits are 9 (full carry), insert 1 at the beginning (e.g., [9,9,9] → [1,0,0,0]).
  - This approach is efficient, avoids overflow, and only needs a single pass through the list.

- **Trade-offs:**  
  - Uses O(1) extra space except possibly one extra digit at the start.
  - Easy to implement, clear, and doesn't risk numeric overflow.

### Corner cases to consider  
- An array with all 9s, like `[9,9,9]`  
- A single element array: ``, ``, `[5]`
- An array with trailing 9s: `[2,9,9]`
- Input already at the largest value for its length
- Leading zeros are disallowed, so no need to handle `[0,1,2]`

### Solution

```python
def plusOne(digits):
    # Start from the last digit and work backwards
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            # Simple case: increment and return
            digits[i] += 1
            return digits
        # If digit is 9, set to 0 and continue to handle carry over
        digits[i] = 0
    # If loop completes, all digits were 9. Prepend 1.
    return [1] + digits
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - In the worst-case (e.g., [9,9,9,...]), we may need to process every digit once.
- **Space Complexity:** O(1)  
  - No extra space except for possible extra digit in the result (which is O(1) for each operation). The operation is in-place except when growing the array by one at the start.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the digits list can be empty?  
  *Hint: Define behavior for empty input and document assumptions.*

- How would you handle subtract one instead?  
  *Hint: Consider borrow logic like normal subtraction—what corner cases arise?*

- Can you generalize this to an arbitrary increment k?  
  *Hint: Instead of a single “plus one” pass, consider simulating adding k digit by digit.*

### Summary
This approach uses a "simulated addition" pattern—manual digit manipulation from least to most significant, managing carry-over as needed.  
It’s very common whenever you have numbers split by digit in an array or list—common in problems that simulate calculators, big integers, or special number formats.  
This code pattern applies to big integer addition, incrementing string-based numbers, or any scenario where you must avoid integer overflow for large input sizes.

### Tags
Array(#array), Math(#math)

### Similar Problems
- Multiply Strings(multiply-strings) (Medium)
- Add Binary(add-binary) (Easy)
- Plus One Linked List(plus-one-linked-list) (Medium)
- Add to Array-Form of Integer(add-to-array-form-of-integer) (Easy)
- Minimum Operations to Reduce an Integer to 0(minimum-operations-to-reduce-an-integer-to-0) (Medium)