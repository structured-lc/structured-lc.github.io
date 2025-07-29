### Leetcode 2578 (Easy): Split With Minimum Sum [Practice](https://leetcode.com/problems/split-with-minimum-sum)

### Description  
Given a positive integer `num`, split its digits (in any order) into two non-negative integers `num₁` and `num₂` so that both numbers together use all the digits of `num` exactly once (digits can be rearranged, and numbers can have leading zeroes). Return the **minimum possible sum** of `num₁ + num₂`.

### Examples  

**Example 1:**  
Input: `4325`  
Output: `59`  
*Explanation: Rearranged as 2,3,4,5 → Split as 24 and 35 → 24+35=59. This is the minimal possible sum.*

**Example 2:**  
Input: `687`  
Output: `75`  
*Explanation: Rearranged as 6,7,8 → Split as 68 and 7 (or 7 and 68, etc.) → 68+7=75.*

**Example 3:**  
Input: `1009`  
Output: `19`  
*Explanation: Digits: 0,0,1,9. Smallest way is 0 and 19 or 1 and 09, or 10 and 09 → 10+9=19.*

### Thought Process (as if you’re the interviewee)  

To minimize the sum of two numbers built from the digits of num:
- **Brute-force:** Try all possible partitions, but since digit count is up to 10, this is infeasible (2¹⁰ splits).
- **Observation:** To minimize the sum, both numbers should have their smallest possible value → Distribute the smallest available digits alternately between num₁ and num₂.
- **Greedy Strategy:** 
  - Sort all digits in ascending order.
  - Distribute digits one by one, alternately assigning smallest digit to num₁, then to num₂, etc. (or vice versa, order doesn't matter).
  - Form the two integers, then return their sum.

This approach is efficient because it ensures that both numbers contain small digits in high-value places, minimizing their sum. Sorting up to 10 digits is trivial.

### Corner cases to consider  
- num with exactly 2 digits, e.g., 10
- num with repeated digits, e.g., 1111
- num with zeros (possible leading zeros), e.g., 1009
- num of maximum 10 digits, e.g., 9876543210
- num where all digits are equal
- num that is already minimal as is

### Solution

```python
def splitNum(num):
    # Convert number to a sorted list of digits
    digits = list(map(int, str(num)))
    digits.sort()
    
    # Prepare two numbers as strings (to avoid integer math per digit)
    num1, num2 = "", ""
    
    # Distribute digits alternately to num1 and num2
    for i, d in enumerate(digits):
        if i % 2 == 0:
            num1 += str(d)
        else:
            num2 += str(d)
    
    # Convert back to integers and return their sum
    return int(num1) + int(num2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(D log D), where D is the number of digits in num (≤10). Sorting dominates, but is fast since D is small.
- **Space Complexity:** O(D), for the digit array and string concatenations (negligible since D≤10).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted to split into k numbers to minimize their sum?
  *Hint: Try distributing digits in a cyclic way over k numbers.*
- Can you do this in-place without string conversion?
  *Hint: Assign digits numerically using power/place value math.*
- What if we needed to maximize the sum, instead of minimize?
  *Hint: Try allocating largest digits first to one number.*

### Summary
This problem is a classic **greedy digit distribution** problem: sorting and alternately assigning the smallest digits keeps both numbers as small as possible and their sum minimal. It’s a pattern seen in “minimum/maximum by digit allocation” problems and is especially optimal when combining sorting with a simple round-robin assignment. The approach is robust, handles zeros and repeated digits, and is very efficient due to the small input size.