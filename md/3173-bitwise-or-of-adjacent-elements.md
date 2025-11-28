### Leetcode 3173 (Easy): Bitwise OR of Adjacent Elements [Practice](https://leetcode.com/problems/bitwise-or-of-adjacent-elements)

### Description  
Given an array of integers, return a new array where each element contains the result of the bitwise OR operation between every pair of consecutive elements in the input array.  
For example, for each i in 0 ≤ i < n-1, output[i] = nums[i] | nums[i+1].  
The bitwise OR of two numbers sets each bit to 1 if either bit (in the two numbers at that position) is 1.

### Examples  

**Example 1:**  
Input: `nums = [1, 3, 7, 15]`  
Output: `[3, 7, 15]`  
*Explanation:*
- 1 | 3 = 3
- 3 | 7 = 7
- 7 | 15 = 15

**Example 2:**  
Input: `nums = [8, 4, 2]`  
Output: `[12, 6]`  
*Explanation:*
- 8 | 4 = 12
- 4 | 2 = 6

**Example 3:**  
Input: `nums = [5, 4, 9, 11]`  
Output: `[5, 13, 11]`  
*Explanation:*
- 5 | 4 = 5
- 4 | 9 = 13
- 9 | 11 = 11

### Thought Process (as if you’re the interviewee)  
The problem asks us to take the bitwise OR between every adjacent pair of elements in the array and return the resulting array.  
The brute-force approach is straightforward:  
- Iterate through the array from index 0 to n-2.  
- For each index i, compute nums[i] | nums[i+1], and store the result.  
- Return the results as a new array.

This approach has O(n) time complexity since we do a single pass through n-1 elements.  
There are no significant optimizations because:  
- We must process every adjacent pair, so cannot skip elements.  
- There’s no way to use prefix/suffix tricks, as each output only depends on two neighbors.  
- The operation itself (bitwise OR) takes constant time.

The final approach:  
- Single pass, process each adjacent pair and append result.

### Corner cases to consider  
- nums has only two elements: Output length is 1 and contains the OR of those two.
- All elements are zero: Result is always zero.
- All elements are the same: The result repeats the same value.
- Array with increasing or decreasing order.
- Large and small values mixed together.

### Solution

```python
def orArray(nums):
    # Initialize result list with size n-1
    result = []
    # Loop through 0 to n-2
    for i in range(len(nums) - 1):
        # Compute bitwise OR of adjacent elements and append
        result.append(nums[i] | nums[i+1])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums). We iterate once through n-1 pairs.
- **Space Complexity:** O(n), for the output array of size n-1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to compute adjacent bitwise AND or XOR instead?
  *Hint: Think about changing the operator and see if the approach changes.*

- How would you handle the case where the array is very large and you want in-place modification?
  *Hint: Consider if you can overwrite elements, and what you lose or gain by doing so.*

- If you want to support streaming input, how could you produce outputs efficiently?
  *Hint: Think about processing elements as they arrive, keeping only the necessary state.*

### Summary
This problem illustrates the **adjacent pair scanning** pattern, where each element in the output is based on consecutive elements in the input. The loop-and-collect approach is standard for such cases. This coding pattern is common in interval analysis, differences, moving average, or other rolling window computations, especially when relationships are local (between neighboring items).


### Flashcard
Single pass: for each index i from 0 to n-2, compute nums[i] | nums[i+1] and append to result; O(n) time, no further optimization needed.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Neighboring Bitwise XOR(neighboring-bitwise-xor) (Medium)