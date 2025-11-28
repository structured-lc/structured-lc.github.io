### Leetcode 3747 (Medium): Count Distinct Integers After Removing Zeros [Practice](https://leetcode.com/problems/count-distinct-integers-after-removing-zeros)

### Description  
Given a positive integer n, for every integer x from 1 to n, we remove all zeros from the decimal representation of x. We need to count how many distinct integers we get after this operation. For example, removing zeros from 10 gives 1, from 102 gives 12, and from 5 gives 5. The challenge is that multiple numbers can become the same after removing zeros (like 10 → 1, which was already counted), so we need to count only the distinct results.

### Examples  

**Example 1:**  
Input: `n = 10`  
Output: `9`  
*Explanation: Numbers 1-9 have no zeros, so they all remain distinct: {1, 2, 3, 4, 5, 6, 7, 8, 9}. Number 10 becomes 1 after removing the zero, which is already in our set. Total distinct = 9.*

**Example 2:**  
Input: `n = 3`  
Output: `3`  
*Explanation: Numbers 1, 2, 3 have no zeros, so they remain as {1, 2, 3}. Total distinct = 3.*

**Example 3:**  
Input: `n = 102`  
Output: `11`  
*Explanation: Numbers 1-9 are distinct {1, 2, 3, 4, 5, 6, 7, 8, 9}. Then 10→1 (duplicate), 11→11 (new), 12→12 (new), ..., 20→2 (duplicate), ..., 100→1 (duplicate), 101→11 (duplicate), 102→12 (duplicate). Final count = {1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12}.*


### Thought Process (as if you're the interviewee)  

**Brute Force:** Generate all numbers from 1 to n, remove zeros from each, and store in a set. Return the size of the set. This works but is inefficient for large n.

**Optimized Approach - Digit DP:** Since n can be up to 10¹⁵, brute force won't work. We use digit dynamic programming to count numbers with no zeros that are ≤ n. Key insight: Any number without zeros in its decimal representation will be unique after the removal operation. So we just need to count how many such numbers exist from 1 to n.

We process n digit-by-digit from left to right, tracking:
- Current position in the number
- Whether we're still bounded by n's digits (tight constraint)
- Whether we're still in leading zeros (is_zero state)

For each position, we try all possible digits (avoiding leading zeros and zeros in general) and count valid combinations. When we encounter a 0 in n's digits, we can't use it and must go to smaller numbers. When we can use smaller digits, we have flexibility with remaining positions (each can be 1-9, giving 9 choices per position).

The formula combines: all numbers with fewer digits than n + valid numbers with same length as n but ≤ n.


### Corner cases to consider  
- n = 1: Should return 1 (just the number 1)
- n = 10: The transition where a number becomes a duplicate after removing zeros
- Numbers with multiple consecutive zeros like 1001, 1000
- Single-digit numbers (1-9): All are distinct with no zeros
- Powers of 10 (10, 100, 1000, etc.): All map to 1
- Very large n (up to 10¹⁵): Must use digit DP to avoid timeout


### Solution

```python
def countDistinctIntegers(n: int) -> int:
    s = str(n)
    length = len(s)
    memo = {}
    
    def dp(pos, is_tight, is_zero):
        # pos: current position in digit string
        # is_tight: are we still bounded by n?
        # is_zero: are we still in leading zeros?
        
        if pos == length:
            # We've processed all digits
            # Return 1 only if we formed a valid number (not all zeros)
            return 1 if not is_zero else 0
        
        if (pos, is_tight, is_zero) in memo:
            return memo[(pos, is_tight, is_zero)]
        
        # Determine the upper bound for current digit
        limit = int(s[pos]) if is_tight else 9
        result = 0
        
        for digit in range(0, limit + 1):
            # Skip zeros - we don't want zeros in our numbers
            if digit == 0:
                # If still in leading zeros, stay in leading zero state
                if is_zero:
                    result += dp(pos + 1, False, True)
                # Otherwise skip this digit (can't add zeros mid-number)
            else:
                # Non-zero digit found, exit leading zero state
                new_is_tight = is_tight and (digit == limit)
                result += dp(pos + 1, new_is_tight, False)
        
        memo[(pos, is_tight, is_zero)] = result
        return result
    
    return dp(0, True, True)
```

### Time and Space Complexity Analysis  

- **Time Complexity:** O(length × 2 × 2 × 10) = O(length) where length is the number of digits in n. We have at most length positions, 2 states for is_tight, 2 states for is_zero, and 10 possible digits. With memoization, each state is computed once. Since length ≤ 16 (for 10¹⁵), this is effectively O(1).

- **Space Complexity:** O(length) for the memoization dictionary storing at most length × 2 × 2 = 4×length states. The recursion depth is also O(length) in the call stack. Overall O(length) ≈ O(1) given the constraint.


### Potential follow-up questions (as if you're the interviewer)  

- (Follow-up question 1)  
  *What if we need to count numbers where we remove all occurrences of a specific digit d (not just 0) instead of zeros?*  
  *Hint: Generalize the digit DP to skip any specified digit; the core logic remains the same.*

- (Follow-up question 2)  
  *How would you handle the problem if numbers can become duplicates not just by zero removal, but by digit rearrangement?*  
  *Hint: You'd need to track the canonical form of each number or use a different counting mechanism; digit DP alone won't suffice.*

- (Follow-up question 3)  
  *What if we need to count distinct integers where we remove zeros AND the resulting numbers must be in a specific range [L, R]?*  
  *Hint: Compute count(R) - count(L-1) using the digit DP approach; a common technique for range queries.*

### Summary
This problem uses **digit dynamic programming** to efficiently count numbers without zeros up to n. The key insight is recognizing that any number without zeros is inherently distinct after zero removal, so we only count such numbers. By processing digits from left to right while maintaining the tight constraint (whether we're still bounded by n), we avoid generating all numbers and instead compute the count mathematically. This pattern applies to many "count numbers in range with property X" problems like counting lucky numbers, numbers with specific digit properties, etc. Digit DP is essential for constraints up to 10¹⁵ where brute force becomes infeasible.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
