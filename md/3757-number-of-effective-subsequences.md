# Leetcode 3757 (Hard): Number of Effective Subsequences [Practice](https://leetcode.com/problems/number-of-effective-subsequences)

### Description

Given an array `nums` of positive integers, find the number of **effective subsequences**. A subsequence is effective if its bitwise OR is strictly less than a given value `x`. Since the answer can be very large, return it modulo 10⁹ + 7.

In other words, you need to count all non-empty subsequences where the bitwise OR of all elements in the subsequence is strictly less than `x`.

### Examples

**Example 1:**  
Input: `nums = [1, 2, 3], x = 3`  
Output: `3`  
*Explanation: The effective subsequences are [1], [2], and [1,2]. The subsequence [3] has OR = 3 which is not < 3. The subsequence [1,3] has OR = 3 which is not < 3. The subsequence [2,3] has OR = 3 which is not < 3. The subsequence [1,2,3] has OR = 3 which is not < 3.*

**Example 2:**  
Input: `nums = [5, 3, 7], x = 4`  
Output: `0`  
*Explanation: All elements are ≥ 4, so any subsequence has OR ≥ 4. No effective subsequences exist.*

**Example 3:**  
Input: `nums = [1, 1, 1, 1], x = 2`  
Output: `7`  
*Explanation: Any non-empty subsequence of [1, 1, 1, 1] has OR = 1, which is < 2. There are 2⁴ - 1 = 15 total non-empty subsequences, but we need to count only those with OR < 2, which is all 7 subsequences (choosing 1, 2, 3, or 4 ones all give OR = 1).*

### Thought Process (as if you're the interviewee)

**Brute Force Approach:**
Initially, I'd think of generating all 2ⁿ subsequences and checking each one's bitwise OR. This works but is exponential in time complexity and won't pass for large inputs.

**Optimization Insight - Submask Enumeration:**
The key insight is that the bitwise OR of any subsequence must be a **submask** of the OR of the entire array. So instead of checking all 2ⁿ subsequences, I only need to:
1. Find all possible OR values (which are submasks)
2. For each submask, count how many subsequences produce that exact OR
3. Use inclusion-exclusion: count of subsequences with OR = mask = (total subsequences with OR ≤ mask) - (sum of subsequences with OR = all proper submasks)

**Refined Approach - DP on Submasks:**
- First, count elements by their value using a frequency map
- Compute the maximum bit position needed (based on max element or x)
- For each possible OR value (starting from 0 to 2^bits - 1):
  - Count how many subsequences have OR ≤ that value using DP
  - Use inclusion-exclusion to get the count for OR = exactly that value
- Sum all counts where OR < x

**Why This Works:**
Each element can either be included or excluded from a subsequence. The OR operation is monotonic (adding more elements can only increase or maintain the OR). By grouping elements by their value, we can efficiently compute how many ways we can form each possible OR value.

### Corner cases to consider

- Empty input array (no subsequences possible → return 0)
- Single element: if it's < x, return 1; otherwise return 0
- All elements ≥ x: no effective subsequences (return 0)
- x = 1: only subsequences of  are effective, but problem says positive integers
- Large array with repeated elements: grouping by value reduces redundant computation
- Bit length consideration: ensure we iterate through all relevant bit positions
- Overflow: must use modulo 10⁹ + 7 throughout

### Solution

