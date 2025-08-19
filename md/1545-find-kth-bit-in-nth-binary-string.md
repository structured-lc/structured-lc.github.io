### Leetcode 1545 (Medium): Find Kth Bit in Nth Binary String [Practice](https://leetcode.com/problems/find-kth-bit-in-nth-binary-string)

### Description  
Given two integers **n** and **k**, return the kᵗʰ bit (1- indexed) in the nᵗʰ binary string, where the strings are defined recursively:
- S₁ = "0"
- For i > 1, Sᵢ = Sᵢ₋₁ + "1" + reverse(invert(Sᵢ₋₁))
Here, **reverse** means reverse the string and **invert** means swap '0' and '1'.
Constraints: n ≥ 1, k ≥ 1.

### Examples  

**Example 1:**  
Input: `n = 3, k = 1`  
Output: `"0"`  
*Explanation: S₁ = "0", S₂ = "011", S₃ = "0111001", 1st bit is '0'.*

**Example 2:**  
Input: `n = 4, k = 11`  
Output: `"1"`  
*Explanation: S₄ = "011100110110001", 11th bit is '1'.*

**Example 3:**  
Input: `n = 2, k = 3`  
Output: `"1"`  
*Explanation: S₂ = "011", third bit is '1'.*

### Thought Process (as if you’re the interviewee)  
- Observe the recursive structure: Sᵢ = Sᵢ₋₁ + "1" + reverse(invert(Sᵢ₋₁)).
- The middle of each string is always a '1'.
- If k == mid, return '1'.
- If k < mid, the answer is the same as in Sₙ₋₁.
- If k > mid: figure out the mirrored position in Sₙ₋₁ (since right half is reverse(invert(Sₙ₋₁))). Use recursion:
    - mirrored_index = 2^(n-1) - (k - mid)
    - Recursively find that index in the previous string, then invert.

### Corner cases to consider  
- k = 1 (first index, always comes from leftmost)
- k = last index (rightmost)
- n = 1
- k at the middle
- Very large n (avoid building the string!)

### Solution

```python
# Recursive, O(n) time, O(n) call stack

def findKthBit(n: int, k: int) -> str:
    if n == 1:
        return '0'
    mid = 2 ** (n - 1)
    if k == mid:
        return '1'
    elif k < mid:
        return findKthBit(n - 1, k)
    else:
        mirrored = mid - (k - mid)
        # invert the bit
        return '1' if findKthBit(n - 1, mirrored) == '0' else '0'
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), since each recursion reduces n by 1, max depth n.
- **Space Complexity:** O(n), recursion call stack.

### Potential follow-up questions (as if you’re the interviewer)  
- What is the length of Sₙ in terms of n?
  *Hint: It's 2ⁿ - 1.*
- Can you find the answer without recursion?
  *Hint: Simulate the approach iteratively tracing all the way from n to 1.*
- What if you want the substring from position l to r?
  *Hint: Trace each position individually or find a way to batch the computation.*

### Summary
This is a **recursive divide-and-conquer** problem based on palindromic/self-inverting string construction. The pattern is related to string construction with symmetry and bit flipping; seen in some binary/gray-code or fractal structure problems as well.

### Tags
String(#string), Recursion(#recursion), Simulation(#simulation)

### Similar Problems
