### Leetcode 3370 (Easy): Smallest Number With All Set Bits [Practice](https://leetcode.com/problems/smallest-number-with-all-set-bits)

### Description  
Given a positive integer **n**, return the **smallest integer x ≥ n such that the binary representation of x consists of only set bits** (that is, all 1s, like 1, 3, 7, 15, etc.).

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `7`  
*Explanation: The binary of 5 is 101. The next higher (or equal) number that has all bits set (111 in binary) is 7.*

**Example 2:**  
Input: `n = 10`  
Output: `15`  
*Explanation: The binary of 10 is 1010. The smallest number ≥ 10 with all bits set is 1111 (binary), which is 15.*

**Example 3:**  
Input: `n = 3`  
Output: `3`  
*Explanation: 3 is 11 in binary, which already has all set bits.*

### Thought Process (as if you’re the interviewee)  
- The problem asks for the smallest integer ≥ n whose binary representation is all 1s.
- Binary numbers with all set bits are of the form 1, 3, 7, 15, 31, ... which are (2¹−1), (2²−1), (2³−1), ...  
- For a given n, we need to find the smallest k such that (2ᵏ−1) ≥ n.
- Brute-force: Check each number ≥ n, test if all bits are set (e.g., check if n + 1 is a power of two).
- Optimized approach: Directly compute the bit length of n (how many binary digits it takes), then compute (2^bit_length)−1.
- Why? Because (2^k−1) has exactly k set bits, and will be the smallest such number ≥ n.

### Corner cases to consider  
- n is already a number with all set bits (e.g., 1, 3, 7, 15).
- n is 1 (minimum possible, already all set bits).
- n is just less than a power of two: ensure we return that (e.g., n=7→7, n=8→15).
- n is a large number, close to 1000 (upper bound).

### Solution

```python
def smallestNumber(n: int) -> int:
    # Calculate the number of bits needed to represent n
    bits = n.bit_length()
    # (2^bits) - 1 gives all set bits for that bit-length
    answer = (1 << bits) - 1
    # If that's >= n, return it. If not, need one more bit.
    if answer >= n:
        return answer
    else:
        return (1 << (bits + 1)) - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Computing bit_length and shifting are constant time for 1 ≤ n ≤ 1000 (small input constraint).
- **Space Complexity:** O(1)  
  Uses a constant amount of extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return the smallest such number with exactly k set bits?  
  *Hint: You'd need to construct numbers with any k set bits, not just consecutive ones.*

- Can you do this for very large n (up to 10¹⁸) efficiently?  
  *Hint: bit manipulations and integer operations still apply for large n.*

- How would you write a function that finds the next all-set-bits number strictly greater than n?  
  *Hint: Use bit_length(n+1) instead of bit_length(n), or add a check for equality.*

### Summary
This problem is a **bit manipulation** and math-pattern recognition exercise. The solution identifies that numbers of the form 2ᵏ−1 have all set bits, leverages bit_length to find the smallest such number ≥ n, and constructs it efficiently. This all-set-bits pattern occurs frequently in bitmasking problems and some combinatorics applications.