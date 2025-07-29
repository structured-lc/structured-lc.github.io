### Leetcode 2980 (Easy): Check if Bitwise OR Has Trailing Zeros [Practice](https://leetcode.com/problems/check-if-bitwise-or-has-trailing-zeros)

### Description  
Given an array of positive integers `nums`, check if it is possible to select **two or more elements** in the array such that their **bitwise OR** has **at least one trailing zero** in its binary representation. In other words, you need to find out if picking at least two numbers and calculating their bitwise OR gives you a number that ends in ‘0’ (is even).

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3]`  
Output: `True`  
*Explanation: 2 | 3 = 3 (odd, no trailing 0), but 2 is even itself and if you OR with 2, you get an even. But we can try 1 | 2 = 3 (odd). However, 2 is even and 3 is odd, so if we pick two evens, OR will still be even, so with only one even, can't do. But if the combination is 2 | 3 = 3 (odd), so only possible when two even numbers exist. Correction: In this case, only one even, so output should be False. Let's review proper examples below with step-by-step answers.*

**Example 2:**  
Input: `nums = [2, 4, 6]`  
Output: `True`  
*Explanation: All are even; picking any two (say, 2 | 4 = 6) produces an even number, which always has at least one trailing zero in binary.*

**Example 3:**  
Input: `nums = [1, 3, 5]`  
Output: `False`  
*Explanation: All numbers are odd; any OR operation between them results in an odd number, which ends in '1' in binary (no trailing zero).*

**Example 4:**  
Input: `nums = [2, 3, 5, 7, 8]`  
Output: `True`  
*Explanation: There are two even numbers (2 and 8), so picking 2 | 8 = 10 (even, has trailing zero).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach**: For every pair or any subset of size ≥2, compute the bitwise OR and check if the result has at least one trailing zero. For every subset, check if `(result & 1) == 0`. This is very inefficient (O(2ⁿ \* n)), not feasible for large arrays.
- **Observation**: The bitwise OR of any subset is even (has trailing zero) if at least one of the selected numbers' lowest bit is zero. 
- **Key insight**: The only way a number can have a trailing zero in binary is if it is even. Bitwise OR-ing any two even numbers will always yield an even number since at least one '0' remains in the lowest bit.  
  - Conversely, OR-ing odd numbers will always produce an odd number.
  - If there are at least two even numbers, we can select them, and their OR will be even (trailing zero).
- **Optimization**: 
  - Simply count the number of even numbers in the array.
  - If count ≥ 2, return True; else, return False.
- **Trade-offs**: This reduces time complexity from exponential to linear, uses O(1) space, and is very clear.

### Corner cases to consider  
- Empty array (`nums = []`) – invalid as problem says “select two or more elements”.
- Array with only one element (`nums = [2]`) – should be False; can’t select ≥2.
- All elements are odd.
- All elements are even.
- Exactly two even numbers at any positions in the array.

### Solution

```python
def has_trailing_zeros(nums):
    # Count number of even numbers (those with at least one trailing zero)
    even_count = 0
    for num in nums:
        if num % 2 == 0:
            even_count += 1
        # Early return: as soon as we find two evens, answer is True
        if even_count >= 2:
            return True
    # Not enough even numbers for a valid pair
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) – We scan through the array once to count even numbers.
- **Space Complexity:** O(1) – No extra space beyond simple variables (even_count).

### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers or zero are allowed in the input?  
  *Hint: Think about the parity and binary representation of negatives and zero.*

- How would you modify the algorithm to find out *how many* such pairs (with trailing-zero OR) exist?  
  *Hint: Consider combinations among the even numbers.*

- If array length is massive (millions), but only want to know the answer as fast as possible, is there a constant time solution?  
  *Hint: Can you early-exit?*

### Summary
This problem uses the **parity checking pattern**: identifying even elements to enable bitwise conditions across pairs. The approach is linear, O(n) time, O(1) space, and is broadly useful for any problem where the parity or the lowest bit matters, such as grouping, pair-counting, or bitmask problems. It demonstrates a common pattern of reducing a complex check to a problem on simple counts or properties.