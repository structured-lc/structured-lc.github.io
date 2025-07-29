### Leetcode 1427 (Easy): Perform String Shifts [Practice](https://leetcode.com/problems/perform-string-shifts)

### Description  
Given a string and a list of shift operations, where each operation consists of a direction (0 for left, 1 for right) and an amount, repeatedly shift the characters of the string left or right as specified by each operation. After performing all shifts in order, return the final string.  
- A **left shift** by 1 moves the first character to the end.
- A **right shift** by 1 moves the last character to the front.

### Examples  

**Example 1:**  
Input: `s = "abc", shift = [[0,1],[1,2]]`  
Output: `cab`  
*Explanation: [0,1] shifts left by 1: "abc" → "bca". Then [1,2] shifts right by 2: "bca" → "cab".*

**Example 2:**  
Input: `s = "abcdefg", shift = [[1,1],[1,1],[0,2],[1,3]]`  
Output: `efgabcd`  
*Explanation:  
[1,1]: right shift by 1 → "gabcdef"  
[1,1]: right shift by 1 → "fgabcde"  
[0,2]: left shift by 2 → "abcdefg"  
[1,3]: right shift by 3 → "efgabcd".*

**Example 3:**  
Input: `s = "x", shift = [[1,5],[0,2]]`  
Output: `x`  
*Explanation: Any shift to a single-character string leaves it unchanged.*

### Thought Process (as if you’re the interviewee)  
Start with the straightforward method: for each operation, perform the shift directly on the string (i.e., loop and slice strings repeatedly). But this is inefficient for many or large shifts because string slicing for each operation can be costly.

Notice that **left and right shifts can be combined**: a left shift by k and right shift by m is the same as a net shift by (m - k) to the right. So, compute the total net shift, take it modulo the string length (to avoid redundant cycles), and do a single shift operation on the string at the end.

This approach is efficient — just sum all shifts, then slice the string once based on the net direction.

### Corner cases to consider  
- Empty string (`s = ""`)
- Single character string (shifts have no visible effect)
- All left shifts or all right shifts
- No shift operations (`shift` list empty)
- Shift amounts larger than length of the string (must use mod)
- Sum of left and right shifts cancels to zero (result is same as original string)

### Solution

```python
def stringShift(s, shift):
    # Calculate net shift: right (1) is +amount, left (0) is -amount
    net_shift = 0
    for direction, amount in shift:
        if direction == 0:  # left shift
            net_shift -= amount
        else:  # right shift
            net_shift += amount

    n = len(s)
    if n == 0:
        return s  # empty string, nothing to shift

    # Reduce net_shift modulo string length to prevent cycles
    net_shift = net_shift % n

    # Right shift: take last net_shift chars, put them in front
    # If net_shift == 0, string remains unchanged
    return s[-net_shift:] + s[:-net_shift]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N is the length of the string and M is the number of shift operations. We process all shift operations in O(M), and do a single string slicing in O(N).
- **Space Complexity:** O(N), as we build a new shifted string of the same length as the input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large strings (gigabytes)?
  *Hint: Could you optimize space or avoid copying? Consider in-place shifts or using iterators.*

- What if shift operations arrive in a streaming fashion (one at a time)?
  *Hint: Can you process each on-the-fly or batch them?*

- Can you do it in place if the input were a list of characters?
  *Hint: Try to use reversal techniques: reverse parts of the list, then the whole.*

### Summary
This is a classic case of **reducing multiple sequential operations into a single equivalent operation** by algebraic simplification. The key insight is that left and right shifts can be consolidated using addition and modulo arithmetic.  
The solution demonstrates an efficient way to process bulk operations by combining them and minimizing work, a technique commonly applied in array, string, and queue manipulation problems.