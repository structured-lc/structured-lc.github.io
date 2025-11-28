# [Practice](https://leetcode.com/problems/find-maximum-balanced-xor-subarray-length)

### Description

You are given an integer array `nums`. Find and return the length of the longest subarray that satisfies **both** of these conditions:

1. The bitwise XOR of all elements in the subarray equals zero
2. The subarray contains an equal number of even and odd numbers

If no such subarray exists, return 0.

### Examples

**Example 1:**  
Input: `nums = [1, 2, 3, 4, 5]`  
Output: `4`  
Explanation: The subarray `[1, 2, 3, 4]` has XOR = 1 ⊕ 2 ⊕ 3 ⊕ 4 = 4, which is not zero. The subarray `[2, 3, 4, 5]` has XOR = 2 ⊕ 3 ⊕ 4 ⊕ 5 = 0 and contains 2 even numbers (2, 4) and 2 odd numbers (3, 5), so it satisfies both conditions with length 4.

**Example 2:**  
Input: `nums = [3, 1, 3, 2, 0]`  
Output: `4`  
Explanation: The subarray `[3, 1, 3, 2, 0]` has length 5, but we need equal even/odd. The subarray `[1, 3, 2, 0]` has XOR = 1 ⊕ 3 ⊕ 2 ⊕ 0 = 0 and contains 2 odd (1, 3) and 2 even (2, 0) numbers, so the answer is 4.

**Example 3:**  
Input: `nums = `  
Output: `0`  
Explanation: A single element cannot have equal odd and even counts (we need at least 2 elements, one odd and one even). So return 0.

### Thought Process (as if you're the interviewee)

**Brute Force Approach:** 
Check every possible subarray. For each subarray from index i to j, calculate the XOR, count odd and even numbers. If both conditions are satisfied, update the maximum length. This would be O(n³) or O(n²) with optimization.

**Optimization Insight:**
The key observation is that we can use **prefix XOR** and track the balance between odd and even counts. If two positions have the same (prefix_xor, odd_even_balance) pair, then the subarray between them has XOR = 0 and equal odd/even counts.

Here's why: If position i has prefix_xor = X and balance = B, and position j (j > i) also has prefix_xor = X and balance = B, then:
- XOR between i+1 and j = X ⊕ X = 0
- Difference in counts = B − B = 0 (equal odd and even)

We represent balance as: +1 for odd numbers, −1 for even numbers. When balance = 0, we have equal counts.

**Final Approach:**
Use a hashmap to store the first occurrence of each (xor_value, balance_count) pair. As we iterate through the array:
1. Update prefix XOR and balance
2. Create a key from current XOR and balance
3. If we've seen this key before, calculate subarray length
4. Track the maximum length

This reduces complexity to O(n).

### Corner cases to consider

- Empty array or single element → return 0 (cannot have equal odd/even)
- All even or all odd numbers → return 0 (impossible to balance)
- Entire array is balanced → return array length
- Multiple balanced subarrays → find the longest
- Negative numbers → treat based on parity (−3 is odd, −4 is even)
- XOR of all elements is zero but imbalanced counts → return 0
- First element itself creates a valid subarray (prefix at index 0) → compare correctly

### Solution

```python
def maxBalancedXorSubarrayLength(nums):
    # Dictionary to store first occurrence of (xor, balance) pair
    # Key: (prefix_xor, balance), Value: index where it first occurred
    seen = {(0, 0): -1}  # Base case: before any element processed
    
    prefix_xor = 0  # Running XOR value
    balance = 0      # Difference: odd_count - even_count
    max_length = 0
    
    for i in range(len(nums)):
        # Update prefix XOR with current element
        prefix_xor ^= nums[i]
        
        # Update balance: +1 for odd, -1 for even
        if nums[i] % 2 == 1:  # Odd number
            balance += 1
        else:  # Even number
            balance -= 1
        
        # Create state key
        state = (prefix_xor, balance)
        
        # Check if we've seen this state before
        if state in seen:
            # Subarray from (seen[state] + 1) to i is balanced
            # XOR = 0 and odd_count = even_count
            subarray_length = i - seen[state]
            max_length = max(max_length, subarray_length)
        else:
            # First time seeing this state, record its index
            seen[state] = i
    
    return max_length
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(n) where n is the length of the array. We iterate through the array once, and each hashmap operation (insertion, lookup) is O(1) on average.

- **Space Complexity:** O(n) for the hashmap in the worst case. The hashmap stores at most O(n) unique (xor, balance) pairs. In the worst case, every position has a unique state.

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1)  
  What if we need to find all balanced XOR subarrays, not just the longest one?  
  *Hint: Modify the approach to store all indices where each state occurs, not just the first one.*

- (Follow-up question 2)  
  How would you handle the problem if the array contained only positive integers up to 10⁶?  
  *Hint: Consider whether Trie-based XOR optimization or bit manipulation techniques could improve the solution.*

- (Follow-up question 3)  
  What if instead of XOR = 0, we needed XOR = K (some specific target value)?  
  *Hint: Modify the state tracking to compare prefix_xor values differently, perhaps storing target_xor directly.*

### Summary

This problem uses the **Prefix XOR with State Tracking** pattern, a powerful technique for subarray problems with multiple conditions. By combining prefix XOR (to handle XOR condition) and a balance counter (to track even/odd equilibrium), we reduce the problem from O(n²) brute force to O(n) optimal solution using a hashmap.

This pattern is applicable to other subarray problems like finding subarrays with sum = K, maintaining specific element frequencies, or balancing multiple independent conditions. The key insight is: whenever two positions share identical state values, the subarray between them satisfies all state-dependent constraints.


### Flashcard
Use prefix XOR with a hash map to track (prefix_xor, odd_even_balance) pairs; subarrays between matching pairs have equal odd/even counts and non-zero XOR.

### Tags
Array(#array), Hash Table(#hash-table), Bit Manipulation(#bit-manipulation), Prefix Sum(#prefix-sum)

### Similar Problems
