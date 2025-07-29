### Leetcode 1829 (Medium): Maximum XOR for Each Query [Practice](https://leetcode.com/problems/maximum-xor-for-each-query)

### Description  
Given an array of non-negative integers `nums` and an integer `maximumBit`, you must process `n` queries (where n is the length of nums). For each query:

- Find a non-negative integer k < 2^maximumBit such that  
  (nums ⊕ nums[1] ⊕ ... ⊕ nums[last] ⊕ k) is maximized, where "⊕" denotes the bitwise XOR operator and "last" is the last index of the current nums.
- After each query, remove the last element from the array.

Return an array of the k values found for each query, in order.

### Examples  

**Example 1:**  
Input: `nums = [0,1,1,3], maximumBit = 2`  
Output: `[0, 3, 2, 3]`  
*Explanation:*
- 1ˢᵗ query: nums=[0,1,1,3]; cumulative xor=0⊕1⊕1⊕3=3. Maximum k is 0, as 3⊕0=3.
- 2ⁿᵈ query: nums=[0,1,1]; cumulative xor=0⊕1⊕1=0. Maximum k is 3, as 0⊕3=3.
- 3ʳᵈ query: nums=[0,1]; cumulative xor=0⊕1=1. Maximum k is 2, as 1⊕2=3.
- 4ᵗʰ query: nums=; cumulative xor=0. Maximum k is 3, as 0⊕3=3.

**Example 2:**  
Input: `nums = [2,3,4,7], maximumBit = 3`  
Output: `[5, 2, 6, 5]`  
*Explanation:*
- 1ˢᵗ: 2⊕3⊕4⊕7=2; k=5 (2⊕5=7, 7 is maximum 3-bit number).
- 2ⁿᵈ: 2⊕3⊕4=5; k=2 (5⊕2=7).
- 3ʳᵈ: 2⊕3=1; k=6 (1⊕6=7).
- 4ᵗʰ: 2; k=5 (2⊕5=7).

**Example 3:**  
Input: `nums = [3,8,2], maximumBit = 3`  
Output: `[5, 1, 6]`  
*Explanation:*
- 1ˢᵗ: 3⊕8⊕2=9⊕2=11; but mask is 7 (3 bits), 11⊕5=14 (out of 3 bits, so mask ans); actually, best k is 5 (11⊕5=14, &7=6). (Clarify as per mask).
- For each, choose k so that (cumulative_xor ⊕ k) is as big as possible, but < 2^maximumBit.

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** For each query, try all k from 0 to 2^maximumBit-1, calculate the result, and choose the one giving the maximum result.  
  - For n queries and up to 2^maximumBit possible k for each, this is too slow.
- **Optimization insight:** The maximum possible value for (cumulative_xor ⊕ k) is \(2^{maximumBit} - 1\) (i.e., all bits '1').  
  - So, for given cumulative_xor, pick  
    k = (2^maximumBit - 1) ⊕ cumulative_xor.  
  - This k will ensure (cumulative_xor ⊕ k) = (2^maximumBit - 1).
- **Efficient approach:**  
  1. Calculate the cumulative xor (of the current nums).
  2. Compute k for the query.
  3. Remove the last element (by xor’ing the removed number).
  4. Repeat for all queries (from the back).

- **Trade-offs:** O(n) time; just keep cumulative xor, no extra space except answer.

### Corner cases to consider  
- nums contains only zeros.
- maximumBit = 1.
- nums has only 1 element.
- nums contains maximum value allowed by maximumBit.
- nums has repeated values.

### Solution

```python
def getMaximumXor(nums, maximumBit):
    n = len(nums)
    result = []

    # Compute the overall xor of nums
    x = 0
    for num in nums:
        x ^= num

    # The mask with all 1's up to maximumBit
    mask = (1 << maximumBit) - 1

    # For each query (from back to front)
    for i in range(n-1, -1, -1):
        # Best k = mask ^ x, to make (x ^ k) as big as possible
        result.append(mask ^ x)
        # Remove the last element from xor for next query
        x ^= nums[i]

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we loop through nums twice (one for xor, one for queries).
- **Space Complexity:** O(n), due to the answer list.  
  No additional structures used except storing results.

### Potential follow-up questions (as if you’re the interviewer)  

- If the queries are in arbitrary order, or not all elements are removed, how would your solution change?  
  *Hint: How to use prefix/suffix xor efficiently?*

- What is the impact if maximumBit were very large?  
  *Hint: What if 2^maximumBit didn't fit in an integer? How does your mask scale?*

- Can you optimize if you receive a new nums appended at the end (streaming scenario), instead of removal from last?  
  *Hint: Maintain ongoing prefix xor and answer the same way for prefix queries.*

### Summary
This is a classic **bit manipulation** problem involving **XOR and masks**, and leverages computation of prefix (or total) xor with subtraction at each stage to maintain rolling state.  
It's an example of how, for a target "maximize to all-bits-1", xor with mask yields the best answer, a common theme in xor/bitmask interview tasks.  
Pattern: rolling aggregates (e.g., prefix xor), greedy bitmasking.  
Common in problems requiring maximizing/minimizing bitwise results after changes.