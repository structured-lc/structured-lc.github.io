### Leetcode 868 (Easy): Binary Gap [Practice](https://leetcode.com/problems/binary-gap)

### Description  
Given a positive integer n, return the **longest distance** between any two **adjacent 1’s** in its binary representation. If there are no two adjacent 1’s, return 0.

*For example: If n = 22, its binary representation is "10110". The maximum distance between two adjacent 1’s is 2.*

### Examples  

**Example 1:**  
Input: `22`  
Output: `2`  
*Explanation: Binary 22 is 10110. The maximum gap is between positions 1 and 3 (counting from right, 0-indexed): positions of '1's are at indices 1, 2, and 4. 2 - 1 = 1, 4 - 2 = 2. So the answer is 2.*

**Example 2:**  
Input: `8`  
Output: `0`  
*Explanation: Binary 8 is 1000. There is only one '1', so no gap can be formed between two adjacent '1's.*

**Example 3:**  
Input: `5`  
Output: `2`  
*Explanation: Binary 5 is 101. The '1's are at positions 0 and 2 (from right). The gap is 2.*

### Thought Process (as if you’re the interviewee)  
First, I’ll need to find the positions of all '1' bits in the binary representation of n. The problem asks for the biggest difference between the indices of any two adjacent '1's.

Brute-force:  
- Convert n to binary as a string.
- Find all indices where '1' occurs.
- Calculate the maximum difference between consecutive indices.

Optimized Bit Manipulation:  
- Iterate through each bit of n using bitwise operations.
- Record the index whenever a '1' occurs.
- Track the gap between current and previous '1' positions on the fly.
- This avoids string conversion and is both space and time efficient.

I would proceed with the bit manipulation approach. It only needs O(1) space and O(32) time, which is optimal for single-integer operations.

### Corner cases to consider  
- n is a power of two (e.g., 2, 8): Only one '1', so output should be 0.
- n = 0: Input is positive, but if zero, same logic: output 0.
- All bits are '1' (e.g., 3, binary is 11): Only one gap.
- n = 1: Only one bit set, gap = 0.

### Solution

```python
def binaryGap(n: int) -> int:
    max_gap = 0
    last_one_pos = -1
    curr_pos = 0

    while n > 0:
        if n & 1:
            if last_one_pos != -1:
                gap = curr_pos - last_one_pos
                max_gap = max(max_gap, gap)
            last_one_pos = curr_pos
        n >>= 1
        curr_pos += 1

    return max_gap
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(32)  
  (Since we check each bit in a 32-bit integer, the number of iterations is at most 32, so O(1) in practice.)

- **Space Complexity:** O(1)  
  (We use only a few integer variables regardless of input size.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input were a string, not a number?
  *Hint: How would you parse the positions of 1’s directly and efficiently?*

- How would you optimize for very large numbers, say a 128-bit integer?
  *Hint: Would your approach or variable sizes change?*

- Can you process a stream of bits instead of a whole number at once?
  *Hint: Consider online algorithms for streaming input.*

### Summary
This problem is an example of **bit manipulation** and **single-pass difference tracking**. The pattern here is identifying **indices of bits** within an integer and operating with minimal additional space and time. This approach applies to other problems involving finding patterns or distances within a sequence (such as maximum consecutive elements, min/max difference between positions of values, etc.). The problem demonstrates efficient value tracking and the practical use of bitwise operations.


### Flashcard
Track positions of 1s in binary; compute max gap between consecutive 1s using bitwise iteration.

### Tags
Bit Manipulation(#bit-manipulation)

### Similar Problems
