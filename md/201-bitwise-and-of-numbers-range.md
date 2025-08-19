### Leetcode 201 (Medium): Bitwise AND of Numbers Range [Practice](https://leetcode.com/problems/bitwise-and-of-numbers-range)

### Description  
Given two integers, **left** and **right**, representing the range \([ \text{left}, \text{right} ]\), return the **bitwise AND** of all numbers in this range, inclusive.  
The bitwise AND operation compares two numbers bit by bit and retains a 1 only if both bits in the compared position are 1; otherwise, the result is 0. The challenge is to efficiently compute the cumulative AND result for all integers between left and right (inclusive), especially when the interval may be large.

### Examples  

**Example 1:**  
Input: `left = 5, right = 7`  
Output: `4`  
*Explanation: 5 = 101₂, 6 = 110₂, 7 = 111₂.  
5 & 6 = 100₂ (4), 4 & 7 = 100₂ (4). So, output is 4.*

**Example 2:**  
Input: `left = 0, right = 0`  
Output: `0`  
*Explanation: Only one number—0—so output is 0.*

**Example 3:**  
Input: `left = 1, right = 2147483647`  
Output: `0`  
*Explanation: All numbers from 1 up to 2³¹-1 contain every possible bit position, so result is 0 after cumulative AND.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Loop from left to right, AND-ing each value with a cumulative result.  
  - This works for small ranges but is too slow for large intervals, as the loop could run up to 2³¹ times.
- **Key observation:**  
  - Any bit position where left and right differ will eventually become 0 when AND-ed across a range, since every bit flips at some power of two.  
  - Effectively, you only keep the **common prefix** of left and right in binary. All lower bits become 0.
- **Optimization:**  
  - Shift left and right rightward (divide by 2) until they are equal, counting how many shifts you make. This finds the common prefix.  
  - The answer is left (now equal to right) shifted left by the count of shifts (to restore the original bit positions).
- **Trade-offs:**  
  - This approach is fast (\(O(\log n)\)), handles large numbers, and uses constant extra space.

### Corner cases to consider  
- left == right (single number in the range)  
- left == 0 (output is always 0)  
- The range covers a power-of-two boundary (e.g., left=7, right=8; result should be 0)  
- Maximum range (left=1, right=2³¹−1)

### Solution

```python
def rangeBitwiseAnd(left: int, right: int) -> int:
    shift = 0
    # Find the common prefix by shifting right both numbers until they match
    while left != right:
        left >>= 1
        right >>= 1
        shift += 1
    # Shift back to restore the zeros in the low bits
    return left << shift
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₀(right - left + 1))  
  Each iteration reduces the difference between left and right by half (shift right). Worst case is 31 shifts for 32-bit integers.
- **Space Complexity:** O(1)  
  Only a fixed number of variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to perform the same operation for multiple disjoint ranges?
  *Hint: Can you preprocess or cache results for queries?*

- How would your solution change if left and right are provided as strings (for very large numbers)?
  *Hint: Simulate bit operations without converting to int, handling strings character by character.*

- How would you adapt your algorithm if you needed the bitwise OR instead of AND for the range?
  *Hint: When does the OR result change as the range expands?*

### Summary
This problem demonstrates a classic **bit manipulation** pattern, focusing on **finding a common prefix** in binary representation. It's efficient for large ranges, and the same idea of prefix compression is common in problems like finding the longest common prefix, range mask calculation, and some trie-based problems. The shift-and-compare loop is a key pattern for range bit problems.

### Tags
Bit Manipulation(#bit-manipulation)

### Similar Problems
- Longest Nice Subarray(longest-nice-subarray) (Medium)