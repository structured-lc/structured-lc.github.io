### Leetcode 2425 (Medium): Bitwise XOR of All Pairings [Practice](https://leetcode.com/problems/bitwise-xor-of-all-pairings)

### Description  
Given two arrays of non-negative integers, **nums1** and **nums2**, compute the bitwise XOR of every possible pairing between one element from nums1 and one from nums2, and then return the cumulative XOR of all those pairwise results. You do **not** need to generate or store the intermediate results—compute the final answer directly and efficiently.

### Examples  

**Example 1:**  
Input: `nums1 = [2,1,3]`, `nums2 = [10,2,5,0]`  
Output: `13`  
*Explanation: All possible pairs are:  
2⊕10, 2⊕2, 2⊕5, 2⊕0,   
1⊕10, 1⊕2, 1⊕5, 1⊕0,  
3⊕10, 3⊕2, 3⊕5, 3⊕0.  
XORing all these gives: (2⊕10)⊕(2⊕2)⊕...⊕(3⊕0) = 13*

**Example 2:**  
Input: `nums1 = [1,2]`, `nums2 = [3,4]`  
Output: `0`  
*Explanation: Possible XORs: 1⊕3, 1⊕4, 2⊕3, 2⊕4.  
(1⊕3)⊕(1⊕4)⊕(2⊕3)⊕(2⊕4) = 2⊕5⊕1⊕6 = 2⊕5=7; 7⊕1=6; 6⊕6=0.*

**Example 3:**  
Input: `nums1 = `, `nums2 = `  
Output: `0`  
*Explanation: The only pair is 0⊕0=0. So answer is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Compute every possible pairing of elements with two nested loops, XOR each pair, and cumulatively XOR all results. But if both arrays are size up to 10⁵, that’s O(m×n) pairs—too slow.

- **Observing properties of XOR:**  
  - XOR is commutative and associative.  
  - Repeated XOR cancels: x⊕x=0, x⊕0=x.

- **Optimal Idea:**  
  - Each element in nums1 is XORed with every element of nums2.
  - So, for element a in nums1, it contributes:  
    (a⊕b₀)⊕(a⊕b₁)...⊕(a⊕bₙ₋₁) ⟹ a is XORed with all of nums2.
  - (a⊕b₀)⊕(a⊕b₁)... = a repeated n times ⊕ (b₀⊕b₁...bₙ₋₁) repeated m times.
  - If nums2 has even length, then a repeated even number of times cancels out (a⊕a=0). Only if nums2 has odd length do the elements in nums1 actually "remain."
  - **Conclusion:**  
    - If len(nums2) is odd, all elements of nums1 contribute, XORed together.
    - If len(nums1) is odd, all elements of nums2 contribute, XORed together.
    - The answer is (if len(nums2) is odd, xor all nums1) XOR (if len(nums1) is odd, xor all nums2).

### Corner cases to consider  
- Either array is empty: answer is 0.
- Arrays of length 1.
- Arrays with duplicate elements.
- Arrays with all elements 0.
- Both arrays with even length: answer is 0.

### Solution

```python
def xorAllNums(nums1, nums2):
    xor1 = 0
    xor2 = 0
    # XOR of all elements in nums1
    for a in nums1:
        xor1 ^= a
    # XOR of all elements in nums2
    for b in nums2:
        xor2 ^= b

    # If len(nums2) is odd, nums1’s xor will appear odd number of times
    # If len(nums1) is odd, nums2’s xor will appear odd number of times
    res = 0
    if len(nums2) % 2 == 1:
        res ^= xor1
    if len(nums1) % 2 == 1:
        res ^= xor2
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n), where m = len(nums1), n = len(nums2), since we do a single pass through both arrays to compute their XORs.
- **Space Complexity:** O(1), just a few variables used for XOR computations.

### Potential follow-up questions (as if you’re the interviewer)  

- What happens if the arrays are allowed to contain negative numbers?  
  *Hint: What changes for bitwise operations with signed integers?*

- Can you explain the mathematical intuition for why only the odd-length array’s xor contributes?  
  *Hint: Use algebraic expansion of XOR properties—what cancels out when repeated even times?*

- How would you generalize the solution if you had k arrays to pairwise XOR and accumulate?  
  *Hint: Look for patterns in parity and how many times each element appears across all pairings.*

### Summary
This problem leverages the **XOR’s parity cancellation property** to reduce a brute-force pairing problem to a linear scan with a bitwise trick. The pattern is common in bit-manipulation or “XOR across pairs” style questions, and is useful anytime you’re asked to summarize the result of all pairwise operations efficiently without explicit enumeration. Key insight is spotting where parity (odd/even count) affects whether contributions survive.


### Flashcard
If nums2 has odd length, XOR all of nums1; if nums1 has odd length, XOR all of nums2. Combine both results since each element appears length × times and pairs cancel out.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Brainteaser(#brainteaser)

### Similar Problems
