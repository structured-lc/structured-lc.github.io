### Leetcode 2997 (Medium): Minimum Number of Operations to Make Array XOR Equal to K [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-xor-equal-to-k)

### Description  
Given an integer array, you can perform an operation where you change any bit in any element (i.e., increment or decrement by some power of two) at a time. Your goal is to find the **minimum number of bit operations** needed so that the bitwise XOR of the array equals **k**.

In other words:  
- Compute the XOR of all elements.  
- You can change any bit in any element.  
- Find the minimum bit flips required so that after all flips, the XOR of the array is `k`.

### Examples  

**Example 1:**  
Input: `nums = [2, 1, 3], k = 1`  
Output: `2`  
*Explanation: The initial XOR is 2 ⊕ 1 ⊕ 3 = 0. To make the XOR equal to 1, we need 1 bit flip (since 0 ⊕ 1 = 1). However, to achieve this, we need to flip two bits (minimal changes on array elements), e.g., flip the least significant bit of two different numbers.*

**Example 2:**  
Input: `nums = [5, 7, 7], k = 5`  
Output: `0`  
*Explanation: 5 ⊕ 7 ⊕ 7 = 5, which is already k. So no operations are needed.*

**Example 3:**  
Input: `nums = [1, 2, 4], k = 7`  
Output: `2`  
*Explanation: XOR is 1 ⊕ 2 ⊕ 4 = 7. Already equal to k, so 0 flips. If k was something else (say, 5), you'd need to flip two bits of the XOR result.*


### Thought Process (as if you’re the interviewee)  
First, calculate the **XOR** of the entire array (`xor_value`). Our goal is to make this value equal to k.

At each operation, you can flip any bit in any array element, which is equivalent to flipping that bit in the total XOR as well. So to reach from `xor_value` to `k`, you need to flip all bits that differ between `xor_value` and `k`.

Instead of brute force (checking all combinations and flips), observe that:
- The **minimum number of operations** is simply the count of differing bits in `xor_value` and `k` (i.e., Hamming distance).
- For every 1 in the XOR of `xor_value` ⊕ k, you need a flip.

This makes the problem:
- Compute `current_xor = nums ⊕ nums[1] ⊕ ... ⊕ nums[n-1]`
- Compute `needed_mask = current_xor ⊕ k`
- Count the number of set bits in `needed_mask` — that's your answer.

This approach is linear in the size of the array and constant in the number of bits.

### Corner cases to consider  
- Empty array (should not happen per problem constraints, but if it does, XOR is 0)
- k is 0 (should work: flips are number of 1s in current XOR)
- All array elements are the same
- Arrays with all zeros
- XOR already equals k (answer should be 0)
- Large numbers (should still work, as bit operations are fast)

### Solution

```python
def min_operations(nums, k):
    # Step 1: Calculate current XOR of all elements
    current_xor = 0
    for num in nums:
        current_xor ^= num
    
    # Step 2: Determine which bits differ between current_xor and k
    mask = current_xor ^ k

    # Step 3: Count the number of set bits (bits that are 1) in mask
    # Each differing bit needs one operation to flip
    count = 0
    while mask:
        count += mask & 1           # Add 1 if least significant bit is set
        mask >>= 1                  # Shift right to examine the next bit
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + b), where n is the length of nums, and b is the number of bits in an integer (usually a small constant, 32 or 64). The primary work is one pass through the array and then through the bits of the XOR.
- **Space Complexity:** O(1) extra space. Only a few variables for XOR and counting bits.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is very large and you cannot store it in memory?
  *Hint: Can you compute the XOR incrementally as you stream the data?*

- What if you could only flip whole elements (increment/decrement by 1 each time), not arbitrary bits?
  *Hint: Would this change the nature of the minimal step calculation? Why or why not?*

- Can you solve this if you can only perform a fixed number of operations?
  *Hint: What if the minimum flips needed are more than the allowed number?*

### Summary
This problem uses the **bit manipulation** or **Hamming distance** pattern — compare two bit patterns and count positions that differ.  
It’s a classic interview technique for XOR transformations and minimal modification problems, and it appears in tasks involving parity, mismatched bits, or fault-tolerant designs.  
Recognizing that any differing bit between the array's XOR and k must be flipped—and each flip can happen anywhere in the array—is key to the optimal solution.


### Flashcard
Compute xor_all = XOR of all array elements. The minimum operations equals the number of differing bits between xor_all and k, calculated as popcount(xor_all XOR k) or bin(xor_all XOR k).count('1').

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Minimum Bit Flips to Convert Number(minimum-bit-flips-to-convert-number) (Easy)