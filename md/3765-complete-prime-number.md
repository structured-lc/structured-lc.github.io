# Leetcode 3765 (Medium): Complete Prime Number [Practice](https://leetcode.com/problems/complete-prime-number)

### Description
Given an integer `num`, determine if it is a **complete prime number**. A number is a complete prime number if every prefix and every suffix of its digit representation is a prime number. For example, with `num = 23`, the prefixes are `2` and `23`, and the suffixes are `3` and `23`. If all four of these numbers are prime, return `true`; otherwise, return `false`.

### Examples

**Example 1:**  
Input: `num = 23`  
Output: `true`  
*Explanation: Prefixes are 2, 23. Suffixes are 3, 23. All four numbers (2, 23, 3, 23) are prime, so return true.*

**Example 2:**  
Input: `num = 39`  
Output: `false`  
*Explanation: Prefixes are 3, 39. Suffixes are 9, 39. The number 9 is not prime (9 = 3 × 3), so return false immediately.*

**Example 3:**  
Input: `num = 7`  
Output: `true`  
*Explanation: Single-digit 7 is prime. Prefixes and suffixes both give 7, so return true.*

### Thought Process (as if you're the interviewee)

The brute-force approach is straightforward: extract all prefixes and suffixes from the string representation of the number, check if each extracted number is prime, and return `false` as soon as we find a non-prime. If all are prime, return `true`.

To optimize the prime-checking function, instead of testing divisibility up to `n`, we only need to check up to √n because if `n` has a divisor larger than √n, it must also have a corresponding divisor smaller than √n. This reduces the prime-check complexity from O(n) to O(√n).

The final approach:
1. Convert `num` to a string to easily extract prefixes and suffixes.
2. Iterate through all prefixes (building from left to right).
3. For each prefix, check if it's prime; if not, return `false`.
4. Iterate through all suffixes (building from right to left).
5. For each suffix, check if it's prime; if not, return `false`.
6. If all checks pass, return `true`.

This approach avoids redundant checks by returning early whenever a non-prime is encountered.

### Corner cases to consider

- **Single-digit numbers:** These are both their own prefix and suffix, so check if they are prime (e.g., `7` is prime, `1` is not).
- **Numbers starting with 0:** Not possible since we're dealing with standard integers (leading zeros don't exist).
- **Even numbers greater than 2:** Any even number > 2 cannot be prime, so numbers with even prefixes/suffixes fail.
- **Number containing digits like 4, 6, 8, 9:** If these appear anywhere, any prefix or suffix ending with them will be composite and fail.
- **Two-digit numbers:** Both prefix and suffix are checked; neither can be 1 (which is not prime).

### Solution

```python
def isCompletePrime(num: int) -> bool:
    def is_prime(n):
        # Numbers less than 2 are not prime
        if n < 2:
            return False
        # 2 is the only even prime number
        if n == 2:
            return True
        # All other even numbers are not prime
        if n % 2 == 0:
            return False
        # Check odd divisors up to sqrt(n)
        i = 3
        while i * i <= n:
            if n % i == 0:
                return False
            i += 2
        return True
    
    # Convert number to string to extract prefixes and suffixes
    s = str(num)
    length = len(s)
    
    # Check all prefixes: "2", "23", etc.
    for i in range(1, length + 1):
        prefix = int(s[:i])
        if not is_prime(prefix):
            return False
    
    # Check all suffixes: "3", "23", etc.
    for i in range(length - 1, -1, -1):
        suffix = int(s[i:])
        if not is_prime(suffix):
            return False
    
    return True
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(k × √m), where k is the number of digits in `num` and m is the value of the largest prefix or suffix. In the worst case, we check k prefixes and k suffixes. For each number, we perform a primality check up to its square root. The largest number we check is `num` itself, so m ≤ num. Thus, the dominant factor is checking all prefixes and suffixes with primality testing.

- **Space Complexity:** O(k) where k is the number of digits. The string representation requires O(k) space. The integer conversions during prefix/suffix extraction don't create additional arrays, and the recursion stack for prime-checking is negligible.

### Potential follow-up questions

- (Follow-up question 1)  
*Hint: Consider precomputing or caching prime checks. How would you optimize if you had multiple queries?*

- (Follow-up question 2)  
*Hint: What if you needed to handle very large numbers where conversion to integer overflows? How would you adapt the prime-checking logic?*

- (Follow-up question 3)  
*Hint: Can you optimize by recognizing that certain digit patterns guarantee failure (e.g., any suffix ending in an even digit > 2)?*

### Summary

The key pattern in this problem is **prefix/suffix enumeration with early termination**. We convert the number to a string, extract all prefixes and suffixes systematically, and validate each against a primality test. The optimization leverages the fact that prime-checking can be done in O(√n) time rather than O(n). This pattern is common in string manipulation problems where you need to validate all contiguous substrings or partial representations, and it applies to problems involving subsequences, partitions, or divisibility checks.

### Flashcard

Extract all prefixes and suffixes from the string representation of a number; return false immediately if any prefix or suffix is not prime, otherwise return true. Use √n primality testing to efficiently validate each extracted number.

### Tags
Math(#math), Enumeration(#enumeration), Number Theory(#number-theory)

### Similar Problems