```python
def numberOfEffectiveSubsequences(nums, x):
    MOD = 10**9 + 7
    
    # Edge case: if any element is >= x, we need to be careful
    # Count frequency of each unique value
    freq = {}
    for num in nums:
        freq[num] = freq.get(num, 0) + 1
    
    # Find the maximum bit position we need
    max_val = max(freq.keys())
    max_bits = max_val.bit_length()
    
    # dp[mask] = count of subsequences with OR exactly equal to mask
    dp = [0] * (1 << max_bits)
    
    # For each unique value and its frequency
    for val, count in freq.items():
        # If this value is >= x, it can never be part of an effective subsequence
        if val >= x:
            continue
        
        # Total subsequences we can form using 'count' copies of 'val'
        # is 2^count - 1 (all non-empty subsets)
        total_with_val = pow(2, count, MOD) - 1
        
        # Update dp in reverse to avoid using updated values
        new_dp = dp[:]
        
        for mask in range(1 << max_bits):
            if dp[mask] > 0:
                # Combine existing OR mask with current value
                new_mask = mask | val
                # We can add 1, 2, ..., count copies of val
                new_dp[new_mask] = (
                    new_dp[new_mask] + 
                    dp[mask] * total_with_val
                ) % MOD
        
        # Also count subsequences using only copies of val
        new_dp[val] = (new_dp[val] + total_with_val) % MOD
        
        dp = new_dp
    
    # Sum all effective subsequences (OR < x)
    result = 0
    for mask in range(x):
        result = (result + dp[mask]) % MOD
    
    return result
```

**Alternative Solution using Submask Enumeration (More Optimal):**

```python
def numberOfEffectiveSubsequences(nums, x):
    MOD = 10**9 + 7
    
    # Count frequency of each unique value
    freq = {}
    for num in nums:
        if num < x:  # Only care about values < x
            freq[num] = freq.get(num, 0) + 1
    
    if not freq:
        return 0
    
    # dp[mask] = count of subsequences with OR <= mask
    dp = [0] * (1 << 20)  # Assuming values fit in 20 bits
    
    # For each unique value
    for val, count in freq.items():
        # Subsequences using only this value: 2^count - 1
        ways = pow(2, count, MOD) - 1
        
        # Update dp array
        new_dp = dp[:]
        for mask in range((1 << 20) - 1, -1, -1):
            new_mask = mask | val
            new_dp[new_mask] = (new_dp[new_mask] + dp[mask] * ways) % MOD
        
        new_dp[val] = (new_dp[val] + ways) % MOD
        dp = new_dp
    
    # Count subsequences with OR < x
    result = 0
    for mask in range(x):
        result = (result + dp[mask]) % MOD
    
    return result
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(n + k × 2^b) where n is the length of `nums`, k is the number of unique values, and b is the number of bits in the maximum value. In the worst case where all values are unique and b = 20, this becomes O(n + n × 2^20), which is feasible for reasonable input sizes.

- **Space Complexity:** O(2^b) where b is the number of bits. We maintain a DP array of size 2^b to store counts for all possible OR masks. This is approximately O(2^20) ≈ O(10⁶) space in typical cases.

### Potential follow-up questions (as if you're the interviewer)

- How would you modify the solution if we need to find subsequences with OR **exactly equal to** a target value instead of strictly less than x?  
  *Hint: Use inclusion-exclusion principle on submasks. For a target mask, subtract counts of all proper submasks from the total count with OR ≤ mask.*

- What if the problem also asks for the maximum OR value achievable by any effective subsequence?  
  *Hint: Keep track of the highest set bit position in any subsequence with OR < x, or iterate through DP array to find the largest mask with non-zero count.*

- How would you optimize space if b (bit length) becomes very large?  
  *Hint: Use a dictionary/hash map instead of an array to store only reachable OR masks, reducing space to O(k × 2^m) where m is the actual number of distinct OR values achievable.*

### Summary

This problem leverages **submask enumeration with dynamic programming** to efficiently count subsequences based on their bitwise OR properties. The key insight is recognizing that:
- All possible OR values are submasks of elements in the array
- By grouping elements by their values, we avoid redundant subsequence generation
- Inclusion-exclusion allows us to count exact OR values from cumulative counts

This pattern applies to other problems involving:
- Counting subsets with specific XOR/OR/AND properties
- Problems where element properties combine through bitwise operations
- Optimization where naive enumeration is exponential but structured DP reduces complexity

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Combinatorics(#combinatorics)

### Similar Problems
