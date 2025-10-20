### Leetcode 2527 (Medium): Find Xor-Beauty of Array [Practice](https://leetcode.com/problems/find-xor-beauty-of-array)

### Description  
You are given a 0-indexed integer array `nums`. The **xor-beauty** of this array is defined by:
- For every triplet of indices (i, j, k) where 0 ≤ i, j, k < n, calculate the **effective value**: ((nums[i] | nums[j]) & nums[k])
- Take the XOR of all these effective values across all possible (i, j, k) triplets
Return the single integer value: the xor-beauty of the array.

### Examples  

**Example 1:**  
Input: `nums = [1, 4]`  
Output: `5`  
*Explanation:  
All triplets and their effective values:
- (0,0,0): (1|1)&1 = 1&1 = 1
- (0,0,1): (1|1)&4 = 1&4 = 0
- (0,1,0): (1|4)&1 = 5&1 = 1
- (0,1,1): (1|4)&4 = 5&4 = 4
- (1,0,0): (4|1)&1 = 5&1 = 1
- (1,0,1): (4|1)&4 = 5&4 = 4
- (1,1,0): (4|4)&1 = 4&1 = 0
- (1,1,1): (4|4)&4 = 4&4 = 4
XOR of all effective values: 1 ⊕ 0 ⊕ 1 ⊕ 4 ⊕ 1 ⊕ 4 ⊕ 0 ⊕ 4 = 5*

**Example 2:**  
Input: `nums = [15, 45, 28]`  
Output: `15`  
*Explanation:  
Despite 27 possible triplets, the answer is just 15. See below for reasoning.*

**Example 3:**  
Input: `nums = [0,0,0]`  
Output: `0`  
*Explanation:  
All elements being zero, every effective value = 0. XOR of 0's = 0.*

### Thought Process (as if you’re the interviewee)  
First, let's break down the computation:
- For every triple (i, j, k), calculate ((nums[i] | nums[j]) & nums[k]), then XOR all of these together.
Brute-force would try all n³ triplets (for n=1000 this is infeasible).
Let’s look for patterns or properties:
- Each nums[k] is ANDed with every OR result of nums[i] and nums[j].
- For any fixed nums[k], ((nums[i]|nums[j]) & nums[k]) evaluates to nums[k] if the corresponding bit in (nums[i]|nums[j]) is set, else 0.

But from solutions and discussion, there is a big simplification: Observing the problem, the XOR of all ((nums[i] | nums[j]) & nums[k]) over all i, j, k is the same as the XOR of every element in `nums` itself!

This is a result of symmetry — every bit of every number appears an odd/even number of times in the final computation, and only the 'lonely' (odd-parity) terms survive when XORing.

So, the answer is simply the XOR of all elements in nums.

This gives us O(n) time and O(1) space.

### Corner cases to consider  
- Empty array (not allowed by constraints, but good to check in code)
- Single element: Answer should be the element itself
- All elements identical
- All elements zero
- Large numbers, mix of bit patterns

### Solution

```python
def xorBeauty(nums):
    # Initialize result
    result = 0
    
    # XOR all elements in the array
    for num in nums:
        result ^= num
    return result

# Example usage:
# xorBeauty([1,4]) -> 5
# xorBeauty([15,45,28]) -> 15
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we need to scan each number once to compute the XOR.
- **Space Complexity:** O(1) extra space (excluding input). Just one integer for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is so large it doesn't fit into memory?  
  *Hint: Process in a streaming fashion — XORs are associative and can be done in chunks.*

- What if we need to support both queries and updates to the array, where updates dynamically change array elements?  
  *Hint: Use a prefix XOR tree/segment tree structure for efficient updates and queries.*

- Can you generalize this for different bitwise operations, e.g., replacing `|` or `&` in the definition?  
  *Hint: Try small cases to check the properties of the bit operations. The symmetry pattern may not hold for all combinations.*

### Summary
This problem is an excellent example of exploiting symmetry and bitwise operation properties to simplify complex brute-force formulas. The "accumulate everything with XOR" pattern is common in bitwise trick questions (parity, unique numbers, etc.), and the approach generalizes to many LeetCode and interview problems involving pairwise or triplet combinations with XOR. Recognizing such reductions turns a seemingly hard O(n³) problem into a simple and efficient scan!


### Flashcard
For each bit position, the XOR-beauty is 1 if the count of nums[k] with that bit set is odd and at least one nums[i]|nums[j] has that bit set; else 0.

### Tags
Array(#array), Math(#math), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Decode XORed Permutation(decode-xored-permutation) (Medium)