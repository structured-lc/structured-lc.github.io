# [Practice](https://leetcode.com/problems/remove-zeros-in-decimal-representation)

### Description  
Given a positive integer n, remove all zero digits from its decimal representation and return the resulting integer. For example, if n = 1020030, after removing all zeros we get 123.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `1`  
*Explanation: The number 1 has no zero digits in its decimal representation, so it remains 1.*

**Example 2:**  
Input: `n = 1020030`  
Output: `123`  
*Explanation: The decimal representation is "1020030". After removing all zeros, we get "123", which converts to the integer 123.*

**Example 3:**  
Input: `n = 505`  
Output: `55`  
*Explanation: The decimal representation is "505". After removing the zero, we get "55", which converts to the integer 55.*


### Thought Process (as if you're the interviewee)  
The most straightforward approach is to convert the number to a string, remove all '0' characters, and convert back to an integer. This works because we're essentially filtering out characters, which is naturally suited for string operations.

Initially, I might consider extracting digits mathematically using modulo and division operations, but that would require reversing the digit order afterward. The string approach is cleaner and more intuitive: convert n to a string, replace or filter out zeros, then convert back to an integer.

Since the problem states n has at most 15 digits, efficiency isn't a major concern. The string approach is both simple and efficient enough for this constraint.

### Corner cases to consider  
- Single digit numbers like 1, 5, 9 (no zeros to remove)
- Numbers with leading positions as zeros after removal (e.g., 102 → 12)
- Numbers consisting entirely of one non-zero digit repeated (e.g., 111)
- Maximum value constraint (n ≤ 10⁹)
- A number that becomes much smaller after removing zeros (e.g., 10000000 → 1)

### Solution

```python
def removeZeros(n: int) -> int:
    # Convert the integer to a string
    n_str = str(n)
    
    # Remove all '0' characters by replacing them with empty string
    # Then convert back to integer
    result = int(n_str.replace('0', ''))
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(d) where d is the number of digits in n. We iterate through the string representation once to remove zeros, and converting back to integer is also O(d). Since d ≤ 15, this is effectively constant time.

- **Space Complexity:** O(d) for storing the string representation of n. The intermediate string created during `replace()` also takes O(d) space. Since d ≤ 15, the space is effectively constant.

### Potential follow-up questions (as if you're the interviewer)  

- (Follow-up question 1)  
  Can you solve this without converting to a string? Implement it using only mathematical operations.  
  *Hint: Extract digits using modulo and division, then reconstruct the number in reverse order. You'll need to handle digit reversal.*

- (Follow-up question 2)  
  What if n could be negative? How would your solution change?  
  *Hint: Track the sign separately, apply the zero-removal logic to the absolute value, then reapply the sign.*

- (Follow-up question 3)  
  Can you do this in-place without extra string or array storage?  
  *Hint: Consider the mathematical approach from follow-up 1, but think about whether "in-place" is meaningful for immutable integers.*

### Summary
This problem demonstrates the power of leveraging built-in string operations for number manipulation. Converting to a string, filtering out unwanted characters, and converting back is a common pattern in competitive programming when dealing with digit-level operations. This approach trades potential mathematical complexity for code simplicity and readability. The same pattern applies to other digit-manipulation problems like counting specific digits, rearranging digits, or validating digit properties.


### Flashcard
Convert the number to a string, remove all '0' characters, and convert back to an integer.

### Tags
Math(#math), Simulation(#simulation)

### Similar Problems
