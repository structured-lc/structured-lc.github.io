### Leetcode 1085 (Easy): Sum of Digits in the Minimum Number [Practice](https://leetcode.com/problems/sum-of-digits-in-the-minimum-number)

### Description  
Given an array of positive integers, find the *minimum* element. Sum its digits, and return **1 if the sum is even**, or **0 if it is odd**.  
Example: For the input `[34,23,1,24,75,33,54,8]`, the minimum is `1`, whose digit sum is `1`. That is odd, so return `0`.

### Examples  

**Example 1:**  
Input: `[34,23,1,24,75,33,54,8]`  
Output: `0`  
*Explanation: The minimum is 1. Sum of digits: 1 (odd), so return 0.*

**Example 2:**  
Input: `[99,77,33,66,55]`  
Output: `1`  
*Explanation: The minimum is 33. Sum of digits: 3+3 = 6 (even); return 1.*

**Example 3:**  
Input: `[20, 14, 56, 31, 7]`  
Output: `0`  
*Explanation: The minimum is 7. Sum of digits: 7 (odd); return 0.*

### Thought Process (as if you’re the interviewee)  
To solve this problem:
- First, **find the minimum value** in the array.  
- Then, **compute the sum of its digits**. This can be done digit-by-digit using modulo and division.
- Finally, **return 1 if the sum is even** (i.e., sum % 2 == 0), **else 0**.

Brute-force and the optimal approach are almost the same here since the array is small (≤100 elements), and each number is also ≤100, so the digit sum calculation is trivial. There are no significant optimizations since all steps are O(n) or better.

### Corner cases to consider  
- Single-element array (e.g., ``)
- All elements equal (e.g., `[5,5,5]`)
- Minimum value with multiple digits (e.g., `[15, 24, 33]`)
- Minimum is the last/first/middle element

### Solution

```python
def sumOfDigits(nums):
    # Step 1: Find the minimum number in the list
    min_num = nums[0]
    for num in nums:
        if num < min_num:
            min_num = num
            
    # Step 2: Calculate the sum of the digits of min_num
    digit_sum = 0
    temp = min_num
    while temp > 0:
        digit_sum += temp % 10    # Add least significant digit
        temp = temp // 10         # Remove least significant digit
        
    # Step 3: Return 1 if digit_sum is even; else return 0
    return 1 if digit_sum % 2 == 0 else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of elements in `nums`. Finding min is O(n), digit sum is O(1) (since min is ≤100).
- **Space Complexity:** O(1); only a few variables are used for calculation. No extra space depending on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return not just *whether* the sum is even, but the actual sum?
  *Hint: Keep track of the digit sum and return it instead of or alongside the indicator.*

- What if numbers could be negative or zero?
  *Hint: Think about handling sign and digit sums for negative numbers.*

- Can you solve it in a single pass through the array without an explicit min() operation and then an extra scan?
  *Hint: Accumulate digit sum as you check each element for min.*

### Summary
This problem emphasizes **array scanning** and **simple digit manipulation**. The approach uses the common patterns of "find min" and then "operate on min". This technique (operating on the extremum of an array) is prevalent in interview questions involving arrays, statistics, or digit arithmetic.