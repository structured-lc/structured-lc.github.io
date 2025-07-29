### Leetcode 2455 (Easy): Average Value of Even Numbers That Are Divisible by Three [Practice](https://leetcode.com/problems/average-value-of-even-numbers-that-are-divisible-by-three)

### Description  
Given an array of positive integers, return the average value (rounded down to the nearest integer) of all numbers that are both **even** and **divisible by three**.  
If there are no such numbers, return 0.  
You compute the average as the sum of qualifying numbers divided by their count, using integer division (so 7/2 = 3).

### Examples  

**Example 1:**  
Input: `nums = [1,3,6,10,12,15]`  
Output: `9`  
*Explanation: The even numbers divisible by 3 are 6 and 12. (6 + 12) / 2 = 9.*

**Example 2:**  
Input: `nums = [1,2,4,7,10]`  
Output: `0`  
*Explanation: No numbers satisfy both "even" and "divisible by 3" → return 0.*

**Example 3:**  
Input: `nums = [18,12,6,9,3]`  
Output: `12`  
*Explanation: 18, 12, and 6 are all even and divisible by 3, average is (18 + 12 + 6) / 3 = 12.*

### Thought Process (as if you’re the interviewee)  
- First, for each element, check if it’s even **and** divisible by 3.  
- Being even means `num % 2 == 0`. Divisible by 3 means `num % 3 == 0`.  
- These two conditions together mean the number must be divisible by 6: `num % 6 == 0`.  
- For every qualifying element, track the sum and the count.  
- After processing the array, if no such numbers exist (count = 0), return 0.  
- Otherwise, return sum // count (integer division to round down).  
- Brute force checks every element, which is fine since it’s O(n) and no better is possible.  
- Using no extra memory makes this optimal in both time and space.

### Corner cases to consider  
- Array is empty → should return 0.  
- Array has only one element (either qualifying or not).  
- All numbers in array qualify (all are even and divisible by 3).  
- No numbers qualify at all (all odd, or all not multiples of 3).  
- Large arrays – efficiency is linear and doesn’t break.  
- Only one qualifying number, result equals that single number.

### Solution

```python
def averageValue(nums):
    total = 0      # Sum of qualifying numbers
    count = 0      # Count of qualifying numbers
    for num in nums:
        # Check if num is even and divisible by 3,
        # which is equivalent to checking divisibility by 6
        if num % 6 == 0:
            total += num
            count += 1
    # If no qualifying numbers, return 0
    if count == 0:
        return 0
    # Integer division as required
    return total // count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of input array. Each number is checked exactly once.
- **Space Complexity:** O(1), only simple integer variables are used for sum/count; no extra data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array could have negative numbers?
  *Hint: How does “average value” behave if negatives are allowed?*

- How would you modify the function to return the floating point average (not rounded down)?
  *Hint: Use regular division and handle return type.*

- Can you generalize this function to accept any “divisible by X and Y” criterion where X and Y are given?
  *Hint: Accept parameters for the divisors, check divisibility by their least common multiple (LCM).*

### Summary
This is a classic **simple filtering and averaging** problem using a single pass and two accumulators.  
You can apply the pattern of “sum and count as you scan” to any array-based scenario where you need an average under constraints.  
Divisibility reductions via least common multiples can generalize this type of problem.  
No sorting, extra memory, or advanced data structures are required.