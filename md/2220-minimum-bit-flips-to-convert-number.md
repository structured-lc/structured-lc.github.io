### Leetcode 2220 (Easy): Minimum Bit Flips to Convert Number [Practice](https://leetcode.com/problems/minimum-bit-flips-to-convert-number)

### Description  
Given two integers, **start** and **goal**, determine the minimum number of *bit flips* (changing a bit from 0↔1) needed to convert **start** into **goal**. A flip can be performed at any bit position (including leading zeros). For each bit position where **start** and **goal** differ, one flip is required.

### Examples  

**Example 1:**  
Input: `start = 10, goal = 7`  
Output: `3`  
*Explanation:*
- 10 in binary: 1010  
- 7 in binary:  0111  
- They differ at 3 positions (from right: 0↔1, 1↔1, 1↔0, 0↔1).
- So, 3 bit flips are needed.

**Example 2:**  
Input: `start = 3, goal = 4`  
Output: `3`  
*Explanation:*
- 3 in binary:  011  
- 4 in binary: 100  
- All three bits differ. So, 3 flips needed.

**Example 3:**  
Input: `start = 1, goal = 1`  
Output: `0`  
*Explanation:*
- 1 in binary: 1  
- 1 in binary: 1  
- No differing bits. No flips needed.


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Compare each bit of **start** and **goal** from least significant to most significant. For every bit where they differ, increment a counter.  
  This can be done by checking each bit one by one (using bit masking and right shift).

- **Optimized idea:**  
  Use the bitwise XOR operator: `start ^ goal`. XOR returns a 1 at every bit position where the two numbers differ.  
  The result will have as many 1's as there are differing positions.  
  Count the number of set bits (1's) in this XOR result, which is our answer.

- **Why this is optimal:**  
  - Only needs O(number of bits) time, which is constant for 32-bit or 64-bit integers.
  - No extra space except a few variables.

- **Trade-offs:**  
  - Both the brute-force and optimized ideas have constant time for typical int sizes.
  - The XOR approach is cleaner and avoids manual bit comparison.


### Corner cases to consider  
- start and goal are equal (answer should be 0)
- One or both numbers are 0
- Numbers differ in leading (higher order) zero bits
- Negative numbers (depending on constraints; if not specified, focus on non-negative)


### Solution

```python
def minBitFlips(start: int, goal: int) -> int:
    # XOR of start and goal gives bits that differ
    diff = start ^ goal
    count = 0
    # Count number of set bits in diff
    while diff:
        # Remove the lowest set bit (Brian Kernighan's algo)
        diff = diff & (diff - 1)
        count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  The number of iterations is at most the number of bits in an integer (commonly 32 or 64), which is treated as constant.

- **Space Complexity:** O(1)  
  Only a few extra variables are used, regardless of input size.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to output the actual positions of flipped bits?  
  *Hint: You can record positions as you check each bit (using shifting and indexing).*

- Can you solve this without using any built-in bit-counting functions or tricks?  
  *Hint: Manually check bit by bit with shifting and masking.*

- How does this work with negative numbers?  
  *Hint: Consider two's complement representation—make sure to handle bit width properly if needed.*


### Summary
This approach uses a classic **bit manipulation** and **count set bits** pattern. The use of XOR highlights how to detect differing bits efficiently. This coding method also appears in hamming distance, counting differing pixels, or bit flips in error correction contexts. It’s a standard and powerful trick for any interview involving binary numbers or bitwise operations.


### Flashcard
Count differing bits between start and goal using XOR; the number of set bits in (start ^ goal) gives the answer.

### Tags
Bit Manipulation(#bit-manipulation)

### Similar Problems
- Minimum Flips to Make a OR b Equal to c(minimum-flips-to-make-a-or-b-equal-to-c) (Medium)
- Minimum Number of Operations to Make Array XOR Equal to K(minimum-number-of-operations-to-make-array-xor-equal-to-k) (Medium)
- Smallest Number With All Set Bits(smallest-number-with-all-set-bits) (Easy)