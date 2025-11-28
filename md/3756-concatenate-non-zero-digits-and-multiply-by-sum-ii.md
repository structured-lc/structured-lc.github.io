# Leetcode 3756 (Medium): Concatenate Non-Zero Digits and Multiply by Sum II [Practice](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii)

## Description

You are given a string `num` and an array of queries where each query specifies a range [left, right]. For each query, you must:

1. Extract all non-zero digits from the substring `num[left:right+1]` in their original order to form an integer `x` (by concatenation)
2. Calculate the sum of all digits in `x`
3. Return `x × sum mod (10⁹ + 7)`

If there are no non-zero digits in the range, then `x = 0` and the result is 0.

The challenge is to answer multiple queries efficiently without recalculating for each query independently.

## Examples

**Example 1:**  
Input: `num = "123034", queries = [[0,2],[1,2],[0,5]]`  
Output: `[1332, 36, 12340]`  
*Explanation: Query [0,2]: substring "120" → x = 12, sum = 3, result = 36. Query [1,2]: substring "23" → x = 23, sum = 5, result = 115. Query [0,5]: substring "123034" → x = 1234, sum = 10, result = 12340.*

**Example 2:**  
Input: `num = "100000", queries = [[0,0],[1,1]]`  
Output: `[0, 0]`  
*Explanation: All digits are zero, so x = 0 and result = 0 for all queries.*

**Example 3:**  
Input: `num = "15", queries = [[0,0],[0,1]]`  
Output: `[1, 30]`  
*Explanation: Query [0,0]: substring "1" → x = 1, sum = 1, result = 1. Query [0,1]: substring "15" → x = 15, sum = 6, result = 90.*

## Thought Process (as if you're the interviewee)

**Brute Force Approach:**  
For each query, iterate through the range [left, right], collect non-zero digits, build the number, compute the sum, and multiply. Time complexity: O(queries × length) which is too slow.

**Optimization Insight:**  
Notice that zeros don't contribute to the final number or sum. We can use prefix arrays to precompute:
- Sum of all digits from 0 to i (for quick range sum queries)
- The number formed by non-zero digits (this is trickier since we need to account for positional value)
- Count of non-zero digits in each range

**Key Realization:**  
If we have the concatenated number up to position i and want to append a non-zero digit d, the new number = old_number × 10 + d. We can precompute prefix values storing these numbers modulo 10⁹ + 7.

For a range [left, right]:
- Extract the prefix value at right: the concatenated non-zero digits from 0 to right
- Extract the prefix value at left-1: the concatenated non-zero digits from 0 to left-1
- Shift the left-1 prefix out by multiplying by 10^(number of non-zero digits in [left, right])
- The difference gives us the non-zero digits in [left, right]

**Final Approach:**  
Build three prefix arrays:
1. `prefix_sum[i]`: sum of all digits in s[0:i+1]
2. `prefix_num[i]`: concatenated number of non-zero digits in s[0:i+1] mod 10⁹ + 7
3. `prefix_count[i]`: count of non-zero digits in s[0:i+1]

For each query, use these to extract x and sum in O(1) time.

## Corner cases to consider

- All zeros in the range → result is 0
- Single non-zero digit → x equals that digit, sum equals that digit
- Entire string has no non-zeros → all queries return 0
- Large numbers → must apply modulo to prevent overflow
- Range spans entire string → prefix arrays give direct answer

## Solution

```python
def concatenateDigitsMultiplyBySum(num: str, queries: list[list[int]]) -> list[int]:
    MOD = 10**9 + 7
    n = len(num)
    
    # Precompute prefix arrays
    # prefix_sum[i] = sum of digits in num[0:i+1]
    # prefix_num[i] = concatenated non-zero digits in num[0:i+1] mod MOD
    # prefix_count[i] = count of non-zero digits in num[0:i+1]
    prefix_sum = [0] * n
    prefix_num = [0] * n
    prefix_count = [0] * n
    
    digit = int(num[0])
    prefix_sum[0] = digit
    prefix_num[0] = digit if digit != 0 else 0
    prefix_count[0] = 1 if digit != 0 else 0
    
    for i in range(1, n):
        digit = int(num[i])
        prefix_sum[i] = prefix_sum[i - 1] + digit
        prefix_count[i] = prefix_count[i - 1] + (1 if digit != 0 else 0)
        
        if digit == 0:
            prefix_num[i] = prefix_num[i - 1]
        else:
            # Append digit to previous number: prev_num * 10 + digit
            prefix_num[i] = (prefix_num[i - 1] * 10 + digit) % MOD
    
    result = []
    
    for left, right in queries:
        # Sum of digits in range [left, right]
        range_sum = prefix_sum[right]
        if left > 0:
            range_sum -= prefix_sum[left - 1]
        range_sum %= MOD
        
        # Count of non-zero digits in range
        range_count = prefix_count[right]
        if left > 0:
            range_count -= prefix_count[left - 1]
        
        # Concatenated number of non-zero digits in range
        x = prefix_num[right]
        
        if left > 0:
            # Remove contribution from [0, left-1]
            # x = prefix_num[right] - prefix_num[left-1] * 10^(digits_in_range)
            left_prefix = prefix_num[left - 1]
            shift = pow(10, range_count, MOD)
            x = (x - left_prefix * shift % MOD + MOD) % MOD
        
        # If no non-zero digits in range, x and sum are both 0
        if range_count == 0:
            result.append(0)
        else:
            ans = (x * range_sum) % MOD
            result.append(ans)
    
    return result
```

## Time and Space complexity Analysis

- **Time Complexity:** O(n + q) where n is the length of `num` and q is the number of queries. Preprocessing takes O(n) to build prefix arrays. Each query is answered in O(log n) due to modular exponentiation using `pow(10, range_count, MOD)`. If we optimize further with another prefix array for powers of 10, it becomes O(n) preprocessing and O(q) for queries.

- **Space Complexity:** O(n) for the three prefix arrays (`prefix_sum`, `prefix_num`, `prefix_count`). No additional recursion stack or dynamic structures are used beyond input storage.

## Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1)  
  *What if we need to handle updates where we can change a digit at a certain position and then answer queries?*  
  *Hint: Consider a segment tree or Fenwick tree structure to maintain prefix arrays dynamically; think about how to decompose the problem into independent segments.*

- (Follow-up question 2)  
  *How would your solution change if instead of modulo 10⁹ + 7, we needed the exact integer value without any modulo?*  
  *Hint: Use Python's arbitrary precision integers or a big integer library; the algorithm remains the same but you avoid modular arithmetic.*

- (Follow-up question 3)  
  *Can you optimize space if queries are processed offline (all queries known upfront)?*  
  *Hint: Consider coordinate compression or sorting queries by range to reuse computations; exploit locality in query ranges.*

## Summary

This problem uses the **prefix precomputation pattern** to answer range queries efficiently. The key insight is precomputing three independent prefix arrays: digit sums, concatenated non-zero numbers, and counts. For each query, we extract the range values using arithmetic on prefix values. The tricky part is handling the "shifting" operation when removing the left part of the prefix—we multiply by 10^(digit count) to align positional values correctly.

This pattern appears frequently in range query problems where we need to combine multiple properties (sums, counts, string concatenations) and later extract ranges without recalculating. It's similar to prefix sum arrays but extended to handle more complex operations and modular arithmetic.


### Flashcard
For each query range, extract non-zero digits to form x, sum x's digits, multiply x × sum; precompute prefix sums for efficient range queries.

### Tags
Math(#math), String(#string), Prefix Sum(#prefix-sum)

### Similar Problems
