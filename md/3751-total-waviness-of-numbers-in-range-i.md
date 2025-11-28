# [Practice](https://leetcode.com/problems/total-waviness-of-numbers-in-range-i)

## Description

Given two integers `num1` and `num2` representing an inclusive range, calculate the **total waviness** of all numbers in that range.

For a single number, **waviness** is the count of digits that form either a **peak** or a **valley**:
- A **peak**: a digit that is strictly greater than both its left and right neighbors
- A **valley**: a digit that is strictly less than both its left and right neighbors

Numbers with fewer than 3 digits have a waviness of 0 (since you need at least 3 digits to have a peak or valley).

## Examples

**Example 1:**  
Input: `num1 = 10, num2 = 20`  
Output: `0`  
*Explanation: Numbers 10-20 all have fewer than 3 digits or only 2 digits, so all have waviness 0.*

**Example 2:**  
Input: `num1 = 100, num2 = 130`  
Output: `3`  
*Explanation: 120 has middle digit 2 (peak: 2 > 1 and 2 > 0), waviness = 1. 121 has middle digit 2 (peak: 2 > 1 and 2 > 1), but 2 is not > 1 on the right, so waviness = 0. 130 has middle digit 3 (peak: 3 > 1 and 3 > 0), waviness = 1. Other numbers contribute 0. Total = 3.*

**Example 3:**  
Input: `num1 = 200, num2 = 202`  
Output: `1`  
*Explanation: 202 has middle digit 0 (valley: 0 < 2 and 0 < 2), waviness = 1. Total = 1.*

## Thought Process (as if you're the interviewee)

**Brute Force Approach:**
1. Iterate through every number from `num1` to `num2`
2. For each number, convert it to a string to access individual digits
3. For each digit at position i (where i has both left and right neighbors), check if it's a peak or valley
4. Sum up the waviness of all numbers

This works well when the range is relatively small (up to 10⁵) and numbers have at most ~10 digits.

**Why this approach?**
- The constraint is manageable: `num1` and `num2` are integers, so they have at most 10 digits
- O(N × L) where N is the range size and L is the max digit length (≈10) is acceptable
- No need for advanced techniques like digit DP for this problem

**Optimization considered but not necessary:**
Digit DP could handle larger ranges (up to 10¹⁵), but given this is marked "Easy", brute force is the intended solution.

## Corner cases to consider

- Numbers with fewer than 3 digits (waviness = 0)
- Single number range (num1 = num2)
- Numbers with repeated digits (e.g., 111 - no peaks or valleys)
- Leading zeros don't occur (since we're dealing with actual integers)
- All digits equal (e.g., 222 - no peaks or valleys)

## Solution

```python
def totalWaviness(num1: int, num2: int) -> int:
    def calculate_waviness(num):
        # Convert number to string to access digits
        digits = str(num)
        
        # Need at least 3 digits for a peak or valley
        if len(digits) < 3:
            return 0
        
        waviness = 0
        
        # Check each digit (except first and last)
        # that has both left and right neighbors
        for i in range(1, len(digits) - 1):
            left = int(digits[i - 1])
            middle = int(digits[i])
            right = int(digits[i + 1])
            
            # Check if middle is a peak or valley
            if (middle > left and middle > right) or \
               (middle < left and middle < right):
                waviness += 1
        
        return waviness
    
    total = 0
    
    # Iterate through all numbers in range
    for num in range(num1, num2 + 1):
        total += calculate_waviness(num)
    
    return total
```

## Time and Space complexity Analysis

- **Time Complexity:** O(N × L), where N is the number of integers in the range (num2 - num1 + 1) and L is the maximum number of digits in any number (≈10 for integers up to 10¹⁰). For each number, we iterate through its digits to find peaks/valleys.

- **Space Complexity:** O(L) for storing the string representation of each number. No additional data structures that scale with input size are used.

## Potential follow-up questions (as if you're the interviewer)

- What if `num1` and `num2` could be extremely large (up to 10¹⁵)?  
  *Hint: Consider digit dynamic programming where you precompute waviness for numbers with specific digit patterns. Hint 2: Think about decomposing the problem into ranges of specific digit lengths.*

- Can you optimize space usage for very large ranges?  
  *Hint: You don't need to store all intermediate results. Hint 2: Can you compute contributions based on digit patterns rather than iterating every number?*

- How would you handle a modified problem where "waviness" counts digits based on a different definition (e.g., alternating increase/decrease)?  
  *Hint: The algorithm structure remains the same. Hint 2: Only the peak/valley detection logic changes.*

## Summary

This problem uses a **brute-force enumeration** approach combined with **string digit extraction**. For each number in the range, we convert it to a string and check each middle digit to see if it forms a peak or valley. This pattern is common in digit-manipulation problems and serves as a foundation before advancing to digit DP solutions for even larger ranges. The key insight is recognizing that comparing adjacent digits as integers requires only O(1) space and the overall complexity remains acceptable for the given constraints.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Enumeration(#enumeration)

### Similar Problems
