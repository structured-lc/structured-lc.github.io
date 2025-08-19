### Leetcode 3309 (Medium): Maximum Possible Number by Binary Concatenation [Practice](https://leetcode.com/problems/maximum-possible-number-by-binary-concatenation)

### Description  
Given an array `nums` of size 3, return the **maximum possible number** that can be formed by **concatenating the binary representations** of all elements in `nums` in some order. The binary representation for any number has no leading zeros. Consider all permutations of the array, concatenate each permutation’s binaries, and return the largest resulting decimal value.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3]`  
Output: `30`  
*Explanation:  
- Possible orders:  
  - [1,2,3]: '1' + '10' + '11' = '11011' → 27  
  - [1,3,2]: '1' + '11' + '10' = '11110' → 30  
  - [2,1,3]: '10' + '1' + '11' = '10111' → 23  
  - [2,3,1]: '10' + '11' + '1' = '10111' → 23  
  - [3,1,2]: '11' + '1' + '10' = '11110' → 30  
  - [3,2,1]: '11' + '10' + '1' = '11101' → 29  
- Maximum is 30.*  

**Example 2:**  
Input: `nums = [2, 8, 16]`  
Output: `1296`  
*Explanation:  
- [2,8,16]: '10'+'1000'+'10000' = '10100010000' → 1296  
- Try all permutations, but this produces the maximum.*  

**Example 3:**  
Input: `nums = [7, 15, 4]`  
Output: `4092`  
*Explanation:  
- [15,7,4]: '1111' + '111' + '100' = '1111111100' → 1020  
- [15,4,7]: '1111' + '100' + '111' = '1111100111' → 999  
- [7,15,4]: '111' + '1111' + '100' = '1111111100' → 1020  
- [7,4,15]: ...  
- [4,7,15]: ...  
- [4,15,7]: ...  
- Try all orders (details omitted for brevity), maximum is 4092.*  


### Thought Process (as if you’re the interviewee)  
Since `nums` always has exactly 3 elements, the brute-force approach is acceptable:  
- Try all 3! = 6 permutations of the array.  
- For each permutation, convert each integer to binary as a string (no ‘0b’ prefix, no leading zeros), concatenate these strings, and convert the result back to decimal.  
- Track the maximum decimal value across all permutations.  

This brute-force approach is fine here due to the small fixed size (3 elements). For larger arrays, an efficient comparison order (similar to largest number formation problems) would be needed, but that's not necessary here.

### Corner cases to consider  
- All elements are the same (e.g., [5,5,5]).  
- All elements are at the lower bound (e.g., [1,1,1]).  
- All elements are at the upper bound (e.g., [127,127,127]).  
- Mixed odd and even numbers.  
- Binary strings of drastically different lengths (e.g., [1, 2, 127]).

### Solution

```python
from itertools import permutations

def maximum_binary_concatenation(nums):
    max_num = 0
    
    # Try all 6 possible permutations
    for ordering in permutations(nums):
        # Convert each number to binary string (without '0b' and no leading zeros)
        binaries = [bin(x)[2:] for x in ordering]
        
        # Concatenate the binary strings
        concat_bin = ''.join(binaries)
        
        # Convert the concatenated binary back to decimal
        val = int(concat_bin, 2)
        
        # Track the maximum
        if val > max_num:
            max_num = val
    
    return max_num
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1).  
  The input is always size 3, so permutations is 6; each time, we concatenate and convert a string of at most 21 bits (since 3 × 7-bit numbers). All operations are constant time due to fixed size.
- **Space Complexity:** O(1).  
  Only a constant number of variables and short strings are used. No auxiliary data structures grow with input.


### Potential follow-up questions (as if you’re the interviewer)  

- What if `nums` could be length N, not always 3?  
  *Hint: Can you generalize using a greedy rule, similar to forming the largest number from integer arrays (lexicographical or custom comparator)?*

- How would you compute the maximum number if you are not allowed to use string conversions?  
  *Hint: Manipulate bits directly; shift bits left by the correct number of places to append binaries.*

- Can you output the actual order (permutation) that yields the maximum, not just the max value?  
  *Hint: Track and return the permutation along with the value; store both when found.*

### Summary
This problem is a direct application of **brute-force search plus string manipulation**, justified by the fixed small size of input. It uses binary conversion and string concatenation. The core idea relates to the common "form the largest number" problems, often solved with custom orderings or greedy methods for larger sizes. Similar techniques apply to any “join representations in some order to maximize/minimize value” problems.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Enumeration(#enumeration)

### Similar Problems
- Concatenation of Consecutive Binary Numbers(concatenation-of-consecutive-binary-numbers) (Medium)