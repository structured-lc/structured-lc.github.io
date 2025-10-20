### Leetcode 2429 (Medium): Minimize XOR [Practice](https://leetcode.com/problems/minimize-xor)

### Description  
Given two integers **num1** and **num2**, find an integer **x** with the same number of set bits (1s in binary) as **num2**, such that the bitwise XOR **num1 ⊕ x** is minimized. Return **x**.

### Examples  

**Example 1:**  
Input: `num1 = 3, num2 = 5`  
Output: `3`  
*Explanation: num1=3 (11₂), num2=5 (101₂), so num2 has 2 set bits.  
Choose x=3 (11₂), which also has 2 set bits. 3 ⊕ 3 = 0, which is minimal.*

**Example 2:**  
Input: `num1 = 1, num2 = 12`  
Output: `3`  
*Explanation: num1=1 (1₂), num2=12 (1100₂) ⇒ 2 set bits.  
x=3 (11₂) has 2 set bits; 1 ⊕ 3 = 2.*

**Example 3:**  
Input: `num1 = 25, num2 = 72`  
Output: `24`  
*Explanation: num1=25 (11001₂), num2=72 (1001000₂) ⇒ 2 set bits.  
Set most significant bits: x = 24 (11000₂) has 2 set bits, 25 ⊕ 24 = 1, which is minimal.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all possible numbers `x` with the same number of 1s as `num2`, and pick the one that minimizes `num1 ⊕ x`. For 32-bit numbers, this is extremely inefficient: up to C(32, k) options if k is number of set bits.

- **Optimization:**  
  We want x with the same number of set bits as num2, and as close as possible to num1 to minimize XOR.
  - Prefer keeping the highest bits of num1 set if possible (preserves value proximity).
  - If num1 has more 1s than needed: keep the highest 1s.
  - If num1 has fewer: keep all its 1s, and set additional 1s in the lowest possible 0 positions.

- **Why this works:**  
  - XOR is minimized when x ≈ num1.
  - The greedy selection—prefer higher bits—is because higher bits impact value more.

- **Trade-offs:**  
  - Time: O(32) from looping bits, no brute force.
  - Space: O(1).  
  Efficient and always correct, as the answer is uniquely determined.

### Corner cases to consider  
- num1 and num2 have the same number of set bits.
- All bits in num1 are 1 or 0.
- num1 is smaller or much larger than num2.
- num1 or num2 is a power of two.
- Large numbers (max int inputs).
- num2 is 1 (single set bit).

### Solution

```python
def minimizeXor(num1: int, num2: int) -> int:
    # Count set bits in num2
    k = 0
    t = num2
    while t:
        k += t & 1
        t >>= 1

    # Greedily pick bits from num1, starting high to low
    x = 0
    # First, set bits in x where num1 has 1s, from most significant down
    for i in range(31, -1, -1):
        if (num1 >> i) & 1:
            x |= (1 << i)
            k -= 1
            if k == 0:
                break

    # If we still need more bits, set unused low bits (lowest 0s)
    if k > 0:
        for i in range(32):
            if not (x >> i) & 1:
                x |= (1 << i)
                k -= 1
                if k == 0:
                    break
    return x
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(32) = O(1).  
  Loop through 32 bits twice at most. All operations per-bit, constant time.
- **Space Complexity:** O(1).  
  Only fixed variables required, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- If you needed to return multiple answers (all x values with minimal XOR), how would you extend this?
  *Hint: Think about uniqueness, and which x values create ties.*

- How would the solution change if you needed to handle 64-bit numbers or arbitrary-size integers?
  *Hint: Generalize the bit loop, but logic remains the same.*

- What if the input was a stream of num1/num2 pairs—how fast can you process each?
  *Hint: This method is already optimal per pair, O(1).*

### Summary
This problem uses a *greedy bit manipulation pattern*. By matching the number of set bits and aligning as much as possible with the higher bits of num1, we minimize the XOR, achieving the closest possible value. This approach is highly efficient and applies to other problems involving set bit manipulation for XOR or AND/OR minimization.


### Flashcard
Greedily copy highest set bits from num1 first, then fill remaining bits from lowest positions to match num2's bit count for minimal XOR.

### Tags
Greedy(#greedy), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Maximum XOR of Two Numbers in an Array(maximum-xor-of-two-numbers-in-an-array) (Medium)
- Maximum XOR With an Element From Array(maximum-xor-with-an-element-from-array) (Hard)