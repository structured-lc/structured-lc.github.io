### Leetcode 446 (Hard): Arithmetic Slices II - Subsequence [Practice](https://leetcode.com/problems/arithmetic-slices-ii-subsequence)

### Description  
Given an integer array nums, return the number of all the arithmetic subsequences of nums.

A sequence of numbers is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.

- For example, [1, 3, 5, 7, 9], [7, 7, 7, 7], and [3, -1, -5, -9] are arithmetic sequences.
- For example, [1, 1, 2, 5, 7] is not an arithmetic sequence.

A subsequence of an array is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.

- For example, [2, 5, 10] is a subsequence of [1, 2, 1, 2, 4, 1, 5, 10].

### Examples  

**Example 1:**  
Input: `nums = [2,4,6,8,10]`  
Output: `7`  
*Explanation: All arithmetic subsequence slices are: [2,4,6], [4,6,8], [6,8,10], [2,4,6,8], [4,6,8,10], [2,4,6,8,10], [2,6,10].*

**Example 2:**  
Input: `nums = [7,7,7,7,7]`  
Output: `16`  
*Explanation: Any subsequence of this array is arithmetic.*

### Thought Process (as if you're the interviewee)  
This problem asks us to count arithmetic subsequences (not subarrays) with at least 3 elements. Key insights:

1. **Subsequence vs subarray**: Elements don't need to be contiguous, making this harder than the arithmetic slice problems
2. **At least 3 elements**: We need sequences with 3+ elements 
3. **Count, don't enumerate**: We only need the count, not the actual subsequences

**Approach considerations:**
1. **Brute force**: Generate all 2^n subsequences and check if arithmetic - too slow
2. **DP with difference tracking**: For each position i, track how many arithmetic subsequences end at i for each possible common difference

**Key insight**: If we have an arithmetic subsequence ending at position j with difference d, we can extend it by adding any element at position i > j where nums[i] - nums[j] = d.

**DP State**: dp[i][d] = number of arithmetic subsequences ending at index i with common difference d. This includes subsequences of length ≥ 2 (we'll filter for length ≥ 3 when counting).

### Corner cases to consider  
- Array with less than 3 elements
- All elements are the same
- No arithmetic subsequences exist
- Large differences that might cause overflow
- Array with duplicate values
- Negative differences

### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def numberOfArithmeticSlices(nums):
    n = len(nums)
    if n < 3:
        return 0
    
    # dp[i] is a dictionary where dp[i][diff] represents the number of 
    # arithmetic subsequences ending at index i with common difference diff
    dp = [{} for _ in range(n)]
    result = 0
    
    for i in range(1, n):
        for j in range(i):
            # Calculate difference between nums[i] and nums[j]
            diff = nums[i] - nums[j]
            
            # Count of subsequences ending at j with difference diff
            # This represents subsequences of length >= 2
            count_at_j = dp[j].get(diff, 0)
            
            # Update dp[i][diff]
            # Add 1 for the new 2-element subsequence [nums[j], nums[i]]
            dp[i][diff] = dp[i].get(diff, 0) + count_at_j + 1
            
            # Add to result the subsequences of length >= 3
            # These are the subsequences that were ending at j and now extended to i
            result += count_at_j
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) where n is the length of the array. We have nested loops over all pairs of indices (i,j), and for each pair we do constant time hashmap operations.
- **Space Complexity:** O(n²) in the worst case. Each of the n positions can have up to O(n) different common differences stored in its hashmap (when all elements are distinct). In practice, this is often much less.

### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this to return the actual arithmetic subsequences instead of just counting them?  
  *Hint: Store the actual subsequences in the DP state instead of just counts.*

- What if you needed to find the longest arithmetic subsequence?  
  *Hint: Modify the DP to track maximum length instead of count for each difference.*

- How would you handle potential integer overflow for very large differences?  
  *Hint: Use appropriate data types or implement modular arithmetic if the problem asks for result modulo some number.*

- Can you optimize space usage for cases where the array has a limited range of values?  
  *Hint: Use arrays instead of hashmaps when the range of differences is bounded and small.*

### Summary
This problem demonstrates dynamic programming with hash tables for counting combinatorial structures. The key insight is to track arithmetic subsequences by their ending position and common difference, building longer sequences by extending shorter ones. The pattern of using DP with difference/ratio tracking appears in many sequence problems (arithmetic/geometric progressions, longest increasing subsequences with constraints, etc.). The technique of separating the counting of partial sequences (length ≥ 2) from valid answers (length ≥ 3) is a common optimization in combinatorial DP problems.
