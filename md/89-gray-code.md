### Leetcode 89 (Medium): Gray Code [Practice](https://leetcode.com/problems/gray-code)

### Description  
Given an integer **n**, generate a list containing a **Gray code** sequence for n bits.  
A Gray code sequence is a list of `2ⁿ` integers, starting with 0, where each number is unique and consecutive numbers differ by **exactly one bit** in their binary representations. The sequence may be cyclic (i.e., last and first elements may differ by a single bit as well).

For example, for n = 2, valid outputs include `[0,1,3,2]` and `[0,2,3,1]`.  
Constraint: 0 ≤ n ≤ 16.

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `[0,1,3,2]`  
Explanation:  
Binary: `[00, 01, 11, 10]` — each adjacent pair differs by exactly one bit (`00`→`01`, `01`→`11`, `11`→`10`).  

**Example 2:**  
Input: `n = 1`  
Output: `[0,1]`  
Explanation:  
Binary: `[0, 1]` — differs by one bit.

**Example 3:**  
Input: `n = 0`  
Output: ``  
Explanation:  
Sequence of size 1, just ``.

### Thought Process (as if you’re the interviewee)  

Let's think step by step:

- **Brute-force idea**:  
  Try permuting all 2ⁿ numbers and find a valid sequence where each number differs from the previous by 1 bit. This is impractical for n ≥ 3 (2ⁿ grows fast) and verifying all permutations would be exponential time.

- **Observing patterns**:  
  Looking at existing Gray codes, we see that each sequence starts at 0 and every next number differs from the last by one bit. The sequence has special mathematical properties.

- **Bit manipulation formula**:  
  There exists a direct formula:  
  For each integer `i` in `0, 1, ..., 2ⁿ-1`, the corresponding Gray code is `i ^ (i >> 1)`.  
  This formula ensures that each number differs by one bit from the previous, and covers all cases efficiently.

- **Reflection method**:  
  Another well-known construction is by reflecting and prefixing. Start with , for each step, reflect the existing list and prefix 1 to the reflected part, combining both.

- **Final choice**:  
  The **bitwise formula** is preferred for interviews; it’s simple, clear, and runs in linear time.  
  Example:  
    - n = 2, i = 0 → 0 ^ 0 = 0  
    - i = 1 → 1 ^ 0 = 1  
    - i = 2 → 2 ^ 1 = 3  
    - i = 3 → 3 ^ 1 = 2  

### Corner cases to consider  
- n = 0 (sequence should be ``)
- n = 1 (just two numbers `[0, 1]`)
- Large n (n = 16): check memory and performance
- Correctness: each number must differ by only one bit from the previous  
- No duplicates, always starting at 0

### Solution

```python
def grayCode(n):
    """
    Generate the n-bit Gray code sequence.
    Each value at position i is computed as: i ^ (i >> 1)
    """
    result = []
    for i in range(1 << n):            # 1 << n is 2ⁿ
        gray = i ^ (i >> 1)            # Compute Gray code for position i
        result.append(gray)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(2ⁿ) — we generate every number `i` from 0 to 2ⁿ-1, and for each do a constant-time XOR and shift.

- **Space Complexity:**  
  O(2ⁿ) — output list stores all 2ⁿ Gray codes; no extra data structures are needed.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generate the Gray code sequence in reverse order?
  *Hint: Think about how you would modify the order of generating i, or walk backwards.*

- Can you map a given Gray code back to the original binary number?
  *Hint: There is a decoding formula; try to derive the inverse of i ^ (i >> 1).*

- Can you construct the Gray code recursively using the reflection method?
  *Hint: Start from n = 1, build up to n by mirroring and prefixing.*

### Summary

This problem relies on **bit manipulation** and **pattern recognition**. The `i ^ (i >> 1)` formula is a concise way to produce n-bit Gray codes in O(2ⁿ) time and space, and is a classic example of using low-level operations efficiently. These techniques show up in combinatorics, circuit design, and coding theory, and the reflection pattern is a staple in recursive sequences and enumeration problems.


### Flashcard
Generate Gray code by reflecting the sequence for n-1 bits and prefixing 1 to the reflected half, ensuring each step differs by one bit.

### Tags
Math(#math), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation)

### Similar Problems
- 1-bit and 2-bit Characters(1-bit-and-2-bit-characters) (Easy)